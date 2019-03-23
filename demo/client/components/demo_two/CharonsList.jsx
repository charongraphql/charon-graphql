import React, { useState } from 'react';
import ListingCreatorVanilla from './ListingCreator';
import ListingsContainerVanilla from './ListingsContainer';

const CharonsList = ({ apollo }) => {
  // React Hooooks

  // [<piece of state>, <method to update that piece of state>]
  // empty array in useState initializes listings as an empty array
  const [listings, setListings] = useState([]);

  const ActivateApollo = () => {
    if (apollo) {
      return (
        <>
          <ListingCreator listings={listings} setListings={setListings} />
          <ListingsContainer listings={listings} setListings={setListings} />
        </>
      );
    }
    return (
      <>
        <ListingCreatorVanilla listings={listings} setListings={setListings} />
        <ListingsContainerVanilla listings={listings} setListings={setListings} />
      </>
    );
  };

  return <div className="charons-list">{ActivateApollo()}</div>;
};
export default CharonsList;
