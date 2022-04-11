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
    this.#pacman = new PacMan(this.#drawer);
    this.#ghost1 = new Ghost(this.#drawer);
    this.#ghost2 = new Ghost(
      this.#drawer,
      {
        positionX: TILE_SIZE,
        positionY: (LAYOUT.length - 2) * TILE_SIZE,
      },
    );
    this.#ghost3 = new Ghost(
      this.#drawer,
      {
        positionX: (LAYOUT[0].length - 2) * TILE_SIZE,
        positionY: TILE_SIZE,
      },
    );
  }

  startGame() {
    this.#map.drawMap();
    this.#pacman.draw();
    this.#ghost1.draw();
    this.#ghost2.draw();
    this.#ghost3.draw();

    this.#pacman.start();
    this.#ghost1.start();
    this.#ghost2.start();
    this.#ghost3.start();
  }
}
