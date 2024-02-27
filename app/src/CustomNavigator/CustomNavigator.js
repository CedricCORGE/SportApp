import { TimerSetUp } from "../TimerSetUp/TimerSetUp";
import { Timer } from "../timer/Timer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator(); // creates object for Stack Navigator

const FirstScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TimerSetUp" component={TimerSetUp} />
      <Stack.Screen name="Chronometer" component={Timer} />
    </Stack.Navigator>
  );
};

export { FirstScreenNavigator };
