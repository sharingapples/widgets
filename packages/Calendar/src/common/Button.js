// @flow
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { primaryColor } from '../theme';

type Props = {
  onPress: number => void,
  title: string,
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    marginRight: 10,
  },
  text: {
    color: primaryColor,
  },
});

const Button = ({ onPress, title }: Props) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => onPress()}
  >
    <Text style={styles.text} allowFontScaling={false}>{title}</Text>
  </TouchableOpacity>
);

export default Button;
