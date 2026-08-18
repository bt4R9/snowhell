import * as THREE from 'three/webgpu';
import { lambert } from '../core/mat';
import { hash2 } from './noise';
import { pisteCenterX, toWorldX, cityWeight } from './features';

// ★ ДИРИЖАБЛИ ПАРОВОГО ГОРОДА. Небо биома живое: над долиной медленно идут
// цеппелины — вытянутый корпус, гондола, кили, — и кладут ТЕНИ на склон
// (см. Terrain.setShips: эллипсы затемнения в шейдере рельефа). Их немного
// (SHIPS), они стримятся вокруг игрока: ушедший далеко назад перерождается
// впереди с новыми параметрами. Позже сюда же придёт босс «Левиафан».

export const SHIPS = 4;

interface Ship {
  x: number; y: number; z: number;   // мировые
  vz: number;                          // ход вдоль долины, м/с (может быть отрицательным)
  len: number;                         // длина корпуса, м
  yaw: number;
  phase: number;
  alive: boolean;
}

export class Airships {
  readonly group = new THREE.Group();
  readonly ships: Ship[] = [];
  /** для теней на рельефе: [x, z, длина, сила] × SHIPS */
  readonly shadowData = new Float32Array(SHIPS * 4);
  private hull: THREE.InstancedMesh;
  private gondola: THREE.InstancedMesh;
  private fin: THREE.InstancedMesh;
  private prop: THREE.InstancedMesh;
  private blade: THREE.InstancedMesh;
  private tmpM = new THREE.Matrix4();
  private tmpQ = new THREE.Quaternion();
  private tmpV = new THREE.Vector3();
  private tmpS = new THREE.Vector3();
  private tmpE = new THREE.Euler();

  constructor() {
    // корпус: сфера, вытянутая в сигару, гранёная (PSX)
    const hullGeo = new THREE.SphereGeometry(1, 12, 8);
    const hullMat = lambert({ color: 0x8c7a66, flatShading: true }); // холст в саже и меди
    this.hull = new THREE.InstancedMesh(hullGeo, hullMat, SHIPS);
    const gondGeo = new THREE.BoxGeometry(1, 1, 1);
    const gondMat = lambert({ color: 0x4a3f36, flatShading: true });
    this.gondola = new THREE.InstancedMesh(gondGeo, gondMat, SHIPS);
    // кили: плоские клинья на корме — четыре штуки крестом (рисуем два скрещенных)
    const finGeo = new THREE.BoxGeometry(1, 1, 1);
    const finMat = lambert({ color: 0x6e5a48, flatShading: true });
    this.fin = new THREE.InstancedMesh(finGeo, finMat, SHIPS * 2);
    // ★ ПРОПЕЛЛЕРЫ в кольцах по бортам (по референсам) — вращаются
    const ringGeo = new THREE.TorusGeometry(1, 0.08, 6, 12);
    this.prop = new THREE.InstancedMesh(ringGeo, lambert({ color: 0x9a7a3a, flatShading: true }), SHIPS * 2);
    const bladeGeo = new THREE.BoxGeometry(1.8, 0.16, 0.05);
    this.blade = new THREE.InstancedMesh(bladeGeo, lambert({ color: 0x3a3230, flatShading: true }), SHIPS * 2);
    for (const m of [this.hull, this.gondola, this.fin, this.prop, this.blade]) {
      m.frustumCulled = false;
      m.count = 0;
      this.group.add(m);
    }
  }

  private spawn(i: number, pz: number, ahead: boolean): void {
    const k = i * 7 + Math.floor(pz / 500);
    // нулевой — «низкий и близкий»: проходит над самой трассой, остальные — фон
    const near = i === 0;
    const z = pz + (ahead ? (near ? 350 + hash2(k, 3) * 400 : 700 + hash2(k, 3) * 900) : -300 + hash2(k, 5) * 500);
    const u = pisteCenterX(z) + (hash2(k, 7) - 0.5) * (near ? 120 : 500);
    const dir = hash2(k, 11) < 0.35 ? -1 : 1; // большинство идут вниз по долине
    this.ships[i] = {
      x: toWorldX(u, z),
      y: 0, // ставится в update от рельефа
      z,
      vz: dir * (6 + hash2(k, 13) * 8),
      len: 70 + hash2(k, 17) * 90,
      yaw: 0,
      phase: hash2(k, 19) * 6.283,
      alive: true,
    };
  }

  update(px: number, pz: number, ground: (x: number, z: number) => number, dt: number, time: number): void {
    const cw = cityWeight(pz);
    const on = cw > 0.02;
    this.group.visible = on;
    if (!on) {
      this.shadowData.fill(0);
      this.ships.length = 0;
      return;
    }
    while (this.ships.length < SHIPS) this.spawn(this.ships.length, pz, true);
    for (let i = 0; i < SHIPS; i++) {
      const s = this.ships[i];
      s.z += s.vz * dt;
      // лёгкий боковой ход и покачивание
      s.x += Math.sin(time * 0.05 + s.phase) * 0.6 * dt;
      // ★ ВЫСОТА — ОТ ИГРОКА, А НЕ ОТ МЕСТНОЙ ЗЕМЛИ. Долина падает на 0.65 м/м:
      // корабль в километре впереди «над своей землёй» оказывался на сотни
      // метров НИЖЕ райдера и читался пятном на склоне. Дирижабль не следует
      // рельефу — он висит на своей высоте, а значит впереди виден на фоне неба.
      const gy = ground(s.x, s.z);
      const py = ground(px, pz);
      const lowK = i === 0 ? 0.35 : 1;
      const want = Math.max(gy + 70, py + 30 + (Math.sin(s.phase) * 45 + 55) * lowK) + Math.sin(time * 0.12 + s.phase) * 6;
      s.y = s.y === 0 ? want : s.y + (want - s.y) * Math.min(1, dt * 0.4);
      s.yaw = s.vz >= 0 ? 0 : Math.PI;
      // ушёл далеко назад или вперёд — перерождается впереди
      if (s.z < pz - 900 || s.z > pz + 2400) this.spawn(i, pz, true);
    }
    // инстансы
    for (let i = 0; i < SHIPS; i++) {
      const s = this.ships[i];
      const L = s.len;
      const R = L * 0.16;
      this.tmpE.set(0, s.yaw + Math.sin(time * 0.08 + s.phase) * 0.06, Math.sin(time * 0.1 + s.phase) * 0.03);
      this.tmpQ.setFromEuler(this.tmpE);
      this.tmpM.compose(this.tmpV.set(s.x, s.y, s.z), this.tmpQ, this.tmpS.set(R, R, L * 0.5));
      this.hull.setMatrixAt(i, this.tmpM);
      // гондола под брюхом, ближе к носу
      const gx = s.x, gy = s.y - R * 1.05, gz = s.z + Math.cos(s.yaw) * L * 0.05;
      this.tmpM.compose(this.tmpV.set(gx, gy, gz), this.tmpQ, this.tmpS.set(R * 0.5, R * 0.45, L * 0.22));
      this.gondola.setMatrixAt(i, this.tmpM);
      // кили на корме: вертикальный и горизонтальный
      const tail = -Math.cos(s.yaw) * L * 0.42;
      this.tmpM.compose(this.tmpV.set(s.x, s.y, s.z + tail), this.tmpQ, this.tmpS.set(R * 0.12, R * 2.2, L * 0.16));
      this.fin.setMatrixAt(i * 2, this.tmpM);
      this.tmpM.compose(this.tmpV.set(s.x, s.y, s.z + tail), this.tmpQ, this.tmpS.set(R * 2.2, R * 0.12, L * 0.16));
      this.fin.setMatrixAt(i * 2 + 1, this.tmpM);
      // пропеллеры по бортам гондолы, лопасти крутятся
      for (let side = 0; side < 2; side++) {
        const sx = side === 0 ? -1 : 1;
        const pr = R * 0.45;
        const ex = s.x + sx * R * 1.15, ey = s.y - R * 0.6, ez = s.z + Math.cos(s.yaw) * L * -0.05;
        // кольцо в плоскости XY (ось — вдоль хода)
        this.tmpE.set(0, s.yaw, 0);
        this.tmpQ.setFromEuler(this.tmpE);
        this.tmpM.compose(this.tmpV.set(ex, ey, ez), this.tmpQ, this.tmpS.set(pr, pr, pr));
        this.prop.setMatrixAt(i * 2 + side, this.tmpM);
        this.tmpE.set(0, s.yaw, time * 9 + s.phase + side);
        this.tmpQ.setFromEuler(this.tmpE);
        this.tmpM.compose(this.tmpV.set(ex, ey, ez), this.tmpQ, this.tmpS.set(pr, pr, pr));
        this.blade.setMatrixAt(i * 2 + side, this.tmpM);
      }
      // тень: эллипс под кораблём (солнце почти в зените — тень под брюхом)
      this.shadowData[i * 4] = s.x + 12;
      this.shadowData[i * 4 + 1] = s.z + 8;
      this.shadowData[i * 4 + 2] = L;
      this.shadowData[i * 4 + 3] = 0.45 * cw;
    }
    this.hull.count = SHIPS;
    this.gondola.count = SHIPS;
    this.fin.count = SHIPS * 2;
    this.prop.count = SHIPS * 2;
    this.blade.count = SHIPS * 2;
    this.prop.instanceMatrix.needsUpdate = true;
    this.blade.instanceMatrix.needsUpdate = true;
    this.hull.instanceMatrix.needsUpdate = true;
    this.gondola.instanceMatrix.needsUpdate = true;
    this.fin.instanceMatrix.needsUpdate = true;
  }
}
