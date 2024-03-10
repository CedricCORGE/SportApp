import {Text, View} from 'react-native';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import {format} from 'date-fns';
import {useState, useMemo, useEffect} from 'react';
import React from 'react';
import {HttpService} from '../services/HttpService';
import {API_URL} from '@env';
import {IntervalsDto} from '../TimerScreen/TimerScreen';

interface Activity {
  id: number;
  date: string;
  name: string;
  duration: number;
  interval: IntervalsDto;
}

export const Activity = () => {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [selectedDate2, setSelectedDate2] = useState(
    format(new Date('2024-03-08'), 'yyyy-MM-dd'),
  );
  const [activities, setActivities] = useState([] as Activity[]);

  useEffect(() => {
    HttpService.getRequest('activity').then(response => {
      console.log(response);
      setActivities(response);
    });
  }, []);

  const marked = useMemo(() => {
    let tmp = {};

    activities.forEach(activity => {
      tmp = {
        ...tmp,
        [format(activity.date, 'yyyy-MM-dd')]: {
          key: activity.id,
          selected: true,
          disableTouchEvent: true,
          selectedColor: 'lightblue',
          selectedTextColor: 'blue',
        },
      };
    });

    return {
      ...tmp,
    };
  }, [activities]);

  return (
    <View>
      <Calendar
        theme={{
          todayTextColor: 'red',
          todayDotColor: 'red',
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
