// @flow
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import Back from './Back.png';

type Props = {
  onChange: (value: Date) => void,
  value?: Date,
  width?: number,
  defaultView?: string,
  selectedDateColor?: string,
}

type TogggleProps = {
  onPress: () => void,
}

type HeaderProps = {
  onPress: () => void,
  value: string,
}

type State = {
  activeView: string,
  currentMonth: Date,
  currentYear: Date,
}

const calPadding = 5;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: calPadding,
  },
  headerTextStyle: { fontSize: 20, fontWeight: 'bold' },
  headerStyle: { flexDirection: 'row' },
  headerTextContainer: { paddingRight: 10 },
  calRow: { flexDirection: 'row', justifyContent: 'space-between' },
  centerItems: { alignItems: 'center', justifyContent: 'center' },
  calCell: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  isSelectedContainer: { borderRadius: 5 },
  isSelectedText: { color: 'white' },
});

const Prev = ({ onPress }: TogggleProps) => (
  <TouchableOpacity style={styles.centerItems} onPress={onPress}>
    <Image source={Back} />
  </TouchableOpacity>
);

const Next = ({ onPress }: TogggleProps) => (
  <TouchableOpacity style={styles.centerItems} onPress={onPress}>
    <Image source={Back} style={{ transform: [{ rotate: '180deg' }] }} />
  </TouchableOpacity>
);

const Header = ({ value, onPress }: HeaderProps) => (
  <TouchableOpacity onPress={onPress} style={styles.headerTextContainer}>
    <Text style={styles.headerTextStyle}>
      {value}
    </Text>
  </TouchableOpacity>
);
class Calendar extends Component<Props, State> {
  static defaultProps = {
    width: 300,
    value: '',
    defaultView: 'day',
    selectedDateColor: '#ffd400',
  };

  state = {
    activeView: this.props.defaultView,
    currentDate: this.props.value 
      ? moment(this.props.value).startOf(this.props.defaultView === 'year' ? 'year' : 'month')
      : moment().startOf(this.props.defaultView === 'year' ? 'year' : 'month'),
  };

  dayCellDimension = () => {
    const { width } = this.props;
    return {
      width: (width - (2 * calPadding)) / 8,
      height: (width - (2 * calPadding)) / 8,
    };
  }

  cellDimension = () => {
    const { width } = this.props;
    return {
      width: (width - (2 * calPadding)) / 4,
      height: (width - (2 * calPadding)) / 4,
    };
  }

  renderYearsOrMonths = (dateFormat, headerFormat, changeView) => {
    const { currentDate, activeView } = this.state;
    const { value, selectedDateColor } = this.props;
    const checkIfSelectedFormat = activeView === 'month' ? 'YYYYMMM' : 'YYYY';
    const selectedDateText = value && moment(value).format(checkIfSelectedFormat);

    const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((j) => {
      const dates = currentDate.clone().add(j, dateFormat);
      const isSelectedView = dates.format(checkIfSelectedFormat) === selectedDateText;
      const extraStyle = { fontWeight: 'bold', color: 'black' };

      return (
        <TouchableOpacity
          key={j}
          onPress={() => this.setState({ currentDate: dates, activeView: changeView })}
          style={[
            styles.centerItems,
            this.cellDimension(),
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

    return data;
  };

  renderMonthContent = () => this.renderYearsOrMonths('M', 'MMM', 'day');

  renderYearContent = () => this.renderYearsOrMonths('y', 'YYYY', 'month');

  renderDayContent = () => {
    const { currentDate } = this.state;
    const { value } = this.props;
    const monthIndex = currentDate.month();
    const startDate = currentDate.clone().startOf('week');
    const dayData = [];

    for (let i = 0; i < 42; i += 1) {
      const daysDate = startDate.clone().add(i, 'd');
      const isCurrentMonth = daysDate.month() === monthIndex;
      const isPast = daysDate.diff(moment(), 'd') < 0;
      const highlight = !isPast && isCurrentMonth;
      const isSelected = value && moment(value).diff(daysDate, 'd') === 0;

      dayData.push(this.renderDays(startDate.clone().add(i, 'd'), highlight, isSelected));
    }

    return (
      <>
        {this.renderWeekDays()}
        {dayData}
      </>
    );
  }

  renderWeekDays = () => {
    const { value, selectedDateColor } = this.props;
    const { currentDate } = this.state;
    const selectedDate = value && moment(value).format('dd');
    const selectedMonth = value && moment(value).format('YYYYMM') === currentDate.format('YYYYMM');

    return (
      ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((v, i) => {
        const isSelected = selectedMonth && selectedDate === v;
        return (
          <View key={`${v}${i + 1}`} style={[styles.centerItems, this.dayCellDimension(), isSelected ? { borderBottomColor: selectedDateColor, borderBottomWidth: 2 } : {}]}>
            <Text style={{ color: 'grey' }}>{v}</Text>
          </View>
        );
      })
    );
  }

  renderDays = (date, highlight, isSelected) => {
    const { onChange, selectedDateColor } = this.props;
    const formattedDate = date.format('D');
    return (
      <TouchableOpacity
        key={`${date}`}
        style={[
          styles.centerItems,
          this.dayCellDimension(),
          isSelected ? { ...styles.isSelectedContainer, backgroundColor: selectedDateColor } : {},
        ]}
        onPress={() => onChange(date)}
      >
        <Text style={[styles.calText, highlight ? { fontWeight: 'bold', color: 'black' } : { color: 'grey' }, isSelected ? styles.isSelectedText : {}]}>
          {formattedDate}
        </Text>
      </TouchableOpacity>
    );
  };

  renderDayHeader = () => {
    const { currentDate } = this.state;
    return (
      <>
        <Prev onPress={() => this.setState({ currentDate: currentDate.clone().subtract(1, 'M') })} />
        <View style={styles.headerStyle}>
          <Header value={currentDate.format('MMM')} onPress={() => this.setState({ activeView: 'month', currentDate: currentDate.clone().startOf('year') })} />
          <Header value={currentDate.format('YYYY')} onPress={() => this.setState({ activeView: 'year', currentDate: currentDate.clone().startOf('year') })} />
        </View>
        <Next onPress={() => this.setState({ currentDate: currentDate.clone().add(1, 'M') })} />
      </>
    );
  }

  renderMonthHeader = () => {
    const { currentDate } = this.state;
    return (
      <>
        <Prev onPress={() => this.setState({ currentDate: currentDate.clone().subtract(1, 'y') })} />
        <Header value={currentDate.format('YYYY')} onPress={() => this.setState({ activeView: 'year' })} />
        <Next onPress={() => this.setState({ currentDate: currentDate.clone().add(1, 'y') })} />
      </>
    );
  }

  renderYearHeader = () => {
    const { currentDate } = this.state;
    return (
      <>
        <Prev onPress={() => this.setState({ currentDate: currentDate.clone().subtract(12, 'y') })} />
        <Next onPress={() => this.setState({ currentDate: currentDate.clone().add(12, 'y') })} />
      </>
    );
  }

  render() {
    const {
      width,
    } = this.props;
    const { activeView } = this.state;
    let header = null;
    let content = null;

    if (activeView === 'day') {
      header = this.renderDayHeader;
      content = this.renderDayContent;
    } else if (activeView === 'month') {
      header = this.renderMonthHeader;
      content = this.renderMonthContent;
    } else if (activeView === 'year') {
      header = this.renderYearHeader;
      content = this.renderYearContent;
    }


    return (
      <View style={[styles.container, { width }]}>
        <View
          style={[styles.calRow, { paddingTop: calPadding * 2, paddingBottom: calPadding * 2 }]}
        >
          {header()}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {content()}
        </View>
      </View>
    );
  }
}

export default Calendar;
