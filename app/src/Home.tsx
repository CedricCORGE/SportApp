import {Button, Text, View} from 'react-native';

export const Home = ({navigation}: any) => {
  const redirectToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Logout"
        onPress={() => {
          redirectToLogin();
        }}
      />
    </View>
  );
};
