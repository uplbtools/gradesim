// components.js - the shared UI pieces of the popup and the planner.
// Plain functions that return DOM elements. No markup strings are assigned to
// innerHTML anywhere (the Firefox add-on linter flags it), and every style
// comes from the classes in popup.css, which only use tokens.css values.
// Loaded in <head> so the cached theme applies before the first paint.

/* ---------- Theme, applied before first paint ---------- */

const THEMES = ['system', 'light', 'dark'];
const THEME_CACHE_KEY = 'gradesim:theme';

function setThemeAttr(theme) {
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
  else delete document.documentElement.dataset.theme;
}

// MV3 forbids inline scripts, so this file does the early read itself.
try { setThemeAttr(JSON.parse(localStorage.getItem(THEME_CACHE_KEY))); } catch (e) { /* no cache yet */ }

// Wire the theme button. `saved` is the stored choice, `persist` saves a new one.
function themeToggle(btn, saved, persist) {
  const apply = theme => {
    setThemeAttr(theme);
    try { localStorage.setItem(THEME_CACHE_KEY, JSON.stringify(theme)); } catch (e) { /* private mode */ }
    btn.replaceChildren(icon({ system: 'monitor', light: 'sun', dark: 'moon' }[theme]));
    btn.title = `Theme, ${theme}`;
    btn.setAttribute('aria-label', btn.title);
    btn.dataset.theme = theme;
  };
  apply(THEMES.includes(saved) ? saved : 'system');
  btn.addEventListener('click', () => {
    const next = THEMES[(THEMES.indexOf(btn.dataset.theme) + 1) % THEMES.length];
    apply(next);
    persist(next);
  });
}

/* ---------- Element builder ---------- */

// h('div', { class: 'x', onclick: fn, dataset: {...}, 'aria-label': '...' }, ...children)
// Children may be strings, numbers, elements, arrays, or null/false (skipped).
function h(tag, props, ...children) {
  const el = document.createElement(tag);
  Object.entries(props || {}).forEach(([k, v]) => {
    if (v == null || v === false) return;
    if (k === 'class') el.className = v;
    else if (k === 'dataset') Object.assign(el.dataset, v);
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k in el && typeof v !== 'string') el[k] = v;
    else el.setAttribute(k, v === true ? '' : v);
  });
  el.append(...flat(children));
  return el;
}

function flat(children) {
  return children.flat(Infinity).filter(c => c != null && c !== false).map(c => (c instanceof Node ? c : String(c)));
}

const SVG_NS = 'http://www.w3.org/2000/svg';
function svgEl(tag, attrs) {
  const el = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs || {}).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

/* ---------- Icons (Lucide, ISC license, https://lucide.dev) ---------- */

const ICON_PATHS = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  award: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon: '<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',
  monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  retake: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  ready: '<circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/>',
  planned: '<circle cx="12" cy="12" r="10"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  prev: '<path d="m15 18-6-6 6-6"/>',
  next: '<path d="m9 18 6-6-6-6"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  eyeOff: '<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',
  sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  list: '<path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/>',
};

const iconCache = {};
// The paths above are static strings; DOMParser turns them into SVG nodes once.
function icon(name) {
  if (!iconCache[name]) {
    const doc = new DOMParser().parseFromString(
      `<svg xmlns="${SVG_NS}" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name] || ''}</svg>`,
      'image/svg+xml');
    iconCache[name] = document.importNode(doc.documentElement, true);
  }
  return iconCache[name].cloneNode(true);
}

// Static pages mark icon spots with <span data-icon="name"></span>.
function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(el => el.replaceWith(icon(el.dataset.icon)));
}

/* ---------- Text helpers ---------- */

const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const unitsText = n => plural(Number(n) || 0, 'unit');

/* ---------- Components ---------- */

// variant: primary | secondary | text | icon | chip. Extra props pass through.
function button({ text, icon: ic, variant = 'secondary', small, class: cls, ...props }) {
  const base = { primary: 'btn btn-primary', secondary: 'btn btn-secondary', text: 'btn-text', icon: 'btn-icon', chip: 'header-btn' }[variant];
  return h('button', { type: 'button', class: [base, small && 'btn-sm', cls].filter(Boolean).join(' '), ...props },
    ic && icon(ic), text);
}

// Small rounded label. tone: neutral | brand | strong | ok | warn | bad | info
function badge(text, { tone = 'neutral', icon: ic, class: cls, ...props } = {}) {
  return h('span', { class: `badge badge-${tone}${cls ? ` ${cls}` : ''}`, ...props }, ic && icon(ic), text);
}

// Latin honor track or semester scholar list. Returns null when none applies.
function honorBadge(kind) {
  const map = {
    summa: ['Summa cum laude track', 'strong'],
    magna: ['Magna cum laude track', 'brand'],
    cum: ['Cum laude track', 'brand'],
    university: ['University Scholar', 'strong'],
    college: ['College Scholar', 'brand'],
  };
  return map[kind] ? badge(map[kind][0], { tone: map[kind][1], icon: 'award' }) : null;
}

// Course status in the planner. Icon plus word, never color alone.
const COURSE_STATUS = {
  passed: ['check', 'Passed'],
  inprogress: ['clock', 'Taking now'],
  failed: ['x', 'Failed'],
  retake: ['retake', 'Retake'],
  ready: ['ready', 'Ready'],
  planned: ['planned', 'Planned'],
  locked: ['lock', 'Waiting'],
};
// variant: plain (inside a card) | pill (bordered)
function statusPill(status, { variant = 'pill', label } = {}) {
  const [ic, word] = COURSE_STATUS[status] || COURSE_STATUS.planned;
  return h('span', { class: `status status-${variant} st-${status}` }, icon(ic), label || word);
}

const unitsBadge = units => h('span', { class: 'units-badge' }, unitsText(units));

// Label over a big value, with an optional note under it. variant: block | row
function stat(label, value, { note, variant = 'block', highlight, id } = {}) {
  return h('div', { class: `stat stat-${variant}${highlight ? ' highlight' : ''}` },
    h('span', { class: 'stat-label' }, label),
    h('span', { class: 'stat-value', id }, value),
    note && h('span', { class: 'stat-note' }, note));
}

// One course line: code and title on the left, anything else on the right.
function courseRow({ code, title, units, below, aside, class: cls, ...props }) {
  return h('div', { class: `course-row${cls ? ` ${cls}` : ''}`, ...props },
    h('div', { class: 'course-info' },
      h('div', { class: 'course-code' }, code),
      title && h('div', { class: 'course-title' }, title),
      below),
    h('div', { class: 'course-aside' }, units != null && unitsBadge(units), aside));
}

// Callout with a tone. tone: neutral | ok | warn | bad | info
function notice({ tone = 'neutral', icon: ic, title, body, class: cls, ...props }) {
  return h('div', { class: `notice notice-${tone}${cls ? ` ${cls}` : ''}`, ...props },
    ic && icon(ic),
    h('div', { class: 'notice-text' }, title && h('strong', {}, title), body && h('span', {}, body)));
}

function emptyState(text, { icon: ic, action } = {}) {
  return h('div', { class: 'empty-state' }, ic && icon(ic), h('p', {}, text), action);
}

// Tabs with the ARIA tab pattern. Buttons carry data-tab; panels are found by
// id `${data-tab}Tab`. Arrow keys, Home and End move between tabs.
function tabBar(tablist, onChange) {
  const tabs = Array.from(tablist.querySelectorAll('[data-tab]'));
  tablist.setAttribute('role', 'tablist');
  const panelOf = t => document.getElementById(`${t.dataset.tab}Tab`);
  const select = (tab, focus) => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      t.classList.toggle('active', on);
      panelOf(t).hidden = !on;
    });
    if (focus) tab.focus();
    if (onChange) onChange(tab.dataset.tab);
  };
  tabs.forEach(t => {
    t.id = t.id || `tab-${t.dataset.tab}`;
    t.setAttribute('role', 'tab');
    t.setAttribute('aria-controls', panelOf(t).id);
    panelOf(t).setAttribute('role', 'tabpanel');
    panelOf(t).setAttribute('aria-labelledby', t.id);
    t.addEventListener('click', () => select(t));
  });
  tablist.addEventListener('keydown', e => {
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    select(tabs[(to + tabs.length) % tabs.length], true);
  });
  select(tabs.find(t => t.classList.contains('active')) || tabs[0]);
  return { select: name => select(tabs.find(t => t.dataset.tab === name)) };
}

// Native <dialog> as a modal. showModal() traps focus and makes the page
// inert; this adds focus return, backdrop click, and an optional lock that
// ignores Escape (for a choice the user has to make).
function modal(dialog) {
  let opener = null;
  let locked = false;
  dialog.addEventListener('cancel', e => { if (locked) e.preventDefault(); });
  dialog.addEventListener('click', e => { if (e.target === dialog && !locked) dialog.close(); });
  dialog.addEventListener('close', () => {
    // Chrome lets Escape through without user activation even when cancel is
    // prevented, so a locked dialog reopens itself.
    if (locked) { dialog.showModal(); return; }
    if (opener && opener.isConnected) opener.focus();
    opener = null;
  });
  dialog.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => dialog.close()));
  return {
    open({ lock = false } = {}) {
      locked = lock;
      opener = document.activeElement;
      if (!dialog.open) dialog.showModal();
    },
    close() { locked = false; dialog.close(); },
  };
}
