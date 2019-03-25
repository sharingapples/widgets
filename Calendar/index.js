// @flow
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Header from './Header';
import Month from './Month';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});

function getMonthCount(width) {
  return width > 400 ? 2 : 1;
}

function getStartOfMonth(date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  return first - new Date(first).getDay() * 86400 * 1000;
}

type Props = {
  renderDay: React.Node,
  onSelect: number => void,
}

function Calendar({ renderDay, onSelect }: Props) {
  const [date, setDate] = useState(new Date());
  const [months, setMonths] = useState(() => getMonthCount(Dimensions.get('screen')));
  const handleLayout = useCallback((e) => {
    const { width } = e.nativeEvent.layout;
    setMonths(getMonthCount(width));
  }, [setMonths]);

  const prevMonth = new Date(new Date(date).setMonth(date.getMonth() - months));
  const nextMonth = new Date(new Date(date).setMonth(date.getMonth() + months));

  const secondMonth = new Date(new Date(date).setMonth(date.getMonth() + 1));

  const startOfMonth = getStartOfMonth(date);
  return (
    <View style={styles.container} onLayout={handleLayout}>
      {months === 1 ? (
        <>
          <Header
            date={date}
            setDate={setDate}
            prevMonth={() => setDate(prevMonth)}
            nextMonth={() => setDate(nextMonth)}
          />
          <Month
            start={startOfMonth}
            month={date.getMonth()}
            onSelect={onSelect}
            renderDay={renderDay}
          />
        </>
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '49%' }}>
            <Header
              date={date}
              prevMonth={() => setDate(prevMonth)}
              nextMonth={() => setDate(nextMonth)}
              rightArrow
            />
            <Month
              start={startOfMonth}
              month={date.getMonth()}
              onSelect={onSelect}
              renderDay={renderDay}
            />
          </View>
          <View style={{ width: '49%' }}>
            <Header
              date={secondMonth}
              prevMonth={() => setDate(prevMonth)}
              nextMonth={() => setDate(nextMonth)}
              leftArrow
            />
            <Month
              start={getStartOfMonth(secondMonth)}
              month={secondMonth.getMonth()}
              onSelect={onSelect}
              renderDay={renderDay}
            />
          </View>
        </View>
      )}

    </View>
  );
}


export default Calendar;
