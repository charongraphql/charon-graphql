const { query, queryOne } = require('./dummyData');
const parseQueryForFields = require('../../helpers/parseQueryForFields');

test('convert query to field object', () => {
  const result = { __typename: 1, id: 1, name: 1, '}': 1 };
  expect(parseQueryForFields(query)).toEqual(result);
});

test('convert nested query to field object', () => {
  const result = { listing: [{ title: 1 }], name: 1 };
  expect(parseQueryForFields(queryOne)).toEqual(result);
});

test('convert deep/bloated query to field object', () => {
  const superQuery = `
  query getAuthorById($id: ID!) {
    author (id: $id) {
      name
      title
      anything
      listing {
        title
        yes
        no
        so {
          name
        }
      }
  }
}
`;
  const result = {
    anything: 1,
    listing: [{ no: 1, so: [{ name: 1 }], title: 1, yes: 1 }],
    name: 1,
    title: 1,
  };
  expect(parseQueryForFields(superQuery)).toEqual(result);
});

test('convert string to object', () => {
  expect(typeof query).toBe('string');
  expect(typeof parseQueryForFields(query)).toBe('object');
});
