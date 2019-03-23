const query = `{ 
  listings {
    __typename 
    id 
    title 
    author { 
      __typename
      id 
      name 
    } 
  } 
}`;

const gqlResult = {
  data: {
    listings: [
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
      {
        __typename: 'Listing',
        id: '3',
        title: 'Television',
        author: {
          __typename: 'Author',
          id: '3',
          name: 'Ben',
        },
      },
      {
        __typename: 'Listing',
        id: '4',
        title: 'Laptop',
        author: {
          __typename: 'Author',
          id: '1',
          name: 'Chang',
        },
      },
      {
        __typename: 'Listing',
        id: '6',
        title: 'Large Trampoline',
        author: {
          __typename: 'Author',
          id: '1',
          name: 'Chang',
        },
      },
    ],
  },
};

const cache = {
  '2baFw9:': {
    listings: ['Listing:2', 'Listing:3', 'Listing:4', 'Listing:6'],
  },
  'Listing:2': {
    __typename: 'Listing',
    id: '2',
    title: 'Small Trampoline',
    author: 'Author:2',
  },
  'Listing:3': {
    __typename: 'Listing',
    id: '3',
    title: 'Television',
    author: 'Author:3',
  },
  'Listing:4': {
    __typename: 'Listing',
    id: '4',
    title: 'Laptop',
    author: 'Author:1',
  },
  'Listing:6': {
    __typename: 'Listing',
    id: '6',
    title: 'Large Trampoline',
    author: 'Author:1',
  },
  'Author:2': {
    __typename: 'Author',
    id: '2',
    name: 'Joel',
  },
  'Author:3': {
    __typename: 'Author',
    id: '3',
    name: 'Ben',
  },
  'Author:1': {
    __typename: 'Author',
    id: '1',
    name: 'Chang',
  },
};

const deNormalizeResult = {
  data: {
    listings: [
      {
        __typename: 'Listing',
        id: '2',
        title: 'Small Trampoline',
        author: '2',
      },
      {
        __typename: 'Listing',
        id: '3',
        title: 'Television',
        author: '3',
      },
      {
        __typename: 'Listing',
        id: '4',
        title: 'Laptop',
        author: '1',
      },
      {
        __typename: 'Listing',
        id: '6',
        title: 'Large Trampoline',
        author: '1',
      },
    ],
  },
};

const queryOne = `
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
  id: 1,
};

module.exports = { query, gqlResult, cache, deNormalizeResult, queryOne, variables };
