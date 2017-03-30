import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import Variables from '../styles/variables.js'

const styles = StyleSheet.create({
  text: {
    fontFamily: Variables.headingFont,
    fontSize: Variables.headingFontSize,
  }
})

export default class Heading extends Component {
  render() {
    return (
      <Text style={[styles.text, this.props.style]}>{this.props.children}</Text>
    )
  }
}
