import { useState, useContext, useCallback } from 'react';
import { EditorContext } from './Editor';

export default function useFormInput(name, defaultValue, valueOnBlur, valueOnFocus) {
  const { get, set } = useContext(EditorContext);

  // Get the current value
  const currentValue = get(name, defaultValue);
  const [value, setValue] = useState(currentValue);

  const onChange = useCallback(
    (newValue) => {
      setValue(newValue);
      set(name, newValue);
    },
    [set]
  );

  const onBlur = useCallback(
    () => {
      const v = get(name);
      setValue(valueOnBlur ? valueOnBlur(v) : v);
    },
    [valueOnBlur]
  );

  const onFocus = useCallback(
    () => {
      const v = get(name);
      setValue(valueOnFocus ? valueOnFocus(v) : v);
    },
    [valueOnFocus]
  );

  return {
    value,
    onChange,
    onFocus,
    onBlur,
  };
}
