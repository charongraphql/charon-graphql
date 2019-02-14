import React, { useState, useEffect } from "react";

const Listing = ({ title, author, listing_id, deleteListing }) => (
  <div className="listing">
    <h3>{title}</h3>
    <p>{author}</p>
    <button type="button" onClick={() => deleteListing(listing_id)}>
      X
    </button>
  </div>
);

export default Listing;
