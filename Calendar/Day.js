// @flow
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

type Props = {
  date: Date,
  currentMonth: number,
  renderDate: React.Node,
  onSelect: () => void,
}

function Day({ date, currentMonth, renderDate, onSelect }: Props) {
  const dateObj = new Date(date);
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
        style={{ color: currentMonth === dateObj.getMonth() ? 'black' : 'grey' }}
      >
        {dateObj.getDate()}
      </Text>
      {renderDate && renderDate(date)}
    </TouchableOpacity>
  );
}

export default Day;
