// @flow
import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import SafePadding from '@sharingapples/safe-padding';
import { getTheme } from '@sharingapples/theme';

// the safe offset required for iOS Home Bar
/** Minimum safe offset */
const safeOffset = Math.min(SafePadding.bottom, 12);
const behavior = Platform.OS === 'ios' ? 'height' : undefined;
const backgroundColor = getTheme().background;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor,
    paddingBottom: safeOffset,
  },
});

const RootView = props => (
  <KeyboardAvoidingView
    style={styles.root}
    behavior={behavior}
    keyboardVerticalOffset={-safeOffset}
    {...props}
  />
);

export default RootView;
