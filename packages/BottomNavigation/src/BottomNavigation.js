// @flow
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import SafePadding from '@sharingapples/safe-padding';
import { getTheme } from '@sharingapples/theme';
import NavigatonContext from './NavigatonContext';

import Nav from './Nav';

const theme = getTheme();
const backgroundColor = theme.background;
const textColor = theme.onBackground;

// the safe offset required for Home Bar
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
