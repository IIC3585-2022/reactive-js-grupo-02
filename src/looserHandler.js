/**
 * @param {number} looser
 */
export const showLooser = (looser) => {
  const $looserContent = document.getElementById('looser-content');
  const $looserId = document.getElementById('looser-id');

  $looserId.innerText = looser.toString();
  $looserContent.hidden = false;
};

export const resetLooser = () => {
  const $looserContent = document.getElementById('looser-content');
  $looserContent.hidden = true;
};
