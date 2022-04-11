import { Observable, interval } from 'rxjs';
import { randomNumber } from '@/utils.js';
import { TILE_SIZE, REFRESH_RATE } from '@/constants';
import { LAYOUT } from '@/layout';
import { ghost } from '@/sprites';
import { BaseCharacter } from './base.js';

/**
 * @typedef {import('../drawer.js').Drawer} Drawer
 */

/**
 * @typedef {'right' | 'down' | 'left' | 'up'} Direction
 */

/**
 * @typedef {Object} GhostOptions
 * @property {Direction=} direction
 * @property {number=} positionX
 * @property {number=} positionY
 */

export class Ghost extends BaseCharacter {
  movementObservable = new Observable((subscriber) => {
    const collisionCheckSubscription = interval(REFRESH_RATE).subscribe(() => {
      subscriber.next({ positionX: this.positionX, positionY: this.positionY });
    });
    this.intervalSubscriptions.push(collisionCheckSubscription);
  });

  /**
   * @param {Drawer} drawer
   * @param {GhostOptions=} options
   */
  constructor(drawer, options) {
    const {
      direction = 'left',
      positionX = (LAYOUT[0].length - 2) * TILE_SIZE,
      positionY = (LAYOUT.length - 2) * TILE_SIZE,
    } = options || {};

    super(drawer, positionX, positionY, direction);
  }

  /**
   * @returns {Array<Direction>}
   */
  get possibleDirections() { // @ts-ignore
    return ['right', 'down', 'left', 'up'].filter((direction) => direction !== this.direction);
  }

  start() {
    const directionIntentSubscription = interval(1000).subscribe(() => {
      const directionIntent = this.possibleDirections[randomNumber(0, 2)];
      this.changeDirectionIntent(directionIntent);
    });
    this.intervalSubscriptions.push(directionIntentSubscription);

    const refreshSubscription = interval(REFRESH_RATE).subscribe(() => this.move());
    this.intervalSubscriptions.push(refreshSubscription);
  }

  /**
   * @returns {HTMLImageElement}
   */
  getSprite() { // eslint-disable-line class-methods-use-this
    return ghost;
  }
}
