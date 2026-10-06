// extension/src/bridge.js

// Web app bridge for Firefox, which has no externally_connectable for web
// pages. Runs only on https://gradesim.uplb.tools and answers two requests the
// page posts to itself: GRADESIM_PING (are there grades?) and
// GRADESIM_GET_GRADES (hand them over, sent when the student clicks Import).
// The reply stays inside this browser tab; nothing is sent over the network.
// Chromium browsers use externally_connectable in background.js instead.

(function () {
  'use strict';

  window.addEventListener('message', (event) => {
    if (event.source !== window || event.origin !== window.location.origin) return;
    const type = event.data && event.data.type;
    if (type !== 'GRADESIM_PING' && type !== 'GRADESIM_GET_GRADES') return;

    chrome.storage.local.get(['gradesData', 'selectedProgram', 'excludedCourses', 'substitutions']).then(data => {
      const hasGrades = !!(data.gradesData && data.gradesData.student_grades);
      let payload = { hasGrades };
      if (type === 'GRADESIM_GET_GRADES') {
        payload = hasGrades ? {
          source: 'elbi-gradesim',
          timestamp: new Date().toISOString(),
          selectedProgram: data.selectedProgram || 'BSCS',
          excludedCourses: data.excludedCourses || [],
          substitutions: data.substitutions || {},
          gradesData: data.gradesData,
        } : null;
      }
      // Firefox content scripts see the page through an Xray wrapper; cloneInto
      // makes the object readable by the page.
      const out = { type: 'GRADESIM_REPLY', request: type, payload };
      window.postMessage(typeof cloneInto === 'function' ? cloneInto(out, window) : out, window.location.origin);
    });
  });
})();
