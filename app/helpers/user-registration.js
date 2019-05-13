const db = require('../models'),
  errors = require('../errors'),
  bcrypt = require('bcrypt');

const formatName = name => {
  const names = name.trim().split(' ');
  let formattedName = '';
  names.forEach(current => {
    const word = current.trim().toLowerCase();
    formattedName += `${word[0].toUpperCase()}${word.slice(1)} `;
  });
  return formattedName.trim();
};

const validateEmail = email => {
  const regex = new RegExp('^[a-zñ0-9.+_-]+@(wolox.(ar|cl|co|com))$', 'i');
  return regex.test(email);
};

const validateName = name => {
  const regex = new RegExp("^[a-z' ]+$", 'i');
  return regex.test(name);
};

const validatePassword = password => {
  const regex = new RegExp('^[a-zA-ZñÑ0-9.+_-]{8,}');
  return regex.test(password);
};

exports.formatUser = user => {
  user.name = formatName(user.name);
  user.lastName = formatName(user.lastName);
  user.email = user.email.trim().toLowerCase();
  user.password = user.password.trim();
};

exports.validateUser = user => {
  if (!validateEmail(user.email)) {
    return Promise.reject(errors.userValidationError('The email has to be a valid one in Wolox domains.'));
  }
  if (!validateName(user.name) || !validateName(user.lastName)) {
    return Promise.reject(errors.userValidationError('Please enter a valid user name or last name.'));
  }
  if (!validatePassword(user.password)) {
    return Promise.reject(
      errors.userValidationError('Please enter a alphanumeric password with 8 or more characters.')
    );
  }
  return Promise.resolve('Valid user.');
};

const encodePassword = password => bcrypt.hashSync(password, 10);

exports.createUser = user => {
  user.password = encodePassword(user.password);
  return db.users
    .create({
      name: user.name,
      last_name: user.lastName,
      email: user.email,
      password: user.password
    })
    .catch(error =>
      Promise.reject(errors.uniqueConstraintError(`${error.name}: ${error.errors[0].message}`))
    );
};
