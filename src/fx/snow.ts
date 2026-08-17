import * as THREE from 'three/webgpu';
import { Fn, float, vec3, uniform, instancedArray, instanceIndex, sin, round } from 'three/tsl';
import { spriteCloud, SpriteCloud } from './sprites';

// Спрей из-под доски + лёгкий снегопад вокруг камеры.
//
// ★ WebGPU: обе системы — инстансированные спрайты (см. sprites.ts). Спрей
// эмитится с CPU (его рождают события: приземление, поворот), а снегопад
// СЧИТАЕТСЯ НА GPU: у него нет ни эмиссии, ни событий — только тысяча
// хлопьев, которые падают, качаются и заворачиваются в коробку вокруг
// камеры. Это ровно тот случай, ради которого нужен compute: буфер позиций
// живёт в видеопамяти, шейдер сдвигает все хлопья за один вызов, и на CPU
// не остаётся ни цикла, ни загрузки атрибута.

const SPRAY_MAX = 900;

export class Spray {
  points: THREE.Sprite;
  /** ★ ЦВЕТ БРЫЗГ ЗАДАЁТ БИОМ. Из-под доски летит то, по чему едешь: на снегу
   * белая пыль, на вулкане — серый пепел. Белые брызги посреди пепла читались
   * снегом сильнее, чем любая другая деталь. */
  private mat: THREE.PointsNodeMaterial;

  setTint(c: THREE.Color, opacity: number): void {
    this.mat.color.copy(c);
    this.mat.opacity = opacity;
  }

  private positions = new Float32Array(SPRAY_MAX * 3);
  private velocities = new Float32Array(SPRAY_MAX * 3);
  private life = new Float32Array(SPRAY_MAX);
  private count = 0;
  private cloud: SpriteCloud;
  private emitAcc = 0;

  constructor() {
    // PointsMaterial size=0.11 с аттенюацией: px = 0.11 × (полвысоты буфера) / dist
    this.cloud = spriteCloud({
      count: 0, pos: this.positions,
      fixedSize: 0.11, k: 120, minPx: 0, maxPx: 1e4,
      materialColor: true,
      alpha: () => float(1.0),
    });
    this.mat = this.cloud.material;
    this.mat.color.set(0xffffff);
    this.mat.opacity = 0.6;
    this.points = this.cloud.sprite;
  }

  /** rate — частиц в секунду; вызывается каждый кадр пока едем */
  emit(origin: THREE.Vector3, baseVel: THREE.Vector3, rate: number, dt: number): void {
    this.emitAcc += rate * dt;
    while (this.emitAcc >= 1) {
      this.emitAcc -= 1;
      this.spawn(origin, baseVel);
    }
  }

  burst(origin: THREE.Vector3, baseVel: THREE.Vector3, n: number): void {
    for (let i = 0; i < n; i++) this.spawn(origin, baseVel);
  }

  private spawn(origin: THREE.Vector3, baseVel: THREE.Vector3): void {
    if (this.count >= SPRAY_MAX) return;
    const i = this.count++;
    this.positions[i * 3] = origin.x + (Math.random() - 0.5) * 0.5;
    this.positions[i * 3 + 1] = origin.y + Math.random() * 0.15;
    this.positions[i * 3 + 2] = origin.z + (Math.random() - 0.5) * 0.5;
    // низко и в стороны, а не вверх за спину — чтобы не летел в камеру
    this.velocities[i * 3] = baseVel.x * 0.08 + (Math.random() - 0.5) * 3.5;
    this.velocities[i * 3 + 1] = 0.5 + Math.random() * 1.1;
    this.velocities[i * 3 + 2] = baseVel.z * 0.08 + (Math.random() - 0.5) * 3.5;
    this.life[i] = 0.2 + Math.random() * 0.3;
  }

  update(dt: number): void {
    for (let i = 0; i < this.count; i++) {
      this.life[i] -= dt;
      if (this.life[i] <= 0) {
        // компактируем: переносим последнюю живую частицу на место умершей
        const last = --this.count;
        this.positions.copyWithin(i * 3, last * 3, last * 3 + 3);
        this.velocities.copyWithin(i * 3, last * 3, last * 3 + 3);
        this.life[i] = this.life[last];
        i--;
        continue;
      }
      this.velocities[i * 3 + 1] -= 14 * dt;
      this.positions[i * 3] += this.velocities[i * 3] * dt;
      this.positions[i * 3 + 1] += this.velocities[i * 3 + 1] * dt;
      this.positions[i * 3 + 2] += this.velocities[i * 3 + 2] * dt;
    }
    // живых частиц — столько инстансов и рисуем; ноль инстансов — не рисуем вовсе
    this.points.count = this.count;
    this.points.visible = this.count > 0;
    this.cloud.touch();
  }
}

// плотнее и ближе к камере: летящий снег — второй по силе маркер скорости
const FLAKES = 1100;
// box не должен подходить вплотную к камере: точки с sizeAttenuation
// вблизи превращаются в огромные квадраты
const BOX = new THREE.Vector3(64, 32, 64);

export class Snowfall {
  /** для менеджера биомов: в воздухе не всегда снег — на вулкане это пепел */
  readonly mat: THREE.PointsNodeMaterial;

  points: THREE.Sprite;
  private uCenter = uniform(new THREE.Vector3());
  private uDt = uniform(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private kernel: any;

  constructor(center: THREE.Vector3, private renderer: THREE.WebGPURenderer) {
    // стартовое облако считаем на CPU один раз — дальше буферы живут на GPU
    const pos = new Float32Array(FLAKES * 3);
    const drift = new Float32Array(FLAKES);
    for (let i = 0; i < FLAKES; i++) {
      pos[i * 3] = center.x + (Math.random() - 0.5) * BOX.x;
      pos[i * 3 + 1] = center.y + (Math.random() - 0.5) * BOX.y;
      pos[i * 3 + 2] = center.z + (Math.random() - 0.5) * BOX.z;
      drift[i] = 1.5 + Math.random() * 2.5;
    }
    const posBuf = instancedArray(pos, 'vec3');
    const driftBuf = instancedArray(drift, 'float');

    // ★ ХЛОПЬЯ НЕПОДВИЖНЫ В МИРЕ и заворачиваются в box вокруг камеры (mod с
    // сохранением мировой позиции). Один вызов на все хлопья.
    const uCenter = this.uCenter;
    const uDt = this.uDt;
    this.kernel = Fn(() => {
      const p = posBuf.element(instanceIndex);
      const d = driftBuf.element(instanceIndex);
      const i = float(instanceIndex);
      const x = p.x.toVar();
      const y = p.y.sub(d.mul(uDt)).toVar();
      const z = p.z.toVar();
      x.addAssign(sin(y.mul(0.5).add(i)).mul(uDt).mul(0.8));
      x.subAssign(round(x.sub(uCenter.x).div(BOX.x)).mul(BOX.x));
      y.subAssign(round(y.sub(uCenter.y).div(BOX.y)).mul(BOX.y));
      z.subAssign(round(z.sub(uCenter.z).div(BOX.z)).mul(BOX.z));
      p.assign(vec3(x, y, z));
    })().compute(FLAKES);

    // PointsMaterial size=0.075 с аттенюацией: px = 0.075 × (полвысоты буфера) / dist
    const cloud = spriteCloud({
      count: FLAKES,
      positionNode: posBuf.toAttribute(),
      fixedSize: 0.075, k: 120, minPx: 0, maxPx: 1e4,
      materialColor: true,
      alpha: () => float(1.0),
    });
    this.mat = cloud.material;
    this.mat.color.set(0xffffff);
    this.mat.opacity = 0.55;
    this.points = cloud.sprite;
  }

  /** сдвинуть хлопья на dt: один compute-вызов вместо цикла по 1100 точкам */
  update(dt: number, center: THREE.Vector3): void {
    this.uCenter.value.copy(center);
    this.uDt.value = dt;
    void this.renderer.compute(this.kernel);
  }
}
