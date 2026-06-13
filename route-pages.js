const routePasswords = {
  'staff-auth-form': {
    expected: 'YRZ-2060-0422',
    success: '/yorozuya/archive/',
    ok: '社員番号を確認しました。社員用記録へ移動します。',
    ng: '社員番号が一致しません。指示書の番号を確認してください。',
  },
  'log-azuma-form': {
    expected: '1885',
    success: '/archive/log-azuma/#record-open',
    ok: '認証しました。東家メイドログを表示します。',
    ng: 'パスワードが一致しません。東建設の創業年を確認してください。',
  },
  'log-nishi-form': {
    expected: '1990',
    success: '/archive/log-nishi/#record-open',
    ok: '認証しました。仁士家メイドログを表示します。',
    ng: 'パスワードが一致しません。ウェストテレビの設立年を確認してください。',
  },
  'letters-form': {
    expected: '20380822',
    success: '/archive/letters/#record-open',
    ok: '認証しました。手紙記録を表示します。',
    ng: 'パスワードが一致しません。鏡花の没日を確認してください。',
  },
};

Object.entries(routePasswords).forEach(([formId, config]) => {
  const form = document.getElementById(formId);
  if (!form) return;
  const input = form.querySelector('input');
  const message = form.querySelector('.auth-message');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value.trim() === config.expected) {
      if (message) message.textContent = config.ok;
      window.location.href = config.success;
    } else if (message) {
      message.textContent = config.ng;
    }
  });
});

const completionForm = document.getElementById('completion-form');
if (completionForm) {
  const message = completionForm.querySelector('.auth-message');
  completionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (message) message.textContent = '達成書の下書きを保存しました。これは物語内の架空処理です。';
  });
}
