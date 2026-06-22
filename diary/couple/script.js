const REQUIRED_PASSWORD = '20240712';
const STORAGE_KEY = 'coupleDiaryUnlocked';

const lockPanel = document.querySelector('#record-lock');
const content = document.querySelector('#main-content');
const form = document.querySelector('#record-lock-form');
const input = document.querySelector('#record-password');
const message = document.querySelector('#record-lock-message');

const unlock = () => {
  if (lockPanel) lockPanel.hidden = true;
  if (content) content.hidden = false;
};

if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
  unlock();
}

if (form && input) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value.trim() === REQUIRED_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      if (message) {
        message.textContent = '認証しました。記録を表示します。';
        message.classList.add('is-success');
      }
      unlock();
      return;
    }
    if (message) {
      message.textContent = 'パスワードが違います。';
      message.classList.remove('is-success');
    }
  });
}
