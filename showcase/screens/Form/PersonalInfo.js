import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormValue } from '@sharingapples/form';
import LineInput from './LineInput';
import TextInput from './TextInput';
import NumberInput from './NumberInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'right',
    flex: 1,
    fontSize: 17,
  },
  arrow: {
    paddingLeft: 16,
    fontSize: 17,
  },
});

function Summary({ show }) {
  const name = useFormValue('name');
  return (
    <TouchableOpacity onPress={show} style={styles.container}>
      <Text allowFontScaling={false} style={styles.text}>{name}</Text>
      <Text allowFontScaling={false} style={styles.arrow}>→</Text>
    </TouchableOpacity>
  );
}

export default function PersonalInfo() {
  return (
    <>
      <LineInput label="Name" name="name" Type={TextInput} />
      <LineInput label="Age" name="age" Type={NumberInput} />
    </>
  );
}

PersonalInfo.Summary = Summary;
