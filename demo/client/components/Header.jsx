import React from 'react';
import Nav from './Nav';


const Header = props => (
  <header className="header">
    <div id="logo-container">
      <h1>Charon GraphQL</h1>
    </div>

    <Nav />
  </header>
);

export default Header;
