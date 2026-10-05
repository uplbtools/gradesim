/**
 * Elbi GradeSim - Graduation Scheduler
 * Pure functions, no DOM or chrome.* - also runs under node for tests.
 *
 * Computes the earliest feasible term for every remaining course given
 * prerequisite groups, corequisites, standing, semester offerings
 * (1st/2nd/midyear) and per-term unit caps. Also computes the Curricular
 * Analytics metrics (Heileman et al. 2018): delay factor (longest prerequisite
 * path through a course) and blocking factor (courses reachable downstream).
 */

const SEM_CYCLE = ['1', '2', 'midyear'];
const SEM_DIGIT = { '1': 1, '2': 2, 'midyear': 3 };
// Load rules from the UPLB catalog: 18 units a regular sem (21 with lab
// courses), midyear 6 (the Dean may allow 9).
const DEFAULT_UNIT_CAPS = { '1': 21, '2': 21, 'midyear': 6 };
// Assumption: UPLB does not publish standing thresholds in the catalog we have;
// junior = 50% and senior = 75% of the program's total units.
const STANDING_FRACTION = { junior: 0.5, senior: 0.75 };

function normCode(code) {
  return (code || '').toString().toUpperCase().replace(/\s+/g, ' ').replace(/\.$/, '').trim();
}

const COURSE_RE = /\b([A-Za-z]{2,6})\s*(\d{1,3}(?:\.\d{1,2})?[A-Za-z]?)(?!\d)/;

// First course code inside a messy string ("3  ENSC 10.1. Engineering ..."), or ''.
function extractCode(raw) {
  const m = (raw || '').toString().match(COURSE_RE);
  return m ? normCode(`${m[1]} ${m[2]}`) : '';
}

/* ---------- Requisite parsing ---------- */

// Parse one AMIS req_courses string into CNF: pre is an AND of OR-groups.
// "ABT 101 or COI" -> coi, no group (COI counts as satisfied).
// "(CMSC 57 and CMSC 21)" -> [["CMSC 57"], ["CMSC 21"]].
// "MATH 27 or Equivalent" -> [["MATH 27"]] (equivalents are not modelled).
function parseRequisite(str) {
  const out = { pre: [], coi: false, standing: null, note: null };
  const raw = (str || '').trim();
  if (!raw || raw === '-') return out;

  const cleaned = raw
    .replace(/\(\s*(old|new)\s*\)|-\s*(old|new)\b|_cbc\b/gi, '')
    .replace(/,/g, ' and ');

  // Tokens: ( ) and or COURSE COI STANDING EQUIV NOTE(words)
  const tokens = [];
  let rest = cleaned;
  let unknown = false;
  while (rest.length) {
    let m;
    if ((m = rest.match(/^\s+/))) { rest = rest.slice(m[0].length); continue; }
    if ((m = rest.match(/^[()]/))) { tokens.push(m[0]); rest = rest.slice(1); continue; }
    if ((m = rest.match(/^(and|or)\b/i))) { tokens.push(m[0].toLowerCase()); rest = rest.slice(m[0].length); continue; }
    if ((m = rest.match(/^coi\b/i))) { tokens.push({ coi: true }); rest = rest.slice(3); continue; }
    if ((m = rest.match(/^(junior|senior)\s+standing\b/i))) { tokens.push({ standing: m[1].toLowerCase() }); rest = rest.slice(m[0].length); continue; }
    if ((m = rest.match(/^equivalent\b/i))) { tokens.push({ equiv: true }); rest = rest.slice(m[0].length); continue; }
    if ((m = rest.match(new RegExp('^' + COURSE_RE.source)))) { tokens.push({ code: normCode(`${m[1]} ${m[2]}`) }); rest = rest.slice(m[0].length); continue; }
    if ((m = rest.match(/^[^\s()]+/))) {
      rest = rest.slice(m[0].length);
      if (/[a-z]/i.test(m[0])) {
        unknown = true;
        if (typeof tokens[tokens.length - 1] !== 'object' || !tokens[tokens.length - 1].note) tokens.push({ note: true });
      }
      continue;
    }
  }

  // Recursive descent to CNF (array of OR-groups of atoms). and binds tighter
  // than or; adjacent atoms with no operator are read as "and".
  let i = 0;
  const atomCnf = a => [[a]];
  const andCnf = (x, y) => x.concat(y);
  const orCnf = (x, y) => {
    const res = [];
    x.forEach(gx => y.forEach(gy => res.push(gx.concat(gy))));
    return res;
  };
  function parseExpr() {
    let left = parseTerm();
    while (tokens[i] === 'or') { i++; left = orCnf(left, parseTerm()); }
    return left;
  }
  function parseTerm() {
    let left = parseFactor();
    while (i < tokens.length && tokens[i] !== 'or' && tokens[i] !== ')') {
      if (tokens[i] === 'and') i++;
      if (i >= tokens.length || tokens[i] === ')' || tokens[i] === 'or') break;
      left = andCnf(left, parseFactor());
    }
    return left;
  }
  function parseFactor() {
    const t = tokens[i++];
    if (t === '(') {
      const e = parseExpr();
      if (tokens[i] === ')') i++;
      return e;
    }
    if (t && typeof t === 'object') return atomCnf(t);
    return []; // stray operator or ')': contributes nothing
  }
  let cnf = [];
  while (i < tokens.length) {
    const before = i;
    cnf = andCnf(cnf, parseExpr());
    if (tokens[i] === ')') i++;
    if (i === before) i++;
  }

  cnf.forEach(group => {
    if (group.some(a => a.coi)) { out.coi = true; return; }
    const st = group.find(a => a.standing);
    if (st && group.every(a => a.standing)) {
      out.standing = strongerStanding(out.standing, st.standing);
      return;
    }
    const codes = uniq(group.filter(a => a.code).map(a => a.code));
    if (codes.length) out.pre.push(codes);
  });
  out.pre = absorb(out.pre);
  if (unknown) out.note = raw;
  return out;
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

function strongerStanding(a, b) {
  if (!a) return b;
  if (!b) return a;
  return STANDING_FRACTION[a] >= STANDING_FRACTION[b] ? a : b;
}

// Drop any OR-group that is a superset of another (A and (A or B) = A).
function absorb(groups) {
  const sorted = groups.map(g => uniq(g).sort()).sort((a, b) => a.length - b.length);
  const kept = [];
  sorted.forEach(g => {
    if (!kept.some(k => k.every(c => g.includes(c)))) kept.push(g);
  });
  return kept;
}

// Combine all AMIS requisite rows for one course. Several PRE rows are
// alternatives (old/new curriculum variants), so they are OR-ed together.
function combineRequisites(rows) {
  const pres = [];
  const co = [];
  let coi = false;
  const notes = [];
  (rows || []).forEach(r => {
    const parsed = parseRequisite(r.req_courses);
    if (parsed.note) notes.push(parsed.note);
    if (r.req_type === 'CO') {
      parsed.pre.forEach(g => co.push(...g));
      coi = coi || parsed.coi;
    } else if (r.req_type === 'PRE') {
      if (parsed.pre.length || parsed.coi || parsed.standing) pres.push(parsed);
    }
  });

  const out = { pre: [], co: uniq(co), coi, standing: null, note: notes.length ? uniq(notes).join('; ') : null };
  if (!pres.length) return out;

  // OR of CNFs: distribute, then absorb. An alternative with no course groups
  // (e.g. "COI" alone) makes the whole course requirement satisfiable.
  if (pres.some(p => p.pre.length === 0)) {
    out.coi = out.coi || pres.some(p => p.coi);
  } else {
    let cnf = pres[0].pre;
    for (let k = 1; k < pres.length; k++) {
      const next = [];
      cnf.forEach(a => pres[k].pre.forEach(b => next.push(uniq(a.concat(b)))));
      cnf = absorb(next);
    }
    out.pre = cnf;
  }
  out.coi = out.coi || pres.some(p => p.coi);
  // Standing only binds if every alternative asks for it.
  if (pres.every(p => p.standing)) {
    out.standing = pres.map(p => p.standing).reduce((a, b) =>
      STANDING_FRACTION[a] <= STANDING_FRACTION[b] ? a : b);
  }
  return out;
}

// "1s,2s,M" / "1st, 2nd and Midyear" / "1,2,S" -> { 1: true, 2: true, 3: true }
function parseSemOffered(str) {
  const out = {};
  (str || '').toString().toLowerCase().replace(/"/g, '').split(/[\s,]+|\band\b/).forEach(tok => {
    if (!tok) return;
    if (tok[0] === '1') out[1] = true;
    else if (tok[0] === '2') out[2] = true;
    else if (/^(m|s$|summer)/.test(tok)) out[3] = true;
  });
  return out;
}

/* ---------- Offerings ---------- */

function semAt(termIndex, startSem) {
  const start = SEM_CYCLE.indexOf(startSem);
  return SEM_CYCLE[(start + termIndex) % SEM_CYCLE.length];
}

// Order: observed offerings (sections seen in AMIS terms), then the catalog's
// sem_offered, then the checklist slot. Midyear only counts when observed,
// except a checklist that places the course in midyear (practicums).
function offeredIn(course, sem) {
  const d = SEM_DIGIT[sem];
  const obs = course.offered;
  if (obs && (obs[1] || obs[2] || obs[3])) return !!obs[d];
  if (course.catalogSem) {
    const cat = parseSemOffered(course.catalogSem);
    if (cat[1] || cat[2]) return d !== 3 && !!cat[d];
  }
  if (!course.sem) return sem !== 'midyear';
  return course.sem === sem;
}

// Human label for a term. Year advances when wrapping 1st sem -> 2nd sem
// (2nd sem and midyear run in the next calendar year).
function termLabel(termIndex, startYear, startSem) {
  let year = startYear;
  let sem = startSem;
  for (let i = 0; i < termIndex; i++) {
    if (sem === '1') { sem = '2'; year += 1; }
    else if (sem === '2') { sem = 'midyear'; }
    else { sem = '1'; }
  }
  const names = { '1': '1st Sem', '2': '2nd Sem', 'midyear': 'Midyear' };
  return `${year} ${names[sem]}`;
}

// Courses the planner can schedule: real course codes plus generic requirement
// slots. Free elective placeholders stay out until the planner has track input.
function plannableCourses(courses) {
  return (courses || []).filter(c =>
    c.code && c.code !== 'Elective'
  );
}

// Prerequisite groups for a course. Accepts the catalog shape (pre: [[...]])
// or the checklist shape (prereqs: [...], every one required).
function preGroups(course) {
  if (course.pre) return course.pre.map(g => g.map(normCode));
  return (course.prereqs || []).map(p => [normCode(p)]);
}

/* ---------- Curriculum + catalog merge ---------- */

const CLEAN_CODE_RE = /^[A-Z]{2,6} \d{1,3}(\.\d{1,2})?[A-Z]?$/;

// Turn checklist rows (some garbled by PDF parsing, e.g. code "3 CHEM 18.
// University Chemistry" with several courses run together in the title) into
// clean planner courses, then attach catalog data: units, offerings and
// requisites. Catalog requisites win over checklist prereqs when present.
function enrichCourses(list, catalog) {
  const cat = catalog || {};
  const out = [];
  const seen = new Set();
  const add = (course) => {
    let code = course.code;
    if (seen.has(code)) {
      if (CLEAN_CODE_RE.test(code)) return; // same real course twice
      let n = 2;
      while (seen.has(`${course.code} (${n})`)) n++;
      code = `${course.code} (${n})`;
    }
    seen.add(code);
    const c = cat[course.code] || null;
    const hasReq = c && (c.pre || c.co || c.coi || c.standing);
    out.push({
      ...course,
      code,
      title: course.title || (c && c.title) || course.code,
      units: course.units != null ? course.units : (c ? c.units : 3),
      pre: hasReq ? (c.pre || []) : (course.prereqs || []).map(p => [extractCode(p) || normCode(p)]),
      co: hasReq ? (c.co || []) : [],
      standing: hasReq ? c.standing || null : null,
      coi: !!(c && c.coi),
      note: (c && c.note) || null,
      offered: c ? c.offered : null,
      catalogSem: c ? c.catalogSem || null : course.catalogSem || null,
      inCatalog: !!c,
    });
  };

  (list || []).forEach(row => {
    const raw = normCode(row.code);
    if (!raw || raw === 'ELECTIVE' || /^\d+$/.test(raw)) return;
    if (row.genericRequirement || CLEAN_CODE_RE.test(raw) || !/\d/.test(raw)) {
      // GE/HK/NSTP/elective slots can be filled any regular sem.
      add(CLEAN_CODE_RE.test(raw) && !row.genericRequirement ? { ...row, code: raw } : { ...row, code: raw, catalogSem: '1s,2s' });
      return;
    }
    // Garbled row: salvage every course code in its code and title text.
    const text = `${row.code} ${row.title || ''}`;
    const re = new RegExp(COURSE_RE.source, 'g');
    let m;
    while ((m = re.exec(text))) {
      const code = normCode(`${m[1]} ${m[2]}`);
      if (!cat[code] && (m[1] !== m[1].toUpperCase() || /^[IVX]+$/.test(m[1]))) continue; // "Laboratory 3", "Calculus III 3"
      const named = text.slice(re.lastIndex).match(/^\.?\s*([^\d]+?)(?=\s+\d|\s*$)/);
      add({ code, title: cat[code] ? cat[code].title : (named ? named[1].trim() : ''), units: cat[code] ? cat[code].units : row.units, year: row.year, sem: row.sem, prereqs: [] });
    }
  });
  return out;
}

/* ---------- Scheduler ---------- */

/**
 * Greedy topological scheduler.
 *
 * @param {Object} opts
 * @param {Array}  opts.courses     {code,units,sem,pre|prereqs,co,standing,offered,catalogSem,petition}
 * @param {Set}    opts.passed      codes already passed (in progress counts as passed)
 * @param {Object} [opts.notBefore] {CODE: minTermIndex}: retakes, delays, pins
 * @param {Object} [opts.reserved]  {termIndex: units} taken by failed attempts
 * @param {Object} [opts.unitCaps]  per-sem unit caps
 * @param {string} [opts.startSem]  sem of termIndex 0 ('1'|'2'|'midyear')
 * @param {number} [opts.totalUnits] program total, for standing
 * @param {boolean} [opts.useMidyear] false = only checklist midyear courses in midyear
 * @param {number} [opts.maxTerms]
 */
function scheduleEarliest(opts) {
  const courses = plannableCourses(opts.courses);
  const passed = new Set(Array.from(opts.passed || []).map(normCode));
  const notBefore = opts.notBefore || {};
  const reserved = opts.reserved || {};
  const unitCaps = opts.unitCaps || DEFAULT_UNIT_CAPS;
  const startSem = opts.startSem || '1';
  const maxTerms = opts.maxTerms || 30;
  const warnings = [];

  const byCode = new Map();
  courses.forEach(c => byCode.set(normCode(c.code), c));
  const unitsOf = code => {
    const c = byCode.get(code);
    return c && c.units != null ? Number(c.units) : 3;
  };
  const totalUnits = opts.totalUnits || Array.from(byCode.keys()).reduce((s, c) => s + unitsOf(c), 0);

  // Requisites restricted to known courses; unknown ones can't gate anything.
  const groupsOf = new Map();
  const coOf = new Map();
  const dependentsOf = new Map();
  byCode.forEach((course, code) => {
    const groups = [];
    preGroups(course).forEach(g => {
      const known = g.filter(c => byCode.has(c) || passed.has(c));
      if (!known.length) {
        warnings.push(`${code}: unknown prerequisite "${g.join(' or ')}" ignored`);
        return;
      }
      groups.push(known);
      known.forEach(c => {
        if (!byCode.has(c)) return;
        if (!dependentsOf.has(c)) dependentsOf.set(c, []);
        dependentsOf.get(c).push(code);
      });
    });
    groupsOf.set(code, groups);
    coOf.set(code, (course.co || []).map(normCode).filter(c => byCode.has(c) && c !== code));
  });

  // Critical-path priority: longest chain of dependents, memoized DFS.
  const chainMemo = new Map();
  function chainLength(code, visiting) {
    if (chainMemo.has(code)) return chainMemo.get(code);
    if (visiting.has(code)) return 0; // cycle - reported via unschedulable later
    visiting.add(code);
    let best = 0;
    (dependentsOf.get(code) || []).forEach(dep => {
      best = Math.max(best, chainLength(dep, visiting));
    });
    visiting.delete(code);
    chainMemo.set(code, best + 1);
    return best + 1;
  }

  const remaining = new Set();
  byCode.forEach((c, code) => { if (!passed.has(code)) remaining.add(code); });

  let doneUnits = 0;
  byCode.forEach((c, code) => { if (passed.has(code)) doneUnits += unitsOf(code); });

  const assignedTerm = {};
  const conditional = {};
  const plan = [];
  let emptyStreak = 0;

  for (let t = 0; t < maxTerms && remaining.size > 0; t++) {
    const sem = semAt(t, startSem);
    const cap = (unitCaps[sem] != null ? unitCaps[sem] : DEFAULT_UNIT_CAPS[sem]) - (reserved[t] || 0);
    const done = c => passed.has(c) || (assignedTerm[c] !== undefined && assignedTerm[c] < t);

    let candidates = Array.from(remaining).filter(code => {
      const course = byCode.get(code);
      if (!offeredIn(course, sem) && !course.petition) return false;
      // Most students skip midyear; only checklist midyear courses go there unless opted in.
      if (sem === 'midyear' && opts.useMidyear === false && course.sem !== 'midyear') return false;
      if ((notBefore[code] || 0) > t) return false;
      const need = course.standing && STANDING_FRACTION[course.standing];
      if (need && doneUnits < need * totalUnits) return false;
      return groupsOf.get(code).every(g => g.some(done));
    });
    // Coreqs: passed, already placed, or placeable in this same term.
    for (let changed = true; changed;) {
      const set = new Set(candidates);
      const next = candidates.filter(code =>
        coOf.get(code).every(c => done(c) || assignedTerm[c] === t || set.has(c)));
      changed = next.length !== candidates.length;
      candidates = next;
    }

    candidates.sort((a, b) => {
      const diff = chainLength(b, new Set()) - chainLength(a, new Set());
      if (diff !== 0) return diff;
      return unitsOf(b) - unitsOf(a);
    });

    const placed = [];
    let units = 0;
    candidates.forEach(code => {
      if (assignedTerm[code] !== undefined) return;
      // Place a course together with its unplaced coreqs, or not at all.
      const bundle = [code, ...coOf.get(code).filter(c => remaining.has(c) && assignedTerm[c] === undefined)];
      const bundleUnits = bundle.reduce((s, c) => s + unitsOf(c), 0);
      if (units + bundleUnits > cap) return;
      units += bundleUnits;
      bundle.forEach(c => {
        placed.push(c);
        assignedTerm[c] = t;
        remaining.delete(c);
        if (!offeredIn(byCode.get(c), sem)) conditional[c] = true;
      });
    });
    placed.forEach(c => { doneUnits += unitsOf(c); });

    if (placed.length > 0) {
      plan.push({ termIndex: t, sem, courses: placed, units });
      emptyStreak = 0;
    } else {
      // A full offering cycle with no progress and nothing merely waiting on
      // notBefore means the rest can never be placed (cycles, bad data,
      // course bigger than its sem's cap).
      const stillWaiting = Array.from(remaining).some(code => (notBefore[code] || 0) > t);
      emptyStreak = stillWaiting ? 0 : emptyStreak + 1;
      if (emptyStreak >= SEM_CYCLE.length) break;
    }
  }

  const unschedulable = Array.from(remaining);
  if (unschedulable.length > 0) {
    warnings.push(`could not place: ${unschedulable.join(', ')}`);
  }

  const gradTermIndex = plan.length > 0 ? plan[plan.length - 1].termIndex : -1;
  return { plan, gradTermIndex, assignedTerm, conditional, unschedulable, warnings };
}

/* ---------- Curricular Analytics metrics ---------- */

// Prerequisite edges (u -> v) between courses of the program, plus per-course
// delay factor (courses on the longest prerequisite path through it) and
// blocking factor (courses reachable downstream). Coreq edges are excluded.
function analyzeGraph(courses) {
  const list = plannableCourses(courses);
  const codes = new Set(list.map(c => normCode(c.code)));
  const preds = new Map();
  const succs = new Map();
  codes.forEach(c => { preds.set(c, []); succs.set(c, []); });
  const edges = [];
  list.forEach(course => {
    const v = normCode(course.code);
    preGroups(course).forEach(g => g.forEach(u => {
      if (!codes.has(u) || u === v || preds.get(v).includes(u)) return;
      preds.get(v).push(u);
      succs.get(u).push(v);
      edges.push({ from: u, to: v });
    }));
  });

  const longest = (adj) => {
    const memo = new Map();
    const visit = (c, stack) => {
      if (memo.has(c)) return memo.get(c);
      if (stack.has(c)) return 0;
      stack.add(c);
      let best = 0;
      adj.get(c).forEach(n => { best = Math.max(best, visit(n, stack)); });
      stack.delete(c);
      memo.set(c, best + 1);
      return best + 1;
    };
    codes.forEach(c => visit(c, new Set()));
    return memo;
  };
  const up = longest(preds);
  const down = longest(succs);

  const reach = (start, adj) => {
    const seen = new Set();
    const stack = [...adj.get(start)];
    while (stack.length) {
      const c = stack.pop();
      if (seen.has(c) || c === start) continue;
      seen.add(c);
      stack.push(...adj.get(c));
    }
    return seen;
  };

  const delay = {};
  const blocking = {};
  codes.forEach(c => {
    delay[c] = up.get(c) + down.get(c) - 1;
    blocking[c] = reach(c, succs).size;
  });
  return {
    edges, delay, blocking,
    ancestors: c => (preds.has(c) ? reach(c, preds) : new Set()),
    descendants: c => (succs.has(c) ? reach(c, succs) : new Set()),
  };
}

// Slip: rerun the scheduler with one course pushed one term later. slip > 0
// means the course sits on the term-aware critical path. O(n) reruns, cheap
// at curriculum size (~60 courses).
function computeSlips(opts, base) {
  const result = base || scheduleEarliest(opts);
  const slip = {};
  Object.entries(result.assignedTerm).forEach(([code, t]) => {
    const notBefore = { ...(opts.notBefore || {}), [code]: t + 1 };
    const r = scheduleEarliest({ ...opts, notBefore });
    slip[code] = r.unschedulable.length > result.unschedulable.length
      ? Infinity
      : r.gradTermIndex - result.gradTermIndex;
  });
  return slip;
}

if (typeof module !== 'undefined') {
  module.exports = {
    scheduleEarliest, semAt, offeredIn, termLabel, plannableCourses, normCode, extractCode,
    parseRequisite, combineRequisites, parseSemOffered, analyzeGraph, computeSlips, preGroups, enrichCourses,
    DEFAULT_UNIT_CAPS, STANDING_FRACTION,
  };
}
