import {View, Button, Dimensions, StyleSheet} from 'react-native';
import {UserInformation} from './component/UserInformation';
import {Header} from './component/Header';

interface User {
  height: string;
  weight: string;
  name: string;
  gender: string;
}

export const Profile = (user: User) => {
  return (
    <View style={[styles.profile]}>
      <Header name={user.name} gender={user.gender} />
      <UserInformation {...user} />
      <Button
        title="Changer de mot de passe"
        onPress={() => console.log('Changement de mot de passe')}></Button>
      <View style={[styles.separator]}></View>
      <Button
        title="Se déconnecter"
        color={'red'}
        onPress={() => console.log('Pressed')}></Button>
    </View>
  );
};

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  profile: {
    width: width,
    height: height,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  separator: {
    width: width * 0.57,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginVertical: 10,
  },
});
