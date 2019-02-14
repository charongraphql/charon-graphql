import React, { useState, useEffect } from 'react';

const Listing = ({
  title, author, listing_id, deleteListing,
}) => (
  <div className="listing">
    <img src="https://picsum.photos/300/200?random" />
    <h3>{title}</h3>
    <p>
      posted by:
      {' '}
      {author}
    </p>
    <button type="button" onClick={() => deleteListing(listing_id)}>
      remove
    </button>
  </div>
);

export default Listing;
