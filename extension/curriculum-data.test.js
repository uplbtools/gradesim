// Data checks for every available program. Run: node extension/curriculum-data.test.js
// A program that cannot pass stays `available: false` (shown as coming soon).
const assert = require('assert');
const { UPLB_PROGRAMS, getPlannerCourses, isNonGwaCourseCode, normalizeCourseCode } = require('./src/curriculum.js');
const { UPLB_CATALOG } = require('./src/catalog.js');

// Departments seen in AMIS class listings, plus slot prefixes the code generates
// (GE, HK, NSTP, FE) or the data uses (MAJ for major elective slots), and
// real departments with no class in the listings we have.
const DEPTS = new Set(Object.keys(UPLB_CATALOG).map(c => c.split(' ')[0]));
['GE', 'HK', 'NSTP', 'FE', 'MAJ', 'HIST', 'PED', 'POSC', 'SOIL'].forEach(d => DEPTS.add(d));
const CODE_RE = /^([A-Z]{2,6}|PEd) \d{1,3}(\.\d{1,2})?[A-Z]?$/;

function codeProblem(code) {
  if (!CODE_RE.test(code)) return 'not a course code';
  if (!DEPTS.has(code.split(' ')[0].toUpperCase())) return 'unknown department';
  return null;
}

// Rough unit totals by degree when a program states none.
function expectedTotal(p) {
  if (p.totalUnitsRequired) return [p.totalUnitsRequired * 0.9, p.totalUnitsRequired * 1.1];
  if (p.code === 'DVM') return [200, 240];
  if (/^A/.test(p.code)) return [70, 80];
  return [140, 180];
}

const failures = [];
const fail = (prog, msg) => failures.push(`${prog}: ${msg}`);

// The negative cases the issue names must be rejected.
['3', 'Elective', 'MID', 'rol', 'dicine', 'MAJOR', 'FIFTH', 'YEAR 3', 'CHEM 18. University Chemistry', 'MAJOR 200', 'MIDYEAR 1']
  .forEach(bad => assert.ok(codeProblem(bad), `should reject "${bad}"`));
['CMSC 12', 'MATH 27', 'ABT 10', 'HNF 200', 'PEd 91', 'BIO 11.1', 'GE 1', 'FE 2', 'HK 1', 'NSTP 2', 'MAJ 3', 'AAE 200A']
  .forEach(good => assert.strictEqual(codeProblem(good), null, `should accept "${good}"`));

const available = Object.values(UPLB_PROGRAMS).filter(p => p.available);
assert.ok(available.length > 0, 'at least one program is available');

available.forEach(p => {
  const rows = p.majorCourses || [];
  if (!rows.length) fail(p.code, 'no courses');

  rows.forEach(c => {
    const why = codeProblem(c.code);
    if (why) fail(p.code, `${why}: "${c.code}"`);
    // Practicums and internships run a whole term (HNF 200A at 12, VETC 176 at 14).
    const maxUnits = /practicum|internship|clerkship/i.test(c.title || '') ? 18 : 6;
    if (!(typeof c.units === 'number' && c.units > 0 && c.units <= maxUnits)) fail(p.code, `${c.code} has ${c.units} units`);
    if (!c.title || /Unknown Title/i.test(c.title)) fail(p.code, `${c.code} has no title`);
    if (!(c.year >= 1 && c.year <= 6)) fail(p.code, `${c.code} has year ${c.year}`);
    if (!['1', '2', 'midyear'].includes(c.sem)) fail(p.code, `${c.code} has sem ${c.sem}`);
  });

  const listed = new Set(rows.map(c => normalizeCourseCode(c.code)));
  (p.requiredCodes || []).forEach(code => {
    const why = codeProblem(code);
    if (why) fail(p.code, `required list: ${why}: "${code}"`);
    else if (!listed.has(normalizeCourseCode(code))) fail(p.code, `required ${code} is not in the course list`);
  });

  const tracks = p.tracks ? Object.keys(p.tracks) : [null];
  tracks.forEach(track => {
    const plan = getPlannerCourses(p, track);
    const seen = new Set();
    plan.forEach(c => {
      const code = normalizeCourseCode(c.code);
      if (seen.has(code)) fail(p.code, `duplicate ${code}${track ? ` (${track})` : ''}`);
      seen.add(code);
    });
    const units = plan.filter(c => !isNonGwaCourseCode(c.code)).reduce((s, c) => s + c.units, 0);
    const [lo, hi] = expectedTotal(p);
    if (units < lo || units > hi) {
      fail(p.code, `${units} units${track ? ` (${track})` : ''}, expected ${p.totalUnitsRequired || `${lo} to ${hi}`}`);
    }
  });
});

// Every SP or thesis track code must be a course of its program (#80), or
// track detection can never fire.
Object.values(UPLB_PROGRAMS).filter(p => p.tracks).forEach(p => {
  const listed = new Set((p.majorCourses || []).map(c => normalizeCourseCode(c.code)));
  Object.entries(p.tracks).forEach(([key, t]) => {
    if (!listed.has(normalizeCourseCode(t.code))) fail(p.code, `track ${key} code ${t.code} is not in the course list`);
    const tagged = (p.majorCourses || []).find(c => normalizeCourseCode(c.code) === normalizeCourseCode(t.code));
    if (tagged && tagged.track && tagged.track !== key) fail(p.code, `${t.code} is tagged ${tagged.track}, not ${key}`);
  });
  if (p.defaultTrack && !p.tracks[p.defaultTrack]) fail(p.code, `default track ${p.defaultTrack} does not exist`);
});

assert.deepStrictEqual(failures, [], `\n${failures.join('\n')}`);
console.log(`curriculum-data.test.js: ${available.length} available programs pass`);
