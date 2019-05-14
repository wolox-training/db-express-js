const errors = require('../errors'),
  { users } = require('../models');

exports.registerUser = user =>
  users
    .create(user)
    .catch(error => Promise.reject(errors.databaseError(`${error.name}: ${error.errors[0].message}`)));
