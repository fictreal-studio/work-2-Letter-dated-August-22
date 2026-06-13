const form = document.querySelector('#couple-unlock-form');
const input = document.querySelector('#couple-password');
const message = document.querySelector('#couple-lock .auth-message');
const lock = document.querySelector('#couple-lock');
const content = document.querySelector('[data-protected-content]');
const PASSWORD = '20240712';

function openDiary() {
  if (lock) lock.hidden = true;
  if (content) content.hidden = false;
  sessionStorage.setItem('coupleDiaryUnlocked', 'true');
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input && input.value.trim() === PASSWORD) {
      if (message) message.textContent = '';
      openDiary();
      return;
    }
    if (message) message.textContent = '記録と日付をもう一度確認してください。';
  });
}

if (sessionStorage.getItem('coupleDiaryUnlocked') === 'true') openDiary();
