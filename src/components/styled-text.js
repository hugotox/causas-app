import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import Variables from '../styles/variables.js'

const styles = StyleSheet.create({
  text: {
    fontFamily: Variables.textFont,
    fontSize: Variables.fontSize,
    color: Variables.textColor
  }
})

export default class StyledText extends Component {
  render() {
    return (
      <Text style={[styles.text, this.props.style]}>{this.props.children}</Text>
    )
  }
}
