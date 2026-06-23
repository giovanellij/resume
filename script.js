// Minimal, dependency-free enhancements.
(function () {
  'use strict';

  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var nav = document.querySelector('.nav');

  // --- Dark mode toggle (theme already applied pre-paint in <head>) ---
  function syncToggle() {
    var isDark = root.getAttribute('data-theme') === 'dark';
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
      } else {
        root.setAttribute('data-theme', 'dark');
      }
      try { localStorage.setItem('theme', isDark ? 'light' : 'dark'); } catch (e) {}
      syncToggle();
    });
    syncToggle();
  }

  // --- Subtle border on the sticky nav once scrolled ---
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- Footer year ---
  var year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
