import React from 'react';
import { View, Text } from 'react-native';
import StatusBar from '@sharingapples/status-bar';

export default function Home() {
  return (
    <View>
      <StatusBar>Widgets</StatusBar>
      <Text>Home</Text>
    </View>
  );
}

Home.title = 'Home';
