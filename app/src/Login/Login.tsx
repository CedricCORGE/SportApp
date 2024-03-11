import {Button, View, Text} from 'react-native';
import {user} from '../User';

export const Login = ({navigation}: any) => {
  const client = user;

  const navigateToHome = () => {
    client.setIsLogged(true);
    navigation.navigate('Root', {screen: 'Home', initial: false});
  };

  return (
    <View>
      <Text>Login</Text>
      <Button title="Login" onPress={navigateToHome} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('RegisterScreen')}
      />
    </View>
  );
};
