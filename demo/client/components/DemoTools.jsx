import React, { useState, useEffect } from 'react';

import StateDisplay from './StateDisplay';
import QueryDisplay from './QueryDisplay';

// dummy data
const stateData = {
  1: {
    author: { id: '1', name: 'ben', __typename: 'Author' },
    id: '103',
    title: 'Television',
    __typename: 'Listing',
    __proto__: Object,
  },
  3: {
    author: {
      id: '3',
      name: 'joel',
      __typename: 'Author',
      __proto__: Object,
    },
    id: '105',
    title: 'Desk',
    __typename: 'Listing',
    __proto__: Object,
  },
  4: {
    author: {
      id: '1',
      name: 'ben',
      __typename: 'Author',
      __proto__: Object,
    },
    id: '106',
    title: 'Bike',
    __typename: 'Listing',
    __proto__: Object,
  },

  5: {
    author: {
      id: '2',
      name: 'chang',
      __typename: 'Author',
      __proto__: Object,
    },
    id: '107',
    title: 'Sweet Potatos',
    __typename: 'Listing',
    __proto__: Object,
  },
  length: 3,
  __proto__: Array(0),
};
const queryData = [
  {
    type: 'query',
    timestamp: new Date(Date.now()),
    query: `{
      authors {
        id
        name
      }
    }`,
    variables: null,
  },
  {
    type: 'query',
    timestamp: new Date(Date.now()),
    query: `{
      listings {
        __typename
        id
        title
        author {
          id
          name
          __typename
        }
      }`,
    variables: null,
  },
  {
    type: 'mutation',
    timestamp: new Date(Date.now()),
    query: `mutation($id: ID!) { 
      deleteListing(id: $id) {
        title
        author {
          name
        }
      }
    }`,
    variables: { id: 104 },
  },
  {
    type: 'mutation',
    timestamp: new Date(Date.now()),
    query: `mutation($title: String!, $id: ID!) {
      addListing(title: $title, author_id: $id) {
        id
        title
        author {
          id
          name
        }
      }
    }`,
    variables: { id: 2, title: 'Sweet Potatos' },
  },

  // number: 5182836,
  // float: 3.14159,
  // notNumber: NaN,
  // date: new Date(Date.now()).toDateString(),
  // string: '٩(｡•́‿•̀｡)۶',
  // boolean: true,
  // 'undefined val': undefined,
  // 'null val': null,

  //   array: [true, null, 12345, 'wow'],
  //   object: {
  //     nested: {
  //       key: {
  //         value: {
  //           pairs: '( ´_ゝ`)',
  //         },
  //       },
  //     },
  //   },
];

// dummy data
const cacheData = {
  '{+listings+{+__typename+id+title+author {+id+name+__typename+}+}+}': {
    listings: ['Listing:103', 'Listing:105', 'Listing:106', 'Listing:107'],
  },
  '{+authors+{+__typename+id+name+}+}': { authors: ['Author:1', 'Author:2', 'Author:3'] },
  'Listing:103': { __typename: 'Listing', id: '103', title: 'Television', author: 'Author:1' },
  'Listing:105': { __typename: 'Listing', id: '105', title: 'Desk', author: 'Author:3' },
  'Listing:106': { __typename: 'Listing', id: '106', title: 'Bike', author: 'Author:1' },
  'Listing:107': { __typename: 'Listing', id: '107', title: 'Sweet Potatos', author: 'Author:2' },
  'Author:1': { id: '1', name: 'ben', __typename: 'Author' },
  'Author:2': { id: '2', name: 'chang', __typename: 'Author' },
  'Author:3': { id: '3', name: 'joel', __typename: 'Author' },
};

const DemoTools = props => (
  <div className="demo-tools">
    <StateDisplay title="state" data={stateData} />
    <StateDisplay title="cache" data={cacheData} />
    <QueryDisplay title="queries" data={queryData} />
  </div>
);

export default DemoTools;
