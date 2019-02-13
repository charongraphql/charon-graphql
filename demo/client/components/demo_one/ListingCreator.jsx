import React, { useState, useEffect } from 'react';


const ListingCreator = () => {
  const [listings, setListings] = useState([]); 
  const [listingsCount, setListingsCount] = useState(0);
  const [title, setTitle] = useState('');
  
  const addListing = (e) => {
    e.preventDefault();
    
    // TODO: send data to db w/ author_id
    // increment listingCount
    if (title) {
      setListingsCount(listingsCount + 1);
      // reset title to empty
      setTitle('');
    }
  }

  return (
    <div className="listing-creator">
      <div>
        {listingsCount}
      </div>
      <form onSubmit={addListing}>
        Title:
        <br></br>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <br></br>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
};


export default ListingCreator;