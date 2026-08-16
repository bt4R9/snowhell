import * as THREE from 'three';

// Дрожание вершин — главная примета PlayStation-графики.
//
// У приставки не было ни дробных координат в растеризаторе, ни коррекции
// перспективы: вершина после проекции ложилась в ЦЕЛЫЙ пиксель экранной сетки,
// и на движении полигоны заметно «плавали». Одного низкого разрешения для
// этого ощущения мало — оно даёт крупный пиксель, но геометрия остаётся
// стеклянно-гладкой.
//
// Патчим глобальный чанк project_vertex — его используют ВСЕ встроенные
// материалы, поэтому снег, деревья, скалы и рейлы дрожат согласованно. Это
// важно: если привязать эффект к части материалов, на стыках разъедутся швы.
//
// ОРТОГРАФИЮ НЕ ТРОГАЕМ. HUD рисуется тем же MeshBasicMaterial, но своей
// ортокамерой, и у неё w == 1. Округлять буквы по сетке нельзя — текст
// начинает трястись и плыть. Условие w > 1.001 отделяет мир от интерфейса без
// единого uniform'а: у перспективной камеры w — это глубина в метрах.
//
// Вызывать до первого рендера.

/** Сетка привязки в пикселях (ширина × высота). Меньше — грубее дрожание. */
export function installVertexSnap(gridX = 220, gridY = 124): void {
  THREE.ShaderChunk.project_vertex = /* glsl */ `
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_INSTANCING
  mvPosition = instanceMatrix * mvPosition;
#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;

if ( gl_Position.w > 1.001 ) {
  vec2 snapGrid = vec2( ${gridX.toFixed(1)}, ${gridY.toFixed(1)} );
  vec2 ndc = gl_Position.xy / gl_Position.w;
  gl_Position.xy = floor( ndc * snapGrid + 0.5 ) / snapGrid * gl_Position.w;
}
`;
}
