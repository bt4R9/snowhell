import { Fn, Loop, float, int, uint, vec2, fract, floor, mix } from 'three/tsl';

// Общий шумовой набор для TSL-шейдеров: хэш → value-noise → fbm.
// Одна реализация на все материалы (небо, туман, лава, рельеф) — те же
// константы, что были в GLSL, поэтому картинка не «плывёт» между слоями.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type N = any;

/**
 * hash(vec2) → [0,1) по ЦЕЛОЙ решётке.
 * ★ БЕЗ sin(): на Apple GPU sin для аргументов ~10⁶ отдаёт NaN, а
 * fract(sin(dot(p, big))·43758) именно туда и уходит на мировых координатах —
 * получались статичные светлые плиты. Целочисленный imul-хэш безопасен всегда.
 */
export const hash2 = Fn(([p0]: [N]) => {
  const p: N = floor(p0);
  const h = uint(int(p.x)).mul(uint(374761393)).add(uint(int(p.y)).mul(uint(668265263))).toVar();
  h.assign(h.bitXor(h.shiftRight(uint(13))).mul(uint(1274126177)));
  return float(h.bitXor(h.shiftRight(uint(16)))).div(4294967295.0);
});

/** value-noise по сетке */
export const vnoise2 = Fn(([p]: [N]) => {
  const i: N = floor(p);
  const f: N = fract(p);
  const u = f.mul(f).mul(f.mul(-2.0).add(3.0));
  return mix(
    mix(hash2(i), hash2(i.add(vec2(1.0, 0.0))), u.x),
    mix(hash2(i.add(vec2(0.0, 1.0))), hash2(i.add(vec2(1.0, 1.0))), u.x),
    u.y
  );
});

/** fbm из `octaves` октав value-noise, множитель частоты 2.07 */
export function fbm2(p0: N, octaves = 4): N {
  return Fn(() => {
    const v = float(0.0).toVar();
    const a = float(0.5).toVar();
    const p = vec2(p0).toVar();
    Loop({ start: 0, end: octaves, type: 'int', condition: '<' }, () => {
      v.addAssign(a.mul(vnoise2(p)));
      p.mulAssign(2.07);
      a.mulAssign(0.5);
    });
    return v;
  })();
}
