// @flow
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import Back from './Back.png';

type Props = {
  onChange: (value: Date) => void,
  value?: string,
  width?: number,
  defaultView?: string,
  selectedDateColor?: string,
}

type State = {
  currentDate: string,
  activeView: string,
}

const calPadding = 5;

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
  isSelectedContainer: { borderRadius: 5 },
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
    width: 300,
    value: '',
    defaultView: 'day',
    selectedDateColor: '#ffd400',
  };

  constructor(props) {
    super(props);
    const { defaultView, value } = this.props;
    this.state = {
      activeView: defaultView,
      currentDate: value
        ? moment(value).startOf(calendarData.formats[defaultView])
        : moment().startOf(calendarData.formats[defaultView]),
    };
  }

  dayCellDimension = () => {
    const { width } = this.props;
    return {
      width: (width - (2 * calPadding)) / 7,
      height: (width - (2 * calPadding)) / 7,
    };
  }

  cellDimension = () => {
    const { width } = this.props;
    return {
      width: (width - (2 * calPadding)) / 4,
      height: (width - (2 * calPadding)) / 4,
    };
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
        return <Text />;
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
    const { activeView } = this.state;
    return activeView === 'day' ? this.renderDays() : this.renderYearsOrMonths();
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
    const { value, selectedDateColor } = this.props;
    const { currentDate } = this.state;
    const selectedDate = value && moment(value).format('dd');
    const selectedMonth = value && moment(value).format('YYYYMM') === currentDate.format('YYYYMM');

    return (
      <View style={[styles.calRow, { paddingBottom: 5 }]}>
        {
          ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((v, i) => {
            const isSelected = selectedMonth && selectedDate === v;
            return (
              <View key={`${v}${i + 1}`} style={[styles.calCell, isSelected ? { borderBottomColor: selectedDateColor, borderBottomWidth: 2 } : {}]}>
                <Text style={{ color: 'grey' }}>{v}</Text>
              </View>
            );
          })
        }
      </View>
    );
  }

  renderWeeks = (date, monthIndex) => {
    const { value, selectedDateColor } = this.props;
    return (
      <View key={date} style={styles.calRow}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const daysDate = date.clone().add(i, 'd');
          const isCurrentMonth = daysDate.month() === monthIndex;
          const isPast = daysDate.diff(moment(), 'd') < 0;

          const extraStyle = !isPast && isCurrentMonth ? { color: 'black', fontWeight: 'bold' } : { color: 'grey' };

          const isSelected = value && moment(value).diff(daysDate, 'd') === 0;

          return (
            <TouchableOpacity
              key={`${daysDate}${i}`}
              style={[
                styles.calCell,
                this.dayCellDimension,
                isSelected
                  ? { ...styles.isSelectedContainer, backgroundColor: selectedDateColor }
                  : {},
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
  }

  renderYearsOrMonths = () => {
    const { currentDate, activeView } = this.state;
    const { value, selectedDateColor } = this.props;
    const dateAddFormat = calendarData.formats[activeView];
    const headerFormat = calendarData.header[activeView];
    const checkIfSelectedFormat = activeView === 'month' ? 'YYYYMMM' : 'YYYY';
    const selectedDateText = value && moment(value).format(checkIfSelectedFormat);
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
            isSelectedView
              ? { ...styles.isSelectedContainer, backgroundColor: selectedDateColor }
              : {},
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
    const { onChange } = this.props;

    if (activeView === 'day') {
      if (onChange) onChange(date);
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

  render() {
    const {
      width,
    } = this.props;
    const { activeView } = this.state;

    return (
      <View style={[styles.container, { width }]}>
        <View
          style={[styles.calRow, { paddingTop: calPadding * 2, paddingBottom: calPadding * 2 }]}
        >
          {this.renderToggleArrow('prev')}
          <View style={styles.centerItems}>
            {this.renderHeader()}
          </View>
          {this.renderToggleArrow('next')}
        </View>
        <View style={{ padding: calPadding }}>
          {activeView === 'day' ? this.renderWeekDays() : null}
          {this.renderData()}
        </View>
      </View>
    );
  }
}

export default Calendar;
