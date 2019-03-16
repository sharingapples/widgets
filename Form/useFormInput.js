import { useState, useEffect, useContext, useCallback } from 'react';
import { EditorContext } from './Editor';

export default function useFormInput(name, defaultValue, valueOnBlur, valueOnFocus) {
  const { get, set } = useContext(EditorContext);

  // Get the current value
  const currentValue = get(name);
  const [value, setValue] = useState(
    currentValue === undefined ? defaultValue : currentValue
  );

  useEffect(
    () => {
      if (currentValue !== undefined && value !== currentValue) {
        setValue(currentValue);
      }
    },
    [currentValue]
  );

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
