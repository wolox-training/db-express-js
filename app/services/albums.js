const request = require('request-promise-native'),
  errors = require('../errors'),
  { endpoints } = require('../../config').common,
  logger = require('../logger/');

exports.getAlbums = () => {
  const options = {
    method: 'GET',
    uri: endpoints.albumApiUrl
  };
  logger.info(`Request to make: ${options.method} ${options.uri}`);
  return request(options).catch(error =>
    Promise.reject(errors.albumApiError(`Error getting response from Album API. ${error.message}`))
  );
};

exports.getPhotosByAlbumId = id => {
  const options = {
    method: 'GET',
    uri: `${endpoints.albumApiUrl}:${id}/photos`
  };
  logger.info(`Request to make: ${options.method} ${options.uri}`);
  return request(options).catch(error =>
    Promise.reject(errors.albumApiError(`Error getting response from Album API. ${error.message}`))
  );
};
