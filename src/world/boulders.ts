import * as THREE from 'three/webgpu';
import { lambert } from '../core/mat';
import { spriteCloud, SpriteCloud } from '../fx/sprites';
import { smoothstep, attribute, uniformArray, instanceIndex, varying, vec3, float, mix, sin, uniform } from 'three/tsl';
import { noise2 } from './noise';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type N = any;

/**
 * ★ МОДЕЛЬ ГЛЫБЫ: икосаэдр с двумя подразбиениями (320 граней), вершины рвутся
 * трёхмасштабным шумом ПО НАПРАВЛЕНИЮ (крупные лопасти, сколы, щербина) — тот
 * же приём, что у останцов, иначе выходит мятый шар. Вершинный атрибут aHot —
 * «жила расплава»: впадины между лопастями горячее, гребни — корка. По нему
 * шейдер кладёт светящиеся прожилки, а жар инстанса их разгорает и гасит.
 */
function buildBoulderGeometry(variant: number): THREE.BufferGeometry {
  const g0 = new THREE.IcosahedronGeometry(1, 2);
  const g = g0.index ? g0.toNonIndexed() : g0;
  const pos = g.attributes.position;
  const ph = variant * 7.3 + 1.1;
  const hot = new Float32Array(pos.count);
  const sx = 0.85 + ((variant * 37) % 10) / 30;
  const sy = 0.7 + ((variant * 53) % 10) / 25;
  for (let k = 0; k < pos.count; k++) {
    const x = pos.getX(k), y = pos.getY(k), z = pos.getZ(k);
    const len = Math.hypot(x, y, z) || 1;
    const nx = x / len, ny = y / len, nz = z / len;
    const d1 = noise2(nx * 1.6 + ph, nz * 1.6 - ny * 1.2 + ph);
    const d2 = noise2(nx * 4.1 - ph, nz * 4.1 + ny * 3.3);
    const d3 = noise2(nx * 9.3 + ny * 7.1, nz * 9.3 - ph);
    const d = d1 * 0.3 + d2 * 0.16 + d3 * 0.07;
    const r = 1 + d;
    pos.setXYZ(k, nx * r * sx, ny * r * sy, nz * r);
    // жила: где скол глубже среднего (впадина), там просвечивает расплав
    hot[k] = Math.max(0, Math.min(1, (0.05 - d2 * 0.16 - d3 * 0.07) / 0.14));
  }
  g.setAttribute('aHot', new THREE.Float32BufferAttribute(hot, 1));
  g.computeVertexNormals();
  return g;
}

// ★ ГОРЯЩИЕ ГЛЫБЫ ИЗ ОЗЁР. Мини-извержение иногда выплёвывает раскалённый
// булыжник: он вылетает по баллистике, падает, отскакивает и КАТИТСЯ вниз по
// склону, оставляя огненный след, пока не остынет и не встанет. Физика честная
// и простая: гравитация, отскок по нормали рельефа, качение по градиенту с
// трением. Камень + огонь — как фаербол, но это предмет в мире, а не снаряд по
// рельсам: его можно объехать, перепрыгнуть, а лежачий — препятствие.

export interface Boulder {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  r: number;
  /** жар 0..1: горит и светится, остывает лёжа */
  heat: number;
  age: number;
  /** сколько подряд почти не движется */
  restT: number;
  alive: boolean;
  /** случайные оси для вращения в полёте/качении */
  ax: number; ay: number; az: number;
  ang: number;
  variant: number;
}

const G = 22;          // ускорение свободного падения глыбы, м/с² (между G_AIR игрока и Землёй)
const MAX = 24;
const PER_MESH = 8;   // инстансов на вариант геометрии
const LIFE_REST = 22;  // сколько лежит остывшая, с
const TRAIL_MAX = 700;

export class Boulders {
  readonly group = new THREE.Group();
  readonly list: Boulder[] = [];
  private tmpM = new THREE.Matrix4();
  private tmpQ = new THREE.Quaternion();
  private tmpV = new THREE.Vector3();
  private tmpS = new THREE.Vector3();
  private tmpC = new THREE.Color();
  private nrm = new THREE.Vector3();
  // огненный след
  private trail: SpriteCloud;
  private tPos = new Float32Array(TRAIL_MAX * 3);
  private tVel = new Float32Array(TRAIL_MAX * 3);
  private tLife = new Float32Array(TRAIL_MAX);
  private tLife0 = new Float32Array(TRAIL_MAX);
  private tSize = new Float32Array(TRAIL_MAX);
  private tCol = new Float32Array(TRAIL_MAX * 3);
  private tCount = 0;

  /** ★ ОГНЕННЫЙ СЛЕД НА ЗЕМЛЕ: расплавленная борозда в карте повреждений
   * (та же, что от луча) — светится, остывает и ЖЖЁТ, пока горячая */
  onTrail: ((ax: number, az: number, bx: number, bz: number, r: number, depth: number) => void) | null = null;

  /** жар по инстансам — в шейдер прожилок (свой массив у каждого варианта) */
  private uHeats: N[] = [];
  private uTime = uniform(0);
  private meshes: THREE.InstancedMesh[] = [];

  constructor(private ground: (x: number, z: number) => number, private normal: (x: number, z: number, out: THREE.Vector3) => THREE.Vector3) {
    // ★ ШЕЙДЕР ГЛЫБЫ: тёмная базальтовая корка + светящиеся жилы (aHot), яркость
    // которых задаёт жар инстанса; свежая — почти вся оранжевая с белыми жилами,
    // остывшая — тёмный камень с редкими тлеющими трещинами.
    const uTime = this.uTime;
    for (let v = 0; v < 3; v++) {
      const uHeat = uniformArray(Array.from({ length: PER_MESH }, () => 0));
      this.uHeats.push(uHeat);
      const mat = lambert({ color: 0xffffff, flatShading: true });
      const heat: N = varying(uHeat.element(instanceIndex));
      const aHot: N = attribute('aHot', 'float');
      const crust: N = mix(vec3(0.16, 0.14, 0.13), vec3(0.55, 0.22, 0.09), heat.mul(heat));
      mat.colorNode = mix(crust, vec3(0.9, 0.35, 0.1), aHot.mul(heat).mul(0.5));
      const pulse: N = sin(uTime.mul(6.0).add(aHot.mul(9.0))).mul(0.15).add(0.85);
      // жилы: свечение по aHot, к остыванию гаснут (heat^1.5), корка тлеет чуть-чуть
      (mat as N).emissiveNode = vec3(2.2, 0.8, 0.18).mul(aHot).mul(heat.mul(heat.sqrt())).mul(pulse)
        .add(vec3(0.5, 0.12, 0.02).mul(heat).mul(heat));
      const m = new THREE.InstancedMesh(buildBoulderGeometry(v), mat, PER_MESH);
      m.count = 0;
      m.frustumCulled = false;
      this.group.add(m);
      this.meshes.push(m);
    }
    void float;

    this.trail = spriteCloud({
      count: 0, pos: this.tPos, size: this.tSize, col: this.tCol,
      k: 120, minPx: 1, maxPx: 70,
      blending: THREE.AdditiveBlending, depthWrite: false,
      alpha: (r2) => smoothstep(1.0, 0.0, r2).mul(0.7),
    });
    this.group.add(this.trail.sprite);
  }

  /**
   * Выстрелить глыбу из точки (x, y, z) — из озера. Если задана цель (tx, tz):
   * ★ БЬЁТ ПО ХОДУ ИГРОКА — в точку, где тот будет через время полёта, с
   * разбросом; баллистика решается под выбранное время полёта.
   */
  launch(x: number, y: number, z: number, tx?: number, tz?: number): void {
    if (this.list.length >= MAX) return;
    let az = Math.random() * Math.PI * 2;
    let el = (52 + Math.random() * 22) * (Math.PI / 180);
    let sp = 22 + Math.random() * 16;
    if (tx !== undefined && tz !== undefined) {
      const dx = tx - x;
      const dz = tz - z;
      const dist = Math.hypot(dx, dz);
      const T = 2.4 + Math.min(2.6, dist / 45);          // время полёта
      const ty = this.ground(tx, tz);
      const vh = dist / T;
      const vy = (ty - (y + 1) + 0.5 * G * T * T) / T;
      az = Math.atan2(dz, dx);
      sp = Math.hypot(vh, vy);
      el = Math.atan2(vy, vh);
    }
    // ★ КРУПНЫЕ: 2.5–6 м — это глыба, а не камешек
    const r = 2.5 + Math.pow(Math.random(), 1.4) * 3.5;
    this.list.push({
      x, y: y + 1, z,
      vx: Math.cos(az) * Math.cos(el) * sp, vy: Math.sin(el) * sp, vz: Math.sin(az) * Math.cos(el) * sp,
      r, heat: 1, age: 0, restT: 0, alive: true,
      ax: Math.random() - 0.5, ay: Math.random() - 0.5, az: Math.random() - 0.5, ang: 0,
      variant: Math.floor(Math.random() * 3),
    });
  }

  private puff(x: number, y: number, z: number, vx: number, vy: number, vz: number, life: number, size: number, r: number, g: number, b: number): void {
    if (this.tCount >= TRAIL_MAX) return;
    const i = this.tCount++;
    this.tPos[i * 3] = x; this.tPos[i * 3 + 1] = y; this.tPos[i * 3 + 2] = z;
    this.tVel[i * 3] = vx; this.tVel[i * 3 + 1] = vy; this.tVel[i * 3 + 2] = vz;
    this.tLife[i] = life; this.tLife0[i] = life; this.tSize[i] = size;
    this.tCol[i * 3] = r; this.tCol[i * 3 + 1] = g; this.tCol[i * 3 + 2] = b;
  }

  update(dt: number): void {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const b = this.list[i];
      b.age += dt;
      const gy = this.ground(b.x, b.z);
      const onGround = b.y - b.r <= gy + 0.05;
      const spd = Math.hypot(b.vx, b.vy, b.vz);
      if (!onGround || b.vy > 0.5) {
        // полёт
        b.vy -= G * dt;
        b.x += b.vx * dt; b.y += b.vy * dt; b.z += b.vz * dt;
        const g2 = this.ground(b.x, b.z);
        if (b.y - b.r < g2) {
          // удар: отскок по нормали, часть энергии в тепло
          b.y = g2 + b.r;
          const n = this.normal(b.x, b.z, this.nrm);
          const vn = b.vx * n.x + b.vy * n.y + b.vz * n.z;
          if (vn < 0) {
            const rest = 0.32;
            b.vx -= (1 + rest) * vn * n.x;
            b.vy -= (1 + rest) * vn * n.y;
            b.vz -= (1 + rest) * vn * n.z;
            // касательная скорость гасится трением удара
            b.vx *= 0.75; b.vz *= 0.75; b.vy *= 0.75;
            // брызги искр при ударе
            for (let k = 0; k < 10; k++) {
              this.puff(b.x, b.y, b.z, (Math.random() - 0.5) * 9, 3 + Math.random() * 6, (Math.random() - 0.5) * 9, 0.4 + Math.random() * 0.4, 0.5 + Math.random() * 0.6, 3.0, 1.2, 0.3);
            }
          }
        }
        b.ang += spd * dt / Math.max(0.5, b.r) * 0.6;
      } else {
        // качение: сила тяжести вдоль склона минус трение
        const n = this.normal(b.x, b.z, this.nrm);
        // компонента g вдоль поверхности: g − (g·n)n, g = (0,−G,0)
        const gx = -(-G * n.y) * n.x;
        const gz = -(-G * n.y) * n.z;
        b.vx += gx * dt * 0.7; // 0.7 — катится, а не скользит (момент инерции)
        b.vz += gz * dt * 0.7;
        const hs = Math.hypot(b.vx, b.vz);
        const fr = (0.9 + hs * 0.02 + hs * hs * 0.004) * dt; // трение качения растёт со скоростью: предел ~25 м/с
        const k = hs > 0 ? Math.max(0, hs - fr) / hs : 0;
        b.vx *= k; b.vz *= k;
        const ox = b.x, oz = b.z;
        b.x += b.vx * dt; b.z += b.vz * dt;
        b.y = this.ground(b.x, b.z) + b.r;
        b.vy = 0;
        // горячая глыба прожигает след, пока катится
        if (this.onTrail && b.heat > 0.15 && hs > 0.5) this.onTrail(ox, oz, b.x, b.z, b.r * 1.1, 0.35 * b.heat);
        b.ang += hs * dt / Math.max(0.5, b.r);
        if (hs < 0.4) b.restT += dt; else b.restT = 0;
        // ★ ОСТЫВАЕТ, ЛЁЖА И КАТЯСЬ: горит секунд десять, потом тускнеет
        b.heat = Math.max(0, b.heat - dt * (b.restT > 0 ? 0.09 : 0.05));
      }
      // огненный след: искры и дым, пока горячая
      if (b.heat > 0.05) {
        const nP = onGround ? 1 : 2;
        for (let k = 0; k < nP; k++) {
          const hot = b.heat;
          this.puff(
            b.x + (Math.random() - 0.5) * b.r, b.y + (Math.random() - 0.3) * b.r, b.z + (Math.random() - 0.5) * b.r,
            -b.vx * 0.15 + (Math.random() - 0.5) * 2, 2 + Math.random() * 3, -b.vz * 0.15 + (Math.random() - 0.5) * 2,
            0.3 + Math.random() * 0.4 * hot, (0.5 + Math.random() * 0.5) * (0.6 + b.r * 0.15),
            2.0 * hot + 0.15, 0.6 * hot + 0.04, 0.1 * hot
          );
        }
      }
      // остывшая и лежащая — исчезает (уходит в землю) через LIFE_REST
      if (b.heat <= 0 && b.restT > LIFE_REST) b.alive = false;
      if (b.age > 90) b.alive = false;
      if (!b.alive) this.list.splice(i, 1);
    }

    // инстансы: по вариантам геометрии; жар — в uHeat по индексу инстанса
    // (все три меша делят один материал и один массив: слоты не пересекаются,
    // потому что индекс = позиция в общем списке)
    const counts = [0, 0, 0];
    for (let i = 0; i < this.list.length; i++) {
      const b = this.list[i];
      const m = this.meshes[b.variant];
      const slot = counts[b.variant]++;
      if (slot >= PER_MESH) continue;
      this.tmpV.set(b.ax, b.ay, b.az).normalize();
      this.tmpQ.setFromAxisAngle(this.tmpV, b.ang);
      this.tmpS.setScalar(b.r);
      this.tmpM.compose(this.tmpV.set(b.x, b.y, b.z), this.tmpQ, this.tmpS);
      m.setMatrixAt(slot, this.tmpM);
      if (slot < PER_MESH) (this.uHeats[b.variant].array as number[])[slot] = b.heat;
    }
    for (let v = 0; v < 3; v++) {
      const m = this.meshes[v];
      m.count = Math.min(PER_MESH, counts[v]);
      m.instanceMatrix.needsUpdate = true;
      m.visible = counts[v] > 0;
    }
    this.uTime.value += dt;

    // след
    for (let i = 0; i < this.tCount; i++) {
      this.tLife[i] -= dt;
      if (this.tLife[i] <= 0) {
        const last = --this.tCount;
        this.tPos.copyWithin(i * 3, last * 3, last * 3 + 3);
        this.tVel.copyWithin(i * 3, last * 3, last * 3 + 3);
        this.tCol.copyWithin(i * 3, last * 3, last * 3 + 3);
        this.tLife[i] = this.tLife[last]; this.tLife0[i] = this.tLife0[last]; this.tSize[i] = this.tSize[last];
        i--;
        continue;
      }
      const k = 1 - Math.min(0.5, dt * 2.5);
      this.tVel[i * 3] *= k; this.tVel[i * 3 + 2] *= k;
      this.tPos[i * 3] += this.tVel[i * 3] * dt;
      this.tPos[i * 3 + 1] += this.tVel[i * 3 + 1] * dt;
      this.tPos[i * 3 + 2] += this.tVel[i * 3 + 2] * dt;
      this.tSize[i] += dt * 1.0;
      // гаснет к концу жизни
      const t = this.tLife[i] / this.tLife0[i];
      const f = Math.min(1, t * 2.5);
      this.tCol[i * 3] *= 0.5 + 0.5 * f; this.tCol[i * 3 + 1] *= 0.5 + 0.5 * f;
    }
    this.trail.sprite.count = this.tCount;
    this.trail.sprite.visible = this.tCount > 0;
    this.trail.touch();
  }

  /**
   * Задела ли глыба игрока: возвращает силу 0..1 (по скорости) или 0.
   * Проверяется сфера глыбы против капсулы райдера (низ доски … +1.7 м).
   */
  hitPlayer(px: number, py: number, pz: number): { push: number; dx: number; dz: number; heat: number; b: Boulder } | null {
    for (const b of this.list) {
      const dx = px - b.x;
      const dz = pz - b.z;
      const rr = b.r + 0.7;
      if (dx * dx + dz * dz > rr * rr) continue;
      const cy = Math.max(py, Math.min(py + 1.7, b.y));
      if (Math.abs(cy - b.y) > b.r + 0.4) continue;
      const d = Math.sqrt(dx * dx + dz * dz) || 0.01;
      const spd = Math.hypot(b.vx, b.vz);
      return { push: Math.min(1, spd / 18), dx: dx / d, dz: dz / d, heat: b.heat, b };
    }
    return null;
  }
}
