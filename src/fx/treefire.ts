import * as THREE from 'three/webgpu';
import { spriteCloud, SpriteCloud } from './sprites';
import { obstaclesInChunk, CHUNK, volcanoWeight, toValleyU } from '../world/features';
import { hash2 } from '../world/noise';
import { terrainHeight } from '../world/terrain';

/**
 * ★ ГОРЯЩИЙ СУХОСТОЙ. На вулкане деревья стоят обугленные, но мёртвыми
 * палками: склон вокруг раскалён, лава течёт рядом — часть из них обязана
 * гореть. Это и главный источник живого света в биоме, где солнца почти нет.
 *
 * Горят НЕ ВСЕ и не случайно каждый кадр: поджиг решается хешем от координат,
 * то есть одно и то же дерево горит всегда — иначе пламя мигало бы при
 * каждом пересчёте окрестности.
 */
// ★ ПЛАМЯ — ЭТО МНОГО МЕЛКОГО, А НЕ МАЛО КРУПНОГО. Семь сотен точек по
// полметра читались квадратной крупой; язык огня складывается из роя искр.
const MAX = 1800;
const SPAWN_R = 130; // дальше пламя не читается, а частицы стоят денег

export class TreeFire {
  readonly points: THREE.Sprite;
  private cloud: SpriteCloud;
  readonly light = new THREE.PointLight(0xff3a12, 0, 90, 1.8);

  private pos = new Float32Array(MAX * 3);
  private vel = new Float32Array(MAX * 3);
  private age = new Float32Array(MAX);
  private life = new Float32Array(MAX);
  private col = new Float32Array(MAX * 3);
  private psize = new Float32Array(MAX);
  private trees: Array<{ x: number; z: number; y: number; h: number }> = [];
  private scanT = 0;
  private emitAcc = 0;

  constructor() {
    // ★ WebGPU: круглая частица со своим размером — инстансированные спрайты
    this.cloud = spriteCloud({
      count: MAX, pos: this.pos, col: this.col, size: this.psize,
      k: 300, minPx: 1.4, maxPx: 1e4,
      blending: THREE.AdditiveBlending,
      alpha: (r) => r.oneMinus().mul(r.oneMinus()).mul(0.9),
    });
    this.points = this.cloud.sprite;
    for (let i = 0; i < MAX; i++) this.life[i] = -1;
  }

  update(px: number, pz: number, dt: number): void {
    const vw = volcanoWeight(pz);
    this.points.visible = vw > 0.05;
    if (!this.points.visible) {
      this.light.intensity = 0;
      return;
    }

    // список горящих деревьев пересматриваем редко: они не двигаются
    this.scanT -= dt;
    if (this.scanT <= 0) {
      this.scanT = 0.5;
      this.trees.length = 0;
      // ★ ЧАНКИ ИНДЕКСИРУЮТСЯ ПО КООРДИНАТЕ ДОЛИНЫ, А НЕ ПО МИРОВОМУ X.
      // С мировым X поиск уходил в соседние колонки, и деревьев «не было».
      const cx0 = Math.round(toValleyU(px, pz) / CHUNK);
      const cz0 = Math.round(pz / CHUNK);
      const R = SPAWN_R * SPAWN_R;
      for (let dz = -2; dz <= 3 && this.trees.length < 24; dz++) {
        for (let dx = -2; dx <= 2 && this.trees.length < 24; dx++) {
          for (const o of obstaclesInChunk(cx0 + dx, cz0 + dz)) {
            if (o.kind !== 'tree') continue;
            const ddx = o.x - px;
            const ddz = o.z - pz;
            if (ddx * ddx + ddz * ddz > R) continue;
            // горит примерно каждое третье — и всегда одно и то же
            if (hash2(Math.round(o.x * 7.3), Math.round(o.z * 5.9)) > 0.34) continue;
            const h = o.scale * 3.4 * (o.hMul ?? 1);
            this.trees.push({ x: o.x, z: o.z, y: terrainHeight(o.x, o.z), h });
            if (this.trees.length >= 24) break;
          }
        }
      }
    }

    // ближайший костёр светит: в биоме без солнца это единственный тёплый свет
    let best: { x: number; z: number; y: number; h: number } | null = null;
    let bd = Infinity;
    for (const t of this.trees) {
      const d = (t.x - px) ** 2 + (t.z - pz) ** 2;
      if (d < bd) {
        bd = d;
        best = t;
      }
    }
    if (best) {
      this.light.position.set(best.x, best.y + best.h * 0.5, best.z);
      this.light.intensity = 26 * Math.max(0, 1 - Math.sqrt(bd) / SPAWN_R);
    } else {
      this.light.intensity = 0;
    }

    // рождение
    if (this.trees.length) {
      this.emitAcc += dt * 90 * Math.min(6, this.trees.length);
      while (this.emitAcc >= 1) {
        this.emitAcc -= 1;
        const t = this.trees[(Math.random() * this.trees.length) | 0];
        let slot = -1;
        for (let i = 0; i < MAX; i++) {
          if (this.life[i] < 0) {
            slot = i;
            break;
          }
        }
        if (slot < 0) break;
        // пламя идёт по стволу снизу вверх, кверху редеет
        const f = Math.random() ** 0.6;
        const rr = 0.5 * (1 - f * 0.65);
        const a = Math.random() * Math.PI * 2;
        this.pos[slot * 3] = t.x + Math.cos(a) * rr;
        this.pos[slot * 3 + 1] = t.y + 0.3 + f * t.h * 0.85;
        this.pos[slot * 3 + 2] = t.z + Math.sin(a) * rr;
        this.vel[slot * 3] = (Math.random() - 0.5) * 0.7;
        this.vel[slot * 3 + 1] = 1.6 + Math.random() * 2.4;
        this.vel[slot * 3 + 2] = (Math.random() - 0.5) * 0.7;
        this.age[slot] = 0;
        this.life[slot] = 0.35 + Math.random() * 0.6;
        this.psize[slot] = 0.22 + Math.pow(Math.random(), 2.2) * 0.6;
      }
    }

    for (let i = 0; i < MAX; i++) {
      if (this.life[i] < 0) {
        this.pos[i * 3 + 1] = -1e6;
        continue;
      }
      this.age[i] += dt;
      if (this.age[i] > this.life[i]) {
        this.life[i] = -1;
        continue;
      }
      // тёплый воздух ускоряет вверх, язык пламени сужается
      this.vel[i * 3 + 1] += 2.6 * dt;
      this.vel[i * 3] *= 1 - dt * 1.6;
      this.vel[i * 3 + 2] *= 1 - dt * 1.6;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      // белое ядро → жёлтый → оранжевый → тёмный дым
      const k = 1 - this.age[i] / this.life[i];
      const kk = k * k;
      this.col[i * 3] = 2.9 * kk + 0.12;
      this.col[i * 3 + 1] = 1.5 * kk * k + 0.1;
      this.col[i * 3 + 2] = 0.3 * kk * kk + 0.09;
    }
    this.cloud.touch();
  }
}
