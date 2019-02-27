/* eslint-disable no-underscore-dangle */
module.exports = function generateKeyFromOjbect(obj, uniqueSchemaFields) {
  const schemaType = obj.__typename;
  const field = uniqueSchemaFields.getField(schemaType);
  const id = obj[field];
  return `${schemaType}:${id}`;
};
