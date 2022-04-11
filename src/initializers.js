import { hideLooserContent } from '@/domHandlers';
import { Game } from '@/game';

export const initializeGame = () => {
  hideLooserContent();

  const game = new Game();

  game.startGame();
};
