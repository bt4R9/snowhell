import * as THREE from 'three/webgpu';
import { spriteCloud, SpriteCloud } from './sprites';
import { pow } from 'three/tsl';

/**
 * ★ ИСКРЫ ИЗ-ПОД ЛУЧА. Точка касания — единственное место, где рез виден
 * вблизи: сам столб уходит к горизонту, борозда за спиной уже остывает, а
 * здесь порода вскипает прямо сейчас. Без брызг это выглядит так, будто луч
 * просто подкрашивает землю.
 *
 * ★ ИСКРА — ЭТО ТРАЕКТОРИЯ, А НЕ ТОЧКА. Облако равномерных пятнышек читается
 * дымом. Поэтому у каждой искры свой вектор выброса, своя тяжесть и свой срок:
 * часть уходит настильно по ходу луча, часть бьёт вверх свечками, и все они
 * гаснут по одной кривой — от бело-жёлтого к тёмно-красному. Рой при этом
 * получается разреженным, и отдельные росчерки видно поимённо.
 */
const N = 900;
/** сколько искр в секунду выбрасывает точка касания */
const RATE = 420;
const GRAV = 42;

export class CutSparks {
  readonly points: THREE.Sprite;
  private cloud: SpriteCloud;
  private pos = new Float32Array(N * 3);
  private col = new Float32Array(N * 3);
  private size = new Float32Array(N);
  private vel = new Float32Array(N * 3);
  private life = new Float32Array(N);
  private full = new Float32Array(N);
  private next = 0;
  private acc = 0;
  private prev = new THREE.Vector3();
  private hasPrev = false;

  constructor() {
    for (let i = 0; i < N; i++) this.life[i] = -1;
    // ★ WebGPU: точки со своим размером — инстансированные спрайты (см. sprites.ts)
    this.cloud = spriteCloud({
      count: N, pos: this.pos, col: this.col, size: this.size,
      k: 300, minPx: 1.3, maxPx: 22,
      blending: THREE.AdditiveBlending,
      alpha: (r) => r.oneMinus().mul(0.85).add(pow(r.oneMinus(), 3.0).mul(0.7)),
    });
    this.points = this.cloud.sprite;
  }

  /**
   * @param on идёт ли рез прямо сейчас
   * @param at точка касания луча о землю
   */
  update(dt: number, on: boolean, at: THREE.Vector3): void {
    if (on) {
      // ★ НАПРАВЛЕНИЕ ВЫБРОСА ЗАДАЁТ САМ ЛУЧ. Точка касания метёт по склону, и
      // брызги обязаны лететь ВПЕРЁД по её ходу — иначе фонтан стоит на месте
      // и не связан с движением реза.
      const dx = at.x - this.prev.x;
      const dz = at.z - this.prev.z;
      const sp = Math.hypot(dx, dz);
      const hx = this.hasPrev && sp > 0.01 ? dx / sp : 0;
      const hz = this.hasPrev && sp > 0.01 ? dz / sp : 0;
      const drag = Math.min(34, sp / Math.max(1e-4, dt));
      this.acc += RATE * dt;
      const n = Math.min(N, Math.floor(this.acc));
      this.acc -= n;
      for (let k = 0; k < n; k++) {
        const i = this.next % N;
        this.next++;
        // выброс из точки с небольшим разбросом по пятну прожига
        const a = Math.random() * Math.PI * 2;
        const rr = Math.random() * 1.6;
        this.pos[i * 3] = at.x + Math.cos(a) * rr;
        this.pos[i * 3 + 1] = at.y + 0.2;
        this.pos[i * 3 + 2] = at.z + Math.sin(a) * rr;
        // ★ ДВА СОРТА ИСКР. Настильные уносит вслед за лучом, свечки уходят
        // вверх и висят: вместе они дают объём, поодиночке — плоский веер.
        const up = Math.random() < 0.35;
        const spd = up ? 9 + Math.random() * 16 : 5 + Math.random() * 11;
        const ang = Math.random() * Math.PI * 2;
        const spread = up ? 0.35 : 1;
        this.vel[i * 3] = hx * drag * 0.5 + Math.cos(ang) * spd * spread;
        this.vel[i * 3 + 1] = up ? spd * 1.5 : 3 + Math.random() * 9;
        this.vel[i * 3 + 2] = hz * drag * 0.5 + Math.sin(ang) * spd * spread;
        const l = up ? 0.5 + Math.random() * 0.9 : 0.25 + Math.random() * 0.5;
        this.life[i] = l;
        this.full[i] = l;
        this.size[i] = 0.35 + Math.random() * 0.75;
      }
      this.prev.copy(at);
      this.hasPrev = true;
    } else {
      this.hasPrev = false;
      this.acc = 0;
    }

    let alive = 0;
    for (let i = 0; i < N; i++) {
      if (this.life[i] < 0) continue;
      this.life[i] -= dt;
      if (this.life[i] <= 0) {
        this.life[i] = -1;
        this.size[i] = 0;
        continue;
      }
      alive++;
      this.vel[i * 3 + 1] -= GRAV * dt;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      // остывание: бело-жёлтая вспышка → оранжевый → тёмно-красный уголёк
      const k = this.life[i] / Math.max(0.001, this.full[i]);
      const hot = k * k;
      this.col[i * 3] = 2.6 * (0.45 + hot * 0.55);
      this.col[i * 3 + 1] = 0.35 + hot * hot * 1.5;
      this.col[i * 3 + 2] = 0.06 + hot * hot * hot * 1.1;
    }
    if (alive === 0 && !on) return;
    this.cloud.touch();
  }
}
