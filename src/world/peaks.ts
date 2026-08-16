import * as THREE from 'three';
import { noise2 } from './noise';
import { PALETTE, SUN_DIR } from './palette';
import { valleyX } from './features';
import { terrainHeight } from './terrain';

// ГЛАВНЫЕ ВЕРШИНЫ. Кулисы задника (backdrop.ts) привязаны к игроку и потому
// не дают ПАРАЛЛАКСА вовсе: они висят на одном и том же месте кадра, сколько
// ни едь. Здесь наоборот — каждый массив стоит в МИРОВЫХ координатах и не
// двигается никогда. Параллакс получается сам собой и бесплатно: за километр
// спуска пик в 3.5 км уезжает по кадру градусов на пятнадцать, а кулисы за
// ним не двигаются — глаз читает это как настоящую глубину.
//
// Ставим их БЛИЖЕ ближней кулисы (4.2 км) и чуть дальше края настоящей земли
// (3.84 км, см. farfield.ts): тогда порядок слоёв честный, а низ массива всё
// равно тонет в дымке ровно того же цвета, что и туман, — по той же причине,
// по которой у кулис подножие красится в PALETTE.fog (см. историю с
// «срезанным низом» дальних гор).

// --- ЦЕПЬ, А НЕ ОТДЕЛЬНЫЕ ВЕРШИНЫ ---
// Первая версия ставила одиночные массивы по клеткам, и вдали это читалось
// как расставленные конусы: между ними зияло небо, и «горная страна» не
// собиралась. Настоящий хребет непрерывен — вершины сидят на общем гребне,
// между ними сёдла, вниз уходят контрфорсы. Поэтому теперь по каждую сторону
// долины строится СПЛОШНАЯ лента, а её высота, отступ и рёбра — чистые
// функции z. Стыки сегментов сходятся сами: соседние куски считают одни и те
// же столбцы по общей сетке.

// Шаг столбца задаёт детализацию силуэта: 90 м давали крупные плоские грани,
// на 48 появляются отдельные зубцы и провалы гребня.
const COL = 48;
const COLS_PER_SEG = 26;  // столбцов в одном кэшируемом сегменте
const SEG_Z = COL * COLS_PER_SEG; // 1260 м
const AHEAD = 12000;      // как далеко вперёд держим ленту
const BEHIND = 2500;      // и сколько тащим за собой

// ОТСТУП ОТ ОСИ. Камера смотрит ВНИЗ ПО ДОЛИНЕ с полем зрения ±35°, поэтому
// отношение «вбок / вперёд» обязано быть меньше tan(35°) ≈ 0.7 — иначе хребет
// уезжает за экран. Плюс он не должен подходить к трассе: ось долины виляет
// на сотни метров, а лента тянется на километры, так что зазор берём с
// запасом (замер прошлой версии: при 1300 м вершины подходили к оси на 950).
const DIST_MIN = 2600;
const DIST_VAR = 1500;
const CLEAR = 2000;

// Высота гребня над местной землёй. Спуск съедает 0.5 м на метр, поэтому в
// пяти километрах впереди земля сама по себе на 2.5 км ниже — без такого
// масштаба хребет просто не поднимется над горизонтом.
const H_BASE = 3400;
const H_VAR = 2600;
// ВТОРОЙ РЯД. Один хребет читается кулисой; вторая, более дальняя и более
// высокая цепь, выглядывающая над первой, сразу даёт глубину — это то самое,
// из чего складывается «горная страна», а не стенка по краю долины.
const FAR_ROW = { dist: 2600, hMul: 1.3, phase: 137.5 };

// Уровни лица хребта: доля высоты и насколько уровень выдвинут К ДОЛИНЕ.
// Гора расширяется книзу, поэтому нижние ступени ближе к игроку.
const LEVELS = [
  { h: 1.0, out: 0.0 },
  { h: 0.87, out: 0.08 },
  { h: 0.72, out: 0.19 },
  { h: 0.56, out: 0.32 },
  { h: 0.4, out: 0.45 },
  { h: 0.26, out: 0.58 },
  { h: 0.13, out: 0.7 },
];
const FACE_WIDEN = 900;   // на сколько метров лицо разъезжается к подножию

const SNOW = new THREE.Color(0xeef2fd);
// Скала СВЕТЛАЯ: на такой высоте она наполовину в снегу и всегда в дымке.
// Тёмная порода превращала массив в чёрную стену поперёк кадра.
const ROCK = new THREE.Color(0x8a8698);
// закатный свет на снегу вершины — тот же приём, что и на кулисах
const GLOW = new THREE.Color(0xffc39a);

const VERT = /* glsl */ `
varying vec3 vCol;
varying float vDist;
attribute vec3 color;
void main() {
  vCol = color;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vDist = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`;

// Своя дымка, а не общий туман сцены: тот полностью растворяет всё дальше
// 3.7 км, то есть съел бы вершины целиком. Здесь дымка сгущается медленно,
// поэтому массив виден за 4 км, но остаётся воздушным — и, главное, СЛАБЕЕТ
// по мере приближения. Это и есть вторая половина ощущения параллакса:
// вершина не только уезжает вбок, но и проявляется.
const FRAG = /* glsl */ `
uniform vec3 uHaze;
uniform vec3 uTint;
uniform float uNear;
uniform float uFar;
varying vec3 vCol;
varying float vDist;
void main() {
  float h = clamp((vDist - uNear) / (uFar - uNear), 0.0, 1.0);
  // Потолок дымки 0.62, а не единица: полностью растворённая вершина — это
  // просто пятно тумана, а весь смысл главной горы в том, что она ВИДНА.
  // На закате снег дальней стены светлее неба, а не бледнее его.
  // тон биома ложится на СВОЙ цвет вершины, но не на дымку: иначе дальний
  // хребет разойдётся по тону с туманом сцены и вырежется из картинки
  gl_FragColor = vec4(mix(vCol * uTint, uHaze, h * 0.62), 1.0);
}
`;

// СНЕЖНЫЙ ФЛАГ. Самая узнаваемая деталь восьмитысячника: с гребня в струе
// джет-стрима непрерывно сдувает снег, и с вершины тянется полотнище на
// километры. Стоит трёх десятков треугольников, а читается мгновенно.
const PLUME_VERT = /* glsl */ `
attribute float aA;
varying float vA;
varying float vDist;
void main() {
  vA = aA;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vDist = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`;

const PLUME_FRAG = /* glsl */ `
uniform vec3 uCol;
uniform float uNear;
uniform float uFar;
varying float vA;
varying float vDist;
void main() {
  float h = clamp((vDist - uNear) / (uFar - uNear), 0.0, 1.0);
  gl_FragColor = vec4(uCol, vA * (1.0 - h * 0.55));
}
`;

export class Peaks {
  group = new THREE.Group();

  /** для менеджера биомов: тон цепи */
  get material(): THREE.ShaderMaterial {
    return this.mat;
  }

  private mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uHaze: { value: PALETTE.fog },
      uTint: { value: new THREE.Color(0xffffff) },
      // Подобрано под общий туман сцены: на 2 км мир затуманен на 35%, и
      // хребет обязан быть примерно там же, иначе он вырезан из другой
      // картинки. Чуть чётче — можно: снег ярче склона.
      uNear: { value: 900 },
      uFar: { value: 9000 },
    },
    fog: false,
    side: THREE.DoubleSide,
  });
  private plumeMat = new THREE.ShaderMaterial({
    vertexShader: PLUME_VERT,
    fragmentShader: PLUME_FRAG,
    uniforms: {
      uCol: { value: new THREE.Color(0xfdf3ec) },
      uNear: { value: 900 },
      uFar: { value: 9000 },
    },
    transparent: true,
    // Глубину НЕ пишем: полотнище полупрозрачное, и запись глубины прорезала
    // бы в нём дыры на самопересечениях. Тест оставляем — за скалой флага
    // не видно.
    depthWrite: false,
    side: THREE.DoubleSide,
    fog: false,
  });
  private live = new Map<string, THREE.Mesh>();

  update(pz: number): void {
    const i0 = Math.floor((pz - BEHIND) / SEG_Z);
    const i1 = Math.floor((pz + AHEAD) / SEG_Z);
    for (let i = i0; i <= i1; i++) {
      for (const side of [-1, 1]) {
        // ВТОРОЙ РЯД ОТКЛЮЧЁН. Он давал не глубину, а тёмное пятно поперёк
        // лица первого хребта: дальняя лента выше и местами оказывается ближе
        // к камере, чем ближняя, — на общей глубине это читается кляксой.
        // Вернуть можно, но только разведя ряды по renderOrder и высоте.
        for (const row of [0]) {
          const rk = side + ':' + i + ':' + row;
          if (this.live.has(rk)) continue;
          const m = this.build(side, i, row);
          this.live.set(rk, m);
          this.group.add(m);
        }
      }
    }
    for (const [key, mesh] of this.live) {
      const i = Number(key.split(':')[1]);
      if (i >= i0 && i <= i1) continue;
      this.group.remove(mesh);
      mesh.geometry.dispose();
      for (const ch of mesh.children) {
        if (ch instanceof THREE.Mesh) ch.geometry.dispose();
      }
      this.live.delete(key);
    }
  }

  /**
   * Профиль гребня в столбце. ВСЁ здесь — чистые функции z и стороны,
   * поэтому соседние сегменты сходятся на общем столбце без единого шва.
   */
  private crest(side: number, z: number, row = 0): {
    x: number; y: number; h: number; dist: number; summit: number;
  } {
    // разные хребты слева, справа и во втором ряду
    const sd = (side > 0 ? 0 : 53.7) + (row ? FAR_ROW.phase : 0);
    // Высота: три масштаба. Длинная волна даёт «горную страну» с высокими и
    // низкими участками, средняя — сами вершины и сёдла между ними, короткая
    // — зубцы на гребне. Одной волны мало: получается пила из одинаковых
    // зубьев, а у настоящего хребта есть доминанты.
    // РЕБРИСТЫЙ ШУМ, А НЕ ОБЫЧНЫЙ. Сумма гладких октав даёт ПЛАВНУЮ ВОЛНУ:
    // силуэт выходит как барханы, а не как горы. Приём стандартный и решает
    // всё одной строкой — брать 1 − |шум|: у такого профиля максимумы
    // ОСТРЫЕ (излом в точке, где шум проходит через ноль), а между ними
    // длинные почти прямые склоны. Это и есть гребень.
    const rid = (v: number): number => 1 - Math.abs(v);
    const big = rid(noise2(z * 0.00022 + sd, 3.1));
    const mid = rid(noise2(z * 0.00105 + sd, 8.7));
    const small = rid(noise2(z * 0.0026 + sd, 15.3));
    // ЧАСТОТА ОКТАВЫ ПРИВЯЗАНА К ШАГУ СТОЛБЦА: 0.0092 — это деталь около
    // 110 м при шаге 48 м, то есть меньше двух отсчётов на волну, и гребень
    // рассыпался в вертикальные шипы. Держим не меньше четырёх отсчётов.
    const fine = rid(noise2(z * 0.0045 + sd, 27.4));
    // Веса спадают быстрее обычного: у ребристого шума мелкие октавы дают
    // не рябь, а зазубрины, и их легко переложить.
    const shape = Math.pow(
      big * 0.5 + mid * 0.31 + small * 0.13 + fine * 0.06,
      1.35
    );
    // ХРЕБЕТ ДЫШИТ. Сплошная стена по обе стороны на весь спуск читается
    // коридором, а не пейзажем. Медленная волна (период около 6 км, слева и
    // справа со своими фазами) то поднимает массив рядом с долиной, то роняет
    // его и отодвигает — тогда сторона открывается, видно даль, и следующий
    // массив снова становится событием.
    const presRaw = noise2(z * 0.00016 + sd + 61.3, 47.1) * 0.5 + 0.5;
    // ПОРОГ ПО ЗАМЕРУ, А НЕ НА ГЛАЗ. При (raw − 0.3)/0.4 одна октава почти не
    // доходила до нуля: высота гребня по всему спуску гуляла только между
    // 3.5 и 5.4 км, то есть стена стояла всегда. Сдвигаем порог вверх и режем
    // окно — тогда сторона реально открывается.
    const pres = Math.max(0, Math.min(1, (presRaw - 0.52) / 0.26));
    const presS = pres * pres * (3 - 2 * pres);
    const h = (H_BASE + H_VAR * shape) * (0.22 + 0.78 * presS) * (row ? FAR_ROW.hMul : 1);
    const dist =
      DIST_MIN + DIST_VAR * (noise2(z * 0.00035 - sd, 21.9) * 0.5 + 0.5) +
      (1 - presS) * 2600 +
      (row ? FAR_ROW.dist : 0);
    const x = valleyX(z) + side * Math.max(CLEAR + FACE_WIDEN, dist);
    return { x, y: terrainHeight(x, z) - 900, h, dist, summit: shape };
  }

  private build(side: number, seg: number, row: number): THREE.Mesh {
    const pos: number[] = [];
    const col: number[] = [];
    const c = new THREE.Color();
    const ax = new THREE.Vector3();
    const bx = new THREE.Vector3();
    const nx = new THREE.Vector3();
    type P = { x: number; y: number; z: number; t: number; rib: number };

    const push = (p: P, lit: number, steep: number, hTop: number): void => {
      pos.push(p.x, p.y, p.z);
      // снег по высоте, но СРЫВАЕТСЯ С КРУТЫХ ГРАНЕЙ — то же правило, что и
      // на настоящем склоне; отсюда пояса породы на стенах и белые плечи
      const hT = Math.max(0, Math.min(1, (p.t - 0.16) / 0.26));
      const bare = Math.max(0, Math.min(1, (steep - 0.52) / 0.3));
      let snowT = hT * hT * (3 - 2 * hT) * (1 - bare * bare * (3 - 2 * bare) * 0.9);
      // СНЕГ ЖИВЁТ В КУЛУАРАХ, А РЁБРА ВЫДУВАЕТ. Это и есть узнаваемый рисунок
      // высокой стены: белые полосы, стекающие по желобам, между ними тёмная
      // порода контрфорсов. Стоит одного множителя — тот же профиль ребра,
      // которым построена геометрия, поэтому рисунок ложится ровно по форме,
      // а не поверх неё.
      // Рёбра выдувает, в кулуарах снег держится — но это РИСУНОК, а не
      // способ убрать снег вообще: при 0.55 хребет вышел сплошь серым.
      snowT *= 1 - p.rib * 0.3;
      // Сама вершина — голая порода: снег, растущий с высотой монотонно, даёт
      // сахарную голову, а на восьмитысячнике верхушку выдувает до скалы.
      const scour = Math.max(0, Math.min(1, (p.t - 0.76) / 0.2));
      snowT *= 1 - scour * scour * (3 - 2 * scour) * 0.5;
      c.copy(ROCK).lerp(SNOW, snowT);
      c.multiplyScalar(0.62 + lit * 0.62);
      c.lerp(GLOW, Math.max(0, lit) * hTop * 0.5);
      col.push(c.r, c.g, c.b);
    };
    const tri = (p1: P, p2: P, p3: P): void => {
      ax.set(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
      bx.set(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
      nx.crossVectors(ax, bx).normalize();
      if (nx.y < 0) nx.negate();
      const lit = Math.max(0, nx.dot(SUN_DIR));
      const steep = 1 - nx.y;
      push(p1, lit, steep, p1.t);
      push(p2, lit, steep, p2.t);
      push(p3, lit, steep, p3.t);
    };

    // Столбцы лица. Ребро (контрфорс) — общий для всех уровней множитель по
    // столбцу: если жать шум на каждом уровне отдельно, выходит мятая фольга,
    // а один профиль по z даёт непрерывные рёбра от гребня к подножию.
    const cols: P[][] = [];
    const crests: Array<ReturnType<typeof this.crest>> = [];
    for (let k = 0; k <= COLS_PER_SEG; k++) {
      const z = (seg * COLS_PER_SEG + k) * COL;
      const cr = this.crest(side, z, row);
      crests.push(cr);
      // РЁБРА ДЕЛАЮТ ЛИЦО ВЕРТИКАЛЬНЫМ. Здесь частота НАРОЧНО высокая — одно
      // ребро на два-три столбца: тогда соседние столбцы расходятся по выносу
      // и на лице появляются контрфорсы и кулуары, идущие СВЕРХУ ВНИЗ.
      // Пока рёбра были такой же гладкой волной, как гребень, лицо читалось
      // сложенной тканью: горизонтальные ленты уровней и никакой структуры.
      // Осторожно: эта частота допустима только для ВЫНОСА. У ВЫСОТЫ она
      // рассыпает силуэт в шипы (см. историю с алиасингом).
      const ribA = noise2(z * 0.0125 + side * 7.3 + row * 19, 41.2) * 0.5 + 0.5;
      const ribB = noise2(z * 0.0036 - side * 3.1 + row * 5, 63.8) * 0.5 + 0.5;
      const rib = Math.pow(ribA * 0.62 + ribB * 0.38, 1.25);
      const pts: P[] = [];
      for (const lv of LEVELS) {
        // ниже по лицу — ближе к долине, и тем сильнее, чем выражено ребро
        const out = FACE_WIDEN * lv.out * (0.55 + rib * 0.9);
        pts.push({
          x: cr.x - side * out,
          // ВЫСОТА НЕ ЗАВИСИТ ОТ РЕБРА. Частота ребра нарочно высокая (одно
          // на два-три столбца), и стоит пустить её в высоту хоть на 20% —
          // гребень немедленно превращается в гребёнку из шипов. Ребро живёт
          // ТОЛЬКО в горизонтальном выносе.
          y: cr.y + cr.h * lv.h,
          z,
          t: lv.h,
          rib,
        });
      }
      // подножие уходит глубоко под землю: низ всё равно тонет в дымке,
      // а так лента гарантированно не всплывает над горизонтом обрубком
      pts.push({ x: cr.x - side * FACE_WIDEN, y: cr.y - cr.h * 0.5, z, t: 0, rib });
      cols.push(pts);
    }

    for (let k = 0; k < COLS_PER_SEG; k++) {
      const a = cols[k];
      const b = cols[k + 1];
      for (let l = 0; l < a.length - 1; l++) {
        tri(a[l], b[l], b[l + 1]);
        tri(a[l], b[l + 1], a[l + 1]);
      }
      // Заднего ската НЕТ: материал двусторонний, и хребет не просвечивает,
      // а вот сам скат лез поверх лица тёмным пятном — он ближе к камере там,
      // где гребень отворачивает.
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    const mesh = new THREE.Mesh(geo, this.mat);
    // ПОСЛЕ кулис задника (renderOrder −2), но ДО мира: хребет закрывает
    // кулисы, а настоящая земля закрывает его — ровно тот порядок, в котором
    // он и стоит.
    mesh.renderOrder = -1.9;
    mesh.frustumCulled = false;

    // Флаг — только на самой высокой вершине сегмента, и только если она
    // действительно доминанта. У каждой вершины он превратился бы в шум.
    let bestK = 0;
    for (let k = 1; k <= COLS_PER_SEG; k++) {
      if (crests[k].summit > crests[bestK].summit) bestK = k;
    }
    if (crests[bestK].summit > 0.5) {
      const cr = crests[bestK];
      const zz = (seg * COLS_PER_SEG + bestK) * COL;
      const plume = this.buildPlume(cols[bestK][0], cr.h, zz);
      mesh.add(plume);
    }
    return mesh;
  }

  /** Снежный флаг с вершины: полотнище вдоль долины, чтобы было видно вбок */
  private buildPlume(top: { x: number; y: number; z: number }, H: number, zz: number): THREE.Mesh {
    const wz = noise2(zz * 0.003, 5.5) > 0 ? 1 : -1;
    const wx = noise2(zz * 0.004, 9.1) * 0.7;
    const wl = Math.hypot(wx, 1);
    const dx = wx / wl;
    const dz = wz / wl;
    const L = 1500 + (noise2(zz * 0.002, 13.7) * 0.5 + 0.5) * 1900;
    const N = 9;
    const pp: number[] = [];
    const pa: number[] = [];
    const at = (t: number, up: number): [number, number, number] => [
      top.x + dx * L * t,
      top.y + H * 0.05 * Math.sin(t * 2.4) - H * 0.16 * t * t + up,
      top.z + dz * L * t,
    ];
    for (let i = 0; i < N; i++) {
      const t0 = i / N;
      const t1 = (i + 1) / N;
      const w0 = H * (0.035 + t0 * 0.16);
      const w1 = H * (0.035 + t1 * 0.16);
      const a0 = Math.pow(1 - t0, 1.4) * 0.5;
      const a1 = Math.pow(1 - t1, 1.4) * 0.5;
      const [x0u, y0u, z0u] = at(t0, w0);
      const [x0d, y0d, z0d] = at(t0, -w0 * 0.35);
      const [x1u, y1u, z1u] = at(t1, w1);
      const [x1d, y1d, z1d] = at(t1, -w1 * 0.35);
      pp.push(x0d, y0d, z0d, x1d, y1d, z1d, x1u, y1u, z1u);
      pa.push(a0, a1, a1);
      pp.push(x0d, y0d, z0d, x1u, y1u, z1u, x0u, y0u, z0u);
      pa.push(a0, a1, a0 * 0.5);
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.Float32BufferAttribute(pp, 3));
    pg.setAttribute('aA', new THREE.Float32BufferAttribute(pa, 1));
    const plume = new THREE.Mesh(pg, this.plumeMat);
    plume.renderOrder = -1.85;
    plume.frustumCulled = false;
    return plume;
  }
}
