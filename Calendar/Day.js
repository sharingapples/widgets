// @flow
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});

type Props = {
  date: Date,
  currentMonth: number,
  renderDate: (date: Date) => React.Node,
  onSelect: (date: Date) => void,
  selectedDate: Date,
}

function Day({ date, currentMonth, renderDate, onSelect, selectedDate }: Props) {
  const dateObj = new Date(date);
  const isSelected = selectedDate.getMonth() === dateObj.getMonth()
    && selectedDate.getDate() === dateObj.getDate();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (onSelect) {
          onSelect(date);
        }
      }}
    >
      <Text
        allowFontScaling={false}
        style={{
          color: currentMonth === dateObj.getMonth() ? 'black' : 'grey',
        }}
      >
        {dateObj.getDate()}
      </Text>
      {renderDate && renderDate(date)}
    </TouchableOpacity>
  );
}

export default Day;
