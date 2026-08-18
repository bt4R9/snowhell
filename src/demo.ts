import { VOLCANO_FROM, VOLCANO_TO } from './world/features';
import { eyeNear, DOOM_LEN } from './world/eye';

/**
 * ★ РЕЖИССЁР ДЕМО. Игра сама по себе бесконечна и не имеет ни начала, ни
 * конца — а демо обязано их иметь: меню, завязка, две карты, развязка, титр с
 * очками. Всё это отдельный автомат: он ничего не знает ни о физике, ни о
 * рендере, а только говорит игре два слова — «замри» и «покажи вот это».
 *
 * ★ ВСТАВКИ НЕ ОТБИРАЮТ УПРАВЛЕНИЕ НАВСЕГДА. Каждая либо ждёт нажатия, либо
 * висит фиксированное время: застрять в кино нельзя.
 */
export const enum Stage {
  Menu,
  IntroRide,
  Snow,
  IntroTower,
  Volcano,
  /**
   * ★ ПОДХОД К БАШНЕ — ОТДЕЛЬНЫЙ УЧАСТОК. Раньше развязка запускалась просто
   * по метке на склоне, посреди вулкана. Но башня — это цель всего спуска, и
   * дойти до неё надо ногами: вулкан кончается, склон снова снежный, а она
   * стоит впереди, и до неё ещё надо доехать.
   */
  Approach,
  Doom,
  /** ★ ПОСЛЕ БАШНИ СПУСК ПРОДОЛЖАЕТСЯ: полярная ночь — выдох, свободная езда */
  Night,
  Win,
}

/** реплики — по-английски, как и весь текст в игре */
const HERO_LINE = [
  '"WHAT A WONDERFUL DAY.',
  'THIS IS GOING TO BE A GREAT RIDE!"',
];
const DOOM_LINE = [
  '"OH NO...',
  'YOU HAVE PASSED AFTER ALL."',
];
const TOWER_LINE = [
  '"I AM THE GREAT EYE.',
  'TODAY IS NOT YOUR DAY.',
  'YOU SHALL NOT PASS!"',
];

const CONTROLS = [
  'WASD / ARROWS  -  STEER, TRICKS IN THE AIR',
  'SPACE  -  JUMP',
  'Q / E  -  LEFT / RIGHT BRAKE',
  'R  -  RESPAWN',
];

/**
 * ★ ЗАВЯЗКА ВТОРОЙ КАРТЫ — ЭТО ПЕРЕХОД, А НЕ ТАБЛИЧКА. Раньше вулкан просто
 * наступал по мере езды, и башня появлялась где-то вдали сама собой. Теперь
 * весь переход происходит НА ГЛАЗАХ и по частям: сперва чернеет небо и склон
 * становится вулканическим, потом из земли встаёт башня, потом камера идёт к
 * ней, та произносит своё, и камера возвращается к райдеру.
 * Отсечки — доли всей вставки.
 */
const T_WORLD = 3.2;   // небо и горы меняются
const T_RISE = 3.0;    // башня встаёт
const T_FLY = 2.2;     // камера идёт к башне
const T_BACK = 2.0;    // камера возвращается

/** подсказка под текстом вставки; появляется, когда пропуск уже разрешён */
/**
 * Подсказка под текстом любого экрана.
 * ★ ОНА ПОЯВЛЯЕТСЯ СРАЗУ И РАБОТАЕТ СРАЗУ. Была задержка «дать дочитать»:
 * секунду нажатие ничего не делало, потом подсказка возникала — экран
 * дёргался, а игрок в это время жал впустую. Читать он умеет и сам.
 * ★ ПУСТАЯ СТРОКА — ПРОБЕЛ, А НЕ ''. Экран прячет строки по признаку
 * «непустая ли она», так что '' исчезала и отбивки не получалось.
 */
const GO_ON = [' ', 'PRESS SPACE TO CONTINUE'];
/** сколько камера подходит к башне перед развязкой, с */
const DOOM_ZOOM = 1.8;
/**
 * Сколько ждать после подрыва, прежде чем показать титр.
 * ★ РОВНО ДЛИНА ОБВАЛА, НЕ БОЛЬШЕ. Здесь стояло круглое «семь секунд», а
 * башня досыпается за 5.6 — полторы секунды игрок смотрел на пустой склон.
 */
const DOOM_T = DOOM_LEN;

/**
 * ★ ОТЛАДОЧНЫЙ БЫСТРЫЙ ПЕРЕХОД. Снежная карта — это три минуты, а проверять в
 * ней надо только вход в вулкан: ждать каждый раз незачем. Через десять секунд
 * игрок переносится к самому входу, и дальше всё идёт штатно — то есть
 * проверяется настоящий переход, а не его имитация.
 *
 * Выключается из консоли: `__fastVolcano(false)`.
 */
export const demoDebug = {
  fastVolcano: false,
  /**
   * ★ СТАРТ СРАЗУ В НУЖНОЙ ТОЧКЕ СКЛОНА. Развязка живёт на четырнадцатом
   * километре, и доезжать до неё каждый раз — это шесть минут. 0 — обычный
   * старт со снежной карты.
   * Меняется из консоли: `__startAt(13000)`, обычный старт — `__startAt(0)`.
   */
  startZ: 0,
};

/** плавная S-кривая: камера не должна трогаться и вставать рывком */
function smooth(x: number): number {
  const k = Math.max(0, Math.min(1, x));
  return k * k * (3 - 2 * k);
}

export class Demo {
  stage: Stage = Stage.Menu;
  t = 0;
  /** просьба к игре подорвать башню — снимается после исполнения */
  wantDoom = false;
  /** 0..1 — насколько башня выросла; −1 — вставки нет, живёт как обычно */
  towerRise = -1;
  /** 0..1 — насколько камера ушла к башне */
  camToTower = 0;
  /** какой точке склона показывать погоду: во вставке она едет сама */
  weatherZ = 0;
  /** где стоит башня — по ней считается и подход, и финал */
  private towerZ = 0;
  /** куда перенести игрока (отладочный быстрый переход); 0 — не надо */
  wantWarp = 0;
  /** когда игрок отпустил вставку про башню; −1 — ещё держит */
  private leaveT = -1;
  /** когда башня договорила и начала разрушаться; −1 — ещё говорит */
  private saidT = -1;

  /** игрок заморожен: меню и вставки */
  get frozen(): boolean {
    return (
      this.stage === Stage.Menu ||
      this.stage === Stage.IntroRide ||
      this.stage === Stage.IntroTower ||
      this.stage === Stage.Doom ||
      this.stage === Stage.Win
    );
  }

  /** идёт ли собственно игра — по этому прячутся цифры HUD */
  get playing(): boolean {
    return (
      this.stage === Stage.Snow ||
      this.stage === Stage.Volcano ||
      this.stage === Stage.Approach ||
      this.stage === Stage.Night
    );
  }

  /**
   * @param confirm нажали ли подтверждение в этом кадре
   * @param pz где игрок по склону
   * @param score текущий счёт — нужен финальному титру
   * @returns что показать поверх кадра
   */
  update(
    dt: number,
    confirm: boolean,
    pz: number,
    score: number
  ): { title: string; lines: string[]; dim: number } | null {
    this.t += dt;
    const step = (to: Stage): void => {
      this.stage = to;
      this.t = 0;
      this.leaveT = -1;
      this.saidT = -1;
    };
    // ★ ВСТАВКУ ЗАКРЫВАЕТ ТОЛЬКО ИГРОК. Под текстом написано «нажми пробел» —
    // значит она обязана ждать нажатия сколько угодно. Автозакрытие по таймеру
    // делало эту надпись ложью и обрывало реплику на середине.
    const skip = confirm;

    switch (this.stage) {
      case Stage.Menu:
        if (confirm && this.t > 0.3) step(Stage.IntroRide);
        return {
          title: 'SNOWHELL',
          lines: [' ', ...CONTROLS, ...GO_ON],
          dim: 0.82,
        };

      case Stage.IntroRide:
        if (skip) {
          // отладочный старт: переносимся сразу в нужное место склона, и
          // завязка про башню тогда уже позади
          if (demoDebug.startZ > 0) {
            this.wantWarp = demoDebug.startZ;
            this.weatherZ = demoDebug.startZ;
            step(Stage.Volcano);
            return null;
          }
          step(Stage.Snow);
        }
        return { title: '', lines: [...HERO_LINE, ...GO_ON], dim: 0.45 };

      case Stage.Snow:
        // ★ ВСТАВКА ПРО БАШНЮ — РОВНО ПЕРЕД ВУЛКАНОМ. Не по таймеру: игрок
        // едет с какой хочет скоростью, и привязывать реплику ко времени
        // значит показать её то посреди снега, то уже в пепле.
        if (demoDebug.fastVolcano && this.t > 10 && pz < VOLCANO_FROM - 600) {
          this.wantWarp = VOLCANO_FROM - 300;
          return null;
        }
        if (pz > VOLCANO_FROM - 260) step(Stage.IntroTower);
        return null;

      case Stage.IntroTower: {
        const t = this.t;
        // мир перекрашивается в вулкан: погоду ведём вперёд по склону сами,
        // потому что игрок стоит и по его z ничего бы не изменилось
        const wk = Math.min(1, t / T_WORLD);
        this.weatherZ = pz + (VOLCANO_FROM + 700 - pz) * wk * wk;
        // башня встаёт из склона после того, как небо уже потемнело
        this.towerRise = Math.max(0, Math.min(1, (t - T_WORLD * 0.55) / T_RISE));
        // ★ КАМЕРА ЖДЁТ ИГРОКА, А НЕ ТАЙМЕР. Подлёт по времени, а дальше она
        // стоит у башни столько, сколько нужно; возврат начинается только
        // после нажатия.
        const f0 = T_WORLD + T_RISE;
        const arrived = t >= f0 + T_FLY;
        if (!arrived) {
          this.camToTower = t < f0 ? 0 : smooth((t - f0) / T_FLY);
        } else if (this.leaveT < 0) {
          this.camToTower = 1;
          if (confirm) this.leaveT = t;
        } else {
          this.camToTower = 1 - smooth((t - this.leaveT) / T_BACK);
          if (t > this.leaveT + T_BACK) {
            this.towerRise = -1;
            this.camToTower = 0;
            step(Stage.Volcano);
            return null;
          }
        }
        const saying = t > f0 + T_FLY * 0.75 && this.leaveT < 0;
        return {
          title: '',
          lines: saying ? [...TOWER_LINE, ...GO_ON] : [],
          dim: saying ? 0.28 : 0,
        };
      }

      case Stage.Volcano:
        // ★ ПОСЛЕ ВСТАВКИ МИР НЕ ОТКАТЫВАЕТСЯ. Башня и небо держались только
        // на флагах вставки: стоило камере вернуться, как вес биома в точке
        // игрока был ещё снежный — башня пропадала, и её приходилось ждать
        // заново. Держим оба принудительно, пока склон сам не станет
        // вулканическим, и отпускаем без скачка.
        this.weatherZ = Math.max(this.weatherZ, pz);
        // ★ БАШНЯ ВИДНА ВСЮ ВУЛКАНИЧЕСКУЮ КАРТУ, БЕЗ ПРОВАЛОВ. Раньше её
        // держали принудительно только на въезде, а дальше она жила по весу
        // биома — и у выхода, где вес уже падает ниже порога, исчезала на
        // двести метров, чтобы снова появиться на стадии подхода. Она цель
        // всего спуска: пропадать ей нельзя нигде.
        this.towerRise = 1;
        if (pz > VOLCANO_TO) {
          this.towerZ = eyeNear(pz).z;
          step(Stage.Approach);
        }
        return null;

      case Stage.Approach:
        // склон уже снежный, вулкан позади — но око не гаснет вместе с биомом:
        // оно и есть то, ради чего сюда ехали
        this.towerRise = 1;
        // ★ ВЗРЫВ ЗАКАЗЫВАЕТ НЕ ЭТА СТАДИЯ. Раньше башня начинала рушиться в
        // тот же кадр, когда игрок доезжал, — то есть до того, как камера
        // успевала подойти, и половина развязки проходила общим планом.
        if (pz > this.towerZ - 420) step(Stage.Doom);
        return null;

      case Stage.Doom: {
        // ★ ПОРЯДОК РАЗВЯЗКИ: ПОДОЙТИ → СКАЗАТЬ → РУХНУТЬ. Камера подходит
        // первой, потому что показывать надо разрушение, а не точку на
        // горизонте; реплика идёт до взрыва, потому что после него говорить
        // уже некому.
        this.towerRise = 1;
        this.camToTower = smooth(Math.min(1, this.t / DOOM_ZOOM));
        const arrived = this.t >= DOOM_ZOOM;
        if (this.saidT < 0) {
          if (arrived && confirm) {
            this.saidT = this.t;
            this.wantDoom = true;
          }
          return arrived
            ? { title: '', lines: [...DOOM_LINE, ...GO_ON], dim: 0.3 }
            : null;
        }
        if (this.t > this.saidT + DOOM_T) step(Stage.Night);
        return null;
      }

      case Stage.Night:
        // ★ ОКО РАЗБИТО — ЕДЕМ ДАЛЬШЕ. Короткий титр и тишина: впереди ночь,
        // замёрзшие озёра и сияние; никаких вставок, только склон.
        this.towerRise = -1;
        this.camToTower = 0;
        return this.t < 6
          ? { title: '', lines: ['THE EYE IS BROKEN.', ' ', 'SMOKE AHEAD. THE FURNACE CITY.'], dim: 0.12 }
          : null;

      default:
        return {
          title: 'YOU WIN',
          lines: [' ', 'THE EYE IS BROKEN.', ' ', 'SCORE  ' + score, ' ', 'PRESS SPACE TO RESTART'],
          dim: 0.72,
        };
    }
  }
}
