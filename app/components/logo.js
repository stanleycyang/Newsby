'use strict'

import React, { Component } from 'react'
import {
  View,
  Image,
} from 'react-native'
import styles from '../styles' // bring in our stylesheet
import config from '../../config' // bring in our configurations

class Logo extends Component {
  render() {
    return (
      <View style={{ width: config.windowWidth, height: 35 }}>
        <Image
          source={ require('../imgs/newsby-logo.png') }
          style={ styles.logo }
          />
      </View>
    )
  }
}

// We have to export this component differently since react-native-router-flux library expects a function returned vs. a class
export default () => {
  return <Logo />
}
