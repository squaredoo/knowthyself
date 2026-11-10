/* ==========================================================================
   Interactive will (wasiyya) – form, one-third check, drafts and print.
   Structure: /content/waseya/form.js · Text: /content/waseya/<lang>.js
   Nothing is sent anywhere: drafts are downloaded as a JSON file.
   ========================================================================== */
(function () {
  'use strict';
  var SQ = window.SQ;
  var F;                    // form structure
  var vals = {};            // field values by id
  var rows = { debts: [], thirds: [], heirs: [] };
  var esc = function (s) { return SQ.esc(s); };

  function T() { return SQ.content('waseya'); }
  function lbl(id) { var f = T().fields[id] || {}; return f.label || id; }
  function ph(id) { var f = T().fields[id] || {}; return f.ph || ''; }
  function num(x) {
    var v = parseFloat(String(x == null ? '' : x).replace(/\s/g, '').replace(',', '.'));
    return isNaN(v) ? 0 : v;
  }
  function money(n) {
    try { return n.toLocaleString(SQ.langInfo().locale, { maximumFractionDigits: 2 }); } catch (e) { return n.toFixed(2); }
  }
  function sum(table) { return rows[table].reduce(function (s, r) { return s + num(r.amount); }, 0); }
  function isDefaultShahada(v) {
    var d = SQ.data.waseya;
    return !v || Object.keys(d).some(function (l) { return d[l].shahadaDefault && d[l].shahadaDefault.trim() === String(v).trim(); });
  }
  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  /* ---------- form ---------- */
  function field(f) {
    var id = f[0], type = f[1], v = vals[id] || '';
    var h = '<div class="field' + (type === 'textarea' || type === 'shahada' ? ' wide' : '') + '"><label for="' + id + '">' + lbl(id) + '</label>';
    if (type === 'textarea' || type === 'shahada') {
      h += '<textarea id="' + id + '" data-f="' + id + '"' + (type === 'shahada' ? ' rows="10" dir="auto"' : ' rows="3"') + ' placeholder="' + esc(ph(id)) + '">' + esc(v) + '</textarea>';
    } else if (type === 'readonly') {
      h += '<input type="text" id="' + id + '" readonly value="' + esc(v) + '">';
    } else {
      h += '<input type="' + type + '" id="' + id + '" data-f="' + id + '"' + (type === 'number' ? ' inputmode="decimal" min="0" step="any"' : '') +
        (type === 'email' || type === 'tel' ? ' dir="ltr"' : '') + ' value="' + esc(v) + '" placeholder="' + esc(ph(id)) + '">';
    }
    var hint = (T().fields[id] || {}).hint;
    if (hint) h += '<small class="muted">' + hint + '</small>';
    return h + '</div>';
  }

  function table(name) {
    var t = T(), tt = t.tables[name], cols = F.tables[name];
    var h = '<div class="table-actions no-print"><button type="button" class="btn small" data-add="' + name + '">' + esc(tt.add) + '</button>' +
      '<button type="button" class="btn small ghost" data-clear="' + name + '">' + esc(t.clearTable) + '</button></div>';
    h += '<div class="table-wrap"><table class="w-table"><thead><tr>' + tt.cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') +
      '<th class="no-print"><span class="sr-only">' + esc(t.del) + '</span></th></tr></thead><tbody>';
    if (!rows[name].length) h += '<tr class="empty"><td colspan="' + (cols.length + 1) + '">' + esc(t.emptyTable) + '</td></tr>';
    rows[name].forEach(function (r, i) {
      h += '<tr>' + cols.map(function (c, ci) {
        var lab = esc(tt.cols[ci]);
        if (c === 'notes') return '<td><textarea rows="2" aria-label="' + lab + '" data-t="' + name + '" data-r="' + i + '" data-c="' + c + '">' + esc(r[c] || '') + '</textarea></td>';
        return '<td><input aria-label="' + lab + '" type="' + (c === 'amount' ? 'number' : 'text') + '"' + (c === 'amount' ? ' inputmode="decimal" min="0" step="any" placeholder="0"' : '') +
          ' data-t="' + name + '" data-r="' + i + '" data-c="' + c + '" value="' + esc(r[c] || '') + '"></td>';
      }).join('') + '<td class="no-print"><button type="button" class="btn small ghost" data-del="' + name + '" data-r="' + i + '" aria-label="' + esc(t.del) + '">✕</button></td></tr>';
    });
    return h + '</tbody></table></div>';
  }

  function thirdCheck() {
    var t = T(), est = num(vals.estate_total);
    if (!vals.estate_total) return '<p class="muted small" id="thirdCheck">' + t.third.needEstate + '</p>';
    var debts = sum('debts'), oblig = num(vals.obligations_total), total = sum('thirds');
    var base = Math.max(0, est - debts - oblig), limit = base / 3;
    var basis = t.third.basis(money(est), money(debts), money(oblig), money(limit));
    if (total > limit + 1e-9) return '<div class="card callout warn" id="thirdCheck"><strong>⚠️ ' + t.third.over(money(total), money(limit)) + '</strong><br><small>' + basis + '</small></div>';
    return '<div class="card callout" id="thirdCheck"><strong>✅ ' + t.third.ok(money(total), money(limit)) + '</strong><br><small>' + basis + '</small></div>';
  }

  function renderForm() {
    var t = T();
    var h = '<header class="panel w-head no-print"><div class="big-icon" aria-hidden="true">📜</div><h1>' + t.title + '</h1>' +
      '<p class="center">' + t.intro + '</p>' +
      '<div class="btn-row"><button type="button" class="btn primary" data-act="print">' + esc(t.actions.print) + '</button>' +
      '<button type="button" class="btn" data-act="save">' + esc(t.actions.save) + '</button>' +
      '<label class="btn">' + esc(t.actions.load) + '<input type="file" id="fileLoad" accept="application/json,.json" hidden></label>' +
      '<button type="button" class="btn ghost" data-act="reset">' + esc(t.actions.reset) + '</button></div>' +
      '<p class="muted center small">' + t.privacy + '</p></header>';

    h += '<div class="w-grid"><aside class="panel w-nav no-print"><div class="w-nav-head"><strong>' + esc(t.navTitle) + '</strong><span class="pill" id="progressPill"></span></div><nav>';
    F.sections.forEach(function (s, i) {
      var n = t.nav[s.id];
      h += '<a href="#' + s.id + '">' + (i + 1) + ') ' + n[0] + ' <small>' + n[1] + '</small></a>';
    });
    h += '<a href="#preview">' + t.nav.preview[0] + ' <small>' + t.nav.preview[1] + '</small></a></nav>';
    h += '<p class="muted small">' + t.notice + '</p>';
    if (t.legalNote) h += '<div class="card callout warn small">' + t.legalNote + '</div>';
    h += '</aside><div class="panel w-main">';

    F.sections.forEach(function (s, i) {
      var st = t.sections[s.id];
      h += '<section class="w-sec" id="' + s.id + '"><h2>' + (i + 1) + ') ' + st.title + '</h2>' + (st.sub ? '<p class="muted">' + st.sub + '</p>' : '');
      if (s.fields) h += '<div class="w-fields">' + s.fields.map(field).join('') + '</div>';
      if (s.table) h += table(s.table);
      if (s.check) h += '<div id="thirdBox">' + thirdCheck() + '</div>';
      if (s.more) h += '<details' + (s.more.some(function (f) { return vals[f[0]]; }) ? ' open' : '') + '><summary>' + st.more + '</summary><div class="w-fields">' + s.more.map(field).join('') + '</div></details>';
      if (s.glossary) h += t.glossary.map(function (g) { return '<details><summary>' + g[0] + '</summary><p class="muted">' + g[1] + '</p></details>'; }).join('');
      h += '</section>';
    });

    h += '<section class="w-sec" id="preview"><h2 class="no-print">' + t.nav.preview[0] + '</h2><p class="muted no-print">' + t.previewHint + '</p>' +
      '<div class="paper" id="paper"></div></section></div></div>';
    h += '<footer class="footer no-print"><div>' + t.footer.meta + '</div><div>' + t.footer.by + '</div></footer>';
    document.getElementById('app').innerHTML = h;
    updatePreview();
    updateProgress();
  }

  /* ---------- print preview ---------- */
  function line(id, opts) {
    var v = vals[id];
    var text = v ? esc(v) : '<span class="blank"></span>';
    if (v && id.indexOf('date') >= 0 || v && id === 'w_dob') {
      try { text = esc(new Date(v + 'T00:00:00').toLocaleDateString(SQ.langInfo().locale)); } catch (e) {}
    }
    var pre = opts && opts.pre ? ' style="white-space:pre-wrap"' : '';
    return '<p' + pre + '><strong>' + lbl(id).replace(/\s*\(.*?\)\s*$/, '') + ':</strong> ' + text + '</p>';
  }
  function printTable(name) {
    var tt = T().tables[name], cols = F.tables[name];
    if (!rows[name].length) return '<p class="muted">—</p>';
    return '<table class="w-table"><thead><tr>' + tt.cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows[name].map(function (r) { return '<tr>' + cols.map(function (c) { return '<td>' + esc(r[c] || '') + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
  }
  function updatePreview() {
    var t = T(), p = t.print, el = document.getElementById('paper');
    if (!el) return;
    var h = '<h1>' + p.docTitle + '</h1><p class="center"><strong>' + p.basmala + '</strong></p>';
    F.sections.forEach(function (s, i) {
      if (s.glossary) return;
      h += '<h3>' + t.sections[s.id].title + '</h3><div class="print-box">';
      if (s.id === 'sec2') h += '<p style="white-space:pre-wrap" dir="auto">' + esc(vals.t_shahada || '') + '</p>';
      else (s.fields || []).forEach(function (f) { if (f[1] !== 'shahada') h += line(f[0], { pre: f[1] === 'textarea' }); });
      if (s.table) h += printTable(s.table);
      (s.more || []).forEach(function (f) { if (vals[f[0]]) h += line(f[0], { pre: f[1] === 'textarea' }); });
      h += '</div>';
    });
    h += '<div class="sign-grid"><div><strong>' + p.signTestator + '</strong><span class="sign-line"></span></div><div><strong>' + p.signExecutor + '</strong><span class="sign-line"></span></div>' +
      '<div><strong>' + p.signWitness1 + '</strong><span class="sign-line"></span></div><div><strong>' + p.signWitness2 + '</strong><span class="sign-line"></span></div></div>';
    h += '<p class="small muted">' + p.smallPrint + '</p>';
    if (t.legalNote) h += '<p class="small muted">' + t.legalNote.replace(/<a [^>]*>(.*?)<\/a>/g, '$1') + '</p>';
    el.innerHTML = h;
  }

  function updateProgress() {
    var done = F.progressKeys.filter(function (k) { return String(vals[k] || '').trim(); }).length;
    var el = document.getElementById('progressPill');
    if (el) el.textContent = T().progress(SQ.pct((done / F.progressKeys.length) * 100));
  }

  function recalc() {
    var tt = sum('thirds');
    vals.third_total = tt ? money(tt) : '';
    var tf = document.getElementById('third_total');
    if (tf) tf.value = vals.third_total;
    var box = document.getElementById('thirdBox');
    if (box) box.innerHTML = thirdCheck();
    updatePreview();
    updateProgress();
  }

  /* ---------- drafts ---------- */
  function collect() {
    var fields = {};
    F.sections.forEach(function (s) { (s.fields || []).concat(s.more || []).forEach(function (f) { fields[f[0]] = vals[f[0]] || ''; }); });
    return { fields: fields, tables: JSON.parse(JSON.stringify(rows)), meta: { savedAt: new Date().toISOString(), version: 2 } };
  }
  function apply(data) {
    var f = data.fields || {};
    Object.keys(f).forEach(function (k) { vals[k] = f[k]; });
    Object.keys(F.tables).forEach(function (k) {
      rows[k] = ((data.tables || {})[k] || []).map(function (r) {
        var o = {}; F.tables[k].forEach(function (c) { o[c] = r[c] == null ? '' : String(r[c]); }); return o;
      });
    });
  }
  function download() {
    var name = (String(vals.w_name || '').trim() || T().draftName) + '.json';
    var blob = new Blob([JSON.stringify(collect(), null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name.replace(/[\\/:*?"<>|]/g, '_');
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    SQ.toast(T().toastSaved);
  }

  function resetAll() {
    if (!window.confirm(T().confirmReset)) return;
    vals = { t_shahada: T().shahadaDefault, will_date: today() };
    rows = { debts: [], thirds: [], heirs: [] };
    renderForm();
    recalc();
  }

  /* ---------- events ---------- */
  function bind() {
    var app = document.getElementById('app');
    app.addEventListener('input', function (e) {
      var el = e.target;
      if (el.dataset.f) { vals[el.dataset.f] = el.value; }
      else if (el.dataset.t) { rows[el.dataset.t][Number(el.dataset.r)][el.dataset.c] = el.value; }
      else return;
      recalc();
    });
    app.addEventListener('change', function (e) {
      if (e.target.id !== 'fileLoad') return;
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      file.text().then(function (txt) {
        apply(JSON.parse(txt));
        renderForm();
        recalc();
        SQ.toast(T().toastLoaded);
      }).catch(function () { window.alert(T().loadError); });
    });
    app.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.add) { rows[b.dataset.add].push({}); renderForm(); recalc(); var ins = document.querySelectorAll('[data-t="' + b.dataset.add + '"]'); if (ins.length) ins[ins.length - 4].focus(); }
      else if (b.dataset.clear) { if (!rows[b.dataset.clear].length || window.confirm(T().confirmClearTable)) { rows[b.dataset.clear] = []; renderForm(); recalc(); } }
      else if (b.dataset.del) { rows[b.dataset.del].splice(Number(b.dataset.r), 1); renderForm(); recalc(); }
      else if (b.dataset.act === 'print') { updatePreview(); window.print(); }
      else if (b.dataset.act === 'save') download();
      else if (b.dataset.act === 'reset') resetAll();
    });
    document.addEventListener('sq:lang', function () {
      if (isDefaultShahada(vals.t_shahada)) vals.t_shahada = T().shahadaDefault;
      var t = T();
      SQ.setMeta(t.meta.title, t.meta.desc);
      renderForm();
      recalc();
    });
  }

  SQ.ready(function () {
    SQ.pageKey = 'waseya';
    F = SQ.waseyaForm;
    vals = { t_shahada: T().shahadaDefault, will_date: today() };
    SQ.setMeta(T().meta.title, T().meta.desc);
    renderForm();
    bind();
    recalc();
  });
})();
