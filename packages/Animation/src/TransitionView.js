// @flow
import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import type { Controller } from './Controller';

type Props<T> = {
  controller: Controller<T>,
  state: any,
  style: (Animated.Value, ownerState: T, otherState: T) => {},
};

export default function TransitionView<T>({ controller, state, style, ...other }: Props<T>) {
  const [transition, setTransition] = useState(() => controller.getTransition(state));

  useEffect(() => {
    return controller.register(state, setTransition);
  }, [controller, state]);

  if (!transition) {
    return null;
  }
  const animStyle = style(
    transition.driver,
    state,
    controller.other(state)
  );

  return (
    <Animated.View style={animStyle} {...other} />
  );
}
