import * as THREE from 'three/webgpu';

// Рендерер. WebGPU — обязателен: симуляция частиц идёт на compute-шейдерах,
// а их у WebGL-бэкенда нет. Fallback на WebGL здесь дал бы не «игру
// похуже», а игру без половины эффектов, поэтому честнее сразу сказать,
// что нужен браузер с WebGPU.

export async function createRenderer(): Promise<THREE.WebGPURenderer> {
  if (!('gpu' in navigator)) {
    showNoGpu();
    throw new Error('WebGPU is not available');
  }
  const renderer = new THREE.WebGPURenderer({
    antialias: false,
    powerPreference: 'high-performance',
    forceWebGL: false,
  });
  renderer.setPixelRatio(1);
  await renderer.init();
  if ((renderer.backend as { isWebGLBackend?: boolean }).isWebGLBackend) {
    // адаптер не выдался — WebGPU есть в API, но не в железе/драйвере
    showNoGpu();
    throw new Error('WebGPU adapter unavailable');
  }
  return renderer;
}

function showNoGpu(): void {
  const el = document.createElement('div');
  el.style.cssText =
    'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;' +
    'background:#0b0b10;color:#e8e8f0;font:16px/1.5 monospace;text-align:center;padding:24px';
  el.innerHTML =
    'SNOW нужен WebGPU.<br>Открой игру в Chrome / Edge (или Safari 26+) — там он есть.';
  document.body.appendChild(el);
}
