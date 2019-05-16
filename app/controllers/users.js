const logger = require('../logger'),
  users = require('../services/users'),
  usersMapper = require('../mappers/users'),
  helper = require('../helpers'),
  errors = require('../errors');

exports.userRegistration = (req, res, next) => {
  logger.info('POST method start. User registration.');
  const user = req.body;
  return usersMapper
    .encryptAndFormat(user)
    .then(users.registerUser)
    .then(response => {
      logger.info(`User inserted with ID: ${response.id}`);
      return res.status(201).send({ message: `User ${user.name}} inserted with ID: ${response.id}` });
    })
    .catch(next);
};

exports.userLogIn = (req, res, next) => {
  logger.info('POST method start. User authentication.');
  const user = req.body;
  let storedUser = {};
  return users
    .getUserByEmail(user.email)
    .then(response => {
      if (response) {
        storedUser = response.dataValues;
        return helper.comparePassword(user.password, storedUser.password);
      }
      return Promise.reject(errors.badLogInError(`User with email ${user.email} not found`));
    })
    .then(isPassword =>
      isPassword
        ? helper.sessions.generateToken({ username: user.email }, '1h')
        : Promise.reject(errors.badLogInError('Incorret password'))
    )
    .then(token => res.status(200).send({ token, id: storedUser.id }))
    .catch(next);
};
