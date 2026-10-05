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

console.log('curriculum.test.js: all assertions passed');
