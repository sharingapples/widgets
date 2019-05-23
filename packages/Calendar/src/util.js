import { StyleSheet } from 'react-native';
import { getTheme } from '@sharingapples/theme';

const theme = getTheme();
const calendarTheme = theme.onCalendar || theme;

/* eslint-disable no-bitwise */

export const DAY_DIFF = 86400 * 1000;
export const SEVEN_DAYS = 7;
export const SINGLE_DAY = 1;

export const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const ALL_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


const borderStyles = Array(16).fill(null).map((n, idx) => StyleSheet.create({
  border: {
    alignItems: 'center',
    paddingHorizontal: 3,
    width: `${100 / 7}%`,
    paddingVertical: 3,
    borderWidth: StyleSheet.hairlineWidth,
    margin: -StyleSheet.hairlineWidth,
    borderTopColor: idx & 1 ? 'transparent' : calendarTheme.primary,
    borderRightColor: idx & 2 ? 'transparent' : calendarTheme.primary,
    borderBottomColor: idx & 4 ? 'transparent' : calendarTheme.primary,
    borderLeftColor: idx & 8 ? 'transparent' : calendarTheme.primary,
  },
}).border);


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

export function getMonthCount({ width }, date) {
  const value = Array.isArray(date) ? date[0] : date;
  return width > 560
    ? [value, new Date(value.getFullYear(), value.getMonth() + 1)] : [value];
}

function getDateString(date, diff) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff).toDateString();
}

export function getDateBorderStyle(date, selectedDates) {
  if (!selectedDates) {
    return borderStyles[15];
  }

  if (isDate(selectedDates)) {
    return selectedDates.toDateString() === date.toDateString() ? borderStyles[0] : borderStyles[15];
  }

  const allDates = memoize(selectedDates);

  const currentDateString = date.toDateString();
  if (!allDates[currentDateString]) {
    return borderStyles[15];
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
