import { View, Text, Dimensions } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";

calculateIMC = (weight, height) => {
  weight = parseFloat(weight);
  height = parseInt(height) / 100;
  return (weight / (height * height)).toFixed(1);
};

changeWeight = () => {
  console.log("changeWeight");
};

changeHeight = () => {
  console.log("changeHeight");
};

export const UserInformation = ({ user }) => {
  return (
    <View style={[styles.userContainer]}>
      <View style={[styles.userRow]}>
        <Text>Height: {user.height}</Text>
        <IconButton icon="pencil" onPress={changeHeight}></IconButton>
      </View>
      <View style={[styles.line]}></View>
      <View style={[styles.userRow]}>
        <Text>Weight: {user.weight}</Text>
        <IconButton icon="pencil" onPress={changeWeight}></IconButton>
      </View>

      <View style={[styles.line]}></View>
      <Text>IMC: {calculateIMC(user.weight, user.height)}</Text>
    </View>
  );
};

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const styles = {
  line: {
    width: width * 0.7,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginVertical: 10,
  },
  userContainer: {
    width: width * 0.8,
    height: height * 0.3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    marginTop: width * 0.1,
    marginBottom: width * 0.1,
  },
  userRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
};
