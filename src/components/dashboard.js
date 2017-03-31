import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import * as actions from '../actions/sync.js'
import StyledText from './styled-text.js'

class Dashboard extends Component {

  componentDidMount() {
    this.props.dispatch(actions.triggerfetchNotifications(this.props.rut))
  }

  render() {
    return (
      <View style={styles.container}>
        { this.props.fetchNotifications && <StyledText>Cargando datos...</StyledText> }
        <StyledText>Últimos documentos recibidos</StyledText>
        { this.props.notifications && this.props.notifications.map(notification => {
          return (
            <StyledText key={notification.id}>{notification.heading}</StyledText>
          )
        })}
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

const mapStateToProps = state => {
  return {
    rut: state.rut,
    notifications: state.notifications,
    fetchNotifications: state.fetchNotifications
  }
}

export default connect(mapStateToProps)(Dashboard)
