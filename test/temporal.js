const albums = require('../app/services/albums.js'),
  logger = require('../app/logger');

function getAlbumTest() {
  return albums.getAlbums();
}

test('Prints log', () => {
  getAlbumTest().then(response => logger.info(`Test successful, reponse with length: ${response.length}`));
});
