// @flow
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Group, useFormSubmit } from '@sharingapples/form';
import { getTheme } from '@sharingapples/theme';
import { StatusBar } from '@sharingapples/widgets';
import { useWizard } from '../src';

const theme = getTheme();
const componentTheme = theme.Wizard || theme;
const { backgroundColor } = componentTheme;
const textColor = componentTheme.primary;

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  text: {
    fontSize: 14,
    color: textColor,
  },
});

type Props = {
  title: string,
  prevTitle: string,
  nextTitle: string,
  group: string,
  style: {},
}

type FooterButtonProps = {
  title: string,
  onPress: () => any,
}

function FooterButton({ title, onPress }: FooterButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text} allowFontScaling={false}>{title}</Text>
    </TouchableOpacity>
  );
}

type SubmitProps = {
  title: string,
}

function Submit({ title }: SubmitProps) {
  const submit = useFormSubmit();
  return <FooterButton title={title} onPress={submit} />;
}


function FormPage({ title, prevTitle, nextTitle, group, ...other }: Props) {
  const { prev, next } = useWizard();

  return (
    <>
      {!!title && <StatusBar backgroundColor={backgroundColor} title={title} light />}
      <Group name={group} onSubmit={next}>
        <ScrollView
          keyboardShouldPersistTaps="never"
          {...other}
        />
        <View style={styles.footer}>
          {prevTitle ? <FooterButton title={prevTitle} onPress={prev} /> : <View />}
          {nextTitle ? <Submit title={nextTitle} /> : <View />}
        </View>
      </Group>
    </>
  );
}

export default FormPage;
