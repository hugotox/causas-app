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
import * as Animatable from 'react-native-animatable';
import Intro1 from './intro-1.js';
import Login from './login.js';
import Variables from '../styles/variables.js'

const { height, width } = Dimensions.get('window');

const getStyles = (step) => StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height
  },
  intro1: {
    flex: 1,
    position: 'absolute',
    top: step === 'intro' ? 0 : height,
    opacity: step === 'intro' ? 1 : 0,
    left: 0,
    width,
    height
  },
  login: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: step === 'login' ? 1 : 0,
    width,
    height
  }
})

export default class Intro extends Component {
  constructor(){
    super()
    this.state = {
      step: 'intro'
    }
  }
  comenzar() {
    this.setState({step: 'login'})
  }
  render() {
    const styles = getStyles(this.state.step)
    return (
      <View style={ styles.container }>
        <Image source={require('../assets/justice.png')}
          style={styles.background}
          resizeMode={Image.resizeMode.stretch}
          />
        <Animatable.View style={styles.login} transition={['opacity']} delay={1000}>
          <Login/>
        </Animatable.View>
        <Animatable.View style={styles.intro1} transition={['opacity']}>
          <Intro1 comenzar={ this.comenzar.bind(this) }/>
        </Animatable.View>
      </View>
    )
  }
}
