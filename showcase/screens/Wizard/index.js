import React from 'react';
import Wizard from '@sharingapples/wizard';
import PageWithNoForm from './PageWithNoForm';
import PageWithForm from './PageWithForm';

function WizardShowCase() {
  return (
    <Wizard onComplete={() => alert('This was last page in wizard')}>
      <PageWithForm />
      <PageWithNoForm />
    </Wizard>
  );
}

WizardShowCase.title = 'Wizard';

export default WizardShowCase;
