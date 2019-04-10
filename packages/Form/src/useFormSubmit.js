import { useEditor } from './Editor';

export default function useFormSubmit() {
  const { submit } = useEditor();
  return submit;
}
