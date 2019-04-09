// @flow
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Header from './Header';
import Month from './Month';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});

function getMonthCount({ width }, date) {
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
    // setMonths(getMonthCount(e.nativeEvent.layout, new Date()));
  }, [setMonths]);

  const prevMonth = useCallback(() => {
    setMonths(mnths => mnths.map(d => new Date(d.getFullYear(), d.getMonth() - 1, 1)));
  }, [setMonths]);

  const nextMonth = useCallback(() => {
    setMonths(mnths => mnths.map(d => new Date(d.getFullYear(), d.getMonth() + 1, 1)));
  }, [setMonths]);

  const selecteDate = useCallback((d, long) => {
    setValue((prev) => {
      if (Array.isArray(prev)) {
        return [...prev, d];
      }
      if (long) {
        return [prev, d];
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
            prevMonth={(idx === first || months.length === 1) && prevMonth}
            nextMonth={(idx === last || months.length === 1) && nextMonth}
            multiple={false}
          />
          <Month
            date={month}
            value={value}
            renderDate={renderDate}
            selectDate={selecteDate}
          />
        </View>
      ))}
    </View>
  );
}


export default Calendar;
