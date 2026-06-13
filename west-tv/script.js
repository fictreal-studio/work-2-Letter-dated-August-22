const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('#site-nav');
const anchorLinks = document.querySelectorAll('a[href^="#"]');

const setNavOpen = (isOpen) => {
  if (!menuButton || !siteNav) return;
  menuButton.setAttribute('aria-expanded', String(isOpen));
  siteNav.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('nav-open', isOpen);
};

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    setNavOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });
}

anchorLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    setNavOpen(false);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, '', targetId);
  });
});
