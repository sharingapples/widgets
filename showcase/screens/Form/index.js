import React from 'react';
import { ScrollView } from 'react-native';
import StatusBar from '@sharingapples/status-bar';
import Profile from './Profile';

export default function FormShowcase() {
  return (
    <>
      <StatusBar title="Form" />
      <ScrollView>
        <Profile />
      </ScrollView>
    </>
  );
}

FormShowcase.title = 'Form';
