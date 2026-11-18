// Seeded random grade records through the popup's own code, each checked against a plain reference
// written from the rule. Run: node extension/reference.test.js
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const popup = vm.createContext({ document: { addEventListener() {} } });
for (const file of ['curriculum.js', 'requirements.js', 'popup.js']) {
  vm.runInContext(fs.readFileSync(require.resolve(`./src/${file}`), 'utf8'), popup, { filename: file });
}
const { parseAMISData, calculateGWA, lightSems, gwaOutlook } = popup;

const CASES = 1000;
function seeded(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const int = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
const pick = (r, list) => list[int(r, 0, list.length - 1)];
const near = (a, b) => Math.abs(a - b) < 1e-6;

// Runs one case per seed. A failure names the seed that reproduces it.
function agree(name, first, one) {
  const bad = [];
  for (let seed = first; seed < first + CASES; seed++) {
    const why = one(seeded(seed));
    if (why) bad.push(`seed ${seed}: ${why}`);
  }
  console.log(`${name}: ${CASES - bad.length} of ${CASES} agree`);
  assert.deepStrictEqual(bad, []);
}

const CODES = ['CMSC 12', 'CMSC 21', 'MATH 27', 'CHEM 18', 'ENG 13', 'STAT 101', 'PEd 101', 'CMSC 190', 'HK 11', 'HK 12', 'PE 2', 'NSTP 1'];
const GRADES = ['1.00', '1.25', '1.50', '1.75', '2.00', '2.25', '2.50', '2.75', '3.00', '4.00', '5.00', 'INC', 'DRP', 'S', 'U', 'W', 'P', 'DFG'];

function record(r) {
  const rows = [];
  for (let s = 0, sems = int(r, 1, 10); s < sems; s++) {
    const term = `1${21 + Math.floor(s / 3)}${(s % 3) + 1}`;
    const codes = [...CODES].sort(() => r() - 0.5).slice(0, s % 3 === 2 ? int(r, 0, 2) : int(r, 1, 8));
    codes.forEach((code, i) => rows.push({ id: `${term}-${i}`, term, code, units: pick(r, [0, 1, 2, 3, 3, 3, 4, 5]), grade: pick(r, GRADES) }));
  }
  const data = { student_grades: {} };
  rows.forEach(row => {
    (data.student_grades[row.term] ??= { values: [] }).values.push({
      id: row.id,
      course: { course_code: row.code, title: row.code },
      unit_taken: row.units,
      grade: row.grade,
    });
  });
  return { rows, courses: parseAMISData(data), left: new Set(rows.filter(() => r() < 0.1).map(row => row.id)) };
}

const academic = row => !/^(NSTP|HK|PE) /.test(row.code);

function refGwa(rows, left) {
  let points = 0;
  let units = 0;
  let passed = 0;
  for (const row of rows) {
    let grade = Number(row.grade);
    if (row.code === 'CMSC 190' && row.grade === 'S') {
      const final = rows.findLast(o => o.code === 'CMSC 190' && Number(o.grade) <= 3);
      if (final) grade = Number(final.grade);
    }
    if (!academic(row) || !(grade >= 1) || !row.units || left.has(row.id)) continue;
    points += grade * row.units;
    units += row.units;
    if (grade <= 3) passed += row.units;
  }
  return { gwa: units ? points / units : 0, units, passed };
}

agree('GWA', 1000, r => {
  const { rows, courses, left } = record(r);
  const got = calculateGWA(courses, left);
  const want = refGwa(rows, left);
  if (!near(got.gwa, want.gwa) || got.totalUnits !== want.units || got.passedUnits !== want.passed) {
    return `${got.gwa} over ${got.totalUnits} units (${got.passedUnits} passed), reference ${want.gwa} over ${want.units} (${want.passed})`;
  }
});

agree('Light sems', 2000, r => {
  const { rows, courses } = record(r);
  const load = new Map();
  for (const row of rows) {
    if (row.term.endsWith('3') || !academic(row) || row.grade === 'DRP' || row.grade === 'W') continue;
    load.set(row.term, (load.get(row.term) ?? 0) + row.units);
  }
  const want = [...load].slice(0, -1).filter(([, units]) => units < 15).map(([term]) => courses.find(c => c.termId === term).term);
  const got = lightSems(courses).map(s => s.label);
  if (got.join() !== want.join()) return `light sems ${got.join(', ')}, reference ${want.join(', ')}`;
});

agree('Target', 3000, r => {
  const units = int(r, 0, 160);
  const gwa = units ? int(r, 10000, 50000) / 10000 : 0;
  const left = int(r, 0, 160);
  const target = pick(r, [1.2, 1.45, 1.75, 2, int(r, 100, 300) / 100]);
  const finish = grade => (units + left ? (gwa * units + grade * left) / (units + left) : 0);
  let status = 'reachable';
  if (!left) status = gwa <= target ? 'any-pass' : 'out-of-reach';
  else if (finish(1) > target + 1e-9) status = 'out-of-reach';
  else if (finish(3) <= target) status = 'any-pass';
  const got = gwaOutlook(gwa, units, left, target);
  if (got.status !== status) return `status ${got.status}, reference ${status}`;
  if (!near(got.ceiling, finish(1))) return `ceiling ${got.ceiling}, reference ${finish(1)}`;
  if (status === 'reachable' && !near(finish(got.required), target)) return `needing ${got.required} lands on ${finish(got.required)}`;
});
