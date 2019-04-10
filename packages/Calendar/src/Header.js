// @flow
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { getTheme } from '@sharingapples/theme';
import right from './assets/right.png';
import left from './assets/left.png';

const theme = getTheme();
const calendarTheme = theme.onCalendar || theme;
const textColor = calendarTheme.onBackground;
const primaryColor = calendarTheme.primary;


const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 5,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: textColor,
    fontWeight: 'bold',
  },
  clearTextContainer: {
    marginLeft: 15,
  },
  clearText: {
    fontSize: 14,
    color: primaryColor,
  },
  dayContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 3,
    borderBottomColor: theme.colorDisabled,
    paddingBottom: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
  },
  dayText: {
    flex: 1,
    fontSize: 12,
    color: textColor,
    textAlign: 'center',
  },
  left: {
    position: 'absolute',
    left: 0,
  },
  right: {
    position: 'absolute',
    right: 0,
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10,
    tintColor: textColor,
  },
});

type Props = {
  date: {},
  prevMonth: boolean,
  nextMonth: boolean,
  multiple: boolean,
  clearSelection: boolean => void,
  shiftMonth: number => void,
}

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Header({ date, prevMonth, nextMonth, multiple, shiftMonth, clearSelection }: Props) {
  const dateString = date.toString();
  const month = dateString.substr(4, 3);
  const year = dateString.substr(11, 4);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={styles.dateText}>
            {month} {year}
          </Text>
          {multiple && (
            <TouchableOpacity
              style={styles.clearTextContainer}
              onPress={() => clearSelection(null)}
            >
              <Text allowFontScaling={false} style={styles.clearText}>Clear Selection</Text>
            </TouchableOpacity>
          )}
        </View>
        {prevMonth && (
          <View style={styles.left}>
            <TouchableWithoutFeedback onPress={() => shiftMonth(-1)}>
              <Image source={left} style={styles.icon} />
            </TouchableWithoutFeedback>
          </View>
        )}

        {nextMonth && (
          <View style={styles.right}>
            <TouchableWithoutFeedback onPress={() => shiftMonth(1)}>
              <Image source={right} style={styles.icon} />
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
      <View style={styles.dayContainer}>
        {WEEK_DAYS.map(d => (
          <Text allowFontScaling={false} style={styles.dayText} key={d}>{d}</Text>))}
      </View>
    </>
  );
}

export default React.memo(Header);
