import React, { useRef, useState, useEffect } from 'react';
import { Animated } from 'react-native';

export function TransitionView({ state, controller, ...other }) {
  if (!controller.isVisible(state)) {
    return null;
  }

  return (
    <Animated.View style={controller.getStyle(state)} {...other} />
  );
}

export default function useTransitionState(state, options) {
  const [currentState, setCurrentState] = useState(state);

  const controller = useRef(null);
  if (controller.current === null) {
    controller.current = {
      state,
      driver: new Animated.Value(1),
      isVisible(value) {
        return value === state;
      },
      View({ state, style, ...other }) {
        if (!this.isVisible(state)) return null;
        return <Animated.View style={style(this.driver)} {...other} />;
      },
    };
  }

  useEffect(() => {
    if (state === controller.current.state) return;

    // Run the animation
    const oldDriver = controller.current.driver;
    controller.current.driver = new Animated.Value(0);
    Animated.parallel([
      options.animation(oldDriver, 0),
      options.animation(controller.current.driver, 1),
    ]).start(() => {
      setCurrentState(state);
    });
  }, [state]);

  return (props) => <TransitionView controller={controller.current}
}
