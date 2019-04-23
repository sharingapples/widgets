// @flow
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import SafePadding from '@sharingapples/safe-padding';
import NavigatonContext from './NavigatonContext';

import { backgroundColor, textColor } from './theme';
import Nav from './Nav';

// the safe offset required for iOS Home Bar
/** Minimum safe offset */
const safeOffset = Math.min(SafePadding.bottom, 12);

type Props = {
  home: Class<Component>,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor,
    paddingBottom: safeOffset,
  },
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: textColor,
  },
});

const behavior = Platform.OS === 'ios' ? 'height' : undefined;

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
    <KeyboardAvoidingView
      style={styles.root}
      behavior={behavior}
      keyboardVerticalOffset={-safeOffset}
    >
      <NavigatonContext.Provider value={contextValue}>
        <View style={styles.container}>
          <Screen />
        </View>
        <View style={styles.navBar} {...other} />
      </NavigatonContext.Provider>
    </KeyboardAvoidingView>
  );
}

BottomNavigation.Item = Nav;

export default BottomNavigation;
