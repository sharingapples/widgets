// @flow
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, NativeModules, Platform } from 'react-native';

import NavigatonContext from './NavigatonContext';

import Nav from './Nav';

type Props = {
  children: React.node,
  defaultScreen: Class<Component>,
  tintColor: string,
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

  state = {
    Screen: this.props.defaultScreen,
  };

  setActiveScreen = (Screen) => {
    this.setState({ Screen });
  }

  render() {
    const { tintColor } = this.props;
    const { Screen } = this.state;
    const contextValue = { setActiveScreen: this.setActiveScreen, activeScreen: Screen, tintColor };
    return (
      <NavigatonContext.Provider value={contextValue}>
        <View style={styles.container}>
          <Screen />
          <View style={styles.navBar}>
            {this.props.children}
          </View>
        </View>
      </NavigatonContext.Provider>
    );
  }
}
