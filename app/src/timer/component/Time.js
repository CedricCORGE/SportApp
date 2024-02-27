import { View, Text } from "react-native";

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
  return (
    <View>
      <View style={[styles.timerContainer]}>
        <Text>{props.period}</Text>
        <Text style={[styles.timer]}>
          {getMinutes(props.time)}:{getSeconds(props.time)}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  timerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    fontSize: 70,
  },
};
