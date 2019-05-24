// @flow
import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native';
import Day from './Day';
import MonthSelection from '../MonthSelection';
import YearSelection from '../YearSelection';
import { WEEK_DAYS, DAY_DIFF, SEVEN_DAYS } from '../util';
import { textColor } from '../theme';
// import console = require('console');

type Props = {
  start: number,
  setView: React.Node => void,
  selectDate: (Date, boolean) => void,
  month: number,
}


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  dateText: {
    fontSize: 14,
    color: textColor,
  },
  nav: {
    paddingHorizontal: 5,
  },
  navText: {
    fontSize: 14,
    color: textColor,
  },
  daysContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
    paddingVertical: 5,
    marginBottom: 5,
    borderBottomColor: textColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  day: {
    flex: 1,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    color: textColor,
  },
  dateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
});

const NUM_OF_WEEKS = 6;

function Month({ start, setView, date, selectDate, ...other }: Props) {
  const ref = useRef();
  const [dimension, setDimension] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const dateString = date.toString();
  const month = dateString.substr(4, 3);
  const year = dateString.substr(11, 4);
  const days = new Array(NUM_OF_WEEKS * SEVEN_DAYS).fill(null).map((c, i) => start + i * DAY_DIFF);
  const handlePress = (e, long) => {
    const x = e.nativeEvent.pageX;
    const y = e.nativeEvent.pageY;
    const index = Math.floor((x - dimension.x) / dimension.width)
    + Math.floor((y - dimension.y) / dimension.height) * SEVEN_DAYS;
    const selectedDate = start + index * DAY_DIFF;
    selectDate(new Date(selectedDate), long);
  };


  return (
    <>
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setView(() => MonthSelection)}
            style={styles.nav}
          >
            <Text style={styles.navText} allowFontScaling={false}>{month}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setView(() => YearSelection)}
            style={styles.nav}
          >
            <Text style={styles.navText} allowFontScaling={false}>{year}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.daysContainer}>
          {WEEK_DAYS.map(d => (
            <View key={d} style={styles.day}>
              <Text allowFontScaling={false} style={styles.dayText}>{d}</Text>
            </View>
          ))}
        </View>
      </View>

      <View
        ref={ref}
        onLayout={() => {
          if (ref.current.measure) {
            ref.current.measure((x, y, width, height, pageX, pageY) => {
              setDimension({
                width: width / SEVEN_DAYS,
                height: height / NUM_OF_WEEKS,
                x: 5,
                y: pageY,
              });
            });
          }
        }}
      >
        <TouchableWithoutFeedback
          onPress={e => handlePress(e)}
          onLongPress={e => handlePress(e, true)}
        >
          <View style={styles.dateContainer}>
            {days.map(day => (
              <Day
                key={day}
                date={day}
                month={month}
                {...other}
              />
            ))}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

export default React.memo(Month);
