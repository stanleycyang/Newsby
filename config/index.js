'use strict'

import Dimensions from 'Dimensions';

const window = Dimensions.get('window');

export default {
  windowHeight: window.height,
  windowWidth: window.width,

  windowHeightHalf: window.height * 0.5,
  windowHeightThird: window.height * 0.333,
  windowHeightTwoThirds: window.height * 0.666,
  windowHeightQuarter: window.height * 0.25,
  windowHeightFifth: window.height * 0.20,
  windowHeightThreeQuarters: window.height * 0.75,

  windowWidthHalf: window.width * 0.5,
  windowWidthThird: window.width * 0.333,
  windowWidthTwoThirds: window.width * 0.666,
  windowWidthQuarter: window.width * 0.25,
  windowWidthFifth: window.width * 0.20,
  windowWidthThreeQuarters: window.width * 0.75,
  windowWidthNineTenths: window.width * 0.9,

  /*
   * Create your own API key by signing up for newsapi.org: https://newsapi.org/
   * Plug it in here. We will explain how to use this in the next lesson
   */

  apiUrl: 'https://newsapi.org/v1',
  apiKey: 'ADD_YOUR_API_KEY', // add your API key here

}
