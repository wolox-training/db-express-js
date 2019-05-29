const request = require('request-promise-native'),
  errors = require('../errors'),
  { endpoints } = require('../../config').common,
  logger = require('../logger/'),
  { Album } = require('../models');

exports.getAlbums = () => {
  const options = {
    method: 'GET',
    uri: endpoints.albumApiUrl,
    json: true
  };
  logger.info(`Request to make: ${options.method} ${options.uri}`);
  return request(options).catch(error =>
    Promise.reject(errors.albumApiError(`Error getting response from Album API. ${error.message}`))
  );
};

exports.getPhotosByAlbumId = id => {
  const options = {
    method: 'GET',
    uri: `${endpoints.albumApiUrl}/${id}/photos`,
    json: true
  };
  logger.info(`Request to make: ${options.method} ${options.uri}`);
  return request(options).catch(error =>
    Promise.reject(errors.albumApiError(`Error getting response from Album API. ${error.message}`))
  );
};

exports.getAlbumById = id => {
  const options = {
    method: 'GET',
    uri: `${endpoints.albumApiUrl}/${id}`,
    json: true
  };
  logger.info(`Request to make: ${options.method} ${options.uri}`);
  return request(options).catch(error =>
    error.statusCode === 404
      ? Promise.reject(errors.itemNotFoundError('Album not found'))
      : Promise.reject(errors.albumApiError(`Error getting response from Album API. ${error.message}`))
  );
};

exports.getUserAlbums = userId =>
  Album.findAll({
    where: { userId },
    attributes: ['id', 'title'],
    raw: true
  }).catch(error => Promise.reject(errors.databaseError(`${error.name}: ${error.errors[0].message}`)));

exports.addAlbum = album =>
  Album.create(album).catch(error =>
    Promise.reject(errors.databaseError(`${error.name}: ${error.errors[0].message}`))
  );
