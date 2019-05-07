// @flow
import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

const defaultAnimation = (value, toValue) => {
  return Animated.timing(value, {
    toValue,
    duration: 225,
    useNativeDriver: true,
    easing: Easing.bezier(0.42, 0, 0.58, 1),
  });
};
export type Animation = typeof defaultAnimation;

class Transition<T> {
  state: T;
  driver: Animated.Value;

  constructor(state: T, driver: number | Animated.Value) {
    this.state = state;
    this.driver = typeof driver === 'number' ? new Animated.Value(driver) : driver;
  }
}

type Listener<T> = {
  state: T,
  setter: (null | Transition<T>) => void,
}

export class Controller<T> {
  listeners: Array<Listener<T>> = [];
  current: Transition<T>;
  next: Transition<T>;
  constructor(initialState: T) {
    this.current = new Transition(initialState, 1);
    this.next = this.current;
  }

  other(state: T): T {
    if (this.current.state === state) {
      return this.next.state;
    }
    return this.current.state;
  }

  getTransition(state: T) {
    if (state === this.current.state) {
      return this.current;
    }
    if (state === this.next.state) {
      return this.next;
    }
    return null;
  }

  register(state: T, setter: (?Transition<T>) => void) {
    const listener = { state, setter };
    this.listeners.push(listener);
    return () => {
      const idx = this.listeners.indexOf(listener);
      this.listeners.splice(idx, 1);
    };
  }

  findTransition(state: T): null | Transition<T> {
    if (state === this.current.state) return this.current;
    if (state === this.next.state) return this.next;
    return null;
  }

  trigger(states: Array<T>) {
    this.listeners.forEach((listener) => {
      if (states.includes(listener.state)) {
        const transition = this.findTransition(listener.state);
        if (transition !== null) {
          listener.setter(new Transition(transition.state, transition.driver));
        } else {
          listener.setter(null);
        }
      }
    });
  }

  advance(state: T, animation?: Animation = defaultAnimation) {
    // No need to advance if the states are the same
    if (this.next.state === state) {
      return;
    }

    // Special case, advancing to the original state within the transition period
    if (this.current.state === state) {
      // Swap the current and next state values, keeping the drivers intact
      const tmp = this.next.state;
      this.next.state = this.current.state;
      this.current.state = tmp;

      // trigger the respective listeners as well
      this.trigger([this.next.state, this.current.state]);
      return;
    }

    // New transition into play
    this.next = new Transition(state, 0);
    this.trigger([this.next.state, this.current.state]);
    // Run the animation
    Animated.parallel([
      animation(this.current.driver, 0),
      animation(this.next.driver, 1),
    ]).start(() => {
      const states = [this.current.state, this.next.state];
      this.current.driver.setValue(0);
      this.current = this.next;
      this.current.driver.setValue(1);
      this.trigger(states);
    });
  }
}

export function useController<T>(initialState: T): Controller<T> {
  const ref = useRef<Controller<T>>(null);
  if (ref.current === null) {
    ref.current = new Controller(initialState);
  }

  return ref.current;
}
