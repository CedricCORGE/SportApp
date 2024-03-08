import {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {layers, texts} from '../../style/globalStyle';

export const DataRow = (props: any) => {
  const styles = StyleSheet.create({
    itemContainer: {
      margin: '5%',
    },
    itemActions: {
      marginTop: '3%',
    },
  });

  return (
    <View style={[layers.container, styles.itemContainer]}>
      <Text style={[texts.uppercase, texts.s]}>{props.title}</Text>
      <View style={[layers.row, styles.itemActions]}>
        <IconButton
          icon={'minus'}
          size={20}
          mode="outlined"
          iconColor="white"
          containerColor="black"
          onPress={props.decrease}
        />

        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '35%',
          }}>
          <Text
            style={[
              texts.l,
              texts.bold,
              {
                marginHorizontal: '7%',
              },
            ]}>
            {props.data}
          </Text>
        </View>

        <IconButton
          icon={'plus'}
          size={20}
          mode="outlined"
          iconColor="white"
          containerColor="black"
          onPress={props.increase}
        />
      </View>
    </View>
  );
};
