import React, { useState, useEffect } from 'react';
import { graphql, compose } from 'react-apollo';

import { getListingsQuery, deleteListingMutation } from '../../queries/queries';
import Listing from './Listing';
import Pagination from '../Pagination';

const ListingsContainer = props => {
  // const [listings, setListings] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // component did mount/update, setListing to fetched data.
  useEffect(() => {
    if (!props.getListingsQuery.loading && !initialized) {
      props.setListings(props.getListingsQuery.listings);
      setInitialized(true);
    }
  });

  const deleteListing = (listingId, index) => {
    props.deleteListingMutation({
      variables: {
        id: listingId
      }
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

  const getAllListing = () =>
    props.listings.map((listing, index) => (
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
  graphql(getListingsQuery, { name: 'getListingsQuery' }),
  graphql(deleteListingMutation, { name: 'deleteListingMutation' })
)(ListingsContainer);
