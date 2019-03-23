const uniqueSchemaFields = require('../../helpers/uniqueSchemaFields');

test('getField should default to id', () => {
  expect(uniqueSchemaFields.getField('Listing')).toBe('id');
  expect(uniqueSchemaFields.getField('Author')).toBe('id');
  expect(uniqueSchemaFields.getField('Anything')).toBe('id');
});

test('add new identifier', () => {
  expect(uniqueSchemaFields.add('Author', 'name')).toBe();
  expect(uniqueSchemaFields.default).toBe('id');
  expect(uniqueSchemaFields.Author).toBe('name');
});

test('setDefault', () => {
  expect(uniqueSchemaFields.default).toBe('id');
  expect(uniqueSchemaFields.setDefault('name')).toBe();
  expect(uniqueSchemaFields.default).toBe('name');
});

test('remove', () => {
  expect(uniqueSchemaFields.Author).toBe('name');
  expect(uniqueSchemaFields.remove('Author')).toBe();
  expect(uniqueSchemaFields.Author).toBeUndefined();
});

test('getField after adding SchemaType', () => {
  expect(uniqueSchemaFields.setDefault('id')).toBe();
  expect(uniqueSchemaFields.default).toBe('id');
  expect(uniqueSchemaFields.getField('Author')).toBe('id');
  expect(uniqueSchemaFields.add('Author', 'name')).toBe();
  expect(uniqueSchemaFields.getField('Author')).toBe('name');
});
