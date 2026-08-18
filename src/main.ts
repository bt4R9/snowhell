import { setWorldSeed, worldSeed } from './world/noise';

// Сид задаётся ДО создания мира: от него зависят рельеф, лес, трасса и деревни.
// ?seed=123 в адресе — повторить конкретный мир, иначе каждый запуск новый.
const url = new URL(location.href);
const fromUrl = Number(url.searchParams.get('seed'));
const seed = Number.isFinite(fromUrl) && fromUrl !== 0
  ? fromUrl >>> 0
  : (Math.random() * 0xffffffff) >>> 0;
setWorldSeed(seed);
url.searchParams.set('seed', String(seed));
history.replaceState(null, '', url.toString()); // ссылкой можно поделиться

// ★ ЛАБОРАТОРИЯ ЛАВЫ (?lab=lava): ручная расстановка всех видов лавы на короткой
// полосе и спавн прямо над ней — чтобы итерировать быстро, а не искать озёра
// по всему спуску. Ставится ДО сборки мира: рельеф читает чаши.
const lab = url.searchParams.get('lab');
if (lab === 'lava') {
  const pools = await import('./world/pools');
  pools.installLavaLab();
  const { demoDebug } = await import('./demo');
  demoDebug.startZ = pools.LAB_Z0 - 160;
}
const { createRenderer } = await import('./core/gpu');
const { Game } = await import('./game');
const { FrameScheduler } = await import('./core/loop');

// ★ WebGPU: рендерер поднимается асинхронно (адаптер, устройство) — до этого
// сцену собирать нельзя, поэтому он создаётся здесь и отдаётся игре готовым
const renderer = await createRenderer();
const game = new Game(renderer);
game.hud.setSeed(seed);

const loop = new FrameScheduler({
  update: (dt) => game.update(dt),
  render: (dt, alpha) => game.render(dt, alpha),
});
loop.start();

// ★ ОТЛАДКА НЕ ЕДЕТ В ПРОД. Хуки грузились через await import() ПОСЛЕ
// loop.start(): игра уже крутилась, а модули в этот момент ещё шли по сети, и
// каждый прилетевший вычислялся в главном потоке — на локальном сервере это
// незаметно, а с CDN давало рывки в первые секунды игры. Плюс они тянули в
// сборку отдельные чанки, нужные только консоли.
// import.meta.env.DEV — константа времени сборки, весь блок вырезается целиком.
if (import.meta.env.DEV) {
  // отладочный доступ из консоли
  const features = await import('./world/features');
  const { terrainHeight, railHeights } =
    await import('./world/terrain');
  const w = window as unknown as Record<string, unknown>;
  w.__game = game;
  w.__loop = loop;
  w.__features = features;
  w.__terrainHeight = terrainHeight;
  // сеть трещин ТЕМ ЖЕ экземпляром модуля, что и игра: динамический import из
  // консоли даёт второй экземпляр без сида — на этом я уже обжигался
  w.__railHeights = railHeights;
  // снаряды Ока: нужны для замеров точности обстрела из консоли
  w.__bombs = (await import('./world/lava')).bombList;
  // воронки: тем же экземпляром модуля пользуются игрок, след и рельеф — без
  // этого замерить расхождение из консоли нельзя (динамический import создаёт
  // ВТОРОЙ экземпляр со своим состоянием)
  w.__craters = await import('./fx/craters');
  w.__laser = await import('./fx/laser');
  const lava = await import('./world/lava');
  w.__lava = lava;
  w.__pools = await import('./world/pools');
  w.__city = await import('./world/city');
  // ★ СВОБОДНАЯ КАМЕРА ДЛЯ ОСМОТРА (стенд лавы): __cam(x,y,z, tx,ty,tz) ставит
  // камеру и целится; __camOff() возвращает слежение. Иначе камера смотрит только
  // туда, куда едет доска, и половину сцены не осмотреть.
  const gg = game as unknown as { followCam: { update: () => void; camera: { position: { set(x: number, y: number, z: number): void }; lookAt(x: number, y: number, z: number): void } }; applyCinematic: () => void };
  const camUpd = gg.followCam.update;
  const cine = gg.applyCinematic;
  w.__cam = (x: number, y: number, z: number, tx: number, ty: number, tz: number): string => {
    gg.followCam.update = () => {
      gg.followCam.camera.position.set(x, y, z);
      gg.followCam.camera.lookAt(tx, ty, tz);
    };
    gg.applyCinematic = () => {};
    return 'free cam';
  };
  w.__camOff = (): string => {
    gg.followCam.update = camUpd;
    gg.applyCinematic = cine;
    return 'follow cam';
  };
  // временный режим обкатки: только рез, без обстрела (см. eyeDebug)
  const { eyeDebug } = await import('./world/eye');
  const { demoDebug } = await import('./demo');
  w.__startAt = (z: number): number => {
    demoDebug.startZ = z;
    return demoDebug.startZ;
  };
  w.__fastVolcano = (v?: boolean): boolean => {
    demoDebug.fastVolcano = v !== false;
    return demoDebug.fastVolcano;
  };
  w.__onlyLaser = (v?: boolean): boolean => {
    eyeDebug.onlyLaser = v !== false;
    return eyeDebug.onlyLaser;
  };
  /**
   * ★ ЧТО ИМЕННО СВЕТИТСЯ ПОД ДОСКОЙ. Диагностика «искр нет там, где светится»
   * упирается в то, что источников свечения несколько, и по скриншоту их не
   * различить. Встань на светящееся место и вызови __whatGlows() — она скажет,
   * какой из источников там ненулевой.
   */
  w.__whatGlows = () => {
    const g = game as unknown as { player: { pos: { x: number; z: number } } };
    const P = g.player.pos;
    const F = features as unknown as Record<string, (...a: unknown[]) => unknown>;
    const u = (F.toValleyU as (x: number, z: number) => number)(P.x, P.z);
    const L = lava as unknown as Record<string, (...a: unknown[]) => unknown>;
    const ground = (x: number, z: number): number => terrainHeight(x, z);
    const toWX = F.toWorldX as (uu: number, zz: number) => number;
    return {
      pos: [Math.round(P.x), Math.round(P.z)],
      прокал: +((L.hazardHeatAt as (...a: unknown[]) => number)(u, P.z, ground, toWX)).toFixed(3),
      корка: +((L.lavaCrustAt as (...a: unknown[]) => number)(u, P.z, ground, toWX)).toFixed(3),
      лава: (L.lavaAt as (...a: unknown[]) => number | null)(u, P.z, ground, toWX) !== null,
      // ИМЯ ПО БИОМУ: без z функция отдаёт снежные имена, и обсидиан читается
      // «ICE» — на этом мы уже путались
      поверхность: (F.surfaceName as (k: number, z: number) => string)(
        (game as unknown as { player: { surfaceKind: number } }).player.surfaceKind,
        P.z
      ),
      искрыСейчас: +(
        (game as unknown as { player: { crackHot: number } }).player.crackHot
      ).toFixed(3),
    };
  };
  // ★ МЕТКА СБОРКИ. Половина «не работает» оказывалась несвежей вкладкой:
  // vite обновляет модули по одному, и страница легко остаётся на смеси старых.
  // Меняю строку вместе с правкой — сверять одной командой.
  w.__build = 'webgpu-1';
  w.__seed = worldSeed();
  w.__three = await import('three/webgpu');
  // прокрутить симуляцию вручную (для тестов, работает и при скрытой вкладке)
  w.__step = (seconds: number) => {
    const dt = 1 / 60;
    const steps = Math.round(seconds / dt);
    for (let i = 0; i < steps; i++) game.update(dt);
    // ★ WebGPU: узлы с updateType FRAME (свет!) обновляются только когда
    // рендерер сам тикает свой rAF. При ручной прокрутке в скрытой вкладке
    // кадр не сдвигается — и свет застывает. Двигаем кадр руками.
    (renderer as unknown as { _nodes: { nodeFrame: { update(): void } } })._nodes.nodeFrame.update();
    game.render(dt, 0);
  };
}
