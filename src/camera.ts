import * as THREE from 'three';
import { Player } from './player/player';
import { terrainHeight } from './world/terrain';
import { groundDip } from './fx/ground';

/** земля под камерой — та же, по которой едет доска: с учётом воронок */
function groundY(x: number, z: number): number {
  return terrainHeight(x, z) - groundDip(x, z);
}

const BASE_FOV = 70;
const FOV_SPEED_GAIN = 9; // почти не расширяем: широкий FOV «отодвигает» игрока
const DIST_BASE = 5.1;
const DIST_SPEED_PULL = 0.3; // на скорости камера подъезжает БЛИЖЕ, а не дальше
const HEIGHT = 4.2;
const LOOK_AHEAD = 13;

// Ключ к чувству уклона: камера НЕ выравнивается по склону. Если смотреть
// вдоль склона, он проецируется в плоскость и кажется горизонтальным.
// Мы наклоняем взгляд лишь на долю уклона — остальное склон «проваливается»
// вниз из кадра, и крутизна читается.
const SLOPE_FOLLOW = 0.45; // доля уклона, добавляемая к наклону камеры
const FRAME_DROP = 0.42;   // насколько райдер поднят над нижней кромкой кадра

// Динамика
const CARVE_SIDE = 1.5;   // на сколько камеру сносит наружу дуги
const CARVE_ROLL = 0.09;  // крен камеры в поворот, рад
const AIR_RISE = 2.2;     // подъём камеры в полёте — видно место приземления
const AIR_BACK = 1.6;
const TURN_LIMIT = 4.0;   // рад/с — предел разворота камеры за ходом
const BOB_FREQ = 7.5;     // покачивание от фактуры снега
// Дрожь от скорости: начинается там, где раньше был потолок, и дальше
// растёт без предела — вместе со скоростью, которую теперь ограничивает
// только сопротивление воздуха.
const RUMBLE_FROM = 38;   // м/с (~137 км/ч) — до этого камера спокойная
const RUMBLE_GAIN = 0.0095;
const FOLLOW_RATE = 14;   // высокая — камера почти не отстаёт на скорости

export class FollowCamera {
  camera: THREE.PerspectiveCamera;
  private followDir = new THREE.Vector3(0, 0, 1);
  private lookTarget = new THREE.Vector3();
  private desired = new THREE.Vector3();
  private tmp = new THREE.Vector3();
  private right = new THREE.Vector3();
  private pitch = 0.4;

  // динамические состояния (сглаженные)
  private carveAmt = 0;
  private airAmt = 0;
  private punch = 0;   // просадка от удара
  private punchV = 0;
  private shake = 0;
  private bobT = 0;
  private rumbleT = 0;
  private roll = 0;

  constructor(aspect: number) {
    this.camera = new THREE.PerspectiveCamera(BASE_FOV, aspect, 0.2, 30000);
    this.camera.position.set(0, terrainHeight(0, -8) + 4, -8);
  }

  /** Удар: приземление или столкновение. force 0..1 */
  impact(force: number, shaky = false): void {
    this.punchV -= force * 9;
    if (shaky) this.shake = Math.max(this.shake, force);
  }

  update(player: Player, dt: number): void {
    // Камера ведётся по ДОСКЕ, пока едешь нормально, и переключается на
    // вектор ДВИЖЕНИЯ только в сносе.
    // Почему не всегда по движению: вектор скорости догоняет доску с
    // задержкой, поэтому камера начинала поворот позже руля — управление
    // ощущалось вязким и «наоборот».
    // Почему не всегда по доске: на тормозе доска встаёт поперёк хода, и
    // камера уводила взгляд вбок, хотя едешь прямо.
    const hd = player.headingDir;
    this.tmp.copy(hd);
    if (player.velH.lengthSq() > 4) {
      const vAng = Math.atan2(player.velH.x, player.velH.z);
      const hAng = Math.atan2(hd.x, hd.z);
      let off = hAng - vAng;
      off = Math.atan2(Math.sin(off), Math.cos(off));
      // Ближайшая ось доски: в switch «вперёд» — хвост. Разворачивать надо
      // и УГОЛ, и САМУ ОСЬ ПРИЦЕЛИВАНИЯ. Раньше сворачивался только угол, а
      // целились всё равно по носу — после разворота на 180° камера
      // смотрела назад, и игрок ехал задом.
      let base = hAng;
      if (Math.abs(off) > Math.PI / 2) {
        const half = Math.sign(off) * Math.PI;
        base = hAng - half;
        off -= half;
      }
      // до 25° — чистый карв, камера за доской; к 70° полностью за ходом
      const blend = Math.min(1, Math.max(0, (Math.abs(off) - 0.44) / 0.79));
      const aim = base - off * blend;
      this.tmp.set(Math.sin(aim), 0, Math.cos(aim));
    }
    const targetDir = this.tmp;
    // Разворот камеры ограничен по угловой скорости: в резком сносе вектор
    // движения гуляет быстро, и без предела кадр мотало бы.
    const cur = Math.atan2(this.followDir.x, this.followDir.z);
    const want = Math.atan2(targetDir.x, targetDir.z);
    let d = want - cur;
    d = Math.atan2(Math.sin(d), Math.cos(d));
    const rate = 1 - Math.exp(-4 * dt);
    const maxStep = TURN_LIMIT * dt;
    const turn = Math.max(-maxStep, Math.min(maxStep, d * rate));
    const na = cur + turn;
    this.followDir.set(Math.sin(na), 0, Math.cos(na));

    const playerPos = player.rig.root.position;
    const speedNorm = Math.min(player.speed / 55, 1);

    // --- динамика: карв, полёт, удары ---
    const airborne = !player.grounded && !player.grinding;
    this.airAmt += ((airborne ? 1 : 0) - this.airAmt) * (1 - Math.exp(-3.5 * dt));
    const carveTarget = player.grounded ? player.steerAmount : 0;
    this.carveAmt += (carveTarget - this.carveAmt) * (1 - Math.exp(-4 * dt));

    // пружина просадки после удара
    this.punchV += (-this.punch * 90 - this.punchV * 13) * dt;
    this.punch += this.punchV * dt;
    this.shake *= Math.exp(-6 * dt);
    this.bobT += dt * BOB_FREQ * (0.4 + speedNorm);

    // Сглаживание позиции даёт отставание v/FOLLOW_RATE — на 110 км/ч это
    // лишние 5 м, из-за которых камера кажется далёкой. Компенсируем ровно
    // на величину отставания, чтобы дистанция держалась заданной.
    const distNominal =
      DIST_BASE - DIST_SPEED_PULL * speedNorm + this.airAmt * AIR_BACK;
    // остаточное отставание компенсируем, но не больше половины дистанции,
    // иначе на 150 км/ч камера пытается встать ВПЕРЕДИ райдера
    const lag = Math.min(player.speed / FOLLOW_RATE, distNominal * 0.5);
    const dist = distNominal - lag;
    this.right.set(this.followDir.z, 0, -this.followDir.x); // право относительно хода

    this.desired.copy(playerPos)
      .addScaledVector(this.followDir, -dist)
      .addScaledVector(this.right, this.carveAmt * CARVE_SIDE)
      .add(this.tmp.set(0, HEIGHT + this.airAmt * AIR_RISE + this.punch, 0));

    // Покачивание и дрожь от скорости. Потолка скорости больше нет, поэтому
    // тряска считается не от нормированной скорости (она упирается в 1), а
    // от абсолютной: чем быстрее едешь, тем сильнее колотит — на 250 км/ч
    // камера должна ощутимо трясти, это и есть чувство предела.
    if (player.grounded && !player.grinding) {
      this.desired.y += Math.sin(this.bobT) * 0.06 * speedNorm;
      const rough = Math.max(0, player.speed - RUMBLE_FROM) * RUMBLE_GAIN;
      if (rough > 0) {
        // Не чистый рандом покадрово — он читается как стробоскоп. Две
        // несоизмеримые синусоиды дают вибрацию, а щепотка шума не даёт ей
        // превратиться в ровное качание.
        this.rumbleT += dt * (26 + player.speed * 0.5);
        const a = Math.sin(this.rumbleT) * 0.6 + Math.sin(this.rumbleT * 2.37 + 1.3) * 0.4;
        const b = Math.sin(this.rumbleT * 1.71 + 4.2) * 0.7 + (Math.random() - 0.5) * 0.3;
        this.desired.x += a * rough;
        this.desired.y += b * rough * 0.7;
      }
    }
    if (this.shake > 0.01) {
      const s = this.shake * 0.5;
      this.desired.x += (Math.random() - 0.5) * s;
      this.desired.y += (Math.random() - 0.5) * s;
      this.desired.z += (Math.random() - 0.5) * s;
    }

    // ★ ПОЛ КАМЕРЫ ТОЖЕ ПРОСЕДАЕТ. Порог считался по ДОВОРОНОЧНОЙ земле, и в
    // яме камера упиралась в невидимую площадку на старом уровне: игрок
    // опускался на дно, а точка обзора оставалась наверху — спуск в воронку
    // не читался вовсе.
    const minY = groundY(this.desired.x, this.desired.z) + 1.3;
    if (this.desired.y < minY) this.desired.y = minY;
    this.camera.position.lerp(this.desired, 1 - Math.exp(-FOLLOW_RATE * dt));

    // Угол камеры задаём явно, а не «целься в точку на склоне»: так райдер
    // всегда в одном месте кадра. Базовый угол — тот, под которым камера
    // видит райдера; FRAME_DROP приподнимает его над нижней кромкой, а доля
    // уклона добавляет наклона вниз, чтобы крутизна читалась.
    const lx = playerPos.x + this.followDir.x * LOOK_AHEAD;
    const lz = playerPos.z + this.followDir.z * LOOK_AHEAD;
    const drop = Math.max(0, playerPos.y - groundY(lx, lz));
    const slopeAng = Math.atan(drop / LOOK_AHEAD);
    // угол берём от НОМИНАЛЬНОЙ геометрии, а не от текущей позиции камеры:
    // иначе получается обратная связь и камера уходит в отвес
    const camH = HEIGHT + this.airAmt * AIR_RISE;
    const target =
      Math.atan2(camH, distNominal) - FRAME_DROP + SLOPE_FOLLOW * slopeAng;
    this.pitch += (target - this.pitch) * (1 - Math.exp(-5 * dt));
    this.lookTarget
      .copy(this.camera.position)
      .addScaledVector(this.followDir, Math.cos(this.pitch) * 40)
      .add(this.tmp.set(0, -Math.sin(this.pitch) * 40, 0));
    this.camera.lookAt(this.lookTarget);

    // крен в дугу — читается как перегрузка в повороте
    this.roll += (-this.carveAmt * CARVE_ROLL - this.roll) * (1 - Math.exp(-5 * dt));
    this.camera.rotateZ(this.roll);

    const targetFov = BASE_FOV + FOV_SPEED_GAIN * speedNorm + this.airAmt * 2;
    this.camera.fov += (targetFov - this.camera.fov) * (1 - Math.exp(-3 * dt));
    this.camera.updateProjectionMatrix();
  }
}
