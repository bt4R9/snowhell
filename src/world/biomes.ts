import * as THREE from 'three/webgpu';
import type { ShaderLike } from '../core/mat';
import { PALETTE, SUN_DIR } from './palette';
import { biomeInfoAt } from './features';

// Биомы — чисто атмосферные: палитра, свет, туман и декорации меняются,
// правила игры — нет. Менеджер каждый кадр лерпает живые объекты сцены
// между определениями по позиции игрока.

export interface BiomeDef {
  name: string;
  skyZenith: THREE.Color;
  skyHorizon: THREE.Color;
  sun: THREE.Color;
  fog: THREE.Color;
  snowTint: THREE.Color;
  /**
   * ★ ТОН ДАЛИ. Кулисы задника, цепь пиков и дальний план красятся при
   * ПОСТРОЙКЕ — палитра биома до них не доходила, и получалось, что под
   * ногами пепел, а на горизонте те же белые Альпы. Этот множитель кладётся
   * на материал уже готовой геометрии.
   */
  distTint: THREE.Color;
  /** что летит в воздухе: снежинки или пепел */
  airColor: THREE.Color;
  airOpacity: number;
  pine: THREE.Color;
  hemiSky: THREE.Color;
  hemiGround: THREE.Color;
  sunDir: THREE.Vector3;
  sunIntensity: number;
  /** яркость солнечного ореола в куполе неба, 1 — обычное ясное солнце */
  skyHalo: number;
  /** общая яркость купола неба */
  skyDim?: number;
  hemiIntensity: number;
  /**
   * ★ ОБЩИЙ ПОДСВЕТ ТОЖЕ БИОМНЫЙ. Он жил константой со времён снега — холодный
   * голубой, — и на вулкане подмешивал синеву в каждый пиксель, мешая биому
   * быть чёрно-красным. У вулкана это отсвет расплава: тёмный и красный.
   */
  ambient: THREE.Color;
  ambientIntensity: number;
  fogNear: number;
  fogFar: number;
  /** сколько снега на дальних кулисах: 0 — голая порода */
  backdropSnow?: number;
  /** снег на дальней цепи пиков: 0 — голая порода */
  peakSnow?: number;
  /** порода дальних кулис */
  backdropRock?: THREE.Color;
  /** северное сияние и звёзды в куполе (полярная ночь) */
  aurora?: number;
  stars?: number;
}

const c = (hex: number) => new THREE.Color(hex);
const AUR = new THREE.Color();

// Пока один биом: ночь и день слиты, деревни встречаются по всему спуску.
// Следующие биомы (город, киберпанк, река с водопадом) добавляются сюда же —
// движок перетекания между ними уже работает.
export const BIOMES: BiomeDef[] = [
  {
    // ВУЛКАН. Небо задымлено пеплом: у зенита оно почти чёрно-фиолетовое, у
    // горизонта — тускло-рыжее от зарева. Солнце сквозь пепел не белое, а
    // медное и слабое: рельеф лепит зарево снизу, а не свет сверху.
    name: 'ash-volcano',
    // ★ СВЕТ ИДЁТ СНИЗУ. Небо забито пеплом: солнца сквозь него почти нет,
    // зенит близок к чёрному, у горизонта только тлеющий отсвет. Всё, что
    // освещает мир, — это лава, поэтому солнце и полусфера прижаты почти в
    // ноль, а нижняя составляющая заполнения тёплая: это отсвет расплава,
    // бьющий в пепел снизу.
    // ★★★★ РАЗВОРОТ ПО РЕФЕРЕНСУ. Мы строили вулкан как «чёрное и красное» и
    // раз за разом получали две жалобы сразу: вблизи пустыня, вдали чернота.
    // Причина в самой посылке. На референсе вулканический биом СВЕТЛЫЙ: небо и
    // мгла — бледный коралл, даль не темнеет, а ВЫцветает в него, и объекты
    // читаются силуэтом на светлом фоне. Мы же гасили землю почти в ноль — и
    // тогда читать нечем: даль без света проваливается в чёрный, а вблизи
    // картинку вытаскивают только аддитивные подмешки зарева, которые сами
    // красные и дают ту самую охру. Поэтому: земля получает НАСТОЯЩЕЕ альбедо,
    // а глубину даёт светлая мгла, а не темнота.
    // ★ НЕБО ТЁМНОЕ, СВЕТИТСЯ ТОЛЬКО ПОЛОСА У ГОРИЗОНТА. Градиент идёт
    // pow(t, 0.75) — зенитный цвет занимает почти весь купол, поэтому небо
    // задаётся именно им. Тёплая полоса внизу остаётся: это зарево над руслом,
    // и на ней же читаются силуэты дальних гор.
    skyZenith: c(0x140a0d),
    skyHorizon: c(0x6a2a1a),
    sun: c(0xd8ab8c),
    // ★ СВЕТЛО, НО НЕ ПЕРЕСВЕЧЕНО. Первый заход по референсу вытащил биом из
    // черноты, но задрал экспозицию — стало «слишком всё светлое». Гасим ВЕСЬ
    // набор разом, сохраняя главное соотношение: мгла остаётся светлее земли,
    // поэтому даль по-прежнему выцветает, а не проваливается.
    // мгла светлая — это и есть «воздух» референса: даль тонет в ней, а не в ночи
    // ★ ВТОРОЙ ШАГ ВНИЗ (2026-08-17, «тон вулкана ещё темнее»): весь набор
    // — мгла, тон земли, даль, полусфера, подсвет, солнце, горизонт — гашен
    // ещё на ~20–25% с теми же соотношениями; третьим шагом — ещё на ~25%.
    fog: c(0x2e1a16),
    // ★ ТЕМНОТУ ЗАДАЁТ ПЕПЕЛ, А НЕ ТОН МАТЕРИАЛА. Тон умножается на цвет
    // вершины, а вершина на вулкане и так тёмная. Замер альбедо под ногами при
    // тоне 0x5c5763 давал 0.016 — в полсотни раз темнее снега. Тон держим
    // почти белым, а характер породы задаём цветом вершины в terrain.ts.
    snowTint: c(0x5a5250),
    // даль чуть глуше и холоднее — воздушная перспектива, а не провал в ноль
    // ★ ТОН ДАЛЬНИХ СЛОЁВ ОБЩИЙ: им красятся и кулисы, и цепь пиков. Почти
    // белый тон держал на горизонте бледную гряду — она читалась заснеженной и
    // светила ярче неба. Тёплый и тёмный ставит дальний план в палитру биома.
    distTint: c(0x3a2c28),
    airColor: c(0x3a2a26),
    airOpacity: 0.6,
    pine: c(0x6b5a52), // обугленный сухостой
    // отсвет неба — тёплый коралл, отсвет снизу — расплав, но уже не чёрно-красный
    hemiSky: c(0x4a3a36),
    hemiGround: c(0x6a2a1e),
    sunDir: new THREE.Vector3(0.62, 0.18, 0.75).normalize(),
    sunIntensity: 0.8,
    // солнце сквозь пепел: диска почти нет
    skyHalo: 0.16,
    skyDim: 0.3,
    ambient: c(0x4e3630),
    ambientIntensity: 0.26,
    // ★ ЗАПОЛНЕНИЕ БОЛЬШЕ НЕ ЕДИНСТВЕННЫЙ СВЕТ. Раньше оно было задрано до 2.05,
    // чтобы вытащить теневые борта ущелий из чистого чёрного — при альбедо 0.016
    // другого выхода не было. Теперь у породы есть свой цвет, и задранное
    // заполнение только плющило рельеф.
    hemiIntensity: 0.8,
    // ★ МГЛА НЕ ДОЛЖНА СЪЕДАТЬ ГЛАВНЫЙ ОРИЕНТИР, но и открытая до 4600 м даль
    // ломала воздушную перспективу: дальний план оставался неосвещённым и
    // читался чёрной стеной. Со светлой мглой даль честно выцветает.
    // ближний план мгла трогать не должна: при 120 м земля под ногами уже
    // подмывалась светлым и снова читалась песком
    fogNear: 260,
    fogFar: 2600,
    // на вулканических кулисах снега нет — там та же порода, что вблизи
    backdropSnow: 0,
    // на вулкане снега нет и в дальней цепи
    peakSnow: 0,
    // базальт, а не холодный гранит
    backdropRock: c(0x221410),
  },
  {
    name: 'alpine-sunset',
    skyZenith: c(0x4b4a9e),
    skyHorizon: c(0xf0d2bc),
    sun: c(0xffd9a0),
    fog: c(0xc6c7d6), // холоднее и темнее skyHorizon — см. palette.ts
    snowTint: c(0xffffff),
    distTint: c(0xffffff),
    airColor: c(0xffffff),
    airOpacity: 0.55,
    pine: c(0xffffff), // множитель к собственным цветам дерева
    // Небесная составляющая заполнения была насыщенно-синей (0x93a5e8): в
    // красном и зелёном она почти пустая, поэтому любой отвёрнутый от солнца
    // склон превращался в тёмное пятно. Тень на снегу светлая и голубая.
    hemiSky: c(0xc2cff2),
    // Заполнение держим высоким: солнце стоит по курсу спуска, и дома с
    // деревьями повёрнуты к камере теневой стороной — на низком заполнении
    // они уходят в чёрные силуэты. Рельеф лепит не заполнение, а солнце,
    // поэтому работали с его высотой и силой, а не с этим числом.
    hemiGround: c(0xdde5f8),
    // Солнце стояло ровно по курсу спуска (0.35, 0.14, 0.85): всё в кадре
    // было повёрнуто к камере теневой стороной, а высота 0.14 давала на
    // снег всего 0.14 от прямого света — рельеф лепил не солнцем, а
    // заполнением, то есть никак. Сдвинуто вправо и поднято до 0.32: закат
    // остаётся впереди в кадре, но у каждого ребра появляется освещённый и
    // теневой склон. Выше поднимать нельзя — уходит золотой час.
    sunDir: new THREE.Vector3(0.5, 0.34, 0.8).normalize(),
    sunIntensity: 2.3,
    skyHalo: 1,
    hemiIntensity: 0.8,
    ambient: c(0xb9c6e8),
    ambientIntensity: 0.32,
    // туман тянется до дальнего плана: земля рисуется на ~960 м, и
    // обрывать её плотной мглой на 175 м больше незачем
    // fogFar обязан быть МЕНЬШЕ радиуса дальнего плана (~1440 м), иначе
    // край отрисовки не растворяется и торчит ступенчатой границей
    fogNear: 300,
    fogFar: 3700,
  },
  {
    // ВЫСОКОГОРЬЕ. Мост между зелёной долиной и пеплом: холодный серый камень,
    // старый фирн, разрежённый воздух. Свет ещё дневной, но уже без тепла —
    // отсюда одинаково недалеко и до альпийского заката, и до пепельной мглы.
    name: 'high-desert',
    skyZenith: c(0x33385c),
    skyHorizon: c(0xa9a6ae),
    sun: c(0xe8e2d8),
    fog: c(0x9a9aa4),
    snowTint: c(0xbdbcc2),
    distTint: c(0xb6b4bb),
    airColor: c(0xdadbe4),
    airOpacity: 0.4,
    pine: c(0x9aa0a2),
    hemiSky: c(0xa8b2cc),
    hemiGround: c(0xb8bcc6),
    sunDir: new THREE.Vector3(0.55, 0.3, 0.78).normalize(),
    sunIntensity: 1.5,
    skyHalo: 1,
    hemiIntensity: 0.8,
    ambient: c(0xb9c6e8),
    ambientIntensity: 0.32,
    fogNear: 240,
    fogFar: 3000,
  },
  {
    // ★ ПАРОВОЙ ГОРОД (стимпанк). Долина в смоге: небо сепия, солнце —
    // бледное пятно, снег серый от сажи, медь и ржавчина на цехах, белый пар.
    // Дирижабли в небе кладут тени на склон (см. world/airships.ts).
    name: 'steam-city',
    // ★ ПО РЕФЕРЕНСАМ: не сепия-смог, а ЯРКОЕ небо с облаками и тёплое солнце,
    // латунь/медь на куполах и трубах, сине-серый шифер крыш, много белого
    // пара. Контраст — часть характера: город блестит, а не тонет в дыму.
    skyZenith: c(0x5f86bc),
    skyHorizon: c(0xd8d2c6),
    sun: c(0xffe4b8),
    fog: c(0xb9b2a6),
    snowTint: c(0xd4d2d0),  // темноту даёт сама порода (вершины), см. terrain.ts
    distTint: c(0x8e8a86),
    airColor: c(0x6a625a),   // хлопья сажи
    airOpacity: 0.35,
    pine: c(0x5a544e),
    hemiSky: c(0xa8b6cc),
    hemiGround: c(0x6e5e4e),
    sunDir: new THREE.Vector3(0.45, 0.4, 0.8).normalize(),
    sunIntensity: 1.6,
    skyHalo: 0.8,
    skyDim: 1.0,
    hemiIntensity: 0.85,
    ambient: c(0x9c9288),
    ambientIntensity: 0.3,
    fogNear: 260,
    fogFar: 3200,
    backdropSnow: 0.5,
    peakSnow: 0.5,
    backdropRock: c(0x4a423c),
    aurora: 0,
    stars: 0,
  },
];

export class BiomeManager {
  constructor(
    private fog: THREE.Fog,
    private sun: THREE.DirectionalLight,
    private hemi: THREE.HemisphereLight,
    private ambient: THREE.AmbientLight,
    private snowMat: THREE.MeshLambertNodeMaterial,
    private pineMat: THREE.MeshLambertNodeMaterial,
    /** дальний план — та же земля, красится тем же тоном, что и снег */
    private farMat: THREE.MeshLambertNodeMaterial,
    /** кулисы задника */
    private backdropMat: ShaderLike,
    /** цепь пиков */
    private peakMat: ShaderLike,
    /** то, что летит в воздухе */
    private airMat: THREE.PointsNodeMaterial
  ) {}

  update(z: number): void {
    const { a, b, t } = biomeInfoAt(z);
    const A = BIOMES[a % BIOMES.length];
    const B = BIOMES[b % BIOMES.length];
    const k = t * t * (3 - 2 * t);
    const lerp = (x: number, y: number) => x + (y - x) * k;

    // живые цвета PALETTE привязаны к юниформам неба — мутируем на месте
    PALETTE.skyZenith.lerpColors(A.skyZenith, B.skyZenith, k);
    PALETTE.skyHorizon.lerpColors(A.skyHorizon, B.skyHorizon, k);
    PALETTE.sun.lerpColors(A.sun, B.sun, k);
    PALETTE.skyHalo = lerp(A.skyHalo, B.skyHalo);
    PALETTE.peakSnow = lerp(A.peakSnow ?? 1, B.peakSnow ?? 1);
    PALETTE.skyDim = lerp(A.skyDim ?? 1, B.skyDim ?? 1);
    PALETTE.aurora = lerp(A.aurora ?? 0, B.aurora ?? 0);
    PALETTE.stars = lerp(A.stars ?? 0, B.stars ?? 0);
    SUN_DIR.lerpVectors(A.sunDir, B.sunDir, k).normalize();

    this.sun.color.copy(PALETTE.sun);
    this.sun.intensity = lerp(A.sunIntensity, B.sunIntensity);
    this.ambient.color.lerpColors(A.ambient, B.ambient, k);
    this.ambient.intensity = lerp(A.ambientIntensity, B.ambientIntensity);
    this.hemi.color.lerpColors(A.hemiSky, B.hemiSky, k);
    // ★ СИЯНИЕ ПОДСВЕЧИВАЕТ СНЕГ СВЕРХУ: медленный зелёный пульс в небесной
    // составляющей полусферы — иначе занавес в небе, а земля его не знает
    if (PALETTE.aurora > 0.001) {
      const tt = performance.now() * 0.001;
      const pulse = 0.55 + 0.45 * Math.sin(tt * 0.35) * Math.sin(tt * 0.11 + 1.3);
      AUR.setRGB(0.42, 0.9, 0.62);
      this.hemi.color.lerp(AUR, PALETTE.aurora * 0.12 * pulse);
    }
    this.hemi.groundColor.lerpColors(A.hemiGround, B.hemiGround, k);
    this.hemi.intensity = lerp(A.hemiIntensity, B.hemiIntensity);

    this.fog.color.lerpColors(A.fog, B.fog, k);
    this.fog.near = lerp(A.fogNear, B.fogNear);
    this.fog.far = lerp(A.fogFar, B.fogFar);

    this.snowMat.color.lerpColors(A.snowTint, B.snowTint, k);
    this.pineMat.color.lerpColors(A.pine, B.pine, k);
    // дальний план — это та же земля крупной сеткой, тон у них общий
    this.farMat.color.lerpColors(A.snowTint, B.snowTint, k);
    // задник: тон, снежность и цвет дымки — всё живыми юниформами, иначе на
    // стыке с затуманенной землёй лезет полоса чужого цвета
    const bu = this.backdropMat.uniforms;
    bu.uTint.value.lerpColors(A.distTint, B.distTint, k);
    bu.uHaze.value.copy(this.fog.color);
    bu.uSnow.value = lerp(A.backdropSnow ?? 1, B.backdropSnow ?? 1);
    // ★ ПОРОДА КУЛИС — НЕ ТОН ДАЛИ. Здесь стоял distTint, то есть камень под
    // снятым снегом каждый кадр перекрашивался почти белым — и на горизонте
    // вулкана висела бледная «заснеженная» гряда, сколько ни выключай снег.
    bu.uRock.value.lerpColors(A.backdropRock ?? PALETTE.backdropRock, B.backdropRock ?? PALETTE.backdropRock, k);
    this.peakMat.uniforms.uTint.value.lerpColors(A.distTint, B.distTint, k);
    // дымка цепи сходится к текущему туману, как и у кулис
    this.peakMat.uniforms.uHaze.value.copy(this.fog.color);
    this.airMat.color.lerpColors(A.airColor, B.airColor, k);
    this.airMat.opacity = lerp(A.airOpacity, B.airOpacity);
  }
}
