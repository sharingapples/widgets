// @flow
import React, { Component } from 'react';
import {
  View, StyleSheet, NativeModules, Platform,
} from 'react-native';

import NavigatonContext from './NavigatonContext';

import Nav from './Nav';

type Props = {
  children: React.node,
  defaultScreen: Class<Component>,
  tintColor: string,
  backgroundColor: string,
};

type State = {
  Screen: Class<Component>,
};

const padding = Platform.OS === 'ios' ? NativeModules.Screen.bottomMargin / 2 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    height: 60 + padding,
    paddingBottom: padding,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'red',
  },
});

export default class BottomNavigation extends Component<Props, State> {
  static Item = Nav;

  constructor(props) {
    super(props);
    this.state = {
      Screen: props.defaultScreen,
    };
  }

  setActiveScreen = (Screen) => {
    this.setState({ Screen });
  }

  render() {
    const { tintColor, backgroundColor, children } = this.props;
    const { Screen } = this.state;
    const contextValue = { setActiveScreen: this.setActiveScreen, activeScreen: Screen, tintColor };
    return (
      <NavigatonContext.Provider value={contextValue}>
        <View style={styles.container}>
          <Screen />
          <View style={[styles.navBar, { backgroundColor }]}>
            {children}
          </View>
        </View>
      </NavigatonContext.Provider>
    );
  }
}
