// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Active nav link detection
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});

// Header shadow on scroll
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// Scroll-reveal with Intersection Observer
const reveals = document.querySelectorAll('.reveal');
if (reveals.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
}

// Video carousel (only on pages with the carousel)
const videoIds = ['n7js3zw57w', '7dxxn8insi'];
let currentIndex = 0;

function updateVideo() {
  const player = document.getElementById('wistia_player');
  if (!player) return;
  player.src = 'https://fast.wistia.net/embed/iframe/' + videoIds[currentIndex] + '?seo=true&videoFoam=false';
  updateDots();
}

function updateDots() {
  document.querySelectorAll('.video-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function prevVideo() {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : videoIds.length - 1;
  updateVideo();
}

function nextVideo() {
  currentIndex = (currentIndex < videoIds.length - 1) ? currentIndex + 1 : 0;
  updateVideo();
}

// Initialize dots on load
document.addEventListener('DOMContentLoaded', updateDots);

// Tournament overlay dismiss
const overlayDismiss = document.getElementById('overlayDismiss');
const tournamentOverlay = document.getElementById('tournamentOverlay');
if (overlayDismiss && tournamentOverlay) {
  overlayDismiss.addEventListener('click', () => {
    tournamentOverlay.classList.add('dismissed');
  });
}
