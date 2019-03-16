import { useContext, useEffect } from 'react';
import { EditorContext } from './Editor';

export default function useFormSubmit() {
  const { submit, addSubmit } = useContext(EditorContext);
  useEffect(addSubmit, [addSubmit]);

  return submit;
}
