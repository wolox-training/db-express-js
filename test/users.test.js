const request = require('supertest'),
  app = require('../app');

describe('Health check', () => {
  test('It should show the uptime', () =>
    request(app)
      .get('/health')
      .then(response => {
        expect(response.statusCode).toBe(200);
      }));
});

describe('POST /users. Test successful sign up', () => {
  test('It should response with code 201', () =>
    request(app)
      .post('/users')
      .send({
        name: 'ArquiMedes Galileo',
        last_name: 'Alighieri',
        email: 'arquimedes.ali@wolox.ar',
        password: '123e123_rw'
      })
      .then(response => {
        expect(response.statusCode).toBe(201);
      }));
});

describe('POST /users. Test used email', () => {
  test('It should fail with code 503', () => {
    const agent = request(app);
    return agent
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
          })
      );
  });
});

describe('POST /users. Test uinvalid password', () => {
  test('It should fail with code 409, due to invalid password', () =>
    request(app)
      .post('/users')
      .send({
        name: 'ArquiMedes Rene',
        last_name: 'Allistar',
        email: 'arqui.ali@wolox.ar',
        password: '123r'
      })
      .then(response => {
        expect(response.statusCode).toBe(409);
      }));
});
