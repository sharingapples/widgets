// @flow
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    padding: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type Props = {
  date: Date,
  currentMonth: number,
  renderDate: (date: Date) => React.Node,
  onChange: (date: Date) => void,
  value: Date,
  disabledColor: string,
  selectedColor: { text: string, back: string} | string,
  todayColor: { text: string, back: string} | string,
}

function getFontColor(isCurrentMonth, isSelected, disabledColor, selectedColor) {
  if (isSelected) {
    return selectedColor instanceof Object ? selectedColor.text : 'white';
  }
  return isCurrentMonth ? 'black' : disabledColor || 'grey';
}

function getBackgroundColor(colorObject, defaultColor) {
  if (!colorObject) {
    return defaultColor;
  }

  if (colorObject instanceof Object) {
    return colorObject.back || defaultColor;
  }

  return colorObject;
}

function Day({
  date, currentMonth, renderDate, onChange, value, disabledColor, selectedColor, todayColor,
}: Props) {
  const dateObj = new Date(date);
  const isSelected = value.getMonth() === dateObj.getMonth()
    && value.getDate() === dateObj.getDate() && value.getFullYear() === dateObj.getFullYear();
  const isCurrentMonth = currentMonth === dateObj.getMonth();
  const today = new Date();
  const isToday = today.getMonth() === dateObj.getMonth()
  && today.getDate() === dateObj.getDate() && today.getFullYear() === dateObj.getFullYear();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: isSelected ? getBackgroundColor(selectedColor, 'white') : 'white' }]}
      onPress={() => {
        if (onChange) {
          onChange(date);
        }
      }}
    >
      <View style={[styles.textContainer, { backgroundColor: isToday ? getBackgroundColor(todayColor, 'blue') : 'white' }]}>
        <Text
          allowFontScaling={false}
          style={{
            color: getFontColor(isCurrentMonth, isSelected, disabledColor, selectedColor),
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

export default Day;
