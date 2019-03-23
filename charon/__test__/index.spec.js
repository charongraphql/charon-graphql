const sh = require('shorthash');
const { query, cache } = require('./helpers/dummyData');
const Index = require('../index');

const charon = new Index({ uri: '/api/graphql' });
charon.cache = cache;

test('should checkCache and return data', () => {
  const result = { listings: ['Listing:2', 'Listing:3', 'Listing:4', 'Listing:6'] };
  expect(typeof charon.checkCache(query)).toBe('object');
  expect(charon.checkCache(query)).toEqual(result);
});

test('should add gql result to the cache', () => {
  const addedGqlResult = {
    data: {
      listings: [
        {
          __typename: 'Listing',
          id: '12',
          title: 'Wallet',
          author: {
            __typename: 'Author',
            id: '2',
            name: 'Joel',
          },
        },
      ],
    },
  };
  const result = { listings: ['Listing:2', 'Listing:3', 'Listing:4', 'Listing:6'] };
  expect(typeof charon.checkCache(query)).toBe('object');
  expect(charon.checkCache(query)).toEqual(result);
});
