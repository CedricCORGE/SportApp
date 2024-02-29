import { Text, TouchableOpacity, View } from "react-native";
import { Card, Modal } from "react-native-paper";
import { buttons, layers, texts } from "../../style/globalStyle";
import { useState } from "react";
import { DataRow } from "./dataRow";

export const TrainingCard = ({ item }) => {
  return (
    <View style={{ marginBottom: "5%" }}>
      <Card style={[styles.title]}>
        <Card.Content>
          <View>
            <Text style={[texts.l, texts.bold]}>{item.name}</Text>
            <View style={[styles.cardContent]}>
              <View style={[styles.trainingData]}>
                <Text>Repetitions: {item.repetitions}</Text>
                <Text>
                  Work:{" "}
                  {(item.work.minutes < 10
                    ? "0" + item.work.minutes
                    : item.work.minutes) +
                    ":" +
                    (item.work.seconds < 10
                      ? "0" + item.work.seconds
                      : item.work.seconds)}
                </Text>
                <Text>
                  Rest:{" "}
                  {(item.rest.minutes < 10
                    ? "0" + item.rest.minutes
                    : item.rest.minutes) +
                    ":" +
                    (item.rest.seconds < 10
                      ? "0" + item.rest.seconds
                      : item.rest.seconds)}
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
                  onPress={() => {
                    item.edit(item);
                  }}
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
