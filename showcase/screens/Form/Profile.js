import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Form } from '@sharingapples/form';
import { getTheme } from '@sharingapples/theme';
import TextInput from './TextInput';
import NumberInput from './NumberInput';

const theme = getTheme();

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: theme.surface,
  },
});

export default function Profile() {
  return (
    <View style={styles.container}>
      <Form>
        <TextInput name="name" placeholder="Name" />
        <NumberInput name="age" placeholder="Age" />
      </Form>
    </View>
  );
}
