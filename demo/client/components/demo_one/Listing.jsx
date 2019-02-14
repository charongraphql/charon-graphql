import React, { useState, useEffect } from "react";

const Listing = ({ title, author, index, deleteListing }) => (
  <div className="listing">
    <h3>{title}</h3>
    <p>{author}</p>
    <button type="button" onClick={() => deleteListing(index)}>
      X
    </button>
  </div>
);

export default Listing;
