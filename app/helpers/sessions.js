const jwt = require('jsonwebtoken-promisified'),
  config = require('../../config').common.session;

exports.generateToken = (payload, expiresIn) => jwt.signAsync(payload, config.secret, { expiresIn });

exports.validateToken = token => jwt.verifyAsync(token, config.secret);
