import { LAYOUT } from '@/layout';
import { CANVAS_ID, TILE_SIZE } from '@/constants';

export class Drawer {
  /** @type {HTMLCanvasElement} */
  #canvas;

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

  /**
   * @param {HTMLImageElement} image
   * @param {number} positionX
   * @param {number} positionY
   */
  draw(image, positionX, positionY) {
    this.#context.drawImage(
      image,
      positionX,
      positionY,
      TILE_SIZE,
      TILE_SIZE,
    );
  }

  /**
   *
   * @param {number} positionX
   * @param {number} positionY
   */
  undraw(positionX, positionY) {
    this.#context.clearRect(positionX, positionY, TILE_SIZE, TILE_SIZE);
  }

  #setCanvasSize() {
    this.#canvas.width = LAYOUT[0].length * TILE_SIZE;
    this.#canvas.height = LAYOUT.length * TILE_SIZE;
  }
}
