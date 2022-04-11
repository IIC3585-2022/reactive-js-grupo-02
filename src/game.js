import { Drawer } from './drawer';
import { Map } from './map';
import { PacMan } from './characters/pacman';
import { Ghost } from './characters/ghost';
import { TILE_SIZE } from './constants';
import { LAYOUT } from './layout';

export class Game {
  /** @type {Drawer} */
  #drawer;

  /** @type {Map} */
  #map;

  /** @type {PacMan} */
  #pacman;

  /** @type {Ghost} */
  #ghost1;

  /** @type {Ghost} */
  #ghost2;

  /** @type {Ghost} */
  #ghost3;

  constructor() {
    this.#drawer = new Drawer();
    this.#map = new Map(this.#drawer);
    this.#ghost1 = new Ghost(this.#drawer);
    this.#ghost2 = new Ghost(
      this.#drawer,
      {
        positionX: TILE_SIZE,
        positionY: (LAYOUT.length - 2) * TILE_SIZE,
        direction: 'right',
      },
    );
    this.#ghost3 = new Ghost(
      this.#drawer,
      {
        positionX: (LAYOUT[0].length - 2) * TILE_SIZE,
        positionY: TILE_SIZE,
        direction: 'down',
      },
    );

    this.#pacman = new PacMan(this.#drawer);

    this.#pacman.listenForCollisions(
      this.#ghost1.movementObservable,
      this.#ghost2.movementObservable,
      this.#ghost3.movementObservable,
    );

    this.#pacman.notifier.subscribe(this.endGame.bind(this));

    this.#draw();
  }

  startGame() {
    this.#pacman.start();
    this.#ghost1.start();
    this.#ghost2.start();
    this.#ghost3.start();
  }

  endGame() {
    this.#ghost1.stop();
    this.#ghost2.stop();
    this.#ghost3.stop();
    this.#pacman.stop();
  }

  #draw() {
    this.#map.drawMap();
    this.#pacman.draw();
    this.#ghost1.draw();
    this.#ghost2.draw();
    this.#ghost3.draw();
  }
}
