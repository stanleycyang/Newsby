'use strict'

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from '../middlewares/promise';

import rootReducer from '../reducers';

// include all the middleware
let middlewares = [
  thunkMiddleware,
  promiseMiddleware // put the promise into the array
];

let createStoreWithMiddleware = applyMiddleware(
  ...middlewares // put in the middleware
)(createStore);

function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}

export default configureStore();
