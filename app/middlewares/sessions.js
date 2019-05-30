const errors = require('./../errors'),
  users = require('../services/users'),
  helper = require('../helpers');

exports.isUserAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const payload = helper.sessions.decodeToken(token);
    return users
      .getUserSecretById(payload.id)
      .then(result => helper.sessions.validateToken(token, result.secret))
      .then(decodedToken => {
        req.session = decodedToken;
        return next();
      })
      .catch(error => next(errors.sessionError(`Session error: ${error.message}`)));
  }
  return next(errors.sessionError('Session error: no token provided'));
};

exports.isUserInRole = expectedRole => (req, res, next) =>
  req.session.role === expectedRole
    ? next()
    : next(errors.sessionError(`Session error: ${expectedRole} user expected`));
