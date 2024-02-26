import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { Button } from "react-native-paper";

const getMinutes = (time) => {
  var minutes = Math.floor(time / 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return minutes;
};

const getSeconds = (time) => {
  var seconds = time % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return seconds;
};

export const Time = (props) => {
  const [time, setTime] = useState(props.time);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    console.log("Time: ", time);
    if (time === 0) {
      console.log("Time is up");
      stopTimer();
    }
  }, [time]);

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
    setTime(props.time);
  };

  return (
    <View>
      <Text>
        {getMinutes(time)}:{getSeconds(time)}
      </Text>
      <Button onPress={startTimer} disabled={isRunning}>
        Start
      </Button>
      <Button onPress={stopTimer}>Stop</Button>
      <Button onPress={resetTimer}>Reset</Button>
    </View>
  );
};
