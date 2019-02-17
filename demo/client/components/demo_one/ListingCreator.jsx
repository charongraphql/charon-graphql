import React, { useState, useEffect } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addListingMutation, getListingsQuery } from '../../queries/queries';

const ListingCreator = props => {
  const [listingsCount, setListingsCount] = useState(0);

  // combo of componentDidMount and componentDidUpdate
  useEffect(() => {
    if (!props.getListingsQuery.loading) {
      // waits till loading complete to set correct length
      setListingsCount(props.listings.length);
    }
  });
  // creates flag to ensure useEffect does not perpetually fetch listings
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // condition for intial loading of listings - similiar to compdidMount
    // without this initialized check useEffect will also act like compDidUpdate
    if (!props.getListingsQuery.loading && !initialized) {
      setListingsCount(props.getListingsQuery.listings.length);
      // console.log('this should only be called when page refreshes');
      setInitialized(true);
    }
  });
  // set initial state for query inputs
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authorName, setAuthorName] = useState('');
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
    // TODO: send data to db w/ author_id
    if (title) {
      if (authorId) {
        // passed in from queries module
        // call to add item to db -> hits endpoint which holds schema -> once called, that sends to db
        props
          .addListingMutation({
            variables: {
              title,
              authorId,
            },
            // TODO: check if there's a way to have addListingMutation return newly created listing without making a second call
            // refetchQueries: [
            //   {
            //     query: getListingsQuery, // why dont we need to bind this to component?
            //   },
            // ],
          })
          .then(res => {
            const addedListing = res.data.addListing;
            // Hooks setState can take in a callback! why do we not need to worry about effecting state directly?
            props.setListings(listing =>
              listing.concat({
                id: addedListing.id,
                title: addedListing.title,
                author: addedListing.author,
              }),
            );
            // reset title to empty
            setTitle('');
            setAuthorId('');
          })
          .catch(err => {
            throw err;
          });
        // if we can get mutation to return listing we can refactor lines 68-75
        // updating state with new listing
      }
    }
  };

  const displayAuthors = () => {
    const data = props.getAuthorsQuery;
    if (data.loading) {
      // vanilla html attribute that disables dropdown
      return <option disabled>loading authors...</option>;
    }
    return data.authors.map(author => (
      // jsx / html issue
      // option tag can only take one value attribute
      // is there a better way to store auth id and name ?
      <option key={author.id} value={[author.id, author.name]}>
        {author.name}
      </option>
    ));
  };

  return (
    <div className="listing-creator">
      <div>
        <h3>Total Listings:</h3> <span>{listingsCount}</span>
      </div>
      <form onSubmit={addListing}>
        <div className="field">
          <label>Title: </label>
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
          <span>{titleError}</span>
        </div>

        <div className="field">
          <label>Author: </label>
          <select
            value={authorId}
            onChange={e => {
              setAuthorId(e.target.value.substring(0, e.target.value.indexOf(',')));
              setAuthorName(e.target.value.substring(e.target.value.indexOf(',') + 1));
              setAuthorError('✅');
            }}
          >
            <option>Select Author</option>
            {displayAuthors()}
          </select>
          <span>{authorError}</span>
        </div>

        <input type="submit" value="+" />
      </form>
    </div>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addListingMutation, { name: 'addListingMutation' }),
  graphql(getListingsQuery, { name: 'getListingsQuery' }),
)(ListingCreator);
