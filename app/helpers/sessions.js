const jwt = require('jsonwebtoken-promisified'),
  config = require('../../config').common.session;

exports.generateToken = (payload, secret) =>
  jwt.signAsync(payload, secret, { expiresIn: config.expirationTime });

exports.decodeToken = token => jwt.decode(token);

exports.validateToken = (token, secret) => jwt.verifyAsync(token, secret);

const randomAlphaNumericString = length => {
  const aNum = 2,
    zNum = 36;
  // eslint-disable-next-line no-mixed-operators
  const randomAlpha = () => Math.floor(Math.random() * (zNum - aNum) + aNum).toString(zNum);
  return [...Array(length)].map(() => randomAlpha()).join('');
};

exports.generateSecret = id => Promise.resolve(`-${randomAlphaNumericString(20)}_${id}-`);

exports.getExpirationTime = token => {
  const expiresAt = exports.decodeToken(token).exp;
  return new Date(expiresAt * 1000).toString();
};
