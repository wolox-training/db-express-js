const jwt = require('jsonwebtoken-promisified'),
  config = require('../../config').common.session;

exports.generateToken = (payload, expiresIn) => jwt.signAsync(payload, config.secret, { expiresIn });

exports.validateToken = token =>
  jwt
    .verifyAsync(token, config.secret)
    .then(inSession => inSession)
    .catch(error => {
      if (error.name === jwt.JsonWebTokenError) {
        return Promise.reject(new Error('Invalid Token'));
      } else if (error.name === jwt.TokenExpiredError) {
        return Promise.reject(new Error('Expired Token'));
      }
      return error;
    });

// exports.generateToken({ username: 'jazzstruggle', email: 'daniel@daniel.com'}, 60).then(console.log);

/* exports.validateToken(
  )
  .catch(); */
