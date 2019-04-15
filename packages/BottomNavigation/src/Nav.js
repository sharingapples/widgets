// @flow
import React, { useContext } from 'react';
import {
  TouchableOpacity, View, Text, Image, StyleSheet,
} from 'react-native';

import { selectColor, textColor } from './theme';
import NavigationContext from './NavigatonContext';

type Props = {
  title: string,
  screen: Class<Component>,
  icon: number,
  badge: ?number,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    paddingTop: 2,
    fontSize: 10,
    color: 'white',
  },
  badgeContainer: {
    position: 'absolute',
    top: 2,
    paddingLeft: 24,
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 16,
    height: 16,
    backgroundColor: '#b94a48',
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default function Item({ title, icon, badge, screen }: Props) {
  const { setScreen, Screen } = useContext(NavigationContext);
  const tintColor = Screen === screen ? selectColor : textColor;

  const selectScreen = () => setScreen(() => screen);

  return (
    <TouchableOpacity style={styles.container} onPress={selectScreen}>
      <Image source={icon} style={{ tintColor }} />
      {badge && (
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text allowFontScaling={false} style={styles.badgeText}>{badge}</Text>
          </View>
        </View>
      )}
      <Text allowFontScaling={false} style={[styles.title, { color: tintColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
