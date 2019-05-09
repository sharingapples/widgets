import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ArrayGroup, Group, useFormValidator, useFormValue } from '@sharingapples/form';
import { getTheme } from '@sharingapples/theme';
import LineInput from './LineInput';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import IntegerInput from './IntegerInput';
import Submit from './Submit';
import Switch from './Switch';
import PersonalInfo from './PersonalInfo';
import Page from './Page';
import GroupInput from './GroupInput';

const theme = getTheme();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function Kids() {
  const n = useFormValue('kids');

  const elems = [];
  for (let i = 0; i < n; i += 1) {
    elems.push((
      <LineInput
        key={i}
        name={i}
        label={`Kid ${i + 1}`}
        Type={GroupInput}
        GroupForm={PersonalInfo}
      />
    ));
  }
  return (
    <ArrayGroup name="kidsInfo">
      {elems}
    </ArrayGroup>
  );
}

export default function Profile() {
  const married = useFormValue(state => state.married);
  return (
    <View style={styles.container}>
      <PersonalInfo />
      <LineInput name="married" label="Married" Type={Switch} />
      {married && (
        <>
          <LineInput name="spouse" label="Spouse" Type={GroupInput} GroupForm={PersonalInfo} />
          <LineInput name="kids" label="Kids" Type={IntegerInput} min={0} />
          <Kids />
        </>
      )}
      <Submit />
    </View>
  );
}
