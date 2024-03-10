import {Text, View, FlatList, ScrollView, SafeAreaView} from 'react-native';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import {format} from 'date-fns';
import {useState, useMemo, useEffect} from 'react';
import React from 'react';
import {HttpService} from '../services/HttpService';
import {IntervalsDto} from '../TimerScreen/TimerScreen';
import {shape, layers, texts} from '../style/globalStyle';
import {ActivityCard} from './components/ActivityCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Activity {
  id: number;
  date: string;
  name: string;
  duration: number;
  interval: IntervalsDto;
}

export const Activity = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [activities, setActivities] = useState([] as Activity[]);

  useEffect(() => {
    HttpService.getRequest('activity').then((response: any) => {
      console.log(response);
      setActivities(response);
    });
  }, []);

  const marked = useMemo(() => {
    let tmp = {};

    activities.forEach(activity => {
      if (format(activity.date, 'yyyy-MM-dd') === selectedDate) {
        tmp = {
          ...tmp,
          [format(activity.date, 'yyyy-MM-dd')]: {
            dots: [
              {key: 'running', color: 'red', selectedDotColor: 'red'},
              {key: 'lifting', color: 'red', selectedDotColor: 'red'},
            ],
            selected: true,
            selectedColor: 'lightblue',
            selectedTextColor: 'black',
            disableTouchEvent: true,
          },
        };
      } else {
        tmp = {
          ...tmp,
          [format(activity.date, 'yyyy-MM-dd')]: {
            dots: [
              {key: 'running', color: 'red', selectedDotColor: 'red'},
              {key: 'lifting', color: 'red', selectedDotColor: 'red'},
            ],
          },
        };
        tmp = {
          ...tmp,
          [selectedDate]: {
            selected: true,
            selectedColor: 'lightblue',
            selectedTextColor: 'black',
            disableTouchEvent: true,
          },
        };
      }
    });

    return {
      ...tmp,
    };
  }, [activities, selectedDate]);

  return (
    <ScrollView>
      <View style={[layers.container, {width: '100%', marginTop: '5%'}]}>
        <View style={[{width: '80%'}]}>
          <Calendar
            style={{width: '100%', borderRadius: 10}}
            theme={{
              todayTextColor: 'red',
              todayDotColor: 'red',
            }}
            markedDates={marked}
            markingType={'multi-dot'}
            enableSwipeMonths={true}
            onDayPress={day => {
              setSelectedDate(day.dateString);
              console.log(day);
            }}></Calendar>
        </View>
        <View style={[shape.line, layers.centered, {width: '80%'}]}></View>

        <Text style={[texts.title, texts.bold, texts.uppercase]}>Activity</Text>
        {activities.length != 0 && (
          <FlatList
            scrollEnabled={false}
            data={activities}
            renderItem={({item}) => (
              <ActivityCard activity={item} />
            )}></FlatList>
        )}
      </View>
    </ScrollView>
  );
};
