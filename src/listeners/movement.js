import {
  fromEvent, map, filter, distinctUntilChanged,
} from 'rxjs';

/**
 * @typedef {import('../pacman.js').PacMan} PacMan
 */

/**
 * @typedef {'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'a' | 's' | 'd' | 'w'} Key
 */

const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
const letterKeys = ['a', 's', 'd', 'w'];

/**
 *
 * @param {Key} key
 * @returns {'right' | 'down' | 'left' | 'up'}
 */
const keyToDirection = (key) => {
  if (key === 'ArrowRight' || key === 'd') {
    return 'right';
  }
  if (key === 'ArrowDown' || key === 's') {
    return 'down';
  }
  if (key === 'ArrowLeft' || key === 'a') {
    return 'left';
  }
  if (key === 'ArrowUp' || key === 'w') {
    return 'up';
  }
  return 'right';
};

/**
 * @param {PacMan} pacman
 * @param {'arrows' | 'letters'} movementType
 */
export const setupMovementListener = (pacman, movementType = 'arrows') => {
  const allowedKeys = movementType === 'arrows' ? arrowKeys : letterKeys;

  const keyDowns = fromEvent(document, 'keydown');
  const keyPresses = keyDowns.pipe(
    filter(
      /** @param {KeyboardEvent} event */
      (event) => allowedKeys.includes(event.key),
    ),
    map((event) => event.key),
    distinctUntilChanged((x, y) => x === y),
  );

  keyPresses.subscribe(
    /** @param {Key} key */
    (key) => {
      pacman.changeDirectionIntent(keyToDirection(key));
    },
  );
};
