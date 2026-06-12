const consentCheckbox = document.querySelector('#consent');
const startButton = document.querySelector('#start-button');

if (consentCheckbox && startButton) {
  const updateStartButton = () => {
    startButton.disabled = !consentCheckbox.checked;
  };

  consentCheckbox.addEventListener('change', updateStartButton);
  updateStartButton();
}
