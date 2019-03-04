/* eslint-disable class-methods-use-this */
const generateCharonKeyFromQuery = require('./helpers/generateCharonKeyFromQuery');
const parseQueryForFields = require('./helpers/parseQueryForFields');
const normalize = require('./helpers/normalize');
const deNormalize = require('./helpers/deNormalize');

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

  // checkCharonKey(query, variables) {
  //   return this.cache[generateCharonKeyFromQuery(query, variables)] !== undefined;
  // }

  checkCacheForPartial(charonKey, query) {
    const queryFields = parseQueryForFields(query);
    console.log('queryFields::: ', queryFields);
    console.log('rawFromCache::: ', deNormalize(this.cache[charonKey], this.cache));

    console.log('--------------------------------------');
    console.log(Object.is(queryFields, this.cache[charonKey]));

    return true;
  }

  getResultFromCache(query, variables) {
    const queryFields = parseQueryForFields(query);
  }

  getAllCachedData() {
    const nestedData = {};

    Object.entries(this.cache).forEach(([charonKey, queryBody]) => {
      // const field = cacheKey.toLowerCase().replace(/(:)(?<=:)\S+/g, 's');
      nestedData[charonKey] = deNormalize(queryBody, this.cache);
    });

    return nestedData;
  }

  // //from cache
  getQueriedData(query, variables) {
    const nestedData = {};
    if (this.cache[query]) {
      return { query: deNormalize(this.cache[query], this.cache) };
    }
    const charonKey = generateCharonKeyFromQuery(query, variables);
    if (this.cache[charonKey]) {
      if (this.checkCacheForPartial(charonKey, query)) {
        console.log('yay');
      }
      return this.getResultFromCache(query, variables);
    }
    // if not found then hit database
    return nestedData;
  }
}

module.exports = Charon;
