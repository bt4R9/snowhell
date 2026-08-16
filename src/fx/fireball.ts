import * as THREE from 'three';
import { bombList, impactList, type Bomb } from '../world/lava';
import { addCrater, ageCraters, craterData } from './craters';

/**
 * ★ ФАЕРБОЛ — ЭТО СОБЫТИЕ, А НЕ ТОЧКА. Раньше снаряд был одним пикселем
 * PointsMaterial: он ничего не обещал заранее, ничем не заканчивался и на фоне
 * светящейся лавы попросту терялся. Здесь у него три части, и каждая нужна:
 *
 *  • ЯДРО — крупный спрайт с белым центром и рваной каймой; по нему читается,
 *    куда летит;
 *  • ХВОСТ — частицы, отстающие по дуге и остывающие от белого к дыму; по нему
 *    читается, ОТКУДА летит, и виден он куда дальше самого ядра;
 *  • МЕТКА — круг на земле в точке падения, который сжимается к моменту удара.
 *    Без неё уворачиваться нельзя: снаряд приходит сверху, и в момент, когда
 *    его видно, бежать уже поздно.
 *
 * Удар даёт взрыв: разлёт углей вверх и в стороны плюс короткая вспышка света.
 */

/** сколько частиц живёт одновременно — хвосты и взрывы делят один буфер */
const MAX = 1400;
const HEADS = 48;
/** сколько меток падения рисуем разом (ближайшие) */
const MARKS = 8;
const MARK_SEG = 20;
/**
 * ★ МЕТКА ОБЯЗАНА СОВПАДАТЬ С ПОРАЖЕНИЕМ. Круг рисовался в полтора радиуса
 * снаряда, а ударная волна бьёт на 4.6 — игрок объезжал метку по краю и всё
 * равно ловил взрыв. Это то же число, что в blastHitsPlayer.
 */
const BLAST_K = 4.6;

const HEAD_FRAG = /* glsl */ `
varying vec3 vCol;
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float r = length(p);
  if (r > 1.0) discard;
  // белое ядро → оранжевая корона → рваный край
  float core = pow(max(0.0, 1.0 - r), 2.2);
  float halo = pow(max(0.0, 1.0 - r), 0.6);
  vec3 c = vCol * halo + vec3(1.6, 1.2, 0.7) * core;
  gl_FragColor = vec4(c, min(1.0, halo * 1.4));
}
`;

export class Fireballs {
  readonly group = new THREE.Group();
  /** вспышка последнего взрыва */
  readonly light = new THREE.PointLight(0xff7a20, 0, 160, 1.7);

  private pos = new Float32Array(MAX * 3);
  private vel = new Float32Array(MAX * 3);
  private col = new Float32Array(MAX * 3);
  private size = new Float32Array(MAX);
  private age = new Float32Array(MAX);
  private life = new Float32Array(MAX);
  private next = 0;

  private geo = new THREE.BufferGeometry();
  private pts: THREE.Points;

  private headGeo = new THREE.BufferGeometry();
  private headPos = new Float32Array(HEADS * 3);
  private headCol = new Float32Array(HEADS * 3);
  private headSize = new Float32Array(HEADS);
  private heads: THREE.Points;

  /**
   * ★ У СНАРЯДА ЕСТЬ ТЕЛО. Один только огонь читался пятном света без веса —
   * непонятно, что именно летит и почему от него больно. Внутри пламени
   * кувыркается обломок породы: тёмный, гранёный, со светящимися швами.
   */
  private rocks: THREE.InstancedMesh;
  private rockDummy = new THREE.Object3D();

  private markGeo = new THREE.BufferGeometry();
  // одно кольцо на метку, по два узла на сегмент
  private markPos = new Float32Array(MARKS * MARK_SEG * 2 * 3);
  private markCol = new Float32Array(MARKS * MARK_SEG * 2 * 3);
  private marks: THREE.LineSegments;

  private ringX = new Float32Array(MARK_SEG);
  private ringY = new Float32Array(MARK_SEG);
  private ringZ = new Float32Array(MARK_SEG);
  private flash = 0;
  private emit = 0;
  /** для звука: сколько снарядов в воздухе */
  live = 0;
  /** снаряды, которые в этом кадре вошли в слышимую близость: их и озвучивают */
  incoming: Array<{ dist: number; size: number; x: number; z: number }> = [];
  /** каждый снаряд свистит ОДИН раз — иначе выходит сирена */
  private whistled = new WeakSet<Bomb>();
  /**
   * Взрывы этого кадра для звука.
   * ★ НЕ БОЛЬШЕ ТРЁХ ЗА КАДР. На пике накрытия рвётся по пять штук разом, и
   * пять наложенных раскатов дают не мощь, а грязь: берём самые громкие.
   */
  blasts: Array<{ power: number; x: number; z: number; dist: number }> = [];

  /** свежие воронки для шейдера рельефа */
  get craterData(): Float32Array {
    return craterData();
  }

  constructor() {
    // общий буфер частиц: и хвосты, и разлёт от взрыва
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    this.geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3));
    this.geo.setAttribute('size', new THREE.BufferAttribute(this.size, 1));
    this.pts = new THREE.Points(
      this.geo,
      new THREE.ShaderMaterial({
        vertexShader: /* glsl */ `
          attribute float size;
          varying vec3 vCol;
          void main() {
            vCol = color;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * 320.0 / max(1.0, -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vCol;
          void main() {
            vec2 p = gl_PointCoord * 2.0 - 1.0;
            float r = length(p);
            if (r > 1.0) discard;
            gl_FragColor = vec4(vCol, pow(max(0.0, 1.0 - r), 1.6));
          }
        `,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    this.pts.frustumCulled = false;
    this.group.add(this.pts);

    this.headGeo.setAttribute('position', new THREE.BufferAttribute(this.headPos, 3));
    this.headGeo.setAttribute('color', new THREE.BufferAttribute(this.headCol, 3));
    this.headGeo.setAttribute('size', new THREE.BufferAttribute(this.headSize, 1));
    this.heads = new THREE.Points(
      this.headGeo,
      new THREE.ShaderMaterial({
        vertexShader: /* glsl */ `
          attribute float size;
          varying vec3 vCol;
          void main() {
            vCol = color;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * 420.0 / max(1.0, -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: HEAD_FRAG,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    this.heads.frustumCulled = false;
    this.group.add(this.heads);

    // обломок: икосаэдр с рваными вершинами, грани плоские
    const rg = new THREE.IcosahedronGeometry(1, 0);
    const rp = rg.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < rp.count; i++) {
      const k = 0.62 + ((Math.sin(i * 12.9898) * 43758.5453) % 1) * 0.5;
      rp.setXYZ(i, rp.getX(i) * k, rp.getY(i) * k, rp.getZ(i) * k);
    }
    rg.computeVertexNormals();
    this.rocks = new THREE.InstancedMesh(
      rg,
      new THREE.MeshLambertMaterial({
        color: 0x241c20,
        emissive: new THREE.Color(0.55, 0.13, 0.02),
        flatShading: true,
      }),
      HEADS
    );
    this.rocks.frustumCulled = false;
    this.rocks.count = 0;
    this.group.add(this.rocks);

    this.markGeo.setAttribute('position', new THREE.BufferAttribute(this.markPos, 3));
    this.markGeo.setAttribute('color', new THREE.BufferAttribute(this.markCol, 3));
    this.marks = new THREE.LineSegments(
      this.markGeo,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    this.marks.frustumCulled = false;
    this.group.add(this.marks);

    for (let i = 0; i < MAX; i++) this.life[i] = -1;
  }

  private spawn(
    x: number, y: number, z: number,
    vx: number, vy: number, vz: number,
    size: number, life: number, heat: number
  ): void {
    // кольцевой буфер: самая старая частица уступает место новой
    const i = this.next % MAX;
    this.next++;
    this.pos[i * 3] = x;
    this.pos[i * 3 + 1] = y;
    this.pos[i * 3 + 2] = z;
    this.vel[i * 3] = vx;
    this.vel[i * 3 + 1] = vy;
    this.vel[i * 3 + 2] = vz;
    this.size[i] = size;
    this.age[i] = 0;
    this.life[i] = life;
    this.col[i * 3] = heat;
    this.col[i * 3 + 1] = heat * 0.45;
    this.col[i * 3 + 2] = heat * 0.12;
  }

  update(dt: number, px: number, pz: number, ground: (x: number, z: number) => number): void {
    const list = bombList();
    // ★ ЗВУКУ НУЖНЫ ДВА ЧИСЛА, А НЕ СПИСОК. Сколько всего летит — это фоновый
    // гул; насколько близок ближайший удар — это свист, по которому уходят.
    this.live = 0;
    this.incoming.length = 0;
    this.blasts.length = 0;
    for (const b of list) {
      if (!b.alive) continue;
      this.live++;
      // свист начинается за полторы секунды до удара и только у ближних
      if (b.eta < 1.5 && !this.whistled.has(b)) {
        this.whistled.add(b);
        const d = Math.hypot(b.tx - px, b.tz - pz);
        if (d < 130) this.incoming.push({ dist: d, size: b.r, x: b.tx, z: b.tz });
      }
    }
    this.group.visible = list.length > 0 || this.flash > 0 || this.next > 0;

    // --- хвосты: каждое ядро сыплет угли по своей дуге ---
    this.emit += dt * 60;
    const per = Math.max(1, Math.floor(this.emit / Math.max(1, list.length)));
    if (this.emit >= 1) this.emit = 0;
    for (const b of list) {
      if (!b.alive) continue;
      for (let k = 0; k < per; k++) {
        // частица рождается чуть позади ядра — иначе хвост «догоняет» и слипается
        const t = k / per;
        this.spawn(
          b.x - b.vx * dt * t, b.y - b.vy * dt * t, b.z - b.vz * dt * t,
          (Math.random() - 0.5) * 2.2,
          (Math.random() - 0.5) * 2.2 + 1.2,
          (Math.random() - 0.5) * 2.2,
          b.r * (0.5 + Math.random() * 0.5),
          0.35 + Math.random() * 0.45,
          2.6 + Math.random() * 1.2
        );
      }
    }

    // --- взрывы ---
    for (const im of impactList()) {
      const n = 26 + Math.round(im.r * 12);
      for (let k = 0; k < n; k++) {
        const a = Math.random() * Math.PI * 2;
        const up = 0.25 + Math.random() * 0.95;
        const sp = 6 + Math.random() * 16 * im.r;
        this.spawn(
          im.x, im.y + 0.4, im.z,
          Math.cos(a) * sp * (1 - up * 0.6),
          sp * up,
          Math.sin(a) * sp * (1 - up * 0.6),
          im.r * (0.4 + Math.random() * 0.7),
          0.7 + Math.random() * 1.1,
          3.0 + Math.random() * 1.4
        );
      }
      // низкое кольцо пыли по земле
      for (let k = 0; k < 14; k++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 9 + Math.random() * 12 * im.r;
        this.spawn(
          im.x, im.y + 0.2, im.z,
          Math.cos(a) * sp, 1.5 + Math.random() * 2, Math.sin(a) * sp,
          im.r * 1.2, 0.9 + Math.random() * 0.8, 1.1
        );
      }
      // отметина на грунте — её видят и рельеф, и игрок (см. craters.ts)
      addCrater(im.x, im.z, im.r * BLAST_K * 0.8);
      this.light.position.set(im.x, im.y + 4, im.z);
      this.flash = 1;
      // взрыв слышно тем громче, чем ближе
      const d = Math.hypot(im.x - px, im.z - pz);
      this.blasts.push({ power: im.r * 0.4 * Math.max(0, 1 - d / 260), x: im.x, z: im.z, dist: d });
    }
    ageCraters(dt);
    this.flash = Math.max(0, this.flash - dt * 2.6);
    this.light.intensity = this.flash * this.flash * 320;

    // --- шаг частиц ---
    for (let i = 0; i < MAX; i++) {
      if (this.life[i] < 0) continue;
      this.age[i] += dt;
      const k = this.age[i] / this.life[i];
      if (k >= 1) {
        this.life[i] = -1;
        this.pos[i * 3 + 1] = -1e6;
        continue;
      }
      // угли тормозятся воздухом и оседают
      const drag = 1 - dt * 1.9;
      this.vel[i * 3] *= drag;
      this.vel[i * 3 + 1] = this.vel[i * 3 + 1] * drag - 7 * dt;
      this.vel[i * 3 + 2] *= drag;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      // белое → оранжевое → тёмно-красное → дым
      const q = 1 - k;
      const hot = q * q;
      this.col[i * 3] = 3.2 * hot + 0.12;
      this.col[i * 3 + 1] = 1.5 * hot * q + 0.09;
      this.col[i * 3 + 2] = 0.35 * hot * hot + 0.08;
      this.size[i] *= 1 - dt * 0.55;
    }
    if (this.blasts.length > 3) {
      this.blasts.sort((a, b) => b.power - a.power);
      this.blasts.length = 3;
    }
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.color.needsUpdate = true;
    this.geo.attributes.size.needsUpdate = true;

    // --- ядра ---
    let n = 0;
    for (const b of list) {
      if (!b.alive || n >= HEADS) continue;
      this.headPos[n * 3] = b.x;
      this.headPos[n * 3 + 1] = b.y;
      this.headPos[n * 3 + 2] = b.z;
      // ядро пульсирует — камень в полёте горит неровно
      const f = 0.85 + 0.15 * Math.sin(b.seed * 7 + b.eta * 11);
      this.headCol[n * 3] = 3.4 * f;
      this.headCol[n * 3 + 1] = 1.25 * f;
      this.headCol[n * 3 + 2] = 0.28 * f;
      this.headSize[n] = b.r * 1.9;
      n++;
    }
    for (let i = n; i < HEADS; i++) {
      this.headPos[i * 3 + 1] = -1e6;
      this.headSize[i] = 0;
    }
    // тела снарядов: кувыркаются каждый по своему семени
    let m = 0;
    for (const b of list) {
      if (!b.alive || m >= HEADS) continue;
      const d = this.rockDummy;
      d.position.set(b.x, b.y, b.z);
      d.rotation.set(b.t * (1.6 + b.seed * 0.03), b.t * (2.1 + b.seed * 0.02), b.seed);
      d.scale.setScalar(b.r * 0.85);
      d.updateMatrix();
      this.rocks.setMatrixAt(m, d.matrix);
      m++;
    }
    this.rocks.count = m;
    this.rocks.instanceMatrix.needsUpdate = true;
    this.headGeo.attributes.position.needsUpdate = true;
    this.headGeo.attributes.color.needsUpdate = true;
    this.headGeo.attributes.size.needsUpdate = true;

    // --- метки падения ---
    // ★ РИСУЕМ ТОЛЬКО БЛИЖНИЕ. Каждый узел кольца — вызов сэмплера высоты;
    // метки за двести метров всё равно ничего не решают.
    const near = list
      .filter((b) => b.alive && Math.hypot(b.tx - px, b.tz - pz) < 190)
      .sort((a, b) => Math.hypot(a.tx - px, a.tz - pz) - Math.hypot(b.tx - px, b.tz - pz))
      .slice(0, MARKS);
    let v = 0;
    const ringX = this.ringX;
    const ringY = this.ringY;
    const ringZ = this.ringZ;
    for (const b of near) {
      // ★ КОЛЬЦО ОДНО, А СРОК ПОКАЗЫВАЕТ ЦВЕТ. Круг внутри круга читался как
      // две цели, дуга-стрелка требует разглядывать метку. Цвет понятен боковым
      // зрением и не врёт про радиус: жёлтый — время есть, к середине срока
      // краснеет, в последнюю четверть частит миганием. Ровно три состояния,
      // которые не спутать на скорости.
      const t = Math.max(0, Math.min(1, b.eta / 3.4));
      const outer = b.r * BLAST_K;
      const heat = 1 - t;
      // к половине срока цвет уже полностью красный
      const k = Math.min(1, heat / 0.5);
      const cr = 1.9 + k * 0.5;
      const cg = 1.45 * (1 - k) + 0.12;
      const cb = 0.16 * (1 - k) + 0.04;
      // последняя четверть — частое мигание
      // ★ МИГАНИЕ ДОЛЖНО БИТЬ ПО ГЛАЗАМ. Плавная синусоида на треть яркости
      // терялась среди зарева: на скорости её просто не замечаешь. Гасим почти
      // насухо и прямоугольником, а не плавно, и начинаем раньше — за треть
      // срока до удара.
      const blink = heat > 0.66 ? (Math.sin(b.t * 26) > 0 ? 1.35 : 0.12) : 1;
      // ★ ВЫСОТУ КАЖДОГО УЗЛА СЧИТАЕМ ОДИН РАЗ. Наивно каждый отрезок кольца
      // брал сэмплер дважды — на восьми метках это под три сотни вызовов за
      // кадр, и на полной плотности обстрела кадр разбухал до семи миллисекунд.
      // Точки кольца считаются один раз, отрезки на них ссылаются.
      for (let si = 0; si < MARK_SEG; si++) {
        const a = (si / MARK_SEG) * Math.PI * 2;
        const x = b.tx + Math.cos(a) * outer;
        const z = b.tz + Math.sin(a) * outer;
        ringX[si] = x;
        ringY[si] = ground(x, z) + 0.5;
        ringZ[si] = z;
      }
      for (let si = 0; si < MARK_SEG; si++) {
        const j = (si + 1) % MARK_SEG;
        for (const q of [si, j]) {
          this.markPos[v * 3] = ringX[q];
          this.markPos[v * 3 + 1] = ringY[q];
          this.markPos[v * 3 + 2] = ringZ[q];
          this.markCol[v * 3] = cr * blink;
          this.markCol[v * 3 + 1] = cg * blink;
          this.markCol[v * 3 + 2] = cb * blink;
          v++;
        }
      }
    }
    const total = MARKS * MARK_SEG * 2;
    for (let i = v; i < total; i++) this.markPos[i * 3 + 1] = -1e6;
    this.markGeo.setDrawRange(0, v);
    this.markGeo.attributes.position.needsUpdate = true;
    this.markGeo.attributes.color.needsUpdate = true;
  }
}
