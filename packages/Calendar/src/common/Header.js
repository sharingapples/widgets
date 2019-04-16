// @flow
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getTheme } from '@sharingapples/theme';
import right from '../assets/right.png';
import left from '../assets/left.png';

const theme = getTheme();
const calendarTheme = theme.onCalendar || theme;
const textColor = calendarTheme.onBackground;
const primaryColor = calendarTheme.primary;


const styles = StyleSheet.create({
  container: {
    borderBottomColor: theme.colorDisabled,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 5,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: textColor,
    fontWeight: 'bold',
  },
  clearTextContainer: {
    marginLeft: 15,
  },
  clearText: {
    fontSize: 14,
    color: primaryColor,
  },
  dayContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 3,
    marginBottom: 5,
  },
  dayText: {
    flex: 1,
    fontSize: 12,
    color: textColor,
    textAlign: 'center',
  },
  left: {
    position: 'absolute',
    left: 0,
  },
  right: {
    position: 'absolute',
    right: 0,
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10,
    tintColor: textColor,
  },
});

type Props = {
  date: {},
  prev: boolean,
  next: boolean,
  shift: number => void,
  headerTitle: React.Node => void,
  headerContents: React.Node => void,
}


function Header({
  prev,
  next,
  shift,
  headerTitle,
  headerContents,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {headerTitle}
        </View>
        {prev && (
          <View style={styles.left}>
            <TouchableOpacity onPress={() => shift(-1)}>
              <Image source={left} style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}

        {next && (
          <View style={styles.right}>
            <TouchableOpacity onPress={() => shift(1)}>
              <Image source={right} style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {headerContents}
    </View>
  );
}

export default React.memo(Header);
