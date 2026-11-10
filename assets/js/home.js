/* Homepage renderer. Card text comes from /content/home/<lang>.js */
(function () {
  'use strict';
  var SQ = window.SQ;
  var ICONS = {
    husband: "<svg aria-hidden=\"true\" class=\"icon\" viewBox=\"0 0 64 64\" fill=\"none\"><path d=\"M20 28c0-8 5-14 12-14s12 6 12 14-5 14-12 14-12-6-12-14Z\" fill=\"rgba(245,242,234,.9)\"></path><path d=\"M10 58c2-11 12-18 22-18s20 7 22 18\" stroke=\"rgba(245,242,234,.9)\" stroke-width=\"4\" stroke-linecap=\"round\"></path><path d=\"M22 18c2 1 6 2 10 2s8-1 10-2\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linecap=\"round\"></path></svg>",
    father: "<svg aria-hidden=\"true\" class=\"icon\" viewBox=\"0 0 64 64\" fill=\"none\" aria-hidden=\"true\"><circle cx=\"24\" cy=\"22\" r=\"8\" fill=\"rgba(245,242,234,.9)\"></circle><path d=\"M18 40c0-6 6-10 12-10s12 4 12 10\" fill=\"rgba(245,242,234,.9)\"></path><circle cx=\"40\" cy=\"20\" r=\"5\" fill=\"rgba(245,242,234,.9)\"></circle><path d=\"M32 36L38 34\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linecap=\"round\"></path></svg>",
    wife: "<svg aria-hidden=\"true\" class=\"icon\" viewBox=\"0 0 64 64\" fill=\"none\"><path d=\"M32 14c6 0 10 5 10 12 0 8-4 14-10 14s-10-6-10-14c0-7 4-12 10-12Z\" fill=\"rgba(245,242,234,.9)\"></path><path d=\"M18 58c0-10 6-18 14-18s14 8 14 18\" stroke=\"rgba(245,242,234,.9)\" stroke-width=\"4\" stroke-linecap=\"round\"></path><path d=\"M20 32c2 7 6 12 12 12s10-5 12-12\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linecap=\"round\"></path><path d=\"M20 26c4-6 8-10 12-10s8 4 12 10\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linecap=\"round\"></path></svg>",
    mother: "<svg aria-hidden=\"true\" class=\"icon\" viewBox=\"0 0 64 64\" fill=\"none\" aria-hidden=\"true\"><circle cx=\"24\" cy=\"22\" r=\"8\" fill=\"rgba(245,242,234,.9)\"></circle><path d=\"M18 40c0-8 6-14 12-14s12 6 12 14\" fill=\"rgba(245,242,234,.9)\"></path><circle cx=\"40\" cy=\"20\" r=\"5\" fill=\"rgba(245,242,234,.9)\"></circle><path d=\"M32 36L38 34\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linecap=\"round\"></path></svg>",
    taghaaful: "<svg aria-hidden=\"true\" class=\"icon\" viewBox=\"0 0 64 64\" fill=\"none\"><path d=\"M32 54s-17-10-23-22c-5-11 3-22 14-20 4 1 7 4 9 7 2-3 5-6 9-7 11-2 19 9 14 20-6 12-23 22-23 22Z\" fill=\"rgba(245,242,234,.9)\"></path><path d=\"M32 54s-17-10-23-22c-5-11 3-22 14-20 4 1 7 4 9 7 2-3 5-6 9-7 11-2 19 9 14 20-6 12-23 22-23 22Z\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linejoin=\"round\"></path></svg>",
    major: "<svg aria-hidden=\"true\" class=\"icon\" viewBox=\"0 0 64 64\" fill=\"none\"><path d=\"M6 26 32 14l26 12-26 12L6 26Z\" fill=\"rgba(245,242,234,.9)\"></path><path d=\"M16 32v10c0 3 8 8 16 8s16-5 16-8V32\" stroke=\"rgba(245,242,234,.9)\" stroke-width=\"4\" stroke-linecap=\"round\"></path><path d=\"M6 26 32 14l26 12-26 12L6 26Z\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linejoin=\"round\"></path><path d=\"M58 27v12\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linecap=\"round\"></path><path d=\"M56 40c2 2 4 2 6 0\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linecap=\"round\"></path></svg>",
    goals: "<svg aria-hidden=\"true\" class=\"icon\" viewBox=\"0 0 64 64\" fill=\"none\"><circle cx=\"32\" cy=\"32\" r=\"20\" fill=\"rgba(245,242,234,.9)\"></circle><circle cx=\"32\" cy=\"32\" r=\"12\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\"></circle><circle cx=\"32\" cy=\"32\" r=\"5\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\"></circle><path d=\"M40 24l18-18\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linecap=\"round\"></path><path d=\"M52 6h6v6\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>",
    marital: "<svg aria-hidden=\"true\" class=\"icon\" viewBox=\"0 0 64 64\" fill=\"none\"><path d=\"M12 16c0-2 2-4 4-4h16c3 0 6 2 6 5v35c-2-2-5-3-8-3H16c-2 0-4-2-4-4V16Z\" fill=\"rgba(245,242,234,.9)\"></path><path d=\"M52 16c0-2-2-4-4-4H32c-3 0-6 2-6 5v35c2-2 5-3 8-3h14c2 0 4-2 4-4V16Z\" fill=\"rgba(245,242,234,.9)\"></path><path d=\"M12 16c0-2 2-4 4-4h16c3 0 6 2 6 5v35c-2-2-5-3-8-3H16c-2 0-4-2-4-4V16Z\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linejoin=\"round\"></path><path d=\"M52 16c0-2-2-4-4-4H32c-3 0-6 2-6 5v35c2-2 5-3 8-3h14c2 0 4-2 4-4V16Z\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linejoin=\"round\"></path><path d=\"M32 12v40\" stroke=\"rgba(47,75,68,.55)\" stroke-width=\"2\"></path></svg>",
    afterlife: "<svg aria-hidden=\"true\" class=\"icon\" viewBox=\"0 0 64 64\" fill=\"none\"><path d=\"M44 12c-2 1-4 3-6 6-6 10-3 23 7 29 2 1 4 2 6 2-5 6-13 10-22 8C20 55 10 43 12 29c2-12 12-20 24-20 3 0 6 1 8 3Z\" fill=\"rgba(245,242,234,.9)\"></path><path d=\"M44 12c-2 1-4 3-6 6-6 10-3 23 7 29 2 1 4 2 6 2-5 6-13 10-22 8C20 55 10 43 12 29c2-12 12-20 24-20 3 0 6 1 8 3Z\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linejoin=\"round\"></path></svg>",
    waseya: "<svg aria-hidden=\"true\" class=\"icon\" viewBox=\"0 0 64 64\" fill=\"none\" aria-hidden=\"true\"><path d=\"M18 10h22l10 10v30c0 4-3 7-7 7H18c-4 0-7-3-7-7V17c0-4 3-7 7-7Z\" fill=\"rgba(245,242,234,.9)\"></path><path d=\"M40 10v12c0 2 2 4 4 4h12\" fill=\"rgba(245,242,234,.9)\"></path><path d=\"M18 10h22l10 10v30c0 4-3 7-7 7H18c-4 0-7-3-7-7V17c0-4 3-7 7-7Z\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linejoin=\"round\"></path><path d=\"M40 10v12c0 2 2 4 4 4h12\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linejoin=\"round\"></path><path d=\"M20 28h20\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linecap=\"round\"></path><path d=\"M20 36h26\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linecap=\"round\"></path><path d=\"M20 44h18\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linecap=\"round\"></path><path d=\"M46 44c0 4-3 7-7 7s-7-3-7-7 3-7 7-7 7 3 7 7Z\" fill=\"rgba(245,242,234,.9)\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\"></path><path d=\"M35 50l-2 8 6-4 6 4-2-8\" fill=\"rgba(245,242,234,.9)\" stroke=\"rgba(47,75,68,.85)\" stroke-width=\"3\" stroke-linejoin=\"round\"></path></svg>"
  };
  var ORDER = ['husband', 'father', 'wife', 'mother', 'taghaaful', 'major', 'goals', 'marital', 'afterlife', 'waseya'];

  function render() {
    var c = SQ.content('home');
    SQ.setMeta(c.meta.title, c.meta.desc);
    var h = '<div class="panel hero">';
    h += '<div class="bismillah" lang="ar" dir="rtl">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</div>';
    h += '<h1>' + c.title + '</h1><p class="subtitle">' + c.subtitle + '</p>';
    h += SQ.quote(c.quote, 'verse');
    h += '<p class="center muted">' + c.note + '</p>';
    h += '<div class="cards">';
    ORDER.forEach(function (k) {
      var card = c.cards[k];
      if (!card) return;
      h += '<article class="home-card"><div class="avatar">' + ICONS[k] + '</div><div><h2>' + card.title + '</h2><p>' + card.desc + '</p>' +
        '<a class="btn" href="/' + k + '">' + card.cta + '</a></div></article>';
    });
    h += '</div>';
    h += '<section class="closing"><div class="closing-line"></div>' + SQ.quote(c.closing, 'verse') +
      '<div class="dua" lang="ar" dir="rtl">' + c.dua + '</div>' + (c.duaMeaning ? '<p class="muted">' + c.duaMeaning + '</p>' : '') +
      '<div class="closing-line"></div></section>';
    h += '<p class="footer">' + c.footer + '<br><button type="button" class="linklike" data-consent-settings>' + SQ.esc(SQ.t('consentSettings')) + '</button></p>';
    h += '</div>';
    document.getElementById('app').innerHTML = h;
  }

  SQ.ready(function () {
    SQ.pageKey = 'home';
    render();
    document.addEventListener('sq:lang', render);
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-consent-settings]')) SQ.resetConsent();
    });
  });
})();
