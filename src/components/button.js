import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Variables from '../styles/variables.js'

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: Variables.blue,
    borderRadius: 4,
    paddingTop: 15,
    paddingBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: '#333333cc',
  },
  buttonText: {
    textAlign: 'center',
    color: Variables.textWhite,
    fontFamily: Variables.textFont,
    fontSize: Variables.fontSize,
  },
  buttonTextDisabled: {
    color: '#999'
  }
})

export default class Button extends Component {
  render() {
    let { onPress, buttonWidth, disableButton } = this.props
    return (
      <TouchableOpacity onPress={ disableButton ? null : onPress }
        style={ [styles.button, {width: buttonWidth}, disableButton ? styles.buttonDisabled : null] }>
        <Text style={[styles.buttonText, disableButton ? styles.buttonTextDisabled : null]}>
          { this.props.children }
        </Text>
      </TouchableOpacity>
    )
  }
}
