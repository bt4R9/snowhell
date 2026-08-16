import * as THREE from 'three';

// Палитра первого биома — «золотой час» на снежной горе.
// В фазе биомов это станет данными, между которыми лерпаем.
export const PALETTE = {
  skyZenith: new THREE.Color(0x4b4a9e),
  // Горизонт БЛЕДНЫЙ: на реальных горных фото дымка сероватая, а насыщенный
  // закат живёт только вокруг солнца (ореол в шейдере неба). Насыщенный
  // горизонт = насыщенный туман = весь дальний мир перекрашен в лосось.
  skyHorizon: new THREE.Color(0xf0d2bc),
  sun: new THREE.Color(0xffd9a0),
  // Туман НЕ равен небу (пробовал — это была ошибка): при равенстве
  // затуманенная земля сливается с небом, линия горизонта исчезает, и
  // полоса читается как «геометрию не нарисовали». Дымка над землёй
  // холоднее и темнее неба — тогда силуэт склона виден всегда.
  fog: new THREE.Color(0xc6c7d6),
  snow: new THREE.Color(0xdfe6f5),
  pine: new THREE.Color(0x27473f),
  hemiSky: new THREE.Color(0xc2cff2),
  hemiGround: new THREE.Color(0xb4c2e6), // тень на снегу синяя, а не белая
};

export const SUN_DIR = new THREE.Vector3(0.35, 0.14, 0.85).normalize();

// холодный подсвет теней: снег в тени голубой, а не бежевый
export const AMBIENT_COLOR = new THREE.Color(0xb9c6e8);

export const FOG_NEAR = 300;
export const FOG_FAR = 3700;
