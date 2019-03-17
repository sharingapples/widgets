import { useContext, useRef } from 'react';
import { EditorContext } from './Editor';

export default function useFormArray(name, defaultValue) {
  const editor = useRef();
  const { get, set } = useContext(EditorContext);
  const items = get(name) || [];

  return {
    editor,
    add: (vv = defaultValue) => {
      const idx = items.length;
      const value = items[idx] || vv;

      const onChange = (v) => {
        const newItems = items.concat(v);
        set(name, newItems);
      };

      editor.current.edit({ value, onChange });
    },
    all: iterator => items.map((item, idx) => {
      const options = {
        get insert() {
          return (vv = defaultValue) => {
            const newItems = items.slice();
            newItems.splice(idx, 0, vv);
            set(name, newItems);
          };
        },
        get remove() {
          return () => {
            const newItems = items.slice();
            newItems.splice(idx, 1);
            set(name, newItems);
          };
        },
        get edit() {
          return () => {
            const value = items[idx];
            const onChange = (v) => {
              const newItems = items.slice();
              newItems[idx] = v;
              set(name, newItems);
            };
            editor.current.edit({ value, onChange });
          };
        },
      };
      return iterator(item, options);
    }),
  };
}
