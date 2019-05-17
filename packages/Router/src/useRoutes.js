// @flow
import { useContext } from 'react';
import type Route from './Route';
import { RouterContext } from './Router';

export default function useRoutes(routes: Array<Route<*>>, defaultPath?: null | string = null) {
  const ctx = useContext(RouterContext);
  ctx.routes = routes;
  if (!ctx.currentPath) {
    ctx.currentPath = defaultPath || ctx.routes[0].path;
  }
}
