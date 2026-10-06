// extension/src/content.js

// Content script for Elbi GradeSim. Runs on amis.uplb.edu.ph.
// It calls the AMIS grades API once with the student's own login token, keeps
// only the course fields the extension reads, and saves them in
// chrome.storage.local. Nothing leaves the browser.
//
// Storage keys written here:
//   gradesData  { student_grades: { <termId>: { term, values: [course] } } }
//   fetchedAt   ms timestamp of the last successful fetch
//   lastError   'not-logged-in', 'amis-error' or null

(function () {
  'use strict';

  const API = 'https://api-amis.uplb.edu.ph/api/students/grades?summarize=true';
  const MAX_AGE_MS = 60 * 60 * 1000;
  let inFlight = null;

  // AMIS (Nuxt auth) keeps the token here and writes the string "false" on logout.
  function authToken() {
    const t = localStorage.getItem('auth._token.local');
    if (!t || t === 'false') return null;
    return t.startsWith('Bearer ') ? t : `Bearer ${t}`;
  }

  // Keep the AMIS shape (popup.js, planner.js and the web app read it) but drop
  // every field they do not use.
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

  async function fetchGrades() {
    const token = authToken();
    if (!token) return { lastError: 'not-logged-in' };
    const headers = { Accept: 'application/json', Authorization: token };
    const sessionId = localStorage.getItem('x-session-id');
    if (sessionId) headers['X-Session-Id'] = sessionId;
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

  // Resolves to { ok, lastError, fetchedAt, skipped? }.
  async function refresh(force) {
    if (!force) {
      const { fetchedAt } = await chrome.storage.local.get('fetchedAt');
      if (fetchedAt && Date.now() - fetchedAt < MAX_AGE_MS) return { ok: true, skipped: true, lastError: null, fetchedAt };
    }
    if (!inFlight) {
      inFlight = fetchGrades()
        .then(async result => {
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
