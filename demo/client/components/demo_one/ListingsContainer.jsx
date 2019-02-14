import React, { useState, useEffect } from 'react';
import { graphql, compose } from 'react-apollo';
import Listing from './Listing';
import { getListingsQuery, deleteListingMutation } from '../../queries/queries';

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

  return <div className="listings-container">{getAllListing()}</div>;
};

export default compose(
  graphql(getListingsQuery, { name: 'getListingsQuery' }),
  graphql(deleteListingMutation, { name: 'deleteListingMutation' }),
)(ListingsContainer);
