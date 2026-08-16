// Процедурный звук на WebAudio — без аудиофайлов.
// Три непрерывных слоя (кант, ветер, грайнд) + одноразовые события.
// AudioContext создаётся лениво и включается первым настоящим нажатием
// клавиши (политика автоплея браузера). M — мьют.

interface LoopChannel {
  filter: BiquadFilterNode;
  gain: GainNode;
}

export interface SoundState {
  speed: number;      // м/с
  grounded: boolean;
  grinding: boolean;
  airborne: boolean;
  carve: number;      // мера сноса из физики
  charge: number;     // 0..1 зарядка прыжка
  surface: number;    // 0 наст, 1 рыхлый, 2 лёд, 3 земля
  volc?: number;      // 0..1 — вес вулканического биома
  /**
   * ★ ВО ВСТАВКАХ ЕЗДЫ НЕ СЛЫШНО. Доска на паузе, а слои канта и ветра шли по
   * последней скорости — под ролик всё это время шипело. Обнулять их снаружи
   * подменой состояния нельзя: тогда звук обрывается щелчком. Флаг гасит их
   * теми же плавными постоянными, что и обычное замедление.
   */
  muted?: boolean;
}

// Характер звука под доской: [множитель громкости, множитель частоты, Q]
const SURFACE_TONE: Array<[number, number, number]> = [
  [1.0, 1.0, 0.5],   // укатанный наст — эталонное «шшш»
  [0.75, 0.45, 0.4], // рыхлый снег: глухой мягкий шорох
  [1.25, 1.9, 1.4],  // лёд: звонкий резкий скрежет канта
  [1.15, 1.25, 2.2], // земля и камни: жёсткий шорох с призвуком
];

// ★ НА ВУЛКАНЕ ПОД ДОСКОЙ НЕ СНЕГ. Снежное «шшш» — это шелест мелких
// кристаллов: высокий, шипящий, почти без тела. Пепел и шлак звучат иначе —
// ниже, суше, зернистее, как песок под подошвой; по стеклу и базальту идёт
// сухой шорох камня. Специально держим тише снежного: сплошной шум в
// наушниках на всю дорогу утомляет быстрее любого другого звука.
// ★ ТИШЕ — НЕ ЗНАЧИТ НИЖЕ. Первая версия срезала и громкость (−28%), и
// частоту фильтра (вдвое): полосовой шум на килогерце ухо почти не берёт, и
// звук езды пропал совсем. Характер задаём частотой умеренно, а громкость
// держим на уровне снежной — иначе поверхность просто немая.
const VOLC_TONE: Array<[number, number, number]> = [
  [1.15, 0.78, 0.85], // пепел: сухой шелест, ниже и зернистее снега
  [1.25, 0.66, 0.75], // шлак: крупное зерно, ещё ниже
  [1.0, 1.0, 1.5],    // обсидиан: стеклянный сип, но без ледяного визга
  [1.1, 0.85, 1.7],   // базальт: жёсткий короткий шорох камня
];

const MAX_SPEED = 44;

export class Sound {
  private ctx?: AudioContext;
  private master?: GainNode;
  private carve?: LoopChannel;
  private wind?: LoopChannel;
  private grind?: LoopChannel;
  private sizzle?: LoopChannel;
  private rumble?: LoopChannel;
  private whistle?: LoopChannel;
  private muted = false;

  constructor() {
    const unlock = () => {
      this.ensure();
      void this.ctx?.resume();
    };
    window.addEventListener('keydown', unlock);
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyM' && !e.repeat) this.toggleMute();
    });
  }

  toggleMute(): void {
    this.muted = !this.muted;
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(this.muted ? 0 : 0.5, this.ctx.currentTime, 0.05);
    }
  }

  private ensure(): void {
    if (this.ctx) return;
    const ctx = new AudioContext();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.5;
    this.master.connect(ctx.destination);

    // белый шум — для ветра и грайнда
    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    this.noiseBuf = noiseBuf;

    // коричневый шум — глухой гул для ветра
    const brownBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const bd = brownBuf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bd.length; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      bd[i] = last * 3.5;
    }

    // розовый шум — «шшшш» скольжения: мягче белого, ярче коричневого
    const pinkBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const pd = pinkBuf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0;
    for (let i = 0; i < pd.length; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.969 * b2 + w * 0.153852;
      b3 = 0.8665 * b3 + w * 0.3104856;
      b4 = 0.55 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.016898;
      pd[i] = (b0 + b1 + b2 + b3 + b4 + b5 + w * 0.5362) * 0.11;
    }

    const mkLoop = (
      buf: AudioBuffer,
      type: BiquadFilterType,
      freq: number,
      q: number
    ): LoopChannel => {
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = type;
      filter.frequency.value = freq;
      filter.Q.value = q;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.master!);
      src.start();
      return { filter, gain };
    };

    this.carve = mkLoop(pinkBuf, 'bandpass', 1600, 0.5); // «шшшш» канта по снегу
    this.wind = mkLoop(brownBuf, 'bandpass', 450, 0.6);  // ветер — глухой гул
    this.grind = mkLoop(noiseBuf, 'bandpass', 2400, 2.0); // скрежет рейла
    this.sizzle = mkLoop(noiseBuf, 'bandpass', 3800, 3.2); // треск искр из-под канта
    this.rumble = mkLoop(brownBuf, 'lowpass', 140, 0.7);  // гул снарядов в воздухе
    const curve = new Float32Array(1024);
    for (let i = 0; i < curve.length; i++) {
      const v = (i / (curve.length - 1)) * 2 - 1;
      curve[i] = Math.tanh(v * 2.6);
    }
    this.satCurve = curve;

    // ★ ЛУЧ — ЭТО ИСТОЧНИК В ТОЧКЕ, А НЕ ФОН. Он режет землю в конкретном месте
    // склона, и по звуку должно быть слышно, с какой стороны идёт рез, — иначе
    // от него нет никакой информации. Поэтому оба его слоя идут через ОБЩУЮ
    // панораму, которую каждый кадр наводят на точку касания.
    const bp = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (bp) bp.connect(this.master!);
    this.beamPan = bp ?? undefined;
    const beamOut: AudioNode = bp ?? this.master!;
    const mkBeam = (
      buf: AudioBuffer,
      type: BiquadFilterType,
      freq: number,
      q: number
    ): LoopChannel => {
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = type;
      filter.frequency.value = freq;
      filter.Q.value = q;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      src.connect(filter);
      filter.connect(gain);
      gain.connect(beamOut);
      src.start();
      return { filter, gain };
    };
    // ★ ЛУЧ ДОЛЖЕН ЖИТЬ В СРЕДНИХ ЧАСТОТАХ, А НЕ ПО КРАЯМ. Было два слоя:
    // коричневый гул под 240 Гц и шипение на 2.9 кГц. Первый на обычных
    // колонках скорее ощущается, чем слышится, второй попадает ровно в полосу
    // шума канта (замер уровней: кант 0.203, шипение луча 0.085) и им же
    // маскируется — вместе это читалось как «звук пропал». Основную работу
    // теперь делает средний слой около 560 Гц: там не занято ничем.
    this.beamLow = mkBeam(brownBuf, 'lowpass', 190, 1.1);
    this.beamMid = mkBeam(noiseBuf, 'bandpass', 560, 1.6);
    this.beamHiss = mkBeam(noiseBuf, 'bandpass', 1900, 1.2);

    // ★ НАКОПЛЕНИЕ СЛЫШНО РАНЬШЕ, ЧЕМ ВИДНО. Око заряжается почти три секунды,
    // и всё это время игрок может смотреть не на башню. Поднимающийся вой —
    // единственное предупреждение, которое работает при любом ракурсе.
    const co = ctx.createOscillator();
    co.type = 'sawtooth';
    co.frequency.value = 70;
    const cf = ctx.createBiquadFilter();
    cf.type = 'bandpass';
    cf.frequency.value = 900;
    cf.Q.value = 4;
    const cg = ctx.createGain();
    cg.gain.value = 0;
    co.connect(cf);
    cf.connect(cg);
    cg.connect(this.master!);
    co.start();
    this.chargeOsc = co;
    this.chargeFil = cf;
    this.chargeGain = cg;
    this.whistle = mkLoop(noiseBuf, 'bandpass', 900, 6.0); // свист падающего рядом
  }

  private noiseBuf?: AudioBuffer;
  /**
   * Кривая мягкого клиппера для взрывов: без перегруза низ звучит ватно.
   * ★ ХРАНИМ КРИВУЮ, А НЕ УЗЕЛ. Общий WaveShaper был настоящей ошибкой графа:
   * каждый слой каждого взрыва делал `crush.connect(g)` и никогда не отключался.
   * Выход клиппера навсегда оставался подключён ко ВСЕМ gain-ам всех прошлых
   * взрывов, поэтому любой новый разрыв звучал ещё и через сотню старых цепочек
   * — отсюда металлический звон и «двойной удар». Плюс утечка узлов.
   * Теперь клиппер создаётся на каждый взрыв и умирает вместе с ним.
   */
  private satCurve?: Float32Array;

  /** слои луча ока и их общая панорама */
  private beamLow?: LoopChannel;
  private beamMid?: LoopChannel;
  private beamHiss?: LoopChannel;
  private beamPan?: StereoPannerNode;
  private chargeOsc?: OscillatorNode;
  private chargeFil?: BiquadFilterNode;
  private chargeGain?: GainNode;
  private wasCutting = false;

  /**
   * Звук второй атаки; вызывается каждый кадр.
   * @param charge 0..1 — насколько око налилось перед резом
   * @param cutting идёт ли рез прямо сейчас
   * @param pan −1..1 — где точка касания относительно хода
   * @param dist до точки касания, м
   */
  eyeBeam(charge: number, cutting: boolean, pan: number, dist: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.beamLow || !this.beamMid || !this.beamHiss || !this.chargeGain) return;
    const t = ctx.currentTime;
    // близость точки реза: вблизи слышно шипение прожига, вдали только гул
    const near = Math.max(0, 1 - dist / 420);

    const c = cutting ? 0 : charge * charge;
    this.chargeGain.gain.setTargetAtTime(c * 0.11, t, 0.09);
    if (this.chargeOsc) this.chargeOsc.frequency.setTargetAtTime(64 + c * 210, t, 0.14);
    if (this.chargeFil) this.chargeFil.frequency.setTargetAtTime(500 + c * 2100, t, 0.14);

    const on = cutting ? 1 : 0;
    this.beamLow.gain.gain.setTargetAtTime(on * 0.2, t, 0.05);
    this.beamLow.filter.frequency.setTargetAtTime(140 + near * 160, t, 0.2);
    // средний слой — то, чем луч слышно: громче остальных и не гаснет с далью
    this.beamMid.gain.gain.setTargetAtTime(on * 0.26 * (0.45 + near * 0.55), t, 0.05);
    this.beamMid.filter.frequency.setTargetAtTime(430 + near * 260, t, 0.2);
    this.beamHiss.gain.gain.setTargetAtTime(on * 0.15 * (0.2 + near * 0.8), t, 0.06);
    this.beamHiss.filter.frequency.setTargetAtTime(1500 + near * 900, t, 0.2);
    if (this.beamPan) {
      this.beamPan.pan.setTargetAtTime(Math.max(-1, Math.min(1, pan)), t, 0.08);
    }

    // ★ У ВКЛЮЧЕНИЯ ЕСТЬ СВОЙ УДАР. Плавно поднявшийся гул читается как
    // «что-то загудело»; резкий фронт в момент пробоя — как «выстрелило».
    if (cutting && !this.wasCutting) {
      this.sweepNoise(240, 3200, 0.16, 0.22);
      this.sweepNoise(1800, 180, 0.5, 0.14);
    }
    this.wasCutting = cutting;
  }

  /** Непрерывные слои; вызывается каждый кадр */
  update(s: SoundState): void {
    const ctx = this.ctx;
    if (!ctx || !this.carve || !this.wind || !this.grind) return;
    const t = ctx.currentTime;
    const spN = Math.min(1, s.speed / MAX_SPEED);

    const snowTone = SURFACE_TONE[s.surface] ?? SURFACE_TONE[0];
    const ashTone = VOLC_TONE[s.surface] ?? VOLC_TONE[0];
    const vw = Math.max(0, Math.min(1, s.volc ?? 0));
    const tone: [number, number, number] = [
      snowTone[0] + (ashTone[0] - snowTone[0]) * vw,
      snowTone[1] + (ashTone[1] - snowTone[1]) * vw,
      snowTone[2] + (ashTone[2] - snowTone[2]) * vw,
    ];
    const off = s.muted === true;
    const carveVol = s.grounded && !s.grinding && !off
      ? Math.min(0.5, (spN * 0.26 + Math.min(0.14, s.carve * 0.012)) * tone[0])
      : 0;
    // в ноль затухаем быстро: в полёте кант звучать не должен
    this.carve.gain.gain.setTargetAtTime(carveVol, t, carveVol === 0 ? 0.03 : 0.08);
    // ярчеет со скоростью — от мягкого шороха к звонкому резу
    this.carve.filter.frequency.setTargetAtTime((1100 + spN * 1500) * tone[1], t, 0.1);
    this.carve.filter.Q.setTargetAtTime(tone[2], t, 0.15);

    const windVol = off ? 0 : Math.min(0.4, spN * spN * spN * (s.airborne ? 0.6 : 0.22));
    this.wind.gain.gain.setTargetAtTime(windVol, t, 0.15);
    this.wind.filter.frequency.setTargetAtTime(380 + spN * 340, t, 0.15);

    this.grind.gain.gain.setTargetAtTime(s.grinding && !off ? 0.4 : 0, t, 0.03);
    this.grind.filter.frequency.setTargetAtTime(2000 + spN * 1500, t, 0.05);
  }

  /** Хлопок приземления; intensity 0..1 */
  landing(intensity: number): void {
    if (!this.ready()) return;
    this.thump(70, 40, 0.16, 0.5 * intensity + 0.15);
    this.noiseBurst(320, 0.15, 0.35 * intensity + 0.1);
  }

  jump(power: number): void {
    if (!this.ready()) return;
    this.sweepNoise(300, 1100, 0.22, 0.16 + power * 0.12);
  }

  crash(): void {
    if (!this.ready()) return;
    this.thump(80, 28, 0.32, 0.6);
    this.noiseBurst(220, 0.3, 0.45);
  }

  /** Чистый трюк: высота арпеджио растёт с комбо */
  clean(combo: number): void {
    if (!this.ready()) return;
    const base = 620 * Math.pow(1.06, Math.min(combo, 9));
    this.pluck(base, 0);
    this.pluck(base * 1.335, 0.07); // кварта следом
  }

  sketchy(): void {
    if (!this.ready()) return;
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = 'square';
    const g = ctx.createGain();
    const t = ctx.currentTime;
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(85, t + 0.22);
    g.gain.setValueAtTime(0.16, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(g);
    g.connect(this.master!);
    osc.start(t);
    osc.stop(t + 0.26);
  }

  grindStart(): void {
    if (!this.ready()) return;
    this.noiseBurst(3200, 0.07, 0.3);
  }

  /**
   * ★ ИСКРЫ ИЗ-ПОД КАНТА — ОТДЕЛЬНЫЙ СЛОЙ, А НЕ ОДИН И ТОТ ЖЕ ШОРОХ.
   * Доска по раскалённому шву идёт как по точилу: к шелесту добавляется
   * высокий сухой треск. Держим его тихим и с быстрым спадом — постоянный
   * звенящий шум на всю дорогу утомляет сильнее всего.
   */
  sparks(amount: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.sizzle) return;
    const t = ctx.currentTime;
    const a = Math.max(0, Math.min(1, amount));
    this.sizzle.gain.gain.setTargetAtTime(a * 0.13, t, a > 0 ? 0.05 : 0.12);
    this.sizzle.filter.frequency.setTargetAtTime(3400 + a * 2600, t, 0.1);
  }

  /**
   * ★ У ОБСТРЕЛА ТРИ ЗВУКА, И ОНИ РАЗНЫЕ ПО РОЛИ.
   *  • ГУЛ — общий низкий рокот от всех снарядов в воздухе; говорит, что
   *    обстрел идёт, но ни на что не указывает;
   *  • ПОДХОД — свист конкретного снаряда, который валится рядом; он и есть
   *    сигнал «уходи», поэтому тон тем выше, чем ближе падение;
   *  • ВЗРЫВ — удар с раскатом.
   * Гул держим тихим: это фон, а не событие, иначе за ним не слышно свиста.
   *
   * @param count сколько снарядов в воздухе
   * @param near 0..1 — насколько близко ближайшее падение (1 — вот-вот)
   */
  shells(count: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.rumble) return;
    const t = ctx.currentTime;
    // ★ ГУЛ — ЭТО ФОН, И БОЛЬШЕ НИЧЕГО. Он говорит «обстрел идёт», но ни на что
    // не указывает; всю работу сигнала делает свист отдельного снаряда.
    const c = Math.min(1, count / 12);
    this.rumble.gain.gain.setTargetAtTime(c * 0.05, t, 0.3);
    this.rumble.filter.frequency.setTargetAtTime(90 + c * 70, t, 0.4);
  }

  /**
   * ★ СВИСТ — СОБЫТИЕ НА КАЖДЫЙ СНАРЯД, А НЕ ОБЩИЙ ФИЛЬТР. Непрерывный слой,
   * которому крутили частоту по «близости ближайшего», звучал одной вялой
   * нотой: слышно, что что-то есть, но не слышно, что летит именно в тебя.
   * Теперь каждый подходящий снаряд свистит сам — тон ПАДАЕТ (снаряд идёт
   * мимо уха вниз), громкость по дальности. Несколько сразу дают именно то
   * ощущение накрытия, которого не хватало.
   *
   * @param dist расстояние до точки падения
   * @param size размер снаряда — крупный воет ниже
   */
  incoming(dist: number, size: number, pan = 0): void {
    if (!this.ready()) return;
    const ctx = this.ctx!;
    const t = ctx.currentTime;
    const v = Math.max(0, 1 - dist / 130);
    if (v <= 0.02) return;
    const big = Math.min(1, size / 4);
    const f0 = 1150 - big * 520;
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.exponentialRampToValueAtTime(f0 * 0.34, t + 1.15);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05 * v * (0.6 + big * 0.7), t + 0.55);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
    osc.connect(g);
    g.connect(this.place(pan));
    osc.start(t);
    osc.stop(t + 1.25);
    // сухая воздушная струя поверх тона — без неё свист звучит как терменвокс
    this.sweepNoise(2600 - big * 900, 700, 1.0, 0.05 * v);
  }

  /**
   * ★ НИЗ У ВЗРЫВА ШУМОВОЙ, А НЕ ТОНАЛЬНЫЙ. Основой был синус, съезжающий со
   * 120 Гц в инфразвук, — а это ровно тембр лопнувшего шарика или бочки из
   * драм-машины, что и было слышно. У настоящего разрыва нет высоты тона:
   * это широкополосный шум, у которого мгновенно срезается верх. Собираем из
   * трёх шумовых слоёв с разными фильтрами и временами:
   *
   *  • ФРОНТ — щелчок ударной волны, высокие частоты, полсотни миллисекунд;
   *  • ТЕЛО — шум под фильтром, уезжающим с 400 в 50 Гц: это и есть «бух»;
   *  • РАСКАТ — длинный тихий хвост, уходящий в глухой рокот.
   *
   * Времена и частоты каждый раз чуть разные — одинаковый взрыв на пятидесятом
   * повторе снова превращается в «шарики».
   */
  blast(power: number, pan = 0, dist = 0): void {
    if (!this.ready() || !this.noiseBuf || !this.satCurve) return;
    const ctx = this.ctx!;
    // ★ ЗВУК ИДЁТ МЕДЛЕННЕЕ СВЕТА. Дальний разрыв, слышимый одновременно со
    // вспышкой, читается как «где-то щёлкнуло»; та же секунда задержки — и он
    // становится далёким взрывом. Триста сорок метров в секунду.
    const t = ctx.currentTime + dist / 340;
    const p = Math.max(0.15, Math.min(1, power));
    const jit = 0.85 + Math.random() * 0.3;
    // ★ И ОН ПРИХОДИТ СО СТОРОНЫ. Без панорамы накрытие звучит как одна каша
    // по центру головы, и по слуху не понять, откуда рвётся.
    const out = this.place(pan);

    // ★ ВОЗДУХ СЪЕДАЕТ ВЕРХ, И ИМЕННО ЭТОГО НЕ ХВАТАЛО ДЛЯ «ДАЛЕКО». Дальний
    // разрыв отличается от ближнего не громкостью, а тембром: щелчок фронта и
    // вся середина по дороге гаснут, остаётся глухой раскат. Без этого фильтра
    // взрыв в двухстах метрах звучал тем же сухим стуком, что и под ногами, —
    // то есть деревянным ударом, а не взрывом.
    const far = Math.min(1, dist / 260);
    const air = ctx.createBiquadFilter();
    air.type = 'lowpass';
    air.frequency.value = 15000 - far * far * 13200;
    air.Q.value = 0.4;
    air.connect(out);

    // клиппер свой на каждый взрыв — см. satCurve
    const sat = ctx.createWaveShaper();
    sat.curve = this.satCurve as Float32Array<ArrayBuffer>;
    sat.oversample = '2x';
    sat.connect(air);

    const layer = (
      type: BiquadFilterType,
      f0: number,
      f1: number,
      dur: number,
      vol: number,
      delay: number,
      opt: { atk?: number; q?: number; grit?: boolean } = {}
    ): void => {
      const src = ctx.createBufferSource();
      src.buffer = this.noiseBuf!;
      const f = ctx.createBiquadFilter();
      f.type = type;
      // ★ РЕЗОНАНС — ЭТО И ЕСТЬ «БОЧКА». У фильтра по умолчанию Q = 1, и
      // низкочастотный фильтр, съезжающий по шуму, даёт на своей частоте
      // отчётливый подъём — то есть ВЫСОТУ ТОНА. У разрыва высоты тона нет.
      f.Q.value = opt.q ?? 0.5;
      f.frequency.setValueAtTime(f0, t + delay);
      f.frequency.exponentialRampToValueAtTime(Math.max(24, f1), t + delay + dur);
      const g = ctx.createGain();
      const atk = opt.atk ?? 0.005;
      g.gain.setValueAtTime(0.0001, t + delay);
      g.gain.exponentialRampToValueAtTime(vol, t + delay + atk);
      g.gain.exponentialRampToValueAtTime(0.0001, t + delay + dur);
      src.connect(f);
      f.connect(g);
      // ★ ПЕРЕГРУЗ ДАЁТ ВЕС. Чистый отфильтрованный шум звучит ватно: у
      // громкого разрыва фронт всегда подрезан, и именно эта «грязь»
      // читается как мощь, а не как сила сигнала.
      g.connect(opt.grit ? sat : air);
      src.start(t + delay, Math.random());
      src.stop(t + delay + dur + 0.05);
    };

    // фронт ударной волны: короткий и злой. Вдали его срежет air сам собой
    layer('highpass', 4200, 1800, 0.045 * jit, 0.55 * p, 0);
    // тело: то самое «бух», с перегрузом. Спад втрое короче прежнего — длинный
    // съезжающий фильтр как раз и тянул ноту, из которой получалась бочка
    layer('lowpass', 900 * jit, 130, 0.26 * jit + p * 0.12, 1.0 * p, 0.003, { grit: true });
    // подвал: длинная низкая волна, которую слышно грудью, а не ушами
    layer('lowpass', 72, 32, 0.9 + p * 0.5, 0.7 * p, 0.012);
    // ★ РАСКАТ НЕ ДОЛЖЕН БЫТЬ ВТОРЫМ УДАРОМ. Он шёл отдельным слоем с задержкой
    // в 60 мс и своей мгновенной атакой — то есть буквально ВТОРЫМ хлопком
    // через шестнадцатую долю секунды. Отсюда и «две бочки». Теперь у него
    // медленное нарастание: эхо не бьёт, а расходится.
    layer('bandpass', 320, 110, 1.9 * jit + p * 0.8, 0.34 * p, 0.02, { atk: 0.14, q: 0.7 });
  }

  /** узел с панорамой: −1 слева, +1 справа */
  private place(pan: number): AudioNode {
    const ctx = this.ctx!;
    if (!ctx.createStereoPanner) return this.master!;
    const p = ctx.createStereoPanner();
    p.pan.value = Math.max(-1, Math.min(1, pan));
    p.connect(this.master!);
    return p;
  }

  private ready(): boolean {
    return !!this.ctx && this.ctx.state === 'running';
  }

  private thump(f0: number, f1: number, dur: number, vol: number): void {
    const ctx = this.ctx!;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(g);
    g.connect(this.master!);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  private noiseBurst(freq: number, dur: number, vol: number): void {
    const ctx = this.ctx!;
    if (!this.noiseBuf) return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(f);
    f.connect(g);
    g.connect(this.master!);
    src.start(t, Math.random());
    src.stop(t + dur + 0.02);
  }

  private sweepNoise(f0: number, f1: number, dur: number, vol: number): void {
    const ctx = this.ctx!;
    if (!this.noiseBuf) return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.Q.value = 1.2;
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(f);
    f.connect(g);
    g.connect(this.master!);
    src.start(t, Math.random());
    src.stop(t + dur + 0.02);
  }

  private pluck(freq: number, delay: number): void {
    const ctx = this.ctx!;
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.22, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.connect(g);
    g.connect(this.master!);
    osc.start(t);
    osc.stop(t + 0.4);
  }
}
