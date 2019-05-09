const albumsService = require('../services/albums'),
  logger = require('../logger');

exports.albumsGET = (req, res, next) =>
  albumsService
    .getAlbums()
    .then(albums => {
      logger.info('Request successful. List of albums retrieved.');
      return res.status(200).send(albums);
    })
    .catch(next);

exports.albumsGETPhotos = (req, res, next) => {
  const { id } = req.params;
  return albumsService
    .getPhotosByAlbumId(id)
    .then(photos => {
      logger.info(`Request successful. Photos of album with ID ${id} retrieved.`);
      return res.status(200).send(photos);
    })
    .catch(next);
};
