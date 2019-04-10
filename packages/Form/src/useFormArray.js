import { useContext, useRef } from 'react';
import { EditorContext } from './Editor';
import useFormValue from './useFormValue';

export default function useFormArray(name, defaultValue) {
  const editor = useRef();
  const { set } = useContext(EditorContext);

  // TODO: the items value should be available via 'get' with changes
  const items = useFormValue(name) || [];

  return {
    editor,
    add: () => {
      const idx = items.length;
      const value = items[idx] || defaultValue;
      const onChange = (v) => {
        const newItems = items.concat(v);
        set(name, newItems);
      };

      editor.current.edit({ value, onChange });
    },
    all: iterator => items.map((item, idx) => {
      const options = {
        get insert() {
          return () => {
            const newItems = items.slice();
            newItems.splice(idx, 0, defaultValue);
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
