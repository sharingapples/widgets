// @flow
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Header from './Header';
import Month from './Month';
import { isDate, getUnixTimeStamp } from './util';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});

function getMonthCount({ width }, date) {
  return width > 400
    ? [new Date(date), new Date(date.getFullYear(), date.getMonth() + 1)] : [new Date(date)];
}

function getStartOfMonth(date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  return first.getTime() - new Date(first).getDay() * 86400 * 1000;
}

type Props = {
  renderDate: (date: Date) => React.Node,
  onChange: number => void,
  value: ?Date,
  theme: string,
}

function Calendar({
  renderDate, onChange, value = new Date(), theme = 'light',
}: Props) {
  const [date, setDate] = useState(value);
  const [months, setMonths] = useState(() => getMonthCount(Dimensions.get('screen'), date));
  const [selection, setSelection] = useState(new Date());

  const selectDate = useCallback((d, long) => {
    setSelection((prev) => {
      if (!isDate(prev)) {
        return { ...prev, [d]: true };
      }
      if (long) {
        return { [getUnixTimeStamp(prev)]: {}, [d]: {} };
      }
      return new Date(d);
    });
  }, [setSelection]);

  const removeMulitpleSelect = useCallback(() => {
    setSelection(prev => new Date(parseInt(Object.keys(prev).pop(), 10)));
  }, [setSelection]);

  const handleLayout = useCallback((e) => {
    setMonths(getMonthCount(e.nativeEvent.layout, date));
  }, [setMonths]);

  const prevMonth = useCallback(() => {
    setDate(d => new Date(d.getFullYear(), d.getMonth() - months.length, 1));
    setMonths(mnths => mnths.map(d => new Date(d.getFullYear(), d.getMonth() - months.length, 1)));
  }, [setDate]);

  const nextMonth = useCallback(() => {
    setDate(d => new Date(d.getFullYear(), d.getMonth() + months.length, 1));
    setMonths(mnths => mnths.map(d => new Date(d.getFullYear(), d.getMonth() + months.length, 1)));
  }, [setDate]);


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
            multiple={!isDate(selection)}
            removeMulitpleSelect={removeMulitpleSelect}
          />
          <Month
            start={getStartOfMonth(month)}
            month={month.getMonth()}
            onChange={onChange}
            value={value}
            renderDate={renderDate}
            selectDate={selectDate}
            selection={selection}
          />
        </View>
      ))}
    </View>
  );
}


export default Calendar;
