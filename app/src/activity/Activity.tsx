import {Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import React from 'react';

export const Activity = () => {
  return (
    <View>
      <Calendar
        onDayPress={day => {
          console.log(day);
        }}></Calendar>
    </View>
  );
};
