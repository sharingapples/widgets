import { getTheme } from '@sharingapples/theme';

const theme = getTheme();

/* eslint-disable no-bitwise */
export function getUnixTimeStamp(date) {
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export const DAY_DIFF = 86400 * 1000;
export const SEVEN_DAYS = 7;
export const SINGLE_DAY = 1;

const borderStyles = Array(16).fill(null).map((n, idx) => ({
  borderTopColor: idx & 1 ? 'transparent' : theme.primary,
  borderRightColor: idx & 2 ? 'transparent' : theme.primary,
  borderBottomColor: idx & 4 ? 'transparent' : theme.primary,
  borderLeftColor: idx & 8 ? 'transparent' : theme.primary,
}));


export function isDate(date) {
  return date instanceof Date;
}

export function getDateBorderStyle(date, selectedDates = {}) {
  if (isDate(selectedDates) && selectedDates.toDateString() === new Date(date).toDateString()) {
    return borderStyles[0];
  }

  if (!selectedDates[date]) {
    return undefined;
  }

  const prevWeek = date - SEVEN_DAYS * DAY_DIFF;
  const nextWeek = date + SEVEN_DAYS * DAY_DIFF;
  const nextDay = date + SINGLE_DAY * DAY_DIFF;
  const prevDay = date - SINGLE_DAY * DAY_DIFF;

  const bit0 = selectedDates[prevWeek] ? 1 : 0;
  const bit1 = selectedDates[nextDay] ? 2 : 0;
  const bit2 = selectedDates[nextWeek] ? 4 : 0;
  const bit3 = selectedDates[prevDay] ? 8 : 0;

  const borderStyleIndex = bit0 | bit1 | bit2 | bit3;
  return borderStyles[borderStyleIndex];
}
