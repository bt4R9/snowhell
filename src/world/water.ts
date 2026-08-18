import * as THREE from 'three/webgpu';
import {
  Fn, If, Loop, float, vec2, vec3, vec4, uniform, uniformArray, positionWorld, normalView, positionView,
  normalize, dot, length, exp, sin, cos, smoothstep, mix, max, clamp, pow, abs,
} from 'three/tsl';
import { withUniforms, basic, ShaderLike } from '../core/mat';
import { vnoise2 } from '../core/tslnoise';
import { PALETTE, SUN_DIR } from './palette';
import { lakeAtSite, Lake, toWorldX, nightWeight } from './features';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type N = any;

// ★ ОТКРЫТАЯ ВОДА ПОЛЯРНОЙ НОЧИ. Озеро — тёмное зеркало: почти чёрная толща,
// в которой отражаются звёзды и сияние (зелёный отблеск дышит вместе с небом),
// лунная дорожка бликом, мелкая рябь по шуму и кольца от доски, когда та
// глиссирует по воде. Геометрия — диск по гармоническому берегу, лежащий на
// наклонной плоскости зеркала (та же, что в lakeAt).

const RINGS = 8;

function buildLakeMesh(l: Lake, mat: THREE.Material): THREE.Mesh {
  const SEG = 48;
  const RINGS_G = 4;
  const pos: number[] = [];
  const idx: number[] = [];
  const cxW = toWorldX(l.u, l.z);
  const at = (dn: number, th: number): [number, number, number] => {
    let k = 1;
    for (let i = 0; i < 4; i++) k += l.amp[i] * Math.cos((i + 1) * th + l.ph[i]);
    const u = l.u + Math.cos(th) * l.ru * dn * k;
    const z = l.z + Math.sin(th) * l.rz * dn * k;
    const y = l.L + l.gz * (z - l.z) + l.gu * (u - l.u) - 0.02;
    return [toWorldX(u, z) - cxW, y, z - l.z];
  };
  pos.push(0, l.L - 0.02, 0);
  for (let r = 1; r <= RINGS_G; r++) {
    // берег чуть заходит под рельеф (1.04), чтобы между водой и снегом не было щели
    const dn = (r / RINGS_G) * 1.04;
    for (let s = 0; s < SEG; s++) {
      const th = (s / SEG) * Math.PI * 2;
      const [x, y, z] = at(dn, th);
      pos.push(x, y, z);
    }
  }
  for (let s = 0; s < SEG; s++) idx.push(0, 1 + s, 1 + ((s + 1) % SEG));
  for (let r = 0; r < RINGS_G - 1; r++) {
    const a0 = 1 + r * SEG;
    const b0 = 1 + (r + 1) * SEG;
    for (let s = 0; s < SEG; s++) {
      const s1 = (s + 1) % SEG;
      idx.push(a0 + s, b0 + s, b0 + s1);
      idx.push(a0 + s, b0 + s1, a0 + s1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, mat);
  m.position.set(cxW, 0, l.z);
  m.frustumCulled = false;
  return m;
}

export class Water {
  readonly group = new THREE.Group();
  private built = new Map<number, THREE.Mesh>();
  private material: ShaderLike<THREE.MeshBasicNodeMaterial>;
  private uTime = uniform(0);
  private uAurora = uniform(0);
  private uRings = uniformArray(Array.from({ length: RINGS }, () => new THREE.Vector4(0, 0, -100, 0)));
  private ringNext = 0;
  private uSunDir = uniform(SUN_DIR);
  private uFogColor = uniform(new THREE.Color(0x1a2238));

  constructor() {
    const uTime = this.uTime;
    const uAurora = this.uAurora;
    const uRings = this.uRings;
    const uSunDir = this.uSunDir;
    const uFogColor = this.uFogColor;
    // ★ ОБЕ СТОРОНЫ: наклонное зеркало под низкой камерой попадало под отсечку
    // задней грани и исчезало — вода видна была только сверху
    const m = withUniforms(basic({ fog: true, side: THREE.DoubleSide }), { uTime, uAurora, uRings, uSunDir, uFogColor });
    m.colorNode = Fn(() => {
      const wp: N = positionWorld.xz;
      // рябь: два шума с разным ходом; кольца от доски поверх
      const n1 = vnoise2(wp.mul(0.12).add(vec2(uTime.mul(0.15), uTime.mul(-0.1))));
      const n2 = vnoise2(wp.mul(0.35).add(vec2(uTime.mul(-0.22), uTime.mul(0.17))));
      const rip = n1.mul(0.6).add(n2.mul(0.4)).sub(0.5).toVar();
      const ringH = float(0.0).toVar();
      Loop({ start: 0, end: RINGS, type: 'int', condition: '<' }, ({ i }: { i: N }) => {
        const r: N = uRings.element(i);
        const age = uTime.sub(r.z);
        If(age.greaterThan(0.0).and(age.lessThan(2.5)).and(r.w.greaterThan(0.001)), () => {
          const d = length(wp.sub(r.xy));
          const front = age.mul(7.0);
          const ring = exp(d.sub(front).abs().mul(-1.1)).mul(sin(d.mul(2.6).sub(age.mul(11.0))));
          ringH.addAssign(ring.mul(r.w).mul(age.div(2.5).oneMinus()));
        });
      });
      rip.addAssign(ringH.mul(0.5));
      // «нормаль» воды из ряби наклоняет отражение
      const nrm: N = normalize(normalView.add(vec3(rip.mul(0.35), 0.0, rip.mul(0.25))));
      const vd: N = normalize(positionView.negate());
      const fres = pow(clamp(dot(nrm, vd), 0.0, 1.0).oneMinus(), 3.0);
      // толща почти чёрная, у грани — отражение неба (тёмно-синее) и сияния
      const deep = vec3(0.008, 0.014, 0.028);
      const skyR = vec3(0.05, 0.08, 0.15);
      // отражение сияния — рваными полосами по ряби, а не ровной заливкой
      const streak = smoothstep(0.35, 0.75, vnoise2(wp.mul(vec2(0.05, 0.9)).add(vec2(uTime.mul(0.03), 0.0))));
      const aur = vec3(0.12, 0.6, 0.3).mul(uAurora).mul(sin(uTime.mul(0.4).add(wp.x.mul(0.01))).mul(0.3).add(0.7)).mul(streak);
      const col = mix(deep, skyR.add(aur.mul(0.22)), fres.mul(0.5).add(0.05)).toVar();
      // лунная дорожка: блик по отражённому направлению, разбитый рябью
      const refl = normalize(vd.negate().add(nrm.mul(dot(nrm, vd).mul(2.0))));
      const sunV = normalize(vec3(uSunDir.x, uSunDir.y, uSunDir.z));
      const spec = pow(max(0.0, dot(refl, sunV)), 60.0).mul(smoothstep(-0.2, 0.3, rip).mul(0.6).add(0.4));
      col.addAssign(vec3(0.7, 0.8, 1.0).mul(spec).mul(0.5));
      // гребни колец белеют
      col.addAssign(vec3(0.5, 0.6, 0.7).mul(max(0.0, ringH).mul(0.35)));
      // блёстки звёзд на ряби
      const glint = smoothstep(0.985, 1.0, vnoise2(wp.mul(3.7).add(uTime.mul(0.05)))).mul(smoothstep(0.1, 0.4, rip));
      col.addAssign(vec3(0.6, 0.7, 0.9).mul(glint).mul(0.5));
      return vec4(col, 1.0);
    })();
    this.material = m;
    void abs; void uFogColor;
  }

  /** доска коснулась воды — кольцо */
  splash(x: number, z: number, strength: number): void {
    const w = this.uRings.array as THREE.Vector4[];
    w[this.ringNext % RINGS].set(x, z, this.uTime.value, strength);
    this.ringNext++;
  }

  update(pz: number, time: number): void {
    this.uTime.value = time;
    this.uAurora.value = PALETTE.aurora;
    this.uSunDir.value.copy(SUN_DIR);
    if (nightWeight(pz) < 0.01 && this.built.size === 0) return;
    // озёра в 1.2 км вокруг игрока
    const needed = new Set<number>();
    const k0 = Math.floor((pz - 700) / 520);
    const k1 = Math.floor((pz + 1200) / 520);
    for (let k = k0; k <= k1; k++) {
      const l = lakeAtSite(k);
      if (!l || !l.water) continue;
      needed.add(k);
      if (!this.built.has(k)) {
        const mesh = buildLakeMesh(l, this.material);
        this.group.add(mesh);
        this.built.set(k, mesh);
      }
    }
    for (const [k, mesh] of this.built) {
      if (needed.has(k)) continue;
      this.group.remove(mesh);
      mesh.geometry.dispose();
      this.built.delete(k);
    }
  }
}
