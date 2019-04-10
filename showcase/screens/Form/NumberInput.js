import React, { useState } from 'react';
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

function toText(v) {
  return `${v || 0}`;
}

export default function NumberInput({ name, ...other }) {
  const [value, onChange] = useFormInput(name);
  const [num, setNum] = useState(toText(value));

  return (
    <RNTextInput
      {...other}
      style={styles.input}
      value={num}
      onChangeText={setNum}
      onBlur={() => {
        const v = parseFloat(num) || 0;
        setNum(toText(v));
        onChange(v);
      }}
    />
  );
}
