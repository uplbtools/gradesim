// What if and planner count the same courses left (#78, #94), term ids past
// 2029 parse (#86), and the GWA outlook math (#95).
// Run: node extension/requirements.test.js
const assert = require('assert');
Object.assign(globalThis, require('./src/curriculum.js'), require('./src/scheduler.js'));
const { UPLB_CATALOG } = require('./src/catalog.js');
const { amisTermToAbs, gradeResult, amisCourses, plannerCourseList, remainingRequirements, gwaOutlook } = require('./src/requirements.js');

assert.strictEqual(amisTermToAbs(1251), 2025 * 3);
assert.strictEqual(amisTermToAbs('1232'), 2023 * 3 + 1);
assert.strictEqual(amisTermToAbs(1293), 2029 * 3 + 2);
assert.strictEqual(amisTermToAbs(1301), 2030 * 3);
assert.strictEqual(amisTermToAbs(1312), 2031 * 3 + 1);
assert.strictEqual(amisTermToAbs(1254), null);
assert.strictEqual(amisTermToAbs('abc'), null);

assert.strictEqual(gradeResult('1.00'), 'passed');
assert.strictEqual(gradeResult('P'), 'passed');
assert.strictEqual(gradeResult('5.00'), 'failed');
assert.strictEqual(gradeResult('INC'), 'other');
assert.strictEqual(gradeResult('4.00'), 'other');
assert.strictEqual(gradeResult(null), 'nograde');

// A BSCS student with GE courses named by code, HK, NSTP, a PEd course and an
// outside elective, a failed then retaken course, an open 5.00, an INC, and
// two courses being taken now.
const v = (code, title, units, grade) => ({ grade, unit_taken: String(units), course: { course_code: code, title } });
const gradesData = { student_grades: {
  1231: { values: [v('CMSC 12', 'Foundations of Computer Science', 3, '1.00'), v('CMSC 56', 'Discrete Mathematics I', 3, '1.50'),
    v('MATH 27', 'Analytic Geometry and Calculus II', 3, 'INC'), v('ETHICS 1', 'Ethics and Moral Reasoning', 3, '1.25'),
    v('HK 11', 'Wellness', 2, '1.00'), v('NSTP 1', 'National Service Training Program I', 3, 'P')] },
  1232: { values: [v('CMSC 21', 'Fundamentals of Programming', 3, '5.00'), v('CMSC 22', 'Object-Oriented Programming', 3, '1.75'),
    v('STS 1', 'Science, Technology and Society', 3, '1.50'), v('ARTS 1', 'Critical Perspectives in the Arts', 3, '1.25'),
    v('PED 101', 'Foundations of Physical Education', 3, '1.50')] },
  1241: { values: [v('CMSC 21', 'Fundamentals of Programming', 3, '2.00'), v('MATH 28', 'Analytic Geometry and Calculus III', 3, '2.25'),
    v('CMSC 123', 'Data Structures', 3, '5.00'), v('ECON 11', 'Introductory Economics', 3, '1.75')] },
  1251: { values: [v('CMSC 100', 'Web Programming', 3, null), v('CMSC 127', 'File Processing and Database Systems', 3, null)] },
} };
const BSCS = UPLB_PROGRAMS.BSCS;
const passedRows = amisCourses(gradesData).filter(r => r.result === 'passed');
const courses = plannerCourseList(BSCS, 'sp', UPLB_CATALOG);
const left = remainingRequirements(courses, passedRows);
const leftCodes = new Set(left.left.map(c => c.code));

// One GE model (#94): ETHICS 1, STS 1 and ARTS 1 fill three GE slots.
assert.deepStrictEqual(left.ge, { done: 3, total: 9 });
// HK and NSTP complete (#78), PEd and ECON 11 fill free elective slots.
assert.ok(!leftCodes.has('HK 1') && leftCodes.has('HK 2'));
assert.ok(!leftCodes.has('NSTP 1') && leftCodes.has('NSTP 2'));
assert.deepStrictEqual(left.electives, { doneUnits: 6, totalUnits: 18 });
// Retaken course is done; open failure, INC and courses in progress are left.
assert.ok(!leftCodes.has('CMSC 21'));
['CMSC 123', 'MATH 27', 'CMSC 100', 'CMSC 127'].forEach(c => assert.ok(leftCodes.has(c), c));
// HK and NSTP units are left to take but do not count in the GWA.
assert.strictEqual(left.units - left.gwaUnits, 2 + 3);

// The planner's units left: schedule what the slots leave open, the way
// planner.js does, and add up every course it places or cannot place.
const plan = scheduleEarliest({ courses, passed: new Set(left.fill.keys()), useMidyear: false, totalUnits: BSCS.totalUnitsRequired });
const byCode = new Map(courses.map(c => [c.code, c]));
const plannerUnits = [...Object.keys(plan.assignedTerm), ...plan.unschedulable]
  .reduce((s, code) => s + (Number(byCode.get(code).units) || 0), 0);
assert.strictEqual(left.units, plannerUnits);

// Programs without tracks get no made-up 15 free elective units (#78):
// BSSTAT has only major elective slots, BSFST lists two FE slots.
assert.strictEqual(remainingRequirements(plannerCourseList(UPLB_PROGRAMS.BSSTAT, null, UPLB_CATALOG), []).electives.totalUnits, 0);
assert.strictEqual(remainingRequirements(plannerCourseList(UPLB_PROGRAMS.BSFST, null, UPLB_CATALOG), []).electives.totalUnits, 6);

// Overrides from the planner count too.
const marked = remainingRequirements(courses, passedRows, { overrides: { 'CMSC 123': 'passed', 'CMSC 12': 'failed' } });
assert.strictEqual(marked.units, left.units);

// Outlook (#95): a target the remaining units cannot reach shows the ceiling
// and the best honor still possible.
const out = gwaOutlook(1.9, 60, 60, 1.2);
assert.strictEqual(out.status, 'out-of-reach');
assert.strictEqual(out.ceiling, 1.45);
assert.deepStrictEqual(out.bestHonor, ['Magna cum laude', 1.45]);
const ok = gwaOutlook(1.9, 60, 60, 1.75);
assert.strictEqual(ok.status, 'reachable');
assert.strictEqual(Number(ok.required.toFixed(2)), 1.6);
assert.strictEqual(gwaOutlook(1.5, 60, 10, 1.75).status, 'any-pass');
assert.strictEqual(gwaOutlook(2.5, 60, 0, 1.75).status, 'out-of-reach');

console.log('requirements.test.js: all assertions passed');

// Tester feedback (BS Economics): HIST 1 stands in for KAS 1, and a course
// used that way does not also fill a GE or free elective slot.
{
  const econ = plannerCourseList(UPLB_PROGRAMS.BSECON, undefined, UPLB_CATALOG);
  const histOnly = [{ code: 'HIST 1', title: 'Philippine History', units: 3, result: 'passed' }];
  const r = remainingRequirements(econ, histOnly);
  assert.ok(r.fill.has('KAS 1'), 'HIST 1 should satisfy KAS 1');
  assert.strictEqual(r.electives.doneUnits, 0, 'HIST 1 must not also count as a free elective');
  const both = [...histOnly, { code: 'KAS 1', title: 'Kasaysayan ng Pilipinas', units: 3, result: 'passed' }];
  const r2 = remainingRequirements(econ, both);
  assert.strictEqual(r2.fill.get('KAS 1').code, 'KAS 1', 'KAS 1 fills itself when taken');
  assert.strictEqual(remainingRequirements(econ, []).electives.doneUnits, 0, 'no electives done with nothing taken');
  console.log('requirements.test.js: HIST 1 for KAS 1 passed');
}
