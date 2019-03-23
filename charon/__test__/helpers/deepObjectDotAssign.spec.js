const deepObjectDotAssign = require('../../helpers/deepObjectDotAssign');
const { cache } = require('./dummyData');

const fakeCachedField = { __typename: 'Author', id: '1', name: 'Chang' };

const fakeResult = {
  target: {
    name: 'Chang',
    listing: [
      {
        title: 1,
      },
    ],
  },
  err: [
    [
      'listing',
      [
        {
          title: 1,
        },
      ],
    ],
  ],
};
test('works like regular object.assign', () => {
  const fakeQueryField = { name: 1, listing: [{ title: 1 }] };
  expect(deepObjectDotAssign(fakeQueryField, fakeCachedField)).toEqual(fakeResult);
});

test('should pass no matter how many spaces', () => {
  const fakeQueryField = { name: 1, listing: [{ title: 1 }] };
  expect(deepObjectDotAssign(fakeQueryField, fakeCachedField)).toEqual(fakeResult);
});

test('nested objects', () => {
  const fakeQueryField = { name: 1, listing: { title: 1, author: { name: 1 } } };
  const CachedField = {
    __typename: 'Author',
    id: '1',
    name: 'Chang',
    listing: {
      __typename: 'Listing',
    },
  };
  const result = {
    err: [['title', 1], ['author', { name: 1 }]],
    target: { listing: { author: { name: 1 }, title: 1 }, name: 'Chang' },
  };
  expect(deepObjectDotAssign(fakeQueryField, CachedField)).toEqual(result);
});
