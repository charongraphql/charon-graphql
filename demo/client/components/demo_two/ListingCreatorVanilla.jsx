import React, { useState, useEffect } from 'react';
import gql from './gqlQueries';

const ListingCreatorVanilla = ({ setListings, listings }) => {
  const [listingsCount, setListingsCount] = useState(0);
  const [authors, setAuthors] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // combo of componentDidMount and componentDidUpdate
  useEffect(() => {
    if (initialized) {
      // waits till loading complete to set correct length
      setListingsCount(listings.length);
    }
  });

  // creates flag to ensure useEffect does not perpetually fetch listings
  useEffect(() => {
    // condition for intial loading of listings - similiar to compdidMount
    // without this initialized check useEffect will also act like compDidUpdate
    if (!initialized) {
      gql.getListings().then(res => {
        setListingsCount(res.data.listings.length);
      });
      gql.getAuthors().then(res => {
        setAuthors(res.data.authors);
      });
      setInitialized(true);
    }
  });
  // set initial state for query inputs
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  // input validation
  const [titleError, setTitleError] = useState('❌');
  const [authorError, setAuthorError] = useState('❌');

  useEffect(() => {
    if (!title) {
      setTitleError('❌');
    }
    if (!authorId || authorId === 'Select Author') {
      setAuthorError('❌');
    }
  });

  const addListing = e => {
    e.preventDefault();
    if (title) {
      if (authorId) {
        gql
          .addListing(title, authorId)
          .then(res => {
            const addedListing = res.data.addListing;
            setListings(listing =>
              listing.concat({
                id: addedListing.id,
                title: addedListing.title,
                author: addedListing.author,
              }),
            );
            setTitle('');
            setAuthorId('');
          })
          .catch(err => {
            throw err;
          });
      }
    }
  };

  const displayAuthors = () => {
    return authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };

  return (
    <div className="listing-creator">
      <div className="creator-tools">
        <div>
          <h3>Total Listings:</h3> <span>Total Count: {listingsCount}</span>
        </div>
        <form onSubmit={addListing}>
          <div className="field">
            <label>
              Title:
              <input
                type="text"
                name="title"
                placeholder="Enter Title"
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                  setTitleError('✅');
                }}
              />
            </label>
            <span>{titleError}</span>
          </div>

          <div className="field">
            <label>
              Author:
              <select
                value={authorId}
                onChange={e => {
                  setAuthorId(e.target.value);
                  setAuthorError('✅');
                }}
              >
                <option>Select Author</option>
                {displayAuthors()}
              </select>
            </label>
            <span>{authorError}</span>
          </div>

          <input type="submit" value="+" />
        </form>
      </div>
    </div>
  );
};

export default ListingCreatorVanilla;
