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
      return res.status(201).send({ message: `User ${user.name} inserted with ID: ${response.id}` });
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
        storedUser = response;
        return helper.comparePassword(user.password, storedUser.password);
      }
      return Promise.reject(errors.badLogInError('The email or password provided is incorrect'));
    })
    .then(isPassword =>
      isPassword
        ? helper.sessions.generateToken({ username: user.email }, '1h')
        : Promise.reject(errors.badLogInError('The email or password provided is incorrect'))
    )
    .then(token =>
      res
        .status(200)
        .set({ authorization: token })
        .send({ message: `User with id ${storedUser.id} authenticated` })
    )
    .catch(next);
};

exports.getUsersList = (req, res, next) => {
  const { limit, page } = req.query;
  const offset = req.skip;
  return users
    .getUsers(limit, offset)
    .then(usersList => res.status(200).send(usersMapper.usersListResponse(limit, page, usersList)))
    .catch(next);
};
