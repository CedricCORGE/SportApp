import {StyleSheet} from 'react-native';

export const texts = StyleSheet.create({
  s: {
    fontSize: 16,
  },
  m: {
    fontSize: 18,
  },
  l: {
    fontSize: 20,
  },
  xl: {
    fontSize: 30,
  },
  title: {
    fontSize: 25,
  },
  bold: {
    fontWeight: 'bold',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
});

export const buttons = StyleSheet.create({
  button: {
    backgroundColor: '#E5EB0E',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    margin: 5,
  },
  text: {
    paddingRight: 5,
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export const layers = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#EAEAEA',
    height: '100%',
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const shape = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: 'black',
    marginTop: '5%',
  },
  verticalLine: {
    width: 1,
    backgroundColor: 'black',
  },
});
