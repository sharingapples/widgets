// @flow
import React, { useCallback, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { textColor, backgroundColor } from '../theme';
import MonthSelection from '../MonthSelection';
import Header from '../common/Header';
import CalendarContext from '../common/CalendarContext';

const YEARS_DIFF = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
  dateText: {
    fontSize: 14,
    color: textColor,
  },
  header: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  year: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  nav: {
    padding: 5,
  },
  navBar: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  text: {
    color: textColor,
    fontSize: 14,
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


function renderAllYears(initalYear, selectYear) {
  const years = [];
  for (let i = 0; i < 5; i += 1) {
    const yearStart = initalYear + i * 1;
    const row = [0, 1, 2, 3].map((y) => {
      const year = yearStart + 5 * y;
      return (
        <TouchableOpacity
          key={y}
          style={styles.year}
          onPress={() => selectYear(year)}
        >
          <Text allowFontScaling={false} style={styles.text}>{year}</Text>
        </TouchableOpacity>
      );
    });
    years.push(<View key={i} style={styles.row}>{row}</View>);
  }
  return years;
}

type Props = {
  setView: React.Node => void,
}

function YearView({ setView }: Props) {
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

  function back() {
    setView(() => null);
  }

  back.title = 'Back';


  return (
    <>
      {months.map((month, idx) => (
        <View key={month} style={styles.container}>
          {renderHeaderTitle()}
          {renderAllYears(month.getFullYear() + idx * YEARS_DIFF, selectYear)}
        </View>
      ))}
      <Header shift={shift} action={back} />
    </>
  );
}

export default YearView;
