const RECORDS = {
  azuma: { password: '1885', url: '/archive/log-azuma' },
  nishi: { password: '1990', url: '/archive/log-nishi' },
  tatsuya: { password: '20010913', url: '/diary/tatsuya' },
  kyokaEarly: { password: '20030527', url: '/diary/kyoka-1' },
  couple: { password: '20240712', url: '/diary/couple' },
  kyokaLate: { password: '20250822', url: '/diary/kyoka-2' },
  letters: { password: '20380822', url: '/archive/letters' },
};

const state = {
  currentRecord: null,
  activeFilter: 'all',
};

const modal = document.querySelector('#record-modal');
const unlockForm = document.querySelector('#record-unlock-form');
const codeInput = document.querySelector('#record-code');
const modalMessage = document.querySelector('#modal-message');
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
    openModal(button.dataset.openRecord);
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
