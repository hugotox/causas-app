import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { AsyncStorage, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import store from './store';
import Main from './main';


export default class Index extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      rehydrated: false
    }
  };

  componentWillMount() {
    persistStore(store, {storage: AsyncStorage}, () => {
      this.setState({rehydrated: true});
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Main rehydrated={ this.state.rehydrated }/>
      </Provider>
    );
  }
}
