// @flow
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import right from './right.png';
import left from './left.png';

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
    color: 'black',
  },
  clearTextContainer: {
    marginLeft: 15,
  },
  clearText: {
    fontSize: 14,
    color: 'blue',
  },
  dayContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    borderBottomColor: 'grey',
    paddingBottom: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
  },
  dayText: {
    flex: 1,
    fontSize: 12,
    color: 'grey',
    textAlign: 'center',
  },
  left: {
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    left: 0,
  },
  right: {
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    right: 0,
  },
  icon: {
    height: 16,
    width: 16,
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
  const month = date.toLocaleString('en-us', { month: 'long' });
  const year = date.getFullYear();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={styles.dateText}>{month} {year}</Text>
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
          <TouchableOpacity onPress={prevMonth} style={styles.left}>
            <Image source={left} style={styles.icon} />
          </TouchableOpacity>
        )}

        {nextMonth && (
          <TouchableOpacity onPress={nextMonth} style={styles.right}>
            <Image source={right} style={styles.icon} />
          </TouchableOpacity>
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
