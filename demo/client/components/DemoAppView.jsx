import React from 'react';
import CharonsList from './demo_one/CharonsList';

const DemoAppView = ({ match }) => {
  const selectDemo = () => {
    if (match.params.demo === 'demo1') {
      return <CharonsList />;
    }
    if (match.params.demo === 'demo2') {
      return <CharonsList />;
    }
    if (match.params.demo === 'demo3') {
      return <CharonsList />;
    }
    return <span>Error...</span>;
  };

  return <div className="demo-app-view">{selectDemo()}</div>;
};

export default DemoAppView;
