/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Navigation from '@sharingapples/bottom-navigation';

import { Home, Calendar, Form } from './screens';
import { home, calendar, form } from './assets';

export default function App() {
  return (
    <Navigation home={Form}>
      <Navigation.Item title={Home.title} screen={Home} icon={home} badge={2} />
      <Navigation.Item title={Calendar.title} screen={Calendar} icon={calendar} />
      <Navigation.Item title={Form.title} screen={Form} icon={form} />
    </Navigation>
  );
}
