const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.primary-navigation');
const navigationLinks = [...document.querySelectorAll('.primary-navigation a[href^="#"]')];

function setCurrentLink(hash) {
  navigationLinks.forEach((link) => {
    const active = link.hash === hash;
    link.classList.toggle('is-current', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function closeMenu({ restoreFocus = false } = {}) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'メニューを開く');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  if (restoreFocus) menuButton.focus();
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
    navigation.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    if (link.hash) setCurrentLink(link.hash);
    closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      closeMenu({ restoreFocus: true });
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1180) closeMenu();
  });
}

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setCurrentLink(`#${visible.target.id}`);
  }, { rootMargin: '-30% 0px -60%', threshold: [0, 0.2, 0.6] });

  document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
}

const contactForm = document.querySelector('#contact-form');
const contactPreview = document.querySelector('#contact-preview');
const contactPreviewList = document.querySelector('#contact-preview-list');
const contactEdit = document.querySelector('#contact-edit');
const contactStatus = document.querySelector('#contact-status');

function addPreviewRow(term, description) {
  const wrapper = document.createElement('div');
  const dt = document.createElement('dt');
  const dd = document.createElement('dd');
  dt.textContent = term;
  dd.textContent = description;
  wrapper.append(dt, dd);
  contactPreviewList.append(wrapper);
}

if (contactForm && contactPreview && contactPreviewList && contactEdit) {
  // DEMO ONLY:
  // 現在はフロントエンド上の確認表示。入力内容は送信・保存しない。
  // 本番ではこの処理を削除し、バックエンドAPIへ接続する。
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    contactPreviewList.replaceChildren();
    addPreviewRow('お名前', String(formData.get('name') || ''));
    addPreviewRow('ご相談種別', String(formData.get('category') || ''));
    addPreviewRow('ご相談内容', String(formData.get('message') || ''));
    addPreviewRow('連絡先', String(formData.get('contact') || ''));

    // TODO: backend APIへの送信処理と、成功・失敗状態の表示へ置き換える。
    contactForm.dataset.resultState = 'success';
    contactForm.hidden = true;
    contactPreview.hidden = false;
    contactStatus.textContent = '';
    contactPreview.focus({ preventScroll: true });
    contactPreview.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  contactEdit.addEventListener('click', () => {
    contactPreview.hidden = true;
    contactForm.hidden = false;
    contactForm.dataset.resultState = 'idle';
    contactForm.querySelector('input, select, textarea')?.focus();
  });
}
