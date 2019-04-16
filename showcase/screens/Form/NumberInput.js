// @flow
import React, { useState } from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import { useFormInput } from '@sharingapples/form';

const styles = StyleSheet.create({
  input: {
    flex: 1,
    textAlign: 'right',
    padding: 0,
    fontSize: 17,
  },
});

function toText(v) {
  return `${v || 0}`;
}

type Props = {
  name: String,
};

function NumberInput({ name, ...other }: Props, ref) {
  const [value, onChange] = useFormInput(name, 0);
  return (
    <RNTextInput
      ref={ref}
      {...other}
      style={styles.input}
      defaultValue={toText(value)}
      onChangeText={(text) => {
        const v = parseFloat(text) || 0;
        onChange(v);
      }}
    />
  );
}

export default React.forwardRef(NumberInput);
