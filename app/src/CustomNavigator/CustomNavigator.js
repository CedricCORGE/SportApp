import { TimerScreen } from "../TimerScreen/TimerScreen";
import { Timer } from "../timer/Timer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const TimerNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TimerScreen" component={TimerScreen} />
      <Stack.Screen name="Chronometer" component={Timer} />
    </Stack.Navigator>
  );
};

export { TimerNavigator };
