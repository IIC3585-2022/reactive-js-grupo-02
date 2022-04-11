import { interval } from 'rxjs';
import { Drawer } from './drawer';
import { Map } from './map';
import { PacMan } from './pacman';

export class Game {
  /** @type {Drawer} */
  #drawer;

  /** @type {Map} */
  #map;

  /** @type {PacMan} */
  #pacman;

  constructor() {
    this.#drawer = new Drawer();
    this.#map = new Map(this.#drawer);
    this.#pacman = new PacMan(this.#drawer);
  }

  startGame() {
    this.#map.drawMap();
    this.#pacman.draw();

    interval(100).subscribe(() => this.#pacman.move());
  }
}
