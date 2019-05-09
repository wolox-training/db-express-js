const request = require('request-promise-native'),
  errors = require('../errors'),
  { endpoints } = require('../constants/endpoints'),
  logger = require('../logger/');

errors.ALBUM_API_ERROR = 501;

exports.getAlbums = () => {
  const options = {
    method: 'GET',
    uri: endpoints.ALBUM_API_URL
  };
  logger.info(`Request to make: ${options.method} ${options.uri}`);
  return request(options).catch(error =>
    Promise.reject(errors.albumApiError(`Error getting response from Album API. ${error.message}`))
  );
};

exports.getPhotosByAlbumId = id => {
  const options = {
    method: 'GET',
    uri: `${endpoints.ALBUM_API_URL}:${id}/photos`
  };
  logger.info(`Request to make: ${options.method} ${options.uri}`);
  return request(options).catch(error =>
    Promise.reject(errors.albumApiError(`Error getting response from Album API. ${error.message}`))
  );
};
