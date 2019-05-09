const { healthCheck } = require('./controllers/healthCheck'),
  albums = require('./controllers/albums');
exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', albums.getAlbumsList);
  app.get('/albums/:id/photos', albums.getPhotosByAlbumId);
};
