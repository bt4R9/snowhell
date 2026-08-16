import * as THREE from 'three';
import { Input } from './core/input';
import { RetroPipeline } from './core/retro';
import { PALETTE, SUN_DIR, FOG_NEAR, FOG_FAR, AMBIENT_COLOR } from './world/palette';
import { createSky } from './world/sky';
import { Peaks } from './world/peaks';
import { Terrain, terrainHeight, terrainNormal } from './world/terrain';
import { Player } from './player/player';
import { FollowCamera } from './camera';
import { Spray, Snowfall } from './fx/snow';
import { Trail } from './fx/trail';
import { TreeFire } from './fx/treefire';
import { Fireballs } from './fx/fireball';
import { groundDip } from './fx/ground';
import { CutSparks } from './fx/cutsparks';
import { Demo, Stage } from './demo';
import { ageCuts, laserA, laserB } from './fx/laser';
import { Eye } from './world/eye';
import { BiomeManager } from './world/biomes';
import { Backdrop } from './world/backdrop';
import { installHeightFog } from './world/fog';
import { installVertexSnap } from './world/vertexsnap';
import { LavaField, Volcanoes, setLavaTime } from './world/lava';
import { FarField } from './world/farfield';
import { Hud } from './ui/hud';
import { Sound } from './audio/sound';
import { describeTrick, describeLive, scoreTrick, landingBonus } from './tricks';

/** Очки за грайнд по его длительности — одна формула для живого счёта и итога */
function grindScore(duration: number): number {
  return Math.max(50, Math.round((duration * 300) / 10) * 10);
}
import { surfaceAt, surfaceName, toValleyU, toWorldX, volcanoWeight, pisteCenterX } from './world/features';

// цвета подписи поверхности в HUD: наст, рыхлый, лёд, земля, рейл
const SURFACE_LABEL = [0xdfe6f5, 0xffffff, 0x8fc6f0, 0xc2a279, 0xff9a4a];

// Game владеет сценой и всеми системами.
// update(dt) — только симуляция (фиксированный шаг, детерминизм).
// render(dt, alpha) — всё визуальное: интерполяция, камера, частицы, HUD.

/** рабочий цвет брызг: пересчитывается каждый кадр по весу биома */
const SPRAY_TINT = new THREE.Color(1, 1, 1);

export class Game {
  readonly input = new Input();
  readonly player = new Player();
  readonly terrain = new Terrain();
  readonly followCam: FollowCamera;

  private renderer: THREE.WebGLRenderer;
  private retro: RetroPipeline;
  private scene = new THREE.Scene();
  private sky = createSky();
  private peaks = new Peaks();
  private backdrop = new Backdrop();
  private farField = new FarField();
  private sun: THREE.DirectionalLight;
  private biomes!: BiomeManager;
  private spray = new Spray();
  /** горящий сухостой вулкана — и главный тёплый свет биома */
  readonly treeFire = new TreeFire();
  /** око: ориентир, который смотрит в ответ */
  readonly eye = new Eye();
  private snowfall: Snowfall;
  private lava = new LavaField();
  private volcanoes = new Volcanoes();
  private fireballs = new Fireballs();
  private worldTime = 0;
  private trail = new Trail();
  /** брызги породы из точки, где луч ока режет землю */
  private cutSparks = new CutSparks();
  private shadow: THREE.Mesh;
  readonly hud = new Hud();
  readonly sound = new Sound();
  private sprayOrigin = new THREE.Vector3();
  private sunProj = new THREE.Vector3();
  private camFwd = new THREE.Vector3();
  private shadowNormal = new THREE.Vector3(0, 1, 0);
  private worldUp = new THREE.Vector3(0, 1, 0);
  private hudTimer = 0;
  private emberAcc = 0;
  private wasGrounded = true;
  private wasGrinding = false;

  /** режиссёр демо: меню, вставки, финал */
  readonly demo = new Demo();

  // очки
  totalScore = 0;
  comboMult = 1;

  constructor() {
    installHeightFog();
    installVertexSnap();
    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(1);
    document.body.appendChild(this.renderer.domElement);

    this.scene.fog = new THREE.Fog(PALETTE.fog, FOG_NEAR, FOG_FAR);
    this.scene.add(this.sky.mesh);
    this.scene.add(this.peaks.group);
    this.scene.add(this.backdrop.group);
    this.scene.add(this.farField.group);

    // Заполняющий свет был 0.85 при почти белом низе — тени забивались, и
    // рельеф читался как ровная простыня. Ниже 0.6 нельзя: солнце стоит по
    // курсу спуска, поэтому дома и деревья повёрнуты к камере теневой
    // стороной и уходят в чёрные силуэты. Компромисс — умеренный уровень,
    // но холодный синий низ вместо белого: тень красится, а не забивает.
    const hemi = new THREE.HemisphereLight(PALETTE.hemiSky, PALETTE.hemiGround, 0.68);
    // Общий подсвет вытаскивает почти отвесные скальные стены: они
    // отвёрнуты и от солнца, и от неба, и на одном полусферическом свете
    // проваливались в чёрную дыру. Но он обязан быть СЛАБЫМ и ХОЛОДНЫМ:
    // на 1.1 тёплого цвета тумана вся гора становилась песочной — уходили
    // и белизна снега, и тени разом.
    this.scene.add(new THREE.AmbientLight(AMBIENT_COLOR, 0.32));
    this.scene.add(hemi);
    this.sun = new THREE.DirectionalLight(PALETTE.sun, 2.0);
    this.sun.position.copy(SUN_DIR).multiplyScalar(100);
    this.scene.add(this.sun);

    this.scene.add(this.terrain.group);
    this.scene.add(this.lava.group);
    // лампы от лавы: рельеф светится своим шейдером, а скалы и деревья — этими
    for (const l of this.lava.lavaLights) this.scene.add(l);
    this.scene.add(this.volcanoes.group);
    this.scene.add(this.fireballs.group);
    this.scene.add(this.fireballs.light);
    this.scene.add(this.player.rig.root);
    this.scene.add(this.spray.points);
    this.scene.add(this.treeFire.points);
    this.scene.add(this.eye.group);
    this.scene.add(this.eye.light);
    // свет из точки реза: она ярче всего, что есть на склоне
    this.scene.add(this.eye.cutLight);
    this.scene.add(this.cutSparks.points);
    // пятно прожектора рисует сам рельеф — так оно точно повторяет его форму
    this.eye.onSpot = (x, z, r, s) => this.terrain.setSpot(x, z, r, s);
    this.eye.onSpotDir = (x, y, z) => this.terrain.setSpotDir(x, y, z);
    this.scene.add(this.treeFire.light);
    this.scene.add(this.trail.mesh);

    // блоб-тень: видно, куда приземлишься
    const shadowGeo = new THREE.CircleGeometry(0.5, 10);
    shadowGeo.rotateX(-Math.PI / 2);
    this.shadow = new THREE.Mesh(
      shadowGeo,
      new THREE.MeshBasicMaterial({
        color: 0x1c1e2c,
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -3,
      })
    );
    this.scene.add(this.shadow);

    this.followCam = new FollowCamera(window.innerWidth / window.innerHeight);
    this.retro = new RetroPipeline(this.renderer, 3);
    this.hud.layout(this.retro.lowWidth, this.retro.lowHeight);

    this.snowfall = new Snowfall(this.followCam.camera.position);
    this.scene.add(this.snowfall.points);

    this.biomes = new BiomeManager(
      this.scene.fog as THREE.Fog,
      this.sun,
      hemi,
      this.terrain.snowMaterial,
      this.terrain.pineMaterial,
      this.farField.material,
      this.backdrop.material,
      this.peaks.material,
      this.snowfall.mat
    );


    window.addEventListener('resize', () => this.resize());
  }

  /**
   * ★ КАМЕРА ВО ВСТАВКЕ ИДЁТ К БАШНЕ И ВОЗВРАЩАЕТСЯ. Отдельного «кинорежима» у
   * FollowCamera нет и не нужно: она честно считает свою позу каждый кадр, а
   * мы поверх подмешиваем вторую — у ока. Доля подмеса и есть весь перелёт,
   * поэтому возврат получается тем же кодом, что и подлёт.
   */
  /**
   * ★ ЭТО КАМЕРА, А НЕ ПУСТОЙ УЗЕЛ. Object3D.lookAt для обычного объекта
   * разворачивает к цели +Z, а для камеры — −Z: three.js строит матрицу
   * противоположным порядком аргументов. С обычным узлом кватернион выходил
   * повёрнутым на 180°, и в ролике камера отворачивалась от ока ровно туда,
   * где его нет.
   */
  private cineAim = new THREE.PerspectiveCamera();
  private cineLook = new THREE.Vector3();
  private cineQuat = new THREE.Quaternion();
  private cineHold = 0;

  private applyCinematic(dt: number): void {
    const k = this.demo.camToTower;
    const cam = this.followCam.camera;
    if (k <= 0.001) {
      this.cineHold = 0;
      return;
    }
    const eye = this.eye.eyePos;
    if (!eye) return;
    // ★ ПРИБЛИЖАЕМ ОБЪЕКТИВОМ, А НЕ ПЕРЕЛЁТОМ. Камера подъезжала к башне по
    // линии взгляда — формально ракурс сохранялся, но вставая в трёхстах
    // метрах от ока, она оказывалась в километрах от райдера и кадр читался
    // как «смотрим от башни назад». Здесь камера НЕ СДВИГАЕТСЯ ни на метр:
    // меняется только угол обзора, то есть это честный трансфокатор. Ракурс
    // при таком приближении измениться не может по построению.
    const finale = this.demo.stage === Stage.Doom;
    // в финале поле шире: в кадр должно попасть и око, и середина башни
    // ★ В ФИНАЛЕ ПОЛЕ ЗАМЕТНО ШИРЕ. На двадцати градусах башня упиралась в
    // кромки кадра и падение уходило за края; тридцать четыре держат в кадре и
    // око, и середину шахты, и запас, куда её завалит.
    const zoom = finale ? 34 : 11;
    cam.fov = cam.fov + (zoom - cam.fov) * k;
    cam.updateProjectionMatrix();
    // наводимся на око; в финале — чуть ниже, к точке разлома
    this.cineLook.copy(eye);
    if (finale) this.cineLook.y = eye.y - 110;
    this.cineAim.position.copy(cam.position);
    this.cineAim.lookAt(this.cineLook);
    this.cineAim.updateMatrixWorld();
    cam.quaternion.slerp(this.cineAim.quaternion, k);
    // ★ И СВЕРХУ ВРЕМЕННОЕ СГЛАЖИВАНИЕ. Поза следящей камеры под подмесом
    // живёт своей жизнью (её всё ещё качает и трясёт), и на длинном фокусе
    // эта дрожь становится особенно заметной.
    const a = 1 - Math.exp(-5 * dt);
    if (this.cineHold === 0) {
      this.cineQuat.copy(cam.quaternion);
      this.cineHold = 1;
    } else {
      this.cineQuat.slerp(cam.quaternion, a);
      cam.quaternion.copy(this.cineQuat);
    }
    cam.updateMatrixWorld();
  }

  /** Фиксированный шаг симуляции */
  update(dt: number): void {
    // ★ ВО ВСТАВКАХ ФИЗИКА СТОИТ, А МИР ЖИВЁТ. Останавливать весь render()
    // нельзя: тогда замрут и лава, и небо, и падающая башня — кино
    // превратится в стоп-кадр. Замирает только доска.
    if (!this.demo.frozen) this.player.update(dt, this.input);
  }

  /** Кадр рендера: dt — реальное время кадра, alpha — интерполяция шага физики */
  /**
   * ★ ШЕЙДЕРЫ КОМПИЛИРУЮТСЯ ЗАРАНЕЕ, А НЕ ПРИ ПЕРВОМ ПОКАЗЕ. three.js собирает
   * программу материала в момент, когда объект впервые попал в кадр, — то есть
   * ель компилируется, когда её увидели, дом когда доехали до деревни, рейл
   * когда он выехал из тумана. Каждая такая компиляция это десятки-сотни
   * миллисекунд в главном потоке, ровно один раз на материал: игрок видит
   * редкие рывки, которые сами проходят через минуту-другую (подтверждено —
   * второй проезд того же участка идёт гладко).
   *
   * Первый кадр и так строит всю ближнюю округу целиком, синхронно: деревья,
   * дома, рейлы уже в сцене. Компилируем всё там, где игрок и так ждёт
   * загрузку, и рывки в игре просто некому создавать.
   */
  private warmed = false;

  render(dt: number, alpha: number): void {
    const player = this.player;
    player.syncVisual(alpha, dt);
    this.terrain.setTime(this.worldTime);
    this.terrain.update(player.pos.x, player.pos.z);
    if (!this.warmed) {
      this.warmed = true;
      this.renderer.compile(this.scene, this.followCam.camera);
    }
    // ★ ВО ВСТАВКЕ ПОГОДУ ВЕДЁТ РЕЖИССЁР. Палитра, туман и свет считаются по
    // положению игрока, а он на завязке стоит — значит небо само не потемнеет.
    // Здесь ему подсовывается точка склона, которая едет вперёд сама.
    this.biomes.update(
      this.demo.stage === Stage.IntroTower || this.demo.stage === Stage.Volcano
        ? Math.max(this.demo.weatherZ, player.pos.z)
        : player.pos.z
    );
    this.eye.cine = this.demo.towerRise;
    // во вставках око не стреляет: игрок там всё равно не управляет
    this.eye.quiet = this.demo.frozen;
    this.followCam.update(player, dt);
    this.applyCinematic(dt);

    // солнце и небо следуют за игроком, чтобы мир был «бесконечным»
    const camPos = this.followCam.camera.position;
    this.sky.mesh.position.copy(camPos);
    this.sky.update(dt); // облака медленно плывут
    // ЛАВА ЖИВЁТ ВО ВРЕМЕНИ. Языки ползут и дышат, поэтому их полотно
    // пересобирается вокруг игрока, а не запекается в чанк.
    this.worldTime += dt;
    setLavaTime(this.worldTime);
    const lu = this.lava.material.uniforms;
    lu.uFogColor.value = (this.scene.fog as THREE.Fog).color;
    lu.uFogNear.value = (this.scene.fog as THREE.Fog).near;
    lu.uFogFar.value = (this.scene.fog as THREE.Fog).far;
    this.lava.update(
      player.pos.x, player.pos.z, this.worldTime,
      toValleyU, toWorldX, terrainHeight, volcanoWeight
    );
    this.volcanoes.update(player.pos.z, dt, terrainHeight, toWorldX, volcanoWeight);
    this.volcanoes.updateSteam(
      player.pos.z, toValleyU(player.pos.x, player.pos.z), this.worldTime,
      terrainHeight, toWorldX, volcanoWeight(player.pos.z) > 0.5
    );
    this.volcanoes.updateBombs(
      player.pos.x, player.pos.z, dt, terrainHeight, toWorldX,
      pisteCenterX, volcanoWeight(player.pos.z) > 0.3, this.worldTime
    );
    // снаряды рисует отдельная система: ядро, огненный хвост, метка и взрыв
    this.fireballs.update(dt, player.pos.x, player.pos.z, terrainHeight);
    // воронки от взрывов рисует сам рельеф — они держатся дольше вспышки
    this.terrain.setCraters(this.fireballs.craterData);
    // полосы реза: стынут сами по себе, независимо от того, жив ли ещё глаз
    ageCuts(dt);
    this.terrain.setLaser(laserA(), laserB());
    this.terrain.setGlows(this.lava.glowData);
    this.sound.shells(this.fireballs.live);
    // панорама: сносим точку в систему камеры и берём поперечную составляющую
    const panOf = (x: number, z: number): number => {
      const dx = x - player.pos.x;
      const dz = z - player.pos.z;
      const len = Math.hypot(dx, dz) || 1;
      // ★ ПРАВО — ЭТО cross(вперёд, вверх), И ЗНАК ЗДЕСЬ БЫЛ ОБРАТНЫЙ. При
      // up = (0,1,0) и ходе f получается (−fz, 0, fx), а стояло (fz, −fx) —
      // ровно наоборот, поэтому взрыв справа звучал слева. Проверка: спуск
      // идёт в +Z, значит право должно смотреть в −X (стоя лицом к +Z, правая
      // рука указывает в −X) — старая формула давала +X.
      const rx = -this.camFwd.z;
      const rz = this.camFwd.x;
      return Math.max(-1, Math.min(1, ((dx * rx + dz * rz) / len) * 0.9));
    };
    for (const s of this.fireballs.incoming) {
      this.sound.incoming(s.dist, s.size, panOf(s.x, s.z));
    }
    for (const b of this.fireballs.blasts) {
      if (b.power > 0) this.sound.blast(b.power, panOf(b.x, b.z), b.dist);
    }
    // --- режиссёр демо ---
    {
      // ★ ПОДТВЕРЖДЕНИЕ ЧИТАЕМ РОВНО ОДИН РАЗ ЗА КАДР. Второй takeConfirm()
      // ниже съедал бы флаг у режиссёра: нажатие пропадало через раз.
      const ok = this.input.takeConfirm();
      const scr = this.demo.update(dt, ok, player.pos.z, this.totalScore);
      if (this.demo.wantWarp) {
        this.player.warpTo(this.demo.wantWarp);
        this.demo.wantWarp = 0;
      }
      if (this.demo.wantDoom) {
        this.demo.wantDoom = false;
        this.eye.destroy();
      }
      if (scr) this.hud.setOverlay(scr.title, scr.lines, scr.dim);
      else this.hud.hideOverlay();
      this.hud.setGameplayVisible(this.demo.playing);
      if (this.demo.stage === Stage.Win && ok && this.demo.t > 1) {
        location.reload();
      }
    }
    this.cutSparks.update(dt, this.eye.cutting, this.eye.cut);
    {
      const c = this.eye.cut;
      this.sound.eyeBeam(
        this.eye.chargeAmt,
        this.eye.cutting,
        panOf(c.x, c.z),
        Math.hypot(c.x - player.pos.x, c.z - player.pos.z)
      );
    }
    // дальний хребет следует за камерой, но остаётся на горизонте
    // якорь задника — ВЫСОТА СКЛОНА под игроком, а не сам игрок: в прыжке
    // и в полёте с обрыва задник не должен подскакивать вместе с камерой
    this.backdrop.update(camPos.x, terrainHeight(player.pos.x, player.pos.z), camPos.z);
    this.farField.update(player.pos.x, player.pos.z);
    this.peaks.update(player.pos.z);
    this.sun.position.copy(player.pos).addScaledVector(SUN_DIR, 100);
    this.sun.target.position.copy(player.pos);
    this.sun.target.updateMatrixWorld();

    // след доски на снегу (вместо постоянного спрея) и тень
    const visPos = player.rig.root.position;
    // След кладём поперёк ДВИЖЕНИЯ, а не поперёк доски: колея — это то, что
    // доска вымела, проехав из точки в точку. И чем сильнее доска стоит
    // поперёк хода, тем шире вымело — вплоть до всей длины доски.
    const tsp = Math.max(0.001, player.speed);
    this.trail.update(
      player.pos.x,
      player.pos.z,
      player.velH.x / tsp,
      player.velH.z / tsp,
      player.grounded && player.speed > 3,
      Math.min(1, player.carve / 18), // жёсткий карв режет глубже и шире
      player.surfaceKind,
      player.skid,
      volcanoWeight(player.pos.z),
      player.crackHot
    );
    // ★ ИСКРЫ ИЗ-ПОД КАНТА. По раскалённому шву доска идёт как по точилу:
    // сноп искр назад. Частота растёт со скоростью и жаром шва.
    this.sound.sparks(
      player.grounded && player.speed > 6
        ? Math.min(1, player.crackHot * 1.6) * Math.min(1, player.speed / 16)
        : 0
    );
    if (player.grounded && player.crackHot > 0.12 && player.speed > 6) {
      this.emberAcc += dt * (34 + player.speed * 9) * player.crackHot;
      while (this.emberAcc >= 1) {
        this.emberAcc -= 1;
        this.lava.emberBurst(
          visPos.x, visPos.y, visPos.z,
          player.velH.x, player.velH.z, 2
        );
      }
    }
    // брызги перекрашиваются вместе с биомом: на вулкане из-под доски летит
    // пепел, а не снег
    {
      const vw = volcanoWeight(player.pos.z);
      SPRAY_TINT.setRGB(1 - vw * 0.72, 1 - vw * 0.75, 1 - vw * 0.78);
      this.spray.setTint(SPRAY_TINT, 0.6 - vw * 0.18);
    }
    // тень ложится на ту же поверхность, что и доска: в воронке она обязана
    // опуститься на дно, иначе висит над ямой блином на старом уровне
    const gy =
      terrainHeight(player.pos.x, player.pos.z) - groundDip(player.pos.x, player.pos.z);
    const hAbove = Math.max(0, visPos.y - gy);
    this.shadow.position.set(visPos.x, gy + 0.07, visPos.z);
    terrainNormal(player.pos.x, player.pos.z, this.shadowNormal);
    this.shadow.quaternion.setFromUnitVectors(this.worldUp, this.shadowNormal);
    this.shadow.scale.setScalar(1 + hAbove * 0.05);
    (this.shadow.material as THREE.MeshBasicMaterial).opacity = Math.max(
      0.12,
      0.3 - hAbove * 0.012
    );

    // --- звук ---
    this.sound.update({
      speed: player.speed,
      grounded: player.grounded,
      grinding: player.grinding,
      airborne: !player.grounded && !player.grinding,
      carve: player.carve,
      charge: player.charge,
      surface: player.surfaceKind,
      volc: volcanoWeight(player.pos.z),
      // во вставках доска стоит — звука езды быть не должно
      muted: this.demo.frozen,
    });
    if (this.wasGrounded && !player.grounded && !player.grinding && player.vy > 2) {
      this.sound.jump(Math.min(1, player.vy / 12)); // вылет с прыжка или кикера
    }
    if (player.grinding && !this.wasGrinding) {
      this.sound.grindStart();
    }
    this.wasGrounded = player.grounded;
    this.wasGrinding = player.grinding;

    // врезались в дерево или камень
    if (player.consumeCrash()) {
      this.comboMult = 1;
      this.hud.setCombo(1);
      this.hud.landing('', 0, 1, 'crash');
      this.spray.burst(visPos, player.velH, 45);
      this.sound.crash();
      this.followCam.impact(1, true);
    } else if (player.consumeGraze()) {
      this.comboMult = 1;
      this.hud.setCombo(1);
      this.spray.burst(visPos, player.velH, 18);
      this.sound.landing(0.3);
    }

    // сброс на трассу: комбо обнуляется, иначе им можно было бы спасать серию
    if (player.wasReset) {
      player.wasReset = false;
      this.comboMult = 1;
      this.hud.setCombo(1);
      this.hud.notice('RESET', 0x9fd0ff);
    }

    // приземление: очки, комбо, вердикт
    const landing = player.consumeLanding();
    if (landing) {
      this.spray.burst(visPos, player.velH, landing.quality === 'crash' ? 60 : 30);
      const force = Math.min(1, landing.airTime / 1.5);
      this.sound.landing(force);
      this.followCam.impact(0.35 + force * 0.65, landing.quality === 'crash');
      const pts = scoreTrick(landing);
      // Чем чище встал, тем дороже трюк: множитель за красоту касания
      // умножается на обычное комбо.
      // ВАЖНО: множитель берём от ЧИСТОЙ геометрии, а не от score. score
      // сглажен скоростью (на 80 км/ч встать криво ничего не стоит) — и
      // множитель от него выдавал бы ×2 за любое касание на малом ходу.
      const bonus = landingBonus(landing.geom);
      if (landing.quality === 'clean' && pts > 0) {
        const mult = this.comboMult * bonus.mult;
        this.totalScore += Math.round(pts * mult);
        this.hud.landing(describeTrick(landing), pts, mult, 'clean', bonus.label);
        this.sound.clean(this.comboMult);
        this.comboMult = Math.min(this.comboMult + 1, 9);
      } else if (landing.quality !== 'clean') {
        this.comboMult = 1;
        this.hud.landing(describeTrick(landing), 0, 1, landing.quality);
        if (landing.quality === 'sketchy') this.sound.sketchy();
        else this.sound.crash();
      }
      this.hud.setScore(this.totalScore);
      this.hud.setCombo(this.comboMult);
    }

    // завершённый грайнд
    const grind = player.consumeGrind();
    if (grind && grind.duration > 0.25) {
      const pts = grindScore(grind.duration);
      this.totalScore += pts * this.comboMult;
      this.hud.landing('GRIND', pts, this.comboMult, 'clean');
      this.sound.clean(this.comboMult);
      this.comboMult = Math.min(this.comboMult + 1, 9);
      this.hud.setScore(this.totalScore);
      this.hud.setCombo(this.comboMult);
    }

    // живой лейбл трюка в полёте
    if (player.grinding) {
      // Живой счёт прямо в грайнде: балансировать «просто так» скучно, а
      // растущее число на глазах — это и есть ставка, которую теряешь при
      // срыве (на падении с рейла очки не начисляются вовсе).
      const live = grindScore(player.grindDuration) * this.comboMult;
      this.hud.airTrick('GRIND ' + live);
    } else if (!player.grounded) {
      const spinDeg = THREE.MathUtils.radToDeg(player.trickYaw);
      this.hud.airTrick(describeLive(spinDeg, player.trickFlip / (Math.PI * 2), player.grabTime));
    } else {
      this.hud.airTrick('');
    }

    this.spray.update(dt);
    this.treeFire.update(player.pos.x, player.pos.z, dt);
    this.eye.update(
      player.pos.x, player.pos.y, player.pos.z, this.worldTime, dt,
      terrainHeight, (this.scene.fog as THREE.Fog).color
    );
    this.snowfall.update(dt, camPos);
    this.hud.update(dt);
    // кадровые цифры считаем по РЕАЛЬНОМУ времени кадра, а не по шагу физики:
    // шаг фиксированный и о просадках ничего не скажет
    this.hud.setFrame(dt);
    this.hud.setCharge(player.charge);
    this.hud.setHeat(player.heat, dt);
    // тот же перегрев красит и самого райдера
    player.rig.setHeat(player.heat);
    this.hud.setBalance(player.grinding, player.railBalance);

    this.hudTimer -= dt;
    if (this.hudTimer <= 0) {
      this.hudTimer = 0.1;
      this.hud.setSpeed(Math.round(player.speed * 3.6));
      // ★ ПОКАЗЫВАЕМ НЕ ТОЛЬКО ИМЯ ПОВЕРХНОСТИ, НО И ЕЁ ЧИСЛА. Обсидиан
      // держит как рельс, пепел тормозит, клинкер сыпется — по названию этого
      // не понять, а игрок должен видеть, ПОЧЕМУ доска ведёт себя иначе.
      const sp = surfaceAt(toValleyU(player.pos.x, player.pos.z), player.pos.z);
      this.hud.setSurface(
        player.grinding ? 'RAIL' : surfaceName(player.surfaceKind, player.pos.z),
        SURFACE_LABEL[player.grinding ? 4 : player.surfaceKind],
        player.grinding ? null : sp
      );
    }

    this.updateEffects(camPos, player.speed);
    this.retro.render(this.scene, this.followCam.camera, this.hud.scene, this.hud.camera);
  }

  /**
   * Кормит пост-эффекты: положение солнца на экране и нормированную скорость.
   * Солнце проецируем как точку на километр вдоль SUN_DIR — направление
   * плавает между биомами, так что считаем каждый кадр.
   */
  private updateEffects(camPos: THREE.Vector3, speed: number): void {
    const cam = this.followCam.camera;
    this.sunProj.copy(camPos).addScaledVector(SUN_DIR, 1000).project(cam);
    cam.getWorldDirection(this.camFwd);
    // за спиной лучей нет вовсе, у края кадра — гаснут
    const facing = THREE.MathUtils.smoothstep(this.camFwd.dot(SUN_DIR), 0.15, 0.6);
    const off = Math.max(Math.abs(this.sunProj.x), Math.abs(this.sunProj.y));
    const inFrame = this.sunProj.z < 1 ? 1 - THREE.MathUtils.smoothstep(off, 1, 2.2) : 0;
    // смаз включается около 100 км/ч и добирает к 180 — верх диапазона должен
    // быть достижим в тяжёлом тýке, иначе эффект просто не увидишь
    const speedN = THREE.MathUtils.clamp((speed - 28) / 22, 0, 1);
    this.retro.setEffects(
      this.sunProj.x * 0.5 + 0.5,
      this.sunProj.y * 0.5 + 0.5,
      facing * inFrame,
      speedN
    );
  }

  private resize(): void {
    this.retro.setSize(window.innerWidth, window.innerHeight);
    this.hud.layout(this.retro.lowWidth, this.retro.lowHeight);
    this.followCam.camera.aspect = window.innerWidth / window.innerHeight;
    this.followCam.camera.updateProjectionMatrix();
  }
}
