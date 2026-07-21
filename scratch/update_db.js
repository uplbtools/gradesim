
const fs = require('fs');
const path = require('path');

const curriculumPath = '/home/stimmie/dev/uplbtools/gradesim/extension/src/curriculum.js';
const tempJsonPath = '/home/stimmie/dev/uplbtools/gradesim/scratch/parsed_programs.json';

const parsed = JSON.parse(fs.readFileSync(tempJsonPath, 'utf8'));
let content = fs.readFileSync(curriculumPath, 'utf8');

// We evaluate curriculum.js context to load UPLB_PROGRAMS
const context = {};
eval(content + '\ncontext.UPLB_PROGRAMS = UPLB_PROGRAMS;');
const UPLB_PROGRAMS = context.UPLB_PROGRAMS;

// Merge parsed programs into UPLB_PROGRAMS
Object.entries(UPLB_PROGRAMS).forEach(([code, program]) => {
  // Add graph attributes (year, sem, prereqs) to all programs
  if (parsed[code]) {
    // For PDF-parsed programs, replace majorCourses and requiredCodes with clean parsed data
    program.majorCourses = parsed[code].majorCourses;
    program.requiredCodes = parsed[code].requiredCodes;
    program.available = true;
  } else {
    // For non-PDF programs, infer year/sem from array index and add basic prereqs
    if (program.majorCourses) {
      program.majorCourses = program.majorCourses.map((course, idx) => {
        // Estimate year/semester based on index
        const total = program.majorCourses.length;
        const ratio = idx / total;
        let year = 1;
        let sem = "1";
        
        if (ratio < 0.25) { year = 1; sem = idx % 2 === 0 ? "1" : "2"; }
        else if (ratio < 0.50) { year = 2; sem = idx % 2 === 0 ? "1" : "2"; }
        else if (ratio < 0.75) { year = 3; sem = idx % 2 === 0 ? "1" : "2"; }
        else { year = 4; sem = idx % 2 === 0 ? "1" : "2"; }
        
        // Infer prereqs from common UPLB rules
        const prereqs = [];
        const normalizedCode = course.code.toUpperCase().trim();
        
        // Match numbers in course codes
        const codeNumMatch = normalizedCode.match(/([A-Z]+)\s*(\d+)/);
        if (codeNumMatch) {
          const prefix = codeNumMatch[1];
          const num = parseInt(codeNumMatch[2]);
          // If there is another course of the same prefix with smaller number in the list, set as prereq
          const prev = program.majorCourses.slice(0, idx).find(c => {
            const cMatch = c.code.toUpperCase().trim().match(/([A-Z]+)\s*(\d+)/);
            return cMatch && cMatch[1] === prefix && parseInt(cMatch[2]) < num;
          });
          if (prev) {
            prereqs.push(prev.code);
          }
        }
        
        return {
          ...course,
          year,
          sem,
          prereqs
        };
      });
    }
  }
});

// Generate new code content for curriculum.js
let newContent = '// UPLB Curriculum Database\n// Complete undergraduate programs for University of the Philippines Los Baños\n// NOTE: This is UPLB only - not UP Diliman, UP Manila, etc.\n\nconst UPLB_PROGRAMS = ' + JSON.stringify(UPLB_PROGRAMS, null, 2) + ';\n\n';

// Add the rest of the utility functions
const helperCode = `// Group programs by college
const COLLEGES = {
  "CAS": { name: "College of Arts and Sciences", programs: [] },
  "CAFS": { name: "College of Agriculture and Food Science", programs: [] },
  "CEAT": { name: "College of Engineering and Agro-Industrial Technology", programs: [] },
  "CFNR": { name: "College of Forestry and Natural Resources", programs: [] },
  "CEM": { name: "College of Economics and Management", programs: [] },
  "CHE": { name: "College of Human Ecology", programs: [] },
  "CVM": { name: "College of Veterinary Medicine", programs: [] },
  "CDC": { name: "College of Development Communication", programs: [] },
  "CPAf": { name: "College of Public Affairs and Development", programs: [] },
};

// Populate colleges with programs
Object.values(UPLB_PROGRAMS).forEach(program => {
  if (COLLEGES[program.college]) {
    COLLEGES[program.college].programs.push(program);
  }
});

// Current selected program (default to BSCS)
let currentProgram = UPLB_PROGRAMS["BSCS"];

// Get current curriculum based on selected program
function getCurrentCurriculum() {
  return currentProgram;
}

// Set current program
function setCurrentProgram(programCode) {
  if (UPLB_PROGRAMS[programCode]) {
    currentProgram = UPLB_PROGRAMS[programCode];
    updateTrackOptionsUI();
    updateCurriculumHint();
    return true;
  }
  return false;
}

// Update the track options UI based on current program
function updateTrackOptionsUI() {
  const trackSelector = document.getElementById('trackSelector');
  const trackOptions = document.getElementById('trackOptions');
  
  if (!trackSelector || !trackOptions) return;
  
  // If program has no tracks, hide the entire track selector
  if (!currentProgram.tracks) {
    trackSelector.style.display = 'none';
    return;
  }
  
  trackSelector.style.display = 'block';
  
  // Build track options HTML
  let html = '';
  for (const [trackKey, trackInfo] of Object.entries(currentProgram.tracks)) {
    const isChecked = trackKey === (currentProgram.defaultTrack || 'sp') ? 'checked' : '';
    let electiveInfo = \`\${trackInfo.freeElectiveUnits} free elective units\`;
    if (trackInfo.majorElectiveUnits) {
      electiveInfo += \` • \${trackInfo.majorElectiveUnits} major elective units\`;
    }
    html += \`
      <label class="track-option">
        <input type="radio" name="track" value="\${trackKey}" \${isChecked}>
        <span class="track-label">
          <strong>\${trackInfo.name}</strong>
          <small>\${trackInfo.code} • \${electiveInfo}</small>
        </span>
      </label>
    \`;
  }
  
  trackOptions.innerHTML = html;
  
  // Re-attach event listeners to the new radio buttons
  document.querySelectorAll('input[name="track"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (typeof currentTrack !== 'undefined') {
        currentTrack = e.target.value;
      }
      // Recalculate remaining courses with new track
      if (window.gradesData && window.gradesData.completedCourses) {
        displayRemainingCourses(window.gradesData.completedCourses);
      }
    });
  });
}

// Update the curriculum hint text
function updateCurriculumHint() {
  const hintEl = document.getElementById('curriculumHint');
  if (hintEl && currentProgram) {
    hintEl.textContent = \`Based on \${currentProgram.name} curriculum\`;
  }
}

// Detect which track the student is on based on completed courses
function detectTrack(completedCourses) {
  if (!currentProgram.tracks) return null;
  
  const codes = completedCourses.map(c => c.code.toUpperCase().trim());
  
  for (const [trackKey, track] of Object.entries(currentProgram.tracks)) {
    if (codes.some(code => code.startsWith(track.code.toUpperCase()))) {
      return trackKey;
    }
  }
  
  return null;
}

// Get free elective units based on track
function getFreeElectiveUnits(track) {
  if (!currentProgram.tracks) return 15; // Default
  
  if (track && currentProgram.tracks[track]) {
    return currentProgram.tracks[track].freeElectiveUnits;
  }
  
  // Return default track's units
  const defaultTrack = currentProgram.defaultTrack || Object.keys(currentProgram.tracks)[0];
  return currentProgram.tracks[defaultTrack]?.freeElectiveUnits || 15;
}

// Check if a course is a GE course (title starts with "(GE)")
function isGECourse(courseTitle) {
  return courseTitle && courseTitle.trim().startsWith("(GE)");
}

// Check if a course is a required major course
function isRequiredCourse(courseCode) {
  if (!currentProgram.requiredCodes) return false;
  
  const normalized = courseCode.toUpperCase().trim();
  return currentProgram.requiredCodes.some(code => 
    code.toUpperCase() === normalized
  );
}

// Get remaining required courses
function getRemainingCourses(completedCourses) {
  if (!currentProgram.majorCourses) return [];
  
  const completedCodes = new Set(
    completedCourses.map(c => c.code.toUpperCase().trim())
  );
  
  return currentProgram.majorCourses.filter(course => 
    !completedCodes.has(course.code.toUpperCase())
  );
}

// Count completed GE courses
function countCompletedGE(completedCourses) {
  return completedCourses.filter(c => isGECourse(c.title)).length;
}

// Get remaining GE slots
function getRemainingGESlots(completedCourses) {
  const completed = countCompletedGE(completedCourses);
  const required = currentProgram.geCoursesRequired || 9;
  return Math.max(0, required - completed);
}

// For backwards compatibility
const BSCS_CURRICULUM = UPLB_PROGRAMS["BSCS"];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    UPLB_PROGRAMS,
    COLLEGES,
    getCurrentCurriculum,
    setCurrentProgram,
    detectTrack,
    getFreeElectiveUnits,
    isGECourse,
    isRequiredCourse,
    getRemainingCourses,
    countCompletedGE,
    getRemainingGESlots,
    BSCS_CURRICULUM
  };
}
`;

fs.writeFileSync(curriculumPath, newContent + helperCode, 'utf8');
console.log('Successfully updated curriculum.js with structured course graphs!');
