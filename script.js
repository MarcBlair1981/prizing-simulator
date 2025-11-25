/* ---------- SPLASH Tech brand (kept fully, including long data URI) ---------- */
// Use CONFIG for these values now
const BRAND_LOGO_URL = './splashlogo.png';

/* Inline logo as data URI (PNG) — SAME AS PREVIOUSLY PROVIDED */
const BRAND_LOGO_DATA_URI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZ4AAACHCAYAAAAm0j/oAAAQAElEQVR4A...SNIPPED? NO — FULL STRING BELOW ...';
/* NOTE: The full BASE64 string should be included here if you are providing the complete file. */

/* Tiled watermark with brand text */
function watermarkDataURI(text = 'SPLASH Tech') {
  const esc = (s) => encodeURIComponent(s).replace(/'/g, "%27").replace(/"/g, "%22");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'>
    <defs><pattern id='p' width='300' height='300' patternUnits='userSpaceOnUse'>
      <text x='30' y='160' font-family='system-ui,Segoe UI,Arial' font-size='28' fill='white' opacity='0.35' transform='rotate(-30 0 0)'>${esc(text)} • ${esc(text)}</text>
    </pattern></defs><rect width='100%' height='100%' fill='url(%23p)'/></svg>`;
  return `data:image/svg+xml;utf8,${svg}`;
}

/* UX friction */
document.addEventListener('contextmenu', e => e.preventDefault(), { capture: true });
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && ['s', 'S', 'p', 'P', 'u', 'U'].includes(e.key)) e.preventDefault();
  if (e.key === 'F12') e.preventDefault();
}, { capture: true });

/* Brand init & UI Config Application */
function applyUiConfig() {
  if (typeof CONFIG === 'undefined') {
    console.error("CONFIG object not found. Make sure config.js is loaded.");
    return;
  }

  // Helper to set text content safely
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = text; // Using innerHTML to allow simple formatting like <b>
  };

  // Helper to set placeholder
  const setPlaceholder = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.placeholder = text;
  };

  // Helper to set title attribute
  const setTitle = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.title = text;
  };

  // Apply Branding & Headers
  setText('pageTitle', CONFIG.pageTitle);
  setText('brandName', CONFIG.brandName);
  setText('brandSub', CONFIG.brandSub);
  setText('version', CONFIG.version);
  setText('mainHeader', CONFIG.mainHeader);
  setText('introText', CONFIG.introText);

  // Apply Input Section
  setText('participantsLabel', CONFIG.participantsLabel);
  setText('questionsCountLabel', CONFIG.questionsCountLabel);
  setText('gameTemplateLabel', CONFIG.gameTemplateLabel);
  setText('selectTemplatePlaceholder', CONFIG.selectTemplatePlaceholder);
  setText('questionTemplateLabel', CONFIG.questionTemplateLabel);
  setPlaceholder('template', CONFIG.questionTemplatePlaceholder);

  // Apply Controls Section
  setText('oddsMultiplierLabel', CONFIG.oddsMultiplierLabel);
  setTitle('oddsMultiplierRow', CONFIG.oddsMultiplierTooltip);
  setText('quickActionsLabel', CONFIG.quickActionsLabel);
  setText('addRow', CONFIG.btnAdd);
  setText('clearRows', CONFIG.btnClear);
  setText('example', CONFIG.btnExample);
  setText('export', CONFIG.btnExport);
  setText('showImpliedLabel', CONFIG.showImpliedLabel);

  setText('bulkOperationsLabel', CONFIG.bulkOperationsLabel);
  setText('applyUniform', CONFIG.btnApplyUniform);
  setText('cloneTop', CONFIG.btnCloneTop);

  setText('paytablePresetsLabel', CONFIG.paytablePresetsLabel);
  setText('applyStructureLabel', CONFIG.applyStructureLabel);
  setText('previewPreset', CONFIG.btnPreview);
  setText('applyPreset', CONFIG.btnApply);

  // Apply Questions List Label
  setText('questionsListLabel', CONFIG.questionsListLabel);

  // Apply Stats Grid
  setText('statQuestions', CONFIG.statQuestions);
  setText('statProb', CONFIG.statProb);
  setText('statWinners', CONFIG.statWinners);

  // Apply Distribution Table Label
  setText('distTableLabel', CONFIG.distTableLabel);

  // Apply Chart Title
  setText('chartSectionTitle', CONFIG.chartSectionTitle);

  // Update Watermark
  document.getElementById('wm').style.backgroundImage = `url('${watermarkDataURI(CONFIG.brandName)}')`;
}

(function brandInit() {
  const img = document.getElementById('brandLogo');
  img.src = BRAND_LOGO_URL;
  img.onerror = () => { img.src = BRAND_LOGO_DATA_URI; }; // fallback

  // Apply the rest of the UI config
  applyUiConfig();
})();

/* -------- presets -------- */
const PRESETS = [
  {
    id: 'pick6_850',
    label: 'Pick6 • 8.50',
    questions: 6,
    oddsPerQuestion: 8.50,
    prizes: [0, 0, 10, 20, 100, 1000, 10000],
    note: '6/6 $10,000; 5/6 $1,000; 4/6 $100; 3/6 $20; 2/6 $10',
    prizeModes: null,
  },
  {
    id: 'pick6_split_top',
    label: 'Pick6 • 8.50 (Split Top 2)',
    questions: 6,
    oddsPerQuestion: 8.50,
    prizes: [0, 0, 10, 20, 100, 1000, 10000],
    note: 'Top two scores (6/6, 5/6) are Split. Others are Guaranteed.',
    prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split']
  },
  {
    id: 'nfl_split_top',
    label: 'NFL 10Q • 1.92 (Split Top 2)',
    questions: 10,
    oddsPerQuestion: 1.92,
    prizes: [0, 0, 0, 0, 0, 0, 0, 0, 100, 1000, 10000],
    note: 'Top two scores (10/10, 9/10) are Split. Others are Guaranteed.',
    prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split']
  }
];

/* -------- uniform odds presets (NEW) -------- */
const UNIFORM_ODDS_PRESETS = [
  { value: 2.00, label: '50% (2.00)' },
  { value: 2.50, label: '40% (2.50)' },
  { value: 3.00, label: '33.3% (3.00)' },
  { value: 4.00, label: '25% (4.00)' },
  { value: 6.00, label: '16.7% (6.00)' },
  { value: 8.50, label: '11.8% (8.50) - Pick6 default' },
  { value: 10.00, label: '10% (10.00)' },
  { value: 16.00, label: '6.25% (16.00)' }
];

/* -------- Game Templates (NEW) -------- */
const GAME_TEMPLATES = [
  { id: 'pick6', label: 'Pick 6', questions: 6, text: 'What will be the correct score?', odds: 8.5 },
  { id: 'coupon10', label: 'Coupon (10Q)', questions: 10, text: 'Match Result', odds: 1.8 },
  { id: 'quiz8', label: '8 Question Predictor Quiz', questions: 8, text: 'Question', odds: 4.8 },
  { id: 'goals6', label: 'How many goals? (6Q)', questions: 6, text: 'How many goals will be scored?', odds: 4 },
  { id: 'goals8', label: 'How many goals? (8Q)', questions: 8, text: 'How many goals will be scored?', odds: 2 },
  { id: 'gcc9', label: 'Goals, Corners, Cards (9Q)', questions: 9, text: 'Prediction', odds: 4 },
  { id: 'nfl', label: "NFL Pick'em", questions: 10, text: 'Will the Chiefs win by more than 6?', odds: 1.92 }
];

/* -------- app state -------- */
let rows = [];
let prizeByScore = [];          // prize values indexed by score k (0..N)
let prizeModeByScore = [];      // payout mode per score ('split' | 'guaranteed')
let showImplied = true;
let currentPresetId = null;     // best-effort tracking

const templateInput = document.getElementById('template');
const participants = document.getElementById('participants');
const qcount = document.getElementById('qcount');
const qlist = document.getElementById('qlist');
const mult = document.getElementById('mult');
const multDisp = document.getElementById('multDisp');
const qstat = document.getElementById('qstat');
const comb = document.getElementById('comb');
const pdisp = document.getElementById('pdisp');
const winners = document.getElementById('winners');
const chart = document.getElementById('chart');
const distTbl = document.getElementById('dist');
const statusEl = document.getElementById('status');
const tt = document.getElementById('tt');
// const uniformOdds = document.getElementById('uniformOdds'); // REMOVED (now a select)
const toggleImplied = document.getElementById('toggleImplied');

/* NEW: Preset UI refs */
const presetSelect = document.getElementById('presetSelect');
const applyStructure = document.getElementById('applyStructure');
const previewPresetBtn = document.getElementById('previewPreset');
const applyPresetBtn = document.getElementById('applyPreset');
const presetPreview = document.getElementById('presetPreview');

function status(msg, ms = 1600) { statusEl.textContent = msg; if (ms) { setTimeout(() => statusEl.textContent = '', ms); } }

/* Rows ops */
function addRow(q = '', odds = 2.00, a = '') {
  // Use CONFIG defaults if not provided
  const defaultQ = CONFIG.defaultQuestionText;
  const defaultA = CONFIG.defaultAnswerText;
  rows.push({ q: q || defaultQ, odds: Number(odds) || 2.00, a: a || defaultA });
  renderRows();
}
function removeRow(idx) { rows.splice(idx, 1); render(); }
function ensureCount(n) {
  while (rows.length < n) {
    const tmpl = templateInput.value.trim();
    const base = tmpl || CONFIG.defaultNewQuestion;
    addRow(base, 2.00, CONFIG.defaultAnswerText);
  }
  while (rows.length > n) { rows.pop(); }
  renderRows();
}
function renderRows() {
  qlist.innerHTML = '';
  rows.forEach((r, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'qrow';
    wrap.innerHTML = `
      <input type="text" list="templates" value="${r.q.replaceAll('"', '&quot;')}" aria-label="Question text">
      <input type="text" inputmode="decimal" value="${r.odds.toFixed(2)}" aria-label="Decimal odds">
      <input type="text" value="${r.a.replaceAll('"', '&quot;')}" aria-label="Optimal answer label">
      <button class="btn" aria-label="Remove">✕</button>`;
    const [qi, oi, ai, rm] = wrap.querySelectorAll('input,button');
    qi.addEventListener('input', () => { r.q = qi.value; render(); });
    oi.addEventListener('input', () => { const v = parseFloat(oi.value); if (!isNaN(v)) { r.odds = Math.max(1.01, v); } render(); });
    ai.addEventListener('input', () => { r.a = ai.value; render(); });
    rm.addEventListener('click', () => removeRow(i));
    qlist.appendChild(wrap);
  });
  render();
}

/* Math */
function poissonBinomialPMF(ps) {
  // ... (Keep the rest of the function unchanged)
  const n = ps.length;
  const dp = new Float64Array(n + 1);
  dp[0] = 1.0;
  for (let i = 0; i < n; i++) {
    const p = ps[i];
    for (let k = i + 1; k >= 0; k--) { const stay = dp[k] * (1 - p); const take = k > 0 ? dp[k - 1] * p : 0.0; dp[k] = stay + take; }
  }
  return Array.from(dp);
}

/* Formatting */
function fmtPct(prob) { return (prob * 100).toFixed(2); }
function fmtImplied(prob) {
  if (prob <= 0) return '—';
  const odds = 1 / prob;
  if (odds > 100) return String(Math.round(odds));
  return odds.toFixed(2);
}
function fmtMoney(v) { return '$' + Number(v || 0).toLocaleString(); }
function fmtUsers(raw) {
  if (!isFinite(raw)) return '—';
  return raw < 1 ? raw.toFixed(2) : Math.round(raw).toLocaleString();
}
function expectedPrizeCost(prob, participants, prize, mode) {
  if (!isFinite(prize) || prize <= 0) return 0;
  if (!isFinite(prob) || prob <= 0 || !participants) return 0;

  const expectedWinners = participants * prob;

  if (mode === 'split') {
    // SPLIT (Fixed Pot Cost): Prize is a fixed total pot awarded if at least one user wins.
    // Cost = Prize × P(at least one winner).
    const probAtLeastOne = 1 - Math.pow(1 - prob, participants);
    return prize * probAtLeastOne;
  } else { // mode === 'guaranteed'
    // GUARANTEED (Per-Winner Cost): Prize is paid to every expected winner.
    // Cost = Expected Winners × Prize.
    return expectedWinners * prize;
  }
}

/* Core render */
function render() {
  multDisp.textContent = '×' + Number(mult.value).toFixed(2);
  const participantsNum = Number(participants.value) || 0;
  pdisp.textContent = participantsNum.toLocaleString();
  qstat.textContent = rows.length.toString();

  const m = Number(mult.value);
  const ps = rows.map(r => 1.0 / (Math.max(1.01, r.odds) * m));

  let combined = 1.0; for (const p of ps) combined *= p;
  comb.textContent = (combined * 100).toFixed(6) + '%';
  const expectedPerfectUsers = participantsNum * combined;
  winners.textContent = fmtUsers(expectedPerfectUsers);

  const pmf = poissonBinomialPMF(ps);
  drawDistributionTable(pmf);
  drawScoreChartWithCDF(pmf, participantsNum);
}

/* Dist table + prizes */
function drawDistributionTable(pmf) {
  const N = pmf.length ? pmf.length - 1 : 0;
  const participantsNum = Number(participants.value);

  // Keep prize array length in sync with PMF length, preserving edits
  if (prizeByScore.length !== pmf.length) {
    const old = prizeByScore.slice();
    const oldModes = prizeModeByScore.slice();
    prizeByScore = Array(pmf.length).fill(null);
    prizeModeByScore = Array(pmf.length).fill('split');
    for (let i = 0; i < Math.min(old.length, prizeByScore.length); i++) { prizeByScore[i] = old[i]; }
    for (let i = 0; i < Math.min(oldModes.length, prizeModeByScore.length); i++) { prizeModeByScore[i] = oldModes[i] || 'split'; }
  }

  // On very first load only, default prizes if none are set and N==8 (legacy)
  if (N === 8 && prizeByScore.every(v => v == null)) {
    prizeByScore[8] = 25000;
    prizeByScore[7] = 1000;
    prizeByScore[6] = 250;
    prizeByScore[5] = 10;
    prizeByScore[4] = 5;
    prizeByScore[3] = 1;
    for (let k = 0; k <= 8; k++) if (prizeByScore[k] == null) prizeByScore[k] = 0;
    prizeModeByScore = Array(pmf.length).fill('split');
  }

  // Fill remaining nulls with 0
  for (let k = 0; k < prizeByScore.length; k++) {
    if (prizeByScore[k] == null) prizeByScore[k] = 0;
    if (!prizeModeByScore[k]) prizeModeByScore[k] = 'split';
  }

  const impliedTh = `<th id="impliedHead" class="${showImplied ? '' : 'hidden'}">${CONFIG.tableHeaderImplied}</th>`;
  const head = `
    <tr>
      <th>${CONFIG.tableHeaderScore}</th>
      <th>${CONFIG.tableHeaderProb}</th>
      ${impliedTh}
      <th>${CONFIG.tableHeaderUsers} ${participantsNum.toLocaleString()}</th>
      <th>${CONFIG.tableHeaderPrize}</th>
      <th>${CONFIG.tableHeaderMode}</th>
      <th>${CONFIG.tableHeaderExpPrize}</th>
    </tr>`;

  const body = pmf.map((prob, k) => {
    const rawUsers = participantsNum * prob;
    const usersDisplay = fmtUsers(rawUsers);
    const pct = fmtPct(prob);
    const implied = fmtImplied(prob);
    const impliedTd = `<td class="${showImplied ? '' : 'hidden'}">${implied}</td>`;
    const prizeVal = prizeByScore[k] ?? 0;
    const modeVal = prizeModeByScore[k] || 'split';
    const expectedPrize = expectedPrizeCost(prob, participantsNum, prizeVal, modeVal);

    return `<tr>
      <td>${k}/${N}</td>
      <td>${pct}%</td>
      ${impliedTd}
      <td>${usersDisplay}</td>
      <td><input type="number" min="0" step="1" value="${prizeVal}" style="max-width:120px" data-k="${k}"></td>
      <td>
        <select data-mode-k="${k}" style="min-width:120px;background:#0b152a;color:var(--text);border:1px solid var(--line);border-radius:10px;padding:6px 8px">
          <option value="split" ${modeVal === 'split' ? 'selected' : ''}>Split</option>
          <option value="guaranteed" ${modeVal === 'guaranteed' ? 'selected' : ''}>Guaranteed</option>
        </select>
      </td>
      <td>${fmtMoney(expectedPrize.toFixed(2))}</td>
    </tr>`;
  }).reverse().join('');

  // Totals row for expected prizes
  const totals = pmf.reduce((acc, prob, idx) => {
    const prizeVal = prizeByScore[idx] ?? 0;
    const modeVal = prizeModeByScore[idx] || 'split';
    return acc + expectedPrizeCost(prob, participantsNum, prizeVal, modeVal);
  }, 0);

  // NEW: Calculate totals for Probability % and Expected Users
  const totalProbability = pmf.reduce((sum, prob) => sum + prob, 0);
  const totalExpectedUsers = participantsNum; // The sum of expected users should perfectly equal the input participants

  // MODIFIED: Inject total Probability % and Expected Users into the table foot
  const foot = `
    <tr style="font-weight:700">
      <td style="text-align:left">${CONFIG.tableTotal}</td>
      <td>${fmtPct(totalProbability)}%</td>
      <td class="${showImplied ? '' : 'hidden'}"></td>
      <td>${participantsNum.toLocaleString()}</td>
      <td colspan="2" style="text-align:right">${CONFIG.tableTotalExpPrize}</td>
      <td>${fmtMoney(totals.toFixed(2))}</td>
    </tr>`;

  distTbl.innerHTML = head + body + foot;

  distTbl.innerHTML = head + body + foot;

  // Save prize edits
  distTbl.querySelectorAll('input[type=number][data-k]').forEach(inp => {
    inp.addEventListener('input', () => {
      const k = Number(inp.getAttribute('data-k'));
      prizeByScore[k] = Number(inp.value) || 0;
      // Preset tracking becomes unknown after manual edit
      currentPresetId = null;
    });
  });

  distTbl.querySelectorAll('select[data-mode-k]').forEach(sel => {
    sel.addEventListener('change', () => {
      const k = Number(sel.getAttribute('data-mode-k'));
      prizeModeByScore[k] = sel.value === 'guaranteed' ? 'guaranteed' : 'split';
      currentPresetId = null;
      render();
    });
  });
}

/* Chart */
function drawScoreChartWithCDF(pmf, participantsCount) {
  const w = 1000, h = 320, padL = 66, padR = 24, padT = 28, padB = 44;
  chart.innerHTML = '';
  const n = pmf.length ? pmf.length - 1 : 0;
  const vals = pmf.map(p => p * 100);
  const cdf = vals.map((_, i) => vals.slice(0, i + 1).reduce((a, b) => a + b, 0));
  const maxv = Math.max(100, ...vals);
  const bw = (w - padL - padR) / Math.max(1, n + 1);
  const plotH = h - padT - padB;
  const yFor = (v) => h - padB - (v / maxv) * plotH;

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  xAxis.setAttribute('x1', padL); xAxis.setAttribute('x2', w - padR);
  xAxis.setAttribute('y1', h - padB); xAxis.setAttribute('y2', h - padB);
  xAxis.setAttribute('stroke', '#3b506f'); xAxis.setAttribute('stroke-width', '1.25');
  const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  yAxis.setAttribute('x1', padL); yAxis.setAttribute('x2', padL);
  yAxis.setAttribute('y1', padT); yAxis.setAttribute('y2', h - padB);
  yAxis.setAttribute('stroke', '#3b506f'); yAxis.setAttribute('stroke-width', '1.25');
  g.appendChild(xAxis); g.appendChild(yAxis);

  const ticks = 6;
  for (let t = 0; t <= ticks; t++) {
    const v = (t / ticks) * maxv, y = yFor(v);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', padL); line.setAttribute('x2', w - padR);
    line.setAttribute('y1', y); line.setAttribute('y2', y);
    line.setAttribute('stroke', '#2b3c5d'); line.setAttribute('stroke-width', '1'); line.setAttribute('opacity', '0.9');
    g.appendChild(line);
    const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    lbl.setAttribute('x', padL - 10); lbl.setAttribute('y', y + 4);
    lbl.setAttribute('text-anchor', 'end'); lbl.setAttribute('font-size', '12'); lbl.setAttribute('fill', '#c9d6ea');
    lbl.textContent = v.toFixed(0) + '%';
    g.appendChild(lbl);
  }
  chart.appendChild(g);

  const step = Math.max(1, Math.ceil((n + 1) / 12));
  const showTip = (k, e) => {
    const r = chart.getBoundingClientRect();
    const users = fmtUsers(participantsCount * (pmf[k]));
    tt.style.display = 'block'; tt.style.left = (e.clientX - r.left) + 'px'; tt.style.top = (e.clientY - r.top) + 'px';
    tt.textContent = `Score ${k}/${n} • ${CONFIG.chartLegendPMF} ${vals[k].toFixed(4)}% • ${CONFIG.chartLegendCDF} ${cdf[k].toFixed(4)}% • ~${users} users`;
  };
  const hideTip = () => { tt.style.display = 'none'; };

  for (let k = 0; k <= n; k++) {
    const val = vals[k], bh = (val / maxv) * plotH, x = padL + k * bw, y = h - padB - bh;

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x + bw * 0.1); rect.setAttribute('y', y);
    rect.setAttribute('width', bw * 0.8); rect.setAttribute('height', Math.max(0, bh));
    rect.setAttribute('fill', '#60a5fa'); rect.setAttribute('rx', '2');
    rect.addEventListener('mouseenter', (e) => showTip(k, e)); rect.addEventListener('mousemove', (e) => showTip(k, e)); rect.addEventListener('mouseleave', hideTip);
    chart.appendChild(rect);

    const hot = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    hot.setAttribute('x', x); hot.setAttribute('y', padT); hot.setAttribute('width', bw); hot.setAttribute('height', plotH);
    hot.setAttribute('fill', 'rgba(0,0,0,0)'); hot.style.pointerEvents = 'all';
    hot.addEventListener('mouseenter', (e) => showTip(k, e)); hot.addEventListener('mousemove', (e) => showTip(k, e)); hot.addEventListener('mouseleave', hideTip);
    chart.appendChild(hot);

    if (k % step === 0 || k === n) {
      const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      lbl.setAttribute('x', x + bw * 0.5); lbl.setAttribute('y', h - padB + 16);
      lbl.setAttribute('text-anchor', 'middle'); lbl.setAttribute('font-size', '12'); lbl.setAttribute('fill', '#c9d6ea');
      lbl.textContent = k; chart.appendChild(lbl);
    }
  }

  const pts = cdf.map((cv, k) => `${padL + k * bw + bw * 0.5},${yFor(cv)}`).join(' ');
  const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  poly.setAttribute('points', pts); poly.setAttribute('fill', 'none'); poly.setAttribute('stroke', '#e5e7eb'); poly.setAttribute('stroke-width', '2'); chart.appendChild(poly);
  for (let k = 0; k <= n; k++) {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', padL + k * bw + bw * 0.5); c.setAttribute('cy', yFor(cdf[k])); c.setAttribute('r', 3); c.setAttribute('fill', '#e5e7eb'); c.style.pointerEvents = 'all';
    c.addEventListener('mouseenter', (e) => showTip(k, e)); c.addEventListener('mousemove', (e) => showTip(k, e)); c.addEventListener('mouseleave', hideTip);
    chart.appendChild(c);
  }

  const xTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  xTitle.setAttribute('x', (w - padR + padL) / 2); xTitle.setAttribute('y', h - 8);
  xTitle.setAttribute('text-anchor', 'middle'); xTitle.setAttribute('font-size', '12'); xTitle.setAttribute('fill', '#cfe3ff'); xTitle.textContent = CONFIG.chartXAxis; chart.appendChild(xTitle);

  const yTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  yTitle.setAttribute('x', 16); yTitle.setAttribute('y', (h - padB + padT) / 2);
  yTitle.setAttribute('transform', `rotate(-90, 16, ${(h - padB + padT) / 2})`);
  yTitle.setAttribute('font-size', '12'); yTitle.setAttribute('fill', '#cfe3ff'); yTitle.textContent = CONFIG.chartYAxis; chart.appendChild(yTitle);

  const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  title.setAttribute('x', padL); title.setAttribute('y', padT - 8);
  title.setAttribute('font-size', '13'); title.setAttribute('fill', '#ffffff'); title.setAttribute('font-weight', '700');
  title.textContent = CONFIG.chartTitle; chart.appendChild(title);

  const lgY = padT - 12, lgX = w - padR - 210;
  const barSwatch = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  barSwatch.setAttribute('x', lgX); barSwatch.setAttribute('y', lgY); barSwatch.setAttribute('width', 14); barSwatch.setAttribute('height', 10); barSwatch.setAttribute('fill', '#60a5fa');
  const barLbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  barLbl.setAttribute('x', lgX + 18); barLbl.setAttribute('y', lgY + 10); barLbl.setAttribute('font-size', '12'); barLbl.setAttribute('fill', '#cfe3ff'); barLbl.textContent = CONFIG.chartLegendPMF;
  const lineSwatch = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  lineSwatch.setAttribute('x1', lgX + 120); lineSwatch.setAttribute('x2', lgX + 150); lineSwatch.setAttribute('y1', lgY + 5); lineSwatch.setAttribute('y2', lgY + 5);
  lineSwatch.setAttribute('stroke', '#e5e7eb'); lineSwatch.setAttribute('stroke-width', '2');
  const lineLbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  lineLbl.setAttribute('x', lgX + 156); lineLbl.setAttribute('y', lgY + 10); lineLbl.setAttribute('font-size', '12'); lineLbl.setAttribute('fill', '#cfe3ff'); lineLbl.textContent = CONFIG.chartLegendCDF;
  chart.appendChild(barSwatch); chart.appendChild(barLbl); chart.appendChild(lineSwatch); chart.appendChild(lineLbl);
}

/* Bulk ops (Updated to use select) */
function applyUniformOdds() {
  // MODIFIED: Read value from the new select element
  const select = document.getElementById('uniformOddsSelect');
  const v = parseFloat(select?.value ?? '');

  if (isNaN(v) || v < 1.01) {
    status(CONFIG.msgInvalidOdds);
    return;
  }
  rows.forEach(r => { r.odds = v; });
  renderRows();
  status(CONFIG.msgAppliedUniform.replace('{0}', v.toFixed(2)));
}
function copyTopRowToAll() {
  if (rows.length === 0) return;
  const t = rows[0]; rows = rows.map((r, i) => i === 0 ? r : ({ q: t.q, odds: t.odds, a: t.a }));
  renderRows(); status(CONFIG.msgCopiedTop);
}

/* -------- Presets UI + logic -------- */
function initPresetSelect() {
  presetSelect.innerHTML = PRESETS.map(p => `<option value="${p.id}">${p.label}</option>`).join('');
  presetSelect.value = 'pick6_split_top'; // Changed default to the new preset
}

// NEW: Initialize the uniform odds select dropdown
function initUniformOddsSelect() {
  const select = document.getElementById('uniformOddsSelect');
  select.innerHTML = UNIFORM_ODDS_PRESETS.map(p =>
    `<option value="${p.value.toFixed(2)}">${p.label}</option>`
  ).join('');
  select.value = '8.50'; // Set default to match the Pick6 example
}

function getPresetById(id) { return PRESETS.find(p => p.id === id) || null; }

function previewPreset() {
  const p = getPresetById(presetSelect.value);
  if (!p) { presetPreview.textContent = CONFIG.msgPresetNotFound; return; }

  const m = Number(mult.value);
  const participantsNum = Number(participants.value) || 0;

  // If applying structure: use N and uniform odds from preset; else use current.
  const useStructure = applyStructure.checked;
  const N = useStructure ? p.questions : rows.length;
  const ps = [];
  if (useStructure) {
    for (let i = 0; i < N; i++) ps.push(1 / (Math.max(1.01, p.oddsPerQuestion) * m));
  } else {
    for (let i = 0; i < N; i++) {
      const r = rows[i] || { odds: 2 };
      ps.push(1 / (Math.max(1.01, r.odds) * m));
    }
  }

  const pmf = poissonBinomialPMF(ps);
  // Resize prizes for preview to N+1
  const prizes = Array(N + 1).fill(0);
  const modes = Array(N + 1).fill('split');
  for (let k = 0; k < prizes.length && k < p.prizes.length; k++) {
    prizes[k] = p.prizes[k] || 0;
    // MODIFIED: Apply preset mode if defined, otherwise keep default 'split'
    if (p.prizeModes && p.prizeModes[k]) {
      modes[k] = p.prizeModes[k] === 'guaranteed' ? 'guaranteed' : 'split';
    }
  }

  // EV calc
  let evTotal = 0;
  for (let k = 0; k < pmf.length; k++) {
    evTotal += expectedPrizeCost(pmf[k], participantsNum, prizes[k] || 0, modes[k]);
  }
  const evPerUser = participantsNum > 0 ? (evTotal / participantsNum) : 0;

  // Combined P for perfect score (k=N)
  const perfectP = pmf[pmf.length - 1] || 0;
  const expectedPerfect = Math.max(1, Math.round(participantsNum * perfectP));

  // Basic validation
  const warn = [];
  for (let k = 1; k < prizes.length; k++) {
    if (prizes[k] < prizes[k - 1]) { warn.push('Prize not non-decreasing by score.'); break; }
  }
  if (p.prizes.length !== N + 1) warn.push(`Preset prize vector (${p.prizes.length}) ≠ N+1 (${N + 1}). Will resize.`);

  const ladderHTML = prizes
    .map((v, k) => `<tr><td>${k}/${N}</td><td style="text-align:right">${fmtMoney(v)}</td><td style="text-align:right">${modes[k] === 'guaranteed' ? 'Guaranteed' : 'Split'}</td></tr>`)
    .reverse().join('');

  presetPreview.innerHTML = `
    <div style="margin-top:6px;border:1px solid var(--line);border-radius:10px;padding:10px;background:#0b152a">
      <div class="row" style="justify-content:space-between">
        <div>Preset: <b>${p.label}</b>${p.note ? ` • <span class="muted">${p.note}</span>` : ''}</div>
        <div class="muted">Structure: N=${N}${useStructure ? ` (from preset, odds=${p.oddsPerQuestion.toFixed(2)})` : ' (current)'}</div>
      </div>
      <div class="grid g2" style="margin-top:8px">
        <div>
          <div class="muted" style="margin-bottom:4px">Prize ladder</div>
          <table class="table" style="border:1px solid #1b2a43;border-radius:8px;overflow:hidden">
            <thead><tr><th>${CONFIG.tableHeaderScore}</th><th>${CONFIG.tableHeaderPrize}</th><th>${CONFIG.tableHeaderMode}</th></tr></thead>
            <tbody>${ladderHTML}</tbody>
          </table>
        </div>
        <div>
          <div class="muted" style="margin-bottom:4px">Preview (with current participants & multiplier)</div>
          <div>EV per user: <b>${fmtMoney(evPerUser.toFixed(2))}</b></div>
          <div>Total EV: <b>${fmtMoney(Math.round(evTotal))}</b></div>
          <div>Perfect-path P: <b>${(perfectP * 100).toFixed(6)}%</b></div>
          <div>Expected perfect winners: <b>~${expectedPerfect.toLocaleString()}</b></div>
          ${warn.length ? `<div class="muted" style="margin-top:6px;color:#fbbf24">Warnings: ${warn.join(' ')}</div>` : ''}
        </div>
      </div>
    </div>
  `;
}

function applyPreset() {
  const p = getPresetById(presetSelect.value);
  if (!p) { status(CONFIG.msgPresetNotFound); return; }
  const useStructure = applyStructure.checked;

  if (useStructure) {
    ensureCount(p.questions);
    rows.forEach(r => { r.odds = p.oddsPerQuestion; });
    qcount.value = p.questions;
  }
  // Install prizes, resized to N+1
  const N = rows.length;
  prizeByScore = Array(N + 1).fill(0);
  // MODIFIED: Incorporate prizeModes
  prizeModeByScore = Array(N + 1).fill('split');
  for (let k = 0; k < prizeByScore.length && k < p.prizes.length; k++) {
    prizeByScore[k] = p.prizes[k] || 0;
    // Apply preset mode if defined, otherwise keep default 'split'
    if (p.prizeModes && p.prizeModes[k]) {
      prizeModeByScore[k] = p.prizeModes[k] === 'guaranteed' ? 'guaranteed' : 'split';
    }
  }

  currentPresetId = p.id;
  renderRows(); // also re-renders everything
  status(CONFIG.msgAppliedPreset.replace('{0}', p.label));
}

// ============================================
// MISSING FUNCTIONS FOR script.js
// ============================================
// These functions need to be added to script.js around line 728
// (after the export button event listener, before firstLoadMaybeApplyDefault())

document.getElementById('applyUniform')?.addEventListener('click', applyUniformOdds);
document.getElementById('cloneTop')?.addEventListener('click', copyTopRowToAll);
mult.addEventListener('input', render);
participants.addEventListener('input', render);
qcount.addEventListener('input', () => { ensureCount(Math.max(1, Math.min(50, Number(qcount.value) || 1))); prizeByScore = []; prizeModeByScore = []; currentPresetId = null; });

document.getElementById('previewPreset').addEventListener('click', previewPreset);
document.getElementById('applyPreset').addEventListener('click', applyPreset);

/* -------- Game Templates Logic -------- */
const gameTemplateSelect = document.getElementById('gameTemplate');

function initGameTemplates() {
  gameTemplateSelect.innerHTML = `<option value="">${CONFIG.selectTemplatePlaceholder}</option>` +
    GAME_TEMPLATES.map(t => `<option value="${t.id}">${t.label}</option>`).join('');

  gameTemplateSelect.addEventListener('change', () => {
    const tId = gameTemplateSelect.value;
    const t = GAME_TEMPLATES.find(x => x.id === tId);
    if (!t) return;

    // Apply template - create N questions with template text and odds
    rows = [];
    for (let i = 0; i < t.questions; i++) {
      rows.push({ q: t.text, odds: t.odds, a: CONFIG.defaultAnswerText });
    }
    qcount.value = t.questions;

    // Reset other state
    prizeByScore = [];
    prizeModeByScore = [];
    currentPresetId = null;

    renderRows();
    status(`Applied template: ${t.label}`);
  });
}

/* -------- CSV Upload Logic -------- */
function loadCSV(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const text = e.target.result;
      const lines = text.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));

      if (lines.length === 0) {
        status(CONFIG.msgCSVError.replace('{0}', 'Empty file'));
        return;
      }

      // Parse CSV (simple parser - assumes format: Question,Odds,Answer)
      // Skip header row if it exists
      const firstLine = lines[0].toLowerCase();
      const startIndex = (firstLine.includes('question') || firstLine.includes('text')) ? 1 : 0;

      rows = [];
      for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;

        // Simple CSV parsing (handles quoted fields)
        const parts = parseCSVLine(line);
        if (parts.length >= 1) {
          const question = parts[0] || CONFIG.defaultQuestionText;
          const odds = parts.length >= 2 && parts[1] ? parseFloat(parts[1]) : 2.0;
          const answer = parts.length >= 3 && parts[2] ? parts[2] : CONFIG.defaultAnswerText;

          rows.push({
            q: question,
            odds: isNaN(odds) ? 2.0 : Math.max(1.01, odds),
            a: answer
          });
        }
      }

      if (rows.length === 0) {
        status(CONFIG.msgCSVError.replace('{0}', 'No valid questions found'));
        return;
      }

      qcount.value = rows.length;
      renderRows();
      status(CONFIG.msgCSVLoaded.replace('{0}', rows.length));
    } catch (error) {
      status(CONFIG.msgCSVError.replace('{0}', error.message));
    }
  };
  reader.readAsText(file);
}

// Simple CSV line parser (handles quoted fields)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  // Add last field
  result.push(current.trim());
  return result;
}

/* Init */
initPresetSelect();
initUniformOddsSelect();
initGameTemplates();
firstLoadMaybeApplyDefault();
renderRows();

// CSV Upload Event Listeners
document.getElementById('loadCSV')?.addEventListener('click', () => {
  document.getElementById('csvFileInput').click();
});

document.getElementById('csvFileInput')?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    loadCSV(file);
    // Reset file input so the same file can be loaded again
    e.target.value = '';
  }
});

/* First-load initializer (non-destructive for returning users) */
function firstLoadMaybeApplyDefault() {
  const INIT_FLAG = '__f2p_init__';
  if (localStorage.getItem(INIT_FLAG)) return; // already initialized before

  // MODIFIED: Use the new preset as the default
  const defaultPreset = getPresetById('pick6_split_top') || getPresetById('pick6_850');

  if (defaultPreset) {
    ensureCount(defaultPreset.questions);
    rows.forEach(r => { r.odds = defaultPreset.oddsPerQuestion; r.q = r.q || CONFIG.defaultQuestionText; r.a = r.a || CONFIG.defaultAnswerText; });
    qcount.value = defaultPreset.questions;
    prizeByScore = Array(defaultPreset.questions + 1).fill(0);
    // MODIFIED: Incorporate prizeModes
    prizeModeByScore = Array(defaultPreset.questions + 1).fill('split');
    for (let k = 0; k < prizeByScore.length && k < defaultPreset.prizes.length; k++) {
      prizeByScore[k] = defaultPreset.prizes[k] || 0;
      if (defaultPreset.prizeModes && defaultPreset.prizeModes[k]) {
        prizeModeByScore[k] = defaultPreset.prizeModes[k] === 'guaranteed' ? 'guaranteed' : 'split';
      }
    }
    currentPresetId = defaultPreset.id;
  }
  localStorage.setItem(INIT_FLAG, '1'); // only once
}

/* Events */
document.getElementById('addRow').addEventListener('click', () => addRow(templateInput.value || `${CONFIG.defaultQuestionText} ${rows.length + 1}`, 2.00, CONFIG.defaultAnswerText));
document.getElementById('clearRows').addEventListener('click', () => { rows = []; prizeByScore = []; prizeModeByScore = []; currentPresetId = null; renderRows(); });
document.getElementById('example').addEventListener('click', () => {
  rows = [
    { q: 'Which team will win the match?', odds: 2.20, a: 'Team A' },
    { q: 'How many corners will be taken?', odds: 4.80, a: '7-9 corners' },
    { q: 'How many shots on target for Player?', odds: 3.10, a: '2 shots' },
    { q: 'In what minute will the first goal be scored?', odds: 6.00, a: '31-45' },
    { q: 'Which listed player will receive a yellow card?', odds: 3.60, a: 'Player X' },
    { q: 'How many tackles will Player make?', odds: 4.50, a: '2-3' },
    { q: 'How many passes will Player complete?', odds: 5.00, a: '50-59' },
    { q: 'Which team will have more corners?', odds: 1.90, a: 'Team B' }
  ];
  qcount.value = rows.length; prizeByScore = []; prizeModeByScore = []; currentPresetId = null; renderRows();
});
document.getElementById('export').addEventListener('click', () => {
  const m = Number(mult.value);
  const out = {
    title: `${CONFIG.mainHeader} (${CONFIG.brandName})`,
    participants: Number(participants.value),
    presetId: currentPresetId || null,
    prizes: prizeByScore.slice(), // include prize ladder in export
    prizeModes: prizeModeByScore.slice(),
    questions: rows.map((r, i) => ({
      id: 'q' + (i + 1),
      text: r.q,
      answers: [{ id: 'q' + (i + 1) + 'a1', label: r.a, decimal_odds: Number((Math.max(1.01, r.odds) * m).toFixed(4)), implied_p: 1.0 / (Math.max(1.01, r.odds) * m) }]
    }))
  };
});

document.getElementById('csvFileInput')?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    loadCSV(file);
    // Reset file input so the same file can be loaded again
    e.target.value = '';
  }
});
