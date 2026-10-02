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

  function render(t, colName, colId) {
    document.title = t.name + ' — Atlas';
    var backHref = colId ? ('category?id=' + encodeURIComponent(colId)) : '/';
    var backLabel = colName ? ('← ' + colName) : '← All templates';
    main.innerHTML =
      '<div class="container detail">' +
        '<div class="detail__bar">' +
          '<a href="' + backHref + '" class="back">' + escapeHtml(backLabel) + '</a>' +
          '<div>' +
            '<div class="detail__title">' + escapeHtml(t.name) + '</div>' +
          '</div>' +
          '<div class="detail__actions">' +
            '<div class="viewtoggle" id="viewToggle">' +
              '<button class="on" data-view="live">Live</button>' +
              '<button data-view="shot">Full page</button>' +
            '</div>' +
            '<a href="' + escapeHtml(t.url) + '" target="_blank" rel="noopener" class="btn btn--primary">Open in new tab ↗</a>' +
          '</div>' +
        '</div>' +
        '<div class="live" id="viewLive">' +
          '<div class="live__bar">' +
            '<i></i><i></i><i></i>' +
            '<span class="live__url">' + escapeHtml(t.url) + '</span>' +
            '<span class="live__hint">Interactive — try it</span>' +
          '</div>' +
          '<iframe class="live__frame" src="' + escapeHtml(t.url) + '" title="' + escapeHtml(t.name) + ' live preview" loading="lazy"></iframe>' +
        '</div>' +
        '<img class="shot" id="viewShot" src="' + escapeHtml(t.full || t.preview) + '" alt="' + escapeHtml(t.name) + ' full page" hidden>' +
      '</div>';

    var vt = document.getElementById('viewToggle');
    var live = document.getElementById('viewLive');
    var shot = document.getElementById('viewShot');
    vt.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var v = btn.dataset.view;
      vt.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', b === btn); });
      live.hidden = v !== 'live';
      shot.hidden = v !== 'shot';
      if (v === 'shot') window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var id = new URLSearchParams(location.search).get('id');

  fetch('assets/data/templates.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var list = (data && data.templates) || [];
      var cols = (data && data.collections) || [];
      var t = list.filter(function (x) { return x.id === id; })[0];
      if (!t) { notFound(); return; }
      var col = cols.filter(function (c) { return c.id === t.collection; })[0];
      render(t, col ? col.name : '', t.collection);
    })
    .catch(notFound);
})();
