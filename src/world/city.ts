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
}
export const RAMP_L = 22;
/** ★ полуширина улицы (мостовая от фасада до фасада ~60 м) — шире лыжного коридора */
export const STREET_HALF = 30;

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
    for (const side of [-1, 1]) {
      for (let row = 0; row < 2; row++) {
        // второй ряд не везде: сзади улицы должно быть видно город, а не стену
        if (row === 1 && hash2(s * 17 + side * 5, 41) < 0.35) continue;
        let z = z0 + hash2(s * 31 + side + row * 3, 7) * 10;
        let i = 0;
        while (z < z0 + SEG - 6) {
          const S = s * 977 + side * 131 + row * 53 + i * 17;
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
          const roofAccess = row === 0 && (roof === 'flat' || roof === 'mansard') && hash2(S + 10, 37) < 0.35;
          if (roofAccess) z += RAMP_L; // переулок под пандус
          // ряд 1 стоит за рядом 0: отступ по глубине первого ряда (усреднённо 8) + переулок
          const off = STREET_HALF + 1.5 + (row === 0 ? hw : 8 * 2 + 6 + hw);
          const zc = z + hl;
          out.push({
            id: nextId++,
            u: pisteCenterX(zc) + side * off,
            z: zc, hw, hl, side, row, h, kind,
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

/** высота площадки здания — рельеф в его центре БЕЗ площадок (иначе рекурсия) */
export function buildingPad(b: Building): number {
  if (!Number.isNaN(b.padY)) return b.padY;
  padOff = true;
  // ★ по НИЖНЕМУ углу со стороны улицы: фасад не должен висеть в воздухе
  const zLo = b.z + b.hl;
  const uS = b.u - b.side * b.hw;
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
  if (Math.abs(u - b.u) > b.hw + 0.5) return null;
  const zs = b.z - b.hl - RAMP_L;
  if (z < zs || z > b.z - b.hl) return null;
  const t = (z - zs) / RAMP_L;
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
      const du = Math.abs(u - b.u) - b.hw + 0.5;
      const w = du <= 0 ? 1 : 1 - du / 1.5;
      if (w > bestW) { bestW = w; bestY = ry; }
      continue;
    }
    const du = Math.abs(u - b.u) - b.hw;
    const dz = Math.abs(z - b.z) - b.hl;
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
    if (Math.abs(u - b.u) > b.hw || Math.abs(z - b.z) > b.hl) continue;
    if (b.roof === 'dome' || b.roof === 'spire') continue;
    const pad = buildingPad(b);
    const top = pad + b.h + (b.roof === 'mansard' ? 2.2 : b.roof === 'saw' ? 1.5 : 0);
    return { y: top, eave: pad + b.h, ridge: top };
  }
  return null;
}
