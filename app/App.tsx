/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Home} from './src/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Profile} from './src/profile/Profile';
import {TimerNavigator} from './src/CustomNavigator/CustomNavigator';
import {LoginNavigator} from './src/CustomNavigator/LoginNavigator';
import {user} from './src/User';
import {Login} from './src/Login/Login';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Test() {
  return (
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
          } else if (route.name === 'Login') {
            return undefined;
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
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  let client = user;
  console.log('client', client.getIsLogged());
  let initialRoute = client.getIsLogged() ? 'Test' : 'Login';

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginNavigator}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Test"
          component={Test}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
