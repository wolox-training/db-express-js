const errors = require('../errors'),
  { users } = require('../models');

exports.registerUser = user =>
  users
    .create(user)
    .catch(error => Promise.reject(errors.databaseError(`${error.name}: ${error.errors[0].message}`)));

exports.getUserByEmail = email =>
  users
    .findOne({
      where: { email },
      attributes: ['id', 'name', 'lastName', 'email', 'password', 'role'],
      raw: true
    })
    .catch(error => Promise.reject(errors.databaseError(`${error.name}: ${error.errors[0].message}`)));

exports.getUsers = (limit, offset) =>
  users
    .findAndCountAll({
      limit,
      offset,
      attributes: ['id', 'name', 'email'],
      order: ['id'],
      raw: true
    })
    .catch(error => Promise.reject(errors.databaseError(`${error.name}: ${error.errors[0].message}`)));

exports.changeRole = (email, role) =>
  users
    .update({ role }, { where: { email }, returning: true, raw: true })
    .catch(error => Promise.reject(errors.databaseError(`${error.name}: ${error.errors[0].message}`)));
