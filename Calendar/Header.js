// @flow
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { left, right } from '@app/assets/icons';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 5,
    width: '100%',
  },
  text: {
    fontSize: 16,
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
});

type Props = {
  date: {},
  prevMonth: string => void,
  nextMonth: string => void,
  leftArrow: boolean,
  rightArrow: boolean,
}

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Header({ date, leftArrow, rightArrow, prevMonth, nextMonth }: Props) {
  const month = date.toLocaleString('en-us', { month: 'long' });
  const year = date.getFullYear();
  return (
    <>
      <View style={styles.container}>
        {leftArrow ? <View />
          : (
            <TouchableOpacity
              onPress={prevMonth}
            >
              <Image source={left} />
            </TouchableOpacity>
          )
      }

        <Text allowFontScaling={false} style={styles.text}>{month} {year}</Text>
        {rightArrow ? <View />
          : (
            <TouchableOpacity
              onPress={nextMonth}
            >
              <Image source={right} />
            </TouchableOpacity>
          )
      }
      </View>
      <View style={styles.dayContainer}>
        {WEEK_DAYS.map(d => (
          <Text allowFontScaling={false} style={styles.dayText} key={d}>{d}</Text>))}
      </View>
    </>
  );
}

export default Header;
