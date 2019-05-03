// @flow
import React from 'react';

import {
  View, Text, StatusBar as RNStatusBar, StyleSheet,
} from 'react-native';
import SafePadding from '@sharingapples/safe-padding';
import { getTheme } from '@sharingapples/theme';
import isDark from '@sharingapples/theme/isDark';

const theme = getTheme();
const componentTheme = theme.StatusBar || theme;
const backgroundColor = componentTheme.primary;
const textColor = componentTheme.onPrimary;

const barStyle = isDark(backgroundColor) ? 'light-content' : 'dark-content';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.primary,
    paddingTop: Math.min(SafePadding.top, 32),
  },
  body: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: textColor,
  },
  title: {
    color: textColor,
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  centered: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

type Props = {
  children?: string | React.Node | Array<React.Node>,
};

function Title(title) {
  return (
    <Text allowFontScaling={false} style={styles.title}>{title}</Text>
  );
}

function parseChildren(children) {
  if (typeof children === 'string') {
    return Title(children);
  }
  return children;
}

// eslint-disab le-next-line react/prefer-stateless-function
function StatusBar({ children }: Props) {
  return (
    <View style={styles.container}>
      <RNStatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <View style={styles.body}>
        {parseChildren(children)}
      </View>
    </View>
  );
}

StatusBar.centered = (title, left, right) => {
  return (
    <>
      {Title(title)}
      <View style={styles.centered}>
        {left || <View />}
        {right || <View />}
      </View>
    </>
  );
};

StatusBar.Title = Title;

StatusBar.defaultProps = {
  children: undefined,
};

export default StatusBar;
