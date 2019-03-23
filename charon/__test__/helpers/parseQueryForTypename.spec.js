const { queryOne } = require('./dummyData');
const parseQueryForTypename = require('../../helpers/parseQueryForTypename');

test('grab type name of query string with variables', () => {
  expect(parseQueryForTypename(queryOne)).toBe('Author');
});

test('result should be string', () => {
  expect(typeof queryOne).toBe('string');
  expect(typeof parseQueryForTypename(queryOne)).toBe('string');
});
