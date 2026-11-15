// extension/src/background.js

// Background service worker for Elbi GradeSim
// Privacy: All data is stored locally using chrome.storage.local
// No data is ever sent to external servers

// Clear my data (popup Help). Removes every key this extension stored.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || message.type !== 'CLEAR_DATA') return false;
  chrome.storage.local.clear().then(() => sendResponse({ ok: true }));
  return true;
});

// Toolbar badge with the number of new grades, cleared when the popup opens.
const showBadge = n => chrome.action.setBadgeText({ text: n ? String(n) : '' });
chrome.action.setBadgeBackgroundColor({ color: '#7b2a22' });
chrome.storage.local.get('newGrades').then(d => showBadge(d.newGrades));
chrome.storage.onChanged.addListener(changes => {
  if (changes.newGrades) showBadge(changes.newGrades.newValue);
});

// Web app bridge (Chrome, Edge, Opera, Brave). The manifest lists
// https://gradesim.uplb.tools under externally_connectable, so only that site
// can send these. GRADESIM_PING says whether grades exist and when AMIS was last
// read; GRADESIM_GET_GRADES returns them with the student's choices in the same
// shape as Export JSON. The data goes straight to the page in the browser;
// nothing is sent over the network.
const WEB_APP_ORIGIN = 'https://gradesim.uplb.tools';
const WEB_APP_KEYS = ['gradesData', 'fetchedAt', 'selectedProgram', 'selectedTracks', 'selectedSpecializations', 'excludedCourses', 'substitutions',
  'removals', 'customCourseStatus', 'plannerPins', 'plannerPetitions', 'plannerOptions'];
if (chrome.runtime.onMessageExternal) {
  chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    if (sender.origin !== WEB_APP_ORIGIN || !message) return false;
    if (message.type !== 'GRADESIM_PING' && message.type !== 'GRADESIM_GET_GRADES') return false;
    chrome.storage.local.get(WEB_APP_KEYS).then(data => {
      const hasGrades = !!(data.gradesData && data.gradesData.student_grades);
      if (message.type === 'GRADESIM_PING') {
        sendResponse({ hasGrades, fetchedAt: data.fetchedAt || null });
        return;
      }
      sendResponse(hasGrades ? {
        ...data,
        source: 'elbi-gradesim',
        timestamp: new Date().toISOString(),
        selectedProgram: data.selectedProgram || 'BSCS',
        excludedCourses: data.excludedCourses || [],
        substitutions: data.substitutions || {},
      } : null);
    });
    return true; // answer asynchronously
  });
}
