import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DataRow } from "./component/dataRow";

export const TimerSetUp = ({ navigation }) => {
  const { top } = useSafeAreaInsets();

  const [repetitions, setRepetitions] = useState(1);
  const [work, setWork] = useState(30);
  const [rest, setRest] = useState(30);

  const styles = {
    container: {
      marginTop: top,
    },
    startContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const decreaseReps = () => {
    if (repetitions > 1) {
      setRepetitions(repetitions - 1);
    }
  };

  const increaseReps = () => {
    if (repetitions < 30) {
      setRepetitions(repetitions + 1);
    }
  };

  const decreaseWork = () => {
    if (work > 5) {
      setWork(work - 5);
    }
  };

  const increaseWork = () => {
    setWork(work + 5);
  };

  const decreaseRest = () => {
    if (rest > 5) {
      setRest(rest - 5);
    }
  };

  const increaseRest = () => {
    setRest(rest + 5);
  };

  const redirect = () => {
    navigation.navigate("Chronometer", {
      time: 10,
      volume: 100,
    });
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.startContainer]}>
        <Text>Quick start</Text>

        <DataRow
          increase={increaseReps}
          decrease={decreaseReps}
          data={repetitions}
          title="Repetitions"
        ></DataRow>

        <DataRow
          title="Work"
          data={work}
          increase={increaseWork}
          decrease={decreaseWork}
        ></DataRow>

        <DataRow
          title="Rest"
          data={rest}
          increase={increaseRest}
          decrease={decreaseRest}
        ></DataRow>

        <TouchableOpacity
          style={{ width: "20%", backgroundColor: "red" }}
          onPress={redirect}
        >
          <Text>START</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
