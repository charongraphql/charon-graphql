/* eslint-disable class-methods-use-this */
const parseQueryForTypename = require('./helpers/parseQueryForTypename');
const parseQueryForFields = require('./helpers/parseQueryForFields');
const normalize = require('./helpers/normalize');


console.log(`\nrun @ ${new Date().toLocaleTimeString('en-US')}\n`);

/*
*  @param: uri - uri for the graphql server
*  @param: options object - any additonal options to configure the cache
*    - headers: an object containing headers as key/value pairs
*      to be included with requests to the server
*    - userDefinedUniqueSchemaFields: an object where the user can set a
*      field on any given schema to be used as the unique identifier for
*      objects of that schemaType.
*/

class Charon {
  constructor({
    uri,
    headers = { 'Content-Type': 'application/graphql' },
    userDefinedUniqueSchemaFields = {},
  }) {
    this.cache = {};
    this.uri = uri;
    this.headers = headers;
    this.uniqueSchemaFields = {
      default: 'id',
      ...userDefinedUniqueSchemaFields,
      getField(schemaType) {
        if (this[schemaType] !== undefined) return this[schemaType];
        return this.default;
      },
    };
  }


  queryServer(query, variables) {
    console.log('contacting server...');
  }

  addResult(queryResult) {
    const normalized = normalize(queryResult, this.uniqueSchemaFields);
    this.cache = { ...this.cache, ...normalized };
  }

  readCache(query, variables) {
    console.log('reading cache...');
    const typename = parseQueryForTypename(query);
    const field = this.uniqueSchemaFields.getField(typename);
    // console.log(typename);
    // use a helper funciton to parse the Query String
    // the result of the helper function will return the typename based on the string
    const key = `${typename}:${variables[field]}`;
    const rawFromCache = this.cache[key];

    const queryFields = parseQueryForFields(query);
  }
}


module.exports = Charon;
