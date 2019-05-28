const errors = require('../errors'),
  logger = require('../logger');

exports.albumsListAsAdmin = (req, res, next) => {
  if (req.session.role === 'admin') {
    return next();
  }
  logger.info(req.session.id, req.params.id);
  return req.session.id === parseInt(req.params.id)
    ? next()
    : next(errors.sessionError('Not enough priviliges'));
};
