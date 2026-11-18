const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  const closeNav = () => { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Открыть меню'); nav.classList.remove('is-open'); document.body.classList.remove('nav-open'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
}
const filters = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.food-card')];
filters.forEach(button => button.addEventListener('click', () => {
  const kind = button.dataset.filter;
  filters.forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
  cards.forEach(card => { card.hidden = kind !== 'all' && !card.dataset.category.split(' ').includes(kind); });
}));
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
  }, { threshold: .09, rootMargin: '0px 0px 30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => { el.classList.add('has-reveal'); observer.observe(el); });
}
