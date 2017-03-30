import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import StyledText from './styled-text.js'

class Dashboard extends Component {
  render() {
    console.log(this.props);
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

export default connect()(Dashboard)
