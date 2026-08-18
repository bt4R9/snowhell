import * as THREE from 'three/webgpu';
import { lambert, basic } from '../core/mat';
import { hash2 } from './noise';
import { pisteCenterX, toWorldX, cityWeight, PISTE_HALF_W } from './features';

// ★ КОНСТРУКЦИИ ПОПЕРЁК ТРАССЫ — то, что делает город городом в кадре. Раз в
// GANTRY_STEP по спуску над коридором стоит стальная эстакада: две башни-фермы
// по бокам трассы, поперечная ферма с трубопроводом (под ней проезжаешь),
// на одной башне — огромная шестерня/маховик, который ВРАЩАЕТСЯ, на другой —
// паровой котёл с трубой. Плюс редкие «арки» из труб. Всё это стримится по z,
// как останцы; коллизий нет — башни стоят за кромкой коридора.

const GANTRY_STEP = 260;
const RANGE_BACK = 200;
const RANGE_FWD = 900;

interface Gantry {
  k: number;
  group: THREE.Group;
  gears: Array<{ mesh: THREE.Mesh; speed: number }>;
}

export class Gantries {
  readonly group = new THREE.Group();
  private built = new Map<number, Gantry>();
  private steel = lambert({ color: 0x4e4a48, flatShading: true });
  private rust = lambert({ color: 0x6e4a34, flatShading: true });
  private brass = lambert({ color: 0x8a6a34, flatShading: true });
  private pipe = lambert({ color: 0x5a5652, flatShading: true });
  private lampMat = basic({ color: 0xffb060 });
  private box = new THREE.BoxGeometry(1, 1, 1);
  private cyl = new THREE.CylinderGeometry(1, 1, 1, 8);
  private gearGeo: THREE.BufferGeometry;
  /** полуарка-тор в плоскости XY (радиус 1, труба 0.9), масштабируется по пролёту */
  private archGeo = (() => { const t = new THREE.TorusGeometry(1, 0.06, 6, 16, Math.PI); return t; })();

  constructor(private ground: (x: number, z: number) => number) {
    // шестерня: диск с зубьями (12 коробок по ободу) — грубо, по-PSX
    const parts: THREE.BufferGeometry[] = [];
    const disk = new THREE.CylinderGeometry(1, 1, 0.25, 12);
    disk.rotateX(Math.PI / 2);
    parts.push(disk);
    for (let i = 0; i < 12; i++) {
      const t = new THREE.BoxGeometry(0.22, 0.28, 0.3);
      const a = (i / 12) * Math.PI * 2;
      t.translate(0, 1.1, 0);
      t.rotateZ(a);
      parts.push(t);
    }
    // спицы
    for (let i = 0; i < 3; i++) {
      const sp = new THREE.BoxGeometry(1.8, 0.14, 0.12);
      sp.rotateZ((i / 3) * Math.PI);
      parts.push(sp);
    }
    // объединяем вручную (mergeGeometries тянет utils) — простая склейка позиций
    const pos: number[] = [];
    for (const g of parts) {
      const ng = g.index ? g.toNonIndexed() : g;
      const a = ng.attributes.position;
      for (let i = 0; i < a.count; i++) pos.push(a.getX(i), a.getY(i), a.getZ(i));
    }
    this.gearGeo = new THREE.BufferGeometry();
    this.gearGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    this.gearGeo.computeVertexNormals();
  }

  private mk(geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number, sx: number, sy: number, sz: number, ry = 0): THREE.Mesh {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.scale.set(sx, sy, sz);
    m.rotation.y = ry;
    return m;
  }

  private build(k: number): Gantry | null {
    const z = k * GANTRY_STEP + 60 + hash2(k * 17, 5) * 120;
    if (cityWeight(z) < 0.6) return null;
    if (hash2(k * 31 + 7, 11) < 0.25) return null;
    const g = new THREE.Group();
    const gears: Gantry['gears'] = [];
    const cx = pisteCenterX(z);
    const halfSpan = PISTE_HALF_W + 9 + hash2(k * 13, 3) * 6;
    const xl = toWorldX(cx - halfSpan, z);
    const xr = toWorldX(cx + halfSpan, z);
    const yl = this.ground(xl, z);
    const yr = this.ground(xr, z);
    const top = Math.max(yl, yr) + 14 + hash2(k * 19, 7) * 8;
    // башни-фермы: четыре стойки и раскосы
    for (const [x, y] of [[xl, yl], [xr, yr]] as Array<[number, number]>) {
      const h = top - y + 3;
      for (const [dx, dz] of [[-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2]]) {
        g.add(this.mk(this.box, this.steel, x + dx, y + h / 2, z + dz, 0.35, h, 0.35));
      }
      // горизонтальные пояса
      for (let f = 1; f < h / 4; f++) {
        g.add(this.mk(this.box, this.rust, x, y + f * 4, z, 2.8, 0.25, 2.8));
      }
    }
    // поперечная ферма или ★ ЧУГУННАЯ АРКА (по референсам — арки над улицами)
    const span = Math.hypot(xr - xl, 0);
    const mid = (xl + xr) / 2;
    if (hash2(k * 43, 29) < 0.5) {
      const arch = new THREE.Mesh(this.archGeo, this.rust);
      arch.position.set(mid, top - span * 0.35, z);
      arch.scale.set(span * 0.5, span * 0.35, 1);
      g.add(arch);
      // фермочка поверх арки — проезжая полка
      g.add(this.mk(this.box, this.steel, mid, top + 0.4, z, span + 3, 0.7, 2.0));
    } else {
      g.add(this.mk(this.box, this.steel, mid, top, z, span + 3, 1.6, 2.4));
      g.add(this.mk(this.box, this.rust, mid, top + 1.6, z, span + 3, 0.3, 2.6));
    }
    // трубопровод по ферме и вниз по одной башне
    const py = top + 2.4;
    const pipe = this.mk(this.cyl, this.pipe, mid, py, z - 1.6, 0.6, span + 2, 0.6);
    pipe.rotation.z = Math.PI / 2;
    g.add(pipe);
    const down = this.mk(this.cyl, this.pipe, xl - 1.8, (yl + py) / 2, z - 1.6, 0.6, py - yl, 0.6);
    g.add(down);
    // фонари на ферме
    for (let i = -1; i <= 1; i++) {
      g.add(this.mk(this.box, this.lampMat, mid + i * span * 0.3, top - 1.2, z, 0.5, 0.5, 0.5));
    }
    // ★ ШЕСТЕРНЯ на правой башне (иногда две), маховик крутится
    const R = 4 + hash2(k * 23, 13) * 3;
    const gear = this.mk(this.gearGeo, this.brass, xr, top - R * 0.6, z + 2.6, R, R, R);
    g.add(gear);
    gears.push({ mesh: gear, speed: (hash2(k * 29, 17) < 0.5 ? 1 : -1) * (0.25 + hash2(k * 37, 19) * 0.4) });
    if (hash2(k * 41, 23) > 0.5) {
      const R2 = R * 0.6;
      const g2 = this.mk(this.gearGeo, this.brass, xr, top - R * 0.6 + R + R2 * 0.95, z + 2.6, R2, R2, R2);
      g.add(g2);
      gears.push({ mesh: g2, speed: -gears[0].speed * (R / R2) });
    }
    // котёл с трубой на левой башне
    const boiler = this.mk(this.cyl, this.rust, xl, top + 3, z, 1.6, 4, 1.6);
    g.add(boiler);
    g.add(this.mk(this.cyl, this.steel, xl, top + 7.5, z, 0.45, 5, 0.45));
    return { k, group: g, gears };
  }

  update(pz: number, dt: number): void {
    const k0 = Math.floor((pz - RANGE_BACK) / GANTRY_STEP);
    const k1 = Math.floor((pz + RANGE_FWD) / GANTRY_STEP);
    for (let k = k0; k <= k1; k++) {
      if (this.built.has(k)) continue;
      const gt = this.build(k);
      if (gt) {
        this.group.add(gt.group);
        this.built.set(k, gt);
      } else {
        this.built.set(k, { k, group: new THREE.Group(), gears: [] });
      }
    }
    for (const [k, gt] of this.built) {
      if (k >= k0 && k <= k1) {
        for (const gr of gt.gears) gr.mesh.rotation.z += gr.speed * dt;
        continue;
      }
      this.group.remove(gt.group);
      this.built.delete(k);
    }
  }
}
