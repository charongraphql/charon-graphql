import React, { useState } from 'react';
import ListingCreator from './ListingCreator';
import ListingsContainer from './ListingsContainer';
import ListingCreatorVanilla from '../demo_two/ListingCreator';
import ListingsContainerVanilla from '../demo_two/ListingsContainer';

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
