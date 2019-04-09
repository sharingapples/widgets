// @flow
import React from 'react';
import Week from './Week';

type Props = {
  month: number,
  onSelect: (date: Date) => void,
  start: number,
  selectedDate: Date,
}

const NUM_OF_WEEKS = 5;
const WEEK_DIFF = 7 * 86400 * 1000;

function getStartOfMonth(date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  return first.getTime() - first.getDay() * 86400 * 1000;
}


function Month({ date, ...other }: Props) {
  const start = getStartOfMonth(date);
  const weeks = new Array(NUM_OF_WEEKS).fill(null).map((c, i) => start + i * WEEK_DIFF);
  return weeks.map(week => (
    <Week
      key={week}
      startOfWeek={week}
      month={date.getMonth()}
      {...other}
    />
  ));
}

export default Month;
