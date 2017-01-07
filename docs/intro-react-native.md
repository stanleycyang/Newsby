# Introduction to React Native

[React Native](https://facebook.github.io/react-native/) is a technology built by [Facebook](https://www.facebook.com) which lets you build native mobile apps using only JavaScript. With React Native, you're not building a "mobile web app", an "HTML5 app", or a "hybrid app". You build a real mobile app that is indistinguishable from an app built using Objective-C or Java. 

React Native uses the same fundamental UI building blocks as regular iOS and Android apps. You just put the blocks together using JavaScript and React.

![React Native](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l3/react-native-logo.png)

[A lot of companies](https://facebook.github.io/react-native/showcase.html) use **React Native** to build their native iOS and Android apps. Here are a few:

![Instagram](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l3/instagram.jpeg) ![Airbnb](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l3/airbnb.png) ![Baidu](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l3/baidu.png) ![Vogue](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l3/vogue.jpeg) ![Bloomberg](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l3/bloomberg.jpg) ![Wearvr](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l3/wearvr.png)

**Lesson 3 Objectives:**

- Learn the benefits of React Native
- Initialize our first app
- Install Newsby app dependencies 
- Set up configuration variables
- Create a shared codebase for Newsby

**Perks:**

- **No time wasted recompiling**: React Native lets you build your app faster. Instead of recompiling, you can reload your app instantly. 
- **Use native code when you need to**: You can combine components written in Objective-C, Java, or Swift. You can call it directly, like so:

```js
// import React
import React, { Component } from 'react';
import { Text, View } from 'react-native';
// import native component
import { TheGreatestComponentInTheWorld } from './your-native-code';

// create a UI component
class SomethingFast extends Component {
  render() {
    return (
      <View>
        <TheGreatestComponentInTheWorld />
        <Text>
          TheGreatestComponentInTheWorld could use native Objective-C,
          Java, or Swift - the product development process is the same.
        </Text>
      </View>
    );
  }
}
```

**Initializing Newsby:**

At this point if you haven't set up React Native yet, please set it up [here](https://facebook.github.io/react-native/docs/getting-started.html).

At this point, you want to open up your terminal:

```bash
$ react-native init Newsby --verbose
```

Start the app and you should see something like this:

![React Native](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l3/rn-start-app.png)

**Installing dependencies:**

**Dependency** is broad software engineering term to refers to when your software relies on another one. Our app will be built by using libraries built by other engineers who were kind enough to open-source it.

We will be using [Yarn](https://yarnpkg.com/en/docs/getting-started) to install our dependencies. 

Let's install yarn by running the following commands in the terminal:

```bash
$ brew update
$ brew install yarn
```

**Setting up $PATH**

 You may need to set up the PATH environment variable in your terminal to have access to Yarn’s binaries globally.

Add export **PATH="$PATH:\`yarn global bin\`"** to your profile (this may be in your .profile, .bashrc, .zshrc, etc.)

**Useful Yarn commands to know:**

Starting a new project

```bash
yarn init
```

Add a dependency

```bash
yarn add [package]
```

Update a dependency

```bash
yarn upgrade [package]
```

Remove a dependency

```bash
yarn remove [package]
```

Installation existing dependencies:

```bash
yarn
```

**Installing Newsby Dependencies:**

Run the following in the project directory:

```bash
$ yarn add immutable keymirror moment react-native-looped-carousel react-native-router-flux react-native-vector-icons react-redux redux redux-thunk
```

Now, let's take a look at our `package.json`:

```js
{
  ...
  "dependencies": {
    "immutable": "^3.8.1",
    "keymirror": "^0.1.1",
    "moment": "^2.16.0",
    "react": "~15.3.2",
    "react-native": "0.37.0",
    "react-native-i18n": "^0.1.1",
    "react-native-looped-carousel": "^0.1.4",
    "react-native-router-flux": "^3.37.0",
    "react-native-vector-icons": "^3.0.0",
    "react-redux": "^4.4.6",
    "redux": "^3.6.0",
    "redux-thunk": "^2.1.0",
  },
  ...
}
```

Noticed how the dependencies are added to our `package.json`?

Now we will link them to our app with the following command:

```js
$ react-native link
```

Now, let's update our commands in `scripts` in `package.json`:

```js
{
  "name": "Newsby",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "jest",
    "ios": "react-native run-ios",
    "android": "react-native run-android",
    "build-ios": "react-native bundle --platform ios --entry-file index.ios.js --bundle-output ./main.jsbundle --assets-dest ./ --dev false",
    "build-android": "cd android && ./gradlew assembleRelease"
  },
  ...
 }
```

The **build-ios** and **build-android** commands will help us get our code ready for production down the road. These commands will help us bundle our code to push into the app store.

With these new commands, we can run the iOS app by simply typing:

```js
$ npm run ios
```

We can run the Android app by:

```js
$ npm run android
```

Make sure your Genymotion Emulator is running in the background to run your android app.

I recommend using XCode to test apps since its a much better development experience. 

**Let's set up a basic app directory in Newsby:**

In our terminal in the `Newsby` directory, type:

```js
$ mkdir -p app/components app/containers app/imgs config
$ touch app/index.js app/containers/index.js app/styles.js config/index.js
```

**app** will be the main directory we will be working out of for Newsby

**config** will be the directory where we store variables used across the whole app. We will also store **app secrets** inside of this directory.

**App secrets** are tokens and identifiers you need to use to get your app operational but you don't want others to steal from you. Tokens and identifiers are important on the web when using external services since it lets those services know who you are.

Now in the `config/index.js`, we will want to start defining some variables for our mobile dimensions:

```js
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

  apiUrl: 'https://newsapi.org/v1',
  apiKey: 'YOUR_API_KEY', // add your API key here
  
  /*
   * Create your own API key by signing up for newsapi.org: https://newsapi.org/
   * Plug it in here. We will explain how to use this in the next lesson
   */
}

```

**Note:** We start JavaScript files with 'use strict' to set it to strict mode. It helps:

- It catches some common coding bloopers, throwing exceptions.
- It prevents, or throws errors, when relatively "unsafe" actions are taken (such as gaining access to the global object).
- It disables features that are confusing or poorly thought out.

View more on about strict mode [here](http://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it).

**Import & Export**

In ReactJS, it is best practice to build apps in a modular fashion. That means you should split up components into different files to better organize it. 

You will see `import` and `export` all throughout our examples. This helps us break up code into different pages.

You can see the **destructuring assignment syntax** here:

```js
import React, { Component, PropTypes } from 'react';
```
This lets us extract multiple object properties in a single line. Now we no longer have to prefix them with React (ie. React.PropTypes or React.Component).

For more info, here are the MDN docs:

- [Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [Export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

**Sharing a codebase for iOS and Android**

We want to share our codebase for iOS and Android. This will save us hours down the road because we don't have to recreate everything twice.

Our first page will be created with a React component.

In `app/containers/index.js`, let's put a basic component:

```js
'use strict'

import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native' // Text and View are native components built into react native. We can use them to build our user interface

class News extends Component {
  render() {
    return (
      <View></View>
    )
  }
}

export default News;
```

Most ReactJS components will look similar to this. It is as simple as writing a class, inheriting from `React.Component`, and then rendering JSX. 

We will go more in detail in the future about the intricacies of ReactJS components. For now, we will keep our components simple.

**Download the logo:**

Go ahead and [download](https://raw.githubusercontent.com/stanleycyang/Newsby/master/app/imgs/newsby-logo.png) the **Newsby** logo. Save it inside the `app/imgs` directory. We will add it into our header over the next steps. Our final product will look like this:

![Newsby](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l3/newsby.jpeg)

Now let's create the styles for our header in `app/styles`:

```js
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

});

// export the file for usage
export default AppStyles;
```

We will create the component for our logo. Create the file for logo:

```bash
$ touch app/components/logo.js
```

Then, in `app/components/logo.js`, create our logo component:

```js
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
```



We will now set up some basic routing in `app/index.js` and create a function to initialize the application:

```js
'use strict'

import React from 'react';
import {
  AppRegistry
} from 'react-native'; // AppRegistry is the JS entry point to running all React Native apps. 

import {
  Router, // Sets up routes
  Scene, // Sets up pages
  ActionConst, // constants represent real values of various actions
} from 'react-native-router-flux';

import styles from './styles';

/*
 * Import pages
 */

import News from './containers';

/*
 * Import components
 */
import Logo from './components/logo';

// We will create a function and export it to use in the entry points
export default function native() {
  const app = () => {
    return (
      <Router>
        <Scene key='root'>
          <Scene
            key='news'
            component={ News }
            navigationBarStyle={ styles.navbar }
            renderTitle={ Logo }
            type={ ActionConst.REPLACE }
            initial={ true }
            />
        </Scene>
      </Router>
    )
  }

  AppRegistry.registerComponent('Newsby', () => app);
}
```

You can add additional routes in the future by adding more **Scenes**! 

Then modify our iOS and Android entry points in both the `index.ios.js` and `index.android.js` to:

```js
'use strict'

import initialize from './app';

initialize();
```

Woohoo! Run your app now by running **npm run ios**. You should see this:

![Code share screen](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l3/code-share-screen.png)

At the end of this lesson, you should have:

- Learned the benefits of React Native
- Initialized your first app
- Installed Newsby app dependencies 
- Created a shared codebase for Newsby

View this lesson on [GitHub](https://github.com/stanleycyang/Newsby/blob/master/docs/intro-react-native.md).