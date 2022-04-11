/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 *
 * @param {number} number
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export const isBetween = (number, min, max) => number >= min && number <= max;
