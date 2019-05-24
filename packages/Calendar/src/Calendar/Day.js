// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { textColor, backgroundColor, primaryFontColor, primaryColor, disabledFontColor } from '../theme';
import { getDateBorderStyle } from '../util';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 3,
    width: `${100 / 7}%`,
    paddingVertical: 3,
    borderWidth: StyleSheet.hairlineWidth,
    margin: -StyleSheet.hairlineWidth,
    // because of inconsistency in android for border each has to be defined
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
  renderDate: (date: Date) => React.Node,
  borderStyle: {},
  value: Date | Array<Date>,
  month: number,
}

function getFontColor(isCurrentMonth) {
  return isCurrentMonth ? textColor : disabledFontColor;
}

function Day({
  date,
  value,
  renderDate,
  month,
}: Props) {
  const dateObj = new Date(date);
  const borderStyle = getDateBorderStyle(dateObj, value);
  const isToday = new Date() === dateObj.toDateString();
  const isCurrentMonth = dateObj.getMonth() === month;

  return (
    <View style={borderStyle}>
      <View
        style={[styles.textContainer, {
          backgroundColor: isToday ? primaryColor : backgroundColor,
        }]}
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
    </View>
  );
}

export default React.memo(Day);
