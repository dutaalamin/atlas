/* ============================================================
   MAIN | theme toggle, scroll reveal, small niceties
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Theme ---------- */
  var root = document.documentElement;
  var STORE = 'lumen-theme';
  var saved = null;
  try { saved = localStorage.getItem(STORE); } catch (e) {}
  if (saved) root.setAttribute('data-theme', saved);

  function currentTheme() { return root.getAttribute('data-theme') || 'dark'; }

  document.querySelectorAll('[data-theme-toggle], #themeToggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var order = ['dark', 'light', 'cool'];
      var next = order[(order.indexOf(currentTheme()) + 1) % order.length];
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(STORE, next); } catch (e) {}
      btn.setAttribute('aria-label', 'Theme: ' + next);
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealables = document.querySelectorAll('[data-reveal]');
  if (revealables.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
      revealables.forEach(function (el, i) {
        el.style.transitionDelay = (Math.min(i, 6) * 40) + 'ms';
        io.observe(el);
      });
    } else {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
    }
  }

  /* ---------- Year in footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
