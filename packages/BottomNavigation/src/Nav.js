// @flow
import React, { useContext } from 'react';
import {
  TouchableOpacity, View, Text, Image, StyleSheet,
} from 'react-native';

import { selectColor, textColor } from './theme';
import NavigationContext from './NavigatonContext';

type Props = {
  /** The screen to which is displayed when the Item is selected */
  screen: Class<Component>,

  /** The title to display below the the navigation item. Defaults to `screen.title` */
  title: ?string,

  /**
   * A icon for the navigation item. The item doesn't resize the image and uses the
   * image as it is. The best resolution is 20x20. Defaults to `screen.icon`
   */
  icon: ?number,

  /**
   * A small badge icon to display with red background
   */
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

/**
 * A navigation item with icon and text to display at the bottom of screen.
 */
export default function Item({ title, icon, badge, screen }: Props) {
  const titleText = title || screen.title;
  const iconSource = icon || screen.icon;

  const { setScreen, Screen } = useContext(NavigationContext);
  const tintColor = Screen === screen ? selectColor : textColor;

  const selectScreen = () => setScreen(() => screen);

  return (
    <TouchableOpacity style={styles.container} onPress={selectScreen}>
      <Image source={iconSource} style={{ tintColor }} />
      {badge && (
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text allowFontScaling={false} style={styles.badgeText}>{badge}</Text>
          </View>
        </View>
      )}
      <Text allowFontScaling={false} style={[styles.title, { color: tintColor }]}>
        {titleText}
      </Text>
    </TouchableOpacity>
  );
}
