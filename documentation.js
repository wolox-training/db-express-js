const dictum = require('dictum.js');

// For every endpoints
dictum.document({
  description: 'Successful case, when the user is signed up correctly',
  endpoint: '/users',
  method: 'POST',
  requestHeaders: {
    'Content-Type': 'application/json'
  },
  requestPathParams: {},
  requestBodyParams: {
    name: 'User name',
    last_name: 'User last name',
    email: 'User email email@wolox.(ar,cl,co,com)',
    password: 'User password'
  },
  responseStatus: 201,
  responseHeaders: {},
  responseBody: {
    message: 'User ___ inserted with ID: x'
  },
  resource: 'successful-signup'
});
