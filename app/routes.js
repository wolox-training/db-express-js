const { healthCheck } = require('./controllers/healthCheck'),
  albums = require('./controllers/albums'),
  users = require('./controllers/users'),
  usersMiddleware = require('./middlewares/users'),
  schemas = require('./schemas');

exports.init = app => {
  app.get('/health', healthCheck);

  app.get('/albums', albums.getAlbumsList);
  app.get('/albums/:id/photos', albums.getPhotosByAlbumId);

  app.post('/users', usersMiddleware.validateSchemaAndFail(schemas.users.signUp), users.userRegistration);
};
