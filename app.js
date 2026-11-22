/* AK Planner — ứng dụng cá nhân: công việc, tập trung, mục tiêu.
   Thuần HTML/CSS/JS, dữ liệu lưu trong localStorage của thiết bị. */
(() => {
  'use strict';

  // ---------- Icons ----------
  const P = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="3"/><path d="M8 2.5v4M16 2.5v4M3 9.5h18M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 17h2M11 17h2"/>',
    chart: '<path d="M4 20V11M9.5 20V5M15 20v-8M20.5 20V8"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10.3 20a1.9 1.9 0 0 0 3.4 0"/>',
    bars: '<path d="M6 20v-6M10 20V9M14 20v-9M18 20V5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    flame: '<path d="M12 22c4 0 7-2.7 7-6.8 0-3.6-2.4-6-4.2-8.2-.5 2-1.6 3.3-2.8 3.6.4-3.2-.8-6.4-3.6-8.6.2 3.6-1.8 5.8-3.2 7.8C4 11.6 5 13.4 5 15.2 5 19.3 8 22 12 22z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    chevR: '<path d="m9 6 6 6-6 6"/>',
    chevL: '<path d="m15 6-6 6 6 6"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    dots: '<circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/>',
    edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    play: '<path d="M7 4.5v15l13-7.5z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    reset: '<path d="M4 12a8 8 0 1 0 2.5-5.8"/><path d="M4 4v5h5"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v12H4z"/><circle cx="12" cy="13.5" r="3.5"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    upload: '<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/>',
    book: '<path d="M2 4.5h6a4 4 0 0 1 4 4V21a3 3 0 0 0-3-3H2z"/><path d="M22 4.5h-6a4 4 0 0 0-4 4V21a3 3 0 0 1 3-3h7z"/>',
    bookmark: '<path d="M6 3h12v18l-6-4.5L6 21z"/>',
    quote: '<path d="M10 7H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3v1a3 3 0 0 1-3 3M20 7h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3v1a3 3 0 0 1-3 3"/>',
    type: '<path d="M3 7V5h11v2M8.5 5v14M6 19h5M14 13v-1.5h7V13M17.5 11.5V19M16 19h3"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    repeat: '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
    list: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="m3.5 6 1.2 1.2L7 5M3.5 12l1.2 1.2L7 11M3.5 18l1.2 1.2L7 17"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    minus: '<path d="M5 12h14"/>',
    journal: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7.5h6M9 11.5h6M9 15.5h4"/>',
    grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>',
    phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  };
  const ic = (name, extra = '') =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${P[name]}</svg>`;

  // ---------- Helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(2, '0');
  const keyOf = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const dateOf = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (k, n) => { const d = dateOf(k); d.setDate(d.getDate() + n); return keyOf(d); };
  const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const WD = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const mondayOf = (k) => { const d = dateOf(k); const wd = (d.getDay() + 6) % 7; d.setDate(d.getDate() - wd); return keyOf(d); };

  const CATS = {
    work: { name: 'Công việc', color: 'var(--c-work)' },
    health: { name: 'Sức khỏe', color: 'var(--c-health)' },
    study: { name: 'Học tập', color: 'var(--c-study)' },
    personal: { name: 'Cá nhân', color: 'var(--c-personal)' },
  };
  const EMOJIS = ['👮🏻‍♂️', '👮🏻‍♀️', '🧑🏻‍💻', '👨🏻', '👩🏻', '🧑🏻‍🎨', '🧑🏻‍🚀', '🦊', '🐼', '🐱', '🌸', '🌟', '🔥', '🎧', '⭐', '🇻🇳'];

  function dayLabel(k) {
    const t = keyOf();
    if (k === t) return 'Hôm nay';
    if (k === addDays(t, 1)) return 'Ngày mai';
    if (k === addDays(t, -1)) return 'Hôm qua';
    const d = dateOf(k);
    return `${WD[d.getDay()]}, ${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
  }
  function fmtTime(t) {
    if (!t) return 'Cả ngày';
    return t;
  }
  function fmtDur(sec) {
    const m = Math.round(sec / 60);
    return { h: Math.floor(m / 60), m: m % 60 };
  }

  // ---------- State ----------
  const STORE = 'ak-planner-v1';
  function seed() {
    return {
      name: '',
      onboarded: false,
      tagline: 'Hôm nay thật năng suất và chinh phục mục tiêu nhé.',
      avatar: { type: 'emoji', value: '👮🏻‍♂️' },
      theme: 'auto',
      focusPreset: 25,
      tasks: [],
      focusLog: {},
      timer: null,
    };
  }
  let S;
  try { S = JSON.parse(localStorage.getItem(STORE)) || seed(); } catch { S = seed(); }
  function normalize() {
    S.tasks = Array.isArray(S.tasks) ? S.tasks : [];
    S.focusLog = S.focusLog || {};
    S.readLog = S.readLog || {};
    S.readDone = S.readDone || {};
    S.readNotes = S.readNotes || {};
    S.readSaved = S.readSaved || {};
    S.customReads = Array.isArray(S.customReads) ? S.customReads : [];
    S.readGoal = S.readGoal || 10;
    S.readFont = S.readFont || 17;
    S.water = S.water || {};
    S.waterGoal = S.waterGoal || 8;
    S.journal = S.journal || {};
    S.top3 = S.top3 || {};
    if (S.onboarded === undefined) S.onboarded = true; // người dùng cũ không cần màn chào
    S.habits = Array.isArray(S.habits) ? S.habits : [];
    S.habitLog = S.habitLog || {};
    S.events = Array.isArray(S.events) ? S.events : [];
    S.money = Array.isArray(S.money) ? S.money : [];
    S.budget = S.budget || 0;
    S.shift = S.shift || { on: false, cycle: ['d', 'n', 'o', 'o'], start: keyOf() };
    S.shiftOv = S.shiftOv || {};
    if (!S.shift.mode) S.shift.mode = S.shift.on ? 'cycle' : 'week';
    S.duty = S.duty || {};
    S.duty.positions = Array.isArray(S.duty.positions) ? S.duty.positions : [];
    S.duty.entries = Array.isArray(S.duty.entries) ? S.duty.entries : [];
    S.duty.contacts = Array.isArray(S.duty.contacts) ? S.duty.contacts : [];
    if (S.duty.remind === undefined) S.duty.remind = true;
    S.duty.dayStart = S.duty.dayStart || '00:00';
  }
  normalize();
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch { toast('Không lưu được dữ liệu'); } };

  const ui = { tab: 'home', prevTab: 'home', calSel: keyOf(), calWeek: mondayOf(keyOf()), readCat: 'all', quoteOff: 0, open: {}, showDone: false };

  // ---------- Derived ----------
  // Việc lặp lại: một "mẫu" sinh ra các lần lặp ảo theo ngày; trạng thái xong lưu theo từng ngày.
  const REPEATS = { daily: 'Hằng ngày', weekdays: 'T2 – T6', weekly: 'Hằng tuần', monthly: 'Hằng tháng', days: 'Chọn thứ' };
  function occurs(t, k) {
    if (!t.repeat || k < t.date || (t.skip && t.skip[k])) return false;
    const d = dateOf(k), wd = d.getDay();
    switch (t.repeat) {
      case 'daily': return true;
      case 'weekdays': return wd >= 1 && wd <= 5;
      case 'weekly': return wd === dateOf(t.date).getDay();
      case 'monthly': return d.getDate() === dateOf(t.date).getDate();
      case 'days': return (t.days || []).includes(wd);
    }
    return false;
  }
  const inst = (t, k) => ({ ...t, occ: k, date: k, done: !!(t.doneDates && t.doneDates[k]), doneAt: (t.doneDates && t.doneDates[k]) || null, src: t });
  const byTime = (a, b) => (a.time || '99:99').localeCompare(b.time || '99:99');
  const byDoneTime = (a, b) => (a.done - b.done) || byTime(a, b);
  const tasksOn = (k) => [...S.tasks.filter((t) => !t.repeat && t.date === k), ...S.tasks.filter((t) => occurs(t, k)).map((t) => inst(t, k))].sort(byTime);
  const tkey = (t) => (t.occ ? `${t.id}|${t.occ}` : t.id);
  const getT = (id, occ) => { const t = S.tasks.find((x) => x.id === id); return t && t.repeat ? inst(t, occ || keyOf()) : t; };
  const doneOn = (k) => S.tasks.reduce((n, t) => n + (t.repeat ? (t.doneDates && t.doneDates[k] ? 1 : 0) : (t.done && t.doneAt && keyOf(new Date(t.doneAt)) === k ? 1 : 0)), 0);
  const subDone = (t) => (t.repeat ? ((t.subDone || {})[t.occ || keyOf()] || []) : (t.subs || []).filter((x) => x.done).map((x) => x.id));
  const waterOn = (k) => S.water[k] || 0;
  const MOODS = [{ e: '😞', l: 'Tệ' }, { e: '😕', l: 'Không vui' }, { e: '😐', l: 'Bình thường' }, { e: '🙂', l: 'Vui' }, { e: '😄', l: 'Tuyệt vời' }];
  const jour = (k) => (S.journal[k] = S.journal[k] || {});
  const focusOn = (k) => S.focusLog[k] || 0;
  const activeOn = (k) => doneOn(k) > 0 || focusOn(k) >= 60 || (S.readLog[k] || 0) >= 60;
  function streak() {
    let k = keyOf();
    if (!activeOn(k)) k = addDays(k, -1);
    let n = 0;
    while (activeOn(k) && n < 3650) { n++; k = addDays(k, -1); }
    return n;
  }
  function bestStreak() {
    const days = new Set([...Object.keys(S.focusLog).filter((k) => S.focusLog[k] >= 60), ...Object.keys(S.readLog).filter((k) => S.readLog[k] >= 60)]);
    S.tasks.forEach((t) => (t.repeat ? Object.keys(t.doneDates || {}).forEach((k) => days.add(k)) : t.done && t.doneAt && days.add(keyOf(new Date(t.doneAt)))));
    const sorted = [...days].sort();
    let best = 0, cur = 0, prev = null;
    for (const k of sorted) { cur = prev && addDays(prev, 1) === k ? cur + 1 : 1; best = Math.max(best, cur); prev = k; }
    return best;
  }
  function weekDone() {
    const mon = mondayOf(keyOf());
    let n = 0;
    for (let i = 0; i < 7; i++) n += doneOn(addDays(mon, i));
    return n;
  }
  function isOverdue(t) {
    if (t.done) return false;
    const now = new Date();
    const today = keyOf(now);
    if (t.date < today) return true;
    if (t.date > today || !t.time) return false;
    return t.time < `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }
  function upcoming() {
    const now = new Date();
    const nowT = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const in3 = new Date(now.getTime() + 3 * 3600e3);
    const lim = `${pad(in3.getHours())}:${pad(in3.getMinutes())}`;
    const today = keyOf(now);
    return tasksOn(today).filter((t) => !t.done && t.time && t.time >= nowT && (in3.getDate() !== now.getDate() || t.time <= lim));
  }
  const overdueList = () => [...S.tasks.filter((t) => !t.repeat && isOverdue(t)), ...tasksOn(keyOf()).filter((t) => t.occ && isOverdue(t))]
    .sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || '')));
  const top3Keys = (k = keyOf()) => { const have = new Set(tasksOn(k).map(tkey)); return (S.top3[k] || []).filter((x) => have.has(x)); };

  // ---------- Theme ----------
  function applyTheme() {
    if (S.theme === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', S.theme);
  }

  // ---------- Toast ----------
  let toastT;
  function toast(msg, action) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.toggle('has-act', !!action);
    if (action) {
      const b = document.createElement('button');
      b.className = 'toast-act'; b.textContent = action.label || 'Hoàn tác';
      b.onclick = () => { el.classList.remove('show'); clearTimeout(toastT); action.fn(); };
      el.append(b);
    }
    el.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove('show'), action ? 5000 : 2200);
  }
  function celebrate(msg) {
    toast(msg);
    navigator.vibrate && navigator.vibrate([20, 40, 20]);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = document.createElement('div');
    box.className = 'confetti';
    const colors = ['#18a957', '#4ed37e', '#f3d062', '#ff8a6b', '#3a86b8', '#d6303a'];
    for (let i = 0; i < 70; i++) {
      const p = document.createElement('i');
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = Math.random() * 0.5 + 's';
      p.style.animationDuration = 1.8 + Math.random() * 1.4 + 's';
      p.style.setProperty('--dx', Math.random() * 220 - 110 + 'px');
      p.style.setProperty('--r', Math.random() * 900 + 'deg');
      box.append(p);
    }
    document.body.append(box);
    setTimeout(() => box.remove(), 3600);
  }

  // ---------- Components ----------
  const avatarHTML = (cls = '') =>
    S.avatar && S.avatar.type === 'img'
      ? `<div class="avatar ${cls}"><img src="${S.avatar.value}" alt="Ảnh đại diện"></div>`
      : `<div class="avatar ${cls}" aria-hidden="true">${(S.avatar && S.avatar.value) || '🙂'}</div>`;

  function taskHTML(t, showDate) {
    const c = CATS[t.cat] || CATS.personal;
    const when = showDate || t.date !== keyOf() ? `${dayLabel(t.date)}, ${fmtTime(t.time)}` : `Hôm nay, ${fmtTime(t.time)}`;
    const subs = t.subs || [], sd = subDone(t), nd = subs.filter((x) => sd.includes(x.id)).length;
    const open = ui.open[tkey(t)];
    const isTop = t.date === keyOf() && (S.top3[keyOf()] || []).includes(tkey(t));
    const tags = [
      t.repeat ? `<span class="tag">${ic('repeat')}${t.repeat === 'days' ? (t.days || []).slice().sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7)).map((d) => WD[d]).join(' ') : REPEATS[t.repeat]}</span>` : '',
      subs.length ? `<button class="tag tag-btn ${nd === subs.length ? 'ok' : ''}" data-act="subs" aria-expanded="${!!open}">${ic('list')}${nd}/${subs.length}</button>` : '',
    ].join('');
    return `<div class="swipe"><div class="swipe-bg" aria-hidden="true"><span class="sb-l">${ic('check', 'stroke-width="3"')} ${t.done ? 'Bỏ xong' : 'Xong'}</span><span class="sb-r">${t.repeat ? 'Bỏ qua' : 'Xóa'} ${ic('trash')}</span></div>
    <div class="task glass ${t.done ? 'done' : ''} ${isOverdue(t) ? 'overdue' : ''}" data-id="${t.id}"${t.occ ? ` data-occ="${t.occ}"` : ''}>
      <button class="check" data-act="toggle" aria-label="${t.done ? 'Bỏ đánh dấu' : 'Đánh dấu hoàn thành'}: ${esc(t.title)}">${ic('check', 'stroke-width="3"')}</button>
      <div class="task-body" data-act="edit">
        <div class="task-title">${isTop ? `<span class="star">${ic('star')}</span>` : ''}${esc(t.title)}</div>
        <div class="task-meta"><span class="cat-dot" style="--c:${c.color}"></span><span class="when">${when}</span>${tags}</div>
      </div>
      <button class="more" data-act="menu" aria-label="Tùy chọn">${ic('dots', 'fill="currentColor" stroke="none"')}</button>
      ${subs.length && open ? `<div class="subs-list">${subs.map((x) => `<button class="sub ${sd.includes(x.id) ? 'on' : ''}" data-act="sub" data-sid="${x.id}"><span class="sub-c">${ic('check', 'stroke-width="3.2"')}</span>${esc(x.title)}</button>`).join('')}</div>` : ''}
    </div></div>`;
  }

  function greeting() {
    const h = new Date().getHours();
    if (h < 5) return 'Chúc ngủ ngon';
    if (h < 11) return 'Chào buổi sáng';
    if (h < 13) return 'Chào buổi trưa';
    if (h < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  }

  // ---------- Đọc mỗi ngày ----------
  const RC = window.READ_CATS || {};
  const allReads = () => [...(window.READINGS || []), ...S.customReads];
  const readOn = (k) => S.readLog[k] || 0;
  const readGoalSec = () => S.readGoal * 60;
  const readMins = (L) => Math.max(2, Math.round(L.body.join(' ').split(/\s+/).length / 130));
  const dayNum = (k = keyOf()) => Math.round(dateOf(k).getTime() / 864e5);
  const mmss = (sec) => `${Math.floor(sec / 60)}:${pad(Math.floor(sec % 60))}`;
  function readStreak() {
    let k = keyOf();
    if (readOn(k) < readGoalSec()) k = addDays(k, -1);
    let n = 0;
    while (readOn(k) >= readGoalSec() && n < 3650) { n++; k = addDays(k, -1); }
    return n;
  }
  function todayLesson() {
    const k = keyOf(), all = allReads();
    if (!all.length) return null;
    const cur = S.readToday && S.readToday.date === k && all.find((x) => x.id === S.readToday.id);
    if (cur) return cur;
    const next = all.find((x) => !S.readDone[x.id]) || all[dayNum() % all.length];
    S.readToday = { date: k, id: next.id }; save();
    return next;
  }
  function nextLesson(after) {
    const all = allReads(), i = all.findIndex((x) => x.id === after.id);
    for (let j = 1; j <= all.length; j++) { const L = all[(i + j) % all.length]; if (!S.readDone[L.id]) return L; }
    return all[(i + 1) % all.length];
  }
  const featuredLesson = () => { const L = todayLesson(); return L && S.readDone[L.id] ? nextLesson(L) : L; };
  function quoteOfDay(off = 0) {
    const pool = [...(window.QUOTES || []), ...(window.READINGS || []).map((r) => r.quote)];
    return pool[(((dayNum() + off) % pool.length) + pool.length) % pool.length];
  }
  function ring(frac, size, sw) {
    const r = (size - sw) / 2, C = 2 * Math.PI * r, c = size / 2;
    return `<svg class="ring-svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true"><circle class="rt" cx="${c}" cy="${c}" r="${r}" fill="none" stroke-width="${sw}"/><circle class="rp" cx="${c}" cy="${c}" r="${r}" fill="none" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - Math.min(frac, 1))}" transform="rotate(-90 ${c} ${c})"/></svg>`;
  }
  function bodyHTML(body) {
    let out = '', inList = false;
    for (const p of body) {
      if (p.startsWith('• ')) { if (!inList) { out += '<ul>'; inList = true; } out += `<li>${esc(p.slice(2))}</li>`; continue; }
      if (inList) { out += '</ul>'; inList = false; }
      out += p.startsWith('## ') ? `<h2>${esc(p.slice(3))}</h2>` : `<p>${esc(p)}</p>`;
    }
    return out + (inList ? '</ul>' : '');
  }
  const readLeftMin = () => {
    const left = readGoalSec() - readOn(keyOf());
    return new Date().getHours() >= 19 && left > 0 ? Math.ceil(left / 60) : 0;
  };

  function readCardHTML() {
    const L = featuredLesson(); if (!L) return '';
    const sec = readOn(keyOf()), met = sec >= readGoalSec();
    const c = RC[L.cat] || RC.self;
    return `<button class="read-card glass" data-act="open-read" data-id="${L.id}">
      <span class="rc-ring">${ring(sec / readGoalSec(), 58, 6)}<b>${Math.floor(sec / 60)}'</b></span>
      <span class="rc-body">
        <span class="rc-lbl">${ic('book')} Đọc mỗi ngày · ${met ? 'Đã đạt mục tiêu 🎉' : `${Math.floor(sec / 60)}/${S.readGoal} phút`}</span>
        <span class="rc-title">${esc(L.title)}</span>
        <span class="rc-meta"><span class="cat-dot" style="--c:${c.color}"></span>${c.name} · ${readMins(L)} phút</span>
      </span>
      <span class="rc-go">${ic('chevR', 'stroke-width="2.6"')}</span>
    </button>`;
  }

  // Màn hình đọc toàn trang
  let R = null;
  function teardownReader(animate) {
    if (!R) return;
    clearInterval(R.t); clearTimeout(R.nt);
    const el = R.el; R = null;
    save();
    if (animate) { el.classList.add('closing'); setTimeout(() => el.remove(), 220); } else el.remove();
  }
  function closeReader() {
    if (!R) return;
    teardownReader(true);
    document.body.classList.remove('reading');
    if (history.state && history.state.reader) history.back();
    render();
  }
  window.addEventListener('popstate', () => { if (R) closeReader(); });

  function openReader(id) {
    const all = allReads(), L = all.find((x) => x.id === id);
    if (!L) return;
    closeSheet(true);
    if (R) teardownReader(false); else history.pushState({ reader: 1 }, '');
    const c = RC[L.cat] || RC.self;
    const el = document.createElement('div');
    el.className = 'reader';
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', L.title);
    el.style.setProperty('--rfs', S.readFont + 'px');
    const doneBtn = S.readDone[L.id]
      ? `<div class="r-done">${ic('check', 'stroke-width="3"')} Bạn đã đọc bài này</div><button class="btn btn-primary btn-block" data-r="next">${ic('arrowR')} Đọc bài tiếp theo</button><p class="r-next-t">Bài sau: ${esc(nextLesson(L).title)}</p>`
      : `<button class="btn btn-primary btn-block" data-r="done">${ic('check', 'stroke-width="3"')} Hoàn thành bài đọc</button>`;
    el.innerHTML = `
      <header class="r-bar">
        <button class="icon-btn glass" data-r="close" aria-label="Đóng">${ic('chevL')}</button>
        <div class="r-timer glass" id="r-timer" aria-label="Thời gian đọc hôm nay">${ring(0, 26, 3.5)}<span id="r-time"></span></div>
        <div class="r-tools">
          <button class="icon-btn glass" data-r="font" aria-label="Đổi cỡ chữ">${ic('type')}</button>
          <button class="icon-btn glass ${S.readSaved[L.id] ? 'on' : ''}" data-r="save" aria-label="Lưu bài">${ic('bookmark')}</button>
        </div>
        <div class="r-prog"><i id="r-prog"></i></div>
      </header>
      <article class="r-body">
        <span class="r-cat" style="--c:${c.color}">${c.name}</span>
        <h1>${esc(L.title)}</h1>
        <p class="r-meta">Bài ${all.indexOf(L) + 1}/${all.length} · khoảng ${readMins(L)} phút đọc</p>
        ${L.quote && L.quote.t ? `<blockquote class="r-quote">“${esc(L.quote.t)}”${L.quote.a ? `<cite>— ${esc(L.quote.a)}</cite>` : ''}</blockquote>` : ''}
        ${bodyHTML(L.body)}
        ${L.key && L.key.length ? `<div class="r-box"><h4>${ic('sparkle')} Ý chính</h4><ul>${L.key.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
        ${L.action ? `<div class="r-box"><h4>${ic('target')} Thử ngay hôm nay</h4><p>${esc(L.action)}</p><button class="btn btn-ghost" data-r="task">${ic('plus')} Thêm vào việc hôm nay</button></div>` : ''}
        <div class="r-box"><h4>${ic('edit')} Suy ngẫm</h4>${L.question ? `<p>${esc(L.question)}</p>` : ''}
          <textarea class="input r-note" id="r-note" rows="4" placeholder="Ghi lại suy nghĩ của bạn…">${esc(S.readNotes[L.id] || '')}</textarea></div>
        <div id="r-end">${doneBtn}</div>
        ${L.custom ? `<button class="btn btn-danger btn-block" data-r="delete" style="margin-top:10px">${ic('trash')} Xóa bài này</button>` : ''}
      </article>`;
    document.body.appendChild(el);
    document.body.classList.add('reading');
    R = { id, el, last: Date.now(), n: 0, t: setInterval(readTick, 1000) };
    const poke = () => { if (R) R.last = Date.now(); };
    ['scroll', 'touchstart', 'pointerdown', 'keydown', 'input'].forEach((ev) => el.addEventListener(ev, poke, { passive: true }));
    el.addEventListener('scroll', () => {
      const p = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
      $('#r-prog', el).style.width = Math.min(100, p * 100) + '%';
    }, { passive: true });
    el.addEventListener('click', readerClick);
    $('#r-note', el).addEventListener('input', (e) => {
      S.readNotes[L.id] = e.target.value;
      clearTimeout(R.nt); R.nt = setTimeout(save, 400);
    });
    updateReadUI();
  }

  function readTick() {
    if (!R || document.hidden) return;
    const idle = Date.now() - R.last > 90000; // 90 giây không thao tác thì tạm dừng
    R.el.classList.toggle('idle', idle);
    if (!idle) {
      const k = keyOf(), before = readOn(k);
      S.readLog[k] = before + 1;
      if (before < readGoalSec() && before + 1 >= readGoalSec()) {
        toast(`Tuyệt vời! Bạn đã đọc đủ ${S.readGoal} phút hôm nay 📚`);
        navigator.vibrate && navigator.vibrate([30, 60, 30]);
      }
      if (++R.n % 10 === 0) save();
    }
    updateReadUI();
  }
  function updateReadUI() {
    if (!R) return;
    const sec = readOn(keyOf()), g = readGoalSec(), met = sec >= g;
    $('#r-time', R.el).textContent = R.el.classList.contains('idle') ? 'Tạm dừng' : met ? `✓ ${mmss(sec)}` : `${mmss(sec)} / ${S.readGoal}:00`;
    const rp = $('#r-timer .rp', R.el), C = +rp.getAttribute('stroke-dasharray');
    rp.setAttribute('stroke-dashoffset', String(C * (1 - Math.min(sec / g, 1))));
    $('#r-timer', R.el).classList.toggle('met', met);
  }

  function readerClick(e) {
    const b = e.target.closest('[data-r]');
    if (!b || !R) return;
    const L = allReads().find((x) => x.id === R.id);
    switch (b.dataset.r) {
      case 'close': closeReader(); break;
      case 'font':
        S.readFont = S.readFont >= 21 ? 15 : S.readFont + 2;
        R.el.style.setProperty('--rfs', S.readFont + 'px'); save();
        toast(`Cỡ chữ: ${{ 15: 'Nhỏ', 17: 'Vừa', 19: 'Lớn', 21: 'Rất lớn' }[S.readFont] || S.readFont}`);
        break;
      case 'save':
        if (S.readSaved[L.id]) delete S.readSaved[L.id]; else S.readSaved[L.id] = Date.now();
        b.classList.toggle('on', !!S.readSaved[L.id]); save();
        toast(S.readSaved[L.id] ? 'Đã lưu vào mục Đã lưu' : 'Đã bỏ lưu');
        break;
      case 'task':
        S.tasks.push({ id: uid(), title: L.action, date: keyOf(), time: '', cat: 'personal', done: false });
        save(); b.disabled = true; b.innerHTML = `${ic('check')} Đã thêm vào việc hôm nay`;
        break;
      case 'done':
        S.readDone[L.id] = Date.now(); save();
        navigator.vibrate && navigator.vibrate(20);
        toast('Hoàn thành bài đọc ✓');
        $('#r-end', R.el).innerHTML = `<div class="r-done">${ic('check', 'stroke-width="3"')} Bạn đã hoàn thành bài này</div>
          <button class="btn btn-primary btn-block" data-r="next">${ic('arrowR')} Đọc bài tiếp theo</button>
          <p class="r-next-t">Bài sau: ${esc(nextLesson(L).title)}</p>`;
        break;
      case 'next': openReader(nextLesson(L).id); R.el.scrollTop = 0; break;
      case 'delete':
        if (confirm('Xóa bài đọc này?')) {
          S.customReads = S.customReads.filter((x) => x.id !== L.id);
          delete S.readDone[L.id]; delete S.readNotes[L.id]; delete S.readSaved[L.id];
          save(); closeReader(); toast('Đã xóa bài đọc');
        }
        break;
    }
  }

  function addReadSheet() {
    let cat = 'self';
    openSheet(`
      <h3>Thêm bài đọc của bạn</h3>
      <form id="rf" autocomplete="off">
        <label class="field"><span>Tiêu đề</span><input class="input" name="title" maxlength="100" required placeholder="Ví dụ: Ghi chép từ sách tháng này"></label>
        <div class="field"><span>Chủ đề</span><div class="chips" id="rcat">${Object.entries(RC).map(([id, c]) => `<button type="button" class="chip ${id === cat ? 'on' : ''}" data-c="${id}"><span class="cat-dot" style="--c:${c.color}"></span>${c.name}</button>`).join('')}</div></div>
        <label class="field"><span>Nội dung</span><textarea class="input" name="body" rows="7" required placeholder="Dán hoặc gõ nội dung. Để một dòng trống giữa các đoạn."></textarea></label>
        <label class="field"><span>Câu châm ngôn (không bắt buộc)</span><input class="input" name="qt" maxlength="200"></label>
        <label class="field"><span>Tác giả câu châm ngôn</span><input class="input" name="qa" maxlength="60"></label>
        <button class="btn btn-primary btn-block" type="submit">Lưu bài đọc</button>
      </form>`, (sh) => {
      $('#rcat', sh).addEventListener('click', (e) => {
        const c = e.target.closest('.chip'); if (!c) return;
        cat = c.dataset.c; $$('#rcat .chip', sh).forEach((x) => x.classList.toggle('on', x === c));
      });
      $('#rf', sh).addEventListener('submit', (e) => {
        e.preventDefault();
        const f = e.target;
        const body = f.body.value.split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean);
        if (!f.title.value.trim() || !body.length) return;
        const L = { id: 'u-' + uid(), custom: true, cat, title: f.title.value.trim(), body, quote: { t: f.qt.value.trim(), a: f.qa.value.trim() } };
        S.customReads.push(L); save(); closeSheet(); render();
        toast('Đã thêm vào thư viện');
      });
    });
  }

  // ================= Đợt 2 =================
  const HABIT_ICONS = ['🏃', '💪', '🧘', '📖', '💧', '🥗', '😴', '🚭', '🙏', '✍️', '🎸', '🧹', '💊', '🚶', '🌅', '📵', '🦷', '💰'];
  const HABIT_COLORS = ['#18a957', '#3a86b8', '#e5a50a', '#d6303a', '#8b5cf6', '#ec7a3c'];
  const HABIT_SUGGEST = [['Tập thể dục 20 phút', '🏃'], ['Thiền 5 phút', '🧘'], ['Ngủ trước 23 giờ', '😴'], ['Không điện thoại trước khi ngủ', '📵'], ['Ăn rau mỗi bữa', '🥗'], ['Dậy sớm', '🌅'], ['Viết nhật ký', '✍️'], ['Không thuốc lá', '🚭']];
  const EV_TYPES = { birthday: ['Sinh nhật', '🎂'], anniv: ['Kỷ niệm', '💍'], memorial: ['Ngày giỗ', '🕯️'], deadline: ['Hạn chót', '📌'], other: ['Sự kiện', '⭐'] };
  const MC_OUT = { food: ['Ăn uống', '🍜'], move: ['Đi lại', '🛵'], shop: ['Mua sắm', '🛍️'], bill: ['Hóa đơn', '💡'], health: ['Sức khỏe', '💊'], fun: ['Giải trí', '🎬'], family: ['Gia đình', '👪'], edu: ['Học tập', '📚'], gift: ['Hiếu hỷ', '🧧'], other: ['Khác', '📦'] };
  const MC_IN = { salary: ['Lương', '💰'], bonus: ['Thưởng', '🎁'], side: ['Thu nhập thêm', '💼'], oin: ['Khác', '💵'] };
  const SHIFT_TYPES = {
    d: { name: 'Trực ngày', short: 'N', color: '#e5a50a', time: '07:00–19:00' },
    n: { name: 'Trực đêm', short: 'Đ', color: '#4f5fd0', time: '19:00–07:00' },
    f: { name: 'Trực 24h', short: '24', color: '#d6303a', time: '07:00–07:00' },
    h: { name: 'Hành chính', short: 'HC', color: '#18a957', time: '07:30–17:00' },
    o: { name: 'Nghỉ', short: 'Nghỉ', color: '#8a9a90', time: '' },
  };
  const SHIFT_TPL = [['Ngày → Đêm → Nghỉ → Nghỉ', ['d', 'n', 'o', 'o']], ['Trực 24h, nghỉ 48h', ['f', 'o', 'o']], ['Hành chính T2–T6', ['h', 'h', 'h', 'h', 'h', 'o', 'o']], ['Ngày → Nghỉ', ['d', 'o']]];
  const LN = window.Lunar;
  const daysBetween = (a, b) => Math.round((dateOf(b) - dateOf(a)) / 864e5);
  const fmtDM = (k) => { const d = dateOf(k); return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`; };
  const cdText = (n) => (n === 0 ? 'hôm nay' : n === 1 ? 'ngày mai' : `còn ${n} ngày`);
  const shiftMonth = (mk, n) => { const [y, m] = mk.split('-').map(Number); const d = new Date(y, m - 1 + n, 1); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`; };

  // ----- Lịch âm -----
  const lunarCache = {};
  const lunarOf = (k) => lunarCache[k] || (lunarCache[k] = (() => { const d = dateOf(k); return LN.solar2lunar(d.getDate(), d.getMonth() + 1, d.getFullYear()); })());
  function holidaysOn(k) {
    const d = dateOf(k), l = lunarOf(k), out = [];
    const sh = LN.SOLAR_HOLIDAYS[`${d.getDate()}-${d.getMonth() + 1}`];
    if (sh) out.push(sh);
    if (!l.leap) {
      const lh = LN.LUNAR_HOLIDAYS[`${l.day}-${l.month}`];
      if (lh) out.push(lh);
      const t = lunarOf(addDays(k, 1));
      if (l.month === 12 && t.day === 1 && t.month === 1) out.push('Giao thừa');
    }
    return out;
  }
  const lunarShort = (k) => { const l = lunarOf(k); return l.day === 1 ? `1/${l.month}${l.leap ? 'N' : ''}` : String(l.day); };
  const lunarFull = (k) => {
    const l = lunarOf(k);
    return `${l.day <= 10 ? `Mùng ${l.day}` : `Ngày ${l.day}`} tháng ${LN.MONTH_NAMES[l.month - 1]}${l.leap ? ' (nhuận)' : ''} năm ${LN.canChiYear(l.year)}`;
  };
  const lunarToKey = (ld, lm, ly) => {
    const r = LN.lunar2solar(ld, lm, ly);
    if (!r) return null;
    let k = `${r[2]}-${pad(r[1])}-${pad(r[0])}`;
    if (ld === 30 && lunarOf(k).day !== 30) k = addDays(k, -1); // tháng thiếu: lùi về ngày 29
    return k;
  };

  // ----- Ngày quan trọng -----
  function evNext(e, from = keyOf()) {
    if (!e.yearly) {
      const k = e.lunar ? lunarToKey(e.ld, e.lm, e.year || lunarOf(from).year) : e.date;
      return k && k >= from ? k : null;
    }
    if (e.lunar) {
      const ly = lunarOf(from).year;
      for (const y of [ly, ly + 1]) { const k = lunarToKey(e.ld, e.lm, y); if (k && k >= from) return k; }
      return null;
    }
    const d0 = dateOf(e.date), m = d0.getMonth() + 1, fy = dateOf(from).getFullYear();
    for (const y of [fy, fy + 1]) {
      let d = d0.getDate();
      if (m === 2 && d === 29 && !(y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0))) d = 28;
      const k = `${y}-${pad(m)}-${pad(d)}`;
      if (k >= from) return k;
    }
    return null;
  }
  const eventsOn = (k) => S.events.filter((e) => evNext(e, k) === k);
  const evYears = (e, occ) => (!e.year ? 0 : e.lunar ? lunarOf(occ).year - e.year : dateOf(occ).getFullYear() - e.year);
  const evDateLabel = (e) => (e.lunar ? `${e.ld}/${e.lm} âm lịch` : e.yearly ? fmtDM(e.date) : `${fmtDM(e.date)}/${e.date.slice(0, 4)}`);
  const upcomingEvents = (days) => S.events.map((e) => ({ e, next: evNext(e) })).filter((x) => x.next && daysBetween(keyOf(), x.next) <= days).sort((a, b) => a.next.localeCompare(b.next));

  // ----- Thói quen -----
  const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];
  const hCount = (h, k) => (S.habitLog[h.id] || {})[k] || 0;
  const hDue = (h, k) => k >= h.created && (h.days || ALL_DAYS).includes(dateOf(k).getDay());
  const hDone = (h, k) => hCount(h, k) >= (h.target || 1);
  function hStreak(h) {
    let k = keyOf(), n = 0, guard = 0;
    if (hDue(h, k) && !hDone(h, k)) k = addDays(k, -1);
    while (k >= h.created && guard++ < 3650) {
      if (hDue(h, k)) { if (hDone(h, k)) n++; else break; }
      k = addDays(k, -1);
    }
    return n;
  }
  function hRate(h, n = 30) {
    let due = 0, done = 0;
    for (let i = 0; i < n; i++) {
      const k = addDays(keyOf(), -i);
      if (k < h.created) break;
      if (!hDue(h, k) || (i === 0 && !hDone(h, k))) continue;
      due++; if (hDone(h, k)) done++;
    }
    return due ? Math.round((done / due) * 100) : 0;
  }
  function hTap(h, k = keyOf()) {
    const log = (S.habitLog[h.id] = S.habitLog[h.id] || {});
    const prev = log[k] || 0, t = h.target || 1;
    if (prev >= t) {
      delete log[k]; save(); render();
      toast(`Đã bỏ đánh dấu “${h.name}”`, { fn: () => { log[k] = prev; save(); render(); } });
      return;
    }
    log[k] = prev + 1; save(); render();
    if (log[k] === t) {
      const due = S.habits.filter((x) => hDue(x, k));
      if (due.every((x) => hDone(x, k))) celebrate('Hoàn thành mọi thói quen hôm nay! 🔥');
      else if (navigator.vibrate) navigator.vibrate(12);
    }
  }
  const habitRing = (h, k, size = 56) =>
    `<span class="h-ring" style="--hc:${h.color}">${ring(Math.min(hCount(h, k) / (h.target || 1), 1), size, 4)}<em>${h.icon}</em>${hDone(h, k) ? `<i class="h-ok">${ic('check', 'stroke-width="3.4"')}</i>` : ''}</span>`;
  function habitStripHTML() {
    const k = keyOf(), due = S.habits.filter((h) => hDue(h, k));
    if (!due.length) return '';
    const n = due.filter((h) => hDone(h, k)).length;
    return `<div class="section-head"><h3>Thói quen hôm nay</h3><button class="link" data-act="go" data-to="habits">${n}/${due.length} ${ic('chevR')}</button></div>
      <div class="h-strip">${due.map((h) => `<button class="h-chip ${hDone(h, k) ? 'done' : ''}" data-act="habit-tap" data-hid="${h.id}" aria-label="${esc(h.name)}">${habitRing(h, k)}<span>${esc(h.name)}</span>${(h.target || 1) > 1 ? `<small>${hCount(h, k)}/${h.target}</small>` : ''}</button>`).join('')}</div>`;
  }

  // ----- Thu chi -----
  const fmtVND = (n) => `${Math.round(n).toLocaleString('vi-VN')} ₫`;
  const fmtShort = (n) => (n >= 1e6 ? `${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, '').replace('.', ',')}tr` : n >= 1e3 ? `${Math.round(n / 1e3)}k` : `${n}đ`);
  const sumType = (arr, type) => arr.filter((x) => x.type === type).reduce((a, x) => a + x.amt, 0);

  // ----- Lịch trực -----
  function shiftOn(k) {
    const sh = S.shift;
    if (!sh || !sh.on || sh.mode === 'week' || !sh.cycle.length) return null;
    const ov = S.shiftOv[k];
    if (ov && SHIFT_TYPES[ov]) return { id: ov, ...SHIFT_TYPES[ov], ov: true };
    const diff = daysBetween(sh.start, k), n = sh.cycle.length;
    const id = sh.cycle[((diff % n) + n) % n];
    return { id, ...SHIFT_TYPES[id] };
  }

  // ----- Lịch trực theo tuần (lịch công bố hằng tuần) -----
  const DUTY_COLORS = ['#3a86b8', '#4f5fd0', '#e5a50a', '#d6303a', '#18a957', '#8b5cf6', '#ec7a3c'];
  const toMin = (t) => { const [h, m] = String(t || '0:0').split(':').map(Number); return (h || 0) * 60 + (m || 0); };
  const shiftDur = (sf) => { let d = toMin(sf.end) - toMin(sf.start); if (d <= 0) d += 1440; return d; };
  const fmtHours = (min) => `${Math.floor(min / 60)}${min % 60 ? `h${pad(min % 60)}` : ''}`;
  const fmtLeft = (ms) => { const m = Math.max(1, Math.round(ms / 6e4)); return m >= 60 ? `${Math.floor(m / 60)} giờ${m % 60 ? ` ${m % 60} phút` : ''}` : `${m} phút`; };
  const posOf = (id) => S.duty.positions.find((p) => p.id === id);
  function entryInfo(e) {
    const p = posOf(e.pos), sf = p && p.shifts.find((x) => x.id === e.shift);
    if (!p || !sf) return null;
    const nextDay = toMin(sf.start) < toMin(S.duty.dayStart);
    const start = dateOf(e.date).getTime() + (toMin(sf.start) + (nextDay ? 1440 : 0)) * 6e4;
    return { e, p, s: sf, id: e.id, color: p.color, label: `${p.name} · ${sf.name}`, short: sf.name.replace(/^Ca\s*/i, 'C').slice(0, 4), time: `${sf.start}–${sf.end}`, nextDay, start, end: start + shiftDur(sf) * 6e4, off: false };
  }
  const entriesOn = (k) => S.duty.entries.filter((e) => e.date === k).map(entryInfo).filter(Boolean).sort((a, b) => a.start - b.start);
  const isNight = (x) => { const a = toMin(x.s.start) + (x.nextDay ? 1440 : 0), b = a + shiftDur(x.s); return (a < 300 && b > 0) || (a < 1740 && b > 1440); };
  function dutyOf(k) {
    if (!S.shift.on) return [];
    if (S.shift.mode === 'cycle') { const c = shiftOn(k); return c ? [{ label: c.name, short: c.short, color: c.color, time: c.time, off: c.id === 'o', cyc: true, ov: c.ov }] : []; }
    return entriesOn(k);
  }
  const nearDuty = () => { const t = keyOf(); return [addDays(t, -1), t, addDays(t, 1)].flatMap(entriesOn).filter((x) => x.end > Date.now()).sort((a, b) => a.start - b.start); };
  function dutyReminder() {
    if (!S.shift.on || S.shift.mode !== 'week' || !S.duty.remind || !S.duty.positions.length) return null;
    const today = keyOf(), dow = dateOf(today).getDay(), mon = mondayOf(today);
    const hasWeek = (m) => S.duty.entries.some((e) => e.date >= m && e.date <= addDays(m, 6));
    if (dow === 0 && !hasWeek(addDays(mon, 7))) return { mon: addDays(mon, 7), title: 'Lịch trực tuần tới đã công bố?', sub: `Nhập ca của bạn cho tuần ${fmtDM(addDays(mon, 7))} – ${fmtDM(addDays(mon, 13))}` };
    if (dow >= 1 && dow <= 2 && !hasWeek(mon)) return { mon, title: 'Chưa có lịch trực tuần này', sub: `Nhập ca của bạn cho tuần ${fmtDM(mon)} – ${fmtDM(addDays(mon, 6))}` };
    return null;
  }
  function dutyNotes() {
    const out = [];
    if (!S.shift.on) return out;
    if (S.shift.mode === 'cycle') {
      if (new Date().getHours() >= 17) { const t = shiftOn(addDays(keyOf(), 1)); if (t && t.id !== 'o') out.push({ badge: t.short, color: t.color, title: `Ngày mai: ${t.name}`, sub: t.time || '' }); }
      return out;
    }
    const now = Date.now(), near = nearDuty();
    const cur = near.find((x) => x.start <= now);
    if (cur) out.push({ quiet: true, badge: cur.short, color: cur.color, title: `Đang trực: ${cur.label}`, sub: `${cur.time} · còn ${fmtLeft(cur.end - now)}` });
    const nx = near.find((x) => x.start > now && x.start - now <= 12 * 3600e3);
    if (nx) out.push({ badge: nx.short, color: nx.color, title: `Sắp vào ca: ${nx.label}`, sub: `Lúc ${nx.s.start}${keyOf(new Date(nx.start)) === keyOf() ? ' hôm nay' : ' ngày mai'} · còn ${fmtLeft(nx.start - now)}` });
    S.duty.entries.filter((e) => e.swap && !e.reported && e.date >= addDays(keyOf(), -1)).map(entryInfo).filter(Boolean)
      .forEach((x) => out.push({ badge: '!', color: '#d6303a', title: 'Đổi ca chưa báo cáo Ban Giám đốc', sub: `${x.label} · ${dayLabel(x.e.date)}`, entry: x.e.id }));
    const r = dutyReminder();
    if (r) out.push({ badge: '📅', color: '#3a86b8', title: r.title, sub: r.sub, week: r.mon });
    return out;
  }
  function heroDutyChip() {
    if (!S.shift.on) return '';
    const chip = (c, txt) => `<button class="shift-chip" data-act="go" data-to="shift" style="--c:${c}"><i></i>${txt}</button>`;
    if (S.shift.mode === 'cycle') { const sf = shiftOn(keyOf()); return sf ? chip(sf.color, `${sf.name}${sf.time ? ` · ${sf.time}` : ''}`) : ''; }
    const now = Date.now(), near = nearDuty();
    const cur = near.find((x) => x.start <= now);
    const nx = near.find((x) => x.start > now && x.start - now < 18 * 3600e3);
    const x = cur || nx;
    if (!x) return '';
    return chip(x.color, cur ? `Đang trực · ${esc(x.label)} · đến ${x.s.end}` : `Ca tới · ${esc(x.label)} · ${x.s.start} ${keyOf(new Date(x.start)) === keyOf() ? 'hôm nay' : 'ngày mai'}`);
  }
  function dutyNowCard() {
    if (!S.shift.on || S.shift.mode !== 'week') return '';
    const now = Date.now(), cur = nearDuty().find((x) => x.start <= now);
    if (!cur || !(cur.p.checklist || []).length) return '';
    const done = cur.e.checks || [];
    return `<div class="duty-now glass" style="--c:${cur.color}">
      <div class="dn-h"><span class="dn-dot"></span><b>Đang trực · ${esc(cur.label)}</b><span>${done.length}/${cur.p.checklist.length}</span></div>
      <div class="dn-sub">${cur.time} · còn ${fmtLeft(cur.end - now)}</div>
      <div class="dn-list">${cur.p.checklist.map((t, i) => `<button class="sub ${done.includes(i) ? 'on' : ''}" data-act="duty-check" data-id="${cur.e.id}" data-i="${i}"><span class="sub-c">${ic('check', 'stroke-width="3.2"')}</span>${esc(t)}</button>`).join('')}</div>
    </div>`;
  }
  // Đọc đoạn "Thời gian ca trực": dòng tên vị trí, sau đó các ca "Ca 1: Từ 7h30 đến 13h; Ca 2: ..."
  function parseShiftText(txt) {
    const out = [];
    let cur = null;
    const re = /Ca\s*(\d+)\s*[:：.]?\s*(?:từ\s*)?(\d{1,2})\s*(?:h|giờ|:)\s*(\d{1,2})?\s*(?:đến|tới|-|–)\s*(\d{1,2})\s*(?:h|giờ|:)\s*(\d{1,2})?/gi;
    String(txt).split(/\r?\n/).forEach((line) => {
      const l = line.trim();
      if (!l) return;
      const ms = [...l.matchAll(re)];
      if (!ms.length) {
        const name = l.replace(/^[-–•+*\s]+/, '').replace(/[:：]\s*$/, '').trim();
        if (name && name.length <= 60 && !/^\d+\s*[.)]/.test(name)) { cur = { name, shifts: [] }; out.push(cur); }
        return;
      }
      if (!cur) { cur = { name: 'Vị trí trực', shifts: [] }; out.push(cur); }
      ms.forEach((m) => {
        const hh = (h, mm) => `${pad(Math.min(23, +h))}:${pad(Math.min(59, +(mm || 0)))}`;
        cur.shifts.push({ name: `Ca ${m[1]}`, start: hh(m[2], m[3]), end: hh(m[4], m[5]) });
      });
    });
    return out.filter((p) => p.shifts.length);
  }
  const defaultDutyWeek = () => { const t = keyOf(); return dateOf(t).getDay() === 0 ? addDays(mondayOf(t), 7) : mondayOf(t); };

  // ---------- Views ----------
  function viewHome() {
    const today = keyOf();
    const list = tasksOn(today);
    const total = list.length;
    const done = list.filter((t) => t.done).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const f = fmtDur(focusOn(today) + runningElapsed());
    const hasNotif = upcoming().length > 0 || overdueList().length > 0 || readLeftMin() > 0 || upcomingEvents(3).length > 0 || dutyNotes().some((x) => !x.quiet);

    let title = 'Bắt đầu thôi!', sub = 'Thêm việc đầu tiên cho hôm nay nhé.';
    if (total) {
      if (pct === 100) { title = 'Tuyệt vời! 🎉'; sub = 'Bạn đã hoàn thành mọi việc hôm nay.'; }
      else if (pct >= 50) { title = 'Cố lên nào!'; sub = `Bạn đã đi được ${pct}% chặng đường hôm nay.`; }
      else if (pct > 0) { title = 'Khởi đầu tốt!'; sub = `Còn ${total - done} việc nữa là xong mục tiêu.`; }
      else { title = 'Sẵn sàng chưa?'; sub = `Hôm nay có ${total} việc đang chờ bạn.`; }
    }

    const topKeys = top3Keys();
    const topTasks = topKeys.map((key) => list.find((t) => tkey(t) === key)).filter(Boolean);
    const rest = list.filter((t) => !topKeys.includes(tkey(t)));
    const od = S.tasks.filter((t) => !t.repeat && !t.done && t.date < today).sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || '')));
    const undone = list.filter((t) => !t.done).length;
    const hr = new Date().getHours();
    const jt = S.journal[today] || {};
    const w = waterOn(today);
    return `
      <div class="topbar">
        <button class="icon-btn glass" data-act="search" aria-label="Tìm kiếm">${ic('search')}</button>
        <button class="icon-btn glass" data-act="notif" aria-label="Thông báo">${ic('bell')}${hasNotif ? '<span class="dot"></span>' : ''}</button>
      </div>
      <section class="hero">
        <div>
          <p class="hello-sub">${greeting()}</p>
          <h1 class="hello">Xin chào, ${esc(S.name || 'bạn')} <span class="wave">👋</span></h1>
          <p class="tagline">${esc(S.tagline || '')}</p>
          ${heroDutyChip()}
        </div>
        <button data-act="go-profile" aria-label="Trang cá nhân">${avatarHTML()}</button>
      </section>

      <section class="stats">
        <button class="stat glass" data-act="go-analytics">
          <span class="stat-ic ic-green">${ic('bars', 'stroke-width="2.6"')}</span>
          <span class="stat-val">${weekDone()}</span>
          <span class="stat-lbl">Việc tuần này</span>
        </button>
        <button class="stat glass" data-act="focus">
          <span class="stat-ic ic-gold">${ic('clock', 'stroke-width="2.4"')}</span>
          <span class="stat-val" id="focus-stat">${f.h}<small>h</small>${pad(f.m)}<small>m</small></span>
          <span class="stat-lbl">${S.timer && S.timer.endsAt ? 'Đang chạy…' : 'Tập trung'}</span>
        </button>
        <button class="stat glass" data-act="go-analytics">
          <span class="stat-ic ic-red">${ic('flame', 'stroke-width="2.2"')}</span>
          <span class="stat-val">${streak()}</span>
          <span class="stat-lbl">Ngày liên tục</span>
        </button>
      </section>

      <button class="goal" data-act="go-analytics">
        <svg class="mtn" viewBox="0 0 230 140" aria-hidden="true">
          <defs>
            <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#d4f8e0" stop-opacity=".1"/></linearGradient>
            <linearGradient id="mg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a7a3a" stop-opacity=".9"/><stop offset="1" stop-color="#2fc06b" stop-opacity="0"/></linearGradient>
          </defs>
          <path d="M60 140 140 34l20 18 18-14 52 102z" fill="url(#mg2)"/>
          <path d="M140 34l-14 18 10-3 8 9 6-12 10 6z" fill="url(#mg)"/>
          <path d="M0 140 70 80l30 22 40-30 90 68z" fill="#076b33" opacity=".35"/>
        </svg>
        <div class="goal-tag"><span class="ring">${ic('target', 'stroke-width="2.4"')}</span>Mục tiêu hôm nay</div>
        <h2>${title}</h2>
        <p>${sub}</p>
        <span class="goal-arrow">${ic('chevR', 'stroke-width="2.6"')}</span>
        <div class="goal-progress">
          <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><i data-w="${pct}"></i></div>
          <span>${pct}%</span>
        </div>
      </button>

      <section class="daily">
        <div class="water glass">
          <span class="w-ic">${ic('drop')}</span>
          <div class="w-body">
            <div class="w-top"><b>${w}</b><span>/ ${S.waterGoal} ly nước</span>${w >= S.waterGoal ? '<em>Đủ rồi 💧</em>' : ''}</div>
            <div class="cups">${Array.from({ length: Math.max(S.waterGoal, w) }, (_, i) => `<i class="${i < w ? 'on' : ''}"></i>`).join('')}</div>
          </div>
          <button class="w-btn ghost" data-act="water-minus" aria-label="Bớt 1 ly">${ic('minus', 'stroke-width="2.6"')}</button>
          <button class="w-btn" data-act="water-plus" aria-label="Thêm 1 ly">${ic('plus', 'stroke-width="2.6"')}</button>
        </div>
        <div class="mood glass">
          <div class="mood-h"><span>Hôm nay bạn thấy thế nào?</span><button class="link" data-act="go-journal">${ic('journal')} Nhật ký</button></div>
          <div class="moods">${MOODS.map((m, i) => `<button class="${jt.mood === i + 1 ? 'on' : ''}" data-act="mood" data-v="${i + 1}" aria-label="${m.l}" title="${m.l}">${m.e}</button>`).join('')}</div>
          ${jt.mood ? `<button class="mood-note" data-act="review">${jt.note ? `“${esc(jt.note)}”` : `${ic('edit')} Viết một dòng cho hôm nay…`}</button>` : ''}
        </div>
      </section>

      ${(() => {
        const hol = holidaysOn(today), evs = upcomingEvents(7).slice(0, 2);
        if (!hol.length && !evs.length) return '';
        return `<div class="soon">${hol.map((h) => `<button class="soon-i glass" data-act="go" data-to="lunar"><span class="soon-e">🎌</span><span><b>${h}</b><span>Hôm nay · ${lunarFull(today)}</span></span></button>`).join('')}
          ${evs.map(({ e, next }) => { const n = daysBetween(today, next), y = evYears(e, next); return `<button class="soon-i glass ${n === 0 ? 'hot' : ''}" data-act="event-edit" data-eid="${e.id}"><span class="soon-e">${EV_TYPES[e.type][1]}</span><span><b>${esc(e.title)}</b><span>${n === 0 ? 'Hôm nay' : n === 1 ? 'Ngày mai' : `Còn ${n} ngày`} · ${fmtDM(next)}${y > 0 && e.type === 'birthday' ? ` · tròn ${y} tuổi` : ''}</span></span></button>`; }).join('')}</div>`;
      })()}

      ${(() => { const r = dutyReminder(); return r ? `<button class="prompt glass" data-act="duty-week" data-mon="${r.mon}"><span class="pi duty">${ic('calendar')}</span><span class="pt"><b>${r.title}</b><span>${r.sub}</span></span>${ic('chevR')}</button>` : ''; })()}
      ${dutyNowCard()}

      ${habitStripHTML()}

      ${readCardHTML()}

      ${hr >= 18 && !jt.reviewed ? `<button class="prompt glass" data-act="review"><span class="pi night">${ic('moon')}</span><span class="pt"><b>Tổng kết ngày</b><span>3 câu hỏi ngắn để nhìn lại hôm nay</span></span>${ic('chevR')}</button>` : ''}

      ${topTasks.length ? `<div class="section-head"><h3 class="h-ic"><span class="star">${ic('star')}</span>Top 3 hôm nay</h3><button class="link" data-act="pick-top3">Chỉnh sửa</button></div>
      <div class="tasks top3">${topTasks.map((t) => taskHTML(t)).join('')}</div>`
      : undone >= 2 ? `<button class="prompt glass" data-act="pick-top3"><span class="pi">${ic('star')}</span><span class="pt"><b>Chọn Top 3 hôm nay</b><span>3 việc quan trọng nhất cần làm trước</span></span>${ic('chevR')}</button>` : ''}

      <div class="section-head">
        <h3>Việc của tôi</h3>
        ${rollCandidates().length ? `<button class="link" data-act="roll">${ic('arrowR')} Dời sang mai</button>` : `<button class="link" data-act="see-all">Xem lịch ${ic('chevR')}</button>`}
      </div>
      ${list.length || od.length ? groupedHTML(rest, od) : emptyHTML('Hôm nay chưa có việc nào', 'Thêm việc')}`;
  }

  function groupedHTML(list, od) {
    const g = { am: [], pm: [], eve: [], any: [], done: [] };
    list.forEach((t) => {
      if (t.done) g.done.push(t);
      else if (!t.time) g.any.push(t);
      else if (t.time < '12:00') g.am.push(t);
      else if (t.time < '18:00') g.pm.push(t);
      else g.eve.push(t);
    });
    const sec = (cls, title, items, showDate) => items.length
      ? `<div class="group ${cls}"><div class="group-h">${title}<span>${items.length}</span></div><div class="tasks">${items.map((t) => taskHTML(t, showDate)).join('')}</div></div>` : '';
    return sec('od', `${ic('alert')} Quá hạn`, od, true)
      + sec('', `${ic('sun')} Buổi sáng`, g.am) + sec('', `${ic('clock')} Buổi chiều`, g.pm)
      + sec('', `${ic('moon')} Buổi tối`, g.eve) + sec('', `${ic('list')} Trong ngày`, g.any)
      + (g.done.length ? `<div class="group done-g"><button class="group-h" data-act="show-done" aria-expanded="${ui.showDone}">${ic('check')} Đã xong<span>${g.done.length}</span><i class="chev ${ui.showDone ? 'up' : ''}">${ic('chevR')}</i></button>
        ${ui.showDone ? `<div class="tasks">${g.done.map((t) => taskHTML(t)).join('')}</div>` : ''}</div>` : '');
  }

  const subHead = (title, sub) => `<div class="sub-head"><button class="icon-btn glass" data-act="go-back" aria-label="Quay lại">${ic('chevL')}</button>
    <div><h1 class="page-title">${title}</h1>${sub ? `<p class="page-sub">${sub}</p>` : ''}</div></div>`;

  function viewJournal() {
    const today = keyOf();
    const days = Array.from({ length: 35 }, (_, i) => addDays(mondayOf(today), i - 28));
    const moods = days.map((k) => (S.journal[k] || {}).mood || 0);
    const rated = days.filter((k) => k <= today).map((k) => (S.journal[k] || {}).mood).filter(Boolean);
    const avg = rated.length ? rated.reduce((a, b) => a + b, 0) / rated.length : 0;
    const entries = Object.keys(S.journal).filter((k) => { const j = S.journal[k]; return j.mood || j.note || j.good || j.better || j.tomorrow; }).sort().reverse();
    const qa = (q, a) => (a ? `<div class="qa"><span>${q}</span><p>${esc(a)}</p></div>` : '');
    return `${subHead('Nhật ký', 'Tâm trạng và những dòng ghi chép mỗi ngày.')}
      <div class="card glass">
        <div class="card-head"><h4>Tâm trạng 5 tuần qua</h4><span>${rated.length ? `Trung bình ${MOODS[Math.round(avg) - 1].e} ${MOODS[Math.round(avg) - 1].l}` : 'Chưa có dữ liệu'}</span></div>
        <div class="mood-grid">${['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => `<b>${d}</b>`).join('')}
          ${days.map((k, i) => `<span class="md ${k === today ? 'today' : ''} ${k > today ? 'future' : ''}" title="${dayLabel(k)}">${moods[i] ? MOODS[moods[i] - 1].e : dateOf(k).getDate()}</span>`).join('')}</div>
      </div>
      <button class="btn btn-primary btn-block" data-act="review" style="margin-bottom:22px">${ic('moon')} ${S.journal[today] && S.journal[today].reviewed ? 'Sửa tổng kết hôm nay' : 'Tổng kết hôm nay'}</button>
      ${entries.length ? entries.map((k) => {
        const j = S.journal[k];
        return `<button class="entry glass" data-act="review" data-day="${k}">
          <div class="entry-h"><span class="entry-m">${j.mood ? MOODS[j.mood - 1].e : '📝'}</span><b>${dayLabel(k)}</b><span>${pad(dateOf(k).getDate())}/${pad(dateOf(k).getMonth() + 1)}/${dateOf(k).getFullYear()}</span></div>
          ${j.note ? `<p class="entry-note">“${esc(j.note)}”</p>` : ''}
          ${qa('Làm tốt', j.good)}${qa('Cần tốt hơn', j.better)}${qa('Ưu tiên ngày mai', j.tomorrow)}
        </button>`;
      }).join('') : `<div class="empty glass"><div class="big">📓</div>Chưa có trang nhật ký nào.<br>Chọn tâm trạng ở trang chủ để bắt đầu.</div>`}`;
  }

  const pageHead = (title, sub) => `<div class="page-head"><div><h1 class="page-title">${title}</h1><p class="page-sub">${sub}</p></div>
    <button class="head-avatar" data-act="go-profile" aria-label="Trang cá nhân">${avatarHTML('sm')}</button></div>`;

  const emptyHTML = (msg, cta) => `<div class="empty glass"><div class="big">🌤️</div>${msg}${cta ? `<div><button class="btn btn-ghost" data-act="add">${ic('plus')} ${cta}</button></div>` : ''}</div>`;

  function viewCalendar() {
    const mon = ui.calWeek;
    const days = Array.from({ length: 7 }, (_, i) => addDays(mon, i));
    const today = keyOf();
    const mid = dateOf(days[3]);
    const list = tasksOn(ui.calSel).sort(byDoneTime);
    const doneN = list.filter((t) => t.done).length;
    return `
      ${pageHead('Lịch', 'Sắp xếp kế hoạch theo từng ngày.')}
      <div class="cal-head">
        <span class="month">Tháng ${mid.getMonth() + 1}, ${mid.getFullYear()}</span>
        <div class="cal-nav">
          <button class="icon-btn glass" data-act="week-prev" aria-label="Tuần trước">${ic('chevL')}</button>
          <button class="link" data-act="week-today" style="padding:0 6px">Hôm nay</button>
          <button class="icon-btn glass" data-act="week-next" aria-label="Tuần sau">${ic('chevR')}</button>
        </div>
      </div>
      <div class="week glass">
        ${days.map((k) => {
          const d = dateOf(k);
          const n = Math.min(tasksOn(k).length, 3), ds = dutyOf(k), sf = ds.length ? { color: ds[0].color, short: ds.length > 1 ? `${ds.length} ca` : ds[0].short } : null, special = holidaysOn(k).length || eventsOn(k).length;
          return `<button class="day ${k === today ? 'today' : ''} ${k === ui.calSel ? 'sel' : ''}" data-act="pick-day" data-day="${k}" aria-label="${dayLabel(k)}">
            ${WD[d.getDay()]}<b>${d.getDate()}</b><small class="lu ${lunarOf(k).day === 1 || lunarOf(k).day === 15 ? 'key' : ''}">${lunarShort(k)}</small>
            ${sf ? `<span class="shb" style="--c:${sf.color}">${sf.short}</span>` : ''}<span class="dots">${special ? '<i class="evd"></i>' : ''}${'<i></i>'.repeat(n)}</span></button>`;
        }).join('')}
      </div>
      ${(() => {
        const k = ui.calSel, ds = dutyOf(k);
        return `<div class="day-info">
          <button class="di lu" data-act="go" data-to="lunar">🌙 ${lunarFull(k)}</button>
          ${holidaysOn(k).map((h) => `<span class="di hol">🎌 ${h}</span>`).join('')}
          ${eventsOn(k).map((e) => `<button class="di ev" data-act="event-edit" data-eid="${e.id}">${EV_TYPES[e.type][1]} ${esc(e.title)}</button>`).join('')}
          ${ds.map((x) => `<button class="di sh" ${x.cyc ? `data-act="shift-day" data-day="${k}"` : `data-act="duty-edit" data-id="${x.id}"`} style="--c:${x.color}"><i></i>${esc(x.label)}${x.time ? ` · ${x.time}` : ''}${x.nextDay ? ' (rạng sáng hôm sau)' : ''}${x.ov || (x.e && x.e.swap) ? ' (đổi ca)' : ''}</button>`).join('')}
        </div>`;
      })()}
      <div class="section-head">
        <h3>${dayLabel(ui.calSel)}</h3>
        <span class="page-sub" style="margin:0">${list.length ? `${doneN}/${list.length} hoàn thành` : ''}</span>
      </div>
      <div class="tasks">${list.length ? list.map((t) => taskHTML(t, true)).join('') : emptyHTML('Không có việc nào trong ngày này', 'Thêm việc')}</div>`;
  }

  function viewAnalytics() {
    const today = keyOf();
    const days = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));
    const doneArr = days.map(doneOn);
    const focusArr = days.map((k) => Math.round((focusOn(k) + (k === today ? runningElapsed() : 0)) / 60));
    const readArr = days.map((k) => Math.round(readOn(k) / 60));
    const planned = days.flatMap(tasksOn);
    const rate = planned.length ? Math.round((planned.filter((t) => t.done).length / planned.length) * 100) : 0;
    const focusTot = fmtDur(focusArr.reduce((a, b) => a + b, 0) * 60);
    const totalDone = S.tasks.reduce((n, t) => n + (t.repeat ? Object.keys(t.doneDates || {}).length : t.done ? 1 : 0), 0);
    const last30 = Array.from({ length: 30 }, (_, i) => addDays(today, i - 29)).flatMap(tasksOn);

    const barChart = (arr, cls, unit) => {
      const max = Math.max(...arr, 1);
      return `<div class="bars ${cls}">${arr.map((v, i) => {
        const k = days[i];
        return `<div class="bar-col ${k === today ? 'today' : ''}"><span class="val">${v}${unit}</span><div class="b" style="height:${Math.max((v / max) * 100, 4)}%"></div><span class="lbl">${WD[dateOf(k).getDay()]}</span></div>`;
      }).join('')}</div>`;
    };

    const catRows = Object.entries(CATS).map(([id, c]) => {
      const all = last30.filter((t) => t.cat === id);
      const d = all.filter((t) => t.done).length;
      const p = all.length ? Math.round((d / all.length) * 100) : 0;
      if (!all.length) return '';
      return `<div class="cat-row"><span class="name"><span class="cat-dot" style="--c:${c.color}"></span>${c.name}</span>
        <div class="bar" style="--c:${c.color}"><i data-w="${p}"></i></div><span class="pct">${d}/${all.length}</span></div>`;
    }).join('');

    return `
      ${subHead('Thống kê', 'Nhìn lại 7 ngày gần nhất của bạn.')}
      <div class="kpis">
        <div class="kpi glass"><span class="stat-ic ic-green">${ic('target', 'stroke-width="2.4"')}</span><div class="v">${rate}<small>%</small></div><div class="l">Tỉ lệ hoàn thành</div></div>
        <div class="kpi glass"><span class="stat-ic ic-gold">${ic('clock', 'stroke-width="2.4"')}</span><div class="v">${focusTot.h}<small>h</small> ${pad(focusTot.m)}<small>m</small></div><div class="l">Thời gian tập trung</div></div>
        <div class="kpi glass"><span class="stat-ic ic-red">${ic('flame', 'stroke-width="2.2"')}</span><div class="v">${bestStreak()}<small> ngày</small></div><div class="l">Chuỗi dài nhất</div></div>
        <div class="kpi glass"><span class="stat-ic ic-green">${ic('check', 'stroke-width="3"')}</span><div class="v">${totalDone}</div><div class="l">Tổng việc đã xong</div></div>
      </div>
      <div class="card glass"><div class="card-head"><h4>Việc hoàn thành</h4><span>${doneArr.reduce((a, b) => a + b, 0)} việc</span></div>${barChart(doneArr, '', '')}</div>
      <div class="card glass"><div class="card-head"><h4>Phút tập trung</h4><span>${focusArr.reduce((a, b) => a + b, 0)} phút</span></div>${barChart(focusArr, 'gold', '')}</div>
      <div class="card glass"><div class="card-head"><h4>Phút đọc sách</h4><span>${readArr.reduce((a, b) => a + b, 0)} phút · mục tiêu ${S.readGoal}/ngày</span></div>${barChart(readArr, 'blue', '')}</div>
      <div class="card glass"><div class="card-head"><h4>Theo danh mục</h4><span>30 ngày qua</span></div>${catRows || '<p class="page-sub" style="margin:0">Chưa có dữ liệu.</p>'}</div>
      <button class="btn btn-primary btn-block" data-act="focus">${ic('play')} Bắt đầu phiên tập trung</button>`;
  }

  function viewRead() {
    const all = allReads(), sec = readOn(keyOf());
    const L = todayLesson(), feat = featuredLesson();
    const doneN = all.filter((x) => S.readDone[x.id]).length;
    const totalMin = Math.round(Object.values(S.readLog).reduce((a, b) => a + b, 0) / 60);
    const q = quoteOfDay(ui.quoteOff);
    const f = ui.readCat;
    const list = all.filter((x) => f === 'all' || (f === 'saved' ? S.readSaved[x.id] : x.cat === f));
    const notes = all.filter((x) => (S.readNotes[x.id] || '').trim());
    const fc = feat && (RC[feat.cat] || RC.self);
    const chips = [['all', 'Tất cả'], ...Object.entries(RC).map(([id, c]) => [id, c.name]), ['saved', 'Đã lưu']];
    const row = (x) => {
      const c = RC[x.cat] || RC.self, i = all.indexOf(x) + 1, done = !!S.readDone[x.id];
      return `<button class="lesson glass ${done ? 'read' : ''}" style="--c:${c.color}" data-act="open-read" data-id="${x.id}">
        <span class="ln">${done ? ic('check', 'stroke-width="3"') : x.custom ? ic('edit') : i}</span>
        <span><span class="lt">${esc(x.title)}</span><span class="lm"><span class="cat-dot" style="--c:${c.color}"></span>${c.name} · ${readMins(x)} phút</span></span>
        <span class="lb">${S.readSaved[x.id] ? ic('bookmark') : ''}</span></button>`;
    };
    return `${pageHead('Đọc mỗi ngày', `${S.readGoal} phút mỗi ngày, tốt hơn hôm qua.`)}
      <section class="read-hero glass">
        <div class="rh-ring">${ring(sec / readGoalSec(), 118, 11)}<div class="rh-txt"><b>${Math.floor(sec / 60)}</b><span>/ ${S.readGoal} phút</span></div></div>
        <div class="rh-stats">
          <div><b>${readStreak()} ${ic('flame')}</b><span>ngày đạt mục tiêu liên tục</span></div>
          <div><b>${doneN}/${all.length}</b><span>bài đã đọc</span></div>
          <div><b>${totalMin}</b><span>phút đã đọc</span></div>
        </div>
      </section>
      <button class="quote-card" data-act="next-quote">
        <span class="qc-lbl">${ic('quote')} Châm ngôn hôm nay</span>
        <span class="qc-t">“${esc(q.t)}”</span>
        <span class="qc-a">— ${esc(q.a)}</span>
        <span class="qc-hint">Chạm để xem câu khác</span>
      </button>
      ${feat ? `<div class="section-head"><h3>${L && S.readDone[L.id] ? 'Đọc tiếp' : 'Bài hôm nay'}</h3></div>
      <button class="lesson-feat glass" data-act="open-read" data-id="${feat.id}">
        <span class="r-cat" style="--c:${fc.color}">${fc.name}</span>
        <h4>${esc(feat.title)}</h4>
        <p>${esc(feat.body.find((p) => !p.startsWith('## ') && !p.startsWith('• ')) || '')}</p>
        <span class="lf-foot"><span>${ic('clock')} Khoảng ${readMins(feat)} phút</span><span class="btn btn-primary">${ic('book')} Đọc ngay</span></span>
      </button>` : ''}
      <div class="section-head"><h3>Thư viện</h3><button class="link" data-act="add-read">${ic('plus')} Thêm bài</button></div>
      <div class="chip-row">${chips.map(([id, n]) => `<button class="chip ${f === id ? 'on' : ''}" data-act="read-cat" data-cat="${id}">${n}</button>`).join('')}</div>
      <div class="lessons">${list.length ? list.map(row).join('') : `<div class="empty glass"><div class="big">📚</div>${f === 'saved' ? 'Chưa có bài nào được lưu.<br>Bấm biểu tượng dấu trang khi đọc để lưu.' : 'Chưa có bài trong mục này.'}</div>`}</div>
      ${notes.length ? `<div class="section-head"><h3>Ghi chú của tôi</h3></div>
      ${notes.map((x) => `<button class="note glass" data-act="open-read" data-id="${x.id}"><b>${esc(x.title)}</b><p>${esc(S.readNotes[x.id])}</p></button>`).join('')}` : ''}`;
  }

  function viewTools() {
    const k = keyOf(), mk = k.slice(0, 7);
    const dueH = S.habits.filter((h) => hDue(h, k)), doneH = dueH.filter((h) => hDone(h, k)).length;
    const outToday = sumType(S.money.filter((x) => x.date === k), 'out');
    const outMonth = sumType(S.money.filter((x) => x.date.slice(0, 7) === mk), 'out');
    const upEv = upcomingEvents(366)[0];
    const l = lunarOf(k), ds = dutyOf(k).filter((x) => !x.off), j = S.journal[k] || {};
    const tiles = [
      ['habits', 'Thói quen', '🔥', '#ec7a3c', S.habits.length ? `${doneH}/${dueH.length} hôm nay` : 'Tạo thói quen đầu tiên'],
      ['money', 'Thu chi', '💰', '#18a957', S.money.length ? `Hôm nay ${fmtShort(outToday)} · Tháng ${fmtShort(outMonth)}` : 'Ghi chi tiêu nhanh'],
      ['events', 'Ngày quan trọng', '🎂', '#d6303a', upEv ? `${esc(upEv.e.title)} · ${cdText(daysBetween(k, upEv.next))}` : 'Sinh nhật, ngày giỗ…'],
      ['lunar', 'Lịch âm', '🌙', '#4f5fd0', `${l.day}/${l.month} năm ${LN.canChiYear(l.year)}`],
      ['shift', 'Lịch trực', '🛡️', '#3a86b8', !S.shift.on ? 'Chưa bật' : ds.length ? `Hôm nay: ${ds.map((x) => x.short).join(', ')}` : S.shift.mode === 'week' ? 'Hôm nay không có ca' : 'Hôm nay nghỉ'],
      ['journal', 'Nhật ký', '📓', '#8b5cf6', j.mood ? `Hôm nay ${MOODS[j.mood - 1].e} ${MOODS[j.mood - 1].l}` : 'Ghi lại cảm xúc'],
      ['analytics', 'Thống kê', '📊', '#e5a50a', `${weekDone()} việc xong tuần này`],
      ['profile', 'Cá nhân', '⚙️', '#6b7a72', 'Hồ sơ, mục tiêu, sao lưu'],
    ];
    return `${pageHead('Tiện ích', 'Mọi công cụ cho một ngày trọn vẹn.')}
      <div class="tools">${tiles.map(([id, n, e, c, sub]) => `<button class="tool glass" data-act="go" data-to="${id}" style="--tc:${c}"><span class="tool-ic">${e}</span><b>${n}</b><span>${sub}</span></button>`).join('')}</div>`;
  }

  function viewHabits() {
    const k = keyOf(), due = S.habits.filter((h) => hDue(h, k)), n = due.filter((h) => hDone(h, k)).length;
    const last7 = Array.from({ length: 7 }, (_, i) => addDays(k, i - 6));
    const sugg = HABIT_SUGGEST.filter(([nm]) => !S.habits.some((h) => h.name === nm));
    return `${subHead('Thói quen', 'Mỗi ngày một chút, kiên trì sẽ thành.')}
      ${S.habits.length ? `<div class="h-sum glass"><span class="h-sum-r">${ring(due.length ? n / due.length : 0, 64, 7)}<b>${due.length ? Math.round((n / due.length) * 100) : 0}%</b></span><div><b>${n}/${due.length} thói quen</b><span>đã hoàn thành hôm nay</span></div></div>` : ''}
      <div class="h-list">${S.habits.map((h) => {
        const st = hStreak(h), dueToday = hDue(h, k), done = hDone(h, k);
        return `<div class="h-card glass" style="--hc:${h.color}">
          <button class="h-main" data-act="habit-edit" data-hid="${h.id}">
            <span class="h-badge">${h.icon}</span>
            <span class="h-info"><b>${esc(h.name)}</b><span>${st ? `🔥 ${st} ngày liên tục` : 'Bắt đầu chuỗi mới'} · ${hRate(h)}% (30 ngày)</span></span>
          </button>
          ${dueToday ? `<button class="h-check ${done ? 'on' : ''}" data-act="habit-tap" data-hid="${h.id}" aria-label="Đánh dấu ${esc(h.name)}">${(h.target || 1) > 1 && !done ? `${hCount(h, k)}/${h.target}` : ic('check', 'stroke-width="3"')}</button>` : '<span class="h-off">Nghỉ</span>'}
          <div class="h-week">${last7.map((d) => `<span class="${!hDue(h, d) ? 'na' : hDone(h, d) ? 'on' : d === k ? 'today' : ''}"><i></i>${WD[dateOf(d).getDay()]}</span>`).join('')}</div>
        </div>`;
      }).join('')}</div>
      ${!S.habits.length ? '<div class="empty glass"><div class="big">🌱</div>Chưa có thói quen nào.<br>Chọn nhanh một gợi ý bên dưới hoặc tự tạo.</div>' : ''}
      ${sugg.length ? `<div class="section-head"><h3>Gợi ý</h3></div>
      <div class="chips sm">${sugg.map(([nm, e]) => `<button class="chip" data-act="habit-quick" data-name="${esc(nm)}" data-icon="${e}">${e} ${esc(nm)}</button>`).join('')}</div>` : ''}
      <button class="btn btn-primary btn-block" data-act="habit-new" style="margin-top:18px">${ic('plus')} Tạo thói quen</button>`;
  }

  function viewEvents() {
    const k = keyOf();
    const list = S.events.map((e) => ({ e, next: evNext(e, k) })).sort((a, b) => (a.next || '9999').localeCompare(b.next || '9999'));
    return `${subHead('Ngày quan trọng', 'Sinh nhật, kỷ niệm, ngày giỗ và hạn chót.')}
      ${list.length ? `<div class="ev-list">${list.map(({ e, next }) => {
        const [lbl, emo] = EV_TYPES[e.type] || EV_TYPES.other;
        const n = next ? daysBetween(k, next) : null, y = next ? evYears(e, next) : 0;
        const extra = y > 0 && e.type === 'birthday' ? ` · tròn ${y} tuổi` : y > 0 && e.type === 'anniv' ? ` · ${y} năm` : '';
        return `<button class="ev glass ${n === 0 ? 'hot' : ''} ${next ? '' : 'past'}" data-act="event-edit" data-eid="${e.id}">
          <span class="ev-emo">${emo}</span>
          <span class="ev-info"><b>${esc(e.title)}</b><span>${lbl} · ${evDateLabel(e)}${next && e.lunar ? ` (${fmtDM(next)})` : ''}${extra}</span></span>
          <span class="ev-cd">${n === null ? '<em>Đã qua</em>' : n === 0 ? '<em>Hôm nay</em>' : n === 1 ? '<em>Ngày mai</em>' : `<b>${n}</b><small>ngày</small>`}</span></button>`;
      }).join('')}</div>`
      : '<div class="empty glass"><div class="big">🎂</div>Chưa có ngày quan trọng nào.<br>Thêm sinh nhật người thân, ngày giỗ hay hạn nộp giấy tờ.</div>'}
      <button class="btn btn-primary btn-block" data-act="event-new" style="margin-top:16px">${ic('plus')} Thêm ngày quan trọng</button>`;
  }

  function viewLunar() {
    const k = keyOf(), sel = ui.lunarSel || k;
    const mk = ui.lunarMonth || sel.slice(0, 7);
    const [y, m] = mk.split('-').map(Number);
    const startOff = (new Date(y, m - 1, 1).getDay() + 6) % 7, dim = new Date(y, m, 0).getDate();
    const cells = [...Array(startOff).fill(null), ...Array.from({ length: dim }, (_, i) => `${y}-${pad(m)}-${pad(i + 1)}`)];
    const l = lunarOf(sel), d0 = dateOf(sel), hol = holidaysOn(sel), evs = eventsOn(sel);
    const up = [];
    for (let i = 0; i < 200 && up.length < 8; i++) { const kk = addDays(k, i); holidaysOn(kk).forEach((h) => up.push([kk, h])); }
    const nextDay = (want) => { for (let i = 0; i < 40; i++) { const kk = addDays(k, i); if (lunarOf(kk).day === want) return kk; } return k; };
    const m1 = nextDay(1), r15 = nextDay(15);
    const WDF = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return `${subHead('Lịch âm', 'Âm lịch Việt Nam, ngày lễ, mùng 1 và rằm.')}
      <div class="lu-hero">
        <div class="lu-col"><span>${WDF[d0.getDay()]}</span><b>${d0.getDate()}</b><span>Tháng ${d0.getMonth() + 1}, ${d0.getFullYear()}</span></div>
        <div class="lu-col lu-moon"><span>Âm lịch</span><b>${l.day}</b><span>Tháng ${LN.MONTH_NAMES[l.month - 1]}${l.leap ? ' nhuận' : ''}</span></div>
        <div class="lu-cc"><span>Năm <b>${LN.canChiYear(l.year)}</b></span><span>Tháng <b>${LN.canChiMonth(l.month, l.year)}</b></span><span>Ngày <b>${LN.canChiDay(l.jd)}</b></span></div>
        ${hol.length || evs.length ? `<div class="lu-tags">${hol.map((h) => `<span>🎌 ${h}</span>`).join('')}${evs.map((e) => `<span>${EV_TYPES[e.type][1]} ${esc(e.title)}</span>`).join('')}</div>` : ''}
      </div>
      <div class="m-nav"><button class="icon-btn glass" data-act="lu-month" data-n="-1" aria-label="Tháng trước">${ic('chevL')}</button><b>Tháng ${m}/${y}</b><button class="icon-btn glass" data-act="lu-month" data-n="1" aria-label="Tháng sau">${ic('chevR')}</button></div>
      <div class="lu-grid glass">${['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((x) => `<b>${x}</b>`).join('')}${cells.map((c) => {
        if (!c) return '<span></span>';
        const ll = lunarOf(c), sp = holidaysOn(c).length || eventsOn(c).length;
        return `<button class="lu-c ${c === k ? 'today' : ''} ${c === sel ? 'sel' : ''} ${sp ? 'hol' : ''} ${ll.day === 1 || ll.day === 15 ? 'key' : ''}" data-act="lu-pick" data-day="${c}"><b>${dateOf(c).getDate()}</b><span>${ll.day === 1 ? `1/${ll.month}` : ll.day}</span></button>`;
      }).join('')}</div>
      <div class="lu-next"><div class="glass"><span>Mùng 1 tới</span><b>${fmtDM(m1)}</b><small>${cdText(daysBetween(k, m1))}</small></div><div class="glass"><span>Rằm tới</span><b>${fmtDM(r15)}</b><small>${cdText(daysBetween(k, r15))}</small></div></div>
      <div class="section-head"><h3>Ngày lễ sắp tới</h3></div>
      <div class="list glass" style="padding:4px 14px">${up.map(([kk, h]) => `<div class="notif"><span class="mi" style="background:var(--primary-soft)">🎌</span><div><b>${h}</b><span>${WD[dateOf(kk).getDay()]}, ${fmtDM(kk)}/${dateOf(kk).getFullYear()} · ÂL ${lunarOf(kk).day}/${lunarOf(kk).month} · ${cdText(daysBetween(k, kk))}</span></div></div>`).join('')}</div>`;
  }

  function viewMoney() {
    const curM = keyOf().slice(0, 7), mk = ui.moneyMonth || curM;
    const [y, m] = mk.split('-').map(Number);
    const items = S.money.filter((x) => x.date.slice(0, 7) === mk).sort((a, b) => b.date.localeCompare(a.date) || b.ts - a.ts);
    const out = sumType(items, 'out'), inc = sumType(items, 'in');
    const cats = Object.entries(MC_OUT).map(([id, [n, e]]) => ({ n, e, v: sumType(items.filter((x) => x.cat === id), 'out') })).filter((c) => c.v).sort((a, b) => b.v - a.v);
    const days = [...new Set(items.map((x) => x.date))];
    const dayN = mk === curM ? dateOf(keyOf()).getDate() : new Date(y, m, 0).getDate();
    return `${subHead('Thu chi', 'Ghi nhanh, biết rõ tiền đi đâu.')}
      <div class="m-nav"><button class="icon-btn glass" data-act="m-month" data-n="-1" aria-label="Tháng trước">${ic('chevL')}</button><b>Tháng ${m}/${y}</b><button class="icon-btn glass" data-act="m-month" data-n="1" aria-label="Tháng sau" ${mk >= curM ? 'disabled' : ''}>${ic('chevR')}</button></div>
      <div class="m-sum glass">
        <div class="m-big"><span>Đã chi</span><b>${fmtVND(out)}</b><small>Trung bình ${fmtShort(Math.round(out / dayN))}/ngày</small></div>
        <div class="m-two"><div><span>Thu nhập</span><b class="in">${inc ? '+' : ''}${fmtVND(inc)}</b></div><div><span>Còn lại</span><b class="${inc - out < 0 ? 'neg' : ''}">${fmtVND(inc - out)}</b></div></div>
        ${S.budget ? `<div class="m-budget"><div class="m-bh"><span>Ngân sách ${fmtShort(S.budget)}</span><span class="${out > S.budget ? 'neg' : ''}">${out > S.budget ? `Vượt ${fmtShort(out - S.budget)}` : `Còn ${fmtShort(S.budget - out)}`}</span></div><div class="bar ${out > S.budget ? 'over' : out > S.budget * 0.8 ? 'warn' : ''}"><i data-w="${Math.min(100, Math.round((out / S.budget) * 100))}"></i></div></div>`
          : `<button class="link m-setb" data-act="m-budget">${ic('target')} Đặt ngân sách tháng</button>`}
      </div>
      ${cats.length ? `<div class="card glass"><div class="card-head"><h4>Chi theo nhóm</h4>${S.budget ? '<button class="link" data-act="m-budget">Sửa ngân sách</button>' : ''}</div>
        ${cats.map((c) => `<div class="m-cat"><span class="m-e">${c.e}</span><span class="m-n">${c.n}</span><div class="bar"><i data-w="${Math.round((c.v / out) * 100)}"></i></div><span class="m-v">${fmtShort(c.v)}</span></div>`).join('')}</div>` : ''}
      ${days.map((d) => {
        const list = items.filter((x) => x.date === d), o = sumType(list, 'out');
        return `<div class="m-day"><div class="m-dh"><b>${dayLabel(d)}</b><span>${o ? `−${fmtVND(o)}` : ''}</span></div>
          <div class="m-items glass">${list.map((x) => {
            const [n, e] = (x.type === 'out' ? MC_OUT : MC_IN)[x.cat] || ['Khác', '📦'];
            return `<button class="m-item" data-act="m-edit" data-mid="${x.id}"><span class="m-e">${e}</span><span class="m-t"><b>${esc(x.note || n)}</b>${x.note ? `<span>${n}</span>` : ''}</span><span class="m-a ${x.type}">${x.type === 'out' ? '−' : '+'}${fmtVND(x.amt)}</span></button>`;
          }).join('')}</div></div>`;
      }).join('')}
      ${!items.length ? '<div class="empty glass"><div class="big">💰</div>Chưa có khoản nào trong tháng này.</div>' : ''}
      <button class="btn btn-primary btn-block" data-act="m-new" style="margin-top:16px">${ic('plus')} Ghi khoản mới</button>`;
  }

  function viewShift() {
    const sh = S.shift;
    return `${subHead('Lịch trực', sh.mode === 'week' ? 'Nhập ca theo lịch được công bố mỗi tuần.' : 'Thiết lập chu kỳ ca một lần, lịch tự xoay.')}
      <div class="sh-toggle glass"><div><b>Bật lịch trực</b><span>Hiện ca trên trang chủ và trong Lịch</span></div>
        <button class="switch ${sh.on ? 'on' : ''}" data-act="shift-toggle" role="switch" aria-checked="${sh.on}" aria-label="Bật lịch trực"><i></i></button></div>
      ${sh.on ? `<div class="seg" style="margin:4px 0 6px"><button data-act="shift-mode" data-v="week" class="${sh.mode === 'week' ? 'on' : ''}">Lịch theo tuần</button><button data-act="shift-mode" data-v="cycle" class="${sh.mode === 'cycle' ? 'on' : ''}">Chu kỳ cố định</button></div>
        ${sh.mode === 'week' ? dutyWeekHTML() : cycleHTML()}` : ''}`;
  }

  function dutyWeekHTML() {
    const D = S.duty, today = keyOf();
    if (!D.positions.length) {
      return `<div class="empty glass" style="margin-top:12px"><div class="big">🛡️</div>Trước tiên, khai báo vị trí trực và giờ các ca.<br>Cách nhanh nhất: dán đoạn “Thời gian ca trực” trong văn bản lịch trực.
        <div class="empty-acts"><button class="btn btn-primary" data-act="duty-paste">${ic('list')} Dán từ văn bản</button><button class="btn btn-ghost" data-act="duty-pos-new">${ic('plus')} Tự thêm</button></div></div>`;
    }
    const mon = ui.dutyWeek || defaultDutyWeek();
    const days = Array.from({ length: 7 }, (_, i) => addDays(mon, i));
    const ents = days.flatMap(entriesOn);
    const mins = ents.reduce((a, x) => a + shiftDur(x.s), 0);
    const unrep = ents.filter((x) => x.e.swap && !x.e.reported).length;
    const tag = mon === mondayOf(today) ? 'Tuần này' : mon === addDays(mondayOf(today), 7) ? 'Tuần tới' : mon === addDays(mondayOf(today), -7) ? 'Tuần trước' : '';
    return `
      <div class="m-nav" style="margin-top:16px"><button class="icon-btn glass" data-act="duty-wk" data-n="-7" aria-label="Tuần trước">${ic('chevL')}</button>
        <b class="dw-title">${tag ? `<small>${tag}</small>` : ''}${fmtDM(mon)} – ${fmtDM(addDays(mon, 6))}/${dateOf(addDays(mon, 6)).getFullYear()}</b>
        <button class="icon-btn glass" data-act="duty-wk" data-n="7" aria-label="Tuần sau">${ic('chevR')}</button></div>
      <div class="dw-sum glass"><div><b>${ents.length}</b><span>ca trực</span></div><div><b>${fmtHours(mins)}</b><span>giờ trực</span></div><div><b>${ents.filter(isNight).length}</b><span>ca đêm</span></div></div>
      ${unrep ? `<div class="dw-warn">${ic('alert')} ${unrep} ca đổi chưa báo cáo Ban Giám đốc</div>` : ''}
      <div class="dw-days">${days.map((d) => {
        const es = entriesOn(d);
        return `<div class="dw-day glass ${d === today ? 'today' : ''}">
          <div class="dw-h"><b>${WD[dateOf(d).getDay()]}</b><span>${fmtDM(d)}</span></div>
          <div class="dw-list">${es.map((x) => `<button class="dw-e" data-act="duty-edit" data-id="${x.e.id}" style="--c:${x.color}"><i></i><span><b>${esc(x.label)}</b><small>${x.time}${x.nextDay ? ' · rạng sáng hôm sau' : ''}${x.e.note ? ` · ${esc(x.e.note)}` : ''}</small>${x.e.swap ? `<em class="${x.e.reported ? 'ok' : ''}">${x.e.reported ? 'Đổi ca · đã báo cáo' : 'Đổi ca · chưa báo cáo'}</em>` : ''}</span></button>`).join('') || '<span class="dw-none">Không có ca</span>'}</div>
          <button class="dw-add" data-act="duty-add" data-day="${d}" aria-label="Thêm ca ngày ${fmtDM(d)}">${ic('plus')}</button>
        </div>`;
      }).join('')}</div>
      <div class="dw-actions"><button class="btn btn-ghost" data-act="duty-copy" data-mon="${mon}">${ic('repeat')} Chép tuần trước</button><button class="btn btn-ghost" data-act="duty-ics" data-mon="${mon}">${ic('calendar')} Đưa vào Lịch máy</button></div>
      <div class="section-head"><h3>Vị trí & giờ ca</h3><button class="link" data-act="duty-paste">${ic('list')} Dán từ văn bản</button></div>
      <div class="list glass" style="padding:4px">${D.positions.map((p) => `<button class="menu-item" data-act="duty-pos" data-id="${p.id}"><span class="mi" style="background:color-mix(in srgb, ${p.color} 16%, transparent);color:${p.color}">${p.shifts.length}</span><span class="grow">${esc(p.name)}<small class="pos-sub">${p.shifts.map((x) => `${esc(x.name)} ${x.start}–${x.end}`).join(' · ')}</small></span><span class="chev">${ic('chevR')}</span></button>`).join('')}
        <button class="menu-item" data-act="duty-pos-new"><span class="mi">${ic('plus')}</span><span class="grow">Thêm vị trí trực</span></button></div>
      <div class="section-head"><h3>Liên hệ khi có sự cố</h3><button class="link" data-act="duty-contact-new">${ic('plus')} Thêm</button></div>
      ${D.contacts.length ? `<div class="list glass" style="padding:4px">${D.contacts.map((c, i) => `<div class="menu-item ct"><span class="mi">${ic('user')}</span><span class="grow">${esc(c.name)}<small class="pos-sub">${esc(c.phone)}${c.note ? ` · ${esc(c.note)}` : ''}</small></span><a class="ct-call" href="tel:${esc(c.phone.replace(/[^\d+]/g, ''))}" aria-label="Gọi ${esc(c.name)}">${ic('phone')}</a><button class="ct-del" data-act="duty-contact-del" data-i="${i}" aria-label="Xóa liên hệ">${ic('x')}</button></div>`).join('')}</div>`
        : '<p class="page-sub" style="margin:0 4px">Lưu số cán bộ phụ trách để gọi nhanh khi có sự cố.</p>'}
      <div class="list glass" style="padding:4px;margin-top:16px">
        <button class="menu-item" data-act="duty-remind" role="switch" aria-checked="${!!D.remind}"><span class="mi">${ic('bell')}</span><span class="grow">Nhắc nhập lịch vào Chủ nhật</span><span class="switch ${D.remind ? 'on' : ''}"><i></i></span></button>
        <label class="menu-item"><span class="mi">${ic('clock')}</span><span class="grow">Ngày trực bắt đầu lúc<small class="pos-sub">Ca bắt đầu trước giờ này được tính là rạng sáng hôm sau</small></span><input type="time" class="input dw-time" id="duty-daystart" value="${D.dayStart}"></label>
      </div>`;
  }

  function cycleHTML() {
    const sh = S.shift, k = keyOf();
    const next = Array.from({ length: 14 }, (_, i) => addDays(k, i));
    return `
      <div class="section-head"><h3>Mẫu có sẵn</h3></div>
      <div class="chips sm">${SHIFT_TPL.map(([n, c], i) => `<button class="chip ${c.join() === sh.cycle.join() ? 'on' : ''}" data-act="shift-tpl" data-i="${i}">${n}</button>`).join('')}</div>
      <div class="section-head"><h3>Chu kỳ ${sh.cycle.length} ngày</h3>${sh.cycle.length ? '<button class="link" data-act="shift-clear">Xóa hết</button>' : ''}</div>
      <div class="cycle">${sh.cycle.map((id, i) => `<span class="sh-b" style="--c:${SHIFT_TYPES[id].color}"><em>${i + 1}</em>${SHIFT_TYPES[id].name}<button data-act="shift-rm" data-i="${i}" aria-label="Bỏ ngày này">${ic('x')}</button></span>`).join('') || '<span class="page-sub">Thêm ca vào chu kỳ bằng các nút bên dưới.</span>'}</div>
      <div class="chips sm" style="margin-top:10px">${Object.entries(SHIFT_TYPES).map(([id, t]) => `<button class="chip" data-act="shift-add" data-id="${id}"><span class="cat-dot" style="--c:${t.color}"></span>${t.name}</button>`).join('')}</div>
      <label class="field" style="margin-top:16px"><span>Ngày 1 của chu kỳ là</span><input class="input" type="date" id="sh-start" value="${sh.start}"></label>
      <div class="section-head"><h3>14 ngày tới</h3><span class="page-sub" style="margin:0">Chạm để đổi ca</span></div>
      <div class="sh-grid">${next.map((d) => { const sf = shiftOn(d); return `<button class="sh-day ${sf && sf.ov ? 'ov' : ''} ${d === k ? 'today' : ''}" data-act="shift-day" data-day="${d}" style="--c:${sf ? sf.color : 'var(--muted)'}"><span>${WD[dateOf(d).getDay()]} ${dateOf(d).getDate()}</span><b>${sf ? sf.short : '–'}</b></button>`; }).join('')}</div>
      <p class="footnote">Ô viền đứt là ngày đã đổi ca thủ công.</p>`;
  }

  function viewProfile() {
    const themeLbl = { auto: 'Theo hệ thống', light: 'Sáng', dark: 'Tối' }[S.theme];
    return `
      <div class="topbar" style="justify-content:flex-start"><button class="icon-btn glass" data-act="go-back" aria-label="Quay lại">${ic('chevL')}</button></div>
      <div class="profile-top">
        <div class="avatar-wrap">${avatarHTML('lg')}<button class="avatar-edit" data-act="avatar" aria-label="Đổi ảnh đại diện">${ic('camera')}</button></div>
        <h2>${esc(S.name || 'Bạn')}</h2>
        <p>${esc(S.tagline || '')}</p>
      </div>
      <div class="list glass">
        <button class="menu-item" data-act="edit-profile"><span class="mi">${ic('edit')}</span><span class="grow">Sửa thông tin</span><span class="chev">${ic('chevR')}</span></button>
        <button class="menu-item" data-act="avatar"><span class="mi">${ic('smile')}</span><span class="grow">Ảnh đại diện</span><span class="chev">${ic('chevR')}</span></button>
        <button class="menu-item" data-act="theme"><span class="mi">${ic('moon')}</span><span class="grow">Giao diện</span><span class="hint">${themeLbl}</span></button>
        <button class="menu-item" data-act="preset"><span class="mi">${ic('clock')}</span><span class="grow">Thời lượng tập trung</span><span class="hint">${S.focusPreset} phút</span></button>
        <button class="menu-item" data-act="auto-roll" role="switch" aria-checked="${!!S.autoRoll}"><span class="mi">${ic('repeat')}</span><span class="grow">Tự chuyển việc chưa xong sang hôm sau</span><span class="switch ${S.autoRoll ? 'on' : ''}"><i></i></span></button>
        <button class="menu-item" data-act="water-goal"><span class="mi">${ic('drop')}</span><span class="grow">Mục tiêu uống nước</span><span class="hint">${S.waterGoal} ly</span></button>
        <button class="menu-item" data-act="go-journal"><span class="mi">${ic('journal')}</span><span class="grow">Nhật ký tâm trạng</span><span class="chev">${ic('chevR')}</span></button>
        <button class="menu-item" data-act="read-goal"><span class="mi">${ic('book')}</span><span class="grow">Mục tiêu đọc mỗi ngày</span><span class="hint">${S.readGoal} phút</span></button>
      </div>
      <div class="list glass">
        <button class="menu-item" data-act="install"><span class="mi">${ic('phone')}</span><span class="grow">Cài lên màn hình chính</span><span class="chev">${ic('chevR')}</span></button>
        <button class="menu-item" data-act="export"><span class="mi">${ic('download')}</span><span class="grow">Sao lưu dữ liệu</span><span class="chev">${ic('chevR')}</span></button>
        <button class="menu-item" data-act="import"><span class="mi">${ic('upload')}</span><span class="grow">Khôi phục dữ liệu</span><span class="chev">${ic('chevR')}</span></button>
        <button class="menu-item danger" data-act="reset"><span class="mi">${ic('trash')}</span><span class="grow">Xóa toàn bộ dữ liệu</span></button>
      </div>
      <p class="footnote">Dữ liệu được lưu riêng trên thiết bị này.</p>`;
  }

  const VIEWS = { home: viewHome, calendar: viewCalendar, read: viewRead, tools: viewTools, analytics: viewAnalytics, profile: viewProfile, journal: viewJournal, habits: viewHabits, events: viewEvents, lunar: viewLunar, money: viewMoney, shift: viewShift };
  const MAIN_TABS = ['home', 'calendar', 'read', 'tools'];

  function render(animate = false) {
    const v = $('#view');
    v.innerHTML = VIEWS[ui.tab]();
    if (animate) { v.style.animation = 'none'; void v.offsetWidth; v.style.animation = ''; }
    const bars = $$('[data-w]', v);
    if (animate) {
      bars.forEach((el) => { el.style.width = '0'; });
      void v.offsetWidth;
      requestAnimationFrame(() => bars.forEach((el) => { el.style.width = el.dataset.w + '%'; }));
    } else bars.forEach((el) => { el.style.transition = 'none'; el.style.width = el.dataset.w + '%'; });
    const activeTab = MAIN_TABS.includes(ui.tab) ? ui.tab : ui.prevTab;
    $$('.tab').forEach((b) => {
      b.classList.toggle('active', b.dataset.tab === activeTab);
      b.setAttribute('aria-current', b.dataset.tab === ui.tab ? 'page' : 'false');
    });
  }

  function go(tab) {
    if (ui.tab === tab) return;
    if (!MAIN_TABS.includes(tab) && MAIN_TABS.includes(ui.tab)) ui.prevTab = ui.tab;
    ui.tab = tab;
    render(true);
    window.scrollTo({ top: 0 });
  }

  // ---------- Tab bar ----------
  const TAB_META = { home: ['home', 'Trang chủ'], calendar: ['calendar', 'Lịch'], read: ['book', 'Đọc sách'], tools: ['grid', 'Tiện ích'] };
  $$('.tab').forEach((b) => {
    const [i, l] = TAB_META[b.dataset.tab];
    b.innerHTML = `<span class="tab-ic">${ic(i)}</span>${l}`;
    b.addEventListener('click', () => go(b.dataset.tab));
  });
  $('#fab').innerHTML = ic('plus', 'stroke-width="2.6"');
  // Nút +: bấm = thêm theo ngữ cảnh trang; giữ = menu thêm nhanh
  const fab = $('#fab');
  let fabT = null, fabLong = false;
  fab.addEventListener('pointerdown', () => {
    fabLong = false;
    fabT = setTimeout(() => { fabLong = true; if (navigator.vibrate) navigator.vibrate(15); quickAddSheet(); }, 450);
  });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => fab.addEventListener(ev, () => clearTimeout(fabT)));
  fab.addEventListener('contextmenu', (e) => e.preventDefault());
  fab.addEventListener('click', () => {
    if (fabLong) { fabLong = false; return; }
    const ctx = { money: () => moneySheet(), habits: () => habitSheet(), events: () => eventSheet(), tools: () => quickAddSheet(), shift: S.shift.on && S.shift.mode === 'week' ? () => dutySheet() : null }[ui.tab];
    ctx ? ctx() : taskSheet();
  });

  // ---------- Sheets ----------
  let sheetClose = null;
  function openSheet(html, onMount, onClose) {
    closeSheet(true);
    const root = $('#sheet-root');
    root.innerHTML = `<div class="backdrop"></div><div class="sheet" role="dialog" aria-modal="true"><div class="grabber"></div>${html}</div>`;
    const sheet = $('.sheet', root);
    $('.backdrop', root).addEventListener('click', () => closeSheet());
    // vuốt xuống để đóng
    let y0 = null;
    sheet.addEventListener('touchstart', (e) => { if (sheet.scrollTop <= 0) y0 = e.touches[0].clientY; }, { passive: true });
    sheet.addEventListener('touchmove', (e) => {
      if (y0 == null) return;
      const dy = e.touches[0].clientY - y0;
      if (dy > 0) sheet.style.transform = `translate(-50%, ${dy}px)`;
    }, { passive: true });
    sheet.addEventListener('touchend', (e) => {
      if (y0 == null) return;
      const dy = e.changedTouches[0].clientY - y0;
      y0 = null;
      if (dy > 110) closeSheet(); else sheet.style.transform = '';
    });
    sheetClose = onClose || null;
    onMount && onMount(sheet);
    return sheet;
  }
  function closeSheet(instant) {
    const root = $('#sheet-root');
    if (!root.firstChild) return;
    const cb = sheetClose; sheetClose = null;
    cb && cb();
    if (instant) { root.innerHTML = ''; return; }
    $$('.sheet, .backdrop', root).forEach((el) => { el.style.transform = ''; el.classList.add('closing'); });
    setTimeout(() => { if ($('.closing', root)) root.innerHTML = ''; }, 220);
  }
  document.addEventListener('keydown', (e) => { if (e.key !== 'Escape') return; if ($('.sheet')) closeSheet(); else if (R) closeReader(); });

  function taskSheet(existing, presetDate) {
    const src = existing && (existing.src || existing);
    const t = src || { title: '', date: presetDate || (ui.tab === 'calendar' ? ui.calSel : keyOf()), time: '', cat: 'work', repeat: null, days: [], subs: [] };
    const today = keyOf(), tmr = addDays(today, 1);
    const sat = addDays(today, (6 - new Date().getDay() + 7) % 7);
    let subs = (t.subs || []).map((x) => ({ ...x }));
    let repeat = t.repeat || '';
    let days = (t.days || []).slice();
    const TIMES = [['', 'Không giờ'], ['07:00', '7:00'], ['12:00', '12:00'], ['18:00', '18:00'], ['21:00', '21:00']];
    openSheet(`
      <h3>${src ? 'Sửa công việc' : 'Công việc mới'}</h3>
      <form id="tf" autocomplete="off">
        <label class="field"><span>Tên công việc</span><input class="input" name="title" maxlength="120" placeholder="Ví dụ: Chạy bộ 5km" value="${esc(t.title)}" required></label>
        <div class="field"><span>${src && src.repeat ? 'Bắt đầu từ ngày' : 'Ngày'}</span>
          <div class="chips" id="dchips">
            <button type="button" class="chip" data-d="${today}">Hôm nay</button>
            <button type="button" class="chip" data-d="${tmr}">Ngày mai</button>
            ${sat !== today && sat !== tmr ? `<button type="button" class="chip" data-d="${sat}">Thứ 7 này</button>` : ''}
          </div>
        </div>
        <div class="row">
          <label class="field"><span>Chọn ngày</span><input class="input" type="date" name="date" value="${t.date}" required></label>
          <label class="field"><span>Giờ</span><input class="input" type="time" name="time" value="${t.time || ''}"></label>
        </div>
        <div class="field" style="margin-top:-6px"><div class="chips sm" id="tchips">${TIMES.map(([v, l]) => `<button type="button" class="chip" data-t="${v}">${l}</button>`).join('')}</div></div>
        <div class="field"><span>Lặp lại</span>
          <div class="chips sm" id="rchips"><button type="button" class="chip" data-r="">Không</button>${Object.entries(REPEATS).map(([v, l]) => `<button type="button" class="chip" data-r="${v}">${l}</button>`).join('')}</div>
          <div class="chips sm wd" id="wchips" hidden>${[1, 2, 3, 4, 5, 6, 0].map((d) => `<button type="button" class="chip" data-w="${d}">${WD[d]}</button>`).join('')}</div>
        </div>
        <div class="field"><span>Danh mục</span>
          <div class="chips" id="cchips">${Object.entries(CATS).map(([id, c]) => `<button type="button" class="chip ${t.cat === id ? 'on' : ''}" data-c="${id}"><span class="cat-dot" style="--c:${c.color}"></span>${c.name}</button>`).join('')}</div>
        </div>
        <div class="field"><span>Các bước nhỏ</span>
          <div class="sub-edit" id="subs"></div>
          <div class="sub-add"><input class="input" id="sub-in" maxlength="100" placeholder="Thêm một bước…" enterkeyhint="done"><button type="button" class="btn btn-ghost" id="sub-btn" aria-label="Thêm bước">${ic('plus')}</button></div>
        </div>
        ${src && src.repeat ? '<p class="footnote" style="margin:-4px 0 12px">Thay đổi sẽ áp dụng cho mọi lần lặp.</p>' : ''}
        <div class="sheet-actions"><button class="btn btn-primary btn-block" type="submit">${src ? 'Lưu thay đổi' : `${ic('plus')} Thêm công việc`}</button></div>
      </form>`, (sh) => {
      const f = $('#tf', sh);
      let cat = t.cat;
      const syncD = () => $$('#dchips .chip', sh).forEach((c) => c.classList.toggle('on', c.dataset.d === f.date.value));
      const syncT = () => $$('#tchips .chip', sh).forEach((c) => c.classList.toggle('on', c.dataset.t === f.time.value));
      const syncR = () => {
        $$('#rchips .chip', sh).forEach((c) => c.classList.toggle('on', c.dataset.r === repeat));
        $('#wchips', sh).hidden = repeat !== 'days';
        $$('#wchips .chip', sh).forEach((c) => c.classList.toggle('on', days.includes(+c.dataset.w)));
      };
      const drawSubs = () => {
        $('#subs', sh).innerHTML = subs.map((x, i) => `<div class="sub-row"><span>${esc(x.title)}</span><button type="button" data-i="${i}" aria-label="Xóa bước">${ic('x')}</button></div>`).join('');
      };
      const addSub = () => {
        const v = $('#sub-in', sh).value.trim(); if (!v) return;
        subs.push({ id: uid(), title: v, done: false }); $('#sub-in', sh).value = ''; drawSubs(); $('#sub-in', sh).focus();
      };
      syncD(); syncT(); syncR(); drawSubs();
      f.date.addEventListener('change', syncD);
      f.time.addEventListener('input', syncT);
      $('#dchips', sh).addEventListener('click', (e) => { const c = e.target.closest('.chip'); if (c) { f.date.value = c.dataset.d; syncD(); } });
      $('#tchips', sh).addEventListener('click', (e) => { const c = e.target.closest('.chip'); if (c) { f.time.value = c.dataset.t; syncT(); } });
      $('#rchips', sh).addEventListener('click', (e) => {
        const c = e.target.closest('.chip'); if (!c) return;
        repeat = c.dataset.r;
        if (repeat === 'days' && !days.length) days = [dateOf(f.date.value || today).getDay()];
        syncR();
      });
      $('#wchips', sh).addEventListener('click', (e) => {
        const c = e.target.closest('.chip'); if (!c) return;
        const d = +c.dataset.w; days = days.includes(d) ? days.filter((x) => x !== d) : [...days, d]; syncR();
      });
      $('#cchips', sh).addEventListener('click', (e) => {
        const c = e.target.closest('.chip'); if (!c) return;
        cat = c.dataset.c; $$('#cchips .chip', sh).forEach((x) => x.classList.toggle('on', x === c));
      });
      $('#sub-btn', sh).addEventListener('click', addSub);
      $('#sub-in', sh).addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); addSub(); } });
      $('#subs', sh).addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (b) { subs.splice(+b.dataset.i, 1); drawSubs(); } });
      if (!src) setTimeout(() => f.title.focus(), 320);
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = f.title.value.trim();
        if (!title) return;
        if ($('#sub-in', sh).value.trim()) addSub();
        if (repeat === 'days' && !days.length) { toast('Hãy chọn ít nhất một thứ trong tuần'); return; }
        const data = { title, date: f.date.value, time: f.time.value, cat, repeat: repeat || null, days: repeat === 'days' ? days : [], subs };
        if (src) {
          if (src.repeat && !data.repeat) { // bỏ lặp: giữ lại thành việc đơn của lần đang xem
            const k = (existing && existing.occ) || keyOf();
            Object.assign(src, data, { date: k, done: !!(src.doneDates && src.doneDates[k]), doneAt: (src.doneDates && src.doneDates[k]) || null });
            delete src.doneDates; delete src.skip; delete src.subDone;
          } else Object.assign(src, data);
        } else S.tasks.push({ id: uid(), ...data, done: false });
        save(); closeSheet(); render();
        toast(src ? 'Đã lưu thay đổi' : data.repeat ? `Đã thêm việc lặp lại · ${data.repeat === 'days' ? days.map((d) => WD[d]).join(', ') : REPEATS[data.repeat]}` : `Đã thêm vào ${dayLabel(f.date.value).toLowerCase()}`);
      });
    });
  }

  function removeTask(t, occ) {
    const src = t.src || t;
    if (src.repeat && occ) {
      src.skip = src.skip || {}; src.skip[occ] = 1; save(); render();
      toast('Đã bỏ qua lần này', { fn: () => { delete src.skip[occ]; save(); render(); } });
      return;
    }
    const idx = S.tasks.indexOf(src);
    if (idx < 0) return;
    S.tasks.splice(idx, 1); save(); render();
    toast(src.repeat ? 'Đã xóa cả chuỗi lặp lại' : 'Đã xóa công việc', { fn: () => { S.tasks.splice(idx, 0, src); save(); render(); } });
  }

  function taskMenu(t) {
    const src = t.src || t;
    const isToday = t.date === keyOf();
    const inTop = isToday && (S.top3[keyOf()] || []).includes(tkey(t));
    openSheet(`
      <h3>${esc(t.title)}</h3>
      <button class="menu-item" data-m="edit"><span class="mi">${ic('edit')}</span>Chỉnh sửa</button>
      <button class="menu-item" data-m="toggle"><span class="mi">${ic('check')}</span>${t.done ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành'}</button>
      ${isToday && !t.done ? `<button class="menu-item" data-m="top"><span class="mi">${ic('star')}</span>${inTop ? 'Bỏ khỏi Top 3 hôm nay' : 'Đưa vào Top 3 hôm nay'}</button>` : ''}
      ${src.repeat
        ? `<button class="menu-item" data-m="skip"><span class="mi">${ic('arrowR')}</span>Bỏ qua lần này</button>
           <button class="menu-item danger" data-m="del"><span class="mi">${ic('trash')}</span>Xóa cả chuỗi lặp lại</button>`
        : `<button class="menu-item" data-m="tmr"><span class="mi">${ic('arrowR')}</span>Dời sang ngày mai</button>
           <button class="menu-item danger" data-m="del"><span class="mi">${ic('trash')}</span>Xóa công việc</button>`}`, (sh) => {
      sh.addEventListener('click', (e) => {
        const b = e.target.closest('[data-m]'); if (!b) return;
        const m = b.dataset.m;
        if (m === 'edit') { taskSheet(t); return; }
        closeSheet();
        if (m === 'toggle') { toggleTask(t.id, t.occ); return; }
        if (m === 'top') { toggleTop3(t); render(); return; }
        if (m === 'skip') { removeTask(t, t.occ || keyOf()); return; }
        if (m === 'del') { removeTask(t); return; }
        if (m === 'tmr') {
          const prev = src.date;
          src.date = addDays(src.date < keyOf() ? keyOf() : src.date, 1); save(); render();
          toast('Đã dời sang ' + dayLabel(src.date).toLowerCase(), { fn: () => { src.date = prev; save(); render(); } });
        }
      });
    });
  }

  function toggleTop3(t) {
    const k = keyOf(), a = top3Keys(k), key = tkey(t);
    if (a.includes(key)) S.top3[k] = a.filter((x) => x !== key);
    else if (a.length >= 3) { toast('Top 3 đã đủ. Hãy bỏ bớt một việc trước nhé'); return false; }
    else S.top3[k] = [...a, key];
    save();
    return true;
  }

  function top3Sheet() {
    const list = tasksOn(keyOf()).filter((t) => !t.done);
    const draw = () => list.map((t) => {
      const on = top3Keys().includes(tkey(t));
      return `<button class="pick ${on ? 'on' : ''}" data-k="${tkey(t)}"><span class="pick-s">${ic('star')}</span><span><b>${esc(t.title)}</b><span>${fmtTime(t.time)}</span></span></button>`;
    }).join('');
    openSheet(`<h3>Top 3 hôm nay</h3><p class="page-sub" style="margin-top:-10px">Chọn tối đa 3 việc quan trọng nhất. Làm chúng trước tiên.</p>
      <div class="picks" id="picks">${draw()}</div>
      <button class="btn btn-primary btn-block" data-done style="margin-top:14px">Xong</button>`, (sh) => {
      sh.addEventListener('click', (e) => {
        if (e.target.closest('[data-done]')) { closeSheet(); render(); return; }
        const b = e.target.closest('.pick'); if (!b) return;
        const t = list.find((x) => tkey(x) === b.dataset.k);
        if (toggleTop3(t)) $('#picks', sh).innerHTML = draw();
      });
    }, () => setTimeout(render, 0));
  }

  function reviewSheet(k = keyOf()) {
    const j = S.journal[k] || {};
    const isToday = k === keyOf();
    openSheet(`
      <h3>${isToday ? 'Tổng kết hôm nay' : `Nhật ký · ${dayLabel(k)}`}</h3>
      <div class="field"><span>Tâm trạng</span><div class="moods big" id="jm">${MOODS.map((m, i) => `<button type="button" class="${j.mood === i + 1 ? 'on' : ''}" data-v="${i + 1}" aria-label="${m.l}"><em>${m.e}</em><small>${m.l}</small></button>`).join('')}</div></div>
      <form id="jf" autocomplete="off">
        <label class="field"><span>Một dòng cho ${isToday ? 'hôm nay' : 'ngày này'}</span><input class="input" name="note" maxlength="160" value="${esc(j.note || '')}" placeholder="Điều đáng nhớ nhất…"></label>
        <label class="field"><span>Mình đã làm tốt điều gì?</span><textarea class="input" name="good" rows="2">${esc(j.good || '')}</textarea></label>
        <label class="field"><span>Điều gì có thể làm tốt hơn?</span><textarea class="input" name="better" rows="2">${esc(j.better || '')}</textarea></label>
        <label class="field"><span>Ngày mai, việc quan trọng nhất là gì?</span><input class="input" name="tomorrow" maxlength="120" value="${esc(j.tomorrow || '')}"></label>
        ${isToday && !j.tomorrowTask ? '<label class="check-row"><input type="checkbox" name="addtask" checked> Thêm việc này vào Top 3 ngày mai</label>' : ''}
        <button class="btn btn-primary btn-block" type="submit">Lưu nhật ký</button>
      </form>`, (sh) => {
      let mood = j.mood || 0;
      $('#jm', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        mood = +b.dataset.v; $$('#jm button', sh).forEach((x) => x.classList.toggle('on', x === b));
      });
      $('#jf', sh).addEventListener('submit', (e) => {
        e.preventDefault();
        const f = e.target, v = (n) => f[n].value.trim();
        const e2 = { ...j, mood: mood || undefined, note: v('note'), good: v('good'), better: v('better'), tomorrow: v('tomorrow') };
        e2.reviewed = !!(e2.good || e2.better || e2.tomorrow) || !!j.reviewed;
        if (f.addtask && f.addtask.checked && e2.tomorrow) {
          const tmr = addDays(k, 1), id = uid();
          S.tasks.push({ id, title: e2.tomorrow, date: tmr, time: '', cat: 'work', done: false, subs: [] });
          S.top3[tmr] = [...(S.top3[tmr] || []), id].slice(0, 3);
          e2.tomorrowTask = id;
        }
        S.journal[k] = e2; save(); closeSheet(); render();
        toast(e2.tomorrowTask && !j.tomorrowTask ? 'Đã lưu nhật ký · đã thêm việc vào Top 3 ngày mai' : 'Đã lưu nhật ký 🌙');
      });
    });
  }

  // ---------- Dời việc chưa xong ----------
  const rollCandidates = (upTo = keyOf()) => S.tasks.filter((t) => !t.repeat && !t.done && t.date <= upTo)
    .sort((a, b) => (a.date + (a.time || '99')).localeCompare(b.date + (b.time || '99')));

  // Chuyển các việc (id) sang ngày `to`; giữ chỗ trong Top 3 nếu còn trống. Trả về hàm hoàn tác.
  function moveTasks(ids, to) {
    const prevTop = JSON.parse(JSON.stringify(S.top3));
    const prev = [];
    ids.forEach((id) => {
      const t = S.tasks.find((x) => x.id === id);
      if (!t) return;
      prev.push([t, t.date]);
      const from = t.date;
      if ((S.top3[from] || []).includes(id)) {
        S.top3[from] = S.top3[from].filter((x) => x !== id);
        const dst = S.top3[to] || [];
        if (dst.length < 3 && !dst.includes(id)) S.top3[to] = [...dst, id];
      }
      t.date = to;
    });
    save();
    return () => { prev.forEach(([t, d]) => (t.date = d)); S.top3 = prevTop; save(); render(); };
  }

  function rollSheet() {
    const today = keyOf(), tmr = addDays(today, 1);
    const cands = rollCandidates();
    const reps = tasksOn(today).filter((t) => t.occ && !t.done).length;
    const sel = new Set(cands.map((t) => t.id));
    const label = () => (sel.size ? `${ic('arrowR')} Dời ${sel.size} việc sang ngày mai` : 'Chưa chọn việc nào');
    openSheet(`<h3>Dời việc chưa xong</h3>
      <p class="page-sub" style="margin-top:-10px">Chuyển sang ngày mai, ${WD[dateOf(tmr).getDay()]} ${fmtDM(tmr)}. Giờ đã đặt được giữ nguyên.</p>
      ${cands.length > 1 ? `<button class="link" id="rl-all" style="margin:0 0 10px 4px">Bỏ chọn tất cả</button>` : ''}
      <div class="picks" id="rl">${cands.map((t) => `<button class="pick roll on" data-id="${t.id}"><span class="pick-c">${ic('check', 'stroke-width="3"')}</span><span><b>${esc(t.title)}</b><span>${t.date < today ? `Quá hạn · ${dayLabel(t.date)}` : 'Hôm nay'}${t.time ? `, ${t.time}` : ''}</span></span></button>`).join('')}</div>
      ${reps ? `<p class="footnote" style="text-align:left;margin:12px 4px 0">${reps} việc lặp lại sẽ tự có lại theo lịch nên không cần dời.</p>` : ''}
      <button class="btn btn-primary btn-block" id="rl-go" style="margin-top:16px">${label()}</button>
      <label class="check-row" style="margin:16px 0 0 4px"><input type="checkbox" id="rl-auto" ${S.autoRoll ? 'checked' : ''}> Từ nay tự chuyển việc chưa xong sang hôm sau</label>`, (sh) => {
      const sync = () => {
        $$('#rl .pick', sh).forEach((b) => b.classList.toggle('on', sel.has(b.dataset.id)));
        $('#rl-go', sh).innerHTML = label(); $('#rl-go', sh).disabled = !sel.size;
        const all = $('#rl-all', sh); if (all) all.textContent = sel.size === cands.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả';
      };
      $('#rl', sh).addEventListener('click', (e) => {
        const b = e.target.closest('.pick'); if (!b) return;
        sel.has(b.dataset.id) ? sel.delete(b.dataset.id) : sel.add(b.dataset.id); sync();
      });
      const all = $('#rl-all', sh);
      if (all) all.addEventListener('click', () => { if (sel.size === cands.length) sel.clear(); else cands.forEach((t) => sel.add(t.id)); sync(); });
      $('#rl-auto', sh).addEventListener('change', (e) => {
        S.autoRoll = e.target.checked; save();
        toast(S.autoRoll ? 'Đã bật tự chuyển việc chưa xong sang hôm sau' : 'Đã tắt tự chuyển việc');
      });
      $('#rl-go', sh).addEventListener('click', () => {
        if (!sel.size) return;
        const n = sel.size, undo = moveTasks([...sel], tmr);
        closeSheet(); render();
        toast(`Đã dời ${n} việc sang ngày mai`, { fn: undo });
      });
    });
  }

  // Tự động: khi mở app sang ngày mới, việc chưa xong của các ngày trước chuyển sang hôm nay
  function autoRollover() {
    if (!S.autoRoll || !S.onboarded) return;
    const today = keyOf(), ids = rollCandidates(addDays(today, -1)).map((t) => t.id);
    if (!ids.length) return;
    const undo = moveTasks(ids, today);
    render();
    toast(`Đã chuyển ${ids.length} việc chưa xong sang hôm nay`, { fn: undo });
  }

  function quickAddSheet() {
    const items = [['task', 'Công việc', 'list'], ['money', 'Khoản chi / thu', 'plus'], ['habit', 'Thói quen', 'repeat'], ['event', 'Ngày quan trọng', 'star'], ['journal', 'Nhật ký hôm nay', 'journal']];
    openSheet(`<h3>Thêm nhanh</h3>${items.map(([v, l, i]) => `<button class="menu-item" data-q="${v}"><span class="mi">${ic(i)}</span>${l}</button>`).join('')}`, (sh) => {
      sh.addEventListener('click', (e) => {
        const b = e.target.closest('[data-q]'); if (!b) return;
        ({ task: () => taskSheet(), money: () => moneySheet(), habit: () => habitSheet(), event: () => eventSheet(), journal: () => reviewSheet() })[b.dataset.q]();
      });
    });
  }

  function habitSheet(h) {
    const d = h ? { ...h, days: (h.days || ALL_DAYS).slice() } : { name: '', icon: '🏃', color: HABIT_COLORS[S.habits.length % HABIT_COLORS.length], days: ALL_DAYS.slice(), target: 1 };
    openSheet(`<h3>${h ? 'Sửa thói quen' : 'Thói quen mới'}</h3>
      <form id="hf" autocomplete="off">
        <label class="field"><span>Tên thói quen</span><input class="input" name="hname" maxlength="60" required value="${esc(d.name)}" placeholder="Ví dụ: Chạy bộ buổi sáng"></label>
        <div class="field"><span>Biểu tượng</span><div class="icon-grid" id="hi">${HABIT_ICONS.map((e) => `<button type="button" data-v="${e}" class="${e === d.icon ? 'on' : ''}">${e}</button>`).join('')}</div></div>
        <div class="field"><span>Màu</span><div class="color-row" id="hc">${HABIT_COLORS.map((c) => `<button type="button" data-v="${c}" style="--c:${c}" class="${c === d.color ? 'on' : ''}" aria-label="Chọn màu"></button>`).join('')}</div></div>
        <div class="field"><span>Các ngày trong tuần</span><div class="chips sm wd" id="hd">${[1, 2, 3, 4, 5, 6, 0].map((x) => `<button type="button" class="chip ${d.days.includes(x) ? 'on' : ''}" data-v="${x}">${WD[x]}</button>`).join('')}</div></div>
        <div class="field"><span>Số lần mỗi ngày</span><div class="stepper"><button type="button" data-s="-1" aria-label="Giảm">${ic('minus')}</button><b id="ht">${d.target}</b><button type="button" data-s="1" aria-label="Tăng">${ic('plus')}</button></div></div>
        <button class="btn btn-primary btn-block" type="submit">${h ? 'Lưu thay đổi' : 'Tạo thói quen'}</button>
        ${h ? `<button type="button" class="btn btn-danger btn-block" id="hdel" style="margin-top:10px">${ic('trash')} Xóa thói quen</button>` : ''}
      </form>`, (sh) => {
      const f = $('#hf', sh);
      const pick = (sel, key) => $(sel, sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        d[key] = b.dataset.v; $$(`${sel} button`, sh).forEach((x) => x.classList.toggle('on', x === b));
      });
      pick('#hi', 'icon'); pick('#hc', 'color');
      $('#hd', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        const v = +b.dataset.v; d.days = d.days.includes(v) ? d.days.filter((x) => x !== v) : [...d.days, v]; b.classList.toggle('on');
      });
      $('.stepper', sh).addEventListener('click', (e) => {
        const b = e.target.closest('[data-s]'); if (!b) return;
        d.target = Math.min(20, Math.max(1, d.target + +b.dataset.s)); $('#ht', sh).textContent = d.target;
      });
      if (h) $('#hdel', sh).addEventListener('click', () => {
        const idx = S.habits.indexOf(h); S.habits.splice(idx, 1); save(); closeSheet(); render();
        toast('Đã xóa thói quen', { fn: () => { S.habits.splice(idx, 0, h); save(); render(); } });
      });
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = f.hname.value.trim(); if (!name) return;
        if (!d.days.length) { toast('Chọn ít nhất một ngày trong tuần'); return; }
        const data = { name, icon: d.icon, color: d.color, days: d.days, target: d.target };
        if (h) Object.assign(h, data); else S.habits.push({ id: uid(), ...data, created: keyOf() });
        save(); closeSheet(); render(); toast(h ? 'Đã lưu thói quen' : 'Đã tạo thói quen mới 🌱');
      });
      if (!h) setTimeout(() => f.hname.focus(), 320);
    });
  }

  function eventSheet(ev) {
    const t0 = lunarOf(keyOf());
    const d = ev ? { ...ev } : { title: '', type: 'birthday', date: keyOf(), lunar: false, ld: t0.day, lm: t0.month, year: '', yearly: true };
    openSheet(`<h3>${ev ? 'Sửa ngày quan trọng' : 'Ngày quan trọng mới'}</h3>
      <form id="ef" autocomplete="off">
        <label class="field"><span>Tên</span><input class="input" name="etitle" maxlength="80" required value="${esc(d.title)}" placeholder="Ví dụ: Sinh nhật mẹ"></label>
        <div class="field"><span>Loại</span><div class="chips sm" id="et">${Object.entries(EV_TYPES).map(([id, [l, emo]]) => `<button type="button" class="chip ${d.type === id ? 'on' : ''}" data-v="${id}">${emo} ${l}</button>`).join('')}</div></div>
        <div class="field"><span>Theo lịch</span><div class="seg" id="el"><button type="button" data-v="0" class="${!d.lunar ? 'on' : ''}">Dương lịch</button><button type="button" data-v="1" class="${d.lunar ? 'on' : ''}">Âm lịch</button></div></div>
        <div id="e-solar" ${d.lunar ? 'hidden' : ''}><label class="field"><span>Ngày (nhập năm sinh/năm cưới để tính số tuổi)</span><input class="input" type="date" name="edate" value="${d.date || keyOf()}"></label></div>
        <div id="e-lunar" ${d.lunar ? '' : 'hidden'}>
          <div class="row">
            <label class="field"><span>Ngày âm</span><select class="input" name="eld">${Array.from({ length: 30 }, (_, i) => `<option value="${i + 1}" ${+d.ld === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}</select></label>
            <label class="field"><span>Tháng âm</span><select class="input" name="elm">${LN.MONTH_NAMES.map((n, i) => `<option value="${i + 1}" ${+d.lm === i + 1 ? 'selected' : ''}>${i + 1} (${n})</option>`).join('')}</select></label>
          </div>
          <label class="field"><span>Năm (không bắt buộc)</span><input class="input" name="eyear" inputmode="numeric" maxlength="4" value="${d.year || ''}" placeholder="Ví dụ: 1965"></label>
        </div>
        <p class="footnote" id="e-conv" style="margin:-6px 0 12px"></p>
        <label class="check-row"><input type="checkbox" name="eyearly" ${d.yearly ? 'checked' : ''}> Lặp lại hằng năm</label>
        <button class="btn btn-primary btn-block" type="submit">${ev ? 'Lưu thay đổi' : 'Lưu'}</button>
        ${ev ? `<button type="button" class="btn btn-danger btn-block" id="edel" style="margin-top:10px">${ic('trash')} Xóa</button>` : ''}
      </form>`, (sh) => {
      const f = $('#ef', sh);
      const draft = () => (d.lunar
        ? { lunar: true, yearly: f.eyearly.checked, ld: +f.eld.value, lm: +f.elm.value, year: +f.eyear.value || '' }
        : { lunar: false, yearly: f.eyearly.checked, date: f.edate.value, year: +String(f.edate.value).slice(0, 4) || '' });
      const conv = () => {
        const dr = draft(), nx = dr.date !== '' ? evNext(dr) : null;
        $('#e-conv', sh).textContent = nx ? `Lần tới: ${WD[dateOf(nx).getDay()]}, ${fmtDM(nx)}/${dateOf(nx).getFullYear()} (${cdText(daysBetween(keyOf(), nx))})${d.lunar ? '' : ` · âm lịch ${lunarOf(nx).day}/${lunarOf(nx).month}`}` : 'Ngày này đã qua.';
      };
      $('#et', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        d.type = b.dataset.v; $$('#et button', sh).forEach((x) => x.classList.toggle('on', x === b));
        f.eyearly.checked = d.type !== 'deadline'; conv();
      });
      $('#el', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        d.lunar = b.dataset.v === '1'; $$('#el button', sh).forEach((x) => x.classList.toggle('on', x === b));
        $('#e-solar', sh).hidden = d.lunar; $('#e-lunar', sh).hidden = !d.lunar; conv();
      });
      ['eld', 'elm', 'eyear', 'edate', 'eyearly'].forEach((n) => f[n].addEventListener('change', conv));
      conv();
      if (ev) $('#edel', sh).addEventListener('click', () => {
        const idx = S.events.indexOf(ev); S.events.splice(idx, 1); save(); closeSheet(); render();
        toast('Đã xóa', { fn: () => { S.events.splice(idx, 0, ev); save(); render(); } });
      });
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = f.etitle.value.trim(); if (!title) return;
        const data = { title, type: d.type, ...draft() };
        if (!data.lunar && !data.date) return;
        if (ev) Object.assign(ev, data); else S.events.push({ id: uid(), ...data });
        save(); closeSheet(); render();
        const nx = evNext(data);
        toast(nx ? `Đã lưu · ${cdText(daysBetween(keyOf(), nx))}` : 'Đã lưu');
      });
      if (!ev) setTimeout(() => f.etitle.focus(), 320);
    });
  }

  function moneySheet(x) {
    const d = x ? { ...x } : { type: 'out', amt: 0, cat: 'food', note: '', date: ui.tab === 'calendar' ? ui.calSel : keyOf() };
    const cats = () => (d.type === 'out' ? MC_OUT : MC_IN);
    openSheet(`<h3>${x ? 'Sửa khoản' : 'Ghi khoản mới'}</h3>
      <div class="seg" id="mt" style="margin-bottom:14px"><button type="button" data-v="out" class="${d.type === 'out' ? 'on' : ''}">Chi tiêu</button><button type="button" data-v="in" class="${d.type === 'in' ? 'on' : ''}">Thu nhập</button></div>
      <form id="mf" autocomplete="off">
        <div class="m-amt"><input class="input" name="amt" inputmode="numeric" placeholder="0" value="${d.amt ? d.amt.toLocaleString('vi-VN') : ''}" aria-label="Số tiền"><span>₫</span></div>
        <div class="chips sm" id="mq" style="margin:10px 0 16px">${[10, 20, 50, 100, 200, 500].map((v) => `<button type="button" class="chip" data-v="${v * 1000}">+${v}k</button>`).join('')}<button type="button" class="chip" data-v="x1000">×1.000</button></div>
        <div class="field"><span>Nhóm</span><div class="m-cats" id="mc"></div></div>
        <label class="field"><span>Ghi chú</span><input class="input" name="note" maxlength="80" value="${esc(d.note)}" placeholder="Ví dụ: Phở sáng"></label>
        <label class="field"><span>Ngày</span><input class="input" type="date" name="mdate" value="${d.date}"></label>
        <button class="btn btn-primary btn-block" type="submit">${x ? 'Lưu thay đổi' : 'Lưu'}</button>
        ${x ? `<button type="button" class="btn btn-danger btn-block" id="mdel" style="margin-top:10px">${ic('trash')} Xóa khoản này</button>` : ''}
      </form>`, (sh) => {
      const f = $('#mf', sh);
      const parse = () => +f.amt.value.replace(/\D/g, '') || 0;
      const drawCats = () => {
        if (!cats()[d.cat]) d.cat = Object.keys(cats())[0];
        $('#mc', sh).innerHTML = Object.entries(cats()).map(([id, [n, e]]) => `<button type="button" class="${id === d.cat ? 'on' : ''}" data-v="${id}"><em>${e}</em><span>${n}</span></button>`).join('');
      };
      drawCats();
      f.amt.addEventListener('input', () => { const v = parse(); f.amt.value = v ? v.toLocaleString('vi-VN') : ''; });
      $('#mq', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        const v = b.dataset.v === 'x1000' ? parse() * 1000 : parse() + +b.dataset.v;
        f.amt.value = v ? v.toLocaleString('vi-VN') : '';
      });
      $('#mt', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        d.type = b.dataset.v; $$('#mt button', sh).forEach((y) => y.classList.toggle('on', y === b)); drawCats();
      });
      $('#mc', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        d.cat = b.dataset.v; $$('#mc button', sh).forEach((y) => y.classList.toggle('on', y === b));
      });
      if (x) $('#mdel', sh).addEventListener('click', () => {
        const idx = S.money.indexOf(x); S.money.splice(idx, 1); save(); closeSheet(); render();
        toast('Đã xóa khoản', { fn: () => { S.money.splice(idx, 0, x); save(); render(); } });
      });
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const amt = parse();
        if (!amt) { toast('Nhập số tiền nhé'); f.amt.focus(); return; }
        const data = { type: d.type, amt, cat: d.cat, note: f.note.value.trim(), date: f.mdate.value || keyOf() };
        if (x) Object.assign(x, data); else S.money.push({ id: uid(), ts: Date.now(), ...data });
        save(); closeSheet(); render();
        let msg = `Đã ghi ${d.type === 'out' ? '−' : '+'}${fmtVND(amt)}`;
        if (d.type === 'out' && S.budget) {
          const spent = sumType(S.money.filter((y) => y.date.slice(0, 7) === data.date.slice(0, 7)), 'out');
          if (spent > S.budget) msg += ' · đã vượt ngân sách tháng';
          else if (spent > S.budget * 0.8) msg += ` · còn ${fmtShort(S.budget - spent)} ngân sách`;
        }
        toast(msg);
      });
      if (!x) setTimeout(() => f.amt.focus(), 320);
    });
  }

  function budgetSheet() {
    openSheet(`<h3>Ngân sách chi tiêu mỗi tháng</h3>
      <form id="bf"><div class="m-amt"><input class="input" name="b" inputmode="numeric" placeholder="Ví dụ: 8.000.000" value="${S.budget ? S.budget.toLocaleString('vi-VN') : ''}"><span>₫</span></div>
      <p class="footnote" style="text-align:left;margin:10px 0 16px">App sẽ nhắc khi bạn chi gần hết hoặc vượt ngân sách. Để trống để tắt.</p>
      <button class="btn btn-primary btn-block" type="submit">Lưu</button></form>`, (sh) => {
      const f = $('#bf', sh);
      f.b.addEventListener('input', () => { const v = +f.b.value.replace(/\D/g, '') || 0; f.b.value = v ? v.toLocaleString('vi-VN') : ''; });
      f.addEventListener('submit', (e) => {
        e.preventDefault(); S.budget = +f.b.value.replace(/\D/g, '') || 0; save(); closeSheet(); render();
        toast(S.budget ? `Ngân sách: ${fmtVND(S.budget)}/tháng` : 'Đã tắt ngân sách');
      });
      setTimeout(() => f.b.focus(), 320);
    });
  }

  function dutySheet(entry, day) {
    const D = S.duty;
    if (!D.positions.length) { dutyPasteSheet(); return; }
    const d = entry
      ? { ...entry, shifts: [entry.shift] }
      : { date: day || (ui.tab === 'calendar' ? ui.calSel : keyOf()), pos: (posOf(D.lastPos) || D.positions[0]).id, shifts: [], note: '', swap: false, swapWith: '', reported: false };
    openSheet(`<h3>${entry ? 'Sửa ca trực' : 'Thêm ca trực'}</h3>
      <form id="df" autocomplete="off">
        <label class="field"><span>Ngày trực (theo lịch công bố)</span><input class="input" type="date" name="ddate" value="${d.date}" required></label>
        <div class="field"><span>Vị trí</span><div class="chips sm" id="dp">${D.positions.map((p) => `<button type="button" class="chip ${p.id === d.pos ? 'on' : ''}" data-v="${p.id}"><span class="cat-dot" style="--c:${p.color}"></span>${esc(p.name)}</button>`).join('')}</div></div>
        <div class="field"><span>Ca${entry ? '' : ' (chọn được nhiều ca)'}</span><div class="shift-pick" id="ds"></div></div>
        <label class="field"><span>Ghi chú</span><input class="input" name="dnote" maxlength="80" value="${esc(d.note || '')}" placeholder="Ví dụ: trực cùng tổ khác"></label>
        <label class="check-row"><input type="checkbox" name="dswap" ${d.swap ? 'checked' : ''}> Đây là ca đổi với người khác</label>
        <div id="dsw" ${d.swap ? '' : 'hidden'}>
          <label class="field"><span>Đổi ca với</span><input class="input" name="dwith" maxlength="60" value="${esc(d.swapWith || '')}" placeholder="Họ tên đồng chí đổi ca"></label>
          <label class="check-row"><input type="checkbox" name="drep" ${d.reported ? 'checked' : ''}> Đã báo cáo Ban Giám đốc</label>
          <p class="footnote" style="text-align:left;margin:-8px 4px 14px">Đổi ca cần báo cáo để tránh vướng trách nhiệm khi có sự cố.</p>
        </div>
        <button class="btn btn-primary btn-block" type="submit">${entry ? 'Lưu thay đổi' : 'Thêm ca'}</button>
        ${entry ? `<button type="button" class="btn btn-danger btn-block" id="ddel" style="margin-top:10px">${ic('trash')} Xóa ca này</button>` : ''}
      </form>`, (sh) => {
      const f = $('#df', sh);
      const drawShifts = () => {
        const p = posOf(d.pos);
        $('#ds', sh).innerHTML = p ? p.shifts.map((x) => `<button type="button" class="${d.shifts.includes(x.id) ? 'on' : ''}" data-v="${x.id}"><b>${esc(x.name)}</b><span>${x.start}–${x.end}</span></button>`).join('') : '';
      };
      drawShifts();
      $('#dp', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        d.pos = b.dataset.v; d.shifts = []; $$('#dp button', sh).forEach((x) => x.classList.toggle('on', x === b)); drawShifts();
      });
      $('#ds', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        const v = b.dataset.v;
        d.shifts = entry ? [v] : d.shifts.includes(v) ? d.shifts.filter((x) => x !== v) : [...d.shifts, v];
        drawShifts();
      });
      f.dswap.addEventListener('change', () => { $('#dsw', sh).hidden = !f.dswap.checked; });
      if (entry) $('#ddel', sh).addEventListener('click', () => {
        const idx = D.entries.indexOf(entry); D.entries.splice(idx, 1); save(); closeSheet(); render();
        toast('Đã xóa ca trực', { fn: () => { D.entries.splice(idx, 0, entry); save(); render(); } });
      });
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!d.pos || !d.shifts.length) { toast('Chọn vị trí và ít nhất một ca'); return; }
        const swap = f.dswap.checked;
        const base = { date: f.ddate.value || keyOf(), pos: d.pos, note: f.dnote.value.trim(), swap, swapWith: swap ? f.dwith.value.trim() : '', reported: swap && f.drep.checked };
        D.lastPos = d.pos;
        let n = 0;
        if (entry) { Object.assign(entry, base, { shift: d.shifts[0] }); n = 1; }
        else d.shifts.forEach((sid) => {
          if (!D.entries.some((x) => x.date === base.date && x.pos === base.pos && x.shift === sid)) { D.entries.push({ id: uid(), ...base, shift: sid, checks: [] }); n++; }
        });
        save(); closeSheet(); render();
        toast(swap && !base.reported ? 'Đã lưu · nhớ báo cáo Ban Giám đốc việc đổi ca' : entry ? 'Đã lưu ca trực' : `Đã thêm ${n} ca · ${dayLabel(base.date)}`);
      });
    });
  }

  function dutyPosSheet(p) {
    const D = S.duty;
    const d = p ? JSON.parse(JSON.stringify(p)) : { name: '', color: DUTY_COLORS[D.positions.length % DUTY_COLORS.length], shifts: [{ id: uid(), name: 'Ca 1', start: '07:30', end: '11:30' }], checklist: [] };
    d.checklist = d.checklist || [];
    openSheet(`<h3>${p ? 'Sửa vị trí trực' : 'Vị trí trực mới'}</h3>
      <form id="pf2" autocomplete="off">
        <label class="field"><span>Tên vị trí</span><input class="input" name="pname" maxlength="60" required value="${esc(d.name)}" placeholder="Ví dụ: Trực phòng máy"></label>
        <div class="field"><span>Màu</span><div class="color-row" id="pc">${DUTY_COLORS.map((c) => `<button type="button" data-v="${c}" style="--c:${c}" class="${c === d.color ? 'on' : ''}" aria-label="Chọn màu"></button>`).join('')}</div></div>
        <div class="field"><span>Các ca (tên · bắt đầu · kết thúc)</span><div id="pss" class="ps-list"></div>
          <button type="button" class="btn btn-ghost btn-block" id="padd" style="height:44px;margin-top:8px">${ic('plus')} Thêm ca</button></div>
        <label class="field"><span>Việc cần làm trong ca (mỗi dòng một việc)</span><textarea class="input" name="pcheck" rows="4" placeholder="Ví dụ:&#10;Ghi sổ nhật ký ca trực&#10;Kiểm tra thiết bị đầu ca">${esc(d.checklist.join('\n'))}</textarea></label>
        <button class="btn btn-primary btn-block" type="submit">${p ? 'Lưu thay đổi' : 'Lưu vị trí'}</button>
        ${p ? `<button type="button" class="btn btn-danger btn-block" id="pdel" style="margin-top:10px">${ic('trash')} Xóa vị trí</button>` : ''}
      </form>`, (sh) => {
      const f = $('#pf2', sh);
      const draw = () => {
        $('#pss', sh).innerHTML = d.shifts.map((x, i) => `<div class="ps-row" data-i="${i}"><input class="input" data-k="name" value="${esc(x.name)}" maxlength="20" aria-label="Tên ca"><input class="input" type="time" data-k="start" value="${x.start}" aria-label="Bắt đầu"><input class="input" type="time" data-k="end" value="${x.end}" aria-label="Kết thúc"><button type="button" data-del="${i}" aria-label="Xóa ca">${ic('x')}</button></div>`).join('');
      };
      draw();
      $('#pss', sh).addEventListener('input', (e) => { const row = e.target.closest('.ps-row'); if (row) d.shifts[+row.dataset.i][e.target.dataset.k] = e.target.value; });
      $('#pss', sh).addEventListener('click', (e) => { const b = e.target.closest('[data-del]'); if (b) { d.shifts.splice(+b.dataset.del, 1); draw(); } });
      $('#padd', sh).addEventListener('click', () => {
        const last = d.shifts[d.shifts.length - 1];
        d.shifts.push({ id: uid(), name: `Ca ${d.shifts.length + 1}`, start: last ? last.end : '07:30', end: last ? last.end : '11:30' }); draw();
      });
      $('#pc', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        d.color = b.dataset.v; $$('#pc button', sh).forEach((x) => x.classList.toggle('on', x === b));
      });
      if (p) $('#pdel', sh).addEventListener('click', () => {
        const used = D.entries.filter((e) => e.pos === p.id).length;
        if (used && !confirm(`Vị trí này có ${used} ca đã nhập. Xóa cả các ca đó?`)) return;
        const idx = D.positions.indexOf(p), removed = D.entries.filter((e) => e.pos === p.id);
        D.positions.splice(idx, 1); D.entries = D.entries.filter((e) => e.pos !== p.id);
        save(); closeSheet(); render();
        toast('Đã xóa vị trí trực', { fn: () => { D.positions.splice(idx, 0, p); D.entries.push(...removed); save(); render(); } });
      });
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = f.pname.value.trim(); if (!name) return;
        const shifts = d.shifts.filter((x) => x.name.trim() && x.start && x.end).map((x) => ({ ...x, name: x.name.trim() }));
        if (!shifts.length) { toast('Cần ít nhất một ca có giờ bắt đầu và kết thúc'); return; }
        const data = { name, color: d.color, shifts, checklist: f.pcheck.value.split('\n').map((x) => x.trim()).filter(Boolean) };
        if (p) Object.assign(p, data); else D.positions.push({ id: uid(), ...data });
        save(); closeSheet(); render(); toast(p ? 'Đã lưu vị trí trực' : 'Đã thêm vị trí trực');
      });
    });
  }

  function dutyPasteSheet() {
    openSheet(`<h3>Dán giờ ca từ văn bản</h3>
      <p class="page-sub" style="margin-top:-10px">Sao chép phần “Thời gian ca trực” trong văn bản lịch trực rồi dán vào đây. Dòng tên vị trí đứng trước, sau đó là các ca dạng “Ca 1: Từ 7h30 đến 13h”.</p>
      <textarea class="input" id="pt" rows="7" placeholder="- Trực phòng máy&#10;Ca 1: Từ 7h30 đến 12h; Ca 2: Từ 12h đến 17h; …"></textarea>
      <div id="pprev" class="pprev"></div>
      <button class="btn btn-primary btn-block" id="pgo" disabled style="margin-top:14px">Nhập</button>`, (sh) => {
      let parsed = [];
      const run = () => {
        const v = $('#pt', sh).value;
        parsed = parseShiftText(v);
        $('#pprev', sh).innerHTML = parsed.length
          ? parsed.map((p) => `<div class="pp"><b>${esc(p.name)}</b><span>${p.shifts.map((x) => `${x.name}: ${x.start}–${x.end}`).join(' · ')}</span></div>`).join('')
          : v.trim() ? '<p class="page-sub" style="margin:8px 4px 0">Chưa nhận ra ca nào. Kiểm tra dạng “Ca 1: Từ 7h30 đến 13h”.</p>' : '';
        const n = parsed.reduce((a, p) => a + p.shifts.length, 0);
        $('#pgo', sh).disabled = !parsed.length;
        $('#pgo', sh).textContent = parsed.length ? `Nhập ${parsed.length} vị trí, ${n} ca` : 'Nhập';
      };
      $('#pt', sh).addEventListener('input', run);
      $('#pgo', sh).addEventListener('click', () => {
        const D = S.duty;
        parsed.forEach((np) => {
          const ex = D.positions.find((p) => p.name.toLowerCase() === np.name.toLowerCase());
          if (ex) np.shifts.forEach((ns) => { const old = ex.shifts.find((x) => x.name === ns.name); if (old) Object.assign(old, { start: ns.start, end: ns.end }); else ex.shifts.push({ id: uid(), ...ns }); });
          else D.positions.push({ id: uid(), name: np.name, color: DUTY_COLORS[D.positions.length % DUTY_COLORS.length], shifts: np.shifts.map((x) => ({ id: uid(), ...x })), checklist: [] });
        });
        if (!D.dayStartSet && parsed[0] && parsed[0].shifts[0]) D.dayStart = parsed[0].shifts[0].start;
        S.shift.on = true; S.shift.mode = 'week';
        save(); closeSheet(); render();
        toast(`Đã nhập ${parsed.length} vị trí trực · ngày trực bắt đầu lúc ${D.dayStart}`);
      });
      setTimeout(() => $('#pt', sh).focus(), 320);
    });
  }

  function dutyContactSheet() {
    openSheet(`<h3>Thêm liên hệ</h3>
      <form id="cf" autocomplete="off">
        <label class="field"><span>Họ tên</span><input class="input" name="cname" maxlength="60" required></label>
        <label class="field"><span>Số điện thoại</span><input class="input" name="cphone" type="tel" inputmode="tel" maxlength="20" required></label>
        <label class="field"><span>Ghi chú</span><input class="input" name="cnote" maxlength="60" placeholder="Ví dụ: phụ trách tổ"></label>
        <button class="btn btn-primary btn-block" type="submit">Lưu</button>
      </form>`, (sh) => {
      const f = $('#cf', sh);
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!f.cname.value.trim() || !f.cphone.value.trim()) return;
        S.duty.contacts.push({ name: f.cname.value.trim(), phone: f.cphone.value.trim(), note: f.cnote.value.trim() });
        save(); closeSheet(); render(); toast('Đã lưu liên hệ');
      });
      setTimeout(() => f.cname.focus(), 320);
    });
  }

  // Xuất file .ics để Lịch của điện thoại tự nhắc trước giờ vào ca (kể cả khi app đóng)
  function dutyICS(mon) {
    const ents = Array.from({ length: 7 }, (_, i) => addDays(mon, i)).flatMap(entriesOn);
    if (!ents.length) { toast('Tuần này chưa có ca nào để xuất'); return; }
    const f = (t) => { const d = new Date(t); return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`; };
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    const escI = (x) => String(x).replace(/[\\;,]/g, (m) => '\\' + m).replace(/\n/g, '\\n');
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AK Planner//Lich truc//VI', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:Lịch trực'];
    ents.forEach((x) => lines.push('BEGIN:VEVENT', `UID:${x.e.id}@ak-planner`, `DTSTAMP:${stamp}`, `DTSTART:${f(x.start)}`, `DTEND:${f(x.end)}`,
      `SUMMARY:${escI(`Trực ${x.label}`)}`, ...(x.e.note ? [`DESCRIPTION:${escI(x.e.note)}`] : []),
      'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${escI(`Sắp vào ca: ${x.label}`)}`, 'TRIGGER:-PT30M', 'END:VALARM', 'END:VEVENT'));
    lines.push('END:VCALENDAR');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' }));
    a.download = `lich-truc-${mon}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast(`Đã tạo file ${ents.length} ca. Mở file để thêm vào Lịch, nhắc trước 30 phút`);
  }

  function shiftDaySheet(k) {
    const cur = shiftOn(k);
    openSheet(`<h3>Đổi ca · ${dayLabel(k)}</h3>
      ${Object.entries(SHIFT_TYPES).map(([id, t]) => `<button class="menu-item" data-v="${id}"><span class="mi" style="background:color-mix(in srgb, ${t.color} 16%, transparent);color:${t.color}">${t.short}</span><span style="flex:1">${t.name}${t.time ? ` <small class="hint">${t.time}</small>` : ''}</span>${cur && cur.id === id ? `<span style="color:var(--primary)">${ic('check', 'width="20" height="20" stroke-width="3"')}</span>` : ''}</button>`).join('')}
      ${S.shiftOv[k] ? `<button class="menu-item" data-v=""><span class="mi">${ic('reset')}</span>Theo chu kỳ</button>` : ''}`, (sh) => {
      sh.addEventListener('click', (e) => {
        const b = e.target.closest('[data-v]'); if (!b) return;
        if (b.dataset.v) S.shiftOv[k] = b.dataset.v; else delete S.shiftOv[k];
        save(); closeSheet(); render();
      });
    });
  }

  function toggleTask(id, occ) {
    const t = S.tasks.find((x) => x.id === id); if (!t) return;
    const today = keyOf();
    const wasAllDone = tasksOn(today).every((x) => x.done);
    let nowDone;
    if (t.repeat) {
      const k = occ || today;
      t.doneDates = t.doneDates || {};
      if (t.doneDates[k]) delete t.doneDates[k]; else t.doneDates[k] = Date.now();
      nowDone = !!t.doneDates[k];
    } else {
      t.done = !t.done; t.doneAt = t.done ? Date.now() : null; nowDone = t.done;
    }
    save();
    if (nowDone && navigator.vibrate) navigator.vibrate(12);
    render();
    const el = $(`.task[data-id="${id}"]${t.repeat ? `[data-occ="${occ || today}"]` : ''}`);
    el && el.classList.add('pop');
    const list = tasksOn(today);
    if (nowDone && list.length && list.every((x) => x.done) && !wasAllDone) celebrate('Xuất sắc! Bạn đã xong mọi việc hôm nay 🎉');
    return nowDone;
  }

  function toggleSub(t, sid) {
    const src = t.src || t;
    if (src.repeat) {
      const k = t.occ || keyOf();
      src.subDone = src.subDone || {};
      const a = src.subDone[k] || [];
      src.subDone[k] = a.includes(sid) ? a.filter((x) => x !== sid) : [...a, sid];
    } else {
      const x = (src.subs || []).find((y) => y.id === sid); if (x) x.done = !x.done;
    }
    save();
    const fresh = getT(src.id, t.occ);
    const subs = fresh.subs || [];
    if (subs.length && subDone(fresh).length === subs.length && !fresh.done) toast('Đã xong mọi bước 👏', { label: 'Hoàn thành việc', fn: () => toggleTask(src.id, t.occ) });
  }

  // ---------- Focus timer ----------
  let tickT = null;
  function runningElapsed() {
    const tm = S.timer;
    if (!tm || !tm.endsAt) return 0;
    const remain = Math.max(0, (tm.endsAt - Date.now()) / 1000);
    return Math.max(0, tm.segStart - remain);
  }
  function timerRemaining() {
    const tm = S.timer; if (!tm) return S.focusPreset * 60;
    return tm.endsAt ? Math.max(0, (tm.endsAt - Date.now()) / 1000) : tm.remaining;
  }
  function credit(sec) {
    if (sec < 1) return;
    const k = keyOf();
    S.focusLog[k] = Math.round((S.focusLog[k] || 0) + sec);
  }
  function timerStart() {
    if (!S.timer) S.timer = { total: S.focusPreset * 60, remaining: S.focusPreset * 60 };
    S.timer.segStart = S.timer.remaining;
    S.timer.endsAt = Date.now() + S.timer.remaining * 1000;
    save(); ensureTick();
    if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission().catch(() => {});
  }
  function timerPause() {
    const tm = S.timer; if (!tm || !tm.endsAt) return;
    const rem = timerRemaining();
    credit(tm.segStart - rem);
    tm.remaining = rem; tm.endsAt = null; tm.segStart = rem;
    save();
  }
  function timerReset() {
    if (S.timer && S.timer.endsAt) timerPause();
    S.timer = null; save();
  }
  function timerComplete() {
    const tm = S.timer;
    credit(tm.segStart);
    S.timer = null; save();
    beep();
    navigator.vibrate && navigator.vibrate([200, 100, 200]);
    toast('Hoàn thành phiên tập trung! Nghỉ ngơi chút nhé ☕');
    try { if ('Notification' in window && Notification.permission === 'granted' && document.hidden) new Notification('AK Planner', { body: 'Hết giờ tập trung! Nghỉ ngơi chút nhé ☕', icon: 'icons/icon-192.png' }); } catch {}
  }
  function beep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.28, 0.56].forEach((t, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.frequency.value = [660, 880, 990][i]; o.type = 'sine';
        g.gain.setValueAtTime(0.0001, ctx.currentTime + t);
        g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t + 0.25);
        o.connect(g).connect(ctx.destination); o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + 0.3);
      });
    } catch {}
  }
  function ensureTick() {
    if (tickT) return;
    tickT = setInterval(tick, 1000);
    tick();
  }
  function tick() {
    const tm = S.timer;
    if (!tm || !tm.endsAt) { clearInterval(tickT); tickT = null; updateTimerUI(); return; }
    if (timerRemaining() <= 0) { timerComplete(); clearInterval(tickT); tickT = null; updateTimerUI(); if (!$('.sheet')) render(); return; }
    updateTimerUI();
  }
  function updateTimerUI() {
    const rem = Math.ceil(timerRemaining());
    const total = S.timer ? S.timer.total : S.focusPreset * 60;
    const running = !!(S.timer && S.timer.endsAt);
    const txt = $('#t-txt');
    if (txt) {
      txt.textContent = `${pad(Math.floor(rem / 60))}:${pad(rem % 60)}`;
      const C = 2 * Math.PI * 108;
      $('#t-prog').style.strokeDashoffset = String(C * (1 - (total - rem) / total));
      $('#t-state').textContent = running ? 'Đang tập trung' : S.timer ? 'Tạm dừng' : 'Sẵn sàng';
      $('#t-main').innerHTML = running ? `${ic('pause')} Tạm dừng` : `${ic('play')} ${S.timer ? 'Tiếp tục' : 'Bắt đầu'}`;
      $$('#t-presets button').forEach((b) => { b.disabled = !!S.timer; b.classList.toggle('on', +b.dataset.p === (S.timer ? Math.round(total / 60) : S.focusPreset)); });
    }
    const fs = $('#focus-stat');
    if (fs) { const f = fmtDur(focusOn(keyOf()) + runningElapsed()); fs.innerHTML = `${f.h}<small>h</small>${pad(f.m)}<small>m</small>`; }
  }
  function focusSheet() {
    const C = 2 * Math.PI * 108;
    const f = fmtDur(focusOn(keyOf()));
    openSheet(`
      <h3>Phiên tập trung</h3>
      <div class="seg" id="t-presets" style="margin-bottom:18px">${[15, 25, 45, 60].map((p) => `<button data-p="${p}">${p} phút</button>`).join('')}</div>
      <div class="timer">
        <svg viewBox="0 0 240 240" aria-hidden="true">
          <defs><linearGradient id="tg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6fe39a"/><stop offset="1" stop-color="#18a957"/></linearGradient></defs>
          <circle class="track" cx="120" cy="120" r="108" fill="none" stroke-width="14"/>
          <circle class="prog" id="t-prog" cx="120" cy="120" r="108" fill="none" stroke-width="14" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}"/>
        </svg>
        <div class="timer-txt"><div><b id="t-txt">00:00</b><span id="t-state"></span></div></div>
      </div>
      <p class="page-sub" style="text-align:center;margin:-6px 0 18px">Hôm nay đã tập trung ${f.h} giờ ${f.m} phút</p>
      <div class="timer-ctrl">
        <button class="btn btn-ghost" id="t-reset" aria-label="Đặt lại">${ic('reset')}</button>
        <button class="btn btn-primary" id="t-main"></button>
      </div>`, (sh) => {
      updateTimerUI();
      $('#t-presets', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b || S.timer) return;
        S.focusPreset = +b.dataset.p; save(); updateTimerUI();
      });
      $('#t-main', sh).addEventListener('click', () => {
        if (S.timer && S.timer.endsAt) timerPause(); else timerStart();
        updateTimerUI();
      });
      $('#t-reset', sh).addEventListener('click', () => { timerReset(); updateTimerUI(); });
    }, () => setTimeout(render, 0));
  }

  // ---------- Search & notifications ----------
  function searchSheet() {
    openSheet(`
      <h3>Tìm kiếm</h3>
      <div class="search-box">${ic('search')}<input class="input" id="q" type="search" placeholder="Tìm công việc…" enterkeyhint="search"></div>
      <div class="tasks" id="qr"></div>`, (sh) => {
      const q = $('#q', sh), out = $('#qr', sh);
      const run = () => {
        const s = q.value.trim().toLowerCase();
        const norm = (x) => x.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
        const res = s ? S.tasks.filter((t) => norm(t.title.toLowerCase()).includes(norm(s))).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 30) : [];
        out.innerHTML = s ? (res.length ? res.map((t) => taskHTML(t, true)).join('') : '<p class="page-sub" style="text-align:center">Không tìm thấy kết quả</p>') : '<p class="page-sub" style="text-align:center">Nhập từ khóa để tìm công việc</p>';
      };
      q.addEventListener('input', run); run();
      setTimeout(() => q.focus(), 320);
      out.addEventListener('click', (e) => {
        const el = e.target.closest('.task'); if (!el) return;
        const t = S.tasks.find((x) => x.id === el.dataset.id);
        if (e.target.closest('[data-act="toggle"]')) { toggleTask(t.id, t.repeat ? keyOf() : undefined); run(); return; }
        const day = t.repeat ? keyOf() : t.date;
        ui.calSel = day; ui.calWeek = mondayOf(day); closeSheet(); ui.tab = ''; go('calendar');
      });
    });
  }

  function notifSheet() {
    const od = overdueList(), up = upcoming(), rl = readLeftMin(), evs = upcomingEvents(3);
    const dn = dutyNotes();
    const item = (t, kind) => `<div class="notif">
      <span class="mi" style="${kind === 'od' ? 'background:rgba(255,110,110,.12);color:#f05454' : 'background:var(--primary-soft);color:var(--primary)'}">${ic(kind === 'od' ? 'alert' : 'clock')}</span>
      <div><b>${esc(t.title)}</b><span>${kind === 'od' ? 'Quá hạn · ' : 'Sắp tới · '}${dayLabel(t.date)}, ${fmtTime(t.time)}</span></div></div>`;
    openSheet(`
      <h3>Thông báo</h3>
      ${od.length || up.length || rl || evs.length || dn.length ? `<div class="list glass" style="padding:4px 12px">${dn.map((x) => `<button class="notif" style="width:100%;text-align:left" ${x.week ? `data-duty-week="${x.week}"` : x.entry ? `data-duty-entry="${x.entry}"` : 'data-duty-go'}><span class="mi" style="background:color-mix(in srgb, ${x.color} 16%, transparent);color:${x.color};font-size:13px;font-weight:800">${x.badge}</span><div><b>${esc(x.title)}</b><span>${esc(x.sub)}</span></div></button>`).join('')}${evs.map(({ e, next }) => `<div class="notif"><span class="mi" style="background:rgba(214,48,58,.1)">${EV_TYPES[e.type][1]}</span><div><b>${esc(e.title)}</b><span>${daysBetween(keyOf(), next) === 0 ? 'Hôm nay' : daysBetween(keyOf(), next) === 1 ? 'Ngày mai' : `Còn ${daysBetween(keyOf(), next)} ngày`} · ${fmtDM(next)}</span></div></div>`).join('')}${rl ? `<button class="notif" data-open-read style="width:100%;text-align:left"><span class="mi" style="background:color-mix(in srgb, var(--c-study) 14%, transparent);color:var(--c-study)">${ic('book')}</span><div><b>Còn ${rl} phút đọc sách hôm nay</b><span>Chạm để đọc ngay · giữ chuỗi ${readStreak()} ngày</span></div></button>` : ''}${up.map((t) => item(t, 'up')).join('')}${od.map((t) => item(t, 'od')).join('')}</div>` : '<div class="empty"><div class="big">🔔</div>Bạn không có thông báo nào.<br>Mọi thứ đều đang đúng tiến độ!</div>'}`, (sh) => {
      sh.addEventListener('click', (e) => {
        if (e.target.closest('[data-open-read]')) { const L = featuredLesson(); L && openReader(L.id); return; }
        const w = e.target.closest('[data-duty-week]'), en = e.target.closest('[data-duty-entry]'), g = e.target.closest('[data-duty-go]');
        if (w) { closeSheet(true); ui.dutyWeek = w.dataset.dutyWeek; ui.tab === 'shift' ? render() : go('shift'); }
        else if (en) { dutySheet(S.duty.entries.find((x) => x.id === en.dataset.dutyEntry)); }
        else if (g) { closeSheet(true); go('shift'); }
      });
    });
  }

  // ---------- Profile actions ----------
  function profileSheet() {
    openSheet(`
      <h3>Sửa thông tin</h3>
      <form id="pf">
        <label class="field"><span>Tên của bạn</span><input class="input" name="name" maxlength="30" value="${esc(S.name)}" required></label>
        <label class="field"><span>Lời nhắn cho bản thân</span><input class="input" name="tagline" maxlength="80" value="${esc(S.tagline)}"></label>
        <button class="btn btn-primary btn-block" type="submit">Lưu</button>
      </form>`, (sh) => {
      $('#pf', sh).addEventListener('submit', (e) => {
        e.preventDefault();
        S.name = e.target.name.value.trim() || S.name;
        S.tagline = e.target.tagline.value.trim();
        save(); closeSheet(); render(); toast('Đã cập nhật thông tin');
      });
    });
  }
  function avatarSheet() {
    openSheet(`
      <h3>Ảnh đại diện</h3>
      <div class="emoji-grid">${EMOJIS.map((e) => `<button data-e="${e}" class="${S.avatar && S.avatar.value === e ? 'on' : ''}">${e}</button>`).join('')}</div>
      <label class="btn btn-ghost btn-block">${ic('camera')} Chọn ảnh từ máy<input type="file" accept="image/*" class="sr-only" id="af"></label>`, (sh) => {
      $('.emoji-grid', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        S.avatar = { type: 'emoji', value: b.dataset.e }; save(); closeSheet(); render();
      });
      $('#af', sh).addEventListener('change', (e) => {
        const file = e.target.files[0]; if (!file) return;
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
          const c = document.createElement('canvas'); const s = 320; c.width = c.height = s;
          const m = Math.min(img.width, img.height);
          c.getContext('2d').drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, s, s);
          S.avatar = { type: 'img', value: c.toDataURL('image/jpeg', 0.85) };
          URL.revokeObjectURL(url); save(); closeSheet(); render(); toast('Đã đổi ảnh đại diện');
        };
        img.onerror = () => toast('Không đọc được ảnh này');
        img.src = url;
      });
    });
  }
  function choiceSheet(title, opts, cur, onPick) {
    openSheet(`<h3>${title}</h3>${opts.map(([v, l, i]) => `<button class="menu-item" data-v="${v}"><span class="mi">${ic(i)}</span><span style="flex:1">${l}</span>${String(v) === String(cur) ? `<span style="color:var(--primary)">${ic('check', 'width="20" height="20" stroke-width="3"')}</span>` : ''}</button>`).join('')}`, (sh) => {
      sh.addEventListener('click', (e) => { const b = e.target.closest('[data-v]'); if (b) { onPick(b.dataset.v); closeSheet(); render(); } });
    });
  }
  function installSheet() {
    if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt = null; return; }
    openSheet(`
      <h3>Cài lên màn hình chính</h3>
      <div class="list glass" style="padding:4px 12px">
        <div class="notif"><span class="mi" style="background:var(--primary-soft);color:var(--primary)">${ic('phone')}</span><div><b>iPhone (Safari)</b><span>Bấm nút Chia sẻ → “Thêm vào MH chính”.</span></div></div>
        <div class="notif"><span class="mi" style="background:var(--primary-soft);color:var(--primary)">${ic('phone')}</span><div><b>Android (Chrome)</b><span>Bấm menu ⋮ → “Cài đặt ứng dụng” hoặc “Thêm vào màn hình chính”.</span></div></div>
      </div>
      <p class="footnote">Sau khi cài, app mở toàn màn hình và dùng được cả khi không có mạng.</p>`);
  }
  function exportData() {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `ak-planner-${keyOf()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('Đã tải file sao lưu');
  }
  function importData() {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'application/json,.json';
    inp.onchange = async () => {
      try {
        const d = JSON.parse(await inp.files[0].text());
        if (!d || !Array.isArray(d.tasks)) throw 0;
        S = { ...seed(), ...d, focusLog: d.focusLog || {} };
        normalize(); save(); applyTheme(); render(); toast('Đã khôi phục dữ liệu');
      } catch { toast('File sao lưu không hợp lệ'); }
    };
    inp.click();
  }

  // ---------- Global events ----------
  $('#view').addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const act = b.dataset.act;
    const taskEl = b.closest('.task');
    const t = taskEl && getT(taskEl.dataset.id, taskEl.dataset.occ);
    const today = keyOf();
    switch (act) {
      case 'toggle': toggleTask(t.id, t.occ); break;
      case 'edit': taskSheet(t); break;
      case 'menu': taskMenu(t); break;
      case 'subs': ui.open[tkey(t)] = !ui.open[tkey(t)]; render(); break;
      case 'sub': toggleSub(t, b.dataset.sid); render(); break;
      case 'show-done': ui.showDone = !ui.showDone; render(); break;
      case 'pick-top3': top3Sheet(); break;
      case 'review': reviewSheet(b.dataset.day || today); break;
      case 'go-journal': go('journal'); break;
      case 'go': go(b.dataset.to); break;
      case 'habit-tap': { const h = S.habits.find((x) => x.id === b.dataset.hid); if (h) hTap(h); break; }
      case 'habit-new': habitSheet(); break;
      case 'habit-edit': habitSheet(S.habits.find((x) => x.id === b.dataset.hid)); break;
      case 'habit-quick':
        S.habits.push({ id: uid(), name: b.dataset.name, icon: b.dataset.icon, color: HABIT_COLORS[S.habits.length % HABIT_COLORS.length], days: ALL_DAYS.slice(), target: 1, created: today });
        save(); render(); toast('Đã thêm thói quen 🌱');
        break;
      case 'event-new': eventSheet(); break;
      case 'event-edit': eventSheet(S.events.find((x) => x.id === b.dataset.eid)); break;
      case 'm-new': moneySheet(); break;
      case 'm-edit': moneySheet(S.money.find((x) => x.id === b.dataset.mid)); break;
      case 'm-month': ui.moneyMonth = shiftMonth(ui.moneyMonth || today.slice(0, 7), +b.dataset.n); render(); break;
      case 'm-budget': budgetSheet(); break;
      case 'lu-month': ui.lunarMonth = shiftMonth(ui.lunarMonth || (ui.lunarSel || today).slice(0, 7), +b.dataset.n); render(); break;
      case 'lu-pick': ui.lunarSel = b.dataset.day; render(); break;
      case 'shift-toggle': S.shift.on = !S.shift.on; save(); render(); break;
      case 'shift-tpl': {
        const tpl = SHIFT_TPL[+b.dataset.i];
        S.shift.cycle = tpl[1].slice();
        S.shift.start = tpl[1].length === 7 ? mondayOf(today) : today;
        save(); render(); toast(`Đã áp dụng: ${tpl[0]}`);
        break;
      }
      case 'shift-add': S.shift.cycle.push(b.dataset.id); save(); render(); break;
      case 'shift-rm': S.shift.cycle.splice(+b.dataset.i, 1); save(); render(); break;
      case 'shift-clear': S.shift.cycle = []; save(); render(); break;
      case 'shift-day': shiftDaySheet(b.dataset.day); break;
      case 'shift-mode': S.shift.mode = b.dataset.v; save(); render(); break;
      case 'duty-wk': ui.dutyWeek = addDays(ui.dutyWeek || defaultDutyWeek(), +b.dataset.n); render(); break;
      case 'duty-week': ui.dutyWeek = b.dataset.mon; ui.tab === 'shift' ? render() : go('shift'); break;
      case 'duty-add': dutySheet(null, b.dataset.day); break;
      case 'duty-edit': { const en = S.duty.entries.find((x) => x.id === b.dataset.id); if (en) dutySheet(en); break; }
      case 'duty-pos': dutyPosSheet(posOf(b.dataset.id)); break;
      case 'duty-pos-new': dutyPosSheet(); break;
      case 'duty-paste': dutyPasteSheet(); break;
      case 'duty-ics': dutyICS(b.dataset.mon); break;
      case 'duty-contact-new': dutyContactSheet(); break;
      case 'duty-contact-del': {
        const i = +b.dataset.i, c = S.duty.contacts.splice(i, 1)[0]; save(); render();
        toast('Đã xóa liên hệ', { fn: () => { S.duty.contacts.splice(i, 0, c); save(); render(); } });
        break;
      }
      case 'duty-remind': S.duty.remind = !S.duty.remind; save(); render(); break;
      case 'duty-check': {
        const en = S.duty.entries.find((x) => x.id === b.dataset.id); if (!en) break;
        const i = +b.dataset.i; en.checks = en.checks || [];
        en.checks = en.checks.includes(i) ? en.checks.filter((x) => x !== i) : [...en.checks, i];
        save(); render();
        break;
      }
      case 'duty-copy': {
        const mon = b.dataset.mon, prev = S.duty.entries.filter((e) => e.date >= addDays(mon, -7) && e.date <= addDays(mon, -1));
        if (!prev.length) { toast('Tuần trước chưa có ca nào'); break; }
        const added = [];
        prev.forEach((e) => {
          const nd = addDays(e.date, 7);
          if (!S.duty.entries.some((x) => x.date === nd && x.pos === e.pos && x.shift === e.shift)) {
            const ne = { id: uid(), date: nd, pos: e.pos, shift: e.shift, note: e.note || '', swap: false, swapWith: '', reported: false, checks: [] };
            S.duty.entries.push(ne); added.push(ne);
          }
        });
        save(); render();
        toast(`Đã chép ${added.length} ca từ tuần trước`, { fn: () => { S.duty.entries = S.duty.entries.filter((x) => !added.includes(x)); save(); render(); } });
        break;
      }
      case 'mood': {
        const j = jour(today), v = +b.dataset.v;
        j.mood = j.mood === v ? undefined : v; save(); render();
        if (j.mood) toast(`Đã ghi nhận: ${MOODS[v - 1].e} ${MOODS[v - 1].l}`);
        break;
      }
      case 'water-plus': {
        S.water[today] = waterOn(today) + 1; save(); render();
        if (S.water[today] === S.waterGoal) celebrate(`Tuyệt! Bạn đã uống đủ ${S.waterGoal} ly nước hôm nay 💧`);
        break;
      }
      case 'water-minus': if (waterOn(today) > 0) { S.water[today]--; save(); render(); } break;
      case 'water-goal':
        choiceSheet('Mục tiêu uống nước', [6, 8, 10, 12].map((p) => [p, `${p} ly (~${(p * 0.25).toString().replace('.', ',')} lít)`, 'drop']), S.waterGoal, (v) => { S.waterGoal = +v; save(); });
        break;
      case 'add': taskSheet(); break;
      case 'search': searchSheet(); break;
      case 'notif': notifSheet(); break;
      case 'focus': focusSheet(); break;
      case 'go-analytics': go('analytics'); break;
      case 'go-profile': go('profile'); break;
      case 'go-back': go(MAIN_TABS.includes(ui.prevTab) ? ui.prevTab : 'home'); break;
      case 'open-read': openReader(b.dataset.id); break;
      case 'read-cat': ui.readCat = b.dataset.cat; render(); break;
      case 'add-read': addReadSheet(); break;
      case 'next-quote': {
        ui.quoteOff++;
        const q = quoteOfDay(ui.quoteOff);
        $('.qc-t', b).textContent = `“${q.t}”`; $('.qc-a', b).textContent = `— ${q.a}`;
        $('.qc-lbl', b).lastChild.textContent = ' Châm ngôn';
        b.classList.remove('flip'); void b.offsetWidth; b.classList.add('flip');
        break;
      }
      case 'read-goal':
        choiceSheet('Mục tiêu đọc mỗi ngày', [5, 10, 15, 20, 30].map((p) => [p, `${p} phút`, 'book']), S.readGoal, (v) => { S.readGoal = +v; save(); });
        break;
      case 'roll': rollSheet(); break;
      case 'auto-roll':
        S.autoRoll = !S.autoRoll; save(); render();
        toast(S.autoRoll ? 'Việc chưa xong sẽ tự chuyển sang hôm sau' : 'Đã tắt tự chuyển việc');
        if (S.autoRoll) autoRollover();
        break;
      case 'see-all': ui.calSel = keyOf(); ui.calWeek = mondayOf(keyOf()); go('calendar'); break;
      case 'week-prev': ui.calWeek = addDays(ui.calWeek, -7); ui.calSel = ui.calWeek; render(); break;
      case 'week-next': ui.calWeek = addDays(ui.calWeek, 7); ui.calSel = ui.calWeek; render(); break;
      case 'week-today': ui.calSel = keyOf(); ui.calWeek = mondayOf(keyOf()); render(); break;
      case 'pick-day': ui.calSel = b.dataset.day; render(); break;
      case 'edit-profile': profileSheet(); break;
      case 'avatar': avatarSheet(); break;
      case 'theme':
        choiceSheet('Giao diện', [['auto', 'Theo hệ thống', 'phone'], ['light', 'Sáng', 'sun'], ['dark', 'Tối', 'moon']], S.theme, (v) => { S.theme = v; save(); applyTheme(); });
        break;
      case 'preset':
        choiceSheet('Thời lượng tập trung', [15, 25, 45, 60].map((p) => [p, `${p} phút`, 'clock']), S.focusPreset, (v) => { S.focusPreset = +v; save(); });
        break;
      case 'install': installSheet(); break;
      case 'export': exportData(); break;
      case 'import': importData(); break;
      case 'reset':
        if (confirm('Xóa toàn bộ công việc, dữ liệu tập trung và đọc sách? Không thể hoàn tác.')) {
          const keep = { name: S.name, tagline: S.tagline, avatar: S.avatar, theme: S.theme, focusPreset: S.focusPreset, readGoal: S.readGoal, readFont: S.readFont };
          S = { ...seed(), ...keep, tasks: [] }; normalize(); save(); render(); toast('Đã xóa dữ liệu');
        }
        break;
    }
  });

  $('#view').addEventListener('change', (e) => {
    if (e.target.id === 'sh-start' && e.target.value) { S.shift.start = e.target.value; save(); render(); }
    if (e.target.id === 'duty-daystart' && e.target.value) { S.duty.dayStart = e.target.value; S.duty.dayStartSet = true; save(); render(); toast(`Ngày trực bắt đầu lúc ${e.target.value}`); }
  });

  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });

  // Cập nhật khi quay lại app hoặc qua ngày mới
  let lastDay = keyOf();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return;
    if (S.timer && S.timer.endsAt) ensureTick();
    if (keyOf() !== lastDay) { lastDay = keyOf(); ui.calSel = lastDay; ui.calWeek = mondayOf(lastDay); autoRollover(); }
    if (R) { R.last = Date.now(); updateReadUI(); }
    if (!$('.sheet') && !R) render();
  });

  // ---------- Vuốt trên việc: phải = xong, trái = xóa / bỏ qua ----------
  let sw = null, swallowClick = false;
  $('#view').addEventListener('pointerdown', (e) => {
    const task = e.target.closest('.swipe > .task');
    if (!task || e.button > 0 || e.target.closest('input, textarea')) return;
    sw = { el: task, wrap: task.parentElement, x0: e.clientX, y0: e.clientY, dx: 0, active: false };
  });
  window.addEventListener('pointermove', (e) => {
    if (!sw) return;
    const dx = e.clientX - sw.x0, dy = e.clientY - sw.y0;
    if (!sw.active) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { sw = null; return; }
      if (Math.abs(dx) < 12) return;
      sw.active = true; sw.el.style.transition = 'none'; sw.wrap.classList.add('swiping');
    }
    sw.dx = dx;
    sw.el.style.transform = `translateX(${dx}px)`;
    sw.wrap.classList.toggle('to-r', dx > 0);
    sw.wrap.classList.toggle('to-l', dx < 0);
    const armed = Math.abs(dx) > 90;
    if (armed !== sw.wrap.classList.contains('armed') && armed && navigator.vibrate) navigator.vibrate(8);
    sw.wrap.classList.toggle('armed', armed);
  });
  const endSwipe = () => {
    if (!sw) return;
    const s = sw; sw = null;
    if (!s.active) return;
    swallowClick = true; setTimeout(() => (swallowClick = false), 60);
    s.el.style.transition = '';
    const id = s.el.dataset.id, occ = s.el.dataset.occ;
    if (Math.abs(s.dx) > 90) {
      s.el.style.transform = `translateX(${s.dx > 0 ? 110 : -110}%)`;
      setTimeout(() => {
        const t = getT(id, occ);
        if (!t) return;
        if (s.dx > 0) {
          const nowDone = toggleTask(id, occ);
          toast(nowDone ? 'Đã hoàn thành' : 'Đã bỏ đánh dấu', { fn: () => toggleTask(id, occ) });
        } else removeTask(t, t.repeat ? occ || keyOf() : undefined);
      }, 170);
    } else {
      s.el.style.transform = '';
      setTimeout(() => s.wrap.classList.remove('swiping', 'to-l', 'to-r', 'armed'), 200);
    }
  };
  window.addEventListener('pointerup', endSwipe);
  window.addEventListener('pointercancel', endSwipe);
  $('#view').addEventListener('click', (e) => { if (swallowClick) { e.stopPropagation(); e.preventDefault(); } }, true);

  // ---------- Màn chào lần đầu ----------
  function onboarding() {
    let step = 0;
    const data = { name: '', avatar: '👮🏻‍♂️', readGoal: 10, waterGoal: 8, habits: [] };
    const el = document.createElement('div');
    el.className = 'onboard';
    const seg = (id, vals, cur, unit) => `<div class="seg" id="${id}">${vals.map((v) => `<button type="button" data-v="${v}" class="${v === cur ? 'on' : ''}">${v} ${unit}</button>`).join('')}</div>`;
    const steps = [
      () => `<div class="ob-hero"><img class="ob-logo" src="icons/icon.svg" alt=""><h1>Chào mừng bạn!</h1>
        <p>Một nơi gọn gàng để sắp xếp công việc, rèn thói quen tốt và đọc sách mỗi ngày.</p>
        <ul class="ob-feats"><li><span>${ic('star')}</span>Top 3 việc quan trọng, việc lặp lại, các bước nhỏ</li><li><span>${ic('book')}</span>10 phút đọc sách mỗi ngày</li><li><span>${ic('drop')}</span>Uống nước, tâm trạng và nhật ký</li></ul></div>`,
      () => `<h2>Bạn tên là gì?</h2><p class="ob-sub">Để app chào bạn mỗi ngày.</p><input class="input" id="ob-name" maxlength="30" placeholder="Tên của bạn" value="${esc(data.name)}" autocomplete="given-name">`,
      () => `<h2>Chọn ảnh đại diện</h2><p class="ob-sub">Có thể đổi sang ảnh thật trong trang Cá nhân.</p><div class="emoji-grid" id="ob-emo">${EMOJIS.map((e) => `<button type="button" data-e="${e}" class="${data.avatar === e ? 'on' : ''}">${e}</button>`).join('')}</div>`,
      () => `<h2>Thói quen muốn rèn luyện</h2><p class="ob-sub">Chọn vài thói quen nhỏ để bắt đầu. Bỏ qua cũng được.</p>
        <div class="ob-habits" id="ob-hab">${HABIT_SUGGEST.map(([n, e]) => `<button type="button" data-n="${esc(n)}" data-e="${e}" class="${data.habits.some((x) => x[0] === n) ? 'on' : ''}"><em>${e}</em>${esc(n)}</button>`).join('')}</div>`,
      () => `<h2>Mục tiêu mỗi ngày</h2><p class="ob-sub">Bắt đầu vừa sức. Bạn có thể đổi bất cứ lúc nào.</p>
        <div class="field"><span>📚 Đọc sách</span>${seg('ob-read', [5, 10, 15, 20], data.readGoal, 'phút')}</div>
        <div class="field"><span>💧 Uống nước</span>${seg('ob-water', [6, 8, 10], data.waterGoal, 'ly')}</div>`,
    ];
    const draw = () => {
      el.innerHTML = `<div class="ob-wrap">
        <div class="ob-top">${step ? `<button class="icon-btn glass" data-ob="back" aria-label="Quay lại">${ic('chevL')}</button>` : '<span></span>'}
          <div class="ob-dots">${steps.map((_, i) => `<i class="${i === step ? 'on' : i < step ? 'past' : ''}"></i>`).join('')}</div><span></span></div>
        <div class="ob-body" key="${step}">${steps[step]()}</div>
        <button class="btn btn-primary btn-block" data-ob="next">${step === steps.length - 1 ? 'Bắt đầu sử dụng' : step === 0 ? 'Bắt đầu' : 'Tiếp tục'}</button></div>`;
      if (step === 1) setTimeout(() => { const i = $('#ob-name', el); i && i.focus(); }, 250);
    };
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.closest('#ob-hab')) {
        const n = b.dataset.n, i = data.habits.findIndex((x) => x[0] === n);
        if (i >= 0) data.habits.splice(i, 1); else data.habits.push([n, b.dataset.e]);
        b.classList.toggle('on', i < 0);
        return;
      }
      const grp = b.closest('#ob-emo, #ob-read, #ob-water');
      if (grp) {
        $$('button', grp).forEach((x) => x.classList.toggle('on', x === b));
        if (grp.id === 'ob-emo') data.avatar = b.dataset.e;
        if (grp.id === 'ob-read') data.readGoal = +b.dataset.v;
        if (grp.id === 'ob-water') data.waterGoal = +b.dataset.v;
        return;
      }
      if (b.dataset.ob === 'back') { if (step === 1) data.name = $('#ob-name', el).value.trim(); step--; draw(); return; }
      if (b.dataset.ob !== 'next') return;
      if (step === 1) {
        const v = $('#ob-name', el).value.trim();
        if (!v) { toast('Nhập tên của bạn nhé'); $('#ob-name', el).focus(); return; }
        data.name = v;
      }
      if (step < steps.length - 1) { step++; draw(); return; }
      Object.assign(S, { name: data.name, avatar: { type: 'emoji', value: data.avatar }, readGoal: data.readGoal, waterGoal: data.waterGoal, onboarded: true });
      data.habits.forEach(([n, e], i) => S.habits.push({ id: uid(), name: n, icon: e, color: HABIT_COLORS[i % HABIT_COLORS.length], days: ALL_DAYS.slice(), target: 1, created: keyOf() }));
      save();
      document.body.classList.remove('reading');
      el.classList.add('closing'); setTimeout(() => el.remove(), 260);
      render(true);
      toast(`Chào mừng ${data.name}! Bấm nút + để thêm việc đầu tiên 🎉`);
    });
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.id === 'ob-name') { e.preventDefault(); $('[data-ob=next]', el).click(); } });
    document.body.append(el);
    document.body.classList.add('reading');
    draw();
  }

  // ---------- Boot ----------
  applyTheme();
  render(true);
  if (!S.onboarded) onboarding();
  autoRollover();
  if (S.timer && S.timer.endsAt) ensureTick();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
