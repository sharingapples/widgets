// @flow
import React from 'react';
import useFormInput from './useFormInput';
import Editor from './Editor';

type Props = {
  name: string | number,
  defaultValue?: {},
  onSubmit: ?((err: boolean, v: {}) => void),
};

export default function Group({ name, onSubmit, defaultValue, ...other }: Props) {
  const [value, onChange] = useFormInput(name, defaultValue);

  return (
    <Editor
      {...other}
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

Group.defaultProps = {
  defaultValue: {},
};
