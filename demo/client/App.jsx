import React, { useState, useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Components
import Gradient from './components/Gradient';
import Header from './components/Header';
import DemoContainer from './components/DemoContainer';

// Apollo Client Setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const App = () => (
  <Gradient>
    <ApolloProvider client={client}>
      <div className="app">
        <Header />
        <DemoContainer />
      </div>
    </ApolloProvider>
  </Gradient>
);

export default App;
