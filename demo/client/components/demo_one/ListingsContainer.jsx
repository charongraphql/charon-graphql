import React, { useState, useEffect } from 'react';
import Listing from './Listing';

const ListingsContainer = () => {
  const obj = [
    { id: 1, title: 'ben eats yogurt', author: 1 },
    { id: 2, title: 'chang eats sweet potato', author: 3 },
    { id: 3, title: 'joel eats gorillas', author: 1 },
  ];

  const [listings, setListings] = useState(obj);

  const getAllListing = () => listings.map(listing => (
    <Listing key={listing.id} title={listing.title} author={listing.author} />
  ));

  return <div className="listings-container">{getAllListing()}</div>;
};

export default ListingsContainer;
