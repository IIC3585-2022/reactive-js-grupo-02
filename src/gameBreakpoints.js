import { Game } from '@/game';
import { resetLooser } from '@/looserHandler';

export const initialize = () => {
  resetLooser();

  const game = new Game();

  game.startGame();
};

const $resetButton = document.getElementById('reset-button');

$resetButton.addEventListener('click', initialize);
