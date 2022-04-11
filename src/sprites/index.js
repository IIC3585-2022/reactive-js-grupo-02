import { wall } from './wall';
import { pacman0 } from './pacman0';

/**
 * @param {number} value
 * @returns {HTMLImageElement}
 */
export const getSprite = (value) => {
  if (value === 1) {
    return wall;
  } if (value === 4) {
    return pacman0;
  }
  return new Image();
};
