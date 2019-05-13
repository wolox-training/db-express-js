const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.ALBUM_API_ERROR = 'album_api_error';
exports.albumApiError = message => internalError(message, exports.ALBUM_API_ERROR);

exports.USER_VALIDATION_ERROR = 'user_validation_error';
exports.userValidationError = message => internalError(message, exports.USER_VALIDATION_ERROR);

exports.UNIQUE_CONSRAINT_ERROR = 'unique_constraint_error';
exports.uniqueConstraintError = message => internalError(message, exports.USER_VALIDATION_ERROR);
