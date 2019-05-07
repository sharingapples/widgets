// @flow
import { useEffect } from 'react';
import { useController } from './Controller';
import type { Animation } from './Controller';

export default function useTransitionState<T>(
  state: T,
  animation?: Animation
) {
  const controller = useController<T>(state);

  useEffect(() => {
    controller.advance(state, animation);
  }, [state]);

  return controller;
}
