// @flow
import React from 'react';
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

type Props = {
  name: String,
};

function TextInput({ name, ...other }: Props, ref) {
  const [value, onChange] = useFormInput(name);
  return (
    <RNTextInput
      ref={ref}
      allowFontScaling={false}
      style={styles.input}
      value={value}
      onChangeText={onChange}

    />
  );
}

export default React.forwardRef(TextInput);
