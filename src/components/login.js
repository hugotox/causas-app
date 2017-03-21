import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button
} from 'react-native';

export default class Login extends Component {

  login() {
    this.props.triggerLogin(this.props.rut, this.props.clave, this.props.playerId);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Mis Causas</Text>
        <Text>Por favor ingresa tu RUT y clave única para comenzar.</Text>
        <TextInput placeholder='RUT'
                   style={styles.input}
                   value={this.props.rut}
                   onChangeText={text => this.props.changeField('rut', text)}
        />
        <TextInput placeholder='Clave única'
                   secureTextEntry={true}
                   style={styles.input}
                   value={this.props.clave}
                   onChangeText={text => this.props.changeField('clave', text)}
        />
        <Button title='Comenzar' onPress={this.login.bind(this)}
                disabled={this.props.rut === '' || this.props.clave === ''}/>
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
  },
  heading: {
    fontSize: 30
  },
  input: {
    width: 300,
  },
  disclaimer: {
    fontSize: 10,
    marginLeft: 40,
    marginRight: 40,
  }
});
