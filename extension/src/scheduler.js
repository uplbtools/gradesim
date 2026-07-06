/**
 * Elbi GradeSim - Graduation Scheduler
 * Pure functions, no DOM or chrome.* — also runs under node for tests.
 *
 * Computes the earliest feasible term for every remaining course given
 * prerequisites, semester offerings (1st/2nd/midyear), and per-term unit caps.
 */

const SEM_CYCLE = ['1', '2', 'midyear'];
const DEFAULT_UNIT_CAPS = { '1': 21, '2': 21, 'midyear': 6 };

function normCode(code) {
  return (code || '').toUpperCase().trim();
}

// Which semester falls at termIndex terms after startSem.
function semAt(termIndex, startSem) {
  const start = SEM_CYCLE.indexOf(startSem);
  return SEM_CYCLE[(start + termIndex) % SEM_CYCLE.length];
}

// ponytail: curriculum data has one `sem` per course (its slot in the model
// curriculum), used here as "the sem it is offered". Missing sem = offered
// both regular sems. Upgrade path: real per-course offering lists.
function offeredIn(course, sem) {
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

/**
 * Greedy topological scheduler.
 *
 * @param {Object} opts
 * @param {Array}  opts.courses   curriculum majorCourses ({code,title,units,sem,prereqs})
 * @param {Set}    opts.passed    codes already passed (normalized or not)
 * @param {Object} [opts.notBefore]  {CODE: minTermIndex} — delay mechanism
 * @param {Object} [opts.unitCaps]   per-sem unit caps
 * @param {string} [opts.startSem]   sem of termIndex 0 ('1'|'2'|'midyear')
 * @param {number} [opts.maxTerms]
 * @returns {{plan: Array, gradTermIndex: number, assignedTerm: Object,
 *            unschedulable: Array, warnings: Array}}
 */
function scheduleEarliest(opts) {
  const courses = plannableCourses(opts.courses);
  const passed = new Set(Array.from(opts.passed || []).map(normCode));
  const notBefore = opts.notBefore || {};
  const unitCaps = opts.unitCaps || DEFAULT_UNIT_CAPS;
  const startSem = opts.startSem || '1';
  const maxTerms = opts.maxTerms || 30;
  const warnings = [];

  const byCode = new Map();
  courses.forEach(c => byCode.set(normCode(c.code), c));

  // Prereqs restricted to known courses; unknown ones can't gate anything.
  const prereqsOf = new Map();
  const dependentsOf = new Map();
  byCode.forEach((course, code) => {
    const known = [];
    (course.prereqs || []).forEach(pr => {
      const prCode = normCode(pr);
      if (byCode.has(prCode) || passed.has(prCode)) {
        known.push(prCode);
        if (byCode.has(prCode)) {
          if (!dependentsOf.has(prCode)) dependentsOf.set(prCode, []);
          dependentsOf.get(prCode).push(code);
        }
      } else {
        warnings.push(`${code}: unknown prerequisite "${pr}" ignored`);
      }
    });
    prereqsOf.set(code, known);
  });

  // Critical-path priority: longest chain of dependents, memoized DFS.
  const chainMemo = new Map();
  function chainLength(code, visiting) {
    if (chainMemo.has(code)) return chainMemo.get(code);
    if (visiting.has(code)) return 0; // cycle — reported via unschedulable later
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

  const assignedTerm = {};
  const plan = [];
  let emptyStreak = 0;

  for (let t = 0; t < maxTerms && remaining.size > 0; t++) {
    const sem = semAt(t, startSem);
    const cap = unitCaps[sem] != null ? unitCaps[sem] : DEFAULT_UNIT_CAPS[sem];

    const candidates = Array.from(remaining).filter(code => {
      const course = byCode.get(code);
      if (!offeredIn(course, sem)) return false;
      if ((notBefore[code] || 0) > t) return false;
      return prereqsOf.get(code).every(pr =>
        passed.has(pr) || (assignedTerm[pr] !== undefined && assignedTerm[pr] < t)
      );
    });

    candidates.sort((a, b) => {
      const diff = chainLength(b, new Set()) - chainLength(a, new Set());
      if (diff !== 0) return diff;
      return (byCode.get(b).units || 0) - (byCode.get(a).units || 0);
    });

    const placed = [];
    let units = 0;
    candidates.forEach(code => {
      const courseUnits = byCode.get(code).units || 3;
      if (units + courseUnits > cap) return;
      units += courseUnits;
      placed.push(code);
      assignedTerm[code] = t;
      remaining.delete(code);
    });

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
  return { plan, gradTermIndex, assignedTerm, unschedulable, warnings };
}

if (typeof module !== 'undefined') {
  module.exports = { scheduleEarliest, semAt, offeredIn, termLabel, plannableCourses, normCode, DEFAULT_UNIT_CAPS };
}
