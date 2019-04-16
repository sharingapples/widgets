import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';


const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


function Header() {

}


function MonthView(setView) {
  const months = [];
  for (let i = 0; i < 3; i += 1) {
    const row = [0, 1, 2, 3].map(m => (
      <TouchableHighlight
        key={m}
        style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}
        onPress={() => setView('D', m + 4 * i)}
      >
        <Text>{allMonths[m + 4 * i]}</Text>
      </TouchableHighlight>
    ));
    months.push(<View key={i} style={{ flexDirection: 'row' }}>{row}</View>);
  }
  return months;
}

export default MonthView;
