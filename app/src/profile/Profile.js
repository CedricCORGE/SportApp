import { View, Button, Dimensions, Separator } from "react-native";
import { UserInformation } from "./component/UserInformation";
import { Header } from "./component/Header";

export const Profile = (props) => {
  return (
    <View style={[styles.profile]}>
      <Header name={props.name} gender={props.gender} />
      <UserInformation user={props} />
      <Button
        title="Changer de mot de passe"
        onPress={() => console.log("Changement de mot de passe")}
      ></Button>
      <View style={[styles.separator]}></View>
      <Button
        title="Se déconnecter"
        color={"red"}
        onPress={() => console.log("Pressed")}
      ></Button>
    </View>
  );
};

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const styles = {
  profile: {
    width: width,
    height: height,
    backgroundColor: "white",
    alignItems: "center",
  },
  separator: {
    width: width * 0.57,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginVertical: 10,
  },
};
