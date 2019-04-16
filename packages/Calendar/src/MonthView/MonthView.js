// @flow
import React, { useContext, useCallback } from 'react';
import { View, TouchableHighlight, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { backgroundColor, textColor } from '../theme';
import Header from '../common/Header';
import { getMonthCount, ALL_MONTHS } from '../common/util';
import CalendarContext from '../common/CalendarContext';
import DayView from '../DayView';
import YearView from '../YearView';


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
});

function renderHeaderTitle(year, setView) {
  return (
    <>
      <TouchableOpacity
        style={{ paddingHorizontal: 5 }}
        onPress={() => setView(() => YearView)}
      >
        <Text allowFontScaling={false} style={styles.dateText}>
          {year}
        </Text>
      </TouchableOpacity>
    </>
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
          style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}
          onPress={() => selectMonth(year, month)}
        >
          <Text>{ALL_MONTHS[month]}</Text>
        </TouchableHighlight>
      );
    });
    months.push(<View key={i} style={{ flexDirection: 'row' }}>{row}</View>);
  }
  return months;
}

type Props = {
  setView: React.Node => void,
}

function MonthView({ setView }: Props) {
  const [months, setMonths] = useContext(CalendarContext);
  const handleLayout = useCallback((e) => {
    const { layout } = e.nativeEvent;
    setMonths(mnths => getMonthCount(layout, mnths));
  }, []);

  const shift = useCallback((val) => {
    setMonths(mnths => mnths.map(d => new Date(
      d.getFullYear() + val,
      d.getMonth(),
      1
    )));
  }, []);

  const selectMonth = useCallback((year, month) => {
    setMonths(mnths => mnths.map((d, idx) => new Date(year, month + idx, 1)));
    setView(() => DayView);
  }, []);

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
            headerTitle={renderHeaderTitle(month.getFullYear() + idx, setView)}
          />
          {renderAllMonth(month.getFullYear() + idx, selectMonth)}
        </View>
      ))}
    </View>
  );
}

export default MonthView;
