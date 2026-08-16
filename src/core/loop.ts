// Планировщик кадра: симуляция идёт фиксированным шагом (детерминизм,
// одинаковая физика на любом мониторе), рендер — раз в RAF-кадр.
// alpha — доля незавершённого физического шага для интерполяции визуала.

export interface LoopHooks {
  /** фиксированный шаг симуляции */
  update(dt: number): void;
  /** раз в кадр; dt — реальное время кадра, alpha 0..1 — интерполяция */
  render(dt: number, alpha: number): void;
}

const MAX_STEPS_PER_FRAME = 5;

export class FrameScheduler {
  readonly fixedDt = 1 / 60;
  private acc = 0;
  private last = 0;
  private rafId = 0;
  running = false;

  constructor(private hooks: LoopHooks) {}

  start(): void {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.rafId = requestAnimationFrame(this.frame);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  private frame = (now: number): void => {
    if (!this.running) return;
    const dt = Math.min((now - this.last) / 1000, 0.25);
    this.last = now;

    this.acc += dt;
    let steps = 0;
    while (this.acc >= this.fixedDt && steps < MAX_STEPS_PER_FRAME) {
      this.hooks.update(this.fixedDt);
      this.acc -= this.fixedDt;
      steps++;
    }
    // сильно отстали (лаг, возврат из фона) — не пытаемся догнать
    if (steps === MAX_STEPS_PER_FRAME) this.acc = 0;

    this.hooks.render(dt, this.acc / this.fixedDt);
    this.rafId = requestAnimationFrame(this.frame);
  };
}
