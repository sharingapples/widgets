import React from 'react';
import { View, TextInput } from 'react-native';
import FormPage from '@sharingapples/wizard/form/FormPage';
import LineInput from '../Form/LineInput';

function PageWithForm() {
  return (
    <FormPage group="personal" nextTitle="Next" title="Page 1">
      <LineInput name="name" label="Name" Type={TextInput} />
    </FormPage>
  );
}

export default PageWithForm;