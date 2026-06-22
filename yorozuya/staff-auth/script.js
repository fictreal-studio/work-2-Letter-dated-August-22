const authForm = document.querySelector('#employee-auth-form');
const employeeIdInput = document.querySelector('#employee-id');
const authMessage = document.querySelector('#auth-message');
const submitButton = authForm?.querySelector('button[type="submit"]');

// DEMO ONLY:
// 現在はフロントエンド上の仮判定。
// 本番ではこの処理を削除し、バックエンドAPIで認証・認可を行う。
// TODO: 指示書ページの社員番号が実装されたら、その既存値をここへ設定する。
const DEMO_EMPLOYEE_ID = 'YRZ-2060-0422';

function verifyDemoEmployeeId(employeeId) {
  // TODO: backend APIで社員番号を検証する。
  return Boolean(DEMO_EMPLOYEE_ID) && employeeId === DEMO_EMPLOYEE_ID;
}

function showResult(state, message) {
  authForm.dataset.resultState = state;
  authMessage.textContent = message;
}

authForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const employeeId = employeeIdInput.value.trim();

  if (!employeeId) {
    showResult('error', '社員番号を入力してください。');
    employeeIdInput.focus();
    return;
  }

  if (!verifyDemoEmployeeId(employeeId)) {
    showResult('error', '社員番号が一致しません。指示書を確認してください。');
    employeeIdInput.setAttribute('aria-invalid', 'true');
    employeeIdInput.focus();
    return;
  }

  employeeIdInput.removeAttribute('aria-invalid');
  showResult('success', '認証しました。アーカイブへ接続します。');
  submitButton.disabled = true;
  window.setTimeout(() => {
    window.location.href = '../archive/index.html';
  }, 700);
});

employeeIdInput?.addEventListener('input', () => {
  employeeIdInput.removeAttribute('aria-invalid');
  if (authForm.dataset.resultState === 'error') showResult('idle', '');
});

employeeIdInput?.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  event.preventDefault();
  authForm.requestSubmit();
});
