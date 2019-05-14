const bcrypt = require('bcrypt');

exports.formatName = name => {
  const names = name.trim().split(' ');
  let formattedName = '';
  names.forEach(current => {
    const word = current.trim().toLowerCase();
    formattedName += `${word[0].toUpperCase()}${word.slice(1)} `;
  });
  return formattedName.trim();
};

exports.testRegex = (value, regexString, flag) => {
  const regex = new RegExp(regexString, flag);
  return regex.test(value);
};

exports.encodePassword = password => bcrypt.hash(password, 10);
