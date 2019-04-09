import { useContext, useEffect, useState } from 'react';
import { EditorContext } from './Editor';

export default function useFormValue(input, context = null) {
  const currentContext = useContext(EditorContext);
  const { get, getState, registerListener } = context || currentContext;

  const [value, setValue] = useState(() => {
    if (typeof input === 'string') {
      return get(input);
    }

    return input(getState());
  });

  useEffect(() => registerListener(input, setValue), [input]);
  return value;
}
