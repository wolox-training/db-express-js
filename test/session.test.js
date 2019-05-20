const request = require('supertest'),
  app = require('../app'),
  dictum = require('dictum.js');

describe('POST /users/sessions', () => {
  test('Test user-log in. It should respond with code 200', () => {
    const agent = request(app);
    return agent
      .post('/users')
      .send({
        name: 'Lucia',
        last_name: 'Alvarez',
        email: 'luci.alvarez@wolox.ar',
        password: '1234_wol0x'
      })
      .then(() =>
        agent
          .post('/users/sessions')
          .send({
            email: 'luci.alvarez@wolox.ar',
            password: '1234_wol0x'
          })
          .then(response => {
            expect(response.statusCode).toBe(200);
            dictum.chai(response, 'Test user-log in');
          })
      );
  });

  test('Test log-in fail due to wrong email. It should respond with 403', () => {
    const agent = request(app);
    return agent
      .post('/users')
      .send({
        name: 'Lucia',
        last_name: 'Alvarez',
        email: 'luci.alvarez@wolox.ar',
        password: '1234_wol0x'
      })
      .then(() =>
        agent
          .post('/users/sessions')
          .send({
            email: 'luci.alrez@wolox.ar',
            password: '1234_wol0x'
          })
          .then(response => {
            expect(response.statusCode).toBe(403);
            dictum.chai(response, 'Test log-in fail due to wrong email');
          })
      );
  });

  test('Test log-in fail due to wrong password. It should respond with 403', () => {
    const agent = request(app);
    return agent
      .post('/users')
      .send({
        name: 'Lucia',
        last_name: 'Alvarez',
        email: 'luci.alvarez@wolox.ar',
        password: '1234_wol0x'
      })
      .then(() =>
        agent
          .post('/users/sessions')
          .send({
            email: 'luci.alvarez@wolox.ar',
            password: '1_wol0xxx0'
          })
          .then(response => {
            expect(response.statusCode).toBe(403);
            dictum.chai(response, 'Test log-in fail due to wrong password');
          })
      );
  });
});
