import * as THREE from 'three/webgpu';
import { lambert, basic, UniformMap } from '../core/mat';
import {
  Fn, If, Loop, float, int, uint, vec2, vec3, vec4, uniform, uniformArray, attribute,
  output, diffuseColor, normalView, positionLocal, positionGeometry, positionWorld, positionView,
  modelWorldMatrix,
  smoothstep, abs, floor, fract, sin, dot, mix, length, max, min, clamp, pow, normalize, atan, select,
} from 'three/tsl';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { hash2, noise2 } from './noise';
import { recipe, actAt } from './recipe';
import { PALETTE } from './palette';
import { buildArchGeometry, archLegProfiles } from './arch';
import { steamMarkAt, hazardHeatAt, hazardListsFor } from './lava';
import { poolCarve, setPoolTerrainSampler } from './pools';
import { ChunkShader } from './chunkshade';
import {
  CHUNK,
  obstaclesInChunk,
  kickersInChunk,
  kickerHeight,
  railsInChunk,
  RAIL_HEIGHT,
  Rail,
  Village,
  villageAt,
  roadClosest,
  cliffDrop,
  mesaLift,
  gullyDepth,
  gullyInside,
  valleyDepth,
  cragLift,
  cragInRow,
  setCragProfiles,
  CRAG_BINS,
  CRAG_LAYERS,
  CRAG_LAYER_Y0,
  CRAG_LAYER_H,
  CRAG_STEP,
  ARCH_STEP,
  archInRow,
  setArchLeg,
  type Arch,
  valleyX,
  biomeRoughMul,
  volcanoWeight,
  TREE_SPECIES,
  TS,
  HK,
  HOUSE_GEOM,
  houseRoof,
  type Crag,
  pisteAt,
  pisteCenterX,
  PISTE_HALF_W,
  valleySlope,
  WARMUP,
  volcanoEase,
  toWorldX,
  toValleyU,
  railsInChunkWorld,
  surfaceKindAt,
  lakeAt,
  setTerrainSampler,
  setVillagePads,
  SURF_PACKED,
  SURF_POWDER,
  SURF_ICE,
  SURF_DIRT,
} from './features';

// Склон уходит вниз вдоль +Z. Высота — аналитическая функция, физика
// использует её напрямую, меши чанков — только визуализация.
//
// Уклон всегда крутой (пологие участки убраны намеренно — «не весело»),
// лёгкая волна из синусов даёт ритм «быстро ↔ очень быстро».
// Высота — точный интеграл профиля, чтобы градиент для физики был честным.

// S0/S1 — БАЗА, поверх которой сид меняет характер горы (см. recipe.ts):
// один мир пологий и быстрый, другой — крутой с сильной волной.
const S0 = 0.58;
const S1 = 0.12, F1 = 0.009, P1 = 1.7;
const S2 = 0.05, F2 = 0.023, P2 = 4.2;

/** Текущий уклон спуска в точке z (для дебага и будущего дизайна биомов) */
export function slopeAt(z: number): number {
  const R = recipe();
  return R.slope + R.slopeWave * Math.sin(z * F1 + P1) + S2 * Math.sin(z * F2 + P2);
}

/**
 * Спуск вдоль оси долины. Ось виляет, поэтому путь длиннее, чем разница по Z:
 * компенсируем растяжением sqrt(1 + (dX/dZ)²), иначе на диагональных участках
 * уклон падал бы почти вдвое и появлялись бы пологие места.
 * Интеграл без аналитической формы — считаем таблицей с ленивым ростом.
 */
const DESC_STEP = 8;
const DESC_MIN_V = -2000;
const descTable: number[] = [0];
let descMaxV = DESC_MIN_V;

function descentSlopeAt(v: number): number {
  const sl = valleySlope(v);
  // Крутизна тоже разгоняется: старт — пологий вкат, дальше настоящий склон.
  // Множитель входит ПОД интеграл, поэтому высота остаётся честной первообразной
  // уклона и градиент для физики совпадает с картинкой.
  const R = recipe();
  return (R.slope + R.slopeWave * Math.sin(v * F1 + P1) + S2 * Math.sin(v * F2 + P2)) *
    Math.sqrt(1 + sl * sl) * WARMUP.slope(v) * volcanoEase(v);
}

function baseDescent(v: number): number {
  if (v > descMaxV) {
    // тянем таблицу вперёд по мере продвижения игрока
    const need = Math.ceil((v + 400 - DESC_MIN_V) / DESC_STEP) + 1;
    for (let i = descTable.length; i <= need; i++) {
      const a = DESC_MIN_V + (i - 1) * DESC_STEP;
      const b = a + DESC_STEP;
      descTable[i] =
        descTable[i - 1] + ((descentSlopeAt(a) + descentSlopeAt(b)) / 2) * DESC_STEP;
    }
    descMaxV = DESC_MIN_V + (descTable.length - 1) * DESC_STEP;
  }
  const f = (v - DESC_MIN_V) / DESC_STEP;
  const i = Math.max(0, Math.min(descTable.length - 2, Math.floor(f)));
  return descTable[i] + (descTable[i + 1] - descTable[i]) * (f - i);
}

/**
 * 0 — снежник, 1 — скальное поле. Крупные редкие пятна: скалы должны быть
 * событием на склоне, а не равномерной сыпью по всей горе.
 */
export function rockyAt(x: number, z: number): number {
  const n = noise2(x * 0.0042 - 33.1, z * 0.0026 + 17.7) * 0.5 + 0.5;
  // Двигаем ПОРОГ, а не высоту скал: иначе в «каменном» акте вырастает не
  // площадь выходов породы, а их амплитуда — и склон превращается в пилу.
  const dens = Math.min(2.2, recipe().rocky * actAt(z).rocky);
  const thr = 0.6 - (dens - 1) * 0.11;
  const d = Math.max(0, Math.min(1, (n - thr) / 0.16));
  return d * d * (3 - 2 * d);
}

/**
 * Излом скального поля — БЕЗ множителя rocky, чтобы его можно было пробовать
 * в соседних точках (см. flatBottom).
 */
function rockRelief(x: number, z: number): number {
  // ★ ВТОРАЯ ОКТАВА БЫЛА КОРОЧЕ, ЧЕМ ДОСКА МОЖЕТ ПРОГЛОТИТЬ. Было 0.16 (ячейка
  // 6 м) при ±2.2 м — это кривизна 0.34 против 0.014 у крупных форм горы, то
  // есть весь «шёлк» на дне ложбин делала она. Растянута до 14 м и приглушена;
  // излом на глаз остался (перепад 6 м на 14), а плоское дно стало возможным.
  return (
    noise2(x * 0.075 + 31.2, z * 0.06 - 14.5) * 4.5 +
    noise2(x * 0.07 - 6.3, z * 0.066 + 22.8) * 1.5
  );
}

/** полуширина будущего плоского дна, м (дно выходит примерно вдвое шире) */
const FLAT_R = 2.5;
/** ниже этой кривизны ложбина и так пологая — не трогаем */
const FLAT_MIN = 0.05;

/**
 * ★ У ВПАДИНЫ ОБЯЗАНО БЫТЬ ПЛОСКОЕ ДНО. Замер: 53% ложбин на склоне имели дно
 * уже 4 м, у глубоких (от 4 м) — 59%, медиана 3 м. В такой шёлк доска входит
 * кантом, повернуть в нём нечем, и райдера мотает. Виновником оказались НЕ
 * рёбра и не рябь (их отключение не меняло ширину дна вовсе), а скальные поля:
 * излом с ячейкой 13 и 6 м даёт кривизну 0.2–0.35 против 0.014 у крупных форм.
 *
 * Операция — морфологическое замыкание, но дешёвое: три пробы вдоль оси дают
 * кривизну curv и наклон g, из них считается расстояние до дна ложбины, и дно
 * приподнимается на curv по колоколу (1−t²)². Ширина колокола L = R·√2 выбрана
 * так, что в самом низу вторая производная обращается в НОЛЬ — дно получается
 * плоским, а по краям колокол сходит с нулевой производной, то есть без
 * излома. Излом здесь был бы хуже исходной ямы: доска ловит его мгновенно.
 *
 * Работает по обеим осям и берёт больший подъём: жёлоб вдоль спуска чинится
 * поперечной пробой, поперечный — продольной.
 */
function flatBottom(f: (x: number, z: number) => number, x: number, z: number): number {
  const v0 = f(x, z);
  const L = FLAT_R * Math.SQRT2;
  let lift = 0;
  for (let axis = 0; axis < 2; axis++) {
    const a = axis === 0 ? f(x - FLAT_R, z) : f(x, z - FLAT_R);
    const b = axis === 0 ? f(x + FLAT_R, z) : f(x, z + FLAT_R);
    const curv = (a + b) / 2 - v0;
    if (curv <= FLAT_MIN) continue; // выпуклость или почти прямая
    // вершина параболы: смещение от текущей точки до дна ложбины
    const t = ((b - a) / 2) * (FLAT_R / (2 * curv)) / L;
    if (t <= -1 || t >= 1) continue; // дно дальше колокола — мы уже на стенке
    const w = 1 - t * t;
    const add = curv * w * w;
    if (add > lift) lift = add;
  }
  return v0 + lift;
}

/**
 * 0 — гладкий вельвет, 1 — бугристая целина. Крупные области с резкой
 * границей: либо гладко, либо честно трясёт — без однородной каши.
 */
function roughnessAt(x: number, z: number): number {
  const n = noise2(x * 0.0025 + 11.3, z * 0.004) * 0.5 + 0.5;
  const d = Math.max(0, Math.min(1, (n - 0.45) / 0.14));
  return d * d * (3 - 2 * d);
}

// Обрывы и месы генерятся в features.ts (деревни проверяют их при размещении)

function terrainBase(x: number, z: number): number {
  // Трасса: укатанный коридор — мелкие бугры сглажены, обрывы и месы
  // подавлены, на дугах поднят вираж. Вне коридора — дикий склон.
  const piste = pisteAt(x, z);
  const wild = 1 - piste.t;

  let h = -baseDescent(z);
  // Амплитуда «дикого» рельефа на вкате прижата — но по-разному для формы
  // и для фактуры (см. WARMUP): силуэт горы остаётся, тряска уходит.
  const shape = WARMUP.shape(z);
  // Крупные ложбины и гребни поперёк склона: гора не «скатерть вниз»,
  // а система чаш и отрогов — линия падения гуляет влево-вправо, и спуск
  // получается кривым, как на настоящей горе.
  // По ходу спуска они меняются медленно — иначе гасили бы уклон в ноль
  h += noise2(x * 0.0011 + 21.4, z * 0.00045 - 5.2) * 95 * shape;
  h += noise2(x * 0.003 - 8.7, z * 0.0012 + 12.9) * 30 * shape;
  // БОРТА ДОЛИНЫ. Без них гора почти плоская вбок: смотришь вниз по склону —
  // и за локальным перегибом нет ничего, кроме неба, отсюда пустая полоса
  // поперёк кадра. Настоящая долина зажата стенами, они и держат средний
  // план. Стена начинается за 150–310 м от трассы (ездовой коридор — ±120 м,
  // физика не затронута) и растёт квадратично, то сходясь, то расступаясь.
  const dLat = x - pisteCenterX(z);
  const lat = Math.abs(dLat);
  // Ширина коридора НЕЗАВИСИМА слева и справа, с волной ~500 м: отроги по
  // очереди поджимают трассу и перекрывают линию взгляда вниз по долине —
  // как настоящие сходящиеся отроги. При симметричном коридоре взгляд
  // улетал по нему в пустоту на километры.
  const openN = dLat > 0
    ? noise2(z * 0.0058 + 91.2, 5.1)
    : noise2(z * 0.0052 - 44.7, 9.3);
  const open = 150 + (openN * 0.5 + 0.5) * 230;
  const wOut = Math.max(0, lat - open);
  if (wOut > 0) {
    // Коэффициент подобран по УКЛОНУ, а не по высоте: при 0.0026 борт вставал
    // под 60°, и на грубой дальней сетке это читалось гигантским гладким
    // парусом поперёк неба. 0.0008 даёт ~25–30° на середине борта — обычный
    // горный склон, который сетка в 30 м держит без искажений.
    // Сам по себе борт — гладкая парабола, и на дальней сетке он читался
    // сплошным гладким парусом поперёк неба. Настоящую стену делают
    // контрфорсы и кулуары: два масштаба модуляции, крупный (полкилометра)
    // и мелкий (около сотни метров) — от них силуэт гребня рваный.
    const rise = 0.55 + (noise2(x * 0.0038 - 4.2, z * 0.0021 + 18.5) * 0.5 + 0.5) * 0.8;
    const buttress = noise2(x * 0.011 + 33.4, z * 0.0055 - 7.1) * 0.5 + 0.5;
    h += Math.min(430, wOut * wOut * 0.0008) * rise * (0.7 + 0.55 * buttress);
  }
  // Отроги по линии падения: длинные рёбра, разделённые ложбинами. Это тот
  // самый средний масштаб, которого не хватало — без него между огромными
  // чашами и мелкой рябью пустота, и склон читается как ровная простыня.
  // Шум частый поперёк и очень медленный вдоль спуска, поэтому рёбра тянутся
  // вниз по склону и НЕ гасят уклон: они меняют форму вбок, а не крутизну.
  const ribs = WARMUP.ribs(z);
  // ★★ В ЖЁЛОБЕ РЁБРА ГАСЯТСЯ. Дно кулуара по проекту плоское на 22 м, но
  // профиль жёлоба складывается с рёбрами (амплитуда 7.5 и 3.2 м на масштабе
  // 36–71 м) — они кладут дно набок, и от ровной полосы остаётся 6–7 м
  // (замер по обоим биомам: медиана 6.5 и 7.5, у 63% уже десяти метров).
  // Рёбра — это форма СКЛОНА, внутри жёлоба им делать нечего.
  const gullyFlat = 1 - gullyInside(x, z) * 0.85;
  h += noise2(x * 0.014 + 44.1, z * 0.0016 - 7.8) * 7.5 * wild * ribs * gullyFlat;
  h += noise2(x * 0.028 - 19.6, z * 0.0035 + 2.4) * 3.2 * wild * ribs * gullyFlat;
  // дно кулуара тоже укатано — по нему едешь, а не трясёшься
  const gully = gullyInside(x, z);
  // Множитель биома: застывшая лава куда более заструженная, чем снег.
  // Внутри лавового канала наоборот — дно выглажено потоком, и это ЕДИНСТВЕННОЕ
  // место на вулкане, где можно держать прямую линию. Ради этого игрок его и
  // ищет: гладкость здесь и есть награда, как укатанность трассы в Альпах.
  const smoothed = 1 - 0.72 * piste.t * volcanoWeight(z);
  const r =
    roughnessAt(x, z) * wild * (1 - gully * 0.95) * WARMUP.bumps(z) *
    biomeRoughMul(z) * smoothed;
  // ★ ВЫТЯНУТО ВДОЛЬ СПУСКА: изотропные бугры (0.012/0.012) давали ложбины
  // поперёк склона — «ущелья поперёк». Частота вдоль z втрое ниже: рельеф
  // читается отрогами и ложбинами по линии падения, а не стиральной доской.
  h += noise2(x * 0.012 + 3.7, z * 0.0045) * 5.0 * (0.3 + 0.7 * r) * (0.35 + 0.65 * wild);
  h += noise2(x * 0.05, z * 0.02 + 9.1) * 2.0 * r;
  h += noise2(x * 0.18, z * 0.18) * 0.45 * r;
  // ★ ЧАША ПОД ОЗЕРОМ ПРИБАВЛЯЛАСЬ ДВАЖДЫ. Один и тот же вызов стоял двумя
  // блоками подряд — провалы выходили вдвое глубже задуманного, и выбраться из
  // них было нечем. Ровно один раз.
  const vwBowl = volcanoWeight(z);

  // ★ ШЛАКОВАЯ ФАКТУРА. Общего множителя ряби оказалось мало: он масштабирует
  // только часть слагаемых, и замер по 45 линиям дал всего +27% против Альп
  // вместо задуманного вдвое. Поэтому у вулкана СВОИ короткие волны — именно
  // их доска и чувствует: период 24 м на 40 м/с это дрожь около двух герц.
  // В канале их почти нет — там поток всё выгладил.
  const vwChop = volcanoWeight(z);
  if (vwChop > 0.001) {
    const open = 1 - 0.85 * piste.t;
    // Длинная волна даёт «застругу» — читается глазом, но не трясёт: у шума
    // с ячейкой в метр вторая производная падает как 1/T², и на 24 метрах её
    // уже нет. Тряску даёт КОРОТКАЯ волна; предел снизу — сетка меша (1.2 м
    // на ячейку), поэтому ниже шести метров опускаться нельзя, иначе рельеф
    // рассыплется в алиасинг.
    // ★ ЗАМЕР: 46% ВРЕМЕНИ В ВОЗДУХЕ ПРОТИВ 12% НА СНЕГУ. Короткая волна и
    // была той самой стиральной доской — шесть метров периода доска не
    // проглатывает ни на какой скорости, она на ней взлетает. Фактуру оставляем
    // ГЛАЗУ: длинную волну чуть тише, короткую вдвое ниже.
    // на въезде в биом фактура тоже прижата: пологий склон, засыпанный
    // застругами, «спокойным» не читается
    const ease = volcanoEase(z);
    h += noise2(x * 0.042 + 7.3, z * 0.042 - 2.9) * 0.32 * vwChop * open * ease;
    h += noise2(x * 0.17 - 4.1, z * 0.17 + 6.6) * 0.05 * vwChop * open * ease;
  }

  // ★ ВУЛКАН СЛОЖЕН ИЗ ПОТОКОВ, А НЕ ИЗ СУГРОБОВ. Снежный склон — это плавные
  // волны; застывшее поле лавы устроено иначе, и три его приёма дают почти всю
  // разницу:
  //  • ТЕРРАСЫ — потоки застывали слоями, и склон идёт ступенями с низкими
  //    уступами вместо ровного ската;
  //  • ВАЛЫ ВДОЛЬ ПОТОКА — расплав нагребает борта по краям своего русла, и
  //    между ними остаётся гладкий жёлоб (по нему и едут);
  //  • НАПОРНЫЕ СКЛАДКИ — поперечные морщины корки, частые и низкие.
  // Всё это гасится на трассе: коридор — это выглаженное потоком русло.
  if (vwBowl > 0.001) {
    const open = 1 - 0.8 * piste.t;
    const vw = vwBowl * open;
    // ★ ДОСКА ЧУВСТВУЕТ ВТОРУЮ ПРОИЗВОДНУЮ, А НЕ ВИД. Первый заход дал складки
    // в полтора метра с периодом восемнадцать — на скорости это выбрасывает
    // райдера в воздух каждые полсекунды, ехать нечем. Рисунок оставляем, но
    // все КОРОТКИЕ волны прижимаем к сантиметрам: террасы читаются глазом за
    // счёт длины уступа, а не его высоты.
    // ★ ТЕРРАС НЕТ ВОВСЕ — И ЭТО ОКОНЧАТЕЛЬНО. Ступени слоёв лавы выглядят
    // уместно, но играются отвратительно: уступ поперёк линии спуска на любой
    // скорости работает трамплином. Я трижды пытался их удержать — гасил на
    // трассе, отодвигал на 45 м, потом на 260 — и каждый раз это лишь
    // переносило «поля бугров» в другое место. Характер вулкана держат валы
    // вдоль русла, складки и цвет; геометрия под доской должна быть гладкой.
    // валы вдоль русла: длинные и пологие, доска их не замечает
    const chanN = noise2(x * 0.0026 - 17.9, z * 0.0009 + 4.4);
    const lev = Math.abs(chanN);
    h += (lev * lev * 2.4 - 0.6) * 3.2 * vw;
    // напорные складки: длиннее и в четыре раза ниже прежнего
    h += Math.abs(noise2(x * 0.004 + 8.1, z * 0.022 - 3.3)) * 0.38 * vw;
  }

  // Скальные выходы: редкие поля, где снег не держится и наружу лезет
  // изломанная порода. Дают крутые грани, на которых работает скальная
  // раскраска, — без них вся гора одинаково снежная.
  // и порода в жёлобе не вылезает: её излом — та же кособочащая добавка
  const rocky = rockyAt(x, z) * wild * WARMUP.rocky(z) * (1 - gully * 0.9);
  if (rocky > 0) {
    h += flatBottom(rockRelief, x, z) * rocky;
  }
  // Скала растёт ИЗ горы: под ней рельеф вспучивается холмом (см. cragLift).
  h += cragLift(x, z);
  h += gullyDepth(x, z);
  // ★ ДОЛИНЫ-УЩЕЛЬЯ вдоль спуска: U-профиль, отклонение ≤ 30°, иногда с рукавом
  h += valleyDepth(x, z);
  h += cliffDrop(x, z) * (1 - gully); // обрывы уже обходят трассу при генерации
  h += mesaLift(x, z) * (1 - piste.t * 0.85);
  // коридор чуть утоплен относительно целины: читается как прорезанная
  // ратраком трасса и мягко удерживает райдера на линии
  h -= 1.1 * piste.t;
  h += piste.bank * piste.t;
  h += kickerHeight(x, z);
  // ★ ЧАШИ ЛАВЫ ВЫРЕЗАЮТСЯ ПОСЛЕДНИМИ И ПОВЕРХ ВСЕГО. Дно ниже зеркала, вал
  // выше — это явная форма, а не добавка к шуму: внутри чаши рельеф именно
  // такой, каким его видит меш расплава и физика (см. pools.ts).
  if (vwBowl > 0.001) h += poolCarve(x, z, h);
  // ★ ЗАМЁРЗШИЕ ОЗЁРА ПОЛЯРНОЙ НОЧИ: зеркало выглажено до уровня, берег за
  // ним поднимается к рельефу — тоже явная форма поверх всего
  const lk = lakeAt(x, z);
  if (lk) h += (lk.bed - h) * lk.w;
  return h;
}

// --- Деревня выравнивает рельеф: сглаженный профиль дороги и ровные
// площадки под домами, врезанные в склон ---

function smooth01(t: number): number {
  const s = Math.max(0, Math.min(1, t));
  return s * s * (3 - 2 * s);
}

const villageHeightCache = new Map<string, { road: number[]; pads: number[] }>();

function villageHeights(v: Village): { road: number[]; pads: number[] } {
  const hit = villageHeightCache.get(v.key);
  if (hit) return hit;
  const raw = v.pts.map((p) => terrainBase(p.x, p.z));
  const road = raw.slice();
  // сглаживаем профиль дороги, чтобы она не прыгала по буграм, но не
  // отпускаем далеко от рельефа — иначе насыпь/выемка встают стеной
  for (let pass = 0; pass < 3; pass++) {
    for (let i = 1; i < road.length - 1; i++) {
      road[i] = (road[i - 1] + road[i] + road[i + 1]) / 3;
    }
    for (let i = 0; i < road.length; i++) {
      road[i] = Math.max(raw[i] - 2, Math.min(raw[i] + 2, road[i]));
    }
  }
  // Площадка дома — на СВОЕЙ высоте (среднее базового рельефа вокруг),
  // а не на уровне дороги: иначе на склоне двор превращается в насыпь
  // со ступенью по краю.
  const pads = v.houses.map((h) => {
    let sum = 0;
    let n = 0;
    for (const [dx, dz] of [
      [0, 0], [4, 0], [-4, 0], [0, 4], [0, -4],
    ] as Array<[number, number]>) {
      sum += terrainBase(h.x + dx, h.z + dz);
      n++;
    }
    const own = sum / n;
    if (!h.sunk) return own;
    // ★ ВКОПАННЫЙ ДОМ: КРЫША ПРОДОЛЖАЕТ СКЛОН. Ставим коробку так, чтобы
    // НАГОРНЫЙ карниз оказался вровень с землёй над домом — тогда на крышу
    // въезжаешь с горы, не заметив стыка, а вниз с конька улетаешь как с
    // трамплина. Считаем по terrainBase (без деревенского выполаживания),
    // иначе высота дома зависела бы от самой себя.
    const R = houseRoof(h);
    const up = terrainBase(h.x, h.z - R.hd - 2.5);
    // ★ НЕ MIN, А ИМЕННО ЭТА ОТМЕТКА. Сначала здесь стоял min(own, ...) — и на
    // склоне 0.6 он почти всегда выбирал own, то есть дом оставался стоять как
    // стоял, только без выравнивания земли: снег накрывал его с головой, и
    // игрок проезжал по сугробу, не задев ни стены, ни крыши (замер: 220 кадров
    // сквозь дом, ни одного касания). Ставим карниз на 0.4 м ниже нагорной
    // земли и лишь ограничиваем разумным коридором вокруг собственной отметки.
    const want = up - R.eave - 0.4;
    return Math.max(own - 6, Math.min(own + 1.5, want));
  });
  const res = { road, pads };
  villageHeightCache.set(v.key, res);
  return res;
}

export function terrainHeight(x: number, z: number): number {
  // мир генерируется в координатах долины: u — поперёк изогнутой оси спуска
  const u = toValleyU(x, z);
  return terrainAtValley(u, z);
}

/** Высота по локальным координатам долины (без обратного преобразования) */
// Отдаём высоту генератору препятствий: ему нужна крутизна, чтобы не сажать
// лес на скальные стены, а импортировать terrain.ts оттуда нельзя — цикл.
setTerrainSampler((u, z) => terrainAtValley(u, z));
// ★ ОДНА ВЫСОТА ПЛОЩАДКИ НА ВСЕХ. По крышам ездят, поэтому физика обязана
// мерить ровно ту отметку, на которой дом нарисован. У вкопанного дома она уже
// НЕ равна рельефу под ним, и вывести её из земли нельзя — отдаём напрямую.
setVillagePads((v, i) => villageHeights(v).pads[i]);
// чашам лавы нужен рельеф ДО их собственного выреза (см. pools.ts)
setPoolTerrainSampler((u, z) => terrainAtValley(u, z));

/**
 * ★ toNonIndexed() НА УЖЕ РАЗВЁРНУТОЙ ГЕОМЕТРИИ — ЭТО ЛИШНЯЯ КОПИЯ И ПРЕДУПРЕЖДЕНИЕ
 * В КОНСОЛИ (271 штука на старте). mergeGeometries и часть примитивов отдают
 * геометрию уже без индекса, и повторный вызов просто дублирует буферы.
 */
function flatten(g: THREE.BufferGeometry): THREE.BufferGeometry {
  return g.index ? g.toNonIndexed() : g;
}

// Силуэт скал — генератору препятствий: физика обязана мерить ровно тот
// контур, который нарисован (см. setCragProfiles). Считаем радиальный профиль
// прямо по вершинам: максимум радиуса в каждом угловом секторе.
/**
 * ★ РАДИАЛЬНЫЙ ПРОФИЛЬ ПО ЛУЧАМ, А НЕ ПО ВЕРШИНАМ. В каждом секторе пускаем
 * луч из центра и берём самое дальнее пересечение с рёбрами: длинное ребро,
 * протянутое между секторами, проходит над ними выше любой их вершины, и
 * профиль по вершинам недобирал — столкновение срабатывало сквозь камень.
 * Меряем ПОЯС КАСАНИЯ, а не всю проекцию: глыба утоплена в грунт, и доска
 * задевает её только там, а нависающие сверху лопасти шире талии.
 */
function radialProfile(
  g: THREE.BufferGeometry,
  yLo: number,
  yHi: number,
  bins: number
): number[] {
  const pos = g.attributes.position;
  const tri: number[][] = [];
  for (let i = 0; i < pos.count; i += 3) {
    const ym = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3;
    if (ym < yLo || ym > yHi) continue;
    tri.push([
      pos.getX(i), pos.getZ(i),
      pos.getX(i + 1), pos.getZ(i + 1),
      pos.getX(i + 2), pos.getZ(i + 2),
    ]);
  }
  const prof = new Array(bins).fill(0);
  for (let k = 0; k < bins; k++) {
    const th = ((k + 0.5) / bins) * Math.PI * 2 - Math.PI;
    const dx = Math.cos(th);
    const dz = Math.sin(th);
    let best = 0;
    for (const t of tri) {
      for (let e = 0; e < 3; e++) {
        const px = t[e * 2];
        const pz = t[e * 2 + 1];
        const ex = t[((e + 1) % 3) * 2] - px;
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
  // пустой сектор достраиваем по соседям: провал в ноль сделал бы глыбу
  // проходимой насквозь
  for (let pass = 0; pass < bins; pass++) {
    let holes = 0;
    for (let k = 0; k < bins; k++) {
      if (prof[k] > 0) continue;
      const p0 = prof[(k + bins - 1) % bins];
      const p1 = prof[(k + 1) % bins];
      if (p0 > 0 || p1 > 0) prof[k] = Math.max(p0, p1);
      else holes++;
    }
    if (holes === 0) break;
  }
  return prof;
}

// Силуэт скал — генератору препятствий: физика обязана мерить ровно тот
// контур, который нарисован.
setCragProfiles(
  [0, 1, 2, 3].map((v) => {
    const g = buildCragGeometry(v);
    // ★ ПОЯС КАСАНИЯ — ТОНКИЙ СЛОЙ НАД ЗЕМЛЁЙ, А НЕ ПОЛОВИНА ГЛЫБЫ. Мерили от
    // 0.36 до 0.66 высоты — то есть по всей её талии, а глыба там шире всего.
    // Земля режет модель примерно на 0.34 (см. cragLift), доска идёт в паре
    // метров над этой линией, и от неё до 0.66 камня уже нет — но хитбокс там
    // был. Отсюда и невидимые стены при проезде рядом. У арок пояс с самого
    // начала мерился правильно: [g0−0.01, g0+0.09].
    // ★ ПОСЛОЙНО: доска на склоне/холме встречает глыбу на разной высоте
    // модели, и слой берётся тот, где она стоит (см. cragRadiusToward).
    const layers: number[][] = [];
    const posA = g.attributes.position;
    let maxY = 0;
    for (let i = 0; i < posA.count; i++) maxY = Math.max(maxY, posA.getY(i));
    for (let l = 0; l < CRAG_LAYERS; l++) {
      const y0 = CRAG_LAYER_Y0 + l * CRAG_LAYER_H;
      // ★ по СРЕЗАМ (slice.ts): точный контур на любой высоте
      const lay = bandProfile(g, y0, y0 + CRAG_LAYER_H, CRAG_BINS);
      // пустой слой внутри модели — берём нижний сосед; выше макушки — камня нет
      layers.push(lay.some((v) => v > 0) || y0 > maxY ? lay : (layers[l - 1] ?? lay));
    }
    g.dispose();
    return layers;
  })
);

// Положение и радиус ноги арки — генератору препятствий. Меряем по самой
// геометрии: физика обязана мерить то, что нарисовано (та же причина, что и
// у профиля останцов выше).
setArchLeg(
  [0, 1, 2].map((v) => {
    const g = buildArchGeometry(v);
    const m = archLegProfiles(g);
    g.dispose();
    return m;
  })
);

export function terrainAtValley(u: number, z: number): number {
  const x = u;
  const base = terrainBase(x, z);
  const v = villageAt(x, z);
  if (!v) return base;
  const hs = villageHeights(v);

  let sumW = 0;
  let sumWH = 0;
  const rc = roadClosest(v, x, z);
  const rd = Math.sqrt(rc.d2);
  if (rd < 24) {
    const w = 1 - smooth01((rd - 5) / 19);
    const rh = hs.road[rc.seg] + (hs.road[rc.seg + 1] - hs.road[rc.seg]) * rc.t;
    sumW += w;
    sumWH += w * rh;
  }
  for (let i = 0; i < v.houses.length; i++) {
    const h = v.houses[i];
    // вкопанный дом не выравнивает землю под собой — он врезан в неё как есть
    if (h.sunk) continue;
    const d2 = (h.x - x) * (h.x - x) + (h.z - z) * (h.z - z);
    if (d2 > 13 * 13) continue;
    const w = 1 - smooth01((Math.sqrt(d2) - h.padR) / 6);
    sumW += w;
    sumWH += w * hs.pads[i];
  }
  const wTot = Math.min(1, sumW);
  const lvl = sumW <= 0.001 ? base : base * (1 - wTot) + (sumWH / sumW) * wTot;

  // ★ СУГРОБ С НАГОРНОЙ СТОРОНЫ — ПОДЪЁМ ДО КАРНИЗА, А НЕ ПРИБАВКА К ЗЕМЛЕ.
  // Без намёта крыша недостижима: карниз стоит на 1.7–4.7 м выше выровненной
  // площадки, и заехать можно было бы только с прыжка. У настоящего дома в
  // снегах намётано ровно так — с той стороны, откуда идёт склон, снег лежит
  // до самого карниза, и это же служит въездом.
  // ПЕРВАЯ ВЕРСИЯ ПРИБАВЛЯЛА высоту к рельефу — и деревню засыпало по конёк:
  // выше по склону земля и без того выше карниза, прибавка хоронила дома
  // целиком. Правильно — ПОДТЯГИВАТЬ землю к карнизу и только снизу.
  let out = lvl;
  for (let i = 0; i < v.houses.length; i++) {
    const h = v.houses[i];
    // ★ НАМЁТ ОСТАВЛЕН И ВКОПАННЫМ. Посадку дома считает terrainBase, а игрок
    // едет по terrainHeight — а там сверху лежат профиль улицы и площадки
    // соседей, и земля у нагорной стены оказывалась на метр-другой ниже
    // расчётной (замер: карниз торчал над склоном на 0.99 м по медиане и до
    // 6.75 на краю). Намёт доводит землю до карниза по факту, а не по расчёту:
    // у вкопанного дома ему остаётся дотянуть считанные сантиметры.
    const dx = x - h.x;
    const dz = z - h.z;
    if (dz > 0 || dx * dx + dz * dz > 18 * 18) continue; // намёт лежит выше по склону
    const R = houseRoof(h);
    const c = Math.cos(h.rot);
    const sn = Math.sin(h.rot);
    const lx = dx * c - dz * sn;
    const lz = dx * sn + dz * c;
    // ★ НАМЁТ — ЭТО БАНКА У ЧАСТИ СТЕНЫ, А НЕ ПАНДУС ВО ВСЮ ШИРИНУ ДОМА.
    // Во всю ширину он засыпает нагорный фасад целиком, и деревня читается
    // крышами, торчащими из поля. Держим его в средней половине стены —
    // тогда по бокам стена открыта, а сугроб выглядит сугробом.
    const band = R.hw * 0.6;
    const ox = Math.max(0, Math.abs(lx) - band);
    const oz = Math.max(0, Math.abs(lz) - R.hd);
    const dist = Math.hypot(ox, oz);
    if (dist > DRIFT_LEN) continue;
    // НЕ ДО САМОГО КАРНИЗА. Оставляем полметра стены: доска эту ступеньку
    // берёт (порог захвата крыши 0.9 м), а деревня не превращается в крыши,
    // торчащие из поля.
    const want = hs.pads[i] - 0.15 + Math.max(0, R.eave - 0.55);
    if (out >= want) continue;
    const t0 = 1 - dist / DRIFT_LEN;
    const t = t0 * t0 * (3 - 2 * t0) * smooth01(-dz / 2.5);
    out += (want - out) * t;
  }
  return out;
}

/** Градиент высоты (dh/dx, dh/dz) конечными разностями */
export function terrainGradient(x: number, z: number, out: THREE.Vector2): THREE.Vector2 {
  const e = 0.6;
  out.x = (terrainHeight(x + e, z) - terrainHeight(x - e, z)) / (2 * e);
  out.y = (terrainHeight(x, z + e) - terrainHeight(x, z - e)) / (2 * e);
  return out;
}

export function terrainNormal(x: number, z: number, out: THREE.Vector3): THREE.Vector3 {
  const e = 0.6;
  const dx = (terrainHeight(x + e, z) - terrainHeight(x - e, z)) / (2 * e);
  const dz = (terrainHeight(x, z + e) - terrainHeight(x, z - e)) / (2 * e);
  return out.set(-dx, 1, -dz).normalize();
}

/**
 * Высоты вершин полилинии рейла. Сегменты приподнимаются так, чтобы линия
 * нигде не ныряла под снег (рельеф между вершинами может горбиться выше).
 * Общая для физики и рендера, кэшируется по ключу рейла.
 */
const railHeightCache = new Map<string, number[]>();

export function railHeights(r: Rail): number[] {
  const hit = railHeightCache.get(r.key);
  if (hit) return hit;
  const ground = r.pts.map((p) => terrainHeight(p.x, p.z));
  const n = ground.length;

  // ЛИНИЯ РЕЙЛА НЕ ПОВТОРЯЕТ РЕЛЬЕФ. Раньше она жёстко зажималась в коридор
  // «земля + 0.4 … земля + 2.6», то есть послушно ныряла в каждую ложбину, и
  // грайнд ощущался ездой по буграм. Настоящий рейл кладут ПРЯМЫМ: где земля
  // уходит вниз, его держат опоры. Поэтому здесь линия сначала сглаживается
  // почти в прямую, а рельеф участвует только как нижняя граница.
  // ТРЕНД + ОГИБАЮЩАЯ ОСТАТКА. Порядок здесь принципиален, и обе более
  // простые попытки провалились с одинаковым симптомом — замером:
  //  • просто сгладить землю: линия проходит НИЖЕ бугров, её подпирают вверх
  //    в каждой точке, и рейл снова повторяет рельеф (медианный зазор упирался
  //    в минимальные 0.55 м, то есть линия лежала на снегу почти везде);
  //  • подпирать ВНУТРИ цикла сглаживания: храповик — подпор размазывается на
  //    соседей, и за десяток проходов весь рейл уезжает в потолок (медианная
  //    опора ровно 6.0 м);
  //  • скользящий максимум по САМОЙ земле: на склоне 0.5 м/м окно в ±25 м
  //    берёт точку на двенадцать метров выше, и рейл опять упирается в потолок.
  // Работает только так: сначала ТРЕНД (сильно сглаженная земля — он несёт
  // спуск), затем ОСТАТОК (одни бугры, без спуска), по остатку скользящий
  // максимум, и уже его сглаживаем. Тогда линия идёт вниз вместе с горой, но
  // перешагивает бугры, а не переваливает через каждый.
  const trend = ground.slice();
  for (let pass = 0; pass < 50; pass++) {
    const prev = trend.slice();
    for (let i = 1; i < n - 1; i++) {
      trend[i] = (prev[i - 1] + prev[i] * 1.1 + prev[i + 1]) / 3.1;
    }
  }
  const res = ground.map((g, i) => g - trend[i] + RAIL_MIN_CLEAR);
  const W = 8; // точек в окне скользящего максимума по остатку
  const env = res.map((_, i) => {
    let m = -Infinity;
    for (let j = Math.max(0, i - W); j <= Math.min(n - 1, i + W); j++) {
      if (res[j] > m) m = res[j];
    }
    return m;
  });
  for (let pass = 0; pass < 14; pass++) {
    const prev = env.slice();
    for (let i = 1; i < n - 1; i++) {
      env[i] = (prev[i - 1] + prev[i] * 1.1 + prev[i + 1]) / 3.1;
    }
  }
  const ys = ground.map((g, i) =>
    Math.min(g + RAIL_CLEAR_MAX, Math.max(g + RAIL_MIN_CLEAR, trend[i] + env[i]))
  );
  // ЗАХОД С ЗЕМЛИ. Рейл, начинающийся на высоте, поймать нечем: запрыгнуть
  // на него можно только с кикера, а он там не всегда. Первые ~12% длины
  // опускаем к самому снегу — получается заезд-приступок, как в парке, и на
  // рейл можно просто въехать.
  const lead = Math.max(3, Math.floor(n * 0.12));
  for (let i = 0; i < lead; i++) {
    const t = i / lead;
    const e = t * t * (3 - 2 * t);
    ys[i] = (ground[i] + 0.1) * (1 - e) + ys[i] * e;
  }

  // и не даём линии заметно лезть в горку — грайнд должен разгонять
  for (let i = 1; i < n; i++) {
    ys[i] = Math.min(ys[i], ys[i - 1] + 0.02 * r.segLen[i - 1]);
    if (ys[i] < ground[i] + RAIL_MIN_CLEAR) ys[i] = ground[i] + RAIL_MIN_CLEAR;
  }

  railHeightCache.set(r.key, ys);
  if (railHeightCache.size > 256) railHeightCache.clear();
  return ys;
}

// Потолок опор поднят: именно он раньше и заставлял линию нырять за рельефом.
// Шесть метров — это высокая, но осмысленная эстакада; выше уже не «рейл в
// парке», а мост, да и падать с него незаслуженно больно.
const RAIL_CLEAR_MAX = 6.0;
const RAIL_MIN_CLEAR = 0.4;

// Скала светлее, чем кажется правильным: на теневой стороне (а солнце
// стоит по курсу спуска) тёмный тон уходил в чёрную кляксу поперёк склона.
const ROCK_FACE = new THREE.Color(0x9d94a1);
const ROAD_TINT = new THREE.Color(0xb4bed8); // укатанный снег деревенской дороги
const TREE_TINT = new THREE.Color(); // переиспользуемый буфер для цвета инстанса
// Земля светлее и теплее, чем «правильный» бурый: цвет вершины ещё умножится
// на свет, а солнце стоит по курсу спуска — теневая сторона бугра с тёмным
// тоном превращалась в чёрную кляксу поперёк склона.
const DIRT_TINT = new THREE.Color(0xa8916e);
const ICE_TINT = new THREE.Color(0x7fa8cf);   // натёчный лёд
const PISTE_TINT = new THREE.Color(0xf2f6ff); // укатанный ратраком снег трассы

const SEG = 40; // мельче сетка — заметнее фактура снега на скорости
// Длина ската намёта у дома. Короче — стенка, по которой не заехать; длиннее —
// сугроб размером с двор.
const DRIFT_LEN = 5;
const RANGE_X = 3; // шире охват: сбоку в кадр вылезал грубый дальний меш
const RANGE_Z_BACK = 1;
const RANGE_Z_AHEAD = 4;
// ★ ОДИН ЧАНК ЗА КАДР. Замер: постройка чанка подорожала (в высоту вошли
// чаши озёр и сливы), и пачка из трёх давала кадры по 68 мс. Очередь всё
// равно разбирается за доли секунды, а рывок исчезает.
const BUILD_BUDGET = 1; // чанков за кадр после первичной генерации

/** Детерминированный ГПСЧ — чтобы порода дерева была одинаковой при каждом запуске */
function prng(seed: number): () => number {
  let s = (seed * 2654435761) >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const Y_UP = new THREE.Vector3(0, 1, 0);
const TMP_Q = new THREE.Quaternion();
const SNOW_ON_TREE = new THREE.Color(0xe8eefb);
// Цвет раскалённой щели. Ярче единицы: буфер линейный, и на этом держится
// ореол в блуме — иначе трещина просто оранжевая линия.
const GLOW_COL = new THREE.Color(2.6, 0.85, 0.22);

/**
 * ★ КАМЕНЬ КРАСИТСЯ ПО БИОМУ. Скалы, арки и валуны — общая для всего мира
 * геометрия с голубовато-серым тоном заснеженных гор. В вулканическом биоме
 * они оставались белыми пятнами посреди пепла: порода там базальтовая,
 * тёмная и тёплая, с рыжиной окисла на гранях.
 */
function rockTintFor(z: number, t: number, out: THREE.Color): THREE.Color {
  const vw = volcanoWeight(z);
  const r = t;
  const g = t * 1.01;
  const b = t * 1.06;
  if (vw < 0.01) return out.setRGB(r, g, b);
  const vr = t * 0.5;
  const vg = t * 0.36;
  const vb = t * 0.33;
  return out.setRGB(r + (vr - r) * vw, g + (vg - g) * vw, b + (vb - b) * vw);
}
// ★ ПРОКАЛ СВЕТИТСЯ КРАСНЫМ, А НЕ ЖЁЛТЫМ. Первая версия добавляла тот же
// GLOW_COL, что и в трещинах: с его зелёной составляющей 0.85 и порогом блума
// 0.72 предупреждающая кайма выгорала в жёлтое. Предупреждение должно быть
// красным — это его единственная работа.
const HAZ_COL = new THREE.Color(1.5, 0.12, 0.035);

/**
 * Ель с настоящими ветвями: ствол, мутовки веток с хвойными лапами,
 * верхушечный шпиль и — у части пород — снег на лапах.
 * Каждая порода получает свои пропорции, число мутовок и оттенок хвои.
 */
/**
 * ДЕРЕВО. Пород шесть (см. TREE_SPECIES), вариантов больше — елей в лесу
 * должно быть много и они обязаны отличаться друг от друга.
 *
 * ★ ПОРОДА, А НЕ РАЗБРОС ПАРАМЕТРОВ. Прежние восемь вариантов были одной и
 * той же ёлкой с чуть разными числами: один силуэт, один диапазон зелёного,
 * и лес читался повторяющейся текстурой. Разнообразие даёт не джиттер, а
 * РАЗНАЯ КОНСТРУКЦИЯ: у сосны голый ствол и зонтик наверху, у лиственницы
 * золотая хвоя, у берёзы белый ствол и лиственная крона, сухостой вообще без
 * хвои. Каждая такая порода читается издалека и меняет цвет леса пятнами.
 */
function buildPine(variant: number): THREE.BufferGeometry {
  const rand = prng(variant * 7919 + 13);
  const parts: THREE.BufferGeometry[] = [];
  const cols: THREE.Color[] = [];
  const push = (g: THREE.BufferGeometry, c: THREE.Color): void => {
    parts.push(g);
    cols.push(c);
  };
  // геометрия строится вдоль +Y, затем разворачивается по направлению ветки
  const alignTo = (
    g: THREE.BufferGeometry,
    dir: THREE.Vector3,
    px: number,
    py: number,
    pz: number
  ): void => {
    TMP_Q.setFromUnitVectors(Y_UP, dir);
    g.applyQuaternion(TMP_Q);
    g.translate(px, py, pz);
  };

  const species = TREE_SPECIES[variant] ?? TS.SPRUCE;
  const snowy = variant % 3 === 0 || species === TS.BUSH;
  const dir = new THREE.Vector3();

  // --- СТЛАНИК: подушка без ствола, лежит на камнях у границы леса ---
  if (species === TS.BUSH) {
    const R = 0.9 + rand() * 0.7;
    const hue = 0.31 + rand() * 0.07;
    const lobes = 5 + Math.floor(rand() * 4);
    for (let i = 0; i < lobes; i++) {
      const a = (i / lobes) * Math.PI * 2 + rand() * 0.5;
      const rr = R * (0.4 + rand() * 0.4);
      const lob = new THREE.IcosahedronGeometry(rr, 0);
      lob.scale(1, 0.55 + rand() * 0.3, 1);
      lob.translate(Math.cos(a) * R * 0.45, rr * 0.5, Math.sin(a) * R * 0.45);
      push(lob, new THREE.Color().setHSL(hue, 0.28 + rand() * 0.16, 0.13 + rand() * 0.06));
      if (snowy && rand() > 0.4) {
        const cap = new THREE.IcosahedronGeometry(rr * 0.72, 0);
        cap.scale(1, 0.4, 1);
        cap.translate(Math.cos(a) * R * 0.45, rr * 0.95, Math.sin(a) * R * 0.45);
        push(cap, SNOW_ON_TREE);
      }
    }
    return finishTree(parts, cols);
  }

  // --- СУХОСТОЙ: обломок ствола с культями сучьев ---
  if (species === TS.SNAG) {
    const H = 3.4 + rand() * 3;
    const grey = new THREE.Color().setHSL(0.09, 0.06, 0.42 + rand() * 0.12);
    const tr = new THREE.CylinderGeometry(0.07, 0.17, H, 6);
    tr.translate(0, H / 2, 0);
    // излом верхушки: срез наискось делает силуэт мёртвого дерева
    tr.rotateZ((rand() - 0.5) * 0.12);
    push(tr, grey);
    const stubs = 3 + Math.floor(rand() * 4);
    for (let i = 0; i < stubs; i++) {
      const y = H * (0.35 + rand() * 0.55);
      const a = rand() * Math.PI * 2;
      const len = 0.4 + rand() * 0.7;
      dir.set(Math.cos(a) * 0.85, 0.25 + rand() * 0.35, Math.sin(a) * 0.85).normalize();
      const st = new THREE.CylinderGeometry(0.02, 0.06, len, 4);
      st.translate(0, len / 2, 0);
      alignTo(st, dir, 0, y, 0);
      push(st, grey);
    }
    return finishTree(parts, cols);
  }

  // --- БЕРЁЗА: белый ствол, редкие ветви, лиственная крона ---
  if (species === TS.BIRCH) {
    const H = 5 + rand() * 3.5;
    const bark = new THREE.Color().setHSL(0.11, 0.05, 0.78 + rand() * 0.1);
    const dark = new THREE.Color().setHSL(0.08, 0.08, 0.22);
    const tr = new THREE.CylinderGeometry(0.06, 0.13, H, 6);
    tr.translate(0, H / 2, 0);
    push(tr, bark);
    // чёрные отметины на белой коре — без них ствол читается столбом
    for (let i = 0; i < 4; i++) {
      const y = H * (0.15 + rand() * 0.6);
      const mark = new THREE.BoxGeometry(0.15, 0.06 + rand() * 0.05, 0.15);
      mark.translate(0, y, 0);
      push(mark, dark);
    }
    // крона: рыхлые пучки листвы, цвет от золотого до бледно-зелёного
    const leafHue = rand() > 0.45 ? 0.11 + rand() * 0.04 : 0.24 + rand() * 0.06;
    const clumps = 6 + Math.floor(rand() * 4);
    for (let i = 0; i < clumps; i++) {
      const t = i / clumps;
      const y = H * (0.55 + t * 0.45) + (rand() - 0.5) * 0.4;
      const a = rand() * Math.PI * 2;
      const rad = (1.1 - t * 0.55) * (0.6 + rand() * 0.6);
      const off = (0.9 - t * 0.5) * (0.3 + rand() * 0.7);
      const cl = new THREE.IcosahedronGeometry(rad, 0);
      cl.scale(1, 0.75 + rand() * 0.3, 1);
      cl.translate(Math.cos(a) * off, y, Math.sin(a) * off);
      push(cl, new THREE.Color().setHSL(leafHue, 0.42 + rand() * 0.2, 0.3 + rand() * 0.14));
      // тонкая ветвь к пучку
      dir.set(Math.cos(a), 0.55, Math.sin(a)).normalize();
      const br = new THREE.CylinderGeometry(0.012, 0.03, off + 0.3, 3);
      br.translate(0, (off + 0.3) / 2, 0);
      alignTo(br, dir, 0, y - 0.35, 0);
      push(br, bark);
    }
    return finishTree(parts, cols);
  }

  // --- ХВОЙНЫЕ: ель, сосна, лиственница ---
  const H =
    species === TS.PINE ? 6.5 + rand() * 4.5
    : species === TS.LARCH ? 5.5 + rand() * 3.5
    : 4.8 + rand() * 4.6;
  const trunkR = (species === TS.PINE ? 0.14 : 0.09) + rand() * 0.07;
  // у ели мутовок много и они близко: крона обязана быть сплошной, а не
  // стопкой отдельных «юбок» с голым стволом между ними. У сосны наоборот —
  // ствол открыт до самого зонта.
  const whorls =
    species === TS.PINE ? 4 + Math.floor(rand() * 2)
    : species === TS.LARCH ? 7 + Math.floor(rand() * 3)
    : 9 + Math.floor(rand() * 4);
  const perWhorl = 4 + Math.floor(rand() * 2);
  const spread = (species === TS.PINE ? 1.5 : 1.0) + rand() * 0.9;
  // где начинается крона: у сосны высоко, у ели почти от земли
  const crownFrom = species === TS.PINE ? 0.58 : species === TS.LARCH ? 0.4 : 0.32;

  // Кора: у сосны тёплая красноватая, у ели и лиственницы серо-бурая.
  const bark =
    species === TS.PINE
      ? new THREE.Color().setHSL(0.045 + rand() * 0.02, 0.42, 0.3 + rand() * 0.08)
      : new THREE.Color().setHSL(0.08 + rand() * 0.03, 0.35, 0.2 + rand() * 0.08);
  // ★ ЦВЕТ ХВОИ — ПО ПОРОДЕ, а не один диапазон на весь лес. Лиственница
  // золотая, сосна желтее и светлее, ель холодная и тёмная (часть — почти
  // сине-зелёная). Пятна разных пород и делают лес лесом.
  const needleHue =
    species === TS.LARCH ? 0.1 + rand() * 0.035
    : species === TS.PINE ? 0.22 + rand() * 0.06
    : 0.28 + rand() * 0.14;
  const needleSat =
    species === TS.LARCH ? 0.5 + rand() * 0.18 : 0.3 + rand() * 0.25;
  const needleLum =
    species === TS.LARCH ? 0.34 + rand() * 0.1
    : species === TS.PINE ? 0.19 + rand() * 0.07
    : 0.15 + rand() * 0.07;

  const trunk = new THREE.CylinderGeometry(trunkR * 0.45, trunkR * 1.7, H, 6);
  trunk.translate(0, H / 2, 0);
  push(trunk, bark);
  // корневой наплыв: конус у подошвы. Стоит четыре треугольника, а ствол
  // перестаёт выглядеть воткнутой трубой.
  const flare = new THREE.ConeGeometry(trunkR * 2.6, trunkR * 5, 5);
  flare.translate(0, trunkR * 2.5, 0);
  push(flare, bark);

  for (let w = 0; w < whorls; w++) {
    const t = w / (whorls - 1); // 0 — низ кроны, 1 — верх
    const y = H * (crownFrom + t * (0.94 - crownFrom));
    const shape =
      species === TS.PINE
        ? 0.75 + 0.45 * Math.sin(t * Math.PI) // зонт: шире посередине
        : 1.5 - 1.05 * t;                      // свеча: сужается кверху
    const len = spread * shape * (0.85 + rand() * 0.3);
    // у ели лапы опущены, у сосны подняты, у лиственницы почти горизонтальны
    const droop =
      species === TS.PINE ? -0.1 - rand() * 0.15
      : species === TS.LARCH ? 0.05 + t * 0.15 + rand() * 0.1
      : 0.26 + t * 0.4 + rand() * 0.1;
    const cnt = perWhorl + (w % 2);
    const rot0 = rand() * Math.PI * 2;
    // выше по стволу хвоя светлее — крона не выглядит плоской заливкой
    const needle = new THREE.Color().setHSL(
      needleHue,
      needleSat,
      needleLum * (0.85 + t * 0.55)
    );

    for (let b = 0; b < cnt; b++) {
      const a = rot0 + (b / cnt) * Math.PI * 2 + (rand() - 0.5) * 0.25;
      const cd = Math.cos(droop);
      dir.set(Math.cos(a) * cd, -Math.sin(droop), Math.sin(a) * cd).normalize();

      const branch = new THREE.CylinderGeometry(0.018, 0.05, len, 3);
      branch.translate(0, len / 2, 0);
      alignTo(branch, dir, 0, y, 0);
      push(branch, bark);

      // хвойная лапа вдоль ветки — длиннее ветки, чтобы крона смыкалась;
      // у лиственницы она тоньше и реже, крона сквозная
      const needleLen = len * (species === TS.LARCH ? 1.2 : 1.5);
      const spray = new THREE.ConeGeometry(
        len * (species === TS.LARCH ? 0.26 : 0.42),
        needleLen,
        5
      );
      spray.translate(0, needleLen * 0.5, 0);
      alignTo(spray, dir, dir.x * len * 0.25, y + dir.y * len * 0.25, dir.z * len * 0.25);
      push(spray, needle);

      if (snowy && t > 0.25 && species !== TS.LARCH) {
        // снежная нашлёпка поверх лапы
        const capR = len * 0.3;
        const cap = new THREE.ConeGeometry(capR, capR * 0.75, 5);
        cap.scale(1, 1, 0.8);
        cap.translate(
          dir.x * len * 0.55,
          y + dir.y * len * 0.55 + len * 0.16,
          dir.z * len * 0.55
        );
        push(cap, SNOW_ON_TREE);
      }
    }
  }

  // ШИШКИ у ели: тёмные капли под верхними лапами. Мелочь, но вблизи именно
  // она отличает дерево от конуса.
  if (species === TS.SPRUCE) {
    const cones = 2 + Math.floor(rand() * 3);
    const coneCol = new THREE.Color().setHSL(0.06, 0.3, 0.16);
    for (let i = 0; i < cones; i++) {
      const a = rand() * Math.PI * 2;
      const y = H * (0.72 + rand() * 0.18);
      const off = spread * (0.25 + rand() * 0.3);
      const cn = new THREE.ConeGeometry(0.07, 0.26, 4);
      cn.rotateX(Math.PI);
      cn.translate(Math.cos(a) * off, y, Math.sin(a) * off);
      push(cn, coneCol);
    }
  }

  // верхушечный шпиль и снежная шапка; у сосны верхушка тупая
  if (species !== TS.PINE) {
    const spireH = H * 0.22;
    const spire = new THREE.ConeGeometry(spread * 0.3, spireH, 5);
    spire.translate(0, H * 0.9 + spireH * 0.4, 0);
    push(spire, new THREE.Color().setHSL(needleHue, needleSat, needleLum * 1.5));
    if (snowy && species !== TS.LARCH) {
      const crownH = spireH * 0.5;
      const crown = new THREE.ConeGeometry(spread * 0.19, crownH, 5);
      crown.translate(0, H * 0.9 + spireH * 0.75, 0);
      push(crown, SNOW_ON_TREE);
    }
  }

  return finishTree(parts, cols);
}

/** Свести куски дерева в одну геометрию, покрасив каждый в свой цвет */
function finishTree(parts: THREE.BufferGeometry[], cols: THREE.Color[]): THREE.BufferGeometry {
  const colored = parts.map((geo, i) => {
    const g = flatten(geo);
    const c = cols[i];
    const n = g.attributes.position.count;
    const arr = new Float32Array(n * 3);
    for (let k = 0; k < n; k++) {
      arr[k * 3] = c.r;
      arr[k * 3 + 1] = c.g;
      arr[k * 3 + 2] = c.b;
    }
    g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
    return g;
  });
  return mergeGeometries(colored);
}

// Четыре формы валуна: круглый, гранёный, плита и клин. Одна форма на всё
// делала камни неотличимыми друг от друга и незаметными на снегу.
function buildRockGeometry(variant: number): THREE.BufferGeometry {
  const base =
    variant === 0
      ? new THREE.DodecahedronGeometry(0.7)
      : variant === 1
        ? new THREE.IcosahedronGeometry(0.72)
        : variant === 2
          ? new THREE.DodecahedronGeometry(0.78, 0)
          : new THREE.IcosahedronGeometry(0.8, 0);
  const geo = flatten(base);
  // рвём правильность: сдвигаем вершины шумом — получаются угловатые глыбы
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const k = 1 + (hash2(Math.round(x * 97) + variant * 31, Math.round(z * 89) + Math.round(y * 71)) - 0.5) * 0.55;
    pos.setXYZ(i, x * k, y * k * (variant === 2 ? 0.55 : 1), z * k);
  }
  if (variant === 3) geo.scale(1.35, 0.8, 0.7); // клин, вытянутый вбок
  geo.computeVertexNormals();
  return geo;
}

/**
 * СКАЛА: не увеличенный валун, а сложенная глыба. Один камень любого размера
 * читается булыжником; настоящий останец — это несколько сросшихся блоков со
 * сколами и снежной полкой сверху, и узнаётся он именно по этому.
 */
function buildCragGeometry(variant: number): THREE.BufferGeometry {
  // СКОЛЫ, А НЕ ЯЩИКИ. Первая версия складывала скалу из коробок — и она
  // читалась именно ящиками, сколько ни поворачивай. Настоящий останец это
  // сросшиеся глыбы с косыми гранями: берём многогранники, СИЛЬНО рвём им
  // вершины шумом (грани перестают быть параллельными и равными) и сдвигаем
  // друг относительно друга.
  // ★ ДЕТАЛИЗАЦИЯ ДОЛЖНА СООТВЕТСТВОВАТЬ РАЗМЕРУ. Первая версия брала
  // многогранники с detail 0 — двенадцать граней на всю глыбу. На валуне это
  // незаметно, а растянутое на сто-триста метров превращается в пару
  // гигантских плоских плит: «как будто решили, что пары полигонов хватит».
  // Берём икосаэдр с двумя уровнями подразбиения (320 граней) и рвём его
  // вершины ТРЁХМАСШТАБНЫМ шумом: крупные лопасти, средние сколы, мелкая
  // щербина. Одного масштаба мало — получается мятый шар, а не порода.
  const parts: THREE.BufferGeometry[] = [];
  const lumps = 3 + (variant % 2);
  for (let i = 0; i < lumps; i++) {
    const a = hash2(variant * 91 + i * 17, i * 37 + 3);
    const b = hash2(variant * 53 + i * 29, i * 13 + 7);
    const g = flatten(new THREE.IcosahedronGeometry(0.55 + a * 0.4, i === 0 ? 2 : 1));
    const pos = g.attributes.position;
    const ph = variant * 13.7 + i * 5.3;
    for (let k = 0; k < pos.count; k++) {
      const x = pos.getX(k), y = pos.getY(k), z = pos.getZ(k);
      const len = Math.hypot(x, y, z) || 1;
      const nx = x / len, ny = y / len, nz = z / len;
      // три октавы по НАПРАВЛЕНИЮ вершины: поверхность остаётся замкнутой,
      // но перестаёт быть выпуклой
      const d =
        noise2(nx * 1.7 + ph, nz * 1.7 - ny * 1.3 + ph) * 0.34 +
        noise2(nx * 4.3 - ph, nz * 4.3 + ny * 3.1) * 0.17 +
        noise2(nx * 9.1 + ny * 7.7, nz * 9.1 - ph) * 0.08;
      const r = len * (1 + d);
      pos.setXYZ(k, nx * r, ny * r * (1.35 + b * 0.7), nz * r * (0.8 + a * 0.4));
    }
    // НАКЛОН ПО ДВУМ ОСЯМ: повёрнутая только вокруг Y глыба держит верхние
    // грани горизонтальными, и на склоне они читаются плоскими крышами.
    g.rotateY(a * Math.PI * 2);
    g.rotateZ((b - 0.5) * 0.9);
    g.rotateX((a - 0.5) * 0.75);
    g.translate((a - 0.5) * 0.75, i * 0.42 + b * 0.2, (b - 0.5) * 0.7);
    parts.push(g);
  }
  const geo = flatten(mergeGeometries(parts));
  // НОРМИРУЕМ В ЕДИНИЧНЫЙ РОСТ. Глыбы складываются, их высоты суммируются:
  // без нормировки «скала масштаба 5» вырастала в восемнадцать метров и
  // стояла чёрной башней поперёк кадра. Теперь scale — честная высота в
  // метрах, а подошва лежит ровно на нуле.
  geo.computeBoundingBox();
  const bb = geo.boundingBox!;
  const h = Math.max(0.001, bb.max.y - bb.min.y);
  geo.translate(-(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2);
  geo.scale(1 / h, 1 / h, 1 / h);
  geo.computeVertexNormals();

  // ЦВЕТ ПО ГРАНЯМ, А НЕ ОДНОЙ ЗАЛИВКОЙ. Ровный тон превращает скалу в
  // силуэт: у настоящей породы низ темнее и холоднее (там тень и мокрый
  // камень), верх выгоревший, на пологих полках лежит снег, а соседние
  // сколы всегда чуть разного оттенка. Всё это — один проход по граням.
  const pos2 = geo.attributes.position;
  const nor2 = geo.attributes.normal;
  const col = new Float32Array(pos2.count * 3);
  // Тона взяты из палитры МИРА: порода склона (ROCK_FACE 0x9d94a1) тёплая и
  // серо-лиловая. Синий камень выглядел деталью из другой игры.
  const cDark = new THREE.Color(0x635d66);   // подножие, тень
  const cLight = new THREE.Color(0xa79fa8);  // выгоревший верх
  const cSnow = new THREE.Color(0xdfe6f5);
  const tmp = new THREE.Color();
  for (let i = 0; i < pos2.count; i += 3) {
    // грань: берём среднюю нормаль и среднюю высоту треугольника
    let ny = 0;
    let hy = 0;
    for (let k = 0; k < 3; k++) {
      ny += nor2.getY(i + k) / 3;
      hy += pos2.getY(i + k) / 3;
    }
    const t = Math.max(0, Math.min(1, hy)); // 0 — подошва, 1 — макушка
    tmp.copy(cDark).lerp(cLight, t * t * (3 - 2 * t));
    // снег держится только на пологом и тем охотнее, чем выше
    // Снег ложится ТОЛЬКО на почти горизонтальное и заметно слабее: прежний
    // порог 0.5 красил белым любую наклонную грань, и они читались крышами.
    const flat = Math.max(0, Math.min(1, (ny - 0.78) / 0.18));
    tmp.lerp(cSnow, flat * flat * (0.2 + 0.45 * t));
    // разнотон соседних сколов — без него грани сливаются в одну плоскость
    const j = 0.9 + hash2(Math.round(pos2.getX(i) * 71), Math.round(pos2.getZ(i) * 83) + i) * 0.22;
    for (let k = 0; k < 3; k++) {
      col[(i + k) * 3] = tmp.r * j;
      col[(i + k) * 3 + 1] = tmp.g * j;
      col[(i + k) * 3 + 2] = tmp.b * j;
    }
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return geo;
}

/**
 * СНЕГ НА МАКУШКЕ — КОРКА ПО САМОЙ ПОРОДЕ, А НЕ ПЛИТА СВЕРХУ.
 * Раньше шапкой был короб: он поворачивался только вокруг Y, тогда как глыбы
 * наклонены по трём осям, и на скале высотой в две сотни метров это читалось
 * ровным горизонтальным полигоном, висящим над камнем. Здесь вместо короба
 * берутся ГРАНИ САМОЙ СКАЛЫ, на которых снег и держался бы: пологие и повыше
 * подножия. Каждая отодвигается по своей нормали на волосок, чтобы не спорить
 * с камнем за глубину. Горизонтальных плит не остаётся в принципе — снег
 * повторяет наклон породы.
 */
function buildCragSnowGeometry(src: THREE.BufferGeometry): THREE.BufferGeometry | null {
  const pos = src.attributes.position;
  const nor = src.attributes.normal;
  const out: number[] = [];
  for (let i = 0; i < pos.count; i += 3) {
    let ny = 0;
    let hy = 0;
    for (let k = 0; k < 3; k++) {
      ny += nor.getY(i + k) / 3;
      hy += pos.getY(i + k) / 3;
    }
    // снег лежит на пологом (не круче ~50°) и в верхней половине массива
    if (ny < 0.64 || hy < 0.52) continue;
    for (let k = 0; k < 3; k++) {
      const o = 0.004;
      out.push(
        pos.getX(i + k) + nor.getX(i + k) * o,
        pos.getY(i + k) + nor.getY(i + k) * o,
        pos.getZ(i + k) + nor.getZ(i + k) * o
      );
    }
  }
  if (out.length < 9) return null;
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(out, 3));
  g.computeVertexNormals();
  return g;
}

function buildFlagGeometry(): THREE.BufferGeometry {
  const pole = new THREE.BoxGeometry(0.08, 1.4, 0.08);
  pole.translate(0, 0.7, 0);
  const pennant = new THREE.BoxGeometry(0.45, 0.3, 0.05);
  pennant.translate(0.22, 1.15, 0);
  return flatten(mergeGeometries([pole, pennant]));
}

function buildRoofGeometry(): THREE.BufferGeometry {
  // двускатная крыша-призма
  const hw = 2.7;
  const hd = 2.05;
  const h = 1.5;
  // prettier-ignore
  const verts = [
    // левый скат
    -hw, 0, -hd, -hw, 0, hd, 0, h, hd, -hw, 0, -hd, 0, h, hd, 0, h, -hd,
    // правый скат
    hw, 0, -hd, 0, h, -hd, 0, h, hd, hw, 0, -hd, 0, h, hd, hw, 0, hd,
    // фронтоны
    -hw, 0, -hd, 0, h, -hd, hw, 0, -hd,
    -hw, 0, hd, hw, 0, hd, 0, h, hd,
  ];
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.computeVertexNormals();
  return geo;
}


/**
 * Цвет точки поверхности. Вынесено из buildChunk, чтобы дальний план
 * (farfield.ts) красился ТЕМ ЖЕ кодом: иначе между детальной землёй и
 * горизонтом лежит полоса, не похожая ни на то, ни на другое.
 *
 * u, z — координаты долины; ny — Y нормали; wy — мировая высота (для
 * слоистости породы).
 */
export function terrainColorAt(
  out: { r: number; g: number; b: number; glow?: number; hot?: number },
  u: number,
  z: number,
  ny: number,
  wy: number,
  far = false
): void {
  const snow = PALETTE.snow;
  const rock = ROCK_FACE;
  // Снег держится на пологом и в желобах; на крутых гранях выходит скала.
  // Полосы снега в кулуарах даёт шум, растянутый вдоль линии падения —
  // это и есть узнаваемый рисунок настоящей стены.
  const steep = 1 - ny;
  // Полосы снега в кулуарах, налипшие пятна и слоистость породы — детали
  // МЕЛЬЧЕ шага дальней сетки. Вблизи они рисуют фактуру стены, а вдали
  // под скользящим углом алиасят в тёмных «червяков», ползущих по склону,
  // — поэтому вдали скала ГЛАДКАЯ: только тон по крутизне.
  const streak = far ? 0.5 : noise2(u * 0.35 + 17.2, z * 0.055) * 0.5 + 0.5;
  const plaster = far
    ? 0.17
    : Math.max(0, noise2(u * 0.12 - 8.4, z * 0.12 + 3.9)) * 0.34;
  // Вдали порог скалы куда выше: на грубой сетке склоны 25–35° дают грани,
  // прыгающие вокруг ближнего порога, и по горизонталям склона ползли
  // волнистые бурые полосы (под тёплым солнцем серая скала светится бежевым).
  // Скала вдали — только на настоящих обрывах за 50°.
  const bareT = far ? 0.6 : 0.42;
  const bareW = far ? 0.2 : 0.26;
  const bareMax = far ? 0.5 : 0.86;
  const bare = Math.max(0, Math.min(bareMax, (steep - bareT - streak * 0.2) / bareW - plaster));
  const kk = bare * bare * (3 - 2 * bare);
  // слоистость породы: горизонтальные пласты, как на скальных стенах
  const band = far ? 0 : noise2(u * 0.02, wy * 0.075) * 0.19;
  const rr = rock.r * (1 + band), rg = rock.g * (1 + band * 0.9), rb = rock.b * (1 + band * 0.7);
  let cr = snow.r + (rr - snow.r) * kk;
  let cg = snow.g + (rg - snow.g) * kk;
  let cb = snow.b + (rb - snow.b) * kk;
  // Фактура снега: без неё поверхность — сплошная заливка, глазу не за
  // что зацепиться, и скорость не читается вообще.
  const mottleAmp = far ? 0.45 : 1;
  const mottle =
    (noise2(u * 0.23 + 61.7, z * 0.23) * 0.07 +
      noise2(u * 0.075 - 12.4, z * 0.075) * 0.055) * mottleAmp;
  cr *= 1 + mottle;
  cg *= 1 + mottle;
  cb *= 1 + mottle * 0.85; // холоднее в тенях

  // Тип поверхности должен читаться с одного взгляда: лёд — тёмная
  // синь с бликом, рыхляк — слепяще-белый, земля — бурая и шершавая.
  // Пятна земли и блики льда мельче шага дальней сетки: на ней они не
  // читаются как поверхность, а алиасят в бурые разводы. Вдали — только снег,
  // скала и трасса.
  const sk = far ? SURF_PACKED : surfaceKindAt(u, z);
  if (sk === SURF_ICE) {
    cr = cr * 0.45 + ICE_TINT.r * 0.55;
    cg = cg * 0.45 + ICE_TINT.g * 0.55;
    cb = cb * 0.45 + ICE_TINT.b * 0.55;
    const glint = noise2(u * 0.5 + 3.3, z * 0.5) > 0.72 ? 0.22 : 0;
    cr += glint; cg += glint; cb += glint;
  } else if (sk === SURF_POWDER) {
    cr = cr * 0.72 + 0.28; cg = cg * 0.72 + 0.28; cb = cb * 0.72 + 0.28;
  } else if (sk === SURF_DIRT) {
    cr = cr * 0.38 + DIRT_TINT.r * 0.62;
    cg = cg * 0.38 + DIRT_TINT.g * 0.62;
    cb = cb * 0.38 + DIRT_TINT.b * 0.62;
    const gr = noise2(u * 0.42 - 9.1, z * 0.42) * 0.14;
    cr += gr; cg += gr * 0.9; cb += gr * 0.7;
  }
  // ★ ВУЛКАНИЧЕСКИЙ СКЛОН — ЭТО ДРУГАЯ ПОВЕРХНОСТЬ, А НЕ ПЕРЕКРАШЕННЫЙ СНЕГ.
  // Снежная раскраска строится на плавных переходах: мягкая крапинка ±7% и
  // лерп «снег → скала» по крутизне. От смены палитры она остаётся снегом,
  // только серым — ровно на это и жаловались. У застывшего потока всё иначе:
  //  • пятна пепла по чёрному базальту имеют ЖЁСТКУЮ границу, а не градиент;
  //  • поверхность канатная — складки вытянуты вдоль линии падения;
  //  • зерно клинкера крупное и контрастное (±25%, а не ±7%);
  //  • всё это прошито сетью трещин, и в трещинах виден жар.
  let glow = 0;
  let glowHz = 0;
  const vw = volcanoWeight(z);
  if (vw > 0.01) {
    const sstep = (a: number, b: number, x: number): number => {
      const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
    const patch = noise2(u * 0.017 + 31.7, z * 0.017) * 0.5 + 0.5;
    const ash = sstep(0.46, 0.54, patch); // жёсткая кромка пепельного поля
    const ropy = far ? 0.5 : noise2(u * 0.55, z * 0.06 + 11.3) * 0.5 + 0.5;
    const grit = far ? 0.5 : noise2(u * 1.15 - 4.2, z * 1.15) * 0.5 + 0.5;
    // ★★ ПЕПЕЛ ТЁМНЫЙ И ХОЛОДНЫЙ. Было 0.34/0.31/0.30 — светло-серый, который
    // под любым тёплым светом становится песком: биом читался пустыней, а не
    // вулканом. Вулкан — это ЧЁРНОЕ И КРАСНОЕ: пепел уводим втрое темнее и
    // слегка в синеву, чтобы тёплый свет его подкрашивал, а не перекрашивал.
    // Красное в кадре имеет право давать только сама лава и прокал у неё.
    // пепел тёмный: земля вулкана должна быть ПЕПЛОМ, а не бурым грунтом
    // ★★ У ПОРОДЫ ЕСТЬ ЦВЕТ. Мы гнали пепел всё темнее (0.13 к концу) в
    // попытке уйти от «пустыни» — а уходить надо было не в темноту, а в
    // светлую мглу: на референсе камень вулкана это тёплый пыльно-бурый, и
    // читается он контрастом с бледным коралловым воздухом. При альбедо у нуля
    // читать нечем, и картинку начинают рисовать аддитивные подмешки зарева —
    // они-то и давали охру вблизи и чёрную даль.
    // ★ ПОРОДА КРАСНО-БУРАЯ, А НЕ ПЕСОЧНАЯ. С отношением каналов 1:0.72:0.66
    // камень читался таном — то есть песком, ровно тем, от чего уходим.
    // У вулканического камня зелёный и синий провалены сильнее.
    // ★ ЧЁРНОЕ, А НЕ БУРОЕ («опять пустыня, должно быть чёрным»): порода почти
    // нейтральный тёмно-серый базальт, пепел светлее лишь вдвое; красное в кадре
    // даёт только лава и прокал.
    let vr = 0.095 + (0.170 - 0.095) * ash;
    let vg = 0.088 + (0.160 - 0.088) * ash;
    let vb = 0.088 + (0.155 - 0.088) * ash;
    const rk = 0.84 + ropy * 0.32;
    const gk = 0.86 + grit * 0.28;
    vr *= rk * gk;
    vg *= rk * gk;
    vb *= rk * gk * 0.97;
    // ★ ПЕПЕЛЬНОЕ ПОЛЕ БЕЗ ФАКТУРЫ ЧИТАЕТСЯ ПУСТЫНЕЙ. Само по себе оно почти
    // серое, но ровный тёплый свет на гладком склоне превращает его в бархан.
    // У настоящего пепла на вулкане поверхность полосатая: его сдувает вдоль
    // линии падения, из-под него тёмными языками проступает старый шлак, а
    // сверху лежат наносы. Это ЧИСТО ЦВЕТ — геометрию не трогаем, чтобы не
    // вернуть тряску.
    if (ash > 0.01) {
      // длинные полосы вдоль спуска: сдув
      const drift = far ? 0 : noise2(u * 0.085 + 5.5, z * 0.011 - 3.1);
      // тёмные языки старого потока, проступающие из-под наноса
      const scar = far
        ? 0
        : Math.max(0, noise2(u * 0.02 - 12.4, z * 0.0065 + 7.7) * 0.5 + 0.5 - 0.58) / 0.42;
      const k = (1 + drift * 0.22) * (1 - scar * 0.55);
      vr *= 1 + (k - 1) * ash;
      vg *= 1 + (k - 1) * ash;
      vb *= 1 + (k - 1) * ash * 1.08;
    }
    // ★★ КРУТЫЕ ГРАНИ — БАЗАЛЬТ, А НЕ ПУСТОТА. Было 0.085/0.052/0.042, и это
    // ещё домножается на тинт биома (0.27) — итого 0.023, то есть чистая
    // чернота при любом свете: борта ущелий читались дырами в мире, а не
    // камнем (луч в такое место: ламберт 0.49, солнце светит — а всё равно
    // чёрное). Камень обязан оставаться камнем: тёмным, но с фактурой.
    const sk2 = sstep(0.34, 0.62, steep);
    vr += (0.14 - vr) * sk2;
    vg += (0.13 - vg) * sk2;
    vb += (0.125 - vb) * sk2;
    // ★ УСТЬЕ ПАРА ПОМЕЧЕНО НА ЗЕМЛЕ. Струя подбрасывает — это выгодно, и
    // игрок должен видеть цель заранее, а не в момент удара. Вокруг щели
    // натёк серно-жёлтый налёт, сама щель тёмная. Вдали метку не считаем:
    // устье в десяток метров там всё равно не читается.
    const mk = far ? 0 : steamMarkAt(u, z);
    if (mk > 0.01) {
      const ring = Math.max(0, 1 - Math.abs(mk - 0.45) / 0.45);
      const core = Math.max(0, (mk - 0.72) / 0.28);
      vr += (0.62 - vr) * ring * 0.7;
      vg += (0.55 - vg) * ring * 0.7;
      vb += (0.24 - vb) * ring * 0.7;
      vr *= 1 - core * 0.6;
      vg *= 1 - core * 0.6;
      vb *= 1 - core * 0.55;
    }
    // ★ ОПАСНОСТЬ ВИДНА ПО ЦВЕТУ ЗЕМЛИ. Вокруг языков, озёр и колодцев почва
    // прокалена и окислена — от кирпичного к раскалённому у самой кромки.
    // Это единственная подсказка, которую игрок успевает прочитать на 100
    // км/ч, и берётся она из той же геометрии, что и убивает.
    const hz = far ? 0 : hazardHeatAt(u, z, terrainHeight, toWorldX);
    if (hz > 0.01) {
      const k = hz * hz;
      vr += (0.46 - vr) * k;
      vg += (0.085 - vg) * k * 0.95;
      vb += (0.055 - vb) * k * 0.95;
      glowHz = k * 0.35;
    }
    // ★ ТРЕЩИНЫ СЧИТАЮТСЯ ПОПИКСЕЛЬНО, А НЕ В ВЕРШИНЕ. Сетка рельефа — 3 м,
    // а трещина тоньше метра: в вершинах она рассыпается на штрихи размером с
    // треугольник (склон вышел в оранжевых царапинах). Поэтому в вершину
    // кладётся только ВЕС БИОМА, а сеть трещин и зерно клинкера рисует
    // шейдер — там разрешение пиксельное.
    glow = vw;
    cr += (vr - cr) * vw;
    cg += (vg - cg) * vw;
    cb += (vb - cb) * vw;
  }

  // укатанная трасса заметно светлее и холоднее целины; на вулкане это не
  // ратрак, а выметенный пеплом жёлоб — иначе по склону идёт снежная лента
  const pt = pisteAt(u, z).t;
  if (pt > 0) {
    // Жёлоб виден и здесь — иначе линию спуска не прочитать вовсе; но это
    // выметенный пепел, а не ратрак: серый, а не белый.
    // Замер контраста: в альпах жёлоб светлее целины в 1.1–1.7 раза, а здесь
    // при цели 0.40 выходило 6 раз — потому лента и читалась снежной.
    const tr = PISTE_TINT.r + (0.15 - PISTE_TINT.r) * vw;
    const tg = PISTE_TINT.g + (0.14 - PISTE_TINT.g) * vw;
    const tb = PISTE_TINT.b + (0.135 - PISTE_TINT.b) * vw;
    // на льду (замёрзшие озёра) жёлоб не читается — лёд есть лёд
    const k = pt * (0.75 - vw * 0.1) * (sk === SURF_ICE ? 0.15 : 1);
    cr += (tr - cr) * k;
    cg += (tg - cg) * k;
    cb += (tb - cb) * k;
  }
  out.r = cr; out.g = cg; out.b = cb;
  out.glow = glow;
  out.hot = glowHz;
}

import { damage } from '../fx/damage';
import { bandProfile } from './slice';
import { SHIPS } from './airships';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type N = any;

/** хэш по ЯЧЕЙКЕ и value-noise рельефа */
// ★ хэш решётки — целочисленный: sin() на больших координатах ломается (NaN на Apple GPU)
const thash = Fn(([p0]: [N]) => {
  const p: N = floor(p0);
  const h = uint(int(p.x)).mul(uint(374761393)).add(uint(int(p.y)).mul(uint(668265263))).toVar();
  h.assign(h.bitXor(h.shiftRight(uint(13))).mul(uint(1274126177)));
  return float(h.bitXor(h.shiftRight(uint(16)))).div(4294967295.0);
});
const tnoise = Fn(([p]: [N]) => {
  const i: N = floor(p);
  const f0: N = fract(p);
  const f = f0.mul(f0).mul(f0.mul(-2.0).add(3.0));
  return mix(
    mix(thash(i), thash(i.add(vec2(1, 0))), f.x),
    mix(thash(i.add(vec2(0, 1))), thash(i.add(vec2(1, 1))), f.x),
    f.y
  );
});
/** сколько очагов лавы освещают рельеф одновременно */
export const GLOWS = 10;
/** сколько ударных волн башни бежит по земле одновременно (и меток-колец) */
export const WAVES = 4;
/** ширина вала и высота гребня, м */
export const WAVE_W = 16;
export const WAVE_H = 5.5;

export class Terrain {
  group = new THREE.Group();
  /** юниформы материала рельефа — время нужно тлению у лавы и следам */
  private matUniforms: UniformMap | null = null;

  setTime(t: number): void {
    if (this.matUniforms) this.matUniforms.uTime.value = t;
  }

  /**
   * ★ ПЯТНО ПРОЖЕКТОРА — ЭТО СВЕТ НА РЕЛЬЕФЕ, А НЕ ФИГУРА НА НЁМ. Диском из
   * геометрии его класть нельзя: шестнадцатиугольник виден углами, узлы то
   * проваливаются в склон, то висят над ним, и каждый кадр это стоило 65
   * вызовов сэмплера высоты. В шейдере рельефа пятно ложится точно по форме
   * земли и не стоит ничего.
   *
   * @param s яркость; 0 — пятна нет
   */
  setSpot(x: number, z: number, r: number, s: number): void {
    if (!this.matUniforms) return;
    (this.matUniforms.uSpot.value as THREE.Vector4).set(x, z, r, s);
  }

  /** очаги лавы, освещающие рельеф: [x, z, радиус, сила] × GLOWS */
  setGlows(arr: Float32Array): void {
    if (!this.matUniforms) return;
    const u = this.matUniforms.uGlow.array as THREE.Vector4[];
    for (let i = 0; i < GLOWS; i++) {
      u[i].set(arr[i * 4], arr[i * 4 + 1], Math.max(1, arr[i * 4 + 2]), arr[i * 4 + 3]);
    }
  }

  /** тени дирижаблей: [x, z, длина, сила] × SHIPS */
  setShips(arr: Float32Array): void {
    if (!this.matUniforms) return;
    const u = this.matUniforms.uShips.array as THREE.Vector4[];
    for (let i = 0; i < SHIPS; i++) u[i].set(arr[i * 4], arr[i * 4 + 1], Math.max(1, arr[i * 4 + 2]), arr[i * 4 + 3]);
  }

  /** вес полярной ночи у игрока — включает блёстки на снегу */
  setNight(k: number): void {
    if (this.matUniforms) this.matUniforms.uNight.value = k;
  }

  /** ударные волны башни: [x, z, радиус, сила] × WAVES */
  setWaves(arr: Float32Array): void {
    if (!this.matUniforms) return;
    const u = this.matUniforms.uWave.array as THREE.Vector4[];
    for (let i = 0; i < WAVES; i++) u[i].set(arr[i * 4], arr[i * 4 + 1], arr[i * 4 + 2], arr[i * 4 + 3]);
  }

  /** метки-кольца перед волнами: [x, z, радиус, сила] × WAVES */
  setMarks(arr: Float32Array): void {
    if (!this.matUniforms) return;
    const u = this.matUniforms.uMark.array as THREE.Vector4[];
    for (let i = 0; i < WAVES; i++) u[i].set(arr[i * 4], arr[i * 4 + 1], arr[i * 4 + 2], arr[i * 4 + 3]);
  }

  /** цвет пятна прожектора (янтарь при поиске, красный при захвате) */
  setSpotCol(r: number, g: number, b: number): void {
    if (!this.matUniforms) return;
    (this.matUniforms.uSpotCol.value as THREE.Color).setRGB(r, g, b);
  }

  /** направление от земли к оку — по нему свет ложится по закону косинуса */
  setSpotDir(x: number, y: number, z: number): void {
    if (!this.matUniforms) return;
    (this.matUniforms.uSpotDir.value as THREE.Vector3).set(x, y, z).normalize();
  }

  private chunks = new Map<string, THREE.Group>();
  /** скалы стримятся отдельно от чанков — см. CragField */
  private cragField = new THREE.Group();
  private cragBuilt = new Map<number, THREE.Object3D>();
  private archBuilt = new Map<number, THREE.Object3D>();
  private snowMat = (() => {
    const m = lambert({
      color: 0xffffff,
      flatShading: true,
      vertexColors: true, // снег/скала по крутизне грани
    });
    // ★ РАЗЛОМЫ СВЕТЯТСЯ САМИ. Через цвет вершины это не сделать: он
    // умножается на освещение, и в тени раскалённая щель погасла бы. Поэтому
    // отдельный вершинный атрибут aGlow и ДОБАВЛЕНИЕ цвета в самом конце
    // фрагмента — после света и после тумана (outputNode читает `output`,
    // который уже прошёл туман). Порог блума в пост-обработке 0.72, так что
    // яркая щель зажигается ореолом бесплатно.
    const uGlowCol = uniform(GLOW_COL);
    const uHazCol = uniform(HAZ_COL);
    const uTime = uniform(0);
    const uSpot = uniform(new THREE.Vector4(0, 0, 1, 0)); // xz — центр, z — радиус, w — яркость
    // ★ ВОРОНКИ И РЕЗ ЖИВУТ В КАРТЕ ПОВРЕЖДЕНИЙ (fx/damage.ts). По-настоящему
    // промять рельеф нельзя: высота задаётся формулой, по ней же строятся меши
    // чанков и считаются столкновения. Но след — это ПЯТНО и ПРОВАЛ, и оба
    // читаются из карты одной выборкой: в вершине — провал, в пикселе — чаша,
    // вал, стекло борозды и расплав. Никаких циклов по спискам и никаких
    // потолков на число следов.
    const uSpotCol = uniform(new THREE.Color(1.7, 0.30, 0.06));
    const uSpotDir = uniform(new THREE.Vector3(0, 1, 0)); // от земли к оку
    // очаги лавы: их свет ложится на рельеф здесь же, без настоящих ламп
    const uGlow = uniformArray(Array.from({ length: GLOWS }, () => new THREE.Vector4(0, 0, 1, 0)));
    // ★ УДАРНЫЕ ВОЛНЫ БАШНИ: (x, z, радиус, сила). Кольцо-вал бежит по земле —
    // это смещение вершин в positionNode и раскалённый гребень в outputNode.
    const uWave = uniformArray(Array.from({ length: WAVES }, () => new THREE.Vector4(0, 0, 0, 0)));
    // метки-кольца перед волной: (x, z, радиус, сила) — сужаются в точку удара
    const uMark = uniformArray(Array.from({ length: WAVES }, () => new THREE.Vector4(0, 0, 0, 0)));
    // ★ ПОЛЯРНАЯ НОЧЬ: снег искрится под луной (блёстки-звёздочки, мерцают)
    const uNight = uniform(0);
    // ★ ТЕНИ ДИРИЖАБЛЕЙ: эллипсы (x, z, длина, сила), вытянутые вдоль долины
    const uShips = uniformArray(Array.from({ length: SHIPS }, () => new THREE.Vector4(0, 0, 1, 0)));
    // DEV: 0 — обычный вывод, 1..6 — визуализация слагаемых трещин (cr, hot, heat, plate, rift, craze)
    this.matUniforms = { uGlowCol, uHazCol, uTime, uSpot, uSpotCol, uSpotDir, uGlow, uWave, uMark, uNight, uShips };

    const aGlow: N = attribute('aGlow', 'float');
    const aHazard: N = attribute('aHazard', 'float');

    // ★ ВОРОНКА ПРОДАВЛИВАЕТ САМУ ГЕОМЕТРИЮ. Одного пятна в пикселях мало: удар
    // должен оставлять форму. Пересобирать чанки нельзя, но вершины можно
    // сдвинуть прямо здесь — это бесплатно и работает на всех чанках сразу,
    // потому что смещение считается от МИРОВОЙ точки, а значит на стыках
    // сходится само. Чаша неглубокая: рельеф под доской остаётся прежним.
    // Чанки стоят без поворота и масштаба, поэтому local.y == world.y.
    // ★ Нормали здесь не трогаем: материал плоский (flatShading), и нормаль
    // грани считается из производных уже СМЕЩЁННОЙ позиции — склоны у чаши
    // и стенки у борозды получаются сами.
    m.positionNode = Fn(() => {
      const p = positionLocal.toVar();
      const wxz: N = modelWorldMatrix.mul(vec4(positionGeometry, 1.0)).xz;
      // ★ ВОРОНКА И БОРОЗДА ПРОДАВЛИВАЮТ САМУ ГЕОМЕТРИЮ. Смещение берётся из
      // карты по МИРОВОЙ точке — на стыках чанков сходится само. Чанки стоят
      // без поворота и масштаба, поэтому local.y == world.y. Нормали не трогаем:
      // материал плоский, нормаль грани считается из производных уже смещённой
      // позиции — склоны у чаши и стенки у борозды получаются сами.
      p.y.subAssign(damage.damageNode(wxz).dip);
      // вал ударной волны: гребень шириной WAVE_W, высотой WAVE_H·сила
      // ★ ГРЕБЕНЬ НЕРОВНЫЙ: по кольцу идут горбы и провалы (шум по углу и
      // радиусу), а за фронтом — второй, меньший вал. Ровное кольцо одной
      // высоты читалось плоской заливкой; рваный вал с «хвостом» видно как
      // движение самой земли.
      Loop({ start: 0, end: WAVES, type: 'int', condition: '<' }, ({ i }: { i: N }) => {
        const wv: N = uWave.element(i);
        If(wv.w.greaterThan(0.001), () => {
          const rel = wxz.sub(wv.xy);
          const d = length(rel);
          const ang = atan(rel.y, rel.x);
          const lumps = tnoise(vec2(ang.mul(2.2), wv.z.mul(0.08))).mul(0.9).add(
            tnoise(vec2(ang.mul(5.0).add(7.0), d.mul(0.2))).mul(0.5)
          );
          // фронт крутой (треть ширины), спад назад пологий — стена, а не холм
          const dd = d.sub(wv.z);
          const q = dd.abs().div(select(dd.greaterThan(0.0), WAVE_W * 0.3, WAVE_W * 0.7)).min(1.0);
          const bump = q.mul(q).oneMinus();
          const q2 = d.sub(wv.z.sub(WAVE_W * 1.1)).abs().div(WAVE_W * 0.4).min(1.0);
          const tail = q2.mul(q2).oneMinus();
          p.y.addAssign(
            bump.mul(bump).mul(WAVE_H).mul(lumps.mul(0.7).add(0.45))
              .add(tail.mul(tail).mul(WAVE_H * 0.35))
              .mul(wv.w)
          );
        });
      });
      return p;
    })();

    m.outputNode = Fn(() => {
      const col: N = output.rgb.toVar();
      const vWPos: N = positionWorld;
      const w: N = vWPos.xz;
      const nrm: N = normalView;
      const vGlow: N = aGlow;
      const vHaz: N = aHazard;

      // ★ УЗОР ПРОЕЦИРУЕТСЯ СВЕРХУ, ПОЭТОМУ НА СТЕНАХ ЕГО НЕТ. Вся сетка трещин
      // считается от мировых XZ — то есть накладывается на склон как вид сверху.
      // На стенке ущелья та же проекция растягивает ячейки в длинные полосы, и
      // вместо корки выходит паутина поперёк обрыва. Гасим по крутизне: круче
      // ~70° рисунка нет вовсе.
      const vv: N = vGlow.mul(clamp(abs(nrm.y).sub(0.35).div(0.35), 0.0, 1.0));
      If(vv.greaterThan(0.004), () => {
        // зерно клинкера
        const grit = tnoise(w.mul(1.7)).mul(0.6).add(tnoise(w.mul(5.3)).mul(0.4));
        col.mulAssign(grit.sub(0.5).mul(0.34).mul(vv).add(1.0));

        // пузырьковые оспины: поверхность вспученная, а не гладкая
        const ves = smoothstep(0.74, 0.95, tnoise(w.mul(4.4).add(5.0)));
        col.mulAssign(ves.mul(0.22).mul(vv).oneMinus());
        // прокалённая земля у опасного места тлеет — видно и в тени
        If(vHaz.greaterThan(0.004), () => {
          const emb = tnoise(w.mul(0.6).add(13.0)).mul(0.6).add(tnoise(w.mul(2.2)).mul(0.4));
          const pulse = sin(uTime.mul(1.1).add(emb.mul(9.0))).mul(0.2).add(0.8);
          // прокал тлеет глуше: тёмно-красная кайма, а не оранжевая заливка
          col.addAssign(uHazCol.mul(vHaz).mul(vHaz).mul(emb.mul(0.16).add(0.04)).mul(pulse));
        });
      });

      // следы ударов и реза — из карты повреждений, одна выборка
      const dmg = damage.damageNode(w);
      // воронки от снарядов: чаша к центру темнее и глаже, вал по кромке
      // светлее породы. ★ СЛЕД, А НЕ ДЫРА: отметина должна читаться следом
      // удара, а не новым биомом. Свежая воронка ещё дышит жаром по трещинам дна.
      If(dmg.cw.greaterThan(0.001).and(dmg.cd.lessThanEqual(1.25)), () => {
        const cw = dmg.cw;
        const cd = dmg.cd;
        const bowl = smoothstep(0.0, 0.95, cd).oneMinus();
        const lip = smoothstep(0.82, 0.98, cd).mul(smoothstep(0.98, 1.22, cd).oneMinus());
        col.mulAssign(bowl.mul(0.3).mul(cw).oneMinus());
        col.mulAssign(lip.mul(0.28).mul(cw).add(1.0));
        const ember = tnoise(w.mul(1.4).add(3.0));
        col.addAssign(
          vec3(1.4, 0.36, 0.05).mul(bowl).mul(cw).mul(cw).mul(0.4)
            .mul(smoothstep(0.7, 0.98, ember))
            .mul(sin(uTime.mul(2.0).add(ember.mul(8.0))).mul(0.5).add(0.5))
        );
      });
      // ★ РЕЗ ЛУЧА: СНАЧАЛА РАСПЛАВ, ПОТОМ ЧЁРНОЕ СТЕКЛО. Возраст точки борозды
      // хранится в карте, поэтому остывание видно КАК ГРАДИЕНТ вдоль полосы: у
      // рабочего конца бело-жёлтый расплав, у дальнего — тёмный базальт. По
      // этому градиенту игрок и читает, где полосу можно пересечь.
      If(dmg.lw.greaterThan(0.001), () => {
        col.assign(mix(col, vec3(0.05, 0.038, 0.042), dmg.lw.mul(0.92)));
        // к оси борозды расплав белее — там он глубже и не успел схватиться
        const hotL = mix(vec3(1.6, 0.3, 0.03), vec3(3.2, 1.7, 0.55), dmg.lk.mul(dmg.lk));
        col.addAssign(hotL.mul(dmg.lm).mul(sin(uTime.mul(5.0).add(vWPos.z.mul(0.4))).mul(0.28).add(0.72)));
      });

      // ★ СВЕТ ОТ ЛАВЫ. Каждый очаг светит по закону обратного квадрата
      // (смягчённо) и по закону косинуса — грань, отвёрнутая от расплава,
      // остаётся тёмной. ★ ПОТОЛОК ОБЯЗАТЕЛЕН: десять очагов складываются, и без
      // предела сцена превращается в оранжевый лист. Подсветка — акцент у
      // самого расплава, а не освещение.
      {
        const lit = vec3(0.0).toVar();
        Loop({ start: 0, end: GLOWS, type: 'int', condition: '<' }, ({ i }: { i: N }) => {
          const g: N = uGlow.element(i);
          const gs = g.w;
          If(gs.greaterThan(0.002), () => {
            const d = vec3(g.x.sub(vWPos.x), 6.0, g.y.sub(vWPos.z));
            const dist = length(d);
            const att = gs.div(dist.mul(dist).div(g.z.mul(g.z)).add(1.0));
            // ★ КАК В GLSL-ВЕРСИИ: нормаль здесь в пространстве вида, а смещение к
            // очагу — мировое. Смешение пространств досталось от WebGL-шейдера, и
            // картинка настроена под него; «честный» перевод в вид делал подсветку
            // заметно сильнее и уводил от эталона.
            lit.addAssign(vec3(1.0, 0.20, 0.045).mul(att).mul(max(0.0, dot(nrm, d.div(dist))).mul(0.75).add(0.25)));
          });
        });
        // ★ ПОТОЛОК НИЖЕ ВТРОЕ. С озёрами через каждые сто метров прежний
        // потолок (0.05 линейного = 0.26 после гаммы) лежал ровным бурым слоем
        // на всём склоне — вот откуда была «пустыня» при чёрном альбедо.
        col.addAssign(min(lit.mul(0.09), vec3(0.018, 0.0035, 0.0012)));
      }

      // гребень ударной волны раскалён: тонкая светящаяся линия по фронту
      Loop({ start: 0, end: WAVES, type: 'int', condition: '<' }, ({ i }: { i: N }) => {
        const wv: N = uWave.element(i);
        If(wv.w.greaterThan(0.001), () => {
          const d = length(w.sub(wv.xy));
          const q = d.sub(wv.z).abs().div(WAVE_W * 0.5).min(1.0);
          const crest = q.mul(q).oneMinus();
          // и пыль/пепел, сдутый с гребня, — светлее породы
          col.addAssign(vec3(1.6, 0.45, 0.10).mul(crest.mul(crest).mul(crest)).mul(wv.w).mul(0.9));
          col.mulAssign(crest.mul(0.35).mul(wv.w).add(1.0));
        });
      });

      // метка удара: тонкое красное кольцо, сужающееся в точку; в центре —
      // тлеющая точка, чтобы место читалось и когда кольцо уже мало
      Loop({ start: 0, end: WAVES, type: 'int', condition: '<' }, ({ i }: { i: N }) => {
        const mk: N = uMark.element(i);
        If(mk.w.greaterThan(0.001), () => {
          const d = length(w.sub(mk.xy));
          // кольцо широкое (4 м) и яркое — его надо видеть за сотню метров на
          // тёмной земле; внутри — слабая заливка, чтобы читалась «область»
          const ring = smoothstep(4.0, 0.5, d.sub(mk.z).abs());
          const inner = smoothstep(mk.z, mk.z.mul(0.2), d).mul(0.12);
          const dotc = smoothstep(4.0, 0.0, d).mul(0.9);
          const pulse = sin(uTime.mul(12.0)).mul(0.25).add(0.75);
          col.addAssign(vec3(2.4, 0.22, 0.05).mul(ring.add(inner).add(dotc)).mul(mk.w).mul(pulse));
        });
      });

      // луч Ока: мягкое пятно поверх всего, включая тень и туман
      If(uSpot.w.greaterThan(0.001), () => {
        const sd = length(w.sub(uSpot.xy)).div(uSpot.z);
        // ★ ПЯТНО РОВНОЕ, А ГАСНЕТ ТОЛЬКО КРАЙ; ★ КРОМКА КОРОТКАЯ: граница есть,
        // а линии нет.
        const f = smoothstep(0.62, 1.0, sd).oneMinus().toVar();
        // свет живой: медленное дыхание не даёт пятну слиться с фоном
        f.mulAssign(sin(uTime.mul(2.1)).mul(0.1).add(0.9));
        // ★ СВЕТ ПАДАЕТ ПОД УГЛОМ: закон косинуса, но не до полной тени.
        // (то же смешение пространств, что и у очагов — оставлено ради эталона)
        f.mulAssign(max(0.0, dot(nrm, uSpotDir)).mul(0.75).add(0.25));
        // ★ СВЕТ ПОДСВЕЧИВАЕТ, А НЕ ПЕРЕКРАШИВАЕТ: умножение сохраняет породу и
        // меняет только яркость. ★ И ПРОЖЕКТОР НЕ ВЫЖИГАЕТ: полутора хватает.
        // ★ НА СНЕГУ ПРОЖЕКТОР НЕ ВЫЖИГАЕТ. Умножение ×2.5 подобрано под тёмный
        // пепел; на снегу с альбедо ~0.9 оно уводило всю трассу в белый лист.
        // Усиливаем тем меньше, чем светлее сама земля — тёмное подсвечивается,
        // светлое лишь чуть теплеет.
        const lum = dot(col, vec3(0.3, 0.6, 0.1));
        const boost = smoothstep(0.55, 0.18, lum);
        col.mulAssign(uSpot.w.mul(f).mul(1.5).mul(boost).add(1.0));
        // ★ ЯДРО СВЕТА БЕЛЕЕ КАЙМЫ — так это читается светом, а не краской
        const sc = mix(uSpotCol, vec3(1.1, 0.62, 0.32), f.mul(f));
        col.addAssign(sc.mul(uSpot.w).mul(f).mul(0.09));
      });

      // ★★ КОНТУР В ТЕМНОТЕ. Форму держит КРОМКА: грань, повёрнутая от взгляда,
      // ловит скользящий свет и очерчивает силуэт. ★ КРОМКА, А НЕ ЗАЛИВКА:
      // четвёртая степень оставляет свечение только у самого силуэта.
      {
        const vd = normalize(positionView.negate());
        const rim = pow(clamp(dot(nrm, vd), 0.0, 1.0).oneMinus(), 4.0);
        col.addAssign(vec3(0.85, 0.30, 0.10).mul(rim).mul(0.04));

        // ★★ СТЕНА — НЕ ДЫРА. Чернота липнет к ущельям с РЕЗКИМИ бортами:
        // вертикальная грань отвёрнута от солнца, а от полусферы берёт ровно
        // половину. В ущелье так не бывает — борт всегда ловит отсвет
        // противоположной стены. Его и добавляем цветом самой породы.
        // ★ НЕ ПЕРЕСВЕЧИВАТЬ: 0.62 на светлой породе (обрывы у границы биомов,
        // базальт 0.30) давал ровные кремовые стены — читались засветкой, а не
        // камнем. Заполнение оставляем, но вдвое слабее.
        const wall = smoothstep(0.55, 0.05, abs(nrm.y));
        col.addAssign(diffuseColor.rgb.mul(wall).mul(0.3));
      }
      // ★ ТЕНИ ДИРИЖАБЛЕЙ на склоне: мягкий эллипс, вытянутый вдоль долины
      Loop({ start: 0, end: SHIPS, type: 'int', condition: '<' }, ({ i }: { i: N }) => {
        const sh: N = uShips.element(i);
        If(sh.w.greaterThan(0.001), () => {
          const dx = w.x.sub(sh.x).div(sh.z.mul(0.2));
          const dz = w.y.sub(sh.y).div(sh.z.mul(0.55));
          const e = dx.mul(dx).add(dz.mul(dz));
          const k = smoothstep(1.0, 0.55, e).mul(sh.w);
          col.mulAssign(k.oneMinus());
        });
      });

      // ★ БЛЁСТКИ НА СНЕГУ ПОЛЯРНОЙ НОЧЬЮ: редкие ячейки вспыхивают и гаснут —
      // без них ночной снег читался ровной серой заливкой
      If(uNight.greaterThan(0.01), () => {
        const cell = floor(w.mul(1.5));
        const h = thash(cell);
        const h2 = thash(cell.add(vec2(31.0, 7.0)));
        const tw = sin(uTime.mul(h2.mul(5.0).add(3.0)).add(h2.mul(60.0))).mul(0.5).add(0.5);
        const sp = smoothstep(0.991, 1.0, h).mul(tw.mul(tw).mul(tw)).mul(clamp(nrm.y, 0.0, 1.0));
        col.addAssign(vec3(0.75, 0.85, 1.05).mul(sp).mul(uNight).mul(1.4).mul(vGlow.oneMinus()));
      });
      return vec4(col, output.a);
    })();
    return m;
  })();
  // цвет дерева живёт в вершинах геометрии; материал биома лишь притеняет
  private pineMat = lambert({
    color: PALETTE.pine,
    flatShading: true,
    vertexColors: true,
  });
  private rockMat = lambert({ color: 0x8a92a8, flatShading: true });
  private flagMat = lambert({ color: 0xff7a3c, flatShading: true });
  private railMat = lambert({ color: 0x2b303f, flatShading: true });
  private pineGeos = TREE_SPECIES.map((_, v) => buildPine(v));
  private rockGeos = [0, 1, 2, 3].map((v) => buildRockGeometry(v));
  private cragGeos = [0, 1, 2, 3].map((v) => buildCragGeometry(v));
  // Скала темнее валунов: она выше уровня снега и не запорошена, а на её
  // полках лежит снег отдельными шапками (см. cragSnowMat).
  // цвет живёт в ВЕРШИНАХ (см. buildCragGeometry), материал только светит
  // ★★ СКАЛЫ — ЭТО И БЫЛИ «ЧЁРНЫЕ СТЕНЫ». У них своя материя, и её не касалось
  // НИЧТО из того, чем мы лечили рельеф: ни тон биома (материал белый, цвет
  // живёт в вершинах и он нейтрально-серый), ни заполнение крутых граней,
  // добавленное в шейдер земли. А скала — это как раз сплошная вертикаль:
  // солнца на ней нет, полусфера даёт половину, и в кадре она стоит чёрной
  // глыбой рядом с яркой лавой. Даём ей то же заполнение, что и рельефу.
  private cragMat = (() => {
    const m = lambert({
      color: 0xffffff, flatShading: true, vertexColors: true,
    });
    // ★ ЗАПОЛНЕНИЕ УМНОЖЕНИЕМ, А НЕ ДОБАВКОЙ. Добавка в 0.62 выбелила скалу
    // целиком: у неё почти вся поверхность вертикальна, и слагаемое легло
    // ровным слоем поверх всего. Множитель осветляет ПРОПОРЦИОНАЛЬНО — тёмная
    // порода остаётся породой.
    m.outputNode = Fn(() => {
      const wall = smoothstep(0.55, 0.05, abs(normalView.y));
      return vec4(output.rgb.mul(wall.mul(0.85).add(1.0)), output.a);
    })();
    return m;
  })();
  private cragSnowGeos = this.cragGeos.map((g) => buildCragSnowGeometry(g));
  private archGeos = [0, 1, 2].map((v) => buildArchGeometry(v));
  private cragSnowMat = lambert({
    color: 0xdfe6f5, flatShading: true,
  });
  private flagGeo = buildFlagGeometry();

  // деревня: три варианта окраски домов
  // после ужесточения света старые тона (0x3d3745/0x4b4034/0x35424d) ушли
  // в чёрные коробки — подняты в яркости, сохранив холодный характер
  private houseMats = [0x6b6274, 0x7c6a56, 0x5c6f7d].map(
    (c) => lambert({ color: c, flatShading: true })
  );
  private roofMats = [0x413b56, 0x5a4038, 0x36505c].map(
    (c) =>
      lambert({ color: c, flatShading: true, side: THREE.DoubleSide })
  );
  private windowMat = basic({ color: 0xffc873 }); // светятся сами
  private lampGlowMat = basic({ color: 0xffd9a0 });
  private houseGeo = new THREE.BoxGeometry(4.6, 2.4, 3.6);
  private roofGeo = buildRoofGeometry();
  private windowGeo = new THREE.PlaneGeometry(0.7, 0.9);
  // Детали дома. Снег на крыше и труба стоят копейки, а деревня без них
  // выглядит набором коробок, случайно оказавшихся в снегу.
  private snowCapGeo = buildRoofGeometry();
  private roofSnowMat = lambert({
    color: 0xe9eefb, flatShading: true, side: THREE.DoubleSide,
  });
  private chimneyGeo = new THREE.BoxGeometry(0.42, 1.0, 0.42);
  private balconyGeo = new THREE.BoxGeometry(4.9, 0.12, 1.15);
  private railGeo = new THREE.BoxGeometry(4.9, 0.5, 0.1);
  private doorGeo = new THREE.PlaneGeometry(0.75, 1.35);
  private doorMat = lambert({ color: 0x4a3a2c, flatShading: true });
  private woodMat = lambert({ color: 0x6b543c, flatShading: true });
  private poleGeo = new THREE.CylinderGeometry(0.09, 0.09, 2.4, 4);
  private poleTopGeo = new THREE.BoxGeometry(0.42, 0.42, 0.42);
  private poleLeftMat = basic({ color: 0x2f6fd0 });
  private poleRightMat = basic({ color: 0xd83c3c });
  // общественные постройки: вывеска, козырёк лавки, звонница часовни
  private signGeo = new THREE.BoxGeometry(2.2, 0.5, 0.12);
  private signMat = basic({ color: 0xffd08a });
  private awningGeo = new THREE.BoxGeometry(4.4, 0.1, 1.5);
  private awningMat = lambert({ color: 0x8c4a3f, flatShading: true });
  private shopWinGeo = new THREE.PlaneGeometry(2.4, 1.1);
  private belfryGeo = new THREE.BoxGeometry(0.9, 1.1, 0.9);
  private spireGeo = new THREE.ConeGeometry(0.75, 1.6, 4);
  // ★ ПАРОВОЙ ГОРОД: кирпич цехов, железо крыш, топки в окнах, трубы, бак башни
  private brickMat = lambert({ color: 0x6a4a3e, flatShading: true });
  private ironRoofMat = lambert({ color: 0x4a4b52, flatShading: true, side: THREE.DoubleSide });
  private furnaceWinMat = basic({ color: 0xffa040 });
  private stackGeo = new THREE.CylinderGeometry(0.42, 0.55, 1.0, 6);
  private stackMat = lambert({ color: 0x3e3230, flatShading: true });
  private tankGeo = new THREE.CylinderGeometry(1.0, 1.0, 1.0, 10);
  private tankMat = lambert({ color: 0x5c4634, flatShading: true });
  private legGeo = new THREE.BoxGeometry(0.16, 1.0, 0.16);
  private coneGeo = new THREE.ConeGeometry(1.15, 0.7, 10);
  /** ★ трубы цехов, из которых идёт пар: мировые координаты верха, по чанкам */
  private stacks = new Map<THREE.Group, Array<{ x: number; y: number; z: number; r: number }>>();
  private lampPoleGeo = new THREE.CylinderGeometry(0.06, 0.09, 3.1, 5);
  private lampGlowGeo = new THREE.SphereGeometry(0.24, 8, 6);

  private sharedGeos = new Set<THREE.BufferGeometry>([
    ...this.pineGeos,
    ...this.rockGeos,
    ...this.cragGeos,
    ...(this.cragSnowGeos.filter(Boolean) as THREE.BufferGeometry[]),
    ...this.archGeos,
    this.flagGeo,
    this.houseGeo,
    this.roofGeo,
    this.windowGeo,
    this.signGeo,
    this.awningGeo,
    this.shopWinGeo,
    this.belfryGeo,
    this.spireGeo,
    this.lampPoleGeo,
    this.lampGlowGeo,
    this.poleGeo,
    this.poleTopGeo,
  ]);
  private firstBuild = true;
  private cragFieldAdded = (this.group.add(this.cragField), true);

  /** для менеджера биомов: тонировка снега и деревьев */
  get snowMaterial(): THREE.MeshLambertNodeMaterial {
    return this.snowMat;
  }
  get pineMaterial(): THREE.MeshLambertNodeMaterial {
    return this.pineMat;
  }

  update(px: number, pz: number): void {
    this.updateCrags(pz);
    const ccx = Math.round(toValleyU(px, pz) / CHUNK);
    const ccz = Math.round(pz / CHUNK);
    const needed = new Set<string>();
    const missing: Array<[number, number, number]> = [];

    for (let dz = -RANGE_Z_BACK; dz <= RANGE_Z_AHEAD; dz++) {
      for (let dx = -RANGE_X; dx <= RANGE_X; dx++) {
        const cx = ccx + dx;
        const cz = ccz + dz;
        const key = cx + ',' + cz;
        needed.add(key);
        if (!this.chunks.has(key)) {
          missing.push([cx, cz, dx * dx + dz * dz]);
        }
      }
    }

    missing.sort((a, b) => a[2] - b[2]);
    if (this.firstBuild) {
      // первый кадр всё равно ждём — до него игроку нечего показывать
      for (const [cx, cz] of missing) this.buildChunk(cx, cz);
      this.firstBuild = false;
    } else {
      // ★ ЧАНК СТРОИТСЯ ПО ЧАСТЯМ. Замер: одна вершина рельефа стоит 9 мкс, в
      // чанке их 1681 — то есть постройка целиком не помещается в кадр ни при
      // каком бюджете «чанков за кадр», и любой новый чанк был рывком.
      // Теперь работа режется по времени: за кадр берём кусок и продолжаем в
      // следующем, пока чанк не готов.
      for (const [cx, cz] of missing) {
        const key = cx + ',' + cz;
        if (!this.queued.has(key)) {
          this.queued.add(key);
          this.queue.push([cx, cz]);
        }
      }
      this.stepBuild(needed);
    }

    for (const [key, chunk] of this.chunks) {
      if (!needed.has(key)) {
        this.disposeChunk(chunk);
        this.chunks.delete(key);
      }
    }
  }

  private queue: Array<[number, number]> = [];
  private queued = new Set<string>();
  private job: {
    cx: number;
    cz: number;
    stage: number;
    i: number;
    geo: THREE.BufferGeometry | null;
    flat: THREE.BufferGeometry | null;
    ctrlA: Float32Array | null;
    ctrlB: Float32Array | null;
    lattice: Uint32Array | null;
  } | null = null;

  /** размер развёрнутой сетки чанка и решётки — под них собрано compute-ядро раскраски */
  static readonly VERTS_PER_CHUNK = SEG * SEG * 6;
  static readonly LATTICE_PER_CHUNK = (SEG + 1) * (SEG + 1);
  /** ★ раскраска чанка идёт на GPU (см. chunkshade.ts); ставится игрой до первого update */
  private shader: ChunkShader | null = null;
  setShader(sh: ChunkShader): void {
    this.shader = sh;
  }

  /**
   * Управляющие величины узла решётки для GPU-раскраски: те части цвета,
   * которые считаются по сплайнам и спискам мира (трасса, тип поверхности,
   * дорога деревни, вес биома). Дёшево — доли микросекунды на узел.
   */
  private latticeCtrl(u: number, v: number, village: Village | null, ctrlA: Float32Array, ctrlB: Float32Array, i: number): void {
    ctrlA[i * 4] = u;
    ctrlA[i * 4 + 1] = v;
    ctrlA[i * 4 + 2] = pisteAt(u, v).t;
    ctrlA[i * 4 + 3] = surfaceKindAt(u, v);
    let roadW = 0;
    if (village) {
      const rc = roadClosest(village, u, v);
      if (rc.d2 < 7 * 7) roadW = 1 - Math.max(0, Math.min(1, (Math.sqrt(rc.d2) - 3.2) / 3.5));
    }
    ctrlB[i * 4] = roadW;
    ctrlB[i * 4 + 1] = volcanoWeight(v);
    ctrlB[i * 4 + 2] = 0;
    ctrlB[i * 4 + 3] = 0;
  }

  /** развернуть сетку и раскрасить её на GPU; возвращает готовую геометрию */
  private shadeChunk(geo: THREE.BufferGeometry, ctrlA: Float32Array, ctrlB: Float32Array, ox: number, oz: number): THREE.BufferGeometry {
    const index = geo.index!.array;
    const flat = flatten(geo);
    geo.dispose();
    const posArr = flat.attributes.position.array as Float32Array;
    const n = posArr.length / 3;
    const lattice = new Uint32Array(n);
    for (let i = 0; i < n; i++) lattice[i] = index[i];
    // нормалей у чанка нет: материал плоский, нормаль грани считается из
    // производных в шейдере, а для раскраски её берёт само compute-ядро
    flat.deleteAttribute('normal');
    const half = CHUNK / 2;
    const lists = hazardListsFor(ox - half, ox + half, oz - half, oz + half, terrainHeight, toWorldX);
    const out = this.shader!.shade({ positions: posArr, lattice, ctrlA, ctrlB, lists });
    flat.setAttribute('position', out.position);
    flat.setAttribute('color', out.color);
    flat.setAttribute('aGlow', out.glow);
    flat.setAttribute('aHazard', out.hot);
    return flat;
  }

  /** Бюджет на кадр: столько миллисекунд разрешено тратить на постройку */
  /**
   * ★ БЮДЖЕТ СБОРКИ НА КАДР. Чанк стоит около 12 мс работы, поэтому при 3 мс он
   * доезжает за четыре кадра, и на скорости мир виден догоняющим. Кадр в самом
   * тяжёлом биоме идёт ~6 мс из 16.7, так что запас есть — берём 6 мс: чанк
   * успевает за два кадра, а до потолка всё равно остаётся вдвое.
   */
  private static readonly BUILD_MS = 6;

  /** Один кадр работы над очередью чанков */
  private stepBuild(needed: Set<string>): void {
    const t0 = performance.now();
    while (performance.now() - t0 < Terrain.BUILD_MS) {
      if (!this.job) {
        let next: [number, number] | undefined;
        while ((next = this.queue.shift())) {
          const key = next[0] + ',' + next[1];
          // ★ КЛЮЧ СНИМАЕТСЯ ТОЛЬКО ПО ОКОНЧАНИИ. Пока чанк строится, его нет
          // ни в this.chunks, ни в очереди — и он ставился в очередь заново
          // каждый кадр. Замер: медиана кадра выросла с 0.8 до 5.1 мс, потому
          // что один и тот же чанк строился бесконечно.
          if (needed.has(key) && !this.chunks.has(key)) break;
          this.queued.delete(key);
          next = undefined;
        }
        if (!next) return;
        this.job = {
          cx: next[0],
          cz: next[1],
          stage: 0,
          i: 0,
          geo: null,
          flat: null,
          ctrlA: null,
          ctrlB: null,
          lattice: null,
        };
      }
      if (this.stepJob()) this.job = null;
    }
  }

  /**
   * Кусок работы над текущим чанком. Возвращает true, когда чанк готов.
   * Этапы намеренно разной длины: тяжёлые циклы режутся на порции, а короткие
   * шаги (нормали, декор) делаются целиком — дробить их дороже, чем выполнить.
   */
  private stepJob(): boolean {
    const j = this.job!;
    const ox = j.cx * CHUNK;
    const oz = j.cz * CHUNK;
    const wx0 = toWorldX(ox, oz);
    const SLICE = 260;

    if (j.stage === 0) {
      const geo = new THREE.PlaneGeometry(CHUNK, CHUNK, SEG, SEG);
      geo.rotateX(-Math.PI / 2);
      j.geo = geo;
      j.ctrlA = new Float32Array(geo.attributes.position.count * 4);
      j.ctrlB = new Float32Array(geo.attributes.position.count * 4);
      j.stage = 1;
      j.i = 0;
      return false;
    }
    if (j.stage === 1) {
      const pos = j.geo!.attributes.position;
      const village = villageAt(ox, oz);
      const end = Math.min(pos.count, j.i + SLICE);
      for (let i = j.i; i < end; i++) {
        const u = ox + pos.getX(i);
        const v = oz + pos.getZ(i);
        pos.setY(i, terrainAtValley(u, v));
        pos.setX(i, toWorldX(u, v) - wx0);
        this.latticeCtrl(u, v, village, j.ctrlA!, j.ctrlB!, i);
      }
      j.i = end;
      if (end >= pos.count) {
        j.stage = 2;
        j.i = 0;
      }
      return false;
    }
    // 2: развёртка + GPU-раскраска, доводка — меш, декор, регистрация.
    // ★ Раньше здесь были ещё два этапа: развёртка с нормалями (2 мс) и цикл
    // раскраски по 9600 вершинам (70 мс на чанк, резался на порции по 260).
    // Теперь цвет считает compute-ядро — этап схлопнулся в один вызов.
    const flat = this.shadeChunk(j.geo!, j.ctrlA!, j.ctrlB!, ox, oz);
    j.geo = null;
    const chunk = new THREE.Group();
    chunk.add(new THREE.Mesh(flat, this.snowMat));
    this.finishChunk(j.cx, j.cz, chunk, ox, oz, wx0);
    this.queued.delete(j.cx + ',' + j.cz);
    return true;
  }

  private buildChunk(cx: number, cz: number): void {
    // ox, oz — центр чанка в координатах долины; wx0 — его мировой X
    const ox = cx * CHUNK;
    const oz = cz * CHUNK;
    const wx0 = toWorldX(ox, oz);
    const chunk = new THREE.Group();

    const geo = new THREE.PlaneGeometry(CHUNK, CHUNK, SEG, SEG);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const ctrlA = new Float32Array(pos.count * 4);
    const ctrlB = new Float32Array(pos.count * 4);
    const village = villageAt(ox, oz);
    for (let i = 0; i < pos.count; i++) {
      const u = ox + pos.getX(i);
      const v = oz + pos.getZ(i);
      pos.setY(i, terrainAtValley(u, v));
      pos.setX(i, toWorldX(u, v) - wx0); // изгиб долины запечён в геометрию
      this.latticeCtrl(u, v, village, ctrlA, ctrlB, i);
    }
    const flat = this.shadeChunk(geo, ctrlA, ctrlB, ox, oz);
    chunk.add(new THREE.Mesh(flat, this.snowMat));
    this.finishChunk(cx, cz, chunk, ox, oz, wx0);
  }

  /** Всё, что стоит НА рельефе: деревья, камни, дома, флаги */
  private finishChunk(
    cx: number,
    cz: number,
    chunk: THREE.Group,
    ox: number,
    oz: number,
    wx0: number
  ): void {
    // деревья и камни — из общего с физикой реестра (локальные координаты чанка)
    const obstacles = obstaclesInChunk(cx, cz);
    const trees = obstacles.filter((o) => o.kind === 'tree');
    const rocks = obstacles.filter((o) => o.kind === 'rock');
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const qLay = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const sideAxis = new THREE.Vector3(1, 0, 0);
    const s = new THREE.Vector3();
    const p = new THREE.Vector3();

    // деревья: своя пачка инстансов на каждую породу, цвет хвои — свой у
    // каждого дерева (иначе лес сливается в одно пятно)
    for (let v = 0; v < this.pineGeos.length; v++) {
      const group = trees.filter((t) => (t.variant ?? 0) === v);
      if (group.length === 0) continue;
      const mesh = new THREE.InstancedMesh(this.pineGeos[v], this.pineMat, group.length);
      group.forEach((t, i) => {
        q.setFromAxisAngle(up, hash01(t.x, t.z) * Math.PI * 2);
        s.set(t.scale, t.scale * (t.hMul ?? 1), t.scale);
        p.set(t.x - wx0, terrainHeight(t.x, t.z) + 0.05, t.z - oz);
        m.compose(p, q, s);
        mesh.setMatrixAt(i, m);
        const k = t.tint ?? 1;
        // холоднее у тёмных, теплее у светлых — лес перестаёт быть плоским
        mesh.setColorAt(i, TREE_TINT.setRGB(k * 0.92, k, k * 0.86));
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      chunk.add(mesh);
    }

    // камни — по одному инстансу на форму, чтобы валуны были разные
    for (let v = 0; v < this.rockGeos.length; v++) {
      const group = rocks.filter((r) => (r.variant ?? 0) === v);
      if (group.length === 0) continue;
      const mesh = new THREE.InstancedMesh(this.rockGeos[v], this.rockMat, group.length);
      group.forEach((r, i) => {
        // поворот и растяжение берём ИЗ ОПИСАНИЯ камня — те же, что меряет
        // физика (см. rockRadiusToward)
        q.setFromAxisAngle(up, r.rot ?? 0);
        const hm = r.hMul ?? 0.7;
        const zm = r.zMul ?? 1;
        // ЛЕЖАЧИЙ ВАЛУН: заваливаем вокруг собственной оси X уже ПОСЛЕ разворота
        // по азимуту, поэтому вверх у него смотрит бывшая ось Z — ровно так же
        // это считает физика (см. rockRadiusToward и topY).
        if (r.lay) q.multiply(qLay.setFromAxisAngle(sideAxis, r.lay));
        s.set(r.scale, r.scale * hm, r.scale * zm);
        // глыбы утоплены в снег — из сугроба торчит только верх
        const sink = r.scale * (r.lay ? zm : hm) * 0.22;
        p.set(r.x - wx0, terrainHeight(r.x, r.z) - sink, r.z - oz);
        m.compose(p, q, s);
        mesh.setMatrixAt(i, m);
        mesh.setColorAt(i, rockTintFor(r.z, r.tint ?? 1, TREE_TINT));
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      chunk.add(mesh);
    }

    // СКАЛЫ — по одной пачке инстансов на форму, плюс снежная полка сверху
    // СКАЛЫ ЗДЕСЬ НЕ РИСУЮТСЯ. Они живут в CragField со своей дальностью:
    // привязка к чанку давала им дальность прорисовки в двести метров при
    // собственной высоте до трёхсот — ориентир такого размера возникал прямо
    // перед носом. В список препятствий скала по-прежнему попадает через свой
    // чанк: физике дальний радиус не нужен, ей нужен ТОТ ЖЕ чанк.

    // деревня: дома вдоль дороги (варианты окраски и размеров) и фонари
    const village = villageAt(ox, oz);
    if (village) {
      const bMinX = ox - CHUNK / 2;
      const bMaxX = ox + CHUNK / 2;
      const bMinZ = oz - CHUNK / 2;
      const bMaxZ = oz + CHUNK / 2;
      const vPads = villageHeights(village).pads;
      for (let hi = 0; hi < village.houses.length; hi++) {
        const h = village.houses[hi];
        if (!(h.x >= bMinX && h.x < bMaxX && h.z >= bMinZ && h.z < bMaxZ)) continue;
        // ★ ДОМ СТОИТ НА СВОЕЙ ПЛОЩАДКЕ, А НЕ НА ТЕКУЩЕМ РЕЛЬЕФЕ. Для обычного
        // дома это одно и то же (рельеф под ним выровняли по ней же), а
        // вкопанный дом рельеф НЕ трогает — и брать высоту из земли значило бы
        // поднять его обратно на поверхность.
        const gy = vPads[hi] - 0.15;
        const house = new THREE.Group();
        // ★ ГАБАРИТЫ БЕРУТСЯ ИЗ ОПИСАНИЯ ДОМА, а не считаются здесь заново:
        // по крышам ездят, и физика меряет ровно эти числа (см. HOUSE_GEOM).
        const kind = h.kind;
        const bodyH = h.bodyH;
        const wide = h.wide;
        const deep = h.deep;

        // ★ ЮБКА ПОД ВКОПАННЫМ ДОМОМ. Нагорный карниз сидит вровень с землёй,
        // а низовой угол на уклоне 0.6 висел бы в воздухе на несколько метров.
        // Стена продолжается вниз до самой низкой точки под домом.
        const R0 = houseRoof(h);
        let skirt = 0;
        if (h.sunk) {
          for (const [sx, sz] of [
            [R0.hw, R0.hd], [-R0.hw, R0.hd], [R0.hw, -R0.hd], [-R0.hw, -R0.hd],
          ] as Array<[number, number]>) {
            const c = Math.cos(h.rot);
            const sn = Math.sin(h.rot);
            const gx = h.x + sx * c + sz * sn;
            const gz = h.z - sx * sn + sz * c;
            skirt = Math.max(skirt, gy - (terrainAtValley(gx, gz) - 0.6));
          }
          skirt = Math.min(skirt, 14);
        }
        const isFactory = kind === HK.FACTORY;
        const isTower = kind === HK.TOWER;
        const bodyMat = isFactory ? this.brickMat : this.houseMats[h.style];
        if (!isTower) {
          const body = new THREE.Mesh(this.houseGeo, bodyMat);
          body.position.y = (bodyH - skirt) / 2;
          body.scale.set(wide, (bodyH + skirt) / 2.4, deep);
          house.add(body);
        }

        // Крыша со СВЕСОМ: у альпийского дома она заметно шире корпуса, и
        // именно свес делает силуэт узнаваемым.
        const roofPitch = h.roofPitch;
        const roofW = wide * 1.16;
        const roofD = deep * 1.16;
        if (!isTower) {
          const roof = new THREE.Mesh(this.roofGeo, isFactory ? this.ironRoofMat : this.roofMats[h.style]);
          roof.position.y = bodyH;
          roof.scale.set(roofW, roofPitch, roofD);
          house.add(roof);
          // Снежная шапка ПОВТОРЯЕТ скат и лежит поверх него. Ошибка первой
          // версии: шапке дали 0.62 от высоты ската — она оказалась ВНУТРИ
          // крыши и не была видна вовсе. У цеха снег на железе серый от сажи.
          const cap = new THREE.Mesh(this.snowCapGeo, this.roofSnowMat);
          cap.position.y = bodyH + 0.13;
          cap.scale.set(roofW * 1.05, roofPitch * 1.01, roofD * 1.04);
          house.add(cap);
        }

        if (isFactory) {
          // ★ ЦЕХ: две-три высокие трубы (пар из них — см. stacks), ряд высоких
          // окон, за которыми топки
          const nSt = 2 + (hash01(h.x, h.z * 2) > 0.5 ? 1 : 0);
          const stH = bodyH * (2.2 + hash01(h.z, h.x) * 1.4);
          const list = this.stacks.get(chunk) ?? [];
          for (let si = 0; si < nSt; si++) {
            const sx = (si / Math.max(1, nSt - 1) - 0.5) * 3.2 * wide;
            const sz = (hash01(h.x + si, h.z) - 0.5) * 1.6 * deep;
            const st = new THREE.Mesh(this.stackGeo, this.stackMat);
            st.position.set(sx, bodyH + stH / 2, sz);
            st.scale.set(1.6, stH, 1.6);
            house.add(st);
            // верх трубы — в мир (дом повёрнут и масштабирован)
            const c = Math.cos(h.rot), sn = Math.sin(h.rot);
            const wxs = toWorldX(h.x, h.z) + (sx * c + sz * sn) * h.scale;
            const wzs = h.z + (-sx * sn + sz * c) * h.scale;
            list.push({ x: wxs, y: gy + (bodyH + stH) * h.scale, z: wzs, r: 0.7 * h.scale });
          }
          this.stacks.set(chunk, list);
          for (let c = -2; c <= 2; c++) {
            const win = new THREE.Mesh(this.windowGeo, this.furnaceWinMat);
            win.position.set(c * 0.8 * wide, bodyH * 0.55, 1.81 * deep + 0.02);
            win.scale.set(0.9, 1.6, 1);
            house.add(win);
            const win2 = new THREE.Mesh(this.windowGeo, this.furnaceWinMat);
            win2.position.set(c * 0.8 * wide, bodyH * 0.55, -1.81 * deep - 0.02);
            win2.rotation.y = Math.PI;
            win2.scale.set(0.9, 1.6, 1);
            house.add(win2);
          }
        }
        if (isTower) {
          // ★ ВОДОНАПОРНАЯ БАШНЯ: четыре ноги, бак, конус
          const legH = bodyH * 0.62;
          for (const [lx, lz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
            const leg = new THREE.Mesh(this.legGeo, this.stackMat);
            leg.position.set(lx * 1.3 * wide, legH / 2, lz * 1.3 * deep);
            leg.scale.set(1, legH, 1);
            house.add(leg);
          }
          const tank = new THREE.Mesh(this.tankGeo, this.tankMat);
          tank.position.set(0, legH + bodyH * 0.19, 0);
          tank.scale.set(1.9 * wide, bodyH * 0.38, 1.9 * deep);
          house.add(tank);
          const cone = new THREE.Mesh(this.coneGeo, this.ironRoofMat);
          cone.position.set(0, legH + bodyH * 0.38 + 0.3, 0);
          cone.scale.set(1.9 * wide, 1, 1.9 * deep);
          house.add(cone);
        }

        if (h.chimney && !isFactory && !isTower) {
          const ch = new THREE.Mesh(this.chimneyGeo, this.houseMats[(h.style + 1) % 3]);
          ch.position.set(
            (hash01(h.z, h.x) - 0.5) * 2.4 * wide,
            bodyH + roofPitch * 0.9,
            (hash01(h.x * 3, h.z) - 0.5) * 1.2 * deep
          );
          house.add(ch);
        }

        // --- ОБЩЕСТВЕННЫЕ ПОСТРОЙКИ ---
        if (kind === HK.HOTEL) {
          // балконные ленты по этажам и вывеска над входом — отель узнаётся
          // именно по ним, а не по размеру
          for (const fy of [0.42, 0.72]) {
            const bal = new THREE.Mesh(this.balconyGeo, this.woodMat);
            bal.position.set(0, bodyH * fy, 1.85 * deep);
            bal.scale.set(wide, 1, 1);
            house.add(bal);
            const rail = new THREE.Mesh(this.railGeo, this.woodMat);
            rail.position.set(0, bodyH * fy + 0.3, 1.85 * deep + 0.5);
            rail.scale.set(wide, 1, 1);
            house.add(rail);
          }
          const sign = new THREE.Mesh(this.signGeo, this.signMat);
          sign.position.set(0, bodyH * 0.9, 1.82 * deep + 0.1);
          house.add(sign);
          // ряды окон: три этажа по четыре — то, чего нет у жилого дома
          for (let fl = 0; fl < 3; fl++) {
            for (let c = -1.5; c <= 1.5; c++) {
              const win = new THREE.Mesh(this.windowGeo, this.windowMat);
              win.position.set(c * 1.15 * wide, bodyH * (0.25 + fl * 0.26), 1.81 * deep + 0.02);
              house.add(win);
            }
          }
        } else if (kind === HK.SHOP) {
          const aw = new THREE.Mesh(this.awningGeo, this.awningMat);
          aw.position.set(0, bodyH * 0.72, 1.81 * deep + 0.7);
          aw.rotation.x = 0.22;
          aw.scale.set(wide, 1, 1);
          house.add(aw);
          const win = new THREE.Mesh(this.shopWinGeo, this.windowMat);
          win.position.set(0.3 * wide, bodyH * 0.42, 1.81 * deep + 0.02);
          win.scale.set(wide, 1, 1);
          house.add(win);
          const sign = new THREE.Mesh(this.signGeo, this.signMat);
          sign.position.set(0, bodyH * 0.86, 1.82 * deep + 0.06);
          house.add(sign);
        } else if (kind === HK.CHAPEL) {
          // звонница на коньке: маленькая, но силуэт читается сразу
          const bell = new THREE.Mesh(this.belfryGeo, this.houseMats[h.style]);
          bell.position.set(0, bodyH + HOUSE_GEOM.ROOF_H * roofPitch * 0.9, -1.3 * deep);
          house.add(bell);
          const spire = new THREE.Mesh(this.spireGeo, this.roofMats[h.style]);
          spire.position.set(0, bodyH + HOUSE_GEOM.ROOF_H * roofPitch * 0.9 + 1.3, -1.3 * deep);
          house.add(spire);
        }

        // балкон под свесом — только у шале
        if (kind === HK.CHALET) {
          const bz = 1.85 * deep;
          const bal = new THREE.Mesh(this.balconyGeo, this.woodMat);
          bal.position.set(0, bodyH * 0.62, bz);
          bal.scale.set(wide, 1, 1);
          house.add(bal);
          const rail = new THREE.Mesh(this.railGeo, this.woodMat);
          rail.position.set(0, bodyH * 0.62 + 0.3, bz + 0.5);
          rail.scale.set(wide, 1, 1);
          house.add(rail);
        }

        // дверь на фасаде
        if (!isTower) {
          const door = new THREE.Mesh(this.doorGeo, this.doorMat);
          door.position.set(-1.4 * wide, 0.68, 1.81 * deep + 0.03);
          house.add(door);
        }

        // окна: два на фасаде (к дороге), одно сзади
        const wz = 1.81 * deep;
        const winList: Array<[number, number, number]> = isTower || isFactory ? [] : [
          [0.35 * wide, wz + 0.02, 0],
          [1.4 * wide, wz + 0.02, 0],
          [0.5 * wide, -wz - 0.02, Math.PI],
        ];
        for (const [wxr, wzr, ry] of winList) {
          const win = new THREE.Mesh(this.windowGeo, this.windowMat);
          win.position.set(wxr, bodyH * 0.55, wzr);
          win.rotation.y = ry;
          house.add(win);
        }
        house.position.set(toWorldX(h.x, h.z) - wx0, gy, h.z - oz);
        house.rotation.y = h.rot;
        house.scale.setScalar(h.scale);
        chunk.add(house);
      }
      for (const l of village.lamps) {
        if (!(l.x >= bMinX && l.x < bMaxX && l.z >= bMinZ && l.z < bMaxZ)) continue;
        const gy = terrainAtValley(l.x, l.z);
        const lwx = toWorldX(l.x, l.z) - wx0;
        const pole = new THREE.Mesh(this.lampPoleGeo, this.railMat);
        pole.position.set(lwx, gy + 1.55, l.z - oz);
        chunk.add(pole);
        const glow = new THREE.Mesh(this.lampGlowGeo, this.lampGlowMat);
        glow.position.set(lwx, gy + 3.15, l.z - oz);
        chunk.add(glow);
      }
    }

    // рейлы: изогнутая полилиния — сегменты бруса с яркой кромкой;
    // вариант ledge — каменный парапет вместо опор
    for (const r of railsInChunkWorld(cx, cz)) {
      const ys = railHeights(r);
      for (let s = 0; s < r.segLen.length; s++) {
        const a = r.pts[s];
        const b = r.pts[s + 1];
        // сегмент рисует только тот чанк, в котором лежит его середина —
        // иначе длинный рейл дублировался бы в соседних чанках
        const mz = (a.z + b.z) / 2;
        const mu = toValleyU((a.x + b.x) / 2, mz); // чанки живут в координатах долины
        if (
          mu < ox - CHUNK / 2 || mu >= ox + CHUNK / 2 ||
          mz < oz - CHUNK / 2 || mz >= oz + CHUNK / 2
        ) {
          continue;
        }
        const ya = ys[s];
        const yb = ys[s + 1];
        const dy = yb - ya;
        const segLen = r.segLen[s];
        const fullLen = Math.sqrt(segLen * segLen + dy * dy) + 0.4; // перекрываем стыки
        const fwd = new THREE.Vector3(b.x - a.x, dy, b.z - a.z).normalize();
        const right = new THREE.Vector3().crossVectors(up, fwd).normalize();
        const railUp = new THREE.Vector3().crossVectors(fwd, right).normalize();
        m.makeBasis(right, railUp, fwd);
        const mid = new THREE.Vector3(
          (a.x + b.x) / 2 - wx0,
          (ya + yb) / 2,
          (a.z + b.z) / 2 - oz
        );

        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.18, fullLen), this.railMat);
        bar.position.copy(mid).addScaledVector(railUp, -0.09);
        bar.quaternion.setFromRotationMatrix(m);
        chunk.add(bar);

        // яркая кромка сверху — чтобы рейл читался даже при заходе в лоб
        const strip = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, fullLen), this.flagMat);
        strip.position.copy(mid).addScaledVector(railUp, 0.03);
        strip.quaternion.setFromRotationMatrix(m);
        chunk.add(strip);

        if (r.ledge) {
          // парапет: сплошная каменная лента под линией скольжения,
          // наклонена вместе с рейлом — никаких ступенек
          const ribbon = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 1.1, fullLen),
            this.rockMat
          );
          ribbon.position.copy(mid).addScaledVector(railUp, -0.72);
          ribbon.quaternion.setFromRotationMatrix(m);
          chunk.add(ribbon);
        } else {
          const posts = Math.max(1, Math.floor(segLen / 7));
          for (let i = 0; i < posts; i++) {
            const t = (i + 0.5) / posts;
            const px = a.x + (b.x - a.x) * t;
            const pz = a.z + (b.z - a.z) * t;
            const railY = ya + dy * t;
            const gy = terrainHeight(px, pz);
            const h = Math.max(0.2, railY - gy);
            const post = new THREE.Mesh(new THREE.BoxGeometry(0.16, h, 0.16), this.railMat);
            post.position.set(px - wx0, gy + h / 2, pz - oz);
            chunk.add(post);
          }
        }
      }
    }

    // Вешки по краям трассы — линия поворота читается издалека.
    // ★ НО ТОЛЬКО ТАМ, ГДЕ ИМ ЕСТЬ ОТКУДА ВЗЯТЬСЯ. Укатанный размеченный
    // коридор — понятие горнолыжного курорта; на действующем вулкане его
    // некому размечать. Там ту же роль играет борт лавового канала: линия
    // читается по форме, а не по расставленным палкам.
    if (volcanoWeight(oz) < 0.5) {
      const step = 9;
      const zStart = Math.ceil((oz - CHUNK / 2) / step) * step;
      for (let mz = zStart; mz < oz + CHUNK / 2; mz += step) {
        const cxp = pisteCenterX(mz);
        for (const side of [-1, 1]) {
          const mx = cxp + side * PISTE_HALF_W;
          if (mx < ox - CHUNK / 2 || mx >= ox + CHUNK / 2) continue;
          const mat = side < 0 ? this.poleLeftMat : this.poleRightMat;
          const gy = terrainAtValley(mx, mz);
          const lx = toWorldX(mx, mz) - wx0;
          const pole = new THREE.Mesh(this.poleGeo, mat);
          pole.position.set(lx, gy + 1.2, mz - oz);
          chunk.add(pole);
          const top = new THREE.Mesh(this.poleTopGeo, mat);
          top.position.set(lx, gy + 2.5, mz - oz);
          chunk.add(top);
        }
      }
    }

    // флажки по бокам губы кикера, размер под масштаб рампы
    for (const k of kickersInChunk(cx, cz)) {
      const fs = 0.8 + k.h * 0.14;
      for (const side of [-1, 1]) {
        const fx = k.x + side * (k.halfW + 0.7);
        const fz = k.z - 0.5;
        const flag = new THREE.Mesh(this.flagGeo, this.flagMat);
        flag.position.set(toWorldX(fx, fz) - wx0, terrainAtValley(fx, fz), fz - oz);
        flag.scale.set(side * fs, fs, fs); // вымпел смотрит внутрь с обеих сторон
        chunk.add(flag);
      }
    }

    chunk.position.set(wx0, 0, oz);
    this.group.add(chunk);
    this.chunks.set(cx + ',' + cz, chunk);
  }

  /**
   * СКАЛЫ СТРИМЯТСЯ ОТДЕЛЬНО ОТ ЧАНКОВ.
   * Пока скала рисовалась вместе со своим чанком, её дальность прорисовки была
   * дальностью чанка: примерно 216 м вперёд и 96 м назад. Для дерева это
   * нормально, а глыба высотой в сотни метров при таком радиусе возникала
   * прямо перед носом — и исчезала, стоило её проехать. Здесь у скал своя
   * дальность, вчетверо больше, и никакой связи с боковым охватом чанков.
   * Их немного (одна на ~288 м, и то не всегда), так что это дёшево.
   */
  private updateCrags(pz: number): void {
    // Дальность подобрана ПОД ТУМАН, а не на глаз: дымка идёт от 300 до
    // 3700 м, и скала, появляющаяся на 1500 м, ещё различима (замер: смесь с
    // туманом 0.42) — то есть возникает на глазах. На 2600 м она приходит уже
    // на две трети в дымке и проявляется, а не выскакивает.
    const AHEAD = 2600;
    const BACK = 700;
    this.updateArches(pz, AHEAD, BACK);
    const k0 = Math.floor((pz - BACK) / CRAG_STEP);
    const k1 = Math.ceil((pz + AHEAD) / CRAG_STEP);
    // ★ ПО ОДНОЙ СКАЛЕ ЗА КАДР. Чанки давно строятся по бюджету времени, а
    // скалы и арки — нет: сколько их попало в окно, столько и собиралось
    // подряд. Обычно это одна штука и 7 мс, но на въезде в гряду их набегает
    // сразу несколько, и кадр встаёт на треть секунды (замер живой игры: один
    // кадр из 581 занял 338 мс при медиане 16.7). Появление скалы за пару
    // кадров до нужного места незаметно — она и так проявляется из дымки.
    for (let k = k0; k <= k1; k++) {
      if (this.cragBuilt.has(k)) continue;
      const c = cragInRow(k);
      if (!c) continue;
      this.cragBuilt.set(k, this.buildCrag(c));
      break;
    }
    for (const [k, obj] of this.cragBuilt) {
      if (k >= k0 && k <= k1) continue;
      this.cragField.remove(obj);
      obj.traverse((o) => {
        if (o instanceof THREE.Mesh && !this.sharedGeos.has(o.geometry)) o.geometry.dispose();
      });
      this.cragBuilt.delete(k);
    }
  }

  /** Арки стримятся вместе со скалами и с той же дальностью */
  private updateArches(pz: number, ahead: number, back: number): void {
    const k0 = Math.floor((pz - back) / ARCH_STEP);
    const k1 = Math.ceil((pz + ahead) / ARCH_STEP);
    for (let k = k0; k <= k1; k++) {
      if (this.archBuilt.has(k)) continue;
      const a = archInRow(k);
      if (!a) continue;
      this.archBuilt.set(k, this.buildArch(a));
      break; // и по одной арке — та же причина
    }
    for (const [k, obj] of this.archBuilt) {
      if (k >= k0 && k <= k1) continue;
      this.cragField.remove(obj);
      // геометрия арок ОБЩАЯ — освобождаем только буферы инстанса
      if (obj instanceof THREE.InstancedMesh) obj.dispose();
      this.archBuilt.delete(k);
    }
  }

  private buildArch(a: Arch): THREE.Object3D {
    const wx = a.x + valleyX(a.z);
    // ПОДОШВА ПО НИЖНЕЙ ИЗ ТРЁХ ТОЧЕК. Ноги стоят в сотне метров друг от
    // друга, и на склоне земля под ними отличается на десятки метров: если
    // сажать по центру, одна нога повисает в воздухе.
    const off = a.span * 0.5;
    const geo = this.archGeos[a.variant];
    const groundY = (geo.userData.groundY as number) ?? 0;
    const gy =
      Math.min(
        terrainHeight(wx - off, a.z),
        terrainHeight(wx + off, a.z),
        terrainHeight(wx, a.z)
      ) - (groundY + 0.03) * a.height;
    const mesh = new THREE.InstancedMesh(geo, this.cragMat, 1);
    const m = new THREE.Matrix4();
    m.compose(
      new THREE.Vector3(0, 0, 0),
      new THREE.Quaternion(),
      new THREE.Vector3(a.span, a.height, a.span)
    );
    mesh.setMatrixAt(0, m);
    mesh.setColorAt(0, rockTintFor(a.z, a.tint, TREE_TINT));
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.position.set(wx, gy, a.z);
    this.cragField.add(mesh);
    return mesh;
  }

  private buildCrag(c: Crag): THREE.Object3D {
    const holder = new THREE.Group();
    const wx = c.x + valleyX(c.z);
    // утоплена в снег: без холма топим глубже — там прятать основание нечем
    const sink = c.mound ? 0.42 : 0.56;
    const gy = terrainHeight(wx, c.z) - c.scale * c.hMul * sink;
    // Инстанс на одну штуку — ради instanceColor: разнотон скал живёт в нём,
    // а материал общий на все.
    const mesh = new THREE.InstancedMesh(this.cragGeos[c.variant], this.cragMat, 1);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), c.rot);
    const sc = new THREE.Vector3(c.scale, c.scale * c.hMul, c.scale * c.zMul);
    m.compose(new THREE.Vector3(0, 0, 0), q, sc);
    mesh.setMatrixAt(0, m);
    mesh.setColorAt(0, rockTintFor(c.z, c.tint, TREE_TINT));
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    holder.add(mesh);

    const snowGeo = this.cragSnowGeos[c.variant];
    // на вулканической скале снега нет — там пепел, и шапка выглядела бы
    // белой заплатой; порог низкий, чтобы шапки не мигали на стыке биомов
    if (c.snowTop && snowGeo && volcanoWeight(c.z) < 0.25) {
      const sm = new THREE.InstancedMesh(snowGeo, this.cragSnowMat, 1);
      sm.setMatrixAt(0, m);
      sm.instanceMatrix.needsUpdate = true;
      holder.add(sm);
    }
    holder.position.set(wx, gy, c.z);
    this.cragField.add(holder);
    return holder;
  }

  /** трубы цехов в радиусе r от точки — для пара */
  stacksNear(px: number, pz: number, r: number, out: Array<{ x: number; y: number; z: number; r: number }>): void {
    out.length = 0;
    for (const list of this.stacks.values()) {
      for (const s of list) {
        if (Math.abs(s.x - px) < r && Math.abs(s.z - pz) < r) out.push(s);
      }
    }
  }

  private disposeChunk(chunk: THREE.Group): void {
    this.stacks.delete(chunk);
    this.group.remove(chunk);
    chunk.traverse((obj) => {
      if (obj instanceof THREE.Mesh && !this.sharedGeos.has(obj.geometry)) {
        obj.geometry.dispose();
      }
    });
  }
}

/** Быстрый детерминированный псевдослучайный поворот из координат */
function hash01(a: number, b: number): number {
  const v = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return v - Math.floor(v);
}
