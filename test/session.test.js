const request = require('supertest'),
  app = require('../app');

describe('POST /users/sessions. Test user log in', () => {
  test('It should respond with code 200', () => {
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
          })
      );
  });
});

describe('POST /users/sessions. Test log in fail due to wrong email', () => {
  test('It should respond with 403', () => {
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
          })
      );
  });
});

describe('POST /users/sessions. Test log in fail due to wrong password', () => {
  test('It should respond with 403', () => {
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
          })
      );
  });
});
