const sh = require('shorthash');
const { query, gqlResult, cache } = require('./dummyData');
const normalize = require('../../helpers/normalize');

test('normalize gql correctly', () => {
  expect(normalize(gqlResult, sh.unique(query))).toEqual(cache);
});
