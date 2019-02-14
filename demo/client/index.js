import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import '../dist/style.css';
import App from './App';

WebFont.load({
  google: {
    families: ['Open Sans', 'Major Mono Display'],
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

module.hot.accept();
