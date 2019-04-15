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
  const { getState, subscribe, validate } = useEditor();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!validator) return undefined;

    let original = getInitialValue(getState, check);
    let currentValidation = 0;

    const validation = validate(check, (value) => {
      if (typeof validator === 'string') {
        if (!value) {
          setError(validator);
          return false;
        }
        setError(null);
        return true;
      }

      // Keep track for async validators, which
      // might become obsolete when values change
      // faster than the validation is completed
      // think ajax based validations
      currentValidation += 1;
      const vl = currentValidation;
      try {
        const res = validator(value);
        // Support asynchrnous validation
        if (!res || !res.then) {
          setError(null);
          return true;
        }

        return res.then(() => {
          if (vl === currentValidation) {
            setError(null);
          }
          return true;
        }).catch((err) => {
          if (vl === currentValidation) {
            setError(err.message);
          }
          return false;
        });
      } catch (err) {
        setError(err.message);
        return false;
      }
    });

    function handler(value) {
      if (value !== original) {
        original = value;
        validation.run(value);
      }
    }

    const unsub = subscribe(check, handler);
    return () => {
      currentValidation = null;
      validation.remove();
      unsub();
    };

  // The context values are kept constant for the entire
  // life of the component, so ignoring those values
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check, validator]);

  return error;
}
