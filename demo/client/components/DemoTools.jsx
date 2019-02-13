import React, { useState, useEffect } from 'react';

import StateDisplay from './StateDisplay';

const stateData = {
  number: 5182836,
  string: '٩(｡•́‿•̀｡)۶',
  boolean: true,
  'undefined val': undefined,
  'null val': null,


  array: [true, null, 12345, 'wow'],
  object: {
    nested: {
      key: {
        value: {
          pairs: '( ´_ゝ`)',
        },
      },
    },
  },
};

const cacheData = {
  'Post:5': {
    id: 5,
    some: 'data',
    about: 'a',
    neat: 'book',
  },
  'Post:7': {
    id: 7,
    here: 'is',
    more: 'data',
    about: 'a',
    post: 'wow',
  },
  'Post:14': {
    id: 14,
    some: 'fake',
    stuff: 'here',
    too: '...',
  },
  'Post:3': {
    id: 3,
    some: 'data',
    about: 'a',
    neat: 'book',
  },
};

const DemoTools = props => (
  <div className="demo-tools">
    <StateDisplay title="State" data={stateData} />
    <StateDisplay title="Cache" data={cacheData} />
    <StateDisplay title="Queries" data={stateData} />
  </div>
);

export default DemoTools;
