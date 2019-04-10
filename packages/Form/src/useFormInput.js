import { useState, useEffect, useCallback } from 'react';
import { useEditor } from './Editor';

export default function useFormInput(name) {
  const { subscribe, dispatch, getState } = useEditor();
  const [value, setValue] = useState(() => getState()[name]);

  useEffect(() => {
    return subscribe(name, setValue);
  // subscribe function is static
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const onChange = useCallback((newValue) => {
    dispatch(name, newValue);
    // dispatch function is static
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return [value, onChange];
}
