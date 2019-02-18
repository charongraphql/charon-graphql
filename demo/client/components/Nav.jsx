import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div>
    <Link to="/">home</Link>
    <Link to="/about">About</Link>
    <Link to="/docs">docs</Link>
    <Link to="/github">github</Link>
    <Link to="/npm">npm</Link>
  </div>
);

export default Nav;
