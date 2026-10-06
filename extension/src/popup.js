// extension/src/popup.js

/**
 * Elbi GradeSim popup.
 * Processes grades data locally. No data is collected, transmitted, or shared.
 * UI pieces come from components.js (h, icon, courseRow, notice, stat, badge...).
 */

const $ = id => document.getElementById(id);

// Store current track selection
let currentTrack = 'sp';

// Store excluded courses - Set of course IDs
let excludedCourses = new Set();

// Store current view mode
let currentView = 'semester';

// Store course substitutions - requiredCode -> takenCode
let substitutions = {};

// Courses marked passed or failed in the planner, so both count the same.
let customCourseStatus = {};

const NON_NUMERIC_GRADES = ['S', 'U', 'INC', 'DRP', 'W', 'P', 'DFG'];
// PE, HK and NSTP are not in the GWA. A word boundary keeps PEd (Physical
// Education majors) and similar codes in.
const NON_GWA_PREFIX = /^(NSTP|HK|PE)\b/i;
const courseIdOf = course => String(course.id || `${course.courseCode}-${course.termId}`);

// Replace a container's children with one notice (or clear it).
function showNotice(el, opts) {
  el.replaceChildren(opts ? notice(opts) : '');
}

document.addEventListener('DOMContentLoaded', async () => {
  hydrateIcons();
  const { theme } = await chrome.storage.local.get(['theme']);
  themeToggle($('themeToggle'), theme, next => chrome.storage.local.set({ theme: next }));

  // Check if opened in a tab
  const urlParams = new URLSearchParams(window.location.search);
  const isTabMode = urlParams.get('mode') === 'tab' || window.innerWidth > 600;
  if (isTabMode) {
    document.body.classList.add('tab-mode');
  }

  $('openTabBtn').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('popup.html?mode=tab') });
  });

  const help = modal($('helpDialog'));
  $('helpBtn').addEventListener('click', () => help.open());

  // Terms: one quiet line on first run, the full text one tap away.
  const terms = modal($('termsDialog'));
  $('viewTermsLink').addEventListener('click', () => terms.open());
  const { termsAccepted, lastError } = await chrome.storage.local.get(['termsAccepted', 'lastError']);
  if (!termsAccepted) {
    $('termsNotice').replaceChildren(notice({
      icon: 'info', class: 'terms-notice',
      body: 'Unofficial tool. Your grades stay on this device.',
      action: [
        button({ variant: 'text', text: 'Terms', 'aria-haspopup': 'dialog', onclick: () => terms.open() }),
        button({
          text: 'Got it', small: true,
          onclick: async () => {
            await chrome.storage.local.set({ termsAccepted: true });
            $('termsNotice').replaceChildren();
          },
        }),
      ],
    }));
  }
  showSyncError(lastError);

  // Load excluded courses from storage
  const savedExclusions = await chrome.storage.local.get(['excludedCourses']);
  if (savedExclusions.excludedCourses) {
    excludedCourses = new Set(savedExclusions.excludedCourses);
  }

  // Load substitutions from storage
  const savedSubstitutions = await chrome.storage.local.get(['substitutions', 'customCourseStatus']);
  if (savedSubstitutions.substitutions) {
    substitutions = savedSubstitutions.substitutions;
  }
  customCourseStatus = savedSubstitutions.customCourseStatus || {};

  $('openPlannerBtn').addEventListener('click', () => openPlanner());

  // In the small popup, a tab switch brings the tab's answer to the top so
  // the What if result shows without scrolling.
  const tablist = document.querySelector('.tabs');
  let firstTab = true;
  tabBar(tablist, () => {
    if (!firstTab && !document.body.classList.contains('tab-mode')) tablist.scrollIntoView({ block: 'start' });
    firstTab = false;
  });

  // Program: the first run (or a stored code GradeSim no longer has) asks
  // before showing anything that depends on it.
  const programSelect = $('programSelect');
  const savedProgram = await chrome.storage.local.get(['selectedProgram', 'selectedTracks', 'selectedSpecializations']);
  window.selectedTracks = savedProgram.selectedTracks || {};
  window.selectedSpecializations = savedProgram.selectedSpecializations || {};
  const known = UPLB_PROGRAMS[savedProgram.selectedProgram] ? savedProgram.selectedProgram : null;
  fillProgramSelect(programSelect, known);
  if (known) selectProgram(known);
  else {
    document.body.classList.add('needs-program');
    $('programLabel').textContent = 'Pick your program to start';
  }

  programSelect.addEventListener('change', (e) => {
    const programCode = e.target.value;
    selectProgram(programCode);
    chrome.storage.local.set({ selectedProgram: programCode });
    document.body.classList.remove('needs-program');
    $('programLabel').textContent = 'Your program';
    programSelect.querySelector('option[value=""]')?.remove();
    if (window.gradesData) displayRemaining();
  });

  // View toggle handling (semester or year)
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      currentView = btn.dataset.view;
      if (window.gradesData && window.gradesData.courses) {
        const { gradesBySemester } = calculateGWA(window.gradesData.courses, excludedCourses);
        displayGradesList(gradesBySemester, window.gradesData.courses);
      }
    });
  });

  loadGradesData();
  $('refreshBtn').addEventListener('click', refreshGrades);
  wireBackup();
  wireClearData();

  document.querySelectorAll('input[name="targetHonor"]').forEach(r => r.addEventListener('change', renderWhatIf));
  $('customGWA').addEventListener('focus', () => {
    document.querySelector('input[value="custom"]').checked = true;
  });
  $('customGWA').addEventListener('input', renderWhatIf);

  $('addSubBtn').addEventListener('click', async () => {
    const reqSelect = $('subRequired');
    const takenSelect = $('subTaken');
    const reqCode = reqSelect.value;
    const takenCode = takenSelect.value;

    if (!reqCode || !takenCode) {
      showNotice($('subNotice'), { tone: 'warn', icon: 'alert', body: 'Pick both a required course and the course that covers it.' });
      return;
    }
    showNotice($('subNotice'), null);

    substitutions[reqCode] = takenCode;
    await chrome.storage.local.set({ substitutions });

    reqSelect.value = '';
    takenSelect.value = '';

    if (window.gradesData && window.gradesData.courses) {
      displayGradesData(window.gradesData.courses);
    }
  });

  initializeWrapped();
});

// Programs grouped by college. Programs without a checklist yet show as
// disabled options marked coming soon.
function fillProgramSelect(select, current) {
  const byName = (a, b) => a.name.localeCompare(b.name);
  select.replaceChildren(...flat([
    !current && h('option', { value: '', disabled: true, selected: true }, 'Choose your program'),
    Object.values(COLLEGES).filter(c => c.programs.length).map(c => h('optgroup', { label: c.name },
      [...c.programs].sort(byName).map(p => h('option', { value: p.code, disabled: !p.available, selected: p.code === current },
        p.available ? p.name : `${p.name}, coming soon`)))),
  ]));
}

function openPlanner(failedCode) {
  const q = failedCode ? `?whatif=${encodeURIComponent(failedCode)}` : '';
  chrome.tabs.create({ url: chrome.runtime.getURL(`planner.html${q}`) });
}

// Set the curriculum and redraw the track and specialization pickers for it.
function selectProgram(code) {
  if (!setCurrentProgram(code)) return;
  updateTrackOptionsUI();
  updateSpecializationUI();
}

// The specialization picked for the current program, or null.
function currentSpecialization() {
  const program = getCurrentCurriculum();
  const key = (window.selectedSpecializations || {})[program.code];
  return program.specializations && program.specializations[key] ? key : null;
}

// Specialization picker for programs whose catalog lists fields or tracks.
function updateSpecializationUI() {
  const program = getCurrentCurriculum();
  const specs = program.specializations;
  $('specSelector').hidden = !specs;
  $('whatifMoreLabel').textContent = specs ? 'Track, specialization and substitutions' : 'Track and substitutions';
  if (!specs) return;
  const chosen = currentSpecialization();
  const select = $('specSelect');
  select.replaceChildren(option('', 'Not chosen yet'),
    ...Object.entries(specs).map(([key, spec]) => option(key, spec.name)));
  select.value = chosen || '';
  select.onchange = () => {
    // Remember the pick per program; the planner reads it too.
    window.selectedSpecializations = { ...(window.selectedSpecializations || {}), [program.code]: select.value };
    if (!select.value) delete window.selectedSpecializations[program.code];
    chrome.storage.local.set({ selectedSpecializations: window.selectedSpecializations });
    if (window.gradesData) displayRemaining();
    else renderSpecializationCourses();
  };
  renderSpecializationCourses();
}

// The chosen specialization's courses by pool, with the ones already passed.
function renderSpecializationCourses(passed = new Set()) {
  const program = getCurrentCurriculum();
  const spec = program.specializations && program.specializations[currentSpecialization()];
  if (!spec) {
    $('specCourses').replaceChildren(...flat([program.specializations &&
      h('p', { class: 'hint' }, 'Pick yours to see its courses. They fill the matching slots in your checklist.')]));
    return;
  }
  $('specCourses').replaceChildren(...flat([
    spec.pools.map(pool => [
      h('h4', {}, pool.name),
      h('p', { class: 'hint' }, pool.courses.length > pool.slots.length
        ? `Take ${pool.slots.length} of these ${pool.courses.length}.`
        : `Take all ${pool.courses.length}.`),
      pool.courses.map(code => {
        const entry = UPLB_CATALOG[code];
        return courseRow({
          code,
          title: entry && entry.title.replace(/\.$/, ''),
          units: entry ? entry.units : null,
          aside: passed.has(code) && badge('Passed', { tone: 'ok', icon: 'check' }),
        });
      }),
    ]),
    spec.note && h('p', { class: 'hint' }, spec.note),
    h('p', { class: 'hint' }, `From the ${spec.source}.`),
  ]));
}

// Track radios for the current program.
function updateTrackOptionsUI() {
  const program = getCurrentCurriculum();
  const trackSelector = $('trackSelector');
  trackSelector.hidden = !program.tracks;
  if (!program.tracks) return;

  $('trackOptions').replaceChildren(...Object.entries(program.tracks).map(([trackKey, trackInfo]) => {
    const details = [trackInfo.code, `${trackInfo.freeElectiveUnits} free elective units`];
    if (trackInfo.majorElectiveUnits) details.push(`${trackInfo.majorElectiveUnits} major elective units`);
    return h('label', { class: 'choice' },
      h('input', {
        type: 'radio', name: 'track', value: trackKey,
        checked: trackKey === (program.defaultTrack || 'sp'),
        onchange: (e) => {
          currentTrack = e.target.value;
          // Remember the pick per program; the planner reads it too.
          window.selectedTracks = { ...(window.selectedTracks || {}), [program.code]: e.target.value };
          chrome.storage.local.set({ selectedTracks: window.selectedTracks });
          if (window.gradesData) displayRemaining();
        },
      }),
      h('span', { class: 'choice-label' }, h('strong', {}, trackInfo.name), h('small', {}, details.join(', '))));
  }));
}

// Parse the AMIS data structure into a flat array of courses
function parseAMISData(data) {
  const courses = [];

  if (!data || !data.student_grades) {
    return courses;
  }

  for (const [termId, termData] of Object.entries(data.student_grades)) {
    if (!termData || !termData.values) continue;

    const termInfo = termData.term || `Term ${termId}`;

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

// The stored AMIS data and when it was fetched, for requirements and Refresh.
let rawGrades = null;
let fetchedAt = null;

async function loadGradesData() {
  const loadingEl = $('loading');
  const noDataEl = $('noData');
  const mainContentEl = $('mainContent');

  loadingEl.classList.remove('hidden');
  noDataEl.classList.add('hidden');
  mainContentEl.classList.add('hidden');

  try {
    let result = await chrome.storage.local.get(['gradesData', 'fetchedAt']);

    // If no data, wait a moment and try again (data might still be loading)
    if (!result.gradesData) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      result = await chrome.storage.local.get(['gradesData', 'fetchedAt']);
    }

    const courses = parseAMISData(result.gradesData);
    rawGrades = result.gradesData;
    fetchedAt = result.fetchedAt;

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
  const { gwa, totalUnits, passedUnits, totalCourses, gradesBySemester, completedCourses, excludedUnits, excludedCount } = calculateGWA(courses, excludedCourses);

  // The main GWA keeps four decimals; every other figure uses two.
  $('currentGWA').textContent = gwa.toFixed(4);
  $('gwaStats').replaceChildren(...flat([
    stat('Units passed', passedUnits, { variant: 'row' }),
    stat('Courses in your GWA', totalCourses, { variant: 'row' }),
    excludedCount > 0 && stat('Left out by you', `${plural(excludedCount, 'course')}, ${unitsText(excludedUnits)}`, { variant: 'row' }),
    syncStatus(fetchedAt, refreshGrades)]));

  // Store calculated data for What If
  window.gradesData = {
    gwa,
    totalUnits,
    totalCourses,
    completedCourses,
    courses
  };

  displayHonorStatus(gwa, totalUnits);
  displayGradesList(gradesBySemester, courses);
  displayRemaining();
  displayWrapped(courses);
}

function calculateGWA(courses, excludedIds = new Set()) {
  let totalWeightedGrade = 0;
  let totalUnits = 0;
  let passedUnits = 0;
  let totalCourses = 0;
  let excludedUnits = 0;
  let excludedCount = 0;
  const gradesBySemester = {};
  const completedCourses = [];

  courses.forEach(course => {
    const courseCode = course.courseCode || '';
    const courseId = courseIdOf(course);
    const gradeStr = (course.grade || '').toString().toUpperCase().trim();

    // Skip NSTP, HK, PE courses entirely
    if (NON_GWA_PREFIX.test(courseCode.trim())) {
      return;
    }

    const units = course.units || 0;
    const isNonNumericGrade = NON_NUMERIC_GRADES.includes(gradeStr);

    // Group by semester (for display - includes all courses)
    const semKey = course.term || `${course.academicYear} - ${course.semester}`;
    if (!gradesBySemester[semKey]) {
      gradesBySemester[semKey] = [];
    }
    gradesBySemester[semKey].push({ ...course, isNonNumeric: isNonNumericGrade });

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
    if (excludedIds.has(courseId)) {
      excludedUnits += units;
      excludedCount++;
      return;
    }

    totalWeightedGrade += grade * units;
    totalUnits += units;
    totalCourses++;

    // 4.00 and 5.00 count in the GWA but do not complete the course.
    if (grade <= 3.0) {
      passedUnits += units;
      completedCourses.push({
        code: course.courseCode,
        title: course.courseTitle,
        units: units,
        grade: grade
      });
    }
  });

  const gwa = totalUnits > 0 ? totalWeightedGrade / totalUnits : 0;

  return { gwa, totalUnits, passedUnits, totalCourses, gradesBySemester, completedCourses, excludedUnits, excludedCount };
}

function displayHonorStatus(gwa, totalUnits) {
  // Nothing graded yet, or not on any honor track: show nothing.
  const kind = !totalUnits ? null : gwa <= 1.20 ? 'summa' : gwa <= 1.45 ? 'magna' : gwa <= 1.75 ? 'cum' : null;
  $('honorStatus').replaceChildren(honorBadge(kind) || '');
}

// How a grade reads in a course row: text, tone class, and an icon if any.
function gradeDisplay(course) {
  const gradeStr = (course.grade || '').toString().toUpperCase().trim();
  if (!gradeStr) return { text: 'No grade yet', cls: 'pending' };
  if (course.isNonNumeric || NON_NUMERIC_GRADES.includes(gradeStr)) {
    if (gradeStr === 'S') return { text: gradeStr, cls: 'satisfactory' };
    if (gradeStr === 'U') return { text: gradeStr, cls: 'unsatisfactory', icon: 'x', failed: true };
    return { text: gradeStr, cls: 'other-grade', icon: 'alert' };
  }
  const grade = parseFloat(course.grade);
  if (isNaN(grade)) return { text: gradeStr, cls: 'other-grade', icon: 'alert' };
  if (grade >= 5.00) return { text: grade.toFixed(2), cls: 'failed', icon: 'x', failed: true };
  return { text: grade.toFixed(2), cls: grade <= 1.50 ? 'excellent' : grade <= 2.00 ? 'good' : 'passing' };
}

function displayGradesList(gradesBySemester, allCourses) {
  const listEl = $('gradesList');

  // Group courses based on current view mode
  let groupedCourses;
  if (currentView === 'year') {
    groupedCourses = {};
    Object.values(gradesBySemester).forEach(courses => {
      courses.forEach(course => {
        const yearKey = course.academicYear ? `AY ${course.academicYear}` : 'Unknown year';
        (groupedCourses[yearKey] = groupedCourses[yearKey] || []).push(course);
      });
    });
  } else {
    groupedCourses = gradesBySemester;
  }

  // Sort groups (semesters or years) chronologically
  const getTermWeight = (term) => {
    const t = term.toLowerCase();
    if (t.includes('first') || t.includes('1st')) return 1;
    if (t.includes('second') || t.includes('2nd')) return 2;
    if (t.includes('midyear') || t.includes('summer')) return 3;
    return 0;
  };

  const sortedGroups = Object.keys(groupedCourses).sort((a, b) => {
    const splitA = a.split(',');
    const splitB = b.split(',');
    if (splitA[0] !== splitB[0]) {
      return splitB[0].localeCompare(splitA[0]);
    }
    if (splitA.length > 1 && splitB.length > 1) {
      return getTermWeight(splitB[1]) - getTermWeight(splitA[1]);
    }
    return b.localeCompare(a);
  });

  listEl.replaceChildren(...sortedGroups.map(groupKey => {
    const courses = groupedCourses[groupKey];
    const groupGWA = calculateGroupGWA(courses);

    // Scholar lists need a full load (15 units) and no 5.00, 4.00 or INC.
    let scholar = null;
    if (groupGWA.gwa > 0 && groupGWA.totalUnits >= 15 && !groupGWA.hasFailOrInc) {
      if (groupGWA.gwa <= 1.45) scholar = 'university';
      else if (groupGWA.gwa <= 1.75) scholar = 'college';
    }

    return h('section', { class: 'semester-group list-card' },
      h('div', { class: 'semester-header' },
        h('h3', { class: 'group-title' }, groupKey),
        h('span', { class: 'group-gwa-info' },
          h('span', { class: 'group-gwa' }, groupGWA.gwa > 0 ? `GWA ${groupGWA.gwa.toFixed(2)}` : 'No GWA yet'),
          honorBadge(scholar))),
      courses.map(course => {
        const courseId = courseIdOf(course);
        const isExcluded = excludedCourses.has(courseId);
        const g = gradeDisplay(course);
        const counts = !course.isNonNumeric && !isNaN(parseFloat(course.grade));
        const code = course.courseCode || course.code;
        return courseRow({
          code,
          title: course.courseTitle || course.title || '',
          units: course.units,
          class: (isExcluded ? 'excluded' : '') + (counts ? '' : ' non-numeric'),
          dataset: { courseId },
          // Only numeric grades have a GWA to leave out of.
          below: counts && button({
            variant: 'text', class: 'exclude-toggle',
            text: isExcluded ? 'Count in GWA' : 'Leave out of GWA',
            'aria-label': `${isExcluded ? 'Count' : 'Leave'} ${code} ${isExcluded ? 'in' : 'out of'} the GWA`,
            onclick: () => toggleCourseExclusion(courseId, allCourses),
          }),
          aside: h('span', { class: `grade-value ${g.cls}`, 'aria-label': `Grade ${g.text}${g.failed ? ', failed' : ''}` },
            g.icon && icon(g.icon), g.text),
        });
      }));
  }));
}

// Calculate GWA for a specific group of courses (semester or year)
function calculateGroupGWA(courses) {
  let totalWeightedGrade = 0;
  let totalUnits = 0;
  let hasFailOrInc = false;

  courses.forEach(course => {
    if (excludedCourses.has(courseIdOf(course))) return;

    if ((course.grade || '').toString().toUpperCase().trim() === 'INC') hasFailOrInc = true;
    const grade = parseFloat(course.grade);
    if (isNaN(grade) || grade < 1.0 || grade > 5.0) return;
    if (grade > 3.0) hasFailOrInc = true;

    const units = course.units || 0;
    if (units === 0) return;

    totalWeightedGrade += grade * units;
    totalUnits += units;
  });

  const gwa = totalUnits > 0 ? totalWeightedGrade / totalUnits : 0;
  return { gwa, totalUnits, hasFailOrInc };
}

function option(value, text) {
  return h('option', { value }, text);
}

// What if tab: the track, the substitution pickers, the count of what is
// left, then the answer. Counts come from requirements.js, the same code the
// planner uses, so both show the same units left.
function displayRemaining() {
  const allCourses = window.gradesData?.courses || [];
  const completedCourses = window.gradesData?.completedCourses || [];
  const trackInfoEl = $('trackInfo');
  const curriculum = getCurrentCurriculum();

  const quality = getProgramDataQuality(curriculum.code);
  showNotice($('whatifQuality'), !quality.confident && {
    tone: 'warn', icon: 'alert', title: 'Treat these numbers as a rough guide', body: quality.reasons.join(' '),
  });

  if (!curriculum.available) {
    window.requirementsLeft = null;
    $('remainingSummary').replaceChildren();
    trackInfoEl.replaceChildren();
    renderWhatIf();
    return;
  }

  // Detect track from any enrollment in the SP or thesis course
  const detectedTrack = detectTrack(allCourses);

  if (curriculum.tracks) {
    if (detectedTrack) {
      currentTrack = detectedTrack;
      const trackInfo = curriculum.tracks[detectedTrack];
      const trackName = trackInfo ? `${trackInfo.name} (${trackInfo.code})` : detectedTrack;
      showNotice(trackInfoEl, { tone: 'ok', icon: 'check', body: `Your AMIS record shows the ${trackName} track.` });
    } else {
      currentTrack = resolveTrack(curriculum, window.selectedTracks?.[curriculum.code]);
      const fallback = curriculum.tracks[currentTrack];
      showNotice(trackInfoEl, {
        tone: 'warn', icon: 'alert',
        body: `No SP or thesis course on AMIS yet, so GradeSim assumes ${fallback.name} (${fallback.code}). Pick yours below.`,
      });
    }

    const trackRadio = document.querySelector(`input[name="track"][value="${CSS.escape(currentTrack)}"]`);
    if (trackRadio) {
      trackRadio.checked = true;
    }
  } else {
    trackInfoEl.replaceChildren();
  }

  const passedRows = amisCourses(rawGrades).filter(r => r.result === 'passed');
  const courses = plannerCourseList(curriculum, currentTrack, UPLB_CATALOG, currentSpecialization());
  renderSpecializationCourses(new Set(passedRows.map(r => r.code)));
  const left = remainingRequirements(courses, passedRows, { substitutions, overrides: customCourseStatus });
  window.requirementsLeft = left;

  // Substitution pickers, sorted by code
  const requiredCodesSet = new Set((curriculum.requiredCodes || []).map(c => c.toUpperCase().trim()));
  const sortedRequired = [...(curriculum.majorCourses || [])].sort((a, b) => a.code.localeCompare(b.code));
  $('subRequired').replaceChildren(option('', 'Choose a required course'),
    ...sortedRequired.map(course => option(course.code.toUpperCase().trim(), `${course.code}, ${unitsText(course.units)}`)));

  const sortedCompleted = [...completedCourses].sort((a, b) => a.code.localeCompare(b.code));
  $('subTaken').replaceChildren(option('', 'Choose a completed course'),
    ...sortedCompleted.filter(c => {
      const code = c.code.toUpperCase().trim();
      const isAlreadyUsed = Object.values(substitutions).some(taken => taken.toUpperCase().trim() === code);
      // Not a required code, not a GE, and not already standing in for another course
      return !requiredCodesSet.has(code) && !isGECourse(c.code, c.title) && !isAlreadyUsed;
    }).map(c => option(c.code.toUpperCase().trim(), `${c.code}, ${unitsText(c.units)}, grade ${c.grade}`)));

  // Active substitutions
  const subEntries = Object.entries(substitutions);
  $('substitutionsList').replaceChildren(...(subEntries.length === 0
    ? [emptyState('No substitutions yet.')]
    : subEntries.map(([reqCode, takenCode]) => h('div', { class: 'substitution-item' },
      h('span', { class: 'sub-map' }, h('strong', {}, reqCode), ' ', h('span', { class: 'sub-via' }, 'covered by'), ' ', h('strong', {}, takenCode)),
      button({
        variant: 'icon', icon: 'x', class: 'btn-remove', title: 'Remove substitution',
        'aria-label': `Remove substitution for ${reqCode}`,
        onclick: async () => {
          delete substitutions[reqCode];
          await chrome.storage.local.set({ substitutions });
          displayGradesData(window.gradesData.courses);
        },
      })))));

  $('remainingSummary').replaceChildren(...flat([
    h('h3', {}, 'Left to take'),
    stat('Courses', left.left.length, { variant: 'row' }),
    stat('Units', left.units, { variant: 'row' }),
    stat('GE courses done', `${left.ge.done} of ${left.ge.total}`, { variant: 'row' }),
    left.electives.totalUnits > 0 && stat('Free elective units done', `${left.electives.doneUnits} of ${left.electives.totalUnits}`, { variant: 'row' }),
    button({ text: 'See them in the planner', icon: 'external', class: 'remaining-link', onclick: () => openPlanner() })]));

  window.currentTrack = currentTrack;
  renderWhatIf();
}

// Toggle course exclusion (for shiftees)
async function toggleCourseExclusion(courseId, allCourses) {
  const id = String(courseId);

  if (excludedCourses.has(id)) {
    excludedCourses.delete(id);
  } else {
    excludedCourses.add(id);
  }

  await chrome.storage.local.set({ excludedCourses: Array.from(excludedCourses) });

  displayGradesData(allCourses);
  // The list was rebuilt; keep keyboard focus on the same course.
  const row = document.querySelector(`.course-row[data-course-id="${CSS.escape(id)}"] .exclude-toggle`);
  if (row) row.focus();
}

const HONOR_NAMES = Object.fromEntries(LATIN_HONORS.map(([name, cut]) => [cut.toFixed(2), name]));

// The newest failed course not passed since, for the planner link.
function latestOpenFailure() {
  const rows = amisCourses(rawGrades);
  const passed = new Set(rows.filter(r => r.result === 'passed').map(r => r.code));
  const failed = rows.filter(r => r.result === 'failed' && !passed.has(r.code));
  return failed.length ? failed[failed.length - 1].code : null;
}

// The answer leads: the average needed for the picked target, or the best
// GWA still possible when the target is out of reach.
function renderWhatIf() {
  const el = $('whatifResults');
  const data = window.gradesData;
  const left = window.requirementsLeft;
  if (!data) { el.replaceChildren(); return; }
  if (!left) {
    showNotice(el, { tone: 'warn', icon: 'alert', body: `GradeSim does not have the ${getCurrentCurriculum().name} checklist yet, so it cannot count your remaining units. Your GWA above still works.` });
    return;
  }

  let radio = document.querySelector('input[name="targetHonor"]:checked');
  if (!radio) {
    // Start on the best honor still in reach, or cum laude.
    const best = gwaOutlook(data.gwa, data.totalUnits, left.gwaUnits, 1.75).bestHonor;
    radio = document.querySelector(`input[name="targetHonor"][value="${(best ? best[1] : 1.75).toFixed(2)}"]`);
    radio.checked = true;
  }
  const target = parseFloat(radio.value === 'custom' ? $('customGWA').value : radio.value);
  if (!(target >= 1 && target <= 5)) {
    showNotice(el, { tone: 'info', icon: 'info', body: 'Enter a target GWA from 1.00 to 5.00.' });
    return;
  }

  const o = gwaOutlook(data.gwa, data.totalUnits, left.gwaUnits, target);
  const name = HONOR_NAMES[target.toFixed(2)] || `A GWA of ${target.toFixed(2)}`;
  let hero;
  let tone;
  let ic;
  let message;
  let action = null;
  if (o.status === 'out-of-reach') {
    hero = stat('Best GWA still possible', o.ceiling.toFixed(2), { variant: 'hero', note: 'with 1.00 in every course left' });
    [tone, ic] = ['bad', 'x'];
    const best = o.bestHonor && gwaOutlook(data.gwa, data.totalUnits, left.gwaUnits, o.bestHonor[1]);
    message = `${name} is out of reach. ` + (best
      ? `${o.bestHonor[0]} is still possible ${best.status === 'any-pass' ? 'if you pass everything' : `with an average of ${best.required.toFixed(2)} or better`}.`
      : 'No Latin honor is in reach now, but every grade better than your GWA still raises it.');
    const failed = latestOpenFailure();
    if (failed) action = button({ variant: 'text', text: 'See what this costs', icon: 'external', 'aria-label': `See what failing ${failed} costs in the planner`, onclick: () => openPlanner(failed) });
  } else if (o.status === 'any-pass') {
    hero = stat('Average you need', '3.00', { variant: 'hero', note: 'any passing grade' });
    [tone, ic] = ['ok', 'check'];
    message = data.gwa <= target ? `You are at ${name.toLowerCase()} now. Pass every course left and you keep it.` : `Pass every course left and you reach ${name.toLowerCase()}.`;
  } else {
    hero = stat('Average you need', o.required.toFixed(2), { variant: 'hero', note: `on your ${unitsText(left.gwaUnits)} left` });
    const r = o.required;
    [tone, ic] = r <= 1.75 ? ['warn', 'alert'] : ['ok', 'check'];
    const how = r <= 1.25 ? 'excellent grades' : r <= 1.75 ? 'very good grades' : r <= 2.5 ? 'good grades' : 'grades a little better than passing';
    message = `${name} is in reach with ${how}.`;
  }

  el.replaceChildren(
    hero,
    notice({ tone, icon: ic, body: message, action }),
    h('div', { class: 'result-details' },
      stat('Current GWA', data.gwa.toFixed(4), { variant: 'row' }),
      stat('Target', `${target.toFixed(2)} or better`, { variant: 'row' }),
      stat('GWA units so far', data.totalUnits, { variant: 'row' }),
      stat('GWA units left', left.gwaUnits, { variant: 'row' })));
}

/* ---------- Wrapped ---------- */

let wrappedCurrentPanel = 0;
let wrappedPanels = [];

function initializeWrapped() {
  $('wrappedPrev').addEventListener('click', () => navigateWrapped(-1));
  $('wrappedNext').addEventListener('click', () => navigateWrapped(1));
  $('wrappedExport').addEventListener('click', exportWrappedToPNG);
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
    semesterGWAs: {}
  };

  let totalWeighted = 0;
  const semesterData = {};

  courses.forEach(course => {
    const courseCode = course.courseCode || '';
    const gradeStr = (course.grade || '').toString().toUpperCase().trim();
    const semKey = course.term || `${course.academicYear} - ${course.semester}`;

    // Same rules as the GWA: no PE, HK or NSTP, and nothing the user left out.
    if (NON_GWA_PREFIX.test(courseCode.trim()) || excludedCourses.has(courseIdOf(course))) {
      return;
    }

    data.distinctGrades.add(gradeStr);

    if (NON_NUMERIC_GRADES.includes(gradeStr)) {
      if (!data.specialGrades.includes(gradeStr)) {
        data.specialGrades.push(gradeStr);
      }
      return;
    }

    const grade = parseFloat(course.grade);
    const units = course.units || 0;

    if (isNaN(grade) || grade < 1.0 || grade > 5.0 || units === 0) return;

    data.totalCourses++;

    if (!semesterData[semKey]) {
      semesterData[semKey] = { totalWeighted: 0, totalUnits: 0 };
    }
    semesterData[semKey].totalWeighted += grade * units;
    semesterData[semKey].totalUnits += units;

    const gradeKey = grade.toFixed(2);
    data.gradeDistribution[gradeKey] = (data.gradeDistribution[gradeKey] || 0) + 1;

    const codeNorm = courseCode.toUpperCase().trim();
    data.retakes[codeNorm] = (data.retakes[codeNorm] || 0) + 1;

    if (grade === 5.0) {
      data.fails++;
    }

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

  let maxRetakes = 0;
  Object.entries(data.retakes).forEach(([code, count]) => {
    if (count > maxRetakes) {
      maxRetakes = count;
      const courseInfo = courses.find(c => c.courseCode.toUpperCase() === code);
      data.mostRetakedCourse = { code, title: courseInfo?.courseTitle || code, count };
    }
  });

  if (maxRetakes <= 1) data.mostRetakedCourse = null;

  data.gwa = data.totalUnits > 0 ? totalWeighted / data.totalUnits : 0;

  Object.entries(semesterData).forEach(([sem, semData]) => {
    if (semData.totalUnits > 0) {
      data.semesterGWAs[sem] = {
        gwa: semData.totalWeighted / semData.totalUnits,
        units: semData.totalUnits
      };
    }
  });

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

// Each panel is plain data: { emoji, title, value, subtitle, badges, highlights,
// message, caption }. wrappedPanel() draws it on screen and the export draws
// the same object on a canvas.
function generateWrappedPanels(data) {
  return [
    generateGWAPanel(data),
    generateSemesterPanel(data),
    generateCollectorPanel(data),
    generatePerseverancePanel(data),
    generateHighlightsPanel(data),
    generateProgressPanel(data),
  ];
}

function generateGWAPanel(data) {
  const gwa = data.gwa;
  const tiers = [
    [0, '📚', 'Loading', "Freshie ka ba? Or di pa nag-uupload ng grades si registrar. Either way, good luck this sem."],
    [1.20, '🏆', 'Summa material', "Grabe naman 'to. Penge tips naman. Seryoso, pano mo nagagawa 'yan habang may social life?"],
    [1.45, '⭐', 'Magna tingz', 'Consistent high grades. Ikaw yung type na maayos notes tapos hinahanap ka ng groupmates pag may exam.'],
    [1.75, '🎯', 'Cum laude szn', 'Solid GWA. Di ka nag-slack off pero di rin naman nagpaka-robot. Balance talaga.'],
    [2.00, '🌟', 'Honor roll', 'Pasok sa honors. May hirap-hirap pero kinaya mo naman. Proud of u.'],
    [2.50, '💪', 'Pasang-alam', 'Passing is passing. May mga sem na mabigat talaga, wag ka maguilty. Nasa UP ka pa rin.'],
    [3.00, '🎮', 'Survival mode', 'Nandito ka pa, that counts. Minsan ganyan talaga UP. Basta graduate, panalo.'],
    [Infinity, '🌱', 'Comeback arc', "Mababa man ngayon, pwede pa 'yan i-improve. Marami nang naka-recover from this. Kaya mo 'yan."],
  ];
  const [, emoji, title, message] = gwa === 0 ? tiers[0] : tiers.slice(1).find(t => gwa <= t[0]);
  return { emoji, title, value: gwa > 0 ? gwa.toFixed(4) : '--', subtitle: 'My Elbi GWA', message };
}

function generateSemesterPanel(data) {
  const semCount = Object.keys(data.semesterGWAs).length;
  const panel = { emoji: '📅', title: 'Semester stats', highlights: [], caption: 'My best and toughest semester' };

  if (semCount === 0) {
    return { ...panel, value: '--', subtitle: 'No semester grades yet', message: 'Check back once grades are in.', caption: null };
  }

  if (data.bestSemester) {
    const best = data.bestSemester;
    let reaction;
    if (best.gwa <= 1.25) reaction = 'your peak';
    else if (best.gwa <= 1.50) reaction = 'a strong run';
    else if (best.gwa <= 1.75) reaction = 'a solid sem';
    else if (best.gwa <= 2.00) reaction = 'a good one';
    else reaction = 'your best so far';
    panel.highlights.push({ label: '🏆 Best semester', name: best.name, detail: `GWA ${best.gwa.toFixed(2)}, ${reaction}` });
  }

  // "Needs work" semester (only if different from best)
  if (data.needsWorkSemester && data.bestSemester &&
      data.needsWorkSemester.name !== data.bestSemester.name) {
    const tough = data.needsWorkSemester;
    let reaction;
    if (tough.gwa >= 3.0) reaction = 'a rough one';
    else if (tough.gwa >= 2.5) reaction = 'a challenging one';
    else if (tough.gwa >= 2.0) reaction = 'a tough load';
    else reaction = 'room to grow';
    panel.highlights.push({ label: '📈 Toughest semester', name: tough.name, detail: `GWA ${tough.gwa.toFixed(2)}, ${reaction}` });
  }

  if (semCount >= 8) panel.message = `${semCount} semesters done. Almost there.`;
  else if (semCount >= 6) panel.message = `${semCount} sems done. The end is in sight.`;
  else if (semCount >= 4) panel.message = `${semCount} sems in. You're about halfway.`;
  else if (semCount >= 2) panel.message = `${semCount} semesters down, more to go.`;
  else panel.message = 'Just getting started.';

  return panel;
}

function generateCollectorPanel(data) {
  const numericGrades = Object.keys(data.gradeDistribution).length;
  const totalDistinct = data.distinctGrades.size;

  let emoji, title, message;
  if (totalDistinct >= 10) {
    [emoji, title, message] = ['🎰', 'Full collection', "You've seen it all, from 1.0 to 5.0 plus S, U, INC and DRP. Your transcript tells a story."];
  } else if (totalDistinct >= 7) {
    [emoji, title, message] = ['🃏', 'Variety pack', "A bit of everything. You've taken very different kinds of subjects with different outcomes."];
  } else if (totalDistinct >= 4) {
    [emoji, title, message] = ['🎲', 'Mixed bag', 'Some ups, some downs. Pretty normal for most students tbh.'];
  } else if (numericGrades === 1 && data.gwa <= 1.5) {
    [emoji, title, message] = ['🎯', 'One-track mind', "Same high grade over and over? That's rare consistency. How."];
  } else {
    [emoji, title, message] = ['📊', 'Steady grades', "You stick to a range. Predictable in a good way. You know what you're doing."];
  }

  const badges = Array.from(data.distinctGrades).sort()
    .map(grade => ({ text: grade || 'None', special: NON_NUMERIC_GRADES.includes(grade) }));

  return { emoji, title, value: String(totalDistinct), subtitle: 'distinct grades collected', badges, message };
}

function generatePerseverancePanel(data) {
  const fails = data.fails;
  let emoji, title, message;

  if (fails === 0) {
    [emoji, title, message] = ['🏅', 'Clean record', "Zero 5.0s. That's actually impressive. Not everyone can say that."];
  } else if (fails === 1) {
    [emoji, title, message] = ['💫', 'One setback', "One 5.0 isn't the end of the world. It happens to plenty of us. Bounce back season."];
  } else if (fails <= 3) {
    [emoji, title, message] = ['🔥', 'Still standing', `${fails} failed subjects but you're still here. Every retake is a chance to do better.`];
  } else if (fails <= 5) {
    [emoji, title, message] = ['🦅', 'Fighting spirit', `${fails} times down but not out. The fact that you're still going says a lot.`];
  } else {
    [emoji, title, message] = ['💎', 'Survivor', `${fails} 5.0s and still pushing through? That takes real grit. Respect.`];
  }

  return { emoji, title, value: String(fails), subtitle: fails === 1 ? 'subject to retake' : 'subjects to retake', message };
}

function generateHighlightsPanel(data) {
  const panel = { emoji: '✨', title: 'Your highlights', highlights: [], caption: 'My highest and lowest grade', message: 'Every subject counts toward the degree.' };

  if (data.highestGradeCourse) {
    panel.highlights.push({ label: '🏆 Best performance', name: data.highestGradeCourse.code, detail: `Grade ${data.highestGradeCourse.grade.toFixed(2)}` });
  }
  if (data.lowestGradeCourse && data.lowestGradeCourse.grade < 5.0) {
    panel.highlights.push({ label: '📈 Room to grow', name: data.lowestGradeCourse.code, detail: `Grade ${data.lowestGradeCourse.grade.toFixed(2)}` });
  }
  if (data.mostRetakedCourse && data.mostRetakedCourse.count > 1) {
    panel.highlights.push({ label: '🔄 Persistence award', name: data.mostRetakedCourse.code, detail: `Taken ${data.mostRetakedCourse.count} times. You didn't give up.` });
  }
  if (!data.highestGradeCourse && !data.lowestGradeCourse) {
    panel.subtitle = 'Finish a few subjects to see your highlights.';
    panel.caption = null;
  }
  return panel;
}

function generateProgressPanel(data) {
  const currentProgram = getCurrentCurriculum();
  const totalRequired = currentProgram?.totalUnitsRequired || 155;
  const completed = data.totalUnits;
  const remaining = Math.max(0, totalRequired - completed);
  const percentage = Math.min(100, Math.round((completed / totalRequired) * 100));

  let emoji, title, message;
  if (percentage >= 100) {
    [emoji, title, message] = ['🎓', 'Graduation ready', 'All units done. Time to march. Congratulations, you made it.'];
  } else if (percentage >= 80) {
    [emoji, title, message] = ['🚀', 'Almost there', `${remaining} units left. The finish line is in sight. Last push na 'to.`];
  } else if (percentage >= 60) {
    [emoji, title, message] = ['⚡', 'Past halfway', `${remaining} units to go. More than half done, and you've got momentum.`];
  } else if (percentage >= 40) {
    [emoji, title, message] = ['🌤️', 'Making progress', `${remaining} units remaining. Take it one sem at a time.`];
  } else if (percentage >= 20) {
    [emoji, title, message] = ['🌅', 'Early days', `${remaining} units ahead of you. Plenty of time to figure things out.`];
  } else {
    [emoji, title, message] = ['🌱', 'Just starting', `${remaining} units to complete. It's a marathon, not a sprint.`];
  }

  return { emoji, title, value: `${percentage}%`, subtitle: `${completed} of ${totalRequired} units passed`, message };
}

// On-screen Wrapped slide.
function wrappedPanel(p) {
  return [
    h('div', { class: 'panel-emoji', 'aria-hidden': 'true' }, p.emoji),
    h('h3', { class: 'panel-title' }, p.title),
    p.value && h('div', { class: 'panel-value' }, p.value),
    p.subtitle && h('div', { class: 'panel-subtitle' }, p.subtitle),
    p.badges && h('div', { class: 'grade-badges' }, p.badges.map(b => badge(b.text, { tone: b.special ? 'warn' : 'neutral' }))),
    (p.highlights || []).map(x => h('div', { class: 'highlight-course' },
      h('div', { class: 'highlight-label' }, x.label),
      h('div', { class: 'highlight-name' }, x.name),
      h('div', { class: 'highlight-detail' }, x.detail))),
    p.message && h('p', { class: 'panel-message' }, p.message),
  ];
}

function displayWrapped(courses) {
  wrappedPanels = generateWrappedPanels(generateWrappedData(courses));
  wrappedCurrentPanel = 0;
  updateWrappedDisplay();
}

function updateWrappedDisplay() {
  if (!wrappedPanels.length) return;
  $('wrappedPanel').replaceChildren(...flat(wrappedPanel(wrappedPanels[wrappedCurrentPanel])));
  $('wrappedProgress').textContent = `${wrappedCurrentPanel + 1} of ${wrappedPanels.length}`;
  $('wrappedPrev').disabled = wrappedCurrentPanel === 0;
  $('wrappedNext').disabled = wrappedCurrentPanel === wrappedPanels.length - 1;
}

function navigateWrapped(direction) {
  const newIndex = wrappedCurrentPanel + direction;
  if (newIndex >= 0 && newIndex < wrappedPanels.length) {
    wrappedCurrentPanel = newIndex;
    updateWrappedDisplay();
  }
}

// Export the current Wrapped slide as a transparent story-sized PNG, drawn
// with the bundled Inter and Raleway faces.
async function exportWrappedToPNG() {
  const p = wrappedPanels[wrappedCurrentPanel];
  if (!p) return;

  const DISPLAY = '"Raleway", "Inter", sans-serif';
  const TEXT = '"Inter", system-ui, sans-serif';
  await Promise.all([
    document.fonts.load(`800 28px ${DISPLAY}`),
    document.fonts.load(`600 16px ${TEXT}`),
  ]).catch(() => {});
  await document.fonts.ready;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const scale = 2;
  const width = 360;
  const height = 640;
  canvas.width = width * scale;
  canvas.height = height * scale;
  ctx.scale(scale, scale);
  ctx.clearRect(0, 0, width, height);

  const badges = p.badges || [];
  const highlights = p.highlights || [];
  let contentHeight = 120;
  if (p.subtitle) contentHeight += 30;
  if (badges.length) contentHeight += 50;
  contentHeight += highlights.length * 55;
  let currentY = Math.max(80, (height - contentHeight) / 2 - 40);

  ctx.textAlign = 'center';

  // Story colors stay bright orange so they read on any photo.
  const orange = '#fc5200';
  const orangeLight = '#ff7a33';

  // Text with a dark outline for contrast on any background
  function drawText(text, x, y, fillColor) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#000000';
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = fillColor;
    ctx.fillText(text, x, y);
  }

  function wrapText(text, maxWidth) {
    const lines = [];
    let line = '';
    text.split(' ').forEach(word => {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  ctx.font = `800 13px ${DISPLAY}`;
  drawText('Elbi GradeSim', width / 2, 64, orangeLight);
  ctx.font = `600 12px ${TEXT}`;
  drawText('gradesim.uplb.tools', width / 2, 82, orange);

  ctx.font = '56px sans-serif';
  drawText(p.emoji, width / 2, currentY, '#ffffff');
  currentY += 50;

  if (p.value && p.value !== '--') {
    ctx.font = `800 40px ${DISPLAY}`;
    drawText(p.value, width / 2, currentY + 20, orange);
    currentY += 60;
  }

  if (p.subtitle) {
    ctx.font = `600 16px ${TEXT}`;
    wrapText(p.subtitle, width - 60).forEach(line => {
      drawText(line, width / 2, currentY + 10, orangeLight);
      currentY += 20;
    });
    currentY += 10;
  }

  if (badges.length) {
    currentY += 15;
    const badgeWidth = 44;
    const maxPerRow = Math.floor((width - 60) / badgeWidth);
    for (let i = 0; i < badges.length; i += maxPerRow) {
      const row = badges.slice(i, i + maxPerRow);
      let badgeX = (width - row.length * badgeWidth) / 2;
      row.forEach(b => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.strokeStyle = orange;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(badgeX, currentY, 40, 24, 4);
        ctx.fill();
        ctx.stroke();
        ctx.font = `600 13px ${TEXT}`;
        drawText(b.text, badgeX + 20, currentY + 17, orange);
        badgeX += badgeWidth;
      });
      currentY += 30;
    }
    currentY += 10;
  }

  if (highlights.length) {
    currentY += 10;
    highlights.forEach(x => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.strokeStyle = orange;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(40, currentY, width - 80, 45, 6);
      ctx.fill();
      ctx.stroke();
      ctx.font = `700 15px ${TEXT}`;
      drawText(x.name, width / 2, currentY + 19, orange);
      ctx.font = `500 13px ${TEXT}`;
      drawText(x.detail, width / 2, currentY + 36, orangeLight);
      currentY += 55;
    });
    if (p.caption) {
      ctx.font = `600 16px ${TEXT}`;
      drawText(p.caption, width / 2, currentY + 10, orangeLight);
    }
  }

  h('a', { download: `elbi-wrapped-${wrappedCurrentPanel + 1}.png`, href: canvas.toDataURL('image/png') }).click();
}

/* ---------- Grade refresh, backup and clear data (platform) ---------- */

const SYNC_ERRORS = {
  'not-logged-in': 'Log in to AMIS, then press Refresh.',
  'amis-error': 'AMIS did not answer, try again later.',
  'no-tab': 'Open AMIS in a tab first.',
  'no-answer': 'Reload your AMIS tab once, then press Refresh.',
};

// Show a refresh problem at the top, or clear it with null.
function showSyncError(code) {
  showNotice($('syncNotice'), SYNC_ERRORS[code] && {
    tone: 'warn', icon: 'alert', body: SYNC_ERRORS[code],
    action: (code === 'no-tab' || code === 'not-logged-in') && button({
      variant: 'text', text: 'Open AMIS', icon: 'external',
      onclick: () => chrome.tabs.create({ url: 'https://amis.uplb.edu.ph/' }),
    }),
  });
}

// Asks the open AMIS tab to fetch grades now. content.js answers with
// { ok, lastError, fetchedAt } and writes them to storage.
async function refreshGrades() {
  const btns = document.querySelectorAll('#refreshBtn, .refresh-btn');
  btns.forEach(b => { b.disabled = true; });
  try {
    const [tab] = await chrome.tabs.query({ url: 'https://amis.uplb.edu.ph/*' });
    if (!tab) { showSyncError('no-tab'); return; }
    showNotice($('syncNotice'), { tone: 'info', icon: 'clock', body: 'Getting your grades from AMIS.' });
    let res;
    try {
      res = await chrome.tabs.sendMessage(tab.id, { type: 'FETCH_GRADES', force: true });
    } catch (e) {
      showSyncError('no-answer');
      return;
    }
    if (res && res.lastError) { showSyncError(res.lastError); return; }
    showSyncError(null);
    await loadGradesData();
  } finally {
    btns.forEach(b => { b.disabled = false; });
  }
}

const BACKUP_SCHEMA_VERSION = 2;
// Export writes every stored key. Import restores only these: never
// termsAccepted (each person accepts the terms on their own device) or
// lastError (it describes this browser only).
const BACKUP_KEYS = ['gradesData', 'fetchedAt', 'selectedProgram', 'selectedTracks', 'selectedSpecializations', 'excludedCourses',
  'substitutions', 'customCourseStatus', 'plannerPins', 'plannerPetitions', 'plannerOptions', 'theme'];

function wireBackup() {
  const importFile = $('importFile');
  $('exportBtn').addEventListener('click', async () => {
    const data = await chrome.storage.local.get(null);
    // Top-level gradesData, selectedProgram, excludedCourses and substitutions
    // keep the file loadable by the web app importer.
    const backup = { source: 'elbi-gradesim', schemaVersion: BACKUP_SCHEMA_VERSION, timestamp: new Date().toISOString(), ...data };
    const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' }));
    h('a', { href: url, download: `elbi-gradesim-backup-${new Date().toISOString().slice(0, 10)}.json` }).click();
    URL.revokeObjectURL(url);
  });
  $('importBtn').addEventListener('click', () => importFile.click());
  importFile.addEventListener('change', async e => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      const toSave = parseBackup(await file.text());
      await chrome.storage.local.set(toSave);
      window.location.reload();
    } catch (err) {
      showNotice($('dataNotice'), { tone: 'bad', icon: 'x', title: 'Nothing was imported.', body: err.message });
    }
  });
}

// Throws with a message the student can read. Files without schemaVersion come
// from version 1 or the web app and use the same keys.
function parseBackup(text) {
  let obj;
  try { obj = JSON.parse(text); } catch (e) { throw new Error('That file is not valid JSON, so nothing was changed.'); }
  if (!obj || obj.source !== 'elbi-gradesim') throw new Error('That file is not an Elbi GradeSim backup.');
  const v = obj.schemaVersion == null ? 1 : obj.schemaVersion;
  if (!Number.isInteger(v) || v < 1 || v > BACKUP_SCHEMA_VERSION) {
    throw new Error('That backup comes from a newer version of Elbi GradeSim. Update the extension first.');
  }
  const toSave = {};
  BACKUP_KEYS.forEach(k => { if (obj[k] != null) toSave[k] = obj[k]; });
  return toSave;
}

// Two clicks: the first arms the button, the second deletes everything.
function wireClearData() {
  const btn = $('clearDataBtn');
  if (!btn) return;
  const label = btn.textContent;
  let armed = false;
  btn.addEventListener('click', async () => {
    if (!armed) {
      armed = true;
      btn.textContent = 'Press again to delete all GradeSim data';
      setTimeout(() => { armed = false; btn.textContent = label; }, 5000);
      return;
    }
    await chrome.runtime.sendMessage({ type: 'CLEAR_DATA' });
    window.location.reload();
  });
}
