const form = document.querySelector('#log-unlock-form');
const input = document.querySelector('#log-password');
const message = document.querySelector('.auth-message');
const lock = document.querySelector('#log-lock');
const content = document.querySelector('#record-open');
const PASSWORD = '1885';

function openLog() {
  if (lock) lock.hidden = true;
  if (content) content.hidden = false;
  sessionStorage.setItem('logAzumaUnlocked', 'true');
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input && input.value.trim() === PASSWORD) {
      if (message) message.textContent = '';
      openLog();
      return;
    }
    if (message) message.textContent = 'パスワードが違います。';
  });
}

if (sessionStorage.getItem('logAzumaUnlocked') === 'true') openLog();
