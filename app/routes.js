const { healthCheck } = require('./controllers/healthCheck'),
  albums = require('./controllers/albums'),
  users = require('./controllers/users'),
  sessions = require('./controllers/sessions'),
  schemaMiddleware = require('./middlewares/schema_validator'),
  sessionMiddleware = require('./middlewares/sessions'),
  albumsMiddleware = require('./middlewares/albums'),
  schemas = require('./schemas'),
  paginate = require('express-paginate');

exports.init = app => {
  app.get('/health', healthCheck);

  app.get('/albums', albums.getAlbumsList);
  app.get('/albums/:id/photos', albums.getPhotosByAlbumId);
  app.post('/albums/:id', [sessionMiddleware.isUserAuthenticated], albums.buyAlbum);

  app.get('/users/', [sessionMiddleware.isUserAuthenticated, paginate.middleware(3, 10)], users.getUsersList);
  app.post('/users', [schemaMiddleware.validateSchemaAndFail(schemas.users.signUp)], users.userRegistration);
  app.post(
    '/admin/users',
    [
      sessionMiddleware.isUserAuthenticated,
      sessionMiddleware.isUserInRole('admin'),
      schemaMiddleware.validateSchemaAndFail(schemas.users.signUp)
    ],
    users.adminUserRegistration
  );

  app.post(
    '/users/sessions',
    [schemaMiddleware.validateSchemaAndFail(schemas.users.logIn)],
    sessions.userLogIn
  );
  app.post(
    '/users/sessions/terminate_all',
    [sessionMiddleware.isUserAuthenticated],
    sessions.terminateUserAllSessions
  );

  app.get(
    '/users/:id/albums',
    [
      sessionMiddleware.isUserAuthenticated,
      schemaMiddleware.validateSchemaAndFail(schemas.params.isId),
      albumsMiddleware.albumsListAsAdmin
    ],
    users.getUserAlbumsList
  );
  app.get(
    '/users/albums/:id/photos',
    [sessionMiddleware.isUserAuthenticated, schemaMiddleware.validateSchemaAndFail(schemas.params.isId)],
    users.getUserPhotoAlbum
  );
};
