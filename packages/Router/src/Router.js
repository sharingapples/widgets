/* global __DEV__ */
// @flow
import React, { useState } from 'react';
import Route from './Route';
import type { Listener } from './types';

export class BasicRouter {
  currentPath: null | string;
  routes: Array<Route<*>>;
  listeners: Array<Listener>;

  registerListener: (listener: Listener) => () => void;
  findRoute: (path: ? string) => ?Route<*>;
  changeRoute: (path: string) => void;

  constructor(routes: Array<Route<*>> = [], defaultPath: null | string = null) {
    this.routes = routes;
    this.currentPath = defaultPath;
    this.listeners = [];

    /* eslint-disable no-underscore-dangle */
    this.registerListener = this._registerListener.bind(this);
    this.findRoute = this._findRoute.bind(this);
    this.changeRoute = this._changeRoute.bind(this);
    /* eslint-enable no-underscore-dangle */
  }

  _registerListener(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      const idx = this.listeners.indexOf(listener);
      if (idx >= 0) {
        this.listeners.splice(idx, 1);
      }
    };
  }

  _findRoute(path: ?string): ?Route<*> {
    if (!path) return null;
    // $FlowFixMe path is not undeinfed or null
    return this.routes.find(route => route.match(path));
  }

  _changeRoute(path: string) {
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

      if (newRoute.onShow) newRoute.onShow();
    }
  }
}

const rootRouter = new BasicRouter();
// When the generic type is provided `<BasicRouter>` while
// performing createContext, the function returned `false` ???
// $FlowFixMe
export const RouterContext = React.createContext(rootRouter);
console.log('Context', RouterContext);
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
