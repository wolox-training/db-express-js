const request = require('supertest'),
  app = require('../app'),
  dictum = require('dictum.js');

describe('GET /users', () => {
  test('Test get users list. It should respond with code 200', () => {
    const agent = request(app);
    const user = {
      name: 'ArquiMedes Galileo',
      last_name: 'Alighieri',
      email: 'arquimedes.ali@wolox.ar',
      password: '123e123_rw'
    };
    return agent
      .post('/users')
      .send(user)
      .then(created => {
        expect(created.statusCode).toBe(201);
        return agent
          .post('/users/sessions')
          .send({
            email: user.email,
            password: user.password
          })
          .then(logIn => {
            expect(logIn.statusCode).toBe(200);
            return agent
              .get('/users')
              .set({ Authorization: logIn.headers.authorization })
              .then(response => {
                dictum.chai(response, 'Test get users list. It should respond with code 200');
                return expect(response.statusCode).toBe(200);
              });
          });
      });
  });
});
