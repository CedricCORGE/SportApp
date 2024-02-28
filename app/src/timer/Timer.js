import { Time } from "./component/Time";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { Icon, IconButton } from "react-native-paper";
import { Audio } from "expo-av";

import { buttons, layers, texts } from "../style/globalStyle";

export const Timer = ({ route }) => {
  const { top } = useSafeAreaInsets();

  const [time, setTime] = useState(route.params.work);
  const [repetitions, setRepetitions] = useState(route.params.repetitions);
  const [period, setPeriod] = useState("work");
  const [isRunning, setIsRunning] = useState(false);

  const [sound, setSound] = useState();

  useEffect(() => {
    if (time === 4 && isRunning) {
      playSound();
    }
    if (time === 0) {
      stopTimer();
    }
  }, [time]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/timer.wav")
    );
    await sound.setVolumeAsync(route.params.volume / 100.0);
    setSound(sound);
    await sound.playAsync();
  }

  const startTimer = () => {
    setIsRunning(true);
    this.interval = setInterval(() => {
      setTime((time) => (time === 0 ? 0 : time - 1));
    }, 1000);
  };

  const stopTimer = () => {
    if ((repetitions > 1 || period === "work") && time === 0) {
      if (period === "rest") {
        setRepetitions(repetitions - 1);
      }
      setPeriod(period === "work" ? "rest" : "work");
      setTime(period === "work" ? route.params.rest : route.params.work);
    } else {
      setIsRunning(false);
      clearInterval(this.interval);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(this.interval);
    setTime(route.params.time);
  };

  return (
    <View style={[layers.centered, { marginTop: top }]}>
      <View
        style={{ height: "10%", display: "flex", justifyContent: "center" }}
      >
        <Text style={[texts.xl]}>Timer</Text>
      </View>

      <View style={[layers.centered, styles.time]}>
        <Time time={time} period={period} />
      </View>

      <View style={[styles.actionButtons]}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              height: "50%",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={[buttons.button, { width: "35%" }]}
              onPress={startTimer}
            >
              <Text style={[buttons.text]}>Start</Text>
              <Icon source="play" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[buttons.button, { width: "35%" }]}
              onPress={stopTimer}
            >
              <Text style={[buttons.text]}>Stop</Text>
              <Icon source="stop" size={20} />
            </TouchableOpacity>
          </View>
          <IconButton size={30} icon={"restart"} onPress={resetTimer} />
        </View>
      </View>
    </View>
  );
};

const styles = {
  time: {
    height: "70%",
  },
  actionButtons: {
    display: "flex",
    flexDirection: "row",
    color: "black",
    height: "20%",
  },
};
