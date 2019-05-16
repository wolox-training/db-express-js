const { healthCheck } = require('./controllers/healthCheck'),
  albums = require('./controllers/albums'),
  users = require('./controllers/users'),
  schemaMiddleware = require('./middlewares/schema-validator'),
  schemas = require('./schemas');

exports.init = app => {
  app.get('/health', healthCheck);

  app.get('/albums', albums.getAlbumsList);
  app.get('/albums/:id/photos', albums.getPhotosByAlbumId);

  app.get('/users');
  app.post('/users', [schemaMiddleware.validateSchemaAndFail(schemas.users.signUp)], users.userRegistration);
  app.post('/users/sessions', [schemaMiddleware.validateSchemaAndFail(schemas.users.logIn)], users.userLogIn);
};
