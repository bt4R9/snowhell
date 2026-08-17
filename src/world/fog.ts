import * as THREE from 'three/webgpu';
import {
  Fn, If, float, int, uint, vec2, vec3, vec4, uniform, output, positionView, positionWorld,
  fract, floor, sin, dot, mix, smoothstep, step, pow,
} from 'three/tsl';

// Дымка на расстоянии — ТОЛЬКО по дистанции, без высотной составляющей.
//
// Высотный туман (плотнее тому, что ниже камеры) здесь категорически не
// работает: мы едем ВНИЗ по горе, поэтому почти вся дальняя земля ниже
// камеры. Такой туман съедал у дальних гор ТЕЛО и оставлял торчать
// вершину — читалось как «гора прорисована наполовину», а на месте
// съеденного тела зияла щель, сквозь которую видно следующий хребет.
// Слой дымки при этом ездил вместе с игроком, а не лежал в долине.
//
// ★ WebGPU: вместо патча глобальных чанков fog_* — один узел `scene.fogNode`.
// Node-материалы подмешивают его сами (NodeMaterial.setupFog), поэтому снег,
// дальний план, деревья, снегопад и след туманятся ОДНИМ кодом и не расходятся
// швами — ровно то, ради чего раньше патчился ShaderChunk.

/** живые параметры дымки; их пишет BiomeManager через syncFog() */
export const FOG_COLOR = uniform(new THREE.Color(0xc6c7d6));
export const FOG_NEAR_U = uniform(300);
export const FOG_FAR_U = uniform(2100);

/** перенести scene.fog (его крутит BiomeManager) в юниформы узла */
export function syncFog(fog: THREE.Fog): void {
  FOG_COLOR.value.copy(fog.color);
  FOG_NEAR_U.value = fog.near;
  FOG_FAR_U.value = fog.far;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type N = any;

// ★ целочисленный хэш (см. core/tslnoise): sin() на мировых XZ давал NaN-искры
const cshHash = Fn(([p0]: [N]) => {
  const p: N = floor(p0);
  const h = uint(int(p.x)).mul(uint(374761393)).add(uint(int(p.y)).mul(uint(668265263))).toVar();
  h.assign(h.bitXor(h.shiftRight(uint(13))).mul(uint(1274126177)));
  return float(h.bitXor(h.shiftRight(uint(16)))).div(4294967295.0);
});

const cshNoise = Fn(([p]: [N]) => {
  const i: N = floor(p);
  const f: N = fract(p);
  const u = f.mul(f).mul(f.mul(-2).add(3));
  return mix(
    mix(cshHash(i), cshHash(i.add(vec2(1, 0))), u.x),
    mix(cshHash(i.add(vec2(0, 1))), cshHash(i.add(vec2(1, 1))), u.x),
    u.y
  );
});

/**
 * Узел тумана мира. Читает `output` (цвет фрагмента после освещения) и
 * возвращает vec4 — три эффекта разом, потому что все они должны ложиться
 * на ВСЕ слои одинаково:
 *  1) тени облаков — множитель по мировым XZ;
 *  2) редкие солнечные искры наста — только на снегу и только в полосе 11–60 м;
 *  3) сама дымка — mix к цвету тумана с показателем 1.5.
 */
export const psxFog = Fn(() => {
  const col = output.rgb.toVar();
  const depth = positionView.z.negate();
  const cloudXZ = positionWorld.xz;

  // ТЕНИ ОБЛАКОВ. Огромное снежное поле — это заливка, на которой глазу не
  // за что зацепиться; на реальных горных снимках его лепят как раз пятна
  // облачной тени. Времени здесь нет намеренно: пятна стоят в МИРОВЫХ
  // координатах, а игрок несётся сквозь мир — они и так плывут через кадр.
  const cp = cloudXZ.mul(0.0046);
  const csh = cshNoise(cp).mul(0.62).add(cshNoise(cp.mul(2.7).add(11.3)).mul(0.38));
  const cshK = smoothstep(0.40, 0.70, csh);
  // тень холоднее, а не просто темнее: у снега в тени синий подсвет неба
  col.mulAssign(vec3(
    cshK.mul(0.26).oneMinus(),
    cshK.mul(0.23).oneMinus(),
    cshK.mul(0.16).oneMinus()
  ));

  // РЕДКИЕ СОЛНЕЧНЫЕ ИСКРЫ. Наст — это миллионы ледяных граней, и раз в
  // несколько метров одна из них ловит солнце ровно в глаз. Эффект держится
  // на РЕДКОСТИ. Мерцание берём из глубины, а не из времени: пока игрок едет,
  // расстояние до точки меняется каждый кадр — угол «взгляд-грань» гуляет сам.
  // Ниже 11 м искр нет вовсе: райдер висит в пяти метрах от камеры и получал
  // бы мерцание прямо по куртке.
  const sparkNear = smoothstep(11.0, 19.0, depth).mul(smoothstep(22.0, 60.0, depth).oneMinus());
  If(sparkNear.greaterThan(0.0), () => {
    const sHash = cshHash(floor(cloudXZ.mul(5.5)));
    // искры только на СНЕГУ: порог по яркости фрагмента — самый дешёвый способ
    // отличить снег от хвои и породы. Цель кадра ЛИНЕЙНАЯ (гамму накладывает
    // ретро-проход), поэтому яркость снега здесь всего 0.25–0.40.
    const lum = dot(col, vec3(0.3, 0.6, 0.1));
    const tw = sin(sHash.mul(437.0).add(depth.mul(2.3))).mul(0.5).add(0.5);
    const spark = step(0.995, sHash).mul(pow(tw, 5.0)).mul(sparkNear).mul(smoothstep(0.12, 0.28, lum));
    col.addAssign(vec3(0.75, 0.68, 0.5).mul(spark));
  });

  // Показатель 1.5 отжимает дымку из СЕРЕДИНЫ дистанции: при линейной дымке
  // дальняя полоса теряла локальный контраст вдвое и читалась «непрорисовкой».
  const fogFactor = pow(smoothstep(FOG_NEAR_U, FOG_FAR_U, depth), 1.5);
  return vec4(mix(col, FOG_COLOR, fogFactor), output.a);
})();

/** повесить узел на сцену — вызвать один раз при сборке мира */
export function installHeightFog(scene: THREE.Scene): void {
  scene.fogNode = psxFog;
}
