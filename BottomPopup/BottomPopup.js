// @flow
import React, { Component } from 'react';
import { StyleSheet, Animated, View, Text, Image, TouchableOpacity } from 'react-native';

import Close from './close.png';
import shadow from './shadow.png';

const styles = StyleSheet.create({
  container: {
    marginTop: -3,
  },
  shadow: {
    height: 3,
    width: '100%',
    resizeMode: 'stretch',
    zIndex: 99,
  },
  topBar: {
    flexDirection: 'row',
    padding: 10,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
  },
  close: {
    width: 16,
    height: 16,
  },
});

type Props = {
  visible: boolean,
  height: number,
  title: string,
  titleBack?: string,
  titleColor?: string,
  onClose: () => void,
  children: any,
};

class BottomPopup extends Component<Props> {
  static defaultProps = {
    titleBack: 'black',
    titleColor: 'white',
  };

  constructor(props) {
    super(props);

    this.anim = new Animated.Value(props.visible ? props.height : 0);
    this.animatedStyle = {
      height: this.anim,
    };
  }

  componentDidUpdate(prevProps) {
    const { visible, height } = this.props;
    if (prevProps.visible !== visible) {
      Animated.timing(this.anim, {
        toValue: visible ? height : 0,
        duration: 100,
      }).start();
    }
  }

  render() {
    const { title, titleBack, titleColor, onClose, children } = this.props;
    const titleElem = typeof title === 'string' ? (
      <Text
        allowFontScaling={false}
        style={[styles.title, { color: titleColor }]}
      >
        {title}
      </Text>
    ) : title;

    return (
      <Animated.View style={[styles.container, this.animatedStyle]}>
        <Image source={shadow} style={styles.shadow} />
        <View style={[styles.topBar, { backgroundColor: titleBack }]}>
          {titleElem}
          <TouchableOpacity onPress={onClose}>
            <Image source={Close} style={[styles.close, { tintColor: titleColor }]} />
          </TouchableOpacity>
        </View>
        {children}
      </Animated.View>
    );
  }
}

export default BottomPopup;
