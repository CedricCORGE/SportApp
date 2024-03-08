import {TouchableOpacity, View, TextInput} from 'react-native';
import {DataRow} from './dataRow';
import {buttons, layers, texts} from '../../style/globalStyle';
import {Text} from 'react-native';
import {useEffect, useState} from 'react';
import {IconButton} from 'react-native-paper';

export const AddModal = ({addData, closeModal}: any) => {
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState({
    name: '',
    repetitions: 1,
    work: {minutes: 0, seconds: 30},
    rest: {minutes: 0, seconds: 30},
  });

  useEffect(() => {
    validateName();
  }, [data]);

  const validateName = () => {
    if (data.name != '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const decreaseReps = () => {
    if (data.repetitions > 1) {
      setData({...data, repetitions: data.repetitions - 1});
    }
  };

  const increaseReps = () => {
    if (data.repetitions < 30) {
      setData({...data, repetitions: data.repetitions + 1});
    }
  };

  const decreaseWork = () => {
    if (data.work.minutes > 0 || data.work.seconds > 5) {
      if (data.work.seconds === 0) {
        setData({...data, work: {minutes: data.work.minutes - 1, seconds: 55}});
      } else {
        setData({
          ...data,
          work: {minutes: data.work.minutes, seconds: data.work.seconds - 5},
        });
      }
    }
  };

  const increaseWork = () => {
    if (data.work.seconds === 55) {
      setData({...data, work: {minutes: data.work.minutes + 1, seconds: 0}});
    } else {
      setData({
        ...data,
        work: {
          minutes: data.work.minutes,
          seconds: data.work.seconds + 5,
        },
      });
    }
  };

  const decreaseRest = () => {
    if (data.rest.minutes > 0 || data.rest.seconds >= 5) {
      if (data.rest.seconds === 0) {
        setData({...data, rest: {minutes: data.rest.minutes - 1, seconds: 55}});
      } else {
        setData({
          ...data,
          rest: {
            minutes: data.rest.minutes,
            seconds: data.rest.seconds - 5,
          },
        });
      }
    }
  };

  const increaseRest = () => {
    if (data.rest.seconds === 55) {
      setData({...data, rest: {minutes: data.rest.minutes + 1, seconds: 0}});
    } else {
      setData({
        ...data,
        rest: {
          minutes: data.rest.minutes,
          seconds: data.rest.seconds + 5,
        },
      });
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View style={[layers.container, {height: '100%'}]}>
        <View
          style={[{width: '80%', backgroundColor: 'white', borderRadius: 20}]}>
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}>
            <IconButton
              icon="close"
              onPress={() => {
                closeModal();
              }}></IconButton>
          </View>
          <View style={[layers.row, {paddingTop: '5%'}]}>
            <TextInput
              maxLength={20}
              style={[
                texts.title,
                texts.bold,
                {
                  color: 'grey',
                  borderWidth: 2,
                  borderRadius: 20,
                  width: '60%',
                  paddingLeft: 10,
                },
              ]}
              onChangeText={text => {
                setData({...data, name: text});
              }}
              placeholder="Name"></TextInput>
          </View>

          <DataRow
            increase={increaseReps}
            decrease={decreaseReps}
            data={data.repetitions}
            title="Repetitions"></DataRow>

          <DataRow
            title="Work"
            data={
              (data.work.minutes < 10
                ? '0' + data.work.minutes
                : data.work.minutes) +
              ':' +
              (data.work.seconds < 10
                ? '0' + data.work.seconds
                : data.work.seconds)
            }
            increase={increaseWork}
            decrease={decreaseWork}
            mode="time"></DataRow>

          <DataRow
            title="Rest"
            data={
              (data.rest.minutes < 10
                ? '0' + data.rest.minutes
                : data.rest.minutes) +
              ':' +
              (data.rest.seconds < 10
                ? '0' + data.rest.seconds
                : data.rest.seconds)
            }
            increase={increaseRest}
            decrease={decreaseRest}
            mode="time"></DataRow>
          <View style={[layers.centered]}>
            <TouchableOpacity
              style={[buttons.button, {width: '40%', height: 35, margin: 30}]}
              onPress={() => {
                if (isValid) {
                  addData(data);
                }
              }}>
              <Text>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
