import React from 'react';
import ReactJson from 'react-json-view';

const jsonStyle = {
  // borderColor: 'white',
  // borderStyle: 'solid',
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  padding: '3px 10px',
};

const StateDisplay = ({ data, title }) => (
  <div className="state-display">
    <h2>{title}</h2>
    <div className="json-container">
      <ReactJson
        style={jsonStyle}
        src={data}
        name={null}
        theme="summerfruit"
        iconStyle="triangle"
        indentWidth={2}
        collapsed={1}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
        groupArraysAfterLength={50}
      />
    </div>
  </div>
);

export default StateDisplay;
