import React, { useState } from 'react';
import ListingCreatorVanilla from './ListingCreatorVanilla';
import ListingsContainerVanilla from './ListingsContainerVanilla';

const CharonsListVanilla = () => {
  // React Hooooks

  // [<piece of state>, <method to update that piece of state>]
  // empty array in useState initializes listings as an empty array
  const [listings, setListings] = useState([]);

  return (
    <div className="charons-list">
      <ListingCreatorVanilla listings={listings} setListings={setListings} />
      <ListingsContainerVanilla listings={listings} setListings={setListings} />
    </div>
  );
};
export default CharonsListVanilla;
