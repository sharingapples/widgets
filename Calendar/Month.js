// @flow
import React from 'react';
import Week from './Week';

type Props = {
  month: number,
  onSelect: (date: Date) => void,
  start: number,
  selectedDate: Date,
  showDate: string,
}

const NUM_OF_WEEKS = 6;
const WEEK_DIFF = 7 * 86400 * 1000;

function Month({ start, month, onSelect, selectedDate, showDate }: Props) {
  const weeks = new Array(NUM_OF_WEEKS).fill(null).map((c, i) => start + i * WEEK_DIFF);
  return weeks.map(week => (
    <Week
      key={week}
      startOfWeek={week}
      month={month}
      onSelect={onSelect}
      selectedDate={selectedDate}
      showDate={showDate}
    />
  ));
}

export default Month;
