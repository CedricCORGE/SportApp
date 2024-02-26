import { Time } from "./component/Time";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Timer = (props) => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ marginTop: top }}>
      <Text>Timer</Text>
      <Time time={props.time} />
    </View>
  );
};
