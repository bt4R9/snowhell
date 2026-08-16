import * as THREE from 'three';

// PSX-слой рендера: сцена рисуется в низком разрешении, затем растягивается
// без сглаживания с дизерингом Байера и квантованием цвета до 15 бит.

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// ЭФФЕКТЫ ИДУТ ДО РЕТРО-ПРОХОДА и до HUD. Порядок принципиален: дизеринг и
// квантование должны ложиться на уже готовую картинку (иначе блюр размажет
// сам дизер в грязь), а HUD обязан остаться резким — его подмешиваем ПОСЛЕ
// эффектов, поэтому мир и интерфейс живут в разных проходах.
//
// Все три эффекта — радиальные выборки, поэтому считаются в одном проходе по
// буферу 426×240: там сто тысяч пикселей, тридцать отсчётов на каждый почти
// ничего не стоят.
const FX_FRAG = /* glsl */ `
uniform sampler2D tDiffuse;
uniform vec2 uSunUV;    // солнце в координатах экрана
uniform float uSunAmt;  // 0 — солнце вне кадра/за спиной
uniform float uSpeed;   // 0..1 — сила радиального смаза
varying vec2 vUv;

float luma(vec3 c) { return dot(c, vec3(0.3, 0.6, 0.1)); }

void main() {
  vec2 rad = vUv - vec2(0.5);
  float r2 = dot(rad, rad);

  // --- ХРОМАТИЧЕСКАЯ АБЕРРАЦИЯ. Каналы расходятся ТОЛЬКО к краям кадра
  // (в центре смещение нулевое) — так ведёт себя дешёвая оптика, и так эффект
  // не мешает смотреть туда, куда едешь. На скорости расходятся сильнее.
  // 0.006 подобрано по РАСХОЖДЕНИЮ КАНАЛОВ В ПИКСЕЛЯХ: при 0.022 края
  // расходились на четыре пикселя буфера (двенадцать экранных) — это уже не
  // оптика, а брак печати. Здесь предел около полутора пикселей буфера.
  float ca = (0.9 + uSpeed * 1.6) * r2 * 0.006;
  vec3 base;
  base.r = texture2D(tDiffuse, vUv + rad * ca).r;
  base.g = texture2D(tDiffuse, vUv).g;
  base.b = texture2D(tDiffuse, vUv - rad * ca).b;

  // --- РАДИАЛЬНЫЙ СМАЗ ОТ ЦЕНТРА. Скорость в игре не имеет потолка, но на
  // экране 250 км/ч почти неотличимы от 120: кадр одинаково резкий. Смаз
  // растёт от центра к краям — в середине картинка остаётся читаемой.
  if (uSpeed > 0.01) {
    vec2 d = vUv - vec2(0.5);
    vec3 acc = base;
    for (int i = 1; i <= 6; i++) {
      float t = float(i) / 6.0;
      acc += texture2D(tDiffuse, vUv - d * t * 0.055 * uSpeed).rgb;
    }
    // На полной силе 0.095 кадр на 176 км/ч превращался в кашу: препятствие
    // впереди уже не прочитать, а именно на такой скорости оно и опасно.
    base = mix(base, acc / 7.0, min(1.0, uSpeed * 0.75));
  }

  // --- БЛУМ. Квантование в 15 бит съедает мягкое свечение, а на закате оно
  // и есть половина картинки. Берём яркое сверх порога восемью широкими
  // отсчётами — на таком разрешении этого достаточно для ореола.
  // Порог 0.72 — это 97-й процентиль замеренной яркости кадра: при 0.55 за
  // него уходила пятая часть экрана и блум просто задирал весь снег.
  vec3 bl = vec3(0.0);
  for (int i = 0; i < 8; i++) {
    float a = float(i) * 0.7854;
    vec2 o = vec2(cos(a), sin(a)) * 0.012;
    bl += max(texture2D(tDiffuse, vUv + o).rgb - 0.72, 0.0);
  }
  base += bl * 0.34;

  // --- СОЛНЕЧНЫЕ ЛУЧИ. Идём отсчётами К СОЛНЦУ и копим яркое: там, где путь
  // перекрыт гребнем или деревом, копить нечего — оттого лучи и рисуются
  // сами, без всякой геометрии.
  if (uSunAmt > 0.001) {
    // марш ограничен по длине: солнце часто выше кадра, и без ограничения
    // отсчёты сразу улетают за край, где текстура зажимается в кромку —
    // получалась ровная засветка вместо лучей.
    vec2 toSun = uSunUV - vUv;
    float dist = max(length(toSun), 1e-4);
    vec2 dir = toSun / dist * min(dist, 0.42) / 14.0;
    vec2 uv = vUv;
    float w = 1.0;
    vec3 rays = vec3(0.0);
    for (int i = 0; i < 14; i++) {
      uv += dir;
      vec3 s = texture2D(tDiffuse, uv).rgb;
      rays += max(s - 0.72, 0.0) * w;
      w *= 0.86;
    }
    // ближе к солнцу — плотнее; на краю кадра лучи не должны забивать мир
    float fall = 1.0 - min(1.0, length(vUv - uSunUV) * 0.9);
    base += rays * (0.11 * uSunAmt * (0.35 + 0.65 * fall));
  }

  // --- ВИНЬЕТКА. Кладётся ПОСЛЕДНЕЙ и до квантования: если затемнять уже
  // квантованный кадр, по углам вылезают ступеньки. Буфер линейный, поэтому
  // на экране (после гаммы) падение мягче, чем выглядит в числах.
  base *= mix(1.0, 1.0 - r2 * 1.15, 0.55);

  gl_FragColor = vec4(base, 1.0);
}
`;

const FRAG = /* glsl */ `
uniform sampler2D tDiffuse;
uniform vec2 uRes;
varying vec2 vUv;

float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}

void main() {
  vec2 pix = floor(vUv * uRes);
  vec3 c = texture2D(tDiffuse, vUv).rgb;
  c = pow(max(c, 0.0), vec3(0.4545));
  float d = (bayer2(0.5 * pix) * 0.25 + bayer2(pix)) - 0.5;
  c += d * (1.0 / 24.0);
  c = floor(c * 31.0 + 0.5) / 31.0;
  gl_FragColor = vec4(c, 1.0);
}
`;

export class RetroPipeline {
  private rt: THREE.WebGLRenderTarget;
  /** второй таргет: сюда ложатся эффекты, а поверх — HUD */
  private rtFx: THREE.WebGLRenderTarget;
  private fxMat: THREE.ShaderMaterial;
  private fxScene = new THREE.Scene();
  private postScene = new THREE.Scene();
  private postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private material: THREE.ShaderMaterial;
  lowWidth = 1;
  lowHeight = 1;

  /** pixelScale: во сколько раз занижаем внутреннее разрешение */
  constructor(private renderer: THREE.WebGLRenderer, public pixelScale = 3) {
    this.rt = new THREE.WebGLRenderTarget(1, 1, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      depthBuffer: true,
    });
    this.rtFx = new THREE.WebGLRenderTarget(1, 1, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      depthBuffer: false,
    });
    this.fxMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FX_FRAG,
      uniforms: {
        tDiffuse: { value: this.rt.texture },
        uSunUV: { value: new THREE.Vector2(0.5, 0.8) },
        uSunAmt: { value: 0 },
        uSpeed: { value: 0 },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        tDiffuse: { value: this.rtFx.texture },
        uRes: { value: new THREE.Vector2(1, 1) },
      },
      depthTest: false,
      depthWrite: false,
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3)
    );
    this.postScene.add(new THREE.Mesh(geo, this.material));
    this.fxScene.add(new THREE.Mesh(geo, this.fxMat));
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
    this.material.uniforms.uRes.value.set(lw, lh);
  }

  /**
   * Параметры эффектов на кадр.
   * sunUV — солнце в координатах экрана, sunAmt — насколько оно в кадре,
   * speedN — 0..1 для радиального смаза.
   */
  setEffects(sunX: number, sunY: number, sunAmt: number, speedN: number): void {
    this.fxMat.uniforms.uSunUV.value.set(sunX, sunY);
    this.fxMat.uniforms.uSunAmt.value = sunAmt;
    this.fxMat.uniforms.uSpeed.value = speedN;
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
    this.renderer.render(this.fxScene, this.postCam);
    // 3. HUD поверх эффектов — он обязан остаться резким
    if (uiScene && uiCamera) {
      this.renderer.autoClear = false;
      this.renderer.render(uiScene, uiCamera);
      this.renderer.autoClear = true;
    }
    // 4. ретро-проход на экран
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.postScene, this.postCam);
  }
}
