import React, { useState, useEffect } from 'react';
import DemoAppView from './DemoAppView';
import DemoTools from './DemoTools';

const DemoContainer = () => (
  <div className="demo-container">
    <DemoAppView />
    <DemoTools />
  </div>
);

export default DemoContainer;
