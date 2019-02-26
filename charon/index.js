/* eslint-disable class-methods-use-this */
const uniqueSchemaFields = require('./helpers/uniqueSchemaFields');
const parseQueryForTypename = require('./helpers/parseQueryForTypename');
const parseQueryForFields = require('./helpers/parseQueryForFields');
const normalize = require('./normalize');
const { deNormalize, checkCache, getAllCachedData, getQueriedData } = require('./deNormalize');

console.log(`\nrun @ ${new Date().toLocaleTimeString('en-US')}\n`);

// console.log('normalize:', normalize);

class Charon {
  constructor() {
    this.cache = {};
  }

  addResult(queryResult) {
    const normalized = normalize(queryResult);
    this.cache = { ...this.cache, ...normalized };
  }

  readCache(query, variables) {
    console.log('reading cache...');
    const typename = parseQueryForTypename(query);
    const field = uniqueSchemaFields.getField(typename);
    // console.log(typename);
    // use a helper funciton to parse the Query String
    // the result of the helper function will return the typename based on the string
    const charonKey = `${typename}:${variables[field]}`;
    const rawFromCache = this.cache[charonKey]; // check if exists

    const queryFields = parseQueryForFields(query);

    // denormalize rawFromCache
    // parse through and match queryFields to denormalized data

    // normalize query
    // parse through and match queryFields to normalized data
    // return denormalized stripped data
  }
}

module.exports = Charon;
