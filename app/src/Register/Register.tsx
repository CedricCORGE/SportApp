import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {buttons, layers, shape, texts} from '../style/globalStyle';
import {useEffect, useState} from 'react';
import {HttpService} from '../services/HttpService';
import {ErrorModal} from '../ErrorModal/ErrorModal';

export const Register = ({navigation}: any) => {
  const [mail, onChangeMail] = useState('');
  const [pseudo, onChangePseudo] = useState('');
  const [password, onChangePassword] = useState('');
  const [confirmPassword, onChangeConfirmPassword] = useState('');

  const [error, setError] = useState(false);

  const onModalClose = () => {
    setError(false);
  };

  const onRegister = () => {
    HttpService.postRequest('user', {
      email: mail,
      pseudo: pseudo,
      password: password,
    }).then((response: any) => {
      if (response.statusCode === 201) {
        console.log(response);
      } else {
        console.log(response.error);
        setError(true);
      }
    });
  };

  const goToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <ErrorModal display={error} onClose={onModalClose} />
      <View style={[layers.container, {height: '100%'}]}>
        <View style={[styles.registerContainer]}>
          <View style={{padding: '5%'}}>
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
              secureTextEntry={true}
              onChangeText={onChangePassword}
              placeholder="Enter your password"
            />
            <TextInput
              style={[styles.input]}
              value={confirmPassword}
              secureTextEntry={true}
              onChangeText={onChangeConfirmPassword}
              placeholder="Confirm your password"
            />
          </View>
          <View style={[layers.centered, {width: '100%'}]}>
            <TouchableOpacity
              style={[buttons.button, {width: '70%', padding: '3%'}]}
              onPress={onRegister}>
              <Text style={[buttons.text]}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[shape.line, {width: '70%'}]}></View>
        <TouchableOpacity style={{paddingVertical: '2%'}} onPress={goToLogin}>
          <Text style={[texts.m, {color: '#0066CC'}]}>
            Already have an account ? Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    backgroundColor: 'white',
    width: '80%',
    minHeight: '60%',
    borderRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    //padding: '5%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    margin: '5%',
    paddingLeft: '5%',
    borderRadius: 20,
  },
});
