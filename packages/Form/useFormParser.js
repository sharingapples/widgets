import { useContext, useEffect } from 'react';
import { EditorContext } from './Editor';

export default function useFormParser(name, parser) {
  const { registerParser } = useContext(EditorContext);
  useEffect(() => registerParser(name, parser), [parser, name]);
}
