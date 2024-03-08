import {Text, View} from 'react-native';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import {format} from 'date-fns';
import {useState, useMemo} from 'react';
import React from 'react';

export const Activity = () => {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );

  const getDate = () => {
    const date = new Date('2024-03-08');
    const newDate = date.setDate(date.getDate());
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const marked = useMemo(() => {
    return {
      [getDate()]: {
        key: 'current',
        dotColor: 'red',
        marked: true,
      },
      [selectedDate]: {
        key: 'selected',
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'lightblue',
        selectedTextColor: 'blue',
      },
    };
  }, [selectedDate]);

  return (
    <View>
      <Calendar
        theme={{
          todayTextColor: 'red',
        }}
        markedDates={marked}
        enableSwipeMonths={true}
        onDayPress={day => {
          setSelectedDate(day.dateString);
          console.log(day);
        }}></Calendar>
    </View>
  );
};
