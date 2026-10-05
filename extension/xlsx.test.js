// Self-check for xlsx.js. Run: node extension/xlsx.test.js
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { crc32, zipStore, writeXlsx, buildPlannerSheets, XL } = require('./src/xlsx.js');

const enc = s => new TextEncoder().encode(s);

// CRC32 against known values (zlib / PKZIP polynomial).
assert.strictEqual(crc32(enc('')), 0);
assert.strictEqual(crc32(enc('a')), 0xE8B7BE43);
assert.strictEqual(crc32(enc('123456789')), 0xCBF43926);
assert.strictEqual(crc32(enc('The quick brown fox jumps over the lazy dog')), 0x414FA339);

// Store-only ZIP: header fields line up and `unzip -t` accepts it.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gradesim-xlsx-'));
const zip = zipStore([{ name: 'a.txt', data: 'hello' }, { name: 'dir/b.txt', data: enc('wörld') }]);
const dv = new DataView(zip.buffer);
assert.strictEqual(dv.getUint32(0, true), 0x04034B50);
assert.strictEqual(dv.getUint32(14, true), crc32(enc('hello')));
assert.strictEqual(dv.getUint32(zip.length - 22, true), 0x06054B50);
assert.strictEqual(dv.getUint16(zip.length - 12, true), 2); // entries
function unzipTest(file) {
  try { execFileSync('unzip', ['-v'], { stdio: 'ignore' }); } catch (e) { console.log('skip: unzip not installed'); return null; }
  return execFileSync('unzip', ['-t', file]).toString();
}
fs.writeFileSync(path.join(tmp, 't.zip'), zip);
const z = unzipTest(path.join(tmp, 't.zip'));
if (z) assert.match(z, /No errors detected/);

// Sheet builder on a small fixture.
const model = {
  title: 'Graduate 2nd sem 2028',
  subtitle: 'BS Computer Science. Up to 18 units a sem.',
  columns: [
    { name: '1st sem', sub: 'AY 2025-26', tag: 'Taken', units: 6, cap: null, cards: [
      { code: 'CMSC 12', title: 'Foundations of Computer Science', units: 3, offer: 'Any sem', status: 'passed', label: 'Passed', crit: false },
      { code: 'MATH 27', title: 'Analytic Geometry & Calculus II', units: 3, offer: '1st only', status: 'failed', label: 'Failed', crit: false },
    ] },
    { name: '2nd sem', sub: 'AY 2025-26', tag: 'Next', units: 24, cap: 21, cards: [
      { code: 'MATH 27', title: 'Analytic Geometry & Calculus II', units: 3, offer: '1st only', status: 'retake', label: 'Retake', crit: true },
      { code: 'CMSC 21', title: 'Fundamentals of Programming', units: 3, offer: 'Any sem', status: 'ready', label: 'Ready', crit: false, note: 'Petition needed' },
    ] },
  ],
  courses: [
    { code: 'CMSC 12', title: 'Foundations', units: 3, term: 'AY 2025-26 1st sem', status: 'passed', label: 'Passed', prereqs: 'None' },
    { code: 'CMSC 21', title: 'Fundamentals', units: 3, term: 'AY 2025-26 2nd sem', status: 'ready', label: 'Ready', prereqs: 'CMSC 12' },
  ],
};
const [plan, list] = buildPlannerSheets(model);
const cell = (sh, r, c) => sh.cells.get(`${r},${c}`);
const hasMerge = (sh, m) => sh.merges.some(x => x.join() === m.join());

// Title row spans the sheet; legend chips are two cells wide.
assert.strictEqual(cell(plan, 0, 0).value, 'Graduate 2nd sem 2028');
assert.ok(hasMerge(plan, [0, 0, 0, 10])); // at least 4 term slots wide
assert.ok(hasMerge(plan, [2, 0, 2, 1]));
assert.strictEqual(cell(plan, 2, 0).value, 'Passed');

// Header: maroon fill, white bold text, units vs cap below with a warning.
const head = plan.freezeRows - 2;
assert.strictEqual(plan.landscape, true);
assert.strictEqual(cell(plan, head, 3).value, '2nd sem, AY 2025-26');
assert.deepStrictEqual([cell(plan, head, 3).style.fill, cell(plan, head, 3).style.color, cell(plan, head, 3).style.bold], [XL.brand, 'FFFFFF', true]);
assert.strictEqual(cell(plan, head + 1, 3).value, '24 of 21 units, over the cap');
assert.strictEqual(cell(plan, head + 1, 0).value, '6 units');

// Cards: 4-row blocks, status fills, critical maroon border, dashed retake.
const first = head + 3;
const code = cell(plan, first, 0);
assert.strictEqual(code.value, 'CMSC 12');
assert.strictEqual(code.style.bold, true);
assert.strictEqual(code.style.fill, XL.okTint);
assert.strictEqual(cell(plan, first + 4, 0).style.fill, XL.badTint);
assert.ok(hasMerge(plan, [first + 1, 0, first + 1, 1])); // title spans the block
const crit = cell(plan, first, 3);
assert.deepStrictEqual(crit.style.border.top, ['medium', XL.brand]);
assert.deepStrictEqual(crit.style.border.left, ['medium', XL.brand]);
assert.strictEqual(crit.style.border.right, undefined); // inner edge stays open
assert.deepStrictEqual(cell(plan, first + 4, 4).style.border.right, ['thin', XL.borderInput]);
assert.strictEqual(cell(plan, first + 2, 3).value, 'Retake, critical');
assert.strictEqual(cell(plan, first + 6, 3).value, 'Ready, petition needed');
assert.strictEqual(cell(plan, first + 2, 1).value, 'Any sem');
const waiting = buildPlannerSheets({ ...model, columns: [{ ...model.columns[1], cards: [{ ...model.columns[1].cards[1], status: 'locked', label: 'Waiting', note: 'Waiting on MATH 27', crit: true }] }] })[0];
assert.strictEqual(cell(waiting, first + 2, 0).value, 'Waiting on MATH 27, critical');

const retakeOnly = buildPlannerSheets({ ...model, columns: [{ ...model.columns[1], cards: [{ ...model.columns[1].cards[0], crit: false }] }] })[0];
assert.deepStrictEqual(cell(retakeOnly, first, 0).style.border.top, ['dashed', XL.bad]);

// Courses sheet: header row, numeric units, filter + frozen header.
assert.deepStrictEqual(Array.from({ length: 6 }, (_, c) => cell(list, 0, c).value), ['Code', 'Title', 'Units', 'Term', 'Status', 'Prerequisites']);
assert.strictEqual(cell(list, 1, 2).value, 3);
assert.strictEqual(cell(list, 2, 4).style.fill, XL.white);
assert.strictEqual(list.filter, 'A1:F3');
assert.strictEqual(list.freezeRows, 1);

// Whole workbook is a valid zip with the expected parts and styles.
const file = path.join(tmp, 'plan.xlsx');
fs.writeFileSync(file, writeXlsx([plan, list]));
const t = unzipTest(file);
if (t) {
  assert.match(t, /No errors detected/);
  const styles = execFileSync('unzip', ['-p', file, 'xl/styles.xml']).toString();
  assert.ok(styles.includes(`FF${XL.okTint}`) && styles.includes('style="dashed"') && styles.includes('style="medium"'));
  const sheet1 = execFileSync('unzip', ['-p', file, 'xl/worksheets/sheet1.xml']).toString();
  assert.match(sheet1, /<pane ySplit="\d+" topLeftCell="A\d+" activePane="bottomLeft" state="frozen"\/>/);
  assert.match(sheet1, /orientation="landscape" fitToWidth="1" fitToHeight="0"/);
  assert.ok(sheet1.includes('Analytic Geometry &amp; Calculus II'));
}
fs.rmSync(tmp, { recursive: true, force: true });

console.log('xlsx.test.js: all assertions passed');
