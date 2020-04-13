const graphql = require('graphql');

console.log('here');
exports.album = new graphql.GraphQLObjectType({
  name: 'Album',
  fields: () => ({
    id: { type: graphql.GraphQLInt },
    title: { type: graphql.GraphQLString }
  })
});

/* exports.album = `
  type Album {
    userId: Int!,
    id: Int!,
    title: String!
  }
   type Query {
     album(id: Int): Album!,
     albums: [Album]!
   }
`; */
