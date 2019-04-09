import { useState, useEffect, useContext } from 'react';
import { EditorContext } from './Editor';

export default function useFormValidator(input, validators) {
  const { registerValidator } = useContext(EditorContext);
  const [error, setError] = useState(null);

  useEffect(() => registerValidator(input, validators, setError), [validators]);
  return error;
}
