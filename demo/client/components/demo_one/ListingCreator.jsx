import React, { useState, useEffect } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addListingMutation, getListingsQuery } from '../../queries/queries';

const ListingCreator = props => {
  const [listingsCount, setListingsCount] = useState(0);

  useEffect(() => {
    if (!props.getListingsQuery.loading) {
      setListingsCount(props.listings.length);
    }
  });
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!props.getListingsQuery.loading && !initialized) {
      setListingsCount(props.getListingsQuery.listings.length);
      // console.log('this should only be called when page refreshes');
      setInitialized(true);
    }
  });

  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authorName, setAuthorName] = useState('');

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
        props.addListingMutation({
          variables: {
            title,
            authorId
          }
          // refetchQueries: [
          //   {
          //     query: getListingsQuery, // why dont we need to bind this to component?
          //   },
          // ],
        });
        // updating state with new listing
        const newListing = props.listings.slice();
        newListing.push({
          id: newListing.length, // change this later
          title,
          author: { id: authorId, name: authorName }
        });
        props.setListings(newListing);
        // increment listingCount
        setListingsCount(listingsCount + 1);
        // reset title to empty
        setTitle('');
        setAuthorId('');
      }
    }
  };

  const displayAuthors = () => {
    const data = props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>loading authors...</option>;
    }
    return data.authors.map(author => (
      <option key={author.id} value={[author.id, author.name]}>
        {author.name}
      </option>
    ));
  };

  return (
    <div className="listing-creator">
      <div>Total Listings: {listingsCount}</div>
      <form onSubmit={addListing}>
        <div className="field">
          <label>Title: </label>
          <input
            type="text"
            name="title"
            placeholder=' "Large Trampoline" '
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
  graphql(getListingsQuery, { name: 'getListingsQuery' })
)(ListingCreator);
