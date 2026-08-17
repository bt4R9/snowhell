/**
 * ★ СИД ДОЛЖЕН МЕНЯТЬ ПРАВИЛА МИРА, А НЕ ТОЛЬКО ФАЗЫ ШУМА.
 * Раньше setWorldSeed сдвигал координаты шума и фазы синусов — и этого мало:
 * крутизна, извилистость долины, плотности леса, кулуаров, рейлов и деревень
 * оставались КОНСТАНТАМИ, поэтому любой сид давал ту же гору с переставленной
 * мебелью. Здесь из сида тянутся сами параметры.
 *
 * Два уровня разнообразия, и они разные по смыслу:
 *  • РЕЦЕПТ — между заездами: один сид даёт широкую быструю долину почти без
 *    леса, другой — тесный виляющий коридор с кулуарами через каждые двести
 *    метров. Плюс рулетка присутствия: не в каждом мире есть арки, останцы и
 *    месы — отсутствие запоминается не хуже присутствия.
 *  • АКТЫ — внутри заезда: спуск нарезан на отрезки, у каждого своя тема (лес,
 *    камни, открытые поля, кулуары, посёлки). Без них статистика мира одинакова
 *    на всём протяжении, и через два километра игрок видел уже всё.
 *
 * Всё лениво и кэшируется по сиду: функции отсюда зовут из генератора рельефа,
 * то есть миллионы раз за кадр.
 */
import { hash2, worldSeed } from './noise';

export interface Recipe {
  /** базовая крутизна спуска и размах её волны */
  slope: number;
  slopeWave: number;
  /** множитель извилистости оси долины и размаха трассы */
  valley: number;
  piste: number;
  /** множители плотностей */
  forest: number;
  gully: number;
  rails: number;
  villages: number;
  rocky: number;
  jumps: number;
  /** рулетка присутствия: чего в этом мире нет вовсе */
  hasArches: boolean;
  hasCrags: boolean;
  hasMesas: boolean;
  hasGullies: boolean;
  /** изюминка заезда: 0 — исполинская арка, 1 — гигантский останец */
  landmark: number;
  landmarkZ: number;
}

let cache: Recipe | null = null;
let cacheSeed = -1;

export function recipe(): Recipe {
  const seed = worldSeed();
  if (cache && cacheSeed === seed) return cache;
  // hash2 уже подмешивает сид, поэтому достаточно разных индексов
  const r = (i: number): number => hash2(i * 7919 + 13, 5077);
  const mix = (i: number, a: number, b: number): number => a + r(i) * (b - a);
  cacheSeed = seed;
  cache = {
    // ВНИМАНИЕ: пологих участков в игре быть не должно (проверено тремя
    // итерациями фидбека), поэтому нижняя граница крутизны высокая.
    slope: mix(1, 0.5, 0.68),
    slopeWave: mix(2, 0.06, 0.2),
    valley: mix(3, 0.45, 1.55),
    piste: mix(4, 0.55, 1.5),
    forest: mix(5, 0.3, 1.6),
    gully: mix(6, 0.35, 1.7),
    rails: mix(7, 0.5, 1.6),
    villages: mix(8, 0.3, 1.8),
    rocky: mix(9, 0.55, 1.6),
    jumps: mix(10, 0.5, 1.7),
    hasArches: r(20) > 0.35,
    hasCrags: r(21) > 0.18,
    hasMesas: r(22) > 0.45,
    hasGullies: r(23) > 0.12,
    landmark: r(30) > 0.5 ? 1 : 0,
    landmarkZ: 1600 + r(31) * 3800,
  };
  return cache;
}

/** Множители плотностей текущего акта */
export interface Act {
  forest: number;
  gully: number;
  rocky: number;
  jumps: number;
  villages: number;
}

const NEUTRAL: Act = { forest: 1, gully: 1, rocky: 1, jumps: 1, villages: 1 };

/**
 * Темы актов. Каждая ЧТО-ТО ГЛУШИТ, а не только добавляет: акт «открытые поля»
 * без вырезанного леса читается как обычный склон, просто с трамплинами.
 */
const THEMES: Act[] = [
  { forest: 2.1, gully: 0.5, rocky: 0.4, jumps: 0.8, villages: 0.8 },  // чаща
  { forest: 0.3, gully: 1.1, rocky: 2.3, jumps: 0.9, villages: 0.4 },  // камни
  { forest: 0.15, gully: 0.4, rocky: 0.5, jumps: 1.8, villages: 0.6 }, // открытое
  { forest: 0.7, gully: 2.4, rocky: 0.9, jumps: 0.7, villages: 0.5 },  // кулуары
  { forest: 0.6, gully: 0.6, rocky: 0.6, jumps: 1.0, villages: 2.6 },  // посёлки
];

/** длина акта и ширина перехода между соседними, м */
const ACT_LEN = 1150;
const ACT_BLEND = 260;

function themeOf(k: number): Act {
  if (k < 0) return NEUTRAL;
  const t = Math.floor(hash2(k * 613 + 29, 811) * THEMES.length * 0.999);
  const prev = k > 0 ? Math.floor(hash2((k - 1) * 613 + 29, 811) * THEMES.length * 0.999) : -1;
  // Два одинаковых акта подряд — это просто длинный однообразный кусок, ради
  // которого всё и затевалось; сдвигаем повтор на соседнюю тему.
  return THEMES[t === prev ? (t + 1) % THEMES.length : t];
}

export function actAt(v: number): Act {
  // ★ ПЕРВЫЙ КИЛОМЕТР — БЕЗ ТЕМЫ. Разгон сложности от старта уже настроен
  // (WARMUP), и акт «чаща» в первые секунды ломал бы его.
  if (v < 700) return NEUTRAL;
  const f = v / ACT_LEN;
  const k = Math.floor(f);
  const a = themeOf(k);
  const into = (f - k) * ACT_LEN;
  const rest = ACT_LEN - into;
  let b: Act | null = null;
  let t = 0;
  if (into < ACT_BLEND) {
    b = themeOf(k - 1);
    t = 0.5 - 0.5 * (into / ACT_BLEND);
  } else if (rest < ACT_BLEND) {
    b = themeOf(k + 1);
    t = 0.5 - 0.5 * (rest / ACT_BLEND);
  }
  if (!b) return a;
  return {
    forest: a.forest + (b.forest - a.forest) * t,
    gully: a.gully + (b.gully - a.gully) * t,
    rocky: a.rocky + (b.rocky - a.rocky) * t,
    jumps: a.jumps + (b.jumps - a.jumps) * t,
    villages: a.villages + (b.villages - a.villages) * t,
  };
}
