import React from 'react';
import { View } from 'react-native';
import StatusBar from '@sharingapples/status-bar';
import { Form } from '@sharingapples/form';
import Profile from './Profile';


export default function FormShowcase() {
  const handleSubmit = (state) => {
    console.log('Submit Data', state);
  };

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
