// @flow
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { useFormValidator } from '@sharingapples/form';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    minHeight: 44,
    alignItems: 'stretch',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 17,
  },
  error: {
    color: 'red',
  },
});

type Props = {
  name: String,
  label: string,
  validator: () => void,
  Type: () => React.Element,
};

export default function LineInput({ name, label, validator, Type, ...other }: Props) {
  const error = useFormValidator(name, validator);
  const inp = useRef();

  return (
    <View
      style={styles.container}
      onStartShouldSetResponderCapture={() => {
        if (inp.current && inp.current.focus) {
          inp.current.focus();
        } else {
          Keyboard.dismiss();
        }
      }}
    >
      <View style={styles.line}>
        <Text allowFontScaling={false} style={styles.label}>{label}</Text>
        <Type ref={inp} name={name} {...other} />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
