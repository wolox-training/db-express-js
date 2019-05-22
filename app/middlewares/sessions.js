const errors = require('./../errors'),
  helper = require('../helpers');

exports.isUserAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    return helper.sessions
      .validateToken(token)
      .then(decodedToken => {
        req.body.role = decodedToken.role;
        req.body.expiresAt = decodedToken.exp;
        return next();
      })
      .catch(error => next(errors.sessionError(`Session error: ${error.message}`)));
  }
  return next(errors.sessionError('Session error: no token provided'));
};
