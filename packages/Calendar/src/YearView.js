import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

function YearView(year, setView) {
  const generatedYears = generateYears(year);
  const years = [];
  for (let i = 0; i < 3; i += 1) {
    const row = [0, 1, 2, 3].map(y => (
      <TouchableHighlight
        key={y}
        style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}
        onPress={() => setView('M', generatedYears[y + 4 * i])}
      >
        <Text>{generatedYears[y + 4 * i]}</Text>
      </TouchableHighlight>
    ));
    years.push(<View key={i} style={{ flexDirection: 'row' }}>{row}</View>);
  }
  return years;
}

export default YearView;
