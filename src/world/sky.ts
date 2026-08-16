import * as THREE from 'three';
import { PALETTE, SUN_DIR } from './palette';

const VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG = /* glsl */ `
uniform vec3 uZenith;
uniform vec3 uHorizon;
uniform vec3 uSunColor;
uniform vec3 uSunDir;
uniform vec3 uFog;
uniform float uTime;
varying vec3 vDir;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p *= 2.07;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec3 dir = normalize(vDir);
  float t = clamp(dir.y * 1.4 + 0.12, 0.0, 1.0);
  vec3 col = mix(uHorizon, uZenith, pow(t, 0.75));
  float s = max(dot(dir, uSunDir), 0.0);
  col += uSunColor * pow(s, 48.0) * 0.9;   // диск-глоу
  col += uSunColor * pow(s, 3.0) * 0.38;   // широкий закатный ореол у солнца

  // ОБЛАКА. Плоский слой на условной высоте: направление взгляда проецируется
  // на него как dir.xz / dir.y, поэтому у горизонта клочья сами собой
  // сплющиваются в длинные полосы, а над головой раскрываются — перспектива
  // получается бесплатно, без единого полигона.
  //
  // Слой живёт ТОЛЬКО выше горизонта и гаснет к нему плавно: мир собран из
  // трёх слоёв, и любая заметная граница у линии горизонта читается как
  // «геометрию не дорисовали» — этой ошибкой уже переболели.
  if (dir.y > 0.012) {
    vec2 p = dir.xz / dir.y;
    vec2 drift = vec2(uTime * 0.0022, uTime * 0.0009);
    float n = fbm(p * 0.55 + drift);
    // Второй, более редкий слой выше и медленнее: одна плотность на всё небо
    // выглядит как обои, два разных масштаба — как погода.
    float n2 = fbm(p * 0.17 - drift * 0.6 + 31.7);
    float cov = smoothstep(0.46, 0.76, n * 0.66 + n2 * 0.56);
    // у горизонта слой уходит в дымку, у зенита редеет
    // Полоса неба над склоном узкая — камера смотрит вниз по горе, и на
    // экран попадает от силы четверть купола. Поэтому облака обязаны
    // начинаться почти от самого горизонта, иначе их просто не видно.
    float band = smoothstep(0.012, 0.06, dir.y) * (1.0 - smoothstep(0.5, 1.0, dir.y) * 0.4);
    cov *= band;

    // Свет: кромка, обращённая к солнцу, горит, тело клочка остаётся
    // холодным. Разницу берём из того же шума со сдвигом к солнцу — дёшево
    // и читается именно как объём, а не как плоская заливка.
    vec2 toSun = normalize(uSunDir.xz + vec2(1e-4)) * 0.35;
    float lit = clamp((n - fbm((p + toSun) * 0.55 + drift)) * 6.0 + 0.35, 0.0, 1.0);
    vec3 shade = mix(uFog * 0.86, uHorizon, 0.35);
    vec3 cloud = mix(shade, uSunColor, lit * (0.35 + 0.55 * pow(s, 1.5)));
    col = mix(col, cloud, cov * 0.92);
  }

  // Ниже горизонта небо — ровно цвет тумана: щели между слоями мира
  // (чанки / дальний план / задник) показывают именно купол, и только
  // точное совпадение с туманом делает их неотличимыми от дымки.
  float below = clamp(-dir.y * 9.0 + 0.25, 0.0, 1.0);
  col = mix(col, uFog, below);
  gl_FragColor = vec4(col, 1.0);
}
`;

export interface Sky {
  mesh: THREE.Mesh;
  update(dt: number): void;
}

export function createSky(): Sky {
  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uZenith: { value: PALETTE.skyZenith },
      uHorizon: { value: PALETTE.skyHorizon },
      uSunColor: { value: PALETTE.sun },
      uSunDir: { value: SUN_DIR },
      uFog: { value: PALETTE.fog },
      uTime: { value: 0 },
    },
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: false,
    fog: false,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(420, 24, 12), mat);
  mesh.frustumCulled = false;
  // Купол — фон, а не геометрия: рисуется первым и без теста глубины, иначе
  // дальний хребет (он за радиусом купола) оказался бы закрашен небом.
  mesh.renderOrder = -3;
  return {
    mesh,
    update(dt: number): void {
      mat.uniforms.uTime.value += dt;
    },
  };
}
