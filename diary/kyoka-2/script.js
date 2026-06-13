const pageRoot = document.querySelector('[data-password]');
const STORAGE_KEY = 'kyoka-2-diary-unlocked';
const EXPECTED_PASSWORD = '20250822';

if (pageRoot) {
  const expectedPassword = EXPECTED_PASSWORD || pageRoot.dataset.password || '';
  const form = document.querySelector('#kyoka-2-auth-form');
  const input = document.querySelector('#kyoka-2-password');
  const message = form ? form.querySelector('.auth-message') : null;
  const protectedBlocks = pageRoot.querySelectorAll('[data-protected-content]');

  const setOpenState = (isOpen) => {
    protectedBlocks.forEach((block) => {
      block.hidden = !isOpen;
    });
  };

  const openDiary = (shouldScroll = false) => {
    setOpenState(true);
    if (message) message.textContent = '認証しました。記録を表示します。';
    if (shouldScroll) {
      const firstBlock = protectedBlocks[0];
      if (firstBlock) firstBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const closeDiary = () => setOpenState(false);

  if (window.localStorage.getItem(STORAGE_KEY) === 'true') {
    openDiary(false);
  } else {
    closeDiary();
  }

  if (form && input) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (input.value.trim() === expectedPassword) {
        window.localStorage.setItem(STORAGE_KEY, 'true');
        openDiary(true);
        return;
      }

      window.localStorage.removeItem(STORAGE_KEY);
      closeDiary();
      if (message) message.textContent = '日付が違います。もう一度、家族が始まった日を確認してください。';
    });
  }
}
