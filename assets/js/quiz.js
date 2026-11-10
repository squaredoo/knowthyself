/* ==========================================================================
   Squaredoo quiz engine – one engine for every assessment.

   A quiz page is a small HTML shell with <body data-quiz="husband"> that loads:
     /content/<quiz>/quiz.js   – structure (axes, pillars, accent colour, video)
     /content/<quiz>/ar.js, en.js, da.js – all text in each language
   Everything else is rendered here.

   Scoring (same for every quiz): an answer of 1..5 is worth 0, 25, 50, 75,
   100 %. Area, aspect and overall scores are the average of their answers.
   Levels: ≥80 excellent, ≥60 good (goal), ≥40 needs work, below 40 serious.
   ========================================================================== */
(function () {
  'use strict';
  var SQ = window.SQ;
  var cfg = null;        // structure from quiz.js
  var key = null;        // quiz key, e.g. "husband"
  var pages = [];        // ['intro', 'axis:a1', ..., 'results', 'advice', 'promise']
  var state = { answers: {}, promise: '', page: 0 };
  var results = null;

  SQ.defineQuiz = function (c) {
    // Normalise questions: [['a1','safety'], ...] or {a1: 5, a2: 5}
    var qs = [];
    if (Array.isArray(c.questions)) {
      c.questions.forEach(function (q) { qs.push({ axis: q[0], pillar: q[1] || null }); });
    } else {
      c.axes.forEach(function (a) {
        for (var i = 0; i < c.questions[a.key]; i++) qs.push({ axis: a.key, pillar: null });
      });
    }
    qs.forEach(function (q, i) { q.id = i + 1; });
    c.qs = qs;
    c.hasPillars = qs.some(function (q) { return q.pillar; });
    c.units = c.hasPillars
      ? qs.reduce(function (acc, q) { if (acc.indexOf(q.pillar) < 0) acc.push(q.pillar); return acc; }, [])
      : c.axes.map(function (a) { return a.key; });
    c.target = c.target || 60;
    SQ.quizConfig = c;
  };

  /* ---------- helpers ---------- */
  var esc = function (s) { return SQ.esc(s); };
  var t = SQ.t;
  function C() { return SQ.content(key); }
  function L(i) { return i >= 80 ? 0 : i >= 60 ? 1 : i >= 40 ? 2 : 3; }  // level index
  var LVL_CLASS = ['ok', 'mid', 'low', 'bad'];
  var LVL_COLOR = ['var(--ok)', 'var(--mid)', 'var(--low)', 'var(--bad)'];
  function axisIndex(k) { for (var i = 0; i < cfg.axes.length; i++) if (cfg.axes[i].key === k) return i; return -1; }
  function qText(q) { var c = C(); return (c.questions && c.questions[q.id - 1]) || SQ.data[key].ar.questions[q.id - 1]; }
  function axisTitle(k) { var a = (C().axes || {})[k] || {}; return a.title || k; }
  function pillarName(p) { var x = (C().pillars || {})[p] || {}; return x.name || p; }
  function unitName(u) { return cfg.hasPillars ? pillarName(u) : axisTitle(u); }
  function unitQuestions(u) {
    return cfg.qs.filter(function (q) { return cfg.hasPillars ? q.pillar === u : q.axis === u; });
  }
  function score(list) {
    var vals = list.map(function (q) { return state.answers[q.id]; }).filter(Boolean);
    if (!vals.length) return 0;
    return vals.reduce(function (s, v) { return s + (v - 1) * 25; }, 0) / vals.length;
  }
  function firstMissing(list) {
    for (var i = 0; i < list.length; i++) if (!state.answers[list[i].id]) return list[i];
    return null;
  }

  /* ---------- scoring ---------- */
  function compute() {
    var r = { total: score(cfg.qs), axes: {}, units: {} };
    cfg.axes.forEach(function (a) { r.axes[a.key] = score(cfg.qs.filter(function (q) { return q.axis === a.key; })); });
    cfg.units.forEach(function (u) { r.units[u] = score(unitQuestions(u)); });
    return r;
  }

  /* ---------- rendering ---------- */
  function stepper(i) {
    var n = pages.length;
    var shown = Math.min(i + 1, n);
    return '<div class="stepper" aria-hidden="true"><div class="bar"><i style="width:' + Math.round((shown / n) * 100) + '%"></i></div>' +
      '<div class="label"><span>' + esc(t('stepOf', shown, n)) + '</span><span>' + esc(SQ.pct((shown / n) * 100)) + '</span></div></div>';
  }

  function renderIntro() {
    var c = C(), intro = c.intro || {};
    var h = stepper(0);
    h += '<div class="big-icon" aria-hidden="true">' + (cfg.icon || '') + '</div>';
    h += '<h1>' + (intro.title || '') + '</h1>';
    if (intro.subtitle) h += '<p class="subtitle">' + intro.subtitle + '</p>';
    if (intro.verse) h += SQ.quote(intro.verse, 'verse');
    if (intro.body) h += '<div class="card">' + SQ.rich(intro.body) + '</div>';
    if (cfg.video) {
      h += '<a class="video-card" href="https://www.youtube.com/watch?v=' + cfg.video + '" target="_blank" rel="noopener">' +
        '<span class="thumb"><img loading="lazy" alt="" src="https://i.ytimg.com/vi/' + cfg.video + '/hqdefault.jpg">' +
        '<span class="play"><span>▶</span></span></span>' +
        '<span><strong>🎬 ' + esc(t('videoCta')) + '</strong><small>' + esc(t('videoSub')) + ' ↗</small></span></a>';
    }
    if (intro.after) h += SQ.rich(intro.after);
    // axis overview
    h += '<h3 class="center">' + esc(t('axesTitle')) + '</h3><div class="axis-overview">';
    cfg.axes.forEach(function (a, i) {
      var ax = (c.axes || {})[a.key] || {};
      h += '<div class="axis-item"><div class="axis-num">' + (i + 1) + '</div><div><h3>' + (a.emoji ? a.emoji + ' ' : '') + (ax.title || '') + '</h3>' +
        SQ.rich(ax.desc) + '</div></div>';
    });
    h += '</div>';
    // how to answer
    var scale = t('scale');
    h += '<div class="card callout"><h3>' + esc(t('howToAnswer')) + '</h3><p>' + esc(t('howToAnswerText')) + '</p><div class="scale-legend">' +
      scale.map(function (s, i) { return '<span><b>' + (i + 1) + '</b> = ' + esc(s) + '</span>'; }).join('') +
      '</div><p style="margin-top:10px"><strong>' + esc(t('targetNote')) + '</strong> ' + esc(t('honest')) + '</p>' +
      '<p class="muted" style="margin:0">' + esc(t('privacy')) + '</p></div>';
    h += '<div class="btn-row"><button type="button" class="btn primary" data-act="next">' + esc(t('start')) + '</button></div>';
    return h;
  }

  function renderAxis(axisKey, pageIdx) {
    var c = C(), i = axisIndex(axisKey), a = cfg.axes[i], ax = (c.axes || {})[axisKey] || {};
    var list = cfg.qs.filter(function (q) { return q.axis === axisKey; });
    var h = stepper(pageIdx);
    h += '<div class="axis-head"><span class="kicker">' + esc(t('axisN', i + 1)) + '</span><h2>' + (a.emoji ? a.emoji + ' ' : '') + (ax.title || '') + '</h2>';
    if (ax.lead) h += '<p class="center muted">' + ax.lead + '</p>';
    if (ax.quote) h += SQ.quote(ax.quote);
    h += '</div>';
    var lastPillar = null, ends = t('scaleEnds');
    list.forEach(function (q) {
      if (q.pillar && q.pillar !== lastPillar) {
        var p = (c.pillars || {})[q.pillar] || {};
        h += '<div class="pillar-title">' + (p.heading || p.name || q.pillar) + '</div>';
        lastPillar = q.pillar;
      }
      var v = state.answers[q.id];
      h += '<div class="q' + (v ? ' answered' : '') + '" id="q' + q.id + '" role="radiogroup" aria-labelledby="qt' + q.id + '">' +
        '<div class="q-text" id="qt' + q.id + '"><span class="n">' + q.id + '.</span>' + qText(q) + '</div><div class="opts">';
      for (var val = 1; val <= 5; val++) {
        h += '<label class="opt" title="' + esc(t('scale')[val - 1]) + '"><input type="radio" name="q' + q.id + '" value="' + val + '"' +
          (v === val ? ' checked' : '') + ' aria-label="' + val + ' – ' + esc(t('scale')[val - 1]) + '"><span>' + val + '</span></label>';
      }
      h += '</div><div class="opt-ends"><span>' + esc(ends[0]) + '</span><span>' + esc(ends[1]) + '</span></div></div>';
    });
    var done = list.filter(function (q) { return state.answers[q.id]; }).length;
    h += '<p class="counter" data-counter="' + axisKey + '">' + esc(t('answered', done, list.length)) + '</p>';
    var isLast = i === cfg.axes.length - 1;
    h += '<div class="btn-row split"><button type="button" class="btn ghost" data-act="prev">' + esc(t('prev')) + '</button>' +
      (isLast
        ? '<button type="button" class="btn primary" data-act="results">' + esc(t('showResults')) + '</button>'
        : '<button type="button" class="btn primary" data-act="next">' + esc(t('next')) + '</button>') + '</div>';
    return h;
  }

  function band(p) {
    var bands = C().bands || [];
    return bands[L(p)] || {};
  }

  function renderResults(pageIdx) {
    if (!results) return stepper(pageIdx) + '<p class="center muted">' + esc(t('finishFirst')) + '</p>';
    var c = C(), r = results, lv = L(r.total), b = band(r.total);
    var h = stepper(pageIdx) + '<h2>' + esc(t('resultsTitle')) + '</h2>';
    h += '<div class="score-ring" style="--p:' + Math.round(r.total) + ';--c:' + LVL_COLOR[lv] + '"><div class="inner"><div>' +
      '<div class="pct">' + SQ.pct(r.total) + '</div><div class="lbl">' + esc(c.resultLabel || t('overall')) + '</div></div></div></div>';
    h += '<div class="band"><span class="badge lvl-' + LVL_CLASS[lv] + '">' + esc(b.badge || t('levels')[lv]) + '</span>';
    if (b.title) h += '<h3>' + b.title + '</h3>';
    if (b.text) h += SQ.rich(b.text);
    h += '</div><p class="target">' + esc(t('target')) + '</p>';
    h += '<h3 class="center" style="margin-top:18px">' + esc(t('breakdown')) + '</h3>';
    cfg.axes.forEach(function (a) {
      var p = r.axes[a.key], l = L(p);
      h += '<div class="axis-res"><div class="row"><span>' + (a.emoji ? a.emoji + ' ' : '') + axisTitle(a.key) + '</span><span class="lvl-' + LVL_CLASS[l] + '">' + SQ.pct(p) + '</span></div>' +
        '<div class="meter"><i data-w="' + p + '" style="background:' + LVL_COLOR[l] + '"></i></div>';
      if (cfg.hasPillars) {
        var ps = cfg.units.filter(function (u) { return cfg.qs.some(function (q) { return q.pillar === u && q.axis === a.key; }); });
        h += '<div class="pillars">' + ps.map(function (u) {
          return '<div><span>' + pillarName(u) + '</span><b class="lvl-' + LVL_CLASS[L(r.units[u])] + '">' + SQ.pct(r.units[u]) + '</b></div>';
        }).join('') + '</div>';
      }
      h += '</div>';
    });
    if (c.outro) h += '<div class="card center">' + SQ.rich(c.outro) + '</div>';
    h += '<div class="btn-row"><button type="button" class="btn ghost" data-act="copyScores">' + esc(t('copyScores')) + '</button>' +
      '<button type="button" class="btn ghost" data-act="restart">' + esc(t('restart')) + '</button>' +
      '<button type="button" class="btn primary" data-act="next">' + esc(t('toAdvice')) + '</button></div>';
    h += '<p class="disclaimer">' + esc(t('disclaimer')) + '</p>';
    return h;
  }

  function levelKey(p) { return p >= 80 ? 'excellent' : p >= 60 ? 'good' : 'needsWork'; }

  function tipsHTML(tips, title) {
    if (!tips || !tips.length) return '';
    return '<div class="tips-title">' + esc(title || t('practicalTips')) + '</div><ul class="list">' +
      tips.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
  }

  function unitAdvice(u, p) {
    var c = C(), lv = L(p), name = unitName(u);
    var head = function (title) { return '<h4>' + title + ' <span class="lvl-' + LVL_CLASS[lv] + '">(' + SQ.pct(p) + ')</span></h4>'; };
    var fb = c.feedback && c.feedback[u];
    if (fb) {
      var f = fb[levelKey(p)] || fb.needsWork || {};
      return '<div class="tip ' + LVL_CLASS[lv] + '">' + head(f.title || name) + SQ.rich(f.text) + tipsHTML(f.tips) + '</div>';
    }
    var ad = c.advice && c.advice[u];
    if (!ad) return '';
    var body = SQ.rich(ad.body) + tipsHTML(ad.tips, ad.tipsTitle);
    if (p < cfg.target) {
      return '<div class="tip ' + LVL_CLASS[lv] + '">' + head(ad.title || name) + body + '</div>';
    }
    return '<div class="tip ok">' + head('✅ ' + name) + '<p>' + esc(t('strongArea')) + '</p>' +
      '<details><summary>' + esc(t('readMore')) + '</summary>' + (ad.title ? '<h4>' + ad.title + '</h4>' : '') + body + '</details></div>';
  }

  function renderAdvice(pageIdx) {
    if (!results) return stepper(pageIdx) + '<p class="center muted">' + esc(t('finishFirst')) + '</p>';
    var c = C(), r = results, lv = L(r.total);
    var h = stepper(pageIdx) + '<h2>' + esc(t('adviceTitle')) + '</h2>';
    var ov = (c.overall && c.overall[lv]) || band(r.total);
    h += '<div class="tip ' + LVL_CLASS[lv] + '"><h4>' + (ov.title || '') + ' <span class="lvl-' + LVL_CLASS[lv] + '">(' + SQ.pct(r.total) + ')</span></h4>' + SQ.rich(ov.text) + '</div>';
    h += '<h3 class="center" style="margin-top:20px">' + esc(t('personalAdvice')) + '</h3>';
    cfg.units.slice().sort(function (a, b) { return r.units[a] - r.units[b]; }).forEach(function (u) {
      h += unitAdvice(u, r.units[u]);
    });
    h += '<div class="btn-row split"><button type="button" class="btn ghost" data-act="prev">' + esc(t('backToResults')) + '</button>' +
      '<button type="button" class="btn primary" data-act="next">' + esc(t('toPromise')) + '</button></div>';
    return h;
  }

  function suggestions() {
    var c = C(), out = [], seen = {};
    var add = function (s) { var k = String(s || '').replace(/<[^>]+>/g, '').trim(); if (k && !seen[k]) { seen[k] = 1; out.push(k); } };
    ((c.promise && c.promise.suggestions) || []).forEach(add);
    if (results) {
      cfg.units.slice().sort(function (a, b) { return results.units[a] - results.units[b]; }).forEach(function (u) {
        if (results.units[u] >= cfg.target) return;
        var fb = c.feedback && c.feedback[u] && c.feedback[u].needsWork;
        var ad = c.advice && c.advice[u];
        ((fb && fb.tips) || (ad && ad.tips) || []).forEach(add);
      });
    }
    return out.slice(0, 12);
  }

  function renderPromise(pageIdx) {
    var c = C();
    var h = stepper(pageIdx) + '<div class="big-icon" aria-hidden="true">✍️</div><h2>' + esc(t('promiseTitle')) + '</h2>';
    h += '<p class="center">' + ((c.promise && c.promise.intro) || esc(t('promiseIntro'))) + '</p>';
    h += '<label class="sr-only" for="promiseText">' + esc(t('promiseTitle')) + '</label>' +
      '<textarea id="promiseText" placeholder="' + esc(t('promisePlaceholder')) + '">' + esc(state.promise) + '</textarea>';
    var sug = suggestions();
    if (sug.length) {
      h += '<h4 style="margin-top:16px">' + esc(t('suggestionsTitle')) + '</h4><div class="suggestions">' +
        sug.map(function (s) { return '<button type="button" class="suggestion" data-sug="' + esc(s) + '">＋ ' + esc(s) + '</button>'; }).join('') + '</div>';
    }
    h += '<div class="btn-row"><button type="button" class="btn" data-act="copyPromise">' + esc(t('copyPromise')) + '</button></div>';
    h += '<div class="btn-row split"><button type="button" class="btn ghost" data-act="prev">' + esc(t('backToAdvice')) + '</button>' +
      '<button type="button" class="btn primary" data-act="restart">' + esc(t('newAssessment')) + '</button></div>';
    return h;
  }

  function render() {
    var app = document.getElementById('app');
    var c = C();
    SQ.setMeta(c.meta && c.meta.title, c.meta && c.meta.desc);
    var html = '<div class="panel">';
    pages.forEach(function (p, i) {
      var inner = '';
      if (p === 'intro') inner = renderIntro();
      else if (p.indexOf('axis:') === 0) inner = renderAxis(p.slice(5), i);
      else if (p === 'results') inner = renderResults(i);
      else if (p === 'advice') inner = renderAdvice(i);
      else if (p === 'promise') inner = renderPromise(i);
      html += '<section class="page' + (i === state.page ? ' active' : '') + '" data-page="' + i + '">' + inner + '</section>';
    });
    html += '</div>';
    app.innerHTML = html;
    renderTools();
    animateMeters();
  }

  function animateMeters() {
    setTimeout(function () {
      var ms = document.querySelectorAll('.page.active .meter i[data-w]');
      for (var i = 0; i < ms.length; i++) ms[i].style.width = Math.max(2, Number(ms[i].getAttribute('data-w'))) + '%';
    }, 60);
  }

  /* ---------- navigation ---------- */
  function goTo(i, opts) {
    i = Math.max(0, Math.min(pages.length - 1, i));
    var needsRender = pages[i] === 'results' || pages[i] === 'advice' || pages[i] === 'promise';
    state.page = i;
    if (needsRender) render();
    var secs = document.querySelectorAll('#app .page');
    for (var k = 0; k < secs.length; k++) secs[k].classList.toggle('active', k === i);
    animateMeters();
    if (!opts || !opts.noHistory) {
      try { history.pushState({ sqPage: i }, ''); } catch (e) {}
    }
    try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch (e) { window.scrollTo(0, 0); }
  }

  function flagMissing(q) {
    SQ.toast(t('answerQ', q.id));
    var el = document.getElementById('q' + q.id);
    if (el) {
      el.classList.add('missing');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      var first = el.querySelector('input');
      if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 400);
    }
  }

  function validateAxisPage(i) {
    var p = pages[i];
    if (!p || p.indexOf('axis:') !== 0) return true;
    var miss = firstMissing(cfg.qs.filter(function (q) { return q.axis === p.slice(5); }));
    if (miss) { flagMissing(miss); return false; }
    return true;
  }

  function showResults() {
    var miss = firstMissing(cfg.qs);
    if (miss) {
      var idx = pages.indexOf('axis:' + miss.axis);
      if (idx !== state.page) goTo(idx);
      setTimeout(function () { flagMissing(miss); }, 60);
      return;
    }
    results = compute();
    goTo(pages.indexOf('results'));
  }

  function restart() {
    state.answers = {};
    state.promise = '';
    results = null;
    state.page = 0;
    render();
    goTo(0);
  }

  /* ---------- tools menu ---------- */
  function renderTools() {
    var old = document.querySelector('.tools');
    if (old) old.remove();
    var el = document.createElement('div');
    el.className = 'tools no-print';
    el.innerHTML = '<div class="menu" id="toolsMenu" hidden role="menu">' +
      '<button type="button" role="menuitem" data-tool="report">' + esc(t('toolReport')) + '</button>' +
      '<button type="button" role="menuitem" data-tool="print">' + esc(t('toolPrint')) + '</button><hr>' +
      '<button type="button" role="menuitem" data-tool="save">' + esc(t('toolSave')) + '</button>' +
      '<button type="button" role="menuitem" data-tool="load">' + esc(t('toolLoad')) + '</button>' +
      '<button type="button" role="menuitem" data-tool="delete">' + esc(t('toolDelete')) + '</button><hr>' +
      '<button type="button" role="menuitem" data-tool="clear">' + esc(t('toolClear')) + '</button></div>' +
      '<button type="button" class="fab" aria-haspopup="true" aria-expanded="false" aria-controls="toolsMenu" title="' + esc(t('tools')) + '" aria-label="' + esc(t('tools')) + '">⚙️</button>';
    document.body.appendChild(el);
  }

  var SAVE_KEY = function () { return 'sq_save_' + key; };

  function tool(name) {
    if (name === 'report') {
      if (!results) {
        if (firstMissing(cfg.qs)) { SQ.toast(t('finishFirst')); return; }
        results = compute();
      }
      SQ.copy(report(), t('reportCopied'));
    } else if (name === 'print') {
      window.print();
    } else if (name === 'save') {
      var ok = SQ.store.set(SAVE_KEY(), JSON.stringify({ v: 2, answers: state.answers, promise: state.promise, page: state.page, savedAt: new Date().toISOString() }));
      SQ.toast(ok ? t('saved') : '❌');
    } else if (name === 'load') {
      var raw = SQ.store.get(SAVE_KEY());
      if (!raw) { SQ.toast(t('noSave')); return; }
      try {
        var s = JSON.parse(raw);
        state.answers = {};
        Object.keys(s.answers || {}).forEach(function (k) {
          var v = Number(s.answers[k]);
          if (v >= 1 && v <= 5) state.answers[k] = v;
        });
        state.promise = s.promise || '';
        results = firstMissing(cfg.qs) ? null : compute();
        var pg = Number(s.page) || 0;
        if (!results && pg >= pages.indexOf('results')) pg = 0;
        state.page = pg;
        render();
        goTo(pg);
        SQ.toast(t('loaded'));
      } catch (e) { SQ.toast('❌'); }
    } else if (name === 'delete') {
      SQ.store.del(SAVE_KEY());
      SQ.toast(t('deleted'));
    } else if (name === 'clear') {
      if (!window.confirm(t('confirmClear'))) return;
      restart();
      SQ.toast(t('cleared'));
    }
  }

  function report() {
    var c = C(), r = results, lines = [];
    lines.push((c.meta && c.meta.title) || document.title);
    lines.push(SQ.date());
    lines.push('--------------------------------');
    lines.push(t('reportTotal') + ': ' + SQ.pct(r.total) + ' – ' + (band(r.total).badge || t('levels')[L(r.total)]));
    lines.push('');
    lines.push(t('reportAxes') + ':');
    cfg.axes.forEach(function (a) { lines.push('- ' + strip(axisTitle(a.key)) + ': ' + SQ.pct(r.axes[a.key])); });
    if (cfg.hasPillars) {
      lines.push('');
      lines.push(t('reportPillars') + ':');
      cfg.units.forEach(function (u) { lines.push('- ' + strip(pillarName(u)) + ': ' + SQ.pct(r.units[u])); });
    }
    var weakest = cfg.qs.filter(function (q) { return state.answers[q.id] <= 2; })
      .sort(function (a, b) { return state.answers[a.id] - state.answers[b.id]; }).slice(0, 8);
    lines.push('');
    lines.push(t('reportWeakest') + ':');
    if (!weakest.length) lines.push('- ' + t('reportNone'));
    weakest.forEach(function (q) { lines.push('- ' + q.id + '. ' + strip(qText(q)) + ' = ' + state.answers[q.id] + '/5'); });
    lines.push('');
    lines.push(t('reportPromise') + ':');
    lines.push(state.promise.trim() || t('reportNone'));
    lines.push('');
    lines.push(location.origin + location.pathname);
    return lines.join('\n');
  }

  function strip(s) { return String(s || '').replace(/<[^>]+>/g, '').trim(); }

  function scoresText() {
    var r = results, lines = [((C().meta || {}).title || '') + ' – ' + t('myScores'), ''];
    cfg.axes.forEach(function (a) { lines.push(strip(axisTitle(a.key)) + ': ' + SQ.pct(r.axes[a.key])); });
    if (cfg.hasPillars) { lines.push(''); cfg.units.forEach(function (u) { lines.push(strip(pillarName(u)) + ': ' + SQ.pct(r.units[u])); }); }
    lines.push('', t('overall') + ': ' + SQ.pct(r.total));
    return lines.join('\n');
  }

  /* ---------- events ---------- */
  function bind() {
    var app = document.getElementById('app');
    app.addEventListener('change', function (e) {
      var inp = e.target;
      if (inp.type !== 'radio') return;
      var id = Number(inp.name.slice(1));
      state.answers[id] = Number(inp.value);
      results = null; // answers changed → results must be recalculated
      var box = document.getElementById('q' + id);
      if (box) { box.classList.add('answered'); box.classList.remove('missing'); }
      var q = cfg.qs[id - 1];
      var counter = document.querySelector('[data-counter="' + q.axis + '"]');
      if (counter) {
        var list = cfg.qs.filter(function (x) { return x.axis === q.axis; });
        counter.textContent = t('answered', list.filter(function (x) { return state.answers[x.id]; }).length, list.length);
      }
    });
    app.addEventListener('input', function (e) {
      if (e.target.id === 'promiseText') state.promise = e.target.value;
    });
    app.addEventListener('click', function (e) {
      var sug = e.target.closest('[data-sug]');
      if (sug) {
        var ta = document.getElementById('promiseText');
        var s = sug.getAttribute('data-sug');
        ta.value = ta.value.trim() ? ta.value.replace(/\s+$/, '') + '\n' + s : s;
        state.promise = ta.value;
        SQ.toast(t('added'));
        return;
      }
      var b = e.target.closest('[data-act]');
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'next') {
        if (!validateAxisPage(state.page)) return;
        var nxt = state.page + 1;
        if (pages[nxt] === 'results' && !results) { showResults(); return; }
        goTo(nxt);
      } else if (act === 'prev') goTo(state.page - 1);
      else if (act === 'results') showResults();
      else if (act === 'restart') restart();
      else if (act === 'copyScores') SQ.copy(scoresText());
      else if (act === 'copyPromise') {
        if (!state.promise.trim()) SQ.toast(t('writePromiseFirst'));
        else SQ.copy(state.promise);
      }
    });
    document.addEventListener('click', function (e) {
      var tools = document.querySelector('.tools');
      if (!tools) return;
      var menu = tools.querySelector('.menu'), fab = tools.querySelector('.fab');
      if (e.target.closest('.tools .fab')) {
        menu.hidden = !menu.hidden;
        fab.setAttribute('aria-expanded', String(!menu.hidden));
        return;
      }
      var tb = e.target.closest('[data-tool]');
      if (tb) { menu.hidden = true; fab.setAttribute('aria-expanded', 'false'); tool(tb.getAttribute('data-tool')); return; }
      if (!tools.contains(e.target)) { menu.hidden = true; fab.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { var m = document.getElementById('toolsMenu'); if (m) m.hidden = true; }
    });
    // Language switch: re-render everything, keep answers and the current step.
    document.addEventListener('sq:lang', render);
    window.addEventListener('popstate', function (e) {
      var p = e.state && typeof e.state.sqPage === 'number' ? e.state.sqPage : 0;
      if (pages[p] === 'results' || pages[p] === 'advice' || pages[p] === 'promise') { if (!results) p = 0; }
      goTo(p, { noHistory: true });
    });
  }

  SQ.ready(function () {
    key = document.body.getAttribute('data-quiz');
    SQ.pageKey = key;
    cfg = SQ.quizConfig;
    if (!key || !cfg || !SQ.data[key]) return;
    if (cfg.accent) document.body.style.setProperty('--accent', cfg.accent);
    pages = ['intro'].concat(cfg.axes.map(function (a) { return 'axis:' + a.key; }), ['results', 'advice', 'promise']);
    render();
    bind();
    try { history.replaceState({ sqPage: 0 }, ''); } catch (e) {}
  });
})();
