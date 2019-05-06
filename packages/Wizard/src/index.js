// @flow
import React, { useState, useContext } from 'react';

const WizardContext = React.createContext();

export function useWizard() {
  return useContext(WizardContext);
}

type Props = {
  children: React.Node,
  start?: number,
  onComplete: () => any,
}

function Wizard({ children, start, onComplete }: Props) {
  const [page, setPage] = useState(Number(start));
  const pages = React.Children.toArray(children);
  const next = page === (pages.length - 1) ? onComplete : () => setPage(p => p + 1);
  const prev = () => setPage(p => p - 1);

  const currentPage = pages[page];
  const context = { next, prev, page };

  return (
    <WizardContext.Provider value={context}>
      {currentPage}
    </WizardContext.Provider>
  );
}

Wizard.defaultProps = { start: 0 };


export default Wizard;
