// planner.js - curriculum map and course planner.
// Framework free. Talks to the browser only through `store` below, so the same
// file can run on a plain web page (gradesim.uplb.tools) with localStorage.
// Depends on globals from curriculum.js, catalog.js and scheduler.js.

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

/* ---------- Icons (Lucide, ISC license) ---------- */

const ICONS = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  retake: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  ready: '<circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/>',
  planned: '<circle cx="12" cy="12" r="10"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon: '<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',
  monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
};
function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

// Build DOM from markup with DOMParser instead of assigning innerHTML, which
// the Firefox add-on linter flags. Every caller escapes dynamic text with
// esc(). SVG targets are parsed inside an <svg> so children keep the SVG
// namespace.
function setHTML(el, html) {
  if (!html) { el.replaceChildren(); return; }
  const isSvg = el instanceof SVGElement;
  const doc = new DOMParser().parseFromString(isSvg ? `<svg>${html}</svg>` : html, 'text/html');
  const host = isSvg ? doc.body.firstElementChild : doc.body;
  el.replaceChildren(...Array.from(host.childNodes, node => document.importNode(node, true)));
}

function esc(text) {
  return String(text == null ? '' : text).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

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

// AMIS term ids are 12<year digit><term digit>: 1251 = AY 2025-26 1st sem.
function amisTermToAbs(id) {
  const m = String(id).match(/^12(\d)([123])$/);
  return m ? (2020 + Number(m[1])) * 3 + Number(m[2]) - 1 : null;
}

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
  // Parse the static icon markup with DOMParser instead of assigning
  // outerHTML, which the Firefox add-on linter flags for review.
  document.querySelectorAll('[data-icon]').forEach(el => {
    const doc = new DOMParser().parseFromString(icon(el.dataset.icon), 'text/html');
    el.replaceWith(document.importNode(doc.body.firstElementChild, true));
  });
  state.data = await store.get(['gradesData', 'selectedProgram', 'substitutions', 'customCourseStatus',
    'plannerPins', 'plannerPetitions', 'plannerOptions', 'theme', 'selectedTracks']);
  const d = state.data;
  d.customCourseStatus = d.customCourseStatus || {};
  d.substitutions = d.substitutions || {};
  d.plannerPins = d.plannerPins || {};
  d.plannerPetitions = d.plannerPetitions || {};
  initTheme(d.theme);

  const programCode = d.selectedProgram || 'BSCS';
  state.program = typeof UPLB_PROGRAMS !== 'undefined' ? UPLB_PROGRAMS[programCode] : null;
  if (!state.program || !state.program.majorCourses) {
    $('gradTerm').textContent = 'Pick your program in the extension popup first.';
    return;
  }
  $('plannerProgram').textContent = state.program.name || programCode;
  const catalog = typeof UPLB_CATALOG !== 'undefined' ? UPLB_CATALOG : {};
  // An SP or thesis course on AMIS (passed, failed, or being taken now) wins;
  // otherwise the track picked in the popup, otherwise the program default.
  const amisRows = Object.values((d.gradesData && d.gradesData.student_grades) || {})
    .flatMap(t => (t && t.values) || [])
    .map(v => ({ code: v.course && v.course.course_code, grade: v.grade }))
    .filter(r => r.code);
  state.track = detectTrack(amisRows, state.program) ||
    resolveTrack(state.program, (d.selectedTracks || {})[programCode]);
  const trackInfo = state.track && state.program.tracks[state.track];
  if (trackInfo) {
    $('plannerProgram').textContent += `, ${trackInfo.name} (${trackInfo.code})`;
  }
  state.courses = enrichCourses(getPlannerCourses(state.program, state.track), catalog);
  state.courses.forEach(c => state.byCode.set(c.code, c));
  state.graph = analyzeGraph(state.courses);
  d.plannerOptions = { cap: defaultCap(), midyear: false, midyear9: false, ...(d.plannerOptions || {}) };

  if (!d.gradesData || !d.gradesData.student_grades) {
    const banner = $('plannerBanner');
    banner.classList.remove('hidden');
    setHTML(banner, `${icon('info')}<span>No grades loaded yet. Open AMIS while logged in, then come back so your passed courses count. Until then this plan starts from scratch.</span>`);
  }

  initControls();
  render();
  window.addEventListener('resize', () => drawEdges());
}

// 21 units when the program's own checklist already has a regular term above 18.
function defaultCap() {
  const load = {};
  (state.program.majorCourses || []).forEach(c => {
    if (c.sem === 'midyear') return;
    const k = `${c.year}-${c.sem}`;
    load[k] = (load[k] || 0) + (Number(c.units) || 0);
  });
  return Object.values(load).some(u => u > 18) ? 21 : 18;
}

function save(keys) {
  const obj = {};
  keys.forEach(k => { obj[k] = state.data[k]; });
  store.set(obj);
}

/* ---------- Theme ---------- */

const THEMES = ['system', 'light', 'dark'];
function applyTheme(theme) {
  if (theme === 'system') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  const btn = $('themeToggle');
  setHTML(btn, icon({ system: 'monitor', light: 'sun', dark: 'moon' }[theme]));
  btn.title = `Theme: ${theme}`;
  btn.setAttribute('aria-label', btn.title);
  btn.dataset.theme = theme;
}
function initTheme(theme) {
  applyTheme(THEMES.includes(theme) ? theme : 'system');
  $('themeToggle').addEventListener('click', e => {
    const next = THEMES[(THEMES.indexOf(e.currentTarget.dataset.theme) + 1) % THEMES.length];
    applyTheme(next);
    store.set({ theme: next });
    requestAnimationFrame(() => drawEdges());
  });
}

/* ---------- AMIS history ---------- */

function gradeResult(raw) {
  const g = (raw == null ? '' : String(raw)).toUpperCase().trim();
  const n = parseFloat(g);
  if (g === 'S' || g === 'P' || (n >= 1 && n <= 3)) return 'passed';
  if (n === 5 || g === 'F' || g === 'U') return 'failed';
  if (!g) return 'nograde';
  return 'other'; // INC, DRP, 4.00: not passed, not a fail
}

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

  const doneOrNow = attempts.filter(a => a.result === 'passed' || a.result === 'inprogress');
  const slotDone = getCompletedRequirementSlotCodes(
    doneOrNow.map(a => ({ code: a.code, title: a.title })), state.program);
  const kinds = [
    ['ge', a => isGECourse(a.code, a.title) && !state.byCode.has(a.code)],
    ['hk', a => /^(HK|PE)\b/.test(a.code) && !state.byCode.has(a.code)],
    ['nstp', a => /^NSTP\b/.test(a.code) && !state.byCode.has(a.code)],
  ];
  kinds.forEach(([kind, match]) => {
    const slots = state.courses.filter(c => c.genericRequirement === kind && slotDone.has(c.code));
    const taken = doneOrNow.filter(match);
    slots.forEach((slot, i) => {
      const a = taken[i];
      if (a) push(slot.code, { ...a, via: a.code });
    });
  });
  // Free electives: any other course with units that the curriculum does not
  // name and that is not standing in for a required one.
  // ponytail: one course per 3-unit slot; a 6-unit elective fills only one.
  const subbed = new Set(Object.values(state.data.substitutions).map(normCode));
  const electives = doneOrNow.filter(a => a.units > 0 && !state.byCode.has(a.code) &&
    !subbed.has(a.code) && !kinds.some(([, match]) => match(a)));
  state.courses.filter(c => c.genericRequirement === 'elective').forEach((slot, i) => {
    const a = electives[i];
    if (a) push(slot.code, { ...a, via: a.code });
  });
  Object.entries(state.data.substitutions).forEach(([req, taken]) => {
    const r = normCode(req);
    const a = doneOrNow.find(x => x.code === normCode(taken));
    if (a && state.byCode.has(r)) push(r, { ...a, via: a.code });
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

  return { hist, info, startAbs, passed: now.passed, failures, costs, now, ideal, noWhatif, slips, unitCaps };
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
    setHTML(deltaEl, `${icon('alert')}+${termsText(delta)} ${esc(why)}`);
  } else if (v.failures.length) {
    setHTML(deltaEl, `${icon('check')}No delay from ${v.failures.length === 1 ? esc(v.failures[0].code) : 'your failed courses'}`);
    deltaEl.classList.add('ok');
  } else {
    deltaEl.textContent = '';
  }
  if (!(v.failures.length && delta <= 0)) deltaEl.classList.remove('ok');

  const termsLeft = r.plan.filter(p => p.courses.length).length;
  const bits = [];
  if (gradAbs != null) bits.push(`That is ${ayLabel(gradAbs)}`);
  if (gradAbs != null) bits.push(`${termsLeft} term${termsLeft === 1 ? '' : 's'} with classes left, starting ${absLabel(v.startAbs)}`);
  bits.push(`up to ${v.unitCaps['1']} units a sem`);
  bits.push(state.data.plannerOptions.midyear ? `midyear up to ${v.unitCaps.midyear}` : 'midyear only where the checklist puts it');
  $('gradSub').textContent = `${bits.join(', ')}. Free electives are not counted.`;

  const list = $('failCosts');
  setHTML(list, v.costs.length > 1 || (v.costs.length === 1 && v.costs[0].source !== 'whatif')
    ? v.costs.map(c => `<li class="${c.cost > 0 ? 'bad' : ''}">${icon(c.cost > 0 ? 'x' : 'check')}<strong>${esc(c.code)}</strong> ${c.source === 'whatif' ? '(what-if)' : c.past ? 'failed' : '(marked failed)'}: ${c.cost > 0 ? `+${termsText(c.cost)}` : 'no delay'}</li>`).join('')
    : '');
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

const STATUS = {
  passed: ['check', 'Passed'],
  inprogress: ['clock', 'Taking now'],
  failed: ['x', 'Failed'],
  retake: ['retake', 'Retake'],
  ready: ['ready', 'Ready'],
  planned: ['planned', 'Planned'],
  locked: ['lock', 'Waiting'],
};

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

function cardHTML(card, v) {
  const c = state.byCode.get(card.code);
  const [ic, label] = STATUS[card.status];
  const slip = v.slips[card.code];
  const crit = !card.history && slip > 0 && !['passed', 'inprogress', 'failed'].includes(card.status);
  const classes = ['pl-card', `st-${card.status}`];
  if (crit) classes.push('crit');
  if (card.history || card.hypothetical) classes.push('history');
  let extra = '';
  if (card.waitingOn) extra = `<span class="pl-note">${icon('lock')}Waiting on ${esc(card.waitingOn)}</span>`;
  else if (card.conditional) extra = `<span class="pl-note warn">${icon('flag')}Petition needed</span>`;
  else if (card.unplaceable) extra = `<span class="pl-note warn">${icon('alert')}Can't place</span>`;
  else if (card.via && card.via !== card.code) extra = `<span class="pl-note">via ${esc(card.via)}</span>`;
  else if (card.hypothetical) extra = '<span class="pl-note">If failed here</span>';
  const statusLabel = card.status === 'failed' && card.history ? 'Failed' : label;
  const aria = `${c.code}, ${c.title}. ${statusLabel}${crit ? ', critical' : ''}. ${c.units} units, ${offeringLabel(c)}.${card.waitingOn ? ` Waiting on ${card.waitingOn}.` : ''}`;
  return `<div class="${classes.join(' ')}" role="button" tabindex="0" data-code="${esc(card.code)}"${v.primary[card.code] === card ? ' data-primary="1"' : ''} aria-label="${esc(aria)}">
    <span class="pl-card-top"><span class="pl-status">${icon(ic)}${statusLabel}</span><span class="pl-units">${esc(c.units)}u</span></span>
    <span class="pl-code">${esc(c.code)}${card.pinned ? '<span class="pl-pin" title="Moved later by you"> *</span>' : ''}</span>
    <span class="pl-title">${esc(c.title)}</span>
    <span class="pl-card-foot"><span class="pl-offer">${esc(offeringLabel(c))}</span>${crit ? '<span class="pl-crit">Critical</span>' : ''}</span>
    ${extra}
  </div>`;
}

function columnHTML(column, v, phone) {
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
    else if (!isMid && units > v.unitCaps['1']) warn = `Over your ${v.unitCaps['1']}-unit cap: needs an overload approval.`;
    else if (!isMid && units > 18) warn = 'Over 18 units: allowed up to 21 when the term has lab courses.';
  }
  const nowTerm = column.cards.some(c => c.status === 'inprogress');
  const tag = column.abs === v.startAbs ? '<span class="pl-tag">Next</span>'
    : nowTerm ? '<span class="pl-tag now">Now</span>'
    : isPast && column.abs >= 0 ? '<span class="pl-tag past">Taken</span>' : '';
  const open = !(phone && isPast) ? ' open' : '';
  return `<section class="pl-col${isPast ? ' past' : ''}" data-abs="${column.abs}">
    <details${open}>
      <summary class="pl-col-head">
        <span class="pl-col-name">${esc(name)} ${tag}</span>
        <span class="pl-col-sub">${esc(sub)}<span class="pl-col-units${warn && (isMid || units > v.unitCaps['1']) ? ' warn' : ''}"${warn ? ` title="${esc(warn)}"` : ''}>${warn && (isMid || units > v.unitCaps['1']) ? icon('alert') : ''}${units} units</span></span>
        ${warn ? `<span class="visually-hidden">${esc(warn)}</span>` : ''}
      </summary>
      <div class="pl-cards">${column.cards.map(card => cardHTML(card, v)).join('') || '<p class="pl-empty">Nothing offered that fits</p>'}</div>
    </details>
  </section>`;
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
  setHTML($('plannerGrid'), list.map(c => columnHTML(c, v, phone)).join(''));
  if (state.selected && !state.byCode.has(state.selected)) state.selected = null;
  renderDetail();
  requestAnimationFrame(() => drawEdges());
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
  setHTML(svg, '');
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
  const crit = code => v.slips[code] > 0;
  const paths = [];

  // Arrows run along the gutters between columns: out of the prerequisite,
  // along a gutter to the target's height, then in. A long arrow still has to
  // cross the columns in between, so it crosses at whichever end (the
  // prerequisite's row or the target's row) hits fewer visible cards. Arrows
  // sharing a gutter get their own lane so they do not merge into one line.
  const GUTTER = 11; // half of .pl-grid gap
  const visible = Array.from(grid.querySelectorAll('.pl-card:not(.dim)'))
    .filter(el => !el.closest('details:not([open])'))
    .map(el => el.getBoundingClientRect());
  // Cards strictly between the two columns whose height range contains y.
  const crossings = (y, xa, xb) => visible.filter(r =>
    r.left > xa && r.right < xb && y > r.top && y < r.bottom).length;
  const lanes = new Map();
  const lane = gx => {
    const n = lanes.get(gx) || 0;
    lanes.set(gx, n + 1);
    return gx + ((n % 4) - 1.5) * 5; // four lanes fit the 22px gap
  };
  function routeEdge(x1, y1, x2, y2, ra, rb) {
    const viaSourceRow = crossings(y1 + gridRect.top, ra.right, rb.left);
    const viaTargetRow = crossings(y2 + gridRect.top, ra.right, rb.left);
    const gx = lane(Math.round(viaSourceRow < viaTargetRow ? x2 - GUTTER : x1 + GUTTER));
    const dy = y2 - y1;
    if (Math.abs(dy) < 1) return `M ${x1} ${y1} H ${x2 - 4}`;
    const r = Math.min(6, Math.abs(dy) / 2);
    const s = Math.sign(dy);
    return `M ${x1} ${y1} H ${gx - r} Q ${gx} ${y1} ${gx} ${y1 + s * r} ` +
      `V ${y2 - s * r} Q ${gx} ${y2} ${gx + r} ${y2} H ${x2 - 4}`;
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
    if (kind === 'chain') paths.push(`<path class="pl-edge-halo" d="${d}"/>`);
    paths.push(`<path class="pl-edge ${kind}" d="${d}" marker-start="url(#pl-tail)" marker-end="url(#pl-arrow-${kind})"/>`);
  });
  svg.classList.toggle('over', !!chain);
  setHTML(svg, `<defs>
    <marker id="pl-arrow-chain" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" class="pl-arrowhead chain"/></marker>
    <marker id="pl-arrow-crit" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" class="pl-arrowhead crit"/></marker>
    <marker id="pl-tail" markerWidth="8" markerHeight="8" refX="4" refY="4" markerUnits="userSpaceOnUse"><circle cx="4" cy="4" r="3" class="pl-arrowtail"/></marker>
  </defs>${paths.join('')}`);
}

/* ---------- Detail panel ---------- */

function groupHTML(group, v) {
  return group.map(code => {
    const c = state.byCode.get(code);
    const st = v.passed.has(code) ? 'passed' : v.failures.some(f => f.code === code) ? 'failed' : c ? 'todo' : 'outside';
    const ic = st === 'passed' ? 'check' : st === 'failed' ? 'x' : 'planned';
    const inner = `${icon(ic)}${esc(code)}`;
    return c ? `<button type="button" class="pl-link st-${st}" data-goto="${esc(code)}">${inner}</button>` : `<span class="pl-link st-${st}" title="Not in your checklist">${inner}</span>`;
  }).join(' <span class="pl-or">or</span> ');
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
  const status = card ? STATUS[card.status][1] : (i.status === 'failed' ? 'Failed' : 'Planned');
  const t = v.now.result.assignedTerm[code];
  const slip = v.slips[code];
  const blocking = state.graph.blocking[code] || 0;
  const delay = state.graph.delay[code] || 1;
  const deps = state.graph.edges.filter(e => e.from === code).map(e => e.to);
  const groups = preGroups(c);

  const facts = [];
  facts.push(`${c.units} units, offered ${offeringLabel(c).toLowerCase()}${c.offered ? ` (${c.offered[1]} of 4 first sems, ${c.offered[2]} of 3 second sems, ${c.offered[3]} of 2 midyears seen)` : ''}`);
  if (t !== undefined) facts.push(`Planned for ${absLabel(v.startAbs + t)}`);
  const metrics = `<ul class="pl-metrics">
    <li><strong>${blocking}</strong> course${blocking === 1 ? '' : 's'} blocked if this is failed</li>
    <li><strong>${delay}</strong> course${delay === 1 ? '' : 's'} on the longest chain through it</li>
    ${slip === undefined ? '' : slip > 0
      ? `<li class="bad"><strong>Critical.</strong> Taking it a term later delays graduation by ${slip === Infinity ? 'more than the plan can show' : termsText(termsLate(v, v.now.result.gradTermIndex, v.now.result.gradTermIndex + slip))}.</li>`
      : '<li>Has slack: taking it a term later does not move graduation.</li>'}
  </ul>`;

  const reqs = [];
  groups.forEach(g => reqs.push(`<li>${groupHTML(g, v)}</li>`));
  (c.co || []).forEach(x => reqs.push(`<li>Take with ${groupHTML([x], v)} (corequisite)</li>`));
  if (c.standing) reqs.push(`<li>${c.standing === 'senior' ? 'Senior' : 'Junior'} standing (assumed ${c.standing === 'senior' ? '75' : '50'}% of total units)</li>`);
  if (c.coi) reqs.push('<li>Consent of instructor (COI) also works</li>');
  if (c.note) reqs.push(`<li class="pl-muted">AMIS says: ${esc(c.note)}</li>`);

  const actions = [];
  const past = i.tries.length > 0;
  if (i.status !== 'passed') actions.push(`<button type="button" class="btn btn-secondary" data-act="passed">${icon('check')}Mark passed</button>`);
  if (i.status !== 'failed') actions.push(`<button type="button" class="btn btn-secondary" data-act="failed">${icon('x')}${past || i.status === 'inprogress' ? 'Mark failed' : 'Mark failed (what-if)'}</button>`);
  if (i.override) actions.push(`<button type="button" class="pl-textbtn" data-act="clear">Use ${past ? 'AMIS status' : 'plan'} again</button>`);
  if (t !== undefined) actions.push(`<button type="button" class="pl-textbtn" data-act="later">Take a term later</button>`);
  if (state.data.plannerPins[code] != null) actions.push('<button type="button" class="pl-textbtn" data-act="unpin">Back to earliest</button>');
  const petition = restricted(c) && i.status !== 'passed'
    ? `<label class="pl-check pl-petition"><input type="checkbox" data-act="petition"${state.data.plannerPetitions[code] ? ' checked' : ''}> Plan on a petitioned class when it is not offered. Needs about 10 students and department, college and OVCAA approval, so treat it as conditional.</label>`
    : '';

  setHTML(panel, `
    <div class="pl-detail-head">
      <div><p class="pl-detail-code">${esc(c.code)} <span class="pl-status-pill st-${card ? card.status : 'planned'}">${esc(status)}</span></p>
      <p class="pl-detail-title">${esc(c.title)}</p></div>
      <button type="button" class="pl-close" data-act="close" aria-label="Close details">${icon('close')}</button>
    </div>
    <p class="pl-muted">${facts.map(esc).join('. ')}.</p>
    ${card && card.waitingOn ? `<p class="pl-note">${icon('lock')}Waiting on ${esc(card.waitingOn)}</p>` : ''}
    ${metrics}
    <h4>Requires</h4>
    ${reqs.length ? `<ul class="pl-reqs">${reqs.join('')}</ul>` : '<p class="pl-muted">No prerequisites.</p>'}
    <h4>Unlocks</h4>
    ${deps.length ? `<p class="pl-deps">${deps.map(d => groupHTML([d], v)).join(' ')}</p>` : '<p class="pl-muted">Nothing else in your checklist.</p>'}
    <div class="pl-actions">${actions.join('')}</div>
    ${petition}`);
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
  setHTML(sel, '<option value="">pick a course</option>' + codes.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join(''));
  sel.value = codes.includes(keep) ? keep : '';
}

function simulate(e) {
  e.preventDefault();
  const code = $('whatifCourse').value;
  const mode = $('whatifMode').value;
  if (!code) {
    $('whatifResult').textContent = 'Pick a course first.';
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
    ? `${verb} moves graduation to ${absLabel(v.startAbs + after.gradTermIndex)} (+${termsText(slip)}).${pushed.length ? ` Also pushed later: ${list}.` : ''}`
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
  $('autoPlan').addEventListener('click', () => {
    state.data.plannerPins = {};
    save(['plannerPins']);
    $('planMenu').open = false;
    render();
    announce('Plan recomputed from scratch.');
  });
  $('resetPlan').addEventListener('click', () => {
    if (!confirm('Reset the plan? This clears courses you marked passed or failed, courses you moved, and petitions. Your AMIS grades stay.')) return;
    Object.assign(state.data, { customCourseStatus: {}, plannerPins: {}, plannerPetitions: {} });
    save(['customCourseStatus', 'plannerPins', 'plannerPetitions']);
    state.whatif = null;
    $('whatifResult').textContent = '';
    $('planMenu').open = false;
    render();
  });
  $('whatifForm').addEventListener('submit', simulate);
  $('whatifClear').addEventListener('click', clearWhatif);

  // Legend: one row of chips, built from the same status table as the cards.
  const chips = ['passed', 'inprogress', 'failed', 'retake', 'ready', 'planned', 'locked']
    .map(s => `<span class="pl-chip st-${s}">${icon(STATUS[s][0])}${STATUS[s][1]}</span>`).join('') +
    '<span class="pl-chip crit-chip">Critical</span>' +
    `<span class="pl-chip">${icon('flag')}Petition</span>`;
  const chipDoc = new DOMParser().parseFromString(chips, 'text/html');
  $('legend').prepend(...Array.from(chipDoc.body.childNodes, node => document.importNode(node, true)));

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
