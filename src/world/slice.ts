import type * as THREE from 'three/webgpu';

// ★ РАДИАЛЬНЫЙ ПРОФИЛЬ ПО СРЕЗУ, А НЕ ПО ЦЕНТРОИДАМ. Раньше слой набирался из
// треугольников, чей центроид попал в полосу высот. У низкополигональной ноги
// арки треугольники выше слоя в разы — ни один центроид в него не попадал,
// слой выходил пустым и подменялся соседним, и все слои были одинаковыми.
// Здесь модель РЕЖЕТСЯ плоскостью y = const: каждый треугольник, пересечённый
// плоскостью, даёт отрезок, и луч из центра ищет самое дальнее пересечение с
// этими отрезками. Срез точный на любой высоте и при любой триангуляции.

/** отрезки сечения (x0,z0,x1,z1,...) геометрии плоскостью y */
export function sliceSegments(
  g: THREE.BufferGeometry,
  y: number,
  filter?: (xm: number, zm: number) => boolean
): number[] {
  const p = g.attributes.position;
  const out: number[] = [];
  const pts: number[] = [];
  for (let i = 0; i < p.count; i += 3) {
    pts.length = 0;
    for (let e = 0; e < 3; e++) {
      const a = i + e;
      const b = i + ((e + 1) % 3);
      const ya = p.getY(a);
      const yb = p.getY(b);
      if ((ya <= y && yb > y) || (yb <= y && ya > y)) {
        const t = (y - ya) / (yb - ya);
        pts.push(
          p.getX(a) + (p.getX(b) - p.getX(a)) * t,
          p.getZ(a) + (p.getZ(b) - p.getZ(a)) * t
        );
      }
    }
    if (pts.length >= 4) {
      if (filter && !filter((pts[0] + pts[2]) / 2, (pts[1] + pts[3]) / 2)) continue;
      out.push(pts[0], pts[1], pts[2], pts[3]);
    }
  }
  return out;
}

/**
 * Радиальный профиль среза: в каждом из bins угловых секторов — самое дальнее
 * пересечение луча из (cx, cz) с отрезками. Пустые сектора достраиваются по
 * соседям (провал в ноль сделал бы тело проходимым насквозь); если пусто всё —
 * нули (среза на этой высоте нет).
 */
export function radialFromSegments(segs: number[], cx: number, cz: number, bins: number): number[] {
  const prof = new Array(bins).fill(0);
  for (let k = 0; k < bins; k++) {
    const th = ((k + 0.5) / bins) * Math.PI * 2 - Math.PI;
    const dx = Math.cos(th);
    const dz = Math.sin(th);
    let best = 0;
    for (let s = 0; s < segs.length; s += 4) {
      const px = segs[s] - cx;
      const pz = segs[s + 1] - cz;
      const ex = segs[s + 2] - cx - px;
      const ez = segs[s + 3] - cz - pz;
      const den = dx * ez - dz * ex;
      if (Math.abs(den) < 1e-9) continue;
      const tt = (px * ez - pz * ex) / den;
      if (tt <= best) continue;
      const u = Math.abs(ex) > Math.abs(ez) ? (tt * dx - px) / ex : (tt * dz - pz) / ez;
      if (u >= 0 && u <= 1) best = tt;
    }
    prof[k] = best;
  }
  for (let pass = 0; pass < bins; pass++) {
    let holes = 0;
    for (let k = 0; k < bins; k++) {
      if (prof[k] > 0) continue;
      const a = prof[(k + bins - 1) % bins];
      const b = prof[(k + 1) % bins];
      if (a > 0 || b > 0) prof[k] = Math.max(a, b);
      else holes++;
    }
    if (holes === 0 || holes === bins) break;
  }
  return prof;
}

/**
 * Профиль ПОЛОСЫ высот [y0, y1]: срезы в нескольких высотах полосы, по
 * секторам берётся максимум — доска и райдер занимают полосу, а не линию.
 */
export function bandProfile(
  g: THREE.BufferGeometry,
  y0: number,
  y1: number,
  bins: number,
  cx = 0,
  cz = 0,
  filter?: (xm: number, zm: number) => boolean,
  samples = 3
): number[] {
  const prof = new Array(bins).fill(0);
  for (let s = 0; s < samples; s++) {
    const y = y0 + ((s + 0.5) / samples) * (y1 - y0);
    const p = radialFromSegments(sliceSegments(g, y, filter), cx, cz, bins);
    for (let k = 0; k < bins; k++) prof[k] = Math.max(prof[k], p[k]);
  }
  return prof;
}
