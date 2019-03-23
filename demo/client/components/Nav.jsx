import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="nav">
    <Link to="/">home</Link>
    <Link to="/about">About</Link>
    <Link to="/docs">docs</Link>
    <a
      href="https://github.com/charongraphql/charon-graphql"
      target="_blank"
      rel="noopener noreferrer"
    >
      github
    </a>
    <a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">
      npm
    </a>
  </div>
);

export default Nav;
