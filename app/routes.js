// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const albums = require('./controllers/albums');
exports.init = app => {
  app.get('/health', healthCheck);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
  app.get('/albums', albums.albumsGET);
  app.get('/albums/:id/photos', albums.albumsGETPhotos);
};
