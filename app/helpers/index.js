const bcrypt = require('bcrypt');

exports.formatName = name => {
  if (name) {
    const names = name.trim().split(' ');
    let formattedName = '';
    names.forEach(current => {
      const word = current.trim().toLowerCase();
      formattedName += `${word[0].toUpperCase()}${word.slice(1)} `;
    });
    return formattedName.trim();
  }
  return name;
};

exports.testRegex = (value, regexString, flag) => {
  const regex = new RegExp(regexString, flag);
  return regex.test(value);
};

exports.encodePassword = password => bcrypt.hash(password, 10);

exports.comparePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

// decodePasswordaAndCompare('1234_wol0x', '$2b$10$QyCTfl29yXujZPG8HbVxVeeW2dgmE6nwqW2GtQHqydN7E55uMjCkC')
//   .then(console.log);
