// Self-check for curriculum helpers. Run: node extension/curriculum.test.js
const assert = require('assert');
const {
  UPLB_PROGRAMS,
  isGECourse,
  isNonGwaCourseCode,
  countCompletedGE,
  genericRequirementCourses,
  getCompletedRequirementSlotCodes
} = require('./src/curriculum.js');

assert.strictEqual(isGECourse('ARTS 1', 'Critical Perspectives in the Arts'), true);
assert.strictEqual(isGECourse('GE 1', 'General Education'), true);
assert.strictEqual(isGECourse('CMSC 12', 'Foundations of Computer Science'), false);
assert.strictEqual(isNonGwaCourseCode('HK 11'), true);
assert.strictEqual(isNonGwaCourseCode('NSTP 1'), true);
assert.strictEqual(isNonGwaCourseCode('ARTS 1'), false);

const completed = [
  { code: 'ARTS 1', title: 'Critical Perspectives in the Arts' },
  { code: 'COMM 10', title: 'Critical Perspectives in Communication' },
  { code: 'HK 11', title: 'Human Kinetics' },
  { code: 'NSTP 1', title: 'National Service Training Program I' }
];
assert.strictEqual(countCompletedGE(completed), 2);

const bscsSlots = genericRequirementCourses(UPLB_PROGRAMS.BSCS);
assert.strictEqual(bscsSlots.filter(c => c.genericRequirement === 'ge').length, 9);
assert.strictEqual(bscsSlots.filter(c => c.genericRequirement === 'hk').length, 2);
assert.strictEqual(bscsSlots.filter(c => c.genericRequirement === 'nstp').length, 2);

const doneSlots = getCompletedRequirementSlotCodes(completed, UPLB_PROGRAMS.BSCS);
assert.strictEqual(doneSlots.has('GE 1'), true);
assert.strictEqual(doneSlots.has('GE 2'), true);
assert.strictEqual(doneSlots.has('GE 3'), false);
assert.strictEqual(doneSlots.has('HK 1'), true);
assert.strictEqual(doneSlots.has('HK 2'), false);
assert.strictEqual(doneSlots.has('NSTP 1'), true);
assert.strictEqual(doneSlots.has('NSTP 2'), false);

const oneListedGE = {
  geCoursesRequired: 2,
  majorCourses: [{ code: 'ARTS 1', title: 'Critical Perspectives in the Arts', units: 3 }]
};
const listedOnly = getCompletedRequirementSlotCodes([{ code: 'ARTS 1', title: 'Critical Perspectives in the Arts' }], oneListedGE);
assert.deepStrictEqual(Array.from(listedOnly), []);

// Tracks: CMSC 190 (SP, 18 free elective units) or CMSC 200 (thesis, 15), never both.
const { detectTrack, getPlannerCourses, trackCourses, getFreeElectiveUnits } = require('./src/curriculum.js');
const BSCS = UPLB_PROGRAMS.BSCS;
const codesOf = list => list.map(c => c.code);
const feUnits = list => list.filter(c => c.genericRequirement === 'elective').reduce((s, c) => s + c.units, 0);

const spPlan = getPlannerCourses(BSCS, 'sp');
assert.ok(codesOf(spPlan).includes('CMSC 190'));
assert.ok(!codesOf(spPlan).includes('CMSC 200'));
assert.strictEqual(feUnits(spPlan), 18);

const thesisPlan = getPlannerCourses(BSCS, 'thesis');
assert.ok(codesOf(thesisPlan).includes('CMSC 200'));
assert.ok(!codesOf(thesisPlan).includes('CMSC 190'));
assert.strictEqual(feUnits(thesisPlan), 15);

// Unknown track falls back to the program default (SP for BSCS).
assert.ok(codesOf(trackCourses(BSCS, undefined)).includes('CMSC 190'));
assert.strictEqual(getFreeElectiveUnits('thesis', BSCS), 15);

// Detection counts the course being taken now (no grade) and ignores drops.
assert.strictEqual(detectTrack([{ courseCode: 'CMSC 200', grade: null }], BSCS), 'thesis');
assert.strictEqual(detectTrack([{ code: 'CMSC 190', grade: '' }], BSCS), 'sp');
assert.strictEqual(detectTrack([{ courseCode: 'CMSC 200', grade: 'DRP' }], BSCS), null);
assert.strictEqual(detectTrack([{ courseCode: 'CMSC 12', grade: '1.00' }], BSCS), null);
// Longest code wins: AAE 200A is the MFP track, not thesis AAE 200.
assert.strictEqual(detectTrack([{ code: 'AAE 200A' }], UPLB_PROGRAMS.BSAAE), 'mfp');

// Data quality for the low-confidence banner (#79).
const { getProgramDataQuality } = require('./src/curriculum.js');
const { UPLB_CATALOG } = require('./src/catalog.js');
const good = getProgramDataQuality('BSCS', UPLB_CATALOG);
assert.strictEqual(good.confident, true);
assert.ok(good.prereqShare >= 0.3);
assert.deepStrictEqual(good.reasons, []);
const thin = getProgramDataQuality('BAPHILO', UPLB_CATALOG);
assert.strictEqual(thin.confident, false);
assert.ok(thin.prereqShare < 0.3 && thin.reasons.length === 1);
const soon = getProgramDataQuality('ASDC', UPLB_CATALOG);
assert.strictEqual(soon.confident, false);
assert.strictEqual(getProgramDataQuality('NOPE').confident, false);

console.log('curriculum.test.js: all assertions passed');
