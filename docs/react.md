# Building User Interface with React

[React](https://facebook.github.io/react/) makes it simple to create powerful user interface (UI). By breaking down an any app into simple components, you end up with reusable components that can efficiently update and re-render when the data changes.

![React](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l4/react.png)

**Component-based:** Build components that have their own internal states. You can build components upon other components to build up complex UI. 

**Virtual DOM:** ReactJS builds an abstract version of the [Document Object Model](https://www.w3.org/DOM/). ReactJS observes when the data changes, then it will find the difference and re-render what needs to be changed. What makes it fast is:

- Efficient diff algorithms
- React only updates the sub-tree vs. a complete page re-render

ReactJS makes no assumptions about your technology stack, so you can use ReactJS to:

- Build Facebook (Literally!)
- Add reusable components
- Create a widget
- Build iOS and Android apps

**Lesson 4 Objectives:**

- Learn fundamental ReactJS concepts
- Write ReactJS components
- Understand the unidirectional data flow
- Understand the component lifecycle

Traditional HTML looks like this:

```js
...
<footer>
    <p>This is a footer</p>
</footer>
...
```

Component-based programming looks like this:

```js
'use strict'

import React, { Component } from 'react';


class Footer extends Component {
  render() {
    return (
      <footer>
        <p>I am a footer</p>
      </footer>
    )
  }
}

export default Footer;
```

In the above example, you will notice that it uses an XML-like syntax to simulate the DOM. This is called JSX, a preprocessor step that allows an elegant way to write ReactJS component. Just like XML, JSX tags will have tag names, attributes, and children.

Using ReactJS's virtual DOM, you get:

- a simpler programming model
- better performance
- modular, reusable components

**Unidirectional Data Flow**

ReactJS implements a one-way data flow. This means that data is passed from the top-down, through props. Data is transferred from the top component to its children, so on and so forth.

```js
...
// A simple component flowing down the props
<Component {...this.props} /> // props are passed down with some
...
```

Most times, the properties will be explicitly passed down:

```js
import React, { Component } from 'react';
import {
  Text, // native Text component
  View // native View component (think divs)
} from 'react-native';

import Header from './Header';
import SomeComponent from './SomeComponent';

class Form extends Component {
  render() {
    const { hidden, ...others } = this.props; // we will pass these values down
    return (
    	<View>
    	  <Header hidden={ hidden } />
		  <SomeComponent { ...others } />
		</View>
    )
  }
}
...
```
**What are [props](https://facebook.github.io/react/docs/transferring-props.html)?**

Short for properties, they are a component's data configuration. They are pieces of data that flows from the top down and are immutable in the components which receive them.

A component cannot change its props, but it is responsible for putting together the props of its children components.

When certain data is necessary throughout different parts of an app, its best to pass them down as props.

We will see this in action in future examples.

**Classes:**

By now, you've seen the word `class` a lot in action. Remembering back from our JavaScript fundamentals lesson, know that a class is just an extensible template to create objects. ReactJS components are built with classes and it inherits from the `Component` class (built-in to ReactJS). 

You can build React Components incredibly easy with `classes` with [ES2015](https://babeljs.io/learn-es2015/).

JavaScripts classes are syntactical sugar over the prototypical inheritance. It allows us to build templates for objects as such:

```js
class Square {
    // Constructor gets called when an object is intialized
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    
    ...
}

class Box extends Square { // inherit from Square
	constructor(height, width, color) {
		super(height, width);
		this.color = color;
	}
	
	...
}

let gift = new Box(10, 20, 'blue'); // gift will have the height of 10, width of 20, and color of blue
```

In ReactJS, we use the **extends** keyword to create a class as a child to the React Component.

```js
class App extends React.Component {
  render() {
    return (
      <View>
        <Text>Hello world! Love, Stanley</Text>
      </View>
    )
  }
}
```

Notice how we have a render() method? For every React component, the render method is absolutely required.

You can return null or false to indicate that you don't want to render anything. Behind the scenes, React renders a `<noscript>` tag to work with the React diffing algorithm. However, you **must always render something.**

The render() function should be pure. It should NOT modify the component state, and it does not read from or write to the DOM. If you want to interact with the browser, you should perform the work in componentDidMount() or another component lifecycle method.

**Component Lifecycle**

React Components have built-in methods to handle component lifecycle events. The lifecycle starts from before the component gets mounted onto the page to when the component is dismounted from the page.

**[Lifecycle methods](https://facebook.github.io/react/docs/component-specs.html):**

I will reference the descriptions from the [ReactJS documentation](https://facebook.github.io/react/docs/component-specs.html) in this section. If you are familiar with the component lifecycle methods already, feel free to skip this section.

### Mount methods:

**componentWillMount:**

Usage:

```js
...
class ExampleComponent extends Component {
	...
	componentWillMount() {
		// Run code before component is initially rendered
	}
	...
}
```

This method is invoked once, both on the client and server, immediately before the initial rendering occurs. 

If you call setState within this method, render() will see the updated state and will be executed only once despite the state change.

**componentDidMount:**

Usage:

```js
...
class ExampleComponent extends Component {
	...
	componentDidMount() {
		// Run code after component is initially rendered
	}
	...
}
```

This method is invoked once, only on the client (not on the server), immediately after the initial rendering occurs. 

At this point in the lifecycle, you can access any refs to your children (e.g., to access the underlying DOM representation). 

The componentDidMount() method of child components is invoked before that of parent components.

### Update methods:

**componentWillReceiveProps:**

Usage:

```js
...
class ExampleComponent extends Component {
	...
	componentWillReceiveProps(nextProps) {
		// Invoked when component is receiving new props
	}
	...
}
```

This method is invoked when a component is receiving new props. This method is not called for the initial render.

Use this as an opportunity to react to a prop transition before render() is called by updating the state using this.setState(). The old props can be accessed via this.props. 

Calling this.setState() within this function will not trigger an additional render

**shouldComponentUpdate:**

Usage:

```js
...
class ExampleComponent extends Component {
	...
	shouldComponentUpdate(nextProps, nextState) {
		// Invoked before rendering as new props	or state are being received. 
	}
	...
}
```

This method is invoked before rendering when new props or state are being received. 

This method is not called for the initial render or when forceUpdate is used.

Use this as an opportunity to return false when you're certain that the transition to the new props and state will not require a component update.

**componentWillUpdate:**

Usage:

```js
...
class ExampleComponent extends Component {
	...
	componentWillUpdate(nextProps, nextState) {
		// Invoked immediately before rendering as new props	or state are being received. 
	}
	...
}
```

This method is invoked immediately before rendering when new props or state are being received. This method is not called for the initial render.

Use this as an opportunity to perform preparation before an update occurs.

You cannot use this.setState() in this method. If you need to update state in response to a prop change, use componentWillReceiveProps instead.

**componentDidUpdate:**

Usage:

```js
...
class ExampleComponent extends Component {
	...
	componentDidUpdate(prevProps, prevState) {
	// Invoked immediately after updates are flushed to the DOM
	}
	...
}
```

This method is invoked immediately after the component's updates are flushed to the DOM. This method is not called for the initial render.

Use this as an opportunity to operate on the DOM when the component has been updated.	

### Unmount method:

**componentWillUnmount:**

Usage:

```js
...
class ExampleComponent extends Component {
	...
	componentWillUnmount() {
		// Run code before component is dismounted from DOM
	}
	...
}
```

This method is invoked immediately before a component is unmounted from the DOM.

Perform any necessary cleanup in this method, such as invalidating timers or cleaning up any DOM elements that were created in componentDidMount.

With this understanding of the component lifecycle, we can now build out the Newsby front-end.

**Building the Front-end**

This is the app that we will be creating:

![Newsby](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l4/newsby.jpeg)

Take a look at the components we have to create. 

- Newsby (The page to hold our app. We built this in the last lesson)
- Header (Wraps the logo. This was created by `react-router-flux` in the last lesson)
- Logo (we created this in the last lesson)
- News (Displays the image of the news with title)
- Web Page (to open up the news page)

We are going to add more components in the `app/components` folder:

```bash
$ touch app/components/loading.js app/components/news.js app/components/webpage.js
```
We can get started by building a **simple loading component**. We will use this every time data is being retrieved and we are waiting for it to come back.

In `app/components/loading.js`, we will write a simple component:

```js
'use strict'

import React, { Component } from 'react';
import {
  Text,
  View,
  ActivityIndicator // this is a component that shows a loading state in Android and iOS
} from 'react-native';

export default class extends Component {
  render() {
    return (
      <View>
        <ActivityIndicator
          color={ 'black' }
          size={ 'large' }
          animating={ true }
          />
        <Text>Loading..</Text>
      </View>
    )
  }
}
```

Simple enough, right? 

We will want to add some styles to make it look nice in `app/styles.js`:

```js
...

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
  
...
```

Now let's import our stylesheet and adjust our render functions in `app/components/loading.js`:

```js
...

import styles from '../styles.js';

...

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
```

Now we have a functioning loading state! If you import your `Loading` component into your main page (`app/containers/index`):

```js
'use strict'

import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import Loading from '../components/loading';

class News extends Component {
  render() {
    return (
      <Loading />
    )
  }
}

export default News;
```

You should see this:

![React](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l4/loading.png)

We want to build a web page component to retrieve the news page when the users click on an article. In order to do this, let's build a simple component into `app/components/webpage.js`:

```js
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
          <TouchableOpacity onPress={ this._closeModal }>
            <Text>
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

```

You will notice here that we used the `setState` function to open and close the modal. This function modifies the internal component state to true or false.

**What is state?**

A state is component-specific, and starts with a default value set inside of the constructor method.

It can be mutated in time (usually due to user events). It's a representation of the component at one point in time - a snapshot.

A component manages its own state internally, and it has no business changing the state of its children (except on the initial state).

**Adding styles to Webpage**

We will add some styles for our Webpage component in `app/styles.js`:

```js
...
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
...  

```

Then modify the Webpage component in `app/components/webpage.js`:

```js
import styles from '../styles';
  ...
  
  {/* Close button */}
  <TouchableOpacity onPress={ this._closeModal } style={ styles.btnBlack }>
    <Text style={ styles.btnText }>
      <Icon name='chevron-left' size={ 12 } /> Back to Newsby
    </Text>
  </TouchableOpacity>
  
  ...
```

Your webpage will look like this in when you use it in the future:

![Newsby](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l4/webpage.js)

Let's build the **News** component. 

We will begin by designing the news blocks which will show an image, a title, and a dark overlay on top of it in `app/styles.js`:

```js
...

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
  
...
```

In your `components/news.js`, create your news component to house the image and the titles of the articles. If no articles are provided, then we will render null:

```js
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
```

At the end of this lesson, you should have:

- Learned fundamental ReactJS concepts
- Written ReactJS components
- Learned about the unidirectional data flow
- Learned about the component lifecycle

View this lesson on [GitHub](https://github.com/stanleycyang/Newsby/blob/master/docs/react.md).