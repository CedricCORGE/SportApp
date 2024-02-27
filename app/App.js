import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Profile } from "./src/profile/Profile";
import { Home } from "./src/home/Home";
import { TimerSetUp } from "./src/TimerSetUp/TimerSetUp";
import { Timer } from "./src/timer/Timer";
import { FirstScreenNavigator } from "./src/CustomNavigator/CustomNavigator";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Timer") {
              iconName = focused ? "timer" : "timer-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen
          name="Profile"
          children={() => {
            return (
              <Profile
                name="Cédric CORGE"
                height="176"
                weight="69.5"
                gender="Homme"
              />
            );
          }}
        />
        <Tab.Screen name="Timer" component={FirstScreenNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
});
