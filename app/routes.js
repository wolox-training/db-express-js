const { healthCheck } = require('./controllers/healthCheck'),
  albums = require('./controllers/albums'),
  users = require('./controllers/users');
exports.init = app => {
  app.get('/health', healthCheck);

  app.get('/albums', albums.getAlbumsList);
  app.get('/albums/:id/photos', albums.getPhotosByAlbumId);

  app.post('/users', users.userRegistration);
};
