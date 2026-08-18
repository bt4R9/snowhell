import { hash2 } from './noise';
import { pisteCenterX, cityWeight, toValleyU, terrainSample } from './features';

// ★ ПАРОВОЙ ГОРОД — УЛИЦА, А НЕ ДЕРЕВНЯ. Деревня — это дома вразброс вдоль
// дороги; город — это СПЛОШНЫЕ ФАСАДЫ по обе стороны улицы. Здесь трасса и есть
// улица: по обеим сторонам коридора вплотную друг к другу стоят здания в 2–6
// этажей (доходные дома, цеха, склады, залы с латунными куполами, часовые
// башни, газгольдеры), за первым рядом — второй. Каждое здание стоит на СВОЕЙ
// ровной площадке (см. cityPad в terrain.ts): на склоне площадки ступенями
// сходят вниз, и между ними сами собой вырастают подпорные стенки — террасы.
// Крыши плоские (с парапетом) или мансардные — по ним ездят: с трассы через
// кикер на первую крышу, дальше крыши идут лестницей вниз.

export const CK = {
  TENEMENT: 0,   // доходный дом: 3–6 этажей, карнизы, окна сеткой, мансарда
  FACTORY: 1,    // цех: кирпич, шедовая крыша, трубы, большие арочные ворота
  DOMEHALL: 2,   // зал с латунным куполом
  WAREHOUSE: 3,  // низкий широкий склад с плоской крышей и краном
  CLOCKTOWER: 4, // узкая высокая башня с часами
  GASHOLDER: 5,  // газгольдер: каркас и бак
} as const;

export interface Building {
  id: number;
  u: number;      // центр (координаты долины)
  z: number;
  hw: number;     // полуглубина поперёк улицы (по u)
  hl: number;     // полудлина вдоль улицы (по z)
  side: number;   // −1 / 1 — сторона улицы
  row: number;    // 0 — у улицы, 1 — второй ряд
  h: number;      // высота корпуса до карниза, м
  kind: number;
  style: number;  // палитра фасада 0..2
  floors: number;
  roof: 'flat' | 'mansard' | 'saw' | 'dome' | 'spire';
  chimneys: number;
  balconies: boolean;
  padY: number;   // высота площадки (мир); NaN — ещё не считана
  /** ★ ЗАЕЗД НА КРЫШУ С ГОРЫ: перед зданием оставлен переулок RAMP_L, и земля в
   * нём поднимается до уровня крыши — на крышу выезжаешь как на продолжение
   * склона (как на вкопанный дом в деревне); дальше крыши идут лестницей вниз */
  roofAccess: boolean;
  rampY0: number; // высота начала пандуса; NaN — не считана
  /** ★ поворот вдоль линии улицы (рад): улица изгибается, и фасады идут по ней */
  yaw: number;
}
export const RAMP_L = 22;
/** ★ полуширина улицы (мостовая от фасада до фасада ~60 м) — шире лыжного коридора */
export const STREET_HALF = 40;

// --- ★ ГРАФ УЛИЦ: проспект + развилки вокруг кварталов -----------------------
// Проспект идёт по оси; раз в FORK_STEP он раздваивается вокруг квартала-острова
// (две улицы уже, между ними здания) и снова сходится. Улица = {смещение центра
// от оси, полуширина}; здания ставятся вдоль ФРОНТОВ каждой улицы, снаружи
// города — стена террас (см. cityWallAt), чтобы игрок не выезжал из города.
const FORK_STEP = 620;
const FORK_TRANS = 45;      // длина расхождения/схождения
const BRANCH_HALF = 22;     // полуширина боковой улицы
const ISLAND_HALF = 16;     // полуширина квартала между ветками
export interface Street { c: number; half: number }
interface Fork { z0: number; z1: number; k: number }
const forkCache = new Map<number, Fork | null>();
function forkOf(k: number): Fork | null {
  const hit = forkCache.get(k);
  if (hit !== undefined) return hit;
  let f: Fork | null = null;
  const z0 = k * FORK_STEP + 120 + hash2(k * 71 + 3, 43) * 120;
  if (cityWeight(z0) > 0.7 && cityWeight(z0 + 420) > 0.7 && hash2(k * 73 + 1, 47) < 0.7) {
    f = { z0, z1: z0 + 260 + hash2(k * 79 + 5, 53) * 140, k };
  }
  forkCache.set(k, f);
  return f;
}
export function forkAt(z: number): Fork | null {
  const k = Math.floor(z / FORK_STEP);
  for (let i = k - 1; i <= k; i++) {
    const f = forkOf(i);
    if (f && z >= f.z0 - FORK_TRANS && z <= f.z1 + FORK_TRANS) return f;
  }
  return null;
}
/** улицы в точке z: одна (проспект) или две (ветки развилки) с плавным расхождением */
export function streetsAt(z: number): Street[] {
  const f = forkAt(z);
  if (!f) return [{ c: 0, half: STREET_HALF }];
  const tIn = Math.max(0, Math.min(1, (z - (f.z0 - FORK_TRANS)) / FORK_TRANS));
  const tOut = Math.max(0, Math.min(1, ((f.z1 + FORK_TRANS) - z) / FORK_TRANS));
  const t = Math.min(tIn, tOut);
  const k = t * t * (3 - 2 * t);
  const off = (ISLAND_HALF + BRANCH_HALF) * k;
  const half = STREET_HALF + (BRANCH_HALF - STREET_HALF) * k;
  return [{ c: -off, half }, { c: off, half }];
}
/** внутри ли развилки полностью (для острова): 0..1 */
export function islandAt(z: number): number {
  const f = forkAt(z);
  if (!f) return 0;
  return z >= f.z0 && z <= f.z1 ? 1 : 0;
}
/** мостовая: 0..1 по ближайшей улице (край 3 м) */
export function roadWeightAt(u: number, z: number): number {
  const d = u - pisteCenterX(z);
  let best = 0;
  for (const st of streetsAt(z)) {
    const w = Math.max(0, Math.min(1, (st.half - Math.abs(d - st.c)) / 3));
    if (w > best) best = w;
  }
  return best;
}
/** внешняя граница города по |u−ось|: за ней стена террас */
export function cityEdgeAt(z: number): number {
  const sts = streetsAt(z);
  let e = 0;
  for (const st of sts) e = Math.max(e, Math.abs(st.c) + st.half);
  return e + 1.5 + 2 * 9 + 6 + 2 * 9 + 4; // два ряда зданий (усреднённо) + переулок
}
/**
 * ★ СТЕНА ГОРОДА: за внешним рядом земля круто уходит вверх (подпорная стена
 * террас) — из города не выехать. Возвращает добавку высоты.
 */
export function cityWallAt(u: number, z: number): number {
  const d = Math.abs(u - pisteCenterX(z)) - cityEdgeAt(z);
  if (d <= 0) return 0;
  const t = Math.min(1, d / 8);
  return t * t * (3 - 2 * t) * 16 + Math.max(0, d - 8) * 0.9;
}

const SEG = 240;          // сегмент генерации вдоль z
const cache = new Map<number, Building[]>();
let padOff = false;
let nextId = 1;

/** здания сегмента s (обе стороны, оба ряда) */
export function citySegment(s: number): Building[] {
  const hit = cache.get(s);
  if (hit) return hit;
  const out: Building[] = [];
  const z0 = s * SEG;
  if (cityWeight(z0 + SEG * 0.5) > 0.55) {
    // фронты: [сторона фасада (куда смотрит), индекс улицы, наружный ли фронт]
    // наружные фронты проспекта — как раньше (два ряда); у развилки добавляются
    // внутренние фронты острова (по одному ряду с каждой стороны)
    // фронт: улица (0 — левая/единственная, −1 — правая/последняя), её край
    // (edge −1 левый / +1 правый) и наружный ли он. Здание стоит ЗА краем
    // (по edge), фасадом смотрит на улицу: side = −edge.
    const fronts: Array<{ edge: number; street: number; outer: boolean }> = [
      { edge: -1, street: 0, outer: true }, { edge: 1, street: -1, outer: true },
      { edge: 1, street: 0, outer: false }, { edge: -1, street: -1, outer: false },
    ];
    for (const fr of fronts) {
      const side = -fr.edge; // куда смотрит фасад
      for (let row = 0; row < (fr.outer ? 2 : 1); row++) {
        // второй ряд не везде: сзади улицы должно быть видно город, а не стену
        if (row === 1 && hash2(s * 17 + side * 5, 41) < 0.35) continue;
        let z = z0 + hash2(s * 31 + side + row * 3, 7) * 10;
        let i = 0;
        while (z < z0 + SEG - 6) {
          const S = s * 977 + side * 131 + row * 53 + i * 17 + (fr.outer ? 0 : 7919);
          const roll = hash2(S, 61);
          let kind: number = CK.TENEMENT;
          if (roll > 0.94) kind = CK.CLOCKTOWER;
          else if (roll > 0.86) kind = CK.DOMEHALL;
          else if (roll > 0.72) kind = CK.FACTORY;
          else if (roll > 0.58) kind = CK.WAREHOUSE;
          else if (roll > 0.54 && row === 1) kind = CK.GASHOLDER;
          const hl =
            kind === CK.CLOCKTOWER ? 4 + hash2(S + 1, 3) * 1.5
            : kind === CK.FACTORY ? 12 + hash2(S + 1, 3) * 8
            : kind === CK.WAREHOUSE ? 10 + hash2(S + 1, 3) * 6
            : kind === CK.DOMEHALL ? 8 + hash2(S + 1, 3) * 3
            : kind === CK.GASHOLDER ? 9 + hash2(S + 1, 3) * 3
            : 6 + hash2(S + 1, 3) * 5;
          const hw =
            kind === CK.CLOCKTOWER ? hl
            : kind === CK.FACTORY ? 9 + hash2(S + 2, 5) * 4
            : kind === CK.DOMEHALL ? hl
            : kind === CK.GASHOLDER ? hl
            : 6 + hash2(S + 2, 5) * 3;
          const floors =
            kind === CK.CLOCKTOWER ? 8 : kind === CK.FACTORY ? 2 : kind === CK.WAREHOUSE ? 2
            : kind === CK.DOMEHALL ? 2 : kind === CK.GASHOLDER ? 4 : 3 + Math.floor(hash2(S + 3, 11) * 3.99);
          const fh = kind === CK.FACTORY ? 5.5 : kind === CK.WAREHOUSE ? 4.5 : 3.4;
          const h = floors * fh;
          const roof: Building['roof'] =
            kind === CK.FACTORY ? 'saw' : kind === CK.DOMEHALL ? 'dome' : kind === CK.CLOCKTOWER ? 'spire'
            : kind === CK.WAREHOUSE ? 'flat' : hash2(S + 4, 13) < 0.5 ? 'mansard' : 'flat';
          const roofAccess = fr.outer && row === 0 && (roof === 'flat' || roof === 'mansard') && hash2(S + 10, 37) < 0.35;
          if (roofAccess) z += RAMP_L; // переулок под пандус
          const zc = z + hl;
          // ★ фронт улицы в этой точке: у проспекта — его край; у развилки —
          // край соответствующей ветки. Внутри переходов развилки не строим.
          const sts = streetsAt(zc);
          const stsA = streetsAt(z), stsB = streetsAt(z + hl * 2);
          const inTrans = sts.length !== stsA.length || sts.length !== stsB.length ||
            (sts.length === 2 && Math.abs(sts[0].c - stsA[0].c) + Math.abs(sts[0].c - stsB[0].c) > 0.5);
          if (!fr.outer && sts.length < 2) { z += hl * 2; i++; continue; }
          if (inTrans) { z += hl * 2; i++; continue; }
          const st = fr.street === 0 ? sts[0] : sts[sts.length - 1];
          const wallOff = st.c + fr.edge * st.half;
          // остров узкий: внутренние здания мельче
          const hwI = fr.outer ? hw : Math.min(hw, ISLAND_HALF - 1);
          const off = wallOff + fr.edge * (1.5 + (row === 0 ? hwI : 8 * 2 + 6 + hw));
          // касательная улицы в этой точке (координаты долины): фасад — вдоль неё
          const cA = pisteCenterX(zc - 6) + st.c, cB = pisteCenterX(zc + 6) + st.c;
          const yaw = Math.atan2(cB - cA, 12);
          out.push({
            id: nextId++,
            yaw,
            u: pisteCenterX(zc) + off,
            z: zc, hw: fr.outer ? hw : Math.min(hw, ISLAND_HALF - 1), hl, side, row, h, kind,
            style: Math.floor(hash2(S + 5, 17) * 2.99),
            floors,
            roof,
            chimneys: kind === CK.FACTORY ? 2 + Math.floor(hash2(S + 6, 19) * 2) : hash2(S + 6, 19) < 0.6 ? 1 : 0,
            balconies: kind === CK.TENEMENT && hash2(S + 7, 23) < 0.6,
            padY: NaN,
            roofAccess,
            rampY0: NaN,
          });
          // стык или переулок
          z += hl * 2 + (hash2(S + 8, 29) < 0.2 ? 6 + hash2(S + 9, 31) * 6 : 0.6);
          i++;
        }
      }
    }
  }
  cache.set(s, out);
  if (cache.size > 64) cache.clear();
  return out;
}

/** здания вокруг точки (по z ± один сегмент) */
export function cityNear(z: number): Building[] {
  const s = Math.floor(z / SEG);
  const a = citySegment(s - 1), b = citySegment(s), c = citySegment(s + 1);
  if (!a.length && !c.length) return b;
  return a.concat(b, c);
}

/** локальные координаты точки относительно здания (с учётом поворота yaw) */
export function localOf(b: Building, u: number, z: number): { lu: number; lz: number } {
  const du = u - b.u, dz = z - b.z;
  const c = Math.cos(b.yaw), sn = Math.sin(b.yaw);
  return { lu: du * c - dz * sn, lz: du * sn + dz * c };
}

/** высота площадки здания — рельеф в его центре БЕЗ площадок (иначе рекурсия) */
export function buildingPad(b: Building): number {
  if (!Number.isNaN(b.padY)) return b.padY;
  padOff = true;
  // ★ по НИЖНЕМУ углу со стороны улицы: фасад не должен висеть в воздухе
  const zLo = b.z + b.hl;
  const uS = b.u + b.side * b.hw;
  b.padY = Math.min(terrainSample(b.u, b.z), terrainSample(uS, zLo)) + 0.4;
  padOff = false;
  return b.padY;
}

function rampStart(b: Building): number {
  if (!Number.isNaN(b.rampY0)) return b.rampY0;
  padOff = true;
  b.rampY0 = terrainSample(b.u, b.z - b.hl - RAMP_L);
  padOff = false;
  return b.rampY0;
}

/** высота пандуса на крышу в точке (или null): от земли в начале переулка до крыши */
export function cityRampAt(u: number, z: number, b: Building): number | null {
  if (!b.roofAccess) return null;
  const lc = localOf(b, u, z);
  if (Math.abs(lc.lu) > b.hw + 0.5) return null;
  const zs = -b.hl - RAMP_L;
  if (lc.lz < zs || lc.lz > -b.hl) return null;
  const t = (lc.lz - zs) / RAMP_L;
  const k = t * t * (3 - 2 * t);
  const y0 = rampStart(b);
  const y1 = buildingPad(b) + b.h + (b.roof === 'mansard' ? 2.2 : 0);
  return y0 + (y1 - y0) * k;
}

/**
 * Площадка города в точке рельефа: вес 0..1 и высота. Здание выравнивает землю
 * под собой и на 4 м вокруг; между соседними площадками — уступ (подпорная
 * стенка), его рисует сам рельеф. Пандусы на крыши — тоже рельеф.
 */
export function cityPadAt(u: number, z: number): { w: number; y: number } | null {
  if (padOff) return null;
  const list = cityNear(z);
  let bestW = 0;
  let bestY = 0;
  for (const b of list) {
    const ry = cityRampAt(u, z, b);
    if (ry !== null) {
      // край пандуса поперёк — 1.5 м спада
      const du = Math.abs(localOf(b, u, z).lu) - b.hw + 0.5;
      const w = du <= 0 ? 1 : 1 - du / 1.5;
      if (w > bestW) { bestW = w; bestY = ry; }
      continue;
    }
    const lc = localOf(b, u, z);
    const du = Math.abs(lc.lu) - b.hw;
    const dz = Math.abs(lc.lz) - b.hl;
    if (du > 4 || dz > 4) continue;
    const d = Math.max(du, dz);
    const w = d <= 0 ? 1 : 1 - d / 4;
    if (w > bestW) { bestW = w; bestY = buildingPad(b); }
  }
  if (bestW <= 0) return null;
  const k = bestW * bestW * (3 - 2 * bestW);
  return { w: k, y: bestY };
}

/**
 * Крыша города в мировой точке: высота поверхности, по которой едут.
 * Плоские и мансардные крыши — на уровне парапета; шедовые — по нижнему
 * скату (усреднённо); купола и шпили — не крыши (по ним не ездят).
 */
export function cityRoofAt(worldX: number, z: number): { y: number; eave: number; ridge: number } | null {
  const u = toValleyU(worldX, z);
  const list = cityNear(z);
  for (const b of list) {
    const lc = localOf(b, u, z);
    if (Math.abs(lc.lu) > b.hw || Math.abs(lc.lz) > b.hl) {
      // пандус на крышу — тоже поверхность, по которой едут (без стен)
      const ry = cityRampAt(u, z, b);
      if (ry !== null) return { y: ry, eave: ry - 0.5, ridge: ry };
      continue;
    }
    if (b.roof === 'dome' || b.roof === 'spire') continue;
    const pad = buildingPad(b);
    const top = pad + b.h + (b.roof === 'mansard' ? 2.2 : b.roof === 'saw' ? 1.5 : 0);
    return { y: top, eave: pad + b.h, ridge: top };
  }
  return null;
}
