import React from 'react';
import Wizard from '@sharingapples/wizard';
import { Form } from '@sharingapples/form';
import PageWithNoForm from './PageWithNoForm';
import PageWithForm from './PageWithForm';

function WizardShowCase() {
  return (
    <Form onSubmit={v => console.log('submit', v)}>
      <Wizard onComplete={() => alert('This was last page in wizard')}>
        <PageWithForm />
        <PageWithNoForm />
      </Wizard>
    </Form>
  );
}

WizardShowCase.title = 'Wizard';

export default WizardShowCase;
