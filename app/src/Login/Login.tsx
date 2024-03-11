import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {user} from '../User';
import {buttons, layers, shape, texts} from '../style/globalStyle';
import {useState} from 'react';

export const Login = ({navigation}: any) => {
  const client = user;

  const [mail, onChangeMail] = useState('');
  const [password, onChangePassword] = useState('');

  const onLogin = () => {
    client.setIsLogged(true);
    navigation.navigate('Root', {screen: 'Home', initial: false});
  };

  const goToRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <View style={[layers.container, layers.centered, {height: '100%'}]}>
      <View style={[styles.loginContainer]}>
        <View>
          <Text style={[texts.bold, texts.uppercase, texts.l]}>Login</Text>
        </View>
        <View style={{width: '90%'}}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeMail}
            value={mail}
            placeholder="Enter your e-mail or pseudonyme"></TextInput>
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry={true}
            placeholder="Enter your password"></TextInput>
        </View>
        <View style={[layers.centered, {width: '100%'}]}>
          <TouchableOpacity
            style={[buttons.button, {width: '70%', padding: '3%'}]}
            onPress={onLogin}>
            <Text style={[texts.l, texts.uppercase, texts.bold]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[shape.line, {width: '70%'}]}></View>
      <TouchableOpacity style={{paddingTop: '5%'}} onPress={goToRegister}>
        <Text style={[texts.m, {color: '#0066CC'}]}>
          Don't have account ? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: 'white',
    width: '80%',
    height: '60%',
    borderRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    margin: '5%',
    paddingLeft: '5%',
    borderRadius: 20,
  },
});
