import * as THREE from 'three/webgpu';
import { lambert } from '../core/mat';

// Фигурка сноубордиста и доска. Стиль PSX: только коробки и плоские грани,
// никаких скруглений — но деталей достаточно, чтобы читался человек, а не
// пара параллелепипедов. Всё держится на скелете из групп: таз → бёдра →
// колени → голени → ботинки и плечи → локти → предплечья.
//
// root — ориентация от физики, lean — процедурные позы (наклон, присед, грэб).

/**
 * ★ ВСЕ МАТЕРИАЛЫ РАЙДЕРА СОБИРАЮТСЯ В СПИСОК. По ним идёт нагрев: чем полнее
 * шкала температуры, тем краснее и горячее выглядит сам райдер — на скорости
 * шкалу в углу не разглядываешь, а фигуру перед носом видно всегда.
 */
const RIG_MATS: Array<{ m: THREE.MeshLambertNodeMaterial; base: THREE.Color; glow?: THREE.Color }> = [];

function mat(color: number, glow?: number): THREE.MeshLambertNodeMaterial {
  const m = lambert({ color, flatShading: true });
  const g = glow !== undefined ? new THREE.Color(glow) : undefined;
  if (g) m.emissive.copy(g);
  RIG_MATS.push({ m, base: new THREE.Color(color), glow: g });
  return m;
}

const HEAT_COL = new THREE.Color(1.9, 0.22, 0.06);
const HEAT_EM = new THREE.Color(0, 0, 0);

/** коробка со смещённым центром — так собирать скелет короче */
function box(
  w: number,
  h: number,
  d: number,
  m: THREE.Material,
  x = 0,
  y = 0,
  z = 0
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  mesh.position.set(x, y, z);
  return mesh;
}

/**
 * СУЖАЮЩАЯСЯ коробка: низ и верх разного размера. Главный инструмент против
 * «кубичности» — у человека нет ни одной части тела с одинаковым сечением
 * сверху и снизу. Граней столько же, сколько у обычной коробки.
 */
function taper(
  bw: number, bd: number,   // ширина/глубина снизу
  tw: number, td: number,   // ширина/глубина сверху
  h: number,
  m: THREE.Material,
  x = 0, y = 0, z = 0,
  shift = 0                 // сдвиг верха вперёд — наклонные формы
): THREE.Mesh {
  const b = h / 2;
  const v = [
    [-bw / 2, -b, -bd / 2], [bw / 2, -b, -bd / 2], [bw / 2, -b, bd / 2], [-bw / 2, -b, bd / 2],
    [-tw / 2, b, -td / 2 + shift], [tw / 2, b, -td / 2 + shift],
    [tw / 2, b, td / 2 + shift], [-tw / 2, b, td / 2 + shift],
  ];
  const f = [
    [0,1,2],[0,2,3], [4,6,5],[4,7,6],       // низ и верх
    [0,4,5],[0,5,1], [1,5,6],[1,6,2],       // бока
    [2,6,7],[2,7,3], [3,7,4],[3,4,0],
  ];
  const pos: number[] = [];
  for (const t of f) for (const i of t) pos.push(v[i][0], v[i][1], v[i][2]);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, m);
  mesh.position.set(x, y, z);
  return mesh;
}

/**
 * Гранёная призма: конечности и голова из шестигранников читаются как
 * объём, а не как брус, но остаются низкополигональными и плоскозатенёнными.
 */
function prism(
  rBot: number, rTop: number, h: number, sides: number,
  m: THREE.Material,
  x = 0, y = 0, z = 0,
  squashZ = 1
): THREE.Mesh {
  const geo = new THREE.CylinderGeometry(rTop, rBot, h, sides, 1);
  geo.scale(1, 1, squashZ);
  const mesh = new THREE.Mesh(geo, m);
  mesh.position.set(x, y, z);
  return mesh;
}

export interface PoseState {
  steer: number;    // -1..1
  crouch: number;   // 0..1
  airborne: boolean;
  grab: boolean;
  grabT: number;    // 0..1 — насколько глубоко тянемся к носу доски
  spin: number;     // -1..1 — скорость вращения в воздухе (корпус ведёт спин)
  tumble: boolean;
  lookYaw: number;  // угол от доски к направлению ХОДА (рад, + влево)
  speedN: number;   // 0..1 — для амплитуды покачивания
  time: number;     // сек — фаза покачивания
  switchRide: boolean; // едем хвостом вперёд — стойку надо отразить
  bank: number;     // рад: крен доски к горизонту вокруг её продольной оси
  /**
   * ★ СТОРОНА ВОЗДУШНОГО ТОРМОЗА. −1 — тянемся ЛЕВОЙ (передней) рукой к
   * носу, +1 — ПРАВОЙ (задней) к хвосту. Это разные жесты: в первом корпус
   * складывается вперёд-вниз, во втором отваливается назад и рука уходит за
   * спину. Одна поза на оба случая читалась бы как одна и та же кнопка.
   */
  brakeSide?: number;
}

const JACKET = 0xff8c3b;
const JACKET_DARK = 0xd96a24;
const PANTS = 0x2a3050;
const PANTS_DARK = 0x1e2340;
const SKIN = 0xe8b48e;
const BOOT = 0x2b2b33;
const BOARD_TOP = 0xff4d5a;
// ★ СКОЛЬЗЯК СВЕТЛЫЙ И ЧУТЬ СВЕТИТСЯ. Чёрное днище на тёмном вулкане
// исчезало вовсе — доска в воздухе читалась одним топшитом. Ледяной цвет плюс
// слабое собственное свечение видны в любой тени.
const BOARD_BASE = 0xbfe4ff;
const BOARD_BASE_GLOW = 0x203a52;
const BINDING = 0x23262f;
const GOGGLE = 0x1b2430;
const GOGGLE_LENS = 0x7fd4e8;
const BEANIE = 0x3542a8;
// Рюкзак СВОИМ цветом, а не тёмной курткой: в тёплом свете тёмно-оранжевый на
// оранжевом сливался в одно пятно, и понять, куда повёрнут корпус, было
// нельзя. Холодный графит-олива отделяется и от куртки, и от синих штанов.
const PACK = 0x4e5a4c;
const PACK_STRAP = 0xcfc7b4;

// длины сегментов ноги — на них считается присед
const THIGH = 0.26;
const SHIN = 0.24;
const HIP_Y = 0.62;   // высота таза в полный рост
const FOOT_Y = 0.12;  // где ступня стоит на доске
// Бёдра выходят из таза почти рядом, а расходятся к ботинкам: ширина стойки
// набирается наклоном ног, а не расстановкой самих бёдер.
const HIP_SPREAD = 0.3;
// Разворот корпуса относительно доски в спокойной стойке
const STANCE = 0.8;
// Доворот плеч к ходу в switch — поверх зеркала стойки
const SWITCH_CRANK = 0.9;
// АНГУЛЯЦИЯ. Ноги живут в плоскости доски, а корпус человек держит ближе к
// вертикали — на косом склоне тело складывается дугой, а не едет «палкой»
// перпендикулярно поверхности. Полностью выпрямиться нельзя (тогда потеряешь
// кант), поэтому корпус отыгрывает больше половины крена, а голова добирает
// остаток.
// На сколько плечи опережают доску на полной скорости спина
const SPIN_LEAD = 0.85;
const BANK_TORSO = 0.55;
const BANK_HEAD = 0.2;
const BANK_MAX = 0.7; // рад — дальше складываться уже некуда

export class Rig {
  root = new THREE.Group();

  /**
   * Нагрев райдера 0..1. Цвет уходит к раскалённому, и добавляется собственное
   * свечение — в тёмном биоме без него краснота тонет в тени.
   */
  setHeat(v: number): void {
    const t = Math.max(0, Math.min(1, v));
    const k = t * t;
    for (const e of RIG_MATS) {
      e.m.color.copy(e.base).lerp(HEAT_COL, k * 0.85);
      HEAT_EM.setRGB(1.5 * k * k, 0.25 * k * k, 0.05 * k * k);
      // собственное свечение детали (скользяк) сохраняется под нагревом
      if (e.glow) HEAT_EM.add(e.glow);
      e.m.emissive.copy(HEAT_EM);
    }
  }
  lean = new THREE.Group();

  private hips = new THREE.Group();
  private torso = new THREE.Group();
  private thighF = new THREE.Group();
  private thighB = new THREE.Group();
  private shinF = new THREE.Group();
  private shinB = new THREE.Group();
  private armFrontUpper = new THREE.Group(); // передняя рука тянется в грэб
  private armFrontLower = new THREE.Group();
  private armBackUpper = new THREE.Group();
  private armBackLower = new THREE.Group();
  private crouchSm = 0;
  private head = new THREE.Group();
  private lookSm = 0;

  constructor() {
    this.lean.add(this.buildBoard());

    // --- ноги: бедро → колено → голень → ботинок ---
    const pants = mat(PANTS);
    const pantsDark = mat(PANTS_DARK);
    const boot = mat(BOOT);
    const legs = [
      { thigh: this.thighF, shin: this.shinF, z: 0.3 },
      { thigh: this.thighB, shin: this.shinB, z: -0.3 },
    ];
    // Таз — единый объём, ноги выходят ИЗ НЕГО. Раньше бёдра стояли сразу
    // на ширине креплений (±0.3), и ноги росли не из туловища, а сбоку.
    this.hips.add(prism(0.175, 0.165, 0.14, 8, mat(PANTS), 0, HIP_Y - 0.05, 0, 0.78));
    for (const l of legs) {
      // стопы чуть развёрнуты — как в креплениях с углами
      l.thigh.rotation.y = l.z > 0 ? 0.22 : -0.12;
      l.thigh.position.set(0, HIP_Y, l.z * HIP_SPREAD);
      // бедро сужается к колену, голень — к щиколотке
      l.thigh.add(prism(0.115, 0.092, THIGH, 6, pants, 0, -THIGH / 2, 0, 1.1));
      l.shin.position.set(0, -THIGH, 0);
      l.shin.add(prism(0.09, 0.075, SHIN, 6, pantsDark, 0, -SHIN / 2, 0, 1.05));
      // ботинок: подошва шире голенища, носок скошен — не брусок
      l.shin.add(taper(0.185, 0.28, 0.16, 0.2, 0.13, boot, 0, -SHIN - 0.05, 0.02, -0.03));
      l.shin.add(taper(0.17, 0.1, 0.15, 0.08, 0.16, boot, 0, -SHIN + 0.03, -0.1, -0.02));
      l.thigh.add(l.shin);
      this.hips.add(l.thigh);
    }
    this.lean.add(this.hips);

    // --- торс: два объёма вместо одной коробки, силуэт живее ---
    const jacket = mat(JACKET);
    const jacketDark = mat(JACKET_DARK);
    this.torso.position.y = HIP_Y;
    // Корпус развёрнут вполоборота к доске — это и есть сноубордическая
    // стойка: плечи вдоль доски, а не поперёк, как у лыжника.
    this.torso.rotation.y = STANCE;
    // ПОРЯДОК ПОВОРОТОВ. По умолчанию (XYZ) крен и сгиб корпуса считаются
    // ПОСЛЕ разворота плеч, то есть их оси уезжают вместе со стойкой: в
    // switch, где плечи стоят почти поперёк доски, боковой завал наполовину
    // превращался в продольный. ZXY кладёт крен на ось доски, а сгиб — на
    // её поперечину, независимо от того, куда развёрнута грудь.
    this.torso.rotation.order = 'ZXY';
    // Крупные массы — ВОСЬМИГРАННИКИ, а не коробки: именно углы большого
    // объёма читаются кубом, сколько его ни сужай. Сечение сплюснуто по
    // глубине — человек шире, чем толще.
    this.torso.add(prism(0.18, 0.16, 0.16, 8, jacketDark, 0, 0.06, 0, 0.72));  // талия
    this.torso.add(prism(0.16, 0.225, 0.28, 8, jacket, 0, 0.28, 0, 0.66));     // грудь
    this.torso.add(prism(0.225, 0.15, 0.12, 8, jacket, 0, 0.48, 0, 0.7));      // плечи покатые
    this.torso.add(prism(0.1, 0.088, 0.1, 8, jacketDark, 0, 0.56, 0, 0.92));   // шея-воротник
    // Рюкзак сидит ПЛОТНО на спине: относить его от тела было попыткой
    // «показать вращение» — оно и так корректно, дело было в стойке (см.
    // историю). Лямка и стяжка остаются: они дают направление.
    this.torso.add(taper(0.28, 0.13, 0.24, 0.11, 0.28, mat(PACK), 0, 0.32, -0.19));
    this.torso.add(box(0.06, 0.26, 0.05, mat(PACK_STRAP), -0.09, 0.34, -0.14));
    this.torso.add(box(0.22, 0.045, 0.045, mat(PACK_STRAP), 0, 0.25, -0.32));

    // голова: очки с линзой, шапка с отворотом и помпоном
    const head = this.head;
    head.position.y = 0.64;
    head.add(prism(0.098, 0.115, 0.14, 8, mat(SKIN), 0, 0.05, 0, 1.0));  // челюсть уже черепа
    head.add(prism(0.115, 0.108, 0.11, 8, mat(SKIN), 0, 0.17, 0, 1.0));
    // ЛИЦО ОБЯЗАНО БЫТЬ НАПРАВЛЕННЫМ. Голова — правильная призма, она
    // симметрична, и поворот на ней не виден вообще: нужны детали, которые
    // есть только спереди. Маска-дуга, нос и подбородок дают направление.
    head.add(prism(0.121, 0.121, 0.075, 8, mat(GOGGLE), 0, 0.155, 0, 1.0)); // ремень маски
    const lens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.128, 0.126, 0.085, 7, 1, true, -1.05, 2.1),
      mat(GOGGLE_LENS)
    );
    lens.position.y = 0.155;
    head.add(lens);
    // оправа над и под линзой — маска читается объёмной, а не наклейкой
    const rim = (y: number, r: number, h: number): THREE.Mesh => {
      const m = new THREE.Mesh(
        new THREE.CylinderGeometry(r, r, h, 7, 1, true, -1.1, 2.2),
        mat(GOGGLE)
      );
      m.position.y = y;
      return m;
    };
    head.add(rim(0.203, 0.131, 0.028));
    head.add(rim(0.108, 0.129, 0.028));
    head.add(taper(0.055, 0.05, 0.038, 0.05, 0.055, mat(SKIN), 0, 0.098, 0.108)); // нос
    head.add(taper(0.115, 0.055, 0.085, 0.05, 0.05, mat(SKIN), 0, 0.038, 0.075)); // подбородок
    head.add(prism(0.124, 0.108, 0.1, 8, mat(BEANIE), 0, 0.25, 0, 1.0));
    head.add(prism(0.133, 0.133, 0.05, 8, mat(0x2a3382), 0, 0.24, 0, 1.0)); // отворот
    head.add(prism(0.074, 0.028, 0.07, 8, mat(BEANIE), 0, 0.32, 0, 1.0));  // помпон
    this.torso.add(head);

    // --- руки: плечо → локоть → предплечье → перчатка ---
    const arms = [
      { up: this.armFrontUpper, low: this.armFrontLower, side: -1 },
      { up: this.armBackUpper, low: this.armBackLower, side: 1 },
    ];
    for (const a of arms) {
      a.up.position.set(a.side * 0.26, 0.43, 0);
      a.up.add(prism(0.082, 0.068, 0.26, 6, jacket, 0, -0.13, 0, 1.05));
      a.low.position.set(0, -0.26, 0);
      a.low.add(prism(0.066, 0.055, 0.24, 6, jacketDark, 0, -0.12, 0, 1.05));
      a.low.add(taper(0.11, 0.13, 0.09, 0.11, 0.12, mat(0x22262e), 0, -0.29, 0.01));
      a.up.add(a.low);
      this.torso.add(a.up);
    }

    this.lean.add(this.torso);
    this.root.add(this.lean);
  }

  /** Доска: скользяк, топшит, загнутые нос и хвост, канты, крепления */
  private buildBoard(): THREE.Group {
    const g = new THREE.Group();
    const top = mat(BOARD_TOP);
    const base = mat(BOARD_BASE, BOARD_BASE_GLOW);
    const edge = mat(0xdfe6f5);
    const binding = mat(BINDING);

    // Контур доски в плане: талия уже, а нос и хвост скруглены к концам.
    // Прямоугольник читается доской для игрушки, а не сноубордом.
    const outline: Array<[number, number]> = [
      [0.0, -0.81], [0.105, -0.74], [0.145, -0.52], [0.15, -0.2],
      [0.128, 0.06], [0.15, 0.32], [0.145, 0.56], [0.105, 0.75], [0.0, 0.81],
    ];
    const deck = (yTop: number, yBot: number, m: THREE.Material): THREE.Mesh => {
      const pos: number[] = [];
      const tri = (a: number[], b: number[], c: number[]): void => {
        pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
      };
      // подъём носа и хвоста — по кубической кривой от центра
      const lift = (z: number): number => Math.max(0, (Math.abs(z) - 0.42) / 0.39) ** 2 * 0.11;
      for (let i = 0; i < outline.length - 1; i++) {
        const [w0, z0] = outline[i];
        const [w1, z1] = outline[i + 1];
        const l0 = lift(z0), l1 = lift(z1);
        const L0T = [-w0, yTop + l0, z0], R0T = [w0, yTop + l0, z0];
        const L1T = [-w1, yTop + l1, z1], R1T = [w1, yTop + l1, z1];
        const L0B = [-w0, yBot + l0, z0], R0B = [w0, yBot + l0, z0];
        const L1B = [-w1, yBot + l1, z1], R1B = [w1, yBot + l1, z1];
        tri(L0T, R0T, R1T); tri(L0T, R1T, L1T);   // верх
        tri(L0B, R1B, R0B); tri(L0B, L1B, R1B);   // низ
        tri(R0T, R0B, R1B); tri(R0T, R1B, R1T);   // правый кант
        tri(L0T, L1B, L0B); tri(L0T, L1T, L1B);   // левый кант
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geo.computeVertexNormals();
      return new THREE.Mesh(geo, m);
    };
    g.add(deck(0.072, 0.05, top));    // топшит
    g.add(deck(0.05, 0.036, base));   // скользяк
    void edge;

    // крепления: база, хайбек и два ремня
    for (const z of [0.3, -0.3]) {
      g.add(box(0.26, 0.03, 0.24, binding, 0, 0.085, z));
      g.add(box(0.24, 0.16, 0.04, binding, 0, 0.16, z - 0.12));
      g.add(box(0.22, 0.035, 0.05, mat(0x3a3f4d), 0, 0.14, z + 0.06));
      g.add(box(0.2, 0.03, 0.05, mat(0x3a3f4d), 0, 0.1, z - 0.02));
    }
    g.add(box(0.12, 0.02, 0.1, mat(0x33373f), 0, 0.09, 0)); // стомп-пад
    return g;
  }

  pose(s: PoseState, dt: number): void {
    let roll = -s.steer * 0.45;
    const groundCrouch = s.airborne || s.tumble ? 0 : s.crouch;
    let pitch = groundCrouch * 0.12;
    let dropY = 0;
    let legTuck = 0;   // 0..1 — поджатые ноги в воздухе
    let armReach = 0;  // 0..1 — рука тянется к доске

    if (s.airborne) {
      pitch = -0.15;
      roll *= 0.5;
      legTuck = 0.45 + 0.55 * s.grabT;
      armReach = s.grabT;
      // в воздухе доску подтягивают к телу — двигаем всю фигуру
      dropY = -0.12 - 0.18 * s.grabT;
      // К НОСУ ТЯНУТСЯ ВСЕМ ТЕЛОМ. Одной рукой до переднего конца доски не
      // достать: от плеча до него около метра, а рука — полметра. Поэтому
      // корпус складывается вперёд-вниз и доворачивается к носу, и только
      // тогда перчатка оказывается на канте. Без этого рука висела рядом с
      // доской, и жест читался как «помахал», а не «взял».
      // к носу складываемся вперёд, к хвосту — отваливаемся назад
      pitch += (s.brakeSide ?? 0) > 0 ? -0.42 * s.grabT : 0.5 * s.grabT;
    }
    if (s.tumble) {
      pitch = -1.5; // лежим на спине
      roll = 0.3;
      dropY = -0.25;
    }

    // В SWITCH доска развёрнута, и её локальная ось смотрит назад: крен и
    // разворот стойки, заданные в осях доски, выглядят зеркально. Поэтому
    // всю боковую асимметрию отражаем — райдер как бы переставляет ноги и
    // едет другой стороной вперёд.
    const mir = s.switchRide ? -1 : 1;
    roll *= mir;
    // Продольный наклон тоже задан в осях доски: приседая, райдер валится к
    // носу — а в switch «нос» смотрит назад, и наклон уходил бы против хода.
    // Падение (tumble) не трогаем: там поза задана относительно доски целиком.
    if (!s.tumble) pitch *= mir;

    const k = (r: number): number => 1 - Math.exp(-r * dt);
    this.lean.rotation.z += (roll - this.lean.rotation.z) * k(11);
    this.lean.rotation.x += (pitch - this.lean.rotation.x) * k(9);
    this.lean.position.y += (dropY - this.lean.position.y) * k(16);

    // ПРИСЕД считается как настоящий сгиб: таз опускается, а углы бедра и
    // голени берутся из обратной кинематики, чтобы ступня осталась на доске.
    // Опускать всю фигуру нельзя — доска тонула бы в снегу вместе с райдером.
    this.crouchSm += (groundCrouch - this.crouchSm) * k(14);
    const c = this.crouchSm;
    const hipY = HIP_Y - c * 0.28;
    this.hips.position.y = hipY - HIP_Y;
    this.torso.position.y = hipY;
    // корпус ещё и подаётся К НОСУ: одного сгиба мало, плечо обязано уехать
    // вперёд, иначе рука не дотягивается до переднего конца доски
    // Числа подобраны РАЗВЁРТКОЙ, а не на глаз: перебором сгиба, выноса и
    // двух углов руки по минимуму расстояния «перчатка — нос доски». Ручная
    // подгонка промахивалась вдвое — я задрал плечо на 2.7 рад, а рука при
    // таком угле уходит ВЫШЕ горизонтали, то есть мимо доски совсем.
    this.torso.position.z = s.grabT * 0.28 * mir * ((s.brakeSide ?? 0) > 0 ? -0.8 : 1);

    // ОБРАТНАЯ КИНЕМАТИКА НОГИ в плоскости доски: бедро выходит из таза
    // (z ≈ ±0.09), ступня стоит в крепление (z ≈ ±0.3) на высоте доски.
    // Ширина стойки набирается наклоном ног, поэтому колени разведены, а
    // ноги растут из туловища, а не приставлены к нему сбоку.
    const clamp = (v: number): number => Math.max(-1, Math.min(1, v));
    const solve = (zHip: number, zFoot: number, tuck: number): [number, number] => {
      const dz = zFoot - zHip;
      const dy = FOOT_Y - hipY;
      const dist = Math.min(Math.hypot(dz, dy), THIGH + SHIN - 0.004);
      const base = Math.atan2(dz, -dy); // 0 — прямо вниз, + — к носу доски
      const A = Math.acos(clamp((THIGH * THIGH + dist * dist - SHIN * SHIN) / (2 * THIGH * dist)));
      const K = Math.PI - Math.acos(
        clamp((THIGH * THIGH + SHIN * SHIN - dist * dist) / (2 * THIGH * SHIN))
      );
      return [-(base + A) - tuck, K + tuck];
    };
    const [tF, sF] = solve(0.3 * HIP_SPREAD, 0.3, legTuck * 0.8);
    const [tB, sB] = solve(-0.3 * HIP_SPREAD, -0.3, legTuck * 0.4);
    this.thighF.rotation.x = tF;
    this.shinF.rotation.x = sF;
    this.thighB.rotation.x = tB;
    this.shinB.rotation.x = sB;
    // Сгиб в поясе — тоже «к носу доски», поэтому в switch зеркалим: иначе
    // в тяжёлом приседе райдер валится спиной вперёд.
    // сгиб в поясе: в грэбе корпус кладётся на переднюю ногу
    this.torso.rotation.x =
      (c * 0.3 + legTuck * 0.25) * (s.tumble ? 1 : mir) + s.grabT * 1.55 * mir;

    // --- АНИМАЦИЯ КОРПУСА, РУК И ГОЛОВЫ ---

    // 1. Корпус валится в дугу сильнее доски: плечи заваливаются внутрь
    // поворота, а грудь раскрывается в его сторону.
    const lean = (s.tumble ? 0 : s.steer) * mir;
    // В switch одного зеркала стойки мало: грудь оказывается в 134° от хода,
    // и голова, упёршись в предел шеи (±1 рад), смотрит ровно вбок — то есть
    // «назад-вбок». Поэтому плечи доворачиваются к ходу ещё на SWITCH_CRANK,
    // вставая почти поперёк доски. Так и едут switch: ноги в креплениях, а
    // корпус развёрнут к новому носу — доворачивает не шея, а торс.
    // в грэбе плечи доворачиваются к носу: тянуться боком невозможно
    // ПЛЮС КОРПУС ВЕДЁТ СПИН. Вращение задаётся не доской, а телом: плечи
    // уходят в поворот первыми, доска следует. Пока этого не было, при спине
    // корпус ехал с доской как приклеенный — рюкзак так и оставался с одной
    // стороны, сколько ни крути, и вращение читалось как поворот декорации.
    // РАЗВОРОТ ПЛЕЧ НЕ ЗЕРКАЛИТСЯ. Райдер пристёгнут: его стойка жёстко
    // связана с ДОСКОЙ, а не с направлением хода. Зеркаля стойку, я отражал
    // её вместе с ходом — два знака гасили друг друга, и относительно
    // движения корпус всегда оказывался одной и той же стороной: после
    // любого спина рюкзак возвращался слева (замер по 0/180/360/540/−180 —
    // все пять «слева»). В switch плечи наоборот ДОВОРАЧИВАЮТСЯ к новому
    // носу (SWITCH_CRANK), и тогда спина честно оказывается с другой стороны.
    // Зеркало остаётся только там, где оно про ГРАВИТАЦИЮ: крен, сгиб, руки.
    const stance =
      STANCE * (1 - 0.92 * s.grabT) +
      (s.switchRide ? SWITCH_CRANK : 0) +
      s.spin * SPIN_LEAD;
    // Крен доски отыгрываем ПРОТИВ знака: доска валится вправо — корпус
    // возвращается влево. Зеркало switch тут ни при чём, это ответ на
    // гравитацию, а не выбор стойки, и считается в тех же осях доски.
    const bankC = Math.max(-BANK_MAX, Math.min(BANK_MAX, -s.bank * BANK_TORSO));
    this.torso.rotation.z += (-lean * 0.26 + bankC - this.torso.rotation.z) * k(8);
    this.torso.rotation.y += (stance + lean * 0.2 - this.torso.rotation.y) * k(8);

    // 2. Голова смотрит ТУДА, КУДА ЕДЕШЬ: разворот корпуса компенсируется,
    // сверху добавляется угол между доской и вектором хода. В switch угол
    // уже приведён к ближайшей оси, поэтому голова не выкручивается назад.
    // Цель задаём в осях ДОСКИ, а не поверх корпуса: куда голова хотела бы
    // смотреть, минус то, что уже отработал корпус. Шея ограничена ±1 рад,
    // поэтому в switch (ход — со стороны хвоста, wantBoard ≈ ∓π) голова
    // просто выкручивается до упора через плечо — ровно как в жизни.
    const torsoYaw = stance + lean * 0.2;
    // Знак цели должен совпадать с направлением ДОВОРОТА ПЛЕЧ. Раньше стойка
    // зеркалилась (mir), и цель бралась с тем же знаком; теперь плечи всегда
    // доворачиваются в плюс, и цель обязана быть в плюс тоже — иначе шея
    // выкручивается в противоположную сторону и голова смотрит назад
    // (замер: 128–134° от вектора хода вместо 25–35°).
    const wantBoard = s.switchRide
      ? Math.PI + 0.25 * mir
      : s.lookYaw * 0.85 + 0.25 * mir;
    const lookTarget = s.tumble
      ? 0
      : Math.max(-1.0, Math.min(1.0, wantBoard - torsoYaw));
    this.lookSm += (lookTarget - this.lookSm) * k(7);
    this.head.rotation.y = this.lookSm;
    this.head.rotation.z = lean * 0.12 + bankC * (BANK_HEAD / BANK_TORSO);
    this.head.rotation.x = -s.crouch * 0.15 + (s.airborne ? 0.1 : 0);

    // 3. Руки. База — стойка равновесия, поверх неё: раскрытие в дугу,
    // лёгкое покачивание от скорости и вынос в грэбе.
    const bob = Math.sin(s.time * 5.2) * 0.09 * s.speedN;
    const bob2 = Math.sin(s.time * 3.7 + 1.9) * 0.07 * s.speedN;
    // Передняя рука уходит вниз-вперёд, к самому носу; предплечье почти
    // выпрямляется — за кант берут прямой рукой, а не сложенной.
    // к носу тянется передняя рука, к хвосту — задняя; вторая в это время
    // работает как обычно
    const toTail = (s.brakeSide ?? 0) > 0;
    const reachF = toTail ? 0 : armReach;
    const reachB = toTail ? armReach : 0;
    const fUp = -0.35 - reachF * 0.63 + lean * 0.55 + bob * (1 - reachF);
    const fLow = -0.25 - reachF * 1.25 - Math.abs(lean) * 0.25 + bob2 * (1 - reachF);
    // РУКИ РАЗЛЕТАЮТСЯ В СПИНЕ. Это и главный признак вращения, и правда:
    // спин закручивают руками. Заодно решает читаемость — рюкзак крутится по
    // орбите в 30 см, а кисть в спине уходит на 70, и силуэт видно издалека.
    const spinOut = Math.abs(s.spin) * (1 - armReach) * 0.85;
    const fSide = (-0.35 - reachF * 0.18) * mir - lean * 0.3 * (1 - reachF) - spinOut;
    this.armFrontUpper.rotation.x += (fUp - this.armFrontUpper.rotation.x) * k(12);
    this.armFrontLower.rotation.x += (fLow - this.armFrontLower.rotation.x) * k(12);
    this.armFrontUpper.rotation.z += (fSide - this.armFrontUpper.rotation.z) * k(12);

    // ЗАДНЯЯ РУКА К ХВОСТУ: плечо разворачивается назад-вниз, предплечье
    // почти выпрямляется — за хвост берут прямой рукой, как и за нос.
    const bUp =
      0.3 + legTuck * 0.4 - lean * 0.5 - bob + Math.abs(s.spin) * 0.35 + reachB * 1.15;
    const bLow = -0.4 - Math.abs(lean) * 0.3 - bob2 - reachB * 0.95;
    const bSide =
      (0.4 + Math.abs(lean) * 0.35 + legTuck * 0.3 + reachB * 0.22) * mir + spinOut;
    this.armBackUpper.rotation.x += (bUp - this.armBackUpper.rotation.x) * k(12);
    this.armBackLower.rotation.x += (bLow - this.armBackLower.rotation.x) * k(12);
    this.armBackUpper.rotation.z += (bSide - this.armBackUpper.rotation.z) * k(12);
  }
}
