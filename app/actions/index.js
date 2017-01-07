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
