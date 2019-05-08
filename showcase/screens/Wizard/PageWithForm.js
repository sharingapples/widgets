import React from 'react';
import { View, TextInput } from 'react-native';
import FormPage from '@sharingapples/wizard/form/FormPage';
import { Form } from '@sharingapples/form';
import LineInput from '../Form/LineInput';

function SecondPage() {
  return (
    <Form onSubmit={v => console.log('submit', v)}>
      <FormPage group="personal" nextTitle="Next" prevTitle="Prev" title="Page 1">
        <LineInput name="name" label="Name" Type={TextInput} />
      </FormPage>
    </Form>
  );
}

export default SecondPage;
