import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

import StyledText from './styled-text.js'
import Heading from './heading.js'
import Button from './button.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    color: 'white',
  },
  text: {
    color: 'white',
    backgroundColor: '#00000033',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5
  },
  skip: {
    color: 'white',
    backgroundColor: '#1a396bdd',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
  },
  headingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: 50,
  }
})

const {height, width} = Dimensions.get('window');

export default class Intro1 extends Component {
  render() {
    const buttonWidth = width - 50;
    return (
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Heading style={styles.title}>Mis Causas</Heading>
        </View>
        <View style={styles.centerContainer}>
          <StyledText style={styles.text}>
            Recibe notificaciones sobre nuevos documentos en tus causas.
          </StyledText>
        </View>
        <View style={styles.buttonContainer}>
          <Button buttonWidth={buttonWidth} onPress={ this.props.comenzar }>Comenzar</Button>
        </View>
      </View>
    )
  }
}
