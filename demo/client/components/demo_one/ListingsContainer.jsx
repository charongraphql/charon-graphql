import React, { useState, useEffect } from 'react';
import { graphql, compose } from 'react-apollo';
import Listing from './Listing';
import { getListingsQuery } from '../../queries/queries';

const ListingsContainer = (props) => {
  console.log('listings;', props.data);
  const [listings, setListings] = useState([]);

  // component did mount, setListing to fetched data.
  useEffect(() => {
    if (!props.data.loading) {
      setListings(props.data.listings);
    }
  });

  const deleteListing = (index) => {
    const newListings = listings.slice();
    newListings.splice(index, 1);
    // updating our listings state
    setListings(newListings);
    // update the listings database
  };

  const getAllListing = () => listings.map((listing, index) => (
    <Listing
      key={listing.id}
      title={listing.title}
      author={listing.author.name}
      index={index}
      deleteListing={deleteListing}
    />
  ));

  return <div className="listings-container">{getAllListing()}</div>;
};

export default graphql(getListingsQuery)(ListingsContainer);
