import {View, Text, StyleSheet} from 'react-native';
import {layers, texts} from '../../style/globalStyle';

const getMinutes = (time: number) => {
  var minutes = Math.floor(time / 60);
  if (minutes < 10) {
    return '0' + minutes;
  }
  return minutes;
};

const getSeconds = (time: number) => {
  var seconds = time % 60;

  if (seconds < 10) {
    return '0' + seconds;
  }
  return seconds;
};

export const Time = (props: any) => {
  return (
    <View>
      <View style={[layers.centered]}>
        <Text style={[texts.xl, texts.uppercase]}>{props.period}</Text>
        <Text style={[styles.timer]}>
          {getMinutes(props.time)}:{getSeconds(props.time)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    fontSize: 70,
  },
});
