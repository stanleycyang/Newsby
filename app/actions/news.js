'use strict'

import {
  GET,
} from './index.js';
import TYPES from '../types';

export function grabNews(source, index) {
  return {
    type: TYPES.GRAB_NEWS,
    promise: GET(`articles?source=${source}`), // This is a promise parameter that will be detected by our promiseMiddleware and processed asynchronously
    index
  }
}
