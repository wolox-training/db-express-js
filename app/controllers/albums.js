const albums = require('../services/albums'),
  errors = require('../errors'),
  logger = require('../logger');

exports.getAlbumsList = (req, res, next) => {
  logger.info('GET method start. Fetching albums list.');
  return albums
    .getAlbums()
    .then(albumList => {
      logger.info('Request successful. List of albums retrieved.');
      return res.status(200).send(albumList);
    })
    .catch(next);
};

exports.getPhotosByAlbumId = (req, res, next) => {
  logger.info('GET method start. Fetching photos.');
  const { id } = req.params;
  return albums
    .getPhotosByAlbumId(id)
    .then(photos => {
      logger.info(`Request successful. Photos of album with ID ${id} retrieved.`);
      return res.status(200).send(photos);
    })
    .catch(next);
};

exports.buyAlbum = (req, res, next) => {
  logger.info('POST method start. Buy album.');
  const userId = req.session.id;
  const albumId = req.params.id;
  return albums
    .getUserAlbums(userId)
    .then(userAlbums =>
      userAlbums.some(album => album.id === parseInt(albumId))
        ? Promise.reject(errors.albumServiceError('Album already bought'))
        : albums.getAlbumById(albumId)
    )
    .then(album =>
      album
        ? albums.addAlbum({ ...album, userId })
        : Promise.reject(errors.albumServiceError('Album not found'))
    )
    .then(response =>
      res.status(200).send({ message: `Bought album titled: '${response.title}' with id: ${response.id}` })
    )
    .catch(next);
};
