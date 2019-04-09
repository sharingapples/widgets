// @flow
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SafePadding from '@sharingapples/safe-padding';
import { getTheme } from '@sharingapples/theme';
import NavigatonContext from './NavigatonContext';

import Nav from './Nav';

const theme = getTheme();
const backgroundColor = theme.surface;
const textColor = theme.onSurface;

type Props = {
  children: React.node,
  home: Class<Component>,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    backgroundColor,
    // Allow bottom padding for home bar
    paddingBottom: Math.min(SafePadding.bottom, 12),
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: textColor,
  },
});

function BottomNavigation({ home, ...other }: Props) {
  const [Screen, setScreen] = useState(() => home);

  const contextValue = {
    setScreen,
    Screen,
  };

  return (
    <NavigatonContext.Provider value={contextValue}>
      <View style={styles.container}>
        <Screen />
      </View>
      <View style={styles.navBar} {...other} />
    </NavigatonContext.Provider>
  );
}

BottomNavigation.Item = Nav;

export default BottomNavigation;
