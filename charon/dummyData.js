/* eslint-disable quotes, quote-props, comma-dangle, no-console */
const Charon = require('./index');

const result = {
  data: {
    authors: [
      {
        __typename: 'Author',
        id: '1',
        name: 'ben',
        listing: [
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
        ],
      },
      {
        __typename: 'Author',
        id: '2',
        name: 'chang',
        listing: [
          {
            __typename: 'Listing',
            id: '67',
            title: 'Large Trampoline',
            author: {
              __typename: 'Author',
              id: '2',
              name: 'chang',
            },
          },
          {
            __typename: 'Listing',
            id: '68',
            title: 'big bowl of jello',
            author: {
              __typename: 'Author',
              id: '2',
              name: 'chang',
            },
          },
        ],
      },
      {
        __typename: 'Author',
        id: '3',
        name: 'joel',
        listing: [
          {
            __typename: 'Listing',
            id: '53',
            title: 'Television',
            author: {
              __typename: 'Author',
              id: '3',
              name: 'joel',
            },
          },
        ],
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
