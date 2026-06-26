// ===== Routing =====
const routes = ['home','work','about','skills','experience','contact',
  'case-santorio','case-asmara','case-shaer','case-acwapower','case-ewax','case-kidana',
  'case-from-medinah','case-levels'];

function showRoute(route) {
  if (!routes.includes(route)) route = 'home';
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(route);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

  document.querySelectorAll('.nav-links a, .mobile-drawer a').forEach(a => {
    a.classList.toggle('active', a.dataset.route === route);
  });

  triggerReveal();
}

function getRouteFromHash() {
  const hash = window.location.hash.replace('#', '');
  return hash || 'home';
}

window.addEventListener('hashchange', () => showRoute(getRouteFromHash()));

document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-route]');
  if (link) {
    document.getElementById('mobileDrawer').classList.remove('open');
  }
});

// ===== Mobile drawer =====
const burgerBtn = document.getElementById('burgerBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const closeDrawer = document.getElementById('closeDrawer');
if (burgerBtn) burgerBtn.addEventListener('click', () => mobileDrawer.classList.add('open'));
if (closeDrawer) closeDrawer.addEventListener('click', () => mobileDrawer.classList.remove('open'));

// ===== Language toggle =====
const langToggle = document.getElementById('langToggle');
let currentLang = 'ar'; // default Arabic

function applyLang(lang) {
  currentLang = lang;
  document.body.classList.toggle('lang-ar', lang === 'ar');
  document.documentElement.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  langToggle.textContent = lang === 'ar' ? 'English' : 'العربية';

  document.querySelectorAll('[data-en]').forEach(el => {
    const val = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    if (val !== null) el.textContent = val;
  });

  const hero = document.getElementById('heroHeadline');
  if (hero) {
    hero.innerHTML = lang === 'ar'
      ? `أبني علامات تجارية<br><span class='accent-word'>تنمو — استراتيجياً وبصرياً.</span>`
      : "I Build Brands That Grow &mdash;<br><span class='accent-word'>Strategically and Visually.</span>";
  }
}

if (langToggle) {
  langToggle.addEventListener('click', () => applyLang(currentLang === 'en' ? 'ar' : 'en'));
}

// ===== Scroll reveal =====
let revealObserver;
function triggerReveal() {
  const els = document.querySelectorAll('.page-section.active .reveal');
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => revealObserver.observe(el));
}

// ===== Image & video protection =====
document.addEventListener('contextmenu', e => {
  if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
    e.preventDefault();
    return false;
  }
});
document.addEventListener('dragstart', e => {
  if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
    e.preventDefault();
    return false;
  }
});
document.addEventListener('keydown', e => {
  // Block Ctrl/Cmd+S (save page)
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
  }
});

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  showRoute(getRouteFromHash());
  applyLang('ar'); // start in Arabic
});
