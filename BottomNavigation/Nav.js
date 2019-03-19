// @flow
import React from 'react';
import {
  TouchableOpacity, View, Text, Image, StyleSheet,
} from 'react-native';

import NavigatonContext from './NavigatonContext';

type Props = {
  title: string,
  screen: Class<Component>,
  icon: number,
  badge: ?number,
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {},
  title: {
    fontSize: 10,
    paddingTop: 5,
  },
  badge: {
    position: 'absolute',
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    right: 6,
    top: 4,
    backgroundColor: '#b94a48',
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});

const Nav = ({ title, screen, icon, badge }: Props) => (
  <NavigatonContext.Consumer>
    {
      ({ setActiveScreen, activeScreen, tintColor }) => {
        const activeColor = activeScreen === screen ? tintColor : 'white';
        return (
          <TouchableOpacity style={styles.container} onPress={() => setActiveScreen(screen)}>
            <Image source={icon} style={[styles.icon, { tintColor: activeColor }]} />
            <Text allowFontScaling={false} style={[styles.title, { color: activeColor }]}>
              {title}
            </Text>
            {badge && (
              <View style={styles.badge}>
                <Text allowFontScaling={false} style={styles.badgeText}>{badge}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      }
    }
  </NavigatonContext.Consumer>
);

export default Nav;
