import React, { useState, useEffect } from 'react';

import Listing from '../demo_one/Listing';
import Pagination from '../Pagination';
import gql from './gqlQueries';

const ListingsContainer = ({ setListings, listings }) => {
  // const [listings, setListings] = useState([]);
  const [initialized, setInitialized] = useState(false);
  // component did mount/update, setListing to fetched data.
  useEffect(() => {
    if (!initialized) {
      console.log('should show up once');
      gql.getListings().then(data => {
        setListings(data.data.listings); // really???
      });
      setInitialized(true);
    }
  });

  const deleteListing = (listingId, index) => {
    // delete listing from database
    gql.deleteListing(listingId).then(data => {
      console.log('deleting listing', data);
    });

    // deleting the listing from displayed props
    const newListings = listings.slice();
    newListings.splice(index, 1);
    setListings(newListings);
  };

  // mapping props to components for display
  const getAllListing = () =>
    listings.map((listing, index) => (
      <Listing
        key={listing.id}
        listing_id={listing.id}
        title={listing.title}
        author={listing.author.name}
        index={index}
        deleteListing={deleteListing}
      />
    ));

  return (
    <div className="listings-container">
      <div className="listings">
        {/* displaying mapped components */}
        {getAllListing()}
      </div>
      <div className="listing-pagination">
        <Pagination />
      </div>
    </div>
  );
};

export default ListingsContainer;
