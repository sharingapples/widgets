// @flow
import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  next: {
    fontSize: 17,
    paddingLeft: 15,
  },
});

type Props = {
  visible?: boolean,
  Minimized: ?Class<React.Component>,
  show: () => void,
  hide: () => void,
};

function Page({ visible, show, hide, Minimized, ...other }: Props) {
  return (
    <>
      {!visible && Minimized && <Minimized show={show} />}
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={hide}
        {...other}
      />
    </>
  );
}

Page.defaultProps = {
  visible: false,
};

Page.next = show => (
  <Text allowFontScaling={false} style={styles.next} onPress={show}>{'>'}</Text>
);

export default Page;
