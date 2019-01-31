// @flow
import React, { Component } from 'react';
import {
  View, Text, StatusBar as RNStatusBar, StyleSheet, Platform, NativeModules,
} from 'react-native';

const barHeight = Platform.OS === 'ios' ? NativeModules.Screen.topMargin : 0;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  body: {
    marginTop: barHeight,
    minHeight: 42,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: barHeight,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
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
        <View style={styles.body}>
          {title
          && (
            <View
              style={styles.titleContainer}
            >
              <Text
                allowFontScaling={false}
                style={[styles.titleText, { color: light ? 'white' : 'black' }]}
              >
                {title}
              </Text>
            </View>
          )
          }
          {children}
        </View>
      </View>
    );
  }
}

StatusBar.defaultProps = {
  light: false,
  children: undefined,
};

export default StatusBar;
