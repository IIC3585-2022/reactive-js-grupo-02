import { SPEED, TILE_SIZE } from '@/constants';
import { LAYOUT } from '@/layout';
import { pacman } from '@/sprites';
import { setupMovementListener } from '@/listeners/movement';

/**
 * @typedef {import('./drawer.js').Drawer} Drawer
 */

/**
 * @typedef {'right' | 'down' | 'left' | 'up'} Direction
 */

/**
 * @typedef {Object} PacManOptions
 * @property {Direction=} direction
 * @property {('arrows' | 'letters')=} movementType
 */

export class PacMan {
  /** @type {Record<Direction, Array<HTMLImageElement>>} */
  #sprites = {
    right: [pacman.right.pacman0, pacman.right.pacman1, pacman.right.pacman2, pacman.right.pacman3],
    down: [pacman.down.pacman0, pacman.down.pacman1, pacman.down.pacman2, pacman.down.pacman3],
    left: [pacman.left.pacman0, pacman.left.pacman1, pacman.left.pacman2, pacman.left.pacman3],
    up: [pacman.up.pacman0, pacman.up.pacman1, pacman.up.pacman2, pacman.up.pacman3],
  };

  /** @type {number} */
  #currentSprite = -1;

  /** @type {Drawer} */
  #drawer;

  #positionX = TILE_SIZE;

  #positionY = TILE_SIZE;

  #moving = true;

  /** @type {Direction} */
  #direction;

  /** @type {Direction | null} */
  #directionIntent = null;

  /**
   * @param {Drawer} drawer
   * @param {PacManOptions=} options
   */
  constructor(drawer, options) {
    const { direction = 'right', movementType = 'arrows' } = options || {};
    this.#drawer = drawer;
    this.#direction = direction;

    setupMovementListener(this, movementType);
  }

  /**
   * @returns {HTMLImageElement}
   */
  get #sprite() {
    this.#currentSprite = (this.#currentSprite + 1) % 4;
    return this.#sprites[this.#direction][this.#currentSprite];
  }

  get positionX() {
    return this.#positionX;
  }

  draw() {
    this.#drawer.draw(this.#sprite, this.#positionX, this.#positionY);
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
