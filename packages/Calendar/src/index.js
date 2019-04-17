// @flow
import React, { useState, useCallback } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import CalendarView from './Calendar';

import left from './assets/left.png';
import right from './assets/right.png';
import CalendarContext from './common/CalendarContext';
import IconButton from './common/IconButton';
import Button from './common/Button';
import { getMonthCount } from './common/util';
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
});

function Calendar({ value, ...other }: Props) {
  const [months, setMonths] = useState(() => getMonthCount(Dimensions.get('screen'), value));
  const [CurrentView, setView] = useState(() => CalendarView);

  const handleLayout = useCallback((e) => {
    const { layout } = e.nativeEvent;
    setMonths(mnths => getMonthCount(layout, mnths));
  }, []);

  function back() {
    // to last month viewed
    const previousMonths = months;
    setView(() => CalendarView);
    setMonths(previousMonths);
  }


  return (
    <CalendarContext.Provider value={[months, setMonths]}>
      <View style={styles.container} onLayout={handleLayout}>
        <CurrentView setView={setView} value={value} {...other}>
          {(shift, action) => (
            <View style={styles.navBar} pointerEvents="box-none">
              <IconButton icon={left} onPress={() => shift(-1)} />
              <View style={styles.row}>
                {action && <Button onPress={action || back} title={action.title || 'Back'} />}
                <IconButton icon={right} onPress={() => shift(1)} />
              </View>
            </View>
          )}
        </CurrentView>
      </View>
    </CalendarContext.Provider>
  );
}

export default Calendar;
