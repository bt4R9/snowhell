import { hash2, noise2, seedPhase } from './noise';
import { recipe, actAt } from './recipe';

// Детерминированное размещение игровых объектов: деревья, камни, кикеры, рейлы.
// И физика, и рендер читают одни и те же данные, поэтому коллизии всегда
// совпадают с картинкой, а мир одинаков при каждом запуске.

export const CHUNK = 48;

// --- Изгиб долины ---------------------------------------------------------
// Гора спускается не по прямой: ось долины уходит то влево, то вправо, так что
// поворачивает ВЕСЬ спуск, а не только коридор трассы. Мир генерируется в
// локальных координатах долины (u — поперёк оси, v — вдоль спуска), а на
// экран выводится в мировых: worldX = u + valleyX(v), worldZ = v.
// Сдвиг задан аналитически, поэтому преобразование в обе стороны — бесплатное.

export function valleyX(v: number): number {
  // размах виляния оси — из рецепта мира: от почти прямой долины до змеи
  const k = recipe().valley;
  return (
    Math.sin(v * 0.0018 + seedPhase(0)) * 430 * k +
    Math.sin(v * 0.0044 + 1.7 + seedPhase(1)) * 195 * k
  );
}

/** dX/dZ оси долины: наклон текущего участка спуска */
export function valleySlope(v: number): number {
  return (
    Math.cos(v * 0.0018 + seedPhase(0)) * 430 * 0.0018 +
    Math.cos(v * 0.0044 + 1.7 + seedPhase(1)) * 195 * 0.0044
  );
}

/** Локальные координаты долины → мировые */
export function toWorldX(u: number, v: number): number {
  return u + valleyX(v);
}

/** Мировые → локальные координаты долины */
export function toValleyU(x: number, z: number): number {
  return x - valleyX(z);
}

// --- РАЗГОН СЛОЖНОСТИ ------------------------------------------------------
// Начало спуска обязано быть лёгким при ЛЮБОМ сиде: пологий чистый склон, на
// котором успеваешь освоиться, а не лотерея «повезло/не повезло». Поэтому
// сложность не разыгрывается генератором, а РАЗГОНЯЕТСЯ по глубине спуска —
// это единственное место в мире, где что-то зависит от абсолютного z, а не
// от шума.
//
// Порогов несколько, а не один общий: если включать всё одновременно, на
// отметке X мир скачком превращается в другой. Здесь опасности входят по
// очереди — сначала оживает рельеф, потом появляются кикеры, дальше лес,
// рейлы, камни, и только затем лёд, обрывы и кулуары.

/** Плавная ступенька 0→1 между z0 и z1 */
function ramp(v: number, z0: number, z1: number): number {
  const t = Math.max(0, Math.min(1, (v - z0) / (z1 - z0)));
  return t * t * (3 - 2 * t);
}

/**
 * ★ У НОВОГО БИОМА ТОЖЕ ЕСТЬ ВКАТ. У старта спуска он есть (см. WARMUP), а
 * вулкан начинался сразу в полную силу: смена палитры, лава, око и крутой
 * склон обрушивались одним кадром, и первую минуту игрок разбирался не с
 * биомом, а с тем, куда он вообще едет. Первые метров восемьсот склон заметно
 * положе — есть время осмотреться, а разгон приходит уже осознанно.
 *
 * Множитель входит ПОД интеграл уклона, поэтому высота остаётся честной
 * первообразной и градиент для физики совпадает с картинкой.
 */
export function volcanoEase(v: number): number {
  if (v < VOLCANO_FROM - 120 || v > VOLCANO_FROM + 1300) return 1;
  return 0.58 + 0.42 * ramp(v, VOLCANO_FROM + 120, VOLCANO_FROM + 1300);
}

export const WARMUP = {
  /** множитель крутизны спуска: 0.42 — синяя трасса, 1.0 — обычный склон */
  // Пол крутизны поднят с 0.32: на нём вкат читался не как «спокойно», а как
  // «стоишь и ждёшь, пока гора станет круче» — разгон почти отсутствовал.
  // Скорость идёт как КОРЕНЬ из уклона, поэтому 0.32→0.5 это всего +25% к
  // равновесной скорости, но именно они превращают ожидание в накат.
  slope: (v: number): number => 0.42 + 0.58 * ramp(v, 40, 1400),
  // Рельеф разделён на ФОРМУ и ФАКТУРУ. Гасить всё одним множителем нельзя:
  // без крупных чаш и отрогов вкат превращается в белое поле без горизонта —
  // ровно та «непрорисовка», от которой мир лечили. Крупная форма пологая и
  // сама по себе не опасна, поэтому её оставляем почти целиком, а прижимаем
  // то, что реально мешает ехать: бугры, рёбра и скальные выходы.
  /** чаши и отроги — силуэт горы */
  shape: (v: number): number => 0.8 + 0.2 * ramp(v, 150, 1400),
  /** рёбра по линии падения */
  ribs: (v: number): number => 0.42 + 0.58 * ramp(v, 150, 1400),
  /** бугры и целина под доской */
  bumps: (v: number): number => 0.45 + 0.55 * ramp(v, 250, 1400),
  /** скальные выходы: крутые грани, самое неприятное из фактуры */
  rocky: (v: number): number => ramp(v, 500, 1700),
  kicker: (v: number): number => ramp(v, 300, 900),
  rail: (v: number): number => ramp(v, 450, 1500),
  tree: (v: number): number => ramp(v, 380, 1500),
  rock: (v: number): number => ramp(v, 560, 1800),
  /** кулуары, обрывы, месы — самое опасное, входит последним */
  hazard: (v: number): number => ramp(v, 700, 2100),
  powder: (v: number): number => ramp(v, 200, 900),
  /** лёд и вытаявшая земля */
  ice: (v: number): number => ramp(v, 650, 2000),
};

export interface Obstacle {
  x: number;
  z: number;
  r: number;      // радиус коллизии
  scale: number;
  kind: 'tree' | 'rock' | 'crag' | 'house' | 'lamp' | 'arch';
  rot?: number;   // поворот (для домов)
  variant?: number; // порода дерева 0..3
  hMul?: number;    // вытянутость по высоте
  tint?: number;    // множитель яркости хвои
  zMul?: number;    // сжатие скалы по своей оси Z
  leg?: number;     // какая нога арки (0 — левая, 1 — правая)
  topY?: number;    // высота верхушки над землёй — выше неё столкновения нет
  lay?: number;     // валун ЛЕЖИТ: угол завала набок, рад (см. rockRadiusToward)
  /** ★ ПОСЛОЙНЫЙ ХИТБОКС (скалы, ноги арок): мировая высота начала модели и
   * метров на единицу её высоты — по ним доска находит СВОЙ слой силуэта */
  baseY?: number;
  hUnit?: number;
}

// --- Биомы: зоны по дистанции с плавным перетеканием ---
// 0 — альпийский закат, 1 — ночная деревня; дальше цикл повторяется.

// ★ БИОМ — ЭТО ВСЁ ОКРУЖЕНИЕ, А НЕ ПАЛИТРА. Правила игры одни и те же во
// всех биомах: карв, прыжок, вращение, грэб, рейлы. Меняются порода земли,
// растительность, постройки, небо и даль.
//
// ★ ДЛИНА — ЭТО ВРЕМЯ, А НЕ МЕТРЫ. На 150 км/ч четыре километра проезжаются
// за полторы минуты, и карта кончалась раньше, чем успевала надоесть, — но и
// раньше, чем успевала раскрыться: одна встреча с оком, пара озёр, и всё.
// Семь километров дают около трёх минут на карту.
export const BIOME_LEN = 7000;
export const BIOME_BLEND = 600;
// ★ МЕЖДУ КРАЙНОСТЯМИ — НЕЙТРАЛЬНАЯ ЗОНА. Прямой переход из зелёной долины
// в пепел читался переключателем, сколько его ни размазывай: слишком далеко
// друг от друга оба конца. Между ними встаёт голая высокогорная зона выше
// границы леса — камень, фирн, ни деревьев, ни жилья. Она родня обоим: в неё
// естественно уходит альпийский лес и из неё естественно рождается вулкан.
export const N_BIOMES = 3;

/**
 * Содержимое биома: чем он населён. Веса пород — те же индексы, что в
 * TREE_SPECIES; ноль означает «здесь такое не растёт».
 */
export interface BiomeContent {
  /** веса вариантов деревьев; длина совпадает с TREE_SPECIES */
  trees: number[];
  /** лежит ли на ветвях снег */
  snowOnTrees: boolean;
  /** множитель частоты деревьев в целом */
  forest: number;
  /** множитель частоты деревень */
  villages: number;
  /** имена типов поверхности в HUD */
  surfaces: [string, string, string, string];
  /**
   * ★ БИОМ ИГРАЕТСЯ ИНАЧЕ. Кнопки те же, но за успех отвечает другое:
   * шероховатость решает, можно ли держать прямую линию, а множители
   * покрытия — чем расплачиваешься за скорость.
   */
  rough: number;              // множитель мелкой ряби рельефа
  drag: number;               // общий множитель сопротивления покрытий
  grip: number;               // общий множитель сцепления
  accel: number;              // общий множитель разгона под уклон
  /**
   * ★ ПОКРЫТИЕ ПОД ОДНИМ НОМЕРОМ ВЕДЁТ СЕБЯ ПО-РАЗНОМУ В РАЗНЫХ БИОМАХ.
   * Слот 2 в альпах — лёд: разгоняет и не даёт повернуть. На вулкане тот же
   * слот называется обсидианом, и это стекло: оно держит доску намертво.
   * Здесь множители сцепления и потери скорости в дуге по каждому слоту.
   */
  gripPerKind?: [number, number, number, number];
  scrubPerKind?: [number, number, number, number];
}

// Наполнение по биомам. Первый — альпийский лес; второй — выжженный склон
// вулкана, где от леса остались одни сухие стволы и стланик по трещинам.
export const BIOME_CONTENT: BiomeContent[] = [
  {
    // живого леса нет: только сухостой и редкий стланик в расщелинах
    trees: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.35, 0.35],
    snowOnTrees: false,
    forest: 0.4,
    // ★ НА ДЕЙСТВУЮЩЕМ ВУЛКАНЕ НЕ ЖИВУТ. Деревня рядом с текущей лавой — это
    // сразу вопрос «а они там как?», и весь биом перестаёт читаться.
    villages: 0,
    surfaces: ['ASH', 'CINDER', 'OBSIDIAN', 'BASALT'],
    // ОБСИДИАН НЕ СКОЛЬЗИТ. Слот 2 — это лёд по устройству, но здесь он
    // застывшее стекло: шершавое, с раковистым изломом. Сцепление выводим на
    // уровень наста и возвращаем нормальную потерю скорости в дуге.
    gripPerKind: [1, 1, 8.5, 1],
    scrubPerKind: [1, 1, 4, 1],
    // Застывшая лава — не снег: она в застругах и шлаке, и держать прямую
    // труднее. Но ★ ВДВОЕ БОЛЬШЕ РЯБИ ОКАЗАЛОСЬ НЕ «ТРУДНЕЕ», А «НЕЛЬЗЯ»:
    // замер поймал 46% времени в воздухе против 12% на снегу — доска не едет,
    // а скачет по стиральной доске. Характер держим формой (террасы, валы,
    // складки — см. terrainBase), а не мелкой рябью под кантом.
    rough: 1.3,
    drag: 1.35,
    grip: 0.78,
    accel: 0.9,
  },

  {
    // ★ ТОЛЬКО ЕЛЬ И СУХОСТОЙ. Сосна, лиственница и берёза давали лиственный
    // подлесок — картинка получалась подмосковной опушкой, а не высокогорьем.
    // Ель держит силуэт биома, сухостой добавляет ему возраста.
    trees: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0.35, 0, 0],
    snowOnTrees: true,
    forest: 1,
    villages: 1,
    surfaces: ['PACKED', 'POWDER', 'ICE', 'DIRT'],
    // эталон: по нему настроена вся физика первого биома
    rough: 1,
    drag: 1,
    grip: 1,
    accel: 1,
  },
  {
    // ВЫСОКОГОРЬЕ: выше границы леса. Одиночный стланик по расщелинам и
    // редкий сухостой — всё, что здесь держится.
    trees: [0, 0, 0, 0, 0.25, 0.2, 0, 0, 0, 0, 0.5, 1, 1],
    snowOnTrees: true,
    forest: 0.22,
    villages: 0.15,
    surfaces: ['FIRN', 'SCREE', 'ICE', 'ROCK'],
    rough: 1.5,
    drag: 1.12,
    grip: 0.9,
    accel: 0.97,
  },
];

/** Содержимое преобладающего биома — для имён и флагов, которые не смешать */
export function biomeContentAt(z: number): BiomeContent {
  const { a, b, t } = biomeInfoAt(z);
  return BIOME_CONTENT[(t > 0.5 ? b : a) % BIOME_CONTENT.length];
}

/**
 * ★ СОДЕРЖИМОЕ ТОЖЕ ПЕРЕТЕКАЕТ, А НЕ ПЕРЕКЛЮЧАЕТСЯ.
 * Цвета лерпались с самого начала, а вот населённость бралась «по
 * преобладающему» — то есть ровно на середине перехода живой лес обрывался
 * стеной и начинался сухостой. Смешиваем ВЕСА: в полосе перехода ель
 * встречается всё реже, сухостой всё чаще, и граница читается выгоревшей
 * опушкой, а не швом.
 */
const cdfCache = new Map<string, number[]>();
function blendedTreeCdf(z: number): number[] {
  const { a, b, t } = biomeInfoAt(z);
  // шаг 1/8 по переходу: на 600 м это участки по 75 м, глазу достаточно,
  // а кэш остаётся крошечным
  const q = Math.round(t * 8) / 8;
  const key = a + ':' + b + ':' + q;
  const hit = cdfCache.get(key);
  if (hit) return hit;
  const A = BIOME_CONTENT[a % BIOME_CONTENT.length];
  const B = BIOME_CONTENT[b % BIOME_CONTENT.length];
  // ★ СМЕШИВАЕМ ДОЛИ, А НЕ СЫРЫЕ ВЕСА. У альпийского набора сумма весов
  // впятеро больше, чем у выжженного, и линейная смесь сырых чисел держала
  // ель на 45% до самого конца перехода, а потом обрывала в ноль: переход
  // получался задним числом. После нормировки каждого набора к единице доли
  // едут равномерно.
  const share = (w: number[]): number[] => {
    const sum = w.reduce((p, c) => p + c, 0) || 1;
    return w.map((v) => v / sum);
  };
  const wa = share(A.trees);
  const wb = share(B.trees);
  const out: number[] = [];
  let acc = 0;
  for (let i = 0; i < wa.length; i++) {
    acc += wa[i] + (wb[i] - wa[i]) * q;
    out.push(acc);
  }
  const norm = out.map((v) => v / Math.max(1e-6, acc));
  cdfCache.set(key, norm);
  return norm;
}

/** Плавно смешанный множитель поля биома */
function blendedNum(z: number, pick: (c: BiomeContent) => number): number {
  const { a, b, t } = biomeInfoAt(z);
  const A = BIOME_CONTENT[a % BIOME_CONTENT.length];
  const B = BIOME_CONTENT[b % BIOME_CONTENT.length];
  const k = t * t * (3 - 2 * t);
  return pick(A) + (pick(B) - pick(A)) * k;
}

/** множитель густоты леса в точке спуска */
export function biomeForestMul(z: number): number {
  return blendedNum(z, (c) => c.forest);
}

/** множитель частоты деревень */
export function biomeVillageMul(z: number): number {
  return blendedNum(z, (c) => c.villages);
}

/** множитель мелкой ряби рельефа: на застывшей лаве трясёт вдвое сильнее */
export function biomeRoughMul(z: number): number {
  return blendedNum(z, (c) => c.rough);
}

/** вес вулканического биома в точке: 0 — Альпы, 1 — вулкан */
export function volcanoWeight(z: number): number {
  return biomeWeightAt(z, 0);
}


/**
 * ★ ПОРЯДОК СПУСКА ЗАДАЁТСЯ ЗДЕСЬ, А НЕ ПОРЯДКОМ В МАССИВАХ. Спуск обязан
 * начинаться со снега и приходить к вулкану — это и драматургия демо, и просто
 * читаемая прогрессия. Но индекс 0 в BIOMES/BIOME_CONTENT — вулкан, и на него
 * завязано всё вулканическое (лава, око, пепел). Переставлять сами массивы
 * значило бы чинить это во всех местах разом; вместо этого переставляем
 * ПОСЛЕДОВАТЕЛЬНОСТЬ: снег → вулкан → высокогорье → снова снег.
 */
const BIOME_ORDER = [1, 0, 2];

export function biomeInfoAt(z: number): { a: number; b: number; t: number } {
  const i = Math.floor(z / BIOME_LEN);
  const idx = ((i % N_BIOMES) + N_BIOMES) % N_BIOMES;
  const a = BIOME_ORDER[idx];
  const b = BIOME_ORDER[(idx + 1) % N_BIOMES];
  const local = z - i * BIOME_LEN;
  if (local > BIOME_LEN - BIOME_BLEND) {
    return { a, b, t: (local - (BIOME_LEN - BIOME_BLEND)) / BIOME_BLEND };
  }
  return { a, b: a, t: 0 };
}

/** где по склону начинается и кончается вулканическое окно */
export const VOLCANO_FROM = BIOME_LEN - BIOME_BLEND;
export const VOLCANO_TO = BIOME_LEN * 2;

/** Вес биома index в точке z, 0..1 */
export function biomeWeightAt(z: number, index: number): number {
  const { a, b, t } = biomeInfoAt(z);
  let w = 0;
  if (a === index) w += 1 - t;
  if (b === index) w += t;
  return w;
}

// --- Типы поверхности ------------------------------------------------------
// Гора не однородна: укатанный наст, рыхлый снег, лёд и вытаявшая земля.
// У каждого своя физика (сцепление и сопротивление), цвет и звук.

export const SURF_PACKED = 0; // укатанный наст — эталон
export const SURF_POWDER = 1; // рыхлый: тормозит, но держит
export const SURF_ICE = 2;    // лёд: быстрый и скользкий
export const SURF_DIRT = 3;   // земля и камни: сильно тормозит

export interface SurfaceProps {
  kind: number;
  drag: number;  // множитель сопротивления
  grip: number;  // множитель сцепления (скорость доворота вектора скорости)
  scrub: number; // множитель потери скорости в дуге
  accel: number; // множитель разгона под уклон: лёд катит, земля вязнет
  name: string;
}

const SURFACES: SurfaceProps[] = [
  // наст: цепко и быстро — эталон трассы
  { kind: SURF_PACKED, drag: 0.85, grip: 1.25, scrub: 1.0, accel: 1.0, name: 'PACKED' },
  // рыхлый: лучшая управляемость, но заметно медленнее
  { kind: SURF_POWDER, drag: 2.8, grip: 1.8, scrub: 1.6, accel: 0.75, name: 'POWDER' },
  // лёд: разгоняет, но повернуть почти невозможно
  { kind: SURF_ICE, drag: 0.55, grip: 0.16, scrub: 0.25, accel: 1.15, name: 'ICE' },
  // земля: медленно, управляемость средняя
  { kind: SURF_DIRT, drag: 2.4, grip: 0.9, scrub: 1.3, accel: 0.75, name: 'DIRT' },
];

export function surfaceName(kind: number, z = 0): string {
  // Имя покрытия — часть окружения: на вулкане под доской не наст, а пепел.
  // Физика при этом та же самая — меняется только то, как оно называется и
  // выглядит.
  const names = biomeContentAt(z).surfaces;
  return names[kind] ?? (SURFACES[kind] ?? SURFACES[0]).name;
}

/**
 * Тип поверхности в точке (координаты долины).
 *
 * Один шум с жёстким порогом давал круглые пятна с гладким краем — видно,
 * что это заливка по маске, а не снег. Здесь две вещи, которые делают
 * границы природными:
 *  1) ИСКАЖЕНИЕ ОБЛАСТИ: координаты сдвигаются другим шумом, поэтому пятно
 *     перестаёт быть выпуклым — у него появляются языки и заливы;
 *  2) ТРИ ОКТАВЫ вместо одной: край становится рваным на всех масштабах,
 *     от сотни метров до нескольких.
 * Плюс лёд и рыхляк ложатся не случайно, а по смыслу: в желобах снег
 * надувает (там рыхляк), на открытых выпуклостях его сдувает до льда.
 */
export function surfField(u: number, v: number): number {
  // сдвиг области — от него зависят языки и заливы на границе
  const wu = u + noise2(u * 0.006 + 3.1, v * 0.006 - 7.7) * 30;
  const wv = v + noise2(u * 0.006 - 11.4, v * 0.006 + 2.3) * 30;
  return (
    noise2(wu * 0.0042 + 71.3, wv * 0.0055 - 24.8) * 0.6 +
    noise2(wu * 0.011 - 15.2, wv * 0.013 + 9.4) * 0.27 +
    noise2(wu * 0.027 + 41.8, wv * 0.031 - 3.6) * 0.13
  );
}

export function surfaceKindAt(u: number, v: number): number {
  // земля вытаивает редкими небольшими пятнами и только вне трассы
  const du = u + noise2(u * 0.02 + 5.5, v * 0.02 + 1.9) * 12;
  const dv = v + noise2(u * 0.02 - 9.1, v * 0.02 + 6.4) * 12;
  const d =
    noise2(du * 0.013 + 8.9, dv * 0.016 + 44.1) * 0.72 +
    noise2(du * 0.035 - 4.2, dv * 0.04 + 17.6) * 0.28;
  // Пороги отодвинуты на вкате: в начале спуска склон целиком укатан, а
  // земля, рыхляк и лёд проступают по мере разгона сложности. Сдвиг больше
  // размаха поля — значит на первых метрах тип просто не может выпасть.
  const wIce = WARMUP.ice(v);
  if (d > 0.5 + (1 - wIce) * 0.9 && Math.abs(u - pisteCenterX(v)) > PISTE_HALF_W + 6) {
    return SURF_DIRT;
  }
  // в желоб снег надувает: там рыхляк, а не выдутый лёд
  // Пороги взяты по КВАНТИЛЯМ поля, а не на глаз: усреднение трёх октав
  // сжимает разброс, и старые числа (0.16 / −0.34) давали 4% льда вместо
  // прежних ~22%. Здесь 0.214 — 65-й перцентиль, −0.141 — 20-й.
  const n = surfField(u, v) + gullyInside(u, v) * 0.22;
  if (n > 0.214 + (1 - WARMUP.powder(v)) * 1.0) return SURF_POWDER;
  if (n < -0.141 - (1 - wIce) * 1.2) return SURF_ICE;
  return SURF_PACKED;
}

// Свойства покрытия с поправкой биома. Кэшируем по типу и по огрублённой
// позиции перехода: физика дёргает это каждый шаг.
const surfCache = new Map<string, SurfaceProps>();

export function surfaceAt(u: number, v: number): SurfaceProps {
  const base = SURFACES[surfaceKindAt(u, v)];
  const dm = blendedNum(v, (c) => c.drag);
  const gm =
    blendedNum(v, (c) => c.grip) *
    blendedNum(v, (c) => c.gripPerKind?.[base.kind] ?? 1);
  const am = blendedNum(v, (c) => c.accel);
  const sm = blendedNum(v, (c) => c.scrubPerKind?.[base.kind] ?? 1);
  if (dm === 1 && gm === 1 && am === 1 && sm === 1) return base;
  const q = Math.round(dm * 20);
  const key = base.kind + ':' + q + ':' + Math.round(gm * 20) + ':' + Math.round(sm * 20);
  const hit = surfCache.get(key);
  if (hit) return hit;
  const out: SurfaceProps = {
    kind: base.kind,
    drag: base.drag * dm,
    grip: base.grip * gm,
    scrub: base.scrub * sm,
    accel: base.accel * am,
    name: base.name,
  };
  surfCache.set(key, out);
  return out;
}

// --- Трасса: укатанный коридор, змеёй уходящий вниз. Даёт то, чего нет
// во фрирайде: настоящие повороты, виражи и читаемую линию. Вне коридора
// остаётся дикий склон с обрывами. ---

export const PISTE_HALF_W = 19;
const PISTE_TAPER = 9;      // мягкий край коридора
const BANK_GAIN = 52;       // насколько задирается внешняя сторона виража
const BANK_MAX = 4.2;

/** Ось трассы: X центра коридора на данной глубине спуска */
// Ось трассы: длинные сносы + настоящие S-повороты каждые 200–400 м.
// Без коротких волн трасса ощущается прямой, как бы далеко она ни сносилась.
// амплитуды множатся на recipe().piste — см. pisteCenterX
const PISTE_WAVES: Array<[number, number, number]> = [
  // [амплитуда, частота, фаза]
  [190, 0.0011, 2.1],
  [72, 0.0062, 0.0],
  [34, 0.0165, 1.3],
  [14, 0.032, 4.1],
];

export function pisteCenterX(z: number): number {
  const k = recipe().piste; // насколько круто змеится трасса в этом мире
  let s = 0;
  for (let i = 0; i < PISTE_WAVES.length; i++) {
    const [a, f, p] = PISTE_WAVES[i];
    s += Math.sin(z * f + p + seedPhase(2 + i)) * a * k;
  }
  return s;
}

/** Наклон оси (dX/dZ) — куда трасса поворачивает */
export function pisteSlopeX(z: number): number {
  const k = recipe().piste; // ТОТ ЖЕ множитель, что в pisteCenterX: иначе
  // виражи и запреты на постройку разойдутся с самой линией
  let s = 0;
  for (let i = 0; i < PISTE_WAVES.length; i++) {
    const [a, f, p] = PISTE_WAVES[i];
    s += Math.cos(z * f + p + seedPhase(2 + i)) * a * f * k;
  }
  return s;
}

/** Кривизна оси — знак задаёт, какая сторона виража внешняя */
function pisteCurv(z: number): number {
  const k = recipe().piste;
  let s = 0;
  for (let i = 0; i < PISTE_WAVES.length; i++) {
    const [a, f, p] = PISTE_WAVES[i];
    s -= Math.sin(z * f + p + seedPhase(2 + i)) * a * f * f * k;
  }
  return s;
}

export interface PisteInfo {
  t: number;    // 0..1 — насколько точка «на трассе»
  dx: number;   // смещение от оси поперёк
  bank: number; // добавка высоты виража
}

export function pisteAt(x: number, z: number): PisteInfo {
  const dx = x - pisteCenterX(z);
  const ax = Math.abs(dx);
  if (ax > PISTE_HALF_W + PISTE_TAPER) return { t: 0, dx, bank: 0 };
  const raw = 1 - Math.max(0, (ax - PISTE_HALF_W) / PISTE_TAPER);
  const t = raw * raw * (3 - 2 * raw);
  // вираж: внешняя сторона дуги приподнята — в поворот можно вкатываться
  let bank = -BANK_GAIN * pisteCurv(z) * dx;
  if (bank > BANK_MAX) bank = BANK_MAX;
  if (bank < -BANK_MAX) bank = -BANK_MAX;
  return { t, dx, bank: Math.max(0, bank) };
}

// --- Кулуары: глубокие узкие желоба со стенами, по которым не выехать.
// Идут рядом с трассой, извиваются — приходится читать линию и поворачивать. ---

const GULLY_PERIOD = 480;
const GULLY_LEN = 360;
const GULLY_FLOOR_W = 11;  // ровное дно: в него надо помещаться на скорости
const GULLY_WALL_W = 26;   // где стена выходит на уровень склона

/**
 * Заводится ли кулуар k. Плотность — из рецепта мира и темы акта; в мире без
 * кулуаров (рулетка присутствия) их нет вовсе.
 */
function gullyLives(k: number): boolean {
  const R = recipe();
  if (!R.hasGullies) return false;
  const dens = Math.min(1.6, R.gully * actAt(k * GULLY_PERIOD).gully);
  return hash2(k * 313 + 5, 77) >= Math.max(0, 1 - 0.88 * dens);
}

/** Центр кулуара: идёт сбоку от трассы и виляет */
function gullyCenter(k: number, v: number): number {
  const side = hash2(k * 29, 41) > 0.5 ? 1 : -1;
  // рядом с трассой, иначе игрок просто не проезжает мимо кулуаров
  const off = 58 + hash2(k * 13, 7) * 75;
  const wander = Math.sin(v * 0.03 + k * 1.7) * 15 + Math.sin(v * 0.012 + k * 3.1) * 22;
  // Виляние может занести кулуар на трассу — с расширенными стенами он бы
  // её просто прорезал. Держим борт кулуара не ближе 8 м от края коридора.
  const minOff = GULLY_WALL_W + PISTE_HALF_W + 8;
  let d = side * off + wander;
  if (Math.abs(d) < minOff) d = Math.sign(d || side) * minOff;
  return pisteCenterX(v) + d;
}

/**
 * ★ РАЗВИЛКА. Ниже по спуску кулуар делится: основной рукав идёт своей линией,
 * второй отваливает В СТОРОНУ ОТ ТРАССЫ (только наружу — иначе клин рукава
 * прорезал бы коридор, а зажимать его клампом значит склеить рукава обратно
 * стеной). Пока расхождение меньше двух ширин дна, дно просто шире; дальше
 * между рукавами вырастает остров, и приходится ВЫБИРАТЬ линию.
 */
function gullyFork(k: number, t: number): number {
  if (hash2(k * 407 + 13, 89) <= 0.58) return 0;
  const tF = 0.26 + hash2(k * 411, 17) * 0.12;
  if (t <= tF) return 0;
  // Расхождение выходит на полное к 0.82 длины, а не к самому концу: иначе
  // рукава расходятся ровно там, где кулуар уже выкатывается на склон, и
  // выбирать между ними попросту негде.
  const s = Math.min(1, (t - tF) / (0.82 - tF));
  return s * s * (3 - 2 * s) * (30 + hash2(k * 419, 23) * 30);
}

/** Профиль поперёк рукава: 1 на дне, 0 за бортом */
function gullyProfile(ax: number): number {
  if (ax > GULLY_WALL_W) return 0;
  const w = Math.max(0, Math.min(1, (ax - GULLY_FLOOR_W) / (GULLY_WALL_W - GULLY_FLOOR_W)));
  return 1 - w * w * (3 - 2 * w);
}

/** Наибольший из профилей рукавов кулуара k в точке (u, v) */
function gullyShape(k: number, u: number, v: number, t: number): number {
  const c = gullyCenter(k, v);
  const p = gullyProfile(Math.abs(u - c));
  const sp = gullyFork(k, t);
  if (sp <= 0) return p;
  // наружу — туда же, куда смещён сам кулуар от оси трассы
  const out = c - pisteCenterX(v) >= 0 ? 1 : -1;
  return Math.max(p, gullyProfile(Math.abs(u - (c + out * sp))));
}

export function gullyDepth(u: number, v: number): number {
  let d = 0;
  const idx = Math.floor(v / GULLY_PERIOD);
  for (let k = idx - 1; k <= idx; k++) {
    if (k < 1) continue;
    if (!gullyLives(k)) continue;
    const z0 = k * GULLY_PERIOD + 40 + hash2(k * 11, 3) * 60;
    const t = (v - z0) / GULLY_LEN;
    if (t < 0 || t > 1) continue;
    // плавный вход и выкат: в кулуар вкатываешься, а не падаешь в яму
    const e = Math.min(1, Math.min(t, 1 - t) / 0.14);
    const env = e * e * (3 - 2 * e);
    const prof = gullyShape(k, u, v, t);
    if (prof <= 0) continue;
    d -= (14 + hash2(k * 17, 23) * 10) * env * prof * WARMUP.hazard(v);
  }
  return d;
}

/** 0..1 — насколько точка внутри кулуара (для сглаживания дна и вырубки леса) */
export function gullyInside(u: number, v: number): number {
  const idx = Math.floor(v / GULLY_PERIOD);
  let best = 0;
  for (let k = idx - 1; k <= idx; k++) {
    if (k < 1) continue;
    if (!gullyLives(k)) continue;
    const z0 = k * GULLY_PERIOD + 40 + hash2(k * 11, 3) * 60;
    const t = (v - z0) / GULLY_LEN;
    if (t < 0 || t > 1) continue;
    best = Math.max(best, gullyShape(k, u, v, t));
  }
  // тем же множителем, что и глубина в gullyDepth: вырубка леса и сглаживание
  // дна обязаны следовать за реальной формой кулуара, а не за его «чертежом»
  return best * WARMUP.hazard(v);
}

// --- Обрывы и месы (живут здесь, чтобы деревни могли проверять рельеф) ---

const CLIFF_SZ = 260; // шаг рядов обрывов по z
const CLIFF_SX = 220; // ширина клетки по x

export function cliffDrop(x: number, z: number): number {
  let d = 0;
  const cz0 = Math.floor(z / CLIFF_SZ);
  const cx0 = Math.floor(x / CLIFF_SX);
  // окно в 4 ряда назад: вклад обрыва должен успеть затухнуть внутри него
  for (let kz = cz0 - 3; kz <= cz0; kz++) {
    if (kz < 1) continue; // возле спавна обрывов нет
    for (let kx = cx0 - 1; kx <= cx0 + 1; kx++) {
      if (hash2(kx * 91 + 7, kz * 57 + 13) < 0.3) continue;
      const zc =
        kz * CLIFF_SZ +
        40 +
        hash2(kx * 31 + kz, 5) * (CLIFF_SZ - 80) +
        noise2(x * 0.03, kz * 3.1) * 4; // лёгкая неровность кромки
      // крутизна стены меняется вдоль кромки: где-то отвес, где-то осыпь
      const wall = 3 + 11 * (noise2(x * 0.02 + 7.7, kz * 13.7) * 0.5 + 0.5);
      const t = (z - zc) / wall;
      if (t <= 0) continue;
      const xc = (kx + 0.5) * CLIFF_SX + (hash2(kx * 13, kz * 3) - 0.5) * 60;
      const halfW = 40 + hash2(kx * 7, kz * 11) * 140; // ширина 80–360 м
      // Обрыв не строится там, где проходит трасса. Гасить его коридором
      // нельзя: на границе коридора вырастала бы стена в десятки метров.
      if (Math.abs(pisteCenterX(zc) - xc) < halfW + PISTE_HALF_W + 14) continue;
      const ax = Math.abs(x - xc);
      if (ax > halfW) continue;
      const s = Math.min(1, t);
      const lat = Math.min(1, (halfW - ax) / 30);
      // высота со скошенным распределением (обычно 5–15 м, изредка ~40)
      // и гуляет вдоль кромки — верх обрыва неровный
      const hd = hash2(kx * 17 + kz * 5, 3);
      const D = (5 + hd * hd * 35) * (0.75 + 0.5 * (noise2(x * 0.01, kz * 3.7) * 0.5 + 0.5));
      // промежуточные полки на стене: местами уступы вместо ровного среза
      const s2 = s * s * (3 - 2 * s);
      const bench = (noise2(x * 0.05, kz * 9.1) * 0.5 + 0.5) * 0.18;
      const prof = s2 - bench * Math.sin(s2 * Math.PI);
      // Сброс держится в полную глубину ~330 м, затем плавно возвращается
      // к базовой линии (незаметно на фоне уклона) — вклад обязан затухнуть
      // до нуля внутри окна клеток, иначе на его границе вырастает стена.
      const rec = Math.max(0, Math.min(1, (z - zc - 330) / 320));
      const recS = rec * rec * (3 - 2 * rec);
      d -= D * prof * (1 - recS) * (lat * lat * (3 - 2 * lat));
    }
  }
  // ряды обрывов могут накладываться; без потолка получались сбросы под 70 м,
  // с которых улетаешь на пять секунд
  return Math.max(d, -30) * WARMUP.hazard(z);
}

const MESA_SZ = 300;
const MESA_SX = 260;

export function mesaLift(x: number, z: number): number {
  if (!recipe().hasMesas) return 0; // в этом мире террас нет вовсе
  let d = 0;
  const cz0 = Math.floor(z / MESA_SZ);
  const cx0 = Math.floor(x / MESA_SX);
  for (let kz = cz0 - 1; kz <= cz0; kz++) {
    if (kz < 1) continue;
    for (let kx = cx0 - 1; kx <= cx0 + 1; kx++) {
      if (hash2(kx * 53 + 21, kz * 37 + 8) < 0.65) continue; // ~35% клеток
      const L = 60 + hash2(kx * 3, kz * 19) * 90;
      const z0 = kz * MESA_SZ + hash2(kx * 29, kz * 7) * (MESA_SZ - L - 20);
      // неровная кромка и высота, гуляющая вдоль месы
      const edge = noise2(x * 0.035 + 3.1, kz * 7.7) * 3;
      const dz = z - z0 - edge;
      if (dz < 0 || dz > L + 2.5) continue;
      const xc = (kx + 0.5) * MESA_SX + (hash2(kx * 11, kz * 23) - 0.5) * 70;
      const halfW = 40 + hash2(kx * 41, kz * 13) * 60;
      const ax = Math.abs(x - xc);
      if (ax > halfW) continue;
      const H0 = 1.5 + hash2(kx * 19, kz * 31) * 1.0; // подъёмы невысокие
      const H = H0 * (0.8 + 0.4 * (noise2(x * 0.02, kz * 5.3) * 0.5 + 0.5));
      // передний склон пологий: на месу ЗАЕЗЖАЕШЬ, а не бьёшься в стену
      const rise = 6 + H0 * 2.5;
      let profile: number;
      if (dz < rise) {
        const t = dz / rise;
        profile = t * t * (3 - 2 * t);
      } else if (dz > L) {
        profile = 1 - (dz - L) / 2.5; // резкий сброс — трамплин
      } else {
        profile = 1;
      }
      const lat = Math.min(1, (halfW - ax) / 25);
      d += H * profile * (lat * lat * (3 - 2 * lat)) * WARMUP.hazard(z);
    }
  }
  return d;
}

// --- Деревни: дорога вниз по склону, дома кучками вдоль неё, фонари
// по обочинам. Одна деревня на каждый цикл биомов, в ночной зоне. ---

const CYCLE = BIOME_LEN * N_BIOMES;

// ★ ГАБАРИТЫ ПОСТРОЙКИ СЧИТАЮТСЯ ЗДЕСЬ, А НЕ В РЕНДЕРЕ.
// По крышам теперь ЕЗДЯТ, то есть их поверхность — часть физики. Значит
// высота карниза, уклон ската и вынос свеса обязаны быть ОДНИМИ И ТЕМИ ЖЕ
// числами для картинки и для доски. Раньше пропорции жили в terrain.ts, и
// физика о них не знала вовсе.
export const HOUSE_GEOM = {
  BODY_HW: 2.3,    // половина ширины корпуса при wide = 1 (коробка 4.6)
  BODY_HD: 1.8,    // половина глубины (3.6)
  ROOF_HW: 2.7,    // половина ширины ската в геометрии крыши
  ROOF_HD: 2.05,   // половина глубины
  ROOF_H: 1.5,     // высота конька в геометрии крыши
  ROOF_OVER: 1.16, // свес: крыша шире корпуса
};

/** Типы построек. Деревня из одних жилых коробок читается складом. */
export const HK = {
  CHALET: 0,
  TALL: 1,
  BARN: 2,
  HOTEL: 3,
  SHOP: 4,
  CHAPEL: 5,
} as const;

export interface VillageHouse {
  x: number;
  z: number;
  rot: number;    // фасадом к дороге
  scale: number;
  wMul: number;   // вариация ширины/глубины корпуса
  dMul: number;
  style: number;  // 0..2 — вариант окраски
  kind: number;   // см. HK
  hMul: number;   // вариация высоты корпуса
  chimney: boolean;
  padR: number;   // радиус ровной площадки под домом
  /**
   * ★ ДОМ ВКОПАН В СКЛОН. Нагорный карниз выходит вровень с землёй: на крышу
   * въезжаешь с горы как на продолжение склона, а с конька улетаешь вниз.
   * Такой дом рельеф вокруг себя НЕ выравнивает и сугробом не обкладывается —
   * он и так часть горы.
   */
  sunk: boolean;
  // готовые габариты (до умножения на scale) — общие для рендера и физики
  wide: number;
  deep: number;
  bodyH: number;
  roofPitch: number;
}

/** Габариты крыши в метрах (уже с учётом scale) */
export function houseRoof(h: VillageHouse): {
  hw: number; hd: number; eave: number; ridge: number;
} {
  const G = HOUSE_GEOM;
  return {
    hw: G.ROOF_HW * G.ROOF_OVER * h.wide * h.scale,
    hd: G.ROOF_HD * G.ROOF_OVER * h.deep * h.scale,
    eave: h.bodyH * h.scale,
    ridge: (h.bodyH + G.ROOF_H * h.roofPitch) * h.scale,
  };
}

/**
 * Высота КРЫШИ в мировой точке (или null, если крыш там нет).
 * Конёк идёт вдоль локальной оси Z, скаты падают по X — ровно так построена
 * геометрия крыши, см. buildRoofGeometry.
 */
let villagePads: ((v: Village, i: number) => number) | null = null;

/** Высоты площадок домов приходят из terrain.ts (см. villageHeights) */
export function setVillagePads(fn: (v: Village, i: number) => number): void {
  villagePads = fn;
}

export function villageRoofAt(
  worldX: number,
  z: number
): { y: number; eave: number; ridge: number } | null {
  const u = toValleyU(worldX, z);
  const v = villageAt(u, z);
  if (!v) return null;
  let best: { y: number; eave: number; ridge: number } | null = null;
  for (let hi = 0; hi < v.houses.length; hi++) {
    const h = v.houses[hi];
    const dx = u - h.x;
    const dz = z - h.z;
    if (dx * dx + dz * dz > 400) continue;
    const c = Math.cos(h.rot);
    const sn = Math.sin(h.rot);
    const lx = dx * c - dz * sn;
    const lz = dx * sn + dz * c;
    const R = houseRoof(h);
    if (Math.abs(lx) > R.hw || Math.abs(lz) > R.hd) continue;
    // площадка под домом — та же, на которую его ставит рендер
    if (!villagePads) return null;
    const pad = villagePads(v, hi) - 0.15;
    const y = pad + R.eave + (R.ridge - R.eave) * (1 - Math.abs(lx) / R.hw);
    if (!best || y > best.y) best = { y, eave: pad + R.eave, ridge: pad + R.ridge };
  }
  return best;
}

export interface Village {
  key: string;
  pts: Array<{ x: number; z: number }>;
  segDirX: number[];
  segDirZ: number[];
  segLen: number[];
  totalLen: number;
  houses: VillageHouse[];
  lamps: Array<{ x: number; z: number }>;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

const VCW = 240;  // шаг сетки деревень по ширине склона
const VROW = 380; // шаг рядов деревень вдоль спуска

const villageCache = new Map<string, Village | null>();

/** Деревня в клетке 2D-сетки (vcx — колонка по x, vcz — ряд по z) */
export function villageInCell(vcx: number, vcz: number): Village | null {
  const key = vcx + ',' + vcz;
  const hit = villageCache.get(key);
  if (hit !== undefined) return hit;
  const S = vcx * 977 + vcz * 131; // база сида клетки
  const baseZ = vcz * VROW + 40 + hash2(S + 11, 9) * 120;
  const baseX = (vcx + 0.5) * VCW + (hash2(S + 1, 3) - 0.5) * (VCW * 0.4);
  // деревни теперь по всему спуску (биом один), поэтому клеток занято меньше
  // порог принятия деревни зависит от биома: на вулкане поселений меньше
  // множитель ноль означает «здесь поселений нет вовсе», а не «реже»
  const vMul = biomeVillageMul(baseZ) *
    Math.min(2.2, recipe().villages * actAt(baseZ).villages);
  const vGate = 1 - (1 - 0.62) * vMul;
  if (vcz < 1 || vMul < 0.08 || hash2(S, 97) < vGate || baseZ < 900) {
    villageCache.set(key, null);
    return null;
  }

  // дорога: полилиния наискось по склону — так деревня раскидывается
  // поперёк, и мимо неё сложнее проехать
  const buildRoad = (sx: number, sz: number) => {
    let ang = (hash2(S + 13, 5) - 0.5) * 1.5;
    const rp = [{ x: sx, z: sz }];
    const dX: number[] = [];
    const dZ: number[] = [];
    const sl: number[] = [];
    let tl = 0;
    const segs = 11 + Math.floor(hash2(S + 3, 17) * 5.99);
    for (let s = 0; s < segs; s++) {
      ang += (hash2(S + 19 + s * 7, s * 3 + 1) - 0.5) * 0.3;
      if (ang > 0.85) ang = 0.85;
      if (ang < -0.85) ang = -0.85;
      const len = 26 + hash2(S + 23 + s, s * 11 + 4) * 16;
      const dx = Math.sin(ang);
      const dz = Math.cos(ang);
      const p = rp[rp.length - 1];
      rp.push({ x: p.x + dx * len, z: p.z + dz * len });
      dX.push(dx);
      dZ.push(dz);
      sl.push(len);
      tl += len;
    }
    return { rp, dX, dZ, sl, tl };
  };

  // Деревня не строится поперёк СТЕНЫ обрыва (сглаженная дорога против
  // отвеса дала бы вертикальные стены). Ищем свободное место сдвигами,
  // а не отбраковываем клетку целиком — иначе деревень почти не остаётся.
  const OFFSETS: Array<[number, number]> = [
    [0, 0], [0, -70], [0, 70], [-60, 0], [60, 0], [-60, -70], [60, 70], [0, -140],
  ];
  let road: ReturnType<typeof buildRoad> | null = null;
  let startZ = baseZ;
  for (const [dx, dz] of OFFSETS) {
    const sz = baseZ + dz;
    if (sz < 300) continue;
    const cand = buildRoad(baseX + dx, sz);
    let ok = true;
    for (let s = 0; s < cand.sl.length && ok; s++) {
      for (const t of [0, 0.5]) {
        const px = cand.rp[s].x + cand.dX[s] * cand.sl[s] * t;
        const pz = cand.rp[s].z + cand.dZ[s] * cand.sl[s] * t;
        // деревня не встаёт ни на стену обрыва, ни поперёк трассы
        // (дома отстоят от дороги до 13 м — закладываем запас)
        if (
          cliffDrop(px, pz) - cliffDrop(px, pz + 10) > 3.5 ||
          Math.abs(px - pisteCenterX(pz)) < PISTE_HALF_W + 26
        ) {
          ok = false;
          break;
        }
      }
    }
    if (ok) {
      road = cand;
      startZ = sz;
      break;
    }
  }
  if (!road) {
    villageCache.set(key, null);
    return null;
  }
  const pts = road.rp;
  const segDirX = road.dX;
  const segDirZ = road.dZ;
  const segLen = road.sl;
  const totalLen = road.tl;
  void startZ;

  // дома вдоль дороги, чередуя стороны, фасадом к дороге
  const houses: VillageHouse[] = [];
  let arc = 12 + hash2(S, 31) * 8;
  let side = hash2(S, 41) > 0.5 ? 1 : -1;
  let hi = 0;
  // отель и часовня — по одной на деревню, на заранее выбранных местах улицы
  const hotelAt = 1 + Math.floor(hash2(S + 101, 13) * 3);
  const chapelAt = 5 + Math.floor(hash2(S + 103, 17) * 6);
  while (arc < totalLen - 12) {
    let s = 0;
    let acc = 0;
    while (s < segLen.length - 1 && arc > acc + segLen[s]) {
      acc += segLen[s];
      s++;
    }
    const t = (arc - acc) / segLen[s];
    const px = pts[s].x + segDirX[s] * segLen[s] * t;
    const pz = pts[s].z + segDirZ[s] * segLen[s] * t;
    const perpX = segDirZ[s];
    const perpZ = -segDirX[s];
    if (hash2(S + 37 + hi, 7) > 0.12) {
      // ПЛОТНЕЕ И ГЛУБЖЕ: часть домов уходит вторым рядом от улицы, иначе
      // деревня — это две шеренги вдоль дороги и пустота за ними.
      const secondRow = hash2(S + 97 + hi, 29) > 0.62;
      const off = secondRow
        ? 19 + hash2(S + 43 + hi, 13) * 8
        : 8.5 + hash2(S + 43 + hi, 13) * 4.5;
      const hx = px + perpX * off * side;
      const hz = pz + perpZ * off * side;
      // ★ ТИП ПОСТРОЙКИ. Отель ставим один на деревню и ближе к началу улицы,
      // часовню — тоже один, лавки попадаются, остальное жильё. Деревня из
      // одинаковых коробок читается складом, сколько её ни крась.
      let kind: number = HK.CHALET;
      const roll = hash2(S + 71 + hi, 83);
      if (hi === hotelAt) kind = HK.HOTEL;
      else if (hi === chapelAt) kind = HK.CHAPEL;
      else if (roll > 0.82) kind = HK.SHOP;
      else if (roll > 0.55) kind = HK.TALL;
      else if (roll > 0.34) kind = HK.BARN;
      const wMul = 0.85 + hash2(S + 53 + hi, 23) * 0.45;
      const dMul = 0.85 + hash2(S + 59 + hi, 29) * 0.35;
      const hMul = 0.85 + hash2(S + 79 + hi, 11) * 0.75;
      // пропорции корпуса по типу
      const wide =
        wMul * (kind === HK.HOTEL ? 2.1 : kind === HK.SHOP ? 1.5
          : kind === HK.BARN ? 1.2 : kind === HK.TALL ? 0.8
          : kind === HK.CHAPEL ? 0.75 : 1);
      const deep =
        dMul * (kind === HK.HOTEL ? 1.35 : kind === HK.BARN ? 1.15
          : kind === HK.CHAPEL ? 1.3 : kind === HK.SHOP ? 1.05 : 1);
      const bodyH =
        2.4 * hMul * (kind === HK.HOTEL ? 1.75 : kind === HK.TALL ? 1.12
          : kind === HK.BARN ? 0.75 : kind === HK.SHOP ? 0.85
          : kind === HK.CHAPEL ? 1.2 : 1);
      const roofPitch =
        (kind === HK.BARN ? 0.5 : kind === HK.CHAPEL ? 1.5
          : kind === HK.HOTEL ? 0.7 : 0.8) + hash2(S + 89 + hi, 7) * 0.4;
      const scale = 0.85 + hash2(S + 47 + hi, 19) * 0.4;
      // площадка выравнивается ПОД ГАБАРИТ: под отелем 5.5 м оставляли угол
      // здания висеть в воздухе
      const padR = Math.max(
        5.5,
        HOUSE_GEOM.ROOF_HW * HOUSE_GEOM.ROOF_OVER * wide * scale + 1.5
      );
      houses.push({
        wide,
        deep,
        bodyH,
        roofPitch,
        x: hx,
        z: hz,
        // фасадом к улице, но с живым разбросом; часть домов стоит торцом —
        // иначе вся деревня выглядит расставленной под один угол
        rot:
          Math.atan2(-perpX * side, -perpZ * side) +
          (hash2(S + hi, 53) - 0.5) * 0.75 +
          (hash2(S + hi * 3, 91) > 0.72 ? Math.PI / 2 : 0),
        scale,
        wMul,
        dMul,
        style: Math.floor(hash2(S + 61 + hi, 37) * 2.99),
        kind,
        hMul,
        chimney: hash2(S + 83 + hi, 17) > 0.35 && kind !== HK.CHAPEL,
        padR,
        // ★ ПОЧТИ ПОЛОВИНА ДОМОВ ВРЕЗАНА В СКЛОН. Дом-препятствие интересен
        // ровно один раз; дом, по крыше которого едешь, — это уже линия.
        // Отель и часовня остаются стоять как стояли: у них своя роль в силуэте
        // деревни, и врезать их значит потерять её.
        sunk: kind !== HK.HOTEL && kind !== HK.CHAPEL &&
          hash2(S + 211 + hi * 5, 43) > 0.55,
      });
    }
    side = -side;
    arc += 9 + hash2(S + 67 + hi, 43) * 9;
    hi++;
  }

  // фонари по обочинам с равным шагом
  const lamps: Array<{ x: number; z: number }> = [];
  let larc = 8;
  let lside = 1;
  while (larc < totalLen - 4) {
    let s = 0;
    let acc = 0;
    while (s < segLen.length - 1 && larc > acc + segLen[s]) {
      acc += segLen[s];
      s++;
    }
    const t = (larc - acc) / segLen[s];
    lamps.push({
      x: pts[s].x + segDirX[s] * segLen[s] * t + segDirZ[s] * 4.3 * lside,
      z: pts[s].z + segDirZ[s] * segLen[s] * t - segDirX[s] * 4.3 * lside,
    });
    lside = -lside;
    larc += 19 + hash2(S + 71, Math.round(larc)) * 6;
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;
  for (const p of pts) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minZ = Math.min(minZ, p.z);
    maxZ = Math.max(maxZ, p.z);
  }
  for (const h of houses) {
    minX = Math.min(minX, h.x);
    maxX = Math.max(maxX, h.x);
    minZ = Math.min(minZ, h.z);
    maxZ = Math.max(maxZ, h.z);
  }
  // запас больше радиуса сглаживания дороги (24 м) — на границе области
  // вес выравнивания гарантированно ноль, разрывов рельефа нет
  const v: Village = {
    key,
    pts,
    segDirX,
    segDirZ,
    segLen,
    totalLen,
    houses,
    lamps,
    minX: minX - 26,
    maxX: maxX + 26,
    minZ: minZ - 26,
    maxZ: maxZ + 26,
  };
  villageCache.set(key, v);
  return v;
}

/** Деревня, чья область накрывает точку (сканируем соседние клетки сетки) */
export function villageAt(x: number, z: number): Village | null {
  const vcz0 = Math.floor(z / VROW);
  const vcx0 = Math.floor(x / VCW);
  for (let vcz = vcz0 - 1; vcz <= vcz0; vcz++) {
    for (let vcx = vcx0 - 1; vcx <= vcx0 + 1; vcx++) {
      const v = villageInCell(vcx, vcz);
      if (v && z >= v.minZ && z <= v.maxZ && x >= v.minX && x <= v.maxX) return v;
    }
  }
  return null;
}

/** Ближайшая точка дороги: расстояние², сегмент и параметр внутри него */
export function roadClosest(
  v: Village,
  x: number,
  z: number
): { d2: number; seg: number; t: number } {
  let best = Infinity;
  let bs = 0;
  let bt = 0;
  for (let s = 0; s < v.segLen.length; s++) {
    const a = v.pts[s];
    const dx = x - a.x;
    const dz = z - a.z;
    const proj = Math.max(0, Math.min(v.segLen[s], dx * v.segDirX[s] + dz * v.segDirZ[s]));
    const lx = dx - v.segDirX[s] * proj;
    const lz = dz - v.segDirZ[s] * proj;
    const d2 = lx * lx + lz * lz;
    if (d2 < best) {
      best = d2;
      bs = s;
      bt = proj / v.segLen[s];
    }
  }
  return { d2: best, seg: bs, t: bt };
}

// ВЫСОТА РЕЛЬЕФА — ЧЕРЕЗ ВПРЫСК, а не импортом. terrain.ts уже импортирует
// этот файл, и обратный импорт замкнул бы цикл модулей. Сэмплер ставится
// один раз при загрузке terrain.ts, то есть заведомо до первого запроса
// препятствий.
let sampleHeight: ((u: number, z: number) => number) | null = null;
export function setTerrainSampler(fn: (u: number, z: number) => number): void {
  sampleHeight = fn;
}

// --- ПОРОДЫ ДЕРЕВЬЕВ ---
// Вариант геометрии и ПОРОДА — разные вещи: пород шесть, а вариантов больше,
// потому что елей в лесу должно быть много и они обязаны отличаться друг от
// друга. Таблица общая для генератора и для строителя геометрии: иначе
// физика будет считать радиус куста по ели.
export const TS = {
  SPRUCE: 0, // ель: узкая свеча, лапы вниз
  PINE: 1,   // сосна: голый ствол, зонтичная крона
  LARCH: 2,  // лиственница: золотая хвоя, редкая крона
  BIRCH: 3,  // берёза: белый ствол, лиственная крона
  SNAG: 4,   // сухостой: серый обломок без хвои
  BUSH: 5,   // стланик: низкая подушка без ствола
} as const;

/** вариант геометрии -> порода */
export const TREE_SPECIES: number[] = [
  TS.SPRUCE, TS.SPRUCE, TS.SPRUCE, TS.SPRUCE, TS.SPRUCE,
  TS.PINE, TS.PINE,
  TS.LARCH,
  TS.BIRCH, TS.BIRCH,
  TS.SNAG,
  TS.BUSH, TS.BUSH,
];

/**
 * Выбор породы по равномерному числу 0..1 с учётом частот ТОГО МЕСТА, где
 * стоит дерево: в полосе перехода веса смешаны. Один общий список на всю
 * гору сажал бы ели в пепел.
 */
export function pickTreeVariant(u: number, z: number): number {
  const cdf = blendedTreeCdf(z);
  for (let i = 0; i < cdf.length; i++) if (u <= cdf[i]) return i;
  return cdf.length - 1;
}

/** множитель радиуса столкновения: в куст и в сухостой влетать не так больно */
export function treeRadiusMul(variant: number): number {
  const sp = TREE_SPECIES[variant] ?? TS.SPRUCE;
  return sp === TS.BUSH ? 0.45 : sp === TS.SNAG ? 0.65 : sp === TS.BIRCH ? 0.8 : 1;
}

/** стланик не тянется вверх, берёза наоборот повыше */
export function treeHeightMul(variant: number, u: number): number {
  const sp = TREE_SPECIES[variant] ?? TS.SPRUCE;
  if (sp === TS.BUSH) return 0.7 + u * 0.5;
  if (sp === TS.BIRCH) return 0.9 + u * 0.8;
  return 0.75 + u * 0.95;
}

// Круче этого лес не растёт. 0.72 ≈ 36°: на скальной стене под 70° деревья
// выглядели приклеенными к отвесу. Хвост распределения всё равно немного
// выше порога — проверка идёт в координатах ДОЛИНЫ, а ось её виляет, так что
// мировой градиент чуть отличается от проверенного.
const MAX_TREE_SLOPE = 0.72;

/** Крутизна склона в точке (tan угла); 0 — если сэмплер ещё не поставлен */
function slopeSteepness(u: number, z: number): number {
  if (!sampleHeight) return 0;
  const e = 2.5;
  const hx = (sampleHeight(u + e, z) - sampleHeight(u - e, z)) / (2 * e);
  const hz = (sampleHeight(u, z + e) - sampleHeight(u, z - e)) / (2 * e);
  return Math.hypot(hx, hz);
}

const SPAWN_CLEAR_R2 = 30 * 30; // вокруг точки старта препятствий нет

function nearSpawn(x: number, z: number): boolean {
  return x * x + z * z < SPAWN_CLEAR_R2;
}

// --- СКАЛЫ: массивы породы, торчащие ИЗ склона ---
// Параметры вынесены из генератора препятствий, потому что ими пользуется и
// РЕЛЬЕФ: под скалой земля вспучивается, иначе глыба стоит на снегу как
// привезённая — с зазором по кромке и без всякой связи с горой.
// Реже 6 чанков (≈288 м) ставить не стоит: скала — событие, а не фактура.
// Вместе с порогом 0.35 это даёт примерно в полтора раза чаще прежнего.
const CRAG_ROW = 6;
export const CRAG_STEP = CHUNK * CRAG_ROW;

export interface Crag {
  x: number;  // координаты ДОЛИНЫ
  z: number;
  r: number;      // радиус столкновения
  scale: number;  // высота массива, м
  variant: number;
  hMul: number;
  tint: number;
  mound: boolean;   // поднимать ли под ней рельеф
  snowTop: boolean; // лежит ли снег на макушке
  rot: number;      // поворот вокруг Y (общий для рендера и физики)
  zMul: number;     // сжатие по собственной оси Z
}

// ★ КРУГ — ПЛОХАЯ МОДЕЛЬ СКАЛЫ. Геометрия нормируется в единичный РОСТ, и
// силуэт после этого не только узкий (0.18–0.31 от высоты), но и заметно
// ВЫТЯНУТЫЙ. Круг радиусом по самой широкой стороне оставляет с узкой стороны
// пустое кольцо: замер по варианту 1 дал 0.128 против 0.326 — при высоте 200 м
// это двадцать девять метров воздуха, в котором игрока вырубало «ни обо что».
// Поэтому силуэт хранится РАДИАЛЬНЫМ ПРОФИЛЕМ: максимум радиуса в CRAG_BINS
// угловых секторах единичной геометрии. Профиль сообщает строитель геометрии
// (terrain.ts) через впрыск — иначе модули замкнутся в цикл.
export const CRAG_BINS = 24;
/**
 * ★ СИЛУЭТ ПОСЛОЙНЫЙ. Один профиль на всю глыбу мерил пояс 0.34–0.45 высоты,
 * а земля режет модель на 0.42/0.56 (sink) плюс холм плюс склон: доска шла
 * по слою, где камень уже/шире, чем в измеренном, и билась о воздух. Теперь
 * профиль снят для CRAG_LAYERS слоёв по CRAG_LAYER_H высоты, начиная с
 * CRAG_LAYER_Y0; при столкновении берётся слой, в котором стоит доска.
 */
export const CRAG_LAYER_Y0 = 0.25;
export const CRAG_LAYER_H = 0.05;
export const CRAG_LAYERS = 15;
let cragProf: number[][][] = [0, 1, 2, 3].map(() =>
  Array.from({ length: CRAG_LAYERS }, () => new Array(CRAG_BINS).fill(0.3))
);
let cragHalfW = [0.3, 0.3, 0.3, 0.3];
/**
 * ★ ХИТБОКС БУЛЫЖНИКА — ЭЛЛИПС ПО ЕГО СОБСТВЕННЫМ ОСЯМ, А НЕ КРУГ.
 * Камень повёрнут и растянут по Z, круг об этом не знал. Радиальный профиль
 * по геометрии (как у скал) я пробовал и замерил — он оказался ХУЖЕ круга
 * (32% промаха против 22%): контактный пояс у булыжника узкий и на разных
 * размерах приходится на разные части силуэта. Эллипс с коэффициентом 0.55
 * даёт 15% — лучшее из трёх.
 */
export function rockRadiusToward(o: Obstacle, dx: number, dz: number): number {
  const a = -(o.rot ?? 0);
  const lx = dx * Math.cos(a) - dz * Math.sin(a);
  const lz = dx * Math.sin(a) + dz * Math.cos(a);
  // Завал набок на прямой угол просто МЕНЯЕТ ОСИ МЕСТАМИ: в плане у лежачего
  // камня поперёк лежит его бывшая высота. Хитбокс обязан совпадать с
  // силуэтом, поэтому пересчёт тут, а не только в рисовании.
  const zm = o.lay ? (o.hMul ?? 0.7) : (o.zMul ?? 1);
  const ang = Math.atan2(lz / zm, lx);
  return 0.55 * (o.scale ?? 1) * Math.hypot(Math.cos(ang), Math.sin(ang) * zm);
}

export function setCragProfiles(p: number[][][]): void {
  cragProf = p;
  // габарит для расстановки — по слоям у уровня земли (0.35–0.65 высоты)
  cragHalfW = p.map((layers) => {
    let m = 0;
    for (let l = 2; l <= 8 && l < layers.length; l++) m = Math.max(m, ...layers[l]);
    return m;
  });
}

/** профиль в секторе с интерполяцией между соседями */
function sampleProf(prof: number[], bins: number, ang: number): number {
  // значения профиля стоят в ЦЕНТРАХ секторов — отсюда сдвиг на полсектора;
  // без него радиус берётся не из того сектора, и промах доходит до 15°
  const f = ((ang + Math.PI) / (2 * Math.PI)) * bins - 0.5 + bins;
  const i0 = Math.floor(f) % bins;
  const t = f - Math.floor(f);
  const r0 = prof[i0];
  const r1 = prof[(i0 + 1) % bins];
  // хорда между соседними лучами чуть проваливается внутрь контура — 1% назад
  return (r0 + (r1 - r0) * t) * 1.01;
}

/**
 * Максимум профиля по слоям, которые задевает полоса высот [y0, y1] модели.
 * Ниже первого слоя берём первый; выше последнего — камня нет (0).
 */
function layeredProf(layers: number[][], ly0: number, lh: number, bins: number, ang: number, y0: number, y1: number): number {
  let i0 = Math.floor((y0 - ly0) / lh);
  let i1 = Math.floor((y1 - ly0) / lh);
  if (i1 < 0) i1 = 0;
  if (i0 < 0) i0 = 0;
  if (i0 >= layers.length) return 0;
  if (i1 >= layers.length) i1 = layers.length - 1;
  let r = 0;
  for (let i = i0; i <= i1; i++) r = Math.max(r, sampleProf(layers[i], bins, ang));
  return r;
}

/**
 * Радиус скалы В НАПРАВЛЕНИИ (dx, dz) — мировом смещении от её центра.
 * Разворачиваем смещение в собственные оси глыбы, там берём сектор профиля с
 * линейной интерполяцией между соседями (без неё круг сменился бы шестерёнкой).
 */
/**
 * @param yW  мировая высота низа доски; @param hW — высота полосы касания
 * (доска + райдер), м. Без них берётся пояс у уровня земли (слои 0.34–0.45).
 */
export function cragRadiusToward(o: Obstacle, dx: number, dz: number, yW?: number, hW = 1.6): number {
  const layers = cragProf[o.variant ?? 0];
  if (!layers) return o.r;
  const a = -(o.rot ?? 0);
  const lx = dx * Math.cos(a) - dz * Math.sin(a);
  const lz = dx * Math.sin(a) + dz * Math.cos(a);
  const zm = o.zMul ?? 1;
  // угол берём в НОРМИРОВАННЫХ осях: по Z глыба сжата, и угол мирового
  // смещения не совпадает с углом в геометрии
  const ang = Math.atan2(lz / zm, lx);
  let y0 = 0.34;
  let y1 = 0.45;
  if (yW !== undefined && o.baseY !== undefined && o.hUnit) {
    y0 = (yW - o.baseY) / o.hUnit;
    y1 = y0 + hW / o.hUnit;
  }
  const rn = layeredProf(layers, CRAG_LAYER_Y0, CRAG_LAYER_H, CRAG_BINS, ang, y0, y1);
  // обратно в мир: вдоль X масштаб scale, вдоль Z — scale*zMul
  const cx = Math.cos(ang);
  const cz = Math.sin(ang) * zm;
  return o.scale * rn * Math.hypot(cx, cz);
}

const cragCache = new Map<number, Crag | null>();

/** Скала ряда k (или null). Чистая функция k — рельеф и препятствия сходятся */
export function cragInRow(k: number): Crag | null {
  const hit = cragCache.get(k);
  if (hit !== undefined) return hit;
  const cz = k * CRAG_ROW;
  let res: Crag | null = null;
  if (recipe().hasCrags && hash2(cz * 733 + 3, 11) > 0.29) {
    const gz = cz * CHUNK + (hash2(cz * 17 + 5, 9) - 0.5) * CHUNK * 0.8;
    const side = hash2(cz * 29, 31) > 0.5 ? 1 : -1;
    // Разброс размера ВДВОЕ поверх прежнего диапазона: от «как было» до вдвое
    // крупнее, чтобы среди скал попадались настоящие доминанты.
    let scale =
      (70 + Math.pow(hash2(cz * 53, 59), 1.6) * 85) * (1 + hash2(cz * 61, 67));
    // ★ ИЗЮМИНКА ЗАЕЗДА. Один останец на весь спуск вырастает втрое — это уже
    // не «камень на склоне», а ориентир, по которому заезд и запоминается.
    const R = recipe();
    if (R.landmark === 1 && Math.abs(gz - R.landmarkZ) < CRAG_ROW * CHUNK * 0.5) {
      scale *= 2.6;
    }
    const variant = Math.floor(hash2(cz * 71, 79) * 3.99);
    // чуть ВНУТРИ силуэта: цеплять «воздух» рядом со скалой обиднее, чем
    // проскрести боком по самому камню
    const rad = scale * (cragHalfW[variant] ?? 0.3) * 0.92;
    // Отступ СЧИТАЕТСЯ ОТ РАЗМЕРА: массив такого масштаба по старой мерке в
    // 30 м от оси просто перекрыл бы трассу целиком.
    const off = PISTE_HALF_W + 12 + rad + hash2(cz * 41, 37) * 70;
    const gx = pisteCenterX(gz) + side * off;
    // Скала НЕ ВСТАЁТ НА РЕЙЛ. Рейлы идут параллельно трассе в 46–108 м от
    // оси, скала стоит дальше, но её радиус — десятки метров, и она легко
    // накрывает линию скольжения. Уступает здесь скала: рейл — это маршрут,
    // а она декорация с коллизией.
    const clearOfRail = !railsNear(gx, gz).some(
      (r) => railDist2(r, gx, gz) < (rad + 25) * (rad + 25)
    );
    if (!nearSpawn(gx, gz) && !villageAt(gx, gz) && clearOfRail) {
      res = {
        x: gx, z: gz, r: rad, scale,
        // Холм под скалой — не всегда. Иногда порода просто торчит из
        // склона, будучи утопленной в него: так разнообразнее, и не каждая
        // скала стоит на собственном постаменте.
        mound: hash2(cz * 107, 13) > 0.45,
        snowTop: hash2(cz * 113, 17) > 0.55,
        // поворот и сжатие живут В ОПИСАНИИ СКАЛЫ, а не считаются заново в
        // рендере: физика обязана мерить ровно ту глыбу, которая нарисована
        rot: hash2(cz * 127, 19) * Math.PI * 2,
        zMul: 0.85 + hash2(cz * 131, 23) * 0.3,
        variant,
        hMul: 0.55 + hash2(cz * 83, 89) * 0.5,
        tint: 0.86 + hash2(cz * 97, 101) * 0.28,
      };
    }
  }
  cragCache.set(k, res);
  if (cragCache.size > 256) cragCache.clear();
  return res;
}

// --- КАМЕННЫЕ АРКИ ---
// Ворота поперёк долины: ноги за кромкой трассы, свод высоко над головой.
// Реже останцов — арка это событие на несколько минут спуска, а не фактура.
const ARCH_ROW = 15;
export const ARCH_STEP = CHUNK * ARCH_ROW; // 720 м

export interface Arch {
  x: number; // координаты ДОЛИНЫ, центр проёма
  z: number;
  span: number;   // полный пролёт, м
  height: number; // высота, м
  variant: number;
  tint: number;
}

// Положение и полуширина ноги в ЕДИНИЧНОЙ арке приходят из строителя
// геометрии (terrain.ts) — по той же причине, что и профиль останцов:
// столкновение обязано совпадать с тем, что нарисовано.
// ★ МЕТРИКА ПО КАЖДОМУ ВАРИАНТУ. Толщина трубы зависит от варианта, поэтому
// одна метрика на все три давала ноге чужой размер: замер по геометрии дал до
// 18 м лишнего радиуса — ровно та «вырубает по воздуху», что была у останцов.
// [вариант][нога]: ноги НЕ зеркальны (проём смещён) и не эллиптичны —
// у каждой свой радиальный профиль, снятый по геометрии (см. arch.ts)
export const ARCH_BINS = 20;
/** ★ ПОСЛОЙНО, как у останцов: layers[l] — профиль слоя высот [y0 + l·dy, +dy) единичной арки */
type LegProfile = { cx: number; prof: number[]; g0: number; y0: number; dy: number; layers: number[][] };
const FALLBACK: LegProfile[] = [
  { cx: -0.36, prof: new Array(ARCH_BINS).fill(0.11), g0: 0, y0: 0, dy: 0.04, layers: [new Array(ARCH_BINS).fill(0.11)] },
  { cx: 0.36, prof: new Array(ARCH_BINS).fill(0.11), g0: 0, y0: 0, dy: 0.04, layers: [new Array(ARCH_BINS).fill(0.11)] },
];
let archProf: LegProfile[][] = [FALLBACK];
export function setArchLeg(m: LegProfile[][]): void {
  archProf = m;
}
function legsOf(variant: number): LegProfile[] {
  return archProf[variant] ?? archProf[0] ?? FALLBACK;
}
/** максимум профиля — габаритный радиус ноги */
function legMaxR(l: LegProfile): number {
  return Math.max(...l.prof);
}
/** радиус ноги поперёк долины (сектор вдоль X) — им и меряется проём */
function legRx(l: LegProfile): number {
  return Math.max(l.prof[0], l.prof[ARCH_BINS / 2]);
}

/** Чистый просвет между ногами, м (по X — это и есть ширина ворот) */
export function archClear(span: number, variant: number): number {
  const [l, r] = legsOf(variant);
  return (r.cx - legRx(r) - (l.cx + legRx(l))) * span;
}

/**
 * Радиус ДОМА в направлении (dx, dz): точное расстояние от центра до стены
 * повёрнутого прямоугольника. Кругом дом описывать нельзя — у отеля стороны
 * различаются втрое.
 */
export function houseRadiusToward(o: Obstacle, dx: number, dz: number): number {
  const a = -(o.rot ?? 0);
  const lx = dx * Math.cos(a) - dz * Math.sin(a);
  const lz = dx * Math.sin(a) + dz * Math.cos(a);
  const d = Math.hypot(lx, lz) || 1;
  const hw = o.r;
  const hd = (o.zMul ?? 1) * hw;
  const cx = Math.abs(lx / d);
  const cz = Math.abs(lz / d);
  const tx = cx > 1e-6 ? hw / cx : Infinity;
  const tz = cz > 1e-6 ? hd / cz : Infinity;
  return Math.min(tx, tz);
}

/**
 * Радиус ноги В НАПРАВЛЕНИИ (dx, dz) по её профилю. Значения стоят в ЦЕНТРАХ
 * секторов, отсюда сдвиг на полсектора при выборке.
 */
export function archLegRadius(o: Obstacle, dx: number, dz: number, yW?: number, hW = 1.6): number {
  const legs = legsOf(o.variant ?? 0);
  const l = legs[o.leg ?? 0] ?? legs[0];
  const ang = Math.atan2(dz, dx);
  if (yW !== undefined && o.baseY !== undefined && o.hUnit && l.layers.length > 1) {
    const y0 = (yW - o.baseY) / o.hUnit;
    return layeredProf(l.layers, l.y0, l.dy, ARCH_BINS, ang, y0, y0 + hW / o.hUnit) * o.scale;
  }
  return sampleProf(l.prof, ARCH_BINS, ang) * o.scale;
}

const archCache = new Map<number, Arch | null>();

/** Арка ряда k (или null). Чистая функция k */
export function archInRow(k: number): Arch | null {
  const hit = archCache.get(k);
  if (hit !== undefined) return hit;
  const cz = k * ARCH_ROW;
  let res: Arch | null = null;
  if (recipe().hasArches && hash2(cz * 911 + 7, 23) > 0.45) {
    const gz = cz * CHUNK + (hash2(cz * 19 + 11, 29) - 0.5) * CHUNK * 0.7;
    const variant = Math.floor(hash2(cz * 59, 61) * 2.99);
    let span = 190 + Math.pow(hash2(cz * 37, 41), 1.3) * 140;
    // та же изюминка, второй вариант: одни ворота на заезд втрое шире прочих
    const RR = recipe();
    if (RR.landmark === 0 && Math.abs(gz - RR.landmarkZ) < ARCH_ROW * CHUNK * 0.5) {
      span *= 2.4;
    }
    // Пролёт задан снизу так, чтобы просвет гарантированно перекрывал трассу
    // с запасом: въезжать в ногу на скорости обиднее всего.
    const need = (PISTE_HALF_W + 16) * 2;
    const c0 = archClear(span, variant);
    const sp = c0 < need ? (span * need) / Math.max(1, c0) : span;
    const gx = pisteCenterX(gz);
    const legsU = legsOf(variant);
    const legOff = Math.max(...legsU.map((m) => Math.abs(m.cx))) * sp;
    const legR = Math.max(...legsU.map(legMaxR)) * sp;
    // ★ УСТУПАЕТ ТОЛЬКО НОГА. Сначала здесь стоял запрет на рейл в пределах
    // 0.6 пролёта — то есть 180 м от оси, тогда как рейлы идут в 46–108 м:
    // отбраковывались почти все арки (три штуки на 29 км). Проём рейлу не
    // мешает, под ним и надо ехать; расходиться должны ноги.
    const clearOfRail = ![gx - legOff, gx + legOff].some((lx) =>
      railsNear(lx, gz).some((r) => railDist2(r, lx, gz) < (legR + 20) * (legR + 20))
    );
    // останец не должен стоять ни в воротах, ни на ноге
    const cragNear = [-1, 0, 1].some((d) => {
      const c = cragInRow(Math.round(gz / (CHUNK * 6)) + d);
      if (!c) return false;
      return [gx - legOff, gx, gx + legOff].some(
        (lx) => Math.hypot(c.x - lx, c.z - gz) < c.r + legR + 25
      );
    });
    // Не ставим у самого старта: ряд k=0 попадает на z≈0, и ворота остаются
    // за спиной — их просто не увидят.
    // ★ НОГА НЕ СТОИТ В ЛОЖБИНЕ. Самый обидный тупик выглядит так: едешь по
    // впадине, она сужается — и упирается в ногу арки, объехать нечем, потому
    // что борта ложбины выше тебя. Проверяем каждую ногу: если под ней земля
    // заметно ниже, чем в двадцати пяти метрах по обе стороны, значит нога
    // перегораживает готовый жёлоб — такую арку не ставим вовсе.
    const legInTrench = sampleHeight
      ? [gx - legOff, gx + legOff].some((lx) => {
          const at = sampleHeight!(lx, gz);
          const l = sampleHeight!(lx - legR - 25, gz);
          const r = sampleHeight!(lx + legR + 25, gz);
          return l - at > 3.5 && r - at > 3.5;
        })
      : false;
    if (
      gz > 250 && !nearSpawn(gx, gz) && !villageAt(gx, gz) && clearOfRail && !cragNear &&
      !legInTrench
    ) {
      res = {
        x: gx,
        z: gz,
        span: sp,
        height: sp * (0.52 + hash2(cz * 43, 47) * 0.22),
        variant,
        tint: 0.88 + hash2(cz * 67, 71) * 0.24,
      };
    }
  }
  archCache.set(k, res);
  if (archCache.size > 256) archCache.clear();
  return res;
}

/** Мировые X ног арки и их радиус */
export function archLegs(a: Arch): { x: number; r: number }[] {
  return legsOf(a.variant).map((m) => ({
    x: a.x + m.cx * a.span,
    r: legMaxR(m) * a.span,
  }));
}

/**
 * Вспучивание рельефа под скалой. Без него глыба лежит НА снегу и читается
 * привезённой; с ним гора сама поднимается ей навстречу, и стык исчезает.
 * Холм заметно шире самой скалы и мягкий по краю — это не постамент, а
 * основание массива, засыпанное снегом.
 */
export function cragLift(u: number, v: number): number {
  const k0 = Math.floor(v / CRAG_STEP);
  let lift = 0;
  for (let k = k0 - 1; k <= k0 + 1; k++) {
    const c = cragInRow(k);
    if (!c || !c.mound) continue;
    const d = Math.hypot(u - c.x, v - c.z);
    const R = c.r * 2.2;
    if (d > R) continue;
    const t = 1 - d / R;
    // s-кривая в кубе: подножие расходится полого, к центру растёт круто
    lift += c.scale * 0.34 * Math.pow(t * t * (3 - 2 * t), 1.5);
  }
  return lift;
}

const chunkCache = new Map<string, Obstacle[]>();

/**
 * Плотность леса — четыре яруса крупными областями:
 * чистые поля → редкие деревья → средний лес → глухая чаща.
 */
export function forestDensityAt(x: number, z: number): number {
  const n = noise2(x * 0.003 + 40.1, z * 0.003 - 17.6) * 0.5 + 0.5;
  // густота леса — своя у мира (рецепт) и своя у акта: чаща сменяется голыми
  // полями, иначе весь спуск одинаково зарос
  // ★ У ПРОИЗВЕДЕНИЯ ДВУХ МНОЖИТЕЛЕЙ ЕСТЬ ДНО. Мир с редким лесом ПЛЮС акт
  // «открытые поля» перемножались в 0.045 — на пяти километрах не оставалось
  // ни дерева, а лес это главный ориентир вертикали. Держим хотя бы четверть.
  const m = biomeForestMul(z) *
    Math.max(0.25, Math.min(1.9, recipe().forest * actAt(z).forest));
  if (n < 0.42) return 0;
  if (n < 0.55) return Math.min(0.95, 0.12 * m);
  if (n < 0.68) return Math.min(0.95, 0.35 * m);
  return Math.min(0.95, 0.85 * m);
}

/** Препятствия чанка (чанк с центром в cx*CHUNK, cz*CHUNK) */
export function obstaclesInChunk(cx: number, cz: number): Obstacle[] {
  const key = cx + ',' + cz;
  const hit = chunkCache.get(key);
  if (hit) return hit;

  const list: Obstacle[] = [];
  const ox = cx * CHUNK;
  const oz = cz * CHUNK;

  // деревня: дома и фонари приходят из генератора деревни
  const village = villageAt(ox, oz);
  const bMinX = ox - CHUNK / 2;
  const bMaxX = ox + CHUNK / 2;
  const bMinZ = oz - CHUNK / 2;
  const bMaxZ = oz + CHUNK / 2;
  if (village) {
    for (const h of village.houses) {
      if (h.x >= bMinX && h.x < bMaxX && h.z >= bMinZ && h.z < bMaxZ) {
        // ДОМ — ПРЯМОУГОЛЬНИК, А НЕ КРУГ. С появлением отеля корпус стал
        // вдвое длиннее глубины, и круг по большей стороне выключал бы игрока
        // за три метра от стены.
        const hw = HOUSE_GEOM.BODY_HW * h.wide * h.scale;
        const hd = HOUSE_GEOM.BODY_HD * h.deep * h.scale;
        list.push({
          x: h.x,
          z: h.z,
          scale: h.scale,
          r: hw,
          zMul: hd / hw,
          kind: 'house',
          rot: h.rot,
        });
      }
    }
    for (const l of village.lamps) {
      if (l.x >= bMinX && l.x < bMaxX && l.z >= bMinZ && l.z < bMaxZ) {
        list.push({ x: l.x, z: l.z, scale: 1, r: 0.3, kind: 'lamp' });
      }
    }
  }

  // Скала ряда: в список препятствий попадает только у ТОГО чанка, который её
  // содержит. Физика ищет препятствия лишь в соседних чанках, и запись не в
  // свой чанк делает скалу полностью проходимой (замер: проезд в 0.7 м от
  // центра глыбы без единого касания).
  let cragHere: Crag | null = null;
  {
    const c = cragInRow(Math.round(cz / CRAG_ROW));
    if (c && Math.round(c.x / CHUNK) === cx && Math.round(c.z / CHUNK) === cz) {
      cragHere = c;
      // ★ модель утоплена ровно так же, как в terrain.buildCrag (sink)
      const sink = c.mound ? 0.42 : 0.56;
      const hUnit = c.scale * c.hMul;
      list.push({
        x: c.x, z: c.z, scale: c.scale, r: c.r, kind: 'crag',
        variant: c.variant, hMul: c.hMul, tint: c.tint,
        rot: c.rot, zMul: c.zMul,
        baseY: sampleHeight ? sampleHeight(c.x, c.z) - hUnit * sink : undefined,
        hUnit,
      });
    }
  }

  // Ноги арки: каждая — своё препятствие и попадает в СВОЙ чанк. Свод
  // столкновений не имеет вовсе: под ним и надо проезжать.
  for (let d = -1; d <= 1; d++) {
    const a = archInRow(Math.round(cz / 15) + d);
    if (!a) continue;
    if (Math.round(a.z / CHUNK) !== cz) continue;
    // подошва арки — по нижней из трёх точек, как в terrain.buildArch
    const g0 = legsOf(a.variant)[0]?.g0 ?? 0;
    const off = a.span * 0.5;
    const baseY = sampleHeight
      ? Math.min(sampleHeight(a.x - off, a.z), sampleHeight(a.x + off, a.z), sampleHeight(a.x, a.z)) -
        (g0 + 0.03) * a.height
      : undefined;
    archLegs(a).forEach((leg, li) => {
      if (Math.round(leg.x / CHUNK) !== cx) return;
      // scale здесь — ПРОЛЁТ: профиль ноги хранится в его долях
      list.push({
        x: leg.x, z: a.z, scale: a.span, r: leg.r, kind: 'arch',
        variant: a.variant, leg: li,
        baseY, hUnit: a.height,
      });
    });
  }

  // ЛЕС РАСТЁТ КУПАМИ, а не равномерной сыпью. Равномерная сыпь давала
  // сплошной частокол: объехать её нельзя, только протискиваться. Куртина
  // же оставляет между собой чистые коридоры — по ним и идёт линия спуска,
  // а сам лес становится препятствием, которое читается заранее.
  // Одиночные деревья тоже остаются, но редко — как ориентиры на открытом.
  // ВАЖНО: прореживание по плотности решает судьбу КУПЫ ЦЕЛИКОМ, а не
  // каждого дерева по отдельности. Иначе куртина рассыпается обратно в сыпь
  // (проверено: среднее расстояние до соседа оставалось 8.5 м, то есть
  // кластеров фактически не было).
  const clusters = 1 + Math.floor(hash2(cx * 41 + 3, cz * 67 + 9) * 3); // 1..3 купы
  const cCx: number[] = [];
  const cCz: number[] = [];
  const cR: number[] = [];
  for (let c = 0; c < clusters; c++) {
    const kx = ox + (hash2(cx * 71 + c * 13, cz * 37 + c) - 0.5) * CHUNK;
    const kz = oz + (hash2(cx * 59 + c, cz * 83 + c * 7) - 0.5) * CHUNK;
    // Разгон сложности режет купу целиком — тем же правилом, что и плотность
    // леса. Поштучное прореживание превращает куртину обратно в равномерную
    // сыпь, а сыпь из редких деревьев не читается как «лес стал гуще».
    if (hash2(cx * 199 + c * 17, cz * 181 + c) >
        forestDensityAt(kx, kz) * WARMUP.tree(kz)) continue;
    cCx.push(kx);
    cCz.push(kz);
    cR.push(4.5 + hash2(cx * 97 + c * 3, cz * 43 + c) * 7.5); // радиус купы 4.5–12 м
  }

  const treeCount = 9 + Math.floor(hash2(cx * 7 + 1, cz * 13 + 5) * 16);
  for (let i = 0; i < treeCount; i++) {
    let x: number;
    let z: number;
    const lone = cCx.length === 0 || hash2(cx * 149 + i * 11, cz * 113 + i * 5) > 0.88; // 12% одиночек
    if (lone) {
      x = ox + (hash2(cx * 31 + i, cz * 17) - 0.5) * CHUNK;
      z = oz + (hash2(cx * 19, cz * 23 + i) - 0.5) * CHUNK;
    } else {
      const c = i % cCx.length;
      // равномерно по площади круга: sqrt даёт плотный центр без сгустка в точке
      const rr = cR[c] * Math.sqrt(hash2(cx * 29 + i * 3, cz * 61 + i));
      const aa = hash2(cx * 53 + i, cz * 47 + i * 9) * Math.PI * 2;
      x = cCx[c] + Math.cos(aa) * rr;
      z = cCz[c] + Math.sin(aa) * rr;
    }
    if (nearSpawn(x, z)) continue;
    // внутри купы деревья не режем — судьба решена на уровне купы; одиночки
    // же остаются редкими ориентирами на открытом склоне
    if (lone &&
        hash2(cx * 101 + i * 3, cz * 53 + i) >
          forestDensityAt(x, z) * 0.5 * WARMUP.tree(z)) continue;
    if (kickerHeight(x, z) > 0.05) continue; // не растём на рампе
    if (gullyInside(x, z) > 0.3) continue; // дно и низ стен кулуара чистые
    if (surfaceKindAt(x, z) === SURF_ICE) continue; // на льду лес не держится
    if (slopeSteepness(x, z) > MAX_TREE_SLOPE) continue; // и на отвесе тоже
    if (cragHere) {
      const cdx = x - cragHere.x;
      const cdz = z - cragHere.z;
      const cr = cragHere.r * 1.15;
      if (cdx * cdx + cdz * cdz < cr * cr) continue; // и сквозь скалу тоже
    }
    if (railsNear(x, z).some((r) => railDist2(r, x, z) < 2.5 * 2.5)) continue; // и на рейле
    if (Math.abs(x - pisteCenterX(z)) < PISTE_HALF_W + 3) continue; // трасса расчищена
    if (village) {
      if (roadClosest(village, x, z).d2 < 13 * 13) continue;
      if (village.houses.some((h) => (h.x - x) ** 2 + (h.z - z) ** 2 < 64)) continue;
    }
    const scale = 0.8 + hash2(i * 3 + cx, i * 5 + cz) * 0.9;
    const vTree = pickTreeVariant(hash2(cx * 211 + i * 7, cz * 149 + i), z);
    list.push({
      x,
      z,
      scale,
      r: (0.4 * scale + 0.15) * treeRadiusMul(vTree),
      kind: 'tree',
      variant: vTree,
      // вытянутость вверх: ели-свечки против приземистых
      hMul: treeHeightMul(vTree, hash2(cx * 173 + i, cz * 197 + i * 3)),
      tint: 0.7 + hash2(cx * 131 + i * 5, cz * 179 + i) * 0.75,
    });
  }

  // КАМНИ: раньше 0–2 мелких шарика на чанк одного размера — их просто не
  // замечали. Теперь заметная валунная россыпь: у трети чанков поле из
  // нескольких камней вокруг общего центра, размеры от булыжника до глыбы
  // выше райдера, у каждого своя форма и поворот (variant + hMul/wMul).
  // Камни тоже прореживаются клетками, а не мельчают: камень ниже колена на
  // снегу не виден вообще и работает как невидимый капкан.
  const wRock = WARMUP.rock(oz);
  // Мелких камней ВДВОЕ меньше: они не читались как событие, только цепляли
  // доску и раздражали.
  const boulderField = hash2(cx * 3 + 11, cz * 29 + 2) > 1 - 0.08 * wRock;
  const rockCount = boulderField
    ? 3 + Math.floor(hash2(cx * 5 + 7, cz * 11 + 3) * 4) // 3..6
    : Math.floor(hash2(cx * 3 + 11, cz * 29 + 2) * 1.25 * wRock); // 0..1
  const fCx = ox + (hash2(cx * 23 + 5, cz * 91 + 1) - 0.5) * CHUNK;
  const fCz = oz + (hash2(cx * 87 + 2, cz * 19 + 6) - 0.5) * CHUNK;
  for (let i = 0; i < rockCount; i++) {
    let x: number;
    let z: number;
    if (boulderField) {
      const rr = 9 * Math.sqrt(hash2(cx * 13 + i * 5, cz * 7 + i));
      const aa = hash2(cx * 17 + i, cz * 31 + i * 3) * Math.PI * 2;
      x = fCx + Math.cos(aa) * rr;
      z = fCz + Math.sin(aa) * rr;
    } else {
      x = ox + (hash2(cx * 13 + i * 5, cz * 7 + i) - 0.5) * CHUNK;
      z = oz + (hash2(cx * 17 + i, cz * 31 + i * 3) - 0.5) * CHUNK;
    }
    if (nearSpawn(x, z)) continue;
    if (kickerHeight(x, z) > 0.05) continue;
    if (railsNear(x, z).some((r) => railDist2(r, x, z) < 2.5 * 2.5)) continue;
    if (Math.abs(x - pisteCenterX(z)) < PISTE_HALF_W + 2) continue;
    // РАЗМЕР: степенное распределение вместо равномерного. Мелких много,
    // средних меньше, крупные редки — как в настоящей осыпи. Равномерный
    // разброс давал кучу одинаково-средних камней, и поле выглядело
    // однообразным. В валунном поле первый камень — заведомо доминанта,
    // вокруг которой читается вся группа.
    const t = i === 0 && boulderField
      ? 0.85 + hash2(cx * 7 + i * 3, cz * 5 + i) * 0.15
      : hash2(cx * 7 + i * 3, cz * 5 + i);
    // Нижняя граница поднята: камень ниже колена на снегу не читается
    // вообще — он только цепляет доску, оставаясь невидимым. Всё, что
    // существует как препятствие, обязано быть заметным.
    const scale = 0.85 + Math.pow(t, 3.2) * 3.2; // 0.85 … 4.05
    const hMul = 0.45 + hash2(cx * 41 + i, cz * 29 + i * 5) * 0.7;
    const zMul = 0.85 + hash2(cx * 113 + i * 5, cz * 97 + i * 11) * 0.35;
    // ★ ЧАСТЬ ВАЛУНОВ ЛЕЖИТ НА БОКУ. Поворот был только вокруг вертикали, и
    // вытянутая глыба всегда стояла столбом — осыпь из менгиров. Настоящий
    // курумник наполовину лежачий: плиты завалены, столбы упали. Угол держим
    // близким к прямому — тогда хитбокс честно получается перестановкой осей
    // (см. rockRadiusToward), а разброс ±13° убирает выправленность.
    const lay = hash2(cx * 167 + i * 13, cz * 149 + i * 7) > 0.62
      ? Math.PI / 2 + (hash2(cx * 173 + i, cz * 181 + i * 3) - 0.5) * 0.45
      : 0;
    list.push({
      x,
      z,
      scale,
      r: 0.62 * scale,
      kind: 'rock',
      lay,
      // ★ ПОВОРОТ И РАСТЯЖЕНИЕ ЖИВУТ ЗДЕСЬ, А НЕ В РИСОВАНИИ. Раньше их
      // считал чанк при постройке меша, и физика о них не знала вовсе —
      // хитбокс был кругом вокруг повёрнутой и растянутой глыбы.
      rot: hash2(cx * 91 + i * 7, cz * 83 + i * 3) * Math.PI * 2,
      zMul,
      // ★ ВЫСОТА НАД ЗЕМЛЁЙ — ЧАСТЬ ХИТБОКСА. Мелкий валун торчит из снега на
      // треть метра, а сталкивались с ним как с полноростовым столбом: доска
      // билась о камень, которого под ней уже нет. Геометрия идёт до 0.76 по Y
      // и утоплена на 0.22, значит над землёй остаётся 0.54 её высоты.
      // у лежачего вверх смотрит бывшая ось Z — по ней и считается верхушка
      topY: scale * (lay ? zMul : hMul) * 0.54,
      variant: Math.floor(hash2(cx * 61 + i * 9, cz * 73 + i) * 3.99),
      // от плоских плит до столбов
      hMul,
      tint: 0.78 + hash2(cx * 137 + i * 3, cz * 151 + i) * 0.5,
    });
  }

  // СКАЛЫ — редкие каменные глыбы, которые надо ОБЪЕЗЖАТЬ. Сетка у них своя
  // и крупная: одна попытка на четыре чанка по каждой оси, то есть примерно
  // на 200 м спуска, и та срабатывает не всегда. Это не фактура склона, а
  // событие — по одной на несколько сотен метров, зато видно издалека.
  // Ставим их ВОЗЛЕ линии спуска, но не на самой оси: коридор ±19 м, скала
  // радиусом до 5 м у его края заставляет свернуть, а не упирается в тебя.
  // всё генерилось в координатах долины — наружу отдаём мировые
  for (const o of list) o.x = toWorldX(o.x, o.z);

  chunkCache.set(key, list);
  if (chunkCache.size > 512) chunkCache.clear();
  return list;
}

// --- Рейлы: длинные изогнутые полилинии, по которым скользят ---

// Рейлы редкие, но каждый — длинная извилистая линия, ради которой стоит
// свернуть. Клетки крупные: меньше рейлов на карте, но качественнее.
// РЕЙЛЫ ЖИВУТ У ТРАССЫ, А НЕ ПО АБСТРАКТНОЙ СЕТКЕ. Сетка по X раздавала их
// куда попало, а игрок держится коридора ±120 м — встреча была делом случая
// (за двадцать минут спуска попался ОДИН). Теперь колонка нужна только чтобы
// не потерять совместимость с поиском по клеткам: сам рейл ставится рядом с
// осью трассы, то есть на каждый ряд по спуску приходится своя попытка.
const RCW = 260;
const RCL = 340;
const RAIL_OFFSET = 130; // разброс начала рейла поперёк оси трассы
export const RAIL_HEIGHT = 0.55; // высота рейла над снегом (до подъёма над буграми)

export interface Rail {
  key: string;
  pts: Array<{ x: number; z: number }>;
  segDirX: number[];
  segDirZ: number[];
  segLen: number[];
  totalLen: number;
  ledge: boolean; // true — каменный парапет, false — рейл на опорах
}

const railCellCache = new Map<string, Rail | null>();

export function railInCell(rcx: number, rcz: number): Rail | null {
  const cacheKey = rcx + ',' + rcz;
  const cached = railCellCache.get(cacheKey);
  if (cached !== undefined) return cached;
  const miss = (): null => {
    railCellCache.set(cacheKey, null);
    return null;
  };
  const sz = (rcz + 0.5) * RCL + (hash2(rcz * 11, 5) - 0.5) * (RCL - 160);
  const sx = pisteCenterX(sz) + (hash2(rcz * 29, 17) - 0.5) * 2 * RAIL_OFFSET;
  // Ряд принадлежит ровно ОДНОЙ колонке — той, в которую попал сам рейл.
  // Иначе соседние колонки выдали бы копии одного и того же рейла.
  if (Math.floor(sx / RCW) !== rcx) return miss();
  const wr = WARMUP.rail(sz);
  if (wr <= 0) return miss();
  // ★ В ВУЛКАНЕ РЕЙЛОВ НЕТ. Перила посреди пепла и расплава — предмет из
  // другого мира: они читаются горнолыжной инфраструктурой, которой на
  // действующем вулкане взяться неоткуда.
  if (volcanoWeight(sz) > 0.15) return miss();
  if (hash2(rcz * 23 + 4, 9) < 1 - 0.82 * wr) return miss();
  if (nearSpawn(sx, sz)) return miss();

  // РЕЙЛ ИДЁТ ПАРАЛЛЕЛЬНО ТРАССЕ, а не по собственному компасу. Раньше линия
  // строилась случайным блужданием курса, и на пятистах метрах она почти
  // всегда где-нибудь да заходила в коридор — а любое такое пересечение
  // бракует рейл целиком (проверка ниже). Замер после переноса рейлов к
  // трассе: из 59 рядов выживало 9. Теперь линия задаётся ОТСТУПОМ от оси
  // трассы, и отступ гуляет в пределах, которые коридора не достают.
  const side = hash2(rcz * 31, 7) > 0.5 ? 1 : -1;
  let pts: Array<{ x: number; z: number }> = [];


  const off0 = 46 + hash2(rcz * 37, 11) * 62; // 46–108 м от оси трассы
  const segs = 16 + Math.floor(hash2(rcz * 29, 31) * 10.99); // 16–26 сегментов
  const step = 17 + hash2(rcz * 3, 19) * 12;
  const wobPh = hash2(rcz * 13, 3) * Math.PI * 2;
  for (let s = 0; s <= segs; s++) {
    const zz = sz + s * step;
    const off = off0 + Math.sin(s * 0.5 + wobPh) * 15 + Math.sin(s * 0.17 + 1.1) * 9;
    pts.push({ x: pisteCenterX(zz) + side * off, z: zz });
  }

  // Сглаживание Чайкина: срезаем углы полилинии, оставляя плавную дугу.
  // Концы закрепляем, иначе рейл укорачивается с каждым проходом.
  for (let pass = 0; pass < 3; pass++) {
    const out = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      out.push({ x: a.x * 0.75 + b.x * 0.25, z: a.z * 0.75 + b.z * 0.25 });
      out.push({ x: a.x * 0.25 + b.x * 0.75, z: a.z * 0.25 + b.z * 0.75 });
    }
    out.push(pts[pts.length - 1]);
    pts = out;
  }

  // рейл не должен пересекать ни трассу, ни деревню
  for (let i = 0; i < pts.length; i += 4) {
    if (Math.abs(pts[i].x - pisteCenterX(pts[i].z)) < PISTE_HALF_W + 8) return miss();
    const vv = villageAt(pts[i].x, pts[i].z);
    if (vv) {
      if (roadClosest(vv, pts[i].x, pts[i].z).d2 < 16 * 16) return miss();
      if (vv.houses.some((h) => (h.x - pts[i].x) ** 2 + (h.z - pts[i].z) ** 2 < 12 * 12)) {
        return miss();
      }
    }
  }

  const segDirX: number[] = [];
  const segDirZ: number[] = [];
  const segLen: number[] = [];
  let totalLen = 0;
  for (let s = 0; s < pts.length - 1; s++) {
    const dx = pts[s + 1].x - pts[s].x;
    const dz = pts[s + 1].z - pts[s].z;
    const len = Math.hypot(dx, dz);
    segDirX.push(dx / len);
    segDirZ.push(dz / len);
    segLen.push(len);
    totalLen += len;
  }
  const rail: Rail = {
    key: rcx + ',' + rcz,
    pts,
    segDirX,
    segDirZ,
    segLen,
    totalLen,
    ledge: hash2(rcx * 41, rcz * 37) > 0.5,
  };
  railCellCache.set(cacheKey, rail);
  if (railCellCache.size > 512) railCellCache.clear();
  return rail;
}

/** Рейлы в 3×3 клетках вокруг точки — для физики */
export function railsNear(x: number, z: number): Rail[] {
  const rcx = Math.floor(x / RCW);
  const rcz = Math.floor(z / RCL);
  const res: Rail[] = [];
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) {
      const r = railInCell(rcx + dx, rcz + dz);
      if (r) res.push(r);
    }
  }
  return res;
}

/** Рейлы, чья средняя точка лежит в чанке (для рендера без дублей) */
export function railsInChunk(cx: number, cz: number): Rail[] {
  const minX = cx * CHUNK - CHUNK / 2;
  const maxX = minX + CHUNK;
  const minZ = cz * CHUNK - CHUNK / 2;
  const maxZ = minZ + CHUNK;
  const res: Rail[] = [];
  const pad = 2; // полилиния может уползти на пару клеток
  for (let rcx = Math.floor(minX / RCW) - pad; rcx <= Math.floor(maxX / RCW) + pad; rcx++) {
    for (let rcz = Math.floor(minZ / RCL) - pad; rcz <= Math.floor(maxZ / RCL) + pad; rcz++) {
      const r = railInCell(rcx, rcz);
      if (!r) continue;
      const mid = r.pts[Math.floor(r.pts.length / 2)];
      if (mid.x >= minX && mid.x < maxX && mid.z >= minZ && mid.z < maxZ) res.push(r);
    }
  }
  return res;
}

// Рейлы генерятся в координатах долины; наружу (физика, рендер) отдаём
// мировые копии с пересчитанными направлениями сегментов.
const railWorldCache = new Map<string, Rail>();

function railToWorld(r: Rail): Rail {
  const hit = railWorldCache.get(r.key);
  if (hit) return hit;
  const pts = r.pts.map((p) => ({ x: toWorldX(p.x, p.z), z: p.z }));
  const segDirX: number[] = [];
  const segDirZ: number[] = [];
  const segLen: number[] = [];
  let totalLen = 0;
  for (let s = 0; s < pts.length - 1; s++) {
    const dx = pts[s + 1].x - pts[s].x;
    const dz = pts[s + 1].z - pts[s].z;
    const len = Math.hypot(dx, dz);
    segDirX.push(dx / len);
    segDirZ.push(dz / len);
    segLen.push(len);
    totalLen += len;
  }
  const w: Rail = { ...r, key: r.key + '|w', pts, segDirX, segDirZ, segLen, totalLen };
  railWorldCache.set(r.key, w);
  if (railWorldCache.size > 256) railWorldCache.clear();
  return w;
}

/** Рейлы вокруг мировой точки — для физики */
export function railsNearWorld(x: number, z: number): Rail[] {
  return railsNear(toValleyU(x, z), z).map(railToWorld);
}

/**
 * Рейлы, ЗАДЕВАЮЩИЕ чанк (в мировых координатах). Раньше рейл рисовался в
 * чанке своей середины, но при длине 200+ м середина часто оказывалась вне
 * подгруженной зоны — и рейл пропадал визуально, оставаясь в физике.
 */
export function railsInChunkWorld(cx: number, cz: number): Rail[] {
  // границы чанка — в координатах долины (в них он и строится)
  const minU = cx * CHUNK - CHUNK / 2 - 2;
  const maxU = minU + CHUNK + 4;
  const minZ = cz * CHUNK - CHUNK / 2 - 2;
  const maxZ = minZ + CHUNK + 4;
  const res: Rail[] = [];
  const padX = Math.ceil(400 / RCW) + 1;
  const padZ = Math.ceil(400 / RCL) + 1;
  for (let rcx = Math.floor(minU / RCW) - padX; rcx <= Math.floor(maxU / RCW) + 1; rcx++) {
    for (let rcz = Math.floor(minZ / RCL) - padZ; rcz <= Math.floor(maxZ / RCL) + 1; rcz++) {
      const r = railInCell(rcx, rcz);
      if (!r) continue;
      if (r.pts.some((p) => p.x >= minU && p.x < maxU && p.z >= minZ && p.z < maxZ)) {
        res.push(railToWorld(r));
      }
    }
  }
  return res;
}

/** Расстояние² от точки до полилинии рейла (в плане) */
export function railDist2(r: Rail, x: number, z: number): number {
  let best = Infinity;
  for (let s = 0; s < r.segLen.length; s++) {
    const a = r.pts[s];
    const dx = x - a.x;
    const dz = z - a.z;
    const proj = Math.max(0, Math.min(r.segLen[s], dx * r.segDirX[s] + dz * r.segDirZ[s]));
    const lx = dx - r.segDirX[s] * proj;
    const lz = dz - r.segDirZ[s] * proj;
    const d2 = lx * lx + lz * lz;
    if (d2 < best) best = d2;
  }
  return best;
}

// --- Кикеры: трамплины, врезанные прямо в функцию высоты рельефа ---
// Сетка клеток; в ~45% клеток стоит кикер со смещением по хэшу.
// Размеры индивидуальные: от лёгких пригорков до биг-эйр рамп.
// Профиль t^3 к губе: у губы рампа растёт быстрее, чем падает склон,
// поэтому детектор отрыва даёт честный вылет вверх с инерцией.

const KCW = 80;   // ширина клетки кикеров
const KCL = 110;  // длина клетки вдоль спуска

export interface Kicker {
  x: number;
  z: number;
  len: number;    // длина рампы
  halfW: number;  // полуширина
  h: number;      // высота губы
}

export function kickerInCell(kcx: number, kcz: number): Kicker | null {
  const x = (kcx + 0.5) * KCW + (hash2(kcx, kcz * 3) - 0.5) * (KCW - 38);
  const z = (kcz + 0.5) * KCL + (hash2(kcx * 7, kcz) - 0.5) * (KCL - 72);
  // Разгон сложности прореживает клетки, а не мельчит рампы: маленький кикер
  // не «лёгкий», он просто никакой. Порог 0.55 — это 45% занятых клеток.
  const wk = WARMUP.kicker(z);
  if (wk <= 0) return null;
  const jump = Math.min(2.0, recipe().jumps * actAt(z).jumps);
  if (hash2(kcx * 5 + 3, kcz * 11 + 7) < Math.max(0, 1 - 0.45 * wk * jump)) return null;
  const len = 8 + hash2(kcx * 3 + 1, kcz * 13 + 2) * 18;          // 8–26 м
  const halfW = 3 + hash2(kcx * 9 + 4, kcz * 17 + 6) * 6;         // 3–9 м
  // высота ограничена: слишком высокая рампа сзади выглядит как стена
  const h = Math.min(5, len * (0.18 + hash2(kcx * 21 + 8, kcz * 7 + 9) * 0.14));
  if (nearSpawn(x, z)) return null;
  // в деревне кикерам не место
  if (villageAt(x, z)) return null;
  return { x, z, len, halfW, h };
}

/** Вклад кикера в высоту рельефа в точке (x, z) */
export function kickerHeight(x: number, z: number): number {
  const kcx = Math.floor(x / KCW);
  const kcz = Math.floor(z / KCL);
  const k = kickerInCell(kcx, kcz);
  if (!k) return 0;
  const dx = x - k.x;
  const dz = z - k.z;
  if (dz < -k.len || dx < -k.halfW || dx > k.halfW) return 0;
  const across = Math.max(0, 1 - (dx / k.halfW) * (dx / k.halfW));
  if (dz >= 0) {
    // задняя грань короткая: губа резкая, как у настоящего кикера — иначе
    // при большой амортизации доска просто съезжает по ней без вылета
    if (dz >= 1.6) return 0;
    return k.h * across * (1 - dz / 1.6);
  }
  // профиль круче к губе: последние метры рампы реально задирают вверх
  const t = (dz + k.len) / k.len;
  return k.h * t * t * t * t * across;
}

/** Кикер, на рампе которого стоит точка (для явного вылета с губы) */
export function kickerAt(u: number, v: number): Kicker | null {
  const k = kickerInCell(Math.floor(u / KCW), Math.floor(v / KCL));
  if (!k) return null;
  const dz = v - k.z;
  const dx = u - k.x;
  if (dz < -k.len || dz >= 0 || dx < -k.halfW || dx > k.halfW) return null;
  return k;
}

/** Кикеры, чья губа лежит внутри данного чанка (для флажков-маркеров) */
export function kickersInChunk(cx: number, cz: number): Kicker[] {
  const minX = cx * CHUNK - CHUNK / 2;
  const maxX = minX + CHUNK;
  const minZ = cz * CHUNK - CHUNK / 2;
  const maxZ = minZ + CHUNK;
  const res: Kicker[] = [];
  for (let kcx = Math.floor(minX / KCW); kcx <= Math.floor(maxX / KCW); kcx++) {
    for (let kcz = Math.floor(minZ / KCL); kcz <= Math.floor(maxZ / KCL); kcz++) {
      const k = kickerInCell(kcx, kcz);
      if (k && k.x >= minX && k.x < maxX && k.z >= minZ && k.z < maxZ) res.push(k);
    }
  }
  return res;
}
