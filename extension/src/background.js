// extension/src/background.js

// Background service worker for Elbi GradeSim
// Privacy: All data is stored locally using chrome.storage.local
// No data is ever sent to external servers

// Store for grades data (in-memory cache)
let gradesData = null;

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GRADES_DATA') {
    gradesData = message.data;
    // Store locally for popup access
    chrome.storage.local.set({ gradesData: message.data });
  }
  
  if (message.type === 'GET_GRADES_DATA') {
    sendResponse({ data: gradesData });
  }
  
  return true;
});


// Web app bridge (Chrome, Edge, Opera, Brave). The manifest lists
// https://gradesim.uplb.tools under externally_connectable, so only that site
// can send these. GRADESIM_PING says whether grades exist; GRADESIM_GET_GRADES
// returns them in the same shape as Export JSON. The data goes straight to the
// page in the browser; nothing is sent over the network.
const WEB_APP_ORIGIN = 'https://gradesim.uplb.tools';
if (chrome.runtime.onMessageExternal) {
  chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    if (sender.origin !== WEB_APP_ORIGIN || !message) return false;
    if (message.type !== 'GRADESIM_PING' && message.type !== 'GRADESIM_GET_GRADES') return false;
    chrome.storage.local.get(['gradesData', 'selectedProgram', 'excludedCourses', 'substitutions']).then(data => {
      const hasGrades = !!(data.gradesData && data.gradesData.student_grades);
      if (message.type === 'GRADESIM_PING') {
        sendResponse({ hasGrades });
        return;
      }
      sendResponse(hasGrades ? {
        source: 'elbi-gradesim',
        timestamp: new Date().toISOString(),
        selectedProgram: data.selectedProgram || 'BSCS',
        excludedCourses: data.excludedCourses || [],
        substitutions: data.substitutions || {},
        gradesData: data.gradesData,
      } : null);
    });
    return true; // answer asynchronously
  });
}
