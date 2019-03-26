// @flow
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { left, right } from '@app/assets/icons';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 5,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
  },
  dayContainer: {
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: 'grey',
    paddingBottom: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
});

type Props = {
  date: {},
  prevMonth: string => void,
  nextMonth: string => void,
}

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Header({ date, prevMonth, nextMonth }: Props) {
  const month = date.toLocaleString('en-us', { month: 'long' });
  const year = date.getFullYear();
  return (
    <>
      <View style={styles.container}>
        <Text allowFontScaling={false} style={styles.text}>{month} {year}</Text>
        {prevMonth && (
          <TouchableOpacity
            onPress={prevMonth}
            style={styles.left}
          >
            <Image source={left} />
          </TouchableOpacity>
        )}

        {nextMonth && (
          <TouchableOpacity
            onPress={nextMonth}
            style={styles.right}
          >
            <Image source={right} />
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

export default Header;
