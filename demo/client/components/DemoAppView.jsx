import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import CharonsList from './demo_one/CharonsList';
// Apollo Client Setup
const client = new ApolloClient({
  // server endpoint
  uri: 'http://localhost:4000/graphql',
});

const DemoAppView = ({ match }) => {
  const selectDemo = () => {
    if (match.params.demo === 'demo1') {
      return (
        <ApolloProvider client={client}>
          <CharonsList apollo />;
        </ApolloProvider>
      );
    }
    if (match.params.demo === 'demo2') {
      return <CharonsList apollo={false} />;
    }
    if (match.params.demo === 'demo3') {
      return <CharonsList />;
    }
    return <span>Error...</span>;
  };

  return <div className="demo-app-view">{selectDemo()}</div>;
};

export default DemoAppView;
