// @flow
import React, { useState } from 'react';

import Editor from './Editor';

type Props = {
  defaultValue?: {},
  onSubmit: ?((err: boolean, state: {}) => void),
}

const Form = ({ defaultValue, ...other }: Props) => {
  // const [value, setValue] = useState(defaultValue);

  return <Editor defaultValue={defaultValue} {...other} />;
};

Form.defaultProps = {
  defaultValue: {},
};

export default Form;
