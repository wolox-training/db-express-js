const errors = require('../errors'),
  { User } = require('../models');

exports.registerUser = user =>
  User.create(user).catch(error =>
    Promise.reject(errors.databaseError(`${error.name}: ${error.errors[0].message}`))
  );

exports.getUserByEmail = email =>
  User.findOne({
    where: { email },
    attributes: ['id', 'name', 'lastName', 'email', 'password', 'role', 'secret'],
    raw: true
  }).catch(error => Promise.reject(errors.databaseError(`${error.name}: ${error.errors[0].message}`)));

exports.getUsers = (limit, offset) =>
  User.findAndCountAll({
    limit,
    offset,
    attributes: ['id', 'name', 'email'],
    order: ['id'],
    raw: true
  }).catch(error => Promise.reject(errors.databaseError(`${error.name}: ${error.errors[0].message}`)));

exports.changeRole = (email, role) =>
  User.update({ role }, { where: { email }, returning: true, raw: true }).catch(error =>
    Promise.reject(errors.databaseError(`${error.name}: ${error.errors[0].message}`))
  );

exports.updateSecret = (id, secret) =>
  User.update({ secret }, { where: { id }, raw: true }).catch(error =>
    Promise.reject(errors.databaseError(`${error.name}: ${error.errors[0].message}`))
  );

exports.getUserSecretById = id =>
  User.findOne({ where: { id }, attributes: ['secret'], raw: true }).catch(error =>
    Promise.reject(errors.databaseError(`${error.name}: ${error.errors[0].message}`))
  );
