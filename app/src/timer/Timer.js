import { Time } from "./component/Time";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { Icon, IconButton } from "react-native-paper";
import { Audio } from "expo-av";

export const Timer = ({ route }) => {
  const { top } = useSafeAreaInsets();

  const [time, setTime] = useState(route.params.time);
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
    setIsRunning(false);
    clearInterval(this.interval);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(this.interval);
    setTime(route.params.time);
  };

  return (
    <View style={[styles.timerContainer, { marginTop: top }]}>
      <View
        style={{ height: "10%", display: "flex", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 30 }}>Timer</Text>
      </View>

      <View style={[styles.time]}>
        <Time time={time} />
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
            <TouchableOpacity style={[styles.button]} onPress={startTimer}>
              <Text style={[styles.buttonText]}>Start</Text>
              <Icon source="play" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button]} onPress={stopTimer}>
              <Text style={[styles.buttonText]}>Stop</Text>
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
  timerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  time: {
    height: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtons: {
    display: "flex",
    flexDirection: "row",
    color: "black",
    height: "20%",
  },
  button: {
    backgroundColor: "#E5EB0E",
    width: "35%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    margin: 5,
  },
  buttonText: {
    paddingRight: 5,
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
  },
};
