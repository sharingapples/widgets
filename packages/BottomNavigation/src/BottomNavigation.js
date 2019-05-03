// @flow
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RootView from '@sharingapples/root-view';
import NavigatonContext from './NavigatonContext';

import { textColor } from './theme';
import Nav from './Nav';

type Props = {
  home: Class<Component>,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: textColor,
  },
});

/**
 * Display a navigation bar at the bottom of the screen, with each navigation
 * item navigating to its repective screen when pressed.
 *
 * Uses the available view area, and places the navigation bar at the bottom
 * of the view with the remaining area for the Screen to be displayed.
 *
 * On iOS, it puts an extra `12px` bottom margin for the ios **Home Bar**. And
 * since the Screen area is wrapped around KeyboardAvoidingView, the extra
 * margin is balanced when the soft keyboard is showing.
 *
 */
function BottomNavigation({ home, ...other }: Props) {
  const [Screen, setScreen] = useState(() => home);

  const contextValue = {
    setScreen,
    Screen,
  };

  return (
    <RootView>
      <NavigatonContext.Provider value={contextValue}>
        <View style={styles.container}>
          <Screen />
        </View>
        <View style={styles.navBar} {...other} />
      </NavigatonContext.Provider>
    </RootView>
  );
}

BottomNavigation.Item = Nav;

export default BottomNavigation;
