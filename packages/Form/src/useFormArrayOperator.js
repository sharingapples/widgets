/* global __DEV__ */
import { useEditor, OP_ARRAY_INSERT, OP_ARRAY_REMOVE } from './Editor';

export default function useArrayOperator() {
  const { dispatch, getState } = useEditor();
  if (__DEV__) {
    if (!Array.isArray(getState())) {
      throw new Error('Trying to use an array operator without an array value');
    }
  }

  return {
    remove: idx => dispatch(idx, undefined, OP_ARRAY_REMOVE),
    insert: (idx, value) => dispatch(idx, value, OP_ARRAY_INSERT),
  };
}
