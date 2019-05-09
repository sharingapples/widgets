// @flow
import React from 'react';
import useFormInput from './useFormInput';
import Editor, { useEditor } from './Editor';

type Props = {
  name: string | number,
  defaultValue?: {},
  onSubmit: ?((v: {}) => void),
};

export default function Group({ name, onSubmit, defaultValue, ...other }: Props) {
  const [value, onChange] = useFormInput(name, defaultValue);
  const parent = useEditor();

  return (
    <Editor
      {...other}
      value={value}
      parent={parent}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

Group.defaultProps = {
  defaultValue: {},
};
