// @flow
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import SafePadding from '@sharingapples/safe-padding';
import NavigatonContext from './NavigatonContext';

import { backgroundColor, textColor } from './theme';
import Nav from './Nav';

// the safe offset required for iOS Home Bar
const safeOffset = Math.min(SafePadding.bottom, 12);

type Props = {
  children: React.node,
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
 * @param {object} props BottomNavigation props
 * @param {Class<Component>} props.home The default home screen to display at the beginning
 * @example <caption>Navigation Example</caption>
 * import React from 'react';
 * import BottomNavigation from '@sharingapples/bottom-navigation';
 * // import { BottomNavigation } from '@sharingapples/widgets';
 * import { Screen1, Screen2, Screen3 } from './screens';
 *
 * export default function App() {
 *   return (
 *     <BottomNavigation home={Screen2}>
 *       <BottomNavigation.Item title="Screen1" screen={Screen1} />
 *       <BottomNavigation.Item title="Screen2" screen={Screen2} />
 *       <BottomNavigation.Item title="Screen3" screen={Screen3} />
 *     </BottomNavigation>
 *   );
 * }
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
