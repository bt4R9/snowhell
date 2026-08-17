import * as THREE from 'three/webgpu';
import {
  Fn, If, float, vec2, vec4, uv, dot, clamp, max, positionView, instancedBufferAttribute, Discard,
  materialColor, materialOpacity,
} from 'three/tsl';

// Точечные частицы со СВОИМ размером и цветом.
//
// ★ WebGPU рисует point-примитивы строго в один пиксель — gl_PointSize там
// нет. Поэтому «точки с размером» — это инстансированные спрайты: один
// Sprite с `count = N`, а позиция, цвет и размер каждой частицы берутся из
// инстансных атрибутов. Формула размера та же, что была у gl_PointSize:
// пикселей = size × K / расстояние, зажатая в [minPx, maxPx] — в пикселях
// низкого буфера, поэтому картинка совпадает с WebGL-версией один в один.
//
// Все системы частиц (искры реза, горящие ели, снаряды, пепел, снегопад)
// идут через этот помощник — чтобы форма частицы и её отсечка были общими.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type N = any;

/** предел размера точки у WebGL-драйвера, под который настроены все системы */
const GL_POINT_MAX = 511;

export interface SpriteCloudOptions {
  count: number;
  /** позиции с CPU (инстансный атрибут) — либо `positionNode` из compute-буфера */
  pos?: Float32Array;
  positionNode?: N;
  col?: Float32Array;
  size?: Float32Array;
  /** размер по умолчанию (если нет атрибута size), в тех же единицах */
  fixedSize?: number;
  /** множитель дистанционного размера: px = size * k / dist */
  k: number;
  minPx: number;
  maxPx: number;
  blending?: THREE.Blending;
  depthWrite?: boolean;
  /** альфа по квадрату радиуса r²∈[0,1): узел → узел */
  alpha?: (r2: N) => N;
  /** полный цвет фрагмента (col, r²) → vec4 — когда частица не просто круг */
  frag?: (col: N, r2: N) => N;
  /** нужен ли туман сцены на частицах */
  fog?: boolean;
  /** цвет и прозрачность из material.color / material.opacity (их крутит биом) */
  materialColor?: boolean;
  /** GPU-частицы: размер (в единицах size), цвет и множитель альфы из storage-буферов */
  sizeN?: N;
  colN?: N;
  alphaN?: N;
}

export interface SpriteCloud {
  sprite: THREE.Sprite;
  material: THREE.PointsNodeMaterial;
  posAttr: THREE.InstancedBufferAttribute | null;
  colAttr: THREE.InstancedBufferAttribute | null;
  sizeAttr: THREE.InstancedBufferAttribute | null;
  /** отметить атрибуты изменёнными — вызывать после записи в массивы */
  touch(): void;
}

export function spriteCloud(o: SpriteCloudOptions): SpriteCloud {
  const posAttr = o.pos ? new THREE.InstancedBufferAttribute(o.pos, 3) : null;
  if (posAttr) posAttr.setUsage(THREE.DynamicDrawUsage);
  const colAttr = o.col ? new THREE.InstancedBufferAttribute(o.col, 3) : null;
  if (colAttr) colAttr.setUsage(THREE.DynamicDrawUsage);
  const sizeAttr = o.size ? new THREE.InstancedBufferAttribute(o.size, 1) : null;
  if (sizeAttr) sizeAttr.setUsage(THREE.DynamicDrawUsage);

  const m = new THREE.PointsNodeMaterial();
  m.transparent = true;
  m.depthWrite = o.depthWrite ?? false;
  m.blending = o.blending ?? THREE.NormalBlending;
  m.sizeAttenuation = false; // дистанцию считаем сами — формула из старого шейдера
  m.fog = o.fog ?? false;
  m.positionNode = posAttr ? instancedBufferAttribute(posAttr) : o.positionNode;
  const sizeN: N = o.sizeN ?? (sizeAttr ? instancedBufferAttribute(sizeAttr) : float(o.fixedSize ?? 1));
  // нижний порог в пикселях: иначе дальние частицы уходят в доли пикселя и
  // рой пропадает как раз тогда, когда он и нужен.
  // ★ ВЕРХНИЙ ПОТОЛОК КАК У WebGL. gl_PointSize там резался драйвером
  // (ALIASED_POINT_SIZE_RANGE = 511 на Metal), и картинка настроена под этот
  // потолок: без него снаряд у камеры раздувается на пол-экрана.
  m.sizeNode = clamp(
    (sizeN as N).mul(o.k).div(max(1.0, positionView.z.negate())),
    o.minPx,
    Math.min(o.maxPx, GL_POINT_MAX)
  );
  const colN: N = o.colN ?? (colAttr
    ? instancedBufferAttribute(colAttr)
    : o.materialColor ? materialColor : vec4(1, 1, 1, 1).xyz);
  m.colorNode = Fn(() => {
    const p = uv().mul(2.0).sub(1.0);
    const r = dot(p, p);
    If(r.greaterThan(1.0), () => Discard());
    if (o.frag) return o.frag(colN, r);
    let a: N = o.alpha ? o.alpha(r) : r.oneMinus();
    if (o.alphaN) a = a.mul(o.alphaN);
    return vec4(colN, o.materialColor ? a.mul(materialOpacity) : a);
  })();

  const sprite = new THREE.Sprite(m);
  sprite.count = o.count;
  sprite.frustumCulled = false;
  return {
    sprite,
    material: m,
    posAttr,
    colAttr,
    sizeAttr,
    touch() {
      if (posAttr) posAttr.needsUpdate = true;
      if (colAttr) colAttr.needsUpdate = true;
      if (sizeAttr) sizeAttr.needsUpdate = true;
    },
  };
}

void vec2;
