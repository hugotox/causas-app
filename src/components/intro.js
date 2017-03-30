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
import Swiper from 'react-native-swiper';
import Intro1 from './intro-1.js';
import Login from './login.js';
import Variables from '../styles/variables.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
  },
})

export default class Intro extends Component {
  comenzar() {
    // TODO: navigate to login
  }
  render() {
    const {height, width} = Dimensions.get('window');
    return (
      <View style={ styles.container }>
        <Image source={require('../assets/portada-ojv-sm.jpg')}
          style={ [styles.background, {width, height}] }
          resizeMode={Image.resizeMode.stretch}
          />
        <Swiper loop={false}>
          <Intro1 comenzar={ this.comenzar.bind(this) }/>
          <Login/>
        </Swiper>
      </View>
    )
  }
}
