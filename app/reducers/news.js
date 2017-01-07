'use strict'

import {
  Map
} from 'immutable'; // use the immutable library to create a Map
import TYPES from '../types';

// Create an initial state for the app with a Map
const initialState = Map({
  sources: [
    'associated-press',
    'bbc-news',
    'bloomberg',
    'business-insider',
    'buzzfeed'
  ],
  page1: [],
  page2: [],
  page3: [],
  page4: [],
  page5: []
});

// export the reducer to be used and plug in the initial state
export default function News(state = initialState, action) {
  let stateJS = state.toJS(); // turn the Map back to a JS object

  switch (action.type) {
    case `${TYPES.GRAB_NEWS}_REQUEST`: // perform string concatenation with the variable and the string "_REQUEST"
      return state;
    case `${TYPES.GRAB_NEWS}_SUCCESS`:
      return state.set(`page${action.index + 1}`, action.json.articles);
    case `${TYPES.GRAB_NEWS}_FAILURE`:
      return state;
    default:
      return state;
  }
}
