import React from 'react';
import { Button } from 'react-native';
import { useFormSubmit } from '@sharingapples/form';

export default function Submit() {
  const submit = useFormSubmit();
  return <Button onPress={submit} title="Submit" />;
}
