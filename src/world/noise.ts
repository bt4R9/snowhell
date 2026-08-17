// Детерминированный value noise — вся генерация мира построена на нём,
// поэтому мир одинаковый при каждом запуске (сид можно добавить позже).

// Сид мира: подмешивается в хэш и смещает координаты шума, поэтому одна
// строчка меняет весь мир целиком — рельеф, лес, трассу, деревни.
let SEED = 0;
let NOISE_OFF_X = 0;
let NOISE_OFF_Z = 0;
let phaseCache: number[] | null = null;

export function setWorldSeed(seed: number): void {
  SEED = seed >>> 0;
  phaseCache = null;
  NOISE_OFF_X = 0;
  NOISE_OFF_Z = 0;
  NOISE_OFF_X = (hash2(1, 7) - 0.5) * 40000;
  NOISE_OFF_Z = (hash2(2, 11) - 0.5) * 40000;
}

export function worldSeed(): number {
  return SEED;
}

/** смещения шума от сида — GPU-порту noise2 нужны те же числа */
export function noiseOffset(): { x: number; z: number } {
  return { x: NOISE_OFF_X, z: NOISE_OFF_Z };
}

/** Детерминированная фаза из сида — для аналитических синусов мира */
export function seedPhase(i: number): number {
  if (!phaseCache) {
    phaseCache = [];
    for (let k = 0; k < 32; k++) phaseCache.push(hash2(k * 9176 + 3, 57) * Math.PI * 2);
  }
  return phaseCache[i];
}

export function hash2(ix: number, iz: number): number {
  let h = Math.imul(ix, 374761393) + Math.imul(iz, 668265263) + Math.imul(SEED, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Плавный шум, результат в диапазоне -1..1 */
export function noise2(xIn: number, zIn: number): number {
  const x = xIn + NOISE_OFF_X;
  const z = zIn + NOISE_OFF_Z;
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const sx = smooth(x - ix);
  const sz = smooth(z - iz);
  const v00 = hash2(ix, iz);
  const v10 = hash2(ix + 1, iz);
  const v01 = hash2(ix, iz + 1);
  const v11 = hash2(ix + 1, iz + 1);
  return lerp(lerp(v00, v10, sx), lerp(v01, v11, sx), sz) * 2 - 1;
}
