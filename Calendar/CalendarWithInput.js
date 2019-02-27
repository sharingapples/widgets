// @flow
import React, { Component } from 'react';
import moment from 'moment';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Modal } from 'react-native';

import Calendar from './Calendar';

type Props = {
  onChange: () => void,
  value?: string,
  placeholder?: string,
  calendarDateFormat?: string,
  width?: number,
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
    value: '',
    placeholder: 'Select a date',
    calendarDateFormat: 'YYYY-MM-DD',
    width: 300,
    defaultView: 'day',
  };

  state = {
    calendarVisible: false,
    selectedDate: this.props.value && moment(this.props.value),

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
      width,
      defaultView,
    } = this.props;
    const { calendarVisible, selectedDate } = this.state;
    const calendarProps = {
      width, defaultView,
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
                    value={selectedDate}
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
