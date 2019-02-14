import React, { useState, useEffect } from "react";
import ListingCreator from "./ListingCreator";
import ListingsContainer from "./ListingsContainer";

const CharonsList = () => {
  const [listings, setListings] = useState([]);

  return (
    <div className="charons-list">
      <ListingCreator listings={listings} setListings={setListings} />
      <ListingsContainer listings={listings} setListings={setListings} />
    </div>
  );
};
export default CharonsList;
