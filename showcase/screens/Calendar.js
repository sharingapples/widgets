import React, { useState } from 'react';
import { View } from 'react-native';
import CalendarWidget from '@sharingapples/calendar';
import StatusBar from '@sharingapples/status-bar';

export default function Calendar() {
  const [value, setValue] = useState(new Date());
  return (
    <View>
      <StatusBar>Calendar</StatusBar>
      <CalendarWidget value={value} setValue={setValue} />
    </View>
  );
}

Calendar.title = 'Calendar';
