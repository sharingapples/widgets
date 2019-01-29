// @flow
import React from 'react';
import {
  TouchableOpacity, Text, Image, StyleSheet,
} from 'react-native';

import NavigatonContext from './NavigatonContext';

type Props = {
  title: string,
  screen: Class<Component>,
  icon: number,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
          <TouchableOpacity style={styles.container} onPress={() => setActiveScreen(screen)}>
            <Image source={icon} style={styles.icon} tintColor={activeColor} />
            <Text allowFontScaling={false} style={[styles.title, { color: activeColor }]}>
              {title}
            </Text>
          </TouchableOpacity>
        );
      }
    }
  </NavigatonContext.Consumer>
);

export default Nav;
