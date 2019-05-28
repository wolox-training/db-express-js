const request = require('supertest'),
  app = require('../app'),
  nock = require('nock'),
  dictum = require('dictum.js'),
  { User } = require('../app/models');

const createUserAndLogin = () => {
  const user = {
    name: 'Arquimedes',
    lastName: 'Alighieri',
    email: 'arquimedes.ali@wolox.co',
    password: '$2b$10$QyCTfl29yXujZPG8HbVxVeeW2dgmE6nwqW2GtQHqydN7E55uMjCkC',
    role: 'standard'
  };
  return User.create(user).then(() =>
    request(app)
      .post('/users/sessions')
      .send({
        email: 'arquimedes.ali@wolox.co',
        password: '1234_wol0x'
      })
  );
};
const mockResponse = {
  userId: 1,
  id: 2,
  title: 'quidem molestiae enim'
};

describe('POST /albums/:id', () => {
  beforeEach(() => {
    nock('https://jsonplaceholder.typicode.com')
      .get('/albums/2')
      .reply(200, mockResponse);
  });
  const agent = request(app);

  test('Test buying album. It should respond with code 200', () =>
    createUserAndLogin()
      .then(logIn => agent.post('/albums/2/').set({ Authorization: logIn.headers.authorization }))
      .then(response => {
        dictum.chai(response, 'Test buying album');
        expect(response.statusCode).toBe(200);
        return expect(response.body).toHaveProperty('message');
      }));

  test('Test buying the same album two times. It shound responde with code 422', () =>
    createUserAndLogin()
      .then(logIn =>
        agent
          .post('/albums/2/')
          .set({ Authorization: logIn.headers.authorization })
          .then(() => agent.post('/albums/2/').set({ Authorization: logIn.headers.authorization }))
      )
      .then(response => {
        dictum.chai(response, 'Test buying the same album two times');
        expect(response.statusCode).toBe(422);
        return expect(response.body).toHaveProperty('message');
      }));
});
