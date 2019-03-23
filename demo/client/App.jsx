import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Gradient from './components/Gradient';
import Header from './components/Header';
import DemoContainer from './components/DemoContainer';
import ErrorPage from './components/ErrorPage';

const App = () => (
  <Gradient>
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" component={DemoContainer} exact />
          <Route path="/about" />
          <Route path="/docs" />
          <Route path="/github" />
          <Route path="/npm" />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  </Gradient>
);

export default App;
