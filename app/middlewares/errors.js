const errors = require('../errors'),
  logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.DEFAULT_ERROR]: 500,
  [errors.DATABASE_ERROR]: 503,
  [errors.ALBUM_API_ERROR]: 503,
  [errors.SCHEMA_ERROR]: 422,
  [errors.BAD_LOGIN_ERROR]: 403,
  [errors.SESSION_ERROR]: 440,
  [errors.ALBUM_SERVICE_ERROR]: 422
};

exports.handle = (error, req, res, next) => {
  if (error.internalCode) {
    res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  } else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};
