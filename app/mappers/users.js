const helper = require('../helpers');

exports.encryptAndFormat = user =>
  helper
    .encodePassword(user.password)
    .then(password => ({
      ...user,
      lastName: user.last_name,
      password
    }))
    .catch(error => Promise.reject(error.message));

exports.usersListResponse = (limit, page, usersList) => {
  const itemCount = usersList.count;
  const pageCount = Math.ceil(usersList.count / limit);
  return {
    users: usersList.rows,
    page,
    pageCount,
    itemCount
  };
};

exports.tokenPayload = user => ({
  id: user.id,
  email: user.email,
  role: user.role
});
