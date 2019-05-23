const request = require('supertest'),
  app = require('../app'),
  dictum = require('dictum.js');

describe('Health check', () => {
  test('It should respond with code 200', () =>
    request(app)
      .get('/health')
      .then(response => {
        expect(response.statusCode).toBe(200);
        dictum.chai(response, 'Test successful sign up');
      }));
});

describe('POST /users', () => {
  const agent = request(app);
  test('Test successful sign up. It should response with code 201', () =>
    agent
      .post('/users')
      .send({
        name: 'ArquiMedes Galileo',
        last_name: 'Alighieri',
        email: 'arquimedes.ali@wolox.ar',
        password: '123e123_rw'
      })
      .then(response => {
        expect(response.statusCode).toBe(201);
        dictum.chai(response, 'Test successful sign up');
      }));

  test('Test used email. It should respond with 503', () =>
    agent
      .post('/users')
      .send({
        name: 'ArquiMedes',
        last_name: 'Eurler',
        email: 'arquimedes.ali@wolox.ar',
        password: '123r-asd+df-f'
      })
      .then(() =>
        agent
          .post('/users')
          .send({
            name: 'ArquiMedes Rene',
            last_name: 'Allistar',
            email: 'arquimedes.ali@wolox.ar',
            password: '123r_wsdf-f'
          })
          .then(response => {
            expect(response.statusCode).toBe(503);
            dictum.chai(response, 'Test used email');
          })
      ));

  test('Test invalid password. It should fail with code 422', () =>
    request(app)
      .post('/users')
      .send({
        name: 'ArquiMedes Rene',
        last_name: 'Allistar',
        email: 'arqui.ali@wolox.ar',
        password: '123r'
      })
      .then(response => {
        expect(response.statusCode).toBe(422);
        dictum.chai(response, 'Test invalid password');
      }));
});
