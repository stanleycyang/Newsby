# Tapping into APIs

**Application Programming Interfaces** (API) is a set of tools and routines that allows software to communicate with each other. 

![API](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l6/api.png)

[APIs](http://readwrite.com/2013/09/19/api-defined/) are not new: When you use your laptop or the Internet, APIs make it possible to move information between programs and websites.

For example, APIs make it possible for big services like Google Maps to allow apps (think Yelp) to piggyback on their offerings (displaying restaurants nearby).

![Google Maps Yelp](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l6/maps.jpg)

APIs do this by exposing the program's internal functions to the outside world in a limited fashion. This allows applications to share data without sharing all of the software's internal code. 

For **Newsby**, our news data is coming from [NewsAPI](https://newsapi.org/). In the previous lesson, you should have created your own account and signed up for an API key. In this lesson, I will show you how we can tap into this API and retrieve data that we can use for our app.

**Objectives:**

- Learn what an API is
- Understand HTTP requests
- Access data from the News API
- Integrate API data into the app's state

The Internet is made possible by HTTP (Hypertext Transfer Protocol) requests. HTTP is a request / response protocol. Your computer sends a request for a file (ie. home.html) and the web server sends back a response (Here is the file "home.html"). An quick overview is available [here](http://rve.org.uk/dumprequest).

Every request consists of **Header** fields, which provide required information about the request or the response, or about the object sent in the message body.

**Types of header fields:**

`General-header`: These header fields have general applicability for both request and response messages.

`Request-header`: These header fields have applicability only for request messages.

`Response-header`: These header fields have applicability only for response messages.

`Entity-header`: These header fields define meta information about the entity-body or, if no body is present, about the resource identified by the request.

The **Message Body** of the HTTP message is optional to carry the entity body associated with the request of response. If entity body is associated, then usually `Content-Type` and `Content-Length` headers lines specify the nature of the body associated (ie. text / html).

![API](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l6/api-flow.png)

**Types of Requests:**

**GET** - Requests data from a specified resource

- GET requests can be cached
- GET requests remain in the browser history
- GET requests can be bookmarked
- GET requests should never be used when dealing with sensitive data
- GET requests have length restrictions
- GET requests should be used only to retrieve data

**POST** - Submits data to be processed to a specified resource

- POST requests are never cached
- POST requests do not remain in the browser history
- POST requests cannot be bookmarked
- POST requests have no restrictions on data length

**PUT / PATCH** - Updates a representation of the specified URI

**DELETE** - Deletes the specified resource

**Integrating the NewsAPI to Newsby**

In Newsby, we will keep things simple. We will only use **GET** requests to retrieve news information from our sources. We will use the [https://newsapi.org/](https://newsapi.org/) to supply our news information.

WE will need to build a function to serve up GET requests within our application. In `app/actions/index.js`, add the following:

```js
'use strict'

import config  from '../../config';

/*
 * Activate fetch action
 */

export function GET(endpoint, obj) {
  let requestObj = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json', // we will send JSON
      'X-Api-Key': `${config.apiKey}` // Provide API key
    }
  }

  return fetch(`${config.apiUrl}/${endpoint}`, requestObj); // send the fetch request to the endpoint
}

```

We will now create our async action to fetch the news from the **NewsAPI**. We dispatch this async action to grab the news with a GET request in `app/actions/news.js`:

```js
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
```

We will update our reducer file (`app/reducers/news`) to create the basic state for our app, and we will make the app load news from 1) Associated Press, 2) BBC News, 3) Bloomberg, 4) Business Insider, and 5) Buzzfeed (you can change any of these if you want something else). These will populate our five different arrays (page1, page2, etc.). We will also add 3 different action types (GRAB\_NEWS\_REQUEST | \_SUCCESS | \_FAILURE). This will handle the different events that may occur when fetching the data into the app: 

```js
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
```

Now we will update our `app/containers/index.js` to the following:

```js
'use strict'

import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import Dimensions from 'Dimensions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from '../styles';
import Carousel from 'react-native-looped-carousel';

import NewsBlock from '../components/news';
import Loading from '../components/loading';

import {
  grabNews
} from '../actions/news';

// width and height
const { width, height } = Dimensions.get('window');

class News extends Component {
  state = {
    size: {
      width,
      height
    },
    grabNewsSuccess: false
  }

  componentWillMount() {
    const { News, grabNews } = this.props;
    let news = News.toJS();

    // pick the news
    Promise.all(news.sources.map((source, index) => {
      return grabNews(source, index)
    })).then(() => {
      this.setState({
        grabNewsSuccess: true
      })
    });

  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  }

  render() {
    const { size, grabNewsSuccess } = this.state;
    const { News } = this.props;
    let news = News.toJS();
    const { page1, page2, page3, page4, page5 } = news;

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

function mapStateToProps(state) {
  const { News } = state
  return {
    News
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    grabNews,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(News);
```

Now, you will need to open up your `info.plist` in your XCode and modify the following:

![API](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l6/app-transport.png)

Apple by default bans non-HTTPS pages. This specification will help you be able to load http pages into your application!

At this point, the app is complete! Validate that it works on both the Android and iOS devices:

Run for `ios`:

```bash
$ npm run ios
```

![API](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l6/ios-preview.png)

With your android emulator on Genymotion open, run:

```bash
$ npm run android
```

![API](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l6/android-preview.png)

At the end of this lesson, you should:

- Understand what an API is
- Understand HTTP requests
- have acessed data from the News API
- Integrated API data into the app's state

View this lesson on [GitHub](https://github.com/stanleycyang/Newsby/blob/master/docs/api.md).