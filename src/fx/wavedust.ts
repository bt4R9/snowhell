import * as THREE from 'three/webgpu';
import { float, smoothstep } from 'three/tsl';
import { spriteCloud, SpriteCloud } from './sprites';

// ★ ПЫЛЬ С ГРЕБНЯ УДАРНОЙ ВОЛНЫ. Сам вал на плоской заливке читается слабо, а
// завеса пепла, летящая вверх по фронту, видна с любого ракурса и показывает
// движение. Клубы крупные (метры), с мягким краем — спрей из-под доски для
// этого не годится: его частицы сантиметровые и за полсотни метров исчезают.

const MAX = 600;

export class WaveDust {
  sprite: THREE.Sprite;
  private pos = new Float32Array(MAX * 3);
  private vel = new Float32Array(MAX * 3);
  private life = new Float32Array(MAX);
  private life0 = new Float32Array(MAX);
  private size = new Float32Array(MAX);
  private count = 0;
  private cloud: SpriteCloud;

  constructor() {
    this.cloud = spriteCloud({
      count: 0, pos: this.pos, size: this.size,
      k: 120, minPx: 1, maxPx: 90,
      materialColor: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
      alpha: (r2) => smoothstep(1.0, 0.0, r2).mul(0.5),
    });
    this.cloud.material.color.setRGB(0.42, 0.34, 0.31);
    this.cloud.material.opacity = 1;
    this.sprite = this.cloud.sprite;
    void float;
  }

  puff(x: number, y: number, z: number, vx: number, vy: number, vz: number, life: number, size: number): void {
    if (this.count >= MAX) return;
    const i = this.count++;
    this.pos[i * 3] = x; this.pos[i * 3 + 1] = y; this.pos[i * 3 + 2] = z;
    this.vel[i * 3] = vx; this.vel[i * 3 + 1] = vy; this.vel[i * 3 + 2] = vz;
    this.life[i] = life;
    this.life0[i] = life;
    this.size[i] = size;
  }

  update(dt: number): void {
    for (let i = 0; i < this.count; i++) {
      this.life[i] -= dt;
      if (this.life[i] <= 0) {
        const last = --this.count;
        this.pos.copyWithin(i * 3, last * 3, last * 3 + 3);
        this.vel.copyWithin(i * 3, last * 3, last * 3 + 3);
        this.life[i] = this.life[last];
        this.life0[i] = this.life0[last];
        this.size[i] = this.size[last];
        i--;
        continue;
      }
      // клуб замедляется и растёт
      const k = 1 - Math.min(0.5, dt * 1.6);
      this.vel[i * 3] *= k;
      this.vel[i * 3 + 1] = this.vel[i * 3 + 1] * k - 2.5 * dt;
      this.vel[i * 3 + 2] *= k;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      this.size[i] += dt * 2.2;
    }
    this.sprite.count = this.count;
    this.sprite.visible = this.count > 0;
    this.cloud.touch();
  }
}
