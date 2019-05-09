// @flow
import React from 'react';

import Editor from './Editor';

type Props = {
  defaultValue?: {},
  onSubmit: ?((state: {}) => void),
}

const Form = ({ defaultValue, onSubmit, ...other }: Props) => {
  return <Editor {...other} value={defaultValue} onSubmit={onSubmit} />;
};

Form.defaultProps = {
  defaultValue: {},
};

export default Form;
