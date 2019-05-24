// @flow
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';


type Props = {
  onPress: number => void,
  icon: number,
}

const IconButton = ({ onPress, icon }: Props) => (
  <TouchableOpacity
    onPressIn={() => onPress(-1)}
    hitSlop={{ top: 15, bottom: 15, left: 20, right: 20 }}
  >
    <Image source={icon} />
  </TouchableOpacity>
);

export default IconButton;
