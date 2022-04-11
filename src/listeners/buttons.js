import { initializeGame } from '@/initializers';

const $resetButton = document.getElementById('reset-button');

$resetButton.addEventListener('click', initializeGame);
