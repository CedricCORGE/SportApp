import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";

export const DataRow = (props) => {
  const styles = {
    itemContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: "5%",
    },
    itemActions: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "3%",
    },
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "lightgrey",
      width: "5%",
    },
  };

  return (
    <View style={[styles.itemContainer]}>
      <Text style={{ textTransform: "uppercase", fontSize: 16 }}>
        {props.title}
      </Text>
      <View style={[styles.itemActions]}>
        <IconButton
          icon={"minus"}
          size={10}
          mode="outlined"
          iconColor="white"
          containerColor="black"
          onPress={props.decrease}
        />

        <Text
          style={{
            marginHorizontal: "7%",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {props.data}
        </Text>
        <IconButton
          icon={"plus"}
          size={10}
          mode="outlined"
          iconColor="white"
          containerColor="black"
          onPress={props.increase}
        />
      </View>
    </View>
  );
};
