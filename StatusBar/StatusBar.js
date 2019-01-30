// @flow
import React, { Component } from 'react';
import {
  View, Text, StatusBar as RNStatusBar, StyleSheet, Platform, NativeModules,
} from 'react-native';

const barHeight = Platform.OS === 'ios' ? NativeModules.Screen.topMargin : 0;

const styles = StyleSheet.create({
  container: {
    paddingTop: barHeight,
    width: '100%',
    minHeight: barHeight + 42,
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    top: barHeight,
  },
});

type Props = {
  title: string,
  backgroundColor: ?string,
  light?: boolean,
  children?: React.Node | Array<React.Node>,
};

// eslint-disable-next-line react/prefer-stateless-function
class StatusBar extends Component<Props> {
  render() {
    const { backgroundColor, light, title, children } = this.props;
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <RNStatusBar
          barStyle={light ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundColor}
        />
        <Text
          allowFontScaling={false}
          style={[styles.title, { color: light ? 'white' : 'black' }]}
        >
          {title}
        </Text>
        {children}
      </View>
    );
  }
}

StatusBar.defaultProps = {
  light: false,
  children: undefined,
};

export default StatusBar;
