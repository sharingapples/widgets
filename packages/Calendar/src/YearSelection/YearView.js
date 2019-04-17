// @flow
import React, { useCallback, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { backgroundColor, textColor } from '../theme';
import { generateYears, YEARS_DIFF } from '../common/util';
import CalendarContext from '../common/CalendarContext';
import MonthSelection from '../MonthSelection';
import CalendarView from '../Calendar';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor,
  },
  dateText: {
    fontSize: 16,
    color: textColor,
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
  },
  year: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
});

function renderHeaderTitle() {
  return (
    <>
      <View style={styles.header}>
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
          style={styles.year}
          onPress={() => selectYear(year)}
        >
          <Text>{year}</Text>
        </TouchableOpacity>
      );
    });
    years.push(<View key={i} style={styles.row}>{row}</View>);
  }
  return years;
}

type Props = {
  setView: React.Node => void,
  children: React.Node,
}

function YearView({ setView, children }: Props) {
  const [months, setMonths] = useContext(CalendarContext);

  const shift = useCallback((val) => {
    setMonths(mnths => mnths.map(d => new Date(
      d.getFullYear() + val * YEARS_DIFF,
      d.getMonth(),
      1
    )));
  }, []);

  const selectYear = useCallback((year) => {
    setMonths(mnths => mnths.map((d, idx) => new Date(year + idx, d.getMonth(), 1)));
    setView(() => MonthSelection);
  }, [setMonths, setView]);


  return (
    <>
      {months.map((month, idx) => (
        <View key={month} style={{ flex: 1, padding: 5 }}>
          {renderHeaderTitle()}
          {renderAllYears(month.getFullYear() + idx * YEARS_DIFF, selectYear)}
        </View>
      ))}
      {children(shift)}
    </>
  );
}

export default YearView;
