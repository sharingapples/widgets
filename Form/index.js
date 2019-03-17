import Form from './Form';
import Group from './Group';
import Editor from './Editor';

import useFormArray from './useFormArray';
import useFormInput from './useFormInput';
import useFormSubmit from './useFormSubmit';
import useFormValidator from './useFormValidator';
import useFormValue from './useFormValue';
import useFormParser from './useFormParser';
import useFormParent from './useFormParent';

export function pipe(...validators) {
  return (value) => {
    for (let i = 0; i < validators.length; i += 1) {
      validators[i](value);
    }
  };
}

export {
  Form,
  Group,
  Editor,

  pipe,

  useFormArray,
  useFormInput,
  useFormSubmit,
  useFormValidator,
  useFormValue,
  useFormParser,
  useFormParent,
};
