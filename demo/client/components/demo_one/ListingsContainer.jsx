import React, { useState, useEffect } from 'react';
import { graphql, compose } from 'react-apollo';

import { getListingsQuery, deleteListingMutation } from '../../queries/queries';
import Listing from './Listing';
import Pagination from '../Pagination';

const ListingsContainer = ({ getListingsQuery, deleteListingMutation, setListings, listings }) => {
  const [initialized, setInitialized] = useState(false);

  // component did mount/update, setListing to fetched data.
  useEffect(() => {
    if (!getListingsQuery.loading && !initialized) {
      setListings(getListingsQuery.listings);
      setInitialized(true);
    }
  });

  const deleteListing = (listingId, index) => {
    // delete listing from database
    deleteListingMutation({
      variables: {
        id: listingId,
      },
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
      <div className="listings">{getAllListing()}</div>
      <div className="listing-pagination">
        <Pagination />
      </div>
    </div>
  );
};

export default compose(
  // making the queries/mutations available as props
  graphql(getListingsQuery, { name: 'getListingsQuery' }),
  graphql(deleteListingMutation, { name: 'deleteListingMutation' }),
  // queries are bound to this component
)(ListingsContainer);
