// @flow
import React, { useContext, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getTheme } from '@sharingapples/theme';
import Month from './Month';

import Header from '../common/Header';
import { getMonthCount, WEEK_DAYS } from '../common/util';
import CalendarContext from '../common/CalendarContext';

import MonthView from '../MonthView';
import YearView from '../YearView';

const theme = getTheme();
const calendarTheme = theme.onCalendar || theme;
const textColor = calendarTheme.onBackground;
const primaryColor = calendarTheme.primary;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: calendarTheme.background,
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
    marginBottom: 5,
  },
  dayText: {
    flex: 1,
    fontSize: 12,
    color: textColor,
    textAlign: 'center',
  },
});

type Props = {
  renderDate: (date: Date) => React.Node,
  setValue: number => void,
  value: ?Date,
  setView: React.Node => void,
}


function renderHeaderTitle(date, setView, multiple, clearSelection) {
  const dateString = date.toString();
  const month = dateString.substr(4, 3);
  const year = dateString.substr(11, 4);
  return (
    <>
      <TouchableOpacity
        style={{ paddingHorizontal: 5 }}
        onPress={() => setView(() => MonthView)}
      >
        <Text allowFontScaling={false} style={styles.dateText}>
          {month}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingHorizontal: 5 }}
        onPress={() => setView(() => YearView)}
      >
        <Text allowFontScaling={false} style={styles.dateText}>
          {year}
        </Text>
      </TouchableOpacity>
      {multiple && (
        <TouchableOpacity
          style={styles.clearTextContainer}
          onPress={() => clearSelection(null)}
        >
          <Text allowFontScaling={false} style={styles.clearText}>Clear Selection</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

function renderHeaderContents() {
  return (
    <View style={styles.dayContainer}>
      {WEEK_DAYS.map(d => (
        <Text allowFontScaling={false} style={styles.dayText} key={d}>{d}</Text>))}
    </View>
  );
}

function DayView({
  renderDate, setValue, value, setView,
}: Props) {
  const [months, setMonths] = useContext(CalendarContext);
  const handleLayout = useCallback((e) => {
    const { layout } = e.nativeEvent;
    setMonths(mnths => getMonthCount(layout, mnths));
  }, []);


  const shift = useCallback((val) => {
    setMonths(mnths => mnths.map(d => new Date(
      d.getFullYear(),
      d.getMonth() + val,
      1
    )));
  }, []);

  const selectDate = useCallback((d, long) => {
    setValue((prev) => {
      if (Array.isArray(prev)) {
        // called if clearSelect is pressed
        if (!d) {
          return null;
        }
        // logic to remove the date if already Selected
        const isAlreadySelected = prev.filter(dates => dates.toDateString() === d.toDateString());
        return isAlreadySelected.length > 0
          ? [...prev.filter(dates => dates.toDateString() !== d.toDateString())]
          : [...prev, d];
      }
      if (long) {
        return prev ? [prev, d] : [d];
      }
      return d;
    });
  }, []);

  const first = 0;
  const last = months.length - 1;
  return (
    <View style={styles.container} onLayout={handleLayout}>
      {months.map((month, idx) => (
        <View key={month} style={{ flex: 1, padding: 5 }}>
          <Header
            idx={idx}
            date={month}
            shift={shift}
            prev={(idx === first || months.length === 1)}
            next={(idx === last || months.length === 1)}
            headerTitle={renderHeaderTitle(month, setView, Array.isArray(value), selectDate)}
            headerContents={renderHeaderContents()}
          />
          <Month
            date={month}
            value={value}
            renderDate={renderDate}
            selectDate={selectDate}
          />
        </View>
      ))}
    </View>
  );
}


export default DayView;
