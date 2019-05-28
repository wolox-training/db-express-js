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

exports.SCHEMA_ERROR = 'schema_error';
exports.schemaError = message => internalError(message, exports.SCHEMA_ERROR);

exports.BAD_LOGIN_ERROR = 'bad_login_error';
exports.badLogInError = message => internalError(message, exports.BAD_LOGIN_ERROR);

exports.SESSION_ERROR = 'session_error';
exports.sessionError = message => internalError(message, exports.SESSION_ERROR);

exports.ALBUM_SERVICE_ERROR = 'album_service_error';
exports.albumServiceError = message => internalError(message, exports.ALBUM_SERVICE_ERROR);

exports.ITEM_NOT_FOUND_ERROR = 'item_not_found_error';
exports.itemNotFoundError = message => internalError(message, exports.ITEM_NOT_FOUND_ERROR);
