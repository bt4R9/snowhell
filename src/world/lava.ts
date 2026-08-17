import * as THREE from 'three/webgpu';
import { spriteCloud, SpriteCloud } from '../fx/sprites';
import { lambert, basic, line } from '../core/mat';
import { noise2, hash2 } from './noise';
import { pisteCenterX, volcanoWeight } from './features';

// ЛАВОВЫЕ ЯЗЫКИ.
//
// Лава — вязкая: она не стоит уровнем, как вода, а НАТЕКАЕТ на рельеф слоем
// в пару метров и ползёт вниз по линии падения. Отсюда всё устройство:
//  • поверхность языка = земля + толщина (лава драпирует склон, а не заливает
//    его до горизонтали);
//  • языков несколько, они широкие и идут сверху вниз — между ними и надо
//    лавировать, потому что доска идёт в разы быстрее расплава;
//  • язык живой: его край дышит, а сам он медленно смещается вбок, поэтому
//    коридор между потоками не выучивается наизусть.
//
// Прошлая версия была узкой рекой ровно по оси долины: она не текла, не
// оставляла выбора и только мешала читать спуск.

// Общее время мира: языки живут во времени, и физика с картинкой обязаны
// читать ОДНО И ТО ЖЕ значение — иначе расплав нарисован в одном месте, а
// убивает в другом.
let worldTime = 0;
export function setLavaTime(t: number): void {
  worldTime = t;
}
export function lavaTime(): number {
  return worldTime;
}

// ★ ЛАВА — ЖИДКОСТЬ, А НЕ КРАСКА НА СКЛОНЕ.
// Прошлые версии клали расплав слоем поверх рельефа: он повторял каждый бугор
// и потому читался покрашенной землёй. Жидкость так себя не ведёт — её
// поверхность ГОРИЗОНТАЛЬНА, она заливает низины и обтекает возвышенности.
// Отсюда устройство: у потока есть УРОВЕНЬ (высота, одинаковая поперёк
// склона), и лава есть там, где земля ниже уровня. Берега, разливы в чашах и
// сужения на перегибах получаются сами собой, из рельефа.
//
// Уровень спадает вниз по склону вместе со сглаженной землёй: расплав течёт
// от жерла и постепенно остывает, поэтому у языка есть конец.

/** Шаг между вулканами вдоль спуска */
// ★ ВСТРЕЧА С ЛАВОЙ — НЕ РЕДКОЕ СОБЫТИЕ, А ЛИЦО БИОМА. При шаге в 900 м и
// половине действующих жерл на вулкан приходилось ехать под две минуты —
// биом успевал прочитаться как «просто тёмный склон».
// жерл тоже больше: от каждого идут свои языки, и склон перестаёт быть пустым
const VENT_STEP = 300;
/** Насколько уровень стоит выше сглаженного дна */
const LEVEL_RISE = 2.2;
/** Дальше этого от оси потока лава не растекается */
const MAX_SPREAD = 150;

export interface Vent {
  k: number;
  z: number;    // жерло
  u: number;    // ось в координатах долины
  reach: number; // длина потока вниз по склону
  coneR: number; // радиус конуса
  coneH: number; // высота конуса над землёй
  ph: number;
}

const ventCache = new Map<number, Vent | null>();

export function ventAt(k: number): Vent | null {
  const hit = ventCache.get(k);
  if (hit !== undefined) return hit;
  let res: Vent | null = null;
  if (noise2(k * 3.7 + 11.3, 5.5) > -0.75) {
    const z = k * VENT_STEP + (noise2(k * 5.1, 2.2) * 0.5 + 0.5) * VENT_STEP * 0.4;
    const side = noise2(k * 7.3, 8.8) > 0 ? 1 : -1;
    res = {
      k,
      z,
      // вулкан стоит В СТОРОНЕ от линии спуска: он ориентир и источник, но не
      // стена поперёк дороги
      // ★ ЭТО ГОРА, А НЕ БУГОР. Стратовулкан ростом с окружающий хребет и
      // основанием под километр: он обязан доминировать в кадре, иначе это
      // не источник, а деталь. Стоит далеко в стороне — вблизи такую массу
      // не прочитать целиком.
      // отступ считается ПОСЛЕ радиуса — см. ниже
      u: 0,
      reach: 700 + (noise2(k * 4.4, 6.6) * 0.5 + 0.5) * 700,
      coneR: 420 + (noise2(k * 8.1, 3.1) * 0.5 + 0.5) * 420,
      coneH: 380 + (noise2(k * 9.7, 5.9) * 0.5 + 0.5) * 340,
      ph: k * 13.9,
    };
    // ★ ГОРА НЕ ДОЛЖНА НАКРЫВАТЬ ТРАССУ. Конус вырос до километра в радиусе, а
    // отступ остался прежним — игрок ехал ПОД его склоном, и сверху висел
    // чёрный потолок. Отступ обязан считаться от размера самой горы:
    // подошва отходит от оси не ближе чем на 260 м.
    // ★ ОТСТУП СЧИТАЕТСЯ ОТ ВЫСОТЫ, А НЕ ТОЛЬКО ОТ РАДИУСА. Прежние 260 м
    // казались достаточными, пока подошва висела в воздухе и низ горы был не
    // виден. Теперь конус утоплен и виден целиком — и с трёхсот метров его
    // склон закрывает половину неба: это стена, а не ориентир. Гору видно
    // целиком примерно с трёх её высот, отсюда и отступ.
    res.u =
      pisteCenterX(z) +
      side *
        (res.coneR + res.coneH * 1.5 + 240 + (noise2(k * 2.9, 4.4) * 0.5 + 0.5) * 420);
  }
  ventCache.set(k, res);
  if (ventCache.size > 256) ventCache.clear();
  return res;
}

/** Ближайший вулкан выше по склону, из которого может течь на этом z */
export function ventFor(z: number): Vent | null {
  const k0 = Math.floor(z / VENT_STEP);
  for (let k = k0; k >= k0 - 2; k--) {
    const v = ventAt(k);
    if (v && z >= v.z - 40 && z <= v.z + v.reach) return v;
  }
  return null;
}

// ★ ЛАВА — ЦЕПЬ ОЗЁР, А НЕ РЕКА.
// Пять попыток нарисовать текущую реку провалились по одной причине: у ленты,
// протянутой по склону, поверхность обязана где-то ломаться. Идёт вниз по
// земле — упирается в запрет на подъём — становится плоской: в профиль это
// ломаная, как её ни сглаживай.
//
// У жидкости в ЧАШЕ сломаться нечему. Расплав скапливается во впадинах и
// стоит там строго горизонтально; форма пятна целиком задаётся горизонталью
// рельефа, то есть гладкая по построению, а урез идёт по контуру склона.
// Между озёрами — короткие сливы, и они коротки настолько, что излому негде
// накопиться.
//
// Побочная выгода важна не меньше: озёра НЕПОДВИЖНЫ, поэтому их геометрия
// строится один раз и стримится как скалы. Прежнее полотно пересобиралось
// каждые 30 м пути — это и был спайк раз в секунду.


// ─── ЛАВА ЖИВЁТ В pools.ts ─────────────────────────────────────────────────
// Озёра, языки, провалы, их меши, шейдер и частицы переехали в world/pools.ts
// (чаши строятся ПОД лаву явной формулой). Здесь остались тонкие делегаты для
// физики и раскраски рельефа — чтобы игроку и терраину не менять импортов.
import {
  poolLevelAt, flowAt as poolFlowAt, poolHeatAt, poolCrustAt, poolListsFor,
} from './pools';

/**
 * Расплав под точкой (координаты долины): уровень зеркала озера/колодца — там
 * доска ТОНЕТ; либо верх языка — по нему можно ехать. null — сухо.
 */
export function lavaAt(
  u: number,
  z: number,
  ground: (x: number, zz: number) => number,
  toWorldX: (uu: number, zz: number) => number
): number | null {
  void ground; void toWorldX;
  const lvl = poolLevelAt(u, z);
  if (lvl !== null) return lvl;
  const f = poolFlowAt(u, z);
  return f ? f.y : null;
}

/** Опора: язык держит доску (верх расплава), озеро — нет (тонем) */
export function lavaSupportAt(
  u: number,
  z: number,
  ground: (x: number, zz: number) => number,
  toWorldX: (uu: number, zz: number) => number
): number | null {
  void ground; void toWorldX;
  const f = poolFlowAt(u, z);
  return f ? f.y : null;
}

/** Внутри озера или колодца — доска тонет */
export function inPoolAt(u: number, z: number): number | null {
  return poolLevelAt(u, z);
}

/** прокал земли рядом с расплавом 0..1 */
export function hazardHeatAt(
  u: number,
  z: number,
  ground: (x: number, zz: number) => number,
  toWorldX: (uu: number, zz: number) => number
): number {
  void ground; void toWorldX;
  return poolHeatAt(u, z);
}

/** застывшая корка по берегам 0..1 */
export function lavaCrustAt(
  u: number,
  z: number,
  ground: (x: number, zz: number) => number,
  toWorldX: (uu: number, zz: number) => number
): number {
  return poolCrustAt(u, z, ground(toWorldX(u, z), z));
}

/**
 * Плоские списки для GPU-раскраски чанка (см. chunkshade.ts):
 *  circles: [u, z, R, fall] — озёра и колодцы
 *  nodes:   [u, z, wS_left, wS_right] — точки языков (fall 26)
 *  lakes:   [u, z, r, y] — зеркала с уровнем (корка по берегам)
 *  steams:  [u, z, r·1.7, 0] — устья пара
 */
export function hazardListsFor(
  u0: number,
  u1: number,
  z0: number,
  z1: number,
  ground: (x: number, zz: number) => number,
  toWorldX: (uu: number, zz: number) => number
): { circles: number[]; nodes: number[]; lakes: number[]; steams: number[] } {
  void ground; void toWorldX;
  const l = poolListsFor(z0, z1);
  const steams: number[] = [];
  const cxA = Math.floor(u0 / STEAM_CELL) - 1;
  const cxB = Math.floor(u1 / STEAM_CELL) + 1;
  const czA = Math.floor(z0 / STEAM_CELL) - 1;
  const czB = Math.floor(z1 / STEAM_CELL) + 1;
  for (let cx = cxA; cx <= cxB; cx++) {
    for (let cz = czA; cz <= czB; cz++) {
      const s = steamAt(cx, cz);
      if (s) steams.push(s.u, s.z, s.r * 1.7, 0);
    }
  }
  return { ...l, steams };
}

// --- ПАРОВЫЕ ВЫХОДЫ ---
// ★ ЭТО МЕХАНИКА, А НЕ ЭФФЕКТ. Из трещин бьёт перегретый пар: попал в струю в
// момент выброса — подбросило. Значит положение и ФАЗА должны быть чистыми
// функциями координат, иначе физика и картинка разойдутся, и игрока будет
// подбрасывать там, где ничего не видно.

const STEAM_CELL = 120;
/** сколько длится выброс и сколько пауза */
// ★ ДВЕ ФАЗЫ. Струя, бьющая без предупреждения, читается несправедливой: её
// нельзя ни поймать нарочно, ни объехать. Поэтому сначала идёт ПОДГОТОВКА —
// из щели сочится парок и подрагивает пыль, — и только потом выброс. А чтобы
// место было понятно ЗАРАНЕЕ, вокруг устья лежит светлая корка (см.
// steamMarkAt): её видно за сотню метров, ещё до всякой анимации.
const STEAM_WARN = 1.5;
const STEAM_ON = 1.15;
const STEAM_PERIOD = 5.6;

export interface Steam {
  u: number;
  z: number;
  r: number;
  phase: number;
}

/** Паровые выходы в клетке сетки (координаты долины) */
// ★ УСТЬЯ КЭШИРУЮТСЯ. Их спрашивает раскраска рельефа — для каждой вершины
// каждого чанка и каждой ячейки дальнего плана. Без кэша это 27 вызовов шума
// на вершину: замер поймал кадры по 35 мс на сборке дальней сетки.
const steamCache = new Map<number, Steam | null>();

export function steamAt(cx: number, cz: number): Steam | null {
  const key = cx * 100003 + cz;
  const hit = steamCache.get(key);
  if (hit !== undefined) return hit;
  let res: Steam | null = null;
  if (noise2(cx * 7.7 + 3.1, cz * 5.3 - 8.8) >= 0.15) {
    res = {
      u: (cx + 0.5) * STEAM_CELL + (noise2(cx * 3.3, cz * 9.1) * 0.5) * STEAM_CELL * 0.7,
      z: (cz + 0.5) * STEAM_CELL + (noise2(cx * 11.7, cz * 2.9) * 0.5) * STEAM_CELL * 0.7,
      r: 9 + (noise2(cx * 13.1, cz * 6.6) * 0.5 + 0.5) * 6,
      phase: (noise2(cx * 17.3, cz * 4.2) * 0.5 + 0.5) * STEAM_PERIOD,
    };
  }
  steamCache.set(key, res);
  if (steamCache.size > 4096) steamCache.clear();
  return res;
}

/** Выходы рядом с точкой */
export function steamsNear(u: number, z: number): Steam[] {
  const cx = Math.floor(u / STEAM_CELL);
  const cz = Math.floor(z / STEAM_CELL);
  const out: Steam[] = [];
  for (let i = cx - 1; i <= cx + 1; i++) {
    for (let j = cz - 1; j <= cz + 1; j++) {
      const s = steamAt(i, j);
      if (s) out.push(s);
    }
  }
  return out;
}

/** Сила струи 0..1 в данный момент */
export function steamPower(s: Steam, time: number): number {
  const t = (time + s.phase) % STEAM_PERIOD;
  if (t < STEAM_WARN || t > STEAM_WARN + STEAM_ON) return 0;
  // резкий выброс и спад
  const k = (t - STEAM_WARN) / STEAM_ON;
  return Math.sin(Math.PI * k) ** 0.6;
}

/** Подготовка 0..1: сколько осталось до выброса, в виде нарастания */
export function steamWarn(s: Steam, time: number): number {
  const t = (time + s.phase) % STEAM_PERIOD;
  if (t > STEAM_WARN) return 0;
  return (t / STEAM_WARN) ** 1.6;
}

/**
 * Корка вокруг устья: 1 в центре, 0 за краем. Рисуется в цвет рельефа —
 * это и есть постоянная метка опасного (и полезного) места.
 */
export function steamMarkAt(u: number, z: number): number {
  let best = 0;
  const cx = Math.floor(u / STEAM_CELL);
  const cz = Math.floor(z / STEAM_CELL);
  for (let i = cx - 1; i <= cx + 1; i++) {
    for (let j = cz - 1; j <= cz + 1; j++) {
      const s = steamAt(i, j);
      if (!s) continue;
      const d = Math.hypot(u - s.u, z - s.z) / (s.r * 1.7);
      if (d < 1) best = Math.max(best, 1 - d);
    }
  }
  return best;
}

// --- ОГНЕННЫЕ КАМНИ ---
// ★ ТОЖЕ МЕХАНИКА. Извержение не украшение: раскалённые глыбы падают на
// трассу, и от них надо уворачиваться. Список активных камней живёт здесь,
// потому что и рисует их, и проверяет попадание одно и то же место — иначе
// «убило тем, чего не видно».

/**
 * ★ ТРАЕКТОРИЯ ПИСАНАЯ, А НЕ БАЛЛИСТИЧЕСКАЯ. Око бьёт с четырёх километров:
 * равномерный полёт означает шестьсот метров в секунду — у земли такой снаряд
 * прочерчивает кадр насквозь, и уворачиваться не от чего. Но и зарождать его
 * рядом с игроком нельзя: тогда он не вылетает из ока, а возникает из воздуха.
 * Поэтому путь задан явно и проходится НЕРАВНОМЕРНО: почти вся дистанция
 * съедается в первые доли пути, а последние сотни метров снаряд идёт медленно.
 * Видно и вылет из ока, и читаемую дугу над головой.
 */
export interface Bomb {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;   // мгновенная скорость — для хвоста
  alive: boolean;
  sx: number; sy: number; sz: number;   // откуда вылетел
  tx: number; ty: number; tz: number;   // куда упадёт
  hitY: number;
  arc: number;    // высота горба над прямой
  dur: number;
  t: number;
  eta: number;    // сколько ещё лететь, с
  r: number;
  seed: number;
  /** прицельный (не из веера «куда он может свернуть») */
  aimed: boolean;
}

/** доля пути, пройденная к моменту k: резкий старт, медленный подход */
function shellEase(k: number): number {
  // Показатель подобран замером скорости у земли: 3.4 → 47 м/с, 2.6 → 76,
  // 2.2 → 82. Даже последнее читалось как подтормаживание перед касанием,
  // 1.7 → 227 м/с — это уже не прочитать. Берём 2.0: около полутора сотен
  // у земли, то есть быстро и ровно, но метку успеваешь объехать.
  return 1 - Math.pow(1 - k, 2.0);
}

/** Взрыв: место и сила. Копится здесь, забирается отрисовкой раз в кадр. */
export interface Impact {
  x: number; y: number; z: number; r: number;
  /** снаряд был прицельным — по таким Око и пристреливается */
  aimed: boolean;
}

const bombs: Bomb[] = [];
const impacts: Impact[] = [];
/** стреляют ли жерла (выключено до переделки вулканов) */
const CRATER_FIRE = false;

export function bombList(): Bomb[] {
  return bombs;
}

/**
 * Взрывы этого кадра.
 * ★ СПИСОК НЕ ЗАБИРАЮТ, ЕГО ЧИТАЮТ. Раньше отрисовка забирала взрывы себе и
 * чистила список — а игрок проверяет попадания РАНЬШЕ в том же кадре, до того
 * как взрыв туда попадёт, и к следующему кадру список был уже пуст. Ударная
 * волна не срабатывала ни разу. Теперь список живёт кадр и чистится в начале
 * шага снарядов, то есть после проверки игроком и перед отрисовкой.
 */
export function impactList(): Impact[] {
  return impacts;
}

/**
 * ★ ВЫСТРЕЛ ОКА. Тот же снаряд, что летит из жерла, но выпущенный прицельно:
 * башня бьёт по тому месту, где игрок будет через время полёта. Список общий,
 * поэтому и попадание, и отрисовка достаются даром.
 */
export function launchBomb(
  sx: number,
  sy: number,
  sz: number,
  tx: number,
  tz: number,
  ty: number,
  flight: number,
  aimed = false
): void {
  if (bombs.length > 120) return;
  bombs.push({
    x: sx, y: sy, z: sz,
    vx: 0, vy: 0, vz: 0,
    alive: true,
    sx, sy, sz,
    tx, ty, tz,
    hitY: ty,
    // горб тем выше, чем длиннее выстрел, но в разумных пределах
    arc: Math.min(240, 40 + Math.hypot(tx - sx, tz - sz) * 0.07),
    dur: flight,
    t: 0,
    eta: flight,
    // ★ РАЗМЕР РАЗНЫЙ. Одинаковые снаряды читаются как штамповка, а от глыбы
    // и от камешка уходить надо по-разному. Степень 2.4 смещает выборку к
    // мелким: крупные редки и потому событие.
    r: 1.0 + Math.pow(Math.random(), 2.4) * 4.6,
    seed: Math.random() * 100,
    aimed,
  });
}

/**
 * Подорвать снаряд, оказавшийся вплотную к игроку, и записать взрыв.
 * ★ ЭТО ВЗВОД, А НЕ ПРИГОВОР. Функция называлась bombHitsPlayer и её результат
 * означал краш — при том, что проверяется здесь НЕ прямое касание, а сфера
 * радиусом r+2.6 вокруг летящего снаряда. Получалось, что любой снаряд, легший
 * рядом, сбивал игрока ДО того, как отработает двухзонная волна: она читает
 * impacts со следующего кадра, а impact создаётся здесь же. Поэтому просьба
 * «в ядре 55% нагрева и отшвырнуть» не работала — вместо неё был мгновенный
 * WIPEOUT. Теперь здесь только подрыв, а что стало с игроком, решает
 * blastHitsPlayer по расстоянию до эпицентра.
 */
export function detonateBombNear(px: number, py: number, pz: number): boolean {
  for (const b of bombs) {
    if (!b.alive) continue;
    const dx = b.x - px;
    const dy = b.y - (py + 0.9);
    const dz = b.z - pz;
    const rr = b.r + 2.6;
    if (dx * dx + dy * dy + dz * dz < rr * rr) {
      boom(b, 1.4);
      return true;
    }
  }
  return false;
}

/** Что сделал с игроком свежий взрыв: null — ничего */
export interface Blast {
  /** true — накрыло насмерть, false — только толкнуло */
  kill: boolean;
  /** единичное направление ОТ центра взрыва и сила 0..1 */
  dx: number;
  dz: number;
  push: number;
}

/**
 * ★ У ВЗРЫВА ДВЕ ЗОНЫ. Раньше вся ударная волна была смертельной, и разница
 * между «влетел в эпицентр» и «зацепило краем» не читалась вовсе. Ядро (60%
 * радиуса) убивает, кайма только отшвыривает — из неё можно уехать, если
 * удержишь доску.
 */
const BLAST_KILL = 0.5;

export function blastHitsPlayer(px: number, pz: number): Blast | null {
  let best: Blast | null = null;
  for (const i of impacts) {
    const dx = i.x - px;
    const dz = i.z - pz;
    // ★ РАДИУС ПОДОБРАН ПО РАЗЛОЖЕНИЮ ПРОМАХА. Центральный снаряд ложится в
    // среднем в четырёх-пяти метрах от игрока по каждой оси — при множителе
    // 3.2 (около шести метров у среднего снаряда) он раз за разом рвался
    // ВПРИТЫК мимо, и бездействие оставалось безнаказанным.
    const R = i.r * 4.6;
    const d2 = dx * dx + dz * dz;
    if (d2 >= R * R) continue;
    const d = Math.sqrt(d2) || 0.001;
    const kill = d < R * BLAST_KILL;
    if (kill) return { kill: true, dx: -dx / d, dz: -dz / d, push: 1 };
    // в кайме сила падает к внешнему краю
    const t = 1 - (d - R * BLAST_KILL) / (R * (1 - BLAST_KILL));
    if (!best || t > best.push) best = { kill: false, dx: -dx / d, dz: -dz / d, push: t };
  }
  return best;
}

/** снять снаряд с полёта и записать взрыв */
function boom(b: Bomb, scale = 1): void {
  b.alive = false;
  if (impacts.length < 24) {
    impacts.push({ x: b.x, y: b.y, z: b.z, r: b.r * scale, aimed: b.aimed });
  }
}

export class Volcanoes {
  readonly group = new THREE.Group();
  private built = new Map<number, THREE.Object3D>();
  private active: Vent | null = null;

  private static readonly N = 2600;
  private pos = new Float32Array(Volcanoes.N * 3);
  private vel = new Float32Array(Volcanoes.N * 3);
  private age = new Float32Array(Volcanoes.N);
  private life = new Float32Array(Volcanoes.N);
  private size = new Float32Array(Volcanoes.N);
  private col = new Float32Array(Volcanoes.N * 3);
  private geo = new THREE.BufferGeometry();
  // ★ ВЫБРОС — ЭТО ШТРИХИ, А НЕ ТОЧКИ. На снимках извержения фонтан состоит
  // из вытянутых следов: кусок летит быстро, и глаз (как и камера) видит его
  // дугой. Круглая точка читается конфетти. Поэтому на частицу две вершины —
  // сама она и хвост назад по вектору скорости.
  private line: THREE.LineSegments;
  private lpos: Float32Array;
  private lcol: Float32Array;
  /** зарево извержения: единственный настоящий источник света в биоме */
  // ★★★ СВЕЧЕНИЕ ЛАВЫ — КРАСНОЕ. Оранжево-жёлтые источники (0xff7a2a и родня)
  // заливали склон охрой на десятки метров вокруг, и биом читался пустыней: в
  // кадре рядом с игроком одновременно горело шесть таких, по 19–29 единиц с
  // 37–67 м. Цвет уводим в красный, силу режем — расплав должен подсвечивать
  // СВОЮ окрестность, а не красить весь склон.
  readonly light = new THREE.PointLight(0xff2f0c, 0, 2600, 1.6);

  private coneMat = lambert({
    vertexColors: true,
    flatShading: true,
  });
  // Кратер не белый диск: раскалённое озеро оранжевое, добела светится лишь
  // самая середина — на снимках так и есть.
  private craterMat = basic({ color: new THREE.Color(2.6, 0.6, 0.06) });

  constructor() {
    const N = Volcanoes.N;
    this.lpos = new Float32Array(N * 6);
    this.lcol = new Float32Array(N * 6);
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.lpos, 3));
    this.geo.setAttribute('color', new THREE.BufferAttribute(this.lcol, 3));
    for (let i = 0; i < N; i++) this.age[i] = 1e9;
    this.line = new THREE.LineSegments(
      this.geo,
      line({
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        fog: false,
      })
    );
    this.line.frustumCulled = false;
    this.group.add(this.line);
    this.group.add(this.light);
  }

  /** Стратоконус: вогнутый профиль, радиальные промоины, кальдера */
  private build(
    v: Vent,
    ground: (x: number, z: number) => number,
    toWorldX: (u: number, z: number) => number,
    segOverride?: number,
    ringOverride?: number
  ): THREE.Object3D {
    const SEG = segOverride ?? 44;   // по кругу
    const RINGS = ringOverride ?? 13; // по высоте
    const wx = toWorldX(v.u, v.z);
    const gy = ground(wx, v.z);
    const craterR = v.coneR * 0.13;

    const pos: number[] = [];
    const col: number[] = [];
    const dark = new THREE.Color(0x241d22);
    const ashGrey = new THREE.Color(0x5a5158);
    const hot = new THREE.Color(0x8a2b18);
    const veinCol = new THREE.Color(3.0, 0.7, 0.08);
    const tmp = new THREE.Color();

    // радиус кольца: ВОГНУТЫЙ профиль — у настоящего стратовулкана бока
    // круче к вершине, а подошва расплывается. Прямой конус читается кеглей.
    const radiusAt = (t: number, ang: number): number => {
      const base = v.coneR * Math.pow(1 - t, 0.62) + craterR * t;
      // промоины: частые борозды по склону, сходящиеся к вершине
      const gully = noise2(Math.cos(ang) * 6.5 + v.ph, Math.sin(ang) * 6.5) * 0.5 + 0.5;
      const lump = noise2(Math.cos(ang) * 2.1 - v.ph, Math.sin(ang) * 2.1) * 0.5 + 0.5;
      return base * (0.86 + lump * 0.24) * (1 - gully * 0.09 * (1 - t));
    };
    const heightAt = (t: number, ang: number): number => {
      const h = v.coneH * Math.pow(t, 1.12);
      const jag = noise2(Math.cos(ang) * 3.3 + v.ph * 2, Math.sin(ang) * 3.3) * 0.5 + 0.5;
      return h * (0.96 + jag * 0.08);
    };
    // ★ КОНУС УТОПЛЕН НИЖЕ САМОЙ НИЗКОЙ ТОЧКИ ПОДОШВЫ. Он ставился на одну
    // отметку — высоту своего центра, — а подошва у него шесть сотен метров
    // радиусом: при уклоне 0.667 м/м это перепад под восемьсот метров, и
    // низовая половина висела в воздухе. В кадре были видны её изнанки —
    // тёмные угловатые полотнища с прямыми кромками, ничем не похожие на
    // гору. Следовать за рельефом по кругу не выходит: между пробами он
    // успевает уйти на сотню метров. Поэтому основание опускается НИЖЕ всей
    // земли под подошвой, а тело растягивается — вершина остаётся на месте.
    let gMin = gy;
    for (let i = 0; i < 48; i++) {
      const a2 = (i / 48) * Math.PI * 2;
      for (const rf of [0.55, 0.8, 1.0]) {
        const r = radiusAt(0, a2) * rf;
        const pu = v.u + Math.cos(a2) * r;
        const pz = v.z + Math.sin(a2) * r;
        const g = ground(toWorldX(pu, pz), pz);
        if (g < gMin) gMin = g;
      }
    }
    // Запас глубины берётся от радиуса: между пробами по кругу рельеф успевает
    // уйти на десятки метров, и без запаса кромка местами всё равно всплывала
    // (замер: до +124 м). Утопленная подошва вдобавок смотрится лучше — гора
    // растёт ИЗ склона, а не стоит на нём.
    const base = gMin - gy - Math.max(60, v.coneR * 0.45);
    const stretch = (v.coneH - base) / v.coneH; // вершина остаётся на прежней высоте
    const node = (t: number, ang: number): [number, number, number] => {
      const r = radiusAt(t, ang);
      return [
        Math.cos(ang) * r,
        base + heightAt(t, ang) * stretch - 12,
        Math.sin(ang) * r,
      ];
    };

    for (let ri = 0; ri < RINGS; ri++) {
      const t0 = ri / RINGS;
      const t1 = (ri + 1) / RINGS;
      for (let si = 0; si < SEG; si++) {
        const a0 = (si / SEG) * Math.PI * 2;
        const a1 = ((si + 1) / SEG) * Math.PI * 2;
        const p00 = node(t0, a0);
        const p10 = node(t0, a1);
        const p01 = node(t1, a0);
        const p11 = node(t1, a1);
        pos.push(...p00, ...p10, ...p11);
        pos.push(...p00, ...p11, ...p01);
        // Цвет: тёмный базальт внизу, пепельные полосы выше, багровый прогрев
        // у самой кальдеры. Полосы идут по высоте — так лежат слои тефры.
        const tm = (t0 + t1) / 2;
        const band = noise2(tm * 9.0 + v.ph, Math.cos(a0) * 1.5) * 0.5 + 0.5;
        tmp.copy(dark).lerp(ashGrey, band * 0.55 * (0.35 + tm * 0.65));
        if (tm > 0.86) tmp.lerp(hot, (tm - 0.86) / 0.14);
        // ★ ЖИЛЫ ПО СКЛОНАМ. На снимках извержения по бокам конуса от кратера
        // вниз бегут раскалённые ручьи — именно они делают гору действующим
        // вулканом, а не тёмным холмом. Берём гребни шума по углу: узкие
        // полосы, яркие у кратера и гаснущие к подошве.
        // Частота по углу должна быть КРАТНА числу сегментов, иначе «узкая»
        // жила растягивается на целый сегмент — на 64 сегментах это 6°, и
        // получается луч прожектора. Берём частоту около 14 и режем по самой
        // вершине гребня.
        const vn = 1 - Math.abs(noise2(Math.cos(a0) * 14 + v.ph * 3, Math.sin(a0) * 14));
        const vein = Math.max(0, (vn - 0.965) / 0.035) * Math.pow(tm, 2.2);
        if (vein > 0.01) tmp.lerp(veinCol, Math.min(1, vein));
        for (let q = 0; q < 6; q++) col.push(tmp.r, tmp.g, tmp.b);
      }
    }

    // ЮБКА ДО ЗЕМЛИ: без неё конус — открытая воронка, и снизу видно его
    // изнанку вместо горы.
    for (let si = 0; si < SEG; si++) {
      const a0 = (si / SEG) * Math.PI * 2;
      const a1 = ((si + 1) / SEG) * Math.PI * 2;
      const p0 = node(0, a0);
      const p1 = node(0, a1);
      pos.push(p0[0], p0[1], p0[2], p1[0], p1[1], p1[2], p1[0], -140, p1[2]);
      pos.push(p0[0], p0[1], p0[2], p1[0], -140, p1[2], p0[0], -140, p0[2]);
      for (let q = 0; q < 6; q++) col.push(dark.r, dark.g, dark.b);
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    g.computeVertexNormals();

    const grp = new THREE.Group();
    grp.add(new THREE.Mesh(g, this.coneMat));

    // кальдера: раскалённое озеро чуть ниже кромки
    const cr = new THREE.CircleGeometry(craterR * 0.8, 20);
    cr.rotateX(-Math.PI / 2);
    const crater = new THREE.Mesh(cr, this.craterMat);
    crater.position.y = v.coneH * 0.93 - 12;
    grp.add(crater);

    grp.position.set(wx, gy, v.z);
    this.group.add(grp);
    return grp;
  }

  update(
    pz: number,
    dt: number,
    ground: (x: number, z: number) => number,
    toWorldX: (u: number, z: number) => number,
    volcano: (z: number) => number
  ): void {
    const on = volcano(pz) > 0.01;
    this.line.visible = on;
    this.light.visible = on;
    if (!on) {
      for (const [k, o] of this.built) {
        this.group.remove(o);
        this.built.delete(k);
      }
      return;
    }
    // ★ ГОРУ ВИДНО ИЗДАЛЕКА. Держим конусы в широком окне: вулкан ростом в
    // полкилометра, появившийся в двухстах метрах, выглядит фокусом.
    // ЗА КАДР СТРОИМ НЕ БОЛЬШЕ ОДНОГО КОНУСА: постройка тяжёлая, и пачка
    // сразу давала бы видимый рывок.
    // ★ ОКНО ШИРЕ ТУМАНА. Замер: конус радиусом 686 м и высотой 535 м
    // возникал в 1.9 км, тогда как туман кончается на 3.7 км — ориентир
    // такого размера просто вспыхивал посреди чистого воздуха. Держим запас
    // до 4.2 км: там он рождается полностью в дымке и проступает из неё.
    const k0 = Math.floor(pz / VENT_STEP);
    for (let k = k0 - 2; k <= k0 + 9; k++) {
      const v = ventAt(k);
      if (!v || this.built.has(k)) continue;
      this.built.set(k, this.build(v, ground, toWorldX));
      break;
    }
    for (const [k, o] of this.built) {
      if (k >= k0 - 2 && k <= k0 + 9) continue;
      this.group.remove(o);
      this.built.delete(k);
    }

    // действующее жерло — ближайшее впереди
    let near: Vent | null = null;
    for (let k = k0 - 1; k <= k0 + 3; k++) {
      const v = ventAt(k);
      if (!v) continue;
      if (!near || Math.abs(v.z - pz) < Math.abs(near.z - pz)) near = v;
    }
    this.active = near;
    if (!near) return;

    const wx = toWorldX(near.u, near.z);
    const top = ground(wx, near.z) + near.coneH * 0.93;
    // зарево: свет стоит над жерлом и пульсирует вместе с выбросом
    this.light.position.set(wx, top + near.coneH * 0.1, near.z);
    // ★ СВЕЧЕНИЕ ЛАВЫ НЕ ДОЛЖНО ОСВЕЩАТЬ ВЕСЬ СКЛОН. Замер: рядом с игроком
    // одновременно горело шесть таких источников по 19–29 единиц с 37–67 м —
    // они и заливали пепел охрой, из-за чего биом читался пустыней. Расплав
    // подсвечивает СВОЮ окрестность; дальше работает палитра и мгла.
    this.light.intensity = 5 + Math.sin(performance.now() * 0.0016) * 1.6;

    const N = Volcanoes.N;
    const g = 9.8;
    // ★ ПОЛ СЧИТАЕМ ОДИН РАЗ НА КАДР, А НЕ НА ЧАСТИЦУ. Прежняя проверка
    // «упал ли на землю» дёргала рельеф для каждой из 2600 частиц каждый
    // кадр — профиль показал, что вулканы съедали 71% времени кадра именно
    // на этом. Уровень подошвы конуса — достаточная граница: ниже неё частица
    // всё равно вне видимости.
    const floorY = ground(wx, near.z) - 30;
    for (let i = 0; i < N; i++) {
      this.age[i] += dt;
      // упал ниже подошвы — погас; иначе осевший пепел копится и даёт пелену
      const hitGround = this.age[i] > 0.4 && this.pos[i * 3 + 1] < floorY;
      if (this.age[i] >= this.life[i] || hitGround) {
        // ВЫБРОС ВО ВСЕ СТОРОНЫ. Угол от вертикали до 70°, скорость 55–150 м/с:
        // это сотни метров дальности, то есть куски летят реально далеко.
        const az = Math.random() * Math.PI * 2;
        const el = Math.acos(1 - Math.random() * 0.62); // от вертикали
        const sp = 55 + Math.random() * 95;
        const sh = Math.sin(el) * sp;
        this.pos[i * 3] = wx + (Math.random() - 0.5) * near.coneR * 0.22;
        this.pos[i * 3 + 1] = top + Math.random() * 12;
        this.pos[i * 3 + 2] = near.z + (Math.random() - 0.5) * near.coneR * 0.22;
        this.vel[i * 3] = Math.cos(az) * sh;
        this.vel[i * 3 + 1] = Math.cos(el) * sp;
        this.vel[i * 3 + 2] = Math.sin(az) * sh;
        this.age[i] = 0;
        this.life[i] = 6 + Math.random() * 9;
        // хвост схлопываем в точку рождения — иначе штрих тянется от места
        // прошлой смерти частицы
        this.lpos[i * 6 + 3] = this.pos[i * 3];
        this.lpos[i * 6 + 4] = this.pos[i * 3 + 1];
        this.lpos[i * 6 + 5] = this.pos[i * 3 + 2];
        continue;
      }
      this.vel[i * 3 + 1] -= g * dt;
      // сопротивление воздуха: остывший пепел тормозит и повисает
      const drag = 1 - Math.min(0.9, 0.35 * dt * (this.age[i] / this.life[i]) * 3);
      this.vel[i * 3] *= drag;
      this.vel[i * 3 + 2] *= drag;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;

      // ОСТЫВАНИЕ: белый → жёлтый → оранжевый → багровый → серый пепел
      const a = this.age[i] / this.life[i];
      let r: number;
      let gg: number;
      let b: number;
      if (a < 0.12) {
        r = 4.2; gg = 3.4; b = 1.8;
      } else if (a < 0.3) {
        const t = (a - 0.12) / 0.18;
        r = 4.2 - t * 1.0; gg = 3.4 - t * 1.9; b = 1.8 - t * 1.5;
      } else if (a < 0.62) {
        const t = (a - 0.3) / 0.32;
        r = 3.2 - t * 2.3; gg = 1.5 - t * 1.25; b = 0.3 - t * 0.22;
      } else {
        const t = Math.min(1, (a - 0.62) / 0.38);
        r = 0.9 - t * 0.62; gg = 0.25 + t * 0.03; b = 0.08 + t * 0.2;
      }
      this.col[i * 3] = r;
      this.col[i * 3 + 1] = gg;
      this.col[i * 3 + 2] = b;
      // размер: бомба у жерла крупная, пепел мелкий и к концу жизни гаснет
      this.size[i] = a < 0.3 ? 3.4 - a * 4 : Math.max(0.2, 2.2 - a * 2.0);
      // и сам цвет уводим в ноль — иначе пепел висит серой ватой
      const fade = a > 0.75 ? Math.max(0, 1 - (a - 0.75) / 0.25) : 1;
      this.col[i * 3] *= fade;
      this.col[i * 3 + 1] *= fade;
      this.col[i * 3 + 2] *= fade;
    }
    // собираем штрихи: голова частицы и хвост назад по скорости. Длина хвоста
    // растёт со скоростью — медленный остывший пепел почти точка.
    for (let i = 0; i < N; i++) {
      const vx = this.vel[i * 3];
      const vy = this.vel[i * 3 + 1];
      const vz = this.vel[i * 3 + 2];
      const k = 0.075;
      const hx = this.pos[i * 3];
      const hy = this.pos[i * 3 + 1];
      const hz = this.pos[i * 3 + 2];
      this.lpos[i * 6] = hx;
      this.lpos[i * 6 + 1] = hy;
      this.lpos[i * 6 + 2] = hz;
      this.lpos[i * 6 + 3] = hx - vx * k;
      this.lpos[i * 6 + 4] = hy - vy * k;
      this.lpos[i * 6 + 5] = hz - vz * k;
      const r = this.col[i * 3];
      const g2 = this.col[i * 3 + 1];
      const b2 = this.col[i * 3 + 2];
      this.lcol[i * 6] = r;
      this.lcol[i * 6 + 1] = g2;
      this.lcol[i * 6 + 2] = b2;
      // хвост тусклее головы — так штрих читается направленным
      this.lcol[i * 6 + 3] = r * 0.35;
      this.lcol[i * 6 + 4] = g2 * 0.3;
      this.lcol[i * 6 + 5] = b2 * 0.3;
    }
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.color.needsUpdate = true;
  }

  /**
   * ★ ПАР НАДО ВИДЕТЬ. Механика без картинки — это ловушка: в струю можно
   * попасть только случайно (замер: ноль подбросов за тридцать секунд езды).
   * Рисуем столбы у ближайших выходов, и высота столба равна силе выброса,
   * то есть по нему читается фаза: видно, когда прыгать.
   */
  private steamCloud: SpriteCloud | null = null;
  private steamPts: THREE.Sprite | null = null;
  private static readonly ST = 900;
  private stPos = new Float32Array(900 * 3);
  private stCol = new Float32Array(900 * 3);

  updateSteam(
    pz: number,
    pu: number,
    time: number,
    ground: (x: number, z: number) => number,
    toWorldX: (u: number, z: number) => number,
    active: boolean
  ): void {
    if (!this.steamPts) {
      // ★ WebGPU: PointsMaterial size=2.6 с аттенюацией — это 2.6 × (полвысоты
      // буфера) / dist пикселей; полвысоты низкого буфера ≈ 120
      this.steamCloud = spriteCloud({
        count: Volcanoes.ST, pos: this.stPos, col: this.stCol,
        fixedSize: 2.6, k: 120, minPx: 0, maxPx: 1e4,
        alpha: () => 0.75,
      });
      this.steamPts = this.steamCloud.sprite;
      this.group.add(this.steamPts);
    }
    this.steamPts.visible = active;
    if (!active) return;
    const N = Volcanoes.ST;
    let n = 0;
    const vents: Steam[] = [];
    for (let dz = -1; dz <= 3; dz++) {
      for (const st of steamsNear(pu, pz + dz * 110)) {
        if (!vents.some((q) => q.u === st.u && q.z === st.z)) vents.push(st);
      }
    }
    for (const st of vents) {
      const p = steamPower(st, time);
      const w = steamWarn(st, time);
      const x = toWorldX(st.u, st.z);
      const gy = ground(x, st.z);
      if (p <= 0.02) {
        // ★ ПОДГОТОВКА. Из щели сочится парок и вздрагивает всё чаще — по
        // этому видно, что вот-вот ударит, и струю можно поймать нарочно.
        if (w > 0.05) {
          const puffs = Math.min(14, 2 + Math.floor(w * 12));
          const jitter = 0.4 + w * 1.6;
          for (let i = 0; i < puffs && n < N; i++) {
            const a = Math.random() * Math.PI * 2;
            const rr = st.r * (0.1 + Math.random() * 0.35);
            this.stPos[n * 3] = x + Math.cos(a) * rr;
            this.stPos[n * 3 + 1] =
              gy + 0.4 + Math.random() * (1.2 + w * 3.5) + Math.sin(time * 22 + i) * jitter * 0.3;
            this.stPos[n * 3 + 2] = st.z + Math.sin(a) * rr;
            const c = 0.5 + w * 0.45;
            this.stCol[n * 3] = c;
            this.stCol[n * 3 + 1] = c * 0.95;
            this.stCol[n * 3 + 2] = c * 0.9;
            n++;
          }
        }
        continue;
      }
      const per = Math.min(60, Math.floor(26 * p));
      for (let i = 0; i < per && n < N; i++) {
        const t = i / Math.max(1, per - 1);
        // столб расширяется кверху, как настоящая струя
        const rr = st.r * (0.18 + t * 0.75) * (0.5 + Math.random() * 0.6);
        const a = Math.random() * Math.PI * 2;
        this.stPos[n * 3] = x + Math.cos(a) * rr;
        this.stPos[n * 3 + 1] = gy + t * (7 + p * 16);
        this.stPos[n * 3 + 2] = st.z + Math.sin(a) * rr;
        const c = 1.1 - t * 0.45;
        this.stCol[n * 3] = c;
        this.stCol[n * 3 + 1] = c * 0.97;
        this.stCol[n * 3 + 2] = c * 0.95;
        n++;
      }
    }
    for (let i = n; i < N; i++) {
      this.stPos[i * 3 + 1] = -1e6;
    }
    this.steamCloud!.touch();
  }

  get vent(): Vent | null {
    return this.active;
  }

  /**
   * ★ ОГНЕННЫЕ КАМНИ ЛЕТЯТ НА ТРАССУ. Часть выброса нацелена не в небо, а
   * вперёд по спуску: глыба падает в случайную точку рядом с линией игрока,
   * и её надо объехать. Прицел берём с упреждением — камень должен успеть
   * долететь, а игрок увидеть его в воздухе.
   */
  private bombTimer = 0;

  updateBombs(
    px: number,
    pz: number,
    dt: number,
    ground: (x: number, z: number) => number,
    toWorldX: (u: number, z: number) => number,
    pisteX: (z: number) => number,
    active: boolean,
    time: number
  ): void {
    // рисует снаряды не этот класс, а Fireballs — здесь только полёт и попадания
    impacts.length = 0;
    const list = bombList();
    if (!active) {
      list.length = 0;
      return;
    }
    // ★ КАМНИ ЛЕТЯТ ИЗ ЖЕРЛА, А НЕ ИЗ НИОТКУДА. Раньше они возникали в
    // двухстах метрах над трассой сбоку — попадание читалось случайной
    // помехой. Теперь они стартуют из кратера ближайшего вулкана, и только
    // когда он выбрасывает: игрок сначала видит фонтан, потом ловит его
    // последствия.
    const src = this.active;
    const e = src ? 0.35 + 0.65 * (Math.sin(time * 0.7 + src.ph * 6.283) * 0.5 + 0.5) : 0;
    this.bombTimer -= dt;
    // ★ КРАТЕРЫ ПОКА НЕ СТРЕЛЯЮТ. Снарядами занимается Око — у него это
    // прицельный огонь, который игрок связывает с причиной. Извержение как
    // источник обстрела вернём отдельно, когда переделаем сами вулканы.
    // Полёт и попадания ниже общие: список один и на выстрелы Ока тоже.
    // ★ ЧАЩЕ И МЕДЛЕННЕЕ. Редкие быстрые камни читались случайностью: увидеть
    // и объехать их было нельзя. Залп идёт вдвое плотнее, а лететь снаряду
    // вдвое дольше — у игрока есть время прочитать метку падения и уйти.
    if (CRATER_FIRE && src && e > 0.4 && this.bombTimer <= 0 && list.length < 90) {
      this.bombTimer = 0.22 + Math.random() * 0.34;
      // точка падения: впереди игрока, с упреждением на время полёта
      const T = 6.5 + Math.random() * 2.5;
      const tz = pz + 150 + Math.random() * 260;
      const tu = pisteX(tz) + (Math.random() - 0.5) * 150;
      const tx = toWorldX(tu, tz);
      const ty = ground(tx, tz);
      const cx0 = toWorldX(src.u, src.z);
      const sx = cx0 + (Math.random() - 0.5) * src.coneR * 0.16;
      const sz = src.z + (Math.random() - 0.5) * src.coneR * 0.16;
      const sy = ground(cx0, src.z) + src.coneH * 0.95;
      list.push({
        x: sx, y: sy, z: sz,
        vx: 0, vy: 0, vz: 0,
        alive: true,
        sx, sy, sz,
        tx, ty, tz,
        hitY: ty,
        arc: Math.min(240, 40 + Math.hypot(tx - sx, tz - sz) * 0.07),
        dur: T,
        t: 0,
        eta: T,
        r: 1.0 + Math.pow(Math.random(), 2.4) * 4.6,
        seed: Math.random() * 100,
        aimed: false,
      });
    }
    for (const b of list) {
      if (!b.alive) continue;
      const px0 = b.x;
      const py0 = b.y;
      const pz0 = b.z;
      b.t += dt;
      b.eta = Math.max(0, b.dur - b.t);
      const k = Math.min(1, b.t / b.dur);
      const e = shellEase(k);
      b.x = b.sx + (b.tx - b.sx) * e;
      b.z = b.sz + (b.tz - b.sz) * e;
      b.y = b.sy + (b.ty - b.sy) * e + Math.sin(Math.PI * e) * b.arc;
      // мгновенная скорость нужна хвосту, чтобы угли отставали правильно
      b.vx = (b.x - px0) / Math.max(1e-4, dt);
      b.vy = (b.y - py0) / Math.max(1e-4, dt);
      b.vz = (b.z - pz0) / Math.max(1e-4, dt);
      if (k >= 1 || b.y <= ground(b.x, b.z)) boom(b);
    }
    // выбрасываем отработавшие
    for (let i = list.length - 1; i >= 0; i--) if (!list[i].alive) list.splice(i, 1);
  }
}

/**
 * Полотно расплава: озёра неподвижны, поэтому каждое строится ОДИН РАЗ и
 * стримится по расстоянию — как скалы. Прежняя река пересобиралась каждые
 * 30 м пути и давала спайк раз в секунду.
 */