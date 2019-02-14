import React, { useState, useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Components

import Header from './components/Header';
import DemoContainer from './components/DemoContainer';

// Apollo Client Setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="app">
      <Header />
      <DemoContainer />
    </div>
  </ApolloProvider>
);

export default App;
