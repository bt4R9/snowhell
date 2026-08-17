import * as THREE from 'three/webgpu';
import {
  Fn, If, Loop, float, vec2, vec3, vec4, uniform, uv, texture,
  dot, cos, sin, max, min, mix, length, floor, fract, pow,
} from 'three/tsl';

// PSX-слой рендера: сцена рисуется в низком разрешении, затем растягивается
// без сглаживания с дизерингом Байера и квантованием цвета до 15 бит.
//
// ★ WebGPU: те же три прохода, но на RenderTarget + QuadMesh с TSL-узлами.
// Полноэкранные материалы НЕ идут через фабрику psx(): у них нет ни глубины,
// ни тумана, ни дрожания. Гамму по-прежнему кладём сами в последнем проходе,
// поэтому рендерер отдаёт кадр линейным (outputColorSpace = Linear): иначе
// three добавил бы своё преобразование поверх нашего, и картинка выцвела бы.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type N = any;

// ЭФФЕКТЫ ИДУТ ДО РЕТРО-ПРОХОДА и до HUD. Порядок принципиален: дизеринг и
// квантование должны ложиться на уже готовую картинку (иначе блюр размажет
// сам дизер в грязь), а HUD обязан остаться резким — его подмешиваем ПОСЛЕ
// эффектов, поэтому мир и интерфейс живут в разных проходах.
//
// Все три эффекта — радиальные выборки, поэтому считаются в одном проходе по
// буферу 426×240: там сто тысяч пикселей, тридцать отсчётов на каждый почти
// ничего не стоят.
function buildFx(tDiffuse: THREE.Texture, uSunUV: N, uSunAmt: N, uSpeed: N): N {
  const tex = (p: N): N => texture(tDiffuse, p);
  return Fn(() => {
    const vUv = uv();
    const rad = vUv.sub(vec2(0.5));
    const r2 = dot(rad, rad);

    // --- ХРОМАТИЧЕСКАЯ АБЕРРАЦИЯ. Каналы расходятся ТОЛЬКО к краям кадра
    // (в центре смещение нулевое) — так ведёт себя дешёвая оптика, и так эффект
    // не мешает смотреть туда, куда едешь. На скорости расходятся сильнее.
    // 0.006 подобрано по РАСХОЖДЕНИЮ КАНАЛОВ В ПИКСЕЛЯХ: предел около полутора
    // пикселей буфера — дальше это уже не оптика, а брак печати.
    const ca = uSpeed.mul(1.6).add(0.9).mul(r2).mul(0.006);
    const base = vec3(
      tex(vUv.add(rad.mul(ca))).r,
      tex(vUv).g,
      tex(vUv.sub(rad.mul(ca))).b
    ).toVar();

    // --- РАДИАЛЬНЫЙ СМАЗ ОТ ЦЕНТРА. Скорость в игре не имеет потолка, но на
    // экране 250 км/ч почти неотличимы от 120: кадр одинаково резкий. Смаз
    // растёт от центра к краям — в середине картинка остаётся читаемой.
    If(uSpeed.greaterThan(0.01), () => {
      const acc = base.toVar();
      Loop({ start: 1, end: 7, type: 'int', condition: '<' }, ({ i }: { i: N }) => {
        const t = float(i).div(6.0);
        acc.addAssign(tex(vUv.sub(rad.mul(t).mul(0.055).mul(uSpeed))).rgb);
      });
      // На полной силе кадр на 176 км/ч превращался в кашу: препятствие
      // впереди уже не прочитать, а именно на такой скорости оно и опасно.
      base.assign(mix(base, acc.div(7.0), min(1.0, uSpeed.mul(0.75))));
    });

    // --- БЛУМ. Квантование в 15 бит съедает мягкое свечение, а на закате оно
    // и есть половина картинки. Берём яркое сверх порога восемью широкими
    // отсчётами — на таком разрешении этого достаточно для ореола.
    // Порог 0.72 — это 97-й процентиль замеренной яркости кадра: при 0.55 за
    // него уходила пятая часть экрана и блум просто задирал весь снег.
    const bl = vec3(0.0).toVar();
    Loop({ start: 0, end: 8, type: 'int', condition: '<' }, ({ i }: { i: N }) => {
      const a = float(i).mul(0.7854);
      const o = vec2(cos(a), sin(a)).mul(0.012);
      bl.addAssign(max(tex(vUv.add(o)).rgb.sub(0.72), 0.0));
    });
    base.addAssign(bl.mul(0.34));

    // --- СОЛНЕЧНЫЕ ЛУЧИ. Идём отсчётами К СОЛНЦУ и копим яркое: там, где путь
    // перекрыт гребнем или деревом, копить нечего — оттого лучи и рисуются
    // сами, без всякой геометрии.
    If(uSunAmt.greaterThan(0.001), () => {
      // марш ограничен по длине: солнце часто выше кадра, и без ограничения
      // отсчёты сразу улетают за край, где текстура зажимается в кромку —
      // получалась ровная засветка вместо лучей.
      const toSun = uSunUV.sub(vUv);
      const dist = max(length(toSun), 1e-4);
      const dir = toSun.div(dist).mul(min(dist, 0.42)).div(14.0);
      const p = vUv.toVar();
      const w = float(1.0).toVar();
      const rays = vec3(0.0).toVar();
      Loop({ start: 0, end: 14, type: 'int', condition: '<' }, () => {
        p.addAssign(dir);
        rays.addAssign(max(tex(p).rgb.sub(0.72), 0.0).mul(w));
        w.mulAssign(0.86);
      });
      // ближе к солнцу — плотнее; на краю кадра лучи не должны забивать мир
      const fall = min(1.0, length(vUv.sub(uSunUV)).mul(0.9)).oneMinus();
      base.addAssign(rays.mul(uSunAmt.mul(0.11).mul(fall.mul(0.65).add(0.35))));
    });

    // --- ВИНЬЕТКА. Кладётся ПОСЛЕДНЕЙ и до квантования: если затемнять уже
    // квантованный кадр, по углам вылезают ступеньки. Буфер линейный, поэтому
    // на экране (после гаммы) падение мягче, чем выглядит в числах.
    base.mulAssign(mix(1.0, r2.mul(1.15).oneMinus(), 0.55));

    return vec4(base, 1.0);
  })();
}

const bayer2 = Fn(([a0]: [N]) => {
  const a: N = floor(a0);
  return fract(a.x.div(2.0).add(a.y.mul(a.y).mul(0.75)));
});

/** ретро-проход: гамма → дизер Байера → квантование до 5 бит на канал */
function buildRetro(tDiffuse: THREE.Texture, uRes: N): N {
  return Fn(() => {
    const vUv = uv();
    const pix = floor(vUv.mul(uRes));
    const c = pow(max(texture(tDiffuse, vUv).rgb, 0.0), vec3(0.4545)).toVar();
    const d = bayer2(pix.mul(0.5)).mul(0.25).add(bayer2(pix)).sub(0.5);
    c.addAssign(d.mul(1.0 / 24.0));
    c.assign(floor(c.mul(31.0).add(0.5)).div(31.0));
    return vec4(c, 1.0);
  })();
}

export class RetroPipeline {
  /** мир в низком разрешении (читается DEV-хуками для замеров) */
  rt: THREE.RenderTarget;
  /** второй таргет: сюда ложатся эффекты, а поверх — HUD */
  private rtFx: THREE.RenderTarget;
  private fxQuad: THREE.QuadMesh;
  private postQuad: THREE.QuadMesh;
  private uSunUV = uniform(new THREE.Vector2(0.5, 0.8));
  private uSunAmt = uniform(0);
  private uSpeed = uniform(0);
  private uRes = uniform(new THREE.Vector2(1, 1));
  lowWidth = 1;
  lowHeight = 1;

  /** pixelScale: во сколько раз занижаем внутреннее разрешение */
  constructor(private renderer: THREE.WebGPURenderer, public pixelScale = 3) {
    // гамму кладём сами — рендерер отдаёт линейный кадр без своего вывода
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;

    this.rt = new THREE.RenderTarget(1, 1, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      depthBuffer: true,
    });
    this.rtFx = new THREE.RenderTarget(1, 1, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      depthBuffer: false,
    });
    const fxMat = new THREE.NodeMaterial();
    fxMat.fragmentNode = buildFx(this.rt.texture, this.uSunUV, this.uSunAmt, this.uSpeed);
    fxMat.depthTest = false;
    fxMat.depthWrite = false;
    this.fxQuad = new THREE.QuadMesh(fxMat);

    const postMat = new THREE.NodeMaterial();
    postMat.fragmentNode = buildRetro(this.rtFx.texture, this.uRes);
    postMat.depthTest = false;
    postMat.depthWrite = false;
    this.postQuad = new THREE.QuadMesh(postMat);

    this.setSize(window.innerWidth, window.innerHeight);
  }

  setSize(w: number, h: number): void {
    this.renderer.setSize(w, h);
    const lw = Math.max(1, Math.floor(w / this.pixelScale));
    const lh = Math.max(1, Math.floor(h / this.pixelScale));
    this.lowWidth = lw;
    this.lowHeight = lh;
    this.rt.setSize(lw, lh);
    this.rtFx.setSize(lw, lh);
    this.uRes.value.set(lw, lh);
  }

  /**
   * Параметры эффектов на кадр.
   * sunUV — солнце в координатах экрана, sunAmt — насколько оно в кадре,
   * speedN — 0..1 для радиального смаза.
   */
  setEffects(sunX: number, sunY: number, sunAmt: number, speedN: number): void {
    this.uSunUV.value.set(sunX, sunY);
    this.uSunAmt.value = sunAmt;
    this.uSpeed.value = speedN;
  }

  /** uiScene/uiCamera — оверлей (HUD), рисуется поверх эффектов */
  render(
    scene: THREE.Scene,
    camera: THREE.Camera,
    uiScene?: THREE.Scene,
    uiCamera?: THREE.Camera
  ): void {
    // 1. мир → rt
    this.renderer.setRenderTarget(this.rt);
    this.renderer.render(scene, camera);
    // 2. эффекты rt → rtFx
    this.renderer.setRenderTarget(this.rtFx);
    this.fxQuad.render(this.renderer);
    // 3. HUD поверх эффектов — он обязан остаться резким
    if (uiScene && uiCamera) {
      this.renderer.autoClear = false;
      this.renderer.render(uiScene, uiCamera);
      this.renderer.autoClear = true;
    }
    // 4. ретро-проход на экран
    this.renderer.setRenderTarget(null);
    this.postQuad.render(this.renderer);
  }
}
