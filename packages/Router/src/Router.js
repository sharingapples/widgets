/* global __DEV__ */
// @flow
import React, { useState } from 'react';
import Route from './Route';
import type { Listener } from './types';

export class BasicRouter {
  currentPath: null | string;
  routes: Array<Route<*>>;
  listeners: Array<Listener>;

  constructor(routes: Array<Route<*>> = [], defaultPath: null | string = null) {
    this.routes = routes;
    this.currentPath = defaultPath;
    this.listeners = [];
  }

  registerListener = (listener: Listener) => {
    this.listeners.push(listener);
    return () => {
      const idx = this.listeners.indexOf(listener);
      if (idx >= 0) {
        this.listeners.splice(idx, 1);
      }
    };
  }

  findRoute = (path: ?string): ?Route<*> => {
    if (!path) return null;
    // $FlowFixMe path is not undeinfed or null
    return this.routes.find(route => route.match(path));
  }

  changeRoute = (path: string) => {
    const newRoute = this.findRoute(path);
    if (__DEV__ && !newRoute) {
      // eslint-disable-next-line no-console
      console.error(`Could not find the route with path ${path}. This is a no-op and will not do anything.`);
    }

    if (newRoute && path !== this.currentPath) {
      this.currentPath = path;
      this.listeners.forEach((listener) => {
        listener(newRoute);
      });
    }
  }
}

const rootRouter = new BasicRouter();
export const RouterContext = React.createContext<BasicRouter>(rootRouter);

type Props = {
  router?: BasicRouter,
}

export function Router({ router, ...other }: Props) {
  const [value] = useState(router);
  return (
    <RouterContext.Provider {...other} value={value} />
  );
}

Router.defaultProps = {
  router: new BasicRouter(),
};
