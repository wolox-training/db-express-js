const logger = require('../logger'),
  users = require('../services/users'),
  albums = require('../services/albums'),
  usersMapper = require('../mappers/users'),
  errors = require('../errors');

exports.userRegistration = (req, res, next) => {
  logger.info('POST method start. User registration.');
  const user = req.body;
  return usersMapper
    .encryptAndFormat(user)
    .then(users.registerUser)
    .then(response => {
      logger.info(`User inserted with ID: ${response.id}`);
      return res.status(201).send({
        message: `User ${response.name} created with ID: ${response.id} and role: ${response.role}`
      });
    })
    .catch(next);
};

exports.getUsersList = (req, res, next) => {
  const { limit, page } = req.query;
  const offset = req.skip;
  return users
    .getUsers(limit, offset)
    .then(usersList => res.status(200).send(usersMapper.usersListResponse(limit, page, usersList)))
    .catch(next);
};

exports.adminUserRegistration = (req, res, next) => {
  logger.info('POST method start. Create admin user or promote user to admin');
  const user = req.body;
  user.role = 'admin';
  return users
    .changeRole(user.email, user.role)
    .then(updated =>
      updated[0]
        ? res.status(201).send({ message: `User ${updated[1][0].name} promoted to admin` })
        : exports.userRegistration(req, res, next)
    )
    .catch(next);
};

exports.getUserAlbumsList = (req, res, next) => {
  logger.info(`GET method start. Fetching albums list as ${req.session.role} user`);
  return albums
    .getUserAlbums(req.params.id)
    .then(albumList => res.status(200).send(albumList))
    .catch(next);
};

exports.getUserPhotoAlbum = (req, res, next) => {
  logger.info(`GET method start. Fetching photo album with id: ${req.params.id}`);
  const userId = req.session.id;
  const albumId = req.params.id;
  return albums
    .getUserAlbums(userId)
    .then(userAlbums =>
      userAlbums.some(album => album.id === albumId)
        ? albums.getPhotosByAlbumId(albumId)
        : Promise.reject(errors.albumServiceError(`The user has not purchased the album with id ${albumId}`))
    )
    .then(photos => {
      const photoAlbum = photos.filter(photo => parseInt(photo.albumId) === albumId);
      return res.status(200).send(photoAlbum);
    })
    .catch(next);
};
