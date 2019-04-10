import { useEffect, useState } from 'react';
import { useEditor } from './Editor';

export default function useFormValue(name, parent = null) {
  const { subscribe, getState } = useEditor(parent);
  const [value, setValue] = useState(() => getState()[name]);

  useEffect(() => {
    return subscribe(name, setValue);
  }, [name]);

  return value;
}
