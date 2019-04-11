// @flow
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { getTheme } from '@sharingapples/theme';
import Header from './Header';
import Month from './Month';

const theme = getTheme();
const calendarTheme = theme.onCalendar || theme;

const YEARS_DIFF = 11;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: calendarTheme.background,
  },
});

function getMonthCount({ width }, value) {
  if (Array.isArray(value)) {
    return value;
  }
  return width > 400
    ? [value, new Date(value.getFullYear(), value.getMonth() + 1)] : [value];
}

type Props = {
  renderDate: (date: Date) => React.Node,
  setValue: number => void,
  value: ?Date,
}

function Calendar({
  renderDate, setValue, value,
}: Props) {
  const [months, setMonths] = useState(() => getMonthCount(Dimensions.get('screen'), value));
  const [view, setView] = useState('D');
  /*
    D = day
    M = Month
    Y = Year
  */

  const handleLayout = useCallback((e) => {
    const { layout } = e.nativeEvent;
    setMonths(mnths => getMonthCount(layout, mnths));
  }, [setMonths]);


  const shift = useCallback((v, val) => {
    setMonths(mnths => mnths.map(d => new Date(
      v === 'D' ? d.getFullYear() : d.getFullYear() + val,
      v === 'D' ? d.getMonth() + val : d.getMonth(),
      1
    )));
  }, [setMonths]);

  const selectDate = useCallback((d, long) => {
    setValue((prev) => {
      if (Array.isArray(prev)) {
        // called if clearSelect is pressed
        if (!d) {
          return null;
        }
        // logic to remove the date if already Selected
        const isAlreadySelected = prev.filter(dates => dates.toDateString() === d.toDateString());
        return isAlreadySelected.length > 0
          ? [...prev.filter(dates => dates.toDateString() !== d.toDateString())]
          : [...prev, d];
      }
      if (long) {
        return prev ? [prev, d] : [d];
      }
      return d;
    });
  }, [setValue]);

  const setCalendarView = useCallback((v, val) => {
    setView(v);
    setMonths((mnths) => {
      if (val) {
        if (v === 'D') {
          return mnths.map((m, idx) => new Date(m.getFullYear(), val + idx, 1));
        }
        return mnths.map((m, idx) => new Date(val + idx, m.getMonth(), 1));
      }
      if (v === 'M') {
        return mnths.map((m, idx) => new Date(m.getFullYear() + idx, m.getMonth(), 1));
      }
      return mnths.map((m, idx) => new Date(m.getFullYear() + idx * YEARS_DIFF, m.getMonth(), 1));
    });
  }, [setView, setMonths]);


  const first = 0;
  const last = months.length - 1;
  return (
    <View style={styles.container} onLayout={handleLayout}>
      {months.map((month, idx) => (
        <View key={month} style={{ flex: 1, padding: 5 }}>
          <Header
            idx={idx}
            date={month}
            prevMonth={(idx === first || months.length === 1)}
            nextMonth={(idx === last || months.length === 1)}
            shift={shift}
            multiple={Array.isArray(value)}
            clearSelection={selectDate}
            view={view}
            setView={setCalendarView}
          />
          <Month
            date={month}
            value={value}
            renderDate={renderDate}
            selectDate={selectDate}
            view={view}
            setView={setCalendarView}
          />
        </View>
      ))}
    </View>
  );
}


export default Calendar;
