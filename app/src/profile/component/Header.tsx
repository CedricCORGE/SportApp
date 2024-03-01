import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

export const Header = (props: any) => {
  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={['#072DEE', '#0425CF']}
        style={[styles.backgroundHeader]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}></LinearGradient>

      <View style={[styles.header]}>
        <View style={[styles.pictures]}></View>
        <Text>{props.name}</Text>
        <Text>{props.gender}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '30%',
    width: '100%',
  },
  header: {
    display: 'flex',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '-10%',
  },
  backgroundHeader: {
    height: '50%',
  },
  pictures: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 50,
  },
});
