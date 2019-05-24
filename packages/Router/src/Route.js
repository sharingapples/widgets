// @flow
import type { ComponentType } from 'react';
import type { Icon } from './types';

export default class Route<T> {
  num: number;
  path: string;
  Page: ComponentType<T>;
  title: string;
  icon: ?Icon;
  onShow: ?() => void;

  // helper hook to get badge values for specific routes
  useBadge: ?() => number | string;

  constructor(num: number, path: string, Page: ComponentType<T>, title: string, icon?: ?Icon) {
    this.num = num;
    this.path = path;
    this.Page = Page;
    this.title = title;
    this.icon = icon;
  }

  /**
   * Simple matcher algorithm. Override with specific route
   * @param {*} path
   */
  match(path: string) {
    return path === this.path;
  }
}
