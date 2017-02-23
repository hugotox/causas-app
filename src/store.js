import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { createStore, compose, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist';
import reducer from './reducer';

//const store = compose(autoRehydrate())(createStore)(reducer, applyMiddleware(thunk));

const store = createStore(reducer, applyMiddleware(thunk));

export default store;