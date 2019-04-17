// @flow
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { textColor, backgroundColor, primaryFontColor, primaryColor, disabledFontColor } from '../theme';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderWidth: StyleSheet.hairlineWidth,
    margin: -StyleSheet.hairlineWidth,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
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
  text: {
    fontSize: 14,
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
      style={[styles.container, borderStyle]}
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
        styles.textContainer, { backgroundColor: isToday ? primaryColor : backgroundColor },
      ]}
      >
        <Text
          allowFontScaling={false}
          style={[styles.text, {
            color: isToday ? primaryFontColor : getFontColor(isCurrentMonth),
          }]}
        >
          {dateObj.getDate()}
        </Text>
      </View>
      {renderDate && renderDate(dateObj)}
    </TouchableOpacity>
  );
}

export default React.memo(Day);
