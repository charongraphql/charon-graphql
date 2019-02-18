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

// Defining a listing type
const ListingType = new GraphQLObjectType({
  name: 'Listing',
  // listing database holds id, title, and author. Schema will represent the same column
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // selecting all columns from a row with specified id
        // using db.one to return an object containing one row
        return db
          .one('SELECT * FROM author WHERE id = $1;', [parent.author_id])
          .then(data => data)
          .catch(e => console.log(`error: ${e}`));
      },
    },
  }),
});

// Defining an Author type
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    listing: {
      type: new GraphQLList(ListingType),
      resolve(parent, args) {
        // db.any returns an Array of object
        return db
          .any('SELECT * FROM listing WHERE author_id = $1;', [parent.id])
          .then(data => data)
          .catch(e => console.log(`error: ${e}`));
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // grab information from one listing
    listing: {
      type: ListingType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return db
          .one('SELECT * FROM listing WHERE id = $1;', [args.id])
          .then(data => data)
          .catch(e => console.log(`error: ${e}`));
      },
    },
    // grab information from one author
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return db
          .one('SELECT * FROM author WHERE id = $1;', [args.id])
          .then(data => data)
          .catch(e => console.log(`error: ${e}`));
      },
    },

    // grabs all listing as an array of objects
    listings: {
      type: new GraphQLList(ListingType),
      resolve(parent, args) {
        return db
          .any('SELECT * FROM listing;')
          .then(data => data)
          .catch(e => console.log(`error: ${e}`));
      },
    },

    // grabs all authors as an array of objects
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return db
          .any('SELECT * FROM author;')
          .then(data => data)
          .catch(e => console.log(`error: ${e}`));
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addListing: {
      type: ListingType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        author_id: { type: GraphQLID },
      },
      resolve(parent, args) {
        // returns all fields of the inserted data
        return db
          .one('INSERT INTO listing(title, author_id) VALUES($1, $2) RETURNING *', [
            args.title,
            args.author_id,
          ])
          .then(data => data)
          .catch(e => console.log(`error: ${e}`));
      },
    },
    deleteListing: {
      type: ListingType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        // selecting the field that is going to get deleted before deleting.
        return db
          .one('SELECT * FROM listing WHERE id = $1;', [args.id])
          .then(data => {
            // trying to store the deleted field's result data (why? no reason, maybe can be used)
            const rowCount = db
              .result('DELETE FROM listing WHERE id = $1', [args.id])
              // just picking our the rowCount (the # of rows deleted: should always be one)
              .then(deletedData => deletedData.rowCount)
              .catch(e => console.log(`error: ${e}`));
            // returning the SELECT query data with the DELETED result count data.
            // rowCount promise does NOT get resolved...
            return { ...data, rowCount };
          })
          .catch(e => console.log(`error: ${e}`));
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
