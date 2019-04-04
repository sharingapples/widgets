

/* eslint-disable no-bitwise */

export function getFullDate(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function getUnixTimeStamp(date) {
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export const DAY_DIFF = 86400 * 1000;
export const SEVEN_DAYS = 7;
export const SINGLE_DAY = 1;

const borderStyles = Array(16).fill(null).map((n, idx) => ({
  borderTopColor: idx & 1 ? 'transparent' : 'blue',
  borderRightColor: idx & 2 ? 'transparent' : 'blue',
  borderBottomColor: idx & 4 ? 'transparent' : 'blue',
  borderLeftColor: idx & 8 ? 'transparent' : 'blue',
}));


export function isDate(date) {
  return date instanceof Date;
}

export function getDateBorderStyle(date, selectedDates = {}) {
  if (isDate(selectedDates) && getFullDate(selectedDates) === getFullDate(new Date(date))) {
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
