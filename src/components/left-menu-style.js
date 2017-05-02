import React from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import Variables from '../styles/variables.js'

const {height, width} = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#cee5ef'
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
  separator: {
    borderBottomColor: '#b5c8d1',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  linkSelected: {
    // backgroundColor: '#efefef',
  },
  linkIcon: {
    width: 35,
  }
})