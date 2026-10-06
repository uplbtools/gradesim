// planner.js - curriculum map and course planner.
// Framework free. Talks to the browser only through `store` below, so the same
// file can run on a plain web page (gradesim.uplb.tools) with localStorage.
// Depends on globals from components.js, curriculum.js, catalog.js and
// scheduler.js. Every piece of UI is built with the components.js helpers.

/* ---------- Storage adapter ---------- */

const store = {
  async get(keys) {
    if (globalThis.chrome && chrome.storage && chrome.storage.local) return chrome.storage.local.get(keys);
    const out = {};
    keys.forEach(k => {
      try {
        const v = localStorage.getItem(`gradesim:${k}`);
        if (v != null) out[k] = JSON.parse(v);
      } catch (e) { /* private mode or bad JSON: treat as unset */ }
    });
    return out;
  },
  async set(obj) {
    if (globalThis.chrome && chrome.storage && chrome.storage.local) return chrome.storage.local.set(obj);
    Object.entries(obj).forEach(([k, v]) => {
      try { localStorage.setItem(`gradesim:${k}`, JSON.stringify(v)); } catch (e) { /* ignore */ }
    });
  },
};

const $ = id => document.getElementById(id);

/* ---------- Terms ---------- */

// Absolute term number: academic year start * 3 + (0 = 1st sem, 1 = 2nd, 2 = midyear).
const SEMS = ['1', '2', 'midyear'];
const semOfAbs = abs => SEMS[abs % 3];
function absLabel(abs) {
  const ay = Math.floor(abs / 3);
  const s = abs % 3;
  if (s === 0) return `1st sem ${ay}`;
  if (s === 1) return `2nd sem ${ay + 1}`;
  return `Midyear ${ay + 1}`;
}
const ayLabel = abs => {
  const ay = Math.floor(abs / 3);
  return `AY ${ay}-${String(ay + 1).slice(2)}`;
};

// amisTermToAbs, gradeResult and the requirement slots come from requirements.js.

// ponytail: month heuristic for the current term (Aug-Dec 1st, Jan-May 2nd,
// Jun-Jul midyear). Only used when AMIS grades are older than the calendar.
function calendarAbs(now = new Date()) {
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  if (m >= 8) return y * 3;
  if (m <= 5) return (y - 1) * 3 + 1;
  return (y - 1) * 3 + 2;
}

/* ---------- State ---------- */

const state = {
  data: {},
  program: null,
  courses: [],
  byCode: new Map(),
  graph: null,
  whatif: null,      // { code, mode }
  selected: null,
  hover: null,
  view: null,        // last compute() result
};

document.addEventListener('DOMContentLoaded', init);

async function init() {
  hydrateIcons();
  state.data = await store.get(['gradesData', 'selectedProgram', 'substitutions', 'customCourseStatus',
    'plannerPins', 'plannerPetitions', 'plannerOptions', 'theme', 'selectedTracks', 'selectedSpecializations']);
  const d = state.data;
  d.customCourseStatus = d.customCourseStatus || {};
  d.substitutions = d.substitutions || {};
  d.plannerPins = d.plannerPins || {};
  d.plannerPetitions = d.plannerPetitions || {};
  themeToggle($('themeToggle'), d.theme, next => {
    store.set({ theme: next });
    requestAnimationFrame(() => drawEdges());
  });

  const programCode = d.selectedProgram;
  state.program = typeof UPLB_PROGRAMS !== 'undefined' ? UPLB_PROGRAMS[programCode] : null;
  if (!state.program || !state.program.majorCourses) {
    $('gradTerm').textContent = 'Pick your program in the extension popup first.';
    document.body.classList.add('pl-no-program');
    return;
  }
  const catalog = typeof UPLB_CATALOG !== 'undefined' ? UPLB_CATALOG : {};
  // An SP or thesis course on AMIS (passed, failed, or being taken now) wins;
  // otherwise the track picked in the popup, otherwise the program default.
  const amisRows = Object.values((d.gradesData && d.gradesData.student_grades) || {})
    .flatMap(t => (t && t.values) || [])
    .map(v => ({ code: v.course && v.course.course_code, grade: v.grade }))
    .filter(r => r.code);
  state.track = detectTrack(amisRows, state.program) ||
    resolveTrack(state.program, (d.selectedTracks || {})[programCode]);
  d.selectedSpecializations = d.selectedSpecializations || {};
  loadCourses();
  // 18 units a sem unless the student picks 21 in Plan options.
  d.plannerOptions = { cap: 18, midyear: false, midyear9: false, ...(d.plannerOptions || {}) };

  const quality = getProgramDataQuality(programCode, catalog);
  $('plannerBanner').replaceChildren(...flat([
    !quality.confident && notice({ tone: 'warn', icon: 'alert', title: 'Treat this plan as a rough guide', body: quality.reasons.join(' ') }),
    !(d.gradesData && d.gradesData.student_grades) && notice({
      tone: 'info', icon: 'info',
      body: 'No grades loaded yet. Log in to AMIS, open the extension and press Refresh so your passed courses count. Until then this plan starts from scratch.',
    }),
  ]));

  initControls();
  render();
  window.addEventListener('resize', () => { drawEdges(); updateScrollHint(); });
  $('plannerScroll').addEventListener('scroll', updateScrollHint, { passive: true });

  // The popup's "See what this costs" link opens planner.html?whatif=CODE.
  const prefill = normCode(new URLSearchParams(location.search).get('whatif') || '');
  if (prefill && state.byCode.has(prefill)) {
    $('whatifMode').value = 'fail';
    $('whatifCourse').value = prefill;
    if ($('whatifCourse').value === prefill) simulate();
  }
}

// The chosen specialization key for this program, or null.
function specKey() {
  const key = state.data.selectedSpecializations[state.program.code];
  return state.program.specializations && state.program.specializations[key] ? key : null;
}

// Course list for the program, track and specialization, and the byline.
function loadCourses() {
  const p = state.program;
  const catalog = typeof UPLB_CATALOG !== 'undefined' ? UPLB_CATALOG : {};
  const spec = specKey();
  state.courses = plannerCourseList(p, state.track, catalog, spec);
  state.byCode = new Map(state.courses.map(c => [c.code, c]));
  state.graph = analyzeGraph(state.courses);
  const trackInfo = state.track && p.tracks[state.track];
  $('plannerProgram').textContent = [p.name || p.code, trackInfo && `${trackInfo.name} (${trackInfo.code})`,
    spec && p.specializations[spec].name].filter(Boolean).join(', ');
}

function save(keys) {
  const obj = {};
  keys.forEach(k => { obj[k] = state.data[k]; });
  store.set(obj);
}

/* ---------- AMIS history ---------- */

// Map AMIS attempts onto curriculum codes, with the term each happened in.
function readHistory() {
  const sg = (state.data.gradesData && state.data.gradesData.student_grades) || {};
  const keys = Object.keys(sg);
  const attempts = [];
  keys.forEach((key, i) => {
    const termData = sg[key];
    if (!termData || !termData.values) return;
    // Real ids map to calendar terms; anything else keeps its order.
    const abs = amisTermToAbs(key);
    termData.values.forEach(v => {
      const code = normCode(v.course && v.course.course_code);
      if (!code) return;
      attempts.push({ code, title: (v.course && v.course.title) || '', units: parseFloat(v.unit_taken) || 0,
        result: gradeResult(v.grade), abs: abs != null ? abs : null, order: i });
    });
  });
  // Unknown ids: lay them out as consecutive regular sems ending last term.
  if (attempts.some(a => a.abs == null)) {
    const orders = Array.from(new Set(attempts.map(a => a.order))).sort((a, b) => a - b);
    let abs = calendarAbs() - 1;
    const absOf = {};
    for (let i = orders.length - 1; i >= 0; i--) {
      if (abs % 3 === 2) abs--;
      absOf[orders[i]] = abs--;
    }
    attempts.forEach(a => { if (a.abs == null) a.abs = absOf[a.order]; });
  }
  const latestAbs = attempts.length ? Math.max(...attempts.map(a => a.abs)) : null;
  attempts.forEach(a => {
    if (a.result === 'nograde') a.result = a.abs === latestAbs ? 'inprogress' : 'other';
  });
  attempts.sort((a, b) => a.abs - b.abs);

  // Curriculum code -> attempts, including GE/HK/NSTP slots and substitutions.
  const byCurr = {};
  const push = (code, a) => { (byCurr[code] = byCurr[code] || []).push(a); };
  attempts.forEach(a => { if (state.byCode.has(a.code)) push(a.code, a); });

  // GE, HK, NSTP and free elective slots, and substitutions, filled the same
  // way the popup What if tab counts them.
  const doneOrNow = attempts.filter(a => a.result === 'passed' || a.result === 'inprogress');
  fillRequirementSlots(state.courses, doneOrNow, state.data.substitutions).forEach((a, slot) => {
    if (a.code !== slot && state.byCode.has(slot)) push(slot, { ...a, via: a.code });
  });

  return { attempts, byCurr, latestAbs, passedOutside: new Set(doneOrNow.map(a => a.code)) };
}

/* ---------- Planning ---------- */

function compute() {
  const d = state.data;
  const opts = d.plannerOptions;
  const hist = readHistory();
  const startAbs = Math.max(hist.latestAbs != null ? hist.latestAbs + 1 : 0, calendarAbs());

  // Per course: what AMIS says, then any manual override.
  const info = {};
  state.courses.forEach(c => {
    const tries = hist.byCurr[c.code] || [];
    const last = tries[tries.length - 1];
    let auto = 'todo';
    if (tries.some(a => a.result === 'passed')) auto = 'passed';
    else if (last && last.result === 'inprogress') auto = 'inprogress';
    else if (tries.some(a => a.result === 'failed')) auto = 'failed';
    const override = d.customCourseStatus[c.code];
    const status = override === 'planned' ? 'todo' : (override || auto);
    info[c.code] = { tries, auto, override, status };
  });

  const passed = new Set(hist.passedOutside);
  state.courses.forEach(c => {
    const st = info[c.code].status;
    if (st === 'passed' || st === 'inprogress') passed.add(c.code);
    else passed.delete(c.code);
  });

  // Failures: past ones (an AMIS attempt or the course being taken now) just
  // aren't passed; future ones (marked on a course not yet taken, or the
  // what-if) are taken in their planned term, failed, and retaken later.
  const failures = [];
  state.courses.forEach(c => {
    const i = info[c.code];
    if (i.status !== 'failed') return;
    failures.push({ code: c.code, past: i.tries.length > 0, source: i.override ? 'marked' : 'amis' });
  });
  const wi = state.whatif;
  if (wi && !passed.has(wi.code) && !failures.some(f => f.code === wi.code)) {
    if (wi.mode === 'fail') failures.push({ code: wi.code, past: false, source: 'whatif' });
  }

  const unitCaps = { '1': Number(opts.cap), '2': Number(opts.cap), 'midyear': opts.midyear9 ? 9 : 6 };
  const baseOpts = {
    courses: state.courses.map(c => ({ ...c, petition: !!d.plannerPetitions[c.code] })),
    startSem: semOfAbs(startAbs),
    unitCaps,
    useMidyear: !!opts.midyear,
    totalUnits: Number(state.program.totalUnitsRequired) || undefined,
  };
  const pinNotBefore = {};
  Object.entries(d.plannerPins).forEach(([code, abs]) => {
    if (abs > startAbs) pinNotBefore[code] = abs - startAbs;
  });

  // Run with a subset of failures in effect.
  function run(active, applyDelay = true) {
    const p = new Set(passed);
    failures.forEach(f => { if (f.past && !active.includes(f)) p.add(f.code); });
    const notBefore = { ...pinNotBefore };
    const reserved = {};
    const attemptAt = {};
    const future = failures.filter(f => !f.past && active.includes(f));
    if (future.length) {
      const clean = scheduleEarliest({ ...baseOpts, passed: p, notBefore });
      future.forEach(f => {
        const t = clean.assignedTerm[f.code];
        if (t === undefined) return;
        attemptAt[f.code] = t;
        notBefore[f.code] = Math.max(notBefore[f.code] || 0, t + 1);
        reserved[t] = (reserved[t] || 0) + (Number(state.byCode.get(f.code).units) || 3);
      });
    }
    if (applyDelay && wi && wi.mode !== 'fail') {
      const clean = scheduleEarliest({ ...baseOpts, passed: p, notBefore });
      const t = clean.assignedTerm[wi.code];
      if (t !== undefined) notBefore[wi.code] = Math.max(notBefore[wi.code] || 0, t + Number(wi.mode));
    }
    const runOpts = { ...baseOpts, passed: p, notBefore, reserved };
    return { result: scheduleEarliest(runOpts), runOpts, attemptAt, passed: p };
  }

  const now = run(failures);
  const ideal = failures.length ? run([]) : now;
  const costs = failures.map(f => {
    const without = run(failures.filter(x => x !== f));
    return { ...f, costT: [without.result.gradTermIndex, now.result.gradTermIndex] };
  });
  // Baseline with the what-if removed, for the "what changed" message.
  const noWhatif = wi ? run(failures.filter(f => f.source !== 'whatif'), false) : null;
  const slips = computeSlips(now.runOpts, now.result);
  // Same count as the popup What if tab: passed AMIS courses plus manual marks.
  const left = remainingRequirements(state.courses, hist.attempts.filter(a => a.result === 'passed'),
    { substitutions: d.substitutions, overrides: d.customCourseStatus });

  return { hist, info, startAbs, passed: now.passed, failures, costs, now, ideal, noWhatif, slips, unitCaps, left };
}

/* ---------- Summary ---------- */

// "N terms later" counted in terms the student would attend: midyears count
// only when the plan uses them.
function termsLate(v, fromT, toT) {
  let n = 0;
  for (let t = fromT + 1; t <= toT; t++) {
    if ((v.startAbs + t) % 3 !== 2 || state.data.plannerOptions.midyear) n++;
  }
  return n;
}
const termsText = n => `${n} term${n === 1 ? '' : 's'}`;

function renderSummary(v) {
  const r = v.now.result;
  const gradAbs = r.gradTermIndex >= 0 ? v.startAbs + r.gradTermIndex : null;
  $('gradTerm').textContent = gradAbs == null
    ? (r.unschedulable.length ? 'Some courses cannot be placed' : 'All planned requirements done')
    : `Graduate ${absLabel(gradAbs)}`;

  const delta = termsLate(v, v.ideal.result.gradTermIndex, r.gradTermIndex);
  v.costs.forEach(c => { c.cost = termsLate(v, c.costT[0], c.costT[1]); });
  const deltaEl = $('gradDelta');
  if (v.failures.length && delta > 0) {
    const culprits = v.costs.filter(c => c.cost > 0);
    const one = culprits.length === 1 ? culprits[0] : v.failures.length === 1 ? v.failures[0] : null;
    const why = one
      ? `because ${one.code} ${one.source === 'whatif' ? 'is failed in this what-if' : 'failed'}`
      : `because of ${v.failures.length} failed courses`;
    deltaEl.replaceChildren(icon('alert'), `${termsText(delta)} later ${why}`);
  } else if (v.failures.length) {
    deltaEl.replaceChildren(icon('check'), `No delay from ${v.failures.length === 1 ? v.failures[0].code : 'your failed courses'}`);
    deltaEl.classList.add('ok');
  } else {
    deltaEl.textContent = '';
  }
  if (!(v.failures.length && delta <= 0)) deltaEl.classList.remove('ok');

  const termsLeft = r.plan.filter(p => p.courses.length).length;
  const nowTaking = Object.values(v.info).some(i => i.status === 'inprogress');
  const sentences = [];
  if (gradAbs != null) sentences.push(`That is ${ayLabel(gradAbs)}, with ${termsText(termsLeft)} of classes from ${absLabel(v.startAbs)}.`);
  sentences.push(`You have ${unitsText(v.left.units)} left to pass${nowTaking ? ', counting this term' : ''}.`);
  sentences.push(`The plan takes up to ${v.unitCaps['1']} units a sem and ${state.data.plannerOptions.midyear ? `up to ${v.unitCaps.midyear} in midyear` : 'midyear only where the checklist puts it'}.`);
  $('gradSub').textContent = sentences.join(' ');

  const list = $('failCosts');
  const showCosts = v.costs.length > 1 || (v.costs.length === 1 && v.costs[0].source !== 'whatif');
  list.replaceChildren(...(showCosts ? v.costs.map(c => h('li', { class: c.cost > 0 ? 'bad' : '' },
    icon(c.cost > 0 ? 'x' : 'check'),
    h('strong', {}, c.code),
    ` ${c.source === 'whatif' ? 'in the what-if' : c.past ? 'failed' : 'marked failed'}, ${c.cost > 0 ? `${termsText(c.cost)} later` : 'no delay'}`)) : []));
}

/* ---------- Cards and columns ---------- */

function offeringLabel(c) {
  const o1 = offeredIn(c, '1');
  const o2 = offeredIn(c, '2');
  const om = c.offered ? c.offered[3] > 0 : c.sem === 'midyear';
  let base = o1 && o2 ? 'Any sem' : o1 ? '1st only' : o2 ? '2nd only' : om ? 'Midyear' : 'Not seen';
  if (om && (o1 || o2)) base += ' + mid';
  return base;
}

function restricted(c) {
  return !(offeredIn(c, '1') && offeredIn(c, '2'));
}

// Nearest failed course upstream of `code`, if any.
function waitingOn(code, v) {
  const failed = new Set(v.failures.map(f => f.code));
  const anc = state.graph.ancestors(code);
  for (const f of failed) if (anc.has(f) && !v.passed.has(f)) return f;
  return null;
}

function buildColumns(v) {
  const cols = new Map();
  const col = abs => {
    if (!cols.has(abs)) cols.set(abs, { abs, cards: [] });
    return cols.get(abs);
  };
  const primary = {};
  const r = v.now.result;

  state.courses.forEach(c => {
    const i = v.info[c.code];
    // History: every AMIS attempt shows in its term.
    i.tries.forEach((a, k) => {
      const isLast = k === i.tries.length - 1;
      let st = a.result === 'passed' ? 'passed' : a.result === 'inprogress' ? 'inprogress' : a.result === 'failed' ? 'failed' : null;
      if (!st) return;
      if (isLast && i.override) st = i.override === 'planned' ? null : i.override;
      if (!st) return;
      const card = { code: c.code, status: st, via: a.via, history: !isLast };
      col(a.abs).cards.push(card);
      if (isLast && st !== 'failed') primary[c.code] = card;
    });
    // Marked passed with no AMIS record: credited column.
    if (!i.tries.length && i.status === 'passed') {
      const card = { code: c.code, status: 'passed', credited: true };
      col(-1).cards.push(card);
      primary[c.code] = card;
    }
    // Future failure: the failed attempt in its planned term.
    if (v.now.attemptAt[c.code] !== undefined) {
      col(v.startAbs + v.now.attemptAt[c.code]).cards.push({ code: c.code, status: 'failed', hypothetical: true });
    }
    const t = r.assignedTerm[c.code];
    if (t !== undefined) {
      const wait = waitingOn(c.code, v);
      const isRetake = v.failures.some(f => f.code === c.code);
      let st = isRetake ? 'retake' : wait ? 'locked' : 'planned';
      if (st === 'planned' && preGroups(c).every(g => g.some(x => v.passed.has(x) || !state.byCode.has(x)))) st = 'ready';
      const card = { code: c.code, status: st, waitingOn: wait, conditional: !!r.conditional[c.code], pinned: state.data.plannerPins[c.code] != null };
      col(v.startAbs + t).cards.push(card);
      primary[c.code] = card;
    }
  });
  r.unschedulable.forEach(code => {
    const card = { code, status: 'locked', unplaceable: true };
    col(Infinity).cards.push(card);
    primary[code] = card;
  });

  // Future regular sems stay visible even if empty (waiting on an offering);
  // empty midyears are dropped.
  const gradAbs = r.gradTermIndex >= 0 ? v.startAbs + r.gradTermIndex : v.startAbs - 1;
  for (let abs = v.startAbs; abs <= gradAbs; abs++) if (abs % 3 !== 2) col(abs);

  const list = Array.from(cols.values()).sort((a, b) => a.abs - b.abs);
  orderColumns(list, primary);
  return { list, primary };
}

// Barycenter sweeps: order each column by the mean row of a card's
// prerequisites (left to right), then of its dependents (right to left).
// ponytail: plain barycenter, no crossing count; d3-dag if this looks bad.
function orderColumns(list, primary) {
  const delay = state.graph.delay;
  list.forEach(c => c.cards.sort((a, b) => (delay[b.code] || 0) - (delay[a.code] || 0) || a.code.localeCompare(b.code)));
  const rowOf = () => {
    const pos = {};
    list.forEach(c => c.cards.forEach((card, i) => { if (primary[card.code] === card) pos[card.code] = i; }));
    return pos;
  };
  const preds = code => preGroups(state.byCode.get(code)).flat();
  const succs = code => state.graph.edges.filter(e => e.from === code).map(e => e.to);
  for (let pass = 0; pass < 4; pass++) {
    const forward = pass % 2 === 0;
    const order = forward ? list : [...list].reverse();
    order.forEach(column => {
      const pos = rowOf();
      const key = new Map();
      column.cards.forEach((card, i) => {
        const nb = (forward ? preds(card.code) : succs(card.code)).filter(x => pos[x] !== undefined);
        key.set(card, nb.length ? nb.reduce((s, x) => s + pos[x], 0) / nb.length : i);
      });
      column.cards.sort((a, b) => key.get(a) - key.get(b));
    });
  }
}

function courseCard(card, v) {
  const c = state.byCode.get(card.code);
  const slip = v.slips[card.code];
  // Free elective cards are placeholders for any course, so never critical.
  const crit = !card.history && slip > 0 && c.genericRequirement !== 'elective' && !['passed', 'inprogress', 'failed'].includes(card.status);
  const classes = ['pl-card', `st-${card.status}`];
  if (crit) classes.push('crit');
  if (card.history || card.hypothetical) classes.push('history');
  let extra = null;
  if (card.waitingOn) extra = h('span', { class: 'pl-note' }, icon('lock'), `Waiting on ${card.waitingOn}`);
  else if (card.conditional) extra = h('span', { class: 'pl-note warn' }, icon('flag'), 'Petition needed');
  else if (card.unplaceable) extra = h('span', { class: 'pl-note warn' }, icon('alert'), "Can't place");
  else if (card.via && card.via !== card.code) extra = h('span', { class: 'pl-note' }, `via ${card.via}`);
  else if (card.hypothetical) extra = h('span', { class: 'pl-note' }, 'If failed here');
  const statusLabel = COURSE_STATUS[card.status][1];
  const aria = `${c.code}, ${c.title}. ${statusLabel}${crit ? ', critical' : ''}. ${unitsText(c.units)}, ${offeringLabel(c)}.${card.waitingOn ? ` Waiting on ${card.waitingOn}.` : ''}`;
  return h('div', {
    class: classes.join(' '), role: 'button', tabindex: '0', 'aria-label': aria,
    dataset: { code: card.code, ...(v.primary[card.code] === card ? { primary: '1' } : {}) },
  },
  h('span', { class: 'pl-card-top' }, statusPill(card.status, { variant: 'plain' }), unitsBadge(c.units)),
  h('span', { class: 'pl-code' }, c.code, card.pinned && h('span', { class: 'pl-pin', title: 'Moved later by you' }, ' *')),
  h('span', { class: 'pl-title' }, c.title),
  extra,
  h('span', { class: 'pl-card-foot' }, h('span', { class: 'pl-offer' }, offeringLabel(c)), crit && h('span', { class: 'pl-crit' }, 'Critical')));
}

function semesterColumn(column, v, phone) {
  const isPast = column.abs < v.startAbs;
  let name;
  let sub;
  if (column.abs === -1) { name = 'Credited'; sub = 'No AMIS term'; }
  else if (column.abs === Infinity) { name = "Can't place"; sub = 'Check prerequisites'; }
  else { name = absLabel(column.abs).replace(/ \d+$/, ''); sub = ayLabel(column.abs); }

  const units = column.cards.reduce((s, c) => s + (Number(state.byCode.get(c.code).units) || 0), 0);
  const isMid = column.abs % 3 === 2;
  let warn = '';
  if (!isPast && Number.isFinite(column.abs) && column.abs >= 0) {
    if (isMid && units > 6) warn = "Over 6 units in midyear needs the Dean's approval (max 9).";
    else if (!isMid && units > v.unitCaps['1']) warn = `Over your ${v.unitCaps['1']}-unit cap, so it needs an overload approval.`;
    else if (!isMid && units > 18) warn = 'Over 18 units, which is allowed up to 21 when the term has lab courses.';
  }
  const loud = warn && (isMid || units > v.unitCaps['1']);
  const nowTerm = column.cards.some(c => c.status === 'inprogress');
  const tag = column.abs === v.startAbs ? badge('Next', { tone: 'strong' })
    : nowTerm ? badge('Now', { tone: 'info' })
    : isPast && column.abs >= 0 ? badge('Taken') : null;
  return h('section', { class: `pl-col${isPast ? ' past' : ''}`, dataset: { abs: column.abs } },
    h('details', { open: !(phone && isPast) },
      h('summary', { class: 'pl-col-head' },
        h('span', { class: 'pl-col-name' }, name, tag),
        h('span', { class: 'pl-col-sub' }, sub,
          h('span', { class: `pl-col-units${loud ? ' warn' : ''}`, title: warn || null }, loud && icon('alert'), unitsText(units))),
        warn && h('span', { class: 'visually-hidden' }, warn)),
      h('div', { class: 'pl-cards' },
        column.cards.length ? column.cards.map(card => courseCard(card, v)) : emptyState('Nothing offered that fits'))));
}

const isPhone = () => window.matchMedia('(max-width: 719px)').matches;

function render() {
  const v = compute();
  state.view = v;
  renderSummary(v);
  fillWhatifSelect(v);
  const { list, primary } = buildColumns(v);
  v.primary = primary;
  v.columns = list;
  const phone = isPhone();
  document.querySelector('.pl-main').appendChild($('detail')); // may sit inside the grid on phones
  $('plannerGrid').replaceChildren(...list.map(c => semesterColumn(c, v, phone)));
  if (state.selected && !state.byCode.has(state.selected)) state.selected = null;
  renderDetail();
  requestAnimationFrame(() => { drawEdges(); updateScrollHint(); });
}

// When terms run past the right edge, say how many and offer a jump there.
function updateScrollHint() {
  const sc = $('plannerScroll');
  const right = sc.getBoundingClientRect().right;
  const hiddenCols = isPhone() ? 0 : Array.from(sc.querySelectorAll('.pl-col'))
    .filter(col => col.getBoundingClientRect().right > right + 1).length;
  $('scrollHint').replaceChildren(hiddenCols ? button({
    variant: 'chip', icon: 'next', text: `${plural(hiddenCols, 'more term')} to the right`,
    onclick: () => { sc.scrollLeft = sc.scrollWidth; },
  }) : '');
}

/* ---------- Edges and focus ---------- */

function chainOf(code) {
  const anc = state.graph.ancestors(code);
  const desc = state.graph.descendants(code);
  return { anc, desc, all: new Set([code, ...anc, ...desc]) };
}

function drawEdges() {
  const svg = $('plannerArrows');
  const grid = $('plannerGrid');
  const v = state.view;
  svg.replaceChildren();
  document.querySelectorAll('.pl-card.dim, .pl-card.chain, .pl-card.focus').forEach(el => el.classList.remove('dim', 'chain', 'focus'));
  if (!v) return;

  const focus = state.hover || state.selected;
  const chain = focus ? chainOf(focus) : null;
  if (chain) {
    grid.querySelectorAll('.pl-card').forEach(el => {
      const code = el.dataset.code;
      el.classList.add(code === focus && el.dataset.primary ? 'focus' : chain.all.has(code) ? 'chain' : 'dim');
    });
  }
  if (isPhone()) return;

  const gridRect = grid.getBoundingClientRect();
  svg.setAttribute('width', grid.scrollWidth);
  svg.setAttribute('height', grid.scrollHeight);
  const nodeOf = code => grid.querySelector(`.pl-card[data-primary][data-code="${CSS.escape(code)}"]`);
  const crit = code => v.slips[code] > 0 && state.byCode.get(code).genericRequirement !== 'elective';
  const paths = [];

  // Arrows travel the lattice lanes (see .pl-grid in planner.css): out of the
  // prerequisite into the column gap beside it, along the row gap next to the
  // target's row across any semesters in between, down the column gap before
  // the target, then in. Cards share one height, so row gaps line up across
  // columns and an arrow never passes under a card. Arrows sharing a gap get
  // their own lane, four per gap, so they do not merge into one line.
  const css = getComputedStyle(grid);
  const colGap = parseFloat(css.getPropertyValue('--pl-col-gap')) || 32;
  const rowGap = parseFloat(css.getPropertyValue('--pl-row-gap')) || 16;
  const used = new Map();
  const lane = (key, center, gap) => {
    const n = used.get(key) || 0;
    used.set(key, n + 1);
    return center + ((n % 4) - 1.5) * (gap / 5);
  };
  // Orthogonal polyline with rounded corners.
  function polyline(pts) {
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const [px, py] = pts[i - 1];
      const [cx, cy] = pts[i];
      const [nx, ny] = pts[i + 1];
      const r = Math.min(6, Math.hypot(cx - px, cy - py) / 2, Math.hypot(nx - cx, ny - cy) / 2);
      const ix = cx - Math.sign(cx - px) * r;
      const iy = cy - Math.sign(cy - py) * r;
      const ox = cx + Math.sign(nx - cx) * r;
      const oy = cy + Math.sign(ny - cy) * r;
      d += ` L ${ix} ${iy} Q ${cx} ${cy} ${ox} ${oy}`;
    }
    const [lx, ly] = pts[pts.length - 1];
    return `${d} L ${lx} ${ly}`;
  }
  function routeEdge(x1, y1, x2, y2, ra, rb) {
    const end = x2 - 4;
    const gxS = ra.right - gridRect.left + colGap / 2;
    const gxT = rb.left - gridRect.left - colGap / 2;
    if (gxT - gxS < colGap) { // neighbouring semesters: one column gap
      const gx = lane(`c${Math.round(gxS)}`, gxS, colGap);
      return Math.abs(y2 - y1) < 1 ? `M ${x1} ${y1} L ${end} ${y2}`
        : polyline([[x1, y1], [gx, y1], [gx, y2], [end, y2]]);
    }
    const rowY = y1 <= y2 ? rb.top - rowGap / 2 : rb.bottom + rowGap / 2;
    const ly = lane(`r${Math.round(rowY)}`, rowY - gridRect.top, rowGap);
    const a = lane(`c${Math.round(gxS)}`, gxS, colGap);
    const b = lane(`c${Math.round(gxT)}`, gxT, colGap);
    return polyline([[x1, y1], [a, y1], [a, ly], [b, ly], [b, y2], [end, y2]]);
  }
  state.graph.edges.forEach(({ from, to }) => {
    let kind = null;
    if (chain) {
      const up = (to === focus || chain.anc.has(to)) && chain.anc.has(from);
      const down = (from === focus || chain.desc.has(from)) && chain.desc.has(to);
      if (up || down) kind = 'chain';
    }
    if (!kind && crit(from) && crit(to)) kind = 'crit';
    if (!kind) return;
    const a = nodeOf(from);
    const b = nodeOf(to);
    if (!a || !b || a.closest('details:not([open])') || b.closest('details:not([open])')) return;
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();
    if (ra.right > rb.left) return; // same column or backwards: coreq-like, skip
    const x1 = ra.right - gridRect.left;
    const y1 = ra.top + ra.height / 2 - gridRect.top;
    const x2 = rb.left - gridRect.left;
    const y2 = rb.top + rb.height / 2 - gridRect.top;
    const d = routeEdge(x1, y1, x2, y2, ra, rb);
    if (kind === 'chain') paths.push(svgEl('path', { class: 'pl-edge-halo', d }));
    paths.push(svgEl('path', { class: `pl-edge ${kind}`, d, 'marker-start': 'url(#pl-tail)', 'marker-end': `url(#pl-arrow-${kind})` }));
  });
  svg.classList.toggle('over', !!chain);
  const marker = (id, size, ref, shape, shapeAttrs, extra = {}) => {
    const m = svgEl('marker', { id, markerWidth: size, markerHeight: size, refX: ref[0], refY: ref[1], ...extra });
    m.append(svgEl(shape, shapeAttrs));
    return m;
  };
  const defs = svgEl('defs');
  defs.append(
    marker('pl-arrow-chain', 8, [6, 4], 'path', { d: 'M0 0 L8 4 L0 8 z', class: 'pl-arrowhead chain' }, { orient: 'auto' }),
    marker('pl-arrow-crit', 6, [5, 3], 'path', { d: 'M0 0 L6 3 L0 6 z', class: 'pl-arrowhead crit' }, { orient: 'auto' }),
    marker('pl-tail', 8, [4, 4], 'circle', { cx: 4, cy: 4, r: 3, class: 'pl-arrowtail' }, { markerUnits: 'userSpaceOnUse' }));
  svg.replaceChildren(defs, ...paths);
}

/* ---------- Detail panel ---------- */

// Prerequisite alternatives as course links: "A or B".
function courseLinks(group, v) {
  return group.flatMap((code, i) => {
    const c = state.byCode.get(code);
    const st = v.passed.has(code) ? 'passed' : v.failures.some(f => f.code === code) ? 'failed' : c ? 'todo' : 'outside';
    const ic = st === 'passed' ? 'check' : st === 'failed' ? 'x' : 'planned';
    const link = c
      ? h('button', { type: 'button', class: `pl-link st-${st}`, dataset: { goto: code } }, icon(ic), code)
      : h('span', { class: `pl-link st-${st}`, title: 'Not in your checklist' }, icon(ic), code);
    return i ? [' ', h('span', { class: 'pl-or' }, 'or'), ' ', link] : [link];
  });
}

function renderDetail() {
  const panel = $('detail');
  const code = state.selected;
  const v = state.view;
  if (!code || !v) {
    panel.classList.add('hidden');
    return;
  }
  const c = state.byCode.get(code);
  const i = v.info[code];
  const card = v.primary[code];
  const t = v.now.result.assignedTerm[code];
  const slip = v.slips[code];
  const blocking = state.graph.blocking[code] || 0;
  const delay = state.graph.delay[code] || 1;
  const deps = state.graph.edges.filter(e => e.from === code).map(e => e.to);
  const groups = preGroups(c);

  const facts = [];
  const catalog = typeof UPLB_CATALOG !== 'undefined' ? UPLB_CATALOG : {};
  facts.push(`${unitsText(c.units)}, offered ${offeringLabel(c).toLowerCase()}${c.offered ? ` (${c.offered[1]} of 4 first sems, ${c.offered[2]} of 3 second sems, ${c.offered[3]} of 2 midyears seen)` : ''}`);
  if (t !== undefined) facts.push(`Planned for ${absLabel(v.startAbs + t)}`);
  const metrics = h('ul', { class: 'pl-metrics' },
    h('li', {}, h('strong', {}, blocking), ` ${blocking === 1 ? 'course' : 'courses'} blocked if this is failed`),
    h('li', {}, h('strong', {}, delay), ` ${delay === 1 ? 'course' : 'courses'} on the longest chain through it`),
    slip === undefined ? null : slip > 0
      ? h('li', { class: 'bad' }, h('strong', {}, 'Critical.'), ` Taking it a term later delays graduation by ${slip === Infinity ? 'more than the plan can show' : termsText(termsLate(v, v.now.result.gradTermIndex, v.now.result.gradTermIndex + slip))}.`)
      : h('li', {}, 'Has slack. Taking it a term later does not move graduation.'));

  const reqs = [];
  groups.forEach(g => reqs.push(h('li', {}, courseLinks(g, v))));
  (c.co || []).forEach(x => reqs.push(h('li', {}, 'Take with ', courseLinks([x], v), ' (corequisite)')));
  if (c.standing) reqs.push(h('li', {}, `${c.standing === 'senior' ? 'Senior' : 'Junior'} standing (assumed ${c.standing === 'senior' ? '75' : '50'}% of total units)`));
  if (c.coi) reqs.push(h('li', {}, 'Consent of instructor (COI) also works'));
  if (c.note) reqs.push(h('li', { class: 'pl-muted' }, 'AMIS note ', h('q', {}, c.note)));

  const actions = [];
  const past = i.tries.length > 0;
  if (i.status !== 'passed') actions.push(button({ icon: 'check', text: 'Mark passed', dataset: { act: 'passed' } }));
  if (i.status !== 'failed') actions.push(button({ icon: 'x', text: past || i.status === 'inprogress' ? 'Mark failed' : 'Mark failed (what-if)', dataset: { act: 'failed' } }));
  if (i.override) actions.push(button({ variant: 'text', text: `Use ${past ? 'AMIS status' : 'plan'} again`, dataset: { act: 'clear' } }));
  if (t !== undefined) actions.push(button({ variant: 'text', text: 'Take a term later', dataset: { act: 'later' } }));
  if (state.data.plannerPins[code] != null) actions.push(button({ variant: 'text', text: 'Back to earliest', dataset: { act: 'unpin' } }));
  const petition = restricted(c) && i.status !== 'passed' && h('label', { class: 'pl-check pl-petition' },
    h('input', { type: 'checkbox', dataset: { act: 'petition' }, checked: !!state.data.plannerPetitions[code] }),
    ' Plan on a petitioned class when it is not offered. Needs about 10 students and department, college and OVCAA approval, so treat it as conditional.');

  panel.replaceChildren(...flat([
    h('div', { class: 'pl-detail-head' },
      h('div', {},
        h('p', { class: 'pl-detail-code' }, c.code, ' ', statusPill(card ? card.status : (i.status === 'failed' ? 'failed' : 'planned'))),
        h('p', { class: 'pl-detail-title' }, c.title)),
      button({ variant: 'icon', icon: 'x', class: 'pl-close', 'aria-label': 'Close details', dataset: { act: 'close' } })),
    h('p', { class: 'pl-muted' }, `${facts.join('. ')}.`),
    card && card.waitingOn && h('p', { class: 'pl-note' }, icon('lock'), `Waiting on ${card.waitingOn}`),
    metrics,
    c.options && [h('h4', {}, 'Take one of these'), h('ul', { class: 'pl-reqs' }, c.options.map(o => h('li', {},
      h('strong', {}, o), catalog[o] ? ` ${catalog[o].title.replace(/\.$/, '')}` : '',
      v.passed.has(o) ? ', passed' : '')))],
    h('h4', {}, 'Requires'),
    reqs.length ? h('ul', { class: 'pl-reqs' }, reqs) : h('p', { class: 'pl-muted' }, 'No prerequisites.'),
    h('h4', {}, 'Unlocks'),
    deps.length ? h('p', { class: 'pl-deps' }, deps.map(d => courseLinks([d], v))) : h('p', { class: 'pl-muted' }, 'Nothing else in your checklist.'),
    h('div', { class: 'pl-actions' }, actions),
    petition,
  ]));
  panel.classList.remove('hidden');

  // Phone: show it inline under the selected card. Desktop: floating panel.
  if (isPhone()) {
    const el = document.querySelector(`.pl-card[data-primary][data-code="${CSS.escape(code)}"]`) ||
      document.querySelector(`.pl-card[data-code="${CSS.escape(code)}"]`);
    if (el) el.after(panel);
  } else if (panel.parentElement !== document.querySelector('.pl-main')) {
    document.querySelector('.pl-main').appendChild(panel);
  }
}

/* ---------- Actions ---------- */

function announce(msg) {
  $('plannerStatus').textContent = msg;
}

function select(code) {
  state.selected = state.selected === code ? null : code;
  renderDetail();
  drawEdges();
  if (state.selected) announce(`${code} selected. ${state.graph.blocking[code] || 0} courses depend on it.`);
}

function act(name, input) {
  const code = state.selected;
  const d = state.data;
  if (name === 'close') { select(code); return; }
  if (name === 'passed' || name === 'failed') {
    const auto = state.view.info[code].auto;
    if (name === auto) delete d.customCourseStatus[code];
    else d.customCourseStatus[code] = name;
    save(['customCourseStatus']);
    announce(`${code} marked ${name}`);
  } else if (name === 'clear') {
    delete d.customCourseStatus[code];
    save(['customCourseStatus']);
  } else if (name === 'later') {
    const t = state.view.now.result.assignedTerm[code];
    d.plannerPins[code] = state.view.startAbs + t + 1;
    save(['plannerPins']);
  } else if (name === 'unpin') {
    delete d.plannerPins[code];
    save(['plannerPins']);
  } else if (name === 'petition') {
    if (input.checked) d.plannerPetitions[code] = true;
    else delete d.plannerPetitions[code];
    save(['plannerPetitions']);
  }
  render();
  const el = document.querySelector(`.pl-card[data-primary][data-code="${CSS.escape(code)}"]`);
  if (el) el.focus({ preventScroll: true });
}

function fillWhatifSelect(v) {
  const sel = $('whatifCourse');
  const keep = sel.value || (state.whatif && state.whatif.code) || '';
  const codes = Object.keys(v.now.result.assignedTerm).sort();
  if (state.whatif && !codes.includes(state.whatif.code)) codes.push(state.whatif.code);
  sel.replaceChildren(h('option', { value: '' }, 'pick a course'), ...codes.map(c => h('option', { value: c }, c)));
  sel.value = codes.includes(keep) ? keep : '';
}

function simulate(e) {
  if (e) e.preventDefault();
  const code = $('whatifCourse').value;
  const mode = $('whatifMode').value;
  if (!code) {
    $('whatifResult').textContent = 'Pick a course first.';
    return;
  }
  // A course already failed on AMIS: its retake is in the plan, so report
  // what that failure costs instead of failing it a second time.
  const pastFail = mode === 'fail' && state.view.costs.find(c => c.code === code && c.past);
  if (pastFail) {
    const v = state.view;
    const t = v.now.result.assignedTerm[code];
    const retake = t === undefined ? '' : ` The retake is planned for ${absLabel(v.startAbs + t)}.`;
    $('whatifResult').textContent = pastFail.cost > 0
      ? `${code} is failed on AMIS, which moves graduation ${termsText(pastFail.cost)} later, to ${absLabel(v.startAbs + v.now.result.gradTermIndex)}.${retake}`
      : `${code} is failed on AMIS, but it does not move graduation.${retake}`;
    $('whatifClear').classList.remove('hidden');
    state.selected = code;
    renderDetail();
    drawEdges();
    return;
  }
  state.whatif = { code, mode };
  render();
  const v = state.view;
  const after = v.now.result;
  const base = v.noWhatif.result;
  const slip = termsLate(v, base.gradTermIndex, after.gradTermIndex);
  const pushed = Object.keys(after.assignedTerm).filter(c => c !== code && base.assignedTerm[c] !== undefined && after.assignedTerm[c] > base.assignedTerm[c]);
  const list = pushed.length > 5 ? `${pushed.slice(0, 5).join(', ')} and ${pushed.length - 5} more` : pushed.join(', ');
  const verb = mode === 'fail' ? `Failing ${code}` : `Taking ${code} ${mode === '1' ? 'a term' : 'a year'} later`;
  $('whatifResult').textContent = slip > 0
    ? `${verb} moves graduation to ${absLabel(v.startAbs + after.gradTermIndex)}, ${termsText(slip)} later.${pushed.length ? ` It also pushes back ${list}.` : ''}`
    : `${verb} does not move graduation.${pushed.length ? ` It shifts ${list}.` : ' Nothing else shifts.'}`;
  $('whatifClear').classList.remove('hidden');
  state.selected = code;
  renderDetail();
  drawEdges();
}

function clearWhatif() {
  state.whatif = null;
  $('whatifResult').textContent = '';
  $('whatifClear').classList.add('hidden');
  render();
}

function initControls() {
  const o = state.data.plannerOptions;
  $('optCap').value = String(o.cap);
  $('optMidyear').checked = !!o.midyear;
  $('optMidyear9').checked = !!o.midyear9;
  const setOpt = () => {
    o.cap = Number($('optCap').value);
    o.midyear = $('optMidyear').checked;
    o.midyear9 = $('optMidyear9').checked;
    save(['plannerOptions']);
    render();
  };
  ['optCap', 'optMidyear', 'optMidyear9'].forEach(id => $(id).addEventListener('change', setOpt));
  // Specialization: same pick as the popup What if tab.
  const specs = state.program.specializations;
  $('optSpecRow').hidden = !specs;
  if (specs) {
    $('optSpec').replaceChildren(h('option', { value: '' }, 'Not chosen yet'),
      ...Object.entries(specs).map(([key, s]) => h('option', { value: key }, s.name)));
    $('optSpec').value = specKey() || '';
    $('optSpec').addEventListener('change', () => {
      const all = state.data.selectedSpecializations;
      if ($('optSpec').value) all[state.program.code] = $('optSpec').value;
      else delete all[state.program.code];
      save(['selectedSpecializations']);
      loadCourses();
      state.selected = null;
      clearWhatif();
      announce(`Planning for ${specKey() ? specs[specKey()].name : 'no specialization'}.`);
    });
  }
  $('autoPlan').addEventListener('click', () => {
    state.data.plannerPins = {};
    save(['plannerPins']);
    $('planMenu').open = false;
    render();
    announce('Plan recomputed from scratch.');
  });
  const resetDialog = modal($('resetDialog'));
  $('resetPlan').addEventListener('click', () => {
    $('planMenu').open = false;
    resetDialog.open();
  });
  $('resetConfirm').addEventListener('click', () => {
    Object.assign(state.data, { customCourseStatus: {}, plannerPins: {}, plannerPetitions: {} });
    save(['customCourseStatus', 'plannerPins', 'plannerPetitions']);
    state.whatif = null;
    $('whatifResult').textContent = '';
    resetDialog.close();
    render();
    announce('Plan reset. Your AMIS grades stay.');
  });
  $('whatifForm').addEventListener('submit', simulate);
  $('whatifClear').addEventListener('click', clearWhatif);

  // Legend: one row of chips, built from the same status table as the cards.
  $('legend').prepend(
    ...['passed', 'inprogress', 'failed', 'retake', 'ready', 'planned', 'locked'].map(st => statusPill(st)),
    badge('Critical', { class: 'crit-chip', title: 'Courses that would delay graduation if you slip' }),
    badge('Petition', { icon: 'flag' }));

  const grid = $('plannerGrid');
  grid.addEventListener('click', e => {
    const el = e.target.closest('.pl-card');
    if (el) select(el.dataset.code);
  });
  grid.addEventListener('keydown', e => {
    const el = e.target.closest('.pl-card');
    if (el && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      select(el.dataset.code);
    }
  });
  grid.addEventListener('mouseover', e => {
    const el = e.target.closest('.pl-card');
    const code = el ? el.dataset.code : null;
    if (code !== state.hover) { state.hover = code; drawEdges(); }
  });
  grid.addEventListener('mouseleave', () => { state.hover = null; drawEdges(); });
  grid.addEventListener('toggle', () => drawEdges(), true);

  document.addEventListener('click', e => {
    const go = e.target.closest('[data-goto]');
    if (go) {
      state.selected = null;
      select(go.dataset.goto);
      const el = document.querySelector(`.pl-card[data-primary][data-code="${CSS.escape(go.dataset.goto)}"]`);
      if (el) { el.scrollIntoView({ block: 'nearest', inline: 'nearest' }); el.focus({ preventScroll: true }); }
      return;
    }
    const a = e.target.closest('[data-act]');
    if (a && a.tagName !== 'INPUT') act(a.dataset.act, a);
    const menu = $('planMenu');
    if (menu.open && !menu.contains(e.target)) menu.open = false;
  });
  $('detail').addEventListener('change', e => {
    if (e.target.dataset.act === 'petition') act('petition', e.target);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && state.selected) select(state.selected);
  });
}
