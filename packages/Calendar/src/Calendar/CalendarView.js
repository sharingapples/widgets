// @flow
import React, { useContext, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Month from './Month';

import CalendarContext from '../common/CalendarContext';
import { primaryColor } from '../theme';
import Header from '../common/Header';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  clearTextContainer: {
    marginLeft: 15,
  },
  clearText: {
    fontSize: 14,
    color: primaryColor,
  },
  row: {
    flexDirection: 'row',
  },
});

type Props = {
  renderDate: (date: Date) => React.Node,
  setValue: number => void,
  value: ?Date,
  setView: React.Node => void,
  type: 'multi' | 'range' | 'single',
}

function dateRange(date1, date2) {
  const diffTime = date2.getTime() - date1.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const startDate = diffDays < 0 ? date2 : date1;
  const dates = Array(Math.abs(diffDays))
    .fill(new Date(startDate))
    .map(m => new Date(m.setDate(m.getDate() + 1)));
  return [startDate, ...dates];
}

function getStartOfMonth(date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  return first.getTime() - first.getDay() * 86400 * 1000;
}

function CalendarView({
  renderDate, setValue, value, setView, type,
}: Props) {
  const [months, setMonths] = useContext(CalendarContext);
  const shift = useCallback((val) => {
    setMonths(mnths => mnths.map(d => new Date(
      d.getFullYear(),
      d.getMonth() + val,
      1
    )));
  }, []);

  const selectDate = useCallback((d, long) => {
    setValue((prev) => {
      if (type === 'multi') {
        if (Array.isArray(prev)) {
          // logic to remove the date if already Selected
          const isAlreadySelected = prev.filter(dates => dates.toDateString() === d.toDateString());
          return isAlreadySelected.length > 0
            ? [...prev.filter(dates => dates.toDateString() !== d.toDateString())]
            : [...prev, d];
        }
        if (long) {
          return prev ? [prev, d] : [d];
        }
      } else if (type === 'range') {
        if (Array.isArray(prev)) {
          return d;
        }
        if (prev) {
          return dateRange(prev, d);
        }
      }
      return d;
    });
  }, []);

  function clearSelect() {
    setValue(null);
  }

  clearSelect.title = 'Clear';
  return (
    <>
      {months.map(month => (
        <View key={month} style={styles.container}>
          <Month
            start={getStartOfMonth(month)}
            value={value}
            renderDate={renderDate}
            selectDate={selectDate}
            setView={setView}
            month={month.getMonth()}
          />
        </View>
      ))}
      <Header shift={shift} action={Array.isArray(value) && clearSelect} />
    </>
  );
}


export default CalendarView;
