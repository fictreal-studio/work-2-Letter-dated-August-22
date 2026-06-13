const CORRECT_EMPLOYEE_CODE = 'YRZ-2060-0422';
const ARCHIVE_URL = '../archive/';
const ERROR_MESSAGE = '社員番号を確認できませんでした。配属時の指示書をご確認ください。';

const authForm = document.querySelector('#staff-auth-form');
const employeeCodeInput = document.querySelector('#employee-code');
const authMessage = document.querySelector('#auth-message');

if (authForm && employeeCodeInput && authMessage) {
  authForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = employeeCodeInput.value.trim();

    if (inputValue === CORRECT_EMPLOYEE_CODE) {
      window.location.href = ARCHIVE_URL;
      return;
    }

    authMessage.textContent = ERROR_MESSAGE;
    authMessage.classList.add('is-error');
  });
}
