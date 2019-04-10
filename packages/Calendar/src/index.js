// @flow
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { getTheme } from '@sharingapples/theme';
import Header from './Header';
import Month from './Month';

const theme = getTheme();
const calendarTheme = theme.onCalendar || theme;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: calendarTheme.background,
  },
});

function getMonthCount({ width }, value) {
  const date = Array.isArray(value) ? value[0] : value;
  return width > 400
    ? [date, new Date(date.getFullYear(), date.getMonth() + 1)] : [date];
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

  const handleLayout = useCallback((e) => {
    setMonths(mnths => getMonthCount(e.nativeEvent.layout, mnths));
  }, [setMonths]);


  const shiftMonth = useCallback((shift) => {
    setMonths(mnths => mnths.map(d => new Date(d.getFullYear(), d.getMonth() + shift, 1)));
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


  const first = 0;
  const last = months.length - 1;

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {months.map((month, idx) => (
        <View key={month} style={{ flex: 1, padding: 5 }}>
          <Header
            date={month}
            prevMonth={(idx === first || months.length === 1)}
            nextMonth={(idx === last || months.length === 1)}
            shiftMonth={shiftMonth}
            multiple={Array.isArray(value)}
            clearSelection={selectDate}
          />
          <Month
            date={month}
            value={value}
            renderDate={renderDate}
            selectDate={selectDate}
          />
        </View>
      ))}
    </View>
  );
}


export default Calendar;
