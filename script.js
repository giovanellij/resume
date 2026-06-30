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

  // --- Back-to-top / brand links ---
  // #top sits on the sticky header, which is always in view, so a plain anchor
  // jump is a no-op. Scroll the window explicitly instead (CSS scroll-behavior
  // makes it smooth, and auto under prefers-reduced-motion).
  var topLinks = document.querySelectorAll('a[href="#top"]');
  Array.prototype.forEach.call(topLinks, function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0 });
      if (window.history && history.replaceState) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    });
  });

  // --- Footer year ---
  var year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
