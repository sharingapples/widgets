import React, { useState } from 'react';
import { View } from 'react-native';
import CalendarWidget from '../../Calendar';

export default function Calendar() {
  const [value, setValue] = useState(new Date());
  return (
    <View>
      <CalendarWidget value={value} setValue={setValue} />
    </View>
  );
}

Calendar.title = 'Calendar';
