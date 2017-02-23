import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Index from './src/index';

export default class CausasApp extends Component {
  render() {
    return (
      <Index/>
    );
  }
}

AppRegistry.registerComponent('CausasApp', () => CausasApp);
