import { CANVAS_ID, TILE_SIZE } from '@/constants';
import { INITIAL_LAYOUT } from '@/initialLayout';
import { getSprite } from '@/sprites';

export class Map {
  /** @type {HTMLCanvasElement} */
  #canvas;

  // 1 - wall
  // 0 - dots
  // 4 - pacman
  /** @type {Array<Array<number>>} */
  #layout = INITIAL_LAYOUT;

  constructor() {
    // @ts-ignore
    this.#canvas = document.getElementById(CANVAS_ID);
    this.#setCanvasSize();
  }

  /**
   * @return {CanvasRenderingContext2D}
   */
  get #context() {
    return this.#canvas.getContext('2d');
  }

  draw() {
    this.#layout.forEach((row, positionY) => {
      row.forEach((value, positionX) => {
        const sprite = getSprite(value);
        this.#drawSprite(sprite, positionX, positionY);
      });
    });
  }

  /**
   * @param {HTMLImageElement} sprite
   * @param {number} positionX
   * @param {number} positionY
   */
  #drawSprite(sprite, positionX, positionY) {
    this.#context.drawImage(
      sprite,
      positionX * TILE_SIZE,
      positionY * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE,
    );
  }

  #setCanvasSize() {
    this.#canvas.width = this.#layout[0].length * TILE_SIZE;
    this.#canvas.height = this.#layout.length * TILE_SIZE;
  }
}
