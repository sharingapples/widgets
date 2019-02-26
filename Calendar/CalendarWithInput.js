// @flow
import React, { Component } from 'react';
import moment from 'moment';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Modal } from 'react-native';

import Calendar from './Calendar';

type Props = {
  onChange: () => void,
  selected?: string,
  placeholder?: string,
  calendarDateFormat?: string,
  calPadding?: number,
  calWidth?: number,
  defaultView?: string,
}

type State = {
  calendarVisible: boolean,
  selectedDate: object,
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  inner: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class CalendarWithInput extends Component<Props, State> {
  static defaultProps = {
    selected: '',
    placeholder: 'Select a date',
    calendarDateFormat: 'YYYY-MM-DD',
    calWidth: 300,
    calPadding: 5,
    defaultView: 'day',
  };

  constructor(props) {
    super(props);
    const { selected } = this.props;

    this.state = {
      calendarVisible: false,
      selectedDate: selected && moment(selected),
    };
  }

  handleChange = (date) => {
    const { onChange } = this.props;

    this.setState({ selectedDate: date });
    if (onChange) onChange(date);
    this.toggle();
  }

  toggle = () => this.setState(prevState => ({ calendarVisible: !prevState.calendarVisible }));

  render() {
    const {
      placeholder,
      calendarDateFormat,
      calPadding,
      calWidth,
      defaultView,
    } = this.props;
    const { calendarVisible, selectedDate } = this.state;
    const calendarProps = {
      calPadding, calWidth, defaultView, calendarDateFormat,
    };

    return (
      <>
        <TouchableOpacity onPress={this.toggle}>
          <Text>
            {selectedDate ? moment(selectedDate).format(calendarDateFormat) : placeholder}
          </Text>
        </TouchableOpacity>
        {calendarVisible && (
          <Modal animationType="fade" transparent>
            <TouchableWithoutFeedback style={styles.outer} onPress={this.toggle}>
              <View style={styles.outer}>
                <View style={styles.inner}>
                  <Calendar
                    onChange={this.handleChange}
                    selected={selectedDate}
                    close={this.toggle}
                    {...calendarProps}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </>
    );
  }
}

export default CalendarWithInput;
