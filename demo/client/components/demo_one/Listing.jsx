import React, { useState, useEffect } from 'react';

const Listing = ({ title, author }) => (
  <div className="listing">
    <h3>{title}</h3>
    <p>{author}</p>
  </div>
);

export default Listing;
