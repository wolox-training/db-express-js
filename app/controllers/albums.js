const albumsService = require('../services/albums'),
  logger = require('../logger');

exports.getAlbumsList = (req, res, next) => {
  logger.info('GET method start. Fetching albums list.');
  return albumsService
    .getAlbums()
    .then(albums => {
      logger.info('Request successful. List of albums retrieved.');
      return res.status(200).send(albums);
    })
    .catch(next);
};

exports.getPhotosByAlbumId = (req, res, next) => {
  logger.info('GET method start. Fetching photos.');
  const { id } = req.params;
  return albumsService
    .getPhotosByAlbumId(id)
    .then(photos => {
      logger.info(`Request successful. Photos of album with ID ${id} retrieved.`);
      return res.status(200).send(photos);
    })
    .catch(next);
};
