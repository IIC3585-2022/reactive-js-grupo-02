import { LAYOUT } from '@/layout';
import { wall } from '@/sprites';
import { TILE_SIZE } from '@/constants';

/**
 * @typedef {import('./drawer.js').Drawer} Drawer
 */

export class Map {
  /** @type {Array<Array<number>>} */
  #layout = LAYOUT;

  /** @type {Drawer} */
  #drawer;

  /**
   * @param {Drawer} drawer
   */
  constructor(drawer) {
    this.#drawer = drawer;
  }

  drawMap() {
    this.#layout.forEach((row, positionY) => {
      row.forEach((value, positionX) => {
        if (value) {
          this.#drawer.draw(wall, positionX * TILE_SIZE, positionY * TILE_SIZE);
        }
      });
    });
  }
}
