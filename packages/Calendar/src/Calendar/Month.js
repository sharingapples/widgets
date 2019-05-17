// @flow
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Week from './Week';
import MonthSelection from '../MonthSelection';
import YearSelection from '../YearSelection';
import { WEEK_DAYS } from '../common/util';
import { textColor } from '../theme';

type Props = {
  date: Date,
  setView: React.Node => void,
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
});

const NUM_OF_WEEKS = 6;
const WEEK_DIFF = 7 * 86400 * 1000;

function getStartOfMonth(date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  return first.getTime() - first.getDay() * 86400 * 1000;
}

function Month({ date, setView, ...other }: Props) {
  const start = getStartOfMonth(date);
  const dateString = date.toString();
  const month = dateString.substr(4, 3);
  const year = dateString.substr(11, 4);
  const weeks = new Array(NUM_OF_WEEKS).fill(null).map((c, i) => start + i * WEEK_DIFF);
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

      {weeks.map(week => (
        <Week
          key={week}
          startOfWeek={week}
          month={date.getMonth()}
          {...other}
        />
      ))}
    </>
  );
}

export default Month;
