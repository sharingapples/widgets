// @flow
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import CalendarView from './CalendarView';

import CalendarContext from './common/CalendarContext';
import { getMonthCount } from './common/util';

type Props = {
  value: Date | Array<Date>
}

function Calendar({ value, ...other }: Props) {
  const monthsState = useState(() => getMonthCount(Dimensions.get('screen'), value));
  const [CurrentView, setView] = useState(() => CalendarView);
  return (
    <CalendarContext.Provider value={monthsState}>
      <CurrentView setView={setView} value={value} {...other} />
    </CalendarContext.Provider>
  );
}

export default Calendar;
