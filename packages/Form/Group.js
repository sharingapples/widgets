// @flow
import React from 'react';
import useFormInput from './useFormInput';
import Editor from './Editor';

type Props = {
  name: string,
  defaultValue?: {},
  onSubmit: ?((err: boolean, v: {}) => void),
};

export default function Group({ name, defaultValue, ...other }: Props) {
  const group = useFormInput(name, defaultValue);

  return (
    <Editor value={group.value} onChange={group.onChange} {...other} />
  );
}

Group.defaultProps = {
  defaultValue: {},
};
