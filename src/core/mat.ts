import * as THREE from 'three/webgpu';
import { psxVertex } from '../world/vertexsnap';

// Фабрика материалов мира.
//
// ★ WebGPU: встроенные материалы three здесь — node-материалы, и всё, что
// раньше делалось глобальными патчами ShaderChunk (PSX-дрожание вершин, туман
// с тенями облаков), теперь подключается ЯВНО: дрожание — общим `vertexNode`,
// туман — узлом сцены (`scene.fogNode`, см. world/fog.ts). Чтобы ни один
// материал не остался «гладким» посреди дрожащего мира, все материалы мира
// создаются через `psx()`.
//
// HUD и полноэкранные проходы через фабрику НЕ идут: у них ортокамера, и
// дрожание им противопоказано (см. vertexsnap.ts).

/** Прибить материал к PSX-сетке — общий vertexNode для всех материалов мира */
export function psx<T extends THREE.NodeMaterial>(m: T): T {
  m.vertexNode = psxVertex;
  return m;
}

/** Ламберт мира: снег, порода, деревья, дома, кулисы */
export function lambert(p: THREE.MeshLambertNodeMaterialParameters = {}): THREE.MeshLambertNodeMaterial {
  return psx(new THREE.MeshLambertNodeMaterial(p));
}

/** Неосвещаемый материал мира: окна, лампы, тень-блоб, светящиеся детали */
export function basic(p: THREE.MeshBasicNodeMaterialParameters = {}): THREE.MeshBasicNodeMaterial {
  return psx(new THREE.MeshBasicNodeMaterial(p));
}

/** Линии мира */
export function line(p: THREE.LineBasicNodeMaterialParameters = {}): THREE.LineBasicNodeMaterial {
  return psx(new THREE.LineBasicNodeMaterial(p));
}

/** Юниформы, к которым обращается игровой код: у TSL-узлов тот же `.value` */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UniformMap = Record<string, { value: any; array?: any }>;

/** Материал с кастомным шейдером и словарём юниформов «как у ShaderMaterial» */
export type ShaderLike<M extends THREE.NodeMaterial = THREE.NodeMaterial> = M & { uniforms: UniformMap };

/** прикрутить словарь юниформов к node-материалу */
export function withUniforms<M extends THREE.NodeMaterial>(m: M, uniforms: UniformMap): ShaderLike<M> {
  const s = m as ShaderLike<M>;
  s.uniforms = uniforms;
  return s;
}
