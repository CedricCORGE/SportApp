import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card, IconButton, Modal} from 'react-native-paper';
import {buttons, layers, texts} from '../../style/globalStyle';
import React from 'react';
import {HttpService} from '../../services/HttpService';

export const TrainingCard = ({item, updateList}: any) => {
  const deleteCard = () => {
    console.log(item);
    HttpService.deleteRequest('intervals/' + item.id).then(response => {
      updateList();
    });
  };

  const totalTime = (item: any) => {
    let seconds = (item.work.seconds + item.rest.seconds) * item.repetitions;
    let minutes = (item.work.minutes + item.rest.minutes) * item.repetitions;

    while (seconds >= 60) {
      minutes++;
      seconds -= 60;
    }

    let secondsTotal = seconds < 10 ? '0' + seconds : seconds;
    let minutesTotal = minutes < 10 ? '0' + minutes : minutes;

    return minutesTotal + ':' + secondsTotal;
  };

  return (
    <View style={{marginBottom: '5%'}}>
      <Card style={[styles.title]}>
        <IconButton
          icon="delete-outline"
          style={{position: 'absolute', right: 0, top: 0}}
          onPress={() => {
            deleteCard();
          }}
        />
        <Card.Content>
          <View>
            <Text style={[texts.l, texts.bold]}>{item.name}</Text>
            <View style={[styles.cardContent]}>
              <View style={[styles.trainingData]}>
                <Text style={[texts.s]}>Repetitions: {item.repetitions}</Text>

                <Text style={[texts.s]}>
                  Work:{' '}
                  {(item.work.minutes < 10
                    ? '0' + item.work.minutes
                    : item.work.minutes) +
                    ':' +
                    (item.work.seconds < 10
                      ? '0' + item.work.seconds
                      : item.work.seconds)}
                </Text>
                <Text style={[texts.s]}>
                  Rest:{' '}
                  {(item.rest.minutes < 10
                    ? '0' + item.rest.minutes
                    : item.rest.minutes) +
                    ':' +
                    (item.rest.seconds < 10
                      ? '0' + item.rest.seconds
                      : item.rest.seconds)}
                </Text>
                <Text style={[texts.s]}>Total: {totalTime(item)}</Text>
              </View>

              <View style={[layers.centered]}>
                <TouchableOpacity
                  style={[buttons.button, {width: '60%', height: 30}]}
                  onPress={() => {
                    item.edit(item);
                  }}>
                  <Text style={[texts.s, texts.bold]}>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[buttons.button, {width: '60%', height: 30}]}
                  onPress={() => {
                    item.start(item);
                  }}>
                  <Text style={[texts.s, texts.bold]}>START</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  trainingData: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  cardContent: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
});
