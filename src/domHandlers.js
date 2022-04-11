/**
 * @param {number} looser
 */
export const setupAndShowLooserContent = (looser) => {
  const $looserContent = document.getElementById('looser-content');
  const $looserId = document.getElementById('looser-id');

  $looserId.innerText = looser.toString();
  $looserContent.hidden = false;
};

export const hideLooserContent = () => {
  const $looserContent = document.getElementById('looser-content');
  $looserContent.hidden = true;
};
