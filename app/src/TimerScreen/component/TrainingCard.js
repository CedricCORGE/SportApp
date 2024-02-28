import { Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import { buttons, layers, texts } from "../../style/globalStyle";

export const TrainingCard = (props) => {
  return (
    <View>
      <Card style={[styles.title]}>
        <Card.Content>
          <View>
            <Text style={[texts.l, texts.bold]}>{props.name}</Text>
            <View style={[styles.cardContent]}>
              <View style={[styles.trainingData]}>
                <Text>Repetitions: {props.repetitions}</Text>
                <Text>
                  Work:{" "}
                  {(props.work.minutes < 10
                    ? "0" + props.work.minutes
                    : props.work.minutes) +
                    ":" +
                    (props.work.seconds < 10
                      ? "0" + props.work.seconds
                      : props.work.seconds)}
                </Text>
                <Text>
                  Rest:{" "}
                  {(props.rest.minutes < 10
                    ? "0" + props.rest.minutes
                    : props.rest.minutes) +
                    ":" +
                    (props.rest.seconds < 10
                      ? "0" + props.rest.seconds
                      : props.rest.seconds)}
                </Text>
              </View>
              <View style={[layers.centered]}>
                <TouchableOpacity
                  style={[buttons.button, { width: "60%", height: 30 }]}
                >
                  <Text style={[texts.s]}>START</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[buttons.button, { width: "60%", height: 30 }]}
                >
                  <Text style={[texts.s]}>EDIT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = {
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  trainingData: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  cardContent: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};
