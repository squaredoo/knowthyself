/* ==========================================================================
   Know Thyself core – shared by every page.
   - Content registry: SQ.register(key, lang, data)
   - Language: Arabic (default), English, Danish. Remembered across pages,
     and can be forced with ?lang=da in a link.
   - Theme: dark (default) / light, remembered.
   - Helpers: top bar, toast, clipboard, rich-content renderer for
     paragraphs, lists and Quran/hadith quotes.
   ========================================================================== */
(function () {
  'use strict';

  var SQ = (window.SQ = window.SQ || {});

  SQ.SITE = 'https://knowthyself.vercel.app';
  SQ.GA_ID = 'G-MFBM0K072V';
  SQ.LANGS = [
    { code: 'ar', label: 'العربية', short: 'ع', dir: 'rtl', locale: 'ar-u-nu-latn' },
    { code: 'en', label: 'English', short: 'EN', dir: 'ltr', locale: 'en-GB' },
    { code: 'da', label: 'Dansk', short: 'DA', dir: 'ltr', locale: 'da-DK' }
  ];

  /* ---------- storage (never throws) ---------- */
  SQ.store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  /* ---------- content registry ---------- */
  SQ.data = SQ.data || {};
  SQ.register = function (key, lang, obj) {
    (SQ.data[key] = SQ.data[key] || {})[lang] = obj;
  };
  /** Content for `key` in the current language, falling back to Arabic. */
  SQ.content = function (key) {
    var d = SQ.data[key] || {};
    return d[SQ.lang] || d.ar || {};
  };

  /* ---------- language ---------- */
  function langInfo(code) {
    for (var i = 0; i < SQ.LANGS.length; i++) if (SQ.LANGS[i].code === code) return SQ.LANGS[i];
    return null;
  }
  SQ.langInfo = function () { return langInfo(SQ.lang) || SQ.LANGS[0]; };

  (function initialLang() {
    var fromUrl = null;
    try { fromUrl = new URLSearchParams(location.search).get('lang'); } catch (e) {}
    if (fromUrl && langInfo(fromUrl)) { SQ.store.set('sq_lang', fromUrl); SQ.lang = fromUrl; return; }
    var saved = SQ.store.get('sq_lang');
    SQ.lang = saved && langInfo(saved) ? saved : 'ar';
  })();

  function applyDocLang() {
    var info = SQ.langInfo();
    document.documentElement.lang = info.code;
    document.documentElement.dir = info.dir;
  }
  applyDocLang();

  SQ.setLang = function (code) {
    if (!langInfo(code) || code === SQ.lang) return;
    SQ.lang = code;
    SQ.store.set('sq_lang', code);
    applyDocLang();
    updateSwitcher();
    document.dispatchEvent(new CustomEvent('sq:lang', { detail: { lang: code } }));
  };

  /** UI string lookup: SQ.t('next'), SQ.t('stepOf', 2, 6). Falls back to Arabic. */
  SQ.t = function (k) {
    var ui = SQ.data.ui || {};
    var pack = ui[SQ.lang] || ui.ar || {};
    // A page can override shared wording, e.g. feminine Arabic on the wife/mother quizzes.
    var page = SQ.pageKey && SQ.data[SQ.pageKey] && SQ.data[SQ.pageKey][SQ.lang];
    var v = page && page.ui && page.ui[k] !== undefined ? page.ui[k] : pack[k];
    if (v === undefined && ui.ar) v = ui.ar[k];
    if (typeof v === 'function') return v.apply(null, Array.prototype.slice.call(arguments, 1));
    return v === undefined ? k : v;
  };

  /** Percentage formatting per language ("60%" / "60 %"). */
  SQ.pct = function (n) {
    var v = Math.round(n);
    return SQ.lang === 'da' ? v + ' %' : v + '%';
  };

  SQ.date = function (d) {
    try { return (d || new Date()).toLocaleString(SQ.langInfo().locale); } catch (e) { return String(d || new Date()); }
  };

  /* ---------- theme ---------- */
  SQ.theme = SQ.store.get('sq_theme') === 'light' ? 'light' : 'dark';
  function applyTheme() {
    if (SQ.theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    var b = document.getElementById('themeBtn');
    if (b) {
      b.textContent = SQ.theme === 'light' ? '🌙' : '☀️';
      b.setAttribute('aria-label', SQ.t(SQ.theme === 'light' ? 'themeDark' : 'themeLight'));
      b.title = b.getAttribute('aria-label');
    }
  }
  applyTheme();
  SQ.toggleTheme = function () {
    SQ.theme = SQ.theme === 'light' ? 'dark' : 'light';
    SQ.store.set('sq_theme', SQ.theme);
    applyTheme();
  };

  /* ---------- escaping & rich content ---------- */
  SQ.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  /**
   * Quote block for Quran verses and hadith.
   *  { ar: 'Arabic original', meaning: 'translation', src: 'source', noAr: true }
   * In Arabic mode the Arabic text is shown. In English/Danish the Arabic
   * original is kept and the translated meaning is shown under it
   * (unless noAr is set, e.g. for plain sermon quotes).
   */
  SQ.quote = function (q, kind) {
    if (!q) return '';
    var cls = kind === 'verse' || q.verse ? 'verse' : 'quote';
    var isAr = SQ.lang === 'ar';
    var html = '<blockquote class="' + cls + '">';
    if (q.ar && (isAr || !q.noAr)) html += '<div class="ar" lang="ar" dir="rtl">' + q.ar + '</div>';
    if (!isAr && q.meaning) html += '<div class="meaning">' + q.meaning + '</div>';
    if (q.src) html += '<cite class="src">' + q.src + '</cite>';
    return html + '</blockquote>';
  };

  /**
   * Renders content written in the data files:
   *  - "text"             → <p>text</p>   (strings starting with "<" are used as HTML)
   *  - [a, b, c]          → each part in order
   *  - {ar, meaning, src} → quote block ({verse: {...}} for a Quran verse)
   *  - {list: [...]}      → bullet list
   *  - {html: "..."}      → raw HTML
   */
  SQ.rich = function (x) {
    if (x == null || x === '') return '';
    if (Array.isArray(x)) return x.map(SQ.rich).join('');
    if (typeof x === 'string') return /^\s*</.test(x) ? x : '<p>' + x + '</p>';
    if (typeof x === 'object') {
      if (x.verse) return SQ.quote(x.verse, 'verse');
      if (x.list) return '<ul class="list">' + x.list.map(function (li) { return '<li>' + li + '</li>'; }).join('') + '</ul>';
      if (x.html) return x.html;
      if (x.ar || x.meaning) return SQ.quote(x);
    }
    return '';
  };

  /* ---------- toast & clipboard ---------- */
  var toastTimer;
  SQ.toast = function (msg) {
    var el = document.getElementById('toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
  };

  SQ.copy = function (text, okMsg) {
    var done = function () { SQ.toast(okMsg || SQ.t('copied')); };
    var fallback = function () {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { SQ.toast('❌'); }
      ta.remove();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else fallback();
  };

  /* ---------- top bar ---------- */
  function updateSwitcher() {
    var btns = document.querySelectorAll('.lang-switch button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-lang') === SQ.lang ? 'true' : 'false');
    }
    var brand = document.querySelector('.brand span');
    if (brand) brand.textContent = SQ.t('siteName');
    var brandLink = document.querySelector('.brand');
    if (brandLink) brandLink.setAttribute('aria-label', SQ.t('home'));
    var sw = document.querySelector('.lang-switch');
    if (sw) sw.setAttribute('aria-label', SQ.t('language'));
    applyTheme();
  }

  SQ.topbar = function () {
    if (document.querySelector('.topbar')) return;
    var bar = document.createElement('header');
    bar.className = 'topbar';
    var langs = SQ.LANGS.map(function (l) {
      return '<button type="button" data-lang="' + l.code + '" lang="' + l.code + '" aria-pressed="false" title="' + l.label + '">' +
        (l.code === 'ar' ? 'عربي' : l.label) + '</button>';
    }).join('');
    bar.innerHTML =
      '<a class="brand" href="/"><img src="/apple-touch-icon-180x180.png" alt="" width="30" height="30"><span></span></a>' +
      '<div class="topbar-actions">' +
      '<div class="lang-switch" role="group">' + langs + '</div>' +
      '<button type="button" class="icon-btn" id="themeBtn"></button>' +
      '</div>';
    document.body.insertBefore(bar, document.body.firstChild);
    bar.querySelector('.lang-switch').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-lang]');
      if (b) SQ.setLang(b.getAttribute('data-lang'));
    });
    bar.querySelector('#themeBtn').addEventListener('click', SQ.toggleTheme);
    updateSwitcher();
  };

  /** Updates <title> and meta description for the current language. */
  SQ.setMeta = function (title, desc) {
    if (title) document.title = title;
    var m = document.querySelector('meta[name="description"]');
    if (m && desc) m.setAttribute('content', desc);
  };

  /* ---------- analytics (page views only, never answers) ---------- */
  SQ.analytics = function () {
    if (!SQ.GA_ID || /^(localhost|127\.)/.test(location.hostname)) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', SQ.GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + SQ.GA_ID;
    document.head.appendChild(s);
  };

  // Deferred scripts run while readyState is already "interactive" but before
  // DOMContentLoaded, so readyState alone can't tell whether every script
  // (content files included) has run. core.js is the first script on every
  // page, so it can record the event itself.
  var domReady = document.readyState === 'complete';
  document.addEventListener('DOMContentLoaded', function () { domReady = true; });
  SQ.ready = function (fn) {
    if (domReady) fn();
    else document.addEventListener('DOMContentLoaded', fn);
  };

  SQ.ready(function () {
    SQ.topbar();
    SQ.analytics();
  });
})();
