import * as THREE from 'three';
import { terrainHeight, terrainColorAt } from './terrain';
import { toValleyU } from './features';

// Дальний план рельефа. Детальные чанки живут лишь на ~190 м вперёд, и
// между их краем и хребтом на горизонте зияла пустая полоса тумана в
// половину экрана. Здесь та же самая функция высоты, но крупной сеткой и
// на километр вокруг: середина кадра заполняется настоящей горой, а не
// заливкой.
//
// Блоки кэшируются как чанки — считаются один раз и переиспользуются.

const FAR = 240; // размер блока
const SEG = 20; // 12 м на ячейку — на 20 м силуэт дальнего гребня шёл лесенкой
const RANGE = 6; // радиус диска ~1440 м
const BUILD_PER_FRAME = 1; // блок = 441 выборка высоты плюс раскраска — по одному за кадр

// ТРЕТИЙ УРОВЕНЬ: очень грубая земля от ~1.4 до ~3.8 км.
// Без него за краем мелкого диска мир заканчивался и в кадре висела гладкая
// кулиса задника — 10 из 13 лучей в «пустой» области попадали именно в неё.
// Пользователь называл это «я решил не рисовать тут геометрию», и был прав
// буквально. Блок 960 м с ячейкой 80 м стоит 169 выборок высоты — дёшево.
const FAR2 = 960;
const SEG2 = 15; // 64 м на ячейку — на 4–5 км разницы не видно, а вчетверо дешевле
// ★ ЗЕМЛЯ ОБЯЗАНА ДОХОДИТЬ ДАЛЬШЕ ТУМАНА. Иначе её край не успевает
// раствориться и виден обрезом, а за обрезом просвечивает задник — это и есть
// «щели». В вулканическом биоме дальность тумана 5200 м, а земля кончалась на
// 3840: край был затуманен лишь на 72%. Радиус 6 даёт 5760 м — за туманом.
const RANGE2 = 5; // радиус ~4800 м
// Просадка грубого уровня. Она НЕ косметическая: грубый блок теперь заходит
// под мелкий диск (см. правило пропуска выше), а ячейка в 48 м перекидывается
// через ложбину и легко оказывается ВЫШЕ детальной земли — тогда поверх
// нормального рельефа вылезает блочная заплата. Замер при 6 м: 18 проб из 684
// внутри мелкого диска торчали выше земли, до +22 м. При 20 м таких не
// остаётся (замер по слоям: из 1368 проб внутри диска выше земли торчат 9, и
// 7 из них — сам мелкий уровень на своих 12-метровых ячейках, а не грубый).
// Глубже 20 не берём: просадка — это ещё и ступенька на краю мелкого диска,
// а на 1.4 км двадцать метров дают 0.8°, тридцать четыре — уже 1.4°.
const SINK2 = 20;

// ПРОСАДКИ У КЭШИРОВАННЫХ БЛОКОВ НЕТ. Раньше весь дальний план был утоплен
// на 2.5 м «на всякий случай» — и на границе детальной зоны появлялась
// ступенька-траншея, ездившая вместе с игроком: издалека она читалась
// тёмными «змеями» вдоль склона, которые пропадали при приближении.
// Кэшированные блоки начинаются в ≥240 м от игрока (кольцо 3×3 пропущено),
// детальные чанки туда не достают — совпадать не с чем, прятать нечего.


export class FarField {
  group = new THREE.Group();

  private blocks = new Map<string, THREE.Mesh>();
  private mat = new THREE.MeshLambertMaterial({
    vertexColors: true,
    flatShading: true,
    polygonOffset: true,
    polygonOffsetFactor: 4,
    polygonOffsetUnits: 4,
  });

  update(px: number, pz: number): void {
    this.updateCenter(px, pz);
    const cx0 = Math.round(px / FAR);
    const cz0 = Math.round(pz / FAR);
    const needed = new Set<string>();
    const missing: Array<[number, number, number]> = [];

    for (let dz = -RANGE; dz <= RANGE; dz++) {
      for (let dx = -RANGE; dx <= RANGE; dx++) {
        // Кольцо вокруг игрока кроет динамический меш (updateCenter):
        // кэшированный блок здесь был бы либо дырой, либо «потолком» — на
        // границе блока сосед начинается прямо над головой игрока.
        // ★ НО ПРОПУСКАТЬ МОЖНО ТОЛЬКО ТО, ЧТО ОН ДЕЙСТВИТЕЛЬНО КРОЕТ. Раньше
        // здесь пропускалось кольцо 3×3 «по построению», хотя два квадрата
        // выровнены ПО РАЗНЫМ сеткам: центральный меш округляется до 40 м,
        // блоки — до 240 м. Расхождение до 120 м, и по бокам открывалась
        // полоса без земли — замер лучами вниз ловил её на 400–500 м.
        // Проверяем честно: блок пропускаем, только если он целиком внутри
        // квадрата центрального меша.
        const bx0 = (cx0 + dx) * FAR - FAR / 2;
        const bz0 = (cz0 + dz) * FAR - FAR / 2;
        const half = (FAR * 3) / 2;
        if (
          bx0 >= this.centerX - half && bx0 + FAR <= this.centerX + half &&
          bz0 >= this.centerZ - half && bz0 + FAR <= this.centerZ + half
        ) continue;
        // Диск, а не квадрат: у квадрата край отрисовки виден ступенчатой
        // блочной границей поперёк кадра, особенно на пологом взгляде.
        if (dx * dx + dz * dz > RANGE * RANGE) continue;
        const key = cx0 + dx + ',' + (cz0 + dz);
        needed.add(key);
        if (!this.blocks.has(key)) {
          missing.push([cx0 + dx, cz0 + dz, dx * dx + dz * dz]);
        }
      }
    }

    // ★ БЮДЖЕТ ПО ВРЕМЕНИ, А НЕ ПО ШТУКАМ. Блок стоит по-разному в зависимости
    // от рельефа под ним, и «один за кадр» то простаивал, то не помещался.
    missing.sort((a, b) => a[2] - b[2]);
    const t0 = performance.now();
    for (let i = 0; i < missing.length; i++) {
      if (i > 0 && performance.now() - t0 > 2) break;
      const [bx, bz] = missing[i];
      const mesh = this.build(bx, bz);
      this.blocks.set(bx + ',' + bz, mesh);
      this.group.add(mesh);
    }

    for (const [key, mesh] of this.blocks) {
      if (needed.has(key)) continue;
      this.group.remove(mesh);
      mesh.geometry.dispose();
      this.blocks.delete(key);
    }

    this.updateCoarse(px, pz);
  }

  private coarse = new Map<string, THREE.Mesh>();

  /** Третий уровень: земля до ~3.8 км, чтобы задник показывал только гребни */
  private updateCoarse(px: number, pz: number): void {
    const cx0 = Math.round(px / FAR2);
    const cz0 = Math.round(pz / FAR2);
    const needed = new Set<string>();
    const missing: Array<[number, number, number]> = [];
    for (let dz = -RANGE2; dz <= RANGE2; dz++) {
      for (let dx = -RANGE2; dx <= RANGE2; dx++) {
        // ★ ДИСК НЕ ЗАКРЫВАЕТ КВАДРАТ. Здесь пропускались центральные 3×3, то
        // есть КВАДРАТ ±1440 м, — «его кроет мелкий диск». Но мелкий диск
        // круглый радиусом ровно 1440 м, а у квадрата угол уходит на 1440·√2 =
        // 2036 м. По четырём диагоналям между 1440 и 2036 м не было НИ ОДНОГО
        // меша земли: замер лучами вниз показал дыры на 45°, 135° и 225° ровно
        // в полосе 1400–2100 м. Сквозь них видно кулису задника — это и есть
        // «щели», где ближний план отсутствует, а дальний нарисован целиком.
        // Пропускаем блок только если он ЦЕЛИКОМ внутри мелкого диска.
        const halfDiag = (FAR2 * Math.SQRT2) / 2;
        if (Math.hypot(dx, dz) * FAR2 + halfDiag <= RANGE * FAR) continue;
        if (dx * dx + dz * dz > RANGE2 * RANGE2) continue;
        const key = cx0 + dx + ',' + (cz0 + dz);
        needed.add(key);
        if (!this.coarse.has(key)) missing.push([cx0 + dx, cz0 + dz, dx * dx + dz * dz]);
      }
    }
    missing.sort((a, b) => a[2] - b[2]);
    const t1 = performance.now();
    for (let i = 0; i < missing.length; i++) {
      if (i > 0 && performance.now() - t1 > 2) break;
      const [bx, bz] = missing[i];
      const mesh = this.buildGrid(
        bx * FAR2 - FAR2 / 2, bz * FAR2 - FAR2 / 2, FAR2, SEG2, () => SINK2
      );
      this.coarse.set(bx + ',' + bz, mesh);
      this.group.add(mesh);
    }
    for (const [key, mesh] of this.coarse) {
      if (needed.has(key)) continue;
      this.group.remove(mesh);
      mesh.geometry.dispose();
      this.coarse.delete(key);
    }
  }

  // --- Динамический центральный меш ---
  // Кэшированный блок под игроком невозможен: без просадки грубая грань,
  // перекинутая через кулуар, проходит над головой («потолок»), с общей
  // просадкой — дыры по бокам от детальных чанков. Поэтому вокруг игрока
  // живёт своя сетка: ближние узлы утоплены (их всё равно кроют чанки),
  // дальние — честные. Перестраивается раз в 40 м, это 169 выборок высоты.
  private center: THREE.Mesh | null = null;
  private centerX = 1e9;
  private centerZ = 1e9;

  /**
   * ★ ЦЕНТРАЛЬНЫЙ МЕШ СОБИРАЕТСЯ ЗА НЕСКОЛЬКО КАДРОВ. Он перестраивается
   * каждые 40 м пути, а в нём 3721 узел по 9 мкс — это 33 мс единым куском,
   * то есть ровно тот фриз «раз в секунду», на который жаловались. Пока новый
   * меш собирается, на месте остаётся старый: он шириной 720 м, отставание в
   * несколько кадров не видно.
   */
  private centerJob: {
    cx: number;
    cz: number;
    heights: number[];
    i: number;
  } | null = null;

  private updateCenter(px: number, pz: number): void {
    const cx = Math.round(px / 40) * 40;
    const cz = Math.round(pz / 40) * 40;
    if (this.centerJob) {
      this.stepCenter();
      return;
    }
    if (cx === this.centerX && cz === this.centerZ) return;
    this.centerJob = { cx, cz, heights: [], i: 0 };
    this.stepCenter();
  }

  private stepCenter(): void {
    const j = this.centerJob!;
    const size = FAR * 3;
    // ★ ЦЕНТРАЛЬНАЯ СЕТКА ПОГРУБЕЕ. При 60 сегментах её сборка (7200
    // треугольников, каждому свой цвет) не помещалась в кадр — замер ловил
    // пики по 43 мс. Она лежит ПОД детальными чанками и видна только с 240 м,
    // где ячейка в 18 м неотличима от 12.
    const seg = SEG * 2;
    const n = seg + 1;
    const step = size / seg;
    const ox = j.cx - size / 2;
    const oz = j.cz - size / 2;
    const mx = j.cx;
    const mz = j.cz;
    const sink = (d: number): number => {
      if (d < 130) return 3 + (1 - d / 130) * 12;
      if (d < 230) return 0.3 + (1 - (d - 130) / 100) * 2.7;
      return 0.3;
    };
    const end = Math.min(n * n, j.i + 420);
    for (let k = j.i; k < end; k++) {
      const i = k % n;
      const jj = (k / n) | 0;
      const x = ox + i * step;
      const z = oz + jj * step;
      j.heights.push(terrainHeight(x, z) - sink(Math.hypot(x - mx, z - mz)));
    }
    j.i = end;
    if (end < n * n) return;
    this.centerX = j.cx;
    this.centerZ = j.cz;
    const mesh = this.gridFromHeights(ox, oz, size, seg, j.heights);
    this.centerJob = null;
    if (this.center) {
      this.group.remove(this.center);
      this.center.geometry.dispose();
    }
    // Просадка динамической сетки — функция расстояния до игрока:
    //  d < 130   — глубоко (до 15 м): здесь она под детальными чанками, и
    //              грубая грань через кулуар не должна вылезти «потолком»;
    //  130..230  — плавно к нулю: ступенька тает до того, как станет видна;
    //  d > 230   — 0.3 м: почти честная высота, но чуть ниже кэшированных
    //              блоков в зоне перекрытия — иначе z-fighting.
    this.center = mesh;
    this.group.add(mesh);
  }

  private build(bx: number, bz: number): THREE.Mesh {
    return this.buildGrid(bx * FAR - FAR / 2, bz * FAR - FAR / 2, FAR, SEG, () => 0);
  }

  /**
   * Сетка size×size из seg ячеек с началом в (ox, oz); sink задаёт просадку
   * узла по горизонтальному расстоянию до центра сетки.
   */
  private buildGrid(
    ox: number,
    oz: number,
    size: number,
    seg: number,
    sink: (dCenter: number) => number
  ): THREE.Mesh {
    const step = size / seg;
    const n = seg + 1;
    const mx = ox + size / 2;
    const mz = oz + size / 2;

    // Высота — ровно та же функция, что у детальных чанков, без всякого
    // сглаживания: любая «своя» обработка здесь превращает стык в кашу.
    const h: number[] = [];
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        const x = ox + i * step;
        const z = oz + j * step;
        h.push(terrainHeight(x, z) - sink(Math.hypot(x - mx, z - mz)));
      }
    }
    return this.gridFromHeights(ox, oz, size, seg, h);
  }

  /** Сборка меша по готовым высотам — общая часть обычной и пошаговой сетки */
  private gridFromHeights(
    ox: number,
    oz: number,
    size: number,
    seg: number,
    h: number[]
  ): THREE.Mesh {
    const step = size / seg;
    const n = seg + 1;
    const pos: number[] = [];
    for (let j = 0; j < seg; j++) {
      for (let i = 0; i < seg; i++) {
        const x0 = i * step;
        const x1 = x0 + step;
        const z0 = j * step;
        const z1 = z0 + step;
        const a = h[j * n + i];
        const b = h[j * n + i + 1];
        const c = h[(j + 1) * n + i + 1];
        const d = h[(j + 1) * n + i];
        // ВНИМАНИЕ: обход вершин против часовой при взгляде СВЕРХУ. При
        // обратной намотке computeVertexNormals даёт нормали ВНИЗ, солнце
        // такую поверхность не освещает вовсе — весь дальний мир оказывается
        // залит одним заполняющим светом (плоское пятно), а наклонные грани
        // уходят в тёмные ленты поперёк склона. Ровно этот баг жил здесь с
        // первой версии и порождал почти все жалобы на «непрорисовку».
        pos.push(x0, a, z0, x1, c, z1, x1, b, z0);
        pos.push(x0, a, z0, x0, d, z1, x1, c, z1);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.computeVertexNormals();

    // Раскраска — ТОЙ ЖЕ функцией, что у детальных чанков. Собственная
    // палитра здесь и была «белибердой»: полоса между детальной землёй и
    // горизонтом не походила ни на то, ни на другое.
    // ★ ЦВЕТ СЧИТАЕТСЯ РАЗ НА ТРЕУГОЛЬНИК, А НЕ НА ВЕРШИНУ. Затенение здесь
    // плоское, все три вершины треугольника всё равно получают один цвет —
    // но вызовов было втрое больше нужного. На центральной сетке это 21600
    // вызовов вместо 7200: замер ловил кадры по 35 мс ровно тут.
    const nor = geo.attributes.normal;
    const vp = geo.attributes.position;
    const col = new Float32Array(vp.count * 3);
    const c = { r: 0, g: 0, b: 0 };
    for (let i = 0; i < vp.count; i += 3) {
      const wz = oz + vp.getZ(i);
      const wu = toValleyU(ox + vp.getX(i), wz);
      terrainColorAt(c, wu, wz, nor.getY(i), vp.getY(i), true);
      for (let k = 0; k < 3; k++) {
        col[(i + k) * 3] = c.r;
        col[(i + k) * 3 + 1] = c.g;
        col[(i + k) * 3 + 2] = c.b;
      }
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mesh = new THREE.Mesh(geo, this.mat);
    mesh.position.set(ox, 0, oz);
    return mesh;
  }

  /** для менеджера биомов: общая тонировка дальнего плана */
  get material(): THREE.MeshLambertMaterial {
    return this.mat;
  }
}
