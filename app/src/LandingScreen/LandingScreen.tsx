import {Text, View, TouchableOpacity, Image} from 'react-native';
import {buttons, layers, texts} from '../style/globalStyle';

export const LandingScreen = ({navigation}: any) => {
  return (
    <View style={[layers.container, layers.centered, {height: '100%'}]}>
      <Text style={[texts.bold, texts.xl]}>SportApp</Text>

      <Image
        style={{marginVertical: '20%'}}
        source={require('../../assets/logo.png')}></Image>

      <TouchableOpacity
        style={[buttons.button, {width: '60%', padding: '3%'}]}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={[texts.bold, texts.uppercase, texts.l]}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[buttons.button, {width: '60%', padding: '3%'}]}
        onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={[texts.bold, texts.uppercase, texts.l]}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};
