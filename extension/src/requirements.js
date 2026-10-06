// requirements.js - what a student has passed and what is left, shared by the
// popup What if tab and the planner so both count the same courses.
// Uses getPlannerCourses, isGECourse, isNonGwaCourseCode and
// normalizeCourseCode from curriculum.js and enrichCourses from scheduler.js.

// One AMIS grade as passed, failed, nograde, or other (INC, DRP, 4.00).
function gradeResult(raw) {
  const g = (raw == null ? '' : String(raw)).toUpperCase().trim();
  const n = parseFloat(g);
  if (g === 'S' || g === 'P' || (n >= 1 && n <= 3)) return 'passed';
  if (n === 5 || g === 'F' || g === 'U') return 'failed';
  if (!g) return 'nograde';
  return 'other';
}

// AMIS term ids are 1, a two digit year, then the term: 1251 is AY 2025-26
// 1st sem and 1303 is the AY 2030-31 midyear. Returns an absolute term number
// (year * 3, plus 0 for 1st sem, 1 for 2nd, 2 for midyear) or null.
function amisTermToAbs(id) {
  const m = String(id).match(/^1(\d\d)([123])$/);
  return m ? (2000 + Number(m[1])) * 3 + Number(m[2]) - 1 : null;
}

// Every AMIS row as { code, title, units, grade, result, termId }.
function amisCourses(gradesData) {
  return Object.entries((gradesData && gradesData.student_grades) || {})
    .flatMap(([termId, t]) => ((t && t.values) || []).map(v => ({
      code: normalizeCourseCode(v.course && v.course.course_code),
      title: (v.course && v.course.title) || '',
      units: parseFloat(v.unit_taken) || 0,
      grade: v.grade,
      result: gradeResult(v.grade),
      termId,
    })))
    .filter(r => r.code);
}

// Put rows ({ code, title, units }) into planner slots. A named checklist
// course fills itself and a substitution fills its required course. Then GE,
// HK and NSTP courses fill their placeholder slots and any other course with
// units fills a free elective slot, one course per slot.
// Returns Map(slot code -> row).
// ponytail: one course per 3-unit elective slot, so a 6-unit elective fills one.
// UPLB accepts these in place of the checklist course without a petition.
// The student's own substitutions are applied first and win.
const BUILT_IN_EQUIVALENTS = [['KAS 1', 'HIST 1']];

function fillRequirementSlots(courses, rows, substitutions = {}) {
  const norm = r => normalizeCourseCode(r.code);
  const named = new Set(courses.filter(c => !c.genericRequirement).map(c => normalizeCourseCode(c.code)));
  const fill = new Map();
  rows.forEach(r => { if (named.has(norm(r)) && !fill.has(norm(r))) fill.set(norm(r), r); });
  const used = new Set();
  [...Object.entries(substitutions || {}), ...BUILT_IN_EQUIVALENTS].forEach(([req, taken]) => {
    const code = normalizeCourseCode(req);
    const row = rows.find(r => norm(r) === normalizeCourseCode(taken));
    if (!row || used.has(norm(row)) || !named.has(code) || fill.has(code)) return;
    // Only a course that actually fills the requirement is used up; otherwise
    // it still counts toward GE or electives.
    used.add(norm(row));
    fill.set(code, row);
  });
  const seen = new Set();
  const outside = rows.filter(r => {
    const code = norm(r);
    if (named.has(code) || used.has(code) || seen.has(code)) return false;
    seen.add(code);
    return true;
  });
  const kindOf = r => {
    const code = norm(r);
    if (isGECourse(code, r.title)) return 'ge';
    if (/^(HK|PE)\b/.test(code)) return 'hk';
    if (/^NSTP\b/.test(code)) return 'nstp';
    return r.units > 0 ? 'elective' : null;
  };
  ['ge', 'hk', 'nstp', 'elective'].forEach(kind => {
    const taken = outside.filter(r => kindOf(r) === kind);
    courses.filter(c => c.genericRequirement === kind).forEach((slot, i) => {
      if (taken[i]) fill.set(normalizeCourseCode(slot.code), taken[i]);
    });
  });
  return fill;
}

// The planner's course list: checklist rows for the track plus GE, HK, NSTP
// and free elective slots, with catalog units, offerings and prerequisites.
function plannerCourseList(program, track, catalog) {
  return enrichCourses(getPlannerCourses(program, track), catalog || {});
}

// What is left of a plannerCourseList for passed rows. overrides are the
// planner's manual marks ({ code: 'passed' | 'failed' | 'planned' }).
// units counts every course left, the number the planner shows. gwaUnits
// leaves out HK and NSTP, which the GWA skips.
function remainingRequirements(courses, passedRows, { substitutions = {}, overrides = {} } = {}) {
  const fill = fillRequirementSlots(courses, passedRows, substitutions);
  const done = c => {
    const o = overrides[c.code];
    if (o === 'passed') return true;
    if (o === 'failed' || o === 'planned') return false;
    return fill.has(normalizeCourseCode(c.code));
  };
  const sum = list => list.reduce((s, c) => s + (Number(c.units) || 0), 0);
  const left = courses.filter(c => !done(c));
  const ge = courses.filter(c => c.genericRequirement === 'ge' || (!c.genericRequirement && isGECourse(c.code, c.title)));
  // Free electives only. MAJ slots are major electives, counted with the rest.
  const fe = courses.filter(c => c.genericRequirement === 'elective' && /^FE\b/.test(c.code));
  return {
    courses,
    fill,
    left,
    units: sum(left),
    gwaUnits: sum(left.filter(c => !isNonGwaCourseCode(c.code))),
    ge: { done: ge.filter(done).length, total: ge.length },
    electives: { doneUnits: sum(fe.filter(done)), totalUnits: sum(fe) },
  };
}

const LATIN_HONORS = [['Summa cum laude', 1.20], ['Magna cum laude', 1.45], ['Cum laude', 1.75]];

// Where a target GWA stands. gwa and units are the GWA so far and the units
// behind it, left is the GWA units still to take.
// status: reachable, any-pass (passing every course is enough), or
// out-of-reach. ceiling is the GWA with 1.00 in everything left.
function gwaOutlook(gwa, units, left, target) {
  const sum = gwa * units;
  const ceiling = units + left > 0 ? (sum + left) / (units + left) : 0;
  const bestHonor = LATIN_HONORS.find(([, cut]) => ceiling > 0 && ceiling <= cut + 1e-9) || null;
  if (left <= 0) {
    return { status: gwa <= target ? 'any-pass' : 'out-of-reach', required: null, ceiling, bestHonor };
  }
  const required = (target * (units + left) - sum) / left;
  // Grades run from 1.00 to 3.00 for a pass, so a needed average above 3.00
  // means any passing grade is enough, and one under 1.00 cannot happen.
  const status = required < 1 - 1e-9 ? 'out-of-reach' : required >= 3 ? 'any-pass' : 'reachable';
  return { status, required, ceiling, bestHonor };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { gradeResult, amisTermToAbs, amisCourses, plannerCourseList, fillRequirementSlots, remainingRequirements, gwaOutlook, LATIN_HONORS };
}
