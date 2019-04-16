// @flow
import React, { useContext, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { getTheme } from '@sharingapples/theme';
import Header from './Header';
import Month from './Month';
import { getMonthCount } from '../common/util';
import CalendarContext from '../common/CalendarContext';

const theme = getTheme();
const calendarTheme = theme.onCalendar || theme;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: calendarTheme.background,
  },
});

type Props = {
  renderDate: (date: Date) => React.Node,
  setValue: number => void,
  value: ?Date,
  setView: React.Node => void,
}

function Calendar({
  renderDate, setValue, value, setView,
}: Props) {
  const [months, setMonths] = useContext(CalendarContext);
  const handleLayout = useCallback((e) => {
    const { layout } = e.nativeEvent;
    setMonths(mnths => getMonthCount(layout, mnths));
  }, [setMonths]);


  const shift = useCallback((val) => {
    setMonths(mnths => mnths.map(d => new Date(
      d.getFullYear(),
      d.getMonth() + val,
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
            setView={setView}
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
