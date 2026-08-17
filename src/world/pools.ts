import * as THREE from 'three/webgpu';
import {
  Fn, If, Loop, float, int, uint, vec2, vec3, vec4, uniform, uniformArray, attribute, instancedArray,
  instanceIndex, positionWorld, positionLocal, cameraPosition,
  floor, fract, sin, cos, dot, mix, length, smoothstep, max, min, clamp, abs, pow, exp, normalize, select,
} from 'three/tsl';
import { hash2, noise2 } from './noise';
import { toWorldX, toValleyU, pisteCenterX, volcanoWeight, VOLCANO_FROM } from './features';
import { psx, withUniforms, ShaderLike } from '../core/mat';
import { spriteCloud } from '../fx/sprites';
import { damage } from '../fx/damage';

/**
 * ★ ЛАВА, ВЕРСИЯ ВТОРАЯ — ЖИДКОСТЬ В ЧАШЕ.
 *
 * Первая версия выводила озёра из «впадин рельефа»: искала перевалы, лила по
 * лучам, ставила валы — и всё равно оставляла дырки, обрывала берега и
 * спорила с физикой. Здесь посылка обратная: НЕ лава ищет впадину, а впадина
 * строится ПОД лаву. Каждое озеро — это чаша, вырезанная в склоне явной
 * формулой (см. poolCarve): дно ниже зеркала, по кругу — вал выше зеркала.
 * Зеркало горизонтально, урез — там, где формула чаши пересекает уровень, а
 * это по построению замкнутая гладкая кривая. Рельеф, меш расплава и физика
 * читают ОДНУ функцию формы, поэтому берег сходится сам, без дырок и без
 * подгонки.
 *
 * Два вида чаш (по просьбе):
 *  • ПЛОТИНА (dam): вал замкнут по кругу; ниже по склону он выше зеркала —
 *    естественное препятствие, на которое можно заехать и объехать сбоку.
 *  • СЛИВ (spill): в валу с нижней стороны прорезь, из неё вниз по склону
 *    течёт язык — тонкий, по нему МОЖНО ехать (греет), — и падает в ПРОВАЛ:
 *    глубокий колодец с расплавом на дне (pit). В колодец и в само озеро
 *    заехать нельзя: там глубоко, доска тонет.
 * Есть и одиночные провалы без озера сверху.
 *
 * Всё живое — на GPU: расплав рисует свой TSL-шейдер (плиты корки, светящиеся
 * швы, медленная конвекция, пузыри, волны от доски), пузыри и пар — compute-
 * частицы. На CPU остаётся расстановка чаш и физика доски.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type N = any;

// ─── Расстановка ───────────────────────────────────────────────────────────

/** шаг площадок вдоль спуска, м (был 240 — «надо больше лавы») */
const SITE_STEP = 120;
/** до этой глубины вулкана лавы нет — сначала игрок должен увидеть биом */
const LAVA_START = VOLCANO_FROM + 420;

export type PoolKind = 'dam' | 'spill';

/** форма уреза: гармоники и эллиптическое вытяжение */
export interface Shore {
  /** фазы гармоник 1..5 */
  ph: number[];
  /** амплитуды гармоник 1..5 (доли радиуса) */
  amp: number[];
  /** вытяжение по своей оси (1 — круг) и её поворот */
  ex: number;
  rot: number;
}

export interface Pit {
  /** центр (координаты долины), радиус зеркала, уровень расплава, глубина колодца */
  u: number; z: number; R: number; L: number; depth: number;
  shore: Shore;
}

export interface Flow {
  /** габарит осевой с запасом на ширину — быстрый отсев в poolCarve */
  bbox?: { u0: number; u1: number; z0: number; z1: number };
  /**
   * осевая линия языка: u, z, полуширина w, ложе bed (высота дна русла) и
   * y = bed + толщина расплава — верх, по которому едут.
   * ★ ЛОЖЕ МОНОТОННО: каждая следующая точка ниже предыдущей. Жидкость не течёт
   * вверх, поэтому там, где склон локально поднимается, русло прорезано глубже.
   */
  pts: Array<{ u: number; z: number; y: number; w: number; bed: number }>;
}

export interface Pool {
  id: number;
  u: number; z: number;
  /** базовый радиус зеркала, м */
  R: number;
  /** уровень зеркала (абсолютная высота) */
  L: number;
  /** глубина дна ниже зеркала в центре */
  depth: number;
  /** высота вала над зеркалом */
  rimH: number;
  kind: PoolKind;
  shore: Shore;
  pit: Pit | null;
  flow: Flow | null;
}

/**
 * ★ РАЗНЫЕ КОНТУРЫ. Контур уреза — эллипс, растянутый по своей оси, поверх
 * которого идут пять гармоник со случайными амплитудами: у одного колодца
 * почти круг, у другого — вытянутая щель с заливами. Гладкий и замкнутый по
 * построению (одна и та же функция для рельефа, меша и физики).
 */
function makeShore(seed: number, wild: number): Shore {
  const ph: number[] = [];
  const amp: number[] = [];
  for (let i = 0; i < 5; i++) {
    ph.push(hash2(seed, 21 + i) * 6.283);
    // низкие гармоники крупнее, высокие мельче; общий размах — по wild
    amp.push((0.16 / (1 + i * 0.7)) * wild * (0.4 + 0.6 * hash2(seed, 31 + i)));
  }
  return { ph, amp, ex: 1 + hash2(seed, 41) * 0.9 * wild, rot: hash2(seed, 42) * Math.PI };
}
function shoreR(R: number, sh: Shore, theta: number): number {
  // эллипс: радиус по направлению θ относительно повёрнутой оси
  const c = Math.cos(theta - sh.rot);
  const sn = Math.sin(theta - sh.rot);
  const ell = 1 / Math.sqrt((c * c) / (sh.ex * sh.ex) + sn * sn);
  let k = 1;
  for (let i = 0; i < 5; i++) k += sh.amp[i] * Math.cos((i + 1) * theta + sh.ph[i]);
  return R * ell * k;
}

/** пока строим чашу, её собственный вырез в рельефе выключен — иначе рекурсия */
let carveOff = false;
/** высота рельефа (координаты долины) — впрыскивается из terrain.ts (цикл модулей) */
let sampleH: ((u: number, z: number) => number) | null = null;
export function setPoolTerrainSampler(f: (u: number, z: number) => number): void {
  sampleH = f;
}
function natural(u: number, z: number): number {
  carveOff = true;
  const h = sampleH!(u, z);
  carveOff = false;
  return h;
}

/** ★ ЛАБОРАТОРИЯ: ручная расстановка вместо генератора (см. installLavaLab) */
let labMode = false;
let labSites: Pool[] | null = null;
function lab(): Pool[] | null {
  if (!labMode) return null;
  // строится лениво: рельеф (sampleH) появляется позже, чем флаг
  if (!labSites && sampleH) labSites = buildLab();
  return labSites;
}

const siteCache = new Map<number, Pool[]>();

function makePit(u: number, z: number, R: number, depth: number, seed: number): Pit {
  const h0 = natural(u, z);
  return {
    u, z, R, depth,
    L: h0 - depth * 0.55, // зеркало ниже кромки — в колодец надо заглядывать
    shore: makeShore(seed * 3 + 1, 1.0 + hash2(seed, 43) * 0.8),
  };
}

/**
 * Язык от прорези: идёт вниз по склону по градиенту ЕСТЕСТВЕННОГО рельефа,
 * пока не пройдёт LEN метров; там и роется провал. Высоты записываются позже,
 * когда вырезы уже стоят (см. finalizeFlow).
 */
/** толщина расплава в русле над ложем, м */
const FLOW_THICK = 0.4;
/** минимальный уклон ложа: на сколько опускается за метр пути */
const FLOW_MIN_DROP = 0.06;

function traceFlow(p: Pool, seed: number): { pts: Array<{ u: number; z: number; w: number; bed: number; y: number }>; endU: number; endZ: number } {
  const pts: Array<{ u: number; z: number; w: number; bed: number; y: number }> = [];
  let u = p.u;
  let z = p.z + p.R * 1.05;
  // длина ограничена шагом площадок: язык не должен дотягиваться до
  // следующего озера на той же стороне (оно через две площадки)
  const len = 50 + hash2(seed, 9) * 110;
  const step = 5;
  const n = Math.round(len / step);
  // ложе стартует из прорези вала (L − 0.5) и только опускается
  let bed = p.L - 0.5;
  // ★ У КАЖДОГО ЯЗЫКА СВОЙ ХАРАКТЕР: как сильно виляет, как часто, насколько
  // ширина ходит — иначе все языки читались одной и той же линией
  const wander = 1.0 + hash2(seed, 16) * 2.6;
  const wfreq = 0.03 + hash2(seed, 17) * 0.05;
  const wide = 0.6 + hash2(seed, 18) * 0.9;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    // ширина: то сужается в горло, то раздаётся разливом — два масштаба шума
    // поверх общего «узко в истоке, шире в теле»
    // ★ РАЗМАХ НАСТОЯЩИЙ. Value-noise почти всегда около середины, и прежние
    // мягкие множители давали ±20% — язык читался прямоугольником. Растягиваем
    // шум от центра в полный 0..1 и ведём ширину от него линейно: горло в
    // 2–3 м переходит в разлив в 8–10 м и обратно, три-четыре раза за язык.
    const wn = Math.max(0, Math.min(1, (noise2(t * 4.5 + seed * 0.7, 4.4) * 0.5 + 0.5 - 0.5) * 2.4 + 0.5));
    const wn2 = noise2(t * 11.0 + seed * 1.3, 8.8) * 0.5 + 0.5;
    const w = 1.6 + (2.0 + 5.0 * wide) * (0.25 + 1.0 * wn) * (0.75 + 0.35 * wn2) * (0.55 + 0.45 * Math.sin(t * Math.PI));
    // ★ ВНИЗ И ТОЛЬКО ВНИЗ: ложе — бегущий минимум по естественному рельефу
    // (утоплено на 0.7 м), но не выше предыдущей точки минус минимальный уклон
    const nat = natural(u, z);
    bed = Math.min(bed - FLOW_MIN_DROP * (i > 0 ? step : 0), nat - 0.7);
    pts.push({ u, z, w, bed, y: bed + FLOW_THICK });
    // спуск: вперёд по z, вбок — по уклону естественного рельефа
    const hl = natural(u - 3, z + step);
    const hr = natural(u + 3, z + step);
    let du = (hl - hr) * 0.9; // катится в сторону, где ниже
    du = Math.max(-2.5, Math.min(2.5, du));
    // и виляет сам по себе — прямой язык читается линейкой; у широких языков
    // виляние медленнее, у узких — чаще
    du += noise2(z * wfreq + seed * 3.1, 7.7) * wander;
    u += du;
    z += step;
  }
  // ★ ИСТОК В ОЗЕРЕ. Первая точка стоит внутри зеркала на уровне L: язык
  // начинается как продолжение поверхности озера и через прорезь скатывается в
  // русло — виден сам перелив, а не лента, возникающая из вала.
  pts.unshift({ u: p.u, z: p.z + p.R * 0.82, w: pts[0].w * 1.15, bed: p.L - FLOW_THICK, y: p.L });
  return { pts: smoothFlow(pts), endU: u, endZ: z };
}

/**
 * ★ РУСЛО СГЛАЖЕНО. Ложе, снятое с рельефа точка в точку, повторяло каждую его
 * ступеньку — язык шёл вниз угловатой лесенкой, а в природе тягучий поток
 * сам выглаживает своё русло. Поэтому профиль (и высота, и боковой ход)
 * пропускается через скользящее среднее, потом снова прижимается к монотонному
 * спуску и пересэмплируется мельче сплайном Катмулла-Рома — поверхность выходит
 * плавной дугой, а рельеф под ней (flowShape) режется под это же ложе.
 */
function smoothFlow(src: Array<{ u: number; z: number; w: number; bed: number; y: number }>) {
  const n = src.length;
  const bed = src.map((q) => q.bed);
  const uu = src.map((q) => q.u);
  // три прохода скользящего среднего по пяти точкам, концы держим
  for (let pass = 0; pass < 3; pass++) {
    const b2 = bed.slice();
    const u2 = uu.slice();
    for (let i = 2; i < n - 2; i++) {
      b2[i] = (bed[i - 2] + bed[i - 1] + bed[i] + bed[i + 1] + bed[i + 2]) / 5;
      u2[i] = (uu[i - 2] + uu[i - 1] + uu[i] + uu[i + 1] + uu[i + 2]) / 5;
    }
    for (let i = 0; i < n; i++) { bed[i] = b2[i]; uu[i] = u2[i]; }
  }
  // снова строго вниз
  for (let i = 1; i < n; i++) bed[i] = Math.min(bed[i], bed[i - 1] - FLOW_MIN_DROP * 2.5);
  const coarse = src.map((q, i) => ({ u: uu[i], z: q.z, w: q.w, bed: bed[i], y: bed[i] + FLOW_THICK }));
  // Катмулл-Ром: по два подшага между узлами
  const cr = (p0: number, p1: number, p2: number, p3: number, t: number): number =>
    0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  const out: typeof coarse = [];
  for (let i = 0; i + 1 < n; i++) {
    const a = coarse[Math.max(0, i - 1)], b = coarse[i], c = coarse[i + 1], d = coarse[Math.min(n - 1, i + 2)];
    for (let k = 0; k < 2; k++) {
      const t = k / 2;
      out.push({
        u: cr(a.u, b.u, c.u, d.u, t), z: cr(a.z, b.z, c.z, d.z, t), w: cr(a.w, b.w, c.w, d.w, t),
        bed: cr(a.bed, b.bed, c.bed, d.bed, t), y: 0,
      });
    }
  }
  out.push(coarse[n - 1]);
  // сплайн может слегка «переболтать» — прижимаем ещё раз и ставим верх
  for (let i = 0; i < out.length; i++) {
    if (i > 0) out[i].bed = Math.min(out[i].bed, out[i - 1].bed - FLOW_MIN_DROP * 1.2);
    out[i].y = out[i].bed + FLOW_THICK;
  }
  return out;
}

/** габарит языка (с запасом 3 полуширины) — считается один раз */
function flowBBox(pts: Array<{ u: number; z: number; w: number }>): { u0: number; u1: number; z0: number; z1: number } {
  let u0 = Infinity, u1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  for (const q of pts) {
    const m = q.w * 3;
    u0 = Math.min(u0, q.u - m); u1 = Math.max(u1, q.u + m);
    z0 = Math.min(z0, q.z - m); z1 = Math.max(z1, q.z + m);
  }
  return { u0, u1, z0, z1 };
}

/** площадка k → чаши (0–2) */
export function siteAt(k: number): Pool[] {
  const lb = lab();
  if (lb) return lb[k] ? [lb[k]] : [];
  const hit = siteCache.get(k);
  if (hit !== undefined) return hit;
  const res: Pool[] = [];
  const z0 = k * SITE_STEP + 60;
  const roll = hash2(k * 31 + 7, 101);
  // ★ РАЗБАВЛЯЕМ. Подряд стоящие озёра (да ещё парные) сбивались в кластер,
  // сквозь который не проехать. Два правила: (1) после площадки с озером
  // следующая берётся реже (0.86 → 0.6), (2) в каждом километре есть «окно» —
  // ~250 м склона без лавы вовсе, где можно перевести дух.
  const prevRoll = hash2((k - 1) * 31 + 7, 101);
  const prevHad = prevRoll < 0.86;
  const pTake = prevHad ? 0.6 : 0.9;
  const km = Math.floor(z0 / 1000);
  const gap0 = hash2(km * 53 + 9, 77) * 750;
  const zk = z0 - km * 1000;
  const breather = zk > gap0 && zk < gap0 + 250;
  if (z0 > LAVA_START && volcanoWeight(z0) > 0.7 && !breather && roll < pTake) {
    const seed = k * 17 + 3;
    const z = z0 + (hash2(seed, 5) - 0.5) * 80;
    // чаша заходит на коридор трассы, но всегда оставляет проезд сбоку.
    // ★ СТОРОНЫ ЧЕРЕДУЮТСЯ: площадки стоят часто, и соседние озёра по одной
    // стороне сливались бы языком одного в чашу другого. Через раз — левое,
    // правое; редкий сбой чередования оставляет расстановку живой.
    const side = ((k & 1) === 0 ? -1 : 1) * (hash2(seed, 6) < 0.15 ? -1 : 1);
    const u = pisteCenterX(z) + side * (10 + hash2(seed, 7) * 26);
    const R = 16 + hash2(seed, 8) * 14;
    const kind: PoolKind = hash2(seed, 10) < 0.5 ? 'dam' : 'spill';
    const p: Pool = {
      id: k * 2, u, z, R,
      L: 0, depth: 4.5 + R * 0.12, rimH: kind === 'dam' ? 3.2 : 2.4, kind,
      shore: makeShore(seed, 0.7 + hash2(seed, 44) * 0.6),
      pit: null, flow: null,
    };
    p.L = natural(u, z) - 1.4;
    if (kind === 'spill') {
      const tr = traceFlow(p, seed);
      // колодцы разные: от узкой щели до широкой чаши, глубина тоже гуляет
      const pr = 6 + hash2(seed, 14) * 10;
      p.pit = makePit(tr.endU, tr.endZ + pr + 3, pr, 9 + hash2(seed, 15) * 8, seed + 1);
      p.flow = { pts: tr.pts, bbox: flowBBox(tr.pts) };
    }
    res.push(p);
    // ★ «МАЛО ЛАВЫ»: на половине площадок по другую сторону трассы лежит второе
    // озеро поменьше — без языка (языки на той стороне у соседей), просто
    // запруда. Так лава видна с обеих сторон коридора, а проезд остаётся.
    // парное озеро — только если соседняя площадка выше по склону пуста
    if (hash2(seed, 21) < 0.55 && !prevHad) {
      const z2 = z + (hash2(seed, 22) - 0.5) * 60;
      const R2 = 10 + hash2(seed, 24) * 9;
      // проезд ≥ 14 м: если первое озеро заходит за ось, второе отодвигаем
      const near1 = (u - pisteCenterX(z)) * side - R;
      const off2 = R2 + Math.max(8 + hash2(seed, 23) * 10, 14 - Math.min(0, near1));
      const u2 = pisteCenterX(z2) - side * off2;
      const q: Pool = {
        id: k * 2 + 1, u: u2, z: z2, R: R2,
        L: 0, depth: 4 + R2 * 0.12, rimH: 2.8, kind: 'dam',
        shore: makeShore(seed + 9, 0.7 + hash2(seed, 45) * 0.6),
        pit: null, flow: null,
      };
      q.L = natural(u2, z2) - 1.4;
      res.push(q);
    }
  } else if (z0 > LAVA_START && volcanoWeight(z0) > 0.7 && !breather && roll > 0.93) {
    // одиночный провал без озера: колодец посреди склона
    const seed = k * 17 + 5;
    const z = z0 + (hash2(seed, 5) - 0.5) * 80;
    const u = pisteCenterX(z) + (hash2(seed, 6) - 0.5) * 40;
    const pit = makePit(u, z, 7 + hash2(seed, 8) * 9, 9 + hash2(seed, 9) * 8, seed);
    res.push({ id: k * 2, u, z, R: 0, L: pit.L, depth: 0, rimH: 0, kind: 'dam', shore: pit.shore, pit, flow: null });
  }
  siteCache.set(k, res);
  return res;
}

/**
 * чаши в полосе z±range (по центрам).
 * ★ КЭШ ПО КОРЗИНАМ z: terrainHeight зовёт poolCarve на КАЖДУЮ выборку (чанки,
 * дальний план, физика — десятки тысяч раз в секунду), и собирать список заново
 * с аллокацией было дороже самих формул. Корзина 64 м, ключ — (корзина, range).
 */
const nearCache = new Map<number, Pool[]>();
export function invalidatePoolCache(): void {
  nearCache.clear();
}
export function poolsNear(z: number, range = 400): Pool[] {
  const key = Math.floor(z / 64) * 4096 + Math.round(range);
  const hit = nearCache.get(key);
  if (hit) return hit;
  const res = poolsNearRaw(z, range + 64);
  if (nearCache.size > 512) nearCache.clear();
  nearCache.set(key, res);
  return res;
}
function poolsNearRaw(z: number, range: number): Pool[] {
  const out: Pool[] = [];
  const lb = lab();
  if (lb) {
    for (const p of lb) if (Math.abs(p.z - z) < range + 200) out.push(p);
    return out;
  }
  const k0 = Math.floor((z - range) / SITE_STEP) - 1;
  const k1 = Math.floor((z + range) / SITE_STEP) + 1;
  for (let k = k0; k <= k1; k++) {
    for (const p of siteAt(k)) out.push(p);
  }
  return out;
}

// ─── Форма чаши в рельефе ─────────────────────────────────────────────────

const smooth01 = (t: number): number => {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
};

/**
 * Целевая высота чаши в точке (u,z) и вес её влияния 0..1.
 * dn — расстояние к центру в долях радиуса берега R(θ):
 *  dn < 1 — дно: L − depth·(1 − dn²)² (у берега касательная горизонтальна);
 *  1..1.2 — вал поднимается до L + rimH (у слива — прорезь до L − 0.5);
 *  1.2..1.9 — вал сходит к естественному рельефу.
 */
function poolShape(p: Pool, u: number, z: number): { h: number; w: number } | null {
  const du = u - p.u;
  const dz = z - p.z;
  const outer = p.R * 2.3;
  if (du > outer || du < -outer || dz > outer || dz < -outer) return null;
  const d = Math.hypot(du, dz);
  if (d > outer) return null;
  const th = Math.atan2(dz, du);
  const Rs = shoreR(p.R, p.shore, th);
  const dn = d / Rs;
  let h: number;
  if (dn < 1) {
    const k = 1 - dn * dn;
    h = p.L - p.depth * k * k;
  } else {
    let rim = p.rimH;
    if (p.kind === 'spill') {
      // прорезь: сектор ±28° вокруг направления вниз по склону (+z, θ = 90°)
      const ang = Math.abs(Math.atan2(Math.sin(th - Math.PI / 2), Math.cos(th - Math.PI / 2)));
      const notch = 1 - smooth01((ang - 0.3) / 0.25);
      rim = rim * (1 - notch) + -0.5 * notch;
    }
    // ★ ВАЛ ПОЛОГИЙ: на него надо МОЧЬ заехать. Подъём растянут на треть радиуса
    // (у R=20 это ~7 м на 4 м высоты — 30°), гребень широкий, спуск наружу долгий.
    h = p.L + rim * smooth01((dn - 1) / 0.35);
  }
  const w = 1 - smooth01((dn - 1.35) / 0.9);
  return { h, w };
}

function pitShape(t: Pit, u: number, z: number): { h: number; w: number } | null {
  const outer = t.R * 1.9;
  if (Math.abs(u - t.u) > outer || Math.abs(z - t.z) > outer) return null;
  const d = Math.hypot(u - t.u, z - t.z);
  if (d > outer) return null;
  const th = Math.atan2(z - t.z, u - t.u);
  const Rs = shoreR(t.R, t.shore, th);
  const dn = d / Rs;
  let h: number;
  if (dn < 1) {
    // колодец: стенки почти отвесные — дно плоское, у кромки резкий подъём
    const k = 1 - Math.pow(dn, 6);
    h = t.L - t.depth * 0.45 * k;
  } else {
    // над кромкой невысокий отвал, дальше — склон
    h = t.L + t.depth * 0.55 + 1.2 * smooth01((dn - 1) / 0.25);
  }
  const w = 1 - smooth01((dn - 1.25) / 0.6);
  return { h, w };
}

/** ближайшая точка осевой языка: [расстояние, ложе, полуширина] или null */
function flowNearest(f: Flow, u: number, z: number, out: number[]): boolean {
  const pts = f.pts;
  let best = Infinity;
  for (let i = 0; i + 1 < pts.length; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    if (z < Math.min(a.z, b.z) - 16 || z > Math.max(a.z, b.z) + 16) continue;
    const ux = b.u - a.u;
    const uz = b.z - a.z;
    const l2 = ux * ux + uz * uz || 1e-4;
    let t = ((u - a.u) * ux + (z - a.z) * uz) / l2;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    const d = Math.hypot(u - (a.u + ux * t), z - (a.z + uz * t));
    if (d < best) {
      best = d;
      out[0] = d;
      out[1] = a.bed + (b.bed - a.bed) * t;
      out[2] = a.w + (b.w - a.w) * t;
    }
  }
  return best < Infinity;
}
const FN_TMP = [0, 0, 0];

/**
 * ★ ЯЗЫК — ЭТО РУСЛО, А НЕ ПОЛОСКА. Под лентой в склоне прорезан жёлоб:
 * ложе ниже естественного рельефа, борта — невысокие валики застывшей корки
 * (леве). Расплав лежит В жёлобе, и берега видны — это и читается жидкостью.
 * Ложе задано точками языка и монотонно, поэтому и жёлоб идёт только вниз.
 */
function flowShape(f: Flow, u: number, z: number): { h: number; w: number } | null {
  const bb = f.bbox;
  if (bb && (u < bb.u0 || u > bb.u1 || z < bb.z0 || z > bb.z1)) return null;
  if (!flowNearest(f, u, z, FN_TMP)) return null;
  const d = FN_TMP[0];
  const bed = FN_TMP[1];
  const hw = FN_TMP[2];
  if (d > hw * 2.6) return null;
  const dn = d / hw;
  let h: number;
  if (dn < 1) {
    // корытообразное ложе: у оси глубже, к бортам выполаживается
    h = bed + 0.35 * dn * dn;
  } else {
    // леве: валик 0.55 м, спадает к склону
    h = bed + 0.35 + 0.55 * (1 - smooth01((dn - 1) / 0.6));
  }
  const w = 1 - smooth01((dn - 1.4) / 1.2);
  return { h, w };
}

/**
 * Вклад чаш в рельеф: возвращает СМЕЩЕНИЕ, которое terrainBase прибавляет к
 * своей высоте. Вырез считается как lerp(natural, target, w) — поэтому здесь
 * нужен natural, и его передают снаружи.
 */
export function poolCarve(u: number, z: number, naturalH: number): number {
  if (carveOff) return 0;
  let h = naturalH;
  // ★ ОКНО ПОИСКА ШИРЕ ЧАШИ: провал и язык лежат до 200 м НИЖЕ центра озера
  for (const p of poolsNear(z, 320)) {
    if (p.R > 0) {
      const s = poolShape(p, u, z);
      if (s) h = h + (s.h - h) * s.w;
    }
    if (p.pit) {
      const s = pitShape(p.pit, u, z);
      if (s) h = h + (s.h - h) * s.w;
    }
    if (p.flow) {
      const s = flowShape(p.flow, u, z);
      // русло только режет: там, где склон и так ниже ложа, ничего не насыпаем
      if (s && s.h < h + 0.9) h = h + (s.h - h) * s.w;
    }
  }
  return h - naturalH;
}

// ─── Физика ────────────────────────────────────────────────────────────────

/** внутри уреза озера или колодца? возвращает уровень зеркала */
export function poolLevelAt(u: number, z: number): number | null {
  for (const p of poolsNear(z, 320)) {
    if (p.R > 0) {
      const th = Math.atan2(z - p.z, u - p.u);
      if (Math.hypot(u - p.u, z - p.z) < shoreR(p.R, p.shore, th)) return p.L;
    }
    if (p.pit) {
      const t = p.pit;
      const th = Math.atan2(z - t.z, u - t.u);
      if (Math.hypot(u - t.u, z - t.z) < shoreR(t.R, t.shore, th)) return t.L;
    }
  }
  return null;
}

/** язык под точкой: верх расплава и доля к оси (1 — ось, 0 — край); null — нет */
export function flowAt(u: number, z: number): { y: number; k: number } | null {
  let best: { y: number; k: number } | null = null;
  for (const p of poolsNear(z, 320)) {
    const f = p.flow;
    if (!f) continue;
    const pts = f.pts;
    for (let i = 0; i + 1 < pts.length; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      if (z < Math.min(a.z, b.z) - 8 || z > Math.max(a.z, b.z) + 8) continue;
      const ux = b.u - a.u;
      const uz = b.z - a.z;
      const l2 = ux * ux + uz * uz || 1e-4;
      let t = ((u - a.u) * ux + (z - a.z) * uz) / l2;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const cu = a.u + ux * t;
      const cz = a.z + uz * t;
      const w = a.w + (b.w - a.w) * t;
      const d = Math.hypot(u - cu, z - cz);
      if (d < w) {
        const k = 1 - d / w;
        // верх горба — та же формула, что у меша (tongueY): по оси выше всего
        const side = 1 - k;
        // у истока горба нет (см. buildRibbon): та же оценка по пройденной длине
        const along = Math.min(1, (i + t) * 2.5 / 14);
        const H = Math.min(TONGUE_MAX, w * TONGUE_H) * along;
        const y = a.y + (b.y - a.y) * t + H * Math.sqrt(Math.max(0, 1 - side * side));
        if (!best || k > best.k) best = { y, k };
      }
    }
  }
  return best;
}

/** прокал земли рядом с расплавом 0..1 — по нему красится рельеф и греется доска */
export function poolHeatAt(u: number, z: number): number {
  let best = 0;
  for (const p of poolsNear(z, 320)) {
    if (p.R > 0) {
      const d = Math.hypot(u - p.u, z - p.z);
      const R = p.R * 1.25;
      if (d < R + 30) best = Math.max(best, 1 - Math.max(0, d - R) / 30);
    }
    if (p.pit) {
      const d = Math.hypot(u - p.pit.u, z - p.pit.z);
      const R = p.pit.R * 1.2;
      if (d < R + 26) best = Math.max(best, 1 - Math.max(0, d - R) / 26);
    }
  }
  const f = flowAt(u, z);
  if (f) best = Math.max(best, 0.6 + 0.4 * f.k);
  return Math.min(1, best);
}

/** застывшая корка по берегам: земля чуть выше зеркала и рядом с урезом */
export function poolCrustAt(u: number, z: number, groundY: number): number {
  let best = 0;
  for (const p of poolsNear(z, 320)) {
    if (p.R > 0) {
      const d = Math.hypot(u - p.u, z - p.z);
      if (d < p.R * 1.6) {
        const above = groundY - p.L;
        if (above >= -0.5 && above <= 6) best = Math.max(best, 1 - Math.max(0, above) / 6);
      }
    }
  }
  return best;
}

/**
 * Плоские списки для GPU-раскраски чанков (см. chunkshade.ts):
 * circles [u,z,R,fall], nodes [u,z,wL,wR], lakes [u,z,r,y]
 */
export function poolListsFor(z0: number, z1: number): { circles: number[]; nodes: number[]; lakes: number[] } {
  const circles: number[] = [];
  const nodes: number[] = [];
  const lakes: number[] = [];
  const zc = (z0 + z1) * 0.5;
  for (const p of poolsNear(zc, 200 + (z1 - z0))) {
    if (p.R > 0) {
      circles.push(p.u, p.z, p.R * 1.25, 30);
      lakes.push(p.u, p.z, p.R, p.L);
    }
    if (p.pit) {
      circles.push(p.pit.u, p.pit.z, p.pit.R * 1.2, 26);
      lakes.push(p.pit.u, p.pit.z, p.pit.R, p.pit.L);
    }
    if (p.flow) for (const q of p.flow.pts) nodes.push(q.u, q.z, q.w, q.w);
  }
  return { circles, nodes, lakes };
}

// ─── Лаборатория ───────────────────────────────────────────────────────────

/**
 * ★ ТЕСТОВЫЙ СТЕНД (?lab=lava): вместо генератора — ручная расстановка всех
 * видов лавы подряд на короткой полосе, чтобы итерировать быстро. Игрок
 * спавнится прямо над ней (см. main.ts).
 */
export const LAB_Z0 = VOLCANO_FROM + 1250; // полоса без желобов на сиде 1577250840
export function installLavaLab(): void {
  labMode = true;
  labSites = null;
  siteCache.clear();
  nearCache.clear();
}
function buildLab(): Pool[] {
  const mk = (id: number, du: number, dz: number, R: number, kind: PoolKind, seed: number): Pool => {
    const z = LAB_Z0 + dz;
    const u = pisteCenterX(z) + du;
    const p: Pool = {
      id, u, z, R, L: 0, depth: 4.5 + R * 0.12, rimH: kind === 'dam' ? 4.2 : 3.4, kind,
      shore: makeShore(seed, 0.7 + hash2(seed, 44) * 0.6),
      pit: null, flow: null,
    };
    p.L = natural(u, z) - 1.4;
    if (kind === 'spill') {
      const tr = traceFlow(p, seed);
      const pr = 6 + hash2(seed, 14) * 10;
      p.pit = makePit(tr.endU, tr.endZ + pr + 3, pr, 9 + hash2(seed, 15) * 8, seed + 1);
      p.flow = { pts: tr.pts, bbox: flowBBox(tr.pts) };
    }
    return p;
  };
  return [
    mk(0, -12, 120, 20, 'dam', 1),     // озеро с плотиной у трассы
    mk(1, 22, 380, 16, 'spill', 2),    // озеро со сливом → язык → провал
    (() => {                            // одиночный провал
      const z = LAB_Z0 + 720;
      const u = pisteCenterX(z) + 4;
      const pit = makePit(u, z, 12, 13, 5);
      return { id: 2, u, z, R: 0, L: pit.L, depth: 0, rimH: 0, kind: 'dam' as PoolKind, shore: pit.shore, pit, flow: null };
    })(),
    mk(3, -30, 960, 26, 'spill', 3),   // большое озеро со сливом
    mk(4, 0, 1280, 18, 'dam', 4),      // плотина прямо на оси — надо объезжать
  ];
}


// ─── Рендер ────────────────────────────────────────────────────────────────

/** сколько волн от доски помним */
const WAVES = 8;

/** ячеистый шум: расстояние до границы двух ближайших центров (d2 − d1) */
// ★ хэш решётки — целочисленный: sin() на мировых координатах порядка 10⁴ и выше
// на Apple GPU даёт NaN, и узор превращался в светлые плиты
const lhash = Fn(([p0]: [N]) => {
  const p: N = floor(p0);
  const h = uint(int(p.x)).mul(uint(374761393)).add(uint(int(p.y)).mul(uint(668265263))).toVar();
  h.assign(h.bitXor(h.shiftRight(uint(13))).mul(uint(1274126177)));
  return float(h.bitXor(h.shiftRight(uint(16)))).div(4294967295.0);
});
const lnoise = Fn(([p]: [N]) => {
  const i: N = floor(p);
  const f0: N = fract(p);
  const f = f0.mul(f0).mul(f0.mul(-2.0).add(3.0));
  return mix(
    mix(lhash(i), lhash(i.add(vec2(1, 0))), f.x),
    mix(lhash(i.add(vec2(0, 1))), lhash(i.add(vec2(1, 1))), f.x),
    f.y
  );
});
const lfbm = Fn(([p]: [N]) =>
  lnoise(p).mul(0.55).add(lnoise(p.mul(2.1).add(5.0)).mul(0.3)).add(lnoise(p.mul(4.7).sub(3.0)).mul(0.15))
);
const cells = Fn(([p, s1, s2]: [N, N, N]) => {
  const ip: N = floor(p);
  const fp: N = fract(p);
  const d1 = float(8.0).toVar();
  const d2 = float(8.0).toVar();
  // ★ БЕЗ ВЕТВЛЕНИЯ. Цепочка If/ElseIf внутри вложенных Loop давала на GPU
  // широкие полосы «d1 == d2» (шов раздувался в плиту шириной с ячейку).
  // Два минимума ведём арифметикой: новый второй = min(старый второй,
  // max(dd, старый первый)); новый первый = min(старый первый, dd).
  // ★ ВЛОЖЕННЫМ ЦИКЛАМ — РАЗНЫЕ ИМЕНА (`name: 'j'`), иначе TSL зовёт оба
  // счётчика `i`, внутренний затеняет внешний и перебирается лишь диагональ.
  Loop({ start: -1, end: 2, type: 'int', condition: '<', name: 'j' } as N, ({ j }: N) => {
    Loop({ start: -1, end: 2, type: 'int', condition: '<' }, ({ i }: { i: N }) => {
      const g = vec2(float(i), float(j));
      const o = vec2(lhash(ip.add(g).add(s1)), lhash(ip.add(g).add(s2)));
      const dd = length(g.add(o).sub(fp));
      d2.assign(min(d2, max(dd, d1)));
      d1.assign(min(d1, dd));
    });
  });
  return d2.sub(d1);
});

/**
 * ★ ШЕЙДЕР РАСПЛАВА. Настоящая лава — это тёмная корка из плит, между которыми
 * светятся швы, и жар меняется по температуре: от почти чёрного базальта через
 * багровый и оранжевый к жёлто-белому в самых горячих щелях. Корка ДЫШИТ:
 * плиты медленно плывут (конвекция), швы то расходятся, то смыкаются, редкие
 * пузыри вспучивают поверхность и лопаются, а от доски по расплаву идут кольца.
 * aKind: 0 — озеро (плиты плывут вихрем к центру), 1 — язык (плиты текут вниз).
 */
function buildLavaMaterial(uTime: N, uWaves: N, uFogColor: N, uFogNear: N, uFogFar: N, side: THREE.Side = THREE.FrontSide): ShaderLike<THREE.MeshLambertNodeMaterial> {
  // ★ КОРКА ОСВЕЩАЕТСЯ, РАСПЛАВ СВЕТИТСЯ. Неосвещаемый материал не давал форме
  // читаться: горб языка оставался плоской заливкой, сколько ни рисуй светотень
  // руками. Теперь тёмная корка — обычный ламберт (солнце, полусфера, лампы
  // лавы лепят скаты горба по нормалям), а жар идёт в emissive поверх.
  // ★ ТОЛЬКО ЛИЦЕВАЯ СТОРОНА у зеркал и языков: снизу их видеть нельзя — сквозь
  // прорезь слива изнанка диска висела в воздухе огромным полосатым парусом.
  // Струя в провал — исключение (DoubleSide).
  const m = withUniforms(
    psx(new THREE.MeshLambertNodeMaterial({ fog: false, transparent: false, side })),
    { uTime, uWaves, uFogColor, uFogNear, uFogFar }
  );
  const aKind: N = attribute('aKind', 'float');
  const aInfo: N = attribute('aInfo', 'vec3'); // озеро: (cx, cz, R); язык: (t вдоль, сторона -1..1, полуширина)

  // волны от доски: кольца от последних касаний, гаснут по времени и с расстоянием
  const waveH = Fn(([wp]: [N]) => {
    const h = float(0.0).toVar();
    Loop({ start: 0, end: WAVES, type: 'int', condition: '<' }, ({ i }: { i: N }) => {
      const w: N = uWaves.element(i);
      const age = uTime.sub(w.z);
      If(age.greaterThan(0.0).and(age.lessThan(3.0)).and(w.w.greaterThan(0.001)), () => {
        const d = length(wp.sub(w.xy));
        const front = age.mul(6.0); // скорость кольца, м/с
        const ring = exp(d.sub(front).abs().mul(-0.9)).mul(sin(d.mul(2.2).sub(age.mul(9.0))));
        h.addAssign(ring.mul(w.w).mul(age.div(3.0).oneMinus()).mul(smoothstep(0.0, 1.5, d)));
      });
    });
    return h;
  });

  // ★ ПОВЕРХНОСТЬ ДЫШИТ. Вершины ходят по мелкой волне и по кольцам от доски.
  m.positionNode = Fn(() => {
    const p = positionLocal.toVar();
    const wp: N = positionWorld.xz;
    const w1 = lnoise(wp.mul(0.08).add(vec2(0.0, uTime.mul(-0.25))));
    const w2 = lnoise(wp.mul(0.23).add(vec2(uTime.mul(0.11), uTime.mul(-0.6))));
    p.y.addAssign(w1.sub(0.5).mul(0.28).add(w2.sub(0.5).mul(0.12)).add(waveH(wp).mul(0.35)));
    // ★ ВОРОНКА ПОД ЛАВОЙ ЗАПОЛНЯЕТСЯ, А НЕ ПОВТОРЯЕТСЯ. Жидкость не идёт «вниз и
    // снова вверх» по дну ямы: зеркало озера остаётся зеркалом (провал под ним —
    // под водой), а язык над воронкой просто становится толще — его тело держит
    // уровень, и только КРАЯ (фартук) следуют за просевшей землёй, чтобы между
    // лавой и склоном не было щели.
    const dip = damage.damageNode(wp).dip;
    const edgeFollow = select(aKind.lessThan(0.5), float(0.0), smoothstep(0.65, 1.15, abs(aInfo.y)));
    p.y.subAssign(dip.mul(edgeFollow));
    return p;
  })();

  const hotFn = Fn(() => {
    const wp: N = positionWorld.xz;
    const kind: N = aKind;
    const info: N = aInfo;
    // домен узора: у озера — медленный вихрь к центру, у языка — течение вниз
    const dom = vec2(0.0).toVar();
    If(kind.lessThan(0.5), () => {
      const c = info.xy;
      const rel = wp.sub(c);
      const r = length(rel).max(0.001);
      const ang = float(0.0).toVar();
      // atan через компоненты — вращаем домен вокруг центра со временем,
      // ближе к центру быстрее: конвекционная воронка
      // ★ ДИФФЕРЕНЦИАЛЬНЫЙ ПОВОРОТ ОГРАНИЧЕН. Пока ячейки были сломаны, это
      // не читалось, а с честным Вороным неограниченный сдвиг «центр быстрее
      // края» за минуту наматывал плиты в концентрические спирали. Вихрь теперь
      // качается вокруг общего медленного вращения — плиты плывут, но не
      // закручиваются в кольца.
      const rot = uTime.mul(0.03).add(sin(uTime.mul(0.12)).mul(0.5).mul(info.z.div(r).min(3.0)));
      const cs = cos(rot);
      const sn = sin(rot);
      const rr = vec2(rel.x.mul(cs).sub(rel.y.mul(sn)), rel.x.mul(sn).add(rel.y.mul(cs)));
      dom.assign(rr.mul(0.24));
      void ang;
    }).ElseIf(kind.lessThan(1.5), () => {
      // язык: координата вдоль течёт вниз, поперёк сжата — плиты вытянуты
      dom.assign(vec2(info.y.mul(info.z).mul(0.35), info.x.mul(0.22).sub(uTime.mul(0.9))));
    }).Else(() => {
      // струя: узор летит вниз втрое быстрее, поперёк — тонкие нити
      dom.assign(vec2(info.y.mul(info.z).mul(0.6), info.x.mul(0.35).sub(uTime.mul(3.2))));
    });
    // лёгкое искажение домена, чтобы решётка не читалась решёткой
    // ★ ЭКОНОМИЯ ЗАЛИВКИ: вблизи расплав занимает полкадра, и каждая октава здесь
    // умножается на сотню тысяч пикселей. Искажение домена — одной октавой.
    const warp = vec2(lnoise(dom.mul(0.5).add(3.0)), lnoise(dom.mul(0.5).sub(7.0))).sub(0.5).mul(1.1);
    const pd = dom.add(warp);
    // плиты корки и швы
    const seam = smoothstep(0.0, 0.11, cells(pd, 0.5, 17.3)).oneMinus();
    const fine = smoothstep(0.0, 0.16, cells(pd.mul(2.6), 5.1, 91.7)).oneMinus().mul(0.5);
    // жар: где швы шире и где «нагрето» медленным шумом; ядро озера горячее краёв
    const heatField = lnoise(wp.mul(0.05).add(vec2(uTime.mul(0.03), 0.0))).mul(0.7).add(lnoise(wp.mul(0.13).add(5.0)).mul(0.3));
    const edgeK = float(1.0).toVar();
    If(kind.lessThan(0.5), () => {
      const r = length(wp.sub(info.xy)).div(info.z.max(0.1));
      edgeK.assign(smoothstep(1.05, 0.5, r).mul(0.7).add(0.3));
    }).Else(() => {
      edgeK.assign(abs(info.y).oneMinus().mul(0.75).add(0.25));
    });
    // пузыри: редкие ячейки вспыхивают своей фазой, поверхность вспучивается
    const bp = wp.mul(0.35);
    const bph = lhash(floor(bp)).mul(6.283);
    const pulse = max(0.0, sin(uTime.mul(1.4).add(bph)));
    const bub = pulse.mul(pulse).mul(pulse).mul(smoothstep(0.42, 0.06, length(fract(bp).sub(0.5))));
    // кольца от доски подсвечивают гребни
    const wv = waveH(wp);

    // ★ КОРКА ТЁМНАЯ, СВЕТЯТСЯ ШВЫ. Первый заход горел целиком: блум пост-обработки
    // (порог 0.72) размазывал яркое ядро в сплошной жёлтый блин. Жар остаётся в
    // швах и пузырях, а пиковые значения прижаты — ореол должен быть, но не диск.
    // ★ ОБЪЁМ ЧИТАЕТСЯ СВЕТОТЕНЬЮ. Материал не освещаемый, поэтому «форму»
    // горба даём сами: верх светлее, скаты темнее, фартук за кромкой — тёмная
    // корка, уходящая в землю. У озера у берега — корка, тлеющая слабее.
    const sideA = abs(info.y);
    const bodyShade = select(
      kind.greaterThan(0.5),
      smoothstep(1.0, 0.0, sideA).mul(0.5).add(0.5),
      float(1.0)
    );
    const apron = select(kind.greaterThan(0.5), smoothstep(0.98, 1.2, sideA), float(0.0));
    const shoreK = select(
      kind.lessThan(0.5),
      smoothstep(1.06, 0.82, length(wp.sub(info.xy)).div(info.z.max(0.1))),
      float(1.0)
    );
    const glow = seam.mul(0.7).add(fine.mul(0.25)).add(bub.mul(1.1)).add(max(0.0, wv).mul(0.7));
    // язык — открытое русло: по оси расплав, корка только у краёв
    // ★ ДВИЖЕНИЕ ВИДНО. Одного скольжения домена мало: по руслу идут ВОЛНЫ
    // яркости — тёплые гребни бегут вниз по течению (в струе — быстрее), а
    // между ними корка темнее. Глаз ловит именно ход гребней.
    const speed = select(kind.greaterThan(1.5), 7.5, 3.2);
    const surge = sin(info.x.mul(0.55).sub(uTime.mul(speed)).add(lnoise(vec2(info.y.mul(2.0), info.x.mul(0.15))).mul(3.0)))
      .mul(0.5).add(0.5);
    const channelBase = smoothstep(1.0, 0.2, abs(info.y));
    const channel = select(kind.greaterThan(0.5), channelBase.mul(surge.mul(0.3).add(0.14)).mul(select(kind.greaterThan(1.5), 1.35, 1.0)), float(0.0));
    const temp = clamp(
      glow.mul(edgeK).mul(heatField.mul(0.8).add(0.4)).add(channel).mul(bodyShade).mul(apron.oneMinus()).mul(shoreK.mul(0.6).add(0.4)),
      0.0, 1.0
    );
    // палитра по температуре: базальт → багровый → оранжевый → жёлто-белый
    const crust = vec3(0.0); // корка теперь в diffuse, здесь только жар
    const c1 = vec3(0.5, 0.045, 0.012);
    const c2 = vec3(1.55, 0.32, 0.045);
    const c3 = vec3(2.5, 1.15, 0.38);
    const col: N = mix(crust, c1, smoothstep(0.05, 0.35, temp)).toVar();
    col.assign(mix(col, c2, smoothstep(0.3, 0.7, temp)));
    col.assign(mix(col, c3, smoothstep(0.68, 1.0, temp)));
    // скаты горба и фартук — темнее: так лента становится телом
    col.mulAssign(bodyShade.mul(0.45).add(0.55));
    col.mulAssign(apron.mul(0.6).oneMinus());
    // ★ ВДАЛИ РАСПЛАВ НЕ БЕЛЕЕТ: bloom растирал бы яркое ядро в снежные кляксы
    const d = length(wp.sub(cameraPosition.xz));
    const far = smoothstep(120.0, 500.0, d);
    col.assign(mix(col, mix(c1, c2, 0.5).mul(0.9), far.mul(0.6)));
    // дымка — тёплой: расплав подсвечивает воздух над собой
    const f = clamp(d.sub(uFogNear).div(uFogFar.sub(uFogNear)), 0.0, 1.0);
    const fogged: N = (uFogColor as N).mul(vec3(1.5, 1.05, 0.85));
    const outCol: N = mix(col, fogged, f.mul(0.85));
    return outCol;
  });
  // корка (освещается) и жар (светится сам) — из одного расчёта
  (m as N).emissiveNode = hotFn();
  m.colorNode = Fn(() => {
    const kind: N = aKind;
    const info: N = aInfo;
    const sideA = abs(info.y);
    const bodyShade = select(kind.greaterThan(0.5), smoothstep(1.0, 0.0, sideA).mul(0.5).add(0.5), float(1.0));
    // тёмный базальт с зерном; ламберт положит на него свет по нормали горба
    return vec4(vec3(0.16, 0.11, 0.1).mul(lnoise(positionWorld.xz.mul(1.3)).mul(0.6).add(0.7)).mul(bodyShade), 1.0);
  })();
  return m;
}

/** одно озеро/колодец: веер вокруг центра, вершины чуть за урезом (прячутся под берег) */
function buildDisk(u0: number, z0: number, R: number, L: number, sh: Shore): THREE.BufferGeometry {
  const SEG = 56;
  const RINGS = 5;
  const pos: number[] = [];
  const info: number[] = [];
  const kind: number[] = [];
  const idx: number[] = [];
  const cx = toWorldX(u0, z0);
  pos.push(cx, L, z0); info.push(cx, z0, R); kind.push(0);
  for (let r = 1; r <= RINGS; r++) {
    const fr = r / RINGS;
    for (let s = 0; s < SEG; s++) {
      const th = (s / SEG) * Math.PI * 2;
      const Rs = shoreR(R, sh, th) * (r === RINGS ? 1.08 : fr);
      const uu = u0 + Math.cos(th) * Rs;
      const zz = z0 + Math.sin(th) * Rs;
      // ★ МЯГКИЙ БЕРЕГ: внешнее кольцо чуть ниже зеркала — расплав у уреза
      // подныривает под берег, а не режет его плоскостью
      const y = r === RINGS ? L - 0.35 : L;
      pos.push(toWorldX(uu, zz), y, zz); info.push(cx, z0, R); kind.push(0);
    }
  }
  const ringStart = (r: number): number => 1 + (r - 1) * SEG;
  // намотка лицом ВВЕРХ: материал односторонний, снизу зеркало не рисуется
  for (let s = 0; s < SEG; s++) idx.push(0, ringStart(1) + ((s + 1) % SEG), ringStart(1) + s);
  for (let r = 1; r < RINGS; r++) {
    for (let s = 0; s < SEG; s++) {
      const a = ringStart(r) + s, b = ringStart(r) + ((s + 1) % SEG);
      const c = ringStart(r + 1) + s, d = ringStart(r + 1) + ((s + 1) % SEG);
      idx.push(a, d, c, a, b, d);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aInfo', new THREE.Float32BufferAttribute(info, 3));
  g.setAttribute('aKind', new THREE.Float32BufferAttribute(kind, 1));
  g.setIndex(idx);
  return g;
}

/** толщина языка по оси (в долях полуширины) и предел, м */
const TONGUE_H = 0.4;
const TONGUE_MAX = 1.6;
/** поперечных сегментов на половину ширины; за |side|>1 — фартук на земле */
const TONGUE_SIDE = 5;
const TONGUE_SPAN = 1.35;

/**
 * Профиль поперёк языка: ★ У ЛАВЫ ЕСТЬ ОБЪЁМ. Плоская лента толщиной в пиксель
 * читалась краской на земле. Тягучий расплав идёт горбом: по оси выше всего,
 * к краям скатывается полукругом и валиком ложится на землю, а за краем идёт
 * тонкий фартук застывшей корки, спрятанный под рельеф — переход к склону
 * получается плавным, без ребра.
 */
function tongueY(bed: number, w: number, side: number, ground: number, hk = 1): number {
  const a = Math.abs(side);
  const H = Math.min(TONGUE_MAX, w * TONGUE_H) * hk;
  if (a <= 1) return bed + FLOW_THICK + H * Math.sqrt(1 - a * a);
  // фартук: от кромки вниз под землю
  const k = (a - 1) / (TONGUE_SPAN - 1);
  return Math.min(bed + FLOW_THICK, ground) - 0.25 - k * 0.5;
}

/** язык: лента по осевой, ширина по точкам, лежит на рельефе */
function buildRibbon(f: Flow): THREE.BufferGeometry {
  const pos: number[] = [];
  const info: number[] = [];
  const kind: number[] = [];
  const idx: number[] = [];
  const pts = f.pts;
  const SIDE = TONGUE_SIDE;
  let along = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const q = pts[Math.min(pts.length - 1, i + 1)];
    const o = pts[Math.max(0, i - 1)];
    if (i > 0) along += Math.hypot(p.u - o.u, p.z - o.z);
    // нормаль к оси в плоскости
    let nx = -(q.z - o.z), nz = q.u - o.u;
    const nl = Math.hypot(nx, nz) || 1;
    nx /= nl; nz /= nl;
    for (let s = -SIDE; s <= SIDE; s++) {
      const side = (s / SIDE) * TONGUE_SPAN;
      const uu = p.u + nx * side * p.w;
      const zz = p.z + nz * side * p.w;
      // у истока горба нет — расплав переливается через прорезь тонким листом и
      // набирает тело за первые метры русла
      const hk = Math.min(1, along / 14);
      const y = tongueY(p.bed, p.w, side, sampleH!(uu, zz), hk);
      pos.push(toWorldX(uu, zz), y, zz);
      info.push(along, side, p.w);
      kind.push(1);
    }
  }
  const W = SIDE * 2 + 1;
  for (let i = 0; i + 1 < pts.length; i++) {
    for (let s = 0; s + 1 < W; s++) {
      const a = i * W + s, b = a + 1, c = a + W, d = c + 1;
      // намотка лицом ВВЕРХ (материал односторонний)
      idx.push(a, d, c, a, b, d);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aInfo', new THREE.Float32BufferAttribute(info, 3));
  g.setAttribute('aKind', new THREE.Float32BufferAttribute(kind, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/**
 * ★ СТРУЯ В ПРОВАЛ. Язык заканчивается на кромке колодца, а зеркало внизу — на
 * несколько метров ниже: между ними расплав ПАДАЕТ. Лента-водопад идёт от конца
 * русла к зеркалу параболой (сначала полого, потом отвесно), kind = 2 — узор
 * течёт по ней быстро вниз, ядро белёсое.
 */
function buildFall(f: Flow, pit: Pit): THREE.BufferGeometry {
  const pts = f.pts;
  const e = pts[pts.length - 1];
  // ★ ЛАВА ТЯГУЧАЯ — ОНА НЕ ЛЕТИТ, А ЛИПНЕТ К СТЕНКЕ. Струя идёт по радиусу к
  // центру колодца и повторяет РЕЛЬЕФ (сам вырез колодца): по кромке, потом по
  // почти отвесной стенке — до самого зеркала. Никакой параболы в воздухе.
  const toC = Math.hypot(pit.u - e.u, pit.z - e.z) || 1;
  const cx = (pit.u - e.u) / toC, cz = (pit.z - e.z) / toC;
  const nx = -cz, nz = cx;
  const step = 0.7;
  const rows: Array<{ u: number; z: number; y: number; t: number }> = [];
  let along = 0;
  for (let i = 0; i < 80; i++) {
    const d = i * step;
    const u = e.u + cx * d;
    const z = e.z + cz * d;
    const ground = sampleH!(u, z);
    const y = Math.max(pit.L + 0.05, ground + 0.35);
    if (i > 0) along += Math.hypot(step, y - rows[rows.length - 1].y);
    rows.push({ u, z, y, t: along });
    if (ground + 0.35 <= pit.L + 0.1) break; // дошли до зеркала
  }
  const SIDE = TONGUE_SIDE;
  const pos: number[] = [];
  const info: number[] = [];
  const kind: number[] = [];
  const idx: number[] = [];
  const w = e.w * 0.9;
  for (const r of rows) {
    for (let sd = -SIDE; sd <= SIDE; sd++) {
      const side = (sd / SIDE) * TONGUE_SPAN;
      const uu = r.u + nx * side * w;
      const zz = r.z + nz * side * w;
      // струя тоже объёмная: горб по оси, фартук по стенке
      const y = tongueY(r.y - FLOW_THICK, w, side, sampleH!(uu, zz));
      pos.push(toWorldX(uu, zz), y, zz);
      info.push(r.t, side, w);
      kind.push(2);
    }
  }
  const W = SIDE * 2 + 1;
  for (let i = 0; i + 1 < rows.length; i++) {
    for (let sd = 0; sd + 1 < W; sd++) {
      const a = i * W + sd, b = a + 1, c = a + W, d = c + 1;
      idx.push(a, d, c, a, b, d);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aInfo', new THREE.Float32BufferAttribute(info, 3));
  g.setAttribute('aKind', new THREE.Float32BufferAttribute(kind, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** список чаш для compute-частиц: [x, z, R, L] */
const PART_POOLS = 12;
const BUBBLES = 900;
const STEAMS = 170;

/**
 * Живая лава в сцене: меши чаш и языков, шейдер, пузыри и пар на compute,
 * лампы и очаги для рельефа.
 */
export class Pools {
  readonly group = new THREE.Group();
  readonly lights: THREE.PointLight[] = [];
  private built = new Map<number, THREE.Object3D>();
  private material: ShaderLike<THREE.MeshLambertNodeMaterial>;
  /** струя — почти вертикальная лента, её видно с обеих сторон */
  private fallMaterial: ShaderLike<THREE.MeshLambertNodeMaterial>;
  private uTime = uniform(0);
  private uWaves = uniformArray(Array.from({ length: WAVES }, () => new THREE.Vector4(0, 0, -100, 0)));
  private waveNext = 0;
  private uFogColor = uniform(new THREE.Color(0x2a1c1c));
  private uFogNear = uniform(300);
  private uFogFar = uniform(2100);
  /** очаги для шейдера рельефа: [x, z, r, s] × 10 */
  readonly glowData = new Float32Array(10 * 4);

  // частицы
  private uPools = uniformArray(Array.from({ length: PART_POOLS }, () => new THREE.Vector4()));
  /** ★ ИЗВЕРЖЕНИЕ по чашам (0..1): пар и фонтан искр идут только пока извергается */
  private uErupt = uniformArray(Array.from({ length: PART_POOLS }, () => 0));
  private uNPools = uniform(0, 'int');
  /** расписание мини-извержений по чашам: ключ — округлённые координаты */
  private erupt = new Map<string, { next: number; until: number; start: number }>();
  /** ★ иногда извержение выплёвывает горящую глыбу — сюда сообщаем откуда */
  onBoulder: ((x: number, y: number, z: number) => void) | null = null;
  private lastBoulder = -100;
  private uDt = uniform(0);
  private bubbleKernel: N;
  private steamKernel: N;
  private bubbles: THREE.Sprite;
  private steam: THREE.Sprite;

  constructor(private renderer: THREE.WebGPURenderer) {
    this.material = buildLavaMaterial(this.uTime, this.uWaves, this.uFogColor, this.uFogNear, this.uFogFar);
    this.fallMaterial = buildLavaMaterial(this.uTime, this.uWaves, this.uFogColor, this.uFogNear, this.uFogFar, THREE.DoubleSide);
    for (let i = 0; i < 3; i++) {
      const l = new THREE.PointLight(0xff3410, 0, 160, 1.6);
      this.lights.push(l);
      this.group.add(l);
    }
    // ★ ПУЗЫРИ И ПАР — COMPUTE. Частица знает свою чашу; кончилась жизнь —
    // рождается заново в случайной точке случайной чаши. Пузырь всплывает и
    // лопается яркой точкой у самого зеркала, пар поднимается медленно, растёт
    // и тает — его видно за сотни метров, и он и есть «лава даёт о себе знать».
    const bub = this.makeParticles(BUBBLES, 0.35, 0.9, 1.6, 0.0);
    this.bubbleKernel = bub.kernel;
    this.bubbles = bub.sprite;
    this.group.add(this.bubbles);
    // ★ СТОЛБ ПАРА ВИДЕН ИЗДАЛЕКА: живёт дольше и поднимается быстрее — клубы
    // уходят на 40–50 м, а не на пятнадцать (озеро надо замечать за сотни метров)
    // ★ ТЕПЕРЬ ЭТО СТОЛБ ИЗВЕРЖЕНИЯ, а не постоянный пар: идёт только пока чаша
    // извергается, поднимается быстро и высоко (60+ м) — видно издалека
    const st = this.makeParticles(STEAMS, 8.0, 11.0, 14.0, 1.0);
    this.steamKernel = st.kernel;
    this.steam = st.sprite;
    this.group.add(this.steam);
  }

  private makeParticles(count: number, life: number, rise: number, size: number, isSteam: number): { kernel: N; sprite: THREE.Sprite } {
    const posBuf = instancedArray(new Float32Array(count * 3), 'vec3');
    const stBuf = instancedArray(new Float32Array(count * 4), 'vec4'); // age, life, seed, pool
    const uPools = this.uPools;
    const uErupt = this.uErupt;
    const uNPools = this.uNPools;
    const uDt = this.uDt;
    const uTime = this.uTime;
    const kernel = Fn(() => {
      const p = posBuf.element(instanceIndex);
      const s = stBuf.element(instanceIndex);
      const age = s.x.add(uDt).toVar();
      const seed = float(instanceIndex).mul(0.6180339);
      If(age.greaterThan(s.y).or(s.y.lessThanEqual(0.0)), () => {
        // новое рождение
        const h1 = fract(sin(seed.add(uTime.mul(0.37))).mul(43758.5453));
        const h2 = fract(sin(seed.mul(1.7).add(uTime.mul(0.53))).mul(24634.6345));
        const h3 = fract(sin(seed.mul(2.3).add(uTime.mul(0.29))).mul(31578.7451));
        const pi: N = (int(floor(h1.mul(float(uNPools).max(1.0)))) as N).min((uNPools as N).sub(1)).max(0);
        const pool: N = uPools.element(pi);
        const er: N = uErupt.element(pi);
        const ang = h2.mul(6.283);
        // ★ ИЗВЕРЖЕНИЕ: пар (пепельный столб) идёт ТОЛЬКО пока чаша извергается —
        // иначе частица рождается «мёртвой» (жизнь ноль) и на следующем кадре
        // пробует другую чашу. Фонтан искр — узко у центра, покой — по зеркалу.
        const fount = isSteam > 0 ? float(1.0) : er;
        const rad = pool.z.mul(pow(h3, 0.6)).mul(mix(0.92, 0.25, fount));
        p.assign(vec3(pool.x.add(cos(ang).mul(rad)), pool.w, pool.y.add(sin(ang).mul(rad))));
        const lifeK = isSteam > 0 ? select(er.greaterThan(0.05), float(1.0), float(0.0)) : mix(1.0, 9.0, er);
        s.assign(vec4(0.0, float(life).mul(h1.mul(0.7).add(0.65)).mul(lifeK), h2.add(er.mul(2.0)), float(pi)));
      }).Else(() => {
        // s.z хранит seed + 2·er на момент рождения: у извергающихся искр всё быстро
        const erB = s.z.sub(fract(s.z)).div(2.0).clamp(0.0, 1.0);
        // ★ ИСКРЫ ЛЕТЯТ ВЫСОКО: старт 30–48 м/с и честное падение — фонтан
        // на 50–80 м, дуги вниз, видно за километр
        const v0 = fract(s.z).mul(20.0).add(40.0);
        const up = isSteam > 0 ? float(rise) : float(rise * 0.6).add(erB.mul(v0.sub(age.mul(24.0))));
        p.y.addAssign(uDt.mul(up));
        // пар сносит и качает; искры фонтана разлетаются конусом
        p.x.addAssign(sin(uTime.mul(0.7).add(s.z.mul(9.0))).mul(uDt).mul(0.8 * isSteam));
        p.x.addAssign(cos(s.z.mul(37.0)).mul(uDt).mul(erB.mul(7.0)));
        p.z.addAssign(sin(s.z.mul(53.0)).mul(uDt).mul(erB.mul(7.0)));
        s.x.assign(age);
      });
    })().compute(count);

    const posN: N = posBuf.toAttribute();
    const stN: N = stBuf.toAttribute();
    const t: N = stN.x.div(stN.y.max(0.001));
    // доля «извержения» частицы (закодирована в s.z при рождении): искры фонтана крупнее
    const erS: N = stN.z.sub(fract(stN.z)).div(2.0).clamp(0.0, 1.0);
    const cloud = spriteCloud({
      count,
      positionNode: posN,
      // ★ ПОТОЛОК РАЗМЕРА — ПРОТИВ ПЕРЕРИСОВКИ: сто пятьдесят клубов по 400 px
      // заливали полкадра альфой и стоили 3 мс; пар читается и в 140 px.
      k: 120, minPx: isSteam ? 2 : 1.4, maxPx: isSteam ? 110 : 32,
      blending: isSteam ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
      // пар растёт по жизни, пузырь мал и вспыхивает у конца
      sizeN: isSteam
        ? float(size).mul(t.mul(1.6).add(0.4))
        : float(size).mul(smoothstep(0.0, 0.2, t).mul(0.6).add(0.4)).mul(erS.mul(1.6).add(1.0)),
      // столб извержения светлее пепла вокруг — иначе на тёмном небе его не видно
      colN: isSteam
        ? vec3(0.5, 0.42, 0.4).mul(t.mul(0.5).oneMinus().add(0.5))
        : mix(vec3(2.6, 0.5, 0.06), vec3(4.0, 1.7, 0.5), smoothstep(0.7, 1.0, t)),
      alpha: (r2: N) => (isSteam ? smoothstep(1.0, 0.0, r2).mul(0.7) : r2.oneMinus().mul(0.9)),
      alphaN: isSteam ? sin(t.mul(3.14159)).mul(1.0) : sin(t.mul(3.14159)).mul(0.6).add(0.4),
    });
    return { kernel, sprite: cloud.sprite };
  }

  /** доска коснулась расплава: пустить кольцо */
  splash(x: number, z: number, strength: number): void {
    const w = this.uWaves.array as THREE.Vector4[];
    w[this.waveNext % WAVES].set(x, z, this.uTime.value, strength);
    this.waveNext++;
  }

  setFog(color: THREE.Color, near: number, far: number): void {
    this.uFogColor.value.copy(color);
    this.uFogNear.value = near;
    this.uFogFar.value = far;
  }

  update(px: number, pz: number, time: number, dt: number): void {
    this.uTime.value = time;
    this.uDt.value = Math.min(dt, 0.05);
    const near = poolsNear(pz, 520);
    const needed = new Set<number>();
    for (const p of near) {
      needed.add(p.id);
      if (!this.built.has(p.id)) {
        const g = new THREE.Group();
        if (p.R > 0) g.add(new THREE.Mesh(buildDisk(p.u, p.z, p.R, p.L, p.shore), this.material));
        if (p.pit) g.add(new THREE.Mesh(buildDisk(p.pit.u, p.pit.z, p.pit.R, p.pit.L, p.pit.shore), this.material));
        if (p.flow) g.add(new THREE.Mesh(buildRibbon(p.flow), this.material));
        if (p.flow && p.pit) g.add(new THREE.Mesh(buildFall(p.flow, p.pit), this.fallMaterial));
        this.group.add(g);
        this.built.set(p.id, g);
      }
    }
    for (const [id, obj] of this.built) {
      if (needed.has(id)) continue;
      this.group.remove(obj);
      obj.traverse((o) => { if ((o as THREE.Mesh).geometry) (o as THREE.Mesh).geometry.dispose(); });
      this.built.delete(id);
    }

    // очаги, лампы, чаши для частиц — по ближайшим
    const spots: Array<{ x: number; z: number; r: number; L: number; d: number; er?: number }> = [];
    for (const p of near) {
      if (p.R > 0) spots.push({ x: toWorldX(p.u, p.z), z: p.z, r: p.R, L: p.L, d: Math.hypot(toWorldX(p.u, p.z) - px, p.z - pz) });
      if (p.pit) spots.push({ x: toWorldX(p.pit.u, p.pit.z), z: p.pit.z, r: p.pit.R, L: p.pit.L, d: Math.hypot(toWorldX(p.pit.u, p.pit.z) - px, p.pit.z - pz) });
      if (p.flow) {
        const q = p.flow.pts[Math.floor(p.flow.pts.length / 2)];
        spots.push({ x: toWorldX(q.u, q.z), z: q.z, r: q.w * 3, L: q.y, d: Math.hypot(toWorldX(q.u, q.z) - px, q.z - pz) });
      }
    }
    spots.sort((a, b) => a.d - b.d);
    this.glowData.fill(0);
    for (let i = 0; i < Math.min(10, spots.length); i++) {
      const s = spots[i];
      this.glowData[i * 4] = s.x; this.glowData[i * 4 + 1] = s.z;
      this.glowData[i * 4 + 2] = s.r * 3.2; this.glowData[i * 4 + 3] = 1.0;
    }
    for (let i = 0; i < this.lights.length; i++) {
      const l = this.lights[i];
      const s = spots[i];
      if (!s) { l.intensity = 0; continue; }
      l.position.set(s.x, s.L + 4, s.z);
      l.distance = s.r * 6;
      // 9 → 5.5: свет озёр заливал полсклона оранжевым и делал биом светлым;
      // на извержении вспыхивает втрое
      const ek = this.erupt.get(Math.round(s.x / 4) + ',' + Math.round(s.z / 4));
      const flash = ek && time < ek.until ? 2.2 : 0;
      l.intensity = 4.0 * (0.75 + 0.25 * Math.sin(time * 1.3 + i)) * (1 + flash);
    }
    // ★ МИНИ-ИЗВЕРЖЕНИЯ. У каждой чаши своё расписание: раз в 9–20 с она
    // 2.5–4 с фонтанирует искрами и выбрасывает пепельный столб, лампа
    // вспыхивает; иногда (40%) в начале — горящая глыба.
    const arr = this.uPools.array as THREE.Vector4[];
    const erArr = this.uErupt.array as number[];
    let n = 0;
    for (const s of spots) {
      if (n >= PART_POOLS) break;
      if (s.r <= 0) continue;
      const key = Math.round(s.x / 4) + ',' + Math.round(s.z / 4);
      let e = this.erupt.get(key);
      if (!e) {
        e = { next: time + 2 + Math.random() * 12, until: 0, start: 0 };
        this.erupt.set(key, e);
        if (this.erupt.size > 256) this.erupt.clear();
      }
      if (time >= e.next) {
        e.start = time;
        e.until = time + 3 + Math.random() * 2;
        e.next = e.until + 12 + Math.random() * 16;
        // ★ ГЛЫБЫ ДОЗИРОВАНЫ: 18% извержений и не чаще раза в 14 с на всю карту
        if (this.onBoulder && Math.random() < 0.3 && s.d < 500 && time - this.lastBoulder > 9) {
          this.lastBoulder = time;
          this.onBoulder(s.x, s.L, s.z);
        }
      }
      const active = time < e.until;
      const k = active ? Math.min(1, (e.until - time) / 0.6, (time - e.start) * 3) : 0;
      erArr[n] = Math.max(0, Math.min(1, k));
      s.er = erArr[n];
      arr[n++].set(s.x, s.z, s.r, s.L);
    }
    for (let i = n; i < PART_POOLS; i++) erArr[i] = 0;
    this.uNPools.value = n;
    if (n > 0) {
      void this.renderer.compute(this.bubbleKernel);
      void this.renderer.compute(this.steamKernel);
    }
    this.bubbles.visible = n > 0;
    this.steam.visible = n > 0;
  }
}

void normalize; void toValleyU; void min;
