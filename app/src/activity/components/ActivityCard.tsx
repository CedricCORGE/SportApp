import {Card} from 'react-native-paper';
import {IntervalsDto} from '../../TimerScreen/TimerScreen';
import {Text, View} from 'react-native';
import {layers, shape, texts} from '../../style/globalStyle';

interface Activity {
  id: number;
  date: string;
  name: string;
  duration: number;
  interval: IntervalsDto;
}

const RowItem = ({label, value}: {label: string; value: string | number}) => {
  return (
    <View style={[layers.centered]}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

export const ActivityCard = ({activity}: {activity: Activity}) => {
  console.log(activity);
  return (
    <View style={[layers.container, {width: '100%'}]}>
      <View style={[{width: '90%', padding: '2%'}]}>
        <Card>
          <Card.Title
            style={{width: '100%'}}
            title={<Text style={[texts.bold]}>{activity.name}</Text>}
          />
          <Card.Content>
            <View style={[layers.row]}>
              <RowItem label="Temps" value={activity.duration} />

              <View
                style={[
                  shape.verticalLine,
                  {height: '100%', marginHorizontal: '5%'},
                ]}></View>
              <RowItem label="Séries" value={activity.interval.repetitions} />

              <View
                style={[
                  shape.verticalLine,
                  {height: '100%', marginHorizontal: '5%'},
                ]}></View>
              <RowItem label="Travail" value={activity.interval.work} />

              <View
                style={[
                  shape.verticalLine,
                  {height: '100%', marginHorizontal: '5%'},
                ]}></View>
              <RowItem label="Repos" value={activity.interval.rest} />
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};
