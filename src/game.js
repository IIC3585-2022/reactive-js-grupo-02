import { Drawer } from './drawer';
import { Map } from './map';
import { PacMan } from './characters/pacman';
import { Ghost } from './characters/ghost';
import { TILE_SIZE } from './constants';
import { LAYOUT } from './layout';
import { setupAndShowLooserContent } from './domHandlers';

export class Game {
  /** @type {Drawer} */
  #drawer;

  /** @type {Map} */
  #map;

  /** @type {PacMan} */
  #pacman1;

  /** @type {PacMan} */
  #pacman2;

  /** @type {Array<Ghost>} */
  #ghosts = [];

  constructor() {
    this.#drawer = new Drawer();
    this.#map = new Map(this.#drawer);

    this.#initializeGhosts();
    this.#initializePacmen();
    this.#initializeListeners();

    this.#initialDraw();
  }

  startGame() {
    this.#ghosts.forEach((ghost) => ghost.start());
    this.#pacman1.start();
    this.#pacman2.start();
  }

  /**
   * @param {number} looser
   */
  endGame(looser) {
    this.#ghosts.forEach((ghost) => ghost.stop());
    this.#pacman1.stop();
    this.#pacman2.stop();
    setupAndShowLooserContent(looser);
  }

  #initializeGhosts() {
    this.#ghosts.push( // bottom left
      new Ghost(
        this.#drawer,
        {
          positionX: TILE_SIZE,
          positionY: (LAYOUT.length - 2) * TILE_SIZE,
          direction: 'up',
        },
      ),
    );
    this.#ghosts.push( // upper half-left
      new Ghost(
        this.#drawer,
        {
          positionX: ((LAYOUT[0].length / 2) - 2) * TILE_SIZE,
          positionY: TILE_SIZE,
          direction: 'down',
        },
      ),
    );
    this.#ghosts.push( // bottom half-right
      new Ghost(
        this.#drawer,
        {
          positionX: ((LAYOUT[0].length / 2) + 1) * TILE_SIZE,
          positionY: (LAYOUT.length - 2) * TILE_SIZE,
          direction: 'up',
        },
      ),
    );
    this.#ghosts.push( // upper right
      new Ghost(
        this.#drawer,
        {
          positionX: (LAYOUT[0].length - 2) * TILE_SIZE,
          positionY: TILE_SIZE,
          direction: 'down',
        },
      ),
    );
  }

  #initializePacmen() {
    this.#pacman1 = new PacMan(this.#drawer);
    this.#pacman2 = new PacMan(
      this.#drawer,
      {
        positionX: (LAYOUT[0].length - 2) * TILE_SIZE,
        positionY: (LAYOUT.length - 2) * TILE_SIZE,
        direction: 'left',
        movementType: 'letters',
      },
    );
  }

  #initializeListeners() {
    this.#pacman1.listenForCollisions(
      ...this.#ghosts.map((ghost) => ghost.movementObservable),
    );

    this.#pacman2.listenForCollisions(
      ...this.#ghosts.map((ghost) => ghost.movementObservable),
    );

    this.#pacman1.notifier.subscribe(() => this.endGame(1));
    this.#pacman2.notifier.subscribe(() => this.endGame(2));
  }

  #initialDraw() {
    this.#map.drawMap();
    this.#ghosts.forEach((ghost) => ghost.draw());
    this.#pacman1.draw();
    this.#pacman2.draw();
  }
}
