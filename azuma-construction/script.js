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
    if (event.target instanceof HTMLAnchorElement) {
      if (event.target.hash) setCurrentLink(event.target.hash);
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      closeMenu({ restoreFocus: true });
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1088) closeMenu();
  });
}

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  setCurrentLink(`#${visible.target.id}`);
}, { rootMargin: '-30% 0px -60%', threshold: [0, 0.2, 0.6] });

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
