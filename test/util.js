const request = require('supertest'),
  app = require('../app'),
  nock = require('nock'),
  { User } = require('../app/models');

exports.createUserAndLogin = role => {
  const user = {
    name: 'Arquimedes',
    lastName: 'Alighieri',
    email: 'arquimedes.ali@wolox.co',
    password: '$2b$10$QyCTfl29yXujZPG8HbVxVeeW2dgmE6nwqW2GtQHqydN7E55uMjCkC',
    role
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

exports.nockGetJsonplaceholder = (route, code, response) => {
  nock('https://jsonplaceholder.typicode.com')
    .get(route)
    .reply(code, response);
};
