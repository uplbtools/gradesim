// Plan every available program from an empty transcript the way planner.js
// does, at the default 18-unit cap with midyear off.
// Run: node extension/planner-sweep.test.js
const assert = require('assert');
const { UPLB_PROGRAMS, getPlannerCourses } = require('./src/curriculum.js');
const { UPLB_CATALOG } = require('./src/catalog.js');
const { enrichCourses, scheduleEarliest, semAt } = require('./src/scheduler.js');

const failures = [];
Object.values(UPLB_PROGRAMS).filter(p => p.available).forEach(p => {
  const years = Math.max(...p.majorCourses.map(c => c.year));
  (p.tracks ? Object.keys(p.tracks) : [null]).forEach(track => {
    const label = track ? `${p.code} (${track})` : p.code;
    const r = scheduleEarliest({
      courses: enrichCourses(getPlannerCourses(p, track), UPLB_CATALOG),
      passed: new Set(),
      useMidyear: false,
      totalUnits: p.totalUnitsRequired,
    });
    if (r.unschedulable.length) failures.push(`${label}: cannot place ${r.unschedulable.join(', ')}`);
    let regular = 0;
    for (let t = 0; t <= r.gradTermIndex; t++) if (semAt(t, '1') !== 'midyear') regular++;
    if (regular < 2 * years) failures.push(`${label}: ${regular} regular terms for a ${years}-year checklist`);
  });
});

assert.deepStrictEqual(failures, [], `\n${failures.join('\n')}`);
console.log('planner-sweep.test.js: every available program plans from scratch');
