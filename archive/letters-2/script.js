const REQUIRED_PASSWORD = '20380822';

const unlockForm = document.querySelector('#unlock-form');
const passwordInput = document.querySelector('#archive-password');
const unlockMessage = document.querySelector('#unlock-message');
const lockView = document.querySelector('#lock-view');
const archiveView = document.querySelector('#archive-view');
const letterCards = document.querySelectorAll('[data-letter-card]');
const closingNote = document.querySelector('#closing-note');
const readLetters = new Set();

function unlockArchive() {
  lockView.hidden = true;
  archiveView.hidden = false;
  archiveView.classList.add('is-unlocked');
  archiveView.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateClosingNote() {
  if (readLetters.size === letterCards.length) {
    closingNote.hidden = false;
  }
}

unlockForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (passwordInput.value.trim() === REQUIRED_PASSWORD) {
    unlockMessage.textContent = '';
    unlockMessage.classList.remove('is-error');
    sessionStorage.setItem('letters2ArchiveUnlocked', 'true');
    unlockArchive();
    return;
  }

  unlockMessage.textContent = 'パスワードが違います。';
  unlockMessage.classList.add('is-error');
});

letterCards.forEach((card) => {
  const openButton = card.querySelector('.envelope-button');
  const paper = card.querySelector('.letter-paper');
  const closeButton = card.querySelector('.close-letter');
  const letterId = card.dataset.letterCard;

  openButton.addEventListener('click', () => {
    const isOpen = !paper.hidden;
    paper.hidden = isOpen;
    openButton.setAttribute('aria-expanded', String(!isOpen));
    card.classList.toggle('is-open', !isOpen);
    if (!isOpen) {
      readLetters.add(letterId);
      card.classList.add('is-read');
      updateClosingNote();
      paper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  closeButton.addEventListener('click', () => {
    paper.hidden = true;
    openButton.setAttribute('aria-expanded', 'false');
    card.classList.remove('is-open');
    openButton.focus();
  });
});

if (sessionStorage.getItem('letters2ArchiveUnlocked') === 'true') {
  unlockArchive();
}
