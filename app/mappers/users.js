const helper = require('../helpers');

exports.encryptAndFormat = user =>
  helper
    .encodePassword(user.password)
    .then(password => ({
      ...user,
      lastName: user.last_name,
      password
    }))
    .catch(error => Promise.reject(error.message));
