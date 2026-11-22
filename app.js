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
    const t = keyOf();
    return {
      name: 'Hoàng',
      tagline: 'Hôm nay thật năng suất và chinh phục mục tiêu nhé.',
      avatar: { type: 'emoji', value: '👮🏻‍♂️' },
      theme: 'auto',
      focusPreset: 25,
      tasks: [
        { id: uid(), title: 'Thiết kế giao diện mới', date: t, time: '10:00', cat: 'work', done: true, doneAt: Date.now() },
        { id: uid(), title: 'Tập thể dục', date: t, time: '18:00', cat: 'health', done: false },
        { id: uid(), title: 'Đọc sách', date: t, time: '20:00', cat: 'study', done: false },
      ],
      focusLog: {},
      timer: null,
    };
  }
  let S;
  try { S = JSON.parse(localStorage.getItem(STORE)) || seed(); } catch { S = seed(); }
  S.tasks = Array.isArray(S.tasks) ? S.tasks : [];
  S.focusLog = S.focusLog || {};
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch { toast('Không lưu được dữ liệu'); } };

  const ui = { tab: 'home', calSel: keyOf(), calWeek: mondayOf(keyOf()) };

  // ---------- Derived ----------
  const tasksOn = (k) => S.tasks.filter((t) => t.date === k).sort(byTime);
  const byTime = (a, b) => (a.time || '99:99').localeCompare(b.time || '99:99');
  const doneOn = (k) => S.tasks.filter((t) => t.done && t.doneAt && keyOf(new Date(t.doneAt)) === k).length;
  const focusOn = (k) => S.focusLog[k] || 0;
  const activeOn = (k) => doneOn(k) > 0 || focusOn(k) >= 60;
  function streak() {
    let k = keyOf();
    if (!activeOn(k)) k = addDays(k, -1);
    let n = 0;
    while (activeOn(k) && n < 3650) { n++; k = addDays(k, -1); }
    return n;
  }
  function bestStreak() {
    const days = new Set(Object.keys(S.focusLog).filter((k) => S.focusLog[k] >= 60));
    S.tasks.forEach((t) => t.done && t.doneAt && days.add(keyOf(new Date(t.doneAt))));
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
  const overdueList = () => S.tasks.filter(isOverdue).sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || '')));

  // ---------- Theme ----------
  function applyTheme() {
    if (S.theme === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', S.theme);
  }

  // ---------- Toast ----------
  let toastT;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove('show'), 2200);
  }

  // ---------- Components ----------
  const avatarHTML = (cls = '') =>
    S.avatar && S.avatar.type === 'img'
      ? `<div class="avatar ${cls}"><img src="${S.avatar.value}" alt="Ảnh đại diện"></div>`
      : `<div class="avatar ${cls}" aria-hidden="true">${(S.avatar && S.avatar.value) || '🙂'}</div>`;

  function taskHTML(t, showDate) {
    const c = CATS[t.cat] || CATS.personal;
    const when = showDate || t.date !== keyOf() ? `${dayLabel(t.date)}, ${fmtTime(t.time)}` : `Hôm nay, ${fmtTime(t.time)}`;
    return `<div class="task glass ${t.done ? 'done' : ''} ${isOverdue(t) ? 'overdue' : ''}" data-id="${t.id}">
      <button class="check" data-act="toggle" aria-label="${t.done ? 'Bỏ đánh dấu' : 'Đánh dấu hoàn thành'}: ${esc(t.title)}">${ic('check', 'stroke-width="3"')}</button>
      <div class="task-body" data-act="edit">
        <div class="task-title">${esc(t.title)}</div>
        <div class="task-meta"><span class="cat-dot" style="--c:${c.color}"></span><span class="when">${when}</span></div>
      </div>
      <button class="more" data-act="menu" aria-label="Tùy chọn">${ic('dots', 'fill="currentColor" stroke="none"')}</button>
    </div>`;
  }

  function greeting() {
    const h = new Date().getHours();
    if (h < 5) return 'Chúc ngủ ngon';
    if (h < 11) return 'Chào buổi sáng';
    if (h < 13) return 'Chào buổi trưa';
    if (h < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  }

  // ---------- Views ----------
  function viewHome() {
    const today = keyOf();
    const list = tasksOn(today);
    const total = list.length;
    const done = list.filter((t) => t.done).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const f = fmtDur(focusOn(today) + runningElapsed());
    const hasNotif = upcoming().length > 0 || overdueList().length > 0;

    let title = 'Bắt đầu thôi!', sub = 'Thêm việc đầu tiên cho hôm nay nhé.';
    if (total) {
      if (pct === 100) { title = 'Tuyệt vời! 🎉'; sub = 'Bạn đã hoàn thành mọi việc hôm nay.'; }
      else if (pct >= 50) { title = 'Cố lên nào!'; sub = `Bạn đã đi được ${pct}% chặng đường hôm nay.`; }
      else if (pct > 0) { title = 'Khởi đầu tốt!'; sub = `Còn ${total - done} việc nữa là xong mục tiêu.`; }
      else { title = 'Sẵn sàng chưa?'; sub = `Hôm nay có ${total} việc đang chờ bạn.`; }
    }

    const shown = list.slice(0, 5);
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
            <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#d8e6b8" stop-opacity=".1"/></linearGradient>
            <linearGradient id="mg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f3a17" stop-opacity=".9"/><stop offset="1" stop-color="#4d7432" stop-opacity="0"/></linearGradient>
          </defs>
          <path d="M60 140 140 34l20 18 18-14 52 102z" fill="url(#mg2)"/>
          <path d="M140 34l-14 18 10-3 8 9 6-12 10 6z" fill="url(#mg)"/>
          <path d="M0 140 70 80l30 22 40-30 90 68z" fill="#1c3315" opacity=".35"/>
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

      <div class="section-head">
        <h3>Việc của tôi</h3>
        <button class="link" data-act="see-all">Xem tất cả ${ic('chevR')}</button>
      </div>
      <div class="tasks">
        ${shown.length ? shown.map((t) => taskHTML(t)).join('') : emptyHTML('Hôm nay chưa có việc nào', 'Thêm việc')}
        ${list.length > shown.length ? `<button class="link" style="align-self:center;margin-top:4px" data-act="see-all">+${list.length - shown.length} việc khác</button>` : ''}
      </div>`;
  }

  const emptyHTML = (msg, cta) => `<div class="empty glass"><div class="big">🌤️</div>${msg}${cta ? `<div><button class="btn btn-ghost" data-act="add">${ic('plus')} ${cta}</button></div>` : ''}</div>`;

  function viewCalendar() {
    const mon = ui.calWeek;
    const days = Array.from({ length: 7 }, (_, i) => addDays(mon, i));
    const today = keyOf();
    const mid = dateOf(days[3]);
    const list = tasksOn(ui.calSel);
    const doneN = list.filter((t) => t.done).length;
    return `
      <h1 class="page-title">Lịch</h1>
      <p class="page-sub">Sắp xếp kế hoạch theo từng ngày.</p>
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
          const n = Math.min(tasksOn(k).length, 3);
          return `<button class="day ${k === today ? 'today' : ''} ${k === ui.calSel ? 'sel' : ''}" data-act="pick-day" data-day="${k}" aria-label="${dayLabel(k)}">
            ${WD[d.getDay()]}<b>${d.getDate()}</b><span class="dots">${'<i></i>'.repeat(n)}</span></button>`;
        }).join('')}
      </div>
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
    const planned = S.tasks.filter((t) => days.includes(t.date));
    const rate = planned.length ? Math.round((planned.filter((t) => t.done).length / planned.length) * 100) : 0;
    const focusTot = fmtDur(focusArr.reduce((a, b) => a + b, 0) * 60);
    const totalDone = S.tasks.filter((t) => t.done).length;

    const barChart = (arr, cls, unit) => {
      const max = Math.max(...arr, 1);
      return `<div class="bars ${cls}">${arr.map((v, i) => {
        const k = days[i];
        return `<div class="bar-col ${k === today ? 'today' : ''}"><span class="val">${v}${unit}</span><div class="b" style="height:${Math.max((v / max) * 100, 4)}%"></div><span class="lbl">${WD[dateOf(k).getDay()]}</span></div>`;
      }).join('')}</div>`;
    };

    const catRows = Object.entries(CATS).map(([id, c]) => {
      const all = S.tasks.filter((t) => t.cat === id);
      const d = all.filter((t) => t.done).length;
      const p = all.length ? Math.round((d / all.length) * 100) : 0;
      return `<div class="cat-row"><span class="name"><span class="cat-dot" style="--c:${c.color}"></span>${c.name}</span>
        <div class="bar" style="--c:${c.color}"><i data-w="${p}"></i></div><span class="pct">${d}/${all.length}</span></div>`;
    }).join('');

    return `
      <h1 class="page-title">Thống kê</h1>
      <p class="page-sub">Nhìn lại 7 ngày gần nhất của bạn.</p>
      <div class="kpis">
        <div class="kpi glass"><span class="stat-ic ic-green">${ic('target', 'stroke-width="2.4"')}</span><div class="v">${rate}<small>%</small></div><div class="l">Tỉ lệ hoàn thành</div></div>
        <div class="kpi glass"><span class="stat-ic ic-gold">${ic('clock', 'stroke-width="2.4"')}</span><div class="v">${focusTot.h}<small>h</small> ${pad(focusTot.m)}<small>m</small></div><div class="l">Thời gian tập trung</div></div>
        <div class="kpi glass"><span class="stat-ic ic-red">${ic('flame', 'stroke-width="2.2"')}</span><div class="v">${bestStreak()}<small> ngày</small></div><div class="l">Chuỗi dài nhất</div></div>
        <div class="kpi glass"><span class="stat-ic ic-green">${ic('check', 'stroke-width="3"')}</span><div class="v">${totalDone}</div><div class="l">Tổng việc đã xong</div></div>
      </div>
      <div class="card glass"><div class="card-head"><h4>Việc hoàn thành</h4><span>${doneArr.reduce((a, b) => a + b, 0)} việc</span></div>${barChart(doneArr, '', '')}</div>
      <div class="card glass"><div class="card-head"><h4>Phút tập trung</h4><span>${focusArr.reduce((a, b) => a + b, 0)} phút</span></div>${barChart(focusArr, 'gold', '')}</div>
      <div class="card glass"><div class="card-head"><h4>Theo danh mục</h4><span>Tất cả thời gian</span></div>${catRows}</div>
      <button class="btn btn-primary btn-block" data-act="focus">${ic('play')} Bắt đầu phiên tập trung</button>`;
  }

  function viewProfile() {
    const themeLbl = { auto: 'Theo hệ thống', light: 'Sáng', dark: 'Tối' }[S.theme];
    return `
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
      </div>
      <div class="list glass">
        <button class="menu-item" data-act="install"><span class="mi">${ic('phone')}</span><span class="grow">Cài lên màn hình chính</span><span class="chev">${ic('chevR')}</span></button>
        <button class="menu-item" data-act="export"><span class="mi">${ic('download')}</span><span class="grow">Sao lưu dữ liệu</span><span class="chev">${ic('chevR')}</span></button>
        <button class="menu-item" data-act="import"><span class="mi">${ic('upload')}</span><span class="grow">Khôi phục dữ liệu</span><span class="chev">${ic('chevR')}</span></button>
        <button class="menu-item danger" data-act="reset"><span class="mi">${ic('trash')}</span><span class="grow">Xóa toàn bộ dữ liệu</span></button>
      </div>
      <p class="footnote">Dữ liệu được lưu riêng trên thiết bị này.</p>`;
  }

  const VIEWS = { home: viewHome, calendar: viewCalendar, analytics: viewAnalytics, profile: viewProfile };

  function render(animate = false) {
    const v = $('#view');
    v.innerHTML = VIEWS[ui.tab]();
    if (animate) { v.style.animation = 'none'; void v.offsetWidth; v.style.animation = ''; }
    requestAnimationFrame(() => $$('[data-w]', v).forEach((el) => (el.style.width = el.dataset.w + '%')));
    $$('.tab').forEach((b) => {
      b.classList.toggle('active', b.dataset.tab === ui.tab);
      b.setAttribute('aria-current', b.dataset.tab === ui.tab ? 'page' : 'false');
    });
  }

  function go(tab) {
    if (ui.tab === tab) return;
    ui.tab = tab;
    render(true);
    window.scrollTo({ top: 0 });
  }

  // ---------- Tab bar ----------
  const TAB_META = { home: ['home', 'Trang chủ'], calendar: ['calendar', 'Lịch'], analytics: ['chart', 'Thống kê'], profile: ['user', 'Cá nhân'] };
  $$('.tab').forEach((b) => {
    const [i, l] = TAB_META[b.dataset.tab];
    b.innerHTML = `<span class="tab-ic">${ic(i)}</span>${l}`;
    b.addEventListener('click', () => go(b.dataset.tab));
  });
  $('#fab').innerHTML = ic('plus', 'stroke-width="2.6"');
  $('#fab').addEventListener('click', () => taskSheet());

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
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });

  function taskSheet(existing, presetDate) {
    const t = existing || { title: '', date: presetDate || (ui.tab === 'calendar' ? ui.calSel : keyOf()), time: '', cat: 'work' };
    const today = keyOf(), tmr = addDays(today, 1);
    openSheet(`
      <h3>${existing ? 'Sửa công việc' : 'Công việc mới'}</h3>
      <form id="tf" autocomplete="off">
        <label class="field"><span>Tên công việc</span><input class="input" name="title" maxlength="120" placeholder="Ví dụ: Chạy bộ 5km" value="${esc(t.title)}" required></label>
        <div class="field"><span>Ngày</span>
          <div class="chips" id="dchips">
            <button type="button" class="chip" data-d="${today}">Hôm nay</button>
            <button type="button" class="chip" data-d="${tmr}">Ngày mai</button>
          </div>
        </div>
        <div class="row">
          <label class="field"><span>Chọn ngày</span><input class="input" type="date" name="date" value="${t.date}" required></label>
          <label class="field"><span>Giờ</span><input class="input" type="time" name="time" value="${t.time || ''}"></label>
        </div>
        <div class="field"><span>Danh mục</span>
          <div class="chips" id="cchips">${Object.entries(CATS).map(([id, c]) => `<button type="button" class="chip ${t.cat === id ? 'on' : ''}" data-c="${id}"><span class="cat-dot" style="--c:${c.color}"></span>${c.name}</button>`).join('')}</div>
        </div>
        <div class="sheet-actions"><button class="btn btn-primary btn-block" type="submit">${existing ? 'Lưu thay đổi' : `${ic('plus')} Thêm công việc`}</button></div>
      </form>`, (sh) => {
      const f = $('#tf', sh);
      let cat = t.cat;
      const syncD = () => $$('#dchips .chip', sh).forEach((c) => c.classList.toggle('on', c.dataset.d === f.date.value));
      syncD();
      f.date.addEventListener('change', syncD);
      $('#dchips', sh).addEventListener('click', (e) => { const c = e.target.closest('.chip'); if (c) { f.date.value = c.dataset.d; syncD(); } });
      $('#cchips', sh).addEventListener('click', (e) => {
        const c = e.target.closest('.chip'); if (!c) return;
        cat = c.dataset.c; $$('#cchips .chip', sh).forEach((x) => x.classList.toggle('on', x === c));
      });
      if (!existing) setTimeout(() => f.title.focus(), 320);
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = f.title.value.trim();
        if (!title) return;
        if (existing) Object.assign(existing, { title, date: f.date.value, time: f.time.value, cat });
        else S.tasks.push({ id: uid(), title, date: f.date.value, time: f.time.value, cat, done: false });
        save(); closeSheet(); render();
        toast(existing ? 'Đã lưu thay đổi' : `Đã thêm vào ${dayLabel(f.date.value).toLowerCase()}`);
      });
    });
  }

  function taskMenu(t) {
    openSheet(`
      <h3>${esc(t.title)}</h3>
      <button class="menu-item" data-m="edit"><span class="mi">${ic('edit')}</span>Chỉnh sửa</button>
      <button class="menu-item" data-m="toggle"><span class="mi">${ic('check')}</span>${t.done ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành'}</button>
      <button class="menu-item" data-m="tmr"><span class="mi">${ic('arrowR')}</span>Dời sang ngày mai</button>
      <button class="menu-item danger" data-m="del"><span class="mi">${ic('trash')}</span>Xóa công việc</button>`, (sh) => {
      sh.addEventListener('click', (e) => {
        const b = e.target.closest('[data-m]'); if (!b) return;
        const m = b.dataset.m;
        if (m === 'edit') { taskSheet(t); return; }
        if (m === 'toggle') { closeSheet(); toggleTask(t.id); return; }
        if (m === 'tmr') { t.date = addDays(t.date < keyOf() ? keyOf() : t.date, 1); save(); toast('Đã dời sang ' + dayLabel(t.date).toLowerCase()); }
        if (m === 'del') {
          const idx = S.tasks.indexOf(t);
          S.tasks.splice(idx, 1); save();
          toast('Đã xóa công việc');
        }
        closeSheet(); render();
      });
    });
  }

  function toggleTask(id) {
    const t = S.tasks.find((x) => x.id === id); if (!t) return;
    const wasAllDone = tasksOn(keyOf()).every((x) => x.done);
    t.done = !t.done;
    t.doneAt = t.done ? Date.now() : null;
    save();
    if (t.done && navigator.vibrate) navigator.vibrate(12);
    render();
    const el = $(`.task[data-id="${id}"]`);
    el && el.classList.add('pop');
    const list = tasksOn(keyOf());
    if (t.done && t.date === keyOf() && list.length && list.every((x) => x.done) && !wasAllDone) toast('Xuất sắc! Bạn đã xong mọi việc hôm nay 🎉');
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
          <defs><linearGradient id="tg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fb35a"/><stop offset="1" stop-color="#3e6b2f"/></linearGradient></defs>
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
        if (e.target.closest('[data-act="toggle"]')) { t.done = !t.done; t.doneAt = t.done ? Date.now() : null; save(); run(); render(); return; }
        ui.calSel = t.date; ui.calWeek = mondayOf(t.date); closeSheet(); ui.tab = ''; go('calendar');
      });
    });
  }

  function notifSheet() {
    const od = overdueList(), up = upcoming();
    const item = (t, kind) => `<div class="notif">
      <span class="mi" style="${kind === 'od' ? 'background:rgba(255,110,110,.12);color:#f05454' : 'background:var(--primary-soft);color:var(--primary)'}">${ic(kind === 'od' ? 'alert' : 'clock')}</span>
      <div><b>${esc(t.title)}</b><span>${kind === 'od' ? 'Quá hạn · ' : 'Sắp tới · '}${dayLabel(t.date)}, ${fmtTime(t.time)}</span></div></div>`;
    openSheet(`
      <h3>Thông báo</h3>
      ${od.length || up.length ? `<div class="list glass" style="padding:4px 12px">${up.map((t) => item(t, 'up')).join('')}${od.map((t) => item(t, 'od')).join('')}</div>` : '<div class="empty"><div class="big">🔔</div>Bạn không có thông báo nào.<br>Mọi thứ đều đang đúng tiến độ!</div>'}`);
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
        save(); applyTheme(); render(); toast('Đã khôi phục dữ liệu');
      } catch { toast('File sao lưu không hợp lệ'); }
    };
    inp.click();
  }

  // ---------- Global events ----------
  $('#view').addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const act = b.dataset.act;
    const taskEl = b.closest('.task');
    const t = taskEl && S.tasks.find((x) => x.id === taskEl.dataset.id);
    switch (act) {
      case 'toggle': toggleTask(t.id); break;
      case 'edit': taskSheet(t); break;
      case 'menu': taskMenu(t); break;
      case 'add': taskSheet(); break;
      case 'search': searchSheet(); break;
      case 'notif': notifSheet(); break;
      case 'focus': focusSheet(); break;
      case 'go-analytics': go('analytics'); break;
      case 'go-profile': go('profile'); break;
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
        if (confirm('Xóa toàn bộ công việc và dữ liệu tập trung? Không thể hoàn tác.')) {
          const keep = { name: S.name, tagline: S.tagline, avatar: S.avatar, theme: S.theme, focusPreset: S.focusPreset };
          S = { ...seed(), ...keep, tasks: [] }; save(); render(); toast('Đã xóa dữ liệu');
        }
        break;
    }
  });

  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });

  // Cập nhật khi quay lại app hoặc qua ngày mới
  let lastDay = keyOf();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return;
    if (S.timer && S.timer.endsAt) ensureTick();
    if (keyOf() !== lastDay) { lastDay = keyOf(); ui.calSel = lastDay; ui.calWeek = mondayOf(lastDay); }
    if (!$('.sheet')) render();
  });

  // ---------- Boot ----------
  applyTheme();
  render();
  if (S.timer && S.timer.endsAt) ensureTick();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
