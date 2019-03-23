import charon from './cache';

const gql = {
  getListings: () => {
    return fetch('/api/graphql', {
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
      .then(data => {
        console.log('this.cache:: ', charon);
        // this.cache.addResult(data);
        return data;
      });
  },

  getAuthors: () => {
    return fetch('api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `{ 
        authors { 
          id 
          name 
        } 
      }`,
      }),
    })
      .then(r => r.json())
      .then(data => data);
  },

  addListing: (id, title) => {
    return fetch('api/graphql', {
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
        return data;
      });
  },

  deleteListing: id => {
    return fetch('api/graphql', {
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

export default gql;
