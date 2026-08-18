import * as THREE from 'three/webgpu';
import { Fn, uniform, vec3, sin, positionWorld, float } from 'three/tsl';
import { lambert } from '../core/mat';
import { hash2 } from './noise';
import { CHUNK, PISTE_HALF_W, pisteCenterX, toWorldX, nightWeight, lakeAt } from './features';
import { PALETTE } from './palette';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type N = any;

// ★ ЛЕДЯНЫЕ КРИСТАЛЛЫ — ПРИМЕТА ПОЛЯРНОЙ НОЧИ. Без своих деталей биом читался
// «первой зимней картой»; кристаллы стоят кустами вдоль трассы (за кромкой,
// без коллизии — это декорация), тлеют изнутри бледно-голубым и дышат в такт
// сиянию. Инстансы одной гранёной призмы; набор перестраивается по чанкам.

const MAX = 700;
const RANGE = 12; // чанков вперёд/назад

export class Crystals {
  readonly group = new THREE.Group();
  private mesh: THREE.InstancedMesh;
  private uAurora = uniform(0);
  private uTime = uniform(0);
  private lastChunk = 1e9;
  private tmpM = new THREE.Matrix4();
  private tmpQ = new THREE.Quaternion();
  private tmpE = new THREE.Euler();
  private tmpV = new THREE.Vector3();
  private tmpS = new THREE.Vector3();

  constructor(private ground: (x: number, z: number) => number) {
    // гранёная призма: узкая кверху, чуть шире у основания
    const geo = new THREE.CylinderGeometry(0.12, 0.5, 1, 6, 1);
    geo.translate(0, 0.5, 0);
    const g = geo.index ? geo.toNonIndexed() : geo;
    g.computeVertexNormals();
    const mat = lambert({ color: 0x9fbfe6, flatShading: true });
    const uAurora = this.uAurora;
    const uTime = this.uTime;
    const glow: N = sin(uTime.mul(0.7).add(positionWorld.x.mul(0.15)).add(positionWorld.z.mul(0.07))).mul(0.5).add(0.5);
    (mat as N).emissiveNode = vec3(0.10, 0.36, 0.55).mul(glow.mul(0.6).add(0.25)).mul(uAurora.mul(0.7).add(0.3));
    this.mesh = new THREE.InstancedMesh(g, mat, MAX);
    this.mesh.count = 0;
    this.mesh.frustumCulled = false;
    this.group.add(this.mesh);
    void float;
  }

  update(pz: number, dt: number): void {
    this.uTime.value += dt;
    this.uAurora.value = PALETTE.aurora;
    const cz = Math.round(pz / CHUNK);
    if (cz === this.lastChunk) return;
    this.lastChunk = cz;
    let n = 0;
    for (let c = cz - 4; c <= cz + RANGE && n < MAX; c++) {
      const z0 = c * CHUNK;
      if (nightWeight(z0) < 0.6) continue;
      // 0–2 куста на чанк
      const kn = hash2(c * 131 + 5, 17) < 0.55 ? (hash2(c * 137 + 9, 19) < 0.5 ? 1 : 2) : 0;
      for (let k = 0; k < kn && n < MAX; k++) {
        const side = hash2(c * 149 + k, 23) < 0.5 ? -1 : 1;
        const z = z0 + hash2(c * 151 + k, 29) * CHUNK;
        const off = PISTE_HALF_W + 10 + hash2(c * 157 + k, 31) * 40;
        const u = pisteCenterX(z) + side * off;
        const lk = lakeAt(u, z);
        if (lk && lk.w > 0.2) continue;
        const cnt = 4 + Math.floor(hash2(c * 163 + k, 37) * 5);
        const cx = toWorldX(u, z);
        for (let i = 0; i < cnt && n < MAX; i++) {
          const a = hash2(c * 167 + k * 11 + i, 41);
          const b = hash2(c * 173 + k * 13 + i, 43);
          const r = 1 + b * 3.5;
          const x = cx + Math.cos(a * 6.283) * r;
          const zz = z + Math.sin(a * 6.283) * r;
          const y = this.ground(x, zz) - 0.3;
          const h = 1.6 + hash2(c * 179 + k * 17 + i, 47) * 5.5;
          const w = 0.6 + hash2(c * 181 + k * 19 + i, 53) * 0.9;
          this.tmpE.set((a - 0.5) * 0.5, b * 6.283, (b - 0.5) * 0.5);
          this.tmpQ.setFromEuler(this.tmpE);
          this.tmpS.set(w, h, w);
          this.tmpM.compose(this.tmpV.set(x, y, zz), this.tmpQ, this.tmpS);
          this.mesh.setMatrixAt(n++, this.tmpM);
        }
      }
    }
    this.mesh.count = n;
    this.mesh.instanceMatrix.needsUpdate = true;
    this.mesh.visible = n > 0;
  }
}
