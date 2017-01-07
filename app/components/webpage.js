'use strict'

import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Modal, // This is a modal which will open over the current page
  WebView, // this is an iframe: used to render websites
  TouchableOpacity, // this gives an element opacity on press
  TouchableWithoutFeedback // this allows users to click elements (such as buttons) without any feedback
} from 'react-native';

// Tap into the FontAwesome library for our symbols
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles';

export default class extends Component {

  // This function runs when the component gets created
  constructor(props) {
    super(props);

    // Set the initial state. We set the url by flowing the prop in, and we set the modalOpen to false to start
    this.state = {
      url: props.url,
      modalOpen: false
    }
  }

  // function to close the modal. We do this by changing the state modalOpen to false
  _closeModal = () => {
    this.setState({
      modalOpen: false
    })
  }

  // function to open the modal. We do this by changing the state modalOpen to true
  _openModal = () => {
    this.setState({
      modalOpen: true
    })
  }

  render() {
    // We will load our variables from our state. Then we will alias the url to uri
    const { modalOpen, url: uri } = this.state

    // We can customize the animation type, so we can use the modal in many different situations
    const { animType } = this.props

    return (
      <View>
        {/* Set up the modal */}
        <Modal
          animationType={ animType }
          transparent={ false }
          onRequestClose={() => { console.log('Modal is closed') }}
          visible={ modalOpen }
          >

          {/* Close button */}
          <TouchableOpacity onPress={ this._closeModal } style={ styles.btnBlack }>
            <Text style={ styles.btnText }>
              <Icon name='chevron-left' size={ 12 } /> Back to Newsby
            </Text>
          </TouchableOpacity>

          {/* webview */}
          <WebView source={{ uri }} />


        </Modal>

        <TouchableWithoutFeedback onPress={ this._openModal }>
          { this.props.children }
        </TouchableWithoutFeedback>

      </View>
    )
  }
}
