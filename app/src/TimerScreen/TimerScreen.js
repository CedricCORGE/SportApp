import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DataRow } from "./component/dataRow";
import { TrainingCard } from "./component/TrainingCard";
import { buttons, layers, shape, texts } from "../style/globalStyle";

export const TimerScreen = ({ navigation }) => {
  const { top } = useSafeAreaInsets();

  const [repetitions, setRepetitions] = useState(1);
  const [work, setWork] = useState({ minutes: 0, seconds: 30 });
  const [rest, setRest] = useState({ minutes: 0, seconds: 30 });

  const test = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/intervals");
      const json = await response.json();
      console.log(json.movies);
      return json.movies;
    } catch (error) {
      console.error(error);
    }
  };

  const styles = {
    safeArea: {
      marginTop: top,
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
      repetitions: repetitions,
      work: work.minutes * 60 + work.seconds,
      rest: rest.minutes * 60 + rest.seconds,
      volume: 100,
    });
  };

  return (
    <ScrollView style={[layers.background]}>
      <View style={[layers.container, styles.safeArea]}>
        <View style={[styles.startContainer]}>
          <Text style={[texts.m, texts.bold, { marginTop: "5%" }]}>
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

          <TouchableOpacity
            style={[
              buttons.button,
              { height: 40, width: "35%", marginBottom: "5%" },
            ]}
            onPress={redirect}
          >
            <Text style={[texts.m]}>START</Text>
          </TouchableOpacity>
        </View>
        <View style={[shape.line, { width: "70%" }]}></View>
        <View
          style={{
            width: "80%",
            paddingVertical: "5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[texts.bold, texts.m, { paddingBottom: "5%" }]}>
            Your training
          </Text>
          <TrainingCard
            name="Interval 1"
            repetitions={repetitions}
            work={work}
            rest={rest}
          ></TrainingCard>
          <TouchableOpacity onPress={test}>
            <Text>Blbla</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};