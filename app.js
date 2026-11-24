/* AK Planner — ứng dụng cá nhân: công việc, tập trung, mục tiêu.
   Thuần HTML/CSS/JS, dữ liệu lưu trong localStorage của thiết bị. */
(() => {
  'use strict';

  // ---------- Icons ----------
  const P = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="3"/><path d="M8 2.5v4M16 2.5v4M3 9.5h18M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 17h2M11 17h2"/>',
    chart: '<path d="M4 20V11M9.5 20V5M15 20v-8M20.5 20V8"/>',
    heart: '<path d="M12 20.5s-7.5-4.6-7.5-10.4A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 7.5 2.8c0 5.8-7.5 10.4-7.5 10.4z"/>',
    disk: '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v6.5c0 1.66 3.58 3 8 3s8-1.34 8-3V5.5M4 12v6.5c0 1.66 3.58 3 8 3s8-1.34 8-3V12"/>',
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
    duty: '<path d="M12 2.8l7.5 3.1v5.4c0 4.7-3.2 8.6-7.5 10.1-4.3-1.5-7.5-5.4-7.5-10.1V5.9z"/><circle cx="12" cy="11.6" r="4.2"/><path d="M12 9.5v2.3l1.6 1"/>',
    sprout: '<path d="M12 21v-8.5"/><path d="M12 12.5c0-4.2 3-6.5 7.5-6.5 0 4.2-3 6.5-7.5 6.5z"/><path d="M12 14.5c0-3.4-2.6-5.5-6.5-5.5 0 3.4 2.6 5.5 6.5 5.5z"/>',
    wallet: '<path d="M4 7.5h14.5A1.5 1.5 0 0 1 20 9v9.5a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 18.5z"/><path d="M4 7.5 15.5 4v3.5"/><path d="M15 12.5h5v3h-5a1.5 1.5 0 0 1 0-3z"/>',
    gift: '<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12"/><path d="M12 8C10.5 5 7 4.5 7 6.5S10 8 12 8zM12 8c1.5-3 5-3.5 5-1.5S14 8 12 8z"/>',
    moonstar: '<path d="M18.5 14.5A7.2 7.2 0 1 1 9.5 5.5a5.6 5.6 0 0 0 9 9z"/><path d="M17 3l.8 1.7 1.7.8-1.7.8L17 8l-.8-1.7-1.7-.8 1.7-.8z"/>',
    envelope: '<rect x="3" y="5.5" width="18" height="13" rx="2.2"/><path d="m3.6 7.2 8.4 6.2 8.4-6.2"/>',
    wins: '<path d="M4 8h3l2-3h6l2 3h3v12H4z"/><path d="M12 17.6s-3.2-1.9-3.2-4.1a1.7 1.7 0 0 1 3.2-.9 1.7 1.7 0 0 1 3.2.9c0 2.2-3.2 4.1-3.2 4.1z"/>',
    lock: '<rect x="5" y="11" width="14" height="9.5" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    share: '<path d="M12 15V3.5M7.5 8 12 3.5 16.5 8"/><path d="M5 12v7.5h14V12"/>',
    fridge: '<rect x="5.5" y="2.5" width="13" height="19" rx="2.6"/><path d="M5.5 9.5h13M8.8 5.5v2M8.8 12.5v3.5"/>',
    pin: '<path d="M9 3.5h6l-1 5.5 3.2 3.2v2H6.8v-2L10 9z"/><path d="M12 14.2v6.3"/>',
    chevU: '<path d="m6 15 6-6 6 6"/>',
    chevD: '<path d="m6 9 6 6 6-6"/>',
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

  const APP_VERSION = '1.24';
  const APP_DATE = '24/11/2026';
  const APP_NOTE = 'Thêm tiện ích Biết ơn: 3 điều biết ơn mỗi tối, soạn lời cảm ơn, danh sách lời cảm ơn chưa kịp nói';
  let swReg = null;

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
    S.shift = { on: !S.shift || S.shift.on !== false };
    delete S.shiftOv;
    S.duty = S.duty || {};
    S.duty.positions = Array.isArray(S.duty.positions) ? S.duty.positions : [];
    S.duty.entries = Array.isArray(S.duty.entries) ? S.duty.entries : [];
    S.duty.contacts = Array.isArray(S.duty.contacts) ? S.duty.contacts : [];
    if (S.duty.remind === undefined) S.duty.remind = true;
    S.duty.dayStart = S.duty.dayStart || '00:00';
    if (!S.duty.seeded) {
      // Hai vị trí trực và giờ ca được nhập sẵn
      const DEF = [
        { id: 'letan', name: 'Trực lễ tân, cửa giám sát', short: 'Lễ tân · Cửa giám sát', color: '#18a957',
          shifts: [['07:30', '13:00'], ['13:00', '18:00'], ['18:00', '21:30'], ['21:30', '00:30'], ['00:30', '04:00'], ['04:00', '07:30']] },
        { id: 'noc', name: 'Trực NOC', short: 'NOC', color: '#0f8a6a',
          shifts: [['07:30', '11:00'], ['11:00', '14:30'], ['14:30', '18:00'], ['18:00', '21:30'], ['21:30', '00:30'], ['00:30', '04:00'], ['04:00', '07:30']] },
      ];
      DEF.forEach((dp) => {
        const ex = S.duty.positions.find((p) => p.name.toLowerCase() === dp.name.toLowerCase());
        if (ex) { ex.short = ex.short || dp.short; return; }
        S.duty.positions.push({ id: dp.id, name: dp.name, short: dp.short, color: dp.color, checklist: [], shifts: dp.shifts.map(([a, b], i) => ({ id: `${dp.id}-c${i + 1}`, name: `Ca ${i + 1}`, start: a, end: b })) });
      });
      if (!S.duty.dayStartSet) S.duty.dayStart = '07:30';
      S.shift.on = true;
      S.duty.seeded = true;
    }
    S.letters = Array.isArray(S.letters) ? S.letters : [];
    S.wins = Array.isArray(S.wins) ? S.wins : [];
    S.pins = Array.isArray(S.pins) ? S.pins : ['shift', 'money', 'events', 'lunar'];
    S.fridge = Array.isArray(S.fridge) ? S.fridge : [];
    S.shop = Array.isArray(S.shop) ? S.shop : [];
    S.fridgeLog = Array.isArray(S.fridgeLog) ? S.fridgeLog : [];
    S.customFeels = Array.isArray(S.customFeels) ? S.customFeels : [];
    S.thanks = Array.isArray(S.thanks) ? S.thanks : [];
    // Màn chào 3 lần/ngày: sáng, trưa, tối — giờ chỉnh được
    const WC = { m: '06:00', n: '13:00', e: '18:30' };
    S.welcomeCfg = S.welcomeCfg && typeof S.welcomeCfg === 'object' ? S.welcomeCfg : {};
    Object.keys(WC).forEach((x) => { const c = S.welcomeCfg[x] || {}; S.welcomeCfg[x] = { on: c.on !== false, t: /^\d\d:\d\d$/.test(c.t || '') ? c.t : WC[x] }; });
    if (!S.welcomeSeen || typeof S.welcomeSeen !== 'object' || !Array.isArray(S.welcomeSeen.s)) S.welcomeSeen = { d: '', s: [] };
    if (S.lastWelcome) {
      // Bản cũ chỉ chào 1 lần/ngày: nếu hôm nay đã chào thì coi như đã xem các mốc đã qua
      if (S.lastWelcome === keyOf() && S.welcomeSeen.d !== S.lastWelcome) {
        const n = new Date(), hm = `${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}`;
        S.welcomeSeen = { d: S.lastWelcome, s: Object.keys(WC).filter((x) => S.welcomeCfg[x].t <= hm) };
      }
      delete S.lastWelcome;
    }
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
  // Biểu tượng trạng thái: chọn nhiều mỗi ngày, bổ sung cho 5 mức tâm trạng; có thể tự tạo thêm
  const FEELS = [
    ['happy', '🥰', 'Hạnh phúc'], ['calm', '😌', 'Bình yên'], ['energy', '💪', 'Tràn năng lượng'], ['grateful', '🙏', 'Biết ơn'],
    ['proud', '😎', 'Tự hào'], ['excited', '🤩', 'Hào hứng'], ['loved', '🤗', 'Được yêu thương'], ['focus', '🎯', 'Tập trung'],
    ['relaxed', '☕', 'Thư thái'], ['busy', '🏃', 'Bận rộn'], ['tired', '😫', 'Mệt mỏi'], ['sleepy', '😴', 'Buồn ngủ'],
    ['stress', '😤', 'Căng thẳng'], ['anxious', '😰', 'Lo lắng'], ['sad', '😢', 'Buồn'], ['angry', '😠', 'Bực bội'],
    ['bored', '🥱', 'Chán'], ['lonely', '🥺', 'Cô đơn'], ['confused', '😵‍💫', 'Rối bời'], ['sick', '🤒', 'Ốm'],
  ];
  const allFeels = () => [...FEELS.map(([id, e, l]) => ({ id, e, l })), ...S.customFeels.map((f) => ({ ...f, custom: true }))];
  const feelOf = (id) => allFeels().find((f) => f.id === id);
  const tagsOn = (k) => ((S.journal[k] || {}).tags || []).filter((id) => feelOf(id));
  // Trạng thái hay dùng lên trước
  function feelRank() {
    const c = {};
    Object.values(S.journal).forEach((j) => (j.tags || []).forEach((t) => { c[t] = (c[t] || 0) + 1; }));
    return allFeels().map((f, i) => ({ f, i, n: c[f.id] || 0 })).sort((a, b) => b.n - a.n || a.i - b.i).map((x) => x.f);
  }
  const feelChip = (f, on, attr) => `<button type="button" class="feel ${on ? 'on' : ''}" ${attr} aria-pressed="${!!on}"><em>${f.e}</em><span>${esc(f.l)}</span></button>`;
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
  // Thông báo nổi: ô biểu tượng (xanh = thành công, vàng = nhắc nhở) + nội dung + nút hành động
  const TOAST_WARN = /^(Không|Chọn|Nhập|Cần|Hãy|Chưa|Top 3 đã đủ|Tuần (này|trước) chưa)/;
  function toast(msg, action, kind) {
    const el = $('#toast');
    const type = kind || (TOAST_WARN.test(msg) ? 'warn' : action ? 'undo' : 'ok');
    const icon = { ok: ic('check', 'stroke-width="3"'), warn: ic('alert', 'stroke-width="2.4"'), undo: ic('reset', 'stroke-width="2.4"') }[type];
    const dur = action ? 5000 : type === 'warn' ? 3000 : 2400;
    el.className = `toast t-${type}${action ? ' has-act' : ''}`;
    el.innerHTML = `<span class="t-ic">${icon}</span><span class="t-msg"></span>`;
    $('.t-msg', el).textContent = msg;
    if (action) {
      const b = document.createElement('button');
      b.className = 'toast-act'; b.textContent = action.label || 'Hoàn tác';
      b.onclick = () => { el.classList.remove('show'); clearTimeout(toastT); action.fn(); };
      el.append(b);
      const bar = document.createElement('i');
      bar.className = 't-bar'; bar.style.animationDuration = `${dur}ms`;
      el.append(bar);
    }
    void el.offsetWidth;
    el.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove('show'), dur);
  }
  function celebrate(msg) {
    toast(msg);
    navigator.vibrate && navigator.vibrate([20, 40, 20]);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = document.createElement('div');
    box.className = 'confetti';
    const colors = ['#18a957', '#4ed37e', '#0f8a45', '#f3d062', '#e5a50a', '#9be7b4'];
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
        ${L.tool && VIEWS[L.tool] ? `<div class="r-box r-tool"><h4>${ic('heart')} Thực hành trong app</h4><p>${esc(L.toolText || 'Mở công cụ để thực hành ngay.')}</p><button class="btn btn-primary" data-r="tool">${ic('arrowR')} Mở ${esc(L.toolName || 'công cụ')}</button></div>` : ''}
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
      case 'tool': { const t = L.tool; closeReader(); setTimeout(() => go(t), 60); break; }
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
  const HABIT_COLORS = ['#18a957', '#0f8a6a', '#5c9e2f', '#14a38b', '#e5a50a', '#d6303a'];
  const HABIT_SUGGEST = [['Tập thể dục 20 phút', '🏃'], ['Thiền 5 phút', '🧘'], ['Ngủ trước 23 giờ', '😴'], ['Không điện thoại trước khi ngủ', '📵'], ['Ăn rau mỗi bữa', '🥗'], ['Dậy sớm', '🌅'], ['Viết nhật ký', '✍️'], ['Không thuốc lá', '🚭']];
  const EV_TYPES = { birthday: ['Sinh nhật', '🎂'], anniv: ['Kỷ niệm', '💍'], memorial: ['Ngày giỗ', '🕯️'], deadline: ['Hạn chót', '📌'], other: ['Sự kiện', '⭐'] };
  const MC_OUT = { food: ['Ăn uống', '🍜'], move: ['Đi lại', '🛵'], shop: ['Mua sắm', '🛍️'], bill: ['Hóa đơn', '💡'], health: ['Sức khỏe', '💊'], fun: ['Giải trí', '🎬'], family: ['Gia đình', '👪'], edu: ['Học tập', '📚'], gift: ['Hiếu hỷ', '🧧'], other: ['Khác', '📦'] };
  const MC_IN = { salary: ['Lương', '💰'], bonus: ['Thưởng', '🎁'], side: ['Thu nhập thêm', '💼'], oin: ['Khác', '💵'] };
  const LN = window.Lunar;
  const daysBetween = (a, b) => Math.round((dateOf(b) - dateOf(a)) / 864e5);
  const fmtDM = (k) => { const d = dateOf(k); return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`; };
  const cdText = (n) => (n === 0 ? 'hôm nay' : n === 1 ? 'ngày mai' : `còn ${n} ngày`);
  const shiftMonth = (mk, n) => { const [y, m] = mk.split('-').map(Number); const d = new Date(y, m - 1 + n, 1); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`; };

  // ----- Lịch âm -----
  const lunarCache = {};
  const lunarOf = (k) => lunarCache[k] || (lunarCache[k] = (() => { const d = dateOf(k); return LN.solar2lunar(d.getDate(), d.getMonth() + 1, d.getFullYear()); })());
  // Ngày lễ trả về { n: tên, i: loại biểu tượng }
  function holidaysOn(k) {
    const d = dateOf(k), l = lunarOf(k), out = [];
    const sh = LN.SOLAR_HOLIDAYS[`${d.getDate()}-${d.getMonth() + 1}`];
    if (sh) out.push({ n: sh[0], i: sh[1] });
    if (!l.leap) {
      const lh = LN.LUNAR_HOLIDAYS[`${l.day}-${l.month}`];
      if (lh) out.push({ n: lh[0], i: lh[1] });
      const t = lunarOf(addDays(k, 1));
      if (l.month === 12 && t.day === 1 && t.month === 1) out.push({ n: 'Giao thừa', i: 'firework' });
    }
    return out;
  }
  const HOLI_SVG = {
    tet: '<g fill="currentColor" stroke="none"><circle cx="12" cy="6.8" r="3.2"/><circle cx="16.95" cy="10.4" r="3.2"/><circle cx="15.06" cy="16.2" r="3.2"/><circle cx="8.94" cy="16.2" r="3.2"/><circle cx="7.05" cy="10.4" r="3.2"/></g><circle cx="12" cy="12" r="2.1" fill="#fff8dc" stroke="none"/>',
    star: '<path fill="currentColor" stroke="none" d="M12 2.8l2.7 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.6l-5.7 3.3 1.4-6.3-4.8-4.3 6.4-.6z"/>',
    heart: '<path fill="currentColor" stroke="none" d="M12 20.3s-7.5-4.6-7.5-10.4A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.7c0 5.8-7.5 10.4-7.5 10.4z"/>',
    firework: '<path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4M5.3 5.3l2.8 2.8M15.9 15.9l2.8 2.8M5.3 18.7l2.8-2.8M15.9 8.1l2.8-2.8"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/>',
    hammer: '<path d="M14.5 4.5 19.5 9.5 17 12l-5-5z"/><path d="M13.2 9.8 4.5 18.5a1.4 1.4 0 0 0 2 2l8.7-8.7"/>',
    balloon: '<path d="M12 3a5.5 6.2 0 0 1 5.5 6.2c0 3.6-2.6 6.3-5.5 6.3s-5.5-2.7-5.5-6.3A5.5 6.2 0 0 1 12 3z"/><path d="m11 15.5-.6 1.6h3.2l-.6-1.6M12 17.1c0 2-2.2 2.2-2.2 4.4"/>',
    candle: '<path d="M12 2.8c1.8 2.1 1.8 3.8 0 5-1.8-1.2-1.8-2.9 0-5z" fill="currentColor"/><rect x="9" y="9.5" width="6" height="10.5" rx="1.2"/><path d="M6.5 20.5h11"/>',
    shield: '<path d="M12 2.8l7.5 3.1v5.4c0 4.7-3.2 8.6-7.5 10.1-4.3-1.5-7.5-5.4-7.5-10.1V5.9z"/><path fill="currentColor" stroke="none" d="m12 7.6 1.2 2.6 2.8.3-2.1 1.9.6 2.8-2.5-1.4-2.5 1.4.6-2.8-2.1-1.9 2.8-.3z"/>',
    cap: '<path d="M2.5 9.5 12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5v4.3c3.2 2.3 7.8 2.3 11 0v-4.3M21.5 9.5v5"/>',
    tree: '<path d="M12 2.8 17 9h-3l4.2 5.5H14l4 5H6l4-5H5.8L10 9H7z"/><path d="M12 19.5v2"/>',
    moon: '<circle cx="12" cy="12" r="8.2" fill="currentColor" fill-opacity=".18"/><circle cx="12" cy="12" r="8.2"/><circle cx="9.3" cy="10" r="1.4"/><circle cx="14.3" cy="14.6" r="1.9"/>',
    bowl: '<path d="M3 11.5h18a9 9 0 0 1-18 0z"/><path d="M8 8c0-1.2 1.2-1.8 0-3.5M12 8c0-1.2 1.2-1.8 0-3.5M16 8c0-1.2 1.2-1.8 0-3.5"/>',
    temple: '<path d="M2.5 9.5 12 4l9.5 5.5"/><path d="M5 10v9.5M19 10v9.5M2.5 20.5h19M9.5 20.5V15h5v5.5M8.5 10h7"/>',
    lotus: '<path d="M12 20.5c-2.5-2.2-4-5.2-4-8.5S9.5 6.2 12 4c2.5 2.2 4 4.7 4 8s-1.5 6.3-4 8.5z"/><path d="M12 20.5c-4.2 0-8-2.4-9.2-6.4 3.3-.2 5.8.8 7.3 3M12 20.5c4.2 0 8-2.4 9.2-6.4-3.3-.2-5.8.8-7.3 3"/>',
    lantern: '<path d="M12 2v2.5M8.5 4.5h7"/><path d="M6.5 8c0-2 2.5-3.5 5.5-3.5s5.5 1.5 5.5 3.5v7.5c0 2-2.5 3.5-5.5 3.5s-5.5-1.5-5.5-3.5z"/><path d="M6.5 11.8h11M10 19v2.5h4V19"/>',
    fish: '<path d="M3 12c3.2-4.4 8.4-5.4 12.5-3L20 5.5v13L15.5 15C11.4 17.4 6.2 16.4 3 12z"/><circle cx="7.6" cy="11.4" r=".9" fill="currentColor"/>',
  };
  const holiIcon = (i) => `<span class="hi hi-${i}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${HOLI_SVG[i] || HOLI_SVG.star}</svg></span>`;
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

  // ----- Lịch trực theo tuần (lịch công bố hằng tuần) -----
  const DUTY_COLORS = ['#18a957', '#0f8a6a', '#5c9e2f', '#14a38b', '#0b6f36', '#e5a50a', '#d6303a'];
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
    return S.shift.on ? entriesOn(k) : [];
  }
  const nearDuty = () => { const t = keyOf(); return [addDays(t, -1), t, addDays(t, 1)].flatMap(entriesOn).filter((x) => x.end > Date.now()).sort((a, b) => a.start - b.start); };
  function dutyReminder() {
    if (!S.shift.on || !S.duty.remind || !S.duty.positions.length) return null;
    const today = keyOf(), dow = dateOf(today).getDay(), mon = mondayOf(today);
    const hasWeek = (m) => S.duty.entries.some((e) => e.date >= m && e.date <= addDays(m, 6));
    if (dow === 0 && !hasWeek(addDays(mon, 7))) return { mon: addDays(mon, 7), title: 'Lịch trực tuần tới đã công bố?', sub: `Nhập ca của bạn cho tuần ${fmtDM(addDays(mon, 7))} – ${fmtDM(addDays(mon, 13))}` };
    if (dow >= 1 && dow <= 2 && !hasWeek(mon)) return { mon, title: 'Chưa có lịch trực tuần này', sub: `Nhập ca của bạn cho tuần ${fmtDM(mon)} – ${fmtDM(addDays(mon, 6))}` };
    return null;
  }
  function dutyNotes() {
    const out = [];
    if (!S.shift.on) return out;
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
    const chip = (c, txt) => `<button class="shift-chip" data-act="go" data-to="shift" style="--c:${c}">${ic('duty')}${txt}</button>`;
    const now = Date.now(), near = nearDuty();
    const cur = near.find((x) => x.start <= now);
    const nx = near.find((x) => x.start > now && x.start - now < 18 * 3600e3);
    const x = cur || nx;
    if (!x) return '';
    return chip(x.color, cur ? `Đang trực · ${esc(x.label)} · đến ${x.s.end}` : `Ca tới · ${esc(x.label)} · ${x.s.start} ${keyOf(new Date(x.start)) === keyOf() ? 'hôm nay' : 'ngày mai'}`);
  }
  function dutyNowCard() {
    if (!S.shift.on) return '';
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

  // ----- Ảnh (IndexedDB, vì ảnh quá lớn cho localStorage) -----
  const PhotoDB = (() => {
    let dbp;
    const open = () => dbp || (dbp = new Promise((res, rej) => {
      const r = indexedDB.open('ak-photos', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('p');
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    }));
    const tx = async (mode, fn) => {
      const db = await open();
      return new Promise((res, rej) => {
        const t = db.transaction('p', mode), rq = fn(t.objectStore('p'));
        t.oncomplete = () => res(rq && rq.result);
        t.onerror = () => rej(t.error);
      });
    };
    return {
      put: (id, b) => tx('readwrite', (st) => st.put(b, id)), get: (id) => tx('readonly', (st) => st.get(id)), del: (id) => tx('readwrite', (st) => st.delete(id)),
      // Danh sách [id, dung lượng] của mọi ảnh đã lưu
      sizes: async () => {
        const db = await open();
        return new Promise((res, rej) => {
          const out = [], rq = db.transaction('p', 'readonly').objectStore('p').openCursor();
          rq.onsuccess = () => { const c = rq.result; if (!c) { res(out); return; } out.push([String(c.key), (c.value && c.value.size) || 0]); c.continue(); };
          rq.onerror = () => rej(rq.error);
        });
      },
    };
  })();
  const photoURLs = {};
  async function photoURL(id) {
    if (photoURLs[id]) return photoURLs[id];
    const b = await PhotoDB.get(id);
    return b ? (photoURLs[id] = URL.createObjectURL(b)) : null;
  }
  function hydratePhotos(root = document) {
    $$('img[data-photo]', root).forEach(async (img) => {
      const u = await photoURL(img.dataset.photo).catch(() => null);
      if (u) { img.src = u; img.classList.add('ld'); }
    });
  }
  function resizeImage(file, max, q) {
    return new Promise((res, rej) => {
      const img = new Image(), u = URL.createObjectURL(file);
      img.onload = () => {
        const sc = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(u);
        c.toBlob((b) => (b ? res(b) : rej(new Error('blob'))), 'image/jpeg', q);
      };
      img.onerror = () => { URL.revokeObjectURL(u); rej(new Error('img')); };
      img.src = u;
    });
  }

  // ----- Chiến tích hôm nay -----
  const winsOn = (k) => S.wins.filter((w) => w.date === k).sort((a, b) => a.ts - b.ts);
  function winStreak() {
    let k = keyOf(), n = 0;
    if (!winsOn(k).length) k = addDays(k, -1);
    while (winsOn(k).length && n < 3650) { n++; k = addDays(k, -1); }
    return n;
  }
  const hm = (ts) => { const d = new Date(ts); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
  function locketHTML() {
    const today = keyOf(), list = winsOn(today).slice().reverse(), w = list[0], st = winStreak();
    const input = '<input type="file" accept="image/*" class="sr-only" data-win-input>';
    return `<section class="locket">
      <div class="section-head"><h3 class="h-ic"><span class="lk-ic">${ic('wins')}</span>Chiến tích hôm nay</h3><button class="link" data-act="go" data-to="wins">${st ? `🔥 ${st} ngày` : 'Xem tất cả'} ${ic('chevR')}</button></div>
      ${w ? `<div class="lk-frame" style="${winRatioStyle(w)}">
          <div class="lk-track" data-lk-track>${list.map((x, i) => `<button class="lk-photo" data-act="win-view" data-id="${x.id}" aria-label="Ảnh chiến tích ${i + 1}/${list.length}${x.caption ? `: ${esc(x.caption)}` : ''}"><img data-photo="${x.id}" alt="">
            <span class="lk-time">${hm(x.ts)}</span>${x.caption ? `<span class="lk-cap">${esc(x.caption)}</span>` : ''}</button>`).join('')}</div>
          ${list.length > 1 ? `<span class="lk-n" data-lk-n>1/${list.length}</span>` : ''}
          <label class="lk-add" aria-label="Thêm ảnh chiến tích">${ic('plus', 'stroke-width="2.6"')}${input}</label></div>
        ${list.length > 1 ? `<div class="lk-dots" data-lk-dots aria-hidden="true">${list.map((_, i) => `<i class="${i === 0 ? 'on' : ''}"></i>`).join('')}</div>` : ''}`
        : `<label class="lk-empty glass"><span class="lk-cam">${ic('camera')}</span><b>Chụp ảnh chiến tích hôm nay</b><span>Một khoảnh khắc khiến bạn tự hào: xong việc khó, buổi tập, cuốn sách, bữa cơm gia đình…</span>${input}</label>`}
    </section>`;
  }
  // Băng ảnh vuốt ngang: cập nhật "1/2" và chấm, nhớ ảnh đang xem khi trang vẽ lại
  function bindLocket(root) {
    const track = $('[data-lk-track]', root);
    if (!track) return;
    const n = track.children.length, pill = $('[data-lk-n]', root), dots = $$('[data-lk-dots] i', root), frame = track.parentElement;
    const slides = [...track.children];
    const show = (i) => {
      if (pill) pill.textContent = `${i + 1}/${n}`;
      dots.forEach((d, j) => d.classList.toggle('on', j === i));
      frame.classList.toggle('lk-light', !!(slides[i] && slides[i].classList.contains('lk-light')));
    };
    // Ảnh sáng thì nhãn kính dùng chữ tối để luôn dễ đọc
    slides.forEach((sl, i) => {
      const img = $('img', sl);
      img.addEventListener('load', () => {
        try {
          const c = document.createElement('canvas'); c.width = c.height = 12;
          const g = c.getContext('2d'); g.drawImage(img, 0, 0, 12, 12);
          const d = g.getImageData(0, 0, 12, 12).data;
          let sum = 0;
          for (let k = 0; k < d.length; k += 4) sum += 0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2];
          sl.classList.toggle('lk-light', sum / (d.length / 4) / 255 > 0.68);
          if (i === (ui.lkIdx || 0)) show(i);
        } catch { /* bỏ qua nếu không đọc được điểm ảnh */ }
      }, { once: true });
    });
    const start = Math.min(ui.lkIdx || 0, n - 1);
    if (start > 0) requestAnimationFrame(() => { track.style.scrollBehavior = 'auto'; track.scrollLeft = start * track.clientWidth; track.style.scrollBehavior = ''; show(start); });
    track.addEventListener('scroll', () => {
      const i = Math.min(n - 1, Math.max(0, Math.round(track.scrollLeft / track.clientWidth)));
      if (i !== ui.lkIdx) { ui.lkIdx = i; show(i); }
    }, { passive: true });
  }
  const WIN_RATIOS = [['1:1', 'Vuông', 1], ['5:4', 'Ngang', 5 / 4], ['4:5', 'Dọc', 4 / 5], ['16:9', 'Rộng', 16 / 9]];
  const winRatioStyle = (w) => { const r = WIN_RATIOS.find((x) => x[0] === w.ratio) || WIN_RATIOS[1]; return `--r:${r[2]};--ar:${r[0].replace(':', ' / ')}`; };

  // Thêm ảnh chiến tích: chọn tỉ lệ khung, kéo/phóng to để cắt, rồi lưu
  async function winFromFile(file) {
    if (!file) return;
    let src;
    try { src = await resizeImage(file, 2400, 0.92); } catch { toast('Không đọc được ảnh này'); return; }
    const url = URL.createObjectURL(src);
    const img = new Image();
    try { await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; }); }
    catch { URL.revokeObjectURL(url); toast('Không đọc được ảnh này'); return; }
    const nw = img.naturalWidth, nh = img.naturalHeight;
    let ratio = WIN_RATIOS[0];
    const TAGS = ['Hoàn thành mục tiêu', 'Buổi tập hôm nay', 'Đọc xong sách', 'Học được điều mới', 'Bên gia đình', 'Ca trực an toàn', 'Ăn uống lành mạnh'];
    openSheet(`<h3>Chiến tích hôm nay</h3>
      <div class="seg cr-ratios" id="crr">${WIN_RATIOS.map(([id, l], i) => `<button type="button" data-i="${i}" class="${i === 0 ? 'on' : ''}">${l}<small>${id}</small></button>`).join('')}</div>
      <div class="cr-box" id="crb" style="--r:${ratio[2]}" aria-label="Vùng cắt ảnh. Kéo để di chuyển ảnh">
        <img class="cr-img" src="${url}" alt="" draggable="false"><div class="cr-grid"></div>
      </div>
      <div class="cr-zoom"><button type="button" data-z="-1" aria-label="Thu nhỏ">${ic('minus')}</button><input type="range" id="crz" min="0" max="100" value="0" aria-label="Mức phóng to"><button type="button" data-z="1" aria-label="Phóng to">${ic('plus')}</button></div>
      <p class="cr-hint">Kéo ảnh để chọn vùng, chụm hai ngón hoặc kéo thanh để phóng to. Chạm đúp để căn lại.</p>
      <form id="wf" autocomplete="off">
        <label class="field"><span>Chú thích</span><input class="input" name="cap" maxlength="80" placeholder="Hôm nay mình đã…"></label>
        <div class="chips sm" id="wt">${TAGS.map((t) => `<button type="button" class="chip">${t}</button>`).join('')}</div>
        <button class="btn btn-primary btn-block" type="submit" style="margin-top:16px">${ic('check', 'stroke-width="2.6"')} Lưu chiến tích</button>
      </form>`, (sh) => {
      const box = $('#crb', sh), im = $('.cr-img', sh), zr = $('#crz', sh), f = $('#wf', sh);
      let W = 0, H = 0, sc = 1, x = 0, y = 0, minS = 1;
      im.style.width = `${nw}px`; im.style.height = `${nh}px`;
      const apply = () => {
        im.style.transform = `translate(${x}px, ${y}px) scale(${sc})`;
        zr.value = String(Math.round(((sc / minS - 1) / 3) * 100));
        zr.style.setProperty('--p', `${zr.value}%`);
      };
      const clamp = () => {
        sc = Math.min(Math.max(sc, minS), minS * 4);
        x = Math.min(0, Math.max(W - nw * sc, x));
        y = Math.min(0, Math.max(H - nh * sc, y));
      };
      const zoomAt = (ns, px, py) => {
        const ix = (px - x) / sc, iy = (py - y) / sc;
        sc = Math.min(Math.max(ns, minS), minS * 4);
        x = px - ix * sc; y = py - iy * sc;
        clamp(); apply();
      };
      // Tính lại khi đổi tỉ lệ: giữ tâm và mức phóng
      const layout = (keep) => {
        const cx = keep && W ? (W / 2 - x) / sc : nw / 2, cy = keep && H ? (H / 2 - y) / sc : nh / 2, rel = keep && W ? sc / minS : 1;
        W = box.clientWidth; H = box.clientHeight;
        minS = Math.max(W / nw, H / nh); sc = minS * rel;
        x = W / 2 - cx * sc; y = H / 2 - cy * sc;
        clamp(); apply();
      };
      requestAnimationFrame(() => layout(false));
      $('#crr', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        ratio = WIN_RATIOS[+b.dataset.i];
        $$('#crr button', sh).forEach((z) => z.classList.toggle('on', z === b));
        box.style.setProperty('--r', ratio[2]);
        requestAnimationFrame(() => layout(true));
      });
      // Kéo một ngón để di chuyển, hai ngón để phóng to
      const pts = new Map();
      let pinch = null;
      box.addEventListener('pointerdown', (e) => {
        box.setPointerCapture(e.pointerId);
        pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
        box.classList.add('drag'); pinch = null;
      });
      box.addEventListener('pointermove', (e) => {
        if (!pts.has(e.pointerId)) return;
        const prev = pts.get(e.pointerId);
        pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pts.size === 1) { x += e.clientX - prev.x; y += e.clientY - prev.y; clamp(); apply(); return; }
        const r = box.getBoundingClientRect(), [a, b] = [...pts.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y), mx = (a.x + b.x) / 2 - r.left, my = (a.y + b.y) / 2 - r.top;
        if (pinch) { zoomAt(sc * (d / pinch.d), mx, my); x += mx - pinch.mx; y += my - pinch.my; clamp(); apply(); }
        pinch = { d, mx, my };
      });
      const up = (e) => { pts.delete(e.pointerId); pinch = null; if (!pts.size) box.classList.remove('drag'); };
      box.addEventListener('pointerup', up);
      box.addEventListener('pointercancel', up);
      box.addEventListener('wheel', (e) => {
        e.preventDefault();
        const r = box.getBoundingClientRect();
        zoomAt(sc * (e.deltaY < 0 ? 1.08 : 1 / 1.08), e.clientX - r.left, e.clientY - r.top);
      }, { passive: false });
      box.addEventListener('dblclick', () => layout(false));
      // Không để thao tác trong khung ảnh kéo đóng bảng
      ['touchstart', 'touchmove'].forEach((ev) => box.addEventListener(ev, (e) => e.stopPropagation(), { passive: true }));
      zr.addEventListener('input', () => zoomAt(minS * (1 + (zr.value / 100) * 3), W / 2, H / 2));
      $('.cr-zoom', sh).addEventListener('click', (e) => { const b = e.target.closest('[data-z]'); if (b) zoomAt(sc * (b.dataset.z > 0 ? 1.2 : 1 / 1.2), W / 2, H / 2); });
      $('#wt', sh).addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) f.cap.value = b.textContent; });
      f.addEventListener('submit', async (e) => {
        e.preventDefault();
        const r = ratio[2], outW = r >= 1 ? 1280 : Math.round(1280 * r), outH = Math.round(outW / r);
        const c = document.createElement('canvas');
        c.width = outW; c.height = outH;
        c.getContext('2d').drawImage(img, -x / sc, -y / sc, W / sc, H / sc, 0, 0, outW, outH);
        const blob = await new Promise((res) => c.toBlob(res, 'image/jpeg', 0.86));
        if (!blob) { toast('Không cắt được ảnh này'); return; }
        const id = uid();
        try { await PhotoDB.put(id, blob); } catch { toast('Không lưu được ảnh, có thể bộ nhớ đã đầy'); return; }
        photoURLs[id] = URL.createObjectURL(blob);
        ui.lkIdx = 0;
        const first = !winsOn(keyOf()).length;
        S.wins.push({ id, date: keyOf(), caption: f.cap.value.trim(), ts: Date.now(), ratio: ratio[0] });
        save(); closeSheet(); render();
        first ? celebrate(`Đã lưu chiến tích hôm nay 🏆 Chuỗi ${winStreak()} ngày`) : toast('Đã thêm ảnh chiến tích');
      });
    }, () => URL.revokeObjectURL(url));
  }

  function winViewer(id) {
    const w = S.wins.find((x) => x.id === id);
    if (!w) return;
    const el = document.createElement('div');
    el.className = 'pv';
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Ảnh chiến tích');
    el.innerHTML = `<div class="pv-top">
        <button class="icon-btn" data-pv="close" aria-label="Đóng">${ic('x')}</button>
        <span>${dayLabel(w.date)} · ${hm(w.ts)}</span>
        <button class="icon-btn" data-pv="share" aria-label="Chia sẻ">${ic('share')}</button>
        <button class="icon-btn" data-pv="del" aria-label="Xóa ảnh">${ic('trash')}</button></div>
      <div class="pv-img"><img data-photo="${w.id}" alt="${esc(w.caption || 'Chiến tích')}"></div>
      ${w.caption ? `<p class="pv-cap">${esc(w.caption)}</p>` : ''}`;
    const close = () => { el.classList.add('closing'); document.removeEventListener('keydown', onKey); setTimeout(() => el.remove(), 200); document.body.classList.remove('reading'); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    el.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-pv]');
      if (!b) { if (e.target === el || e.target.classList.contains('pv-img')) close(); return; }
      if (b.dataset.pv === 'close') close();
      if (b.dataset.pv === 'share') {
        const blob = await PhotoDB.get(w.id).catch(() => null);
        if (!blob) return;
        const file = new File([blob], `chien-tich-${w.date}.jpg`, { type: 'image/jpeg' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) navigator.share({ files: [file], text: w.caption || 'Chiến tích hôm nay' }).catch(() => {});
        else { const a = document.createElement('a'); a.href = photoURLs[w.id]; a.download = file.name; a.click(); }
      }
      if (b.dataset.pv === 'del' && confirm('Xóa ảnh chiến tích này?')) {
        S.wins = S.wins.filter((x) => x.id !== w.id); save();
        PhotoDB.del(w.id).catch(() => {});
        if (photoURLs[w.id]) { URL.revokeObjectURL(photoURLs[w.id]); delete photoURLs[w.id]; }
        close(); render(); toast('Đã xóa ảnh');
      }
    });
    document.body.append(el);
    document.body.classList.add('reading');
    hydratePhotos(el);
  }

  // ----- Thư gửi bản thân tương lai -----
  const fmtDMY = (k) => `${fmtDM(k)}/${k.slice(0, 4)}`;
  const addMonths = (k, n) => { const d = dateOf(k), day = d.getDate(); d.setDate(1); d.setMonth(d.getMonth() + n); d.setDate(Math.min(day, new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate())); return keyOf(d); };
  const dueLetters = () => S.letters.filter((x) => !x.opened && x.openAt <= keyOf()).sort((a, b) => a.openAt.localeCompare(b.openAt));
  const LETTER_PROMPTS = ['Hiện tại mình đang…', 'Điều mình lo lắng nhất lúc này là…', 'Mình mong khi đọc thư này, bạn đã…', 'Một điều mình muốn bạn luôn nhớ…', 'Cảm ơn bạn vì…'];
  function letterSheet() {
    const today = keyOf();
    const opts = [[1, '1 tháng'], [3, '3 tháng'], [6, '6 tháng'], [12, '1 năm'], [0, 'Tự chọn ngày']];
    let openAt = addMonths(today, 12);
    openSheet(`<h3>Thư gửi bản thân tương lai</h3>
      <p class="page-sub" style="margin-top:-10px">Thư sẽ được niêm phong và chỉ mở được vào ngày bạn chọn.</p>
      <form id="lf" autocomplete="off">
        <div class="field"><span>Gợi ý mở đầu</span><div class="chips sm" id="lp">${LETTER_PROMPTS.map((p) => `<button type="button" class="chip">${p}</button>`).join('')}</div></div>
        <label class="field"><span>Tiêu đề (không bắt buộc)</span><input class="input" name="ltitle" maxlength="80" placeholder="Gửi mình của một năm sau"></label>
        <label class="field"><span>Nội dung</span><textarea class="input lf-body" name="lbody" rows="8" required placeholder="Gửi mình của tương lai,&#10;…"></textarea></label>
        <div class="field"><span>Mở thư sau</span><div class="chips sm" id="lt">${opts.map(([m, l]) => `<button type="button" class="chip ${m === 12 ? 'on' : ''}" data-m="${m}">${l}</button>`).join('')}</div>
          <input class="input" type="date" name="ldate" min="${addDays(today, 1)}" hidden style="margin-top:10px"></div>
        <p class="footnote" id="lwhen" style="text-align:left;margin:-6px 4px 14px"></p>
        <button class="btn btn-primary btn-block" type="submit">${ic('envelope')} Niêm phong thư</button>
      </form>`, (sh) => {
      const f = $('#lf', sh);
      const show = () => { $('#lwhen', sh).textContent = openAt ? `Thư sẽ mở vào ${WD[dateOf(openAt).getDay()]}, ${fmtDMY(openAt)} (${cdText(daysBetween(today, openAt))}).` : 'Chọn ngày mở thư.'; };
      show();
      $('#lp', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        const t = f.lbody; t.value = (t.value.trim() ? `${t.value.trimEnd()}\n\n` : '') + b.textContent.replace('…', ' '); t.focus();
      });
      $('#lt', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        $$('#lt button', sh).forEach((x) => x.classList.toggle('on', x === b));
        const m = +b.dataset.m;
        f.ldate.hidden = m !== 0;
        openAt = m ? addMonths(today, m) : f.ldate.value || '';
        show();
      });
      f.ldate.addEventListener('change', () => { openAt = f.ldate.value; show(); });
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const body = f.lbody.value.trim();
        if (!body) return;
        if (!openAt || openAt <= today) { toast('Chọn một ngày trong tương lai'); return; }
        S.letters.push({ id: uid(), title: f.ltitle.value.trim(), body, created: today, openAt, opened: false });
        save(); closeSheet(); render();
        toast(`Đã niêm phong · mở vào ${fmtDMY(openAt)} ✉️`);
      });
      setTimeout(() => f.lbody.focus(), 320);
    });
  }
  function letterSealedSheet(L) {
    const n = daysBetween(keyOf(), L.openAt);
    openSheet(`<div class="ls-lock">${ic('lock')}</div>
      <h3 style="text-align:center">Thư đang được niêm phong</h3>
      <p class="page-sub" style="text-align:center">Viết ngày ${fmtDMY(L.created)}. Thư sẽ mở vào <b>${fmtDMY(L.openAt)}</b>, còn ${n} ngày nữa. Hãy kiên nhẫn nhé!</p>
      <button class="btn btn-danger btn-block" id="ldel" style="margin-top:8px">${ic('trash')} Xóa thư này</button>`, (sh) => {
      $('#ldel', sh).addEventListener('click', () => {
        if (!confirm('Xóa lá thư này? Bạn sẽ không đọc lại được.')) return;
        S.letters = S.letters.filter((x) => x !== L); save(); closeSheet(); render(); toast('Đã xóa thư');
      });
    });
  }
  function openLetter(id) {
    const L = S.letters.find((x) => x.id === id);
    if (!L) return;
    if (L.openAt > keyOf()) { letterSealedSheet(L); return; }
    closeSheet(true);
    const first = !L.opened;
    L.opened = true; L.openedAt = L.openedAt || Date.now(); save();
    const ago = daysBetween(L.created, keyOf());
    const el = document.createElement('div');
    el.className = 'lv';
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Thư từ quá khứ');
    el.innerHTML = `<div class="lv-wrap">
      <div class="lv-env ${first ? 'anim' : ''}">${ic('envelope')}</div>
      <article class="lv-paper">
        <span class="lv-meta">Viết ngày ${fmtDMY(L.created)} · mở ngày ${fmtDMY(keyOf())}</span>
        ${L.title ? `<h2>${esc(L.title)}</h2>` : ''}
        <div class="lv-body">${esc(L.body)}</div>
        <span class="lv-sign">— ${esc(S.name || 'Bạn')} của ${ago} ngày trước</span>
      </article>
      <div class="lv-acts"><button class="btn btn-ghost" data-lv="close">Đóng</button><button class="btn btn-primary" data-lv="new">${ic('edit')} Viết thư mới</button></div>
    </div>`;
    const close = () => { el.classList.add('closing'); document.removeEventListener('keydown', onKey); setTimeout(() => el.remove(), 220); document.body.classList.remove('reading'); render(); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-lv]'); if (!b) return;
      close();
      if (b.dataset.lv === 'new') setTimeout(letterSheet, 240);
    });
    document.body.append(el);
    document.body.classList.add('reading');
    if (first && navigator.vibrate) navigator.vibrate([20, 50, 20]);
  }

  // ----- Màn chào: sáng / trưa / tối (lần mở app đầu tiên sau mỗi mốc giờ) -----
  const WL_SLOTS = {
    m: { n: 'Buổi sáng', i: 'sun', g: 'Chào buổi sáng', d: 'Kế hoạch, Top 3, ca trực, sự kiện trong ngày' },
    n: { n: 'Buổi trưa', i: 'clock', g: 'Chào buổi trưa', d: 'Tiến độ buổi sáng, uống nước, việc buổi chiều' },
    e: { n: 'Buổi tối', i: 'moon', g: 'Chào buổi tối', d: 'Tổng kết ngày, chiến tích, chuẩn bị ngày mai' },
  };
  const NOON_TIPS = [
    'Chợp mắt 15–20 phút giúp buổi chiều tỉnh táo hơn hẳn.',
    'Đứng dậy, vươn vai và đi lại vài phút cho máu lưu thông nhé.',
    'Ăn trưa chậm rãi, nhai kỹ — đừng vừa ăn vừa lướt điện thoại.',
    'Một ly nước lúc này giúp tránh cơn buồn ngủ đầu giờ chiều.',
    'Nhìn ra xa 20 giây để mắt được nghỉ sau buổi sáng làm việc.',
    'Việc khó nhất buổi chiều? Làm nó ngay sau giờ nghỉ, khi đầu óc còn tươi.',
    'Hít sâu 4 giây, giữ 4 giây, thở ra 6 giây — lặp lại 5 lần.',
  ];
  const hmNow = () => { const d = new Date(); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
  const slotsDue = (t = hmNow()) => Object.keys(WL_SLOTS).filter((x) => S.welcomeCfg[x].on && S.welcomeCfg[x].t <= t)
    .sort((a, b) => S.welcomeCfg[a].t.localeCompare(S.welcomeCfg[b].t));
  function markSlotsSeen(list) {
    const k = keyOf();
    if (S.welcomeSeen.d !== k) S.welcomeSeen = { d: k, s: [] };
    S.welcomeSeen.s = [...new Set([...S.welcomeSeen.s, ...list])];
    save();
  }
  // Gọi khi mở app / quay lại app / mỗi phút: hiện mốc gần nhất chưa xem (bỏ qua các mốc cũ hơn)
  function dailyWelcome() {
    if (!S.onboarded || $('.onboard') || $('.welcome') || $('.sheet') || R || $('.lv') || $('.pv')) return;
    const due = slotsDue();
    if (!due.length) return;
    const last = due[due.length - 1], seen = S.welcomeSeen.d === keyOf() ? S.welcomeSeen.s : [];
    if (seen.includes(last)) return;
    markSlotsSeen(due);
    showWelcome(last);
  }

  function showWelcome(slot = 'm', preview = false) {
    const k = keyOf(), d = dateOf(k), tmr = addDays(k, 1), cfg = WL_SLOTS[slot];
    const WDF = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const j = S.journal[k] || {}, jm = j.mood;
    const list = tasksOn(k), done = list.filter((t) => t.done).length, letter = dueLetters()[0];
    const w = waterOn(k), rd = Math.round(readOn(k) / 60), hol = holidaysOn(k), q = quoteOfDay();
    const hdue = S.habits.filter((h) => hDue(h, k)), hok = hdue.filter((h) => hDone(h, k)).length;
    const row = (i, b, sub, act) => `<${act ? `button data-wl="${act}"` : 'div'} class="wl-row"><span class="wl-ri">${ic(i)}</span><span><b>${b}</b>${sub ? `<small>${sub}</small>` : ''}</span>${act ? ic('chevR') : ''}</${act ? 'button' : 'div'}>`;
    const letterRow = letter ? row('envelope', 'Bạn có thư từ quá khứ!', `Viết ngày ${fmtDMY(letter.created)} · chạm để mở`, 'letter') : '';
    const fridgeRow = fUrgent().length ? row('fridge', `${fUrgent().length} món trong tủ lạnh cần dùng sớm`, fUrgent().slice(0, 3).map((x) => esc(x.name)).join(', ')) : '';
    const tName = (t) => `${t.time ? `${t.time} ` : ''}${esc(t.title)}`;
    let hero, body, goLbl;
    if (slot === 'm') {
      const y = addDays(k, -1), yl = tasksOn(y), yDone = yl.filter((t) => t.done).length;
      const top = top3Keys(k).length, evs = upcomingEvents(3), duty = dutyOf(k).filter((x) => !x.off);
      hero = `<div class="wl-hero">
        <span class="wl-greet">${cfg.g}, ${esc(S.name || 'bạn')} 👋</span>
        <span class="wl-wd">${WDF[d.getDay()]}</span>
        <b class="wl-day">${d.getDate()}</b>
        <span class="wl-month">Tháng ${d.getMonth() + 1}, ${d.getFullYear()}</span>
        <span class="wl-lunar">${ic('moonstar')} ${lunarFull(k)}</span>
        ${hol.map((h) => `<span class="wl-hol">${holiIcon(h.i)}${h.n}</span>`).join('')}
      </div>`;
      body = `<div class="wl-quote">“${esc(q.t)}”<span>— ${esc(q.a)}</span></div>
        <div class="wl-card"><h4>Hôm nay của bạn</h4>${[
          letterRow,
          ...evs.map(({ e, next }) => row('gift', esc(e.title), next === k ? 'Hôm nay' : cdText(daysBetween(k, next)).replace(/^./, (c) => c.toUpperCase()))),
          ...duty.map((x) => row('duty', esc(x.label), `${x.time}${x.nextDay ? ' · rạng sáng hôm sau' : ''}`)),
          row('list', list.length ? `${list.length} việc hôm nay` : 'Chưa có việc nào hôm nay', list.length ? (top ? `${top} việc trong Top 3` : 'Chạm để chọn Top 3') : 'Chạm để thêm việc', list.length ? (top ? '' : 'top3') : 'task'),
          fridgeRow,
          hdue.length ? row('sprout', `${hdue.length} thói quen cần giữ`, 'Mỗi ngày một chút') : '',
          row('book', `${S.readGoal} phút đọc sách`, featuredLesson() ? esc(featuredLesson().title) : ''),
        ].join('')}</div>
        ${yl.length ? `<p class="wl-y">Hôm qua bạn đã xong ${yDone}/${yl.length} việc${readOn(y) >= 60 ? ` và đọc ${Math.round(readOn(y) / 60)} phút sách` : ''}. ${yDone === yl.length ? 'Tuyệt vời, giữ phong độ nhé!' : 'Hôm nay mình làm tiếp nào!'}</p>` : ''}`;
      goLbl = `Bắt đầu ngày mới ${ic('arrowR')}`;
    } else {
      hero = `<div class="wl-hero sm">
        <span class="wl-slot">${ic(cfg.i)} ${cfg.n} · ${hmNow()}</span>
        <b class="wl-hi">${cfg.g},<br>${esc(S.name || 'bạn')} ${slot === 'n' ? '☀️' : '🌙'}</b>
        <span class="wl-month">${WDF[d.getDay()]}, ${fmtDMY(k)}</span>
        <span class="wl-lunar">${ic('moonstar')} ${lunarFull(k)}</span>
      </div>`;
      const pct = list.length ? Math.round(done / list.length * 100) : 0;
      if (slot === 'n') {
        const left = list.filter((t) => !t.done && (!t.time || t.time >= '12:00')).sort(byTime);
        const now = Date.now(), near = nearDuty(), cur = near.find((x) => x.start <= now), nx = near.find((x) => x.start > now && keyOf(new Date(x.start)) === k);
        const evNow = upcomingEvents(1).filter(({ next }) => next === k);
        body = `<div class="wl-prog">
            <div class="wl-pt"><b>${done}<small>/${list.length}</small></b><span>${list.length ? (done === list.length ? 'Xong hết việc hôm nay rồi! 🎉' : `việc đã xong · ${pct}%`) : 'Chưa có việc nào hôm nay'}</span></div>
            <div class="wl-bar"><i style="width:${pct}%"></i></div>
          </div>
          <div class="wl-card"><h4>Buổi chiều</h4>${[
            letterRow,
            ...evNow.map(({ e }) => row('gift', esc(e.title), 'Hôm nay')),
            cur ? row('duty', `Đang trực · ${esc(cur.label)}`, `Đến ${cur.s.end}`) : nx ? row('duty', `Ca tới · ${esc(nx.label)}`, `Bắt đầu ${nx.s.start}`) : '',
            row('list', left.length ? `${left.length} việc cho buổi chiều` : 'Buổi chiều đang trống', left.length ? left.slice(0, 3).map(tName).join(' · ') : 'Chạm để thêm việc', left.length ? 'today' : 'task'),
            `<button data-wl="water" class="wl-row"><span class="wl-ri">${ic('drop')}</span><span><b data-w>${w}/${S.waterGoal} ly nước</b><small data-ws>${w >= S.waterGoal ? 'Đủ nước rồi, giỏi lắm! 💧' : 'Chạm để thêm 1 ly'}</small></span><span class="wl-plus">${ic('plus', 'stroke-width="2.6"')}</span></button>`,
            hdue.length && hok < hdue.length ? row('sprout', `${hdue.length - hok} thói quen chưa xong`, hdue.filter((h) => !hDone(h, k)).slice(0, 3).map((h) => `${h.icon} ${esc(h.name)}`).join(' · '), 'habits') : '',
            rd < S.readGoal ? row('book', `Còn ${S.readGoal - rd} phút đọc sách`, featuredLesson() ? esc(featuredLesson().title) : '', 'read') : '',
            fridgeRow,
          ].join('')}</div>
          <div class="wl-quote tip">${ic('sparkle')}<span class="wl-tip">${NOON_TIPS[dateOf(k).getDate() % NOON_TIPS.length]}</span></div>`;
        goLbl = `Tiếp tục buổi chiều ${ic('arrowR')}`;
      } else {
        const cands = rollCandidates(k), wins = winsOn(k), tl = tasksOn(tmr), tduty = dutyOf(tmr).filter((x) => !x.off);
        const tevs = upcomingEvents(2).filter(({ next }) => next === tmr), thol = holidaysOn(tmr);
        const stat = (v, l) => `<div><b>${v}</b><span>${l}</span></div>`;
        body = `<div class="wl-stats">
            ${stat(`${done}/${list.length}`, 'việc xong')}${stat(`${rd}′`, 'đọc sách')}${stat(`${w}/${S.waterGoal}`, 'ly nước')}${hdue.length ? stat(`${hok}/${hdue.length}`, 'thói quen') : ''}
          </div>
          <div class="wl-card"><h4>Khép lại hôm nay</h4>${[
            letterRow,
            wins.length ? row('wins', `${wins.length} chiến tích hôm nay 🔥`, 'Chạm để xem lại', 'wins')
              : `<label class="wl-row"><span class="wl-ri">${ic('camera')}</span><span><b>Lưu chiến tích hôm nay</b><small>Một bức ảnh cho điều bạn tự hào</small></span>${ic('chevR')}<input type="file" accept="image/*" data-win-input hidden></label>`,
            cands.length ? row('repeat', `${cands.length} việc chưa xong`, 'Chạm để dời sang ngày mai', 'roll') : list.length ? row('check', 'Không còn việc tồn đọng', 'Xuất sắc!') : '',
            (() => { const g = gratOn(k).length; return row('heart', g >= 3 ? 'Đã viết 3 điều biết ơn' : `Ba điều biết ơn hôm nay · ${g}/3`, g >= 3 ? 'Chạm để xem lại' : 'Càng cụ thể càng tốt', 'grat'); })(),
            (() => { const t = S.thanks.filter((x) => x.status === 'todo'); return t.length ? row('share', `${t.length} lời cảm ơn chưa gửi`, t.slice(0, 2).map((x) => esc(x.who)).join(', '), 'grat') : ''; })(),
            row('journal', j.reviewed ? 'Đã tổng kết ngày' : 'Tổng kết ngày', j.reviewed ? 'Chạm để xem lại' : 'Làm tốt gì, cần tốt hơn gì, mai ưu tiên gì', 'review'),
          ].join('')}</div>
          <div class="wl-card"><h4>Ngày mai · ${WDF[dateOf(tmr).getDay()]} ${fmtDM(tmr)}</h4>${[
            ...thol.map((h) => `<div class="wl-row"><span class="wl-ri">${holiIcon(h.i)}</span><span><b>${h.n}</b><small>${lunarFull(tmr)}</small></span></div>`),
            ...tevs.map(({ e }) => row('gift', esc(e.title), 'Ngày mai')),
            ...tduty.map((x) => row('duty', esc(x.label), `${x.time}${x.nextDay ? ' · rạng sáng hôm sau' : ''}`)),
            row('list', tl.length ? `${tl.length} việc đã lên lịch` : 'Chưa có việc cho ngày mai', tl.length ? tl.slice(0, 3).map(tName).join(' · ') : 'Chạm để lên kế hoạch', 'plan'),
          ].join('')}</div>`;
        goLbl = `Chúc ngủ ngon ${ic('moon')}`;
      }
    }
    const moodQ = slot === 'm' ? 'Sáng nay bạn thấy thế nào?' : slot === 'n' ? 'Buổi sáng của bạn thế nào?' : 'Hôm nay của bạn thế nào?';
    const el = document.createElement('div');
    el.className = `welcome wl-${slot}`;
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', cfg.g);
    el.innerHTML = `<div class="wl-wrap">
      ${preview ? '<span class="wl-prev">Xem thử</span>' : ''}
      ${hero}
      ${body}
      <div class="wl-mood"><span>${moodQ}</span>
        <div class="moods">${MOODS.map((m, i) => `<button class="${jm === i + 1 ? 'on' : ''}" data-wl-mood="${i + 1}" aria-label="${m.l}">${m.e}</button>`).join('')}</div>
      </div>
      <button class="btn wl-go" data-wl="go">${goLbl}</button>
    </div>`;
    const close = (after) => {
      el.classList.add('closing'); document.body.classList.remove('reading');
      setTimeout(() => { el.remove(); render(); after && after(); }, 260);
    };
    el.addEventListener('click', (e) => {
      const m = e.target.closest('[data-wl-mood]');
      if (m) { const jj = jour(k), v = +m.dataset.wlMood; jj.mood = jj.mood === v ? undefined : v; save(); $$('[data-wl-mood]', el).forEach((x) => x.classList.toggle('on', jj.mood === +x.dataset.wlMood)); return; }
      const b = e.target.closest('[data-wl]'); if (!b) return;
      const a = b.dataset.wl;
      if (a === 'water') {
        const n = waterOn(k) + 1; S.water[k] = n; save();
        $('[data-w]', b).textContent = `${n}/${S.waterGoal} ly nước`;
        $('[data-ws]', b).textContent = n >= S.waterGoal ? 'Đủ nước rồi, giỏi lắm! 💧' : 'Chạm để thêm 1 ly';
        b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
        return;
      }
      const after = {
        letter: () => openLetter(letter.id), top3: top3Sheet, task: () => taskSheet(), plan: () => taskSheet(null, tmr),
        roll: rollSheet, review: () => reviewSheet(k),
        read: () => go('read'), habits: () => go('habits'), grat: () => go('gratitude'), wins: () => go('wins'), today: () => { if (ui.tab !== 'home') go('home'); },
      }[a];
      close(after || null);
    });
    el.addEventListener('change', (e) => {
      if (!e.target.matches('[data-win-input]')) return;
      const file = e.target.files[0]; e.target.value = '';
      if (file) close(() => winFromFile(file));
    });
    document.body.append(el);
    document.body.classList.add('reading');
  }

  function welcomeSheet() {
    const draw = () => Object.entries(WL_SLOTS).map(([x, c]) => { const o = S.welcomeCfg[x]; return `<div class="wc-row ${o.on ? '' : 'off'}" data-s="${x}">
        <div class="wc-top"><span class="wc-ic wc-${x}">${ic(c.i)}</span><span class="wc-t"><b>${c.n}</b><small>${c.d}</small></span>
          <button type="button" class="switch ${o.on ? 'on' : ''}" role="switch" aria-checked="${o.on}" aria-label="Bật màn chào ${c.n.toLowerCase()}" data-tg><i></i></button></div>
        <div class="wc-bot"><label>Hiện sau <input type="time" class="input wc-time" value="${o.t}" ${o.on ? '' : 'disabled'}></label>
          <button type="button" class="btn btn-ghost wc-try" data-try>${ic('play')} Xem thử</button></div>
      </div>`; }).join('');
    openSheet(`<h3>Màn chào trong ngày</h3>
      <p class="page-sub" style="margin:-10px 0 16px">Hiện khi bạn mở app lần đầu sau mỗi mốc giờ. Mở app muộn thì chỉ hiện màn gần nhất.</p>
      <div class="wc-list" id="wcl">${draw()}</div>
      <button type="button" class="btn btn-ghost btn-block" data-wc-reset style="margin-top:6px">${ic('reset')} Khôi phục 06:00 · 13:00 · 18:30</button>`, (sh) => {
      const list = $('#wcl', sh);
      const unsee = (x) => { if (S.welcomeSeen.d === keyOf() && S.welcomeCfg[x].t > hmNow()) S.welcomeSeen.s = S.welcomeSeen.s.filter((y) => y !== x); };
      list.addEventListener('click', (e) => {
        const r = e.target.closest('.wc-row'); if (!r) return;
        const x = r.dataset.s;
        if (e.target.closest('[data-tg]')) {
          S.welcomeCfg[x].on = !S.welcomeCfg[x].on; unsee(x); save(); list.innerHTML = draw();
          toast(`${S.welcomeCfg[x].on ? 'Đã bật' : 'Đã tắt'} màn chào ${WL_SLOTS[x].n.toLowerCase()}`);
        } else if (e.target.closest('[data-try]')) {
          closeSheet(); setTimeout(() => showWelcome(x, true), 280);
        }
      });
      list.addEventListener('change', (e) => {
        if (!e.target.matches('.wc-time') || !e.target.value) return;
        const x = e.target.closest('.wc-row').dataset.s;
        S.welcomeCfg[x].t = e.target.value; unsee(x); save();
        toast(`Màn chào ${WL_SLOTS[x].n.toLowerCase()} hiện sau ${e.target.value}`);
      });
      $('[data-wc-reset]', sh).addEventListener('click', () => {
        S.welcomeCfg = { m: { on: true, t: '06:00' }, n: { on: true, t: '13:00' }, e: { on: true, t: '18:30' } };
        Object.keys(WL_SLOTS).forEach(unsee); save(); list.innerHTML = draw(); toast('Đã khôi phục giờ mặc định');
      });
    }, () => setTimeout(render, 0));
  }

  // ----- Chọn trạng thái -----
  function toggleFeel(k, id) {
    const j = jour(k), t = j.tags || [];
    j.tags = t.includes(id) ? t.filter((x) => x !== id) : [...t, id];
    if (!j.tags.length) delete j.tags;
    save();
    return !!(j.tags && j.tags.includes(id));
  }
  const feelGrid = (sel) => allFeels().map((f) => `<span class="feel-w">${feelChip(f, sel.includes(f.id), `data-f="${f.id}"`)}${f.custom ? `<button type="button" class="feel-x" data-fdel="${f.id}" aria-label="Xoá trạng thái ${esc(f.l)}">${ic('x', 'stroke-width="3"')}</button>` : ''}</span>`).join('');
  const feelPickerHTML = (sel) => `<div class="feels" data-fp>${feelGrid(sel)}</div>
    <div class="feel-new"><input class="input fe" maxlength="8" placeholder="🙂" aria-label="Biểu tượng (emoji)"><input class="input fl" maxlength="20" placeholder="Tự tạo trạng thái mới…" aria-label="Tên trạng thái"><button type="button" class="btn btn-primary" data-fadd aria-label="Thêm trạng thái">${ic('plus', 'stroke-width="2.6"')}</button></div>`;
  // sel: mảng id đang chọn (được sửa trực tiếp); onChange gọi sau mỗi lần chọn/bỏ
  function bindFeelPicker(root, sel, onChange) {
    const grid = $('[data-fp]', root), fe = $('.fe', root), fl = $('.fl', root);
    const redraw = () => { grid.innerHTML = feelGrid(sel); };
    const add = () => {
      const l = fl.value.trim(); if (!l) { fl.focus(); return; }
      const e = fe.value.trim() || '🏷️';
      const ex = allFeels().find((f) => f.l.toLowerCase() === l.toLowerCase());
      const id = ex ? ex.id : `c${uid()}`;
      if (!ex) S.customFeels.push({ id, e, l });
      if (!sel.includes(id)) sel.push(id);
      save(); fe.value = ''; fl.value = ''; redraw(); onChange && onChange();
      toast(ex ? `Đã chọn “${l}”` : `Đã tạo trạng thái ${e} ${l}`);
    };
    grid.addEventListener('click', (e) => {
      const del = e.target.closest('[data-fdel]');
      if (del) {
        const id = del.dataset.fdel, f = S.customFeels.find((x) => x.id === id);
        S.customFeels = S.customFeels.filter((x) => x.id !== id);
        const i = sel.indexOf(id); if (i >= 0) sel.splice(i, 1);
        save(); redraw(); onChange && onChange();
        toast(`Đã xoá trạng thái “${f ? f.l : ''}”`, { fn: () => { S.customFeels.push(f); save(); redraw(); } });
        return;
      }
      const b = e.target.closest('[data-f]'); if (!b) return;
      const id = b.dataset.f, i = sel.indexOf(id);
      if (i >= 0) sel.splice(i, 1); else sel.push(id);
      b.classList.toggle('on', i < 0); b.setAttribute('aria-pressed', i < 0);
      onChange && onChange();
    });
    $('[data-fadd]', root).addEventListener('click', add);
    fl.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } });
  }
  function feelSheet(k = keyOf()) {
    const sel = tagsOn(k).slice();
    openSheet(`<h3>Trạng thái ${k === keyOf() ? 'hôm nay' : `· ${dayLabel(k)}`}</h3>
      <p class="page-sub" style="margin:-10px 0 14px">Chọn bao nhiêu tuỳ thích. Có thể tự tạo trạng thái của riêng bạn.</p>
      ${feelPickerHTML(sel)}
      <button type="button" class="btn btn-primary btn-block" data-done style="margin-top:14px">Xong</button>`, (sh) => {
      bindFeelPicker(sh, sel, () => { const j = jour(k); if (sel.length) j.tags = sel.slice(); else delete j.tags; save(); });
      $('[data-done]', sh).addEventListener('click', () => { closeSheet(); render(); });
    }, () => setTimeout(render, 0));
  }

  // ================= Tủ lạnh =================
  const F_ZONES = { cool: ['Ngăn mát', '❄️'], freeze: ['Ngăn đông', '🧊'], door: ['Cánh tủ', '🚪'], pantry: ['Kệ bếp', '🧺'] };
  // [tên, biểu tượng, số ngày dùng được ước tính theo ngăn: mát, đông, cánh, kệ (0 = không gợi ý)]
  const F_CATS = {
    veg: ['Rau củ', '🥬', [5, 60, 5, 3]], fruit: ['Trái cây', '🍎', [7, 60, 7, 4]], meat: ['Thịt', '🥩', [2, 90, 2, 0]],
    fish: ['Cá, hải sản', '🐟', [1, 90, 1, 0]], egg: ['Trứng', '🥚', [21, 0, 21, 10]], dairy: ['Sữa, đồ uống', '🥛', [7, 30, 7, 0]],
    cooked: ['Đồ ăn chín', '🍲', [3, 30, 3, 0]], sauce: ['Gia vị, nước chấm', '🧂', [90, 0, 90, 90]], frozen: ['Đồ đông lạnh', '🧊', [2, 90, 2, 0]],
    other: ['Khác', '📦', [7, 30, 7, 7]],
  };
  const F_ZONE_IDX = { cool: 0, freeze: 1, door: 2, pantry: 3 };
  const F_UNITS = ['cái', 'quả', 'bó', 'củ', 'hộp', 'gói', 'chai', 'lon', 'lạng', 'kg', 'con', 'bìa'];
  const F_TPL = [
    ['Rau muống', '🥬', 'veg', 'bó', 'cool'], ['Rau cải', '🥬', 'veg', 'bó', 'cool'], ['Cà chua', '🍅', 'veg', 'quả', 'cool'],
    ['Hành, tỏi', '🧄', 'veg', 'củ', 'pantry'], ['Thịt lợn', '🥩', 'meat', 'lạng', 'cool'], ['Thịt bò', '🥩', 'meat', 'lạng', 'cool'],
    ['Thịt gà', '🍗', 'meat', 'kg', 'cool'], ['Cá', '🐟', 'fish', 'con', 'cool'], ['Tôm', '🦐', 'fish', 'lạng', 'freeze'],
    ['Trứng', '🥚', 'egg', 'quả', 'door'], ['Sữa tươi', '🥛', 'dairy', 'hộp', 'door'], ['Sữa chua', '🥛', 'dairy', 'hộp', 'cool'],
    ['Đậu phụ', '🧈', 'veg', 'bìa', 'cool'], ['Giò chả', '🌭', 'cooked', 'cái', 'cool'], ['Thức ăn thừa', '🍲', 'cooked', 'hộp', 'cool'],
    ['Hoa quả', '🍎', 'fruit', 'kg', 'cool'], ['Bia', '🍺', 'dairy', 'lon', 'door'], ['Nước ngọt', '🥤', 'dairy', 'chai', 'door'],
  ];
  const fShelf = (cat, zone) => (F_CATS[cat] || F_CATS.other)[2][F_ZONE_IDX[zone] || 0] || 0;
  const fLeft = (x) => (x.exp ? daysBetween(keyOf(), x.exp) : null);
  const fStatus = (x) => { const l = fLeft(x); return l === null ? 'none' : l < 0 ? 'bad' : l <= 1 ? 'warn' : l <= 3 ? 'soon' : 'ok'; };
  const fLabel = (x) => {
    const l = fLeft(x);
    if (l === null) { const a = daysBetween(x.added || keyOf(), keyOf()); return a ? `Cho vào ${a} ngày trước` : 'Cho vào hôm nay'; }
    return l < 0 ? `Quá hạn ${-l} ngày` : l === 0 ? 'Hết hạn hôm nay' : l === 1 ? 'Còn 1 ngày' : `Còn ${l} ngày`;
  };
  const fSort = (a, b) => (a.exp || '9999').localeCompare(b.exp || '9999') || a.name.localeCompare(b.name);
  const fUrgent = () => S.fridge.filter((x) => ['bad', 'warn'].includes(fStatus(x))).sort(fSort);
  const fGuess = (name) => F_TPL.find((t) => name.toLowerCase().includes(t[0].toLowerCase().split(',')[0])) || null;
  const fNum = (n) => String(+(+n).toFixed(2)).replace('.', ',');

  function fridgeAlertHTML() {
    const u = fUrgent();
    if (!u.length) return '';
    const bad = u.filter((x) => fStatus(x) === 'bad').length;
    return `<button class="soon-i glass fridge-alert ${bad ? 'hot' : ''}" data-act="go" data-to="fridge"><span class="soon-e">${ic('fridge')}</span><span><b>Tủ lạnh: ${u.length} món cần dùng sớm</b><span>${u.slice(0, 3).map((x) => `${esc(x.name)} (${fLabel(x).toLowerCase()})`).join(', ')}${u.length > 3 ? '…' : ''}</span></span></button>`;
  }

  function viewFridge() {
    const zone = ui.fZone || 'all';
    const list = S.fridge.filter((x) => zone === 'all' || x.zone === zone).sort(fSort);
    const cnt = (st) => S.fridge.filter((x) => fStatus(x) === st).length;
    const mk = keyOf().slice(0, 7), logM = S.fridgeLog.filter((l) => l.date.slice(0, 7) === mk);
    const used = logM.filter((l) => l.type === 'used').length, waste = logM.filter((l) => l.type === 'waste').length;
    const urgent = fUrgent();
    const shopOpen = S.shop.filter((x) => !x.done), shopDone = S.shop.filter((x) => x.done);
    return `${subHead('Tủ lạnh', 'Biết trong tủ còn gì, dùng trước đồ sắp hết hạn.')}
      <div class="dw-sum glass f-sum"><div><b>${S.fridge.length}</b><span>món trong tủ</span></div><div class="${cnt('warn') + cnt('soon') ? 'w' : ''}"><b>${cnt('warn') + cnt('soon')}</b><span>sắp hết hạn</span></div><div class="${cnt('bad') ? 'b' : ''}"><b>${cnt('bad')}</b><span>đã quá hạn</span></div></div>
      ${urgent.length ? `<div class="f-tip">${ic('alert')}<span><b>Ưu tiên dùng trước:</b> ${urgent.map((x) => esc(x.name)).join(', ')}</span></div>` : ''}
      <div class="chip-row">${[['all', 'Tất cả', '🏠'], ...Object.entries(F_ZONES).map(([id, [n, e]]) => [id, n, e])].map(([id, n, e]) => {
        const c = id === 'all' ? S.fridge.length : S.fridge.filter((x) => x.zone === id).length;
        return `<button class="chip ${zone === id ? 'on' : ''}" data-act="f-zone" data-z="${id}">${e} ${n}${c ? ` · ${c}` : ''}</button>`;
      }).join('')}</div>
      ${list.length ? `<div class="f-list">${list.map((x) => {
        const st = fStatus(x);
        return `<div class="f-item glass st-${st}">
          <button class="f-main" data-act="f-edit" data-id="${x.id}">
            <span class="f-emo">${x.emoji || '📦'}</span>
            <span class="f-info"><b>${esc(x.name)}</b><span>${fNum(x.qty)} ${esc(x.unit)} · ${F_ZONES[x.zone] ? F_ZONES[x.zone][0] : ''}</span></span>
            <span class="f-badge">${fLabel(x)}</span>
          </button>
          <button class="f-use" data-act="f-use" data-id="${x.id}" aria-label="Dùng bớt 1 ${esc(x.unit)} ${esc(x.name)}">${ic('minus', 'stroke-width="2.6"')}</button>
        </div>`;
      }).join('')}</div>`
      : `<div class="empty glass"><div class="big">🧊</div>${S.fridge.length ? 'Ngăn này đang trống.' : 'Tủ lạnh chưa có gì.<br>Thêm đồ khi đi chợ về để app nhắc trước khi hết hạn.'}</div>`}
      <button class="btn btn-primary btn-block" data-act="f-new" style="margin:14px 0 6px">${ic('plus')} Thêm đồ vào tủ</button>
      ${logM.length ? `<p class="footnote">Tháng này: dùng hết ${used} món${waste ? ` · bỏ phí ${waste} món` : ''}</p>` : ''}

      <div class="section-head" style="margin-top:22px"><h3>Cần mua</h3>${shopDone.length ? `<button class="link" data-act="shop-clear">Xóa đã mua</button>` : ''}</div>
      <form class="shop-add" id="shop-add" autocomplete="off"><input class="input" name="item" maxlength="60" placeholder="Thêm món cần mua…" enterkeyhint="done"><button class="btn btn-ghost" type="submit" aria-label="Thêm">${ic('plus')}</button></form>
      ${S.shop.length ? `<div class="shop glass">${[...shopOpen, ...shopDone].map((x) => `<button class="sub ${x.done ? 'on' : ''}" data-act="shop-tg" data-id="${x.id}"><span class="sub-c">${ic('check', 'stroke-width="3.2"')}</span>${esc(x.name)}</button>`).join('')}</div>` : '<p class="page-sub" style="margin:0 4px">Danh sách trống. Khi dùng hết một món, app sẽ gợi ý thêm vào đây.</p>'}
      ${shopDone.length ? `<button class="btn btn-ghost btn-block" data-act="shop-to-fridge" style="margin-top:12px">${ic('fridge')} Cho ${shopDone.length} món đã mua vào tủ</button>` : ''}
      <p class="footnote">Hạn dùng gợi ý chỉ là ước tính chung. Hãy xem hạn in trên bao bì nếu có.</p>`;
  }

  function fridgeSheet(item, preset) {
    const today = keyOf();
    const d = item ? { ...item } : { name: '', emoji: '📦', cat: 'other', zone: 'cool', qty: 1, unit: 'cái', added: today, exp: '', autoExp: true, ...(preset || {}) };
    if (!item) { const sh0 = fShelf(d.cat, d.zone); d.exp = sh0 ? addDays(today, sh0) : ''; }
    openSheet(`<h3>${item ? 'Sửa đồ trong tủ' : 'Thêm đồ vào tủ'}</h3>
      ${item ? '' : `<div class="chip-row f-tpl" id="ftpl">${F_TPL.map((t, i) => `<button type="button" class="chip" data-i="${i}">${t[1]} ${t[0]}</button>`).join('')}</div>`}
      <form id="ff" autocomplete="off">
        <div class="f-name"><button type="button" class="f-emo big" id="femo" aria-label="Đổi biểu tượng">${d.emoji}</button><input class="input" name="fname" maxlength="60" required placeholder="Tên món, ví dụ: Thịt lợn" value="${esc(d.name)}"></div>
        <div class="field"><span>Loại</span><div class="chips sm" id="fcat">${Object.entries(F_CATS).map(([id, [n, e]]) => `<button type="button" class="chip ${d.cat === id ? 'on' : ''}" data-v="${id}">${e} ${n}</button>`).join('')}</div></div>
        <div class="field"><span>Để ở</span><div class="seg" id="fzone">${Object.entries(F_ZONES).map(([id, [n]]) => `<button type="button" data-v="${id}" class="${d.zone === id ? 'on' : ''}">${n}</button>`).join('')}</div></div>
        <div class="field"><span>Số lượng</span><div class="f-qty"><div class="stepper"><button type="button" data-s="-1" aria-label="Bớt">${ic('minus')}</button><b id="fq">${fNum(d.qty)}</b><button type="button" data-s="1" aria-label="Thêm">${ic('plus')}</button></div>
          <div class="chips sm" id="funit">${F_UNITS.map((u) => `<button type="button" class="chip ${d.unit === u ? 'on' : ''}" data-v="${u}">${u}</button>`).join('')}</div></div></div>
        <div class="field"><span>Hạn dùng</span>
          <div class="chips sm" id="fexp">${[[1, '+1 ngày'], [3, '+3 ngày'], [7, '+1 tuần'], [30, '+1 tháng'], [0, 'Không hạn']].map(([n, l]) => `<button type="button" class="chip" data-n="${n}">${l}</button>`).join('')}</div>
          <input class="input" type="date" name="fexp" value="${d.exp}" style="margin-top:10px">
          <p class="footnote" id="fhint" style="text-align:left;margin:8px 4px 0"></p></div>
        <button class="btn btn-primary btn-block" type="submit">${item ? 'Lưu thay đổi' : `${ic('plus')} Cho vào tủ`}</button>
        ${item ? `<div class="f-end"><button type="button" class="btn btn-ghost" data-end="used">${ic('check')} Đã dùng hết</button><button type="button" class="btn btn-danger" data-end="waste">${ic('trash')} Bỏ đi (hỏng)</button></div>` : ''}
      </form>`, (sh) => {
      const f = $('#ff', sh);
      let auto = !item;
      const hint = () => {
        const n = fShelf(d.cat, d.zone);
        $('#fhint', sh).textContent = f.fexp.value
          ? `Hết hạn ${WD[dateOf(f.fexp.value).getDay()]}, ${fmtDM(f.fexp.value)} · ${fLabel({ exp: f.fexp.value }).toLowerCase()}${n ? ` · gợi ý cho ${F_CATS[d.cat][0].toLowerCase()} ở ${F_ZONES[d.zone][0].toLowerCase()}: ${n} ngày` : ''}`
          : 'Không đặt hạn dùng.';
      };
      const autoExp = () => { if (!auto) return; const n = fShelf(d.cat, d.zone); f.fexp.value = n ? addDays(today, n) : ''; hint(); };
      const group = (sel, key, after) => $(sel, sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        d[key] = b.dataset.v; $$(`${sel} button`, sh).forEach((x) => x.classList.toggle('on', x === b)); after && after();
      });
      group('#fcat', 'cat', () => { if (d.emoji === '📦' || Object.values(F_CATS).some((c) => c[1] === d.emoji)) { d.emoji = F_CATS[d.cat][1]; $('#femo', sh).textContent = d.emoji; } autoExp(); });
      group('#fzone', 'zone', autoExp);
      group('#funit', 'unit');
      $('.stepper', sh).addEventListener('click', (e) => {
        const b = e.target.closest('[data-s]'); if (!b) return;
        const step = ['kg', 'lạng'].includes(d.unit) ? 0.5 : 1;
        d.qty = Math.max(step, Math.round((+d.qty + step * +b.dataset.s) * 100) / 100); $('#fq', sh).textContent = fNum(d.qty);
      });
      $('#fexp', sh).addEventListener('click', (e) => {
        const b = e.target.closest('[data-n]'); if (!b) return;
        auto = false; const n = +b.dataset.n; f.fexp.value = n ? addDays(today, n) : ''; hint();
      });
      f.fexp.addEventListener('change', () => { auto = false; hint(); });
      $('#femo', sh).addEventListener('click', () => {
        const opts = [...new Set([...F_TPL.map((t) => t[1]), ...Object.values(F_CATS).map((c) => c[1])])];
        d.emoji = opts[(opts.indexOf(d.emoji) + 1) % opts.length]; $('#femo', sh).textContent = d.emoji;
      });
      const tpl = $('#ftpl', sh);
      if (tpl) tpl.addEventListener('click', (e) => {
        const b = e.target.closest('[data-i]'); if (!b) return;
        const [n, emo, cat, unit, zone] = F_TPL[+b.dataset.i];
        Object.assign(d, { name: n, emoji: emo, cat, unit, zone });
        f.fname.value = n; $('#femo', sh).textContent = emo;
        $$('#fcat button', sh).forEach((x) => x.classList.toggle('on', x.dataset.v === cat));
        $$('#fzone button', sh).forEach((x) => x.classList.toggle('on', x.dataset.v === zone));
        $$('#funit button', sh).forEach((x) => x.classList.toggle('on', x.dataset.v === unit));
        $$('#ftpl button', sh).forEach((x) => x.classList.toggle('on', x === b));
        auto = true; autoExp();
      });
      hint();
      sh.addEventListener('click', (e) => {
        const b = e.target.closest('[data-end]'); if (!b || !item) return;
        fRemove(item, b.dataset.end); closeSheet();
      });
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = f.fname.value.trim(); if (!name) return;
        const data = { name, emoji: d.emoji, cat: d.cat, zone: d.zone, qty: d.qty, unit: d.unit, exp: f.fexp.value || '' };
        if (item) Object.assign(item, data); else S.fridge.push({ id: uid(), added: today, ...data });
        save(); closeSheet(); render();
        toast(item ? 'Đã lưu' : `Đã cho ${name} vào ${F_ZONES[d.zone][0].toLowerCase()}${data.exp ? ` · ${fLabel(data).toLowerCase()}` : ''}`);
      });
      if (!item) setTimeout(() => f.fname.focus(), 320);
    });
  }

  function fRemove(x, type) {
    const idx = S.fridge.indexOf(x);
    if (idx < 0) return;
    S.fridge.splice(idx, 1);
    S.fridgeLog.push({ name: x.name, type, date: keyOf() });
    save(); render();
    const inShop = S.shop.some((y) => !y.done && y.name.toLowerCase() === x.name.toLowerCase());
    toast(type === 'waste' ? `Đã bỏ ${x.name}` : `Đã dùng hết ${x.name}`, inShop ? { label: 'Hoàn tác', fn: () => { S.fridge.splice(idx, 0, x); S.fridgeLog.pop(); save(); render(); } }
      : { label: 'Mua thêm', fn: () => { S.shop.push({ id: uid(), name: x.name, done: false }); save(); render(); toast(`Đã thêm ${x.name} vào danh sách cần mua`); } });
  }

  // ---------- Views ----------
  function viewHome() {
    const today = keyOf();
    const list = tasksOn(today);
    const total = list.length;
    const done = list.filter((t) => t.done).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const f = fmtDur(focusOn(today) + runningElapsed());
    const hasNotif = upcoming().length > 0 || overdueList().length > 0 || readLeftMin() > 0 || upcomingEvents(3).length > 0 || dutyNotes().some((x) => !x.quiet) || dueLetters().length > 0 || fUrgent().length > 0;

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
    const blocks = {
      stats: `<section class="stats">
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
      </section>`,
      goal: `<button class="goal" data-act="go-analytics">
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
      </button>`,
      pins: pinsHTML(),
      water: `<div class="water glass">
          <span class="w-ic">${ic('drop')}</span>
          <div class="w-body">
            <div class="w-top"><b>${w}</b><span>/ ${S.waterGoal} ly nước</span>${w >= S.waterGoal ? '<em>Đủ rồi 💧</em>' : ''}</div>
            <div class="cups">${Array.from({ length: Math.max(S.waterGoal, w) }, (_, i) => `<i class="${i < w ? 'on' : ''}"></i>`).join('')}</div>
          </div>
          <button class="w-btn ghost" data-act="water-minus" aria-label="Bớt 1 ly">${ic('minus', 'stroke-width="2.6"')}</button>
          <button class="w-btn" data-act="water-plus" aria-label="Thêm 1 ly">${ic('plus', 'stroke-width="2.6"')}</button>
        </div>`,
      mood: `<div class="mood glass">
          <div class="mood-h"><span>Hôm nay bạn thấy thế nào?</span><button class="link" data-act="go-journal">${ic('journal')} Nhật ký</button></div>
          <div class="moods">${MOODS.map((m, i) => `<button class="${jt.mood === i + 1 ? 'on' : ''}" data-act="mood" data-v="${i + 1}" aria-label="${m.l}" title="${m.l}">${m.e}</button>`).join('')}</div>
          <button class="feels-row" data-act="feels" aria-label="Chọn trạng thái hôm nay">${tagsOn(today).map((id) => { const f = feelOf(id); return `<span class="feel on sm"><em>${f.e}</em><span>${esc(f.l)}</span></span>`; }).join('')}<span class="feel add sm">${ic('plus', 'stroke-width="2.6"')}<span>${tagsOn(today).length ? 'Sửa' : 'Thêm trạng thái: mệt, biết ơn, căng thẳng…'}</span></span></button>
          ${jt.mood ? `<button class="mood-note" data-act="review">${jt.note ? `“${esc(jt.note)}”` : `${ic('edit')} Viết một dòng cho hôm nay…`}</button>` : ''}
        </div>`,
      alerts: [
        (() => {
          const hol = holidaysOn(today), evs = upcomingEvents(7).slice(0, 2);
          if (!hol.length && !evs.length) return '';
          return `<div class="soon">${hol.map((h) => `<button class="soon-i glass" data-act="go" data-to="lunar">${holiIcon(h.i)}<span><b>${h.n}</b><span>Hôm nay · ${lunarFull(today)}</span></span></button>`).join('')}
            ${evs.map(({ e, next }) => { const n = daysBetween(today, next), y = evYears(e, next); return `<button class="soon-i glass ${n === 0 ? 'hot' : ''}" data-act="event-edit" data-eid="${e.id}"><span class="soon-e">${EV_TYPES[e.type][1]}</span><span><b>${esc(e.title)}</b><span>${n === 0 ? 'Hôm nay' : n === 1 ? 'Ngày mai' : `Còn ${n} ngày`} · ${fmtDM(next)}${y > 0 && e.type === 'birthday' ? ` · tròn ${y} tuổi` : ''}</span></span></button>`; }).join('')}</div>`;
        })(),
        (() => { const L = dueLetters()[0]; return L ? `<button class="prompt glass letter-due" data-act="letter-open" data-id="${L.id}"><span class="pi letter">${ic('envelope')}</span><span class="pt"><b>Bạn có thư từ quá khứ! 💌</b><span>Viết ngày ${fmtDMY(L.created)} · chạm để mở</span></span>${ic('chevR')}</button>` : ''; })(),
        (() => { const r = dutyReminder(); return r ? `<button class="prompt glass" data-act="duty-week" data-mon="${r.mon}"><span class="pi duty">${ic('duty')}</span><span class="pt"><b>${r.title}</b><span>${r.sub}</span></span>${ic('chevR')}</button>` : ''; })(),
        dutyNowCard(),
        fridgeAlertHTML(),
      ].join(''),
      habits: habitStripHTML(),
      wins: locketHTML(),
      read: readCardHTML(),
      top3: (hr >= 18 && !jt.reviewed ? `<button class="prompt glass" data-act="review"><span class="pi night">${ic('moon')}</span><span class="pt"><b>Tổng kết ngày</b><span>3 câu hỏi ngắn để nhìn lại hôm nay</span></span>${ic('chevR')}</button>` : '')
        + (topTasks.length ? `<div class="section-head"><h3 class="h-ic"><span class="star">${ic('star')}</span>Top 3 hôm nay</h3><button class="link" data-act="pick-top3">Chỉnh sửa</button></div>
          <div class="tasks top3">${topTasks.map((t) => taskHTML(t)).join('')}</div>`
          : undone >= 2 ? `<button class="prompt glass" data-act="pick-top3"><span class="pi">${ic('star')}</span><span class="pt"><b>Chọn Top 3 hôm nay</b><span>3 việc quan trọng nhất cần làm trước</span></span>${ic('chevR')}</button>` : ''),
      tasks: `<div class="section-head">
          <h3>Việc của tôi</h3>
          ${rollCandidates().length ? `<button class="link" data-act="roll">${ic('arrowR')} Dời sang mai</button>` : `<button class="link" data-act="see-all">Xem lịch ${ic('chevR')}</button>`}
        </div>
        ${list.length || od.length ? groupedHTML(rest, od) : emptyHTML('Hôm nay chưa có việc nào', 'Thêm việc')}`,
    };
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
      ${homeLayout().filter((b) => b.on).map((b) => { const h = (blocks[b.id] || '').trim(); return h ? `<div class="hb hb-${b.id}">${h}</div>` : ''; }).join('')}
      <button class="home-edit" data-act="home-edit">${ic('grid')} Tùy chỉnh trang chủ</button>`;
  }

  // ----- Trang chủ tùy chỉnh -----
  const HOME_BLOCKS = [
    ['stats', 'Thống kê nhanh', 'bars'], ['goal', 'Mục tiêu hôm nay', 'target'], ['pins', 'Tiện ích đã ghim', 'pin'],
    ['water', 'Uống nước', 'drop'], ['mood', 'Tâm trạng', 'smile'], ['alerts', 'Nhắc nhở & sự kiện', 'bell'],
    ['habits', 'Thói quen hôm nay', 'sprout'], ['wins', 'Chiến tích hôm nay', 'wins'], ['read', 'Đọc mỗi ngày', 'book'],
    ['top3', 'Top 3 & tổng kết ngày', 'star'], ['tasks', 'Việc của tôi', 'list'],
  ];
  const DEFAULT_PINS = ['shift', 'money', 'events', 'lunar'];
  function homeLayout() {
    const saved = (Array.isArray(S.homeLayout) ? S.homeLayout : []).filter((b) => HOME_BLOCKS.some((h) => h[0] === b.id)).map((b) => ({ ...b }));
    HOME_BLOCKS.forEach(([id], i) => { if (!saved.some((b) => b.id === id)) saved.splice(Math.min(i, saved.length), 0, { id, on: true }); });
    saved.forEach((b) => { if (b.id === 'tasks') b.on = true; });
    return saved;
  }
  function pinsHTML() {
    const { tiles } = toolTiles();
    const list = S.pins.map((id) => tiles.find((t) => t[0] === id)).filter(Boolean);
    if (!list.length) return '';
    return `<div class="pins">${list.map(([id, n, i, , sub]) => `<button class="pin glass" data-act="go" data-to="${id}"><span class="pin-ic">${ic(i)}</span><span class="pin-t"><b>${n}</b><small>${sub}</small></span></button>`).join('')}</div>`;
  }
  function togglePin(id) {
    const name = (toolTiles().tiles.find((t) => t[0] === id) || [, ''])[1];
    if (S.pins.includes(id)) { S.pins = S.pins.filter((x) => x !== id); toast(`Đã bỏ ghim ${name}`); }
    else if (S.pins.length >= 4) { toast('Chỉ ghim tối đa 4 tiện ích. Hãy bỏ bớt một mục trước'); return false; }
    else { S.pins = [...S.pins, id]; toast(`Đã ghim ${name} lên trang chủ`); }
    save();
    return true;
  }
  function homeEditSheet() {
    const draw = () => {
      const L = homeLayout(), { tiles } = toolTiles();
      return `<div class="grabber"></div><h3>Tùy chỉnh trang chủ</h3>
        <p class="page-sub" style="margin-top:-10px">Bật, tắt và sắp xếp các khối. Thay đổi được áp dụng ngay.</p>
        <div class="he-list">${L.map((b, i) => {
          const m = HOME_BLOCKS.find((h) => h[0] === b.id), locked = b.id === 'tasks';
          return `<div class="he-row ${b.on ? '' : 'off'}"><span class="mi">${ic(m[2])}</span><span class="grow">${m[1]}${locked ? '<small class="pos-sub">Luôn hiển thị</small>' : ''}</span>
            <button class="he-mv" data-mv="${i}" data-d="-1" ${i === 0 ? 'disabled' : ''} aria-label="Đưa ${m[1]} lên">${ic('chevU')}</button>
            <button class="he-mv" data-mv="${i}" data-d="1" ${i === L.length - 1 ? 'disabled' : ''} aria-label="Đưa ${m[1]} xuống">${ic('chevD')}</button>
            ${locked ? '<span class="he-sp"></span>' : `<button class="switch ${b.on ? 'on' : ''}" data-tg="${i}" role="switch" aria-checked="${b.on}" aria-label="Hiện ${m[1]}"><i></i></button>`}</div>`;
        }).join('')}</div>
        <div class="section-head" style="margin:20px 4px 10px"><h3 style="font-size:16px">Tiện ích ghim · ${S.pins.length}/4</h3></div>
        <div class="chips sm">${tiles.map(([id, n]) => `<button class="chip ${S.pins.includes(id) ? 'on' : ''}" data-pin="${id}">${ic('pin')}${n}</button>`).join('')}</div>
        <button class="btn btn-ghost btn-block" data-reset style="margin-top:20px">${ic('reset')} Khôi phục mặc định</button>`;
    };
    openSheet(draw().replace('<div class="grabber"></div>', ''), (sh) => {
      sh.addEventListener('click', (e) => {
        const L = homeLayout();
        const mv = e.target.closest('[data-mv]'), tg = e.target.closest('[data-tg]'), pn = e.target.closest('[data-pin]');
        if (mv) { const a = +mv.dataset.mv, z = a + +mv.dataset.d; [L[a], L[z]] = [L[z], L[a]]; S.homeLayout = L; save(); }
        else if (tg) { const a = +tg.dataset.tg; L[a].on = !L[a].on; S.homeLayout = L; save(); }
        else if (pn) { if (!togglePin(pn.dataset.pin)) return; }
        else if (e.target.closest('[data-reset]')) { delete S.homeLayout; S.pins = DEFAULT_PINS.slice(); save(); toast('Đã khôi phục trang chủ mặc định'); }
        else return;
        render();
        const y = sh.scrollTop;
        sh.innerHTML = draw();
        sh.scrollTop = y;
      });
    });
  }

  // ----- Thanh tiêu đề thu gọn khi cuộn -----
  let cbIO = null;
  function updateCbar() {
    const cb = $('#cbar'), v = $('#view');
    if (!cb) return;
    if (cbIO) cbIO.disconnect();
    cb.classList.remove('show');
    const isHome = ui.tab === 'home', isSub = !MAIN_TABS.includes(ui.tab);
    const anchor = isHome ? $('.hello', v) : $('.page-title', v);
    if (!anchor) { cb.innerHTML = ''; return; }
    const d = new Date(), l = lunarOf(keyOf());
    cb.innerHTML = `<div class="cbar-in">
      ${isSub ? `<button class="cb-btn" data-cb="back" aria-label="Quay lại">${ic('chevL')}</button>` : `<button class="cb-av" data-cb="profile" aria-label="Trang cá nhân">${avatarHTML('xs')}</button>`}
      <button class="cb-title" data-cb="top" aria-label="Lên đầu trang"><b>${isHome ? `Xin chào, ${esc(S.name || 'bạn')} 👋` : esc(anchor.textContent.trim())}</b>${isHome ? `<small>${['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][d.getDay()]}, ${fmtDM(keyOf())} · ÂL ${l.day}/${l.month}</small>` : ''}</button>
      ${isHome ? `<button class="cb-btn" data-cb="search" aria-label="Tìm kiếm">${ic('search')}</button><button class="cb-btn" data-cb="notif" aria-label="Thông báo">${ic('bell')}${$('.topbar .dot', v) ? '<span class="dot"></span>' : ''}</button>` : ''}
    </div>`;
    if ('IntersectionObserver' in window) {
      cbIO = new IntersectionObserver(([en]) => cb.classList.toggle('show', !en.isIntersecting && en.boundingClientRect.top < 0));
      cbIO.observe(anchor);
    }
  }
  $('#cbar').addEventListener('click', (e) => {
    const b = e.target.closest('[data-cb]'); if (!b) return;
    ({ back: () => go(MAIN_TABS.includes(ui.prevTab) ? ui.prevTab : 'home'), profile: () => go('profile'), top: () => window.scrollTo({ top: 0, behavior: 'smooth' }), search: () => searchSheet(), notif: () => notifSheet() })[b.dataset.cb]();
  });

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
    const entries = Object.keys(S.journal).filter((k) => { const j = S.journal[k]; return j.mood || j.note || j.good || j.better || j.tomorrow || tagsOn(k).length || gratOn(k).length; }).sort().reverse();
    const mk = today.slice(0, 7), cnt = {};
    Object.keys(S.journal).filter((k) => k.startsWith(mk)).forEach((k) => tagsOn(k).forEach((t) => { cnt[t] = (cnt[t] || 0) + 1; }));
    const topF = Object.entries(cnt).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const qa = (q, a) => (a ? `<div class="qa"><span>${q}</span><p>${esc(a)}</p></div>` : '');
    return `${subHead('Nhật ký', 'Tâm trạng và những dòng ghi chép mỗi ngày.')}
      <div class="card glass">
        <div class="card-head"><h4>Tâm trạng 5 tuần qua</h4><span>${rated.length ? `Trung bình ${MOODS[Math.round(avg) - 1].e} ${MOODS[Math.round(avg) - 1].l}` : 'Chưa có dữ liệu'}</span></div>
        <div class="mood-grid">${['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => `<b>${d}</b>`).join('')}
          ${days.map((k, i) => `<span class="md ${k === today ? 'today' : ''} ${k > today ? 'future' : ''}" title="${dayLabel(k)}">${moods[i] ? MOODS[moods[i] - 1].e : dateOf(k).getDate()}</span>`).join('')}</div>
      </div>
      <div class="card glass">
        <div class="card-head"><h4>Trạng thái tháng ${+mk.slice(5)}</h4><button class="link" data-act="feels">${ic('plus')} Hôm nay</button></div>
        ${topF.length ? `<div class="feel-stat">${topF.map(([id, n]) => { const f = feelOf(id); return `<div class="fs"><em>${f.e}</em><span class="fs-l"><b>${esc(f.l)}</b><i><u style="width:${Math.round(n / topF[0][1] * 100)}%"></u></i></span><small>${n} ngày</small></div>`; }).join('')}</div>`
          : `<p class="fs-empty">Chưa ghi trạng thái nào trong tháng. Chạm “Hôm nay” để chọn: biết ơn, mệt mỏi, tràn năng lượng…</p>`}
      </div>
      <button class="btn btn-primary btn-block" data-act="review" style="margin-bottom:22px">${ic('moon')} ${S.journal[today] && S.journal[today].reviewed ? 'Sửa tổng kết hôm nay' : 'Tổng kết hôm nay'}</button>
      ${entries.length ? entries.map((k) => {
        const j = S.journal[k];
        return `<button class="entry glass" data-act="review" data-day="${k}">
          <div class="entry-h"><span class="entry-m">${j.mood ? MOODS[j.mood - 1].e : '📝'}</span><b>${dayLabel(k)}</b><span>${pad(dateOf(k).getDate())}/${pad(dateOf(k).getMonth() + 1)}/${dateOf(k).getFullYear()}</span></div>
          ${tagsOn(k).length ? `<div class="entry-tags">${tagsOn(k).map((id) => { const f = feelOf(id); return `<span>${f.e} ${esc(f.l)}</span>`; }).join('')}</div>` : ''}
          ${j.note ? `<p class="entry-note">“${esc(j.note)}”</p>` : ''}
          ${gratOn(k).length ? `<div class="qa"><span>Biết ơn</span><ol class="qa-g">${gratOn(k).map((x) => `<li>${esc(x)}</li>`).join('')}</ol></div>` : ''}
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
          ${holidaysOn(k).map((h) => `<span class="di hol">${holiIcon(h.i)}${h.n}</span>`).join('')}
          ${eventsOn(k).map((e) => `<button class="di ev" data-act="event-edit" data-eid="${e.id}">${EV_TYPES[e.type][1]} ${esc(e.title)}</button>`).join('')}
          ${ds.map((x) => `<button class="di sh" data-act="duty-edit" data-id="${x.id}\" style="--c:${x.color}"><i></i>${esc(x.label)}${x.time ? ` · ${x.time}` : ''}${x.nextDay ? ' (rạng sáng hôm sau)' : ''}${x.e.swap ? ' (đổi ca)' : ''}</button>`).join('')}
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

  function toolTiles() {
    const k = keyOf(), mk = k.slice(0, 7);
    const dueH = S.habits.filter((h) => hDue(h, k)), doneH = dueH.filter((h) => hDone(h, k)).length;
    const outToday = sumType(S.money.filter((x) => x.date === k), 'out');
    const outMonth = sumType(S.money.filter((x) => x.date.slice(0, 7) === mk), 'out');
    const upEv = upcomingEvents(366)[0];
    const l = lunarOf(k), ds = dutyOf(k).filter((x) => !x.off), j = S.journal[k] || {};
    const dueL = S.letters.filter((x) => !x.opened && x.openAt <= k).length, sealedL = S.letters.filter((x) => !x.opened && x.openAt > k).length;
    const winsToday = S.wins.filter((w) => w.date === k).length;
    const tiles = [
      ['wins', 'Chiến tích', 'wins', '', winsToday ? `Hôm nay ${winsToday} ảnh · chuỗi ${winStreak()} ngày` : 'Chụp khoảnh khắc tự hào'],
      ['gratitude', 'Biết ơn', 'heart', '', (() => { const n = gratOn(k).length, st = gratStreak(), td = S.thanks.filter((x) => x.status === 'todo').length; return n >= 3 ? `Đủ 3 điều hôm nay${st > 1 ? ` · chuỗi ${st} ngày` : ''}` : n ? `Hôm nay ${n}/3 điều` : td ? `${td} lời cảm ơn chưa gửi` : 'Ba điều biết ơn mỗi tối'; })()],
      ['letters', 'Thư tương lai', 'envelope', '', dueL ? `${dueL} thư đã đến ngày mở` : sealedL ? `${sealedL} thư đang niêm phong` : 'Viết cho mình mai sau'],
      ['habits', 'Thói quen', 'sprout', '', S.habits.length ? `${doneH}/${dueH.length} hôm nay` : 'Tạo thói quen đầu tiên'],
      ['money', 'Thu chi', 'wallet', '', S.money.length ? `Hôm nay ${fmtShort(outToday)} · Tháng ${fmtShort(outMonth)}` : 'Ghi chi tiêu nhanh'],
      ['fridge', 'Tủ lạnh', 'fridge', '', (() => { const u = fUrgent().length; return u ? `${u} món cần dùng sớm` : S.fridge.length ? `${S.fridge.length} món trong tủ` : 'Theo dõi hạn dùng đồ ăn'; })()],
      ['events', 'Ngày quan trọng', 'gift', '', upEv ? `${esc(upEv.e.title)} · ${cdText(daysBetween(k, upEv.next))}` : 'Sinh nhật, ngày giỗ…'],
      ['lunar', 'Lịch âm', 'moonstar', '', `${l.day}/${l.month} năm ${LN.canChiYear(l.year)}`],
      ['shift', 'Lịch trực', 'duty', '', !S.shift.on ? 'Chưa bật' : ds.length ? `Hôm nay: ${ds.map((x) => x.short).join(', ')}` : 'Hôm nay không có ca'],
      ['journal', 'Nhật ký', 'journal', '', j.mood ? `Hôm nay ${MOODS[j.mood - 1].e} ${MOODS[j.mood - 1].l}` : 'Ghi lại cảm xúc'],
      ['analytics', 'Thống kê', 'chart', '', `${weekDone()} việc xong tuần này`],
      ['profile', 'Cá nhân', 'user', '', `Hồ sơ, mục tiêu, sao lưu · Phiên bản ${APP_VERSION}`],
    ];
    return { tiles, dueL };
  }

  // ================= Biết ơn =================
  const gratOn = (k) => ((S.journal[k] || {}).grat || []).filter((x) => x && x.trim());
  function setGrat(k, list) {
    const j = jour(k), g = list.map((x) => (x || '').trim()).slice(0, 3);
    if (g.some(Boolean)) j.grat = g; else delete j.grat;
  }
  // Chuỗi ngày viết đủ 3 điều (tính đến hôm nay, hoặc hôm qua nếu hôm nay chưa viết đủ)
  function gratStreak() {
    let k = keyOf(), n = 0;
    if (gratOn(k).length < 3) k = addDays(k, -1);
    while (gratOn(k).length >= 3) { n++; k = addDays(k, -1); }
    return n;
  }
  const GRAT_HINTS = ['Một người đã giúp bạn hôm nay…', 'Một điều nhỏ khiến bạn mỉm cười…', 'Một điều bạn thường coi là hiển nhiên…'];
  const thankText = (x) => `Cảm ơn ${x.who.trim()} đã ${x.what.trim().replace(/[.!]+$/, '')}${x.result && x.result.trim() ? `, nhờ vậy ${x.result.trim().replace(/[.!]+$/, '')}` : ''}.`;
  const thankHTML = (x) => `<div class="th-item ${x.status}">
      <span class="th-av">${esc((x.who.trim().split(/\s+/).pop() || '?').charAt(0).toUpperCase())}</span>
      <div class="th-b"><b>${esc(x.who)}</b><p>“${esc(thankText(x))}”</p>
        ${x.status !== 'todo' ? `<small>${x.status === 'sent' ? 'Đã gửi tin' : 'Đã nói trực tiếp'} · ${fmtDMY(x.doneAt || x.created)}</small>` : `<small>Lưu ngày ${fmtDMY(x.created)}</small>`}</div>
      ${x.status === 'todo' ? `<button class="btn btn-primary th-go" data-act="thank-edit" data-id="${x.id}">${ic('share')} Gửi</button>` : `<button class="icon-btn th-more" data-act="thank-edit" data-id="${x.id}" aria-label="Xem lại">${ic('chevR')}</button>`}
    </div>`;
  function viewGratitude() {
    const k = keyOf(), g = (S.journal[k] || {}).grat || [], n = gratOn(k).length, st = gratStreak();
    const total = Object.keys(S.journal).reduce((a, d) => a + gratOn(d).length, 0);
    const done = S.thanks.filter((x) => x.status !== 'todo'), todo = S.thanks.filter((x) => x.status === 'todo');
    const past = Object.keys(S.journal).filter((d) => d < k && gratOn(d).length).sort().reverse().slice(0, 14);
    const eve = new Date().getHours() >= 18;
    return `${subHead('Biết ơn', 'Ba cách thực hành lòng biết ơn mỗi ngày.')}
      <div class="gr-stats glass">
        <div><b>${st}</b><span>ngày liên tiếp</span></div><div><b>${total}</b><span>điều biết ơn</span></div><div><b>${done.length}</b><span>lời cảm ơn</span></div>
      </div>

      <section class="gr-card glass ${eve && n < 3 ? 'hot' : ''}">
        <div class="gr-h"><span class="gr-n">1</span><div><h4>Ba điều biết ơn hôm nay</h4><p>Mỗi tối viết ra 3 điều, càng cụ thể càng tốt.</p></div><em class="gr-cnt ${n >= 3 ? 'ok' : ''}">${n}/3</em></div>
        <form id="grat-f" class="gr-list" autocomplete="off">
          ${[0, 1, 2].map((i) => `<label class="gr-in"><span>${i + 1}</span><textarea class="input" rows="1" name="g${i}" maxlength="200" placeholder="${GRAT_HINTS[i]}">${esc(g[i] || '')}</textarea></label>`).join('')}
          <p class="gr-tip">${ic('sparkle')} Thay vì “gia đình”, hãy viết “mẹ gọi điện hỏi mình đã ăn tối chưa”.</p>
          <button class="btn btn-primary btn-block" type="submit">${n ? 'Cập nhật' : 'Lưu ba điều biết ơn'}</button>
        </form>
      </section>

      <section class="gr-card glass">
        <div class="gr-h"><span class="gr-n">2</span><div><h4>Nói lời cảm ơn rõ ràng</h4><p>Cảm ơn ai, vì việc gì, nhờ vậy điều gì tốt đẹp đã xảy ra.</p></div></div>
        <div class="gr-ex">“Cảm ơn <u>anh</u> đã <u>giúp em sửa file</u>, nhờ vậy <u>em kịp nộp</u>.”</div>
        <button class="btn btn-ghost btn-block" data-act="thank-new">${ic('edit')} Soạn lời cảm ơn</button>
      </section>

      <section class="gr-card glass">
        <div class="gr-h"><span class="gr-n">3</span><div><h4>Lời cảm ơn chưa kịp nói</h4><p>Nghĩ về một người từng giúp bạn mà bạn chưa cảm ơn, rồi gửi họ một tin nhắn.</p></div></div>
        ${todo.length ? `<div class="th-list">${todo.map(thankHTML).join('')}</div>` : '<p class="gr-empty">Chưa có ai trong danh sách. Thầy cô cũ, đồng nghiệp từng chỉ việc, người hàng xóm…</p>'}
        <button class="btn btn-ghost btn-block" data-act="thank-new" data-later="1">${ic('plus')} Thêm người cần cảm ơn</button>
        ${done.length ? `<details class="th-done"><summary>Đã cảm ơn (${done.length})</summary><div class="th-list">${done.slice().reverse().map(thankHTML).join('')}</div></details>` : ''}
      </section>

      ${past.length ? `<div class="section-head"><h3>Những ngày trước</h3></div>${past.map((d) => `<div class="gr-day glass"><b>${dayLabel(d)} · ${fmtDM(d)}</b><ol>${gratOn(d).map((x) => `<li>${esc(x)}</li>`).join('')}</ol></div>`).join('')}` : ''}`;
  }
  // Soạn lời cảm ơn (thực hành 2) hoặc lời cảm ơn chưa kịp nói (thực hành 3)
  function thankSheet(id, later) {
    const old = S.thanks.find((x) => x.id === id);
    const d = old ? { ...old } : { who: '', what: '', result: '' };
    const WHO = ['anh', 'chị', 'em', 'bạn', 'mẹ', 'bố', 'thầy', 'cô', 'chú', 'bác', 'ông', 'bà'];
    openSheet(`<h3>${old ? (old.status === 'todo' ? 'Gửi lời cảm ơn' : 'Lời cảm ơn') : later ? 'Người cần cảm ơn' : 'Soạn lời cảm ơn'}</h3>
      <form id="thf" autocomplete="off">
        <label class="field"><span>Cảm ơn ai?</span><input class="input" name="who" maxlength="40" required value="${esc(d.who)}" placeholder="Ví dụ: anh Tuấn, cô Lan"></label>
        <div class="chips sm th-who">${WHO.map((w) => `<button type="button" class="chip" data-w="${w}">${w}</button>`).join('')}</div>
        <label class="field"><span>Họ đã làm gì cho bạn?</span><textarea class="input" name="what" rows="2" maxlength="160" required placeholder="giúp em sửa file báo cáo">${esc(d.what)}</textarea></label>
        <label class="field"><span>Nhờ vậy điều gì tốt đẹp đã xảy ra?</span><textarea class="input" name="result" rows="2" maxlength="160" placeholder="em kịp nộp đúng hạn">${esc(d.result || '')}</textarea></label>
        <div class="th-prev"><small>Lời cảm ơn của bạn</small><p id="thp"></p></div>
        <div class="th-acts">
          <button type="button" class="btn btn-primary" data-th="send">${ic('share')} Gửi tin nhắn</button>
          <button type="button" class="btn btn-ghost" data-th="copy">${ic('dots')} Chép</button>
        </div>
        <div class="th-acts">
          <button type="button" class="btn btn-ghost" data-th="said">${ic('check')} Đã nói trực tiếp</button>
          <button type="button" class="btn btn-ghost" data-th="later">${ic('clock')} Để gửi sau</button>
        </div>
        ${old ? `<button type="button" class="btn btn-danger btn-block" data-th="del" style="margin-top:10px">${ic('trash')} Xoá</button>` : ''}
      </form>`, (sh) => {
      const f = $('#thf', sh), prev = $('#thp', sh);
      const val = () => ({ who: f.who.value.trim(), what: f.what.value.trim(), result: f.result.value.trim() });
      const draw = () => { const v = val(); prev.textContent = v.who || v.what ? thankText({ who: v.who || '…', what: v.what || '…', result: v.result }) : 'Điền thông tin bên trên để xem lời cảm ơn.'; };
      draw();
      f.addEventListener('input', draw);
      $('.th-who', sh).addEventListener('click', (e) => {
        const b = e.target.closest('[data-w]'); if (!b) return;
        const rest = f.who.value.trim().replace(new RegExp(`^(${WHO.join('|')})\\s*`, 'i'), '');
        f.who.value = `${b.dataset.w}${rest ? ` ${rest}` : ''}`; f.who.focus(); draw();
      });
      const store = (status) => {
        const v = val();
        if (!v.who || !v.what) { toast('Điền người và việc họ đã làm nhé'); (v.who ? f.what : f.who).focus(); return null; }
        const x = old || { id: uid(), created: keyOf() };
        Object.assign(x, v, { status, doneAt: status === 'todo' ? null : keyOf() });
        if (!old) S.thanks.push(x);
        save(); return x;
      };
      f.addEventListener('submit', (e) => e.preventDefault());
      f.addEventListener('click', async (e) => {
        const b = e.target.closest('[data-th]'); if (!b) return;
        const a = b.dataset.th;
        if (a === 'del') { S.thanks = S.thanks.filter((x) => x.id !== old.id); save(); closeSheet(); render(); toast('Đã xoá', { fn: () => { S.thanks.push(old); save(); render(); } }); return; }
        const v = val();
        if (a === 'copy' || a === 'send') {
          if (!v.who || !v.what) { store('todo'); return; }
          const text = thankText(v);
          if (a === 'send' && navigator.share) {
            try { await navigator.share({ text }); } catch (err) { if (err && err.name === 'AbortError') return; }
          } else {
            try { await navigator.clipboard.writeText(text); } catch { /* không chép được */ }
            if (a === 'copy') { toast('Đã chép. Dán vào Zalo, Messenger hoặc tin nhắn nhé'); return; }
            toast('Đã chép lời cảm ơn. Dán vào ứng dụng nhắn tin để gửi');
          }
          if (store('sent')) { closeSheet(); render(); celebrate('Bạn vừa gửi đi một lời cảm ơn 💚'); }
          return;
        }
        if (a === 'said' && store('said')) { closeSheet(); render(); celebrate('Lời cảm ơn rõ ràng làm cả hai cùng vui 💚'); }
        if (a === 'later' && store('todo')) { closeSheet(); render(); toast(`Đã lưu: cảm ơn ${v.who}`); }
      });
    }, () => setTimeout(render, 0));
  }

  function viewTools() {
    const { tiles, dueL } = toolTiles();
    return `${pageHead('Tiện ích', 'Mọi công cụ cho một ngày trọn vẹn.')}
      <div class="tools">${tiles.map(([id, n, i, , sub]) => { const pinned = S.pins.includes(id); return `<div class="tool-w"><button class="tool glass ${id === 'letters' && dueL ? 'hot' : ''}" data-act="go" data-to="${id}"><span class="tool-ic">${ic(i)}</span><b>${n}</b><span>${sub}</span></button>
        <button class="tool-pin ${pinned ? 'on' : ''}" data-act="pin" data-id="${id}" aria-pressed="${pinned}" aria-label="${pinned ? 'Bỏ ghim' : 'Ghim lên trang chủ'}: ${n}">${ic('pin')}</button></div>`; }).join('')}</div>
      <p class="footnote">Chạm biểu tượng ghim để đưa tiện ích lên trang chủ (tối đa 4).</p>`;
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
        ${hol.length || evs.length ? `<div class="lu-tags">${hol.map((h) => `<span>${holiIcon(h.i)}${h.n}</span>`).join('')}${evs.map((e) => `<span>${EV_TYPES[e.type][1]} ${esc(e.title)}</span>`).join('')}</div>` : ''}
      </div>
      <div class="m-nav"><button class="icon-btn glass" data-act="lu-month" data-n="-1" aria-label="Tháng trước">${ic('chevL')}</button><b>Tháng ${m}/${y}</b><button class="icon-btn glass" data-act="lu-month" data-n="1" aria-label="Tháng sau">${ic('chevR')}</button></div>
      <div class="lu-grid glass">${['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((x) => `<b>${x}</b>`).join('')}${cells.map((c) => {
        if (!c) return '<span></span>';
        const ll = lunarOf(c), sp = holidaysOn(c).length || eventsOn(c).length;
        return `<button class="lu-c ${c === k ? 'today' : ''} ${c === sel ? 'sel' : ''} ${sp ? 'hol' : ''} ${ll.day === 1 || ll.day === 15 ? 'key' : ''}" data-act="lu-pick" data-day="${c}"><b>${dateOf(c).getDate()}</b><span>${ll.day === 1 ? `1/${ll.month}` : ll.day}</span></button>`;
      }).join('')}</div>
      <div class="lu-next"><div class="glass"><span>Mùng 1 tới</span><b>${fmtDM(m1)}</b><small>${cdText(daysBetween(k, m1))}</small></div><div class="glass"><span>Rằm tới</span><b>${fmtDM(r15)}</b><small>${cdText(daysBetween(k, r15))}</small></div></div>
      <div class="section-head"><h3>Ngày lễ sắp tới</h3></div>
      <div class="list glass" style="padding:4px 14px">${up.map(([kk, h]) => `<div class="notif">${holiIcon(h.i)}<div><b>${h.n}</b><span>${WD[dateOf(kk).getDay()]}, ${fmtDM(kk)}/${dateOf(kk).getFullYear()} · ÂL ${lunarOf(kk).day}/${lunarOf(kk).month} · ${cdText(daysBetween(k, kk))}</span></div></div>`).join('')}</div>`;
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
    return `${subHead('Lịch trực', 'Đánh dấu ca theo lịch được công bố mỗi tuần.')}
      <div class="sh-toggle glass"><div><b>Bật lịch trực</b><span>Hiện ca trên trang chủ và trong Lịch</span></div>
        <button class="switch ${sh.on ? 'on' : ''}" data-act="shift-toggle" role="switch" aria-checked="${sh.on}" aria-label="Bật lịch trực"><i></i></button></div>
      ${sh.on ? dutyWeekHTML() : ''}`;
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
      ${(() => {
        const pos = posOf(ui.dqPos) || posOf(D.lastPos) || D.positions[0];
        const has = (d, sid) => D.entries.some((e) => e.date === d && e.pos === pos.id && e.shift === sid);
        const other = (d) => D.entries.some((e) => e.date === d && e.pos !== pos.id && posOf(e.pos));
        return `<div class="seg dq-tabs">${D.positions.map((p) => `<button data-act="dq-pos" data-id="${p.id}" class="${p.id === pos.id ? 'on' : ''}">${esc(p.short || p.name)}</button>`).join('')}</div>
          <p class="dq-hint">Chạm vào ô để đánh dấu ca bạn trực, chạm lần nữa để bỏ.</p>
          <div class="dq glass" style="--n:${pos.shifts.length}">
            <span class="dq-corner">Ngày</span>
            ${pos.shifts.map((x) => `<span class="dq-hd"><b>${esc(x.name)}</b><small>${x.start.replace(/^0/, '')}</small></span>`).join('')}
            ${days.map((d) => `<span class="dq-day ${d === today ? 'today' : ''}"><b>${WD[dateOf(d).getDay()]}</b><small>${fmtDM(d)}</small>${other(d) ? '<i title="Có ca ở vị trí khác"></i>' : ''}</span>
              ${pos.shifts.map((x) => { const on = has(d, x.id); return `<button class="dq-c ${on ? 'on' : ''}" data-act="dq-toggle" data-day="${d}" data-sid="${x.id}" aria-pressed="${on}" aria-label="${WD[dateOf(d).getDay()]} ${fmtDM(d)}, ${esc(x.name)} ${x.start}–${x.end}">${ic('check', 'stroke-width="3"')}</button>`; }).join('')}`).join('')}
          </div>
          <div class="dq-legend">${pos.shifts.map((x) => `<span><b>${esc(x.name)}</b>${x.start}–${x.end}</span>`).join('')}</div>`;
      })()}
      <div class="section-head"><h3>Ca của bạn tuần này</h3>${ents.length ? '<span class="page-sub" style="margin:0">Chạm để ghi chú, đổi ca</span>' : ''}</div>
      ${ents.length ? `<div class="dw-days">${days.filter((d) => entriesOn(d).length).map((d) => `<div class="dw-day glass no-add ${d === today ? 'today' : ''}">
          <div class="dw-h"><b>${WD[dateOf(d).getDay()]}</b><span>${fmtDM(d)}</span></div>
          <div class="dw-list">${entriesOn(d).map((x) => `<button class="dw-e" data-act="duty-edit" data-id="${x.e.id}" style="--c:${x.color}"><i></i><span><b>${esc(x.label)}</b><small>${x.time}${x.nextDay ? ' · rạng sáng hôm sau' : ''}${x.e.note ? ` · ${esc(x.e.note)}` : ''}</small>${x.e.swap ? `<em class="${x.e.reported ? 'ok' : ''}">${x.e.reported ? 'Đổi ca · đã báo cáo' : 'Đổi ca · chưa báo cáo'}</em>` : ''}</span></button>`).join('')}</div>
        </div>`).join('')}</div>` : '<p class="page-sub" style="margin:0 4px 14px">Chưa đánh dấu ca nào trong tuần này.</p>'}
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

  function viewWins() {
    const today = keyOf(), mk = ui.winMonth || today.slice(0, 7);
    const [y, m] = mk.split('-').map(Number);
    const startOff = (new Date(y, m - 1, 1).getDay() + 6) % 7, dim = new Date(y, m, 0).getDate();
    const cells = [...Array(startOff).fill(null), ...Array.from({ length: dim }, (_, i) => `${y}-${pad(m)}-${pad(i + 1)}`)];
    const all = S.wins.slice().sort((a, b) => b.ts - a.ts);
    return `${subHead('Chiến tích', 'Mỗi ngày một khoảnh khắc đáng tự hào.')}
      <div class="dw-sum glass"><div><b>${S.wins.length}</b><span>ảnh</span></div><div><b>${new Set(S.wins.map((w) => w.date)).size}</b><span>ngày có chiến tích</span></div><div><b>${winStreak()}</b><span>ngày liên tiếp</span></div></div>
      <label class="btn btn-primary btn-block" style="margin-bottom:18px">${ic('camera')} Thêm chiến tích hôm nay<input type="file" accept="image/*" class="sr-only" data-win-input></label>
      <div class="m-nav"><button class="icon-btn glass" data-act="win-month" data-n="-1" aria-label="Tháng trước">${ic('chevL')}</button><b>Tháng ${m}/${y}</b><button class="icon-btn glass" data-act="win-month" data-n="1" aria-label="Tháng sau" ${mk >= today.slice(0, 7) ? 'disabled' : ''}>${ic('chevR')}</button></div>
      <div class="wn-cal glass">${['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((x) => `<b>${x}</b>`).join('')}${cells.map((c) => {
        if (!c) return '<span></span>';
        const ws = winsOn(c), last = ws[ws.length - 1];
        return last ? `<button class="wn-c has" data-act="win-view" data-id="${last.id}" aria-label="Chiến tích ${fmtDM(c)}"><img data-photo="${last.id}" alt=""><b>${dateOf(c).getDate()}</b></button>`
          : `<span class="wn-c ${c === today ? 'today' : ''} ${c > today ? 'future' : ''}"><b>${dateOf(c).getDate()}</b></span>`;
      }).join('')}</div>
      ${all.length ? `<div class="section-head"><h3>Tất cả ảnh</h3></div>
        <div class="wn-grid">${all.map((w) => `<button data-act="win-view" data-id="${w.id}"><img data-photo="${w.id}" alt="${esc(w.caption || 'Chiến tích')}"><span>${fmtDM(w.date)}</span></button>`).join('')}</div>`
        : '<div class="empty glass"><div class="big">📸</div>Chưa có ảnh chiến tích nào.<br>Mỗi ngày chụp một khoảnh khắc bạn tự hào nhé.</div>'}
      <p class="footnote">Ảnh chỉ lưu trên thiết bị này và không nằm trong file sao lưu dữ liệu.</p>`;
  }

  function viewLetters() {
    const today = keyOf();
    const due = dueLetters();
    const sealed = S.letters.filter((x) => !x.opened && x.openAt > today).sort((a, b) => a.openAt.localeCompare(b.openAt));
    const opened = S.letters.filter((x) => x.opened).sort((a, b) => b.openAt.localeCompare(a.openAt));
    const card = (L, kind) => `<button class="letter glass ${kind}" data-act="letter-open" data-id="${L.id}">
      <span class="env">${ic(kind === 'sealed' ? 'lock' : 'envelope')}</span>
      <span class="lt-info"><b>${L.title ? esc(L.title) : kind === 'sealed' ? 'Thư niêm phong' : 'Thư từ quá khứ'}</b>
      <span>${kind === 'sealed' ? `Mở vào ${fmtDMY(L.openAt)} · ${cdText(daysBetween(today, L.openAt))}` : kind === 'due' ? `Viết ngày ${fmtDMY(L.created)} · đã đến ngày mở` : `Viết ${fmtDMY(L.created)} · mở ${fmtDMY(L.openAt)}`}</span></span>
      ${kind === 'due' ? '<em>Mở thư</em>' : ''}</button>`;
    return `${subHead('Thư gửi tương lai', 'Viết cho chính mình của mai sau.')}
      <button class="btn btn-primary btn-block" data-act="letter-new" style="margin-bottom:18px">${ic('edit')} Viết thư mới</button>
      ${due.length ? `<div class="letters">${due.map((L) => card(L, 'due')).join('')}</div>` : ''}
      ${sealed.length ? `<div class="section-head"><h3>Đang niêm phong</h3></div><div class="letters">${sealed.map((L) => card(L, 'sealed')).join('')}</div>` : ''}
      ${opened.length ? `<div class="section-head"><h3>Đã mở</h3></div><div class="letters">${opened.map((L) => card(L, 'opened')).join('')}</div>` : ''}
      ${!S.letters.length ? '<div class="empty glass"><div class="big">💌</div>Hãy viết lá thư đầu tiên cho chính bạn của 1 tháng, 6 tháng hay 1 năm sau.<br>Khi đến ngày, app sẽ báo để bạn mở thư.</div>' : ''}`;
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
        <button class="menu-item" data-act="welcome-cfg"><span class="mi">${ic('sun')}</span><span class="grow">Màn chào trong ngày</span><span class="hint">${Object.keys(WL_SLOTS).filter((x) => S.welcomeCfg[x].on).map((x) => S.welcomeCfg[x].t).join(' · ') || 'Tắt'}</span></button>
        <button class="menu-item" data-act="go-journal"><span class="mi">${ic('journal')}</span><span class="grow">Nhật ký tâm trạng</span><span class="chev">${ic('chevR')}</span></button>
        <button class="menu-item" data-act="read-goal"><span class="mi">${ic('book')}</span><span class="grow">Mục tiêu đọc mỗi ngày</span><span class="hint">${S.readGoal} phút</span></button>
      </div>
      <div class="list glass">
        <button class="menu-item" data-act="install"><span class="mi">${ic('phone')}</span><span class="grow">Cài lên màn hình chính</span><span class="chev">${ic('chevR')}</span></button>
        <button class="menu-item" data-act="storage"><span class="mi">${ic('disk')}</span><span class="grow">Bộ nhớ đã dùng</span><span class="chev">${ic('chevR')}</span></button>
        <button class="menu-item" data-act="export"><span class="mi">${ic('download')}</span><span class="grow">Sao lưu dữ liệu</span><span class="chev">${ic('chevR')}</span></button>
        <button class="menu-item" data-act="import"><span class="mi">${ic('upload')}</span><span class="grow">Khôi phục dữ liệu</span><span class="chev">${ic('chevR')}</span></button>
        <button class="menu-item danger" data-act="reset"><span class="mi">${ic('trash')}</span><span class="grow">Xóa toàn bộ dữ liệu</span></button>
      </div>
      <div class="ver glass">
        <img src="icons/icon.svg" alt="" class="ver-ic">
        <div class="ver-t"><b>AK Planner · Phiên bản ${APP_VERSION}</b><span>Cập nhật ${APP_DATE} · ${APP_NOTE}</span></div>
        <button class="btn btn-ghost ver-btn" data-act="check-update">${ic('reset')} Kiểm tra</button>
      </div>
      <p class="footnote">Dữ liệu được lưu riêng trên thiết bị này.</p>`;
  }

  const VIEWS = { home: viewHome, calendar: viewCalendar, read: viewRead, tools: viewTools, analytics: viewAnalytics, profile: viewProfile, journal: viewJournal, habits: viewHabits, events: viewEvents, lunar: viewLunar, money: viewMoney, shift: viewShift, wins: viewWins, letters: viewLetters, fridge: viewFridge, gratitude: viewGratitude };
  const MAIN_TABS = ['home', 'calendar', 'read', 'tools'];

  function render(animate = false) {
    const v = $('#view');
    v.innerHTML = VIEWS[ui.tab]();
    if (animate) {
      v.classList.remove('nav-r', 'nav-l');
      v.style.animation = 'none'; void v.offsetWidth; v.style.animation = '';
      if (ui.navDir) v.classList.add(`nav-${ui.navDir}`);
      ui.navDir = null;
    }
    const bars = $$('[data-w]', v);
    if (animate) {
      bars.forEach((el) => { el.style.width = '0'; });
      void v.offsetWidth;
      requestAnimationFrame(() => bars.forEach((el) => { el.style.width = el.dataset.w + '%'; }));
    } else bars.forEach((el) => { el.style.transition = 'none'; el.style.width = el.dataset.w + '%'; });
    hydratePhotos(v);
    bindLocket(v);
    updateCbar();
    const activeTab = MAIN_TABS.includes(ui.tab) ? ui.tab : ui.prevTab;
    $$('.tab').forEach((b) => {
      b.classList.toggle('active', b.dataset.tab === activeTab);
      b.setAttribute('aria-current', b.dataset.tab === ui.tab ? 'page' : 'false');
    });
  }

  function go(tab) {
    if (ui.tab === tab) return;
    const from = ui.tab, fi = MAIN_TABS.indexOf(from), ti = MAIN_TABS.indexOf(tab);
    // Hướng trượt: vào trang con từ phải, quay về từ trái, giữa các tab theo thứ tự tab
    ui.navDir = fi >= 0 && ti >= 0 ? (ti > fi ? 'r' : 'l') : ti < 0 ? 'r' : 'l';
    ui.scrollPos = ui.scrollPos || {};
    ui.scrollPos[from] = window.scrollY;
    if (ti < 0 && fi >= 0) ui.prevTab = from;
    ui.tab = tab;
    render(true);
    // Quay về từ trang con thì giữ vị trí cuộn cũ
    window.scrollTo({ top: ti >= 0 && fi < 0 ? ui.scrollPos[tab] || 0 : 0 });
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
    const ctx = { money: () => moneySheet(), habits: () => habitSheet(), events: () => eventSheet(), tools: () => quickAddSheet(), letters: () => letterSheet(), fridge: () => fridgeSheet(), shift: S.shift.on ? () => dutySheet() : null }[ui.tab];
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
      <div class="field"><span>Trạng thái</span>${feelPickerHTML(tagsOn(k))}</div>
      <form id="jf" autocomplete="off">
        <label class="field"><span>Một dòng cho ${isToday ? 'hôm nay' : 'ngày này'}</span><input class="input" name="note" maxlength="160" value="${esc(j.note || '')}" placeholder="Điều đáng nhớ nhất…"></label>
        <div class="field"><span>Ba điều biết ơn hôm nay</span><div class="gr-mini">${[0, 1, 2].map((i) => `<input class="input" name="gr${i}" maxlength="200" value="${esc(((j.grat || [])[i]) || '')}" placeholder="${i + 1}. ${GRAT_HINTS[i]}">`).join('')}</div></div>
        <label class="field"><span>Mình đã làm tốt điều gì?</span><textarea class="input" name="good" rows="2">${esc(j.good || '')}</textarea></label>
        <label class="field"><span>Điều gì có thể làm tốt hơn?</span><textarea class="input" name="better" rows="2">${esc(j.better || '')}</textarea></label>
        <label class="field"><span>Ngày mai, việc quan trọng nhất là gì?</span><input class="input" name="tomorrow" maxlength="120" value="${esc(j.tomorrow || '')}"></label>
        ${isToday && !j.tomorrowTask ? '<label class="check-row"><input type="checkbox" name="addtask" checked> Thêm việc này vào Top 3 ngày mai</label>' : ''}
        <button class="btn btn-primary btn-block" type="submit">Lưu nhật ký</button>
      </form>`, (sh) => {
      let mood = j.mood || 0;
      const tagSel = tagsOn(k).slice();
      bindFeelPicker(sh, tagSel);
      $('#jm', sh).addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        mood = +b.dataset.v; $$('#jm button', sh).forEach((x) => x.classList.toggle('on', x === b));
      });
      $('#jf', sh).addEventListener('submit', (e) => {
        e.preventDefault();
        const f = e.target, v = (n) => f[n].value.trim();
        const e2 = { ...j, mood: mood || undefined, note: v('note'), good: v('good'), better: v('better'), tomorrow: v('tomorrow') };
        if (tagSel.length) e2.tags = tagSel.slice(); else delete e2.tags;
        const gr = [v('gr0'), v('gr1'), v('gr2')];
        if (gr.some(Boolean)) e2.grat = gr; else delete e2.grat;
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
    const items = [['task', 'Công việc', 'list'], ['money', 'Khoản chi / thu', 'plus'], ['habit', 'Thói quen', 'repeat'], ['event', 'Ngày quan trọng', 'gift'], ['journal', 'Nhật ký hôm nay', 'journal'], ['thank', 'Lời cảm ơn', 'heart'], ['letter', 'Thư gửi tương lai', 'envelope'], ['fridge', 'Đồ vào tủ lạnh', 'fridge']];
    openSheet(`<h3>Thêm nhanh</h3>${items.map(([v, l, i]) => `<button class="menu-item" data-q="${v}"><span class="mi">${ic(i)}</span>${l}</button>`).join('')}`, (sh) => {
      sh.addEventListener('click', (e) => {
        const b = e.target.closest('[data-q]'); if (!b) return;
        ({ task: () => taskSheet(), money: () => moneySheet(), habit: () => habitSheet(), event: () => eventSheet(), journal: () => reviewSheet(), thank: () => thankSheet(), letter: () => letterSheet(), fridge: () => fridgeSheet() })[b.dataset.q]();
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
        S.shift.on = true;
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
    const dn = dutyNotes(), dl = dueLetters(), fu = fUrgent();
    const item = (t, kind) => `<div class="notif">
      <span class="mi" style="${kind === 'od' ? 'background:rgba(255,110,110,.12);color:#f05454' : 'background:var(--primary-soft);color:var(--primary)'}">${ic(kind === 'od' ? 'alert' : 'clock')}</span>
      <div><b>${esc(t.title)}</b><span>${kind === 'od' ? 'Quá hạn · ' : 'Sắp tới · '}${dayLabel(t.date)}, ${fmtTime(t.time)}</span></div></div>`;
    openSheet(`
      <h3>Thông báo</h3>
      ${od.length || up.length || rl || evs.length || dn.length || dl.length || fu.length ? `<div class="list glass" style="padding:4px 12px">${fu.length ? `<button class="notif" style="width:100%;text-align:left" data-fridge><span class="mi" style="background:var(--primary-soft);color:var(--primary)">${ic('fridge')}</span><div><b>Tủ lạnh: ${fu.length} món cần dùng sớm</b><span>${fu.slice(0, 3).map((x) => `${esc(x.name)} · ${fLabel(x).toLowerCase()}`).join(', ')}</span></div></button>` : ''}${dl.map((L) => `<button class="notif" style="width:100%;text-align:left" data-letter="${L.id}"><span class="mi" style="background:var(--primary-soft);color:var(--primary)">${ic('envelope')}</span><div><b>Thư từ quá khứ đã đến ngày mở</b><span>Viết ngày ${fmtDMY(L.created)}</span></div></button>`).join('')}${dn.map((x) => `<button class="notif" style="width:100%;text-align:left" ${x.week ? `data-duty-week="${x.week}"` : x.entry ? `data-duty-entry="${x.entry}"` : 'data-duty-go'}><span class="mi" style="background:color-mix(in srgb, ${x.color} 16%, transparent);color:${x.color};font-size:13px;font-weight:800">${x.badge}</span><div><b>${esc(x.title)}</b><span>${esc(x.sub)}</span></div></button>`).join('')}${evs.map(({ e, next }) => `<div class="notif"><span class="mi" style="background:rgba(214,48,58,.1)">${EV_TYPES[e.type][1]}</span><div><b>${esc(e.title)}</b><span>${daysBetween(keyOf(), next) === 0 ? 'Hôm nay' : daysBetween(keyOf(), next) === 1 ? 'Ngày mai' : `Còn ${daysBetween(keyOf(), next)} ngày`} · ${fmtDM(next)}</span></div></div>`).join('')}${rl ? `<button class="notif" data-open-read style="width:100%;text-align:left"><span class="mi" style="background:color-mix(in srgb, var(--c-study) 14%, transparent);color:var(--c-study)">${ic('book')}</span><div><b>Còn ${rl} phút đọc sách hôm nay</b><span>Chạm để đọc ngay · giữ chuỗi ${readStreak()} ngày</span></div></button>` : ''}${up.map((t) => item(t, 'up')).join('')}${od.map((t) => item(t, 'od')).join('')}</div>` : '<div class="empty"><div class="big">🔔</div>Bạn không có thông báo nào.<br>Mọi thứ đều đang đúng tiến độ!</div>'}`, (sh) => {
      sh.addEventListener('click', (e) => {
        if (e.target.closest('[data-open-read]')) { const L = featuredLesson(); L && openReader(L.id); return; }
        if (e.target.closest('[data-fridge]')) { closeSheet(true); go('fridge'); return; }
        const lt = e.target.closest('[data-letter]');
        if (lt) { openLetter(lt.dataset.letter); return; }
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
  // ---------- Bộ nhớ đã dùng ----------
  const fmtBytes = (n) => {
    if (n < 1024) return `${n} B`;
    const [v, u] = n < 1024 ** 2 ? [n / 1024, 'KB'] : n < 1024 ** 3 ? [n / 1024 ** 2, 'MB'] : [n / 1024 ** 3, 'GB'];
    return `${(v >= 100 ? Math.round(v) : Math.round(v * 10) / 10).toString().replace('.', ',')} ${u}`;
  };
  const DATA_GROUPS = [
    ['Công việc, Top 3', ['tasks', 'top3']], ['Nhật ký, tâm trạng', ['journal', 'customFeels']], ['Thu chi', ['money', 'budget']],
    ['Lịch trực', ['duty', 'shift']], ['Thói quen', ['habits', 'habitLog']], ['Tủ lạnh, cần mua', ['fridge', 'shop', 'fridgeLog']],
    ['Đọc sách', ['readLog', 'readDone', 'readSaved', 'customReads', 'readNotes']], ['Ngày quan trọng', ['events']], ['Thư gửi tương lai', ['letters']],
    ['Chiến tích (chú thích)', ['wins']], ['Tập trung', ['focusLog']], ['Uống nước', ['water']],
  ];
  async function measureStorage() {
    const enc = (x) => new Blob([JSON.stringify(x) || '']).size;
    const raw = localStorage.getItem(STORE) || '';
    const data = raw.length * 2; // localStorage lưu chữ dạng UTF-16
    const used = new Set(), groups = DATA_GROUPS.map(([n, ks]) => { ks.forEach((k) => used.add(k)); return [n, ks.reduce((a, k) => a + (S[k] === undefined ? 0 : enc(S[k])), 0)]; });
    groups.push(['Cài đặt và khác', Object.keys(S).filter((k) => !used.has(k)).reduce((a, k) => a + enc(S[k]), 0)]);
    const jsonSize = groups.reduce((a, g) => a + g[1], 0) || 1;
    let photos = [], cache = 0, est = null, persisted = null;
    try { photos = await PhotoDB.sizes(); } catch { /* chưa có ảnh */ }
    try {
      if (window.caches) for (const name of await caches.keys()) {
        const c = await caches.open(name);
        for (const rq of await c.keys()) { const r = await c.match(rq); if (r) cache += (await r.clone().blob()).size; }
      }
    } catch { /* trình duyệt chặn đọc cache */ }
    try { if (navigator.storage && navigator.storage.estimate) est = await navigator.storage.estimate(); } catch { /* không hỗ trợ */ }
    try { if (navigator.storage && navigator.storage.persisted) persisted = await navigator.storage.persisted(); } catch { /* không hỗ trợ */ }
    const winIds = new Set(S.wins.map((w) => w.id));
    const photoBytes = photos.reduce((a, p) => a + p[1], 0), orphans = photos.filter(([id]) => !winIds.has(id));
    return {
      data, photoBytes, photoCount: photos.length, orphans, cache, est, persisted,
      groups: groups.map(([n, b]) => [n, Math.round(b / jsonSize * data)]).filter((g) => g[1] >= 1024).sort((a, b) => b[1] - a[1]),
    };
  }
  function storageSheet() {
    openSheet(`<h3>Bộ nhớ đã dùng</h3><div id="stg"><div class="stg-load">${ic('disk')} Đang đo dung lượng…</div></div>`, async (sh) => {
      const box = $('#stg', sh);
      const draw = async () => {
        const m = await measureStorage();
        const ours = m.data + m.photoBytes + m.cache;
        const total = m.est && m.est.usage ? Math.max(m.est.usage, ours) : ours;
        const quota = m.est && m.est.quota ? m.est.quota : 0;
        const LS_MAX = 5 * 1024 * 1024, lsPct = Math.min(100, Math.round(m.data / LS_MAX * 100));
        const parts = [
          ['Ảnh chiến tích', m.photoBytes, `${m.photoCount} ảnh`, '#18A957'],
          ['Dữ liệu ghi chép', m.data, 'Việc, nhật ký, thu chi…', '#5fd68f'],
          ['Bản lưu để chạy offline', m.cache, 'Tệp của app, tự cập nhật', '#b9df4f'],
        ];
        const other = total - ours;
        if (other > 50 * 1024) parts.push(['Bộ nhớ hệ thống của trình duyệt', other, 'Chỉ mục, nhật ký cơ sở dữ liệu', '#9fb5a8']);
        box.innerHTML = `<div class="stg-total glass">
            <span>Ứng dụng đang dùng</span><b>${fmtBytes(total)}</b>
            ${quota ? `<small>trên ${fmtBytes(quota)} trình duyệt cho phép · ${quota ? (total / quota * 100 < 0.1 ? '< 0,1' : (Math.round(total / quota * 1000) / 10).toString().replace('.', ',')) : ''}%</small>` : '<small>Máy không cho biết tổng dung lượng được phép</small>'}
            <div class="stg-bar">${parts.map((p) => `<i style="flex:${Math.max(p[1], total * 0.01)};background:${p[3]}"></i>`).join('')}</div>
          </div>
          <div class="stg-list">${parts.map((p) => `<div class="stg-row"><span class="stg-dot" style="background:${p[3]}"></span><span class="grow"><b>${p[0]}</b><small>${p[2]}</small></span><em>${fmtBytes(p[1])}</em></div>`).join('')}</div>
          <h4 class="stg-h">Chi tiết dữ liệu ghi chép</h4>
          <div class="stg-ls"><div class="stg-lsb"><i style="width:${Math.max(lsPct, 1)}%" class="${lsPct >= 70 ? 'warn' : ''}"></i></div><small>${fmtBytes(m.data)} / khoảng 5 MB giới hạn cho dữ liệu chữ (${lsPct}%)</small></div>
          <div class="stg-list sm">${m.groups.slice(0, 8).map(([n, b]) => `<div class="stg-row"><span class="grow">${n}</span><em>${fmtBytes(b)}</em></div>`).join('')}</div>
          ${m.orphans.length ? `<button type="button" class="btn btn-ghost btn-block stg-act" data-clean>${ic('trash')} Dọn ${m.orphans.length} ảnh thừa · giải phóng ${fmtBytes(m.orphans.reduce((a, p) => a + p[1], 0))}</button>` : ''}
          ${m.persisted === false ? `<button type="button" class="btn btn-ghost btn-block stg-act" data-persist>${ic('lock')} Xin giữ dữ liệu lâu dài</button><p class="stg-note">Khi máy sắp đầy, trình duyệt có thể tự xoá dữ liệu của web app ít dùng. Bật mục này để tránh, và nhớ <b>Sao lưu dữ liệu</b> thường xuyên.</p>`
            : m.persisted ? `<p class="stg-note ok">${ic('check')} Dữ liệu được giữ lâu dài, trình duyệt sẽ không tự xoá khi máy đầy.</p>` : ''}
          ${lsPct >= 70 ? `<p class="stg-note warn">Dữ liệu chữ sắp chạm giới hạn. Hãy sao lưu rồi xoá bớt nhật ký/thu chi cũ.</p>` : ''}`;
        const cl = $('[data-clean]', box);
        if (cl) cl.addEventListener('click', async () => {
          cl.disabled = true;
          for (const [id] of m.orphans) { try { await PhotoDB.del(id); } catch { /* bỏ qua */ } }
          toast(`Đã dọn ${m.orphans.length} ảnh thừa`); draw();
        });
        const ps = $('[data-persist]', box);
        if (ps) ps.addEventListener('click', async () => {
          let ok = false; try { ok = await navigator.storage.persist(); } catch { /* không hỗ trợ */ }
          toast(ok ? 'Đã bật giữ dữ liệu lâu dài' : 'Trình duyệt chưa cho phép. Hãy cài app lên màn hình chính rồi thử lại', null, ok ? 'ok' : undefined);
          draw();
        });
      };
      draw().catch(() => { box.innerHTML = '<p class="stg-note">Không đo được dung lượng trên trình duyệt này.</p>'; });
    });
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
      case 'pin': if (togglePin(b.dataset.id)) render(); break;
      case 'home-edit': homeEditSheet(); break;
      case 'feels': feelSheet(); break;
      case 'welcome-cfg': welcomeSheet(); break;
      case 'f-zone': ui.fZone = b.dataset.z; render(); break;
      case 'f-new': fridgeSheet(); break;
      case 'f-edit': fridgeSheet(S.fridge.find((x) => x.id === b.dataset.id)); break;
      case 'f-use': {
        const x = S.fridge.find((y) => y.id === b.dataset.id); if (!x) break;
        const step = ['kg', 'lạng'].includes(x.unit) && x.qty < 1 ? x.qty : 1;
        if (x.qty - step <= 0.001) fRemove(x, 'used');
        else { x.qty = Math.round((x.qty - step) * 100) / 100; save(); render(); toast(`${x.name}: còn ${fNum(x.qty)} ${x.unit}`); }
        break;
      }
      case 'shop-tg': { const x = S.shop.find((y) => y.id === b.dataset.id); if (x) { x.done = !x.done; save(); render(); } break; }
      case 'shop-clear': S.shop = S.shop.filter((x) => !x.done); save(); render(); break;
      case 'shop-to-fridge': {
        const bought = S.shop.filter((x) => x.done);
        bought.forEach((x) => {
          const t = fGuess(x.name), cat = t ? t[2] : 'other', zone = t ? t[4] : 'cool', n = fShelf(cat, zone);
          S.fridge.push({ id: uid(), name: x.name, emoji: t ? t[1] : F_CATS[cat][1], cat, zone, qty: 1, unit: t ? t[3] : 'cái', added: today, exp: n ? addDays(today, n) : '' });
        });
        S.shop = S.shop.filter((x) => !x.done); save(); render();
        toast(`Đã cho ${bought.length} món vào tủ. Chạm từng món để chỉnh số lượng, hạn dùng`);
        break;
      }
      case 'check-update': {
        if (!swReg) { toast(`Bạn đang dùng phiên bản ${APP_VERSION}`); break; }
        b.disabled = true;
        swReg.update().then(() => {
          b.disabled = false;
          if (swReg.installing || swReg.waiting) toast('Đang tải phiên bản mới, app sẽ tự mở lại…');
          else toast(`Bạn đang dùng phiên bản mới nhất (${APP_VERSION})`);
        }).catch(() => { b.disabled = false; toast('Chưa kiểm tra được, hãy thử lại khi có mạng'); });
        break;
      }
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
      case 'letter-new': letterSheet(); break;
      case 'letter-open': openLetter(b.dataset.id); break;
      case 'win-view': winViewer(b.dataset.id); break;
      case 'win-month': ui.winMonth = shiftMonth(ui.winMonth || today.slice(0, 7), +b.dataset.n); render(); break;
      case 'dq-pos': ui.dqPos = b.dataset.id; S.duty.lastPos = b.dataset.id; save(); render(); break;
      case 'dq-toggle': {
        const D = S.duty, pos = posOf(ui.dqPos) || posOf(D.lastPos) || D.positions[0];
        const d = b.dataset.day, sid = b.dataset.sid;
        const i = D.entries.findIndex((e) => e.date === d && e.pos === pos.id && e.shift === sid);
        if (i >= 0) {
          const [old] = D.entries.splice(i, 1); save(); render();
          if (old.swap || old.note) toast('Đã bỏ ca', { fn: () => { D.entries.splice(i, 0, old); save(); render(); } });
        } else {
          D.entries.push({ id: uid(), date: d, pos: pos.id, shift: sid, note: '', swap: false, swapWith: '', reported: false, checks: [] });
          save(); render();
          if (navigator.vibrate) navigator.vibrate(10);
        }
        break;
      }
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
      case 'storage': storageSheet(); break;
      case 'thank-new': thankSheet(null, !!b.dataset.later); break;
      case 'thank-edit': thankSheet(b.dataset.id); break;
      case 'import': importData(); break;
      case 'reset':
        if (confirm('Xóa toàn bộ công việc, dữ liệu tập trung và đọc sách? Không thể hoàn tác.')) {
          const keep = { name: S.name, tagline: S.tagline, avatar: S.avatar, theme: S.theme, focusPreset: S.focusPreset, readGoal: S.readGoal, readFont: S.readFont };
          S = { ...seed(), ...keep, tasks: [] }; normalize(); save(); render(); toast('Đã xóa dữ liệu');
        }
        break;
    }
  });

  $('#view').addEventListener('submit', (e) => {
    if (e.target.id === 'grat-f') {
      e.preventDefault();
      const f = e.target, k = keyOf(), before = gratOn(k).length;
      setGrat(k, [f.g0.value, f.g1.value, f.g2.value]); save();
      const n = gratOn(k).length;
      render();
      if (n >= 3 && before < 3) { const st = gratStreak(); celebrate(st > 1 ? `Đủ 3 điều biết ơn · chuỗi ${st} ngày 💚` : 'Đủ 3 điều biết ơn hôm nay 💚'); }
      else toast(n ? `Đã lưu ${n}/3 điều biết ơn` : 'Đã xoá ghi chép hôm nay');
      return;
    }
    if (e.target.id !== 'shop-add') return;
    e.preventDefault();
    const v = e.target.item.value.trim(); if (!v) return;
    S.shop.push({ id: uid(), name: v, done: false }); save(); render();
    const inp = $('#shop-add input'); if (inp) inp.focus();
  });
  $('#view').addEventListener('change', (e) => {
    if (e.target.matches('[data-win-input]')) { const file = e.target.files[0]; e.target.value = ''; winFromFile(file); return; }
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
    dailyWelcome();
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
      markSlotsSeen(slotsDue());
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
  dailyWelcome();
  // Mở app liên tục qua mốc giờ (vd. 13:00) thì cũng hiện màn chào, trừ khi đang nhập dở
  setInterval(() => { if (!document.hidden) dailyWelcome(); }, 60000);
  if (S.timer && S.timer.endsAt) ensureTick();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    // Tự kiểm tra bản mới mỗi khi mở lại app; có bản mới thì tải lại ngay (hoặc hỏi nếu đang nhập dở)
    const hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then((reg) => {
      swReg = reg;
      document.addEventListener('visibilitychange', () => { if (!document.hidden && reg && reg.update) reg.update().catch(() => {}); });
    }).catch(() => {});
    let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController || reloading) return;
      if ($('.sheet') || R || $('.onboard') || $('.lv') || $('.pv')) {
        toast('Đã có phiên bản mới của app', { label: 'Cập nhật', fn: () => location.reload() }, 'ok');
      } else { reloading = true; location.reload(); }
    });
  }
})();
