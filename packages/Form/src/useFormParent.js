import { useEditor } from './Editor';

export default function useFormParent(parent = null) {
  const { getParent } = useEditor(parent);
  return getParent();
}
