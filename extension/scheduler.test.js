// Self-check for scheduler.js. Run: node extension/scheduler.test.js
const assert = require('assert');
const { scheduleEarliest, semAt, termLabel } = require('./src/scheduler.js');

const C = (code, units, sem, prereqs = []) => ({ code, title: code, units, sem, prereqs });

// Synthetic curriculum: A -> B -> C chain across alternating sems, D midyear-only.
const COURSES = [
  C('A', 3, '1'),
  C('B', 3, '2', ['A']),
  C('CC', 3, '1', ['B']),
  C('D', 3, 'midyear'),
  C('E', 3, '1'),
];

// helpers
assert.strictEqual(semAt(0, '1'), '1');
assert.strictEqual(semAt(1, '1'), '2');
assert.strictEqual(semAt(2, '1'), 'midyear');
assert.strictEqual(semAt(3, '1'), '1');
assert.strictEqual(termLabel(0, 2026, '1'), '2026 1st Sem');
assert.strictEqual(termLabel(1, 2026, '1'), '2027 2nd Sem');
assert.strictEqual(termLabel(2, 2026, '1'), '2027 Midyear');
assert.strictEqual(termLabel(3, 2026, '1'), '2027 1st Sem');

// baseline: A,E @ t0; B @ t1; D @ t2 (midyear); CC @ t3 (next 1st sem)
let r = scheduleEarliest({ courses: COURSES, passed: new Set(), startSem: '1' });
assert.strictEqual(r.assignedTerm['A'], 0);
assert.strictEqual(r.assignedTerm['E'], 0);
assert.strictEqual(r.assignedTerm['B'], 1);
assert.strictEqual(r.assignedTerm['D'], 2);
assert.strictEqual(r.assignedTerm['CC'], 3);
assert.strictEqual(r.gradTermIndex, 3);
assert.deepStrictEqual(r.unschedulable, []);

// fail cascade: having passed A+B, failing B (removed from passed) pushes
// CC from t0 to t3 — a full offering cycle later.
const withB = scheduleEarliest({ courses: COURSES, passed: new Set(['A', 'B']), startSem: '1' });
assert.strictEqual(withB.assignedTerm['CC'], 0);
const failB = scheduleEarliest({ courses: COURSES, passed: new Set(['A']), startSem: '1' });
assert.strictEqual(failB.assignedTerm['B'], 1);
assert.strictEqual(failB.assignedTerm['CC'], 3);

// unit cap: only 6 units fit in 1st sem, third course waits for next 1st sem
const capped = scheduleEarliest({
  courses: [C('X1', 3, '1'), C('X2', 3, '1'), C('X3', 3, '1')],
  passed: new Set(),
  unitCaps: { '1': 6, '2': 21, 'midyear': 6 },
  startSem: '1',
});
const t0Count = ['X1', 'X2', 'X3'].filter(c => capped.assignedTerm[c] === 0).length;
assert.strictEqual(t0Count, 2);
assert.strictEqual(Math.max(...['X1', 'X2', 'X3'].map(c => capped.assignedTerm[c])), 3);

// notBefore delay honored, and offering still respected (t3 is next 1st sem)
const delayed = scheduleEarliest({ courses: [C('A', 3, '1')], passed: new Set(), notBefore: { A: 1 }, startSem: '1' });
assert.strictEqual(delayed.assignedTerm['A'], 3);

// unknown prereq dropped with a warning, course still schedules
const unk = scheduleEarliest({ courses: [C('F', 3, '2', ['GHOST 1'])], passed: new Set(), startSem: '1' });
assert.strictEqual(unk.assignedTerm['F'], 1);
assert.ok(unk.warnings.some(w => w.includes('GHOST 1')));

// prereq cycle terminates and reports both as unschedulable
const cyc = scheduleEarliest({
  courses: [C('P', 3, '1', ['Q']), C('Q', 3, '1', ['P'])],
  passed: new Set(),
  startSem: '1',
});
assert.deepStrictEqual(cyc.unschedulable.sort(), ['P', 'Q']);

// critical path first under tight caps: chain head beats leaf course
const crit = scheduleEarliest({
  courses: [C('H1', 3, '1'), C('H2', 3, '2', ['H1']), C('H3', 3, '1', ['H2']), C('LEAF', 3, '1')],
  passed: new Set(),
  unitCaps: { '1': 3, '2': 21, 'midyear': 6 },
  startSem: '1',
});
assert.strictEqual(crit.assignedTerm['H1'], 0); // chain of 3 outranks LEAF

console.log('scheduler.test.js: all assertions passed');
