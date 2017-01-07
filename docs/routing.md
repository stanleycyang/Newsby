### Routing & Pages

- Create Routes for Pages
- Set up Commonly Shared Components
- Introduction to Styling

We're going to add a logo component

```js
'use strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Platform
} from 'react-native'
import styles from '../../styles'

class Logo extends Component {
  render() {
    return (
      <View style={{ width: config.windowWidth, height: 35 }}>
        <Image
          source={ require('../../imgs/newsby-logo.png') }
          style={ styles.logo }
          />
      </View>
    )
  }
}

export default () => {
  return <Logo />
}
```

We will be putting the logo into the header. But this will not work until we add some styling in. In our `app/styles` page, let's add the following:

```js
'use strict'

import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native'

const {
  width,
  height
} = Dimensions.get('window')

import config from '../config'

const AppStyles = StyleSheet.create({
	logo: {
    maxWidth: config.windowWidthHalf,
    maxHeight: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: (Platform.OS === 'ios')? 20 : 10 // handling iOS and android styles
  },
})

export default AppStyles

```

Add this to our `styles.js`:

```js
...
  icon: {
    padding: 0,
    margin: 0
  }
...
```

Now our app will have 2 pages, the 1) Home page and then the 2) News page.


In our `containers/index.js` file:

```js
'use strict'

import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ScrollView,
  Platform,
  AsyncStorage,
} from 'react-native'
import dismissKeyboard from 'dismissKeyboard'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from '../styles'

function mapStateToProps(state) {
  const { News } = state
  return {
    News
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch)
}

class Home extends Component {
  state = {
    modalOpen: false,
  }

  render() {
    const { News } = this.props
    let news = News.toJS()

    return (
    	<View></View>
    )
     
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
```

Let's create the following styles in `app/styles.js`:

```js

...
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

  /* Default */
  container: {
    position: 'relative',
    flex: 1,
  },
  
  greyBackground: {
    backgroundColor: AppConfig.greyColor
  },
  
  flexRows: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
 
  containerCentered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  /* Give me padding */
  paddingContainer: {
    paddingVertical: 20,
    paddingHorizontal: 40
  },

  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  paddingLeft: {
    paddingLeft: 20,
  },
  paddingRight: {
    paddingRight: 20,
  },
  paddingVertical: {
    paddingVertical: 20,
  },
  paddingVerticalMd: {
    paddingVertical: 15
  },
  paddingTop: {
    paddingTop: 20,
  },
  paddingBottom: {
    paddingBottom: 20,
  },
  paddingHorizontalSml: {
    paddingHorizontal: 10,
  },
  paddingLeftSml: {
    paddingLeft: 10,
  },
  paddingRightSml: {
    paddingRight: 10,
  },
  paddingVerticalSml: {
    paddingVertical: 10,
  },
  paddingTopSml: {
    paddingTop: 10,
  },
  paddingBottomSml: {
    paddingBottom: 10,
  },
  
...
```

Now we've created a bunch of great utility classes we can use in the future

Our news page will look similar to our home page (`containers/news`):

```js
'use strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from '../../styles.js'


// width and height
const { width, height } = Dimensions.get('window')

class News extends Component {
  state = {
    size: {
      width,
      height
    },
    grabNewsSuccess: false
  }

  render() {
    const { size, grabNewsSuccess } = this.state
    const { News } = this.props
    let news = News.toJS()
    
    return (
    	<View></View>
    )

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

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(News)
```

Now we will combine our codebases

```js
'use strict'

import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native'

import {
  Router,
  Scene,
  ActionConst
} from 'react-native-router-flux'

import {
  Provider
} from 'react-redux'

import store from './store'
import styles from './styles'

/*
 * Import top level containers
 */

import News from './containers'
import Logo from './components/logo'

/*
 * import top level containers
 */

import pack from '../package'
const VERSION = pack.version

export default function native(platform) {
  const Newsby = () => {
    return (
      <Provider store={ store }>
        <Router>

          {/* Root */}
          <Scene key='root'>

            <Scene
              key='news'
              component={ News }
              navigationBarStyle={ styles.navbar }
              renderTitle={ Logo }
              renderRightButton={ RightButton }
              type={ ActionConst.REPLACE }
              initial={ true }              
              />

          </Scene>

        </Router>
      </Provider>
    )
  }

  AppRegistry.registerComponent('Newsby', () => Newsby)
}
```

Now we make our `index.ios.js` look like this:

```js
'use strict'

import initialize from './app'

initialize('ios')
```

And we adjust our `index.android.js`:

```js
'use strict'

import initialize from './app'

initialize('android')
```