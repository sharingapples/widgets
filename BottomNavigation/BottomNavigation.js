// @flow
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import NavigatonContext from './NavigatonContext';

import Nav from './Nav';

type Props = {
  children: React.node,
  defaultScreen: React.Node,
  tintColor: string,
  backgroundColor: string,
};

type State = {
  activeScreen: null | React.Node,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  navBar: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'red',
    borderTopWidth: 1,
    borderColor: '#d6d7da',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default class BottomNavigation extends Component<Props, State> {
  static Item = Nav;

  state = {
    activeScreen: this.props.defaultScreen,
  };

  setActiveScreen = (screen) => {
    this.setState({ activeScreen: screen });
  }

  render() {
    const { backgroundColor, tintColor } = this.props;
    const { activeScreen } = this.state;
    const contextValue = { setActiveScreen: this.setActiveScreen, activeScreen, tintColor };
    return (
      <NavigatonContext.Provider value={contextValue}>
        <View style={styles.container}>
          <ScrollView>
            {activeScreen && activeScreen()}
          </ScrollView>
          <View style={[styles.navBar, { backgroundColor }]}>
            {this.props.children}
          </View>
        </View>
      </NavigatonContext.Provider>
    );
  }
}
