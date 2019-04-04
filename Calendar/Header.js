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
        <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
          <Text allowFontScaling={false}>{month} {year}</Text>
          {multiple && (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => removeMulitpleSelect(false)}
            >
              <Text allowFontScaling={false} style={{ color: 'blue' }}>Clear Selection</Text>
            </TouchableOpacity>
          )}
        </View>
        {prevMonth && (
          <TouchableOpacity onPress={prevMonth} style={styles.left}>
            <Image source={left} style={{ height: 16, width: 16 }} />
          </TouchableOpacity>
        )}

        {nextMonth && (
          <TouchableOpacity onPress={nextMonth} style={styles.right}>
            <Image source={right} style={{ height: 16, width: 16 }} />
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
