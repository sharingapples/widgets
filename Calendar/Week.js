// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Day from './Day';
import { getDateBorderStyle, DAY_DIFF } from './util';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

type Props = {
  startOfWeek: string,
  month: number,
  onSelect: (date: Date) => void,
  selectedDates: { },
}

const days = [0, 1, 2, 3, 4, 5, 6];

function Week({ startOfWeek, month, selectedDates, ...other }: Props) {
  return (
    <View style={styles.container}>
      {days.map((i) => {
        const date = startOfWeek + i * DAY_DIFF;
        const borderStyle = getDateBorderStyle(date, selectedDates, month);
        return (
          <Day
            key={i}
            date={date}
            borderStyle={borderStyle}
            currentMonth={month}
            {...other}
          />
        );
      })}
    </View>
  );
}

export default Week;
