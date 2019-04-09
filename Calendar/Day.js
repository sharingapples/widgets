// @flow
import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getTheme } from '@sharingapples/theme';

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

const theme = getTheme();

type Props = {
  date: Date,
  currentMonth: number,
  renderDate: (date: Date) => React.Node,
  onChange: (date: Date) => void,
  selectDate: (date: Date) => void,
  borderStyle: {},
}

function getFontColor(isCurrentMonth) {
  return isCurrentMonth ? theme.colorOnDefault : theme.colorOnDisabled;
}

function Day({
  date,
  currentMonth,
  renderDate,
  onChange,
  borderStyle,
  selectDate,
}: Props) {
  const dateObj = new Date(date);
  const isCurrentMonth = currentMonth === dateObj.getMonth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isToday = date === today.getTime();
  const renderCount = useRef(0);

  renderCount.current += 1;

  return (
    <TouchableOpacity
      style={[styles.container, borderStyle || { borderColor: 'transparent' }]}
      onLongPress={() => {
        // stack this to selected date
        selectDate(date, true);
      }}
      onPress={() => {
        // override array of selected dates and just add this date
        selectDate(date, false);
        if (onChange) {
          onChange(date);
        }
      }}
    >

      <View style={[styles.textContainer, { backgroundColor: isToday ? theme.primary : 'white' }]}>
        <Text
          allowFontScaling={false}
          style={{
            color: isToday ? theme.onPrimary : getFontColor(isCurrentMonth),
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
