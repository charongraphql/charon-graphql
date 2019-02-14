import React, { useState, useEffect } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addListingMutation } from '../../queries/queries';

const ListingCreator = (props) => {
  const [listingsCount, setListingsCount] = useState(0);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const addListing = (e) => {
    e.preventDefault();
    // TODO: send data to db w/ author_id
    if (title) {
      if (author) {
        // increment listingCount
        setListingsCount(listingsCount + 1);
        // reset title to empty
        setTitle('');
        setAuthor('');
      }
    } else {
      window.alert('needs title');
    }
  };

  const displayAuthors = () => {
    const { data } = props;
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
            placeholder=" Large Trampoline "
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Author: </label>
          <select onChange={e => setAuthor(e.target.value)}>
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
