// @flow
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getTheme } from '@sharingapples/theme';

const theme = getTheme();
const calendarTheme = theme.onCalendar || theme;
const textColor = calendarTheme.onBackground;
const backgroundColor = calendarTheme.background;
const primaryFontColor = theme.onPrimary;
const disabledFontColor = theme.disabled;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    margin: -1,
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
  selectDate: (date: Date) => void,
  borderStyle: {},
}

function getFontColor(isCurrentMonth) {
  return isCurrentMonth ? textColor : disabledFontColor;
}

function Day({
  date,
  currentMonth,
  renderDate,
  borderStyle,
  selectDate,
}: Props) {
  const dateObj = new Date(date);
  const isCurrentMonth = currentMonth === dateObj.getMonth();
  const isToday = dateObj.toDateString() === new Date().toDateString();

  return (
    <TouchableOpacity
      style={[styles.container, borderStyle || { borderColor: 'transparent' }]}
      onLongPress={() => {
        // stack this to selected date
        selectDate(dateObj, true);
      }}
      onPress={() => {
        // override array of selected dates and just add this date
        selectDate(dateObj, false);
      }}
    >

      <View style={[
        styles.textContainer, { backgroundColor: isToday ? theme.primary : backgroundColor },
      ]}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: isToday ? primaryFontColor : getFontColor(isCurrentMonth),
            fontSize: 14,
          }}
        >
          {dateObj.getDate()}
        </Text>
      </View>
      {renderDate && renderDate(dateObj)}
    </TouchableOpacity>
  );
}

export default React.memo(Day);
