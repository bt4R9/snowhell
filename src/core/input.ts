export class Input {
  private keys = new Set<string>();
  /**
   * ★ ПОДТВЕРЖДЕНИЕ — СОБЫТИЕ, А НЕ СОСТОЯНИЕ. Меню и вставки листаются одним
   * нажатием, и если читать удержание, то один зажатый пробел пролистает всё
   * разом. Флаг взводится по нажатию и гасится тем, кто его прочитал.
   */
  private confirmFlag = false;

  constructor() {
    window.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      this.keys.add(e.code);
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'NumpadEnter') {
        this.confirmFlag = true;
      }
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => this.keys.clear());
    // мышью тоже: кнопка PLAY нарисована в HUD, но по ней естественно кликать
    window.addEventListener('pointerdown', () => {
      this.confirmFlag = true;
    });
  }

  /** Нажали ли подтверждение с прошлой проверки. Чтение сбрасывает флаг. */
  takeConfirm(): boolean {
    if (!this.confirmFlag) return false;
    this.confirmFlag = false;
    return true;
  }

  down(code: string): boolean {
    return this.keys.has(code);
  }

  /** -1..1: положительное значение — поворот влево (в сторону +X при движении вдоль +Z) */
  get steer(): number {
    let s = 0;
    if (this.down('KeyA') || this.down('ArrowLeft')) s += 1;
    if (this.down('KeyD') || this.down('ArrowRight')) s -= 1;
    return s;
  }

  /** -1..1 для флипов в воздухе: +1 = бэкфлип (вверх/W), -1 = фронтфлип */
  get pitch(): number {
    let p = 0;
    if (this.down('KeyW') || this.down('ArrowUp')) p += 1;
    if (this.down('KeyS') || this.down('ArrowDown')) p -= 1;
    return p;
  }

  get jumpHeld(): boolean {
    return this.down('Space');
  }

  /**
   * ★ ВОЗДУШНЫЙ ТОРМОЗ — НА ТЕХ ЖЕ Q/E, ЧТО И НАЗЕМНЫЙ. Пробел был ошибкой:
   * им же и прыгают, и грэбят, так что торможение включалось само собой при
   * любой попытке взять доску. Q и E в воздухе — естественное продолжение
   * наземного канта: −1 — тянемся левой рукой к носу, +1 — правой к хвосту.
   */
  get airBrakeSide(): number {
    if (this.down('KeyQ')) return -1;
    if (this.down('KeyE')) return 1;
    return 0;
  }

  /** На земле тот же Shift — наклон вперёд (газ). В воздухе он же грэб. */
  get tuckHeld(): boolean {
    return this.down('ShiftLeft') || this.down('ShiftRight');
  }

  /**
   * Тормоз кантом. Стрелки и W/S заняты трюками, поэтому Q и E.
   * Сторона задаётся клавишей: Q — доска уходит влево, E — вправо.
   * Возвращает 0 (не тормозим), +1 (влево) или −1 (вправо).
   */
  /** Сброс на трассу: страховка на случай, когда выехать уже нечем */
  get resetHeld(): boolean {
    return this.down('KeyR');
  }

  get brake(): number {
    let b = 0;
    if (this.down('KeyQ')) b += 1;
    if (this.down('KeyE')) b -= 1;
    return b;
  }
}
