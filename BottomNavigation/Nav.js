// @flow
import React from 'react';
import {
  TouchableOpacity, View, Text, Image, StyleSheet,
} from 'react-native';

import NavigatonContext from './NavigatonContext';

type Props = {
  title: string,
  screen: React.Node,
  icon: number,
}

const styles = StyleSheet.create({
  container: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 10,
  },
});

const Nav = ({ title, screen, icon }: Props) => (
  <NavigatonContext.Consumer>
    {
      ({ setActiveScreen, activeScreen, tintColor }) => {
        const activeColor = activeScreen === screen ? tintColor : undefined;
        return (
          <TouchableOpacity onPress={() => setActiveScreen(screen)}>
            <View style={styles.container}>
              <Image source={icon} style={styles.icon} tintColor={activeColor} />
              <Text allowFontScaling={false} style={[styles.title, { color: activeColor }]}>
                {title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
    }
  </NavigatonContext.Consumer>
);

export default Nav;
