/**
 * Elbi GradeSim - Popup Script
 * Processes grades data locally. No data is collected, transmitted, or shared.
 */

// Sanitize text to prevent XSS
function sanitizeText(text) {
  if (typeof text !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Store current track selection
let currentTrack = 'sp';

// Store excluded courses - Set of course IDs
let excludedCourses = new Set();

// Store current view mode
let currentView = 'semester';

// Store course substitutions - requiredCode -> takenCode
let substitutions = {};

document.addEventListener('DOMContentLoaded', async () => {
  // Check if opened in a tab
  const urlParams = new URLSearchParams(window.location.search);
  const isTabMode = urlParams.get('mode') === 'tab' || window.innerWidth > 600;
  if (isTabMode) {
    document.body.classList.add('tab-mode');
  }

  // Open in Tab button
  const openTabBtn = document.getElementById('openTabBtn');
  if (openTabBtn) {
    openTabBtn.addEventListener('click', () => {
      chrome.tabs.create({ url: chrome.runtime.getURL('popup.html?mode=tab') });
    });
  }

  // Help Modal logic
  const helpBtn = document.getElementById('helpBtn');
  const helpOverlay = document.getElementById('helpOverlay');
  const closeHelpBtn = document.getElementById('closeHelpBtn');

  if (helpBtn && helpOverlay && closeHelpBtn) {
    helpBtn.addEventListener('click', () => {
      helpOverlay.classList.remove('hidden');
    });

    closeHelpBtn.addEventListener('click', () => {
      helpOverlay.classList.add('hidden');
    });

    // Close on overlay click
    helpOverlay.addEventListener('click', (e) => {
      if (e.target === helpOverlay) {
        helpOverlay.classList.add('hidden');
      }
    });
  }

  // Check if terms are accepted
  const savedTerms = await chrome.storage.local.get(['termsAccepted']);
  let isTermsAccepted = !!savedTerms.termsAccepted;
  
  const termsOverlay = document.getElementById('termsOverlay');
  const closeTermsBtn = document.getElementById('closeTermsBtn');
  const termsCheckbox = document.getElementById('termsCheckbox');
  const acceptTermsBtn = document.getElementById('acceptTermsBtn');
  
  const showTerms = (forceAcceptMode) => {
    termsOverlay.classList.remove('hidden');
    if (forceAcceptMode) {
      closeTermsBtn.classList.add('hidden');
      acceptTermsBtn.textContent = 'Accept & Proceed';
      acceptTermsBtn.disabled = !termsCheckbox.checked;
    } else {
      closeTermsBtn.classList.remove('hidden');
      acceptTermsBtn.textContent = 'Close';
      acceptTermsBtn.disabled = false;
    }
  };
  
  if (!isTermsAccepted) {
    showTerms(true);
  } else {
    termsOverlay.classList.add('hidden');
  }
  
  termsCheckbox.addEventListener('change', () => {
    if (!isTermsAccepted) {
      acceptTermsBtn.disabled = !termsCheckbox.checked;
    }
  });
  
  acceptTermsBtn.addEventListener('click', async () => {
    if (!isTermsAccepted) {
      await chrome.storage.local.set({ termsAccepted: true });
      isTermsAccepted = true;
    }
    termsOverlay.classList.add('hidden');
  });
  
  closeTermsBtn.addEventListener('click', () => {
    termsOverlay.classList.add('hidden');
  });
  
  const viewTermsLink = document.getElementById('viewTermsLink');
  if (viewTermsLink) {
    viewTermsLink.addEventListener('click', (e) => {
      e.preventDefault();
      showTerms(!isTermsAccepted);
    });
  }

  // Load excluded courses from storage
  const savedExclusions = await chrome.storage.local.get(['excludedCourses']);
  if (savedExclusions.excludedCourses) {
    excludedCourses = new Set(savedExclusions.excludedCourses);
  }
  
  // Load substitutions from storage
  const savedSubstitutions = await chrome.storage.local.get(['substitutions']);
  if (savedSubstitutions.substitutions) {
    substitutions = savedSubstitutions.substitutions;
  }
  const loadingEl = document.getElementById('loading');
  const noDataEl = document.getElementById('noData');
  const mainContentEl = document.getElementById('mainContent');
  const refreshBtn = document.getElementById('refreshBtn');
  
  // Tab handling
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        content.classList.add('hidden');
      });
      
      const tabId = tab.dataset.tab + 'Tab';
      document.getElementById(tabId).classList.remove('hidden');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Program selection handling
  const programSelect = document.getElementById('programSelect');
  if (programSelect) {
    // Load saved program preference
    const savedProgram = await chrome.storage.local.get(['selectedProgram']);
    if (savedProgram.selectedProgram) {
      programSelect.value = savedProgram.selectedProgram;
      setCurrentProgram(savedProgram.selectedProgram);
    } else {
      // Initialize with default program (BSCS)
      setCurrentProgram('BSCS');
    }
    
    programSelect.addEventListener('change', (e) => {
      const programCode = e.target.value;
      setCurrentProgram(programCode);
      chrome.storage.local.set({ selectedProgram: programCode });
      
      // Recalculate remaining courses with new program
      if (window.gradesData && window.gradesData.completedCourses) {
        displayRemainingCourses(window.gradesData.completedCourses);
      }
    });
  }
  
  // Note: Track selection event listeners are now attached dynamically
  // in updateTrackOptionsUI() when the program is set/changed
  
  // View toggle handling (Semester/Year)
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentView = btn.dataset.view;
      // Re-render grades list with new view
      if (window.gradesData && window.gradesData.courses) {
        const { gradesBySemester } = calculateGWA(window.gradesData.courses, excludedCourses);
        displayGradesList(gradesBySemester, window.gradesData.courses);
      }
    });
  });
  
  // Load grades data
  loadGradesData();
  
  // Refresh button
  refreshBtn.addEventListener('click', () => {
    loadGradesData();
  });
  
  // Calculate button
  document.getElementById('calculateBtn').addEventListener('click', calculateWhatIf);
  
  // Custom GWA input handling
  document.getElementById('customGWA').addEventListener('focus', () => {
    document.querySelector('input[value="custom"]').checked = true;
  });
  
  // Apply Substitution button
  const addSubBtn = document.getElementById('addSubBtn');
  if (addSubBtn) {
    addSubBtn.addEventListener('click', async () => {
      const reqSelect = document.getElementById('subRequired');
      const takenSelect = document.getElementById('subTaken');
      const reqCode = reqSelect.value;
      const takenCode = takenSelect.value;
      
      if (!reqCode || !takenCode) {
        alert('Please select both a required course and a completed course.');
        return;
      }
      
      // Save substitution
      substitutions[reqCode] = takenCode;
      await chrome.storage.local.set({ substitutions });
      
      // Reset selectors
      reqSelect.value = '';
      takenSelect.value = '';
      
      // Re-render
      if (window.gradesData && window.gradesData.courses) {
        displayGradesData(window.gradesData.courses);
      }
    });
  }

  // Export JSON functionality
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', async () => {
      try {
        const data = await chrome.storage.local.get([
          'gradesData',
          'selectedProgram',
          'excludedCourses',
          'substitutions'
        ]);
        
        const exportObj = {
          source: 'elbi-gradesim',
          timestamp: new Date().toISOString(),
          selectedProgram: data.selectedProgram || 'BSCS',
          excludedCourses: data.excludedCourses || [],
          substitutions: data.substitutions || {},
          gradesData: data.gradesData || null
        };
        
        const jsonString = JSON.stringify(exportObj, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `elbi-gradesim-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        alert('Failed to export data: ' + err.message);
      }
    });
  }

  // Import JSON functionality
  const importBtn = document.getElementById('importBtn');
  const importFile = document.getElementById('importFile');
  if (importBtn && importFile) {
    importBtn.addEventListener('click', () => {
      importFile.click();
    });
    
    importFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const importObj = JSON.parse(evt.target.result);
          
          if (importObj.source !== 'elbi-gradesim') {
            throw new Error('Invalid backup file. Must be a valid Elbi GradeSim JSON backup.');
          }
          
          const toSave = {};
          if (importObj.selectedProgram) toSave.selectedProgram = importObj.selectedProgram;
          if (importObj.excludedCourses) toSave.excludedCourses = importObj.excludedCourses;
          if (importObj.substitutions) toSave.substitutions = importObj.substitutions;
          if (importObj.gradesData) toSave.gradesData = importObj.gradesData;
          
          // Always mark terms as accepted when importing data
          toSave.termsAccepted = true;
          
          await chrome.storage.local.set(toSave);
          alert('Data imported successfully! The extension will now reload.');
          window.location.reload();
        } catch (err) {
          alert('Failed to import data: ' + err.message);
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    });
  }
});

// Parse the AMIS data structure into a flat array of courses
function parseAMISData(data) {
  const courses = [];
  
  if (!data || !data.student_grades) {
    return courses;
  }
  
  const studentGrades = data.student_grades;
  
  // Iterate through each term (1231, 1232, etc.)
  for (const [termId, termData] of Object.entries(studentGrades)) {
    if (!termData || !termData.values) continue;
    
    const termInfo = termData.term || `Term ${termId}`;
    
    // Iterate through each course in the term
    for (const courseData of termData.values) {
      courses.push({
        id: courseData.id,
        courseCode: courseData.course?.course_code || 'Unknown',
        courseTitle: courseData.course?.title || 'Unknown',
        units: parseInt(courseData.unit_taken) || 0,
        grade: courseData.grade,
        section: courseData.section,
        termId: termId,
        term: termInfo,
        semester: courseData.grade_term?.term || '',
        academicYear: courseData.grade_term?.ay || '',
        status: courseData.status
      });
    }
  }
  
  return courses;
}

async function loadGradesData() {
  const loadingEl = document.getElementById('loading');
  const noDataEl = document.getElementById('noData');
  const mainContentEl = document.getElementById('mainContent');
  
  loadingEl.classList.remove('hidden');
  noDataEl.classList.add('hidden');
  mainContentEl.classList.add('hidden');
  
  try {
    // Get data from storage
    let result = await chrome.storage.local.get(['gradesData']);
    
    // If no data, wait a moment and try again (data might still be loading)
    if (!result.gradesData) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      result = await chrome.storage.local.get(['gradesData']);
    }
    
    // Parse the AMIS data structure
    const courses = parseAMISData(result.gradesData);
    
    if (courses && courses.length > 0) {
      displayGradesData(courses);
      loadingEl.classList.add('hidden');
      mainContentEl.classList.remove('hidden');
    } else {
      loadingEl.classList.add('hidden');
      noDataEl.classList.remove('hidden');
    }
  } catch (error) {
    loadingEl.classList.add('hidden');
    noDataEl.classList.remove('hidden');
  }
}

function displayGradesData(courses) {
  // Calculate GWA with exclusions
  const { gwa, totalUnits, totalCourses, gradesBySemester, completedCourses, excludedUnits, excludedCount } = calculateGWA(courses, excludedCourses);
  
  // Display GWA
  document.getElementById('currentGWA').textContent = gwa.toFixed(4);
  document.getElementById('totalUnits').textContent = excludedCount > 0 ? `${totalUnits} (${excludedUnits} excl.)` : totalUnits;
  document.getElementById('totalCourses').textContent = excludedCount > 0 ? `${totalCourses} (${excludedCount} excl.)` : totalCourses;
  
  // Display honor status
  displayHonorStatus(gwa);
  
  // Display grades list (pass courses for toggle functionality)
  displayGradesList(gradesBySemester, courses);
  
  // Display remaining courses
  displayRemainingCourses(completedCourses);
  
  // Display Wrapped feature
  displayWrapped(courses);
  
  // Store calculated data for What If
  window.gradesData = {
    gwa,
    totalUnits,
    totalCourses,
    completedCourses,
    courses
  };
}

function calculateGWA(courses, excludedIds = new Set()) {
  let totalWeightedGrade = 0;
  let totalUnits = 0;
  let totalCourses = 0;
  let excludedUnits = 0;
  let excludedCount = 0;
  const gradesBySemester = {};
  const completedCourses = [];
  
  // Courses to exclude from GWA calculation (by prefix)
  const excludedPrefixes = ['NSTP', 'HK', 'PE'];
  // Non-numeric grades that should be displayed but not counted in GWA
  const nonNumericGrades = ['S', 'U', 'INC', 'DRP', 'W', 'P', 'DFG'];
  
  courses.forEach(course => {
    const courseCode = course.courseCode || '';
    const courseId = String(course.id || `${course.courseCode}-${course.termId}`);
    const gradeStr = (course.grade || '').toString().toUpperCase().trim();
    
    // Skip NSTP, HK, PE courses entirely
    const isPrefixExcluded = excludedPrefixes.some(prefix => 
      courseCode.toUpperCase().startsWith(prefix)
    );
    if (isPrefixExcluded) {
      return;
    }
    
    const units = course.units || 0;
    
    // Check if it's a non-numeric grade (S, U, INC, etc.)
    const isNonNumericGrade = nonNumericGrades.includes(gradeStr);
    
    // Group by semester (for display - includes all courses)
    const semKey = course.term || `${course.academicYear} - ${course.semester}`;
    if (!gradesBySemester[semKey]) {
      gradesBySemester[semKey] = [];
    }
    
    // Add course to display with special handling for S/U grades
    const displayCourse = { ...course, isNonNumeric: isNonNumericGrade };
    gradesBySemester[semKey].push(displayCourse);
    
    // For non-numeric grades, add to completed but don't calculate GWA
    if (isNonNumericGrade) {
      // S (Satisfactory) counts as passed, U (Unsatisfactory) does not
      if (gradeStr === 'S') {
        completedCourses.push({
          code: course.courseCode,
          title: course.courseTitle,
          units: units,
          grade: 'S'
        });
      }
      return;
    }
    
    // Skip courses without valid numeric grades
    const grade = parseFloat(course.grade);
    if (isNaN(grade) || grade < 1.0 || grade > 5.0) {
      return;
    }
    
    if (units === 0) return;
    
    // Check if user-excluded (for shiftees)
    const isUserExcluded = excludedIds.has(courseId);
    if (isUserExcluded) {
      // Track excluded stats but don't add to GWA
      excludedUnits += units;
      excludedCount++;
      return;
    }
    
    // Add to GWA calculation
    totalWeightedGrade += grade * units;
    totalUnits += units;
    totalCourses++;
    
    completedCourses.push({
      code: course.courseCode,
      title: course.courseTitle,
      units: units,
      grade: grade
    });
  });
  
  const gwa = totalUnits > 0 ? totalWeightedGrade / totalUnits : 0;
  
  return { gwa, totalUnits, totalCourses, gradesBySemester, completedCourses, excludedUnits, excludedCount };
}

function displayHonorStatus(gwa) {
  const honorEl = document.getElementById('honorStatus');
  
  if (gwa <= 1.20) {
    honorEl.textContent = '🏆 Summa Cum Laude Track';
    honorEl.className = 'honor-status summa';
    honorEl.style.display = 'inline-block';
  } else if (gwa <= 1.45) {
    honorEl.textContent = '🥈 Magna Cum Laude Track';
    honorEl.className = 'honor-status magna';
    honorEl.style.display = 'inline-block';
  } else if (gwa <= 1.75) {
    honorEl.textContent = '🥉 Cum Laude Track';
    honorEl.className = 'honor-status cum-laude';
    honorEl.style.display = 'inline-block';
  } else if (gwa <= 2.00) {
    honorEl.textContent = '📜 Honor Roll Track';
    honorEl.className = 'honor-status honor-roll';
    honorEl.style.display = 'inline-block';
  } else {
    // Hide the element when not on any honor track
    honorEl.textContent = '';
    honorEl.className = 'honor-status';
    honorEl.style.display = 'none';
  }
}

function displayGradesList(gradesBySemester, allCourses) {
  const listEl = document.getElementById('gradesList');
  listEl.innerHTML = '';
  
  // Group courses based on current view mode
  let groupedCourses;
  if (currentView === 'year') {
    // Group by academic year using course.academicYear directly
    groupedCourses = {};
    Object.entries(gradesBySemester).forEach(([semester, courses]) => {
      courses.forEach(course => {
        // Use the academicYear field directly from course data
        const yearKey = course.academicYear ? `AY ${course.academicYear}` : 'Unknown Year';
        
        if (!groupedCourses[yearKey]) {
          groupedCourses[yearKey] = [];
        }
        groupedCourses[yearKey].push(course);
      });
    });
  } else {
    // Use semester grouping as-is
    groupedCourses = gradesBySemester;
  }
  
  // Sort groups (semesters or years)
  const sortedGroups = Object.keys(groupedCourses).sort().reverse();
  
  sortedGroups.forEach(groupKey => {
    const courses = groupedCourses[groupKey];
    
    // Calculate GWA for this group (semester or year)
    const groupGWA = calculateGroupGWA(courses);
    
    const semesterGroup = document.createElement('div');
    semesterGroup.className = 'semester-group';
    
    const header = document.createElement('div');
    header.className = 'semester-header';
    
    // Build header with group GWA and scholar status
    let scholarStatus = '';
    let scholarClass = '';
    if (groupGWA.gwa > 0) {
      if (groupGWA.gwa <= 1.45) {
        scholarStatus = '🎓 University Scholar';
        scholarClass = 'university-scholar';
      } else if (groupGWA.gwa <= 1.75) {
        scholarStatus = '📚 College Scholar';
        scholarClass = 'college-scholar';
      } else if (groupGWA.gwa <= 2.00) {
        scholarStatus = '📜 Honor Roll';
        scholarClass = 'honor-roll';
      }
    }
    
    header.innerHTML = `
      <span class="group-title">${sanitizeText(groupKey)}</span>
      <span class="group-gwa-info">
        <span class="group-gwa">GWA: ${groupGWA.gwa > 0 ? groupGWA.gwa.toFixed(4) : 'N/A'}</span>
        ${scholarStatus ? `<span class="scholar-badge ${scholarClass}">${scholarStatus}</span>` : ''}
      </span>
    `;
    semesterGroup.appendChild(header);
    
    courses.forEach(course => {
      const courseId = String(course.id || `${course.courseCode}-${course.termId}`);
      const isExcluded = excludedCourses.has(courseId);
      const gradeStr = (course.grade || '').toString().toUpperCase().trim();
      const isNonNumeric = course.isNonNumeric || ['S', 'U', 'INC', 'DRP', 'W', 'P', 'DFG'].includes(gradeStr);
      
      const item = document.createElement('div');
      item.className = 'course-item' + (isExcluded ? ' excluded' : '') + (isNonNumeric ? ' non-numeric' : '');
      item.dataset.courseId = courseId;
      
      let gradeDisplay, gradeClass;
      if (isNonNumeric) {
        gradeDisplay = gradeStr;
        if (gradeStr === 'S') {
          gradeClass = 'satisfactory';
        } else if (gradeStr === 'U') {
          gradeClass = 'unsatisfactory';
        } else {
          gradeClass = 'other-grade';
        }
      } else {
        const grade = parseFloat(course.grade);
        gradeDisplay = grade.toFixed(2);
        gradeClass = 'passing';
        if (grade <= 1.50) gradeClass = 'excellent';
        else if (grade <= 2.00) gradeClass = 'good';
        else if (grade >= 5.00) gradeClass = 'failed';
      }
      
      // Don't show exclude button for non-numeric grades (they don't affect GWA anyway)
      const excludeButton = isNonNumeric ? '' : `
        <button class="exclude-toggle ${isExcluded ? 'excluded' : ''}" data-course-id="${sanitizeText(courseId)}" title="${isExcluded ? 'Include in GWA' : 'Exclude from GWA'}" aria-label="${isExcluded ? 'Include course in GWA calculation' : 'Exclude course from GWA calculation'}">
          ${isExcluded ? 'Incl.' : 'Excl.'}
        </button>
      `;
      
      item.innerHTML = `
        <div class="course-info">
          <div class="course-code">${sanitizeText(course.courseCode || course.code)}</div>
          <div class="course-title">${sanitizeText(course.courseTitle || course.title || '')}</div>
        </div>
        <div class="course-grade">
          ${excludeButton}
          <span class="units-badge" aria-label="${course.units} units">${course.units}u</span>
          <span class="grade-value ${gradeClass}" aria-label="Grade: ${gradeDisplay}">${gradeDisplay}</span>
        </div>
      `;
      
      semesterGroup.appendChild(item);
    });
    
    listEl.appendChild(semesterGroup);
  });
  
  // Add event listeners to toggle buttons
  listEl.querySelectorAll('.exclude-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const courseId = btn.dataset.courseId;
      toggleCourseExclusion(courseId, allCourses);
    });
  });
}

// Calculate GWA for a specific group of courses (semester or year)
function calculateGroupGWA(courses) {
  let totalWeightedGrade = 0;
  let totalUnits = 0;
  
  courses.forEach(course => {
    const courseId = String(course.id || `${course.courseCode}-${course.termId}`);
    
    // Skip excluded courses
    if (excludedCourses.has(courseId)) {
      return;
    }
    
    const grade = parseFloat(course.grade);
    if (isNaN(grade) || grade < 1.0 || grade > 5.0) return;
    
    const units = course.units || 0;
    if (units === 0) return;
    
    totalWeightedGrade += grade * units;
    totalUnits += units;
  });
  
  const gwa = totalUnits > 0 ? totalWeightedGrade / totalUnits : 0;
  return { gwa, totalUnits };
}

function displayRemainingCourses(completedCourses) {
  const listEl = document.getElementById('remainingList');
  const trackInfoEl = document.getElementById('trackInfo');
  listEl.innerHTML = '';
  
  // Get current curriculum
  const curriculum = getCurrentCurriculum();
  
  // Check if program has curriculum data
  if (!curriculum.available) {
    listEl.innerHTML = `
      <div class="free-elective-notice" style="background: rgba(100, 100, 0, 0.2); border-color: #666600; color: #ffff00;">
        <strong>⚠ Curriculum Not Available</strong>
        <br><small>The curriculum for ${curriculum.name} is coming soon. Only GWA calculation is available.</small>
      </div>
    `;
    trackInfoEl.innerHTML = '';
    return;
  }
  
  // Detect track based on completed courses
  const detectedTrack = detectTrack(completedCourses);
  
  // Update track info display and radio buttons
  if (curriculum.tracks) {
    if (detectedTrack) {
      currentTrack = detectedTrack;
      const trackInfo = curriculum.tracks[detectedTrack];
      const trackName = trackInfo ? `${trackInfo.name} (${trackInfo.code})` : detectedTrack;
      trackInfoEl.className = 'track-info detected';
      trackInfoEl.innerHTML = `✓ Detected: <strong>${trackName}</strong>`;
    } else {
      trackInfoEl.className = 'track-info not-detected';
      trackInfoEl.innerHTML = `⚠ Track not yet detected. Defaulting to SP Track. Select your track below:`;
    }
    
    // Set the radio button to match current track
    const trackRadio = document.querySelector(`input[name="track"][value="${currentTrack}"]`);
    if (trackRadio) {
      trackRadio.checked = true;
    }
  } else {
    trackInfoEl.innerHTML = '';
  }
  
  // Get free elective units based on current track
  const freeElectiveUnitsTotal = getFreeElectiveUnits(currentTrack);
  
  // Get completed course codes (normalized)
  const completedCodes = new Set();
  completedCourses.forEach(c => {
    const code = c.code.toUpperCase().trim();
    completedCodes.add(code);
  });
  
  // Add required course codes to completedCodes if their taken courses are completed
  for (const [reqCode, takenCode] of Object.entries(substitutions)) {
    if (completedCodes.has(takenCode.toUpperCase().trim())) {
      completedCodes.add(reqCode.toUpperCase().trim());
    }
  }
  
  // Filter remaining required courses from curriculum
  const remaining = (curriculum.majorCourses || []).filter(course => {
    const code = course.code.toUpperCase().trim();
    return !completedCodes.has(code);
  });
  
  // Calculate remaining units from required courses
  let remainingUnits = remaining.reduce((sum, c) => sum + c.units, 0);
  
  // Count completed GE courses (title starts with "(GE)")
  const completedGECount = completedCourses.filter(c => 
    c.title && c.title.trim().startsWith("(GE)")
  ).length;
  const geRequired = curriculum.geCoursesRequired || 9;
  const remainingGESlots = Math.max(0, geRequired - completedGECount);
  
  // Calculate free elective units used
  // Free electives = courses that are NOT required AND NOT GE courses
  const requiredCodesSet = new Set((curriculum.requiredCodes || []).map(c => c.toUpperCase().trim()));
  const freeElectives = completedCourses.filter(c => {
    const code = c.code.toUpperCase().trim();
    // It's required if it's in the requiredCodes list, OR if it's substituted for something in requiredCodes
    const isSubstitutedForRequired = Object.entries(substitutions).some(([req, taken]) => 
      taken.toUpperCase().trim() === code && requiredCodesSet.has(req.toUpperCase().trim())
    );
    const isRequired = requiredCodesSet.has(code) || isSubstitutedForRequired;
    const isGE = c.title && c.title.trim().startsWith("(GE)");
    return !isRequired && !isGE;
  });
  
  const freeElectiveUnitsTaken = freeElectives.reduce((sum, c) => sum + c.units, 0);
  const freeElectiveUnitsRemaining = Math.max(0, freeElectiveUnitsTotal - freeElectiveUnitsTaken);
  
  // Populate substitutions dropdowns
  const subRequiredSelect = document.getElementById('subRequired');
  if (subRequiredSelect) {
    subRequiredSelect.innerHTML = '<option value="">-- Select Required Course --</option>';
    // Sort required courses alphabetically by code
    const sortedRequired = [...(curriculum.majorCourses || [])].sort((a, b) => a.code.localeCompare(b.code));
    sortedRequired.forEach(course => {
      const code = course.code.toUpperCase().trim();
      const option = document.createElement('option');
      option.value = code;
      option.textContent = `${course.code} (${course.units}u)`;
      subRequiredSelect.appendChild(option);
    });
  }
  
  const subTakenSelect = document.getElementById('subTaken');
  if (subTakenSelect) {
    subTakenSelect.innerHTML = '<option value="">-- Select Completed Course --</option>';
    // Sort completed courses alphabetically by code
    const sortedCompleted = [...completedCourses].sort((a, b) => a.code.localeCompare(b.code));
    sortedCompleted.forEach(c => {
      const code = c.code.toUpperCase().trim();
      const isGE = c.title && c.title.trim().startsWith("(GE)");
      const isAlreadyUsed = Object.values(substitutions).some(taken => taken.toUpperCase().trim() === code);
      
      // Only show if not a required curriculum code, not GE, and not already used in another substitution
      if (!requiredCodesSet.has(code) && !isGE && !isAlreadyUsed) {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${c.code} (${c.units}u) - Grade: ${c.grade}`;
        subTakenSelect.appendChild(option);
      }
    });
  }
  
  // Render active substitutions list
  const substitutionsList = document.getElementById('substitutionsList');
  if (substitutionsList) {
    substitutionsList.innerHTML = '';
    const subEntries = Object.entries(substitutions);
    if (subEntries.length === 0) {
      substitutionsList.innerHTML = '<div class="no-substitutions-notice">No substitutions configured.</div>';
    } else {
      subEntries.forEach(([reqCode, takenCode]) => {
         const item = document.createElement('div');
         item.className = 'substitution-item';
         item.innerHTML = `
           <span class="sub-map"><strong>${sanitizeText(reqCode)}</strong> ← <strong>${sanitizeText(takenCode)}</strong></span>
           <button class="btn-remove-sub" data-req="${sanitizeText(reqCode)}" title="Remove substitution">×</button>
         `;
         substitutionsList.appendChild(item);
      });
      
      // Add remove listeners
      substitutionsList.querySelectorAll('.btn-remove-sub').forEach(btn => {
        btn.addEventListener('click', async () => {
          const req = btn.dataset.req;
          delete substitutions[req];
          await chrome.storage.local.set({ substitutions });
          displayGradesData(window.gradesData.courses);
        });
      });
    }
  }
  
  // Display remaining required courses
  remaining.forEach(course => {
    const item = document.createElement('div');
    item.className = 'remaining-item';
    item.setAttribute('role', 'listitem');
    item.innerHTML = `
      <span class="course-code">${sanitizeText(course.code)}</span>
      <span class="units-badge" aria-label="${course.units} units">${course.units}u</span>
    `;
    listEl.appendChild(item);
  });
  
  // Add GE notice if remaining
  if (remainingGESlots > 0) {
    const geNotice = document.createElement('div');
    geNotice.className = 'free-elective-notice';
    geNotice.innerHTML = `
      <strong>GE Courses:</strong> ${remainingGESlots} more GE course(s) needed
      <br><small>Completed ${completedGECount}/${geRequired} required GE courses.</small>
    `;
    listEl.appendChild(geNotice);
  }
  
  // Add free elective notice
  const notice = document.createElement('div');
  notice.className = 'free-elective-notice';
  const trackLabel = currentTrack === 'thesis' ? 'Thesis' : 'SP';
  if (freeElectiveUnitsRemaining > 0) {
    notice.innerHTML = `
      <strong>Free Electives:</strong> ${freeElectiveUnitsRemaining} units remaining
      <br><small>Taken ${freeElectiveUnitsTaken}/${freeElectiveUnitsTotal} free elective units (${trackLabel} track).</small>
    `;
  } else {
    notice.innerHTML = `
      <strong>Free Electives:</strong> ✓ Complete
      <br><small>Taken ${freeElectiveUnitsTaken}/${freeElectiveUnitsTotal} free elective units (${trackLabel} track).</small>
    `;
    notice.style.background = 'rgba(0, 100, 0, 0.3)';
    notice.style.borderColor = 'var(--gem-dark)';
    notice.style.color = 'var(--gem-light)';
  }
  listEl.appendChild(notice);
  
  // Store remaining courses for What If calculation
  window.remainingCourses = remaining;
  window.freeElectiveUnitsRemaining = freeElectiveUnitsRemaining;
  window.remainingGESlots = remainingGESlots;
  window.currentTrack = currentTrack;
}

// Toggle course exclusion (for shiftees)
async function toggleCourseExclusion(courseId, allCourses) {
  // Ensure courseId is a string for consistent comparison
  const id = String(courseId);
  
  if (excludedCourses.has(id)) {
    excludedCourses.delete(id);
  } else {
    excludedCourses.add(id);
  }
  
  // Save to storage
  await chrome.storage.local.set({ excludedCourses: Array.from(excludedCourses) });
  
  // Recalculate and redisplay
  displayGradesData(allCourses);
}

function calculateWhatIf() {
  const targetRadio = document.querySelector('input[name="targetHonor"]:checked');
  if (!targetRadio) {
    showResults('error', 'Please select a target honor.');
    return;
  }
  
  let targetGWA;
  if (targetRadio.value === 'custom') {
    targetGWA = parseFloat(document.getElementById('customGWA').value);
    if (isNaN(targetGWA) || targetGWA < 1.0 || targetGWA > 5.0) {
      showResults('error', 'Please enter a valid GWA between 1.00 and 5.00');
      return;
    }
  } else {
    targetGWA = parseFloat(targetRadio.value);
  }
  
  const data = window.gradesData;
  const remaining = window.remainingCourses || [];
  const freeElectiveUnits = window.freeElectiveUnitsRemaining || 0;
  
  // Calculate remaining units (excluding PE/NSTP)
  let remainingUnits = remaining.reduce((sum, c) => sum + c.units, 0) + freeElectiveUnits;
  
  // Add GE remaining units (assume 3 units each)
  const remainingGEUnits = (window.remainingGESlots || 0) * 3;
  remainingUnits += remainingGEUnits;
  
  // Current weighted sum
  const currentWeightedSum = data.gwa * data.totalUnits;
  
  // Total units after completion
  const totalUnitsAfter = data.totalUnits + remainingUnits;
  
  // Check if already achieved
  if (data.gwa <= targetGWA) {
    showResults('achieved', targetGWA, data.gwa, data.totalUnits, remainingUnits, data.gwa);
    return;
  }
  
  // Required weighted sum for target GWA
  const requiredWeightedSum = targetGWA * totalUnitsAfter;
  
  // Remaining weighted sum needed
  const remainingWeightedSumNeeded = requiredWeightedSum - currentWeightedSum;
  
  // Required average grade for remaining courses
  const requiredAvgGrade = remainingUnits > 0 ? remainingWeightedSumNeeded / remainingUnits : 0;
  
  // Determine feasibility
  if (requiredAvgGrade < 1.0) {
    // Impossible - would need grades better than 1.0
    showResults('impossible-low', targetGWA, data.gwa, data.totalUnits, remainingUnits, requiredAvgGrade);
  } else if (requiredAvgGrade > 5.0) {
    // Impossible - would need grades worse than 5.0
    showResults('impossible-high', targetGWA, data.gwa, data.totalUnits, remainingUnits, requiredAvgGrade);
  } else {
    // Possible - show required grade
    showResults('possible', targetGWA, data.gwa, data.totalUnits, remainingUnits, requiredAvgGrade);
  }
}

function showResults(status, targetGWA, currentGWA, unitsCompleted, unitsRemaining, requiredGrade) {
  const resultsEl = document.getElementById('whatifResults');
  const contentEl = document.getElementById('resultsContent');
  resultsEl.classList.remove('hidden');
  
  const honorNames = {
    1.20: 'Summa Cum Laude',
    1.45: 'Magna Cum Laude',
    1.75: 'Cum Laude',
    2.00: 'Honor Roll'
  };
  
  if (status === 'error') {
    contentEl.innerHTML = `<div class="result-summary impossible">${targetGWA}</div>`;
    return;
  }
  
  const targetName = honorNames[targetGWA] || `GWA of ${targetGWA.toFixed(2)}`;
  
  let statusClass, statusMessage, gradeDisplay;
  
  switch (status) {
    case 'achieved':
      statusClass = 'achieved';
      statusMessage = `🎉 You've already achieved ${targetName}!`;
      gradeDisplay = 'Maintain your current performance!';
      break;
    case 'impossible-low':
      statusClass = 'impossible';
      statusMessage = `❌ ${targetName} is no longer achievable.`;
      gradeDisplay = `Would require avg grade of ${requiredGrade.toFixed(2)} (below 1.00 - impossible)`;
      break;
    case 'impossible-high':
      statusClass = 'impossible';
      statusMessage = `❌ ${targetName} is not achievable with remaining courses.`;
      gradeDisplay = `Would require avg grade of ${requiredGrade.toFixed(2)} (above 5.00)`;
      break;
    case 'possible':
      if (requiredGrade <= 1.25) {
        statusClass = 'excellent';
        statusMessage = `✨ ${targetName} is achievable with excellent performance!`;
      } else if (requiredGrade <= 1.75) {
        statusClass = 'good';
        statusMessage = `✅ ${targetName} is achievable with very good performance.`;
      } else if (requiredGrade <= 2.50) {
        statusClass = 'moderate';
        statusMessage = `⚡ ${targetName} is achievable with good performance.`;
      } else {
        statusClass = 'difficult';
        statusMessage = `⚠️ ${targetName} is challenging but possible.`;
      }
      gradeDisplay = requiredGrade.toFixed(4);
      break;
  }
  
  contentEl.innerHTML = `
    <div class="result-summary ${statusClass}">
      ${statusMessage}
    </div>
    <div class="result-details">
      <div class="result-row">
        <span>Current GWA</span>
        <span class="value">${currentGWA.toFixed(4)}</span>
      </div>
      <div class="result-row">
        <span>Target GWA</span>
        <span class="value">≤ ${targetGWA.toFixed(2)}</span>
      </div>
      <div class="result-row">
        <span>Units Completed</span>
        <span class="value">${unitsCompleted}</span>
      </div>
      <div class="result-row">
        <span>Units Remaining</span>
        <span class="value">${unitsRemaining}</span>
      </div>
      <div class="result-row highlight">
        <span>Required Avg Grade</span>
        <span class="value">${gradeDisplay}</span>
      </div>
    </div>
  `;
}
// Wrapped Feature

let wrappedCurrentPanel = 0;
let wrappedPanels = [];

function initializeWrapped() {
  const prevBtn = document.getElementById('wrappedPrev');
  const nextBtn = document.getElementById('wrappedNext');
  const exportBtn = document.getElementById('wrappedExport');
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => navigateWrapped(-1));
    nextBtn.addEventListener('click', () => navigateWrapped(1));
  }
  
  if (exportBtn) {
    exportBtn.addEventListener('click', exportWrappedToPNG);
  }
}

function generateWrappedData(courses) {
  const data = {
    gwa: 0,
    totalUnits: 0,
    distinctGrades: new Set(),
    gradeDistribution: {},
    fails: 0,
    retakes: {},
    highestGradeCourse: null,
    lowestGradeCourse: null,
    mostRetakedCourse: null,
    totalCourses: 0,
    specialGrades: [],
    semesterGWAs: {} // Track GWA per semester
  };
  
  const nonNumericGrades = ['S', 'U', 'INC', 'DRP', 'W', 'P', 'DFG'];
  const excludedPrefixes = ['NSTP', 'HK', 'PE'];
  let totalWeighted = 0;
  
  // Temporary storage for semester calculations
  const semesterData = {};
  
  courses.forEach(course => {
    const courseCode = course.courseCode || '';
    const gradeStr = (course.grade || '').toString().toUpperCase().trim();
    const semKey = course.term || `${course.academicYear} - ${course.semester}`;
    
    // Skip excluded prefixes
    if (excludedPrefixes.some(prefix => courseCode.toUpperCase().startsWith(prefix))) {
      return;
    }
    
    // Track all distinct grades (including special ones)
    data.distinctGrades.add(gradeStr);
    
    // Track special grades
    if (nonNumericGrades.includes(gradeStr)) {
      if (!data.specialGrades.includes(gradeStr)) {
        data.specialGrades.push(gradeStr);
      }
      return;
    }
    
    const grade = parseFloat(course.grade);
    const units = course.units || 0;
    
    if (isNaN(grade) || grade < 1.0 || grade > 5.0 || units === 0) return;
    
    data.totalCourses++;
    
    // Track semester GWA data
    if (!semesterData[semKey]) {
      semesterData[semKey] = { totalWeighted: 0, totalUnits: 0 };
    }
    semesterData[semKey].totalWeighted += grade * units;
    semesterData[semKey].totalUnits += units;
    
    // Track grade distribution
    const gradeKey = grade.toFixed(2);
    data.gradeDistribution[gradeKey] = (data.gradeDistribution[gradeKey] || 0) + 1;
    
    // Track retakes (same course code appearing multiple times)
    const codeNorm = courseCode.toUpperCase().trim();
    data.retakes[codeNorm] = (data.retakes[codeNorm] || 0) + 1;
    
    // Track fails
    if (grade === 5.0) {
      data.fails++;
    }
    
    // Track highest grade course
    if (!data.highestGradeCourse || grade < data.highestGradeCourse.grade) {
      data.highestGradeCourse = { code: courseCode, title: course.courseTitle, grade };
    }
    
    // Track lowest grade course (excluding 5.0)
    if (grade < 5.0) {
      if (!data.lowestGradeCourse || grade > data.lowestGradeCourse.grade) {
        data.lowestGradeCourse = { code: courseCode, title: course.courseTitle, grade };
      }
    }
    
    totalWeighted += grade * units;
    data.totalUnits += units;
  });
  
  // Find most retaked course
  let maxRetakes = 0;
  Object.entries(data.retakes).forEach(([code, count]) => {
    if (count > maxRetakes) {
      maxRetakes = count;
      const courseInfo = courses.find(c => c.courseCode.toUpperCase() === code);
      data.mostRetakedCourse = { 
        code, 
        title: courseInfo?.courseTitle || code, 
        count 
      };
    }
  });
  
  // Only set if actually retaken
  if (maxRetakes <= 1) data.mostRetakedCourse = null;
  
  data.gwa = data.totalUnits > 0 ? totalWeighted / data.totalUnits : 0;
  
  // Calculate semester GWAs
  Object.entries(semesterData).forEach(([sem, semData]) => {
    if (semData.totalUnits > 0) {
      data.semesterGWAs[sem] = {
        gwa: semData.totalWeighted / semData.totalUnits,
        units: semData.totalUnits
      };
    }
  });
  
  // Find best and "needs improvement" semesters
  let bestSem = null, worstSem = null;
  Object.entries(data.semesterGWAs).forEach(([sem, semInfo]) => {
    if (!bestSem || semInfo.gwa < bestSem.gwa) {
      bestSem = { name: sem, gwa: semInfo.gwa, units: semInfo.units };
    }
    if (!worstSem || semInfo.gwa > worstSem.gwa) {
      worstSem = { name: sem, gwa: semInfo.gwa, units: semInfo.units };
    }
  });
  data.bestSemester = bestSem;
  data.needsWorkSemester = worstSem;
  
  return data;
}

function generateWrappedPanels(data) {
  const panels = [];
  
  // Panel 1: GWA Overview
  panels.push(generateGWAPanel(data));
  
  // Panel 2: Best/Toughest Semester
  panels.push(generateSemesterPanel(data));
  
  // Panel 3: Grade Collector
  panels.push(generateCollectorPanel(data));
  
  // Panel 4: Perseverance (Fails)
  panels.push(generatePerseverancePanel(data));
  
  // Panel 5: Course Highlights
  panels.push(generateHighlightsPanel(data));
  
  // Panel 6: Graduation Progress
  panels.push(generateProgressPanel(data));
  
  return panels;
}

function generateGWAPanel(data) {
  const gwa = data.gwa;
  let emoji, title, message;
  
  if (gwa === 0) {
    emoji = "📚";
    title = "LOADING...";
    message = "Freshie ka ba? Or di pa nag-uupload ng grades si registrar. Either way, good luck sa journey mo!";
  } else if (gwa <= 1.20) {
    emoji = "🏆";
    title = "SUMMA MATERIAL";
    message = "Grabe naman 'to?? Penge tips naman. Seryoso, pano mo nagagawa 'yan habang may social life??";
  } else if (gwa <= 1.45) {
    emoji = "⭐";
    title = "MAGNA TINGZ";
    message = "Consistent high grades! Ikaw yung type na maayos notes tapos hinahanap ka ng groupmates pag may exam.";
  } else if (gwa <= 1.75) {
    emoji = "🎯";
    title = "CUM LAUDE SZN";
    message = "Solid GWA! Di ka nag-slack off pero di rin naman nagpaka-robot. Balance talaga.";
  } else if (gwa <= 2.00) {
    emoji = "🌟";
    title = "HONOR ROLL";
    message = "Pasok sa honors! May hirap-hirap pero kinaya mo naman. Proud of u!";
  } else if (gwa <= 2.50) {
    emoji = "💪";
    title = "PASANG-ALAM";
    message = "Passing is passing! May mga sem na mabigat talaga, wag ka maguilty. Nasa UP ka pa rin.";
  } else if (gwa <= 3.00) {
    emoji = "🎮";
    title = "SURVIVAL MODE";
    message = "Nandito ka pa, that counts. Minsan ganyan talaga UP — basta graduate, panalo.";
  } else {
    emoji = "🌱";
    title = "COMEBACK ARC";
    message = "Mababa man ngayon, pwede pa 'yan i-improve. Marami nang naka-recover from this. Kaya mo 'yan.";
  }
  
  return `
    <div class="panel-emoji">${emoji}</div>
    <div class="panel-title">${title}</div>
    <div class="panel-value">${gwa > 0 ? gwa.toFixed(4) : '--'}</div>
    <div class="panel-subtitle">My Elbi GWA</div>
    <div class="panel-message">${message}</div>
  `;
}

function generateSemesterPanel(data) {
  const numSemesters = Object.keys(data.semesterGWAs).length;
  
  if (numSemesters === 0) {
    return `
      <div class="panel-emoji">📅</div>
      <div class="panel-title">SEMESTER STATS</div>
      <div class="panel-value">--</div>
      <div class="panel-subtitle">No semester data yet</div>
      <div class="panel-message">Check back once grades are in!</div>
    `;
  }
  
  let content = `<div class="panel-emoji">📅</div>
    <div class="panel-title">SEMESTER STATS</div>`;
  
  // Best semester
  if (data.bestSemester) {
    const best = data.bestSemester;
    let reaction = '';
    if (best.gwa <= 1.25) reaction = 'Your peak';
    else if (best.gwa <= 1.50) reaction = 'Nice run!';
    else if (best.gwa <= 1.75) reaction = 'Solid sem';
    else if (best.gwa <= 2.00) reaction = 'Good one';
    else reaction = 'Best so far';
    
    content += `
      <div class="highlight-course" style="margin-top: 15px;">
        <div class="course-label">🏆 Best Semester</div>
        <div class="course-name">${sanitizeText(best.name)}</div>
        <div class="course-grade">GWA: ${best.gwa.toFixed(4)} — ${reaction}</div>
      </div>
    `;
  }
  
  // "Needs work" semester (only if different from best)
  if (data.needsWorkSemester && data.bestSemester && 
      data.needsWorkSemester.name !== data.bestSemester.name) {
    const tough = data.needsWorkSemester;
    let reaction = '';
    if (tough.gwa >= 3.0) reaction = 'Rough one';
    else if (tough.gwa >= 2.5) reaction = 'Challenging';
    else if (tough.gwa >= 2.0) reaction = 'Tough load';
    else reaction = 'Room to grow';
    
    content += `
      <div class="highlight-course">
        <div class="course-label">📈 Toughest Semester</div>
        <div class="course-name">${sanitizeText(tough.name)}</div>
        <div class="course-grade">GWA: ${tough.gwa.toFixed(4)} — ${reaction}</div>
      </div>
    `;
  }
  
  // Overall message
  const semCount = Object.keys(data.semesterGWAs).length;
  let overallMsg = '';
  if (semCount >= 8) overallMsg = `${semCount} semesters completed — almost there!`;
  else if (semCount >= 6) overallMsg = `${semCount} sems done. The end is in sight.`;
  else if (semCount >= 4) overallMsg = `${semCount} sems in — you're halfway through!`;
  else if (semCount >= 2) overallMsg = `${semCount} semesters down, many more to go.`;
  else overallMsg = `Just getting started. Enjoy the ride!`;
  
  content += `<div class="panel-message">${overallMsg}</div>`;
  
  return content;
}

function generateCollectorPanel(data) {
  const numericGrades = Object.keys(data.gradeDistribution).length;
  const specialCount = data.specialGrades.length;
  const totalDistinct = data.distinctGrades.size;
  
  let emoji, title, message;
  
  // Check for "mega collector" status (many distinct grades including special ones)
  if (totalDistinct >= 10) {
    emoji = "🎰";
    title = "FULL COLLECTION";
    message = "You've seen it all — from 1.0 to 5.0, plus S, U, INC, DRP... your transcript tells a story.";
  } else if (totalDistinct >= 7) {
    emoji = "🃏";
    title = "VARIETY PACK";
    message = "A bit of everything! Shows you've taken different kinds of subjects with different outcomes.";
  } else if (totalDistinct >= 4) {
    emoji = "🎲";
    title = "MIXED BAG";
    message = "Some ups, some downs. Pretty normal for most students tbh.";
  } else if (numericGrades === 1 && data.gwa <= 1.5) {
    emoji = "🎯";
    title = "ONE-TRACK MIND";
    message = "Same high grade over and over? That's rare consistency. How.";
  } else {
    emoji = "📊";
    title = "STEADY GRADES";
    message = "You stick to a range. Predictable in a good way — you know what you're doing.";
  }
  
  // Build grade badges
  let badgesHtml = '<div class="grade-badges">';
  const sortedGrades = Array.from(data.distinctGrades).sort();
  sortedGrades.forEach(grade => {
    const isSpecial = ['S', 'U', 'INC', 'DRP', 'W', 'P', 'DFG'].includes(grade);
    badgesHtml += `<span class="grade-badge ${isSpecial ? 'special' : ''}">${sanitizeText(grade)}</span>`;
  });
  badgesHtml += '</div>';
  
  return `
    <div class="panel-emoji">${emoji}</div>
    <div class="panel-title">${title}</div>
    <div class="panel-value">${totalDistinct}</div>
    <div class="panel-subtitle">distinct grades collected</div>
    ${badgesHtml}
    <div class="panel-message">${message}</div>
  `;
}

function generatePerseverancePanel(data) {
  const fails = data.fails;
  let emoji, title, message;
  
  if (fails === 0) {
    emoji = "🏅";
    title = "CLEAN RECORD";
    message = "Zero 5.0s? That's actually impressive. Not everyone can say that.";
  } else if (fails === 1) {
    emoji = "💫";
    title = "ONE SETBACK";
    message = "One 5.0 isn't the end of the world. It happens to plenty of us. Bounce back season.";
  } else if (fails <= 3) {
    emoji = "🔥";
    title = "STILL STANDING";
    message = `${fails} failed subjects but you're still here. Every retake is a chance to do better.`;
  } else if (fails <= 5) {
    emoji = "🦅";
    title = "FIGHTING SPIRIT";
    message = `${fails} times down but not out. The fact that you're still going says a lot.`;
  } else {
    emoji = "💎";
    title = "SURVIVOR";
    message = `${fails} 5.0s and still pushing through? That takes real grit. Respect.`;
  }
  
  return `
    <div class="panel-emoji">${emoji}</div>
    <div class="panel-title">${title}</div>
    <div class="panel-value">${fails}</div>
    <div class="panel-subtitle">${fails === 1 ? 'subject to retake' : 'subjects to retake'}</div>
    <div class="panel-message">${message}</div>
  `;
}

function generateHighlightsPanel(data) {
  let content = `<div class="panel-emoji">🫴🫴</div>
    <div class="panel-title">YOUR HIGHLIGHTS</div>`;
  
  if (data.highestGradeCourse) {
    content += `
      <div class="highlight-course">
        <div class="course-label">🏆 Best Performance</div>
        <div class="course-name">${sanitizeText(data.highestGradeCourse.code)}</div>
        <div class="course-grade">Grade: ${data.highestGradeCourse.grade.toFixed(2)}</div>
      </div>
    `;
  }
  
  if (data.lowestGradeCourse && data.lowestGradeCourse.grade < 5.0) {
    content += `
      <div class="highlight-course">
        <div class="course-label">📈 Room to Grow</div>
        <div class="course-name">${sanitizeText(data.lowestGradeCourse.code)}</div>
        <div class="course-grade">Grade: ${data.lowestGradeCourse.grade.toFixed(2)}</div>
      </div>
    `;
  }
  
  if (data.mostRetakedCourse && data.mostRetakedCourse.count > 1) {
    content += `
      <div class="highlight-course">
        <div class="course-label">🔄 Persistence Award</div>
        <div class="course-name">${sanitizeText(data.mostRetakedCourse.code)}</div>
        <div class="course-grade">Taken ${data.mostRetakedCourse.count}x — you didn't give up</div>
      </div>
    `;
  }
  
  if (!data.highestGradeCourse && !data.lowestGradeCourse) {
    content += `<div class="panel-subtitle">Complete some subjects to see your highlights!</div>`;
  }
  
  content += `<div class="panel-message">Every subject is part of your journey</div>`;
  
  return content;
}

function generateProgressPanel(data) {
  const currentProgram = getCurrentCurriculum();
  const totalRequired = currentProgram?.totalUnitsRequired || 155;
  const completed = data.totalUnits;
  const remaining = Math.max(0, totalRequired - completed);
  const percentage = Math.min(100, Math.round((completed / totalRequired) * 100));
  
  let emoji, title, message;
  
  if (percentage >= 100) {
    emoji = "🎓";
    title = "GRADUATION READY";
    message = "All units done! Time to march. Congratulations — you made it.";
  } else if (percentage >= 80) {
    emoji = "🚀";
    title = "ALMOST THERE";
    message = `${remaining} units left. The finish line is in sight. Last push na 'to.`;
  } else if (percentage >= 60) {
    emoji = "⚡";
    title = "PAST HALFWAY";
    message = `${remaining} units to go. More than half done — you've got momentum.`;
  } else if (percentage >= 40) {
    emoji = "🌤️";
    title = "MAKING PROGRESS";
    message = `${remaining} units remaining. Take it one sem at a time.`;
  } else if (percentage >= 20) {
    emoji = "🌅";
    title = "EARLY DAYS";
    message = `${remaining} units ahead of you. Plenty of time to figure things out.`;
  } else {
    emoji = "🌱";
    title = "JUST STARTING";
    message = `${remaining} units to complete. Welcome to the journey — it's a marathon, not a sprint.`;
  }
  
  return `
    <div class="panel-emoji">${emoji}</div>
    <div class="panel-title">${title}</div>
    <div class="panel-value">${percentage}%</div>
    <div class="panel-subtitle">${completed} / ${totalRequired} units passed</div>
    <div class="panel-message">${message}</div>
  `;
}

function displayWrapped(courses) {
  const data = generateWrappedData(courses);
  wrappedPanels = generateWrappedPanels(data);
  wrappedCurrentPanel = 0;
  updateWrappedDisplay();
}

function updateWrappedDisplay() {
  const panelEl = document.getElementById('wrappedPanel');
  const progressEl = document.getElementById('wrappedProgress');
  const prevBtn = document.getElementById('wrappedPrev');
  const nextBtn = document.getElementById('wrappedNext');
  
  if (!panelEl || !wrappedPanels.length) return;
  
  panelEl.innerHTML = wrappedPanels[wrappedCurrentPanel];
  progressEl.textContent = `${wrappedCurrentPanel + 1} / ${wrappedPanels.length}`;
  
  prevBtn.disabled = wrappedCurrentPanel === 0;
  nextBtn.disabled = wrappedCurrentPanel === wrappedPanels.length - 1;
}

function navigateWrapped(direction) {
  const newIndex = wrappedCurrentPanel + direction;
  if (newIndex >= 0 && newIndex < wrappedPanels.length) {
    wrappedCurrentPanel = newIndex;
    updateWrappedDisplay();
  }
}

// Export wrapped panel to PNG
async function exportWrappedToPNG() {
  const panel = document.getElementById('wrappedPanel');
  if (!panel) return;
  
  // Create a canvas - Instagram story dimensions (1080x1920) but scaled down
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Compact story dimensions
  const scale = 2;
  const width = 360;
  const height = 640;
  canvas.width = width * scale;
  canvas.height = height * scale;
  ctx.scale(scale, scale);
  
  // Transparent background - don't fill anything
  ctx.clearRect(0, 0, width, height);
  
  // Get panel content
  const emoji = panel.querySelector('.panel-emoji')?.textContent || '';
  const title = panel.querySelector('.panel-title')?.textContent || '';
  const value = panel.querySelector('.panel-value')?.textContent || '';
  const subtitle = panel.querySelector('.panel-subtitle')?.textContent || '';
  const highlightCourses = panel.querySelectorAll('.highlight-course');
  const badges = panel.querySelectorAll('.grade-badge');
  
  // Calculate content height for centering
  let contentHeight = 120; // Base height for emoji + title + value
  if (subtitle) contentHeight += 30;
  if (badges.length > 0) contentHeight += 50;
  if (highlightCourses.length > 0) contentHeight += highlightCourses.length * 55;
  
  // Start Y position to center content
  let currentY = Math.max(80, (height - contentHeight) / 2 - 40);
  
  // Draw content
  ctx.textAlign = 'center';
  
  // Strava-like orange colors for export
  const stravaOrange = '#fc5200';
  const stravaOrangeLight = '#ff7a33';
  const stravaOrangeDark = '#e04800';
  
  // Helper for text with dark outline for contrast on any background
  function drawTextWithOutline(text, x, y, fillColor, outlineColor = '#000000') {
    ctx.lineWidth = 4;
    ctx.strokeStyle = outlineColor;
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = fillColor;
    ctx.fillText(text, x, y);
  }
  
  // Helper for word wrapping
  function wrapText(text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    words.forEach(word => {
      const testLine = currentLine + word + ' ';
      if (ctx.measureText(testLine).width > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine.trim()) lines.push(currentLine.trim());
    return lines;
  }
  
  // Header with branding at top
  ctx.font = '8px "Press Start 2P", monospace';
  drawTextWithOutline('Elbi GradeSim', width / 2, 64, stravaOrangeLight);
  ctx.font = '10px "Press Start 2P", monospace';
  drawTextWithOutline('amis.stimmie.dev', width / 2, 80, stravaOrange);
  
  // Emoji
  ctx.font = '56px Arial';
  drawTextWithOutline(emoji, width / 2, currentY, '#ffffff');
  currentY += 50;
  
  // Title (removed - just showing data, not descriptors)
  // Skip title, go straight to value
  
  // Value (the main data point)
  if (value && value !== '--') {
    ctx.font = 'bold 28px "Press Start 2P", monospace';
    drawTextWithOutline(value, width / 2, currentY + 20, stravaOrange);
    currentY += 60;
  }
  
  // Subtitle (brief context)
  if (subtitle) {
    ctx.font = '16px "VT323", monospace';
    const subtitleLines = wrapText(subtitle, width - 60);
    subtitleLines.forEach(line => {
      drawTextWithOutline(line, width / 2, currentY + 10, stravaOrangeLight);
      currentY += 18;
    });
    currentY += 10;
  }
  
  // Grade badges if present (for collector panel)
  if (badges.length > 0) {
    currentY += 15;
    const badgeWidth = 44;
    const maxPerRow = Math.floor((width - 60) / badgeWidth);
    const rows = Math.ceil(badges.length / maxPerRow);
    
    let badgeIndex = 0;
    for (let row = 0; row < rows; row++) {
      const badgesInRow = Math.min(maxPerRow, badges.length - badgeIndex);
      const totalRowWidth = badgesInRow * badgeWidth;
      let badgeX = (width - totalRowWidth) / 2;
      
      for (let i = 0; i < badgesInRow && badgeIndex < badges.length; i++) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.strokeStyle = stravaOrange;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(badgeX, currentY, 40, 24, 4);
        ctx.fill();
        ctx.stroke();
        ctx.font = '16px "VT323", monospace';
        drawTextWithOutline(badges[badgeIndex].textContent, badgeX + 20, currentY + 17, stravaOrange);
        badgeX += badgeWidth;
        badgeIndex++;
      }
      currentY += 30;
    }
    currentY += 10;
  }
  
  // Highlight courses (for semester stats and highlights panels)
  if (highlightCourses.length > 0) {
    currentY += 10;
    highlightCourses.forEach(course => {
      const name = course.querySelector('.course-name')?.textContent || '';
      const grade = course.querySelector('.course-grade')?.textContent || '';
      
      // Compact highlight box with dark background for contrast
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.strokeStyle = stravaOrange;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(50, currentY, width - 100, 45, 6);
      ctx.fill();
      ctx.stroke();
      
      // Course name
      ctx.font = '16px "VT323", monospace';
      ctx.textAlign = 'center';
      drawTextWithOutline(name, width / 2, currentY + 18, stravaOrange);
      
      // Grade info
      ctx.font = '14px "VT323", monospace';
      drawTextWithOutline(grade, width / 2, currentY + 35, stravaOrangeLight);
      
      currentY += 55;
    });
    
    // Check if this is the highlights panel (has Best Performance or Room to Grow)
    const isHighlightsPanel = title.includes('HIGHLIGHTS') || 
      Array.from(highlightCourses).some(c => 
        c.querySelector('.course-label')?.textContent?.includes('Best Performance') ||
        c.querySelector('.course-label')?.textContent?.includes('Room to Grow')
      );
    
    // Check if this is the semester panel (has Best Semester or Toughest Semester)
    const isSemesterPanel = title.includes('SEMESTER') || 
      Array.from(highlightCourses).some(c => 
        c.querySelector('.course-label')?.textContent?.includes('Best Semester') ||
        c.querySelector('.course-label')?.textContent?.includes('Toughest Semester')
      );
    
    if (isHighlightsPanel) {
      ctx.font = '18px "VT323", monospace';
      drawTextWithOutline('My lowest and highest grade', width / 2, currentY + 10, stravaOrangeLight);
    } else if (isSemesterPanel) {
      ctx.font = '18px "VT323", monospace';
      drawTextWithOutline('My lowest and highest semester', width / 2, currentY + 10, stravaOrangeLight);
    }
  }
  
  // Download
  const link = document.createElement('a');
  link.download = `elbi-wrapped-${wrappedCurrentPanel + 1}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Initialize wrapped navigation on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeWrapped();
});