const logger = require('../logger'),
  users = require('../services/users');

exports.userRegistration = (req, res, next) => {
  logger.info('POST method start. User registration.');
  if (req.query) {
    const user = req.query;
    logger.info(`User information { name: ${user.name}, lastName: ${user.lastName}, email: ${user.email} }`);
    users
      .registerUser(user)
      .then(response => {
        logger.info(response);
        return res
          .status(201)
          .send({ message: `User ${user.name} ${user.lastName} inserted with ID: ${response.id}` });
      })
      .catch(next);
  }
};
