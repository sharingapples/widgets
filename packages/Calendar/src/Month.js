// @flow
import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import Week from './Week';
import { generateYears } from './util';

type Props = {
  date: Date,
}

const NUM_OF_WEEKS = 6;
const WEEK_DIFF = 7 * 86400 * 1000;

function getStartOfMonth(date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  return first.getTime() - first.getDay() * 86400 * 1000;
}
const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


function renderAllMonths(setView) {
  const months = [];
  for (let i = 0; i < 3; i += 1) {
    const row = [0, 1, 2, 3].map(m => (
      <TouchableHighlight
        key={m}
        style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}
        onPress={() => setView('D', m + 4 * i)}
      >
        <Text>{allMonths[m + 4 * i]}</Text>
      </TouchableHighlight>
    ));
    months.push(<View key={i} style={{ flexDirection: 'row' }}>{row}</View>);
  }
  return months;
}

function renderYears(year, setView) {
  const generatedYears = generateYears(year);
  const years = [];
  for (let i = 0; i < 3; i += 1) {
    const row = [0, 1, 2, 3].map(y => (
      <TouchableHighlight
        key={y}
        style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}
        onPress={() => setView('M', generatedYears[y + 4 * i])}
      >
        <Text>{generatedYears[y + 4 * i]}</Text>
      </TouchableHighlight>
    ));
    years.push(<View key={i} style={{ flexDirection: 'row' }}>{row}</View>);
  }
  return years;
}

function Month({ date, view, setView, ...other }: Props) {
  const start = getStartOfMonth(date);
  const weeks = new Array(NUM_OF_WEEKS).fill(null).map((c, i) => start + i * WEEK_DIFF);

  switch (view) {
    case 'D': {
      return weeks.map(week => (
        <Week
          key={week}
          startOfWeek={week}
          month={date.getMonth()}
          {...other}
        />
      ));
    }

    case 'M': {
      return renderAllMonths(setView).map(m => m);
    }
    default:
      return renderYears(date.getFullYear(), setView).map(y => y);
  }
}

export default Month;
