'use strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import styles from '../styles'
import WebPage from './webpage'

export default class extends Component {
  render() {
    const { size, articles } = this.props
    return (
      <View style={[ size ]}>
        <ScrollView>
          {(() => {
            return articles.map((article, index) => {
              if (article.url && article.urlToImage) {
                return <WebPage url={ article.url } animType='fade' key={ index }>
                  <View style={[ styles.imgContainer ]}>
                    <Image
                      source={{ uri: article.urlToImage }}
                      style={ styles.headlineImg }
                      resizeMode={ 'cover' }
                      />
                    <View style={[ styles.overlay, styles.blackBackground ]} />
                    <Text style={[ styles.titleText, styles.whiteText, styles.bottomLeft ]}>
                      <Text>
                        { article.title }
                      </Text>

                    </Text>
                  </View>
                </WebPage>
              } else {
                return null
              }
            })
          })()}

        </ScrollView>
      </View>
    )
  }
}
