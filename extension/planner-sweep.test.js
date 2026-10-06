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
  // Every track, and every specialization on the default track.
  const runs = [...(p.tracks ? Object.keys(p.tracks) : [null]).map(track => [track, null]),
    ...Object.keys(p.specializations || {}).map(spec => [p.defaultTrack || null, spec])];
  runs.forEach(([track, spec]) => {
    const label = [p.code, track, spec].filter(Boolean).join(' ');
    const r = scheduleEarliest({
      courses: enrichCourses(getPlannerCourses(p, track, spec), UPLB_CATALOG),
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
