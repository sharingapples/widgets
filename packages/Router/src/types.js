// @flow
import type Route from './Route';

export type Icon = number | { uri: string };

export type Listener = (route: Route<*>) => void;

export type RouterContext = {
  routes: Array<Route<*>>,
  listeners: Array<Listener>,
  currentRoute: Route<*> | null,

  registerListener: (listener: Listener) => () => void,
  changeRoute: (id: string) => void,
}
