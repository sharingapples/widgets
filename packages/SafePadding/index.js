
import { Platform, NativeModules } from 'react-native';

const SafePadding = {
  top: Platform.OS === 'ios' ? NativeModules.RNSafePadding.top : 0,
  bottom: Platform.OS === 'ios' ? NativeModules.RNSafePadding.bottom : 0,
  left: 0,
  right: 0,
};

export default SafePadding;
