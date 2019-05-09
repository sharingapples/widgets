// @flow
import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFormInput } from '@sharingapples/form';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 17,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

type Props = {
  name: string,
  min: ?number,
  max: ?number,
}

function IntegerInput({
  name,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
}: Props, ref) {
  const [value, onChange] = useFormInput(name);
  console.log('Min', min);
  const incr = useCallback(() => onChange(v => (v < max ? v + 1 : max)), [max]);
  const decr = useCallback(() => onChange(v => (v > min ? v - 1 : min)), [min]);

  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.text} onPress={decr}>-</Text>
      <Text allowFontScaling={false} style={styles.text}>{value}</Text>
      <Text allowFontScaling={false} style={styles.text} ref={ref} onPress={incr}>+</Text>
    </View>
  );
}

export default React.forwardRef(IntegerInput);
