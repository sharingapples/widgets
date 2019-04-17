// @flow
import React, { useContext, useCallback } from 'react';
import { View, TouchableHighlight, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { backgroundColor, textColor } from '../theme';
import { ALL_MONTHS } from '../common/util';
import CalendarContext from '../common/CalendarContext';
import YearView from '../YearSelection';
import CalendarView from '../Calendar';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor,
  },
  header: {
    width: '100%',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: textColor,
  },
  nav: {
    paddingHorizontal: 5,
  },
  month: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
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
        <TouchableHighlight
          key={m}
          style={styles.month}
          onPress={() => selectMonth(year, month)}
        >
          <Text>{ALL_MONTHS[month]}</Text>
        </TouchableHighlight>
      );
    });
    months.push(<View key={i} style={styles.row}>{row}</View>);
  }
  return months;
}

type Props = {
  setView: React.Node => void,
  children: React.Node,
}

function MonthView({ setView, children }: Props) {
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
    setView(() => CalendarView);
  }, []);


  return (
    <>
      {months.map((month, idx) => (
        <View key={month} style={{ flex: 1, padding: 5 }}>
          {renderHeader(month.getFullYear() + idx, setView)}
          {renderAllMonth(month.getFullYear() + idx, selectMonth)}
        </View>
      ))}
      {children(shift)}
    </>
  );
}

export default MonthView;
