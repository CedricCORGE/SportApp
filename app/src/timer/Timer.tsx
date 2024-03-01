import {Time} from './component/Time';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useState, useEffect} from 'react';
import {Icon, IconButton} from 'react-native-paper';

import {buttons, layers, texts} from '../style/globalStyle';

var Sound = require('react-native-sound');

export const Timer = ({route}: any) => {
  const {top} = useSafeAreaInsets();

  const [time, setTime] = useState(route.params.work);
  const [repetitions, setRepetitions] = useState(route.params.repetitions);
  const [period, setPeriod] = useState('work');
  const [isRunning, setIsRunning] = useState(false);

  const [timer, setTimer] = useState<any>();

  const [sound, setSound] = useState(new Sound('timer.wav', Sound.MAIN_BUNDLE));

  useEffect(() => {
    if (time === 4 && isRunning) {
      playSound();
    }
    if (time === 0) {
      stopTimer();
    }
  }, [time]);

  async function playSound() {
    var timer = new Sound(
      'timer.wav',
      Sound.MAIN_BUNDLE,
      async (error: any) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }

        timer.setVolume(route.params.volume / 100);
        console.log(timer.getVolume());

        timer.play((success: any) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      },
    );
  }

  const startTimer = () => {
    setIsRunning(true);
    setTimer(
      setInterval(() => {
        setTime((time: number) => (time === 0 ? 0 : time - 1));
      }, 1000),
    );
  };

  const stopTimer = () => {
    if ((repetitions > 1 || period === 'work') && time === 0) {
      if (period === 'rest') {
        setRepetitions(repetitions - 1);
      }
      if (route.params.rest === 0) {
        if (repetitions === 1) {
          setIsRunning(false);
          clearInterval(timer);
          if (sound) {
            sound.stop();
          }
          return;
        }
        setPeriod('work');
        setTime(route.params.work);
        setRepetitions(repetitions - 1);
      } else {
        setPeriod(period === 'work' ? 'rest' : 'work');
        setTime(period === 'work' ? route.params.rest : route.params.work);
      }
    } else {
      setIsRunning(false);
      clearInterval(timer);
    }
  };

  const resetTimer = () => {
    sound.stop();
    setIsRunning(false);
    clearInterval(timer);
    setTime(route.params.work);
    setRepetitions(route.params.repetitions);
    setPeriod('work');
  };

  return (
    <View style={[layers.centered, {marginTop: top}]}>
      <View style={{height: '10%', display: 'flex', justifyContent: 'center'}}>
        <Text style={[texts.xl]}>Timer</Text>
      </View>

      <View style={[layers.centered, styles.time]}>
        <Time time={time} period={period} />
      </View>

      <View style={[styles.actionButtons]}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: '50%',
              width: '100%',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={[buttons.button, {width: '35%'}]}
              onPress={startTimer}>
              <Text style={[buttons.text]}>Start</Text>
              <Icon source="play" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[buttons.button, {width: '35%'}]}
              onPress={stopTimer}>
              <Text style={[buttons.text]}>Stop</Text>
              <Icon source="stop" size={20} />
            </TouchableOpacity>
          </View>
          <IconButton size={30} icon={'restart'} onPress={resetTimer} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  time: {
    height: '70%',
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
    color: 'black',
    height: '20%',
  },
});
