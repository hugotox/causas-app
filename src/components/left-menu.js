import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'
import StyledText from './styled-text.js'

class LeftMenu extends Component {
  render () {
    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 90
    }
    return (
      <GestureRecognizer
        onSwipeLeft={ this.props.onRequestHide }
        config={config}
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 20
        }}
      >
        <View style={this.props.style}>
          <StyledText>Holi</StyledText>
        </View>
      </GestureRecognizer>
    )
  }
}

export default LeftMenu
