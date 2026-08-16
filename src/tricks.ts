// Чистая математика трюков: имена, очки, оценка приземления.
// Никаких Three.js и DOM — легко тестировать и переиспользовать.

export type LandingQuality = 'clean' | 'sketchy' | 'crash';

export interface LandingEvent {
  quality: LandingQuality;
  spinDeg: number;   // подписанный накопленный спин (+ = FS/влево)
  flipTurns: number; // подписанные обороты флипа (+ = бэкфлип)
  grabTime: number;  // секунд в грэбе
  airTime: number;
  score: number;     // 0..1 — с поправкой на скорость: решает краш и вердикт
  geom: number;      // 0..1 — чистая геометрия касания: решает множитель
  yawErr: number;    // град: угол доски к ходу в момент касания
  noseDeg: number;   // град: нос доски относительно склона, + вверх
}

// --- ГЕОМЕТРИЯ КАСАНИЯ -----------------------------------------------------
// На малой скорости приземлиться можно как угодно — доска просто ставится по
// снегу. Чем быстрее, тем меньше у снега времени принять доску: важно встать
// ВДОЛЬ ХОДА и с чуть поднятым носом. Нос ниже склона — это втыкание канта,
// самый быстрый способ уехать лицом в снег, поэтому вниз допуск вдвое уже.

// ЧИСЛА ВЗЯТЫ ИЗ ЗАМЕРА, А НЕ ИЗ ГОЛОВЫ. По 144 естественным приземлениям
// (медиана 108 км/ч) угол носа к склону распределён так: p5 −15°, p25 +13°,
// медиана +20°, p75 +28°, p95 +38°. То есть обычное касание — это уже слегка
// задранный нос: доска в полёте выравнивается по горизонту, а садится на
// склон. Идеал поэтому стоит рядом с медианой, иначе «нормально приземлился»
// означало бы штраф; строгость же несёт курс, который в трюке гуляет всерьёз.
// Допуски намеренно щедрые: механика должна читаться как награда за красивое
// касание, а не как экзамен на каждом прыжке. Падение остаётся только за
// откровенный завал — доска поперёк или нос глубоко в снег.
const NOSE_IDEAL = 14;     // град над линией склона
const NOSE_UP_TOL = 48;    // выше: сесть на хвост некрасиво, но переживаемо
const NOSE_DOWN_TOL = 44;  // ниже: нос втыкается — сюда падать нельзя
const YAW_TOL = 60;        // град отклонения курса, при котором счёт обнуляется

/** Подписанный остаток флипа: + = нос вверх, град, −180…180 */
export function flipResidual(flipTurns: number): number {
  return (flipTurns - Math.round(flipTurns)) * 360;
}

/**
 * Качество касания 0..1 по чистой геометрии, без учёта скорости.
 * yawErr — угол между ближайшей осью доски и ходом (град, 0 — идеал);
 * noseDeg — угол носа относительно склона (град, + вверх).
 */
export function landingScore(yawErr: number, noseDeg: number): number {
  const y = Math.min(1, Math.abs(yawErr) / YAW_TOL);
  const d = noseDeg - NOSE_IDEAL;
  const n = Math.min(1, Math.abs(d) / (d >= 0 ? NOSE_UP_TOL : NOSE_DOWN_TOL));
  // квадрат, а не линейка: у идеала широкая полка, штраф растёт к краю
  return (1 - y * y) * (1 - n * n);
}

/** Множитель очков за красоту приземления. Ступенями — так это читается */
export function landingBonus(score: number): { mult: number; label: string } {
  if (score >= 0.93) return { mult: 2, label: 'PERFECT' };
  if (score >= 0.82) return { mult: 1.5, label: 'SOLID' };
  return { mult: 1, label: '' };
}

/** Насколько далеко (в градусах) вращение от ближайшей «законной» позиции */
export function spinError(spinDeg: number): number {
  const m = Math.abs(spinDeg) % 180;
  return Math.min(m, 180 - m);
}

export function flipError(flipTurns: number): number {
  const m = Math.abs(flipTurns) % 1;
  return Math.min(m, 1 - m) * 360;
}

/**
 * Сколько градусов спина ЗАСЧИТАНО. Округлять к ближайшим 180° нельзя:
 * приземление с доской поперёк (ровно 90°) — теперь законный приём, а не
 * падение, и «половина» вращения превращалась бы в полный 180. Поэтому
 * ближайшее кратное берём, только если недокрут в пределах допуска
 * приземления, иначе честно отбрасываем незавершённый полуоборот.
 */
export function landedSpin(spinDeg: number): number {
  const a = Math.abs(spinDeg);
  const near = Math.round(a / 180) * 180;
  const done = spinError(spinDeg) <= 45 ? near : Math.floor(a / 180) * 180;
  return Math.sign(spinDeg) * done;
}

function spinName(spinDeg: number): string | null {
  const r = Math.abs(landedSpin(spinDeg));
  if (r < 180) return null;
  return (spinDeg > 0 ? 'FS ' : 'BS ') + r;
}

function flipName(flipTurns: number): string | null {
  const n = Math.round(Math.abs(flipTurns));
  if (n < 1) return null;
  const base = flipTurns > 0 ? 'BACKFLIP' : 'FRONTFLIP';
  if (n === 1) return base;
  if (n === 2) return 'DOUBLE ' + base;
  return n + '× ' + base;
}

/** Итоговое имя трюка при приземлении */
export function describeTrick(e: LandingEvent): string {
  const parts: string[] = [];
  const f = flipName(e.flipTurns);
  const s = spinName(e.spinDeg);
  if (f) parts.push(f);
  if (s) parts.push(s);
  if (e.grabTime > 0.15) parts.push('INDY');
  return parts.join(' + ');
}

/** Живой лейбл в полёте — показываем только уже «заработанное» */
export function describeLive(spinDeg: number, flipTurns: number, grabTime: number): string {
  const parts: string[] = [];
  const flips = Math.floor(Math.abs(flipTurns) + 0.3);
  if (flips >= 1) {
    const fake = { flipTurns: Math.sign(flipTurns) * flips } as LandingEvent;
    const f = flipName(fake.flipTurns);
    if (f) parts.push(f);
  }
  const spin = Math.floor(Math.abs(spinDeg) / 180) * 180;
  if (spin >= 180) parts.push((spinDeg > 0 ? 'FS ' : 'BS ') + spin);
  if (grabTime > 0.15) parts.push('INDY');
  return parts.join(' + ');
}

/** Базовые очки за трюк (без комбо-множителя) */
export function scoreTrick(e: LandingEvent): number {
  const spin = Math.abs(landedSpin(e.spinDeg));
  const flips = Math.round(Math.abs(e.flipTurns));
  let pts = spin * 1.0 + flips * 450 + e.grabTime * 350 + e.airTime * 60;
  if (spin === 0 && flips === 0 && e.grabTime <= 0.15) pts = 0; // просто прыжок не оцениваем
  return Math.round(pts / 10) * 10;
}
