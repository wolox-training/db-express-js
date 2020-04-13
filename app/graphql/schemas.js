const graphql = require('graphql');

const types = require('./types');
const resolvers = require('./resolvers');

exports.albumSchema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'AlbumsQueryType',
    fields: () => ({
      album: {
        type: types.album,
        args: {
          id: { type: graphql.GraphQLInt }
        },
        resolve: (_, { id }) => resolvers.albums.getAlbum(id)
      },
      albums: {
        // eslint-disable-next-line new-cap
        type: graphql.GraphQLList(types.album),
        resolve: () => resolvers.albums.getAlbums()
      }
    })
  }),
  types: [types.album]
});
