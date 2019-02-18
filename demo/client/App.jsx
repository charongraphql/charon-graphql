import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Gradient from './components/Gradient';
import Header from './components/Header';
import DemoContainer from './components/DemoContainer';
import ErrorPage from './components/ErrorPage';

// Apollo Client Setup
const client = new ApolloClient({
  // server endpoint
  uri: 'http://localhost:4000/graphql',
});

const App = () => (
  <Gradient>
    {/* makes graphQL/queries accessible to bind to components */}
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
          <Header />
          <Switch>
            <Route path="/" component={DemoContainer} exact />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  </Gradient>
);

export default App;
