/* ============================================================
   GALLERY — load templates.json, render clean stacked cards
   ============================================================ */

(function () {
  'use strict';

  var grid = document.getElementById('grid');
  var empty = document.getElementById('empty');
  var countEl = document.getElementById('count');
  var searchEl = document.getElementById('search');
  var filtersEl = document.getElementById('filters');

  var all = [];
  var query = '';

  /* ---------- background grid ---------- */
  var bg = document.getElementById('heroBg');
  if (bg) {
    for (var i = 0; i < 9 * 4; i++) bg.appendChild(document.createElement('i'));
  }

  /* ---------- helpers ---------- */
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function matches(t) {
    if (!query) return true;
    var hay = [t.name, t.category].join(' ').toLowerCase();
    return hay.indexOf(query) !== -1;
  }

  function initials(name) {
    return escapeHtml((name || '?').trim().charAt(0).toUpperCase());
  }

  function tileHTML(t) {
    return '' +
      '<a class="tile" href="template.html?id=' + encodeURIComponent(t.id) + '" aria-label="' + escapeHtml(t.name) + '">' +
        '<div class="tile__shot">' +
          '<img loading="lazy" src="' + escapeHtml(t.preview) + '" alt="' + escapeHtml(t.name) + ' preview">' +
        '</div>' +
        '<div class="tile__meta">' +
          '<span class="tile__mark" style="background:' + escapeHtml(t.accent || '#111') + '">' + initials(t.name) + '</span>' +
          '<div class="tile__text">' +
            '<span class="tile__name">' + escapeHtml(t.name) + '</span>' +
            '<span class="tile__cat">' + escapeHtml(t.category || 'Landing page') + '</span>' +
          '</div>' +
        '</div>' +
      '</a>';
  }

  function render() {
    var list = all.filter(matches);
    grid.innerHTML = list.map(tileHTML).join('');
    empty.hidden = list.length > 0;
    if (countEl) countEl.textContent = list.length + ' template' + (list.length === 1 ? '' : 's');
  }

  /* ---------- events ---------- */
  if (searchEl) {
    searchEl.addEventListener('input', function () {
      query = searchEl.value.trim().toLowerCase();
      render();
    });
  }

  if (filtersEl) {
    filtersEl.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      filtersEl.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      render();
    });
  }

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchEl && searchEl.focus();
    }
  });

  /* ---------- load ---------- */
  fetch('assets/data/templates.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      all = (data && data.templates) || [];
      render();
    })
    .catch(function () {
      grid.innerHTML = '';
      empty.hidden = false;
      empty.querySelector('p').textContent = 'Could not load templates.json — run this folder from a local server.';
    });
})();
