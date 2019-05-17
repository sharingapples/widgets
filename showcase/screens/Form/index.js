import React from 'react';
import { View } from 'react-native';
import StatusBar from '@sharingapples/status-bar';
import { Form } from '@sharingapples/form';
import Profile from './Profile';

const handleSubmit = (state) => {
  console.log('Submit Data', state);
};

export default function FormShowcase() {
  return (
    <>
      <StatusBar>Form</StatusBar>
      <View style={{ flex: 1 }}>
        <Form onSubmit={handleSubmit} defaultValue={{ married: true, kids: 0 }}>
          <Profile />
        </Form>
      </View>
    </>
  );
}

FormShowcase.title = 'Form';
