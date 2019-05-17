import Form from './Form';
import Group from './Group';
import ArrayGroup from './ArrayGroup';

import useFormInput from './useFormInput';
import useFormSubmit from './useFormSubmit';
import useFormValidator from './useFormValidator';
import useFormValue from './useFormValue';
import useFormParent from './useFormParent';
import useFormArrayOperator from './useFormArrayOperator';

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
  ArrayGroup,

  useFormInput,
  useFormSubmit,
  useFormValidator,
  useFormValue,
  useFormParent,
  useFormArrayOperator,
};
