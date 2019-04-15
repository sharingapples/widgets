import React from 'react';
import { ScrollView, View, Keyboard, TextInput, NativeModules } from 'react-native';
import StatusBar from '@sharingapples/status-bar';
import { Form } from '@sharingapples/form';
import Profile from './Profile';


export default function FormShowcase() {
  const handleSubmit = (state) => {
    console.log('Submit Data', state);
  };

  return (
    <>
      <StatusBar title="Form" />
      <View
        style={{ flex: 1 }}
        onStartShouldSetResponderCapture={(e) => {
          // Mechanism to hide the keyboard when input elements other
          // than text input are pressed.
          // This mechanism uses a obscure React Fibre property to detect
          // if the target type is an input element, in which case the
          // keyboard should not be hidden
          // eslint-disable-next-line no-underscore-dangle
          const type = e._targetInst && e._targetInst.type;
          // if (!(type === 'RCTMultilineTextInputView' || type === 'RCTSinglelineTextInputView' || type === 'AndroidTextInput')) {
            // Keyboard.dismiss();
          // }
          // return false;
        }}
      >
        <Form onSubmit={handleSubmit} defaultValue={{ married: true, kids: 0 }}>
          <Profile />
        </Form>
      </View>
    </>
  );
}

FormShowcase.title = 'Form';
