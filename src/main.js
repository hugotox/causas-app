import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OneSignal from 'react-native-onesignal';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';

import Intro from './components/intro';
import Dashboard from './components/dashboard';
import * as actions from './actions/sync';


class Main extends Component {

  constructor(props) {
    super(props);
    this.onIds = this.onIds.bind(this);
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

  componentDidMount() {
    // IOS Testing
    // if(Platform.OS === 'ios') {
    //   this.props.savePlayerID('9f3f6e3d-fd1f-4541-8511-d331ee77d488')
    // }
  }

  render() {
    let content = null
    // wait for storage and playerId
    if(!this.props.rehydrated || !this.props.playerId) {
      const {height, width} = Dimensions.get('window');
      content = (
        <View style={styles.container}>
          <Image style={{position: 'absolute', top: 0, left: 0, flex: 1, width, height}}
            source={require('./assets/justice.png')}
            resizeMode={Image.resizeMode.stretch}
          />
          <Spinner visible={ true } textContent={"Cargando..."} textStyle={{color: '#fff'}} />
        </View>
      );
    } else {
        // pushNoticationSetup is true only after login is successful
        if (!this.props.pushNoticationSetup) {
          content = <Intro/>
        } else {
          content = <Dashboard/>
        }
    }

    return (
      <View style={styles.container}>
        { content }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
})

const mapStateToProps = (state) => {
  return {
    pushNoticationSetup: state.pushNoticationSetup,
    playerId: state.playerId,
    rut: state.rut,
    clave: state.clave,
    logingIn: state.logingIn,
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
