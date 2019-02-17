import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
// needed to make hot module reloading aware of the css file
import '../dist/style.css';
import App from './App';

// load fonts from google
WebFont.load({
  google: {
    families: ['Open Sans', 'Major Mono Display'],
  },
});


// hooks react app into the html
ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

// HOT MODULE RELOADING
module.hot.accept();
