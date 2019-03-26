// @flow
import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Header from './Header';
import Month from './Month';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  onSelect: number => void,
  selectedDate: ?Date,
}

function Calendar({ renderDate, onSelect, selectedDate = new Date() }: Props) {
  const [date, setDate] = useState(() => new Date());
  const [months, setMonths] = useState(() => getMonthCount(Dimensions.get('screen'), date));

  const handleLayout = useCallback((e) => {
    setMonths(getMonthCount(e.nativeEvent.layout, date));
  }, [setMonths]);

  const prevMonth = useCallback(() => {
    setDate(d => new Date(d.getFullYear(), d.getMonth() - months.length, 1));
  }, [setDate]);

  const nextMonth = useCallback(() => {
    setDate(d => new Date(d.getFullYear(), d.getMonth() + months.length, 1));
  }, [setDate]);

  useEffect(() => {
    setMonths(() => getMonthCount(Dimensions.get('screen'), date));
  }, [date]);

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
          />
          <Month
            start={getStartOfMonth(month)}
            month={month.getMonth()}
            onSelect={onSelect}
            renderDate={renderDate}
            selectedDate={selectedDate}
          />
        </View>
      ))}
    </View>
  );
}


export default Calendar;
