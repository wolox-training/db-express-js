const albums = require('../../services/albums');

exports.getAlbum = id => albums.getAlbumById(id);
exports.getAlbums = () => albums.getAlbums();
