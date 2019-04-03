// @flow
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getFullDate } from './util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    margin: -1,
    borderColor: 'transparent',
  },
  textContainer: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
});

type Props = {
  date: Date,
  currentMonth: number,
  renderDate: (date: Date) => React.Node,
  onChange: (date: Date) => void,
  setSelectedDates: (date: Date) => void,
  addSelectedDates: (date: Date) => void,
  borderStyle: {},
}

function getFontColor(isCurrentMonth) {
  return isCurrentMonth ? 'black' : 'grey';
}

function Day({
  date,
  currentMonth,
  renderDate,
  onChange,
  borderStyle,
  setSelectedDates,
  addSelectedDates,
}: Props) {
  const dateObj = new Date(date);
  const isCurrentMonth = currentMonth === dateObj.getMonth();
  const isToday = getFullDate(new Date()) === getFullDate(dateObj);
  return (
    <TouchableOpacity
      style={[styles.container, borderStyle]}
      onLongPress={() => {
        // stack this to selected date
        addSelectedDates(date);
      }}
      onPress={() => {
        // override array of selected dates and just add this date
        setSelectedDates({ [date]: {} });
        if (onChange) {
          onChange(date);
        }
      }}
    >

      <View style={[styles.textContainer, { backgroundColor: isToday ? 'blue' : 'white' }]}>
        <Text
          allowFontScaling={false}
          style={{
            color: isToday ? 'white' : getFontColor(isCurrentMonth),
            fontSize: 14,
          }}
        >
          {dateObj.getDate()}
        </Text>
      </View>
      {renderDate && renderDate(date)}
    </TouchableOpacity>
  );
}

export default React.memo(Day);
