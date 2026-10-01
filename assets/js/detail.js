/* ============================================================
   DETAIL — read ?id= from the URL and render one template
   ============================================================ */

(function () {
  'use strict';

  var main = document.getElementById('main');

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function initials(name) {
    return escapeHtml((name || '?').trim().charAt(0).toUpperCase());
  }

  function notFound() {
    document.title = 'Not found — Atlas';
    main.innerHTML =
      '<div class="container notfound">' +
        '<h2>Template not found</h2>' +
        '<p>That template doesn\'t exist, or the link is broken.</p>' +
        '<a href="/" class="btn btn--primary">Back to all templates</a>' +
      '</div>';
  }

  function render(t) {
    document.title = t.name + ' — Atlas';
    main.innerHTML =
      '<div class="container detail">' +
        '<div class="detail__bar">' +
          '<a href="/" class="back">← All templates</a>' +
          '<div>' +
            '<div class="detail__title">' + escapeHtml(t.name) + '</div>' +
          '</div>' +
          '<div class="detail__actions">' +
            '<a href="' + escapeHtml(t.url) + '" target="_blank" rel="noopener" class="btn btn--primary">Live preview ↗</a>' +
          '</div>' +
        '</div>' +
        '<img class="shot" src="' + escapeHtml(t.full || t.preview) + '" alt="' + escapeHtml(t.name) + ' full preview">' +
      '</div>';
  }

  var id = new URLSearchParams(location.search).get('id');

  fetch('assets/data/templates.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var list = (data && data.templates) || [];
      var t = list.filter(function (x) { return x.id === id; })[0];
      if (t) render(t); else notFound();
    })
    .catch(notFound);
})();
