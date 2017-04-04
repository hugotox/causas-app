import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import Utils from '../utils.js'
import StyledText from './styled-text.js'

const DOCUMENT_TYPES = {
  1: 'Sup.',
  2: 'Ape.',
  3: 'Civ.',
  4: 'Lab.',
  5: 'Pen.',
  6: 'Cobr.',
  7: 'Fam.'
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Notification extends Component {
  render () {
    const { notification } = this.props
    const causaNum = notification.document_type  //getRandomInt(1, 8)
    return (
      <View style={styles.notification}>
        <View style={styles.content}>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.causaTypeBadge, styles[`causaType${causaNum}`]]}>
              <StyledText style={styles.causaTypeText}>{DOCUMENT_TYPES[causaNum]}</StyledText>
            </View>
            <StyledText style={styles.bold}>{notification.heading}</StyledText>
          </View>
          <StyledText>
            <Text style={styles.date}>
              ({Utils.getTimeFrom(notification.created)})
            </Text> {notification.contents}
          </StyledText>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  notification: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  date: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 12
  },
  bold: {
    fontWeight: 'bold'
  },
  causaTypeText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold'
  },
  causaTypeBadge: {
    backgroundColor: 'red',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 5,
    height: 25,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  causaType1: { backgroundColor: '#84ba71' },
  causaType2: { backgroundColor: '#c6c270' },
  causaType3: { backgroundColor: '#ad7b79' },
  causaType4: { backgroundColor: '#7987ba' },
  causaType5: { backgroundColor: '#a68b67' },
  causaType6: { backgroundColor: '#a6959e' },
  causaType7: { backgroundColor: '#e9c09a' },
});

export default Notification
