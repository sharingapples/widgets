// @flow
import React, { useContext, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Month from './Month';

import CalendarContext from '../common/CalendarContext';
import { primaryColor } from '../theme';
import Header from '../common/Header';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  clearTextContainer: {
    marginLeft: 15,
  },
  clearText: {
    fontSize: 14,
    color: primaryColor,
  },
  row: {
    flexDirection: 'row',
  },
});

type Props = {
  renderDate: (date: Date) => React.Node,
  setValue: number => void,
  value: ?Date,
  setView: React.Node => void,
}

function CalendarView({
  renderDate, setValue, value, setView,
}: Props) {
  const [months, setMonths] = useContext(CalendarContext);

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

  function clearSelect() {
    setValue(null);
  }

  clearSelect.title = 'Clear';
  return (
    <>
      {months.map(month => (
        <View key={month} style={styles.container}>
          <Month
            date={month}
            value={value}
            renderDate={renderDate}
            selectDate={selectDate}
            setView={setView}
          />
        </View>
      ))}
      <Header shift={shift} action={Array.isArray(value) && clearSelect} />
    </>
  );
}


export default CalendarView;
