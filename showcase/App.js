/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import StatusBar from '@sharingapples/status-bar';
import Navigation from '@sharingapples/bottom-navigation';

import { Home, Calendar } from './screens';
import { home, calendar } from './assets';

export default function App() {
  return (
    <>
      <StatusBar title="Showcase" />
      <Navigation home={Calendar}>
        <Navigation.Item title={Home.title} screen={Home} icon={home} badge={2} />
        <Navigation.Item title={Calendar.title} screen={Calendar} icon={calendar} />
      </Navigation>
    </>
  );
}
