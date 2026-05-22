// Content script for Elbi GradeSim
// Runs on amis.uplb.edu.ph pages
// Privacy: Only captures grades data that the user already has access to.
// All data is stored locally on the user's device and never sent to external servers.

(function() {
  'use strict';
  
  // Flag to track if we already have data this session
  let hasData = false;
  let isFetching = false;
  
  // Get auth token from localStorage (user's own session)
  function getAuthToken() {
    const token = localStorage.getItem('auth._token.local');
    if (token) {
      return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }
    return null;
  }
  
  // Get session ID (user's own session)
  function getSessionId() {
    return localStorage.getItem('x-session-id');
  }
  
  // Intercept fetch requests to capture grades data from AMIS
  // This only captures responses that the page already receives
  const originalFetch = window.fetch;
  window.fetch = async function(...args) {
    const response = await originalFetch.apply(this, args);
    
    // Skip if we're the ones fetching
    if (isFetching) {
      return response;
    }
    
    // Check if this is the grades API call
    const url = args[0]?.toString() || '';
    if (url.includes('api-amis.uplb.edu.ph/api/students/grades')) {
      try {
        const clonedResponse = response.clone();
        const data = await clonedResponse.json();
        
        // Only send if we got valid data (not an error response)
        if (data && data.student_grades) {
          hasData = true;
          chrome.runtime.sendMessage({
            type: 'GRADES_DATA',
            data: data
          });
        }
      } catch (e) {
        // Silently ignore parsing errors
      }
    }
    
    return response;
  };
  
  // Also intercept XMLHttpRequest for compatibility
  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;
  
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    this._url = url;
    return originalXHROpen.apply(this, [method, url, ...rest]);
  };
  
  XMLHttpRequest.prototype.send = function(...args) {
    this.addEventListener('load', function() {
      if (this._url && this._url.includes('api-amis.uplb.edu.ph/api/students/grades')) {
        try {
          const data = JSON.parse(this.responseText);
          if (data && data.student_grades) {
            hasData = true;
            chrome.runtime.sendMessage({
              type: 'GRADES_DATA',
              data: data
            });
          }
        } catch (e) {
          // Silently ignore parsing errors
        }
      }
    });
    return originalXHRSend.apply(this, args);
  };
  
  // Function to fetch grades (only if we don't have data yet)
  async function fetchGradesData() {
    if (hasData || isFetching) {
      return;
    }
    
    const token = getAuthToken();
    const sessionId = getSessionId();
    
    if (!token) {
      return; // User not logged in
    }
    
    isFetching = true;
    
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    };
    
    if (sessionId) {
      headers['X-Session-Id'] = sessionId;
    }
    
    try {
      const response = await originalFetch('https://api-amis.uplb.edu.ph/api/students/grades?summarize=true', {
        method: 'GET',
        credentials: 'include',
        headers: headers
      });
      
      isFetching = false;
      
      if (!response.ok) {
        return;
      }
      
      const data = await response.json();
      
      if (data && data.student_grades) {
        hasData = true;
        chrome.runtime.sendMessage({
          type: 'GRADES_DATA',
          data: data
        });
      }
    } catch (e) {
      isFetching = false;
    }
  }
  
  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'FETCH_GRADES') {
      if (message.force) {
        hasData = false;
        isFetching = false;
      }
      fetchGradesData();
    }
    return true;
  });

  // Auto-fetch once on page load (with delay to ensure page is ready)
  if (window.location.hostname.includes('amis.uplb.edu.ph')) {
    setTimeout(fetchGradesData, 2000);
  }
})();
