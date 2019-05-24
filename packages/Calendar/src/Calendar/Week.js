// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Day from './Day';
import { getDateBorderStyle, DAY_DIFF } from '../common/util';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

type Props = {
  startOfWeek: string,
  month: number,
  onSelect: (date: Date) => void,
  value: Date | Array<Date>,
}

const days = [0, 1, 2, 3, 4, 5, 6];

function Week({ startOfWeek, month, value, ...other }: Props) {
  return (
    <View style={styles.container}>
      {days.map((i) => {
        const borderStyle = getDateBorderStyle(new Date(startOfWeek + i * DAY_DIFF), value);
        const date = startOfWeek + i * DAY_DIFF;
        const isCurrentMonth = new Date(date).getMonth() === month;
        const isToday = new Date().toDateString() === new Date(date).toDateString();
        return (
          <Day
            key={i}
            date={date}
            borderStyle={borderStyle}
            currentMonth={month}
            isCurrentMonth={isCurrentMonth}
            isToday={isToday}
            {...other}
          />
        );
      })}
    </View>
  );
}

export default Week;
