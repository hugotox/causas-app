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
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  heading: {
    fontSize: 30,
    marginBottom: 30,
    padding: 20,
  },
  link: {
    marginBottom: 20,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingLeft: 20,
  },
  linkSelected: {
    backgroundColor: '#efefef',
  },
  linkIcon: {
    width: 35,
  }
})