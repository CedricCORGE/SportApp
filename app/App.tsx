/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Home} from './src/Home';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Profile} from './src/profile/Profile';
import {TimerNavigator} from './src/CustomNavigator/CustomNavigator';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,

          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';

            if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Timer') {
              iconName = focused ? 'timer' : 'timer-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen
          name="Profile"
          children={() => {
            return (
              <Profile
                {...{
                  name: 'Cédric CORGE',
                  height: '176',
                  weight: '69.5',
                  gender: 'Homme',
                }}
              />
            );
          }}
        />
        <Tab.Screen name="Timer" component={TimerNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
