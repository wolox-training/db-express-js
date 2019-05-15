const logger = require('../logger'),
  users = require('../services/users'),
  usersMapper = require('../mappers/users');

exports.userRegistration = (req, res, next) => {
  logger.info('POST method start. User registration.');
  const user = req.body;
  logger.info(user);
  return usersMapper
    .encryptAndFormat(user)
    .then(users.registerUser)
    .then(response => {
      logger.info(`User inserted with ID: ${response.id}`, user);
      return res.status(201).send({ message: `User ${user.name}} inserted with ID: ${response.id}` });
    })
    .catch(next);
};
