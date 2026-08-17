import * as THREE from 'three/webgpu';
import { basic, withUniforms, ShaderLike } from '../core/mat';
import { Fn, If, uniform, uv, vec3, vec4, mix, smoothstep, clamp, select, Discard } from 'three/tsl';
import { buildTextGeometry } from './font5x7';
import { LandingQuality } from '../tricks';

// HUD целиком на Three.js: отдельная ортографическая сцена в координатах
// низкого разрешения, рендерится в тот же low-res таргет, что и мир, —
// текст проходит через дизеринг и пикселизацию ретро-пайплайна.

class PixelText {
  mesh: THREE.Mesh;
  private mat: THREE.MeshBasicNodeMaterial;
  private text = '';
  private width = 0;
  private x = 0;
  private y = 0;
  private baseScale: number;

  constructor(
    scene: THREE.Scene,
    private align: 'left' | 'center' | 'right',
    scale: number,
    color: number,
    opacity = 1,
    private centeredGeo = false // геометрия вокруг центра — для pop-анимации
  ) {
    this.baseScale = scale;
    this.mat = basic({
      color,
      transparent: true,
      opacity,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(new THREE.BufferGeometry(), this.mat);
    this.mesh.scale.set(scale, scale, 1);
    this.mesh.renderOrder = 10;
    scene.add(this.mesh);
  }

  setText(t: string): void {
    if (t === this.text) return;
    this.text = t;
    this.mesh.geometry.dispose();
    const b = buildTextGeometry(t, this.centeredGeo);
    this.mesh.geometry = b.geo;
    this.width = b.width;
    this.place();
  }

  setPos(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.place();
  }

  setColor(hex: number): void {
    this.mat.color.setHex(hex);
  }

  setOpacity(o: number): void {
    this.mat.opacity = o;
  }

  setScale(s: number): void {
    this.baseScale = s;
    this.mesh.scale.set(s, s, 1);
    this.place();
  }

  setVisible(v: boolean): void {
    this.mesh.visible = v;
  }

  get visible(): boolean {
    return this.mesh.visible;
  }

  /** ширина текста в единицах сцены (с учётом масштаба) */
  get scaledWidth(): number {
    return this.width * this.baseScale;
  }

  /** множитель масштаба для pop-анимации */
  setPop(k: number): void {
    this.mesh.scale.set(this.baseScale * k, this.baseScale * k, 1);
  }

  get current(): string {
    return this.text;
  }

  private place(): void {
    if (this.centeredGeo) {
      this.mesh.position.set(this.x, -this.y, 0);
      return;
    }
    const w = this.width * this.baseScale;
    const off = this.align === 'left' ? 0 : this.align === 'center' ? w / 2 : w;
    this.mesh.position.set(this.x - off, -this.y, 0);
  }
}

const HEAT_W = 96;
const BAL_W = 70; // ширина шкалы баланса в пикселях низкого разрешения

const POP_TIME = 0.35;

export class Hud {
  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(0, 1, 0, -1, -10, 10);

  private speed: PixelText;
  private score: PixelText;
  private combo: PixelText;
  private trick: PixelText;
  /**
   * ★ ВМЕСТО ПОДСКАЗОК — СЧЁТЧИК КАДРА. Управление запоминается за первую
   * минуту, а две строки текста внизу остаются навсегда и отъедают низ экрана.
   * Кадровые цифры полезны постоянно: по ним видно и просадки, и цену любой
   * новой правки.
   */
  private perf: PixelText;
  /**
   * ★ СРЕДНЕЕ ВРЁТ О ПЛАВНОСТИ. Шестьдесят в среднем при редких провалах до
   * двадцати ощущаются хуже, чем ровные сорок пять, а по одной цифре этого не
   * увидеть. Держим окно последних кадров и показываем ещё и худшие проценты:
   * 1% — это заметные рывки, 0.1% — единичные затыки.
   */
  private frames = new Float32Array(1200);
  private frameN = 0;
  private sorted = new Float32Array(1200);
  private fpsT = 0;
  private seed: PixelText;
  private surface: PixelText;
  /** числа поверхности — по строке на параметр, под её названием */
  private surfProps: PixelText[];
  private chargeBg: THREE.Mesh;
  private chargeFill: THREE.Mesh;
  // ШКАЛА БАЛАНСА НА РЕЙЛЕ. Крен доски сам по себе виден плохо: райдер мелкий,
  // а падение наступает раньше, чем глаз успевает оценить угол. Шкала делает
  // состояние читаемым мгновенно — бегунок к центру зелёный, к краю красный.
  private balBg: THREE.Mesh;
  private balMark: THREE.Mesh;
  private balMat: THREE.MeshBasicNodeMaterial;
  // ★ ШКАЛА ПЕРЕГРЕВА. По расплаву можно проехать, но недолго: доска
  // раскаляется. Без шкалы это нечитаемо — игрок не знает, сколько у него
  // осталось, и смерть выглядит случайной. Полоса растёт быстро и остывает
  // медленно, поэтому она же и решает, стоит ли срезать через язык.
  private heatBg: THREE.Mesh;
  private heatFill: THREE.Mesh;
  private heatMat: ShaderLike<THREE.MeshBasicNodeMaterial>;
  private heatT = 0;

  /**
   * ★ ЭКРАНЫ ЖИВУТ В ТОМ ЖЕ HUD, ЧТО И ЦИФРЫ. Меню и вставки в HTML поверх
   * канваса выглядели бы чужими: они не прошли бы ни через дизеринг, ни через
   * понижение разрешения, и получилась бы веб-страница поверх игры. Здесь всё
   * тем же пиксельным шрифтом и в том же низком разрешении.
   */
  private ovDim: THREE.Mesh;
  private ovLines: PixelText[];
  private ovTitle: PixelText;
  private ovMat: THREE.MeshBasicNodeMaterial;
  private ovOn = false;
  /**
   * ★ ЗАПРЕТ СИЛЬНЕЕ ОДНОКРАТНОГО ПРЯТАНЬЯ. Строки поверхности (ACC/GRIP/DRAG)
   * ставятся каждый кадр из игрового цикла и сами себя показывают — спрятанные
   * один раз, они возвращались уже в следующем кадре и мигали поверх вставки.
   * Флаг держит запрет постоянно, а сеттеры его уважают.
   */
  private gameplayOn = true;

  private w = 1;
  private h = 1;
  private landingTimer = 0;
  private popT = 0;
  private lastLive = '';

  constructor() {
    this.speed = new PixelText(this.scene, 'left', 2, 0xffffff);
    this.score = new PixelText(this.scene, 'right', 2, 0xffffff);
    this.combo = new PixelText(this.scene, 'right', 2, 0xffd28a);
    this.trick = new PixelText(this.scene, 'center', 2, 0xffffff, 1, true);
    this.perf = new PixelText(this.scene, 'right', 1, 0xffffff, 0.6);
    this.seed = new PixelText(this.scene, 'left', 1, 0xffffff, 0.45);
    this.surface = new PixelText(this.scene, 'left', 1, 0xffffff, 0.7);
    this.surfProps = [0, 1, 2].map(
      () => new PixelText(this.scene, 'left', 1, 0xffffff, 0.5)
    );

    this.score.setText('0');
    this.perf.setText('-- FPS');

    this.ovMat = basic({
      color: 0x05040a,
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false,
    });
    this.ovDim = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.ovMat);
    this.ovDim.renderOrder = 9;
    this.ovDim.visible = false;
    this.scene.add(this.ovDim);
    this.ovTitle = new PixelText(this.scene, 'center', 3, 0xffffff);
    this.ovTitle.setVisible(false);
    this.ovLines = [0, 1, 2, 3, 4, 5, 6].map(() => {
      const t = new PixelText(this.scene, 'center', 1, 0xffffff);
      t.setVisible(false);
      return t;
    });

    const barGeo = new THREE.PlaneGeometry(1, 1);
    const barMat = (opacity: number) =>
      basic({
        color: 0xffffff,
        transparent: true,
        opacity,
        depthTest: false,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
    this.balBg = new THREE.Mesh(barGeo, barMat(0.22));
    this.balMat = barMat(0.95);
    this.balMark = new THREE.Mesh(barGeo, this.balMat);
    this.balBg.visible = false;
    this.balMark.visible = false;
    this.scene.add(this.balBg, this.balMark);

    // фон шкалы тёмный: на белом подложке зелёная заливка не читалась —
    // казалось, что полоса уже полна
    this.heatBg = new THREE.Mesh(
      barGeo,
      basic({
        color: 0x14121a,
        transparent: true,
        opacity: 0.72,
        depthTest: false,
        depthWrite: false,
      })
    );
    // ★ ГРАДИЕНТ ПО САМОЙ ШКАЛЕ, А НЕ ПО ЕЁ ЦВЕТУ ЦЕЛИКОМ. Полоса, целиком
    // перекрашивающаяся от зелёного к красному, читается как «сменился режим»,
    // а не как «осталось столько-то». Здесь цвет привязан к МЕСТУ на шкале:
    // левый край зелёный, правый красный, и заполнение просто доходит до
    // нужного места. Переход ведём через янтарный — прямой лерп зелёного в
    // красный проходит через грязно-оливковый.
    {
      const uFill = uniform(0);
      const uBlink = uniform(1);
      const m = new THREE.MeshBasicNodeMaterial({ transparent: true, depthTest: false, depthWrite: false });
      m.colorNode = Fn(() => {
        const x = uv().x;
        If(x.greaterThan(uFill), () => Discard());
        const green = vec3(0.22, 0.78, 0.34);
        const amber = vec3(0.98, 0.66, 0.13);
        const red = vec3(0.92, 0.16, 0.12);
        const t = clamp(x, 0.0, 1.0);
        const c = select(
          t.lessThan(0.5),
          mix(green, amber, smoothstep(0.0, 0.5, t)),
          mix(amber, red, smoothstep(0.5, 1.0, t))
        );
        return vec4(c, uBlink.mul(0.95));
      })();
      this.heatMat = withUniforms(m, { uFill, uBlink });
    }
    this.heatFill = new THREE.Mesh(barGeo, this.heatMat);
    this.heatBg.visible = false;
    this.heatFill.visible = false;
    this.scene.add(this.heatBg, this.heatFill);

    this.chargeBg = new THREE.Mesh(barGeo, barMat(0.25));
    this.chargeFill = new THREE.Mesh(barGeo, barMat(0.9));
    this.chargeBg.visible = false;
    this.chargeFill.visible = false;
    this.scene.add(this.chargeBg, this.chargeFill);
  }

  /** w, h — размер low-res буфера ретро-пайплайна */
  /**
   * Показать экран поверх игры.
   * @param title крупная строка (пусто — без неё)
   * @param lines строки помельче
   * @param dim насколько гасить кадр под экраном, 0..1
   */
  setOverlay(title: string, lines: string[], dim: number): void {
    this.ovOn = true;
    this.ovDim.visible = dim > 0.001;
    this.ovMat.opacity = dim;
    this.ovTitle.setVisible(!!title);
    this.ovTitle.setText(title || ' ');
    for (let i = 0; i < this.ovLines.length; i++) {
      const t = lines[i];
      this.ovLines[i].setVisible(!!t);
      if (t) this.ovLines[i].setText(t);
    }
    this.placeOverlay();
  }

  hideOverlay(): void {
    if (!this.ovOn) return;
    this.ovOn = false;
    this.ovDim.visible = false;
    this.ovTitle.setVisible(false);
    for (const t of this.ovLines) t.setVisible(false);
  }

  /** прятать игровые цифры на время меню и вставок */
  setGameplayVisible(v: boolean): void {
    this.gameplayOn = v;
    this.speed.setVisible(v);
    this.score.setVisible(v);
    this.combo.setVisible(v);
    this.surface.setVisible(v);
    for (const p of this.surfProps) p.setVisible(v);
    // ★ ВЕРДИКТ ТРЮКА ВОЗВРАЩАЕТСЯ ЯВНО. Свою видимость он никогда не
    // выставлял — жил всегда включённым, и одного прятанья хватило, чтобы он
    // исчез навсегда.
    this.trick.setVisible(v);
    if (!v) {
      this.heatBg.visible = false;
      this.heatFill.visible = false;
      this.chargeBg.visible = false;
      this.chargeFill.visible = false;
      this.balBg.visible = false;
      this.balMark.visible = false;
    }
  }

  private placeOverlay(): void {
    const w = this.w;
    const h = this.h;
    this.ovDim.scale.set(w * 2, h * 2, 1);
    this.ovDim.position.set(w / 2, -h / 2, 0);
    const big = w < 300 ? 2 : 3;
    this.ovTitle.setScale(big);
    // ★ БЛОК ЦЕНТРИРУЕТСЯ ЦЕЛИКОМ. Если считать от фиксированного верха, экран
    // из двух строк прижимается к макушке, а из шести — уезжает за нижнюю
    // кромку: у вставок число строк каждый раз своё.
    const n = this.ovLines.filter((t) => t.visible).length;
    const step = 11;
    const titleH = this.ovTitle.visible ? big * 7 + 10 : 0;
    const total = titleH + n * step;
    let y = h / 2 - total / 2;
    if (this.ovTitle.visible) {
      this.ovTitle.setPos(w / 2, y);
      y += titleH;
    }
    for (const t of this.ovLines) {
      if (!t.visible) continue;
      t.setPos(w / 2, y);
      y += step;
    }
  }

  layout(w: number, h: number): void {
    this.w = w;
    this.h = h;
    this.camera.right = w;
    this.camera.bottom = -h;
    this.camera.updateProjectionMatrix();

    // на узких вьюпортах — компактный режим
    const headerScale = w < 300 ? 1 : 2;
    this.speed.setScale(headerScale);
    this.score.setScale(headerScale);
    this.combo.setScale(headerScale);
    this.trick.setScale(w < 300 ? 1 : 2);

    this.speed.setPos(8, 8);
    this.score.setPos(w - 8, 8);
    this.combo.setPos(w - 8, 12 + headerScale * 8);
    this.trick.setPos(w / 2, h * 0.82); // ниже персонажа: не перекрывает вид вперёд
    this.perf.setPos(w - 8, h - 11);
    this.seed.setPos(8, h - 11);
    this.surface.setPos(8, 12 + headerScale * 8);
    for (let i = 0; i < this.surfProps.length; i++) {
      this.surfProps[i].setPos(8, 21 + headerScale * 8 + i * 9);
    }

    this.placeOverlay();

    this.chargeBg.scale.set(62, 5, 1);
    this.chargeBg.position.set(w / 2, -(h - 30), 0);
    this.chargeFill.scale.set(0.001, 3, 1);
    this.chargeFill.position.set(w / 2 - 30, -(h - 30), 0);

    // Шкала баланса — над подсказками и заметно выше зарядки прыжка: одна
    // никогда не появляется вместе с другой, но путать их всё равно нельзя.
    // ВЫШЕ вердикта трюка: тот сидит на h*0.82 и в грайнде показывает GRIND —
    // на общей высоте шкала оказывалась ровно под надписью и была не видна.
    // перегрев — вверху по центру: это главное, за чем следишь, пока едешь по
    // расплаву, и глаз не должен уходить ни в угол, ни под ноги
    const hy = -(h * 0.09);
    this.heatBg.scale.set(HEAT_W + 2, 7, 1);
    this.heatBg.position.set(w / 2, hy, 0);
    this.heatFill.scale.set(HEAT_W, 5, 1);
    this.heatFill.position.set(w / 2, hy, 0);

    const balY = -(h * 0.66);
    this.balBg.scale.set(BAL_W + 2, 5, 1);
    this.balBg.position.set(w / 2, balY, 0);
    this.balMark.scale.set(5, 9, 1);
    this.balMark.position.set(w / 2, balY, 0);
  }

  /**
   * ★ У ПОВЕРХНОСТИ ЕСТЬ ЦИФРЫ. Обсидиан держит кант как рельс, пепел
   * тормозит, клинкер сыпется — по одному названию этого не понять, и разница
   * в поведении доски выглядит необъяснимой. Показываем то, что реально
   * меняет физику: разгон (accel), сцепление (grip) и трение (drag).
   */
  setSurface(
    name: string,
    color: number,
    props?: { accel: number; grip: number; drag: number } | null
  ): void {
    if (!this.gameplayOn) {
      this.surface.setVisible(false);
      for (const t of this.surfProps) t.setVisible(false);
      return;
    }
    this.surface.setVisible(true);
    this.surface.setColor(color);
    this.surface.setText(name);
    if (!props) {
      for (const t of this.surfProps) t.setVisible(false);
      return;
    }
    const rows = [
      `ACC   ${props.accel.toFixed(2)}`,
      `GRIP  ${props.grip.toFixed(2)}`,
      `DRAG  ${props.drag.toFixed(2)}`,
    ];
    for (let i = 0; i < this.surfProps.length; i++) {
      this.surfProps[i].setVisible(true);
      this.surfProps[i].setColor(color);
      this.surfProps[i].setText(rows[i]);
    }
  }

  /**
   * Кадровые цифры. Мгновенное значение скачет и нечитаемо, поэтому время
   * кадра сглаживается, а надпись обновляется несколько раз в секунду.
   */
  setFrame(dt: number): void {
    const ms = Math.min(500, dt * 1000);
    this.frames[this.frameN % this.frames.length] = ms;
    this.frameN++;
    this.fpsT -= dt;
    if (this.fpsT > 0) return;
    this.fpsT = 0.3;
    const n = Math.min(this.frameN, this.frames.length);
    if (n < 4) return;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const v = this.frames[i];
      this.sorted[i] = v;
      sum += v;
    }
    // худшие проценты — это ХВОСТ распределения, поэтому сортируем, а не
    // берём максимум: единичный выброс не должен подменять собой картину
    const part = this.sorted.subarray(0, n);
    part.sort();
    const at = (q: number): number =>
      Math.round(1000 / Math.max(0.1, part[Math.min(n - 1, Math.floor(n * q))]));
    const avg = Math.round(1000 / Math.max(0.1, sum / n));
    this.perf.setText(
      `${avg} FPS  1% ${at(0.99)}  0.1% ${at(0.999)}  ${(sum / n).toFixed(1)} MS`
    );
  }

  setSeed(seed: number): void {
    this.seed.setText('SEED ' + seed);
  }

  setSpeed(kmh: number): void {
    this.speed.setText(kmh + ' KM/H');
  }

  setScore(total: number): void {
    this.score.setText(String(total));
  }

  setCombo(mult: number): void {
    this.combo.setText(mult > 1 ? '×' + mult : '');
  }

  /** Баланс на рейле: t — крен −1..1 (±1 = падение) */
  setBalance(active: boolean, t: number): void {
    this.balBg.visible = active && this.gameplayOn;
    this.balMark.visible = active && this.gameplayOn;
    if (!active) return;
    const c = Math.max(-1, Math.min(1, t));
    this.balMark.position.x = this.w / 2 + c * (BAL_W / 2);
    this.balMark.position.y = -(this.h * 0.66);
    // Зелёный у центра, через жёлтый к красному у края. Порог смещён к краю:
    // жёлтый обязан успеть предупредить, а не совпасть с падением.
    const a = Math.abs(c);
    const warn = Math.max(0, Math.min(1, (a - 0.25) / 0.55));
    this.balMat.color.setRGB(
      0.25 + 0.75 * warn,
      0.95 - 0.75 * warn * warn,
      0.35 * (1 - warn)
    );
    this.balMat.opacity = 0.75 + 0.25 * warn;
  }

  /** 0..1 — сколько осталось до расплавления */
  setHeat(v: number, dt = 0): void {
    this.heatT += dt;
    const show = v > 0.02;
    this.heatBg.visible = show && this.gameplayOn;
    this.heatFill.visible = show && this.gameplayOn;
    if (!show) return;
    const t = Math.min(1, v);
    this.heatMat.uniforms.uFill.value = t;
    this.heatMat.uniforms.uBlink.value =
      t > 0.75 ? 0.55 + 0.45 * Math.sin(this.heatT * 18) : 1;
  }

  setCharge(v: number): void {
    const show = v > 0 && this.gameplayOn;
    this.chargeBg.visible = show;
    this.chargeFill.visible = show;
    if (show) {
      this.chargeFill.scale.x = Math.max(60 * v, 0.001);
      this.chargeFill.position.x = this.w / 2 - 30 + 30 * v;
    }
  }

  /** Живой лейбл трюка в воздухе; пустая строка — скрыть */
  airTrick(label: string): void {
    if (this.landingTimer > 0) return; // не перебиваем вердикт приземления
    if (label === this.lastLive) return;
    this.lastLive = label;
    this.trick.setColor(0xffffff);
    this.trick.setOpacity(0.8);
    this.trick.setPop(0.7); // живой лейбл мельче вердикта
    this.trick.setText(label);
  }

  /** Короткое сообщение по центру (сброс на трассу и т.п.) */
  notice(text: string, color = 0xffffff): void {
    this.lastLive = '';
    this.trick.setColor(color);
    this.trick.setOpacity(1);
    this.trick.setText(text);
    this.popT = POP_TIME;
    this.landingTimer = 1.0;
  }

  /** Вердикт приземления: имя трюка + очки, или КРИВО/WIPEOUT */
  landing(
    label: string,
    points: number,
    mult: number,
    quality: LandingQuality,
    tier = ''
  ): void {
    this.lastLive = '';
    let text: string;
    let color = 0xffffff;
    if (quality === 'crash') {
      text = 'WIPEOUT!';
      color = 0xff5a5a;
    } else if (quality === 'sketchy') {
      text = 'SKETCHY!' + (label ? ' ' + label : '');
      color = 0xffd24a;
    } else if (points > 0) {
      // множитель может быть дробным (×1.5 за красивое касание) — лишний
      // ноль в хвосте выглядит как опечатка
      const m = Number.isInteger(mult) ? String(mult) : mult.toFixed(1);
      text = (tier ? tier + ' ' : '') + label + ' +' + points + (mult > 1 ? ' ×' + m : '');
      if (tier === 'PERFECT') color = 0x8cf0b4;
    } else {
      return;
    }
    this.trick.setColor(color);
    this.trick.setOpacity(1);
    this.trick.setText(text);
    this.popT = POP_TIME;
    this.landingTimer = 1.2;
  }

  update(dt: number): void {
    if (this.popT > 0) {
      this.popT = Math.max(0, this.popT - dt);
      const t = 1 - this.popT / POP_TIME;
      const k = t < 0.6 ? 0.6 + (1.15 - 0.6) * (t / 0.6) : 1.15 - 0.15 * ((t - 0.6) / 0.4);
      this.trick.setPop(k);
    }
    if (this.landingTimer > 0) {
      this.landingTimer -= dt;
      if (this.landingTimer <= 0) {
        this.trick.setText('');
      }
    }
  }
}
