import { interval, merge, Subject } from 'rxjs';
import { setupMovementListener } from '@/listeners/movement';
import { isBetween } from '@/utils.js';
import { TILE_SIZE } from '@/constants';
import { pacman } from '@/sprites';
import { BaseCharacter } from './base.js';

/**
 * @typedef {import('rxjs').Observable} Observable
 */

/**
 * @typedef {import('../drawer.js').Drawer} Drawer
 */

/**
 * @typedef {'right' | 'down' | 'left' | 'up'} Direction
 */

/**
 * @typedef {Object} PacManOptions
 * @property {Direction=} direction
 * @property {('arrows' | 'letters')=} movementType
 */

export class PacMan extends BaseCharacter {
  /** @type {Record<Direction, Array<HTMLImageElement>>} */
  #sprites = {
    right: [pacman.right.pacman0, pacman.right.pacman1, pacman.right.pacman2, pacman.right.pacman3],
    down: [pacman.down.pacman0, pacman.down.pacman1, pacman.down.pacman2, pacman.down.pacman3],
    left: [pacman.left.pacman0, pacman.left.pacman1, pacman.left.pacman2, pacman.left.pacman3],
    up: [pacman.up.pacman0, pacman.up.pacman1, pacman.up.pacman2, pacman.up.pacman3],
  };

  /** @type {number} */
  #currentSprite = -1;

  /** @type {Array<Observable>} */
  #collisionObservables;

  notifier = new Subject();

  /**
   * @param {Drawer} drawer
   * @param {PacManOptions=} options
   */
  constructor(drawer, options) {
    const { direction = 'right', movementType = 'arrows' } = options || {};

    super(drawer, TILE_SIZE, TILE_SIZE, direction);

    setupMovementListener(this, movementType);
  }

  start() {
    const refreshSubscription = interval(40).subscribe(() => this.move());
    this.intervalSubscriptions.push(refreshSubscription);
    merge(...this.#collisionObservables).subscribe(this.handleGhostCollision.bind(this));
  }

  listenForCollisions(...observables) {
    this.#collisionObservables = observables;
  }

  /**
   * @returns {HTMLImageElement}
   */
  getSprite() {
    this.#currentSprite = (this.#currentSprite + 1) % 4;
    return this.#sprites[this.direction][this.#currentSprite];
  }

  /**
   * @param {object} positions
   * @param {number} positions.positionX
   * @param {number} positions.positionY
   */
  handleGhostCollision({ positionX, positionY }) {
    /** @type {[number, number]} */
    const bordersX = [this.positionX, this.positionX + TILE_SIZE];
    /** @type {[number, number]} */
    const bordersY = [this.positionY, this.positionY + TILE_SIZE];

    const isBetweenX = (
      isBetween(positionX, ...bordersX)
      || isBetween(positionX + TILE_SIZE, ...bordersX)
    );
    const isBetweenY = (
      isBetween(positionY, ...bordersY)
      || isBetween(positionY + TILE_SIZE, ...bordersY)
    );

    if (isBetweenX && isBetweenY) {
      this.notifier.next({ status: 'game_over' });
    }
  }
}
