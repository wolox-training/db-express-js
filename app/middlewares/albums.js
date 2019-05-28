const errors = require('../errors');

exports.albumsListAsAdmin = (req, res, next) => {
  if (req.session.role === 'admin') {
    return next();
  }
  return req.session.id === req.params.id ? next() : next(errors.sessionError('Not enough priviliges'));
};
