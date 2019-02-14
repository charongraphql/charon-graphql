import React, { useState, useEffect } from 'react';
import { graphql, compose } from 'react-apollo';

import { getListingsQuery, deleteListingMutation } from '../../queries/queries';
import Listing from './Listing';
import Pagination from '../Pagination';

const ListingsContainer = (props) => {
  const [listings, setListings] = useState([]);

  // component did mount, setListing to fetched data.
  useEffect(() => {
    if (!props.getListingsQuery.loading) {
      setListings(props.getListingsQuery.listings);
    }
  });

  const deleteListing = (listingId) => {
    props.deleteListingMutation({
      variables: {
        id: listingId,
      },
      refetchQueries: [
        {
          query: getListingsQuery,
        },
      ],
    });
  };

  const getAllListing = () => listings.map(listing => (
    <Listing
        key={listing.id}
        listing_id={listing.id}
        title={listing.title}
        author={listing.author.name}
        deleteListing={deleteListing}
      />
  ));

  return (
    <div className="listings-container">
      <div className="listings">
        {getAllListing()}
      </div>
      <div className="listing-pagination">
        <Pagination />
      </div>
    </div>
  );
};

export default compose(
  graphql(getListingsQuery, { name: 'getListingsQuery' }),
  graphql(deleteListingMutation, { name: 'deleteListingMutation' }),
)(ListingsContainer);
