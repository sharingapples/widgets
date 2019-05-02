import { useEffect, useState } from 'react';
import { useEditor } from './Editor';

export default function useFormValue(name, parent = null) {
  const { subscribe, getState } = useEditor(parent);
  const [value, setValue] = useState(() => (
    typeof name === 'function' ? name(getState()) : getState()[name]
  ));

  useEffect(() => {
    return subscribe(name, setValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return value;
}
