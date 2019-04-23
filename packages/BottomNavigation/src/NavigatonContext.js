// @flow
import React from 'react';

type Context = {
  activeScreen: Class<Component>,
  setActiveScreen: (screen: Class<Component>) => void,
};

const NavigationContext = React.createContext<Context>();

export default NavigationContext;
