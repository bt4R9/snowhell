import * as THREE from 'three/webgpu';
import { psx, withUniforms, ShaderLike } from '../core/mat';
import { Fn, uniform, attribute, vertexColor, vec4, mix, length } from 'three/tsl';
import { noise2, hash2 } from './noise';
import { PALETTE } from './palette';

// Дальний массив: три гребня-кулисы вокруг игрока. Без них мир читается как
// бесконечный склон, а не как горы. Каждый гребень — сплошная зубчатая
// стена, а не набор отдельных конусов: у настоящего хребта нет просветов
// между вершинами, силуэт идёт непрерывной ломаной.
//
// Кулисы не участвуют в тумане — вместо этого цвет заранее подмешан к дымке
// тем сильнее, чем дальше слой. Так работает воздушная перспектива на
// реальных снимках: ближний гребень тёмный и контрастный, дальний почти
// растворён в небе.

interface Ridge {
  dist: number;   // радиус кулисы
  amp: number;    // средняя высота гребня над местной землёй
  jag: number;    // разброс высоты: 0 — ровная стена, 1 — рваный силуэт
  haze: number;   // доля дымки в цвете
  segs: number;   // сегментов по кругу
}

// Гребни подобраны так, чтобы каждый следующий выглядывал чуть выше
// предыдущего: дальний слой поднимается над ближним ровно настолько, чтобы
// была видна его макушка. Так набирается глубина, а не одна плоская стена.
// Кулисы отодвинуты ЗА край настоящей земли (~3.8 км, см. farfield.ts).
// Раньше ближняя стояла в 900 м — внутри отрисовываемого мира, и её гладкое
// полотно занимало треть кадра там, где должен был быть рельеф. Теперь
// задник виден только НАД горизонтом настоящей земли, то есть работает по
// назначению: даёт масштаб, а не подменяет собой мир.
// ★ ЧАСТОТА ШУМА ПРИВЯЗАНА К ЧИСЛУ СЕГМЕНТОВ, А НЕ ВЗЯТА НА ГЛАЗ. Шум берётся
// по ОКРУЖНОСТИ радиуса f, то есть за оборот проходит 2πf его периодов. Чтобы
// период не рассыпался в шум, на него нужно хотя бы четыре сегмента:
//   2π·f ≤ segs/4  →  f ≤ segs/(8π).
// В прежней версии стояли октавы 3.1, 7.7 и 17 при 96 сегментах, где предел
// равен 3.8. Две верхние октавы были ВЫШЕ частоты Найквиста и не давали
// деталей — они давали случайную рябь, которая после сглаживания читалась
// пологой волной. Ровно отсюда «волнистый и плоский» силуэт.
const RIDGES: Ridge[] = [
  // ★ БЛИЖНИЙ ХРЕБЕТ СТОИТ ВПЛОТНУЮ К КРАЮ ЗЕМЛИ. Грубый уровень дальнего
  // плана кончается на 3.84 км; если отодвинуть хребет дальше, между ними
  // открывается кольцо пустоты, и в него видно небо — те самые щели. Я на
  // этом уже обжёгся: хребет уезжал на 6 км ради главного вулкана, а вулкан
  // потом убрали. Двигать эту дистанцию можно только вместе с дальностью
  // земли.
  { dist: 4200, amp: 900, jag: 0.85, haze: 0.42, segs: 256 },
  { dist: 6200, amp: 1500, jag: 0.75, haze: 0.62, segs: 192 },
  { dist: 9000, amp: 2400, jag: 0.6, haze: 0.8, segs: 144 },
];
/** предел частоты шума по окружности для данного числа сегментов */
function fMax(segs: number): number {
  return segs / (8 * Math.PI);
}

// Долина непрерывно теряет высоту: то, что ниже по склону, садится на
// горизонт, то, что выше, вырастает за спиной.
const DESCENT = 0.58;

const ROCK = new THREE.Color(0x4a4657);
// АЛЬПЕНГЛЮ: на закате снег на дальних вершинах ловит низкое солнце и горит
// розово-золотым, пока долина внизу уже синяя. Это и есть главная картинка
// «золотого часа» в горах, и она достаётся почти даром — только цветом.
const GLOW = new THREE.Color(0xffc39a);
// цвет, к которому сходится полностью затуманенная земля у края отрисовки
// РОВНО цвет тумана. Настоящая земля доходит до ~3.8 км и у своего края
// полностью затуманена, то есть невидима, — но она рисуется ПОСЛЕ задника и
// закрашивает его. Если подножие кулисы отличается от тумана хоть немного,
// у дальней горы появляется срезанный низ по линии этой невидимой земли.
const DEEP = PALETTE.fog.clone();
// ★ СНЕГ КУЛИС ЧУТЬ ТЕМНЕЕ БЕЛОГО. При 0xeef2fd освещённая грань после
// множителя света упиралась в единицу и срезалась в чистый белый: вершина
// превращалась в бумажную вырезку без единой складки. Запас вниз оставляет
// место, где свет ещё различим.
const SNOW = new THREE.Color(0xdde4f2);

// Свет с той же стороны, что и солнце в небе, — грани, повёрнутые к нему,
// светлее. Иначе стена выглядит плоской заливкой.
const LIGHT_X = 0.69;
const LIGHT_Z = 0.72;

// Цвет дымки для кулис — не туман биома: тот тёплый, как закатное небо, и
// хребты в нём растворялись целиком. Берём холодный бледно-сиреневый: он
// светлее скалы, поэтому дальние гребни выцветают, как в жизни, но по тону
// отличается от оранжевого неба — силуэт не пропадает.

/**
 * Профиль гребня по углу. Шум берём по окружности — стык сходится сам.
 *
 * ★ ГРЕБНЕВОЙ ШУМ, А НЕ СГЛАЖЕННЫЙ. Обычный шум даёт ОКРУГЛЫЕ горбы: как его
 * ни возводи в степень, вершина остаётся куполом, и цепь читается волной.
 * У настоящего хребта вершина — это ИЗЛОМ. Даёт его 1 − |шум|: там, где шум
 * переходит через ноль, получается острый пик, а между пиками — широкие сёдла.
 * Тот же приём уже работает на главной цепи (peaks.ts).
 */
function crestAt(ca: number, sa: number, jag: number, off: number, f: number): number {
  const ridged = (fr: number, ox: number): number => {
    const v = noise2(ca * fr + ox + off, sa * fr - ox * 0.7 - off);
    return 1 - Math.abs(v);
  };
  // октавы связаны с пределом частоты: верхняя ровно на нём, ниже — вдвое реже
  let n = ridged(f * 0.24, 4.7) * 0.5;
  n += ridged(f * 0.55, -11.2) * 0.31 * n * 2; // модуляция: детали живут на склонах
  n += ridged(f, 21.4) * 0.19;
  n = Math.max(0, Math.min(1, n));
  // редкие доминирующие вершины: без них гребень — ровная пила из
  // одинаковых зубцов, а у настоящего хребта есть главные пики
  const sp = noise2(ca * 1.7 - 55.3 + off, sa * 1.7 + 12.9 - off) * 0.5 + 0.5;
  const summit = Math.pow(Math.max(0, sp - 0.62) / 0.38, 1.5) * 1.5;
  return 1 - jag + jag * (n * 2.3 + summit);
}

export class Backdrop {
  group = new THREE.Group();
  /** для менеджера биомов: общий тон кулис */
  material!: ShaderLike<THREE.MeshBasicNodeMaterial>;

  constructor() {
    // дымка кулис — тот же цвет тумана: гребни обязаны сходиться к нему же,
    // иначе задник и затуманенная земля дают разный тон на общей границе
    const haze = PALETTE.fog.clone();
    const parts: THREE.BufferGeometry[] = [];

    for (let ri = RIDGES.length - 1; ri >= 0; ri--) {
      // от дальнего к ближнему: тест глубины выключен, порядок треугольников
      // и есть порядок перекрытия
      parts.push(this.buildRidge(RIDGES[ri], ri, haze));
    }

    const geo = parts[0];
    const merged = parts.length === 1 ? geo : mergeAll(parts);
    const uHaze = uniform(PALETTE.fog.clone());
    const uTint = uniform(new THREE.Color(0xffffff));
    const uSnow = uniform(1);
    // ★ ПОРОДА КУЛИС — ЦВЕТ БИОМА. Здесь было жёсткое 0x4a4657: холодный
    // сине-серый. В снегу это правильный камень, а в вулкане он и был той
    // «бледной снежной грядой» на горизонте — снег-то снимался, но порода
    // под ним оставалась холодной и светлой.
    const uRock = uniform(PALETTE.backdropRock.clone());
    const mat = withUniforms(
      psx(new THREE.MeshBasicNodeMaterial({
        fog: false,
        depthTest: false,
        depthWrite: false,
        side: THREE.DoubleSide,
      })),
      { uHaze, uTint, uSnow, uRock }
    );
    mat.colorNode = Fn(() => {
      const vCol = vertexColor().rgb;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vHaze: any = attribute('aHaze', 'float');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vSnow: any = attribute('aSnow', 'float');
      // снег снимается там, где биом бесснежный: в вулкане кулисы должны
      // быть тёмной породой, а не белыми шапками
      const base = mix(vCol, uRock.mul(length(vCol).mul(0.35).add(0.6)), vSnow.mul(uSnow.oneMinus()));
      // и сходятся кулисы РОВНО к текущему цвету тумана, иначе на общей
      // границе с затуманенной землёй видна полоса
      return vec4(mix(base.mul(uTint), uHaze, vHaze), 1.0);
    })();
    const mesh = new THREE.Mesh(merged, mat);
    mesh.frustumCulled = false;
    mesh.renderOrder = -2; // сразу после неба, до всего мира
    this.material = mat;
    this.group.add(mesh);
  }

  private buildRidge(r: Ridge, ri: number, haze: THREE.Color): THREE.BufferGeometry {
    const pos: number[] = [];
    const col: number[] = [];
    const tmp = new THREE.Color();
    const tmp2 = new THREE.Color();
    const N = r.segs;
    const f = fMax(N);

    // предрасчёт линии гребня
    const px: number[] = [];
    const pz: number[] = [];
    const top: number[] = [];
    const bot: number[] = [];
    const sl: number[] = []; // снеговая линия, непрерывная вдоль гребня
    for (let i = 0; i <= N; i++) {
      const a = ((i % N) / N) * Math.PI * 2;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      // радиус гуляет — гребень не идеальная окружность
      // ★ ДВЕ ЧАСТОТЫ РАДИУСА. Одна низкая волна давала стену, у которой все
      // грани смотрят почти одинаково, — отсюда ровная заливка без света и
      // тени. Вторая, вчетверо чаще, разворачивает соседние грани друг
      // относительно друга, и на стене появляются освещённые и теневые
      // склоны — то, из чего и читается объём.
      const w1 = noise2(ca * 1.4 + ri * 7, sa * 1.4 - ri * 3) * 0.5 + 0.5;
      const w2 = noise2(ca * f * 0.5 + ri * 11, sa * f * 0.5 - ri * 5) * 0.5 + 0.5;
      const d = r.dist * (0.82 + w1 * 0.34 + w2 * 0.14);
      const x = ca * d;
      const z = sa * d;
      const ground = -DESCENT * z;
      px.push(x);
      pz.push(z);
      top.push(ground + r.amp * crestAt(ca, sa, r.jag, ri * 31.7, f));
      // Подножие уводим вниз ровно настолько, чтобы низ кулисы не висел в
      // воздухе. Глубже нельзя: на дальнем гребне (9 км) вершины уезжали за
      // дальнюю плоскость камеры и кулиса обрезалась «недорисованной».
      bot.push(ground - r.amp * 2.2);
      // Снеговая линия — НЕПРЕРЫВНЫЙ шум по окружности, не случайный скачок
      // на каждом сегменте: скачки давали прямоугольные «зубцы» на стыке
      // шапки и скалы.
      const sn = noise2(ca * 2.6 + ri * 13.1, sa * 2.6 - ri * 5.7) * 0.5 + 0.5;
      sl.push(Math.min(top[i], ground + r.amp * (0.2 + sn * 0.34)));
    }

    // Цвет кладём ПЛОСКО, по грани: интерполяция по огромным треугольникам
    // размазывала гребень в аэрограф, а не в гранёный силуэт.
    const hz: number[] = [];
    const sn: number[] = [];
    const quad = (
      i: number, yTopI: number, yBotI: number,
      j: number, yTopJ: number, yBotJ: number,
      cTop: THREE.Color, cBot?: THREE.Color,
      hTop = 0, sTop = 0, hBot?: number, sBot?: number
    ): void => {
      const cb = cBot ?? cTop;
      const hb = hBot ?? hTop;
      const sb = sBot ?? sTop;
      const v: Array<[number, number, number, THREE.Color, number, number]> = [
        [px[i], yTopI, pz[i], cTop, hTop, sTop],
        [px[j], yTopJ, pz[j], cTop, hTop, sTop],
        [px[j], yBotJ, pz[j], cb, hb, sb],
        [px[i], yTopI, pz[i], cTop, hTop, sTop],
        [px[j], yBotJ, pz[j], cb, hb, sb],
        [px[i], yBotI, pz[i], cb, hb, sb],
      ];
      for (const p of v) {
        pos.push(p[0], p[1], p[2]);
        col.push(p[3].r, p[3].g, p[3].b);
        hz.push(p[4]);
        sn.push(p[5]);
      }
    };

    for (let i = 0; i < N; i++) {
      const j = i + 1;
      // нормаль грани в плане: чем сильнее повёрнута к свету, тем светлее
      const ex = px[j] - px[i];
      const ez = pz[j] - pz[i];
      const el = Math.hypot(ex, ez) || 1;
      const nx = ez / el;
      const nz = -ex / el;
      // ★ СВЕТ ОБЯЗАН ПЕРЕЖИТЬ ДЫМКУ. Раньше диапазон был 0.90…1.06, то есть
      // ±8%, и его ещё сжимал подмес дымки (0.42…0.8) — на экране оставалось
      // около 5% разницы между освещённой и теневой гранью. Стена выходила
      // ровной заливкой. Теперь размах шире, а второй множитель (hazeShade)
      // ложится УЖЕ ПОСЛЕ подмеса дымки, поэтому не растворяется в ней.
      const lit = 0.74 + 0.36 * Math.max(0, nx * LIGHT_X + nz * LIGHT_Z);
      const jitter = 0.97 + hash2(i, ri * 17 + 3) * 0.06;
      const shade = lit * jitter;
      // после дымки — умеренно, иначе дальний хребет станет темнее ближнего
      const hazeShade = 1 + (shade - 1) * 0.45 * (1 - r.haze * 0.5);

      const gi = -DESCENT * pz[i];
      const gj = -DESCENT * pz[j];
      const si = sl[i];
      const sj = sl[j];

      // Свет ловит только грани, повёрнутые к солнцу, и только ВЕРХ гребня —
      // ниже снеговой линии долина уже в тени. Чем дальше кулиса, тем розовее:
      // на дальних вершинах солнце стоит выше над горизонтом.
      const face = Math.max(0, nx * LIGHT_X + nz * LIGHT_Z);
      const glow = Math.pow(face, 1.6) * (0.34 + ri * 0.16);
      // ★ ДЫМКА И СНЕГ НЕ ЗАПЕКАЮТСЯ. Раньше сюда подмешивался цвет тумана,
      // взятый ОДИН РАЗ при старте, и белый снег — намертво. В вулканическом
      // биоме кулисы оставались бледными и сходились не к тому тону: на
      // горизонте между затуманенной землёй и задником шла светлая полоса, и
      // в просветах между тёмными гребнями торчали белёсые клинья. Теперь в
      // вершину кладётся ДОЛЯ дымки и ДОЛЯ снега, а сами цвета приходят
      // юниформами и меняются вместе с биомом.
      tmp.copy(SNOW).multiplyScalar(shade).lerp(GLOW, glow).multiplyScalar(hazeShade);
      quad(i, top[i], si, j, top[j], sj, tmp, undefined, r.haze, 1);
      // переход шапка→скала — вертикальный ГРАДИЕНТ, не резкая граница:
      // резкий стык двух плоских заливок читался крепостными зубцами
      tmp2.copy(ROCK).multiplyScalar(0.5 + shade * 0.47).multiplyScalar(hazeShade);
      const mi = Math.max(si - r.amp * 0.5, gi - r.amp * 0.1);
      const mj = Math.max(sj - r.amp * 0.5, gj - r.amp * 0.1);
      quad(i, si, mi, j, sj, mj, tmp, tmp2, r.haze, 1, r.haze * 0.9, 0);

      // Ниже — плавный уход скалы в дымку одним полотном; нижняя граница
      // растворения идёт по ЗЕМЛЕ, а не параллельно зубчатому гребню
      // (иначе гребёнки и бахрома, см. историю).
      const fi = gi - r.amp * 0.12;
      const fj = gj - r.amp * 0.12;
      quad(i, mi, Math.min(mi, fi), j, mj, Math.min(mj, fj), tmp2, DEEP, r.haze * 0.9, 0, 1, 0);
      quad(i, Math.min(mi, fi), bot[i], j, Math.min(mj, fj), bot[j], DEEP, undefined, 1, 0, 1, 0);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    geo.setAttribute('aHaze', new THREE.Float32BufferAttribute(hz, 1));
    geo.setAttribute('aSnow', new THREE.Float32BufferAttribute(sn, 1));
    return geo;
  }

  /** Хребет следует за игроком по горизонтали, оставаясь на горизонте */
  update(x: number, y: number, z: number): void {
    this.group.position.set(x, y, z);
  }
}

function smooth(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

/** Простое склеивание одинаковых по атрибутам геометрий */
function mergeAll(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  // ★ СКЛЕЙКА ТЕРЯЛА ДВА АТРИБУТА. Здесь копировались только position и color,
  // а aHaze/aSnow (дымка у подножия и снятие снега на вулкане) отбрасывались —
  // в WebGL пропавший атрибут молча читался нулём, и кулисы НИКОГДА не сходились
  // к туману и не теряли снег. WebGPU это честно назвал в консоли.
  let n = 0;
  for (const p of parts) n += p.attributes.position.count;
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  const hz = new Float32Array(n);
  const sn = new Float32Array(n);
  let o = 0;
  for (const p of parts) {
    const c = p.attributes.position.count;
    pos.set(p.attributes.position.array as Float32Array, o * 3);
    col.set(p.attributes.color.array as Float32Array, o * 3);
    hz.set(p.attributes.aHaze.array as Float32Array, o);
    sn.set(p.attributes.aSnow.array as Float32Array, o);
    o += c;
    p.dispose();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aHaze', new THREE.BufferAttribute(hz, 1));
  geo.setAttribute('aSnow', new THREE.BufferAttribute(sn, 1));
  return geo;
}
