import * as THREE from 'three';
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
  hemiIntensity: number;
  fogNear: number;
  fogFar: number;
  /** сколько снега на дальних кулисах: 0 — голая порода */
  backdropSnow?: number;
}

const c = (hex: number) => new THREE.Color(hex);

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
    skyZenith: c(0x2b2136),
    skyHorizon: c(0x93502f),
    sun: c(0xc06a3a),
    fog: c(0x5d443e), // пепельная мгла
    snowTint: c(0x6f6874),
    // даль почти чёрная: её вытаскивает только зарево над руслом
    distTint: c(0x877678),
    airColor: c(0x1a1418),
    airOpacity: 0.5,
    pine: c(0x4a4340), // обугленный сухостой
    hemiSky: c(0x6a6076),
    // низ заполнения — отсвет лавы: он и лепит рельеф вместо солнца
    hemiGround: c(0xd07a42),
    sunDir: new THREE.Vector3(0.62, 0.18, 0.75).normalize(),
    sunIntensity: 1.35,
    hemiIntensity: 1.5,
    // ★ МГЛА НЕ ДОЛЖНА СЪЕДАТЬ ГЛАВНЫЙ ОРИЕНТИР. При дальности 2100 м вершины
    // конусов (они в 1.6–1.8 км) растворялись на 77–85% — вулкана попросту не
    // было видно. Ближний план оставляем задымлённым, а даль открываем.
    fogNear: 260,
    // ★ ДАЛЬНОСТЬ ТУМАНА ПРИВЯЗАНА К РАДИУСУ ЗЕМЛИ (4800 м). Если туман
    // уходит дальше земли, её край не растворяется и виден обрезом, а за
    // обрезом просвечивает задник — те самые щели.
    fogFar: 4600,
    // на вулканических кулисах снега нет — там та же порода, что вблизи
    backdropSnow: 0,
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
    hemiIntensity: 0.8,
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
    hemiIntensity: 0.8,
    fogNear: 240,
    fogFar: 3000,
  },
];

export class BiomeManager {
  constructor(
    private fog: THREE.Fog,
    private sun: THREE.DirectionalLight,
    private hemi: THREE.HemisphereLight,
    private snowMat: THREE.MeshLambertMaterial,
    private pineMat: THREE.MeshLambertMaterial,
    /** дальний план — та же земля, красится тем же тоном, что и снег */
    private farMat: THREE.MeshLambertMaterial,
    /** кулисы задника */
    private backdropMat: THREE.ShaderMaterial,
    /** цепь пиков */
    private peakMat: THREE.ShaderMaterial,
    /** то, что летит в воздухе */
    private airMat: THREE.PointsMaterial
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
    SUN_DIR.lerpVectors(A.sunDir, B.sunDir, k).normalize();

    this.sun.color.copy(PALETTE.sun);
    this.sun.intensity = lerp(A.sunIntensity, B.sunIntensity);
    this.hemi.color.lerpColors(A.hemiSky, B.hemiSky, k);
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
    bu.uRock.value.lerpColors(A.distTint, B.distTint, k);
    this.peakMat.uniforms.uTint.value.lerpColors(A.distTint, B.distTint, k);
    this.airMat.color.lerpColors(A.airColor, B.airColor, k);
    this.airMat.opacity = lerp(A.airOpacity, B.airOpacity);
  }
}
