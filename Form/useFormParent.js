import { useContext } from 'react';
import { EditorContext } from './Editor';

export default function useFormParent(context = null) {
  const p = useContext(EditorContext);
  return context ? context.parent : p.parent;
}
