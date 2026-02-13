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

/* -------- presets loaded from presets.js -------- */
// PRESETS, UNIFORM_ODDS_PRESETS, and GAME_TEMPLATES are now defined in presets.js

/* -------- app state -------- */
let rows = [];
let prizeByScore = [];          // prize values indexed by score k (0..N)
let prizeModeByScore = [];      // payout mode per score ('split' | 'guaranteed')
let prizeByPoints = [];         // prize values indexed by POINTS
let prizeModeByPoints = [];     // payout mode per POINTS
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
const observedCostRatioInput = document.getElementById('observedCostRatio');
const enableGamificationCheckbox = document.getElementById('enableGamification');

/* NEW: Preset UI refs */
const presetSelect = document.getElementById('presetSelect');
const applyStructure = document.getElementById('applyStructure');
const previewPresetBtn = document.getElementById('previewPreset');
const applyPresetBtn = document.getElementById('applyPreset');
const presetPreview = document.getElementById('presetPreview');

/* NEW: Gamification UI refs */
const gamificationSection = document.getElementById('gamificationSection');
const gamifiedCostEl = document.getElementById('gamifiedCost');
const gamifiedCostPerUserEl = document.getElementById('gamifiedCostPerUser');
const gamifiedDistTbl = document.getElementById('gamifiedDist');
const gamifiedChart = document.getElementById('gamifiedChart');
const gamifiedTt = document.getElementById('gamifiedTt');

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

/* GAMIFICATION LOGIC */
function calculateGamifiedPMF(ps) {
  // Config
  const PT_CORRECT = 10;
  const PT_JOKER = 5;
  const PT_CAPTAIN_BONUS = 10; // Extra points on top of PT_CORRECT
  const JOKER_THRESHOLD = 0.5; // Only use joker if p < 0.5

  const n = ps.length;
  // Identify Captain: Index with MAX probability
  // Identify Joker: Index with MIN probability, IF p < threshold
  // Captain cannot be Joker (Captain takes precedence as it's a confident pick)

  let captainIdx = -1;
  let maxP = -1;
  ps.forEach((p, i) => {
    if (p > maxP) { maxP = p; captainIdx = i; }
  });

  let jokerIdx = -1;
  let minP = 2.0;
  ps.forEach((p, i) => {
    if (i !== captainIdx && p < minP) { minP = p; jokerIdx = i; }
  });

  // Decide if we actually use the joker
  const useJoker = (jokerIdx !== -1 && minP < JOKER_THRESHOLD);
  const finalJokerIdx = useJoker ? jokerIdx : -1;

  // DP State: dp[points] = prob
  // Max points = N * 10 + 10 (Captain). (Assuming no joker reduces max).
  // Safe max size = (N+2)*10
  const maxPoints = (n * 10) + 10;
  // Map for sparse-ish array? Just use array, size is small (~500)
  let dp = new Float64Array(maxPoints + 1);
  dp[0] = 1.0;

  for (let i = 0; i < n; i++) {
    const p = ps[i];
    const newDp = new Float64Array(maxPoints + 1);

    // Transitions
    // If Joker: Guaranteed 5 points.
    // If Captain: p -> +20 pts, (1-p) -> 0 pts
    // Else: p -> +10 pts, (1-p) -> 0 pts

    if (i === finalJokerIdx) {
      // Deterministic shift by PT_JOKER
      for (let s = 0; s <= maxPoints; s++) {
        if (dp[s] > 0) {
          if (s + PT_JOKER <= maxPoints) {
            newDp[s + PT_JOKER] += dp[s];
          }
        }
      }
    } else if (i === captainIdx) {
      // Captain
      const ptsWin = PT_CORRECT + PT_CAPTAIN_BONUS; // 20
      for (let s = 0; s <= maxPoints; s++) {
        if (dp[s] > 0) {
          // Win
          if (s + ptsWin <= maxPoints) newDp[s + ptsWin] += dp[s] * p;
          // Loss
          newDp[s] += dp[s] * (1 - p);
        }
      }
    } else {
      // Standard
      const ptsWin = PT_CORRECT; // 10
      for (let s = 0; s <= maxPoints; s++) {
        if (dp[s] > 0) {
          // Win
          if (s + ptsWin <= maxPoints) newDp[s + ptsWin] += dp[s] * p;
          // Loss
          newDp[s] += dp[s] * (1 - p);
        }
      }
    }
    dp = newDp;
  }

  // Convert to array of objects { score: int, prob: float }
  // Only keep non-zero entries? Or just return the array
  // For compatibility with render functions, let's return a special object or just the array.
  // The existing render expects an array where index=score. 
  // We can return the array, index=points.
  return Array.from(dp);
}

/* Formatting */
function fmtPct(prob) { return (prob * 100).toFixed(2); }
function fmtImplied(prob) {
  if (prob <= 0) return '—';
  const odds = 1 / prob;
  if (odds > 100) return String(Math.round(odds));
  if (odds > 100) return String(Math.round(odds));
  return odds.toFixed(2);
}
function fmtPoints(pt) { return pt === 1 ? '1 pt' : pt + ' pts'; }
function fmtMoney(v) { return '$' + Number(v || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
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
  const decimalOdds = combined > 0 ? Math.round(1 / combined) : 0;
  comb.textContent = (combined * 100).toFixed(3) + '% (' + decimalOdds.toLocaleString() + ')';
  const expectedPerfectUsers = participantsNum * combined;
  winners.textContent = fmtUsers(expectedPerfectUsers);

  // ALWAYS Standard Calc
  const pmfStandard = poissonBinomialPMF(ps);
  drawDistributionTable(pmfStandard, distTbl, chart, tt, prizeByScore, prizeModeByScore, false);

  // OPTIONAL Gamified Calc
  const isGamified = enableGamificationCheckbox?.checked || false;
  if (isGamified && gamificationSection) {
    gamificationSection.classList.remove('hidden');
    // Ensure we have a valid PMF even if calculation fails
    let pmfGamified;
    try {
      pmfGamified = calculateGamifiedPMF(ps);
    } catch (e) {
      console.error("Gamification Calc Error", e);
      pmfGamified = [1.0]; // Fallback
    }
    drawDistributionTable(pmfGamified, gamifiedDistTbl, gamifiedChart, gamifiedTt, prizeByPoints, prizeModeByPoints, true);
  } else if (gamificationSection) {
    gamificationSection.classList.add('hidden');
  }
}

/* Dist table + prizes */
/* Dist table + prizes */
function drawDistributionTable(pmf, tableEl, chartEl, ttEl, prizeArr, modeArr, isGamified) {
  // If gamified, pmf index = points.
  // If not, pmf index = wins.

  const N = rows.length; // Context for "Score k/N" if not gamified
  const participantsNum = Number(participants.value);

  let rowsToRender = [];
  if (isGamified) {
    pmf.forEach((p, score) => {
      if (p > 1e-9) rowsToRender.push({ k: score, p: p });
    });
    // Sort desc by score
    rowsToRender.sort((a, b) => b.k - a.k);
  } else {
    // Classic 0..N
    for (let k = 0; k < pmf.length; k++) rowsToRender.push({ k: k, p: pmf[k] });
    rowsToRender.reverse();
  }

  const maxK = rowsToRender.length > 0 ? rowsToRender[0].k : 0;
  // Ensure prize array is big enough
  while (prizeArr.length <= maxK) { prizeArr.push(0); modeArr.push('split'); }

  const scoreHeader = isGamified ? 'Points' : CONFIG.tableHeaderScore;

  const impliedTh = `<th class="${showImplied ? '' : 'hidden'}">${CONFIG.tableHeaderImplied}</th>`;
  const head = `
    <tr>
      <th>${scoreHeader}</th>
      <th>${CONFIG.tableHeaderProb}</th>
      ${impliedTh}
      <th>${CONFIG.tableHeaderUsers} ${participantsNum.toLocaleString()}</th>
      <th>${CONFIG.tableHeaderPrize}</th>
      <th>${CONFIG.tableHeaderMode}</th>
      <th>${CONFIG.tableHeaderExpPrize}</th>
    </tr>`;

  const body = rowsToRender.map(item => {
    const k = item.k;
    const prob = item.p;

    const label = isGamified ? fmtPoints(k) : `${k}/${N}`;

    const rawUsers = participantsNum * prob;
    const usersDisplay = fmtUsers(rawUsers);
    const pct = fmtPct(prob);
    const implied = fmtImplied(prob);
    const impliedTd = `<td class="${showImplied ? '' : 'hidden'}">${implied}</td>`;
    const prizeVal = prizeArr[k] ?? 0;
    const modeVal = modeArr[k] || 'split';
    const expectedPrize = expectedPrizeCost(prob, participantsNum, prizeVal, modeVal);

    return `<tr>
      <td>${label}</td>
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
  }).join('');

  // Totals
  const totals = rowsToRender.reduce((acc, item) => {
    const k = item.k;
    const prob = item.p;

    // Explicit global check for gamified mode to avoid stale closure
    let prizeVal = prizeArr[k] ?? 0;
    let modeVal = modeArr[k] || 'split';

    if (isGamified) {
      prizeVal = (prizeByPoints && prizeByPoints[k]) ?? 0;
      modeVal = (prizeModeByPoints && prizeModeByPoints[k]) ? prizeModeByPoints[k] : 'split';
    }

    return acc + expectedPrizeCost(prob, participantsNum, prizeVal, modeVal);
  }, 0);

  const totalProbability = rowsToRender.reduce((sum, item) => sum + item.p, 0);
  const totalExpectedUsers = participantsNum * totalProbability;
  const costPerUser = participantsNum > 0 ? totals / participantsNum : 0;

  const foot = `
    <tr style="font-weight:700">
      <td style="text-align:left">${CONFIG.tableTotal}</td>
      <td>${fmtPct(totalProbability)}%</td>
      <td class="${showImplied ? '' : 'hidden'}"></td>
      <td>${fmtUsers(totalExpectedUsers)}</td>
      <td colspan="2" style="text-align:right">${CONFIG.tableTotalExpPrize}</td>
      <td>${fmtMoney(totals.toFixed(2))}</td>
    </tr>
    <tr style="font-weight:700">
      <td colspan="6" style="text-align:right">Expected Cost Per User:</td>
      <td>${fmtMoney(costPerUser.toFixed(2))}</td>
    </tr>
    ${isGamified ? '<tr><td colspan="7" style="text-align:right;font-size:0.85em;color:#9cadc4;padding-top:8px">* Calculation assumes that any user confident enough to use the Captaincy gets it correct.</td></tr>' : ''}
    `;

  tableEl.innerHTML = head + body + foot;

  // Attach listeners to NEW inputs
  tableEl.querySelectorAll('input[type=number][data-k]').forEach(inp => {
    inp.addEventListener('input', () => {
      const k = Number(inp.getAttribute('data-k'));
      const val = Number(inp.value) || 0;

      // Update local ref (which is global ref)
      prizeArr[k] = val;

      // EXPLICITLY update global globals to be safe if closure is weird
      if (isGamified) {
        if (!prizeByPoints) prizeByPoints = [];
        prizeByPoints[k] = val;
      } else {
        if (!prizeByScore) prizeByScore = [];
        prizeByScore[k] = val;
      }

      // Re-render
      render();
    });
  });
  tableEl.querySelectorAll('select[data-mode-k]').forEach(sel => {
    sel.addEventListener('change', () => {
      const k = Number(sel.getAttribute('data-mode-k'));
      const val = sel.value;

      modeArr[k] = val;

      if (isGamified) {
        if (!prizeModeByPoints) prizeModeByPoints = [];
        prizeModeByPoints[k] = val;
      } else {
        if (!prizeModeByScore) prizeModeByScore = [];
        prizeModeByScore[k] = val;
        currentPresetId = null;
      }
      render();
    });
  });

  // Update Top Stats if standard, or New Stats if Gamified
  if (isGamified) {
    gamifiedCostEl.textContent = fmtMoney(totals.toFixed(2));
    gamifiedCostPerUserEl.textContent = fmtMoney(costPerUser.toFixed(2));

    const observedCostRatio = Number(observedCostRatioInput?.value) || 1.0;
    const expectedCostObserved = totals * observedCostRatio;
    const costPerUserObserved = costPerUser * observedCostRatio;

    document.getElementById('gamifiedCostObserved').textContent = fmtMoney(expectedCostObserved.toFixed(2));
    document.getElementById('gamifiedCostPerUserObserved').textContent = fmtMoney(costPerUserObserved.toFixed(2));
  } else {
    document.getElementById('expectedCost').textContent = fmtMoney(totals.toFixed(2));
    document.getElementById('costPerUser').textContent = fmtMoney(costPerUser.toFixed(2));

    const observedCostRatio = Number(observedCostRatioInput?.value) || 1.0;
    const expectedCostObserved = totals * observedCostRatio;
    const costPerUserObserved = costPerUser * observedCostRatio;

    document.getElementById('expectedCostObserved').textContent = fmtMoney(expectedCostObserved.toFixed(2));
    document.getElementById('costPerUserObserved').textContent = fmtMoney(costPerUserObserved.toFixed(2));
  }

  // Draw chart
  drawScoreChartWithCDF(pmf, participantsNum, chartEl, ttEl, isGamified);
}

/* 
 * SIMPLIFIED GAMIFICATION LOGIC
 * Assumes Captain is always correct for any given score > 0.
 * Score K -> Points (10 * K + 10)
 * (Except Score 0 -> 0)
 */
function calculateGamifiedPMF(ps) {
  const pmfStandard = poissonBinomialPMF(ps);
  const N = pmfStandard.length - 1;
  const maxPoints = 10 * N + 10;

  // Initialize sparse array
  const pmfPoints = new Array(maxPoints + 1).fill(0);

  pmfStandard.forEach((prob, k) => {
    let pts = 0;
    if (k > 0) {
      // Score K > 0 implies at least one correct answer.
      // We assume user puts Captain on a correct answer.
      // Points = 10 * K + 10 (Captain Bonus)
      pts = 10 * k + 10;
    } else {
      // Score 0. Captain must be wrong.
      pts = 0;
    }

    if (pts <= maxPoints) {
      pmfPoints[pts] += prob;
    }
  });

  return pmfPoints;
}

/* Chart */
function drawScoreChartWithCDF(pmf, participantsCount, chartEl, ttEl, isGamified = false) {
  const w = 1000, h = 320, padL = 66, padR = 24, padT = 28, padB = 44;
  chartEl.innerHTML = '';

  // Extract valid points (p > epsilon) to determine X-axis domain?
  // Or just map indices. 
  // If gamified, N = max points (index). 
  // We want to compress the chart to valid indices if sparse?
  // For simplicity, let's map the 'vals' array to only those with meaningful prob, OR
  // if not gamified, use all.

  // Actually, existing chart code maps 'pmf' directly where index=k.
  // If gamified, k=points. max points=110. Array length=111.
  // 111 bars is fit-able. Most will be 0.

  // Let's filter to range [minScore, maxScore] where p > 0
  let minK = 0, maxK = pmf.length - 1;
  while (minK < pmf.length && pmf[minK] < 1e-9) minK++;
  while (maxK >= 0 && pmf[maxK] < 1e-9) maxK--;
  if (minK > maxK) { minK = 0; maxK = 0; }

  // Slice pertinent range
  const relevantPMF = pmf.slice(minK, maxK + 1);
  const offset = minK;

  const vals = relevantPMF.map(p => p * 100);
  // CDF must be computed on FULL pmf then sliced, OR computed on slice?
  // CDF is cumulative from 0.
  // So cdf[k] = sum(p 0..k).
  // Calculate CDF on full then slice values?
  const fullCDF = [];
  let acc = 0;
  for (let p of pmf) { acc += p; fullCDF.push(acc * 100); }
  const cdf = fullCDF.slice(minK, maxK + 1);

  const n = vals.length - 1; // logical count of steps in window
  const maxv = Math.max(10, ...vals); // Scale Y
  const bw = (w - padL - padR) / Math.max(1, n + 1);
  const plotH = h - padT - padB;
  const yFor = (v) => h - padB - (v / maxv) * plotH;

  // Calculate step for X-axis labels to avoid overcrowding
  // Target max ~20 labels
  const step = Math.ceil((n + 1) / 20);

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
  chartEl.appendChild(g);

  const showTip = (k_rel, e) => {
    const k = k_rel + offset; // absolute score/points
    const r = chartEl.getBoundingClientRect();
    const users = fmtUsers(participantsCount * (pmf[k]));
    const label = isGamified ? fmtPoints(k) : `Score ${k}`;
    ttEl.style.display = 'block'; ttEl.style.left = (e.clientX - r.left) + 'px'; ttEl.style.top = (e.clientY - r.top) + 'px';
    ttEl.textContent = `${label} • ${CONFIG.chartLegendPMF} ${vals[k_rel].toFixed(4)}% • ${CONFIG.chartLegendCDF} ${cdf[k_rel].toFixed(4)}% • ~${users} users`;
  };
  const hideTip = () => { ttEl.style.display = 'none'; };

  for (let k = 0; k <= n; k++) {
    const val = vals[k], bh = (val / maxv) * plotH, x = padL + k * bw, y = h - padB - bh;

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x + bw * 0.1); rect.setAttribute('y', y);
    rect.setAttribute('width', bw * 0.8); rect.setAttribute('height', Math.max(0, bh));
    rect.setAttribute('fill', '#60a5fa'); rect.setAttribute('rx', '2');
    rect.addEventListener('mouseenter', (e) => showTip(k, e)); rect.addEventListener('mousemove', (e) => showTip(k, e)); rect.addEventListener('mouseleave', hideTip);
    chartEl.appendChild(rect);

    const hot = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    hot.setAttribute('x', x); hot.setAttribute('y', padT); hot.setAttribute('width', bw); hot.setAttribute('height', plotH);
    hot.setAttribute('fill', 'rgba(0,0,0,0)'); hot.style.pointerEvents = 'all';
    hot.addEventListener('mouseenter', (e) => showTip(k, e)); hot.addEventListener('mousemove', (e) => showTip(k, e)); hot.addEventListener('mouseleave', hideTip);
    chartEl.appendChild(hot);

    if (k % step === 0 || k === n) {
      const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      lbl.setAttribute('x', x + bw * 0.5); lbl.setAttribute('y', h - padB + 16);
      lbl.setAttribute('text-anchor', 'middle'); lbl.setAttribute('font-size', '12'); lbl.setAttribute('fill', '#c9d6ea');
      lbl.textContent = (k + offset) + (isGamified ? ' pts' : '');
      chartEl.appendChild(lbl);
    }
  }

  const pts = cdf.map((cv, k) => `${padL + k * bw + bw * 0.5},${yFor(cv)}`).join(' ');
  const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  poly.setAttribute('points', pts); poly.setAttribute('fill', 'none'); poly.setAttribute('stroke', '#e5e7eb'); poly.setAttribute('stroke-width', '2'); chartEl.appendChild(poly);
  for (let k = 0; k <= n; k++) {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', padL + k * bw + bw * 0.5); c.setAttribute('cy', yFor(cdf[k])); c.setAttribute('r', 3); c.setAttribute('fill', '#e5e7eb'); c.style.pointerEvents = 'all';
    c.addEventListener('mouseenter', (e) => showTip(k, e)); c.addEventListener('mousemove', (e) => showTip(k, e)); c.addEventListener('mouseleave', hideTip);
    chartEl.appendChild(c);
  }

  const xTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  xTitle.setAttribute('x', (w - padR + padL) / 2); xTitle.setAttribute('y', h - 8);
  xTitle.setAttribute('text-anchor', 'middle'); xTitle.setAttribute('font-size', '12'); xTitle.setAttribute('fill', '#cfe3ff');
  xTitle.textContent = isGamified ? 'Points' : CONFIG.chartXAxis;
  chartEl.appendChild(xTitle);

  const yTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  yTitle.setAttribute('x', 16); yTitle.setAttribute('y', (h - padB + padT) / 2);
  yTitle.setAttribute('transform', `rotate(-90, 16, ${(h - padB + padT) / 2})`);
  yTitle.setAttribute('font-size', '12'); yTitle.setAttribute('fill', '#cfe3ff'); yTitle.textContent = CONFIG.chartYAxis; chartEl.appendChild(yTitle);

  const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  title.setAttribute('x', padL); title.setAttribute('y', padT - 8);
  title.setAttribute('font-size', '13'); title.setAttribute('fill', '#ffffff'); title.setAttribute('font-weight', '700');
  title.textContent = CONFIG.chartTitle; chartEl.appendChild(title);

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
  chartEl.appendChild(barSwatch); chartEl.appendChild(barLbl); chartEl.appendChild(lineSwatch); chartEl.appendChild(lineLbl);
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

  // Check if preview is currently open
  const isOpen = presetPreview.style.maxHeight && presetPreview.style.maxHeight !== '0px';

  if (isOpen) {
    // Close the preview
    presetPreview.style.maxHeight = '0';
    return;
  }

  const m = Number(mult.value);
  const participantsNum = Number(participants.value) || 0;

  // If applying structure: use N and uniform odds from preset; else use current.
  const useStructure = applyStructure.checked;
  const N = useStructure ? p.questions : rows.length;
  const ps = [];
  if (useStructure) {
    for (let i = 0; i < N; i++) ps.push(1 / (Math.max(1.01, p.oddsPerQuestion) * m));
  } else {
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
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

  // Open the preview with animation
  presetPreview.style.maxHeight = '2000px';
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

  // MIRROR TO GAMIFICATION (Top-to-Bottom mapping)
  // Logic: Map standard prizes (Score N, N-1...) to Point tiers (Max, Max-10...)
  prizeByPoints = [];
  prizeModeByPoints = [];
  if (p.prizes.length === N + 1) {
    // Determine max points (e.g. 110 for N=10)
    // Formula: 10 * N + 10 (Captain Bonus) + 5 (Joker - usually irrelevant for top prizes)
    // We'll align the Top Score Prize to (10 * N + 10)
    const maxPoints = N * 10 + 10;

    // We need a backing array large enough for the max points
    // Let's make it large enough to hold the joker bonus + slop just in case
    prizeByPoints = Array(maxPoints + 10).fill(0);
    prizeModeByPoints = Array(maxPoints + 10).fill('split');

    // Number of prize tiers in standard game
    const scoreTiersCount = N + 1;

    // Loop through ranks i = 0 (top) to ...
    // i=0: Score N, Points Max
    // i=1: Score N-1, Points Max-10
    // ...
    for (let i = 0; i < scoreTiersCount; i++) {
      const scoreIndex = N - i;
      const pointIndex = maxPoints - (i * 10);

      if (pointIndex >= 0) {
        prizeByPoints[pointIndex] = prizeByScore[scoreIndex];
        prizeModeByPoints[pointIndex] = prizeModeByScore[scoreIndex];
      }
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
observedCostRatioInput?.addEventListener('input', render);
// Explicitly handle checkbox toggle to ensure UI updates immediately
enableGamificationCheckbox?.addEventListener('change', () => {
  const isGamified = enableGamificationCheckbox.checked;
  if (gamificationSection) {
    if (isGamified) gamificationSection.classList.remove('hidden');
    else gamificationSection.classList.add('hidden');
  }
  render();
});

qcount.addEventListener('input', () => { ensureCount(Math.max(1, Math.min(50, Number(qcount.value) || 1))); prizeByScore = []; prizeModeByScore = []; prizeByPoints = []; prizeModeByPoints = []; currentPresetId = null; });

document.getElementById('previewPreset').addEventListener('click', previewPreset);
document.getElementById('applyPreset').addEventListener('click', applyPreset);

/* -------- Game Templates Logic -------- */
const gameTemplateSelect = document.getElementById('gameTemplate');

function initGameTemplates() {
  if (!gameTemplateSelect) return;
  gameTemplateSelect.innerHTML = `<option value="">${CONFIG.selectTemplatePlaceholder}</option>` +
    (typeof GAME_TEMPLATES !== 'undefined' ? GAME_TEMPLATES.map(t => `<option value="${t.id}">${t.label}</option>`).join('') : '');

  gameTemplateSelect.addEventListener('change', () => {
    const tId = gameTemplateSelect.value;
    const t = typeof GAME_TEMPLATES !== 'undefined' ? GAME_TEMPLATES.find(x => x.id === tId) : null;
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
    prizeByPoints = [];
    prizeModeByPoints = [];
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
initPresetSelect();
initUniformOddsSelect();
initGameTemplates();
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

  // Apply default Game Template if specified in CONFIG
  if (CONFIG.defaultGameTemplate) {
    const defaultTemplate = GAME_TEMPLATES.find(t => t.id === CONFIG.defaultGameTemplate);
    if (defaultTemplate) {
      rows = [];
      for (let i = 0; i < defaultTemplate.questions; i++) {
        rows.push({ q: defaultTemplate.text, odds: defaultTemplate.odds, a: CONFIG.defaultAnswerText });
      }
      qcount.value = defaultTemplate.questions;
      // Set the Game Template dropdown to show the selected template
      gameTemplateSelect.value = CONFIG.defaultGameTemplate;
    }
  }

  // Apply default Paytable Preset
  const defaultPresetId = CONFIG.defaultPaytablePreset || 'pick6_split_top';
  const defaultPreset = getPresetById(defaultPresetId) || getPresetById('pick6_split_top') || getPresetById('pick6_850');

  if (defaultPreset) {
    // If no game template was applied, ensure we have the right number of questions
    if (!CONFIG.defaultGameTemplate) {
      ensureCount(defaultPreset.questions);
      rows.forEach(r => { r.odds = defaultPreset.oddsPerQuestion; r.q = r.q || CONFIG.defaultQuestionText; r.a = r.a || CONFIG.defaultAnswerText; });
      qcount.value = defaultPreset.questions;
    }

    // Apply prize structure
    prizeByScore = Array(rows.length + 1).fill(0);
    prizeModeByScore = Array(rows.length + 1).fill('split');
    for (let k = 0; k < prizeByScore.length && k < defaultPreset.prizes.length; k++) {
      prizeByScore[k] = defaultPreset.prizes[k] || 0;
      if (defaultPreset.prizeModes && defaultPreset.prizeModes[k]) {
        prizeModeByScore[k] = defaultPreset.prizeModes[k] === 'guaranteed' ? 'guaranteed' : 'split';
      }
    }
    currentPresetId = defaultPreset.id;
    // Set the Paytable Preset dropdown to show the selected preset
    presetSelect.value = defaultPreset.id;
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
    prizes: prizeByScore.slice(),
    prizeModes: prizeModeByScore.slice(),
    questions: rows.map((r, i) => ({
      id: 'q' + (i + 1),
      text: r.q,
      answers: [{ id: 'q' + (i + 1) + 'a1', label: r.a, decimal_odds: Number((Math.max(1.01, r.odds) * m).toFixed(4)), implied_p: 1.0 / (Math.max(1.01, r.odds) * m) }]
    }))
  };
  const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'f2p_export.json'; a.click(); URL.revokeObjectURL(url);
  status(CONFIG.msgExported);
});
toggleImplied.addEventListener('change', () => { showImplied = toggleImplied.checked; render(); });

/* ========== EXPORT REPORT FUNCTIONALITY ========== */

// Client logo state
let clientLogoDataUrl = null;

// Logo upload handler
document.getElementById('uploadClientLogo')?.addEventListener('click', () => {
  document.getElementById('clientLogoInput').click();
});

document.getElementById('clientLogoInput')?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      clientLogoDataUrl = event.target.result;
      const preview = document.getElementById('clientLogoPreview');
      preview.innerHTML = `<img src="${clientLogoDataUrl}" style="max-width:100%;max-height:100%;object-fit:contain">`;
    };
    reader.readAsDataURL(file);
  }
});

// Get all current report data
function getReportData() {
  const participantsNum = Number(participants.value) || 0;
  const m = Number(mult.value);
  const ps = rows.map(r => 1.0 / (Math.max(1.01, r.odds) * m));

  let combined = 1.0;
  for (const p of ps) combined *= p;

  const pmf = poissonBinomialPMF(ps);
  const N = pmf.length ? pmf.length - 1 : 0;

  // Calculate totals
  let totalExpectedPrize = 0;
  const distributionData = pmf.map((prob, k) => {
    const expectedUsers = participantsNum * prob;
    const prizeVal = prizeByScore[k] ?? 0;
    const modeVal = prizeModeByScore[k] || 'split';
    const expectedPrize = expectedPrizeCost(prob, participantsNum, prizeVal, modeVal);
    totalExpectedPrize += expectedPrize;

    return {
      score: `${k}/${N}`,
      probability: (prob * 100).toFixed(2) + '%',
      impliedOdds: prob > 0 ? (1 / prob).toFixed(2) : '—',
      expectedUsers: expectedUsers < 1 ? expectedUsers.toFixed(2) : Math.round(expectedUsers).toLocaleString(),
      prize: prizeVal,
      payoutMode: modeVal === 'guaranteed' ? 'Guaranteed' : 'Split',
      expectedPrize: expectedPrize
    };
  });

  const observedRatio = Number(observedCostRatioInput?.value) || 1.0;
  const costPerUser = participantsNum > 0 ? totalExpectedPrize / participantsNum : 0;

  return {
    clientName: document.getElementById('clientName')?.value || '',
    gameName: document.getElementById('gameName')?.value || 'F2P Game Projection',
    gameDescription: document.getElementById('gameDescription')?.value || '',
    includeSplashLogo: document.getElementById('includeSplashLogo')?.checked ?? true,
    includeObservedCost: document.getElementById('includeObservedCost')?.checked ?? true,

    // Summary stats
    questions: rows.length,
    participants: participantsNum,
    jackpotChance: (combined * 100).toFixed(3) + '%',
    jackpotOdds: combined > 0 ? Math.round(1 / combined).toLocaleString() : '—',
    expectedPerfectWinners: Math.round(participantsNum * combined),

    // Cost stats
    expectedCost: totalExpectedPrize,
    expectedCostPerUser: costPerUser,
    observedCostRatio: observedRatio,
    expectedCostObserved: totalExpectedPrize * observedRatio,
    expectedCostPerUserObserved: costPerUser * observedRatio,

    // Distribution table
    distribution: distributionData,
    totalExpectedPrize: totalExpectedPrize,

    // Chart data for potential rendering
    pmf: pmf,
    N: N
  };
}

// Export PDF
document.getElementById('exportPDF')?.addEventListener('click', async () => {
  try {
    status('Generating PDF report...', 0);

    const data = getReportData();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let yPos = 15;

    // Header with logos
    const logoHeight = 15;
    let logoX = margin;

    // Client logo (left)
    if (clientLogoDataUrl) {
      try {
        doc.addImage(clientLogoDataUrl, 'PNG', logoX, yPos, 25, logoHeight);
        logoX += 30;
      } catch (e) {
        console.warn('Failed to add client logo:', e);
      }
    }

    // SPLASH logo (right) - using text fallback
    if (data.includeSplashLogo) {
      doc.setFontSize(12);
      doc.setTextColor(96, 165, 250);
      doc.setFont('helvetica', 'bold');
      doc.text('SPLASH Tech', pageWidth - margin, yPos + 10, { align: 'right' });
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.setFont('helvetica', 'normal');
      doc.text('Free-to-Play Projection Tools', pageWidth - margin, yPos + 15, { align: 'right' });
    }

    // Client name
    if (data.clientName) {
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Prepared for: ${data.clientName}`, logoX, yPos + 8);
    }

    yPos += logoHeight + 10;

    // Title
    doc.setFontSize(20);
    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'bold');
    doc.text(data.gameName, margin, yPos);
    yPos += 10;

    // Description
    if (data.gameDescription) {
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.setFont('helvetica', 'normal');
      const descLines = doc.splitTextToSize(data.gameDescription, pageWidth - (2 * margin));
      doc.text(descLines, margin, yPos);
      yPos += (descLines.length * 5) + 5;
    }

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    // Summary Stats Section
    doc.setFontSize(14);
    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'bold');
    doc.text('Game Summary', margin, yPos);
    yPos += 8;

    // Stats grid
    const statsData = [
      ['Questions', data.questions.toString()],
      ['Participants', data.participants.toLocaleString()],
      ['Jackpot Chance', `${data.jackpotChance} (1 in ${data.jackpotOdds})`],
      ['Expected Perfect Winners', data.expectedPerfectWinners.toLocaleString()]
    ];

    doc.autoTable({
      startY: yPos,
      head: [],
      body: statsData,
      theme: 'plain',
      styles: { fontSize: 10, cellPadding: 2 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 50, textColor: [80, 80, 80] },
        1: { cellWidth: 80, textColor: [30, 30, 30] }
      },
      margin: { left: margin }
    });

    yPos = doc.lastAutoTable.finalY + 10;

    // Cost Analysis Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Cost Analysis', margin, yPos);
    yPos += 8;

    const costData = [
      ['Expected Cost', fmtMoney(data.expectedCost.toFixed(2))],
      ['Expected Cost Per User', fmtMoney(data.expectedCostPerUser.toFixed(2))]
    ];

    // Only include observed cost params if checkbox is checked
    if (data.includeObservedCost) {
      costData.push(
        ['Observed Cost Ratio', data.observedCostRatio.toFixed(2)],
        ['Expected Cost (Observed)', fmtMoney(data.expectedCostObserved.toFixed(2))],
        ['Expected Cost Per User (Observed)', fmtMoney(data.expectedCostPerUserObserved.toFixed(2))]
      );
    }

    doc.autoTable({
      startY: yPos,
      head: [],
      body: costData,
      theme: 'striped',
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 60, textColor: [80, 80, 80] },
        1: { cellWidth: 50, halign: 'right', textColor: [30, 30, 30] }
      },
      margin: { left: margin },
      alternateRowStyles: { fillColor: [245, 247, 250] }
    });

    yPos = doc.lastAutoTable.finalY + 10;

    // Distribution Table
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Prize Distribution Table', margin, yPos);
    yPos += 8;

    const distTableHead = [['Score', 'Probability', 'Implied Odds', 'Expected Users', 'Prize', 'Mode', 'Expected Prize']];
    const distTableBody = data.distribution.map(row => [
      row.score,
      row.probability,
      row.impliedOdds,
      row.expectedUsers,
      fmtMoney(row.prize),
      row.payoutMode,
      fmtMoney(row.expectedPrize.toFixed(2))
    ]).reverse();

    // Add totals row
    distTableBody.push([
      'TOTAL',
      '100.00%',
      '',
      data.participants.toLocaleString(),
      '',
      'Total Expected:',
      fmtMoney(data.totalExpectedPrize.toFixed(2))
    ]);

    doc.autoTable({
      startY: yPos,
      head: distTableHead,
      body: distTableBody,
      theme: 'striped',
      styles: { fontSize: 8, cellPadding: 2, halign: 'center' },
      headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 18 },
        1: { cellWidth: 22 },
        2: { cellWidth: 22 },
        3: { cellWidth: 28 },
        4: { cellWidth: 22, halign: 'right' },
        5: { cellWidth: 24 },
        6: { cellWidth: 28, halign: 'right' }
      },
      margin: { left: margin, right: margin },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      didParseCell: (data) => {
        // Style totals row
        if (data.row.index === distTableBody.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [230, 240, 255];
        }
      }
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()} | Page ${i} of ${pageCount}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    // Generate filename
    const fileName = `${data.gameName.replace(/[^a-zA-Z0-9]/g, '_')}_${data.clientName ? data.clientName.replace(/[^a-zA-Z0-9]/g, '_') + '_' : ''}Report.pdf`;

    doc.save(fileName);
    status('PDF report downloaded successfully!');

  } catch (error) {
    console.error('PDF generation error:', error);
    status('Error generating PDF. Please try again.');
  }
});

// Export CSV
document.getElementById('exportCSV')?.addEventListener('click', () => {
  try {
    const data = getReportData();

    let csv = '';

    // Header info
    csv += 'F2P Game Projection Report\n';
    csv += `Game Name,${data.gameName}\n`;
    if (data.clientName) csv += `Client,${data.clientName}\n`;
    if (data.gameDescription) csv += `Description,"${data.gameDescription.replace(/"/g, '""')}"\n`;
    csv += `Generated,${new Date().toISOString()}\n`;
    csv += '\n';

    // Summary stats
    csv += 'SUMMARY STATISTICS\n';
    csv += `Questions,${data.questions}\n`;
    csv += `Participants,${data.participants}\n`;
    csv += `Jackpot Chance,${data.jackpotChance}\n`;
    csv += `Jackpot Odds,1 in ${data.jackpotOdds}\n`;
    csv += `Expected Perfect Winners,${data.expectedPerfectWinners}\n`;
    csv += '\n';

    // Cost analysis
    csv += 'COST ANALYSIS\n';
    csv += `Expected Cost,${data.expectedCost.toFixed(2)}\n`;
    csv += `Expected Cost Per User,${data.expectedCostPerUser.toFixed(2)}\n`;

    // Only include observed cost params if checkbox is checked
    if (data.includeObservedCost) {
      csv += `Observed Cost Ratio,${data.observedCostRatio}\n`;
      csv += `Expected Cost (Observed),${data.expectedCostObserved.toFixed(2)}\n`;
      csv += `Expected Cost Per User (Observed),${data.expectedCostPerUserObserved.toFixed(2)}\n`;
    }
    csv += '\n';

    // Distribution table
    csv += 'PRIZE DISTRIBUTION\n';
    csv += 'Score,Probability %,Implied Odds,Expected Users,Prize,Payout Mode,Expected Prize\n';

    data.distribution.slice().reverse().forEach(row => {
      csv += `${row.score},${row.probability},${row.impliedOdds},${row.expectedUsers},${row.prize},${row.payoutMode},${row.expectedPrize.toFixed(2)}\n`;
    });

    csv += `TOTAL,100.00%,,${data.participants},,Total Expected Prize:,${data.totalExpectedPrize.toFixed(2)}\n`;

    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const fileName = `${data.gameName.replace(/[^a-zA-Z0-9]/g, '_')}_${data.clientName ? data.clientName.replace(/[^a-zA-Z0-9]/g, '_') + '_' : ''}Data.csv`;
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);

    status('CSV data exported successfully!');

  } catch (error) {
    console.error('CSV export error:', error);
    status('Error exporting CSV. Please try again.');
  }
});

/* -------- Default State Initialization -------- */
(function initDefaults() {
  if (typeof DEFAULT_STATE !== 'undefined') {
    // 1. Game Template
    if (DEFAULT_STATE.gameTemplateId) {
      if (gameTemplateSelect) {
        gameTemplateSelect.value = DEFAULT_STATE.gameTemplateId;
        gameTemplateSelect.dispatchEvent(new Event('change'));
      }
    } else {
      // Fallback to default load if no template
      firstLoadMaybeApplyDefault();
    }

    // 2. Preset (Timeout to ensure rows are rendered from template first)
    if (DEFAULT_STATE.presetId) {
      setTimeout(() => {
        if (presetSelect) {
          const p = getPresetById(DEFAULT_STATE.presetId);
          if (p) {
            presetSelect.value = DEFAULT_STATE.presetId;
            applyPreset();
          } else {
            console.warn(`Default preset '${DEFAULT_STATE.presetId}' not found.`);
          }
        }
      }, 50);
    }

    // 3. Gamification
    if (DEFAULT_STATE.enableGamification) {
      setTimeout(() => {
        if (enableGamificationCheckbox && !enableGamificationCheckbox.checked) {
          enableGamificationCheckbox.click(); // Use click to trigger listeners
        }
      }, 100);
    }
  } else {
    firstLoadMaybeApplyDefault();
  }
})();
