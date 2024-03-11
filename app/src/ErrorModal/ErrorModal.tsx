import {View, Text, Modal, TouchableOpacity} from 'react-native';
import {layers, texts} from '../style/globalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ErrorModal = ({
  display,
  onClose,
}: {
  display: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal visible={display} transparent={true}>
      <View
        style={[
          layers.container,
          {backgroundColor: 'rgba(0,0,0,0.5)', height: '100%'},
        ]}>
        <View
          style={{
            backgroundColor: 'white',
            width: '80%',
            height: '50%',
            borderRadius: 20,
          }}>
          <View style={[layers.container, {width: '100%'}]}>
            <Text style={[texts.bold, texts.l, {paddingTop: '5%'}]}>
              An error occured
            </Text>
            <Ionicons name="close-circle" size={150} color="red" />
            <Text style={[texts.m, {textAlign: 'center', paddingTop: '5%'}]}>
              Error occured during the request. Please try again.
            </Text>
            <View
              style={[layers.container, layers.centered, {paddingTop: '15%'}]}>
              <TouchableOpacity onPress={onClose}>
                <Text
                  style={[
                    texts.m,
                    {textDecorationLine: 'underline', color: '#0066CC'},
                  ]}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
