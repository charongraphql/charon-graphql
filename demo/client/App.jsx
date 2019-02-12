import React, { useState, useEffect } from 'react';
import DemoContainer from './components/DemoContainer';

const App = () => (
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
);

export default App;
