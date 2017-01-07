'use strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  ActivityIndicator // this is a component that shows a loading state in Android and iOS
} from 'react-native';

import styles from '../styles.js';

export default class extends Component {
  render() {
    return (
      <View style={[ styles.pageContainer, styles.containerCentered, styles.greyBackground ]}>
        <ActivityIndicator
          color={ 'black' }
          size={ 'large' }
          animating={ true }
          />
        <Text style={[ styles.blackText, styles.paddingTopSml ]}>Loading..</Text>
      </View>
    )
  }
}
