import { SPEED, TILE_SIZE } from '@/constants';
import {
  pacman0, pacman1, pacman2, pacman3,
} from '@/sprites';

/**
 * @typedef {import('./drawer.js').Drawer} Drawer
 */

export class PacMan {
  /** @type {Array<HTMLImageElement>} */
  #sprites = [pacman0, pacman1, pacman2, pacman3];

  /** @type {number} */
  #currentSprite = -1;

  /** @type {Drawer} */
  #drawer;

  #positionX = TILE_SIZE;

  #positionY = TILE_SIZE;

  /**
   * @param {Drawer} drawer
   */
  constructor(drawer) {
    this.#drawer = drawer;
  }

  /**
   * @returns {HTMLImageElement}
   */
  get #sprite() {
    this.#currentSprite = (this.#currentSprite + 1) % 4;
    return this.#sprites[this.#currentSprite];
  }

  draw() {
    this.#drawer.draw(this.#sprite, this.#positionX, this.#positionY);
  }

  undraw() {
    this.#drawer.undraw(this.#positionX, this.#positionY);
  }

  move() {
    this.undraw();
    this.#positionX += SPEED;
    this.draw();
  }
}
