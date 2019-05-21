const errors = require('./../errors'),
  helper = require('../helpers'),
  logger = require('../logger');

exports.isUserAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    return helper.sessions
      .validateToken(token)
      .then(decodedToken => {
        req.headers.inSession = {
          id: decodedToken.id,
          email: decodedToken.email,
          role: decodedToken.role,
          expiresAt: decodedToken.exp
        };
        return next();
      })
      .catch(error => next(errors.sessionError(`Session error: ${error.message}`)));
  }
  return next(errors.sessionError('Session error: no token provided'));
};

exports.isUserInRole = expectedRole => (req, res, next) => {
  logger.info(req.headers.inSession.role, expectedRole);
  if (req.headers.inSession.role === expectedRole) {
    return next();
  }
  return next(errors.sessionError(`Session error: ${expectedRole} user expected`));
};
