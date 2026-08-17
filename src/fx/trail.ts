import * as THREE from 'three/webgpu';
import { lambert } from '../core/mat';
import { terrainHeight } from '../world/terrain';
import { groundDip } from './ground';
import { SURF_PACKED, SURF_POWDER, SURF_ICE, SURF_DIRT } from '../world/features';

// След доски — не плоская лента, а вытоптанная колея с 3D-профилем:
// бортики по краям (выдавленный кантом снег) и ложбинка между ними.
// Нормали считаются по-настоящему, поэтому одна стенка ловит солнце,
// другая уходит в тень — глубина читается светом.
//
// Характер следа зависит от поверхности: наст режется чётким жёлобом,
// рыхляк выпахивается широкой траншеей с высокими брустверами, лёд лишь
// царапается, земля — бурый след-задир почти без бортиков.

const MAX_POINTS = 900; // ~500 м следа: на 150 км/ч это ~12 секунд
const SPACING = 0.55;

const PROFILE_OFF = [-0.5, -0.26, 0, 0.26, 0.5];
const COLS = PROFILE_OFF.length;
const QUADS = COLS - 1;

interface SurfaceLook {
  width: number;   // множитель ширины колеи
  lip: number;     // высота бруствера
  depth: number;   // насколько продавлен центр
  edge: THREE.Color;
  center: THREE.Color;
}

/**
 * ★ У ВУЛКАНА СВОЙ СЛЕД. Колея — это снег: выдавленные бортики, светлые
 * стенки, голубая тень. На пепле она читалась снежной трассой посреди
 * расплава. Здесь свой набор: пепел выметается тёмной бороздой, лапилли
 * выпахиваются валиком, а по стеклу и базальту следа НЕТ ВОВСЕ — доска по
 * камню не оставляет ничего, и любая колея там выглядит снегом.
 */
const VOLC_LOOK: Record<number, SurfaceLook | null> = {
  // ★ НА ВУЛКАНЕ СЛЕДА ПОЧТИ НЕТ. Колея — снежная идея: доска продавливает
  // рыхлый слой, по краям встаёт бруствер, стенки ловят свет. Пепла под
  // доской миллиметры, продавливать нечего — остаётся лишь сметённая полоса
  // чуть темнее фона. Никаких бортиков и глубины: любая геометрия следа
  // мгновенно читается снегом.
  [SURF_PACKED]: {
    width: 0.5, lip: 0, depth: 0.01,
    edge: new THREE.Color(0x3a332e), center: new THREE.Color(0x241f1c),
  },
  [SURF_POWDER]: {
    // шлак чуть сыпучее пепла — полоса заметнее, но всё равно без профиля
    width: 0.62, lip: 0, depth: 0.015,
    edge: new THREE.Color(0x453a31), center: new THREE.Color(0x2a231d),
  },
  [SURF_ICE]: null,   // обсидиан — стекло, следа не остаётся
  [SURF_DIRT]: null,  // базальт — камень, следа не остаётся
};

const LOOK: Record<number, SurfaceLook> = {
  [SURF_PACKED]: {
    width: 1.0, lip: 0.06, depth: 0.03,
    edge: new THREE.Color(0xeaeffa), center: new THREE.Color(0xaeb8d2),
  },
  [SURF_POWDER]: {
    // рыхляк выпахивается: шире, глубже, с высокими брустверами
    width: 1.5, lip: 0.2, depth: 0.12,
    edge: new THREE.Color(0xffffff), center: new THREE.Color(0xc3ccea),
  },
  [SURF_ICE]: {
    // На льду колеи НЕ ОСТАЁТСЯ ВОВСЕ: ни бруствера, ни вмятины — только
    // светлая царапина от канта. Любая геометрия следа здесь читается как
    // мягкий снег и рушит ощущение льда.
    width: 0.55, lip: 0, depth: 0,
    edge: new THREE.Color(0xd8e6f6), center: new THREE.Color(0xa8c6de),
  },
  [SURF_DIRT]: {
    // земля: бурый задир, снег содран
    width: 1.15, lip: 0.05, depth: 0.05,
    edge: new THREE.Color(0x8a7660), center: new THREE.Color(0x5c4c3a),
  },
};

interface TrailRow {
  px: Float32Array;
  py: Float32Array;
  pz: Float32Array;
  gap: boolean;    // разрыв следа (был полёт)
  shade: number;   // случайный оттенок ряда
  edge: THREE.Color;
  center: THREE.Color;
}

export class Trail {
  mesh: THREE.Mesh;
  private rows: TrailRow[] = [];
  private geo = new THREE.BufferGeometry();
  private positions = new Float32Array(MAX_POINTS * QUADS * 6 * 3);
  private normals = new Float32Array(MAX_POINTS * QUADS * 6 * 3);
  private colors = new Float32Array(MAX_POINTS * QUADS * 6 * 3);
  private lastX = 0;
  private lastZ = 0;
  private hadContact = false;
  private a = new THREE.Vector3();
  private b = new THREE.Vector3();
  private n = new THREE.Vector3();

  constructor() {
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geo.setAttribute('normal', new THREE.BufferAttribute(this.normals, 3));
    this.geo.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
    this.geo.setDrawRange(0, 0);
    const mat = lambert({
      vertexColors: true,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    });
    this.mesh = new THREE.Mesh(this.geo, mat);
    this.mesh.frustumCulled = false;
  }

  /** intensity 0..1 — сила карва; surface — тип поверхности под доской */
  update(
    x: number,
    z: number,
    dirX: number,
    dirZ: number,
    contact: boolean,
    intensity = 0,
    surface = SURF_PACKED,
    skid = 0,
    volc = 0,
    crackHot = 0
  ): void {
    if (!contact) {
      this.hadContact = false;
      return;
    }
    // ★ ПО РАСКАЛЁННОМУ ШВУ СЛЕДА НЕТ. Там под доской не пепел, а спёкшаяся
    // корка: продавить её нечем, зато летят искры (см. emberBurst).
    if (crackHot > 0.3) {
      this.hadContact = false;
      return;
    }
    // на вулканических покрытиях без следа обрываем ленту, как в полёте
    if (volc > 0.5 && VOLC_LOOK[surface] === null) {
      this.hadContact = false;
      return;
    }
    const dx = x - this.lastX;
    const dz = z - this.lastZ;
    if (this.hadContact && dx * dx + dz * dz < SPACING * SPACING) return;
    this.lastX = x;
    this.lastZ = z;

    const look =
      (volc > 0.5 ? VOLC_LOOK[surface] : null) ?? LOOK[surface] ?? LOOK[SURF_PACKED];
    // Доска поперёк хода выметает полосу шириной почти во всю свою длину
    // (0.34 м против 1.62 м) — на скиде колея обязана расширяться, иначе
    // остаётся аккуратная ниточка, будто едешь ровно по ходу.
    // множитель подобран по замеру: базовая колея ~1.5 м, в полном скиде
    // должна выйти к ~2.6 м — это ширина доски, поставленной поперёк, с
    // запасом на разброс снега. При 3.4 получалось 8 м — доска столько не выметает.
    const skidWide = 1 + skid * 0.5;
    // вариация: от силы карва + лёгкий случайный разброс
    const widthK =
      look.width * skidWide * (1 + intensity * 0.35 + (Math.random() - 0.5) * 0.16);
    const wobble = (Math.random() - 0.5) * 0.09;
    // в скиде снег не выдавливается кантом, а сгребается — бортики ниже
    const lipK = 1 - 0.6 * skid;
    const lipL = look.lip * lipK * (0.75 + intensity * 0.7 + Math.random() * 0.3);
    const lipR = look.lip * lipK * (0.75 + intensity * 0.7 + Math.random() * 0.3);
    const flat = look.lip === 0 && look.depth === 0; // лёд: строго плоско
    const heights = flat
      ? [0, 0, 0, 0, 0]
      : [
          look.lip * 0.2,
          lipL,
          -look.depth * (1 + skid * 0.8) + Math.random() * 0.02,
          lipR,
          look.lip * 0.2,
        ];

    const perpX = dirZ;
    const perpZ = -dirX;
    const px = new Float32Array(COLS);
    const py = new Float32Array(COLS);
    const pz = new Float32Array(COLS);
    for (let c = 0; c < COLS; c++) {
      const off = PROFILE_OFF[c] * widthK + wobble;
      const ox = x + perpX * off;
      const oz = z + perpZ * off;
      px[c] = ox;
      pz[c] = oz;
      // ★ СЛЕД ЛОЖИТСЯ НА ТУ ЖЕ ПОВЕРХНОСТЬ, ПО КОТОРОЙ ЕДЕТ ДОСКА. По голой
      // terrainHeight он оставался на ДОВОРОНОЧНОМ уровне: проехал через
      // воронку — доска в яме, а колея висит поперёк неё мостом.
      py[c] = terrainHeight(ox, oz) - groundDip(ox, oz) + heights[c];
    }
    this.rows.push({
      px,
      py,
      pz,
      gap: !this.hadContact,
      shade: 0.93 + Math.random() * 0.11,
      edge: look.edge,
      center: look.center,
    });
    this.hadContact = true;
    if (this.rows.length > MAX_POINTS) this.rows.shift();
    this.rebuild();
  }

  private rebuild(): void {
    let v = 0;
    for (let i = 1; i < this.rows.length; i++) {
      const rb = this.rows[i];
      if (rb.gap) continue;
      const ra = this.rows[i - 1];
      for (let q = 0; q < QUADS; q++) {
        v = this.tri(v, ra, q, rb, q, rb, q + 1);
        v = this.tri(v, ra, q, rb, q + 1, ra, q + 1);
      }
    }
    this.geo.setDrawRange(0, v / 3);
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.normal.needsUpdate = true;
    this.geo.attributes.color.needsUpdate = true;
  }

  private tri(
    v: number,
    r0: TrailRow, c0: number,
    r1: TrailRow, c1: number,
    r2: TrailRow, c2: number
  ): number {
    const pos = this.positions;
    const nor = this.normals;
    const col = this.colors;

    this.a.set(r1.px[c1] - r0.px[c0], r1.py[c1] - r0.py[c0], r1.pz[c1] - r0.pz[c0]);
    this.b.set(r2.px[c2] - r0.px[c0], r2.py[c2] - r0.py[c0], r2.pz[c2] - r0.pz[c0]);
    this.n.crossVectors(this.a, this.b).normalize();
    if (this.n.y < 0) this.n.negate();

    const rows = [r0, r1, r2];
    const cs = [c0, c1, c2];
    for (let k = 0; k < 3; k++) {
      const r = rows[k];
      const c = cs[k];
      pos[v] = r.px[c];
      pos[v + 1] = r.py[c];
      pos[v + 2] = r.pz[c];
      nor[v] = this.n.x;
      nor[v + 1] = this.n.y;
      nor[v + 2] = this.n.z;
      const cc = c === 2 ? r.center : r.edge;
      col[v] = cc.r * r.shade;
      col[v + 1] = cc.g * r.shade;
      col[v + 2] = cc.b * r.shade;
      v += 3;
    }
    return v;
  }
}
