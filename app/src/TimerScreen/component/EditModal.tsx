import {TouchableOpacity, View, TextInput} from 'react-native';
import {DataRow} from './dataRow';
import {buttons, layers, texts} from '../../style/globalStyle';
import {Text} from 'react-native';
import {useEffect, useState} from 'react';
import {IconButton} from 'react-native-paper';

export const EditModal = ({saveData, closeModal, data, func}: any) => {
  const [isModified, setIsModified] = useState(false);
  const [modifiedData, setModifiedData] = useState(data);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    validateData();
  }, [modifiedData]);

  const validateData = () => {
    if (modifiedData.name != '') {
      setIsValid(true);
    } else {
      setIsValid(false);
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
                closeModal(data, modifiedData.name);
              }}></IconButton>
          </View>
          <View style={[layers.row]}>
            {!isModified && (
              <Text style={[texts.title, texts.bold]}>{modifiedData.name}</Text>
            )}
            {isModified && (
              <TextInput
                autoFocus={true}
                onEndEditing={() => {
                  setIsModified(false);
                }}
                maxLength={20}
                style={[texts.title, texts.bold, {color: 'grey'}]}
                onChangeText={text => {
                  setModifiedData({...modifiedData, name: text});
                }}
                value={modifiedData.name}></TextInput>
            )}
            <IconButton
              icon="pencil"
              onPress={() => {
                setIsModified(!isModified);
              }}></IconButton>
          </View>

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
              style={[buttons.button, {width: '40%', height: 35, margin: 30}]}
              onPress={() => {
                if (isValid) {
                  console.log(modifiedData);
                  saveData(data, modifiedData.name);
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
