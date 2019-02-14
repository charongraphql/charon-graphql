import React, { useState, useEffect } from "react";

const Listing = ({ title, author, listing_id, index, deleteListing }) => (
  <div className="listing">
    <h3>{title}</h3>
    <p>{author}</p>
    <button type="button" onClick={() => deleteListing(listing_id, index)}>
      X
    </button>
  </div>
);

export default Listing;
