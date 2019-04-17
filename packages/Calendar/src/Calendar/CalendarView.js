// @flow
import React, { useContext, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Month from './Month';

import CalendarContext from '../common/CalendarContext';
import { primaryColor } from '../theme';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  clearTextContainer: {
    marginLeft: 15,
  },
  clearText: {
    fontSize: 14,
    color: primaryColor,
  },
});

type Props = {
  renderDate: (date: Date) => React.Node,
  setValue: number => void,
  value: ?Date,
  setView: React.Node => void,
  children: React.Node,
}

function CalendarView({
  renderDate, setValue, value, setView, children,
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
      {children(shift, Array.isArray(value) && clearSelect)}
    </>
  );
}


export default CalendarView;
