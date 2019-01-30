// @flow
import React, { Component } from 'react';
import {
  View, Text, StatusBar as RNStatusBar, StyleSheet, Platform, NativeModules,
} from 'react-native';

const barHeight = Platform.OS === 'ios' ? NativeModules.Screen.topMargin : 0;

const styles = StyleSheet.create({
  container: {
    paddingTop: barHeight + 10,
    paddingBottom: 10,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

type Props = {
  title: string,
  backgroundColor: ?string,
  light?: boolean,
  children?: React.Node,
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
        {children
          || (<Text style={[styles.title, { color: light ? 'white' : 'black' }]}>{title}</Text>)
        }
      </View>
    );
  }
}

StatusBar.defaultProps = {
  light: false,
  children: React.Node,
};

export default StatusBar;
