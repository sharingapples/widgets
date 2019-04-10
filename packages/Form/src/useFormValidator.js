import { useState, useEffect } from 'react';
import { useEditor } from './Editor';

function getInitialValue(getState, check) {
  const state = getState();
  if (typeof check === 'function') {
    return check(state);
  }
  return state[check];
}

export default function useFormValidator(check, validator) {
  const { getState, subscribe } = useEditor();
  const [error, setError] = useState(null);

  useEffect(() => {
    let original = getInitialValue(getState, check);
    let currentValidation = 0;
    async function handler(value) {
      if (value !== original) {
        const prev = original;
        original = value;
        if (typeof validator === 'string') {
          if (!value) setError(validator);
        } else {
          currentValidation += 1;
          const vl = currentValidation;
          try {
            await validator(value, prev);
          } catch (err) {
            if (vl === currentValidation) {
              setError(err.message);
            }
          }
        }
      }
    }
    const unsub = subscribe(check, handler);
    return () => {
      currentValidation = null;
      unsub();
    };

  // The context values are kept constant for the entire
  // life of the component, so ignoring those values
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check, validator]);

  return error;
}
