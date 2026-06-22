const RECORDS = {
azuma: { url: '../../archive/log-azuma/' },
nishi: { url: '../../archive/log-nishi/' },
sharedObservation: { password: '20380821', url: '../../archive/azuma-nishi-observation/', hint: 'ヒント：大樹様が一人で東を訪れた日。' },
tatsuya: { password: '20010913', url: '../../diary/tatsuya/', hint: 'ヒント：東家の内部情報に残された、辰也が生まれた日の記録を確認してください。' },
kyokaEarly: { password: '20030527', url: '../../diary/kyoka-1/', hint: 'ヒント：仁士家の内部情報に残された、鏡花が生まれた日の記録を確認してください。' },
movingReport: { password: '20240707', url: '../../archive/completion-report/', hint: 'ヒント：よろずやに依頼があった日。' },
kyokaLate: { password: '20250822', url: '../../diary/kyoka-2/', hint: 'ヒント：二人にとって、家族が一人増えた日の記録を確認してください。' },
letters: { url: '../../archive/letters/' },
firstLetters: { url: '../../archive/letters-2/' },
};

const state = {
  currentRecord: null,
  activeFilter: 'all',
};

const modal = document.querySelector('#record-modal');
const unlockForm = document.querySelector('#record-unlock-form');
const codeInput = document.querySelector('#record-code');
const modalMessage = document.querySelector('#modal-message');
const recordHint = document.querySelector('#record-hint');
const openButtons = document.querySelectorAll('[data-open-record]');
const closeButtons = document.querySelectorAll('[data-close-modal]');
const filterButtons = document.querySelectorAll('[data-filter]');
const searchInput = document.querySelector('#archive-search');
const requestCards = document.querySelectorAll('.request-card');
const emptyState = document.querySelector('.empty-state');
const reportPendingButton = document.querySelector('[data-report-pending]');

const showModalMessage = (text, isOk = false) => {
  if (!modalMessage) return;
  modalMessage.textContent = text;
  modalMessage.classList.toggle('is-ok', isOk);
};

const openModal = (recordKey) => {
  if (!modal || !codeInput) return;
  state.currentRecord = recordKey;
  modal.hidden = false;
  codeInput.value = '';
  showModalMessage('');
  const record = RECORDS[recordKey];
  if (recordHint) recordHint.textContent = record?.hint || 'ヒント：関連記録に残された日付や年を確認してください。';
  requestAnimationFrame(() => codeInput.focus());
};

const closeModal = () => {
  if (!modal) return;
  modal.hidden = true;
  state.currentRecord = null;
  showModalMessage('');
};

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.openRecord;
    const record = RECORDS[key];
    if (record && !record.password) {
      window.location.href = record.url;
    } else {
      openModal(key);
    }
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', closeModal);
});

if (unlockForm) {
  unlockForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const record = RECORDS[state.currentRecord];
    const inputValue = codeInput ? codeInput.value.trim() : '';

    if (record && inputValue === record.password) {
      showModalMessage('認証しました / 記録を開きます', true);
      window.setTimeout(() => {
        window.location.href = record.url;
      }, 420);
      return;
    }

    showModalMessage('該当する記録を確認できません。関連資料をもう一度確認してください。');
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && !modal.hidden) closeModal();
});

const normalizeText = (value) => value.trim().toLowerCase();

const applyFilters = () => {
  const query = normalizeText(searchInput ? searchInput.value : '');
  let visibleCount = 0;

  requestCards.forEach((card) => {
    const tags = card.dataset.tags || '';
    const text = `${tags} ${card.textContent || ''}`.toLowerCase();
    const matchesFilter = state.activeFilter === 'all' || tags.includes(state.activeFilter) || text.includes(state.activeFilter.toLowerCase());
    const matchesQuery = !query || text.includes(query);
    const isVisible = matchesFilter && matchesQuery;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (emptyState) emptyState.hidden = visibleCount !== 0;
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    state.activeFilter = button.dataset.filter || 'all';
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    applyFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', applyFilters);
}

if (reportPendingButton) {
  reportPendingButton.addEventListener('click', () => {
    reportPendingButton.textContent = '必要記録の確認後に作成できます';
    reportPendingButton.disabled = true;
  });
}
