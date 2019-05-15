const request = require('supertest'),
  app = require('../app');

describe('POST /users/sessions. Test user log in', () => {
  test('It should show the uptime', () => {
    const agent = request(app);
    agent
      .post('/users')
      .send({
        name: 'Lucia',
        last_name: 'Alvarez',
        email: 'luci.alvarez@wolox.ar',
        password: '1234_wol0x'
      })
      .then(() => {
        agent
          .post('/users/sessions')
          .send({
            email: 'luci.alvarez@wolox.ar',
            password: '123_wol0x'
          })
          .then(response => {
            expect(response.statusCode).toBe(200);
          });
      });
  });
});
