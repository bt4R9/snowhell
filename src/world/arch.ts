import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { noise2, hash2 } from './noise';

// КАМЕННАЯ АРКА. Скала, сквозь которую едешь.
//
// Смысл ровно в проезде: массив в двести метров шириной, стоящий ПОПЕРЁК
// трассы, читается как ворота, и линия спуска сама собой ведёт в проём. Ноги
// стоят за кромкой трассы, свод проходит высоко над головой — поэтому арка
// никогда не блокирует спуск, она его обрамляет.
//
// ★ МАССИВ С ПРОМЫТОЙ ДЫРОЙ, А НЕ ТРУБА ПО ДУГЕ.
// Первая версия протягивала трубу постоянного сечения вдоль полуэллипса. Она
// и выглядела ровно тем, чем была: выточенной деталью. Причина не в мелкой
// шероховатости, которой там хватало, а в том, что ВНЕШНИЙ КОНТУР был
// параллелен проёму — толщина одинаковая везде, обе ноги одинаковые, замок
// ровно посередине. В природе наоборот: сначала есть скальный массив
// (неровный купол), и уже в нём вода со льдом промывают дыру. Границы у них
// РАЗНЫЕ и независимые, поэтому свод где-то толстый, где-то тонкий, одна нога
// толще другой, а проём смещён от центра.
//
// Отсюда построение: задаём силуэт массива, задаём отверстие, и материал —
// это разность. Никакой общей осевой линии у них нет.

// Тона те же, что у скал-останцов: порода одной страны должна выглядеть одной
// породой. Низ холодный и тёмный (тень, мокрый камень), верх выгоревший.
const C_DARK = new THREE.Color(0x635d66);
const C_LIGHT = new THREE.Color(0xa79fa8);
const C_SNOW = new THREE.Color(0xdfe6f5);

interface Shape {
  hx: number; hy: number;          // центр отверстия
  hrx: number; hry: number;        // полуоси отверстия
  ph: number;                      // фаза шума варианта
}

/** Граница отверстия в направлении угла: эллипс, изъеденный шумом */
function holeR(sh: Shape, ca: number, sa: number): number {
  const e = 1 / Math.hypot(ca / sh.hrx, sa / sh.hry);
  // Крупная волна — проём не круглый, а с пазухами; мелкая — щербина кромки.
  const n =
    noise2(ca * 2.1 + sh.ph, sa * 2.1 - sh.ph) * 0.15 +
    noise2(ca * 5.3 - sh.ph, sa * 5.3 + sh.ph) * 0.06;
  return e * (1 + n);
}

/**
 * Одна глыба — ТОТ ЖЕ РЕЦЕПТ, ЧТО У ОСТАНЦОВ (см. buildCragGeometry): берём
 * многогранник и СИЛЬНО рвём его вершины трёхмасштабным шумом по направлению.
 * Одного масштаба мало — выходит мятый шар, а не порода: нужны крупные
 * лопасти, средние сколы и мелкая щербина.
 */
function rockLump(seed: number, detail: number): THREE.BufferGeometry {
  const g = new THREE.IcosahedronGeometry(1, detail).toNonIndexed();
  const pos = g.attributes.position;
  const ph = seed * 7.31 + 1.7;
  for (let k = 0; k < pos.count; k++) {
    const x = pos.getX(k);
    const y = pos.getY(k);
    const z = pos.getZ(k);
    const len = Math.hypot(x, y, z) || 1;
    const nx = x / len;
    const ny = y / len;
    const nz = z / len;
    const d =
      noise2(nx * 1.7 + ph, nz * 1.7 - ny * 1.3 + ph) * 0.34 +
      noise2(nx * 4.3 - ph, nz * 4.3 + ny * 3.1) * 0.17 +
      noise2(nx * 9.1 + ny * 7.7, nz * 9.1 - ph) * 0.08;
    const r = 1 + d;
    pos.setXYZ(k, nx * r, ny * r, nz * r);
  }
  return g;
}

/**
 * Единичная арка: пролёт 1 по X, высота 1 по Y, подошва в нуле.
 * Масштаб инстанса задаёт настоящие метры.
 */
export function buildArchGeometry(variant: number): THREE.BufferGeometry {
  const h = (a: number, b: number): number => hash2(variant * 97 + a, b);
  const sh: Shape = {
    // ПРОЁМ СМЕЩЁН. Ровно по центру он выдаёт чертёж; сдвиг в сторону сразу
    // делает одну ногу толще другой — так и стоят настоящие арки.
    hx: (h(1, 3) - 0.5) * 0.13,
    // ★ ОТВЕРСТИЕ ЗАМЕТНО БОЛЬШЕ ГЛЫБ. Глыба лежит СНАРУЖИ кромки проёма и
    // съедает его на свой радиус: при отверстии 0.33 и глыбах 0.2 ворота
    // схлопывались до 0.11 пролёта (замер). Держим соотношение примерно
    // три к одному.
    hy: 0.52 + h(5, 7) * 0.05,
    hrx: 0.54 + h(9, 11) * 0.06,
    hry: 0.58 + h(13, 17) * 0.08,
    ph: variant * 13.7 + 2.5,
  };

  // ★ АРКА — ЦЕПЬ СРОСШИХСЯ ГЛЫБ, А НЕ ОТЛИВКА.
  // Предыдущая версия строила тело как разность «массив минус дыра»: контуры
  // получались независимые, но поверхность оставалась одной непрерывной
  // оболочкой — глаз читал её как выточенную деталь. Порода так не выглядит.
  // Настоящая арка это сросшиеся блоки: каждый со своим сколом, размером и
  // поворотом, границы между ними видны. Поэтому кладём вдоль проёма цепочку
  // глыб того же вида, что и останцы, с перекрытием — тело набирается их
  // объединением, и внешний силуэт получается рваным сам собой.
  const parts: THREE.BufferGeometry[] = [];
  // Шаг цепи считается от размера глыб: соседние обязаны ПЕРЕКРЫВАТЬСЯ, иначе
  // в замке появляется просвет и арка распадается на две колонны. При N = 20
  // шаг 0.128 против суммы радиусов 0.11–0.2 — на грани.
  const N = 26;
  const a0 = -0.5;
  const a1 = Math.PI + 0.5;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const a = a0 + (a1 - a0) * t;
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    const s = Math.max(0, Math.sin(Math.min(Math.PI, Math.max(0, a))));
    // у ног глыбы крупнее — там масса, в замке тоньше: его выело
    const swell = 1 + 0.75 * Math.pow(1 - s, 1.5);
    const jit = 0.85 + h(i * 13 + 41, 3) * 0.5;
    const R = (0.075 + h(29, 31) * 0.028) * swell * jit;
    const rc = holeR(sh, ca, sa) + R * 0.95;
    const cx = sh.hx + ca * rc + (h(i * 7 + 5, 9) - 0.5) * R * 0.5;
    const cy = sh.hy + sa * rc + (h(i * 11 + 3, 13) - 0.5) * R * 0.5;

    const g = rockLump(variant * 31 + i, i % 3 === 0 ? 2 : 1);
    // каждая глыба со своим сплющиванием и поворотом — иначе цепь бусин
    g.scale(
      R * (0.85 + h(i * 17 + 1, 19) * 0.5),
      R * (0.85 + h(i * 19 + 7, 23) * 0.5),
      R * (1.25 + h(i * 23 + 9, 29) * 0.7)
    );
    g.rotateY(h(i * 29 + 11, 31) * Math.PI * 2);
    g.rotateZ((h(i * 31 + 13, 37) - 0.5) * 1.1);
    g.rotateX((h(i * 37 + 17, 41) - 0.5) * 0.8);
    g.translate(cx, cy, (h(i * 41 + 19, 43) - 0.5) * R * 0.6);
    parts.push(g);
  }

  // ПОДОШВЫ: под каждой ногой ещё по паре глыб, уходящих в грунт. Без них
  // цепь заканчивается в воздухе аккуратным срезом.
  for (const side of [-1, 1]) {
    for (let i = 0; i < 2; i++) {
      const R = 0.13 + h(side * 53 + i * 3, 47) * 0.07;
      const g = rockLump(variant * 71 + side * 5 + i, 1);
      g.scale(R * 1.25, R * (0.8 + i * 0.2), R * 1.5);
      g.rotateY(h(side * 59 + i, 53) * Math.PI * 2);
      g.rotateZ((h(side * 61 + i, 59) - 0.5) * 0.7);
      g.translate(
        sh.hx + side * (sh.hrx + 0.13 + i * 0.05),
        -0.05 - i * 0.16,
        (h(side * 67 + i, 61) - 0.5) * R * 0.7
      );
      parts.push(g);
    }
  }

  // mergeGeometries уже отдаёт геометрию без индекса — повторный вызов только
  // дублирует буферы и сыплет предупреждениями в консоль
  const merged = mergeGeometries(parts);
  for (const p of parts) p.dispose();
  const flat = merged;

  // НОРМИРУЕМ: пролёт ровно 1 по X, высота ровно 1, подошва в нуле. Иначе
  // «арка масштаба 200» получает случайные габариты, и ни столкновение, ни
  // просвет под сводом посчитать нельзя.
  flat.computeBoundingBox();
  const bb = flat.boundingBox!;
  const w = Math.max(0.001, bb.max.x - bb.min.x);
  const hgt = Math.max(0.001, bb.max.y - bb.min.y);
  const p = flat.attributes.position;
  for (let i = 0; i < p.count; i++) {
    p.setXYZ(
      i,
      (p.getX(i) - (bb.min.x + bb.max.x) / 2) / w,
      (p.getY(i) - bb.min.y) / hgt,
      p.getZ(i) / w
    );
  }
  flat.computeVertexNormals();
  // ★ ГДЕ У ЭТОЙ ГЕОМЕТРИИ ЗЕМЛЯ. Нормировка растягивает на единицу ВЕСЬ
  // массив вместе с закопанной частью, поэтому исходный ноль оказывается не в
  // нуле нормированных координат. Без поправки арка садится на склон выше,
  // чем надо, и наружу вылезает то, что должно быть спрятано в грунте.
  flat.userData.groundY = (0 - bb.min.y) / hgt;

  // цвет по граням — тем же правилом, что у останцов
  const pos2 = flat.attributes.position;
  const nor2 = flat.attributes.normal;
  const col = new Float32Array(pos2.count * 3);
  const tmp = new THREE.Color();
  for (let i = 0; i < pos2.count; i += 3) {
    let ny = 0;
    let hy = 0;
    for (let k = 0; k < 3; k++) {
      ny += nor2.getY(i + k) / 3;
      hy += pos2.getY(i + k) / 3;
    }
    const t = Math.max(0, Math.min(1, hy));
    tmp.copy(C_DARK).lerp(C_LIGHT, t * t * (3 - 2 * t));
    // снег держится только на почти горизонтальном и только наверху свода
    const fl = Math.max(0, Math.min(1, (ny - 0.7) / 0.24));
    tmp.lerp(C_SNOW, fl * fl * (0.15 + 0.55 * t));
    const j = 0.9 + hash2(Math.round(pos2.getX(i) * 83), Math.round(pos2.getZ(i) * 91) + i) * 0.2;
    for (let k = 0; k < 3; k++) {
      col[(i + k) * 3] = tmp.r * j;
      col[(i + k) * 3 + 1] = tmp.g * j;
      col[(i + k) * 3 + 2] = tmp.b * j;
    }
  }
  flat.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return flat;
}

/**
 * Профиль КАЖДОЙ ноги в единичной арке — для столкновений.
 *
 * ★ НОГИ НЕ ЗЕРКАЛЬНЫ И НЕ ЭЛЛИПТИЧНЫ. Проём смещён от центра (в этом
 * половина естественности силуэта), поэтому одна нога толще другой. И форма
 * у неё лопастная: наружный бок массива уходит далеко, внутренний обрезан
 * проёмом. Эллипс на таком промахивался внутрь породы до 25 м (замер).
 * Поэтому берём то же решение, что и на останцах: радиальный профиль по
 * секторам, снятый ЛУЧОМ по самой геометрии в поясе касания.
 */
export const ARCH_BINS = 20;

export interface LegProfile {
  cx: number;        // центр ноги по X в единичной арке
  prof: number[];    // радиус по секторам (в единицах пролёта)
}

export function archLegProfiles(geo: THREE.BufferGeometry): LegProfile[] {
  const p = geo.attributes.position;
  const g0 = (geo.userData.groundY as number) ?? 0;

  const side = (want: number): LegProfile => {
    // треугольники ноги в поясе касания
    const tris: number[][] = [];
    let minX = 1e9;
    let maxX = -1e9;
    for (let i = 0; i < p.count; i += 3) {
      const ym = (p.getY(i) + p.getY(i + 1) + p.getY(i + 2)) / 3;
      if (ym < g0 - 0.01 || ym > g0 + 0.09) continue;
      const xm = (p.getX(i) + p.getX(i + 1) + p.getX(i + 2)) / 3;
      if (Math.sign(xm) !== want) continue;
      const t: number[] = [];
      for (let k = 0; k < 3; k++) {
        const x = p.getX(i + k);
        t.push(x, p.getZ(i + k));
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
      tris.push(t);
    }
    const cx = tris.length ? (minX + maxX) / 2 : want * 0.36;
    const prof = new Array(ARCH_BINS).fill(0);
    for (let k = 0; k < ARCH_BINS; k++) {
      const th = ((k + 0.5) / ARCH_BINS) * Math.PI * 2 - Math.PI;
      const dx = Math.cos(th);
      const dz = Math.sin(th);
      let best = 0;
      for (const t of tris) {
        for (let e = 0; e < 3; e++) {
          const px = t[e * 2] - cx;
          const pz = t[e * 2 + 1];
          const ex = t[((e + 1) % 3) * 2] - cx - px;
          const ez = t[((e + 1) % 3) * 2 + 1] - pz;
          const den = dx * ez - dz * ex;
          if (Math.abs(den) < 1e-9) continue;
          const tt = (px * ez - pz * ex) / den;
          if (tt <= best) continue;
          const u = Math.abs(ex) > Math.abs(ez) ? (tt * dx - px) / ex : (tt * dz - pz) / ez;
          if (u >= 0 && u <= 1) best = tt;
        }
      }
      prof[k] = best;
    }
    // пустой сектор достраиваем по соседям — провал в ноль сделал бы ногу
    // проходимой насквозь
    for (let pass = 0; pass < ARCH_BINS; pass++) {
      let holes = 0;
      for (let k = 0; k < ARCH_BINS; k++) {
        if (prof[k] > 0) continue;
        const a = prof[(k + ARCH_BINS - 1) % ARCH_BINS];
        const b = prof[(k + 1) % ARCH_BINS];
        if (a > 0 || b > 0) prof[k] = Math.max(a, b);
        else holes++;
      }
      if (holes === 0) break;
    }
    return { cx, prof };
  };

  return [side(-1), side(1)];
}
