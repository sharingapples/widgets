// @flow
import type { ComponentType } from 'react';
import type { Icon } from './types';

export default class Route<T> {
  path: string;
  Page: ComponentType<T>;
  title: string;
  icon: ?Icon;

  constructor(path: string, Page: ComponentType<T>, title: string, icon?: ?Icon) {
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
