/* eslint-disable quotes, quote-props, comma-dangle, no-console */
const Charon = require('./index');

const result = {
  data: {
    listings: [
      {
        __typename: 'Listing',
        id: '1',
        title: 'Someting',
        author: {
          __typename: 'Author',
          id: '1',
          name: 'Chang',
        },
      },
      {
        __typename: 'Listing',
        id: '2',
        title: 'Small Trampoline',
        author: {
          __typename: 'Author',
          id: '2',
          name: 'Joel',
        },
      },
    ],
  },
};

/* ------------------------------------------- */
const cacheConfig = {
  uri: 'http://localhost:4000/graphql',
};

const charon = new Charon(cacheConfig);

const query = `
  query getAuthorById($id: ID!) {
    author (id: $id) {
      name
      listing {
        title
      }
  }
}
`;
const variables = {
  id: 3,
};
/* ------------------------------------------ */

charon.addResult(result);
const data = charon.cache;

console.log('data, ', data);
console.log('--------------------------------------');

const yesyesyes = JSON.stringify(charon.getQueriedData(query, variables), null, 2);
console.log('did it work????: ', yesyesyes);

const addedData = {
  __typename: 'Listing',
  id: '69',
  title: 'Avocado Toast',
  author: {
    __typename: 'Author',
    id: '1',
    name: 'ben',
  },
};

const normalizedData = [
  {
    __typename: 'Listing',
    id: '66',
    title: 'refrigerator',
    author: {
      __typename: 'Author',
      id: '1',
      name: 'ben',
    },
  },
];

module.exports = result;
