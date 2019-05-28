const { healthCheck } = require('./controllers/healthCheck'),
  albums = require('./controllers/albums'),
  users = require('./controllers/users'),
  schemaMiddleware = require('./middlewares/schema_validator'),
  sessionMiddleware = require('./middlewares/sessions'),
  schemas = require('./schemas'),
  paginate = require('express-paginate');

exports.init = app => {
  app.get('/health', healthCheck);

  app.get('/albums', albums.getAlbumsList);
  app.get('/albums/:id/photos', albums.getPhotosByAlbumId);
  app.post('/albums/:id', [sessionMiddleware.isUserAuthenticated], albums.buyAlbum);

  app.get('/users/', [sessionMiddleware.isUserAuthenticated, paginate.middleware(3, 10)], users.getUsersList);
  app.post('/users', [schemaMiddleware.validateSchemaAndFail(schemas.users.signUp)], users.userRegistration);
  app.post('/users/sessions', [schemaMiddleware.validateSchemaAndFail(schemas.users.logIn)], users.userLogIn);

  app.post(
    '/admin/users',
    [
      sessionMiddleware.isUserAuthenticated,
      sessionMiddleware.isUserInRole('admin'),
      schemaMiddleware.validateSchemaAndFail(schemas.users.signUp)
    ],
    users.adminUserRegistration
  );
};
