import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OneSignal from 'react-native-onesignal';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';

import Login from './components/login';
import Dashboard from './components/dashboard';
import * as actions from './actions/sync';


class Main extends Component {

  constructor(props) {
    super(props);
    this.onIds = this.onIds.bind(this);
    this.styles = this.createStyles();
  }

  createStyles() {
    const {height, width} = Dimensions.get('window');
    return StyleSheet.create({
      container: {
        flex: 1
      },
      login: {
        width: width,
        height: height,
        top: this.props.pushNoticationSetup ? -height : 0,
        opacity: this.props.pushNoticationSetup ? 0 : 1,
        position: 'absolute',
      },
      dashboard: {
        width: width,
        height: height,
        top: this.props.pushNoticationSetup ? 0 : 50,
        position: 'absolute',
        opacity: this.props.pushNoticationSetup ? 1 : 0
      }
    });
  }

  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onRegistered(notifData) {
    console.log("Device had been registered for push notifications!", notifData);
  }

  onIds(device) {
    console.log('Device info: ', device);
    this.props.savePlayerID(device.userId);
  }

  render() {
    if (this.props.pushNoticationSetup) {
      this.styles = this.createStyles();
    }
    return (
      <View style={this.styles.container}>
        <Spinner visible={this.props.loggingIn}
                 textContent={"Conectando..."}
                 textStyle={{color: '#FFF'}} />
        <Animatable.View style={this.styles.dashboard}
          transition={['opacity', 'top']}
          easing="ease-out"
          duration={500}
        >
          <Dashboard/>
        </Animatable.View>
        <View style={this.styles.login}>
          <Login
            rut={this.props.rut}
            clave={this.props.clave}
            playerId={this.props.playerId}
            triggerLogin={this.props.triggerLogin}
            changeField={this.props.changeField}
            loginError={this.props.loginError}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pushNoticationSetup: state.pushNoticationSetup,
    playerId: state.playerId,
    rut: state.rut,
    clave: state.clave,
    loggingIn: state.loggingIn,
    loginError: state.loginError,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    savePlayerID: bindActionCreators(actions.savePlayerID, dispatch),
    triggerLogin: bindActionCreators(actions.triggerLogin, dispatch),
    changeField: bindActionCreators(actions.changeField, dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Main);
