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
