const helper = require('../helpers');
const { User } = require('../models');

exports.signUp = {
  name: {
    in: ['body'],
    isLength: { options: { min: 1 } },
    matches: {
      options: /^[a-z' ]+$/i
    },
    trim: true,
    customSanitizer: { options: helper.formatName },
    errorMessage: 'Please enter a valid user name.'
  },
  last_name: {
    in: ['body'],
    isLength: { options: { min: 1 } },
    matches: {
      options: /^[a-z' ]+$/i
    },
    trim: true,
    customSanitizer: { options: helper.formatName },
    errorMessage: 'Please enter a valid last name.'
  },
  email: {
    in: ['body'],
    matches: {
      options: /^[a-zA-Z0-9]+@wolox.([A-Za-z])+$/,
      errorMessage: 'The email must have the wolox domain'
    },
    custom: {
      options: value => User.findAll({ where: { email: value } }).then(users => !(users.length > 0)),
      errorMessage: 'Email must be unique'
    }
  },
  password: {
    in: ['body'],
    isLength: { options: { min: 8, max: 30 } },
    trim: true,
    errorMessage: 'Please enter a valid password with 8 or more characters.'
  },
  role: {
    isEmpty: true,
    customSanitizer: { options: () => 'standard' },
    errorMessage: 'Role asignment cannot be done from the request'
  }
};

exports.logIn = {
  email: {
    in: ['body'],
    matches: {
      options: /^[a-zñ0-9.+_-]+@(wolox.(ar|cl|co|com))$/i
    },
    normalizeEmail: { options: { all_lowercase: true } },
    trim: true,
    errorMessage: 'The email has to be a valid one in Wolox domains.'
  },
  password: {
    in: ['body'],
    isLength: { options: { min: 8, max: 30 } },
    trim: true,
    errorMessage: 'Please enter a valid password with 8 or more characters.'
  }
};
