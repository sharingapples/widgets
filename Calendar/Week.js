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
  value: Date | Array<Date>,
}

const days = [0, 1, 2, 3, 4, 5, 6];

function Week({ startOfWeek, month, value, ...other }: Props) {
  return (
    <View style={styles.container}>
      {days.map((i) => {
        const borderStyle = getDateBorderStyle(new Date(startOfWeek + i * DAY_DIFF), value);
        return (
          <Day
            key={i}
            date={startOfWeek + i * DAY_DIFF}
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
