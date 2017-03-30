import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import StyledText from './styled-text.js'

export default class Dashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StyledText>Últimos documentos recibidos</StyledText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  }
});
