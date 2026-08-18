import * as THREE from 'three/webgpu';
import { lambert } from '../core/mat';
import { hash2 } from './noise';
import { railsNearWorld, Rail, cityWeight } from './features';
import { railHeights } from './terrain';

// ★ ВАГОНЕТКИ УЗКОКОЛЕЙКИ — первое ДВИЖУЩЕЕСЯ препятствие. В паровом городе
// рейлы — это рельсы, и по ним ходят вагонетки с рудой: вверх и вниз, с
// расписанием, лязгая. На грайнде вагонетку надо догнать и спрыгнуть или
// перепрыгнуть; на земле — не стоять на путях. Вагонетка живёт на дуговой
// координате рейла (та же, что у грайнда игрока), поэтому попадание меряется
// одним числом.

export interface Cart {
  rail: Rail;
  arc: number;      // дуговая координата вдоль полилинии
  vel: number;      // м/с, знак — направление
  seed: number;
  x: number; y: number; z: number;
  fx: number; fz: number; // направление хода (единичное, в плане)
}

const MAX = 24;

export class Carts {
  readonly group = new THREE.Group();
  readonly list: Cart[] = [];
  private byRail = new Map<string, Cart[]>();
  private body: THREE.InstancedMesh;
  private ore: THREE.InstancedMesh;
  private tmpM = new THREE.Matrix4();
  private tmpQ = new THREE.Quaternion();
  private tmpV = new THREE.Vector3();
  private tmpS = new THREE.Vector3();
  private tmpE = new THREE.Euler();
  private acc = 0;

  constructor() {
    const bodyGeo = new THREE.BoxGeometry(1.4, 0.9, 2.2);
    bodyGeo.translate(0, 0.65, 0);
    this.body = new THREE.InstancedMesh(bodyGeo, lambert({ color: 0x3e3634, flatShading: true }), MAX);
    const oreGeo = new THREE.BoxGeometry(1.1, 0.5, 1.8);
    oreGeo.translate(0, 1.15, 0);
    this.ore = new THREE.InstancedMesh(oreGeo, lambert({ color: 0x8a5a2e, flatShading: true }), MAX);
    for (const m of [this.body, this.ore]) {
      m.count = 0;
      m.frustumCulled = false;
      this.group.add(m);
    }
  }

  /** положение и направление на дуге рейла */
  private place(c: Cart): void {
    const r = c.rail;
    const ys = railHeights(r);
    let s = 0;
    let acc = 0;
    while (s < r.segLen.length - 1 && c.arc > acc + r.segLen[s]) {
      acc += r.segLen[s];
      s++;
    }
    const t = Math.max(0, Math.min(1, (c.arc - acc) / r.segLen[s]));
    const a = r.pts[s];
    c.x = a.x + r.segDirX[s] * r.segLen[s] * t;
    c.z = a.z + r.segDirZ[s] * r.segLen[s] * t;
    c.y = ys[s] + (ys[s + 1] - ys[s]) * t;
    c.fx = r.segDirX[s] * Math.sign(c.vel || 1);
    c.fz = r.segDirZ[s] * Math.sign(c.vel || 1);
  }

  update(px: number, pz: number, dt: number): void {
    const on = cityWeight(pz) > 0.3;
    this.group.visible = on;
    if (!on) {
      if (this.list.length) { this.list.length = 0; this.byRail.clear(); }
      return;
    }
    // ★ РЕЙЛЫ ВОКРУГ ИГРОКА: раз в полсекунды пересобираем список; у каждого
    // рейла в городе 1–2 вагонетки, чьи стартовые фазы — от хэша ключа
    this.acc += dt;
    if (this.acc > 0.5) {
      this.acc = 0;
      const rails = railsNearWorld(px, pz);
      const alive = new Set<string>();
      for (const r of rails) {
        alive.add(r.key);
        if (this.byRail.has(r.key)) continue;
        const h = hash2(r.key.length * 31 + r.pts[0].z, 17);
        const n = h < 0.55 ? 1 : 2;
        const carts: Cart[] = [];
        for (let i = 0; i < n && this.list.length < MAX; i++) {
          const seed = hash2(r.pts[0].z * 3 + i * 7, 29);
          const c: Cart = {
            rail: r,
            arc: (0.2 + hash2(r.pts[0].x + i, 31) * 0.6) * r.totalLen,
            vel: (i === 0 ? 1 : -1) * (7 + seed * 6),
            seed, x: 0, y: 0, z: 0, fx: 0, fz: 1,
          };
          this.place(c);
          carts.push(c);
          this.list.push(c);
        }
        this.byRail.set(r.key, carts);
      }
      for (const key of [...this.byRail.keys()]) {
        if (alive.has(key)) continue;
        const cs = this.byRail.get(key)!;
        for (const c of cs) {
          const i = this.list.indexOf(c);
          if (i >= 0) this.list.splice(i, 1);
        }
        this.byRail.delete(key);
      }
    }
    // ход: туда-обратно вдоль рейла, у концов разворот
    for (const c of this.list) {
      c.arc += c.vel * dt;
      if (c.arc > c.rail.totalLen - 2) { c.arc = c.rail.totalLen - 2; c.vel = -Math.abs(c.vel); }
      if (c.arc < 2) { c.arc = 2; c.vel = Math.abs(c.vel); }
      this.place(c);
    }
    // инстансы
    for (let i = 0; i < this.list.length; i++) {
      const c = this.list[i];
      const yaw = Math.atan2(c.fx, c.fz);
      this.tmpE.set(0, yaw, 0);
      this.tmpQ.setFromEuler(this.tmpE);
      this.tmpM.compose(this.tmpV.set(c.x, c.y - 0.15, c.z), this.tmpQ, this.tmpS.set(1, 1, 1));
      this.body.setMatrixAt(i, this.tmpM);
      this.ore.setMatrixAt(i, this.tmpM);
    }
    this.body.count = this.list.length;
    this.ore.count = this.list.length;
    this.body.instanceMatrix.needsUpdate = true;
    this.ore.instanceMatrix.needsUpdate = true;
  }

  /** ближайшая вагонетка к точке (в плане и по высоте) — для столкновений */
  nearest(x: number, y: number, z: number, r: number): Cart | null {
    let best: Cart | null = null;
    let bd = r * r;
    for (const c of this.list) {
      const dx = c.x - x, dz = c.z - z;
      const d2 = dx * dx + dz * dz;
      if (d2 < bd && Math.abs(c.y - y) < 2.2) { bd = d2; best = c; }
    }
    return best;
  }
}
