// @flow
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';


type Props = {
  onPress: number => void,
  icon: number,
}

const IconButton = ({ onPress, icon }: Props) => (
  <TouchableOpacity
    onPress={() => onPress(-1)}
  >
    <Image source={icon} />
  </TouchableOpacity>
);

export default IconButton;
