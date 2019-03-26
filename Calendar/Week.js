// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Day from './Day';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

type Props = {
  startOfWeek: string,
  month: number,
  onSelect: (date: Date) => void,
  selectedDate: Date,
  showDate: string,
}

const days = [0, 1, 2, 3, 4, 5, 6];

function Week({ startOfWeek, month, onSelect, selectedDate, showDate }: Props) {
  return (
    <View style={styles.container}>
      {days.map(i => (
        <Day
          key={i}
          date={startOfWeek + i * 86400 * 1000}
          currentMonth={month}
          onSelect={onSelect}
          selectedDate={selectedDate}
          showDate={showDate}
        />
      ))}
    </View>
  );
}

export default Week;
