/* global __DEV__ */
import { useMemo } from 'react';
import { useEditor, OP_ARRAY_INSERT, OP_ARRAY_REMOVE, OP_ARRAY_CLEAR } from './Editor';

export default function useFormArray() {
  const { dispatch, getState } = useEditor();

  if (__DEV__) {
    if (!Array.isArray(getState())) {
      throw new Error('Trying to use an array operator without an array value');
    }
  }

  const operators = useMemo(() => ({
    remove: idx => dispatch(idx, undefined, OP_ARRAY_REMOVE),
    insert: (idx, value) => dispatch(idx, value, OP_ARRAY_INSERT),
    add: value => dispatch(-1, value, OP_ARRAY_INSERT),
    clear: () => dispatch(null, null, OP_ARRAY_CLEAR),
  }), []);

  return (cb) => {
    return cb(getState(), operators);
  };
}
