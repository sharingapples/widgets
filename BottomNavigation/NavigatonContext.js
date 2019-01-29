// @flow
import React from 'react';

type Context = {
  tintColor: string,
  activeScreen: null | React.Node,
  setActiveScreen: (screen: React.Node) => void,
};

const NavigationContext = React.createContext<Context>({
  tintColor: '',
  activeScreen: null,
  setActiveScreen: () => { },
});

export default NavigationContext;
