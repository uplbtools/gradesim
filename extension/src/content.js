// extension/src/content.js

// Content script for Elbi GradeSim. Runs on amis.uplb.edu.ph.
// It calls the AMIS grades API once with the student's own login token, keeps
// only the course fields the extension reads, and saves them in
// chrome.storage.local. It also reads which classes the student is enlisted in
// and keeps only each one's course code, section and type. Nothing leaves the browser.
//
// Storage keys written here:
//   gradesData  { student_grades: { <termId>: { term, values: [course] } } }
//   fetchedAt   ms timestamp of the last successful fetch
//   lastError   'not-logged-in', 'amis-error' or null
//   newGrades   count of grades AMIS added or changed since the popup was last opened
//   enlisted    { <termId>: [[course code, section, type]] }

(function () {
  'use strict';

  const BASE = 'https://api-amis.uplb.edu.ph/api';
  const API = `${BASE}/students/grades?summarize=true`;
  const TAKING = ['Enlisted', 'Sent to SAIS', 'Finalized'];
  const MAX_AGE_MS = 60 * 60 * 1000;
  let inFlight = null;

  // AMIS (Nuxt auth) keeps the token here and writes the string "false" on logout.
  function authToken() {
    const t = localStorage.getItem('auth._token.local');
    if (!t || t === 'false') return null;
    return t.startsWith('Bearer ') ? t : `Bearer ${t}`;
  }

  // Keep the AMIS shape (popup.js, planner.js and the web app read it) but drop
  // every field they don't use.
  function slim(data) {
    const out = {};
    for (const [termId, t] of Object.entries(data.student_grades)) {
      if (!t || !Array.isArray(t.values)) continue;
      out[termId] = {
        term: typeof t.term === 'string' ? t.term : undefined,
        values: t.values.map(v => ({
          id: v.id,
          grade: v.grade,
          unit_taken: v.unit_taken,
          section: v.section,
          status: v.status,
          course: { course_code: v.course?.course_code, title: v.course?.title },
          grade_term: { term: v.grade_term?.term, ay: v.grade_term?.ay },
        })),
      };
    }
    return { student_grades: out };
  }

  function authHeaders() {
    const token = authToken();
    if (!token) return null;
    const headers = { Accept: 'application/json', Authorization: token };
    const sessionId = localStorage.getItem('x-session-id');
    if (sessionId) headers['X-Session-Id'] = sessionId;
    return headers;
  }

  // A lab or recit row carries its lecture as `parent`.
  function classRefs(rows) {
    const refs = new Map();
    for (const row of rows) {
      if (!TAKING.includes(row.status)) continue;
      const code = row.class?.course?.course_code || row.class?.course_code;
      for (let c = row.class; c && code; c = c.parent) {
        if (c.section) refs.set(`${code}|${c.section}|${c.type || ''}`, [code, c.section, c.type || '']);
      }
    }
    return [...refs.values()];
  }

  // Enlisted classes for the sem in session and the one being enlisted, or {} when AMIS can't say.
  async function fetchEnlisted(headers) {
    const get = async path => {
      const res = await fetch(`${BASE}${path}`, { credentials: 'include', headers });
      if (!res.ok) throw new Error(path);
      return res.json();
    };
    try {
      const [me, sched] = await Promise.all([get('/auth/user'), get('/scheduled-features/student_enlistment?role=student')]);
      const terms = [...new Set([sched?.activeTerm?.term_id, sched?.nextSchedule?.term_id].filter(Boolean))];
      if (!me?.user?.id || !terms.length) return {};
      const enlisted = {};
      for (const term of terms) {
        const data = await get(`/students/enlistments?enlistment_user_id=${me.user.id}&by_term_type=true&term_id=${term}&enlistedClasses=true`);
        const refs = classRefs(data?.enlistments?.[0]?.student_enlistment_classes || []);
        if (refs.length) enlisted[term] = refs;
      }
      return { enlisted };
    } catch (e) {
      return {};
    }
  }

  async function fetchGrades() {
    const headers = authHeaders();
    if (!headers) return { lastError: 'not-logged-in' };
    try {
      const res = await fetch(API, { credentials: 'include', headers });
      if (res.status === 401 || res.status === 403) return { lastError: 'not-logged-in' };
      if (!res.ok) return { lastError: 'amis-error' };
      const data = await res.json();
      if (!data || !data.student_grades || typeof data.student_grades !== 'object') return { lastError: 'amis-error' };
      return { gradesData: slim(data), fetchedAt: Date.now(), lastError: null };
    } catch (e) {
      return { lastError: 'amis-error' };
    }
  }

  // Grades that are new or changed since the saved copy, by AMIS row id.
  function changedGrades(oldData, data) {
    const rows = d => Object.values(d.student_grades).flatMap(t => t.values);
    const before = new Map(rows(oldData).map(v => [v.id, v.grade]));
    return rows(data).filter(v => v.grade != null && String(v.grade).trim() !== '' && before.get(v.id) !== v.grade).length;
  }

  // Resolves to { ok, lastError, fetchedAt, skipped? }.
  async function refresh(force) {
    if (!force) {
      const { fetchedAt } = await chrome.storage.local.get('fetchedAt');
      if (fetchedAt && Date.now() - fetchedAt < MAX_AGE_MS) return { ok: true, skipped: true, lastError: null, fetchedAt };
    }
    if (!inFlight) {
      inFlight = fetchGrades()
        .then(async result => {
          if (result.lastError !== 'not-logged-in') Object.assign(result, await fetchEnlisted(authHeaders()));
          const { gradesData: old } = await chrome.storage.local.get('gradesData');
          const added = old && result.gradesData ? changedGrades(old, result.gradesData) : 0;
          if (added) result.newGrades = added + ((await chrome.storage.local.get('newGrades')).newGrades || 0);
          await chrome.storage.local.set(result);
          return { ok: !result.lastError, lastError: result.lastError, fetchedAt: result.fetchedAt };
        })
        .finally(() => { inFlight = null; });
    }
    return inFlight;
  }

  // The popup's Refresh button sends { type: 'FETCH_GRADES', force: true }.
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message || message.type !== 'FETCH_GRADES') return false;
    refresh(!!message.force).then(sendResponse);
    return true;
  });

  refresh(false);
})();
