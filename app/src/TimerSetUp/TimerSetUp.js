import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DataRow } from "./component/dataRow";

export const TimerSetUp = ({ navigation }) => {
  const { top } = useSafeAreaInsets();

  const [repetitions, setRepetitions] = useState(1);
  const [work, setWork] = useState({ minutes: 0, seconds: 30 });
  const [rest, setRest] = useState({ minutes: 0, seconds: 30 });

  const styles = {
    background: {
      backgroundColor: "#EAEAEA",
      height: "100%",
    },
    container: {
      marginTop: top,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    startContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      width: "80%",
      borderRadius: 20,
      marginTop: "5%",
    },
    button: {
      backgroundColor: "#E5EB0E",
      width: "35%",
      height: 40,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 25,
      margin: 5,
      marginBottom: "5%",
    },
  };

  const decreaseReps = () => {
    if (repetitions > 1) {
      setRepetitions(repetitions - 1);
    }
  };

  const increaseReps = () => {
    console.log(repetitions);
    if (repetitions < 30) {
      setRepetitions(repetitions + 1);
    }
  };

  const decreaseWork = () => {
    if (work.minutes > 0 || work.seconds > 5) {
      if (work.seconds === 0) {
        setWork({ minutes: work.minutes - 1, seconds: 55 });
      } else {
        setWork({ minutes: work.minutes, seconds: work.seconds - 5 });
      }
    }
  };

  const increaseWork = () => {
    if (work.seconds === 55) {
      setWork({ minutes: work.minutes + 1, seconds: 0 });
    } else {
      setWork({ minutes: work.minutes, seconds: work.seconds + 5 });
    }
  };

  const decreaseRest = () => {
    if (rest.minutes > 0 || rest.seconds >= 5) {
      if (rest.seconds === 0) {
        setRest({ minutes: rest.minutes - 1, seconds: 55 });
      } else {
        setRest({ minutes: rest.minutes, seconds: rest.seconds - 5 });
      }
    }
  };

  const increaseRest = () => {
    if (rest.seconds === 55) {
      setRest({ minutes: rest.minutes + 1, seconds: 0 });
    } else {
      setRest({ minutes: rest.minutes, seconds: rest.seconds + 5 });
    }
  };

  const redirect = () => {
    navigation.navigate("Chronometer", {
      time: work.minutes * 60 + work.seconds,
      volume: 100,
    });
  };

  return (
    <View style={[styles.background]}>
      <View style={[styles.container]}>
        <View style={[styles.startContainer]}>
          <Text style={{ marginTop: "5%", fontSize: 18, fontWeight: "bold" }}>
            Quick start
          </Text>

          <DataRow
            increase={increaseReps}
            decrease={decreaseReps}
            data={repetitions}
            title="Repetitions"
          ></DataRow>

          <DataRow
            title="Work"
            data={
              (work.minutes < 10 ? "0" + work.minutes : work.minutes) +
              ":" +
              (work.seconds < 10 ? "0" + work.seconds : work.seconds)
            }
            increase={increaseWork}
            decrease={decreaseWork}
            mode="time"
          ></DataRow>

          <DataRow
            title="Rest"
            data={
              (rest.minutes < 10 ? "0" + rest.minutes : rest.minutes) +
              ":" +
              (rest.seconds < 10 ? "0" + rest.seconds : rest.seconds)
            }
            increase={increaseRest}
            decrease={decreaseRest}
            mode="time"
          ></DataRow>

          <TouchableOpacity style={[styles.button]} onPress={redirect}>
            <Text style={{ fontSize: 18 }}>START</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
