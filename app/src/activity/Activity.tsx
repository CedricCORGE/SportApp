import {Text, View, FlatList, ScrollView, SafeAreaView} from 'react-native';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import {format} from 'date-fns';
import {useState, useMemo, useEffect} from 'react';
import React from 'react';
import {HttpService} from '../services/HttpService';
import {IntervalsDto} from '../TimerScreen/TimerScreen';
import {shape, layers, texts} from '../style/globalStyle';
import {ActivityCard} from './components/ActivityCard';

interface Activity {
  id: number;
  date: string;
  name: string;
  duration: number;
  type: string;
  interval: IntervalsDto;
}

const ACTIVITY: Map<
  string,
  {key: string; color: string; selectedDotColor: string}
> = new Map();

ACTIVITY.set('running', {
  key: 'running',
  color: 'red',
  selectedDotColor: 'red',
});
ACTIVITY.set('lifting', {
  key: 'lifting',
  color: 'green',
  selectedDotColor: 'green',
});
ACTIVITY.set('cycling', {
  key: 'cycling',
  color: 'blue',
  selectedDotColor: 'blue',
});
ACTIVITY.set('swimming', {
  key: 'swimming',
  color: 'yellow',
  selectedDotColor: 'yellow',
});
ACTIVITY.set('interval', {
  key: 'interval',
  color: 'orange',
  selectedDotColor: 'orange',
});

export const Activity = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [activities, setActivities] = useState([]);
  const [activitiesArray, setActivitiesArray] = useState([] as Activity[]);

  useEffect(() => {
    HttpService.getRequest('activity/sortedByDate').then((response: any) => {
      setActivities(response);
    });
  }, []);

  const marked = useMemo(() => {
    let tmp = {};
    let isActivitySelected = false;
    let actiArray: Activity[] = [];
    setActivitiesArray([]);

    Object.keys(activities).forEach((key: string) => {
      let dots: any = [];
      console.log('test');

      for (const index in Object.keys(activities[key]['activities'])) {
        let acti = activities[key]['activities'][index];

        dots.push(ACTIVITY.get(acti.type));

        actiArray.push(acti);
      }

      if (format(key, 'yyyy-MM-dd') === selectedDate) {
        isActivitySelected = true;
        setActivitiesArray(actiArray);
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

    if (tmp[selectedDate] == undefined) {
      tmp = {
        [selectedDate]: {
          selected: true,
          selectedColor: 'lightblue',
          selectedTextColor: 'black',
          disableTouchEvent: true,
        },
      };
    }

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
            }}></Calendar>
        </View>
        <View style={[shape.line, layers.centered, {width: '80%'}]}></View>

        <View style={[layers.centered, {paddingTop: '2%'}]}>
          <Text style={[texts.title, texts.bold, texts.uppercase]}>
            Activity
          </Text>
          <Text>{selectedDate}</Text>
        </View>
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
