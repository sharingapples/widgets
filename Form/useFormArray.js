import { useContext, useRef } from 'react';
import { EditorContext } from './Editor';

export default function useFormArray(name) {
  const editor = useRef();
  const { get, set } = useContext(EditorContext);
  const items = get(name) || [];

  function onChange(idx) {
    return (value) => {
      if (items[idx] === value) {
        return items;
      }

      const newItems = items.slice();
      newItems[idx] = value;
      return newItems;
    };
  }

  return {
    editor,
    add: () => {
      editor.current.show(createContext(items.length));
    },
    all: iterator => items.map((item, idx) => {
      const insert = (value) => {
        const v = items.slice();
        v.splice(idx, 0, value);
        set(name, v);
      };
      const remove = () => {
        const v = items.slice();
        v.splice(idx, 1);
        set(name, v);
      };
      const edit = () => {
        editor.current.show(createContext(idx));
      };

      return iterator(item, { insert, remove, edit });
    }),
  };
}
