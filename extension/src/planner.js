// planner.js

function sanitizeText(text) {
  if (typeof text !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

let globalData = {};
let curriculum = null;
let baselineResult = null;
let simResult = null;
let currentStart = null; // { sem: '1'|'2'|'midyear', year: 2026, gridStartTime: 8 }

document.addEventListener('DOMContentLoaded', async () => {
  globalData = await chrome.storage.local.get(['gradesData', 'selectedProgram', 'substitutions', 'plannedSchedule', 'customCourseStatus']);
  const program = globalData.selectedProgram || 'BSCS';
  curriculum = typeof UPLB_PROGRAMS !== 'undefined' ? UPLB_PROGRAMS[program] : null;

  if (!globalData.plannedSchedule) globalData.plannedSchedule = {};
  if (!globalData.customCourseStatus) globalData.customCourseStatus = {};
  if (!globalData.substitutions) globalData.substitutions = {};

  if (!curriculum || !curriculum.majorCourses) {
    document.getElementById('plannerGrid').innerHTML = '<div class="no-data"><p>Curriculum data not available. Pick your program in the extension popup first.</p></div>';
    return;
  }

  document.getElementById('plannerProgram').textContent = curriculum.name || program;

  initDefaultSchedule();
  initWhatIfBar();
  runBaseline();
  renderPlannerFullscreen();

  window.addEventListener('resize', () => {
    drawArrows(curriculum.majorCourses, window.nodeEls, document.getElementById('plannerArrows'), document.getElementById('plannerGrid'));
  });
});

function plannable(course) {
  return course.code && course.code !== 'Elective' && !(course.title || '').startsWith('(GE)');
}

function initDefaultSchedule() {
  curriculum.majorCourses.forEach(course => {
    if (!plannable(course)) return;
    const code = course.code.toUpperCase().trim();
    if (!globalData.plannedSchedule[code]) {
      const year = course.year || 1;
      let sem = course.sem || '1';
      if (sem === 'midyear') sem = '3';
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

function timeToKey(time) {
  const year = Math.floor((time - 1) / 3);
  const sem = ((time - 1) % 3) + 1;
  return `Y${year}-${sem}`;
}

function semOfGridSlot(slotSem) {
  return slotSem === '3' ? 'midyear' : slotSem;
}

// AMIS grades + substitutions + manual overrides -> per-course status.
function computeStatuses() {
  const amisPassed = new Set();
  const amisFailed = new Set();

  if (globalData.gradesData && globalData.gradesData.student_grades) {
    for (const [, termData] of Object.entries(globalData.gradesData.student_grades)) {
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
    for (const [reqCode, takenCode] of Object.entries(globalData.substitutions)) {
      if (amisPassed.has(takenCode.toUpperCase().trim())) {
        amisPassed.add(reqCode.toUpperCase().trim());
      }
    }
  }

  const statusOf = (code) => {
    if (globalData.customCourseStatus[code]) return globalData.customCourseStatus[code];
    if (amisPassed.has(code)) return 'passed';
    if (amisFailed.has(code)) return 'failed';
    return 'planned';
  };

  const passedSet = new Set();
  curriculum.majorCourses.forEach(course => {
    if (!plannable(course)) return;
    const code = course.code.toUpperCase().trim();
    if (statusOf(code) === 'passed') passedSet.add(code);
  });
  // Substituted/AMIS codes outside the curriculum still count as passed prereqs.
  amisPassed.forEach(code => passedSet.add(code));

  return { statusOf, passedSet };
}

// ponytail: month heuristic for the current UPLB term (Aug-Dec 1st sem,
// Jan-May 2nd sem, Jun-Jul midyear). Enrollment cutoffs will be off by a few
// weeks at term boundaries; a "current term" picker is the upgrade path.
function currentTerm() {
  const now = new Date();
  const m = now.getMonth() + 1;
  if (m >= 8) return { sem: '1', year: now.getFullYear() };
  if (m <= 5) return { sem: '2', year: now.getFullYear() };
  return { sem: 'midyear', year: now.getFullYear() };
}

// Grid slot where engine termIndex 0 lands: first slot after the student's
// latest taken course whose sem matches the current calendar sem.
function computeGridStart(startSem, statusOf) {
  let base = 3; // just before Y1-1
  curriculum.majorCourses.forEach(course => {
    if (!plannable(course)) return;
    const code = course.code.toUpperCase().trim();
    const st = statusOf(code);
    if (st === 'passed' || st === 'failed') {
      const t = getTermTime(globalData.plannedSchedule[code] || 'Unplanned');
      if (t !== 999 && t > base) base = t;
    }
  });
  const want = startSem === 'midyear' ? 3 : parseInt(startSem);
  let t = base + 1;
  while (((t - 1) % 3) + 1 !== want) t++;
  return t;
}

function runScheduler(extra) {
  const { statusOf, passedSet } = computeStatuses();
  const term = currentTerm();
  const passed = new Set(passedSet);
  const notBefore = {};
  if (extra) {
    if (extra.removePassed) passed.delete(extra.removePassed);
    Object.assign(notBefore, extra.notBefore || {});
  }
  const result = scheduleEarliest({
    courses: curriculum.majorCourses,
    passed,
    notBefore,
    startSem: term.sem
  });
  currentStart = { sem: term.sem, year: term.year, gridStartTime: computeGridStart(term.sem, statusOf) };
  return result;
}

function gradLabel(result) {
  if (result.gradTermIndex < 0) return null;
  return termLabel(result.gradTermIndex, currentStart.year, currentStart.sem);
}

function runBaseline() {
  baselineResult = runScheduler(null);
  const el = document.getElementById('baselineGrad');
  const label = gradLabel(baselineResult);
  if (!label) {
    el.textContent = 'All major courses are done. 🎉';
  } else {
    const terms = baselineResult.gradTermIndex + 1;
    el.textContent = `Earliest graduation: ${label} — ${terms} term${terms === 1 ? '' : 's'} of major courses left`;
  }
  if (baselineResult.unschedulable.length > 0) {
    el.textContent += ` (could not place: ${baselineResult.unschedulable.join(', ')})`;
  }
}

/* ---------- What-if bar ---------- */

function initWhatIfBar() {
  const select = document.getElementById('whatifCourse');
  const { statusOf } = computeStatuses();
  const remaining = curriculum.majorCourses
    .filter(c => plannable(c) && statusOf(c.code.toUpperCase().trim()) !== 'passed')
    .sort((a, b) => a.code.localeCompare(b.code));

  remaining.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.code.toUpperCase().trim();
    opt.textContent = c.code;
    select.appendChild(opt);
  });

  document.getElementById('whatifSimulate').addEventListener('click', simulateWhatIf);
  document.getElementById('whatifReset').addEventListener('click', resetWhatIf);
  document.getElementById('whatifAutoplan').addEventListener('click', applyAutoPlan);
}

function simulateWhatIf() {
  const code = document.getElementById('whatifCourse').value;
  const mode = document.getElementById('whatifMode').value;
  const resultEl = document.getElementById('whatifResult');
  if (!code) {
    resultEl.textContent = 'Pick a course first.';
    return;
  }

  const baseTerm = baselineResult.assignedTerm[code];
  if (baseTerm === undefined) {
    resultEl.textContent = `${code} is not in the computed plan (already passed or unplaceable).`;
    return;
  }

  // fail = you take it as scheduled, fail, and retake at the next offering;
  // delay N = you take it N offering-slots later than earliest.
  const extra = { notBefore: {} };
  if (mode === 'fail') {
    extra.notBefore[code] = baseTerm + 1;
  } else {
    extra.notBefore[code] = baseTerm + parseInt(mode, 10);
  }

  simResult = runScheduler(extra);

  const before = gradLabel(baselineResult);
  const after = gradLabel(simResult);
  const slip = simResult.gradTermIndex - baselineResult.gradTermIndex;

  const pushed = [];
  Object.keys(simResult.assignedTerm).forEach(c => {
    if (c !== code && baselineResult.assignedTerm[c] !== undefined &&
        simResult.assignedTerm[c] > baselineResult.assignedTerm[c]) {
      pushed.push(c);
    }
  });

  const verb = mode === 'fail' ? 'Failing' : 'Delaying';
  if (slip <= 0) {
    resultEl.textContent = `${verb} ${code} does not move your graduation — still ${after}. ${pushed.length > 0 ? `Shifted: ${pushed.join(', ')}.` : 'Nothing else shifts.'}`;
  } else {
    resultEl.textContent = `${verb} ${code} slips graduation from ${before} to ${after} (+${slip} term${slip === 1 ? '' : 's'}). ${pushed.length > 0 ? `Also pushed later: ${pushed.join(', ')}.` : ''}`;
  }

  highlightWhatIf(code, pushed);
}

function highlightWhatIf(sourceCode, pushedCodes) {
  document.querySelectorAll('.planner-node.whatif-source, .planner-node.whatif-pushed')
    .forEach(el => el.classList.remove('whatif-source', 'whatif-pushed'));
  const nodeEls = window.nodeEls || {};
  if (sourceCode && nodeEls[sourceCode]) nodeEls[sourceCode].classList.add('whatif-source');
  pushedCodes.forEach(c => {
    if (nodeEls[c]) nodeEls[c].classList.add('whatif-pushed');
  });
}

function resetWhatIf() {
  simResult = null;
  document.getElementById('whatifResult').textContent = '';
  highlightWhatIf(null, []);
}

// Write the engine's plan (simulated one if active) into the drag-drop grid.
function applyAutoPlan() {
  const result = simResult || baselineResult;
  Object.entries(result.assignedTerm).forEach(([code, t]) => {
    globalData.plannedSchedule[code] = timeToKey(currentStart.gridStartTime + t);
  });
  savePlannerData();
  renderPlannerFullscreen();
  document.getElementById('whatifResult').textContent = 'Plan applied to the grid. Drag courses to adjust.';
}

/* ---------- Grid ---------- */

function renderPlannerFullscreen() {
  const gridEl = document.getElementById('plannerGrid');
  const svgEl = document.getElementById('plannerArrows');
  gridEl.innerHTML = '';
  svgEl.innerHTML = '';

  const { statusOf, passedSet } = computeStatuses();

  // Extend the grid if the plan reaches past Y6.
  let maxYear = 6;
  Object.values(globalData.plannedSchedule).forEach(key => {
    const m = key.match(/Y(\d+)-/);
    if (m) maxYear = Math.max(maxYear, parseInt(m[1]));
  });

  const colKeys = ['Unplanned'];
  for (let y = 1; y <= maxYear; y++) {
    colKeys.push(`Y${y}-1`);
    colKeys.push(`Y${y}-2`);
    colKeys.push(`Y${y}-3`);
  }

  const columns = {};
  colKeys.forEach(k => columns[k] = []);

  const nodeEls = {};
  window.nodeEls = nodeEls;

  curriculum.majorCourses.forEach(course => {
    if (!plannable(course)) return;
    const code = course.code.toUpperCase().trim();
    let termKey = globalData.plannedSchedule[code] || 'Unplanned';
    if (!columns[termKey]) termKey = 'Unplanned';
    columns[termKey].push(course);
  });

  colKeys.forEach(key => {
    // Hide empty far-future and midyear columns to save space
    if (key.match(/Y([5-9]|\d\d)/) && columns[key].length === 0) return;
    if (key.endsWith('-3') && columns[key].length === 0) return;

    const colEl = document.createElement('div');
    colEl.className = 'planner-column';
    colEl.dataset.term = key;

    let colName = key;
    if (key.startsWith('Y')) {
      const [y, s] = key.split('-');
      colName = `${y} ${s === '3' ? 'Mid' : 'S' + s}`;
    }
    colEl.innerHTML = `<div class="planner-col-header">${colName}</div>`;

    colEl.addEventListener('dragover', e => {
      e.preventDefault();
      colEl.classList.add('drag-over');
    });
    colEl.addEventListener('dragleave', () => {
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

    const colSem = key === 'Unplanned' ? null : semOfGridSlot(key.split('-')[1]);

    columns[key].forEach(course => {
      const code = course.code.toUpperCase().trim();
      const status = statusOf(code);

      let prereqsMet = true;
      let timingValid = true;

      if (status !== 'passed') {
        const prereqs = course.prereqs || [];
        prereqs.forEach(pr => {
          const prCode = pr.toUpperCase().trim();
          const prPassed = passedSet.has(prCode);
          if (!prPassed) {
            prereqsMet = false;
            const thisTime = getTermTime(key);
            const prTime = getTermTime(globalData.plannedSchedule[prCode] || 'Unplanned');
            if (prTime >= thisTime && thisTime !== 999) {
              timingValid = false;
            }
          }
        });
      }

      // Offering check: is this course actually given in this column's sem?
      let offeredOk = true;
      if (colSem && status !== 'passed') {
        offeredOk = offeredIn(course, colSem);
      }

      let nodeClass = status === 'passed' ? 'completed' : (status === 'failed' ? 'failed' : (prereqsMet ? 'available' : 'locked'));
      if (!timingValid) nodeClass += ' invalid-timing';
      if (!offeredOk) nodeClass += ' not-offered';

      const nodeEl = document.createElement('div');
      nodeEl.className = `planner-node ${nodeClass}`;
      nodeEl.id = `planner-node-${code.replace(/[^A-Z0-9]/g, '-')}`;
      nodeEl.draggable = true;
      nodeEl.dataset.code = code;

      const semNames = { '1': '1st Sem', '2': '2nd Sem', 'midyear': 'Midyear' };
      const offeredLabel = course.sem ? semNames[course.sem] : 'any regular sem';
      const problems = [];
      if (!timingValid) problems.push('scheduled before its prerequisite');
      if (!offeredOk) problems.push(`only offered ${offeredLabel}`);
      nodeEl.title = `${course.code} (${course.units || '?'} units, offered ${offeredLabel})${problems.length ? ' — ' + problems.join('; ') : ''}`;

      nodeEl.innerHTML = `
        <span class="planner-node-code">${sanitizeText(course.code)}</span>
        <span class="planner-node-title">${sanitizeText(course.title)}</span>
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
        cycleCourseStatus(code);
      });

      colEl.appendChild(nodeEl);
      nodeEls[code] = nodeEl;
    });

    gridEl.appendChild(colEl);
  });

  setTimeout(() => drawArrows(curriculum.majorCourses, nodeEls, svgEl, gridEl), 100);
}

function cycleCourseStatus(code) {
  const { statusOf } = computeStatuses();
  const current = statusOf(code);
  let next = 'planned';
  if (current === 'planned' || current === 'locked' || current === 'available') next = 'passed';
  else if (current === 'passed') next = 'failed';
  else if (current === 'failed') next = 'planned';

  globalData.customCourseStatus[code] = next;
  savePlannerData();
  runBaseline();
  renderPlannerFullscreen();
}

/* ---------- Arrows ---------- */

// Arrows render dimmed by default; hovering/focusing a course lights up only
// its own prerequisite chain. Anchor points are spread along the node edge so
// multi-arrow nodes don't stack every line at their vertical center.
// ponytail: no crossing-minimization routing — focus mode makes it moot.
function drawArrows(courses, nodeEls, svgEl, gridEl) {
  svgEl.innerHTML = '';

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
  marker.setAttribute('id', 'arrowhead');
  marker.setAttribute('markerWidth', '10');
  marker.setAttribute('markerHeight', '7');
  marker.setAttribute('refX', '9');
  marker.setAttribute('refY', '3.5');
  marker.setAttribute('orient', 'auto');

  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
  polygon.setAttribute('fill', '#5c8f5c');

  marker.appendChild(polygon);
  defs.appendChild(marker);
  svgEl.appendChild(defs);

  const gridRect = gridEl.getBoundingClientRect();
  svgEl.style.width = gridEl.scrollWidth + 'px';
  svgEl.style.height = gridEl.scrollHeight + 'px';

  // Collect edges first so anchor points can be spread per node.
  const edges = [];
  courses.forEach(course => {
    const targetCode = course.code ? course.code.toUpperCase().trim() : '';
    const targetNode = nodeEls[targetCode];
    if (!targetNode) return;
    (course.prereqs || []).forEach(prereq => {
      const sourceCode = prereq.toUpperCase().trim();
      const sourceNode = nodeEls[sourceCode];
      if (sourceNode) edges.push({ sourceCode, targetCode, sourceNode, targetNode });
    });
  });

  // Per-node edge lists for port spreading, sorted by the other end's y.
  const outEdges = {};
  const inEdges = {};
  edges.forEach(e => {
    (outEdges[e.sourceCode] = outEdges[e.sourceCode] || []).push(e);
    (inEdges[e.targetCode] = inEdges[e.targetCode] || []).push(e);
  });
  const centerY = el => {
    const r = el.getBoundingClientRect();
    return r.top + r.height / 2;
  };
  Object.values(outEdges).forEach(list => list.sort((a, b) => centerY(a.targetNode) - centerY(b.targetNode)));
  Object.values(inEdges).forEach(list => list.sort((a, b) => centerY(a.sourceNode) - centerY(b.sourceNode)));

  // Fractional vertical position along the node edge for the i-th of n ports.
  const portFrac = (i, n) => n <= 1 ? 0.5 : 0.25 + (0.5 * i) / (n - 1);

  window.arrowsByCode = {};

  edges.forEach(edge => {
    const { sourceCode, targetCode, sourceNode, targetNode } = edge;
    const sourceRect = sourceNode.getBoundingClientRect();
    const targetRect = targetNode.getBoundingClientRect();

    const outList = outEdges[sourceCode];
    const inList = inEdges[targetCode];
    const srcFrac = portFrac(outList.indexOf(edge), outList.length);
    const dstFrac = portFrac(inList.indexOf(edge), inList.length);

    let startX, startY, endX, endY, pathD;
    const stagger = (outList.indexOf(edge) % 3) * 12;

    if (sourceRect.right <= targetRect.left) {
      // Forward arrow
      startX = sourceRect.right - gridRect.left;
      startY = sourceRect.top + sourceRect.height * srcFrac - gridRect.top;
      endX = targetRect.left - gridRect.left;
      endY = targetRect.top + targetRect.height * dstFrac - gridRect.top;

      const distanceX = endX - startX;
      let drop = stagger;
      if (distanceX > 250) {
        const skipCount = Math.floor(distanceX / 200);
        drop += skipCount * 40;
      }

      const curveOffset = Math.max(30, distanceX / 2);
      pathD = `M ${startX} ${startY} C ${startX + curveOffset} ${startY + drop}, ${endX - curveOffset} ${endY + drop}, ${endX} ${endY}`;
    } else {
      // Backward or same column arrow
      startX = sourceRect.left - gridRect.left;
      startY = sourceRect.top + sourceRect.height * srcFrac - gridRect.top;
      endX = targetRect.right - gridRect.left;
      endY = targetRect.top + targetRect.height * dstFrac - gridRect.top;

      const curveOffset = Math.max(40, (startX - endX) / 2 + 20) + stagger;
      pathD = `M ${startX} ${startY} C ${startX - curveOffset} ${startY}, ${endX + curveOffset} ${endY}, ${endX} ${endY}`;
    }

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#5c8f5c');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('marker-end', 'url(#arrowhead)');
    path.classList.add('prereq-arrow');

    svgEl.appendChild(path);
    (window.arrowsByCode[sourceCode] = window.arrowsByCode[sourceCode] || []).push(path);
    (window.arrowsByCode[targetCode] = window.arrowsByCode[targetCode] || []).push(path);
  });

  setupArrowFocus(gridEl);
}

let arrowFocusBound = false;
function setupArrowFocus(gridEl) {
  if (arrowFocusBound) return;
  arrowFocusBound = true;

  const svgEl = document.getElementById('plannerArrows');
  const focusCode = code => {
    (window.arrowsByCode[code] || []).forEach(p => p.classList.add('arrow-focused'));
    svgEl.classList.add('has-focus');
  };
  const clearFocus = () => {
    document.querySelectorAll('.prereq-arrow.arrow-focused').forEach(p => p.classList.remove('arrow-focused'));
    svgEl.classList.remove('has-focus');
  };

  gridEl.addEventListener('mouseover', e => {
    const node = e.target.closest('.planner-node');
    if (node && node.dataset.code) {
      clearFocus();
      focusCode(node.dataset.code);
    }
  });
  gridEl.addEventListener('mouseout', e => {
    if (e.target.closest('.planner-node')) clearFocus();
  });
  gridEl.addEventListener('focusin', e => {
    const node = e.target.closest('.planner-node');
    if (node && node.dataset.code) {
      clearFocus();
      focusCode(node.dataset.code);
    }
  });
  gridEl.addEventListener('focusout', () => clearFocus());
}
