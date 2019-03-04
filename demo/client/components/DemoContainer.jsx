import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import DemoAppView from './DemoAppView';
import DemoTools from './DemoTools';

const DemoContainer = () => (
  <Router>
    <div className="demo-container">
      <div className="demo-links">
        <Link to="/demo1">Demo 1</Link>
        <Link to="/demo2">Demo 2</Link>
        <Link to="/demo3">Demo 3</Link>
      </div>
      <Switch>
        <Redirect from="/" exact to="/demo1" />
        <Route
          path="/:demo"
          render={({ match }) => (
            <div className="demo-routes">
              <DemoAppView match={match} />
              <DemoTools match={match} />
            </div>
          )}
        />
      </Switch>
    </div>
  </Router>
);

export default DemoContainer;
