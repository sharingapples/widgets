// @flow
import React from 'react';
import Week from './Week';

type Props = {
  month: number,
  onSelect: () => void,
  start: number,
}

function Month({ start, month, onSelect }: Props) {
  const weeks = new Array(6).fill(null).map((c, i) => start + i * 86400 * 1000);
  return weeks.map((week, idx) => (
    <Week
      key={week}
      startOfWeek={week + idx * 6 * 86400 * 1000}
      month={month}
      onSelect={onSelect}
    />
  ));
}

export default Month;
