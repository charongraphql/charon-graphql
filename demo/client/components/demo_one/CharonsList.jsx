import React, { useState } from 'react';
import ListingCreator from './ListingCreator';
import ListingsContainer from './ListingsContainer';
import ListingCreatorVanilla from '../demo_two/ListingCreatorVanilla';
import ListingsContainerVanilla from '../demo_two/ListingsContainerVanilla';

const CharonsList = () => {
  // [<piece of state>, <method to update that piece of state>]
  // empty array in useState initializes listings as an empty array
  const [listings, setListings] = useState([]);

  return (
    <div className="charons-list">
      <ListingCreator listings={listings} setListings={setListings} />
      <ListingsContainer listings={listings} setListings={setListings} />
    </div>
  );
};
export default CharonsList;
