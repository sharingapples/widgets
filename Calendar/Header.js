// @flow
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { getTheme } from 'std-theme';
import right from './right.png';
import left from './left.png';

const theme = getTheme();

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
    color: theme.colorOnDefault,
    fontWeight: 'bold',
  },
  clearTextContainer: {
    marginLeft: 15,
  },
  clearText: {
    fontSize: 14,
    color: theme.colorPrimary,
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
    color: theme.colorOnDisabled,
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
    height: 16,
    width: 16,
    paddingLeft: 10,
    paddingRight: 10,
    tintColor: theme.colorOnDefault,
  },
});

type Props = {
  date: {},
  prevMonth: string => void,
  nextMonth: string => void,
  multiple: boolean,
  removeMulitpleSelect: boolean => void,
}

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Header({ date, prevMonth, nextMonth, multiple, removeMulitpleSelect }: Props) {
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
              onPress={() => removeMulitpleSelect(false)}
            >
              <Text allowFontScaling={false} style={styles.clearText}>Clear Selection</Text>
            </TouchableOpacity>
          )}
        </View>
        {prevMonth && (
          <View style={styles.left}>
            <TouchableWithoutFeedback onPress={prevMonth}>
              <Image source={left} style={styles.icon} />
            </TouchableWithoutFeedback>
          </View>
        )}

        {nextMonth && (
          <View style={styles.right}>
            <TouchableWithoutFeedback onPress={nextMonth}>
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
