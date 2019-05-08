// @flow
import React, { useRef, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import RootView from '@sharingapples/root-view';
import { TransitionView, useTransitionState } from '@sharingapples/animation';
import type { Route } from '@sharingapples/router';
import { useRoute, useRouter } from '@sharingapples/router';
import { getTheme } from '@sharingapples/theme';

const theme = getTheme();
const { primary, background, onBackground } = theme.TabBar || theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: onBackground,
  },
  button: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: onBackground,
  },
  image: {
    tintColor: onBackground,
  },
  selectedImage: {
    tintColor: primary,
  },
  selected: {
    color: primary,
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

type Props = {
  routes: Array<Route<*>>,
};

type BadgeProps = {
  useBadge: () => string | number;
}

function Badge({ useBadge }: BadgeProps) {
  const badge = useBadge();
  if (!badge) {
    return null;
  }

  return (
    <View style={styles.badgeContainer}>
      <View style={styles.badge}>
        <Text allowFontScaling={false} style={styles.badgeText}>{badge}</Text>
      </View>
    </View>
  );
}

export default function TabBar({ routes }: Props) {
  const currentRoute = useRoute();
  const controller = useTransitionState(currentRoute);
  const changeRoute = useRouter();
  const width = useRef(0);

  const updateWidth = useCallback((e) => {
    width.current = e.nativeEvent.layout.width;
  }, []);

  const tabAnimStyle = useCallback((driver, state, otherState) => ({
    ...StyleSheet.absoluteFillObject,
    transform: [
      {
        translateX: driver.interpolate({
          inputRange: [0, 1],
          // $FlowFixMe value is initialized to zero on useRef
          outputRange: [Math.sign(state.num - otherState.num) * width.current, 0],
        }),
      },
    ],
  }), []);

  return (
    <RootView>
      <View style={styles.container} onLayout={updateWidth}>
        {routes.map(route => (
          <TransitionView
            controller={controller}
            key={route.path}
            state={route}
            style={tabAnimStyle}
          >
            <route.Page />
          </TransitionView>
        ))}
      </View>
      <View style={styles.tabBar}>
        {routes.map(route => (
          <TouchableOpacity
            key={route.path}
            onPress={() => changeRoute(route.path)}
            style={styles.button}
          >
            <Image
              source={route.icon}
              style={route === currentRoute ? styles.selectedImage : styles.image}
            />
            {route.useBadge && <Badge useBadge={route.useBadge} />}
            <Text
              allowFontScaling={false}
              style={[styles.text, route === currentRoute ? styles.selected : null]}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </RootView>
  );
}
