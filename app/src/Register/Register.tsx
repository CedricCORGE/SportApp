import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {buttons, layers, shape, texts} from '../style/globalStyle';
import {useEffect, useState} from 'react';

export const Register = ({navigation}: any) => {
  const [mail, onChangeMail] = useState('');
  const [pseudo, onChangePseudo] = useState('');
  const [password, onChangePassword] = useState('');
  const [confirmPassword, onChangeConfirmPassword] = useState('');

  const onRegister = () => {};

  const goToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={[layers.container, layers.centered, {height: '100%'}]}>
      <View style={[styles.registerContainer]}>
        <View>
          <Text style={[texts.bold, texts.uppercase, texts.l]}>Register</Text>
        </View>
        <View style={{width: '90%'}}>
          <TextInput
            style={[styles.input]}
            value={mail}
            onChangeText={onChangeMail}
            placeholder="Enter your e-mail"
          />
          <TextInput
            style={[styles.input]}
            value={pseudo}
            onChangeText={onChangePseudo}
            placeholder="Enter your pseudonyme"
          />
          <TextInput
            style={[styles.input]}
            value={password}
            onChangeText={onChangePassword}
            placeholder="Enter your password"
          />
          <TextInput
            style={[styles.input]}
            value={confirmPassword}
            onChangeText={onChangeConfirmPassword}
            placeholder="Confirm your password"
          />
        </View>
        <View style={[layers.centered, {width: '100%'}]}>
          <TouchableOpacity
            style={[buttons.button, {width: '70%', padding: '3%'}]}
            onPress={onRegister}>
            <Text style={[texts.bold, texts.uppercase, texts.l]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[shape.line, {width: '70%'}]}></View>
      <TouchableOpacity style={{paddingTop: '5%'}} onPress={goToLogin}>
        <Text style={[texts.m, {color: '#0066CC'}]}>
          Already have an account ? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
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
