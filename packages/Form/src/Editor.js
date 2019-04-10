/* global __DEV__ */
// @flow
import React, { useRef, useContext } from 'react';

// Get the EditorContext
const EditorContext = React.createContext();

function createManager(initialState, parent) {
  let state = initialState;
  const namedSubscriptions = {};
  const mappedSubscriptions = [];

  const manager = {
    getParent: () => parent,
    getState: () => state,
    dispatch: (name, value) => {
      const newValue = typeof value === 'function' ? value(state[name]) : value;
      const prevValue = state[name];
      if (prevValue === newValue) {
        return;
      }

      const prevState = state;
      const newState = Object.assign({}, state);
      newState[name] = newValue;
      state = newState;

      // let all the listeners know that the value has changed
      const subscriptions = namedSubscriptions[name];
      if (subscriptions && subscriptions.length > 0) {
        subscriptions.forEach(fn => fn(newValue, newState, prevValue, prevState));
      }

      mappedSubscriptions.forEach(fn => fn(newState, prevState));
    },
    subscribe: (name, listener) => {
      if (typeof name !== 'string') {
        mappedSubscriptions.push(listener);
        return () => {
          const idx = mappedSubscriptions.indexOf(listener);
          mappedSubscriptions.splice(idx, 1);
        };
      }

      const arr = namedSubscriptions[name] || [];
      if (!arr.length) {
        namedSubscriptions[name] = arr;
      }
      arr.push(listener);

      return () => {
        const idx = arr.indexOf(listener);
        arr.splice(idx, 1);
        if (arr.length === 0) {
          delete namedSubscriptions[name];
        }
      };
    },
    submit: () => {
      // Run all the validators
    },
  };

  return manager;
}

export function useEditor(parent = null) {
  const instance = useContext(EditorContext);
  return parent || instance;
}

function useEditorInstance(defaultValue, parent) {
  const instance = useRef(null);

  if (instance.current === null) {
    instance.current = createManager(defaultValue, parent);
  }
  return instance.current;
}

export default function Editor({ defaultValue, parent, ...other }) {
  const instance = useEditorInstance(defaultValue, parent);
  return <EditorContext.Provider value={instance} {...other} />;
}

Editor.defaultProps = {
  defaultValue: {},
};
