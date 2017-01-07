'use strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions
} from 'react-native' // Text and View are native components built into react native. We can use them to build our user interface
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from '../styles'
import Carousel from 'react-native-looped-carousel'

import NewsBlock from '../components/news'
import Loading from '../components/loading';

import {
  grabNews
} from '../actions/news'

// width and height
const { width, height } = Dimensions.get('window');

function mapStateToProps(state) {
  const { News } = state
  return {
    News
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    grabNews
  }, dispatch)
}

class News extends Component {
  state = {
    size: {
      width,
      height
    },
    grabNewsSuccess: false
  }

  componentWillMount() {
    const { News, grabNews } = this.props
    let news = News.toJS()

    // pick the news
    Promise.all(news.sources.map((source, index) => {
      return grabNews(source, index)
    })).then(() => {
      this.setState({
        grabNewsSuccess: true
      })
    })

  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  }

  render() {
    const { size, grabNewsSuccess } = this.state
    const { News } = this.props
    let news = News.toJS()
    const { page1, page2, page3, page4, page5 } = news

    if (grabNewsSuccess) {
      return (
        <View style={[ styles.pageContainer ]} onLayout={this._onLayoutDidChange}>
          <Carousel
            autoplay={ false }
            delay={ 500 }
            style={ size }
            pageInfo={ true }
            pageInfoTextStyle={{ color: '#fff' }}
            onAnimateNextPage={(p) => console.log(p)}>

            {/* drop in the 5 news carousels */}
            <NewsBlock size={ size } articles={ page1 } />
            <NewsBlock size={ size } articles={ page2 } />
            <NewsBlock size={ size } articles={ page3 } />
            <NewsBlock size={ size } articles={ page4 } />
            <NewsBlock size={ size } articles={ page5 } />

          </Carousel>
        </View>
      )
    } else {
      return <Loading />
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(News);
