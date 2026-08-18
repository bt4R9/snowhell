import * as THREE from 'three/webgpu';
import {
  Fn, If, uniform, vec2, vec3, vec4, positionLocal, normalize, clamp, mix, pow, max, dot,
  smoothstep, floor, fract, sin, float, atan,
} from 'three/tsl';
import { PALETTE, SUN_DIR } from './palette';
import { fbm2, hash2, vnoise2 } from '../core/tslnoise';
void floor; void fract; void float;

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
  const uAurora = uniform(0);
  const uStars = uniform(0);

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
      // ★ ПОЛЯРНОЙ НОЧЬЮ НЕБО ЯСНОЕ: облака редеют — иначе они закрывают звёзды
      // и сияние, а подсвеченный луной слой читается серым дневным небом
      cov.mulAssign(uAurora.mul(0.8).oneMinus());

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
      col.assign(mix(col, cloud.mul(uAurora.mul(0.6).oneMinus()), cov.mul(0.92)));
    });

    // ★ ПОЛЯРНАЯ НОЧЬ: ЗВЁЗДЫ И СЕВЕРНОЕ СИЯНИЕ. Оба слоя весят по биому:
    // днём их нет вовсе. Звёзды — редкие ячейки хэша по направлению, мерцают;
    // сияние — занавес на условной высоте (та же проекция, что у облаков),
    // складки бегут по шуму, снизу зелёный, сверху уходит в фиолетовый.
    If(uStars.greaterThan(0.001).and(dir.y.greaterThan(0.02)), () => {
      const cell = dir.xz.div(dir.y.add(0.35)).mul(70.0);
      const h = hash2(cell);
      const h2 = hash2(cell.add(vec2(17.0, 91.0)));
      const star = smoothstep(0.9965, 1.0, h);
      const twinkle = sin(uTime.mul(h2.mul(4.0).add(1.5)).add(h2.mul(50.0))).mul(0.35).add(0.65);
      const fade = smoothstep(0.02, 0.2, dir.y);
      col.addAssign(vec3(0.9, 0.95, 1.1).mul(star).mul(twinkle).mul(fade).mul(uStars).mul(0.9));
    });
    If(uAurora.greaterThan(0.001).and(dir.y.greaterThan(0.04)), () => {
      // занавес — в координатах азимут × высота: складки идут поперёк
      // азимута, медленно плывут и колышутся; так он висит по всему куполу,
      // а не только у горизонта
      const az = atan(dir.x, dir.z).mul(2.2);
      const wave = vnoise2(vec2(az.mul(0.7).add(uTime.mul(0.02)), dir.y.mul(0.8).add(uTime.mul(0.006)))).mul(1.8);
      const ripple = vnoise2(vec2(az.mul(3.2).sub(uTime.mul(0.05)), dir.y.mul(1.4).add(wave)));
      const band = smoothstep(0.52, 0.8, ripple.mul(0.6).add(wave.mul(0.35)));
      // по высоте: снизу резкая кромка, вверх занавес тает
      const hgt = smoothstep(0.03, 0.12, dir.y).mul(smoothstep(0.9, 0.35, dir.y));
      const k = band.mul(hgt).mul(uAurora);
      const green = vec3(0.16, 0.95, 0.42);
      const violet = vec3(0.55, 0.25, 0.85);
      const acol = mix(green, violet, smoothstep(0.15, 0.6, dir.y));
      col.addAssign(acol.mul(k).mul(0.55));
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
      uAurora.value = PALETTE.aurora;
      uStars.value = PALETTE.stars;
    },
  };
}

void vec3;
