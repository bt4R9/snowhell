import * as THREE from 'three/webgpu';
import {
  Fn, If, uniform, vec2, vec3, vec4, positionLocal, normalize, clamp, mix, pow, max, dot,
  smoothstep,
} from 'three/tsl';
import { PALETTE, SUN_DIR } from './palette';
import { fbm2 } from '../core/tslnoise';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type N = any;

export interface Sky {
  mesh: THREE.Mesh;
  update(dt: number): void;
}

export function createSky(): Sky {
  const uZenith = uniform(PALETTE.skyZenith);
  const uHorizon = uniform(PALETTE.skyHorizon);
  const uSunColor = uniform(PALETTE.sun);
  const uHalo = uniform(PALETTE.skyHalo);
  const uDim = uniform(PALETTE.skyDim);
  const uSunDir = uniform(SUN_DIR);
  const uFog = uniform(PALETTE.fog);
  const uTime = uniform(0);

  const mat = new THREE.MeshBasicNodeMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: false,
    fog: false,
  });
  mat.colorNode = Fn(() => {
    const dir: N = normalize(positionLocal);
    const t = clamp(dir.y.mul(1.4).add(0.12), 0.0, 1.0);
    const col = mix(uHorizon, uZenith, pow(t, 0.75)).toVar();
    const s = max(dot(dir, uSunDir), 0.0);
    // ★ ОРЕОЛ МАСШТАБИРУЕТСЯ БИОМОМ. На вулкане именно он держал небо светлым:
    // сколько ни темни градиент, полкупола занимала засветка вокруг солнца.
    col.addAssign(uSunColor.mul(pow(s, 48.0)).mul(0.9).mul(uHalo)); // диск-глоу
    col.addAssign(uSunColor.mul(pow(s, 3.0)).mul(0.38).mul(uHalo)); // широкий закатный ореол

    // ОБЛАКА. Плоский слой на условной высоте: направление взгляда проецируется
    // на него как dir.xz / dir.y, поэтому у горизонта клочья сами собой
    // сплющиваются в длинные полосы, а над головой раскрываются — перспектива
    // получается бесплатно, без единого полигона.
    //
    // Слой живёт ТОЛЬКО выше горизонта и гаснет к нему плавно: мир собран из
    // трёх слоёв, и любая заметная граница у линии горизонта читается как
    // «геометрию не дорисовали» — этой ошибкой уже переболели.
    If(dir.y.greaterThan(0.012), () => {
      const p = dir.xz.div(dir.y);
      const drift = vec2(uTime.mul(0.0022), uTime.mul(0.0009));
      const n = fbm2(p.mul(0.55).add(drift));
      // Второй, более редкий слой выше и медленнее: одна плотность на всё небо
      // выглядит как обои, два разных масштаба — как погода.
      const n2 = fbm2(p.mul(0.17).sub(drift.mul(0.6)).add(31.7));
      const cov = smoothstep(0.46, 0.76, n.mul(0.66).add(n2.mul(0.56))).toVar();
      // у горизонта слой уходит в дымку, у зенита редеет. Полоса неба над
      // склоном узкая — камера смотрит вниз по горе, и на экран попадает от
      // силы четверть купола. Поэтому облака обязаны начинаться почти от
      // самого горизонта, иначе их просто не видно.
      const band = smoothstep(0.012, 0.06, dir.y).mul(smoothstep(0.5, 1.0, dir.y).mul(0.4).oneMinus());
      cov.mulAssign(band);

      // Свет: кромка, обращённая к солнцу, горит, тело клочка остаётся
      // холодным. Разницу берём из того же шума со сдвигом к солнцу — дёшево
      // и читается именно как объём, а не как плоская заливка.
      const toSun = normalize(uSunDir.xz.add(vec2(1e-4))).mul(0.35);
      const lit = clamp(n.sub(fbm2(p.add(toSun).mul(0.55).add(drift))).mul(6.0).add(0.35), 0.0, 1.0);
      const shade = mix(uFog.mul(0.86), uHorizon, 0.35);
      // ★ ОБЛАКА СВЕТЯТСЯ ТЕМ ЖЕ СОЛНЦЕМ. Без множителя они оставались светлым
      // поясом даже на затемнённом куполе — солнце сквозь пепел их не выбеливает.
      const cloud = mix(
        shade,
        uSunColor,
        lit.mul(pow(s, 1.5).mul(0.55).add(0.35)).mul(mix(0.35, 1.0, uHalo))
      );
      col.assign(mix(col, cloud, cov.mul(0.92)));
    });

    // Ниже горизонта небо — ровно цвет тумана: щели между слоями мира
    // (чанки / дальний план / задник) показывают именно купол, и только
    // точное совпадение с туманом делает их неотличимыми от дымки.
    const below = clamp(dir.y.negate().mul(9.0).add(0.25), 0.0, 1.0);
    col.assign(mix(col, uFog, below));

    // ★ ЯРКОСТЬ КУПОЛА ЗАДАЁТ БИОМ. Небо складывается из четырёх слагаемых —
    // градиент, диск, ореол и облака, — и гасить их по одному бесполезно:
    // замер показывал светлый купол даже когда градиент был почти чёрным.
    // Множитель в конце гарантирует результат независимо от того, какое
    // слагаемое в кадре главное.
    return vec4(col.mul(uDim), 1.0);
  })();

  const mesh = new THREE.Mesh(new THREE.SphereGeometry(420, 24, 12), mat);
  mesh.frustumCulled = false;
  // Купол — фон, а не геометрия: рисуется первым и без теста глубины, иначе
  // дальний хребет (он за радиусом купола) оказался бы закрашен небом.
  mesh.renderOrder = -3;
  return {
    mesh,
    update(dt: number): void {
      uTime.value += dt;
      // цвета в юниформах общие по ссылке, а число надо переносить руками
      uHalo.value = PALETTE.skyHalo;
      uDim.value = PALETTE.skyDim;
    },
  };
}

void vec3;
