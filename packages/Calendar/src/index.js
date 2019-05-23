// @flow
import React, { useState, useCallback } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import CalendarView from './Calendar';

import CalendarContext from './common/CalendarContext';
import { getMonthCount } from './util';
import { backgroundColor } from './theme';

type Props = {
  value: Date | Array<Date>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor,
  },
  navBar: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  view: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
});

function Calendar({ value, ...other }: Props) {
  const [months, setMonths] = useState(() => getMonthCount(Dimensions.get('screen'), value));
  const [CurrentView, setView] = useState(() => null);

  const handleLayout = useCallback((e) => {
    const { layout } = e.nativeEvent;
    setMonths(mnths => getMonthCount(layout, mnths));
  }, []);

  return (
    <CalendarContext.Provider value={[months, setMonths]}>
      <View style={styles.container} onLayout={handleLayout}>
        <CalendarView setView={setView} value={value} {...other} />
        {CurrentView
          && (
          <View style={styles.view}>
            <CurrentView setView={setView} value={months} {...other} />
          </View>
          )}
      </View>
    </CalendarContext.Provider>
  );
}

export default Calendar;
