import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Home = (props) => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ marginTop: top }}>
      <Text>Home</Text>
    </View>
  );
};
