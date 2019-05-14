const helper = require('../helpers');

exports.signUp = {
  name: {
    in: ['body'],
    custom: {
      options: value => helper.testRegex(value, "^[a-z' ]+$", 'i')
    },
    customSanitizer: {
      options: helper.formatName
    },
    errorMessage: 'Please enter a valid user name.'
  },
  last_name: {
    in: ['body'],
    custom: {
      options: value => helper.testRegex(value, "^[a-z' ]+$", 'i')
    },
    customSanitizer: {
      options: helper.formatName
    },
    errorMessage: 'Please enter a valid last name.'
  },
  email: {
    in: ['body'],
    custom: {
      options: value => helper.testRegex(value, '^[a-zñ0-9.+_-]+@(wolox.(ar|cl|co|com))$', 'i')
    },
    normalizeEmail: {
      options: {
        all_lowercase: true
      }
    },
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
