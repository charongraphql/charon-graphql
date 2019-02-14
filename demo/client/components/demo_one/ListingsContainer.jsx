import React, { useState, useEffect } from 'react';
import { graphql, compose } from 'react-apollo';
import Listing from './Listing';
import { getListingsQuery, deleteListingMutation } from '../../queries/queries';

const ListingsContainer = (props) => {
  // const [listings, setListings] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // component did mount, setListing to fetched data.
  useEffect(() => {
    if (!props.getListingsQuery.loading && !initialized) {
      props.setListings(props.getListingsQuery.listings);
      setInitialized(true);
    }
  });

  const deleteListing = (listingId, index) => {
    props.deleteListingMutation({
      variables: {
        id: listingId,
      },
      // refetchQueries: [
      //   {
      //     query: getListingsQuery,
      //   },
      // ],
    });
    const newListings = props.listings.slice();
    newListings.splice(index, 1);
    props.setListings(newListings);
  };

  const getAllListing = () => props.listings.map((listing, index) => (
      <Listing
        key={listing.id}
        listing_id={listing.id}
        title={listing.title}
        author={listing.author.name}
        index={index}
        deleteListing={deleteListing}
      />
    ));

  return <div className="listings-container">{getAllListing()}</div>;
};

export default compose(
  graphql(getListingsQuery, { name: 'getListingsQuery' }),
  graphql(deleteListingMutation, { name: 'deleteListingMutation' }),
)(ListingsContainer);
