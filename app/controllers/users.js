const logger = require('../logger'),
  users = require('../services/users'),
  usersMapper = require('../mappers/users'),
  helper = require('../helpers'),
  errors = require('../errors');
//  jwt = require('jsonwebtoken');

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
  return users
    .getUserByEmail(user.email)
    .then(storedUser =>
      storedUser
        ? helper.comparePassword(user.password, storedUser.password)
        : Promise.reject(errors.badLogInError(`User with email ${user.email} not found`))
    )
    .then(isPassword =>
      isPassword
        ? res.status(200).send({ isPassword, message: 'User authenticated' })
        : Promise.reject(errors.badLogInError('Incorret password'))
    )
    .catch(next);
};

// const createToken = username => {};
