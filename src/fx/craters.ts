/**
 * ★ ВОРОНКИ ЖИВУТ ОТДЕЛЬНО ОТ ТОГО, КТО ИХ РИСУЕТ. След от взрыва нужен троим
 * сразу: шейдеру рельефа (продавить вершины), шейдеру цвета (выжечь чашу) и
 * ИГРОКУ — иначе доска поедет по старому уровню и повиснет над дном ямы.
 * Поэтому список общий, а формула проседания одна на всех: разойтись они не
 * смогут по построению.
 *
 * В саму terrainHeight это вносить нельзя: по ней строятся меши чанков, и
 * чанк, собранный ПОСЛЕ взрыва, получил бы воронку дважды — в геометрии и в
 * вершинном сдвиге.
 */

/** сколько воронок держим одновременно */
export const CRATERS = 10;
/** сколько живёт след, с */
export const CRATER_LIFE = 34;
/**
 * Глубина в долях радиуса.
 * ★ ЧЕМ КРУПНЕЕ СНАРЯД, ТЕМ ГЛУБЖЕ ЯМА. Радиус воронки и так растёт с размером
 * снаряда, но потолок в 2.6 м срезал всю разницу: и средняя глыба, и самая
 * крупная оставляли одинаковую вмятину. Потолок поднят настолько, чтобы в него
 * упирались только самые большие.
 * ВНИМАНИЕ: те же два числа зашиты в вершинный шейдер рельефа (terrain.ts) —
 * если менять, менять в обоих местах, иначе картинка разойдётся с физикой.
 */
const DEPTH_K = 0.55;
const DEPTH_MAX = 6.5;

/** [x, z, радиус, свежесть] на воронку */
const data = new Float32Array(CRATERS * 4);
const age = new Float32Array(CRATERS);
let next = 0;

export function craterData(): Float32Array {
  return data;
}

export function addCrater(x: number, z: number, r: number): void {
  const i = next % CRATERS;
  next++;
  data[i * 4] = x;
  data[i * 4 + 1] = z;
  data[i * 4 + 2] = r;
  data[i * 4 + 3] = 1;
  age[i] = 0;
}

export function ageCraters(dt: number): void {
  for (let i = 0; i < CRATERS; i++) {
    if (data[i * 4 + 3] <= 0) continue;
    age[i] += dt;
    const k = 1 - age[i] / CRATER_LIFE;
    // первые секунды воронка держится, дальше склон её затягивает
    data[i * 4 + 3] = k > 0 ? Math.min(1, k * 1.8) : 0;
  }
}

/**
 * Насколько просела земля в точке. Ровно та же чаша, что в вершинном шейдере:
 * (1 − d²)² — у кромки касательная горизонтальна, изломов нет.
 */
export function craterDip(x: number, z: number): number {
  let dip = 0;
  for (let i = 0; i < CRATERS; i++) {
    const w = data[i * 4 + 3];
    if (w <= 0.002) continue;
    const r = data[i * 4 + 2];
    const dx = x - data[i * 4];
    const dz = z - data[i * 4 + 1];
    const d2 = (dx * dx + dz * dz) / (r * r);
    if (d2 >= 1) continue;
    const k = 1 - d2;
    dip += Math.min(DEPTH_MAX, r * DEPTH_K) * w * k * k;
  }
  return dip;
}
