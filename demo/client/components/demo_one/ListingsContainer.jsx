import React, { useState, useEffect } from 'react';
import { graphql, compose } from 'react-apollo';
import Listing from './Listing';
import { getListingsQuery, deleteListingMutation } from '../../queries/queries';

const ListingsContainer = (props) => {
  const [listings, setListings] = useState([]);

  // component did mount, setListing to fetched data.
  useEffect(() => {
    if (!props.data.loading) {
      setListings(props.data.listings);
    }
  });

  const deleteListing = (listingId) => {
    // props.deleteListingMutation({
    //   variables: {
    //     id: listingId,
    //   },
    //   refetchQueries: [
    //     {
    //       query: getBooksQuery
    //     }
    //   ]
    // });

    const newListings = listings.slice();
    newListings.splice(index, 1);
    // updating our listings state
    setListings(newListings);
    // update the listings database
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

export default graphql(getListingsQuery)(ListingsContainer);
