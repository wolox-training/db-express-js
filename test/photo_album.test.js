const request = require('supertest'),
  app = require('../app'),
  dictum = require('dictum.js'),
  util = require('./util');

const albumResponse = {
  userId: 1,
  id: 23,
  title: 'quidem molestiae enim'
};
const photosResponse = [
  {
    albumId: 23,
    id: 1101,
    title: 'ullam iusto quibusdam ratione aliquid',
    url: 'https://via.placeholder.com/600/d17252',
    thumbnailUrl: 'https://via.placeholder.com/150/d17252'
  }
];

describe('GET /users/albums/:id/photos', () => {
  test('Test logged user purchased album. It should respond with code 200', async () => {
    const logIn = await util.createUserAndLogin('standard');
    util.nockGetJsonplaceholder('/albums/23', 200, albumResponse);
    await request(app)
      .post('/albums/23')
      .set({ Authorization: logIn.headers.authorization });
    util.nockGetJsonplaceholder('/albums/23/photos', 200, photosResponse);
    const response = await request(app)
      .get('/users/albums/23/photos')
      .set({ Authorization: logIn.headers.authorization });
    dictum.chai(response, 'Test logged user purchased album. It should respond with code 200');
    return expect(response.statusCode).toBe(200);
  });

  test('Test logged user not purchased album. It should fail with code 422', async () => {
    const logIn = await util.createUserAndLogin('standard');
    const response = await request(app)
      .get('/users/albums/54/photos')
      .set({ Authorization: logIn.headers.authorization });
    dictum.chai(response, 'Test logged user not purchased album. It should fail with code 422');
    return expect(response.statusCode).toBe(422);
  });
});
