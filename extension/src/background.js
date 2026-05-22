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

