import {Text, View, FlatList, ScrollView, SafeAreaView} from 'react-native';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import {format, set} from 'date-fns';
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
  type: string;
  interval: IntervalsDto;
}

const ACTIVITY = [
  {key: 'running', color: 'red', selectedDotColor: 'red'},
  {key: 'lifting', color: 'green', selectedDotColor: 'green'},
  {key: 'cycling', color: 'blue', selectedDotColor: 'blue'},
  {key: 'swimming', color: 'yellow', selectedDotColor: 'yellow'},
  {key: 'interval', color: 'orange', selectedDotColor: 'orange'},
];

export const Activity = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [activities, setActivities] = useState([]);
  const [activitiesArray, setActivitiesArray] = useState([] as Activity[]);

  useEffect(() => {
    HttpService.getRequest('activity/sortedByDate').then((response: any) => {
      console.log(response);
      setActivities(response);
    });
  }, []);

  const marked = useMemo(() => {
    let tmp = {};
    let isActivitySelected = false;
    let actiArray: Activity[] = [];

    Object.keys(activities).forEach((key: string) => {
      let dots: any = [];

      for (const index in Object.keys(activities[key]['activities'])) {
        let acti = activities[key]['activities'][index];

        if (acti.type === 'running') {
          dots.push(ACTIVITY[0]);
        } else if (acti.type === 'lifting') {
          dots.push(ACTIVITY[1]);
        } else if (acti.type === 'cycling') {
          dots.push(ACTIVITY[2]);
        } else if (acti.type === 'swimming') {
          dots.push(ACTIVITY[3]);
        } else if (acti.type === 'interval') {
          dots.push(ACTIVITY[4]);
        }
        actiArray.push(acti);
      }

      if (format(key, 'yyyy-MM-dd') === selectedDate) {
        isActivitySelected = true;
        tmp = {
          ...tmp,
          [format(key, 'yyyy-MM-dd')]: {
            dots: dots,
            selected: true,
            selectedColor: 'lightblue',
            selectedTextColor: 'black',
            disableTouchEvent: true,
          },
        };
      } else {
        tmp = {
          ...tmp,
          [format(key, 'yyyy-MM-dd')]: {
            dots: dots,
          },
        };
        if (isActivitySelected == false) {
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
      }
    });

    setActivitiesArray(actiArray);

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

        <Text
          style={[
            texts.title,
            texts.bold,
            texts.uppercase,
            {paddingTop: '2%'},
          ]}>
          Activity
        </Text>
        {activities.length != 0 && (
          <FlatList
            scrollEnabled={false}
            data={activitiesArray}
            renderItem={({item}) => (
              <ActivityCard activity={item} />
            )}></FlatList>
        )}
      </View>
    </ScrollView>
  );
};
