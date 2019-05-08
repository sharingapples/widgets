/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
// import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';
// import Navigation from '@sharingapples/bottom-navigation';
import TabBar from '@sharingapples/tab-bar';
import { Route, useRoutes } from '@sharingapples/router';

import { Home, Calendar, Form, Wizard } from './screens';
import { home, calendar, form, wizard } from './assets';
// import useTransitionState from '../packages/Animation/src/useTransitionState';

const homeRoute = new Route(4, 'wizard', Wizard, 'Wizard', wizard);
const routes = [
  homeRoute,
  new Route(2, 'calendar', Calendar, 'Calendar', calendar),
  new Route(3, 'form', Form, 'Form', form),
  new Route(4, 'wizard', Wizard, 'Wizard', wizard),
];

homeRoute.useBadge = () => 10;

function App() {
  useRoutes(routes);
  return (
    <TabBar routes={routes} />
    // <IconBar>
    //   {pages.map(({ id, title, icon }) => (
    //     <Icon key={id} onPress={() => setPage(id)} icon={icon}
    //   ))}
    // </IconBar>
  );
  // return (
  //   <Navigation home={Home}>
  //     <Navigation.Item title={Home.title} screen={Home} icon={home} badge={2} />
  //     <Navigation.Item title={Calendar.title} screen={Calendar} icon={calendar} />
  //     <Navigation.Item title={Form.title} screen={Form} icon={form} />
  //   </Navigation>
  // );
}

export default App;
