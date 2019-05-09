// @flow
import React from 'react';
import type { ComponentType } from 'react';

export type Context = {
  Screen: ComponentType<*>,
  setScreen: (() => ComponentType<*>) => void,
};

// $FlowFixMe Default value is not required
const NavigationContext = React.createContext<Context>(null);

export default NavigationContext;
