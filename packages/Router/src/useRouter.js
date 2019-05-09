// @flow
import { useContext } from 'react';
import { RouterContext } from './Router';

type changeRoute = (path: string) => void;

export default function useRouter(): changeRoute {
  const ctx = useContext(RouterContext);
  return ctx.changeRoute;
}
