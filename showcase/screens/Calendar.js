import React, { useState } from 'react';
import { View } from 'react-native';
import CalendarWidget from '@sharingapples/calendar';
import StatusBar from '@sharingapples/status-bar';

export default function Calendar() {
  const [value, setValue] = useState([new Date(), new Date(2019, 4, 27)]);
  return (
    <View>
      <StatusBar>Calendar</StatusBar>
      <CalendarWidget value={value} setValue={setValue} type="range" />
    </View>
  );
}

Calendar.title = 'Calendar';
