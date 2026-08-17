import * as THREE from 'three/webgpu';
import {
  Fn, If, float, int, ivec2, vec2, vec4, uniform, textureLoad, floor, fract, mix, max, min, select,
} from 'three/tsl';

/**
 * ★ КАРТА ПОВРЕЖДЕНИЙ — ГОРА ПОМНИТ.
 *
 * Раньше следы жили в двух кольцевых буферах (10 воронок, 24 звена реза): что
 * старше — исчезало, а шейдер рельефа перебирал оба списка в каждой вершине и
 * каждом пикселе. Теперь следы лежат в КАРТЕ вокруг игрока: тороидальное окно
 * 384×384 м по 1.5 м на тексель, куда удары ВПИСЫВАЮТСЯ один раз и остаются.
 * Шейдер читает одну выборку; число следов не ограничено ничем, кроме окна.
 *
 * ★ ОДИН ИСТОЧНИК ПРАВДЫ — CPU-МАССИВ. По провалам едет доска, за ними
 * проседает камера, на них лежит колея — физика читает ЭТИ ЖЕ числа, что и
 * GPU получает текстурой (тот же Float32Array, тот же билинейный отсчёт, та же
 * формула свежести от времени). Разойтись им негде по построению. На GPU
 * текстура перезаливается только в момент удара — не каждый кадр.
 *
 * ★ ТОР ВМЕСТО ПРОКРУТКИ. Тексель хранит «поколение» — номер витка окна, для
 * которого он записан. Игрок уехал на 384 м — тот же тексель отвечает уже за
 * другое место мира, и записанное там поколение не совпадает с запрошенным:
 * такой отсчёт считается пустым. Стирать при движении ничего не нужно.
 *
 * ★ СЛЕД ОСТАЁТСЯ, НО НЕ ВЕЧНОЙ ЯМОЙ. Первые секунды воронка и борозда держат
 * полную глубину (свежесть = 1), потом склон их «затягивает» — как и раньше,
 * но не до нуля, а до остаточных 30%: шрам виден и чувствуется, а трасса после
 * бомбардировки не превращается в стиральную доску. Жар и свечение по-прежнему
 * гаснут совсем — иначе рез был бы вечной стеной.
 *
 * Слои (RGBA32F каждый):
 *   craters: R = провал (м, сумма чаш), G = радиальная координата ближайшей
 *            воронки (0 центр … 1.25 внешний край вала), B = время удара,
 *            A = поколение
 *   cuts:    R = провал (м, максимум по звеньям), G = профиль поперёк борозды
 *            k∈[0,1] (максимум), B = время звена, A = поколение
 */

/** сторона окна в текселях и размер текселя, м */
export const DMG_N = 256;
export const DMG_CELL = 1.5;
/** покрытие окна, м */
export const DMG_SPAN = DMG_N * DMG_CELL;

/** сколько живёт свежесть воронки, с (см. прежний CRATER_LIFE) */
export const CRATER_LIFE = 34;
/** остаточная глубина шрама после затягивания */
export const RESIDUAL = 0.3;

/** параметры реза (перенесены из fx/laser.ts, там остаются реэкспорты) */
export const CUT_R = 12.0;
export const CUT_DEPTH = 2.2;
export const MOLTEN = 2.9;
export const COOL = 1.4;
export const CUT_LIFE = 6.0;

/** глубина воронки: доля радиуса и потолок (те же числа, что были в шейдере) */
const DEPTH_K = 0.55;
const DEPTH_MAX = 6.5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type N = any;

/** свежесть воронки по возрасту: держится, потом склон затягивает */
export function craterFresh(age: number): number {
  const k = 1 - age / CRATER_LIFE;
  return k > 0 ? Math.min(1, k * 1.8) : 0;
}
/** живучесть звена реза по возрасту */
export function cutFresh(age: number): number {
  const over = age - CUT_LIFE * 0.7;
  return over <= 0 ? 1 : Math.max(0, 1 - over / (CUT_LIFE * 0.3));
}
/** расплав в звене: сначала жидкий, потом стынет */
export function cutMolten(age: number): number {
  return age <= MOLTEN ? 1 : Math.max(0, 1 - (age - MOLTEN) / COOL);
}
const heal = (fresh: number): number => RESIDUAL + (1 - RESIDUAL) * fresh;

const NONE = -1e9; // поколение «пусто»

class Layer {
  readonly data = new Float32Array(DMG_N * DMG_N * 4);
  readonly tex: THREE.DataTexture;
  dirty = false;
  constructor() {
    this.data.fill(0);
    for (let i = 0; i < DMG_N * DMG_N; i++) this.data[i * 4 + 3] = NONE;
    this.tex = new THREE.DataTexture(this.data, DMG_N, DMG_N, THREE.RGBAFormat, THREE.FloatType);
    this.tex.minFilter = THREE.NearestFilter;
    this.tex.magFilter = THREE.NearestFilter;
    this.tex.generateMipmaps = false;
    this.tex.needsUpdate = true;
  }
}

/** поколение текселя для мировой клетки (cx, cz) */
function genOf(cx: number, cz: number): number {
  return Math.floor(cx / DMG_N) * 4096 + Math.floor(cz / DMG_N);
}
function wrap(c: number): number {
  return ((c % DMG_N) + DMG_N) % DMG_N;
}

export class DamageMap {
  readonly craters = new Layer();
  readonly cuts = new Layer();
  /** мировое время — та же ось, что у uTime шейдера рельефа */
  now = 0;

  /** юниформы для шейдера рельефа */
  readonly uTime = uniform(0);

  /** воронка от удара: центр в мире, радиус */
  paintCrater(x: number, z: number, r: number): void {
    const depth = Math.min(DEPTH_MAX, r * DEPTH_K);
    const R = r * 1.25; // вал по кромке тоже красится
    const c0x = Math.floor((x - R) / DMG_CELL);
    const c1x = Math.floor((x + R) / DMG_CELL);
    const c0z = Math.floor((z - R) / DMG_CELL);
    const c1z = Math.floor((z + R) / DMG_CELL);
    const d = this.craters.data;
    for (let cz = c0z; cz <= c1z; cz++) {
      for (let cx = c0x; cx <= c1x; cx++) {
        const px = (cx + 0.5) * DMG_CELL;
        const pz = (cz + 0.5) * DMG_CELL;
        const cd = Math.hypot(px - x, pz - z) / r;
        if (cd > 1.25) continue;
        const i = (wrap(cz) * DMG_N + wrap(cx)) * 4;
        const gen = genOf(cx, cz);
        if (d[i + 3] !== gen) {
          d[i] = 0;
          d[i + 1] = 2;
          d[i + 2] = -1e9;
          d[i + 3] = gen;
        }
        if (cd < 1) {
          const k = 1 - cd * cd;
          d[i] += depth * k * k; // чаши складываются, как и раньше
        }
        d[i + 1] = Math.min(d[i + 1], cd);
        d[i + 2] = this.now;
      }
    }
    this.craters.dirty = true;
  }

  /** звено реза: отрезок «где луч был — где стал» */
  paintCut(ax: number, az: number, bx: number, bz: number, R = CUT_R, depth = CUT_DEPTH): void {
    const c0x = Math.floor((Math.min(ax, bx) - R) / DMG_CELL);
    const c1x = Math.floor((Math.max(ax, bx) + R) / DMG_CELL);
    const c0z = Math.floor((Math.min(az, bz) - R) / DMG_CELL);
    const c1z = Math.floor((Math.max(az, bz) + R) / DMG_CELL);
    const ux = bx - ax;
    const uz = bz - az;
    const l2 = ux * ux + uz * uz;
    const d = this.cuts.data;
    for (let cz = c0z; cz <= c1z; cz++) {
      for (let cx = c0x; cx <= c1x; cx++) {
        const px = (cx + 0.5) * DMG_CELL;
        const pz = (cz + 0.5) * DMG_CELL;
        let h = 0;
        if (l2 > 1e-4) {
          h = ((px - ax) * ux + (pz - az) * uz) / l2;
          h = h < 0 ? 0 : h > 1 ? 1 : h;
        }
        const dx = px - ax - ux * h;
        const dz = pz - az - uz * h;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist >= R) continue;
        const kk = 1 - dist / R;
        const k = kk * kk;
        const i = (wrap(cz) * DMG_N + wrap(cx)) * 4;
        const gen = genOf(cx, cz);
        if (d[i + 3] !== gen) {
          d[i] = 0;
          d[i + 1] = 0;
          d[i + 2] = -1e9;
          d[i + 3] = gen;
        }
        // ★ МАКСИМУМ, А НЕ СУММА: звенья идут внахлёст, сумма давала ступеньку
        d[i] = Math.max(d[i], depth * k);
        d[i + 1] = Math.max(d[i + 1], k);
        d[i + 2] = this.now; // возраст — от последнего звена, прошедшего здесь
      }
    }
    this.cuts.dirty = true;
  }

  /** раз в кадр: время и заливка текстур, если были удары */
  update(now: number): void {
    this.now = now;
    this.uTime.value = now;
    if (this.craters.dirty) {
      this.craters.tex.needsUpdate = true;
      this.craters.dirty = false;
    }
    if (this.cuts.dirty) {
      this.cuts.tex.needsUpdate = true;
      this.cuts.dirty = false;
    }
  }

  // ---- CPU-отсчёты: билинейно, ровно как в шейдере ----

  // ★ ВРЕМЯ УДАРА УСРЕДНЯЕТСЯ ТОЛЬКО ПО ЗАПОЛНЕННЫМ ТЕКСЕЛЯМ. Пустой сосед
  // с временем «−∞» утащил бы возраст на краю следа в бесконечность, и кромка
  // любой воронки читалась бы давно затянутой. Поэтому четвёртая компонента —
  // признак «есть данные», а время берётся взвешенно по нему.
  private texel(layer: Layer, cx: number, cz: number, out: Float32Array): void {
    const i = (wrap(cz) * DMG_N + wrap(cx)) * 4;
    const d = layer.data;
    if (d[i + 3] !== genOf(cx, cz)) {
      out[0] = 0; out[1] = layer === this.craters ? 2 : 0; out[2] = 0; out[3] = 0;
      return;
    }
    out[0] = d[i]; out[1] = d[i + 1]; out[2] = d[i + 2]; out[3] = 1;
  }
  private t00 = new Float32Array(4);
  private t10 = new Float32Array(4);
  private t01 = new Float32Array(4);
  private t11 = new Float32Array(4);
  /** билинейный отсчёт слоя в мировой точке → [R, G, время, доля данных] */
  private sample(layer: Layer, x: number, z: number, out: Float32Array): void {
    const fx = x / DMG_CELL - 0.5;
    const fz = z / DMG_CELL - 0.5;
    const cx = Math.floor(fx);
    const cz = Math.floor(fz);
    const tx = fx - cx;
    const tz = fz - cz;
    this.texel(layer, cx, cz, this.t00);
    this.texel(layer, cx + 1, cz, this.t10);
    this.texel(layer, cx, cz + 1, this.t01);
    this.texel(layer, cx + 1, cz + 1, this.t11);
    for (let c = 0; c < 4; c++) {
      const a = this.t00[c] + (this.t10[c] - this.t00[c]) * tx;
      const b = this.t01[c] + (this.t11[c] - this.t01[c]) * tx;
      out[c] = a + (b - a) * tz;
    }
    // время — взвешенное по заполненным
    out[2] = out[3] > 1e-6 ? out[2] / out[3] : 0;
  }
  private sc = new Float32Array(4);
  private sl = new Float32Array(4);

  /** насколько просела земля от воронок */
  craterDip(x: number, z: number): number {
    this.sample(this.craters, x, z, this.sc);
    if (this.sc[0] <= 0) return 0;
    return this.sc[0] * heal(craterFresh(this.now - this.sc[2]));
  }
  /** насколько просела земля от реза */
  cutDip(x: number, z: number): number {
    this.sample(this.cuts, x, z, this.sl);
    if (this.sl[0] <= 0) return 0;
    return this.sl[0] * heal(cutFresh(this.now - this.sl[2]));
  }
  /** насколько точка расплавлена (урон): 1 — жидкая лава, 0 — остыло */
  cutHeat(x: number, z: number): number {
    this.sample(this.cuts, x, z, this.sl);
    if (this.sl[1] <= 0) return 0;
    const age = this.now - this.sl[2];
    return cutMolten(age) * this.sl[1] * cutFresh(age);
  }

  // ---- TSL: та же выборка для шейдера рельефа ----

  /**
   * Билинейный отсчёт слоя в мировой точке xz (те же четыре текселя и те же
   * веса, что у CPU). Возвращает vec4: R, G, B слоя и «есть ли данные».
   */
  private sampleNode(layer: Layer, xz: N, emptyG: number): N {
    const tex = layer.tex;
    const fetch = (cx: N, cz: N): N => {
      const wx = cx.mod(DMG_N).add(DMG_N).mod(DMG_N);
      const wz = cz.mod(DMG_N).add(DMG_N).mod(DMG_N);
      const t: N = textureLoad(tex, ivec2(wx, wz));
      const gen = floor(float(cx).div(DMG_N)).mul(4096.0).add(floor(float(cz).div(DMG_N)));
      const ok = t.w.equal(gen);
      // w — признак данных; время умножено на него, чтобы усредняться взвешенно
      return select(ok, vec4(t.xyz, 1.0), vec4(0.0, emptyG, 0.0, 0.0));
    };
    return Fn(() => {
      const f = xz.div(DMG_CELL).sub(0.5);
      const c: N = floor(f);
      const t: N = fract(f);
      const cx = int(c.x);
      const cz = int(c.y);
      const a = mix(fetch(cx, cz), fetch(cx.add(1), cz), t.x);
      const b = mix(fetch(cx, cz.add(1)), fetch(cx.add(1), cz.add(1)), t.x);
      const m: N = mix(a, b, t.y);
      return vec4(m.x, m.y, m.z.div(max(m.w, 1e-6)), m.w);
    })();
  }

  private freshNodeCrater(age: N): N {
    const k = age.div(CRATER_LIFE).oneMinus();
    return select(k.greaterThan(0.0), min(1.0, k.mul(1.8)), float(0.0));
  }
  private freshNodeCut(age: N): N {
    const over = age.sub(CUT_LIFE * 0.7);
    return select(over.lessThanEqual(0.0), float(1.0), max(0.0, over.div(CUT_LIFE * 0.3).oneMinus()));
  }
  private moltenNode(age: N): N {
    return select(age.lessThanEqual(MOLTEN), float(1.0), max(0.0, age.sub(MOLTEN).div(COOL).oneMinus()));
  }

  /**
   * Всё, что нужно шейдеру рельефа в точке xz:
   *  dip — суммарный провал (воронки + рез), м;
   *  cw — свежесть воронки, cd — её радиальная координата;
   *  lw — вес борозды (профиль × живучесть), lk — профиль, lm — расплав.
   */
  damageNode(xz: N): { dip: N; cw: N; cd: N; lw: N; lk: N; lm: N } {
    const c: N = this.sampleNode(this.craters, xz, 2.0);
    const l: N = this.sampleNode(this.cuts, xz, 0.0);
    const cAge = this.uTime.sub(c.z);
    const cw: N = this.freshNodeCrater(cAge).mul(select(c.x.greaterThan(0.0), float(1.0), float(0.0)));
    const cHeal = cw.mul(1 - RESIDUAL).add(RESIDUAL);
    const lAge = this.uTime.sub(l.z);
    const lf: N = this.freshNodeCut(lAge);
    const lHeal = lf.mul(1 - RESIDUAL).add(RESIDUAL);
    const dip: N = select(c.x.greaterThan(0.0), c.x.mul(cHeal), float(0.0))
      .add(select(l.x.greaterThan(0.0), l.x.mul(lHeal), float(0.0)));
    const lk: N = l.y;
    const lw: N = lk.mul(lHeal);
    const lm: N = this.moltenNode(lAge).mul(lk).mul(lf);
    return { dip, cw, cd: c.y, lw, lk, lm };
  }
}

/** единственная карта мира — её читают физика, рез, воронки и шейдер рельефа */
export const damage = new DamageMap();

void vec2;
