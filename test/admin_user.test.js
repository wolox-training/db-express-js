const request = require('supertest'),
  app = require('../app'),
  //  dictum = require('dictum.js'),
  { users } = require('../app/models');

describe('POST /admin/users', () => {
  const agent = request(app);
  const adminUser = {
    name: 'Arquimedes',
    lastName: 'Alighieri',
    email: 'arquimedes.ali@wolox.co',
    password: '$2b$10$QyCTfl29yXujZPG8HbVxVeeW2dgmE6nwqW2GtQHqydN7E55uMjCkC',
    role: 'admin'
  };
  test('Test admin user create. It should respond with code 201', () =>
    users
      .create(adminUser)
      .then(() =>
        agent.post('/users/sessions').send({
          email: 'arquimedes.ali@wolox.co',
          password: '1234_wol0x'
        })
      )
      .then(logIn =>
        agent
          .post('/admin/users')
          .set({ Authorization: logIn.headers.authorization })
          .send({
            name: 'Jon',
            last_name: 'Test',
            email: 'jon.test@wolox.co',
            password: '1234.12312'
          })
      )
      .then(response => expect(response.statusCode).toBe(201)));

  test('Test fail due to logged user is not admin. It should respond with code 440', () =>
    users
      .create({ ...adminUser, role: 'standard' })
      .then(() =>
        agent.post('/users/sessions').send({
          email: 'arquimedes.ali@wolox.co',
          password: '1234_wol0x'
        })
      )
      .then(logIn =>
        agent
          .post('/admin/users')
          .set({ Authorization: logIn.headers.authorization })
          .send({
            name: 'Jon',
            last_name: 'Test',
            email: 'jon.test@wolox.co',
            password: '1234.12312'
          })
      )
      .then(response => expect(response.statusCode).toBe(440)));
});
