import Charon from 'charon-graphql';

const config = {
  uri: '/graphql',
};
const cache = new Charon(config);

const gql = {
  getListings: () => {
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `{ 
          listings { 
            id 
            title 
            author { 
              id name 
            } 
          } 
        }`,
      }),
    })
      .then(r => r.json())
      .then(data => data);
  },

  getAuthors: () => {
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `{ 
        authors { 
          id name 
        } 
      }`,
      }),
    })
      .then(r => r.json())
      .then(data => data);
  },

  addListing: (id, title) => {
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `mutation($title: String!, $id: ID!) { 
          addListing(title: $title, author_id: $id) {
            id
            title
            author {
              id
              name
            }
          }
        }`,
        variables: { id, title },
      }),
    })
      .then(r => r.json())
      .then(data => {
        cache.addResult(data);
        return data;
      });
  },

  deleteListing: id => {
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `mutation($id: ID!) { 
          deleteListing(id: $id) {
            title
            author {
              name
            }
          }
        }`,
        variables: { id },
      }),
    })
      .then(r => r.json())
      .then(data => data);
  },
};

export default { gql, cache };
