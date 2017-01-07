'use strict'

import {
  StyleSheet, // StyleSheet helps us create CSS-like styling with JS
  Platform // Platform allows us to identify whether the device is iOS or Android
} from 'react-native';

import config from '../config'; // source in our configuration files

// Create app-wide styling
const AppStyles = StyleSheet.create({

  navbar: { // create the styles for our navbar.
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 0,
  },

  logo: { // create the styles for our logo
    maxWidth: config.windowWidthHalf,
    resizeMode: 'contain',
    alignSelf: 'center',
    ...Platform.select({ // use our Platform configuration to add styles
      ios: { // styling for iOS
        maxHeight: 55,
        marginTop: 20
      },
      android: { // styling for Android
        maxHeight: 50,
        marginTop: 10
      }
    })
  },

  // makes us add a header margin
  pageContainer: {
    position: 'relative',
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 63,
      },
      android: {
        marginTop: 50
      }
    })
  },

  // centers everything in the middle using flexbox
  containerCentered: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  greyBackground: {
      backgroundColor: '#F5F5F5'
  },

  blackText: {
    color: '#000000'
  },

  paddingTopSml: {
    paddingTop: 10,
  },

  paddingBottomSml: {
    paddingBottom: 10,
  },

  btnBlack: {
    ...Platform.select({
      ios: {
        paddingTop: 25,
        paddingBottom: 15,
      },
      android: {
        padding: 15
      }
    }),
    backgroundColor: '#212121',
  },

  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },

  imgContainer: {
    flex: 1,
    margin: 1
  },

  headlineImg: {
    width: config.windowWidth - 2,
    height: config.windowHeightThird
  },

  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.3,
    width: config.windowWidth,
  },

  titleText: {
    fontWeight: '500',
    fontSize: 17,
    paddingBottom: 10
  },

  whiteText: {
    color: '#fff',
    backgroundColor: 'transparent',
  },

  bottomLeft: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 5
  },

});

// export the file for usage
export default AppStyles;
