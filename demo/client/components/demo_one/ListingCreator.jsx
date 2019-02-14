import React, { useState, useEffect } from 'react';
import { graphql, compose } from 'react-apollo';
import {
  getAuthorsQuery,
  addListingMutation,
  getListingsQuery,
} from '../../queries/queries';

const ListingCreator = (props) => {
  const [listingsCount, setListingsCount] = useState(0);
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');

  const addListing = (e) => {
    e.preventDefault();
    // TODO: send data to db w/ author_id
    if (title) {
      if (authorId) {
        props.addListingMutation({
          variables: {
            title,
            authorId,
          },
          refetchQueries: [
            {
              query: getListingsQuery, // why dont we need to bind this to component?
            },
          ],
        });
        // increment listingCount
        setListingsCount(listingsCount + 1);
        // reset title to empty
        setTitle('');
        setAuthorId('');
      } else {
        window.alert('select an author');
      }
    } else {
      window.alert('needs title');
    }
  };

  const displayAuthors = () => {
    const data = props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>loading authors...</option>;
    }
    return data.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };

  return (
    <div className="listing-creator">
      <div>
        Total Listings:
        {listingsCount}
      </div>
      <form onSubmit={addListing}>
        <div className="field">
          <label>Title: </label>
          <input
            type="text"
            name="title"
            placeholder=' "Large Trampoline" '
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Author: </label>
          <select value={authorId} onChange={e => setAuthorId(e.target.value)}>
            <option>Select Author</option>
            {displayAuthors()}
          </select>
        </div>

        <input type="submit" value="+" />
      </form>
    </div>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addListingMutation, { name: 'addListingMutation' }),
)(ListingCreator);
