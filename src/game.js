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
  #pacman1;

  /** @type {PacMan} */
  #pacman2;

  /** @type {Ghost} */
  #ghost1;

  /** @type {Ghost} */
  #ghost2;

  /** @type {Ghost} */
  #ghost3;

  constructor() {
    this.#drawer = new Drawer();
    this.#map = new Map(this.#drawer);

    this.#initializeGhosts();
    this.#initializePacmen();
    this.#initializeListeners();

    this.#initialDraw();
  }

  startGame() {
    this.#ghost1.start();
    this.#ghost2.start();
    this.#ghost3.start();
    this.#pacman1.start();
    this.#pacman2.start();
  }

  /**
   * @param {number} looser
   */
  endGame(looser) {
    this.#ghost1.stop();
    this.#ghost2.stop();
    this.#ghost3.stop();
    this.#pacman1.stop();
    this.#pacman2.stop();
    console.log(`Player ${looser} lost!`);
  }

  #initializeGhosts() {
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
  }

  #initializePacmen() {
    this.#pacman1 = new PacMan(this.#drawer);
    this.#pacman2 = new PacMan(this.#drawer);
  }

  #initializeListeners() {
    this.#pacman1.listenForCollisions(
      this.#ghost1.movementObservable,
      this.#ghost2.movementObservable,
      this.#ghost3.movementObservable,
    );

    this.#pacman2.listenForCollisions(
      this.#ghost1.movementObservable,
      this.#ghost2.movementObservable,
      this.#ghost3.movementObservable,
    );

    this.#pacman1.notifier.subscribe(() => this.endGame(1));
    this.#pacman2.notifier.subscribe(() => this.endGame(2));
  }

  #initialDraw() {
    this.#map.drawMap();
    this.#ghost1.draw();
    this.#ghost2.draw();
    this.#ghost3.draw();
    this.#pacman1.draw();
    this.#pacman2.draw();
  }
}
