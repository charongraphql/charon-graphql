import React, { useState, useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Components
import DemoContainer from './components/DemoContainer';

// Apollo Client Setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="app">
      <nav>
        {' '}
        <span>demo 1</span> 
{' '}
<span>demo 2</span> 
{' '}
<span>demo 3</span>
      </nav>

      <DemoContainer />
    </div>
  </ApolloProvider>
);

export default App;
