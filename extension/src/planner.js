// planner.js - curriculum map and course planner.
// Framework free. Talks to the browser only through `store` below, so the same
// file can run on a plain web page (gradesim.uplb.tools) with localStorage.
// Depends on globals from components.js, curriculum.js, catalog.js,
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
  view: null,        // last compute() result
};

document.addEventListener('DOMContentLoaded', init);

async function init() {
  hydrateIcons();
  state.data = await store.get(['gradesData', 'selectedProgram', 'substitutions', 'customCourseStatus',
    'plannerPins', 'plannerPetitions', 'plannerOptions', 'theme', 'selectedTracks', 'selectedSpecializations', 'removals']);
  const d = state.data;
  d.gradesData = applyRemovals(d.gradesData, d.removals);
  d.customCourseStatus = d.customCourseStatus || {};
  d.substitutions = d.substitutions || {};
  d.plannerPins = d.plannerPins || {};
  d.plannerPetitions = d.plannerPetitions || {};
  themeToggle($('themeToggle'), d.theme, next => {
    store.set({ theme: next });
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
        result: gradeResult(v.grade), grade: String(v.grade == null ? '' : v.grade).toUpperCase().trim(),
        abs: abs != null ? abs : null, order: i });
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
  // Once a course is passed, later attempts go to its "CODE (n)" row.
  attempts.forEach(a => {
    let code = a.code;
    for (let n = 2; (byCurr[code] || []).some(x => x.result === 'passed') && state.byCode.has(`${a.code} (${n})`); n++) code = `${a.code} (${n})`;
    if (state.byCode.has(code)) push(code, a);
  });

  // GE, HK, NSTP and free elective slots, and substitutions, filled the same
  // way the popup What if tab counts them.
  const doneOrNow = attempts.filter(a => a.result === 'passed' || a.result === 'inprogress');
  fillRequirementSlots(state.courses, doneOrNow, state.data.substitutions).forEach((a, slot) => {
    if (a.code !== slot && state.byCode.has(slot) && !(byCurr[slot] || []).includes(a)) push(slot, { ...a, via: a.code });
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

  const conflicts = prereqConflicts(state.courses, code => (info[code] ? info[code].status : passed.has(code) && 'passed'));

  return { hist, info, startAbs, passed: now.passed, failures, costs, now, ideal, noWhatif, slips, unitCaps, left, conflicts };
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
  $('gradSub').textContent = sentences.join(' ');

  const list = $('failCosts');
  const showCosts = v.costs.length > 1 || (v.costs.length === 1 && v.costs[0].source !== 'whatif');
  list.replaceChildren(...(showCosts ? v.costs.map(c => h('li', { class: c.cost > 0 ? 'bad' : '' },
    icon(c.cost > 0 ? 'x' : 'check'),
    h('span', {}, h('strong', {}, c.code),
      ` ${c.source === 'whatif' ? 'in the what-if' : c.past ? 'failed' : 'marked failed'}, ${c.cost > 0 ? `${termsText(c.cost)} later` : 'no delay'}`))) : []),
  ...v.conflicts.map(c => h('li', { class: 'bad' }, icon('alert'),
    h('span', {}, h('strong', {}, c.code), ` is passed, so its prerequisite ${c.pre} cannot be failed. Check the mark on ${c.pre}.`))));
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
      const card = { code: c.code, status: st, via: a.via, grade: a.grade, units: a.units, history: !isLast };
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
  return { list, primary };
}

// Barycenter sweeps: order each column by the mean row of a card's
// prerequisites (left to right), then of its dependents (right to left).
// ponytail: plain barycenter, no crossing count; d3-dag if this looks bad.
function planRow(card, v) {
  const c = state.byCode.get(card.code);
  const slip = v.slips[card.code];
  // Free elective rows are placeholders for any course, so never critical.
  const crit = !card.history && slip > 0 && c.genericRequirement !== 'elective' && !['passed', 'inprogress', 'failed'].includes(card.status);
  const [statusIcon, statusLabel] = COURSE_STATUS[card.status];
  let note = ['passed', 'planned', 'ready'].includes(card.status) ? '' : statusLabel;
  let warn = false;
  if (card.waitingOn) note = `Waiting on ${card.waitingOn}`;
  else if (card.conditional) { note = 'Petition needed'; warn = true; }
  else if (card.unplaceable) { note = "Can't place"; warn = true; }
  else if (card.via && card.via !== card.code) note = `via ${card.via}`;
  else if (card.hypothetical) note = 'If failed here';
  const aria = `${c.code}, ${c.title}. ${statusLabel}${crit ? ', critical' : ''}. ${unitsText(c.units)}${card.grade ? `, grade ${card.grade}` : ''}.${card.waitingOn ? ` Waiting on ${card.waitingOn}.` : ''}`;
  return h('li', {},
    h('button', {
      type: 'button', class: `pl-row st-${card.status}${card.history || card.hypothetical ? ' history' : ''}${c.genericRequirement ? ' generic' : ''}`, 'aria-label': aria,
      dataset: { code: card.code, ...(v.primary[card.code] === card ? { primary: '1' } : {}) },
    },
    h('span', { class: 'pl-mark' }, icon(statusIcon)),
    h('span', { class: 'pl-code' }, c.code, card.pinned && h('span', { class: 'pl-pin', title: 'Moved later by you' }, ' *')),
    h('span', { class: 'pl-title' }, c.title),
    h('span', { class: `pl-row-note${warn ? ' warn' : ''}` }, [note, crit && 'Critical'].filter(Boolean).join(', ')),
    h('span', { class: 'pl-row-units' }, String(c.units)),
    h('span', { class: 'pl-row-grade' }, card.grade || '')));
}

const isDated = abs => Number.isFinite(abs) && abs >= 0;

function termBlock(column, v) {
  const isPast = column.abs < v.startAbs;
  const dated = isDated(column.abs);
  const name = column.abs === -1 ? 'No AMIS term' : column.abs === Infinity ? 'Check prerequisites' : absLabel(column.abs).replace(/ \d+$/, '');
  const units = column.cards.reduce((s, c) => s + (Number(state.byCode.get(c.code).units) || 0), 0);
  const isMid = column.abs % 3 === 2;
  let warn = '';
  if (!isPast && dated) {
    if (isMid && units > 6) warn = "Over 6 units in midyear needs the Dean's approval (max 9).";
    else if (!isMid && units > v.unitCaps['1']) warn = `Over your ${v.unitCaps['1']}-unit cap, so it needs an overload approval.`;
    else if (!isMid && units > 18) warn = 'Over 18 units, which is allowed up to 21 when the term has lab courses.';
  }
  const loud = warn && (isMid || units > v.unitCaps['1']);
  const nowTerm = column.cards.some(c => c.status === 'inprogress');
  const tag = column.abs === v.startAbs ? 'next' : nowTerm ? 'now' : '';
  const failed = column.cards.filter(c => c.status === 'failed' && !c.hypothetical).length;
  const graded = column.cards.filter(c => c.units && Number(c.grade) && !isNonGwaCourseCode(c.via || c.code));
  const gwaUnits = graded.reduce((s, c) => s + c.units, 0);
  const gwa = gwaUnits && graded.reduce((s, c) => s + c.units * Number(c.grade), 0) / gwaUnits;
  // Named courses first, then the GE, HK, NSTP and elective slots.
  const slot = card => (state.byCode.get(card.code).genericRequirement ? 1 : 0);
  const cards = column.cards.slice().sort((a, b) => slot(a) - slot(b) || a.code.localeCompare(b.code, undefined, { numeric: true }));
  return h('details', { class: `pl-term${isPast ? ' past' : ''}`, open: !isPast || nowTerm || failed > 0, dataset: dated ? { sem: column.abs % 3 } : {} },
    h('summary', {},
      icon('chevron'),
      h('span', { class: 'pl-term-name' }, name),
      tag && h('span', { class: 'pl-term-tag' }, tag),
      h('span', { class: 'pl-term-facts' },
        failed > 0 && h('span', { class: 'bad' }, `${failed} failed`),
        gwa > 0 && h('span', {}, `GWA ${gwa.toFixed(4)}`),
        h('span', { class: loud ? 'warn' : '', title: warn || null }, loud && icon('alert'), unitsText(units))),
      warn && h('span', { class: 'visually-hidden' }, warn)),
    h('ul', { class: `pl-rows${column.cards.some(c => c.grade) ? '' : ' nograde'}` },
      cards.length ? cards.map(card => planRow(card, v)) : h('li', { class: 'pl-empty' }, 'Nothing offered that fits')));
}

function render() {
  const v = compute();
  state.view = v;
  renderSummary(v);
  fillWhatifSelect(v);
  const { list, primary } = buildColumns(v);
  v.primary = primary;
  v.columns = list;
  document.querySelector('.pl-main').appendChild($('detail')); // it sits inside the sheet while a course is selected
  // Academic years, each with its terms.
  const years = [];
  list.forEach(column => {
    const label = isDated(column.abs) ? ayLabel(column.abs) : column.abs === -1 ? 'Credited' : "Can't place";
    if (!years.length || years[years.length - 1].label !== label) years.push({ label, terms: [] });
    years[years.length - 1].terms.push(termBlock(column, v));
  });
  $('plannerSheet').replaceChildren(...years.map(y => h('section', { class: 'pl-year', 'aria-label': y.label }, h('h3', {}, y.label), y.terms)));
  if (state.selected && !state.byCode.has(state.selected)) state.selected = null;
  renderDetail();
  markChain();
}

/* ---------- Focus ---------- */

// Tints the selected course's prerequisites and what it unlocks, and dims the rest.
function markChain() {
  const focus = state.selected;
  const chain = focus ? new Set([focus, ...state.graph.ancestors(focus), ...state.graph.descendants(focus)]) : null;
  $('plannerSheet').querySelectorAll('.pl-row').forEach(el => {
    const code = el.dataset.code;
    const on = code === focus && !!el.dataset.primary;
    el.setAttribute('aria-pressed', String(on));
    el.classList.toggle('chain', !!chain && !on && chain.has(code));
    el.classList.toggle('dim', !!chain && !chain.has(code));
  });
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
    blocking > 0 && h('li', {}, h('strong', {}, blocking), ` ${blocking === 1 ? 'course' : 'courses'} blocked if this is failed`),
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
        h('p', { class: 'pl-detail-code' }, c.code, ' ', statusPill(card ? card.status : (i.status === 'failed' ? 'failed' : 'planned'), card && card.waitingOn ? { label: `Waiting on ${card.waitingOn}` } : {})),
        h('p', { class: 'pl-detail-title' }, c.title)),
      button({ variant: 'icon', icon: 'x', class: 'pl-close', 'aria-label': 'Close details', dataset: { act: 'close' } })),
    h('p', { class: 'pl-muted' }, `${facts.join('. ')}.`),
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

  const el = document.querySelector(`.pl-row[data-primary][data-code="${CSS.escape(code)}"]`) ||
    document.querySelector(`.pl-row[data-code="${CSS.escape(code)}"]`);
  if (el) {
    el.closest('details').open = true;
    el.after(panel);
  }
}

/* ---------- Actions ---------- */

function announce(msg) {
  $('plannerStatus').textContent = msg;
}

function select(code) {
  state.selected = state.selected === code ? null : code;
  renderDetail();
  markChain();
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
  const el = document.querySelector(`.pl-row[data-primary][data-code="${CSS.escape(code)}"]`);
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
    markChain();
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
  markChain();
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

  $('plannerSheet').addEventListener('click', e => {
    const el = e.target.closest('.pl-row');
    if (el) select(el.dataset.code);
  });

  document.addEventListener('click', e => {
    const go = e.target.closest('[data-goto]');
    if (go) {
      state.selected = null;
      select(go.dataset.goto);
      const el = document.querySelector(`.pl-row[data-primary][data-code="${CSS.escape(go.dataset.goto)}"]`);
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
