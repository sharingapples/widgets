// @flow
import React from 'react';

import {
  View, Text, StatusBar as RNStatusBar, StyleSheet,
} from 'react-native';
import SafePadding from '@sharingapples/safe-padding';
import { getTheme } from '@sharingapples/theme';
import isDark from '@sharingapples/theme/isDark';

const theme = getTheme();
const backgroundColor = theme.primary;
const textColor = theme.onPrimary;

const barStyle = isDark(backgroundColor) ? 'light-content' : 'dark-content';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.primary,
  },
  body: {
    paddingTop: Math.min(SafePadding.top, 32),
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
});

type Props = {
  title: string,
  children?: React.Node | Array<React.Node>,
};

// eslint-disab le-next-line react/prefer-stateless-function
function StatusBar({ title, children }: Props) {
  return (
    <View style={styles.container}>
      <RNStatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <View style={styles.body}>
        {!!title
        && (
          <Text allowFontScaling={false} style={styles.title}>
            {title}
          </Text>
        )}
        {children}
      </View>
    </View>
  );
}

StatusBar.defaultProps = {
  children: undefined,
};

export default StatusBar;
