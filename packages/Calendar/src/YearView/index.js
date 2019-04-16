// @flow
import React, { useCallback, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getTheme } from '@sharingapples/theme';

import Header from '../common/Header';
import { getMonthCount, generateYears, YEARS_DIFF } from '../common/util';
import CalendarContext from '../common/CalendarContext';
import MonthView from '../MonthView';


const theme = getTheme();
const calendarTheme = theme.onCalendar || theme;
const textColor = calendarTheme.onBackground;

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
});

function renderHeaderTitle() {
  return (
    <>
      <View style={{ paddingHorizontal: 5 }}>
        <Text allowFontScaling={false} style={styles.dateText}>
          Years
        </Text>
      </View>
    </>
  );
}


function renderAllYears(yearStart, selectYear) {
  const generatedYears = generateYears(yearStart);
  const years = [];
  for (let i = 0; i < 5; i += 1) {
    const row = [0, 1, 2, 3].map((y) => {
      const year = generatedYears[y + 4 * i];
      return (
        <TouchableOpacity
          key={y}
          style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}
          onPress={() => selectYear(year)}
        >
          <Text>{year}</Text>
        </TouchableOpacity>
      );
    });
    years.push(<View key={i} style={{ flexDirection: 'row' }}>{row}</View>);
  }
  return years;
}

type Props = {
  setView: React.Node => void,
}

function YearView({ setView }: Props) {
  const [months, setMonths] = useContext(CalendarContext);
  const handleLayout = useCallback((e) => {
    const { layout } = e.nativeEvent;
    setMonths(mnths => getMonthCount(layout, mnths));
  }, [setMonths]);

  const shift = useCallback((val) => {
    setMonths(mnths => mnths.map(d => new Date(
      d.getFullYear() + val,
      d.getMonth(),
      1
    )));
  }, [setMonths]);

  const selectYear = useCallback((year) => {
    setMonths(mnths => mnths.map((d, idx) => new Date(year + idx, d.getMonth(), 1)));
    setView(() => MonthView);
  }, [setMonths, setView]);

  const first = 0;
  const last = months.length - 1;
  return (
    <View style={styles.container} onLayout={handleLayout}>
      {months.map((month, idx) => (
        <View key={month} style={{ flex: 1, padding: 5 }}>
          <Header
            idx={idx}
            shift={shift}
            prev={(idx === first || months.length === 1)}
            next={(idx === last || months.length === 1)}
            headerTitle={renderHeaderTitle()}
          />
          {renderAllYears(month.getFullYear() + idx * YEARS_DIFF, selectYear)}
        </View>
      ))}
    </View>
  );
}

export default YearView;
