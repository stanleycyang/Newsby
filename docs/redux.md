# Mastering State Management with Redux

**Redux** is a library to manage the state in an application. Redux has no relation to React. You can use Redux with many other front-end JavaScript framework.

![Redux](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l5/redux.png)

However, Redux works exceptionally well with React because it allows you to describe User Interface (UI) with props and states, and Redux emits state updates in response to user action.

You will be first introduced to the concepts of Redux first, then at the end you will implement the concepts of Redux into Newsby.

**Lesson 5 Objectives:**

- Understand why we use Redux with React
- Be able to state the difference between Smart and Dumb components
- Create a simple action and action creator
- Create a basic store
- Create a reducer
- Understand the concept of a thunk
- Implement Redux into Newsby

**Redux** is a predictable state container for JavaScript apps.

The whole state of your app is stored inside an object tree inside a single store (remember our object lesson from before?)

**3 Principles of Redux**

1. Single source of truth: the state of your whole app is store inside an object tree within a single store
2. State is read-only: changes are centralized and happen one by one in a strict order
3. Changes are made with pure functions: pure reducers

**Unidirectional data flow**

![Unidirectional data flow](https://facebook.github.io/flux/img/flux-simple-f8-diagram-with-client-action-1300w.png)

*Source: [React Github](https://facebook.github.io/flux/img/flux-simple-f8-diagram-with-client-action-1300w.png)*

All web applications are composed of 3 simple components: 

	1) Presentation (View)
	2) Data
	3) Logic to retrieve data and react to user events

Simply put, the diagram above works as such:

	1) a user clicks on button "A"
	2) a handler on button "A" triggers an action that is dispatched 
	3) the store (A.K.A. the application state) produces a change 
	4) ReactJS does a diff between the current state versus the info that changed and re-renders just that portion of the view

By using Redux with ReactJS, we will see data flow from the top-down (via props) from '**smart**' components to '**dumb**' React components.

**Smart** components:

- Wrap one or more dumb or smart components
- Hold state from the store and passes it as an object to dumb components
- Rarely emit DOM of its own, therefore no need for CSS

**Dumb** components: 

- Have no dependencies on the rest of the app
- Receive data and callbacks exclusively from props
- Rarely have their own state
- Has its own styles (CSS) and DOM

**Benefits of this Approach**

- Separation of concerns.
- Modular and reusable code. Dumb components can be used with different state source

Now that we have gained a high level overview, let's dive into how Redux works.

> **Note:** To follow along, create a directory called **mastering-redux** and inside it, make an **index.js**. After you have done this, run **npm install -S redux react-redux**.

> **Executing the ES6 file:**
> I am executing the file with '**babel-node**', which you can install it globally by running `npm install -g babel-cli`. Then execute the file as such: `babel-node index.js`

**Actions**

An **action** in Redux is simply an object which contains the **type** property. An action will look something like this:

```js
{
	type: 'AN_ACTION'
}
```

**Action Creators**

In Redux, an action creator is simply a function that returns an action, as follows:

```js
function actionCreator() {
	return {
		type: 'AN_ACTION'		
	}
}

console.log(actionCreator())
// Output: { type: 'AN_ACTION' }
```

It is a convention to include the type to allow Redux to know how to handle the action. You can also pass additional data within the object, as such:

```js
function passInfo (info1, info2) {
	return {
		type: 'PASS_INFO_ACTION',
		someData: info1,
		someOtherData: info2
	}
}

console.log(passInfo('Hello', 'World'))

/* Output
 * { type: 'PASS_INFO_ACTION',
 *   someData: 'Hello',
 *   someOtherData: 'World' }
 */
```

Later on, we will see action creators return functions to perform asynchronous tasks.

**Store**

Actions inform us that something happened and also passes the data that needs to be updated. In Redux, a **store** is a container which provides a place to store all the data for the duration of the component lifecycle. 

A store looks likes this: 

```js
import { createStore } from 'redux'
var store = createStore(() => {})
```

Notice how I am putting a function (`() => {}`) within the store? It is because `createStore` expects a function which will allow it to modify the state. 

**Reducers**

Now that we understand the Store holds the data of our application, we now arrive at reducers. A reducer in Redux simply modifies the current store (or state) when called.

Let's look at the simple store again:

```js
// A simple reducer
const reducer = function (state, action) {
  console.log(`The reducer was called with state ${state}`)
  console.log(action)
}

// A simple store
import { createStore } from 'redux'
const store = createStore(reducer)

// Output: Reducer was called with args [ undefined, { type: '@@redux/INIT' } ]
```

In this example, we see that our reducer is actually called even though no actions were dispatched. That's because to initialize the state of the application, Redux actually dispatches an `init` action `({type: '@@redux/INIT' })`.

In this `init` call, a reducer is given the parameters **state** and **action**. 

The **state** reflects the data currently maintained in this application.

The **action** reflects the action which has been dispatched to modify the state.

Let's get more in-depth on the topic of **reducers** to fully understand its usage:

```js

import { createStore } from 'redux'

// Initialize, this time we provide a state
const reducer = function (state = {}, action) {

	console.log('a reducer was called with the state', state, 'and action', action)
	
	// Wait for actions to dispatch, then change the state
	switch (action.type) {
		case 'SIMPLE_ACTION':
			return {
				...state,
				data: action.data
			}
		// IMPORTANT! Always have a default returning the state.
		default:
			return state
	}
}

const store = createStore(reducer)
// Output: a reducer was called with state {} and action { type: '@@redux/INIT' }

console.log('store state after initialization:', store.getState())
// Output: redux state after initialization: {}

```

In this reducer, we will initialize with a state (an empty object). 

Within a reducer, it will wait for an action to dispatch and handle it based on the case. In this example, we only have the case of `SIMPLE_ACTION`. 

It is important to always remember the default case! If you don't you will end up having your state return `undefined`.	

If you have multiple reducers,  you can simply combine them like the following example:

```js
import { createStore, combineReducers } from 'redux'

const reducerOne = function (state = {}, action) {
	console.log('reducerOne was called with state', state, 'and action', action)
	switch (action.type) {
		default:
			return state
	}
}

const reducerTwo = function (state = {}, action) {
	console.log('reducerTwo was called with state', state, 'and action', action)
	switch (action.type) {
		default:
			return state
	}
}

const reducer = combineReducers({
	one: reducerOne,
	two: reducerTwo
})

const store = createStore(reducer)
console.log('store state after initialization', store.getState())

// Output:
//reducerOne was called with state {} and action { type: '@@redux/INIT' }
// reducerOne was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_w.r.m.s.p.b.n.8.k.t.9' }
// reducerTwo was called with state {} and action { type: '@@redux/INIT' }
// reducerTwo was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_6.d.p.m.k.q.y.f.1.o.r' }
// reducerOne was called with state {} and action { type: '@@redux/INIT' }
// reducerTwo was called with state {} and action { type: '@@redux/INIT' }
// store state after initialization { one: {}, two: {} }
```

The ability to combine reducers allows the programmer to modularize and organize their code in a more coherent fashion. 

Let's take a look at this output:

```
{} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_6.d.p.m.k.q.y.f.1.o.r' }
```

This is a sanity check performed by combineReducers to assure that a reducer will always return a state that is defined. 

Our new current state will look something like this:

```js
{
	one: {}, // slice returned by reducerOne
	two: {} // slice return by reducerTwo
}
```

Now that we have set up a basic state and gained a basic understanding of Redux, we can now tie it together by dispatching actions.

**Dispatch**

We have created a store, reducers, and actions in the previous examples. It's time to put it all together and really see Redux in action!

Essentially, a dispatch 

In this next example, we're going to see how Redux handles [synchronous and asynchronous](http://www.cs.unc.edu/~dewan/242/s06/notes/ipc/node9.html) functions. If you are following along, you will need to run `npm install -S redux-thunk`. 

### What is a [thunk?!](https://github.com/gaearon/redux-thunk)

In short, it delays the evaluation of the code until its called. 

```js
// calculation of 1 + 2 is immediate
// x === 3
let x = 1 + 2;

// calculation of 1 + 2 is delayed
// foo can be called later to perform the calculation
// foo is a thunk!
let foo = () => 1 + 2;
```

We will also be `applyMiddleware` functionality from `redux`. This will allow us to apply the `redux-thunk` as a middleware to our store.

Go ahead and run write this code snippet:

```js
import { createStore, combineReducers, applyMiddleware } from 'redux'

// We need the thunk to delay the evaluation in async functions
import thunk from 'redux-thunk'

/*
 * Dispatch
 */

// synchronous
function setName(name) {
  return {
    type: 'SET_NAME',
    name
  }
}

// asynchronous
function addBook(book) {
  return function (dispatch) {
    setTimeout(function () {
      dispatch({
        type: 'ADD_BOOK',
        book
      })
    }, 1000)
  }
}

// Initialize the reducer with the state of an empty object
const userReducer = function (state = {}, action) {
  console.log('userReducer was called with state', state, 'and action', action)

  // Check the type of action is dispatched
  switch (action.type) {
    case 'SET_NAME':
      // Return initial state, and the new name
      return {
        ...state,
        name: action.name
      }
    // Return the state to prevent it from getting set to null
    default:
      return state
  }
}

// Initialize the reducer with the state of an empty array
const booksReducer = function (state = [], action) {
  console.log('booksReducer was called with state', state, 'and action', action)
  // Check the type of action is dispatched
  switch (action.type) {
    case 'ADD_BOOK':
      // Return the initial state, and the newly added book
      return [
        ...state,
        action.book
      ]
    // Return state to prevent it from getting set to null
    default:
      return state
  }
}

// Combine the reducers together
const combineUserAndBooksReducers = combineReducers({
  user: userReducer,
  books: booksReducer
})

// Apply middleware
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

// Create the store
const brandNewStore = createStoreWithMiddleware(combineUserAndBooksReducers)
console.log(brandNewStore.getState())

// Run sync function
brandNewStore.dispatch(setName('Stanley Yelnats'))
console.log('store has been changed to', brandNewStore.getState())

// Run async function
brandNewStore.dispatch(addBook('Harry Potter'))
console.log('store has been changed to', brandNewStore.getState())

```

You should get an output that looks like this:

	userReducer was called with state {} and action { type: '@@redux/INIT' }
	userReducer was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_n.b.g.n.2.d.9.r.u.d.i' }
	booksReducer was called with state [] and action { type: '@@redux/INIT' }
	booksReducer was called with state [] and action { type: '@@redux/PROBE_UNKNOWN_ACTION_u.3.4.5.m.c.a.y.v.i' }
	userReducer was called with state {} and action { type: '@@redux/INIT' }
	booksReducer was called with state [] and action { type: '@@redux/INIT' }
	{ user: {}, books: [] }
	userReducer was called with state {} and action { type: 'SET_NAME', name: 'Stanley Yelnats' }
	booksReducer was called with state [] and action { type: 'SET_NAME', name: 'Stanley Yelnats' }
	store has been changed to { user: { name: 'Stanley Yelnats' }, books: [] }
	store has been changed to { user: { name: 'Stanley Yelnats' }, books: [] }
	userReducer was called with state { name: 'Stanley Yelnats' } and action { type: 'ADD_BOOK', book: 'Harry Potter' }
	booksReducer was called with state [] and action { type: 'ADD_BOOK', book: 'Harry Potter' }

Looking at this code, you can see that our store was initialized with our 2 reducers (userReducer and booksReducer).

**userReducer** was called with a state of an empty object *{}*.

**booksReducer** was called with a state of an empty array *[]*.

The synchronous method **setName** was called right away, modifying the name to '*Stanley Yelnats*'. It flows through both reducers to see if it finds a case within the switch statement which will modify the state.

Then the asynchronous method **addBook** was called. It in and added '*Harry Potter*' to the books value.

**Redux with Newsby**

Let's create the directory structure for Newsby. Run these commands in the root of the project:

```bash
$ mkdir app/reducers app/types app/middlewares app/store app/actions
$ touch app/store/index.js app/reducers/index.js app/reducers/news.js app/types/index.js app/middlewares/promise.js app/actions/index.js app/actions/news.js
```

Your `app` directory tree should now look like this:

```
├── actions
│   ├── index.js
│   └── news.js
├── components
│   ├── loading.js
│   ├── logo.js
│   ├── news.js
│   └── webpage.js
├── containers
│   └── index.js
├── imgs
│   └── newsby-logo.png
├── index.js
├── middlewares
│   └── promise.js
├── reducers
│   ├── index.js
│   └── news.js
├── store
│   └── index.js
├── styles.js
└── types
    └── index.js
```

We will build a `types` file to hold all the different user actions that will occur within Newsby.

We can add our `types` in `app/types/index.js`:

```js
'use strict'

import keyMirror from 'keymirror';

const TYPES = keyMirror({
  GRAB_NEWS: null // retrieve news from our sources
});

export default TYPES;
```

We will create and handle our state through the `reducers`, and we will build a `News reducer`, like so in `app/reducers/news.js`:

```js
'use strict'

// imports our pages
import { Map } from 'immutable';
import TYPES from '../types';
import { AsyncStorage } from 'react-native';

const initialState = Map({
  page1: [],
  page2: [],
  page3: [],
  page4: [],
  page5: [],
});

export default function News(state = initialState, action) {
  let stateJS = state.toJS()
  switch (action.type) {
    default:
      return state;
  }
}
```

We want to then combine the reducers together to form an app `state` in `app/reducers/index.js`:

```js
'use strict'

import { combineReducers } from 'redux';

import News from './news';

const rootReducers = combineReducers({
  News,
});

export default rootReducers;
```

We want to create a promise middleware to **handle asynchronous requests**. This will segway well into our next step of making requests in `app/middlewares/promise.js`:

```js
'use strict'

/*
* Redux middleware to handle promises
* As seen in: https://github.com/caljrimmer/isomorphic-redux-app
*/

export default function promiseMiddleware() {
  return next => action => {
    const { promise, type, ...rest } = action;

    if (!promise) return next(action);

    const SUCCESS = type + '_SUCCESS';
    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';

    next({ ...rest, type: REQUEST });

    return promise
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          next({ ...rest, err, type: FAILURE });
          return false;
        } else {
          next({ ...rest, json, type: SUCCESS });
          return true;
        }
      })
      .catch(err => {
        next({ ...rest, err, type: FAILURE });
        return false;
      });
   };
}
```

For all async requests, we will handle them by dispatching the request when it starts and either success or failure on completion.

Now we will create the store, which will handle the state of our app in `app/store/index.js`:

```js
'use strict'

// bring in these functions from redux to create our app 
import { createStore, applyMiddleware } from 'redux';
// use our thunk to handle async requests
import thunkMiddleware from 'redux-thunk';
// bring in the promise middleware we built previously
import promiseMiddleware from '../middlewares/promise';

// bring in our root reducer
import rootReducer from '../reducers';

// include all the middleware
let middlewares = [
  thunkMiddleware,
  promiseMiddleware // put the promise into the array
];

// Add our middlewares in
let createStoreWithMiddleware = applyMiddleware(
  ...middlewares // put in the middleware
)(createStore);

// create the store with middlewares
function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}

export default configureStore();
```

We can now update our home page (`app/index.js`) and adapt the redux into our project:

```js
'use strict'

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';

import {
  Router,
  Scene,
  ActionConst
} from 'react-native-router-flux';

import {
  Provider
} from 'react-redux';

import store from './store';
import styles from './styles';

/*
 * Import top level containers
 */

import News from './containers';
import Logo from './components/logo';

export default function native() {
  const app = () => {
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
              type={ ActionConst.REPLACE }
              initial={ true }
              />

          </Scene>

        </Router>
      </Provider>
    )
  }

  AppRegistry.registerComponent('Newsby', () => app);
}
```

The Provider will give us the ability to connect to our app `store`, and now we can **@connect** our top-level smart components to the app state.

Now, we willl connect our page `app/containers/index.js` to the store:

```js
'use strict'

import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loading from '../components/loading';

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

class News extends Component {
  render() {
    return (
        <Loading />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(News);
```

We've successfully created redux and connected our main page to the app state! We now just have to pull the data into our app to complete it.

At the end of this lesson, you should:

- Be able to explain the difference between Smart and Dumb components
- Have created a simple action and action creator
- Created a basic store
- Created a reducer
- Applied the concept of a thunk
- Implemented Redux into Newsby

View this lesson on [GitHub](https://github.com/stanleycyang/Newsby/blob/master/docs/redux.md).
