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
  calendar: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  isSelectedContainer: { borderRadius: 5 },
  isSelectedText: { color: 'white' },
  headerText: { color: 'grey' },
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

  constructor(props) {
    super(props);
    const { value, defaultView } = props;
    const calendarFormat = defaultView === 'day' ? 'month' : defaultView;
    const currentDate = value
      ? moment(value).startOf(calendarFormat)
      : moment().startOf(calendarFormat);

    this.state = ({
      activeView: defaultView,
      currentDate,
    });
  }

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

  getWeekDayStyle = (isSelected) => {
    const { selectedDateColor } = this.props;
    const dayContainerStyles = {
      ...styles.centerItems,
      ...this.dayCellDimension(),
    };
    if (isSelected) {
      return {
        ...dayContainerStyles,
        borderBottomColor: selectedDateColor,
        borderBottomWidth: 2,
      };
    }
    return dayContainerStyles;
  }

  getDayTextStyles = (highlight, isSelected) => {
    if (isSelected) {
      return {
        fontWeight: 'bold',
        color: 'white',
      };
    }
    if (highlight) {
      return {
        fontWeight: 'bold',
        color: 'black',
      };
    }
    return { color: 'grey' };
  }

  getCellContainerStyles = (isSelected) => {
    const { selectedDateColor } = this.props;
    if (isSelected) {
      return {
        ...styles.centerItems,
        backgroundColor: selectedDateColor,
      };
    }
    return styles.centerItems;
  }

  getHeaderStyle = () => ({
    ...styles.calRow,
    paddingTop: calPadding * 2,
    paddingBottom: calPadding * 2,
  });

  renderMonthContent = () => this.renderYearsOrMonths('M', 'MMM', 'day');

  renderYearContent = () => this.renderYearsOrMonths('y', 'YYYY', 'month');

  renderYearsOrMonths = (dateFormat, headerFormat, changeView) => {
    const { currentDate, activeView } = this.state;
    const { value } = this.props;
    const checkIfSelectedFormat = activeView === 'month' ? 'YYYYMMM' : 'YYYY';
    const selectedDateText = value && moment(value).format(checkIfSelectedFormat);

    const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((j) => {
      const dates = currentDate.clone().add(j, dateFormat);
      const isSelectedView = dates.format(checkIfSelectedFormat) === selectedDateText;
      const containerStyle = this.getCellContainerStyles(isSelectedView);
      const textStyle = { fontWeight: 'bold', color: isSelectedView ? 'white' : 'black' };

      return (
        <TouchableOpacity
          key={j}
          onPress={() => this.setState({ currentDate: dates, activeView: changeView })}
          style={[
            containerStyle,
            this.cellDimension(),
          ]}
        >
          <Text
            style={textStyle}
          >
            {dates.format(headerFormat)}
          </Text>
        </TouchableOpacity>
      );
    });

    return data;
  };

  renderWeekDays = () => {
    const { value } = this.props;
    const { currentDate } = this.state;
    const selectedDate = value && moment(value).format('dd');
    const selectedMonth = value && moment(value).format('YYYYMM') === currentDate.format('YYYYMM');
    return (
      ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((v, i) => {
        const isSelected = selectedMonth && selectedDate === v;
        const weekStyle = this.getWeekDayStyle(isSelected);

        return (
          <View key={`${v}${i + 1}`} style={weekStyle}>
            <Text style={styles.headerText}>{v}</Text>
          </View>
        );
      })
    );
  }

  renderDays = (date, highlight, isSelected) => {
    const { onChange } = this.props;
    const formattedDate = date.format('D');
    const containerStyle = this.getCellContainerStyles(isSelected);
    const dayTextStyles = this.getDayTextStyles(highlight, isSelected);

    return (
      <TouchableOpacity
        key={`${date}`}
        style={[containerStyle, this.dayCellDimension()]}
        onPress={() => onChange(date)}
      >
        <Text style={dayTextStyles}>
          {formattedDate}
        </Text>
      </TouchableOpacity>
    );
  };

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
      const isSelected = value && moment(value).isSame(daysDate, 'd') === 0;

      dayData.push(this.renderDays(daysDate, highlight, isSelected));
    }

    return (
      <>
        {this.renderWeekDays()}
        {dayData}
      </>
    );
  }

  renderDayHeader = () => {
    const { currentDate } = this.state;
    const formattedDate = currentDate.clone().startOf('year');
    const nextDate = currentDate.clone().add(1, 'M');
    const prevDate = currentDate.clone().subtract(1, 'M');

    return (
      <>
        <Prev onPress={() => this.setState({ currentDate: prevDate })} />
        <View style={styles.headerStyle}>
          <Header value={currentDate.format('MMM')} onPress={() => this.setState({ activeView: 'month', currentDate: formattedDate })} />
          <Header value={currentDate.format('YYYY')} onPress={() => this.setState({ activeView: 'year', currentDate: formattedDate })} />
        </View>
        <Next onPress={() => this.setState({ currentDate: nextDate })} />
      </>
    );
  }

  renderMonthHeader = () => {
    const { currentDate } = this.state;
    const nextDate = currentDate.clone().add(1, 'y');
    const prevDate = currentDate.clone().subtract(1, 'y');

    return (
      <>
        <Prev onPress={() => this.setState({ currentDate: prevDate })} />
        <Header value={currentDate.format('YYYY')} onPress={() => this.setState({ activeView: 'year' })} />
        <Next onPress={() => this.setState({ currentDate: nextDate })} />
      </>
    );
  }

  renderYearHeader = () => {
    const { currentDate } = this.state;
    const nextDate = currentDate.clone().add(12, 'y');
    const prevDate = currentDate.clone().subtract(12, 'y');

    return (
      <>
        <Prev onPress={() => this.setState({ currentDate: prevDate })} />
        <Next onPress={() => this.setState({ currentDate: nextDate })} />
      </>
    );
  }

  getHeaderContent = () => {
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

    return { header, content };
  }

  render() {
    const { width } = this.props;
    const { header, content } = this.getHeaderContent();

    return (
      <View style={[styles.container, { width }]}>
        <View
          style={this.getHeaderStyle()}
        >
          {header()}
        </View>
        <View style={styles.calendar}>
          {content()}
        </View>
      </View>
    );
  }
}

export default Calendar;
