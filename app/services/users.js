// errors = require('../errors')
const logger = require('../logger'),
  userRegistration = require('../helpers/user-registration');

exports.registerUser = user => {
  userRegistration.formatUser(user);
  return userRegistration
    .validateUser(user)
    .then(valid => {
      logger.info(valid);
      return userRegistration.createUser(user);
    })
    .then(inserted => inserted.dataValues);
};
