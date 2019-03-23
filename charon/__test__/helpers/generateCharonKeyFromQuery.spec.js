const generateCharonKeyFromQuery = require('../../helpers/generateCharonKeyFromQuery');
const { queryOne, variables } = require('./dummyData');

test('CharonKey for Author', () => {
  expect(generateCharonKeyFromQuery(queryOne, variables)).toBe('Author:1');
});

test('there is a ":" in CharonKey', () => {
  expect(generateCharonKeyFromQuery(queryOne, variables)).toMatch(/:/);
});
