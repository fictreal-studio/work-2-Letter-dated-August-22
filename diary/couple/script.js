const nextRecordForm = document.querySelector('#next-record-form');

if (nextRecordForm) {
  const input = nextRecordForm.querySelector('#next-record-code');
  const message = nextRecordForm.querySelector('.auth-message');

  nextRecordForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!input) return;

    if (input.value.trim() === '20250822') {
      if (message) message.textContent = '日付を確認しました。鏡花の日記②へ移動します。';
      window.setTimeout(() => {
        window.location.href = '/diary/kyoka-2/';
      }, 360);
      return;
    }

    if (message) message.textContent = '記録と日付をもう一度確認してください。';
  });
}
