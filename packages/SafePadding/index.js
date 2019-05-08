// @flow
import { Platform, NativeModules } from 'react-native';

type Rect = {
  top: number,
  bottom: number,
  left: number,
  right: number,
};

const SafePadding: Rect = {
  top: Platform.OS === 'ios' ? NativeModules.RNSafePadding.top : 0,
  bottom: Platform.OS === 'ios' ? NativeModules.RNSafePadding.bottom : 0,
  left: 0,
  right: 0,
};

export default SafePadding;
