// @flow
import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import { useFormInput } from '@sharingapples/form';

const styles = StyleSheet.create({
  input: {
    margin: 5,
    padding: 5,
    backgroundColor: '#ccc',
    borderWidth: 0,
  },
});

type Props = {
  name: String,
};

export default function TextInput({ name, ...other }: Props) {
  const [value, onChange] = useFormInput(name);
  return (
    <RNTextInput
      {...other}
      style={styles.input}
      value={value}
      onChangeText={onChange}
    />
  );
}
