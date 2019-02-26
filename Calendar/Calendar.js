// @flow
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import Back from './Back.png';

type Props = {
  onChange: () => void,
  selected?: string,
  calPadding?: number,
  calWidth?: number,
  calendarDateFormat?: string,
  defaultView?: string,
  close?: () => void,
}

type State = {
  currentDate: string,
  activeView: string,
}

const BRAND_COLOR = '#ffd400';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  headerStyle: { fontSize: 20, fontWeight: 'bold' },
  headerDayMonth: { paddingRight: 10 },
  calRow: { flexDirection: 'row', justifyContent: 'space-between' },
  centerItems: { alignItems: 'center', justifyContent: 'center' },
  calCell: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  isSelectedContainer: { borderRadius: 5, backgroundColor: BRAND_COLOR },
  isSelectedText: { color: 'white' },
});

const calendarData = {
  toggleDate: {
    day: 1,
    month: 12,
    year: 12,
  },
  formats: {
    day: 'M',
    month: 'M',
    year: 'y',
  },
  header: {
    month: 'MMM',
    year: 'YYYY',
  },
};
class Calendar extends PureComponent<Props, State> {
  static defaultProps = {
    calWidth: 300,
    calPadding: 5,
    selected: '',
    calendarDateFormat: 'YYYY-MM-DD',
    defaultView: 'day',
    close: () => {},
  };

  state = {
    activeView: this.props.defaultView,
    currentDate: this.props.selected
      ? moment(this.props.selected).startOf(calendarData.formats[this.props.defaultView])
      : moment().startOf(calendarData.formats[this.props.defaultView]),
  }

  dayCellDimension = {
    width: (this.props.calWidth - (2 * this.props.calPadding)) / 7,
    height: (this.props.calWidth - (2 * this.props.calPadding)) / 7,
  }

  cellDimension = {
    width: (this.props.calWidth - (2 * this.props.calPadding)) / 4,
    height: (this.props.calWidth - (2 * this.props.calPadding)) / 4,
  }

  render() {
    const {
      calWidth, calPadding, close,
    } = this.props;

    return (
      <View style={[styles.container, { width: calWidth }]}>
        <TouchableOpacity
          style={[styles.calRow, { paddingTop: calPadding * 2, paddingBottom: calPadding * 2 }]}
          onPress={close}
        >
          {this.renderToggleArrow('prev')}
          <View style={styles.centerItems}>
            {this.renderHeader()}
          </View>
          {this.renderToggleArrow('next')}
        </TouchableOpacity>
        <View style={{ padding: calPadding }}>
          {this.state.activeView === 'day' ? this.renderWeekDays() : null}
          {this.renderData()}
        </View>
      </View>
    );
  }

  renderHeader = () => {
    const { activeView, currentDate } = this.state;
    switch (activeView) {
      case 'day':
        return (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => this.onViewChange('month')}>
              <Text style={[styles.headerStyle, styles.headerDayMonth]}>
                {currentDate.format('MMMM')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onViewChange('year')}>
              <Text style={styles.headerStyle}>
                {currentDate.format('YYYY')}
              </Text>
            </TouchableOpacity>
          </View>
        );
      case 'month':
        return (
          <TouchableOpacity onPress={() => this.onViewChange('year')}>
            <Text style={styles.headerStyle}>{currentDate.format('YYYY')}</Text>
          </TouchableOpacity>
        );
      default:
        return <TouchableOpacity onPress={this.props.close}><Text>Cancel</Text></TouchableOpacity>;
    }
  }

  renderToggleArrow = (toggle) => {
    const arrowStyle = toggle === 'next' ? { transform: [{ rotate: '180deg' }] } : {};
    return (
      <TouchableOpacity style={styles.centerItems} onPress={() => this.changeDate(toggle)}>
        <Image source={Back} style={arrowStyle} />
      </TouchableOpacity>
    );
  }

  renderData = () => {
    return this.state.activeView === 'day' ? this.renderDays() : this.renderYearsOrMonths();
  }

  renderDays = () => {
    const { currentDate } = this.state;
    const monthIndex = currentDate.month();
    const day = currentDate.clone().startOf('month').startOf('week');
    let done = false;
    const dayDates = [];

    while (!done) {
      dayDates.push(this.renderWeeks(day.clone(), monthIndex));
      day.add(7, 'd');
      done = monthIndex !== day.month();
    }

    return dayDates;
  }

  renderWeekDays = () => {
    const { selected } = this.props;
    const { currentDate } = this.state;
    const selectedDate = selected && moment(selected).format('dd');
    const selectedMonth = selected && moment(selected).format('YYYYMM') === currentDate.format('YYYYMM');

    return (
      <View style={[styles.calRow, { paddingBottom: 5 }]}>
        {
          ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((v, i) => {
            const isSelected = selectedMonth && selectedDate === v;
            return (
              <View key={`${v}${i + 1}`} style={[styles.calCell, isSelected ? { borderBottomColor: BRAND_COLOR, borderBottomWidth: 2 } : {}]}>
                <Text style={{ color: 'grey' }}>{v}</Text>
              </View>
            );
          })
        }
      </View>
    );
  }

  renderWeeks = (date, monthIndex) => (
    <View key={date} style={styles.calRow}>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const daysDate = date.clone().add(i, 'd');
        const isCurrentMonth = daysDate.month() === monthIndex;
        const isPast = daysDate.diff(moment(), 'd') < 0;

        const extraStyle = !isPast && isCurrentMonth ? { color: 'black', fontWeight: 'bold' } : { color: 'grey' };

        const isSelected = this.props.selected && moment(this.props.selected).diff(daysDate, 'd') === 0;

        return (
          <TouchableOpacity
            key={`${daysDate}${i}`}
            style={[
              styles.calCell,
              this.dayCellDimension,
              isSelected ? styles.isSelectedContainer : {},
            ]}
            onPress={() => !isPast && this.handleCellPress(daysDate)}
          >
            <Text style={[styles.calText, extraStyle, isSelected ? styles.isSelectedText : {}]}>
              {daysDate.format('D')}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  renderYearsOrMonths = () => {
    const { currentDate, activeView } = this.state;
    const { selected } = this.props;
    const dateAddFormat = calendarData.formats[activeView];
    const headerFormat = calendarData.header[activeView];
    const checkIfSelectedFormat = activeView === 'month' ? 'YYYYMMM' : 'YYYY';
    const selectedDateText = selected && moment(selected).format(checkIfSelectedFormat);
    const dataChunks = [];

    const chunkData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((j) => {
      const dates = currentDate.clone().add(j, dateAddFormat);
      const isSelectedView = dates.format(checkIfSelectedFormat) === selectedDateText;
      const extraStyle = { fontWeight: 'bold', color: 'black' };

      return (
        <TouchableOpacity
          key={j}
          onPress={() => this.handleCellPress(dates)}
          style={[
            styles.calCell,
            this.cellDimension,
            isSelectedView ? styles.isSelectedContainer : {}
          ]}
        >
          <Text
            style={[
              styles.calText,
              extraStyle,
              isSelectedView ? styles.isSelectedText : {},
            ]}
          >
            {dates.format(headerFormat)}
          </Text>
        </TouchableOpacity>
      );
    });

    for (let i = 0; i < 12; i += 4) {
      dataChunks.push(
        <View key={i} style={styles.calRow}>
          {chunkData.slice(i, i + 4)}
        </View>
      );
    }

    return dataChunks;
  }

  handleCellPress = (date) => {
    const { activeView } = this.state;
    const { calendarDateFormat, onChange } = this.props;

    if (activeView === 'day') {
      if (onChange) onChange(date.format(calendarDateFormat));
    } else if (activeView === 'month') {
      this.setState({ activeView: 'day', currentDate: date });
    } else if (activeView === 'year') {
      this.setState({ activeView: 'month', currentDate: date });
    }
  }

  changeDate = (toggle) => {
    const { activeView, currentDate } = this.state;
    const nextValue = calendarData.toggleDate[activeView];
    const nextFormat = calendarData.formats[activeView];
    const nextDate = toggle === 'next'
      ? currentDate.clone().add(nextValue, nextFormat)
      : currentDate.clone().subtract(nextValue, nextFormat);

    this.setState({ currentDate: nextDate });
  }

  onViewChange = view => this.setState(prevState => ({ currentDate: prevState.currentDate.startOf('year'), activeView: view }));
}

export default Calendar;
