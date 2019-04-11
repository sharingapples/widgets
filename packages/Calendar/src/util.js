import { getTheme } from '@sharingapples/theme';

const theme = getTheme();
const calendarTheme = theme.onCalendar || theme;

/* eslint-disable no-bitwise */

export const DAY_DIFF = 86400 * 1000;
export const SEVEN_DAYS = 7;
export const SINGLE_DAY = 1;

const borderStyles = Array(16).fill(null).map((n, idx) => ({
  borderTopColor: idx & 1 ? 'transparent' : calendarTheme.primary,
  borderRightColor: idx & 2 ? 'transparent' : calendarTheme.primary,
  borderBottomColor: idx & 4 ? 'transparent' : calendarTheme.primary,
  borderLeftColor: idx & 8 ? 'transparent' : calendarTheme.primary,
}));


const cache = {};

function memoize(dep) {
  if (cache[dep]) {
    return cache[dep];
  }
  cache[dep] = dep.reduce((acc, cur) => {
    acc[cur.toDateString()] = true;
    return acc;
  }, {});
  return cache[dep];
}

export function isDate(date) {
  return date instanceof Date;
}

export function generateYears(year) {
  return Array(16).fill(0).map((m, idx) => year + idx);
}


function getDateString(date, diff) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff).toDateString();
}

export function getDateBorderStyle(date, selectedDates) {
  if (!selectedDates) {
    return undefined;
  }

  if (isDate(selectedDates)) {
    return selectedDates.toDateString() === date.toDateString() ? borderStyles[0] : undefined;
  }

  const allDates = memoize(selectedDates);

  const currentDateString = date.toDateString();
  if (!allDates[currentDateString]) {
    return undefined;
  }

  const prevWeek = getDateString(date, -SEVEN_DAYS);
  const nextWeek = getDateString(date, SEVEN_DAYS);
  const nextDay = getDateString(date, SINGLE_DAY);
  const prevDay = getDateString(date, -SINGLE_DAY);

  const bit0 = allDates[prevWeek] ? 1 : 0;
  const bit1 = allDates[nextDay] ? 2 : 0;
  const bit2 = allDates[nextWeek] ? 4 : 0;
  const bit3 = allDates[prevDay] ? 8 : 0;

  const borderStyleIndex = bit0 | bit1 | bit2 | bit3;
  return borderStyles[borderStyleIndex];
}
