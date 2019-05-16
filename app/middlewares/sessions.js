// const errors = require('./../errors');

exports.isUserAuthenticated = req => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    // helper.sessions.validateToken(token);
  }
};
