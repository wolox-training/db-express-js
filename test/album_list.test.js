const request = require('supertest'),
  app = require('../app'),
  util = require('./util'),
  dictum = require('dictum.js');

describe('GET /users/:id/albums', () => {
  test('Test get albums list as standard user. It should responde with code 200', () =>
    util.createUserAndLogin('standar').then(logIn =>
      request(app)
        .get('/users/1/albums')
        .set({ Authorization: logIn.headers.authorization })
        .then(response => {
          dictum.chai(response, 'Test get albums list as standard user');
          return expect(response.statusCode).toBe(200);
        })
    ));

  test('Test get albums of a different user as standard user. It should fail with code 440', () =>
    util.createUserAndLogin('standar').then(logIn =>
      request(app)
        .get('/users/200/albums')
        .set({ Authorization: logIn.headers.authorization })
        .then(response => {
          dictum.chai(response, 'Test get albums of a different user as standard user');
          return expect(response.statusCode).toBe(440);
        })
    ));

  test('Test get albums of a different user as admin user. It should responde with code 200', () =>
    util.createUserAndLogin('admin').then(logIn =>
      request(app)
        .get('/users/200/albums')
        .set({ Authorization: logIn.headers.authorization })
        .then(response => {
          dictum.chai(response, 'Test get albums of a different user as admin user');
          return expect(response.statusCode).toBe(200);
        })
    ));
});
