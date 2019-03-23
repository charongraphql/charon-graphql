const { cache, deNormalizeResult } = require('./dummyData');
const deNormalize = require('../../helpers/deNormalize');

test('deNormalize one field from cache', () => {
  const partOfCacheToDeNormalize = cache['Listing:2'];
  const resultOfPartialDeNormalize = {
    __typename: 'Listing',
    id: '2',
    title: 'Small Trampoline',
    author: '2',
  };
  expect(deNormalize(partOfCacheToDeNormalize, cache)).toEqual(resultOfPartialDeNormalize);
});

test('deNormalize gql query string field (list)', () => {
  const partOfCacheToDeNormalize = cache['2baFw9:'];
  const resultOfDeNormalize = deNormalizeResult.data;
  expect(deNormalize(partOfCacheToDeNormalize, cache)).toEqual(resultOfDeNormalize);
});
