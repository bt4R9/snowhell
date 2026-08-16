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

const { Game } = await import('./game');
const { FrameScheduler } = await import('./core/loop');

const game = new Game();
game.hud.setSeed(seed);

const loop = new FrameScheduler({
  update: (dt) => game.update(dt),
  render: (dt, alpha) => game.render(dt, alpha),
});
loop.start();

// отладочный доступ из консоли
const features = await import('./world/features');
const { terrainHeight, railHeights } = await import('./world/terrain');
const w = window as unknown as Record<string, unknown>;
w.__game = game;
w.__loop = loop;
w.__features = features;
w.__terrainHeight = terrainHeight;
w.__railHeights = railHeights;
// снаряды Ока: нужны для замеров точности обстрела из консоли
w.__bombs = (await import('./world/lava')).bombList;
// воронки: тем же экземпляром модуля пользуются игрок, след и рельеф — без
// этого замерить расхождение из консоли нельзя (динамический import создаёт
// ВТОРОЙ экземпляр со своим состоянием)
w.__craters = await import('./fx/craters');
w.__laser = await import('./fx/laser');
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
w.__seed = worldSeed();
w.__three = await import('three');
// прокрутить симуляцию вручную (для тестов, работает и при скрытой вкладке)
w.__step = (seconds: number) => {
  const dt = 1 / 60;
  const steps = Math.round(seconds / dt);
  for (let i = 0; i < steps; i++) game.update(dt);
  game.render(dt, 0);
};
