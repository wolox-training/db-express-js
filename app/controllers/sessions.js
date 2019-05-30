const logger = require('../logger'),
  users = require('../services/users'),
  helper = require('../helpers'),
  usersMapper = require('../mappers/users'),
  errors = require('../errors');

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
        ? helper.sessions.generateToken(usersMapper.tokenPayload(storedUser), storedUser.secret)
        : Promise.reject(errors.badLogInError('The email or password provided is incorrect'))
    )
    .then(token =>
      res
        .status(200)
        .set({ authorization: token })
        .send({
          message: `User with id ${
            storedUser.id
          } authenticated. Session expires at ${helper.sessions.getExpirationTime(token)}`
        })
    )
    .catch(next);
};

exports.terminateUserAllSessions = (req, res, next) => {
  logger.info('POST method start. Terminate all user sessions.');
  const userId = req.session.id;
  return helper.sessions
    .generateSecret(userId)
    .then(secret => users.updateSecret(userId, secret))
    .then(() => res.status(200).send({ message: `Terminated all sessions of user with id ${userId}` }))
    .catch(next);
};
