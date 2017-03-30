import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/sync';
import Variables from '../styles/variables.js'
import Button from './button.js'

class Login extends Component {

  login() {
    this.props.triggerLogin(this.props.rut, this.props.clave, this.props.playerId);
  }

  render() {
    const {height, width} = Dimensions.get('window');
    const disableButton = this.props.rut === '' || this.props.clave === '';
    const buttonWidth = width - 50;
    return (
      <View style={styles.container}>
        <Image style={[styles.backImage, {width, height}]}
          source={require('../assets/portada-ojv-sm.jpg')}
          resizeMode={Image.resizeMode.stretch}/>
        <Text style={styles.heading}>CAUSAS</Text>
        <Text style={styles.text}>Por favor ingresa tu RUT y clave única para comenzar.</Text>
        <TextInput placeholder='RUT'
          style={[styles.input, {width: buttonWidth}]}
          value={this.props.rut}
          onChangeText={text => this.props.changeField('rut', text)}
          underlineColorAndroid="transparent"
          placeholderTextColor={Variables.placeholderTextColor}
        />
        <TextInput placeholder='Clave única'
          secureTextEntry={true}
          style={[styles.input, {width: buttonWidth}]}
          value={this.props.clave}
          onChangeText={text => this.props.changeField('clave', text)}
          underlineColorAndroid="transparent"
          placeholderTextColor={Variables.placeholderTextColor}
        />
        <Button onPress={disableButton ? null : this.login.bind(this)}
          buttonWidth={buttonWidth} disableButton={disableButton}>
            INGRESAR
        </Button>
        {this.props.loginError ?
          <Text>{this.props.loginError}</Text>
        :null}
        <Text style={styles.disclaimer}>
          La clave única es necesaria para permitir el acceso al sitio del poder
          judicial. Ésta clave no se guarda en la memoria del teléfono.
        </Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },
  backImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1
  },
  heading: {
    fontSize: 30,
    color: Variables.textWhite,
    fontFamily: 'Bitter-Bold',
    backgroundColor: '#ffffff00',
  },
  text: {
    color: Variables.textWhite,
    fontFamily: Variables.textFont,
    backgroundColor: '#ffffff00',
    fontSize: Variables.fontSize,
  },
  input: {
    height: 50,
    color: Variables.textWhite,
    backgroundColor: '#33333399',
    borderRadius: 4,
    fontFamily: Variables.textFont,
    fontSize: Variables.fontSize,
    paddingLeft: 20,
    paddingRight: 20,
  },
  disclaimer: {
    fontSize: 10,
    marginLeft: 20,
    marginRight: 20,
    color: Variables.textWhite,
    fontFamily: Variables.textFont,
    backgroundColor: '#ffffff00',
  }
});

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

export default connect(mapStateToProps, mapActionsToProps)(Login);
