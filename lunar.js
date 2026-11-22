/* Âm lịch Việt Nam (múi giờ +7).
   Dựa trên thuật toán thiên văn công bố công khai của Hồ Ngọc Đức. */
(() => {
  'use strict';
  const TZ = 7;
  const PI = Math.PI;
  const INT = Math.floor;

  function jdFromDate(dd, mm, yy) {
    const a = INT((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
    if (jd < 2299161) jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
    return jd;
  }

  function jdToDate(jd) {
    let a, b, c;
    if (jd > 2299160) {
      a = jd + 32044;
      b = INT((4 * a + 3) / 146097);
      c = a - INT((b * 146097) / 4);
    } else {
      b = 0;
      c = jd + 32082;
    }
    const d = INT((4 * c + 3) / 1461);
    const e = c - INT((1461 * d) / 4);
    const m = INT((5 * e + 2) / 153);
    const day = e - INT((153 * m + 2) / 5) + 1;
    const month = m + 3 - 12 * INT(m / 10);
    const year = b * 100 + d - 4800 + INT(m / 10);
    return [day, month, year];
  }

  function newMoon(k) {
    const T = k / 1236.85, T2 = T * T, T3 = T2 * T, dr = PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    const deltat = T < -11
      ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
      : -0.000278 + 0.000265 * T + 0.000262 * T2;
    return Jd1 + C1 - deltat;
  }

  function sunLongitude(jdn) {
    const T = (jdn - 2451545.0) / 36525, T2 = T * T, dr = PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = (L0 + DL) * dr;
    L = L - PI * 2 * INT(L / (PI * 2));
    return L;
  }

  const getSunLongitude = (dayNumber) => INT((sunLongitude(dayNumber - 0.5 - TZ / 24) / PI) * 6);
  const getNewMoonDay = (k) => INT(newMoon(k) + 0.5 + TZ / 24);

  function getLunarMonth11(yy) {
    const off = jdFromDate(31, 12, yy) - 2415021;
    const k = INT(off / 29.530588853);
    let nm = getNewMoonDay(k);
    if (getSunLongitude(nm) >= 9) nm = getNewMoonDay(k - 1);
    return nm;
  }

  function getLeapMonthOffset(a11) {
    const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0, i = 1;
    let arc = getSunLongitude(getNewMoonDay(k + i));
    do {
      last = arc;
      i++;
      arc = getSunLongitude(getNewMoonDay(k + i));
    } while (arc !== last && i < 14);
    return i - 1;
  }

  // Dương → Âm. Trả về { day, month, year, leap, jd }
  function solar2lunar(dd, mm, yy) {
    const dayNumber = jdFromDate(dd, mm, yy);
    const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = getNewMoonDay(k + 1);
    if (monthStart > dayNumber) monthStart = getNewMoonDay(k);
    let a11 = getLunarMonth11(yy), b11 = a11, lunarYear;
    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = getLunarMonth11(yy - 1);
    } else {
      lunarYear = yy + 1;
      b11 = getLunarMonth11(yy + 1);
    }
    const lunarDay = dayNumber - monthStart + 1;
    const diff = INT((monthStart - a11) / 29);
    let lunarLeap = 0, lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      const leapMonthDiff = getLeapMonthOffset(a11);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) lunarLeap = 1;
      }
    }
    if (lunarMonth > 12) lunarMonth -= 12;
    if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
    return { day: lunarDay, month: lunarMonth, year: lunarYear, leap: lunarLeap, jd: dayNumber };
  }

  // Âm → Dương. Trả về [day, month, year] hoặc null nếu không tồn tại
  function lunar2solar(lunarDay, lunarMonth, lunarYear, lunarLeap = 0) {
    let a11, b11;
    if (lunarMonth < 11) {
      a11 = getLunarMonth11(lunarYear - 1);
      b11 = getLunarMonth11(lunarYear);
    } else {
      a11 = getLunarMonth11(lunarYear);
      b11 = getLunarMonth11(lunarYear + 1);
    }
    const k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
    let off = lunarMonth - 11;
    if (off < 0) off += 12;
    if (b11 - a11 > 365) {
      const leapOff = getLeapMonthOffset(a11);
      let leapMonth = leapOff - 2;
      if (leapMonth < 0) leapMonth += 12;
      if (lunarLeap !== 0 && lunarMonth !== leapMonth) return null;
      if (lunarLeap !== 0 || off >= leapOff) off += 1;
    }
    const monthStart = getNewMoonDay(k + off);
    return jdToDate(monthStart + lunarDay - 1);
  }

  const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  const MONTH_NAMES = ['Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười', 'Mười Một', 'Chạp'];

  const canChiYear = (y) => `${CAN[(y + 6) % 10]} ${CHI[(y + 8) % 12]}`;
  const canChiMonth = (m, y) => `${CAN[(y * 12 + m + 3) % 10]} ${CHI[(m + 1) % 12]}`;
  const canChiDay = (jd) => `${CAN[(jd + 9) % 10]} ${CHI[(jd + 1) % 12]}`;

  // Ngày lễ: dương lịch (ngày/tháng) và âm lịch (ngày/tháng)
  // Ngày lễ: [tên, loại biểu tượng]
  const SOLAR_HOLIDAYS = {
    '1-1': ['Tết Dương lịch', 'firework'], '3-2': ['Ngày thành lập Đảng', 'star'], '14-2': ['Lễ Tình nhân', 'heart'],
    '8-3': ['Quốc tế Phụ nữ', 'heart'], '26-3': ['Ngày thành lập Đoàn TNCS', 'star'], '30-4': ['Giải phóng miền Nam', 'star'],
    '1-5': ['Quốc tế Lao động', 'hammer'], '19-5': ['Ngày sinh Chủ tịch Hồ Chí Minh', 'star'], '1-6': ['Quốc tế Thiếu nhi', 'balloon'],
    '28-6': ['Ngày Gia đình Việt Nam', 'heart'], '27-7': ['Ngày Thương binh Liệt sĩ', 'candle'],
    '19-8': ['Cách mạng Tháng Tám · Ngày truyền thống CAND', 'shield'], '2-9': ['Quốc khánh', 'star'],
    '10-10': ['Giải phóng Thủ đô', 'star'], '20-10': ['Ngày Phụ nữ Việt Nam', 'heart'], '20-11': ['Ngày Nhà giáo Việt Nam', 'cap'],
    '22-12': ['Thành lập Quân đội Nhân dân', 'star'], '24-12': ['Đêm Giáng sinh', 'tree'],
  };
  const LUNAR_HOLIDAYS = {
    '1-1': ['Tết Nguyên đán', 'tet'], '2-1': ['Mùng 2 Tết', 'tet'], '3-1': ['Mùng 3 Tết', 'tet'], '15-1': ['Rằm tháng Giêng', 'moon'],
    '3-3': ['Tết Hàn thực', 'bowl'], '10-3': ['Giỗ Tổ Hùng Vương', 'temple'], '15-4': ['Lễ Phật đản', 'lotus'],
    '5-5': ['Tết Đoan ngọ', 'bowl'], '15-7': ['Lễ Vu Lan', 'lotus'], '15-8': ['Tết Trung thu', 'lantern'], '23-12': ['Ông Công Ông Táo', 'fish'],
  };

  window.Lunar = {
    jdFromDate, jdToDate, solar2lunar, lunar2solar, canChiYear, canChiMonth, canChiDay,
    MONTH_NAMES, SOLAR_HOLIDAYS, LUNAR_HOLIDAYS,
  };
})();
