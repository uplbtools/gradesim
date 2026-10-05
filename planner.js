// planner.js

function sanitizeText(text) {
  if (typeof text !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

let globalData = {};
let curriculum = null;

document.addEventListener('DOMContentLoaded', async () => {
  globalData = await chrome.storage.local.get(['gradesData', 'selectedProgram', 'substitutions', 'plannedSchedule', 'customCourseStatus']);
  const program = globalData.selectedProgram || 'BSCS';
  curriculum = typeof UPLB_PROGRAMS !== 'undefined' ? UPLB_PROGRAMS[program] : null;
  
  if (!globalData.plannedSchedule) globalData.plannedSchedule = {};
  if (!globalData.customCourseStatus) globalData.customCourseStatus = {};
  if (!globalData.substitutions) globalData.substitutions = {};
  
  if (!curriculum || !curriculum.majorCourses) {
    document.getElementById('plannerGrid').innerHTML = '<div class="no-data"><p>Curriculum data not available.</p></div>';
    return;
  }
  
  initDefaultSchedule();
  renderPlannerFullscreen();
  
  window.addEventListener('resize', () => {
    drawArrows(curriculum.majorCourses, window.nodeEls, document.getElementById('plannerArrows'), document.getElementById('plannerGrid'));
  });
});

function initDefaultSchedule() {
  curriculum.majorCourses.forEach(course => {
    if (!course.code || course.code === "Elective" || course.title.startsWith("(GE)")) return;
    const code = course.code.toUpperCase().trim();
    if (!globalData.plannedSchedule[code]) {
      const year = course.year || 1;
      let sem = course.sem || "1";
      if (sem === "midyear") sem = "3";
      globalData.plannedSchedule[code] = `Y${year}-${sem}`;
    }
  });
}

async function savePlannerData() {
  await chrome.storage.local.set({
    plannedSchedule: globalData.plannedSchedule,
    customCourseStatus: globalData.customCourseStatus
  });
}

function getTermTime(termKey) {
  if (termKey === 'Unplanned') return 999;
  const match = termKey.match(/Y(\d+)-(\d+)/);
  if (match) {
    return parseInt(match[1]) * 3 + parseInt(match[2]);
  }
  return 999;
}

function renderPlannerFullscreen() {
  const gridEl = document.getElementById('plannerGrid');
  const svgEl = document.getElementById('plannerArrows');
  gridEl.innerHTML = '';
  svgEl.innerHTML = '';
  
  // Create columns
  const colKeys = ['Unplanned'];
  for (let y = 1; y <= 6; y++) {
    colKeys.push(`Y${y}-1`);
    colKeys.push(`Y${y}-2`);
    colKeys.push(`Y${y}-3`);
  }
  
  const columns = {};
  colKeys.forEach(k => columns[k] = []);
  
  const nodeEls = {};
  window.nodeEls = nodeEls;
  
  // Base AMIS passed/failed
  const amisPassed = new Set();
  const amisFailed = new Set();
  
  if (globalData.gradesData && globalData.gradesData.student_grades) {
    for (const [termId, termData] of Object.entries(globalData.gradesData.student_grades)) {
      if (!termData || !termData.values) continue;
      for (const courseData of termData.values) {
        const gradeStr = (courseData.grade || '').toString().toUpperCase().trim();
        const code = (courseData.course?.course_code || '').toUpperCase().trim();
        const grade = parseFloat(gradeStr);
        if (gradeStr === 'S' || gradeStr === 'P' || (grade >= 1.0 && grade <= 3.0)) {
           amisPassed.add(code);
        } else if (grade === 5.0) {
           amisFailed.add(code);
        }
      }
    }
    // Add substitutions
    for (const [reqCode, takenCode] of Object.entries(globalData.substitutions)) {
      if (amisPassed.has(takenCode.toUpperCase().trim())) {
        amisPassed.add(reqCode.toUpperCase().trim());
      }
    }
  }
  
  curriculum.majorCourses.forEach(course => {
    if (!course.code || course.code === "Elective" || course.title.startsWith("(GE)")) return;
    const code = course.code.toUpperCase().trim();
    let termKey = globalData.plannedSchedule[code] || 'Unplanned';
    if (!columns[termKey]) termKey = 'Unplanned';
    columns[termKey].push(course);
  });
  
  colKeys.forEach(key => {
    // Hide empty Y5 and Y6 columns to save space, but show if they have courses
    if (key.match(/Y[56]/) && columns[key].length === 0) return;
    // Hide empty midyears
    if (key.endsWith('-3') && columns[key].length === 0) return;
    
    const colEl = document.createElement('div');
    colEl.className = 'planner-column';
    colEl.dataset.term = key;
    
    let colName = key;
    if (key.startsWith('Y')) {
      const [y, s] = key.split('-');
      colName = `Y${y} ${s === '3' ? 'Mid' : 'S' + s}`;
    }
    colEl.innerHTML = `<div class="planner-col-header">${colName}</div>`;
    
    // Drag & Drop
    colEl.addEventListener('dragover', e => {
      e.preventDefault();
      colEl.classList.add('drag-over');
    });
    colEl.addEventListener('dragleave', e => {
      colEl.classList.remove('drag-over');
    });
    colEl.addEventListener('drop', e => {
      e.preventDefault();
      colEl.classList.remove('drag-over');
      const draggedCode = e.dataTransfer.getData('text/plain');
      if (draggedCode && globalData.plannedSchedule[draggedCode] !== key) {
        globalData.plannedSchedule[draggedCode] = key;
        savePlannerData();
        renderPlannerFullscreen();
      }
    });
    
    columns[key].forEach(course => {
      const code = course.code.toUpperCase().trim();
      
      let status = 'planned'; 
      if (globalData.customCourseStatus[code]) {
        status = globalData.customCourseStatus[code]; 
      } else if (amisPassed.has(code)) {
        status = 'passed';
      } else if (amisFailed.has(code)) {
        status = 'failed';
      }
      
      let prereqsMet = true;
      let timingValid = true;
      
      if (status !== 'passed') {
        const prereqs = course.prereqs || [];
        prereqs.forEach(pr => {
          const prCode = pr.toUpperCase().trim();
          const prStatus = globalData.customCourseStatus[prCode] || (amisPassed.has(prCode) ? 'passed' : 'planned');
          if (prStatus !== 'passed') prereqsMet = false;
          
          if (prStatus !== 'passed') {
             const thisTime = getTermTime(key);
             const prTime = getTermTime(globalData.plannedSchedule[prCode] || 'Unplanned');
             if (prTime >= thisTime && thisTime !== 999) {
                timingValid = false;
             }
          }
        });
      }
      
      let nodeClass = status === 'passed' ? 'completed' : (status === 'failed' ? 'failed' : (prereqsMet ? 'available' : 'locked'));
      if (!timingValid) nodeClass += ' invalid-timing';
      
      const nodeEl = document.createElement('div');
      nodeEl.className = `planner-node ${nodeClass}`;
      nodeEl.id = `planner-node-${code.replace(/[^A-Z0-9]/g, '-')}`;
      nodeEl.draggable = true;
      
      nodeEl.innerHTML = `
        <span class="planner-node-code">${sanitizeText(course.code)}</span>
        <span class="planner-node-title" title="${sanitizeText(course.title)}">${sanitizeText(course.title)}</span>
      `;
      
      nodeEl.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', code);
        setTimeout(() => nodeEl.classList.add('dragging'), 0);
      });
      nodeEl.addEventListener('dragend', () => {
        nodeEl.classList.remove('dragging');
      });
      
      nodeEl.addEventListener('contextmenu', e => {
        e.preventDefault();
        const current = globalData.customCourseStatus[code] || (amisPassed.has(code) ? 'passed' : (amisFailed.has(code) ? 'failed' : 'planned'));
        let next = 'planned';
        if (current === 'planned' || current === 'locked' || current === 'available') next = 'passed';
        else if (current === 'passed') next = 'failed';
        else if (current === 'failed') next = 'planned';
        
        globalData.customCourseStatus[code] = next;
        savePlannerData();
        renderPlannerFullscreen();
      });
      
      colEl.appendChild(nodeEl);
      nodeEls[code] = nodeEl;
    });
    
    gridEl.appendChild(colEl);
  });
  
  setTimeout(() => drawArrows(curriculum.majorCourses, nodeEls, svgEl, gridEl), 100);
}

function drawArrows(courses, nodeEls, svgEl, gridEl) {
  svgEl.innerHTML = '';
  
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
  marker.setAttribute("id", "arrowhead");
  marker.setAttribute("markerWidth", "10");
  marker.setAttribute("markerHeight", "7");
  marker.setAttribute("refX", "9");
  marker.setAttribute("refY", "3.5");
  marker.setAttribute("orient", "auto");
  
  const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  polygon.setAttribute("points", "0 0, 10 3.5, 0 7");
  polygon.setAttribute("fill", "#5c8f5c");
  
  marker.appendChild(polygon);
  defs.appendChild(marker);
  svgEl.appendChild(defs);
  
  const gridRect = gridEl.getBoundingClientRect();
  svgEl.style.width = gridEl.scrollWidth + 'px';
  svgEl.style.height = gridEl.scrollHeight + 'px';
  
  courses.forEach(course => {
    const targetCode = course.code.toUpperCase().trim();
    const targetNode = nodeEls[targetCode];
    if (!targetNode) return;
    
    const prereqs = course.prereqs || [];
    prereqs.forEach(prereq => {
      const sourceCode = prereq.toUpperCase().trim();
      const sourceNode = nodeEls[sourceCode];
      
      if (sourceNode) {
        const sourceRect = sourceNode.getBoundingClientRect();
        const targetRect = targetNode.getBoundingClientRect();
        
        let startX, startY, endX, endY, pathD;
        
        if (sourceRect.right <= targetRect.left) {
          // Forward arrow
          startX = sourceRect.right - gridRect.left;
          startY = sourceRect.top + (sourceRect.height / 2) - gridRect.top;
          endX = targetRect.left - gridRect.left;
          endY = targetRect.top + (targetRect.height / 2) - gridRect.top;
          
          const distanceX = endX - startX;
          let drop = 0;
          if (distanceX > 250) {
            const skipCount = Math.floor(distanceX / 200);
            drop = skipCount * 40; 
          }
          
          const curveOffset = Math.max(30, distanceX / 2);
          pathD = `M ${startX} ${startY} C ${startX + curveOffset} ${startY + drop}, ${endX - curveOffset} ${endY + drop}, ${endX} ${endY}`;
        } else {
          // Backward or same column arrow
          startX = sourceRect.left - gridRect.left;
          startY = sourceRect.top + (sourceRect.height / 2) - gridRect.top;
          endX = targetRect.right - gridRect.left;
          endY = targetRect.top + (targetRect.height / 2) - gridRect.top;
          
          const curveOffset = Math.max(40, (startX - endX) / 2 + 20);
          pathD = `M ${startX} ${startY} C ${startX - curveOffset} ${startY}, ${endX + curveOffset} ${endY}, ${endX} ${endY}`;
        }
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathD);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "#5c8f5c");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("marker-end", "url(#arrowhead)");
        path.setAttribute("opacity", "0.6");
        
        svgEl.appendChild(path);
      }
    });
  });
}
