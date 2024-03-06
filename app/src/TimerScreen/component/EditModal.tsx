import {TouchableOpacity, View} from 'react-native';
import {DataRow} from './dataRow';
import {buttons, layers} from '../../style/globalStyle';
import {Text} from 'react-native';

export const EditModal = ({saveData, data, func}: any) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View style={[layers.container, {height: '100%'}]}>
        <View style={[{width: '80%', height: '50%', backgroundColor: 'white'}]}>
          <DataRow
            increase={func.increaseReps}
            decrease={func.decreaseReps}
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
            increase={func.increaseWork}
            decrease={func.decreaseWork}
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
            increase={func.increaseRest}
            decrease={func.decreaseRest}
            mode="time"></DataRow>
          <View style={[layers.centered]}>
            <TouchableOpacity
              style={[buttons.button, {width: '40%', height: 35}]}
              onPress={() => {
                console.log(data);
                saveData(data);
              }}>
              <Text>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
