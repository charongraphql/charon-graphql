const uniqueSchemaFields = require('./uniqueSchemaFields');
const parseQueryForTypename = require('./parseQueryForTypename');

module.exports = function generateCharonKeyFromQuery(query, variables) {
  // use a helper funciton to parse the Query String
  // grab the type name of the query
  const typename = parseQueryForTypename(query);
  // grab the unique field (default id)
  const uniqueField = uniqueSchemaFields.getField(typename);
  // creates charon key from type name +
  return `${typename}:${variables[uniqueField]}`;
};
