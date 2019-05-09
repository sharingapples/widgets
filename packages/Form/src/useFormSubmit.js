import { useEffect } from 'react';
import { useEditor } from './Editor';

export default function useFormSubmit() {
  const { submit, registerSubmit } = useEditor();
  useEffect(registerSubmit);
  return submit;
}
