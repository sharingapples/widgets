// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from './IconButton';
import Button from './Button';
import left from '../assets/left.png';
import right from '../assets/right.png';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
});

type Props = {
  shift: number => void,
  action: () => void,
}

const Header = ({ shift, action }: Props) => (
  <View style={styles.container} pointerEvents="box-none">
    <IconButton icon={left} onPress={() => shift(-1)} />
    <View style={styles.row}>
      {action && <Button onPress={action} title={action.title} /> }
      <IconButton icon={right} onPress={() => shift(1)} />
    </View>
  </View>
);

export default Header;
