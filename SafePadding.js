import { Platform, NativeModules } from 'react-native';

const SafePadding = {
  top: Platform.OS === 'ios' ? NativeModules.Screen.bottomMargin / 2 : 0,
  bottom: Platform.OS === 'ios' ? NativeModules.Screen.topMargin : 0,
};

export default SafePadding;
