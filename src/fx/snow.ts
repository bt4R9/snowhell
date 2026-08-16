import * as THREE from 'three';

// Спрей из-под доски + лёгкий снегопад вокруг камеры. Всё на THREE.Points.

const SPRAY_MAX = 900;

export class Spray {
  points: THREE.Points;
  /** ★ ЦВЕТ БРЫЗГ ЗАДАЁТ БИОМ. Из-под доски летит то, по чему едешь: на снегу
   * белая пыль, на вулкане — серый пепел. Белые брызги посреди пепла читались
   * снегом сильнее, чем любая другая деталь. */
  private mat!: THREE.PointsMaterial;

  setTint(c: THREE.Color, opacity: number): void {
    this.mat.color.copy(c);
    this.mat.opacity = opacity;
  }

  private positions = new Float32Array(SPRAY_MAX * 3);
  private velocities = new Float32Array(SPRAY_MAX * 3);
  private life = new Float32Array(SPRAY_MAX);
  private count = 0;
  private geo = new THREE.BufferGeometry();
  private emitAcc = 0;

  constructor() {
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geo.setDrawRange(0, 0);
    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.11,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    this.mat = mat;
    this.points = new THREE.Points(this.geo, mat);
    this.points.frustumCulled = false;
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
    this.geo.setDrawRange(0, this.count);
    this.geo.attributes.position.needsUpdate = true;
  }
}

// плотнее и ближе к камере: летящий снег — второй по силе маркер скорости
const FLAKES = 1100;
// box не должен подходить вплотную к камере: точки с sizeAttenuation
// вблизи превращаются в огромные квадраты
const BOX = new THREE.Vector3(64, 32, 64);

export class Snowfall {
  /** для менеджера биомов: в воздухе не всегда снег — на вулкане это пепел */
  readonly mat: THREE.PointsMaterial;

  points: THREE.Points;
  private positions = new Float32Array(FLAKES * 3);
  private drift = new Float32Array(FLAKES);
  private geo = new THREE.BufferGeometry();

  constructor(center: THREE.Vector3) {
    for (let i = 0; i < FLAKES; i++) {
      this.positions[i * 3] = center.x + (Math.random() - 0.5) * BOX.x;
      this.positions[i * 3 + 1] = center.y + (Math.random() - 0.5) * BOX.y;
      this.positions[i * 3 + 2] = center.z + (Math.random() - 0.5) * BOX.z;
      this.drift[i] = 1.5 + Math.random() * 2.5;
    }
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.075,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    this.mat = mat;
    this.points = new THREE.Points(this.geo, mat);
    this.points.frustumCulled = false;
  }

  /** Хлопья неподвижны в мире и заворачиваются в box вокруг камеры */
  update(dt: number, center: THREE.Vector3): void {
    for (let i = 0; i < FLAKES; i++) {
      let x = this.positions[i * 3];
      let y = this.positions[i * 3 + 1] - this.drift[i] * dt;
      let z = this.positions[i * 3 + 2];
      x += Math.sin(y * 0.5 + i) * dt * 0.8;
      // wrap в box вокруг камеры (mod с сохранением мировой позиции)
      x -= Math.round((x - center.x) / BOX.x) * BOX.x;
      y -= Math.round((y - center.y) / BOX.y) * BOX.y;
      z -= Math.round((z - center.z) / BOX.z) * BOX.z;
      this.positions[i * 3] = x;
      this.positions[i * 3 + 1] = y;
      this.positions[i * 3 + 2] = z;
    }
    this.geo.attributes.position.needsUpdate = true;
  }
}
