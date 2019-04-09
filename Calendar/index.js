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
    ? [date, new Date(date.getFullYear(), date.getMonth() + 1)] : [date];
}

type Props = {
  renderDate: (date: Date) => React.Node,
  onChange: number => void,
  value: ?Date,
}

function Calendar({
  renderDate, onChange, value = new Date(),
}: Props) {
  const [months, setMonths] = useState(() => getMonthCount(Dimensions.get('screen'), new Date()));
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
    setMonths(getMonthCount(e.nativeEvent.layout, new Date()));
  }, [setMonths]);

  const prevMonth = useCallback(() => {
    setMonths(mnths => mnths.map(d => new Date(d.getFullYear(), d.getMonth() - 1, 1)));
  }, [setMonths]);

  const nextMonth = useCallback(() => {
    setMonths(mnths => mnths.map(d => new Date(d.getFullYear(), d.getMonth() + 1, 1)));
  }, [setMonths]);


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
            date={month}
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
