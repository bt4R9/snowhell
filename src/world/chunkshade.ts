import * as THREE from 'three/webgpu';
import {
  Fn, If, Loop, float, int, uint, vec2, vec3, vec4, uniform, uniformArray, storage, instanceIndex,
  floor, fract, mix, max, min, clamp, abs, sqrt, length, dot, cross, normalize, select,
} from 'three/tsl';
import { PALETTE } from './palette';
import { worldSeed, noiseOffset } from './noise';
import { SURF_ICE, SURF_POWDER, SURF_DIRT } from './features';

// ★ РАСКРАСКА ЧАНКА НА GPU.
//
// Замер сборки чанка на CPU: высоты 9 мс, сборка сетки 2 мс, РАСКРАСКА 70 мс.
// Цвет считался для каждой из 9600 вершин развёрнутой сетки: восемь вызовов
// шума, прокал у лавы (перебор узлов языков и озёр), корка по берегам, метки
// пара, тип поверхности — и всё это в 5.7 раза чаще, чем узлов в решётке. При
// этом ничто из этого не нужно физике: цвет — чисто визуальная величина, и
// точность до бита ей не требуется. Идеальная работа для compute-ядра.
//
// Разделение труда:
//  • CPU по-прежнему считает ВЫСОТЫ (они обязаны совпадать со столкновениями)
//    и дешёвые «управляющие» величины на узел решётки — вес трассы, тип
//    поверхности, близость дороги деревни, вес биома: это функции сплайнов и
//    списков мира, которые на GPU тащить не имеет смысла (≈1 мс на чанк);
//  • GPU получает позиции развёрнутой сетки, индекс узла решётки для каждой
//    вершины, управляющие величины и плоские списки лавы — и пишет цвет,
//    aGlow и aHazard прямо в storage-буферы, которые тут же становятся
//    атрибутами меша. Ни байта обратно на CPU.
//
// Шум здесь — точный порт noise.ts: тот же целочисленный хэш (imul в u32
// заворачивается так же), тот же сид и смещения. Разница только в float32 у
// дробной части координаты — на цвете она невидима.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type N = any;

/** сколько примитивов лавы влезает в один вызов (с запасом против замера) */
const MAX_CIRCLES = 64;
const MAX_NODES = 256;
const MAX_LAKES = 32;
const MAX_STEAMS = 32;

const ROCK_FACE = new THREE.Color(0x9d94a1);
const ROAD_TINT = new THREE.Color(0xb4bed8);
const DIRT_TINT = new THREE.Color(0xa8916e);
const ICE_TINT = new THREE.Color(0x7fa8cf);
const PISTE_TINT = new THREE.Color(0xf2f6ff);

export interface ChunkShadeInput {
  /** развёрнутые позиции чанка: локальный x, АБСОЛЮТНЫЙ y, локальный z */
  positions: Float32Array;
  /** индекс узла решётки для каждой развёрнутой вершины */
  lattice: Uint32Array;
  /** на узел решётки: u (координата долины), z, вес трассы, тип поверхности */
  ctrlA: Float32Array;
  /** на узел решётки: вес дороги деревни, вес вулкана, 0, 0 */
  ctrlB: Float32Array;
  lists: { circles: number[]; nodes: number[]; lakes: number[]; steams: number[] };
}

export interface ChunkShadeOutput {
  position: THREE.StorageBufferAttribute;
  color: THREE.StorageBufferAttribute;
  glow: THREE.StorageBufferAttribute;
  hot: THREE.StorageBufferAttribute;
}

export class ChunkShader {
  private uSeed = uniform(0, 'uint');
  private uOff = uniform(new THREE.Vector2());
  private uCount = uniform(0, 'uint');
  private uCircles = uniformArray(Array.from({ length: MAX_CIRCLES }, () => new THREE.Vector4()));
  private uNodes = uniformArray(Array.from({ length: MAX_NODES }, () => new THREE.Vector4()));
  private uLakes = uniformArray(Array.from({ length: MAX_LAKES }, () => new THREE.Vector4()));
  private uSteams = uniformArray(Array.from({ length: MAX_STEAMS }, () => new THREE.Vector4()));
  private uNCircles = uniform(0, 'int');
  private uNNodes = uniform(0, 'int');
  private uNLakes = uniform(0, 'int');
  private uNSteams = uniform(0, 'int');
  private uSnow = uniform(PALETTE.snow);

  /**
   * ★ ОДНО ЯДРО НА ВСЕ ЧАНКИ. Первый вариант собирал граф узлов заново на
   * каждый чанк — WGSL получался тот же (пайплайн кэшировался), но сама сборка
   * графа стоила 14 мс на чанк, то есть съедала половину выигрыша. Теперь
   * storage-узлы созданы один раз, а перед вызовом им подменяется буфер
   * (`node.value = attr`): three видит смену атрибута и пересобирает только
   * bind group. Размер сетки чанка постоянный, поэтому и count постоянный.
   */
  private readonly n: number;
  private posNode: N;
  private colNode: N;
  private glowNode: N;
  private hotNode: N;
  private latNode: N;
  private caNode: N;
  private cbNode: N;
  private kernel: N;

  constructor(private renderer: THREE.WebGPURenderer, vertsPerChunk: number, latticePerChunk: number) {
    this.n = vertsPerChunk;
    const n = vertsPerChunk;
    this.posNode = storage(new THREE.StorageBufferAttribute(new Float32Array(n * 3), 3), 'vec3', n).toReadOnly();
    this.colNode = storage(new THREE.StorageBufferAttribute(new Float32Array(n * 3), 3), 'vec3', n);
    this.glowNode = storage(new THREE.StorageBufferAttribute(new Float32Array(n), 1), 'float', n);
    this.hotNode = storage(new THREE.StorageBufferAttribute(new Float32Array(n), 1), 'float', n);
    this.latNode = storage(new THREE.StorageBufferAttribute(new Uint32Array(n), 1), 'uint', n).toReadOnly();
    this.caNode = storage(new THREE.StorageBufferAttribute(new Float32Array(latticePerChunk * 4), 4), 'vec4', latticePerChunk).toReadOnly();
    this.cbNode = storage(new THREE.StorageBufferAttribute(new Float32Array(latticePerChunk * 4), 4), 'vec4', latticePerChunk).toReadOnly();
    this.uCount.value = n;
    this.kernel = this.buildKernel();
  }

  /**
   * Раскрасить чанк: создаёт storage-атрибуты и ставит compute в очередь.
   * Атрибуты можно вешать на геометрию сразу — GPU выполнит запись до того,
   * как дойдёт до отрисовки (очередь одна и упорядочена).
   */
  shade(inp: ChunkShadeInput): ChunkShadeOutput {
    const n = inp.positions.length / 3;
    if (n !== this.n) throw new Error('ChunkShader: неожиданный размер чанка ' + n);
    const position = new THREE.StorageBufferAttribute(inp.positions, 3);
    const color = new THREE.StorageBufferAttribute(new Float32Array(n * 3), 3);
    const glow = new THREE.StorageBufferAttribute(new Float32Array(n), 1);
    const hot = new THREE.StorageBufferAttribute(new Float32Array(n), 1);
    const lattice = new THREE.StorageBufferAttribute(inp.lattice, 1);
    const ctrlA = new THREE.StorageBufferAttribute(inp.ctrlA, 4);
    const ctrlB = new THREE.StorageBufferAttribute(inp.ctrlB, 4);

    // списки лавы — в юниформы (они переписываются перед каждым вызовом:
    // compute() двигает renderId, и uniformArray обновляется заново)
    const fill = (arr: THREE.Vector4[], src: number[], maxN: number): number => {
      const cnt = Math.min(maxN, src.length / 4);
      for (let i = 0; i < cnt; i++) arr[i].set(src[i * 4], src[i * 4 + 1], src[i * 4 + 2], src[i * 4 + 3]);
      return cnt;
    };
    this.uNCircles.value = fill(this.uCircles.array as THREE.Vector4[], inp.lists.circles, MAX_CIRCLES);
    this.uNNodes.value = fill(this.uNodes.array as THREE.Vector4[], inp.lists.nodes, MAX_NODES);
    this.uNLakes.value = fill(this.uLakes.array as THREE.Vector4[], inp.lists.lakes, MAX_LAKES);
    this.uNSteams.value = fill(this.uSteams.array as THREE.Vector4[], inp.lists.steams, MAX_STEAMS);
    this.uSeed.value = worldSeed();
    const off = noiseOffset();
    this.uOff.value.set(off.x, off.z);

    // подменяем буферы у готового ядра и ставим вызов в очередь
    this.posNode.value = position;
    this.colNode.value = color;
    this.glowNode.value = glow;
    this.hotNode.value = hot;
    this.latNode.value = lattice;
    this.caNode.value = ctrlA;
    this.cbNode.value = ctrlB;
    void this.renderer.compute(this.kernel);
    return { position, color, glow, hot };
  }

  private buildKernel(): N {
    const n = this.n;
    const posB = this.posNode;
    const colB = this.colNode;
    const glowB = this.glowNode;
    const hotB = this.hotNode;
    const latB = this.latNode;
    const caB = this.caNode;
    const cbB = this.cbNode;
    const { uSeed, uOff, uCircles, uNodes, uLakes, uSteams, uNCircles, uNNodes, uNLakes, uNSteams, uSnow, uCount } = this;

    // --- точный порт noise.ts ---
    const hash2 = Fn(([ix, iz]: [N, N]) => {
      const h = uint(ix).mul(uint(374761393)).add(uint(iz).mul(uint(668265263))).add(uSeed.mul(uint(2246822519))).toVar();
      h.assign(h.bitXor(h.shiftRight(uint(13))).mul(uint(1274126177)));
      return float(h.bitXor(h.shiftRight(uint(16)))).div(4294967295.0);
    });
    const smooth = (t: N): N => t.mul(t).mul(t.mul(-2.0).add(3.0));
    const noise2 = Fn(([xIn, zIn]: [N, N]) => {
      const x = xIn.add(uOff.x);
      const z = zIn.add(uOff.y);
      const fx: N = floor(x);
      const fz: N = floor(z);
      const ix = int(fx);
      const iz = int(fz);
      const sx = smooth(x.sub(fx));
      const sz = smooth(z.sub(fz));
      const v00 = hash2(ix, iz);
      const v10 = hash2(ix.add(1), iz);
      const v01 = hash2(ix, iz.add(1));
      const v11 = hash2(ix.add(1), iz.add(1));
      return mix(mix(v00, v10, sx), mix(v01, v11, sx), sz).mul(2.0).sub(1.0);
    });
    const sstep = (a: N, b: N, x: N): N => {
      const t = clamp(float(x).sub(a).div(float(b).sub(a)), 0.0, 1.0);
      return t.mul(t).mul(t.mul(-2.0).add(3.0));
    };

    return Fn(() => {
      // 9600 вершин чанка делятся на воркгруппы по 64 без остатка — лишних
      // потоков нет, но границу всё равно проверяем через min по индексу
      const i: N = (min as N)(instanceIndex, (uCount as N).sub(uint(1)));
      // нормаль грани — из трёх вершин треугольника; сетка развёрнутая, поэтому
      // грань — это вершины 3k, 3k+1, 3k+2
      const tri: N = i.div(uint(3)).mul(uint(3));
      const p0: N = posB.element(tri);
      const p1: N = posB.element(tri.add(uint(1)));
      const p2: N = posB.element(tri.add(uint(2)));
      const nrm: N = normalize(cross(p1.sub(p0), p2.sub(p0)));
      const ny = abs(nrm.y);
      const wy = posB.element(i).y;
      const li = latB.element(i);
      const ca: N = caB.element(li);
      const cb: N = cbB.element(li);
      const u = ca.x;
      const z = ca.y;
      const pt = ca.z;
      const sk = ca.w;
      const roadW = cb.x;
      const vw = cb.y;
      const cw = cb.z;
      const rw = cb.w;

      // === terrainColorAt (ближняя версия) ===
      const snow: N = uSnow;
      const rock = vec3(ROCK_FACE.r, ROCK_FACE.g, ROCK_FACE.b);
      // Снег держится на пологом и в желобах; на крутых гранях выходит скала.
      const steep = ny.oneMinus();
      const streak = noise2(u.mul(0.35).add(17.2), z.mul(0.055)).mul(0.5).add(0.5);
      const plaster = max(0.0, noise2(u.mul(0.12).sub(8.4), z.mul(0.12).add(3.9))).mul(0.34);
      const bare = max(0.0, min(0.86, steep.sub(0.42).sub(streak.mul(0.2)).div(0.26).sub(plaster)));
      const kk = bare.mul(bare).mul(bare.mul(-2.0).add(3.0));
      // слоистость породы: горизонтальные пласты, как на скальных стенах
      const band = noise2(u.mul(0.02), wy.mul(0.075)).mul(0.19);
      const rr = rock.x.mul(band.add(1.0));
      const rg = rock.y.mul(band.mul(0.9).add(1.0));
      const rb = rock.z.mul(band.mul(0.7).add(1.0));
      const cr = snow.x.add(rr.sub(snow.x).mul(kk)).toVar();
      const cg = snow.y.add(rg.sub(snow.y).mul(kk)).toVar();
      const cbl = snow.z.add(rb.sub(snow.z).mul(kk)).toVar();
      // Фактура снега: без неё поверхность — сплошная заливка
      const mottle = noise2(u.mul(0.23).add(61.7), z.mul(0.23)).mul(0.07)
        .add(noise2(u.mul(0.075).sub(12.4), z.mul(0.075)).mul(0.055));
      cr.mulAssign(mottle.add(1.0));
      cg.mulAssign(mottle.add(1.0));
      cbl.mulAssign(mottle.mul(0.85).add(1.0)); // холоднее в тенях

      // Тип поверхности должен читаться с одного взгляда
      If(sk.equal(float(SURF_ICE)), () => {
        cr.assign(cr.mul(0.45).add(ICE_TINT.r * 0.55));
        cg.assign(cg.mul(0.45).add(ICE_TINT.g * 0.55));
        cbl.assign(cbl.mul(0.45).add(ICE_TINT.b * 0.55));
        const glint = select(noise2(u.mul(0.5).add(3.3), z.mul(0.5)).greaterThan(0.72), float(0.22), float(0.0));
        cr.addAssign(glint); cg.addAssign(glint); cbl.addAssign(glint);
      }).ElseIf(sk.equal(float(SURF_POWDER)), () => {
        cr.assign(cr.mul(0.72).add(0.28)); cg.assign(cg.mul(0.72).add(0.28)); cbl.assign(cbl.mul(0.72).add(0.28));
      }).ElseIf(sk.equal(float(SURF_DIRT)), () => {
        cr.assign(cr.mul(0.38).add(DIRT_TINT.r * 0.62));
        cg.assign(cg.mul(0.38).add(DIRT_TINT.g * 0.62));
        cbl.assign(cbl.mul(0.38).add(DIRT_TINT.b * 0.62));
        const gr = noise2(u.mul(0.42).sub(9.1), z.mul(0.42)).mul(0.14);
        cr.addAssign(gr); cg.addAssign(gr.mul(0.9)); cbl.addAssign(gr.mul(0.7));
      });

      // ★ ВУЛКАНИЧЕСКИЙ СКЛОН — ЭТО ДРУГАЯ ПОВЕРХНОСТЬ, А НЕ ПЕРЕКРАШЕННЫЙ СНЕГ
      const glowV = float(0.0).toVar();
      const glowHz = float(0.0).toVar();
      If(vw.greaterThan(0.01), () => {
        const patch = noise2(u.mul(0.017).add(31.7), z.mul(0.017)).mul(0.5).add(0.5);
        const ash = sstep(0.46, 0.54, patch); // жёсткая кромка пепельного поля
        const ropy = noise2(u.mul(0.55), z.mul(0.06).add(11.3)).mul(0.5).add(0.5);
        const grit = noise2(u.mul(1.15).sub(4.2), z.mul(1.15)).mul(0.5).add(0.5);
        // ★ ПОРОДА КРАСНО-БУРАЯ, А НЕ ПЕСОЧНАЯ
        // ★ ЧЁРНОЕ, А НЕ БУРОЕ: те же числа, что в terrain.ts (CPU-двойник)
        const vr = float(0.095).add(ash.mul(0.170 - 0.095)).toVar();
        const vg = float(0.088).add(ash.mul(0.160 - 0.088)).toVar();
        const vb = float(0.088).add(ash.mul(0.155 - 0.088)).toVar();
        const rk = ropy.mul(0.32).add(0.84);
        const gk = grit.mul(0.28).add(0.86);
        vr.mulAssign(rk.mul(gk));
        vg.mulAssign(rk.mul(gk));
        vb.mulAssign(rk.mul(gk).mul(0.97));
        // ★ ПЕПЕЛЬНОЕ ПОЛЕ БЕЗ ФАКТУРЫ ЧИТАЕТСЯ ПУСТЫНЕЙ: сдув и языки старого потока
        If(ash.greaterThan(0.01), () => {
          const drift = noise2(u.mul(0.085).add(5.5), z.mul(0.011).sub(3.1));
          const scar = max(0.0, noise2(u.mul(0.02).sub(12.4), z.mul(0.0065).add(7.7)).mul(0.5).add(0.5).sub(0.58)).div(0.42);
          const k = drift.mul(0.22).add(1.0).mul(scar.mul(0.55).oneMinus());
          vr.mulAssign(k.sub(1.0).mul(ash).add(1.0));
          vg.mulAssign(k.sub(1.0).mul(ash).add(1.0));
          vb.mulAssign(k.sub(1.0).mul(ash).mul(1.08).add(1.0));
        });
        // ★★ КРУТЫЕ ГРАНИ — БАЗАЛЬТ, А НЕ ПУСТОТА
        const sk2 = sstep(0.34, 0.62, steep);
        // крутые грани — базальт: тёмный, но не чёрный (0.30 читался кремовой
        // стеной на обрывах, особенно у границы биомов под светлым тоном)
        vr.addAssign(float(0.14).sub(vr).mul(sk2));
        vg.addAssign(float(0.13).sub(vg).mul(sk2));
        vb.addAssign(float(0.125).sub(vb).mul(sk2));
        // ★ УСТЬЕ ПАРА ПОМЕЧЕНО НА ЗЕМЛЕ (steamMarkAt)
        const mk = float(0.0).toVar();
        Loop({ start: int(0), end: uNSteams, type: 'int', condition: '<' }, ({ i: si }: { i: N }) => {
          const s: N = uSteams.element(si);
          const d = length(vec2(u.sub(s.x), z.sub(s.y))).div(s.z);
          If(d.lessThan(1.0), () => { mk.assign(max(mk, d.oneMinus())); });
        });
        If(mk.greaterThan(0.01), () => {
          const ring = max(0.0, abs(mk.sub(0.45)).div(0.45).oneMinus());
          const core = max(0.0, mk.sub(0.72).div(0.28));
          vr.addAssign(float(0.62).sub(vr).mul(ring).mul(0.7));
          vg.addAssign(float(0.55).sub(vg).mul(ring).mul(0.7));
          vb.addAssign(float(0.24).sub(vb).mul(ring).mul(0.7));
          vr.mulAssign(core.mul(0.6).oneMinus());
          vg.mulAssign(core.mul(0.6).oneMinus());
          vb.mulAssign(core.mul(0.55).oneMinus());
        });
        // ★ ОПАСНОСТЬ ВИДНА ПО ЦВЕТУ ЗЕМЛИ (hazardHeatAt): узлы языков, озёра, колодцы
        const hz = float(0.0).toVar();
        Loop({ start: int(0), end: uNNodes, type: 'int', condition: '<' }, ({ i: ni }: { i: N }) => {
          const nd: N = uNodes.element(ni);
          const du = u.sub(nd.x);
          const dz = z.sub(nd.y);
          const wS = select(du.lessThan(0.0), nd.z, nd.w);
          const R = wS.add(26.0);
          const d2 = du.mul(du).add(dz.mul(dz));
          If(d2.lessThanEqual(R.mul(R)), () => {
            const t = max(0.0, sqrt(d2).sub(wS)).div(26.0).oneMinus();
            hz.assign(max(hz, t));
          });
        });
        Loop({ start: int(0), end: uNCircles, type: 'int', condition: '<' }, ({ i: ci }: { i: N }) => {
          const c: N = uCircles.element(ci);
          const d = length(vec2(u.sub(c.x), z.sub(c.y)));
          If(d.lessThanEqual(c.z.add(c.w)), () => {
            const t = max(0.0, d.sub(c.z)).div(c.w).oneMinus();
            hz.assign(max(hz, t));
          });
        });
        hz.assign(min(hz, 1.0));
        If(hz.greaterThan(0.01), () => {
          const k = hz.mul(hz);
          vr.addAssign(float(0.46).sub(vr).mul(k));
          vg.addAssign(float(0.085).sub(vg).mul(k).mul(0.95));
          vb.addAssign(float(0.055).sub(vb).mul(k).mul(0.95));
          glowHz.assign(k.mul(0.35));
        });
        // в вершину кладётся только ВЕС БИОМА, сеть трещин рисует шейдер
        glowV.assign(vw);
        cr.addAssign(vr.sub(cr).mul(vw));
        cg.addAssign(vg.sub(cg).mul(vw));
        cbl.addAssign(vb.sub(cbl).mul(vw));
      });

      // укатанная трасса заметно светлее и холоднее целины; на вулкане это
      // выметенный пеплом жёлоб — серый, а не белый
      If(pt.greaterThan(0.0), () => {
        const tr = float(PISTE_TINT.r).add(vw.mul(0.15 - PISTE_TINT.r));
        const tg = float(PISTE_TINT.g).add(vw.mul(0.14 - PISTE_TINT.g));
        const tb = float(PISTE_TINT.b).add(vw.mul(0.135 - PISTE_TINT.b));
        const k = pt.mul(vw.mul(-0.1).add(0.75)).mul(select(sk.equal(float(SURF_ICE)), float(0.15), float(1.0)));
        cr.addAssign(tr.sub(cr).mul(k));
        cg.addAssign(tg.sub(cg).mul(k));
        cbl.addAssign(tb.sub(cbl).mul(k));
      });

      // ★ ПАРОВОЙ ГОРОД: склон — отвалы и шлак (см. terrain.ts, те же формулы)
      If(cw.greaterThan(0.01), () => {
        const soot = noise2(u.mul(0.06).add(9.1), z.mul(0.008).sub(3.3)).mul(0.5).add(0.5);
        const rust = max(0.0, noise2(u.mul(0.03).sub(4.4), z.mul(0.03).add(7.7)).sub(0.45)).div(0.55);
        const k = soot.mul(0.9).oneMinus().mul(0.45).add(0.55);
        const gr = float(0.20).mul(k).toVar();
        const gg = float(0.19).mul(k).toVar();
        const gb = float(0.18).mul(k).toVar();
        gr.addAssign(float(0.36).sub(gr).mul(rust).mul(0.6));
        gg.addAssign(float(0.17).sub(gg).mul(rust).mul(0.6));
        gb.addAssign(float(0.08).sub(gb).mul(rust).mul(0.6));
        const sn = sstep(0.55, 0.75, noise2(u.mul(0.02).add(1.7), z.mul(0.02).sub(5.5)).mul(0.5).add(0.5)).mul(steep.oneMinus());
        gr.addAssign(float(0.42).sub(gr).mul(sn));
        gg.addAssign(float(0.42).sub(gg).mul(sn));
        gb.addAssign(float(0.44).sub(gb).mul(sn));
        // мостовая: булыжник + бордюр (rw из ctrl)
        If(rw.greaterThan(0.0), () => {
          const cob = noise2(u.mul(0.9).add(4.4), z.mul(0.9).sub(2.2)).mul(0.5).add(0.5);
          const cobK = cob.mul(0.28).add(0.86);
          const curb = select(rw.lessThan(0.5), float(1.0), float(0.0));
          const pr = mix(float(0.19).mul(cobK), float(0.34), curb);
          const pg = mix(float(0.185).mul(cobK), float(0.32), curb);
          const pb = mix(float(0.18).mul(cobK), float(0.30), curb);
          const k = select(rw.lessThan(0.5), rw.mul(2.0), float(1.0));
          gr.addAssign(pr.sub(gr).mul(k));
          gg.addAssign(pg.sub(gg).mul(k));
          gb.addAssign(pb.sub(gb).mul(k));
        });
        cr.addAssign(gr.sub(cr).mul(cw));
        cg.addAssign(gg.sub(cg).mul(cw));
        cbl.addAssign(gb.sub(cbl).mul(cw));
      });

      // === хвост stage 3: дорога деревни и остывшая корка у озёр ===
      If(roadW.greaterThan(0.0), () => {
        cr.addAssign(float(ROAD_TINT.r).sub(cr).mul(roadW));
        cg.addAssign(float(ROAD_TINT.g).sub(cg).mul(roadW));
        cbl.addAssign(float(ROAD_TINT.b).sub(cbl).mul(roadW));
      });
      // ★ ОСТЫВШАЯ КОРКА У ПОТОКА (lavaCrustAt): корка лежит там, где земля чуть
      // выше уровня — по берегам чаши
      const crust = float(0.0).toVar();
      Loop({ start: int(0), end: uNLakes, type: 'int', condition: '<' }, ({ i: lk }: { i: N }) => {
        const l: N = uLakes.element(lk);
        const d = length(vec2(u.sub(l.x), z.sub(l.y)));
        If(d.lessThanEqual(l.z.mul(1.5)), () => {
          const above = wy.sub(l.w);
          If(above.greaterThanEqual(-0.5).and(above.lessThanEqual(6.0)), () => {
            const t = max(0.0, above).div(6.0).oneMinus();
            crust.assign(max(crust, t));
          });
        });
      });
      If(crust.greaterThan(0.01), () => {
        const k = crust.mul(0.85);
        cr.addAssign(float(0.055).sub(cr).mul(k));
        cg.addAssign(float(0.042).sub(cg).mul(k));
        cbl.addAssign(float(0.05).sub(cbl).mul(k));
      });

      colB.element(i).assign(vec3(cr, cg, cbl));
      glowB.element(i).assign(glowV);
      hotB.element(i).assign(glowHz);
    })().compute(n, [64]);
  }
}

void vec4;
