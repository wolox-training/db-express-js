const request = require('supertest'),
  app = require('../app'),
  util = require('./util'),
  dictum = require('dictum.js');

describe('POST users/sessions/terminate_all', () => {
  test('Test all user sessions must be terminated. It should responde with code 200', () =>
    util.createUserAndLogin('standard').then(logIn =>
      request(app)
        .post('/users/sessions/terminate_all')
        .set({ Authorization: logIn.headers.authorization })
        .expect(200)
        .then(response => {
          dictum.chai(
            response,
            'Test all user sessions must be terminated. It should responde with code 200'
          );
        })
    ));

  test('Test fail on endpoint that requires login. It should fail with code 440', () =>
    util
      .createUserAndLogin('standard')
      .then(logIn =>
        request(app)
          .post('/users/sessions/terminate_all')
          .set({ Authorization: logIn.headers.authorization })
          .then(() => logIn)
      )
      .then(logIn =>
        // Endpoint for buying an album that requires login
        request(app)
          .post('/albums/34')
          .set({ Authorization: logIn.headers.authorization })
          .expect(440, {
            message: 'Session error: invalid signature',
            internal_code: 'session_error'
          })
          .then(response => {
            dictum.chai(response, 'Test fail on endpoint that requires login. It should fail with code 440');
          })
      ));
});

describe('Expired Sessions', () => {
  test('Test request with expired token. It should fail with code 440', () =>
    util.createUserAndLogin('standard').then(logIn => {
      const token = util.forceTokenToExpire(logIn.headers.authorization);
      // Endpoint for buying an album that requires login
      return request(app)
        .post('/albums/34')
        .set({ Authorization: token })
        .expect(440, { message: 'Session error: jwt expired', internal_code: 'session_error' });
    }));
});
