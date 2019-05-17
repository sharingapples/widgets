// @flow
import { useState, useContext, useEffect } from 'react';
import { RouterContext } from './Router';
import type Route from './Route';

export default function useRoute<T>(): ?Route<T> {
  const ctx = useContext(RouterContext);
  const [route, setRoute] = useState(() => ctx.findRoute(ctx.currentPath));

  useEffect(() => {
    return ctx.registerListener(setRoute);
  }, [ctx]);

  return route;
}
