const graphql = require('graphql');
const db = require('./../models/db');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;


const ListingType = new GraphQLObjectType({
  name: 'Listing',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {

        return db.one('SELECT * FROM author WHERE book_id = $1', [args.id])
          .then(data => data)
          .catch(e => console.log(`error: ${e}`));
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    listing: {
      type: new GraphQLList(ListingType),
      resolve(parent, args) {
        return 'list of books';
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    listing: {
      type: ListingType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return db.one('SELECT * FROM listing WHERE id = $1', [args.id])
          .then(data => data)
          .catch(e => console.log(`error: ${e}`));
      },

    },

  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
