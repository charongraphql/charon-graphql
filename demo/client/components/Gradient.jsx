import React from 'react';

const Gradient = props => (
  <div className="gradient gradient-bottom">
    <div className="gradient gradient-mid">
      <div className="gradient gradient-top">{props.children}</div>
    </div>
  </div>
);

export default Gradient;
