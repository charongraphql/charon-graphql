import React from 'react';
import JSONTree from 'react-json-tree';
import ReactJson from 'react-json-view';


const StateDisplay = ({ data, title }) => (
  <div className="state-display">
    <h1>{title}</h1>
    <div className="json-view">
      <ReactJson
        src={data}
        name={null}
        theme="summerfruit:inverted"
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
