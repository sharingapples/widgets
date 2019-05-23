// @flow
import React, { useCallback, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { textColor, backgroundColor } from '../theme';
import { ALL_MONTHS } from '../util';
import YearView from '../YearSelection';
import Header from '../common/Header';
import CalendarContext from '../common/CalendarContext';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    padding: 5,
  },
  dateText: {
    fontSize: 14,
    color: textColor,
  },
  nav: {
    padding: 5,
  },
  month: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
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
    fontSize: 14,
    color: textColor,
  },
});

function renderHeader(year, setView) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.nav}
        onPress={() => setView(() => YearView)}
      >
        <Text allowFontScaling={false} style={styles.dateText}>
          {year}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function renderAllMonth(year, selectMonth) {
  const months = [];
  for (let i = 0; i < 3; i += 1) {
    const row = [0, 1, 2, 3].map((m) => {
      const month = m + 4 * i;
      return (
        <TouchableOpacity
          key={m}
          style={styles.month}
          onPress={() => selectMonth(year, month)}
        >
          <Text allowFontScaling={false} style={styles.text}>{ALL_MONTHS[month]}</Text>
        </TouchableOpacity>
      );
    });
    months.push(<View key={i} style={styles.row}>{row}</View>);
  }
  return months;
}

type Props = {
  setView: React.Node => void,
}

function MonthView({ setView }: Props) {
  const [months, setMonths] = useContext(CalendarContext);

  const shift = useCallback((val) => {
    setMonths(mnths => mnths.map(d => new Date(
      d.getFullYear() + val,
      d.getMonth(),
      1
    )));
  }, []);

  const selectMonth = useCallback((year, month) => {
    setMonths(mnths => mnths.map((d, idx) => new Date(year, month + idx, 1)));
    setView(() => null);
  }, []);


  function back() {
    setView(() => null);
  }

  back.title = 'Back';

  return (
    <>
      {months.map((month, idx) => (
        <View key={month} style={styles.container}>
          {renderHeader(month.getFullYear() + idx, setView)}
          {renderAllMonth(month.getFullYear() + idx, selectMonth)}
        </View>
      ))}
      <Header shift={shift} action={back} />
    </>
  );
}

export default MonthView;
