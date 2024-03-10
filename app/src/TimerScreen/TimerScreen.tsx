import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DataRow} from './component/dataRow';
import {TrainingCard} from './component/TrainingCard';
import {buttons, layers, shape, texts} from '../style/globalStyle';
import {HttpService} from '../services/HttpService';
import {EditModal} from './component/EditModal';
import {AddModal} from './component/AddModal';
import Collapsible from 'react-native-collapsible';
import {IconButton} from 'react-native-paper';

interface Intervals {
  id: number;
  name: string;
  repetitions: number;
  work: {minutes: number; seconds: number};
  rest: {minutes: number; seconds: number};
  edit?: (item: Intervals) => void;
  start?: (item: Intervals) => void;
}

export interface IntervalsDto {
  id: number;
  name: string;
  repetitions: number;
  work: number;
  rest: number;
}

export const TimerScreen = ({navigation}: any) => {
  const {top} = useSafeAreaInsets();

  const [repetitions, setRepetitions] = useState(1);
  const [work, setWork] = useState({minutes: 0, seconds: 30});
  const [rest, setRest] = useState({minutes: 0, seconds: 30});
  const [intervals, setIntervals] = useState([] as Intervals[]);

  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [modalObject, setModalObject] = useState({id: -1} as Intervals);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const openModal = (item: Intervals) => {
    setModalObject(item);
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
    setModalObject({id: -1} as Intervals);
  };

  const openAddModal = () => {
    setAddModalVisible(true);
  };

  const hideAddModal = () => {
    setAddModalVisible(false);
  };

  const addData = (data: Intervals) => {
    let body = {
      name: data.name,
      repetitions: data.repetitions,
      work: data.work.minutes * 60 + data.work.seconds,
      rest: data.rest.minutes * 60 + data.rest.seconds,
    };
    HttpService.postRequest('intervals', body).then(async res => {
      getIntervals();
      hideAddModal();
    });
  };

  const getIntervals = async () => {
    const data = await HttpService.getRequest('intervals');
    var intervals = updateIntervals(data);

    setIntervals(intervals);
  };

  const saveData = (data: Intervals, name: string) => {
    var test = {
      id: data.id,
      name: name,
      repetitions: data.repetitions,
      work: data.work.minutes * 60 + data.work.seconds,
      rest: data.rest.minutes * 60 + data.rest.seconds,
    };
    HttpService.patchRequest('intervals/' + data.id, test).then(async res => {
      for (let i = 0; i < intervals.length; i++) {
        if (intervals[i].id === res.id) {
          var newIntervals = intervals;
          newIntervals[i] = {
            id: res.id,
            name: res.name,
            repetitions: res.repetitions,
            work: {
              minutes: Math.floor(res.work / 60),
              seconds: res.work % 60,
            },
            rest: {
              minutes: Math.floor(res.rest / 60),
              seconds: res.rest % 60,
            },
            edit: openModal,
            start: redirect,
          };
          setIntervals([]);
          setIntervals(newIntervals);
        }
      }
    });
    hideModal();
  };

  const updateIntervals = (data: IntervalsDto[]) => {
    var intervals = [];
    for (let i = 0; i < data.length; i++) {
      intervals.push({
        id: data[i].id,
        name: data[i].name,
        repetitions: data[i].repetitions,
        work: {
          minutes: Math.floor(data[i].work / 60),
          seconds: data[i].work % 60,
        },
        rest: {
          minutes: Math.floor(data[i].rest / 60),
          seconds: data[i].rest % 60,
        },
        edit: openModal,
        start: redirect,
      });
    }
    return intervals;
  };

  useEffect(() => {
    const fetchData = async () => {
      getIntervals();
    };
    fetchData();
  }, []);

  const styles = StyleSheet.create({
    safeArea: {
      marginTop: top,
      height: '100%',
    },
    startContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '80%',
      borderRadius: 20,
      marginTop: '5%',
    },
  });

  const decreaseReps = () => {
    if (modalObject.id == -1) {
      if (repetitions > 1) {
        setRepetitions(repetitions - 1);
      }
    } else {
      if (modalObject.repetitions > 1) {
        setModalObject({
          ...modalObject,
          repetitions: modalObject.repetitions - 1,
        });
      }
    }
  };

  const increaseReps = () => {
    if (modalObject.id == -1) {
      if (repetitions < 30) {
        setRepetitions(repetitions + 1);
      }
    } else {
      if (modalObject.repetitions < 30) {
        setModalObject({
          ...modalObject,
          repetitions: modalObject.repetitions + 1,
        });
      }
    }
  };

  const decreaseWork = () => {
    if (modalObject.id == -1) {
      if (work.minutes > 0 || work.seconds > 5) {
        if (work.seconds === 0) {
          setWork({minutes: work.minutes - 1, seconds: 55});
        } else {
          setWork({minutes: work.minutes, seconds: work.seconds - 5});
        }
      }
    } else {
      if (modalObject.work.minutes > 0 || modalObject.work.seconds > 5) {
        if (modalObject.work.seconds === 0) {
          setModalObject({
            ...modalObject,
            work: {
              minutes: modalObject.work.minutes - 1,
              seconds: 55,
            },
          });
        } else {
          setModalObject({
            ...modalObject,
            work: {
              minutes: modalObject.work.minutes,
              seconds: modalObject.work.seconds - 5,
            },
          });
        }
      }
    }
  };

  const increaseWork = () => {
    if (modalObject.id == -1) {
      if (work.seconds === 55) {
        setWork({minutes: work.minutes + 1, seconds: 0});
      } else {
        setWork({minutes: work.minutes, seconds: work.seconds + 5});
      }
    } else {
      if (modalObject.work.seconds === 55) {
        setModalObject({
          ...modalObject,
          work: {
            minutes: modalObject.work.minutes + 1,
            seconds: 0,
          },
        });
      } else {
        setModalObject({
          ...modalObject,
          work: {
            minutes: modalObject.work.minutes,
            seconds: modalObject.work.seconds + 5,
          },
        });
      }
    }
  };

  const decreaseRest = () => {
    if (modalObject.id == -1) {
      if (rest.minutes > 0 || rest.seconds >= 5) {
        if (rest.seconds === 0) {
          setRest({minutes: rest.minutes - 1, seconds: 55});
        } else {
          setRest({minutes: rest.minutes, seconds: rest.seconds - 5});
        }
      }
    } else {
      if (modalObject.rest.minutes > 0 || modalObject.rest.seconds >= 5) {
        if (modalObject.rest.seconds === 0) {
          setModalObject({
            ...modalObject,
            rest: {
              minutes: modalObject.rest.minutes - 1,
              seconds: 55,
            },
          });
        } else {
          setModalObject({
            ...modalObject,
            rest: {
              minutes: modalObject.rest.minutes,
              seconds: modalObject.rest.seconds - 5,
            },
          });
        }
      }
    }
  };

  const increaseRest = () => {
    if (modalObject.id == -1) {
      if (rest.seconds === 55) {
        setRest({minutes: rest.minutes + 1, seconds: 0});
      } else {
        setRest({minutes: rest.minutes, seconds: rest.seconds + 5});
      }
    } else {
      if (modalObject.rest.seconds === 55) {
        setModalObject({
          ...modalObject,
          rest: {
            minutes: modalObject.rest.minutes + 1,
            seconds: 0,
          },
        });
      } else {
        setModalObject({
          ...modalObject,
          rest: {
            minutes: modalObject.rest.minutes,
            seconds: modalObject.rest.seconds + 5,
          },
        });
      }
    }
  };

  const redirect = (data: Intervals | undefined) => {
    if (data) {
      navigation.navigate('Chronometer', {
        repetitions: data.repetitions,
        work: data.work.minutes * 60 + data.work.seconds,
        rest: data.rest.minutes * 60 + data.rest.seconds,
        volume: 0,
      });
    } else {
      navigation.navigate('Chronometer', {
        repetitions: repetitions,
        work: work.minutes * 60 + work.seconds,
        rest: rest.minutes * 60 + rest.seconds,
        volume: 0,
      });
    }
  };

  const functionObj = {
    increaseReps: increaseReps,
    decreaseReps: decreaseReps,
    increaseWork: increaseWork,
    decreaseWork: decreaseWork,
    increaseRest: increaseRest,
    decreaseRest: decreaseRest,
  };

  return (
    <View>
      <Modal visible={modalVisible} transparent={true} onDismiss={hideModal}>
        <EditModal
          saveData={saveData}
          closeModal={hideModal}
          data={modalObject}
          func={functionObj}></EditModal>
      </Modal>
      <Modal
        visible={addModalVisible}
        transparent={true}
        onDismiss={hideAddModal}>
        <AddModal addData={addData} closeModal={hideAddModal}></AddModal>
      </Modal>
      <ScrollView>
        <View style={[layers.container]}>
          <View style={[styles.startContainer]}>
            <View style={[layers.centered, {width: '100%'}]}>
              <View
                style={{
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={[texts.m, texts.bold, {marginHorizontal: '2.5%'}]}>
                  Quick start
                </Text>

                <IconButton
                  icon={isCollapsed ? 'chevron-down' : 'chevron-up'}
                  size={30}
                  onPress={() => {
                    setIsCollapsed(!isCollapsed);
                  }}></IconButton>
              </View>
            </View>

            <Collapsible
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              collapsed={isCollapsed}>
              <DataRow
                increase={increaseReps}
                decrease={decreaseReps}
                data={repetitions}
                title="Repetitions"></DataRow>

              <DataRow
                title="Work"
                data={
                  (work.minutes < 10 ? '0' + work.minutes : work.minutes) +
                  ':' +
                  (work.seconds < 10 ? '0' + work.seconds : work.seconds)
                }
                increase={increaseWork}
                decrease={decreaseWork}
                mode="time"></DataRow>

              <DataRow
                title="Rest"
                data={
                  (rest.minutes < 10 ? '0' + rest.minutes : rest.minutes) +
                  ':' +
                  (rest.seconds < 10 ? '0' + rest.seconds : rest.seconds)
                }
                increase={increaseRest}
                decrease={decreaseRest}
                mode="time"></DataRow>

              <TouchableOpacity
                style={[
                  buttons.button,
                  {height: 40, width: '35%', marginBottom: '5%'},
                ]}
                onPress={() => {
                  redirect(undefined);
                }}>
                <View style={[layers.centered, {width: '100%'}]}>
                  <Text style={[texts.m, texts.bold]}>START</Text>
                </View>
              </TouchableOpacity>
            </Collapsible>
          </View>

          <View style={[shape.line, {width: '70%'}]}></View>
          <View
            style={{
              width: '80%',
              paddingVertical: '5%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={[layers.centered, {position: 'relative', width: '100%'}]}>
              <Text style={[texts.bold, texts.m, {paddingBottom: '5%'}]}>
                Your training
              </Text>
              <View style={{position: 'absolute', right: 0, top: 0}}>
                <TouchableOpacity
                  style={[
                    layers.centered,
                    {
                      borderColor: 'grey',
                      borderStyle: 'solid',
                      borderWidth: 2,
                      borderRadius: 50,
                      width: 30,
                      height: 30,
                    },
                  ]}
                  onPress={() => {
                    openAddModal();
                  }}>
                  <Text style={[texts.bold, texts.m]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {intervals.length != 0 && (
              <FlatList
                scrollEnabled={false}
                data={intervals}
                renderItem={({item}) => (
                  <TrainingCard item={item} updateList={getIntervals} />
                )}></FlatList>
            )}
            {intervals.length == 0 && (
              <Text style={[texts.m]}>No training available</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
