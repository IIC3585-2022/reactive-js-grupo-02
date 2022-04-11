import { LAYOUT } from '@/layout';
import { SPEED, TILE_SIZE } from '@/constants';

/**
 * @typedef {import('rxjs').Subscription} Subscription
 */

/**
 * @typedef {import('../drawer.js').Drawer} Drawer
 */

/**
 * @typedef {'right' | 'down' | 'left' | 'up'} Direction
 */

/**
 * @abstract
 */
export class BaseCharacter {
  /** @type {Drawer} */
  #drawer;

  /** @type {number} */
  #positionX;

  /** @type {number} */
  #positionY;

  #moving = true;

  /** @type {Direction} */
  #direction;

  /** @type {Direction | null} */
  #directionIntent = null;

  /** @type {Array<Subscription>} */
  intervalSubscriptions = [];

  /**
   *
   * @param {Drawer} drawer
   * @param {number} positionX
   * @param {number} positionY
   * @param {Direction} direction
   */
  constructor(drawer, positionX, positionY, direction) {
    this.#drawer = drawer;
    this.#positionX = positionX;
    this.#positionY = positionY;
    this.#direction = direction;
  }

  get positionX() {
    return this.#positionX;
  }

  get positionY() {
    return this.#positionY;
  }

  get direction() {
    return this.#direction;
  }

  start() { // eslint-disable-line class-methods-use-this
    throw new Error('#start isn\t implemented!');
  }

  stop() {
    this.intervalSubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  /**
   * @abstract
   * @returns {HTMLImageElement}
   */
  getSprite() { // eslint-disable-line class-methods-use-this
    throw new Error('#getSprite isn\t implemented!');
  }

  draw() {
    this.#drawer.draw(this.getSprite(), this.#positionX, this.#positionY);
  }

  undraw() {
    this.#drawer.undraw(this.#positionX, this.#positionY);
  }

  move() {
    this.undraw();
    this.#changeDirection();
    this.draw();
  }

  /**
   * @param {Direction} direction
   */
  changeDirectionIntent(direction) {
    this.#directionIntent = direction;
  }

  #changeDirection() {
    this.#resolveDirectionIntent();
    this.#handleWallCollisions();
    if (this.#moving) {
      if (this.#direction === 'right') {
        this.#positionX += SPEED;
      } else if (this.#direction === 'down') {
        this.#positionY += SPEED;
      } else if (this.#direction === 'left') {
        this.#positionX -= SPEED;
      } else if (this.#direction === 'up') {
        this.#positionY -= SPEED;
      }
    }
  }

  #resolveDirectionIntent() {
    if (!this.#directionIntent) { return; }
    if ((this.#positionX % TILE_SIZE) || (this.#positionY % TILE_SIZE)) { return; }
    if (this.#directionIntent === 'right' && !this.#hasWallRight()) {
      this.#direction = 'right';
    } else if (this.#directionIntent === 'down' && !this.#hasWallDown()) {
      this.#direction = 'down';
    } else if (this.#directionIntent === 'left' && !this.#hasWallLeft()) {
      this.#direction = 'left';
    } else if (this.#directionIntent === 'up' && !this.#hasWallUp()) {
      this.#direction = 'up';
    }
    if (this.#directionIntent !== this.#direction) { return; }
    this.#moving = true;
    this.#directionIntent = null;
  }

  #handleWallCollisions() {
    if ((this.#positionX % TILE_SIZE) || (this.#positionY % TILE_SIZE)) { return; }

    if (this.#direction === 'right' && this.#hasWallRight()) {
      this.#moving = false;
    } else if (this.#direction === 'down' && this.#hasWallDown()) {
      this.#moving = false;
    } else if (this.#direction === 'left' && this.#hasWallLeft()) {
      this.#moving = false;
    } else if (this.#direction === 'up' && this.#hasWallUp()) {
      this.#moving = false;
    }
  }

  #hasWallRight() {
    return !!LAYOUT[this.#positionY / TILE_SIZE][(this.#positionX / TILE_SIZE) + 1];
  }

  #hasWallDown() {
    return !!LAYOUT[(this.#positionY / TILE_SIZE) + 1][this.#positionX / TILE_SIZE];
  }

  #hasWallLeft() {
    return !!LAYOUT[this.#positionY / TILE_SIZE][(this.#positionX / TILE_SIZE) - 1];
  }

  #hasWallUp() {
    return !!LAYOUT[(this.#positionY / TILE_SIZE) - 1][this.#positionX / TILE_SIZE];
  }
}
