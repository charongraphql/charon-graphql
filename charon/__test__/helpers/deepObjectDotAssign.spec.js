const deepObjectDotAssign = require('../../helpers/deepObjectDotAssign');

const fakeQueryField = { name: 1, listing: [{ title: 1 }] };

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
  expect(deepObjectDotAssign(fakeQueryField, fakeCachedField)).toEqual(fakeResult);
});
