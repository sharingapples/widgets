import React from 'react';
import { View, TextInput } from 'react-native';
import FormPage from '@sharingapples/wizard/form/FormPage';
import { Form } from '@sharingapples/form';
import LineInput from '../Form/LineInput';

function SecondPage() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Form onSubmit={v => console.log('submit', v)}>
        <FormPage group="personal" nextTitle="Next" prevTitle="Prev">
          <LineInput name="name" label="Name" Type={TextInput} />
        </FormPage>
      </Form>
    </View>
  );
}

export default SecondPage;
