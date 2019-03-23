/* eslint-disable class-methods-use-this */
const sh = require('shorthash');
const generateCharonKeyFromQuery = require('./helpers/generateCharonKeyFromQuery');
const parseQueryForFields = require('./helpers/parseQueryForFields');
const normalize = require('./helpers/normalize');
const deNormalize = require('./helpers/deNormalize');
const deepObjectDotAssign = require('./helpers/deepObjectDotAssign');

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

  addResult(queryResult, query) {
    // shorthen query string with hash
    const normalized = normalize(queryResult, sh.unique(query));
    this.cache = { ...this.cache, ...normalized };
  }

  forceFetchFromDatabase(query, variables) {
    // return fetch('/graphql', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   },
    //   body: JSON.stringify({
    //     query,
    //     variables,
    //   }),
    // })
    //   .then(r => r.json())
    //   .then(data => data);
    return 'grabbing from database....';
  }

  checkCacheForPartial(charonKey, query) {
    const queryFields = parseQueryForFields(query);
    const rawFromCache = deNormalize(this.cache[charonKey], this.cache);
    return deepObjectDotAssign(queryFields, rawFromCache);
  }

  getAllCachedData() {
    const nestedData = {};
    Object.entries(this.cache).forEach(([charonKey, queryBody]) => {
      // const field = cacheKey.toLowerCase().replace(/(:)(?<=:)\S+/g, 's');
      nestedData[charonKey] = deNormalize(queryBody, this.cache);
    });
    return nestedData;
  }

  getQueriedData(query, variables) {
    const queryKey = `${sh.unique(query)}:`;
    if (this.cache[queryKey]) {
      return { query: deNormalize(this.cache[queryKey], this.cache) };
    }
    const charonKey = generateCharonKeyFromQuery(query, variables);
    if (this.cache[charonKey]) {
      const { err, target } = this.checkCacheForPartial(charonKey, query);
      if (!err.length) {
        return { target };
      }
    }
    return this.forceFetchFromDatabase(query, variables);
  }
}

module.exports = Charon;
