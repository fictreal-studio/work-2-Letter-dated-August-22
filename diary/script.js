const diaryRoot = document.querySelector('[data-password]');

if (diaryRoot) {
  const expectedPassword = diaryRoot.dataset.password || '';
  const authForm = diaryRoot.querySelector('.auth-form');
  const passwordInput = authForm ? authForm.querySelector('input') : null;
  const authMessage = authForm ? authForm.querySelector('.auth-message') : null;
  const protectedBlocks = diaryRoot.querySelectorAll('[data-protected-content]');

  const setProtectedVisibility = (isOpen) => {
    protectedBlocks.forEach((block) => {
      block.hidden = !isOpen;
    });
  };

  setProtectedVisibility(false);

  if (authForm && passwordInput) {
    authForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const isValid = passwordInput.value.trim() === expectedPassword;

      if (!isValid) {
        setProtectedVisibility(false);
        if (authMessage) authMessage.textContent = 'パスワードが違います。';
        return;
      }

      setProtectedVisibility(true);
      if (authMessage) authMessage.textContent = '認証しました。記録を表示します。';
      const firstProtectedBlock = protectedBlocks[0];
      if (firstProtectedBlock) firstProtectedBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
