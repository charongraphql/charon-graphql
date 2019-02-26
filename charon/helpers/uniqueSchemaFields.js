/*
  uniqueSchemaFields tracks which field is unique among instances
   of each Schema. Also stores a default key for most Schemas
*/
module.exports = {
  // {'Schema Type': 'unique identifier key'}
  default: 'id',
  getField(schemaType) {
    if (this[schemaType] !== undefined) return this[schemaType];
    return this.default;
  },
  add(schemaType, identifier) {
    this[schemaType] = identifier;
  },
  setDefault(identifier) { this.default = identifier; },
  remove(schemaType) { delete this[schemaType]; },
};
