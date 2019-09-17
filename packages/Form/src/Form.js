// @flow
import React, { useRef, useCallback } from 'react';

import Editor from './Editor';

type Props = {
  defaultValue?: {},
  onSubmit: ?((state: {}) => void),
}

const Form = ({ defaultValue, onSubmit, ...other }: Props) => {
  const initialState = useRef(defaultValue);

  const updateInitialState = useCallback((childName, fn) => {
    initialState.current = {
      ...initialState.current,
      [childName]: typeof fn === 'function' ? fn(initialState.current[childName]) : fn,
    };
  }, []);

  const interceptSubmit = useCallBack((state, source) => {
    if (onSubmit) {
      onSubmit({
        ...initialState.current,
        ...state,
      }, source);
    }
  }, []);

  return <Editor {...other} value={defaultValue} onSubmit={interceptSubmit} updateIntiialState={updateIntiialState} />;
};

Form.defaultProps = {
  defaultValue: {},
};

export default Form;
