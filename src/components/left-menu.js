import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import StyledText from './styled-text.js'

class LeftMenu extends Component {
  render () {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 20
        }}
      >
        <View style={this.props.style}>
          <StyledText>Holi</StyledText>
          <StyledText>Holi</StyledText>
          <StyledText>Holi</StyledText>
          <StyledText>Holi</StyledText>
        </View>
      </View>
    )
  }
}

export default LeftMenu
