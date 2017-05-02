import React from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    flex: 1,
    marginTop: 20,
  },
  input: {
    height: 200,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 3,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  button: {
    color: 'white'
  },
})