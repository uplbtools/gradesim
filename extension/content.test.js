// Self-check for content.js. Run: node extension/content.test.js
// Loads the script into a fake AMIS page (localStorage token, mocked grades
// API, in-memory chrome.storage.local) and checks what it stores.
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const SRC = fs.readFileSync(require.resolve('./src/content.js'), 'utf8');

const AMIS_RESPONSE = {
  student_grades: {
    1241: {
      term: '1st Semester AY 2024-2025',
      secret: 'term-level extra',
      values: [{
        id: 77, grade: '1.25', unit_taken: '3', section: 'A', status: 'Final',
        student_number: '2022-00000', remarks: 'x',
        course: { course_code: 'CMSC 12', title: 'Foundations', description: 'long text' },
        grade_term: { term: '1st Semester', ay: '2024-2025', id: 9 },
      }],
    },
  },
  student: { name: 'Juan', address: 'somewhere' },
};

async function page({ token, status = 200, body = AMIS_RESPONSE, stored = {} }) {
  const store = { ...stored };
  const calls = [];
  let listener;
  const ctx = {
    localStorage: { getItem: k => (k === 'auth._token.local' ? token : null) },
    fetch: async (url, opts) => {
      calls.push({ url, opts });
      return { ok: status >= 200 && status < 300, status, json: async () => body };
    },
    chrome: {
      storage: { local: {
        get: async k => (typeof k === 'string' && k in store ? { [k]: store[k] } : {}),
        set: async o => { Object.assign(store, o); },
      } },
      runtime: { onMessage: { addListener: fn => { listener = fn; } } },
    },
  };
  vm.runInNewContext(SRC, ctx);
  await new Promise(r => setTimeout(r, 10)); // let the load-time fetch finish
  const send = msg => new Promise(r => assert.strictEqual(listener(msg, {}, r), true));
  return { store, calls, send };
}

(async () => {
  // Logged in: stores only the course fields, plus fetchedAt and lastError.
  let p = await page({ token: 'abc' });
  assert.strictEqual(p.calls.length, 1);
  assert.strictEqual(p.calls[0].opts.headers.Authorization, 'Bearer abc');
  assert.strictEqual(p.store.lastError, null);
  assert.ok(Date.now() - p.store.fetchedAt < 1000);
  assert.deepStrictEqual(Object.keys(p.store).sort(), ['fetchedAt', 'gradesData', 'lastError']);
  assert.deepStrictEqual(JSON.parse(JSON.stringify(p.store.gradesData)), {
    student_grades: { 1241: { term: '1st Semester AY 2024-2025', values: [{
      id: 77, grade: '1.25', unit_taken: '3', section: 'A', status: 'Final',
      course: { course_code: 'CMSC 12', title: 'Foundations' },
      grade_term: { term: '1st Semester', ay: '2024-2025' },
    }] } },
  });

  // Logged out: no token (Nuxt writes "false") means no request.
  p = await page({ token: 'false' });
  assert.strictEqual(p.calls.length, 0);
  assert.strictEqual(p.store.lastError, 'not-logged-in');
  assert.strictEqual(p.store.gradesData, undefined);

  // Expired token: AMIS answers 401.
  p = await page({ token: 'Bearer old', status: 401, body: { message: 'Unauthenticated.' } });
  assert.strictEqual(p.store.lastError, 'not-logged-in');

  // AMIS error keeps the grades already saved.
  const old = { gradesData: { student_grades: {} }, fetchedAt: 1 };
  p = await page({ token: 'abc', status: 500, stored: old });
  assert.strictEqual(p.store.lastError, 'amis-error');
  assert.strictEqual(p.store.fetchedAt, 1);
  assert.deepStrictEqual(p.store.gradesData, old.gradesData);

  // Grades under an hour old: no automatic fetch, but Refresh (force) fetches.
  p = await page({ token: 'abc', stored: { fetchedAt: Date.now() - 60000 } });
  assert.strictEqual(p.calls.length, 0);
  const res = await p.send({ type: 'FETCH_GRADES', force: true });
  assert.strictEqual(p.calls.length, 1);
  assert.strictEqual(res.ok, true);
  assert.strictEqual(res.lastError, null);

  // Refresh while logged out reports it.
  p = await page({ token: null });
  const out = await p.send({ type: 'FETCH_GRADES', force: true });
  assert.strictEqual(out.ok, false);
  assert.strictEqual(out.lastError, 'not-logged-in');

  console.log('content.test.js: all passed');
})().catch(e => { console.error(e); process.exit(1); });
