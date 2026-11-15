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
const openGroups = new Map();

// Store course substitutions - requiredCode -> takenCode
let substitutions = {};

// Courses marked passed or failed in the planner, so both count the same.
let customCourseStatus = {};

// Removal exam results for 4.00 grades, removalKey(termId, code) -> pass | fail.
let removals = {};

const NON_NUMERIC_GRADES = ['S', 'U', 'INC', 'DRP', 'W', 'P', 'DFG'];
// PE, HK and NSTP aren't in the GWA. A word boundary keeps PEd (Physical
// Education majors) and similar codes in.
const NON_GWA_PREFIX = /^(NSTP|HK|PE)\b/i;
const courseIdOf = course => String(course.id || `${course.courseCode}-${course.termId}`);
const semKeyOf = course => course.term || `${course.academicYear} - ${course.semester}`;

// Replace a container's children with one notice (or clear it).
function showNotice(el, opts) {
  el.replaceChildren(opts ? notice(opts) : '');
}

document.addEventListener('DOMContentLoaded', async () => {
  hydrateIcons();
  const { theme } = await chrome.storage.local.get(['theme']);
  themeToggle($('themeToggle'), theme, next => chrome.storage.local.set({ theme: next }));

  // Check if opened in a tab
  const isTabMode = window.innerWidth > 600 || matchMedia('(pointer: coarse)').matches;
  if (isTabMode) {
    document.body.classList.add('tab-mode');
  }

  $('openTabBtn').addEventListener('click', () => {
    chrome.tabs.create({ url: `${WEB_APP}/?from=extension` });
  });

  const help = modal($('helpDialog'));
  $('helpBtn').addEventListener('click', () => help.open());

  // Terms: one quiet line on first run, the full text one tap away.
  const terms = modal($('termsDialog'));
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
  const { newGrades } = await chrome.storage.local.get('newGrades');
  if (newGrades) {
    if (!lastError) showNotice($('syncNotice'), { tone: 'ok', icon: 'check', body: `AMIS has ${newGrades === 1 ? '1 new grade' : `${newGrades} new grades`} since you last opened GradeSim.` });
    chrome.storage.local.remove('newGrades');
  }

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
  $('pickExclusions').addEventListener('click', e => {
    const on = $('gradesTab').classList.toggle('picking');
    e.currentTarget.setAttribute('aria-pressed', on);
    e.currentTarget.textContent = on ? 'Done' : 'Leave courses out of the GWA';
  });

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      currentView = btn.dataset.view;
      if (window.gradesData && window.gradesData.courses) {
        const { gradesBySemester, holds } = calculateGWA(window.gradesData.courses, excludedCourses);
        displayGradesList(gradesBySemester, window.gradesData.courses, holds);
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

// The planner lives in the web app, which gets the grades from this extension.
const WEB_APP = 'https://gradesim.uplb.tools';
function openPlanner(failedCode) {
  const q = failedCode ? `&whatif=${encodeURIComponent(failedCode)}` : '';
  chrome.tabs.create({ url: `${WEB_APP}/?from=extension${q}#planner` });
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
  // Courses a specialization adds outright (BS MST) show as one take-all list.
  const rows = new Map((spec.courses || []).map(c => [c.code, c]));
  const pools = [...(spec.pools || []),
    ...(rows.size ? [{ name: 'Courses for this specialization', slots: [...rows.keys()], courses: [...rows.keys()] }] : [])];
  $('specCourses').replaceChildren(...flat([
    pools.map(pool => [
      h('h4', {}, pool.name),
      h('p', { class: 'hint' }, pool.courses.length > pool.slots.length
        ? `Take ${pool.slots.length} of these ${pool.courses.length}.`
        : `Take all ${pool.courses.length}.`),
      pool.courses.map(code => {
        const entry = UPLB_CATALOG[code] || rows.get(code);
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

    const abs = amisTermToAbs(termId);
    const ay = abs == null ? '' : `${Math.floor(abs / 3)}-${Math.floor(abs / 3) + 1}`;
    const termInfo = termData.term || (ay ? `${['1st sem', '2nd sem', 'Midyear'][abs % 3]} AY ${ay}` : `Term ${termId}`);

    for (const courseData of termData.values) {
      courses.push({
        id: courseData.id,
        courseCode: courseData.course?.course_code || 'Unknown',
        courseTitle: courseData.course?.title || 'Unknown',
        units: parseInt(courseData.unit_taken) || 0,
        grade: courseData.grade,
        removalFrom: courseData.removalFrom,
        section: courseData.section,
        termId: termId,
        term: termInfo,
        semester: courseData.grade_term?.term || '',
        academicYear: courseData.grade_term?.ay || ay,
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
    let result = await chrome.storage.local.get(['gradesData', 'fetchedAt', 'removals']);

    // If no data, wait a moment and try again (data might still be loading)
    if (!result.gradesData) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      result = await chrome.storage.local.get(['gradesData', 'fetchedAt']);
    }

    removals = result.removals || {};
    rawGrades = applyRemovals(result.gradesData, removals);
    const courses = parseAMISData(rawGrades);
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
  $('exportBtn').classList.toggle('hidden', !noDataEl.classList.contains('hidden'));
  if (syncError) showSyncError(syncError);
}

function displayGradesData(courses) {
  const { gwa, totalUnits, passedUnits, totalCourses, gradesBySemester, completedCourses, excludedUnits, excludedCount, holds } = calculateGWA(courses, excludedCourses);

  // The main GWA keeps four decimals; every other figure uses two.
  $('currentGWA').textContent = gwa.toFixed(4);
  $('gwaStats').replaceChildren(...flat([
    stat('Units passed', passedUnits, { variant: 'row' }),
    excludedCount > 0 && stat('Left out', `${plural(excludedCount, 'course')}, ${unitsText(excludedUnits)}`, { variant: 'row' }),
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
  displayGradesList(gradesBySemester, courses, holds);
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
  // Terms with a failing or INC grade in HK or NSTP. Those courses stay out of
  // the GWA, but the scholar lists still need them passed.
  const holds = new Set();
  const completedCourses = [];

  courses.forEach(course => {
    const courseCode = course.courseCode || '';
    const courseId = courseIdOf(course);
    const gradeStr = (course.grade || '').toString().toUpperCase().trim();

    const semKey = semKeyOf(course);

    // NSTP, HK and PE aren't in the GWA.
    if (NON_GWA_PREFIX.test(courseCode.trim())) {
      if (gradeStr === 'INC' || parseFloat(gradeStr) > 3) holds.add(semKey);
      return;
    }

    const units = course.units || 0;
    const isNonNumericGrade = NON_NUMERIC_GRADES.includes(gradeStr);

    // Group by semester (for display - includes all courses)
    if (!gradesBySemester[semKey]) {
      gradesBySemester[semKey] = [];
    }
    gradesBySemester[semKey].push({ ...course, isNonNumeric: isNonNumericGrade });

    // For non-numeric grades, add to completed but don't calculate GWA
    if (isNonNumericGrade) {
      // S (Satisfactory) counts as passed, U (Unsatisfactory) doesn't
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

    // 4.00 and 5.00 count in the GWA but don't complete the course.
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

  return { gwa, totalUnits, passedUnits, totalCourses, gradesBySemester, completedCourses, excludedUnits, excludedCount, holds };
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
  if (grade > 3.00) return { text: grade.toFixed(2), cls: 'other-grade', icon: 'alert' };
  return { text: grade.toFixed(2), cls: grade <= 1.50 ? 'excellent' : grade <= 2.00 ? 'good' : 'passing' };
}

function displayGradesList(gradesBySemester, allCourses, holds = new Set()) {
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

  const newest = key => Math.max(...groupedCourses[key].map(c => amisTermToAbs(c.termId) ?? -1));
  const sortedGroups = Object.keys(groupedCourses).sort((a, b) => {
    if (newest(a) !== newest(b)) return newest(b) - newest(a);
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

  listEl.replaceChildren(...sortedGroups.map((groupKey, i) => {
    const courses = groupedCourses[groupKey];
    const groupGWA = calculateGroupGWA(courses);
    if (courses.some(c => holds.has(semKeyOf(c)))) groupGWA.hasFailOrInc = true;

    // Scholar lists need 15 academic units (HK and NSTP don't count) and no
    // 5.00, 4.00 or INC in any course, HK and NSTP included.
    let scholar = null;
    if (groupGWA.gwa > 0 && groupGWA.totalUnits >= 15 && !groupGWA.hasFailOrInc) {
      if (groupGWA.gwa <= 1.45) scholar = 'university';
      else if (groupGWA.gwa <= 1.75) scholar = 'college';
    }

    return h('details', {
      class: 'semester-group list-card',
      open: openGroups.get(groupKey) ?? i === 0,
      ontoggle: e => openGroups.set(groupKey, e.currentTarget.open),
    },
      h('summary', { class: 'semester-header' },
        icon('chevron'),
        h('h3', { class: 'group-title' }, groupKey),
        h('span', { class: 'group-gwa-info' },
          h('span', { class: 'group-gwa' }, groupGWA.gwa > 0 ? `GWA ${groupGWA.gwa.toFixed(4)}` : 'No GWA yet'),
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
          below: [counts && button({
            variant: 'text', class: 'exclude-toggle',
            text: isExcluded ? 'Left out' : 'Leave out',
            'aria-label': `${isExcluded ? 'Count' : 'Leave'} ${code} ${isExcluded ? 'in' : 'out of'} the GWA`,
            onclick: () => toggleCourseExclusion(courseId, allCourses),
          }), removalPicker(course)],
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

  $('honorsGwa').replaceChildren();
  if (window.gradesData) displayHonorStatus(window.gradesData.gwa, window.gradesData.totalUnits);
  const quality = getProgramDataQuality(curriculum.code);
  showNotice($('whatifQuality'), !quality.confident && {
    tone: 'warn', icon: 'alert', title: 'Treat these numbers as a rough guide', body: quality.reasons.join(' '),
  });

  if (!curriculum.available) {
    window.requirementsLeft = null;
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
      showNotice(trackInfoEl, { tone: 'ok', icon: 'check', body: `AMIS shows the ${trackName}.` });
    } else {
      currentTrack = resolveTrack(curriculum, window.selectedTracks?.[curriculum.code]);
      showNotice(trackInfoEl, { tone: 'warn', icon: 'alert', body: "Your track isn't on AMIS yet, so pick one below." });
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
  displayHonorsGwa(surplusElectives(courses, passedRows, substitutions), allCourses);

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

  window.currentTrack = currentTrack;
  renderWhatIf();
}

// Extra electives stay in the GWA but not in the one for Latin honors, so the
// honor badge follows the honors GWA and the card says what it left out.
function displayHonorsGwa(surplus, allCourses) {
  if (!surplus.length) return;
  const skip = new Set(surplus.map(r => removalKey(r.termId, r.code)));
  const { gwa, totalUnits } = calculateGWA(allCourses.filter(c => !skip.has(removalKey(c.termId, c.courseCode))), excludedCourses);
  displayHonorStatus(gwa, totalUnits);
  $('honorsGwa').replaceChildren(stat('GWA for Latin honors', gwa.toFixed(4), {
    variant: 'row',
    note: `Counts only the electives your program requires, the earliest first. Leaves out ${surplus.map(r => r.code).join(', ')}.`,
  }));
}

// A 4.00 gets one removal exam. Picking its result recomputes everything as
// if AMIS already showed 3.00 (pass) or 5.00 (fail).
function removalPicker(course) {
  if (parseFloat(course.removalFrom || course.grade) !== 4) return null;
  const key = removalKey(course.termId, course.courseCode);
  const select = h('select', {
    class: 'removal-select',
    dataset: { removal: key },
    'aria-label': `Removal exam result for ${course.courseCode}`,
    onchange: async () => {
      if (select.value) removals[key] = select.value;
      else delete removals[key];
      await chrome.storage.local.set({ removals });
      await loadGradesData();
      // The list was rebuilt; keep keyboard focus on the same picker.
      const again = document.querySelector(`.removal-select[data-removal="${CSS.escape(key)}"]`);
      if (again) again.focus();
    },
  }, option('', 'Removal exam not taken'), option('pass', 'Passed removal, 3.00'), option('fail', 'Failed removal, 5.00'));
  select.value = removals[key] || '';
  return select;
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
  $('whatifNow').textContent = data?.gwa > 0 ? `Your GWA is ${data.gwa.toFixed(4)} now.` : '';
  if (!data) { el.replaceChildren(); return; }
  if (!left) {
    showNotice(el, { tone: 'warn', icon: 'alert', body: `GradeSim doesn't have the ${getCurrentCurriculum().name} checklist yet, so it can't count your remaining units. Your GWA on the Grades tab still works.` });
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
    message = data.gwa <= target ? `You're at ${name.toLowerCase()} now. Pass every course left and you keep it.` : `Pass every course left and you reach ${name.toLowerCase()}.`;
  } else {
    hero = stat('Average you need', o.required.toFixed(2), { variant: 'hero', note: `on your ${unitsText(left.gwaUnits)} left` });
    const r = o.required;
    [tone, ic] = r <= 1.75 ? ['warn', 'alert'] : ['ok', 'check'];
    const how = r <= 1.25 ? 'excellent grades' : r <= 1.75 ? 'very good grades' : r <= 2.5 ? 'good grades' : 'grades a little better than passing';
    message = `${name} is in reach with ${how}.`;
  }

  el.replaceChildren(hero, notice({ tone, icon: ic, body: message, action }));
}

/* ---------- Wrapped ---------- */

let wrappedCurrentPanel = 0;
let wrappedPanels = [];

function initializeWrapped() {
  $('wrappedPrev').addEventListener('click', () => navigateWrapped(-1));
  $('wrappedNext').addEventListener('click', () => navigateWrapped(1));
  $('wrappedExport').addEventListener('click', exportWrappedToPNG);
  $('wrappedName').addEventListener('input', redrawTin);
  ['wrappedShow', 'wrappedTop'].forEach(id => $(id).addEventListener('change', redrawTin));
  $('wrappedLine').addEventListener('input', redrawTin);
  $('wrappedSem').addEventListener('change', () => {
    wrappedPanels = generateWrappedPanels(generateWrappedData(wrappedCourses), wrappedCourses, Number($('wrappedSem').value)).filter(Boolean);
    updateWrappedDisplay();
  });
  $('programSelect').addEventListener('change', redrawTin);
}

function generateWrappedData(courses) {
  const distinct = new Set();
  const distribution = {};
  const retakes = {};
  const sems = new Map();
  let fails = 0, weighted = 0, units = 0, passedUnits = 0, best = null, worst = null;

  courses.forEach(course => {
    const code = (course.courseCode || '').trim();
    // Same rules as the GWA: no PE, HK or NSTP, and nothing the user left out.
    if (NON_GWA_PREFIX.test(code) || excludedCourses.has(courseIdOf(course))) return;
    const gradeStr = (course.grade || '').toString().toUpperCase().trim();
    distinct.add(gradeStr);
    if (NON_NUMERIC_GRADES.includes(gradeStr)) return;
    const g = parseFloat(course.grade);
    const u = course.units || 0;
    if (isNaN(g) || g < 1 || g > 5 || !u) return;
    const name = course.term || `${course.academicYear} - ${course.semester}`;
    const s = sems.get(name) || { w: 0, u: 0, abs: amisTermToAbs(course.termId) ?? 0 };
    s.w += g * u;
    s.u += u;
    sems.set(name, s);
    distribution[g.toFixed(2)] = (distribution[g.toFixed(2)] || 0) + 1;
    retakes[code.toUpperCase()] = (retakes[code.toUpperCase()] || 0) + 1;
    if (g === 5) fails++;
    if (!best || g < best.grade) best = { code, grade: g };
    if (g < 5 && (!worst || g > worst.grade)) worst = { code, grade: g };
    weighted += g * u;
    units += u;
    if (g <= 3) passedUnits += u;
  });

  let mostRetaken = null;
  Object.entries(retakes).forEach(([code, count]) => {
    if (count > 1 && (!mostRetaken || count > mostRetaken.count)) mostRetaken = { code, count };
  });

  const semList = Array.from(sems, ([name, s]) => ({ name, gwa: s.w / s.u, abs: s.abs })).sort((a, b) => a.abs - b.abs);
  let comeback = null;
  semList.forEach((s, i) => {
    const up = i ? semList[i - 1].gwa - s.gwa : 0;
    if (up >= 0.1 && (!comeback || up > comeback.up)) comeback = { sem: s, up };
  });
  return {
    gwa: units ? weighted / units : 0,
    passedUnits, distinct, numericKinds: Object.keys(distribution).length, fails, best, worst, mostRetaken,
    semList, comeback,
    bestSem: semList.reduce((a, s) => (!a || s.gwa < a.gwa ? s : a), null),
    worstSem: semList.reduce((a, s) => (!a || s.gwa > a.gwa ? s : a), null),
  };
}

// Each panel is plain data. wrappedPanel() shows it, and drawTinFrame() paints
// the cards that sit on Reann Vargas's art.
function generateWrappedPanels(data, courses, pick) {
  return [
    generateThisSemPanel(data, courses, pick),
    generateGWAPanel(data),
    generateSemesterPanel(data),
    generateHighlightsPanel(data),
    generateCollectorPanel(data),
    generateProgressPanel(data),
  ];
}

function generateThisSemPanel(data, courses, pick = data.semList.length - 1) {
  if (!data.semList.length) return null;
  const n = Math.min(pick, data.semList.length - 1) + 1;
  const sem = data.semList[n - 1];
  const inSem = courses.filter(c => semKeyOf(c) === sem.name);
  const taken = inSem.filter(c => !NON_GWA_PREFIX.test((c.courseCode || '').trim()));
  const group = calculateGroupGWA(taken);
  const held = inSem.some(c => NON_GWA_PREFIX.test((c.courseCode || '').trim()) && ((c.grade || '').toString().toUpperCase().trim() === 'INC' || parseFloat(c.grade) > 3));
  const scholar = !held && !group.hasFailOrInc && group.totalUnits >= 15
    ? (group.gwa <= 1.45 ? 'University Scholar' : group.gwa <= 1.75 ? 'College Scholar' : null) : null;
  const g = sem.gwa;
  const [title, message] =
    scholar ? [scholar, 'Ikaw na. Screenshot mo na, deserve mo.']
    : g <= 1.75 ? ['Uno-heavy sem', 'Ang ganda ng sem mo. Flex mo na.']
    : g <= 2.0 ? ['Solid sem', 'Kinaya mo lahat. Proud of u.']
    : g <= 2.5 ? ['Steady sem', 'Pasado lahat ng pinaghirapan mo. Pahinga ka muna.']
    : g <= 3.0 ? ['Survived the sem', 'Tapos na, nakaraos ka. Panalo pa rin.']
    : ['Bawi next sem', "Mabigat 'tong sem na 'to. Kaya mo pa 'yan."];
  let top = null;
  taken.forEach(c => {
    const v = parseFloat(c.grade);
    if (v >= 1 && v <= 5 && !excludedCourses.has(courseIdOf(c)) && (!top || v < top.grade)) top = { code: (c.courseCode || '').trim(), grade: v };
  });
  const prev = n > 1 ? data.semList[n - 2].gwa : null;
  const extra = prev == null ? 'My first sem in Elbi'
    : data.bestSem === sem ? 'My best sem'
    : prev - g >= 0.01 ? `Up ${(prev - g).toFixed(2)} from last sem`
    : `${taken.reduce((u, c) => u + (c.units || 0), 0)} units done this sem`;
  return {
    emoji: '🍓', title, value: g.toFixed(4), subtitle: sem.name, message, extra, frame: 'sem',
    highlights: top ? [{ label: '🏆 Top grade', name: top.code, detail: top.grade.toFixed(2) }] : [],
  };
}

function generateGWAPanel(data) {
  const gwa = data.gwa;
  const tiers = [
    [0, '📚', 'No grades yet', "Freshie ka ba? Or di pa nag-uupload ng grades si registrar. Either way, good luck this sem."],
    [1.20, '🏆', 'Summa material', "Grabe naman 'to. Penge tips naman. Seryoso, pano mo nagagawa 'yan habang may social life?"],
    [1.45, '⭐', 'Magna tingz', 'Consistent high grades. Ikaw yung type na maayos notes tapos hinahanap ka ng groupmates pag may exam.'],
    [1.75, '🎯', 'Cum laude szn', 'Solid GWA. Di ka nag-slack off pero di rin naman nagpaka-robot. Balance talaga.'],
    [2.00, '🌟', 'Honor roll', 'Pasok sa honors. May hirap-hirap pero kinaya mo naman. Proud of u.'],
    [2.50, '💪', 'Pasang-alam', 'Passing is passing. May mga sem na mabigat talaga, wag ka maguilty. Nasa UP ka pa rin.'],
    [3.00, '🎮', 'Survival mode', 'Nandito ka pa, that counts. Minsan ganyan talaga UP. Basta graduate, panalo.'],
    [Infinity, '🌱', 'Comeback arc', "Mababa man ngayon, pwede pa 'yan i-improve. Marami nang naka-recover from this. Kaya mo 'yan."],
  ];
  const [, emoji, title, message] = gwa === 0 ? tiers[0] : tiers.slice(1).find(t => gwa <= t[0]);
  return { emoji, title, value: gwa > 0 ? gwa.toFixed(4) : '--', subtitle: 'My Elbi GWA', message, frame: gwa > 0 && 'id' };
}

function generateSemesterPanel(data) {
  const n = data.semList.length;
  const b = data.bestSem;
  if (!b) return { emoji: '📅', title: 'Sem stats', value: '--', subtitle: 'No sem has grades yet', message: 'Check back once grades are in.' };
  const bestWord = b.gwa <= 1.25 ? 'Your peak' : b.gwa <= 1.5 ? 'Nice run' : b.gwa <= 1.75 ? 'Solid sem' : b.gwa <= 2 ? 'Good one' : 'Best so far';
  const highlights = [{ label: '🏆 Best sem', name: b.name, detail: `GWA ${b.gwa.toFixed(4)}. ${bestWord}` }];
  const t = data.worstSem;
  const up = data.comeback;
  if (up && up.sem.name !== b.name) highlights.push({ label: '📈 Comeback sem', name: up.sem.name, detail: `GWA ${up.sem.gwa.toFixed(4)}. Up ${up.up.toFixed(2)} from the sem before` });
  else if (t && t.name !== b.name) {
    const word = t.gwa >= 3 ? 'Rough one' : t.gwa >= 2.5 ? 'Challenging' : t.gwa >= 2 ? 'Tough load' : 'Room to grow';
    highlights.push({ label: '📈 Toughest sem', name: t.name, detail: `GWA ${t.gwa.toFixed(4)}. ${word}` });
  }
  const message = n >= 8 ? `${n} sems done. Almost there.`
    : n >= 6 ? `${n} sems done. The end is in sight.`
    : n >= 4 ? `${n} sems in. You're halfway through.`
    : n >= 2 ? `${n} sems down, many more to go.`
    : 'Just getting started. Enjoy the ride.';
  return { emoji: '📅', title: 'Sem stats', value: String(n), subtitle: n === 1 ? 'sem with grades' : 'sems with grades', message, highlights, frame: 'tin', sems: data.semList.map(s => s.gwa) };
}

function generateHighlightsPanel(data) {
  const highlights = [];
  if (data.best) highlights.push({ label: '🏆 Best performance', name: data.best.code, detail: `Grade ${data.best.grade.toFixed(2)}` });
  if (data.worst) highlights.push({ label: '📈 Room to grow', name: data.worst.code, detail: `Grade ${data.worst.grade.toFixed(2)}` });
  if (data.mostRetaken) highlights.push({ label: '🔄 Persistence award', name: data.mostRetaken.code, detail: `Taken ${data.mostRetaken.count} times. You didn't give up` });
  return {
    emoji: '🫴', title: 'Your highlights', highlights,
    subtitle: highlights.length ? null : 'Pass a course to see your highlights.',
    message: 'Every course counts toward the diploma.',
    extra: `${data.passedUnits} units passed`, frame: data.best && 'tray',
  };
}

function generateCollectorPanel(data) {
  const total = data.distinct.size;
  const [emoji, title, message] =
    total >= 10 ? ['🎰', 'Full collection', "You've seen it all, from 1.00 to 5.00 plus S, U, INC and DRP. Your transcript tells a story."]
    : total >= 7 ? ['🃏', 'Variety pack', "A bit of everything. You've taken very different kinds of courses with different outcomes."]
    : total >= 4 ? ['🎲', 'Mixed bag', 'Some ups, some downs. Pretty normal for most students tbh.']
    : data.numericKinds === 1 && data.gwa <= 1.5 ? ['🎯', 'One-track mind', "Same high grade over and over? That's rare consistency. How."]
    : ['📊', 'Steady grades', "You stick to a range. Predictable in a good way. You know what you're doing."];
  const badges = Array.from(data.distinct).filter(Boolean).sort()
    .map(text => ({ text, special: NON_NUMERIC_GRADES.includes(text) }));
  const f = data.fails;
  const extra = f === 0 ? 'Zero 5.00s. Clean record.' : f === 1 ? 'One 5.00, and still here.' : `${f} 5.00s, and still standing.`;
  return { emoji, title, value: String(total), subtitle: total === 1 ? 'kind of grade' : 'kinds of grades', badges, message, extra, frame: total > 0 && 'note' };
}

function generateProgressPanel(data) {
  const totalRequired = getCurrentCurriculum()?.totalUnitsRequired || 155;
  const done = data.passedUnits;
  const left = Math.max(0, totalRequired - done);
  const pct = Math.min(100, Math.round((done / totalRequired) * 100));
  const [emoji, title, message] =
    pct >= 100 ? ['🎓', 'Graduation ready', 'All units done. Time to march. Congratulations, you made it.']
    : pct >= 80 ? ['🚀', 'Almost there', `${left} units left. The finish line is in sight. Last push na 'to.`]
    : pct >= 60 ? ['⚡', 'Past halfway', `${left} units to go. More than half done, and you've got momentum.`]
    : pct >= 40 ? ['🌤️', 'Making progress', `${left} units remaining. Take it one sem at a time.`]
    : pct >= 20 ? ['🌅', 'Early days', `${left} units ahead of you. Plenty of time to figure things out.`]
    : ['🌱', 'Just starting', `${left} units to complete. It's a marathon, not a sprint.`];
  return {
    emoji, title, value: `${pct}%`, subtitle: `${done} of ${totalRequired} units passed`, message,
    progress: pct / 100, extra: left ? `${left} units to go` : 'All units done', frame: done > 0 && 'open',
  };
}

// On-screen Wrapped slide.
let wrappedYears = 0;
let wrappedCourses = [];

function wrappedId() {
  const year = `${['1st', '2nd', '3rd'][wrappedYears - 1] || `${wrappedYears}th`} year`;
  // The From AMIS mark: grades read from AMIS here, with no removal result and nothing left out.
  const amis = fetchedAt && !Object.keys(removals).length && !excludedCourses.size
    ? new Date(fetchedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  return {
    name: $('wrappedName').value.trim(), year, course: $('programSelect').value, show: $('wrappedShow').value || 'none',
    top: $('wrappedTop').checked, line: $('wrappedLine').value.trim(), amis,
  };
}

const GWA_SHOWS = ['none', 'xx', 'bx', 'xc', 'bc', 'full'];

// A GWA written the way students post it, like 1.xx or 1.8x. Two decimals are cut, not rounded.
function shownGwa(value = '', show = 'none') {
  const [a, d = ''] = value.split('.');
  if (show === 'none' || !d) return '';
  if (show === 'full') return value;
  return `${a}.${{ xx: 'xx', bx: `${d[0]}x`, xc: `x${d[1]}`, bc: d.slice(0, 2) }[show]}`;
}

const tinImages = {};
const bareLabel = label => label.replace(/^\P{L}+/u, '');
const FRAMES = { sem: 'tin-grass', id: 'tin-id', tin: 'tin', note: 'tin-note', tray: 'tray', open: 'tin-red' };
const INK = '#1c1917', SOFT = '#4a3f3c', RED = '#7b2a22', URL = 'gradesim.uplb.tools';
const CREDIT = 'Design by Reann Vargas and Danica Manadong';

// Reann Vargas's pages. Each tin, tray and note is tilted, so text is drawn turned with it.
async function drawTinFrame(canvas, p) {
  const font = '"Figtree", system-ui, sans-serif';
  const src = `frames/${FRAMES[p.frame]}.jpg`;
  const img = tinImages[src] ||= Object.assign(new Image(), { src });
  await Promise.all([img.decode(), document.fonts.load(`800 88px ${font}`)]);
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, 1080, 1920);
  ctx.textAlign = 'center';
  const at = (x, y, turn, draw) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(turn);
    draw();
    ctx.restore();
  };
  const text = (t, weight, size, color, y, max = 1080, x = 0) => {
    do ctx.font = `${weight} ${size}px ${font}`;
    while (ctx.measureText(t).width > max && --size > 24);
    ctx.fillStyle = color;
    ctx.fillText(t, x, y, max);
  };
  const onGrass = (t, weight, size, x, y) => {
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.75)';
    ctx.shadowBlur = 18;
    text(t, weight, size, '#ffffff', y, 1000, x);
    ctx.restore();
  };
  const id = wrappedId();
  const g = shownGwa(p.value, id.show);

  if (id.amis) {
    const label = `From AMIS, ${id.amis}`;
    ctx.font = `700 34px ${font}`;
    const w = ctx.measureText(label).width + 100;
    ctx.fillStyle = 'rgba(28,25,23,0.88)';
    ctx.beginPath();
    ctx.roundRect(60, 262, w, 68, 34);
    ctx.fill();
    ctx.fillStyle = '#2a8f55';
    ctx.beginPath();
    ctx.arc(100, 296, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(90, 297);
    ctx.lineTo(98, 305);
    ctx.lineTo(111, 287);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.fillText(label, 132, 308);
    ctx.textAlign = 'center';
  }

  ctx.font = `600 28px ${font}`;
  const cw = ctx.measureText(CREDIT).width + 48;
  ctx.fillStyle = 'rgba(28,25,23,0.82)';
  ctx.beginPath();
  ctx.roundRect(540 - cw / 2, 1526, cw, 50, 25);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillText(CREDIT, 540, 1561);

  if (p.frame === 'sem') {
    const top = id.top ? p.highlights[0] : null;
    ctx.translate(540, 1040);
    ctx.rotate(-0.08);
    ctx.translate(-540, -1040);
    onGrass(`My ${p.subtitle}`, 700, 50, 540, 760);
    if (g) {
      onGrass(g, 800, 220, 540, 990);
      onGrass(p.title, 800, 76, 540, 1090);
    } else onGrass(p.title, 800, 112, 540, 960);
    onGrass(id.line || p.extra, 700, 50, 540, g ? 1180 : 1070);
    if (top) onGrass(`Top grade ${top.name}, ${top.detail}`, 600, 44, 540, g ? 1260 : 1150);
    onGrass(URL, 600, 38, 540, g ? 1350 : 1250);
    return canvas;
  }

  if (p.frame === 'id') {
    ctx.textAlign = 'left';
    [[id.name, 556, 638, 285], [id.year, 566, 738, 295], [id.course, 612, 830, 268]]
      .forEach(([t, x, y, max]) => at(x, y, -0.19, () => text(t, 700, 40, INK, 0, max)));
    ctx.textAlign = 'center';
    at(592, 1215, -0.19, () => {
      if (g) {
        text(g, 800, 190, RED, 0);
        text(p.title, 800, 64, INK, 95);
      } else {
        text(p.title, 800, 120, RED, 20, 700);
        text('My Elbi GWA tier', 700, 44, INK, 95);
      }
      text(`Make yours on ${URL}`, 600, 36, SOFT, 160);
    });
    return canvas;
  }

  if (p.frame === 'tin') {
    at(500, 690, -0.17, () => {
      text(`${p.value} ${p.value === '1' ? 'sem' : 'sems'} done`, 800, 68, INK, -110, 380, -120);
      const g = p.sems;
      if (g.length > 1) {
        const x = i => -280 + (560 * i) / (g.length - 1);
        const y = v => -40 + ((Math.min(3, Math.max(1, v)) - 1) / 2) * 150;
        ctx.strokeStyle = RED;
        ctx.lineWidth = 8;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        g.forEach((v, i) => (i ? ctx.lineTo(x(i), y(v)) : ctx.moveTo(x(i), y(v))));
        ctx.stroke();
        ctx.fillStyle = RED;
        g.forEach((v, i) => {
          ctx.beginPath();
          ctx.arc(x(i), y(v), 13, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      text(URL, 600, 36, SOFT, 175);
    });
    p.highlights.forEach((x, i) => at(596, 1225, -0.17, () => {
      const y = p.highlights.length > 1 ? i * 205 - 150 : -30;
      text(bareLabel(x.label), 600, 38, SOFT, y);
      text(x.name, 800, 62, INK, y + 72, 700);
      text(x.detail, 700, 40, RED, y + 130, 700);
    }));
    return canvas;
  }

  if (p.frame === 'note') {
    const badges = p.badges.slice(0, 12);
    at(340, 778, -0.17, () => badges.forEach((b, i) => {
      const cx = ((i % 3) - 1) * 132;
      const cy = (Math.floor(i / 3) - (Math.ceil(badges.length / 3) - 1) / 2) * 88;
      ctx.fillStyle = b.special ? INK : RED;
      ctx.beginPath();
      ctx.roundRect(cx - 58, cy - 32, 116, 64, 32);
      ctx.fill();
      text(b.text, 800, 34, '#ffffff', cy + 12, 100, cx);
    }));
    at(770, 700, -0.17, () => {
      text(p.value, 800, 160, RED, 40, 300);
      text(p.subtitle, 700, 38, INK, 100, 300);
    });
    at(590, 1215, -0.18, () => {
      text('My grade collection', 600, 38, SOFT, -130);
      text(p.title, 800, 84, INK, -40, 700);
      text(p.extra, 700, 46, RED, 40, 700);
      text(URL, 600, 36, SOFT, 140);
    });
    return canvas;
  }

  if (p.frame === 'tray') {
    const [best, low, kept] = p.highlights;
    onGrass('My highlights', 800, 76, 470, 540);
    at(375, 1070, -0.1, () => {
      text(bareLabel(best.label), 600, 36, SOFT, -170, 330);
      text(best.name, 800, 80, INK, -80, 330);
      text(best.detail.replace('Grade ', ''), 800, 150, RED, 90, 330);
    });
    const corner = (x, y, hl, fallback) => at(x, y, -0.1, () => {
      const [label, name, detail] = hl ? [bareLabel(hl.label), hl.name, hl.detail] : fallback;
      text(label, 600, 32, SOFT, -55, 300);
      text(name, 800, 54, INK, 10, 300);
      text(detail, 700, 34, RED, 60, 300);
    });
    corner(838, 805, low, ['', '', '']);
    corner(860, 1185, kept, ['So far', p.extra, 'and counting']);
    onGrass(URL, 700, 40, 540, 1512);
    return canvas;
  }

  at(488, 700, -0.19, () => {
    text(p.title, 800, 64, INK, -140, 700);
    text(p.value, 800, 200, RED, 50, 700);
    text(p.subtitle, 700, 42, INK, 130, 700);
  });
  at(585, 1225, -0.2, () => {
    const w = 640;
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath();
    ctx.roundRect(-w / 2, -120, w, 48, 24);
    ctx.fill();
    ctx.fillStyle = RED;
    ctx.beginPath();
    ctx.roundRect(-w / 2, -120, Math.max(48, w * p.progress), 48, 24);
    ctx.fill();
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 10;
    text(p.extra, 800, 64, '#ffffff', 10, 700);
    text(URL, 600, 36, '#ffffff', 110);
  });
  return canvas;
}

function tinCanvas(p) {
  const tier = p.frame === 'id' || p.frame === 'sem';
  const id = wrappedId();
  const shown = tier && id.show !== 'none' && `GWA ${shownGwa(p.value, id.show)}`;
  const highlights = p.frame === 'sem' && !id.top ? [] : p.highlights || [];
  const label = [p.title, shown, id.amis && `from AMIS on ${id.amis}`, !tier && [p.value, p.subtitle].filter(Boolean).join(' '), p.frame === 'sem' && id.line || p.extra, ...highlights.map(x => `${bareLabel(x.label)} ${x.name}, ${x.detail}`), 'drawn on a picnic blanket'].filter(Boolean).join(', ');
  const canvas = h('canvas', { class: 'panel-frame', role: 'img', 'aria-label': label });
  drawTinFrame(canvas, p);
  return canvas;
}

function redrawTin() {
  if ($('wrappedPanel').querySelector('canvas')) updateWrappedDisplay();
}

function wrappedPanel(p) {
  if (p.frame) return [tinCanvas(p), h('p', { class: 'panel-message' }, p.message)];
  return [
    h('div', { class: 'panel-emoji', 'aria-hidden': 'true' }, p.emoji),
    h('h3', { class: 'panel-title' }, p.title),
    p.value && h('div', { class: 'panel-value' }, p.value),
    p.subtitle && h('div', { class: 'panel-subtitle' }, p.subtitle),
    p.message && h('p', { class: 'panel-message' }, p.message),
  ];
}

function displayWrapped(courses) {
  wrappedCourses = courses;
  const data = generateWrappedData(courses);
  wrappedPanels = generateWrappedPanels(data, courses).filter(Boolean);
  $('wrappedSem').replaceChildren(...data.semList.map((s, i) => h('option', { value: i }, s.name)));
  $('wrappedSem').value = data.semList.length - 1;
  wrappedYears = new Set(courses.map(c => c.academicYear).filter(Boolean)).size;
  wrappedCurrentPanel = 0;
  updateWrappedDisplay();
}

function updateWrappedDisplay() {
  if (!wrappedPanels.length) return;
  const p = wrappedPanels[wrappedCurrentPanel];
  $('wrappedLine').placeholder = p.extra || '';
  const show = $('wrappedShow').value || 'none';
  $('wrappedShow').replaceChildren(...GWA_SHOWS.map(k => h('option', { value: k }, k === 'none' ? 'Tier only' : shownGwa(p.value, k))));
  $('wrappedShow').value = show;
  $('wrappedPanel').replaceChildren(...flat(wrappedPanel(p)));
  $('wrappedId').hidden = p.frame !== 'id' && p.frame !== 'sem';
  $('wrappedId').querySelectorAll('.wrapped-name').forEach(el => (el.hidden = p.frame !== 'id'));
  $('wrappedId').querySelectorAll('.wrapped-sem').forEach(el => (el.hidden = p.frame !== 'sem'));
  $('wrappedAmisHint').hidden = !p.frame || !!wrappedId().amis;
  $('wrappedExport').hidden = !p.frame;
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

async function exportWrappedToPNG() {
  const p = wrappedPanels[wrappedCurrentPanel];
  if (!p?.frame) return;
  const canvas = await drawTinFrame(document.createElement('canvas'), p);
  h('a', { download: `gradesim-wrapped-${wrappedCurrentPanel + 1}.jpg`, href: canvas.toDataURL('image/jpeg', 0.92) }).click();
}

/* ---------- Grade refresh, backup and clear data (platform) ---------- */

const SYNC_ERRORS = {
  'not-logged-in': 'Log in to AMIS, then press Refresh.',
  'amis-error': "AMIS didn't answer. Check that AMIS opens in a tab, then press Refresh.",
  'no-tab': 'Open AMIS in a tab first.',
  'no-answer': 'Reload your AMIS tab once, then press Refresh.',
};

// Show a refresh problem, or clear it with null. With no grades yet it goes in the empty card.
let syncError = null;
function showSyncError(code) {
  syncError = code;
  if (!$('noData').classList.contains('hidden')) {
    $('noDataHint').textContent = SYNC_ERRORS[code] || 'Log in to AMIS in a tab, then press Refresh.';
    $('syncNotice').replaceChildren();
    return;
  }
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
// termsAccepted (each person accepts the terms on their own device),
// lastError (it describes this browser only) or fetchedAt (only a real AMIS
// read sets it, so the From AMIS mark can't come from a file).
const BACKUP_KEYS = ['gradesData', 'selectedProgram', 'selectedTracks', 'selectedSpecializations', 'excludedCourses',
  'substitutions', 'customCourseStatus', 'removals', 'plannerPins', 'plannerPetitions', 'plannerOptions', 'theme'];

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
      await chrome.storage.local.remove('fetchedAt');
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
  try { obj = JSON.parse(text); } catch (e) { throw new Error("GradeSim can't read that file, so nothing changed. Pick the backup GradeSim saved."); }
  if (!obj || obj.source !== 'elbi-gradesim') throw new Error("That file isn't a GradeSim backup, so nothing changed.");
  const v = obj.schemaVersion == null ? 1 : obj.schemaVersion;
  if (!Number.isInteger(v) || v < 1 || v > BACKUP_SCHEMA_VERSION) {
    throw new Error('That backup comes from a newer GradeSim. Update the extension, then load it again.');
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
