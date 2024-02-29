import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DataRow } from "./component/dataRow";
import { TrainingCard } from "./component/TrainingCard";
import { buttons, layers, shape, texts } from "../style/globalStyle";
import { HttpService } from "../services/HttpService";
import { EditModal } from "./component/EditModal";

export const TimerScreen = ({ navigation }) => {
  const { top } = useSafeAreaInsets();

  const [repetitions, setRepetitions] = useState(1);
  const [work, setWork] = useState({ minutes: 0, seconds: 30 });
  const [rest, setRest] = useState({ minutes: 0, seconds: 30 });
  const [intervals, setIntervals] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalObject, setModalObject] = useState({ id: -1 });

  const openModal = (item) => {
    setModalObject(item);
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
    setModalObject({ id: -1 });
  };

  const saveData = (data) => {
    var test = {
      id: data.id,
      name: data.name,
      repetitions: data.repetitions,
      work: data.work.minutes * 60 + data.work.seconds,
      rest: data.rest.minutes * 60 + data.rest.seconds,
    };
    HttpService.patchRequest("intervals/" + data.id, test).then(async (res) => {
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
          };
          setIntervals({});
          setIntervals(newIntervals);
        }
      }
    });
    hideModal();
  };

  const updateIntervals = (data) => {
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
      });
    }
    return intervals;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await HttpService.getRequest("intervals");
      var intervals = updateIntervals(data);

      setIntervals(intervals);
    };
    fetchData();
  }, []);

  const styles = {
    safeArea: {
      marginTop: top,
    },
    startContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      width: "80%",
      borderRadius: 20,
      marginTop: "5%",
    },
  };

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
          setWork({ minutes: work.minutes - 1, seconds: 55 });
        } else {
          setWork({ minutes: work.minutes, seconds: work.seconds - 5 });
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
        setWork({ minutes: work.minutes + 1, seconds: 0 });
      } else {
        setWork({ minutes: work.minutes, seconds: work.seconds + 5 });
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
          setRest({ minutes: rest.minutes - 1, seconds: 55 });
        } else {
          setRest({ minutes: rest.minutes, seconds: rest.seconds - 5 });
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
        setRest({ minutes: rest.minutes + 1, seconds: 0 });
      } else {
        setRest({ minutes: rest.minutes, seconds: rest.seconds + 5 });
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

  const redirect = () => {
    navigation.navigate("Chronometer", {
      repetitions: repetitions,
      work: work.minutes * 60 + work.seconds,
      rest: rest.minutes * 60 + rest.seconds,
      volume: 100,
    });
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
      <Modal
        visible={modalVisible}
        onBackdropPress={() => this.setModalVisible(false)}
        transparent={true}
        onDismiss={hideModal}
      >
        <EditModal
          saveData={saveData}
          data={modalObject}
          func={functionObj}
        ></EditModal>
      </Modal>
      <ScrollView style={[layers.background]}>
        <View style={[layers.container, styles.safeArea]}>
          <View style={[styles.startContainer]}>
            <Text style={[texts.m, texts.bold, { marginTop: "5%" }]}>
              Quick start
            </Text>

            <DataRow
              increase={increaseReps}
              decrease={decreaseReps}
              data={repetitions}
              title="Repetitions"
            ></DataRow>

            <DataRow
              title="Work"
              data={
                (work.minutes < 10 ? "0" + work.minutes : work.minutes) +
                ":" +
                (work.seconds < 10 ? "0" + work.seconds : work.seconds)
              }
              increase={increaseWork}
              decrease={decreaseWork}
              mode="time"
            ></DataRow>

            <DataRow
              title="Rest"
              data={
                (rest.minutes < 10 ? "0" + rest.minutes : rest.minutes) +
                ":" +
                (rest.seconds < 10 ? "0" + rest.seconds : rest.seconds)
              }
              increase={increaseRest}
              decrease={decreaseRest}
              mode="time"
            ></DataRow>

            <TouchableOpacity
              style={[
                buttons.button,
                { height: 40, width: "35%", marginBottom: "5%" },
              ]}
              onPress={redirect}
            >
              <Text style={[texts.m]}>START</Text>
            </TouchableOpacity>
          </View>
          <View style={[shape.line, { width: "70%" }]}></View>
          <View
            style={{
              width: "80%",
              paddingVertical: "5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={[texts.bold, texts.m, { paddingBottom: "5%" }]}>
              Your training
            </Text>

            <FlatList
              scrollEnabled={false}
              data={intervals}
              renderItem={TrainingCard}
            ></FlatList>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
