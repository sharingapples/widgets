export function getFullDate(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export const DAY_DIFF = 86400 * 1000;
export const SEVEN_DAYS = 7;
export const SINGLE_DAY = 1;


const style = {
  borderTopColor: 'blue',
  borderLeftColor: 'blue',
  borderRightColor: 'blue',
  borderBottomColor: 'blue',
};

const borderStyles = Array(16).fill(style).map((n, idx) => {
  const cellStyle = { ...n };
  const bitArrays = idx.toString(2).padStart(4, '0').split('');
  cellStyle.borderTopColor = bitArrays[3] === '1' ? 'transparent' : 'blue';
  cellStyle.borderRightColor = bitArrays[2] === '1' ? 'transparent' : 'blue';
  cellStyle.borderBottomColor = bitArrays[1] === '1' ? 'transparent' : 'blue';
  cellStyle.borderLeftColor = bitArrays[0] === '1' ? 'transparent' : 'blue';
  return cellStyle;
});

export function getDateBorderStyle(date, selectedDates = {}) {
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
